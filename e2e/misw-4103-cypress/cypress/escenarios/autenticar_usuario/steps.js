const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const SignInPage = require('../../page_objects/SignInPage');


// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Patrón Page Object para el login
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––


Given('I go to host page and path {string}', (path) => {
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


When('I sign in', () => {
  const email = Cypress.env('EMAIL');
  const password = Cypress.env('PASSWORD');
  const page = new SignInPage();
  return page.signIn(email, password);
});

When('I sign in without email', () => {
  const password = Cypress.env('PASSWORD');
  const page = new SignInPage();
  return page.signIn(null, password);
});

When('I enter the email {string} and the password', (email) => {
  const password = Cypress.env('PASSWORD');
  const page = new SignInPage();
  return page.signIn(email, password);
});

Then('I should see error message {string}', (expectedError) => {
  const page = new SignInPage();
  return page.getErrorMessage().then((actual) => {
    expect(actual).to.equal(expectedError);
  });
});

When('I enter the email', () => {
  cy.get('input[type="email"]').clear().type(Cypress.env('EMAIL'));
});

When('I enter the password', () => {
  cy.get('input[type="password"]').clear().type(Cypress.env('PASSWORD'));
});

When('I enter the password {string}', (password) => {
  cy.get('input[type="password"]').clear().type(password);
});

When('I click next', () => {
  cy.get('button[type="submit"]').click();
});

Then('I should could logout', () => {
  cy.get('div.gh-user-avatar').click();
  cy.wait(1000);
  cy.contains('Sign out').click();
  cy.wait(1000);
  cy.url().should('include', '/signin');
});