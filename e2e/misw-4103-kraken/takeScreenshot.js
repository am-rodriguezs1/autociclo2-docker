const fs = require('fs');
const config = require('./properties.json');

const takeKrakenScreenshot = async (driver, scenario, step) => {
    let ghostVersion = process.env.GHOST_VERSION || config.GHOST_VERSION;
    if (!fs.existsSync(`./screenshots/v${ghostVersion}`)) {
        fs.mkdirSync(`./screenshots/v${ghostVersion}`, { recursive: true });
    }

    await driver.saveScreenshot(`./screenshots/v${ghostVersion}/${scenario}_${step}.png`);

}

module.exports = {
    takeKrakenScreenshot
}