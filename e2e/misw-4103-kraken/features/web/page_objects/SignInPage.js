class SignInPage {
  constructor(driver) {
    this.driver = driver;
    this.emailInput    = 'input[type="email"]';
    this.passwordInput = 'input[type="password"]';
    this.submitBtn     = 'button[type="submit"]';
    this.mainError     = '[data-test-flow-notification]';
  }

  async signIn(email, password) {
    await this.driver.$(this.emailInput).setValue(email);
    await this.driver.$(this.passwordInput).setValue(password);
    await this.driver.$(this.submitBtn).click();
  }

  async getErrorMessage() {
    const el = await this.driver.$(this.mainError);
    return (await el.getText()).trim();
  }
}

module.exports = SignInPage;
