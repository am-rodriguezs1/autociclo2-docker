import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('the user is on the page {string}', (page) => {
  cy.visit(Cypress.env('URL') + '/' + page);
});

When('the user enters user and password', () => {
  cy.get('#identification').type(Cypress.env('EMAIL'));
  cy.get('#password').type(Cypress.env('PASSWORD'));
  cy.get('button[type="submit"]').click();

});

Then('they should be redirected to {string}', (page) => {
  cy.url().should('include', '/' + page);
});

When('the user navigates to the {string} section', (section) => {
  cy.visit(Cypress.env('URL') + '/' + section);
});

When('the user clicks on the {string} link', (link) => {
  cy.get('a').contains(link).click();
});

When('they enter the value {string} in the {string} field of type {string}', (value, field, typeInput) => {
  cy.get(`${typeInput}[name="${field}"]`).type(value);
});

When('the user clicks on the {string} button', (button) => {
  cy.get('button').contains(button).click();
});

Then('the user should see the error message {string}', (message) => {
  cy.get('.error').should('contain', message);
});

Then('the user should see the tag {string} in the list of tags', (tagName) => {
  cy.get('.gh-tag-list-name').should('contain', tagName);
});

Given('I wait for {int} seconds', (secs) => {
  cy.wait(secs * 1000);
});