function extractName(scenarioName) {
  const regex = /^(ESC\d{3})/;
  const match = scenarioName.match(regex);
  return match ? match[1] : 'UNKNOWN';
}

function takeCypressScreenshot(step) {
  const ghostVersion = Cypress.env('GHOST_VERSION');
  const scenario = extractName(Cypress.currentTest.title);
  cy.screenshot(`v${ghostVersion}_${scenario}_${step}`, { overwrite: true });
}

module.exports = {
  takeCypressScreenshot
};