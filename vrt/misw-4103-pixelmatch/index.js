const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');
const configOptions = require('./vrt.config'); // Renombrado para evitar confusión con 'options' local

const { baseScreenshotsPath, rcScreenshotsPath, output, pixelOptions } = configOptions;
const isGitHubActions = !!process.env.GITHUB_WORKSPACE; // Determinar si estamos en GHA

const screenshotsDir1 = baseScreenshotsPath;
const screenshotsDir2 = rcScreenshotsPath;
const outputDir = output; // 'output' ya viene resuelto desde vrt.config.js

function ensureDirSync(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

function getScenarioGroups(files) {
    const groups = {};
    for (const file of files) {
        const match = file.match(/(ESC\d{3})_(\d+)\.png$/);
        if (match) {
            const [_, scenario, step] = match;
            if (!groups[scenario]) groups[scenario] = [];
            groups[scenario].push({ file, step: parseInt(step, 10) });
        }
    }
    return groups;
}

// La función generateHTMLReport no necesita cambios
function generateHTMLReport(scenarioName, comparisons) {
    const getColorClass = (percentage) => {
        // console.log(typeof percentage, percentage) // Puedes mantener o quitar este log
        if (typeof percentage !== 'number') return 'badge-red';
        if (percentage < 20) return 'badge-green';
        if (percentage < 50) return 'badge-orange';
        return 'badge-red';
    };

    const rows = comparisons.map(c => `
    <div class="section">
        <h2>Step ${c.step}</h2>
        <ul class="details">
        <li><strong>Mismatch Pixels:</strong> ${c.mismatchPixels}</li>
        <li><strong>Dimension Mismatch:</strong> ${c.dimensionMismatch}</li>
        </ul>
        <div class="image-container">
        <div><h3>Old</h3><img src="${c.oldPath}"/></div>
        <div><h3>New</h3><img src="${c.newPath}"/></div>
        <div><h3>Diff</h3><img src="${c.diffPath}"/></div>
        </div>
        <p class="mismatch">
        Mismatch: 
        <span class="badge ${getColorClass(c.mismatchPercentage)}">
            ${typeof c.mismatchPercentage === 'number' ? c.mismatchPercentage.toFixed(2) + '%' : 'N/A'}
        </span>
        </p>
    </div>
    `).join("\n");

    return `
    <html>
        <head>
        <style>
            body { font-family: sans-serif; padding: 20px; background: #f9f9f9; }
            .image-container { display: flex; gap: 20px; margin-bottom: 20px; }
            img { width: 100%; max-width: 300px; border: 1px solid #ccc; border-radius: 5px; }
            .section { margin-bottom: 40px; }
            .mismatch { font-weight: bold; font-size: 1.1em; }
            .badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            }
            .badge-green { background-color: #28a745; }
            .badge-orange { background-color: #fd7e14; }
            .badge-red { background-color: #dc3545; }
            .details { list-style: none; padding-left: 0; font-size: 0.95em; }
            .details li { margin-bottom: 4px; }
        </style>
        </head>
        <body>
        <h1>Visual Regression Report for ${scenarioName}</h1>
        ${rows}
        </body>
    </html>
    `;
}

function compareWithPixelMatch(imgPath1, imgPath2, diffPath) {
    // Esta función no necesita cambios, solo lee las imágenes y escribe la diff
    const img1 = PNG.sync.read(fs.readFileSync(imgPath1));
    const img2 = PNG.sync.read(fs.readFileSync(imgPath2));

    const dimensionMismatch = img1.width !== img2.width || img1.height !== img2.height;

    if (dimensionMismatch) {
        return { mismatchPixels: -1, mismatchPercentage: -1, dimensionMismatch: true };
    }

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    const mismatchPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, pixelOptions);
    fs.writeFileSync(diffPath, PNG.sync.write(diff));

    const totalPixels = width * height;
    const mismatchPercentage = (mismatchPixels / totalPixels) * 100;

    return {
        mismatchPixels,
        mismatchPercentage,
        dimensionMismatch: false
    };
}

