const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const subfolder = process.argv[2] || 'escenarios';
const escenariosDir = path.join('./cypress', subfolder);
const featureTarget = './cypress/e2e/Example.feature';
const stepsTarget = './cypress/support/step_definitions/steps.js';

// Recorre cada subcarpeta
const funcionalidades = fs.readdirSync(escenariosDir).filter(f => fs.statSync(path.join(escenariosDir, f)).isDirectory());

funcionalidades.sort((a, b) => {
  if (a === 'crear_sitio') return -1;
  if (b === 'crear_sitio') return 1;
  return 0;
});

let allScenarios = [];

funcionalidades.forEach(func => {
  const funcPath = path.join(escenariosDir, func);
  const stepPath = path.join(funcPath, 'steps.js');
  const features = fs.readdirSync(funcPath).filter(f => f.endsWith('.feature'));

  features.forEach(feature => {
    allScenarios.push({
      featurePath: path.join(funcPath, feature),
      stepPath,
      name: `${func}/${feature}`
    });
  });
});

for (const scenario of allScenarios) {
  console.log('='.repeat(80));
  console.log(`Running scenario: ${scenario.name}`);
  console.log('='.repeat(80));

  try {
    fs.copyFileSync(scenario.featurePath, featureTarget);
    fs.copyFileSync(scenario.stepPath, stepsTarget);
  } catch (err) {
    console.error(`Error copying files for scenario ${scenario.name}:`, err);
    continue;
  }

  const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const res = spawnSync(npmCmd, ['run', 'test'], { stdio: 'inherit', shell: true });

  if (res.status !== 0) {
    console.error(`Scenario ${scenario.name} failed.`);
  } else {
    console.log(`Scenario ${scenario.name} passed.`);
  }
}
