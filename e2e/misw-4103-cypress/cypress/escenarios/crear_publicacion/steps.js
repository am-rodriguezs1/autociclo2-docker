const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
/** Patrón Given When Then */

// Login
Given('I navigate to host page and path {string}', (page) => {
  const fullUrl = Cypress.env('URL') + page;
  const url = new URL(fullUrl);
  console.log(url);
  cy.visit(fullUrl, {
    failOnStatusCode: false,
    headers: { Host: url.host }
  });
});


When('I enter the email', () => {
  cy.get('input[type="email"]').clear().type(Cypress.env('EMAIL'));
});

When('I enter the password', () => {
  cy.get('input[type="password"]').clear().type(Cypress.env('PASSWORD'));
});

When('I wait for {int} seconds', (secs) => {
  cy.wait(secs * 1000);
});

When('I click next', () => {
  cy.get('button[type="submit"]').click();
});


When('I enter post title {string}', (title) => {
  cy.get('textarea[placeholder="Post title"]').clear().type(title);
});

When('I enter post content {string}', (content) => {
  cy.get('div[data-kg="editor"] p').first().click().type(content);
});

When('I click on Publish', () => {
  cy.get('button[data-test-button="publish-flow"]').first().click();
  cy.wait(1000);
  cy.get('button[data-test-button="continue"]').first().click();
  cy.wait(1000);
  cy.get('button[data-test-button="confirm-publish"]').first().click();
  cy.wait(1000);
  cy.get('button[data-test-button="close-publish-flow"]').first().click();
});

Then('I should see the post {string} in the posts list', (title) => {
  cy.get('li a h3.gh-content-entry-title').should($elements => {
    // $elements is a jQuery object of all matching h3s
    const found = $elements.toArray().some(el => el.innerText.trim() === title);
    expect(found, `Post with title "${title}" should exist`).to.be.true;
  });
});


When('I click on the plus button to add content', () => {
  cy.get('div[data-kg="editor"] p').first().click();
  cy.wait(1000);
  cy.get('button[aria-label="Add a card"]').click();
});


When('I click on the YouTube option', () => {
  cy.get('button[data-kg-card-menu-item="YouTube"]').click();
});

When('I enter YouTube URL {string}', (url) => {
  cy.get('input[placeholder="Paste URL to add embedded content..."]').clear().type(url);
  cy.get('body').type('{enter}');
});

Then('I should see the error message {string}', (errorMessage) => {
  cy.get('span[data-testid="embed-url-error-message"]').should('contain.text', errorMessage);
});


When('I click on Posts menu', () => {
  cy.get('a[data-test-link="posts"]').click();
});

Then('I should see the post {string} in the posts list with status {string}', (title, status) => {
  cy.get('li').should($lis => {
    // Find at least one <li> that contains both the title and the status
    const found = $lis.toArray().some(li => {
      const $li = Cypress.$(li);
      const hasTitle = $li.find('h3.gh-content-entry-title').text().trim() === title;
      const hasStatus = $li.find('p.gh-content-entry-status span').text().trim() === status;
      return hasTitle && hasStatus;
    });
    expect(found, `Post with title "${title}" and status "${status}" should exist`).to.be.true;
  });
});
