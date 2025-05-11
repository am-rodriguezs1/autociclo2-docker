export class NewMemberPage {
  constructor() {
    this.nameInputSelector = 'input[id="member-name"]';
    this.emailInputSelector = 'input[id="member-email"]';
    this.noteTextareaSelector = 'textarea[id="member-note"]';
    this.saveButtonSelector = 'button.gh-btn-primary';
  }
  
  async open(baseUrl, path) {
    const fullUrl = baseUrl + path;
    const url = new URL(fullUrl);
    cy.visit(fullUrl, {
      failOnStatusCode: false,
      headers: { Host: url.host }
    });
    cy.get(this.nameInputSelector, { timeout: 10000 }).should('be.visible');
  }
  
  fillMemberForm(name = null, email, note = null) {
    if (name !== null) {
      cy.get(this.nameInputSelector, { timeout: 5000 }).should('be.visible').clear().type(name, { force: true });
    }
    cy.get(this.emailInputSelector, { timeout: 5000 }).should('be.visible').clear().type(email, { force: true });
    if (note !== null) {
      cy.get(this.noteTextareaSelector, { timeout: 5000 }).should('be.visible').clear().type(note, { force: true });
    }
  }
  
  clickSaveButton() {
    cy.get(this.saveButtonSelector, { timeout: 5000 }).should('be.enabled').click();
  }
  
  confirmRetry() {
    cy.get(this.saveButtonSelector, { timeout: 5000 })
      .should('be.enabled')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.equal('Retry');
      });
  }
  
  confirmSaved() {
    cy.get(this.saveButtonSelector, { timeout: 5000 })
      .should('be.enabled')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.equal('Saved');
      });
  }
}
  