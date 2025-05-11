const { defineConfig } = require('cypress');
const fs = require('fs');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const {
  addCucumberPreprocessorPlugin,
} = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

module.exports = defineConfig({
  projectId: 'monkey-cypress.io.github.thesoftwaredesignlab',
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    reportFilename: `cypress-report-${timestamp}`,
    overwrite: false,
    json: true,
    charts: true, 
  },
  e2e: {
    specPattern: 'cypress/e2e/**/*.feature',
    async setupNodeEvents(on, config) {
  
      await addCucumberPreprocessorPlugin(on, config);

      on('file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      on('after:screenshot', (details) => {
        if (!details?.name) return;

        const screenshotName = details.name.split('_');

        const screenshotVersion = screenshotName[0];
        const screenshotScenario = screenshotName[1];
        const screenshotStep = screenshotName[2];

        const newPath = `./cypress/screenshots/${screenshotVersion}/${screenshotScenario}_${screenshotStep}.png`;

        if (!fs.existsSync(`./cypress/screenshots/${screenshotVersion}`)) {
          fs.mkdirSync(`./cypress/screenshots/${screenshotVersion}`, { recursive: true });
        }

        return new Promise((resolve, reject) => {
          fs.rename(details.path, newPath, (err) => {
            if (err) return reject(err);
            fs.rmdir(`./cypress/screenshots/${details.specName}`, () => {});

            resolve({ path: newPath });
          });
        });
      });
      return config;
    },
    baseUrl: process.env.URL || 'http://localhost:2368',
  },
  env: {
    URL: process.env.GHOST_URL || 'http://localhost:2368/ghost/#',
    EMAIL: process.env.GHOST_EMAIL || 'admin@gmail.com',
    PASSWORD: process.env.GHOST_PASSWORD || '12345678910*',
    GHOST_VERSION: process.env.GHOST_VERSION || '5.114.1'
  },
  pageLoadTimeout: 120000,
  screenshotsFolder: 'cypress/results/screenshots',
  videosFolder: 'cypress/results/videos',
  video: true,
  videoCompression: 32,
});