async function main() {
    if (!fs.existsSync(screenshotsDir1) || !fs.existsSync(screenshotsDir2)) {
        console.error(`Input directories not found. 
        Base: ${screenshotsDir1} (Exists: ${fs.existsSync(screenshotsDir1)})
        RC: ${screenshotsDir2} (Exists: ${fs.existsSync(screenshotsDir2)})`);
        return;
    }

    ensureDirSync(outputDir); // outputDir ya viene resuelto desde vrt.config.js

    const images1 = fs.readdirSync(screenshotsDir1);
    const images2 = fs.readdirSync(screenshotsDir2);

    const group1 = getScenarioGroups(images1);
    const group2 = getScenarioGroups(images2);

    const allScenarios = Object.keys(group1).filter(k => group2[k]);

    for (const scenario of allScenarios) {
        const steps1 = group1[scenario].sort((a, b) => a.step - b.step);
        const steps2 = group2[scenario].sort((a, b) => a.step - b.step);

        const comparisons = [];
        const scenarioReportDir = path.join(outputDir, scenario); // ej: VRTReportPixelmatch/ESC017 o results/ESC017
        ensureDirSync(scenarioReportDir);

        for (let i = 0; i < steps1.length; i++) {
            const step1Data = steps1[i];
            const step2Data = steps2.find(s => s.step === step1Data.step);
            if (!step2Data) continue;

            const imageOldOriginalPath = path.join(screenshotsDir1, step1Data.file);
            const imageNewOriginalPath = path.join(screenshotsDir2, step2Data.file);

            const diffImageFilename = `diff_${step1Data.step}.png`;
            const diffImageReportPath = path.join(scenarioReportDir, diffImageFilename); // Diff siempre se guarda en la subcarpeta del escenario

            let oldImagePathForHTML, newImagePathForHTML;

            if (isGitHubActions) {
                // En GHA, copiamos las imágenes a la carpeta del reporte y usamos rutas relativas a ella
                const oldImageFilenameInReport = `old_${step1Data.step}.png`;
                const newImageFilenameInReport = `new_${step1Data.step}.png`;

                const oldImageCopiedPath = path.join(scenarioReportDir, oldImageFilenameInReport);
                const newImageCopiedPath = path.join(scenarioReportDir, newImageFilenameInReport);

                fs.copyFileSync(imageOldOriginalPath, oldImageCopiedPath);
                fs.copyFileSync(imageNewOriginalPath, newImageCopiedPath);

                // El HTML (ej: ESC017.html) está en outputDir. Las imágenes están en outputDir/ESC017/
                oldImagePathForHTML = path.join(scenario, oldImageFilenameInReport).replace(/\\/g, '/');
                newImagePathForHTML = path.join(scenario, newImageFilenameInReport).replace(/\\/g, '/');
            } else {
                // En Local, usamos las rutas relativas originales como ya lo hacías
                oldImagePathForHTML = path.relative(outputDir, imageOldOriginalPath).replace(/\\/g, '/');
                newImagePathForHTML = path.relative(outputDir, imageNewOriginalPath).replace(/\\/g, '/');
            }

            // La comparación siempre usa las rutas originales
            const resultInfo = compareWithPixelMatch(imageOldOriginalPath, imageNewOriginalPath, diffImageReportPath);

            comparisons.push({
                step: step1Data.step,
                oldPath: oldImagePathForHTML,
                newPath: newImagePathForHTML,
                diffPath: path.join(scenario, diffImageFilename).replace(/\\/g, '/'), // Diff siempre relativa a la carpeta del escenario
                mismatchPixels: resultInfo.mismatchPixels,
                mismatchPercentage: resultInfo.mismatchPercentage,
                dimensionMismatch: resultInfo.dimensionMismatch
            });
        }

        const html = generateHTMLReport(scenario, comparisons);
        fs.writeFileSync(path.join(outputDir, `${scenario}.html`), html); // El HTML se guarda en la raíz de outputDir
    }
}

main().catch(console.error);