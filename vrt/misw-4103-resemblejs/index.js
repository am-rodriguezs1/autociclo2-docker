const compareImages = require("resemblejs/compareImages")
const config = require("./vrt.config.json");
const fs = require('fs');
const path = require('path');

const { baseScreenshotsPath, rcScreenshotsPath, output, options } = config;

const screenshotsDir1 = process.env.BASE_SCREENSHOTS_PATH || baseScreenshotsPath;
const screenshotsDir2 = process.env.RC_SCREENSHOTS_PATH  || rcScreenshotsPath;
const outputDir = process.env.OUTPUT || output;

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

async function compareAndGenerateDiff(oldImagePath, newImagePath, diffImagePath) {
  try {
    const result = await compareImages(
      fs.readFileSync(oldImagePath),
      fs.readFileSync(newImagePath),
      options
    );

    fs.writeFileSync(diffImagePath, result.getBuffer());
    return {
      isSameDimensions: result.isSameDimensions,
      dimensionDifference: result.dimensionDifference,
      rawMisMatchPercentage: result.rawMisMatchPercentage,
      misMatchPercentage: parseFloat(result.misMatchPercentage),
      diffBounds: result.diffBounds,
      analysisTime: result.analysisTime
    };
  } catch (error) {
    console.error(`Error comparing images:`, error);
    return null;
  }
}

function generateHTMLReport(scenarioName, comparisons) {
  const getColorClass = (percentage) => {
    if (typeof percentage !== 'number') return 'badge-red';
    if (percentage < 20) return 'badge-green';
    if (percentage < 50) return 'badge-orange';
    return 'badge-red';
  };

  const rows = comparisons.map(c => {
    const d = c.details || {};
    return `
    <div class="section">
      <h2>Step ${c.step}</h2>
      <ul class="details">
        <li><strong>Same Dimensions:</strong> ${d.isSameDimensions}</li>
        <li><strong>Dimension Difference:</strong> ${JSON.stringify(d.dimensionDifference)}</li>
        <li><strong>Diff Bounds:</strong> ${JSON.stringify(d.diffBounds)}</li>
        <li><strong>Analysis Time:</strong> ${d.analysisTime} ms</li>
      </ul>
      <div class="image-container">
        <div>
          <h3>Old</h3>
          <img src="${c.oldPath}"/>
        </div>
        <div>
          <h3>New</h3>
          <img src="${c.newPath}"/>
        </div>
        <div>
          <h3>Diff</h3>
          <img src="${c.diffPath}"/>
        </div>
      </div>
      <p class="mismatch">
        Mismatch: 
        <span class="badge ${getColorClass(c.mismatchPercentage)}">
          ${typeof c.mismatchPercentage === 'number' 
              ? c.mismatchPercentage.toFixed(2) + '%' 
              : 'N/A'}
        </span>
      </p>
    </div>
    `;
  }).join("\n");

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
      const step2 = steps2[i];
      const imageOld = path.join(screenshotsDir1, step1.file);
      const imageNew = path.join(screenshotsDir2, step2.file);

      const scenarioDir = path.join(outputDir, scenario);
      ensureDirSync(scenarioDir);

      const diffPath = path.join(scenarioDir, `diff_${step1.step}.png`);
      const resultInfo = await compareAndGenerateDiff(imageOld, imageNew, diffPath);

      if (resultInfo) {
        comparisons.push({
          step: step1.step,
          oldPath: path.relative(outputDir, imageOld),
          newPath: path.relative(outputDir, imageNew),
          diffPath: path.relative(outputDir, diffPath),
          mismatchPercentage: resultInfo.misMatchPercentage,
          details: resultInfo
        });
      }
    }

    const html = generateHTMLReport(scenario, comparisons);
    fs.writeFileSync(path.join(outputDir, `${scenario}.html`), html);
  }
}

main().catch(console.error);
