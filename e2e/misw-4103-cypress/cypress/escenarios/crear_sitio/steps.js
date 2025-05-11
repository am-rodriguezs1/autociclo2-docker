const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Reemplazando las calls a WebDriver por cy.get() / cy.visit(), Patron GWT
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

Given('I go to page {string}', (path) => {
  cy.visit(path, {
    failOnStatusCode: false,       // para ignorar el 426 como “status code error”
    headers: {
      Host: 'localhost:3001'       // engañamos al servidor para que acepte el request
    }
  });
});
Given('I wait for {int} seconds', (secs) => {
  cy.wait(secs * 1000);
});

When('I enter text {string} into the input with id {string}', (text, id) => {
  const element = cy.get(`#${id}`).clear();
  if (text !== '') {
    element.type(text);
  }
});

When('I enter valid email into the input with id {string}', (id) => {
  text = Cypress.env('EMAIL');
  const element = cy.get(`#${id}`).clear();
  if (text !== '') {
    element.type(text);
  }
});

When('I enter valid password into the input with id {string}', (id) => {
  text = Cypress.env('PASSWORD');
  const element = cy.get(`#${id}`).clear();
  if (text !== '') {
    element.type(text);
  }
});

When('I click on the element with data-test-button {string}', (btnName) => {
  cy.get(`[data-test-button="${btnName}"]`).click();
});

Then('I wait for url containing {string} for {int} seconds', (pattern, secs) => {
  cy.url().should('include', pattern, { timeout: secs * 1000 });
});

Then('I should see the Ghost dashboard', () => {
  cy.get('.gh-nav-menu-details-sitetitle')
    .should('be.visible');
});

Then('I should see text {string} in the element with selector {string}', (expectedText, selector) => {
  cy.get(selector)
    .filter(':visible')
    .first()
    .invoke('text')
    .then((actual) => {
      expect(actual.trim()).to.equal(expectedText);
    });
});
