const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Reemplazando las calls a WebDriver por cy.get() / cy.visit(), Patron GWT
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

Given('I navigate to host page and path {string}', (path) => {
  const fullUrl = Cypress.env('URL') + path;
  const url = new URL(fullUrl);
  cy.visit(fullUrl, {
    failOnStatusCode: false,
    headers: { Host: url.host }
  });
});

Given('I wait for {int} seconds', (secs) => {
  cy.wait(secs * 1000);
});

When('I click on create account', () => {
  cy.get('#ember12').click();
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

When('I click on the submit button', () => {
  cy.get('#ember29').click();
});

When ('I click skip in the invite staff users', () => {
  cy.get('button.gh-flow-skip').click();
});

Then('I should see the Ghost dashboard', () => {
  cy.get('.gh-nav-list.gh-nav-main a[title="Dashboard"]').should('exist');
});

