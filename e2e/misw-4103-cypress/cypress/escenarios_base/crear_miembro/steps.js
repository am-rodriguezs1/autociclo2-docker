
const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const { faker } = require('@faker-js/faker');
const SignInPage = require('../../page_objects/SignInPage');
const { NewMemberPage } = require('../../page_objects/NewMemberPage');
const { takeCypressScreenshot } = require('../takeScreenshot');
  
const signInpage = new SignInPage();
const newMemberPage = new NewMemberPage();

    
/** Patrón Given When Then */
    
// Login
Given('{string} I navigate to host page and path {string}', (step, path) => {
  const fullUrl = Cypress.env('URL') + path;
  const url = new URL(fullUrl);
  cy.visit(fullUrl, {
    failOnStatusCode: false,
    headers: { Host: url.host }
  });
  
  takeCypressScreenshot(step);
});
    
When('{string} I enter the email', (step) => {
  cy.get('input[type="email"]').clear().type(Cypress.env('EMAIL'));
  takeCypressScreenshot(step);
});
    
When('{string} I enter the password', (step) => {
  cy.get('input[type="password"]').clear().type(Cypress.env('PASSWORD'));
  takeCypressScreenshot(step);
});
  
When('I wait for {int} seconds', (secs) => {
  cy.wait(secs * 1000);
});
    
When('{string} I click next', (step) => {
  cy.get('button[type="submit"]').click();
  takeCypressScreenshot(step);
});
    
// Crear miembro
When('{string} I enter the member name', (step) => {
  cy.get('input[id="member-name"]')
    .should('be.visible')
    .should('be.enabled')
    .clear()
    .type(faker.person.fullName());
  takeCypressScreenshot(step);
});
    
When('{string} I enter the member email', (step) => {
  cy.get('input[id="member-email"]')
    .should('be.visible')
    .should('be.enabled')
    .clear()
    .type(faker.internet.email());
  takeCypressScreenshot(step);
});
    
When('{string} I enter an invalid member note', (step) => {
  const result = faker.lorem.words(1000).slice(0, 501);
  cy.get('textarea[id="member-note"]')
    .should('be.visible')
    .clear()
    .type(result);
  
  takeCypressScreenshot(step);
});
    
When('{string} I click save member', (step) => {
  cy.get('button.gh-btn-primary')
    .click();
  
  takeCypressScreenshot(step);
});
    
Then('{string} I should see the validation message {string}', (step, expectedMessage) => {
  cy.get('body', { timeout: 5000 }).should('contain.text', expectedMessage);
  
  takeCypressScreenshot(step);
});
    
Then('{string} I should see the signup info', (step) => {
  cy.get('.gh-member-details-attribution')
    .should('be.visible');
  
  takeCypressScreenshot(step);
});
  
/** Patrón Page Object */
    
// Login
Given('{string} I go to host page and path {string}', (step, path) => {
  if (path == '/signin') {
    signInpage.open(Cypress.env('URL'), path);
  } else {
    newMemberPage.open(Cypress.env('URL'), path);
  }
  takeCypressScreenshot(step);
});
    
When('{string} I sign in', (step) => {
  const email = Cypress.env('EMAIL');
  const password = Cypress.env('PASSWORD');
  const page = new SignInPage();
  page.signIn(email, password);
  
  takeCypressScreenshot(step);
});
    
// Crear miembro  
When('{string} I fill the member form with name and invalid email', (step) => {
  newMemberPage.fillMemberForm(faker.person.fullName(), faker.person.firstName());
  
  takeCypressScreenshot(step);
});
    
When('{string} I fill the member email only', (step) => {
  newMemberPage.fillMemberForm(null, faker.internet.email());
  
  takeCypressScreenshot(step);
});
    
When('{string} I click save member button', (step) => {
  newMemberPage.clickSaveButton();
  
  takeCypressScreenshot(step);
});
    
Then('{string} I should see the retry message in the button', (step) => {
  newMemberPage.confirmRetry();
  
  takeCypressScreenshot(step);
});
    
Then('{string} I should see the saved message in the button', (step) => {
  newMemberPage.confirmSaved();
  
  takeCypressScreenshot(step);
});