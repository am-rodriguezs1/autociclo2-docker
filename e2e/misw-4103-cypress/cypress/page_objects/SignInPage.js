class SignInPage {
  constructor() {
    this.emailInput    = 'input[type="email"]';
    this.passwordInput = 'input[type="password"]';
    this.submitBtn     = 'button[type="submit"]';
    this.mainError     = '[data-test-flow-notification]';
  }

  async open(baseUrl, path) {
    const fullUrl = baseUrl + path;
    const url = new URL(fullUrl);
    cy.visit(fullUrl, {
      failOnStatusCode: false,
      headers: { Host: url.host }
    });
    cy.get(this.emailInput, { timeout: 10000 }).should('be.visible');
  }

  signIn(email = null, password) {
    if (email !== null) {
      cy.get(this.emailInput)
        .clear()
        .type(email);
    }

    cy.get(this.passwordInput).clear();
    if (password) {
      cy.get(this.passwordInput).type(password);
    }

    cy.get(this.submitBtn).click();
  }

  getErrorMessage() {
    return cy
      .get(this.mainError)
      .invoke('text')
      .then(txt => txt.trim());
  }
}

module.exports = SignInPage;
