const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');
const options = require('./vrt.config')

const { baseScreenshotsPath, rcScreenshotsPath, output, pixelOptions } = options;

const screenshotsDir1 = baseScreenshotsPath;
const screenshotsDir2 = rcScreenshotsPath;
const outputDir = output || "VRTReport";

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

function generateHTMLReport(scenarioName, comparisons) {
  const getColorClass = (percentage) => {
    console.log(typeof percentage, percentage)
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
    console.error("Input directories not found.");
    return;
  }

  ensureDirSync(outputDir);

  const images1 = fs.readdirSync(screenshotsDir1);
  const images2 = fs.readdirSync(screenshotsDir2);

  const group1 = getScenarioGroups(images1);
  const group2 = getScenarioGroups(images2);

  const allScenarios = Object.keys(group1).filter(k => group2[k]);

  for (const scenario of allScenarios) {
    const steps1 = group1[scenario].sort((a, b) => a.step - b.step);
    const steps2 = group2[scenario].sort((a, b) => a.step - b.step);

    const comparisons = [];

    for (let i = 0; i < steps1.length; i++) {
      const step1 = steps1[i];
      const step2 = steps2.find(s => s.step === step1.step);
      if (!step2) continue;

      const imageOld = path.join(screenshotsDir1, step1.file);
      const imageNew = path.join(screenshotsDir2, step2.file);

      const scenarioDir = path.join(outputDir, scenario);
      ensureDirSync(scenarioDir);

      const diffFilename = `diff_${step1.step}.png`;
      const diffPath = path.join(scenarioDir, diffFilename);

      const resultInfo = compareWithPixelMatch(imageOld, imageNew, diffPath);

      comparisons.push({
        step: step1.step,
        oldPath: path.relative(outputDir, imageOld),
        newPath: path.relative(outputDir, imageNew),
        diffPath: path.join(scenario, diffFilename),
        mismatchPixels: resultInfo.mismatchPixels,
        mismatchPercentage: resultInfo.mismatchPercentage,
        dimensionMismatch: resultInfo.dimensionMismatch
      });
    }

    const html = generateHTMLReport(scenario, comparisons);
    fs.writeFileSync(path.join(outputDir, `${scenario}.html`), html);
  }
}

main().catch(console.error);