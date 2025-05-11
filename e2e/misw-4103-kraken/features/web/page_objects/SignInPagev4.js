class SignInPage {
  constructor(driver) {
    this.driver = driver;
    this.emailInput    = 'input[type="email"]'; // Selector para el campo de email
    this.passwordInput = 'input[type="password"]'; // Selector para el campo de contraseña
    this.submitBtn     = 'button[type="submit"]'; // Selector para el botón de envío

    // CORRECCIÓN: Selector para el mensaje de error principal en Ghost 4.5
    this.mainError     = 'p.main-error'; 
  }

  /**
   * Ingresa el email y la contraseña, y hace clic en el botón de envío.
   * @param {string | null} email - El email a ingresar. Si es null, no se ingresa email.
   * @param {string | null} password - La contraseña a ingresar. Si es null, no se ingresa contraseña.
   */
  async signIn(email, password) {
    if (email !== null) {
      await this.driver.$(this.emailInput).setValue(email);
    }
    if (password !== null) {
      await this.driver.$(this.passwordInput).setValue(password);
    }
    await this.driver.$(this.submitBtn).click();
  }

  /**
   * Obtiene el texto del mensaje de error principal.
   * Espera a que el elemento sea visible antes de intentar obtener el texto.
   * @returns {Promise<string>} El texto del mensaje de error.
   */
  async getErrorMessage() {
    const errorElement = await this.driver.$(this.mainError);
    // Es una buena práctica esperar a que el elemento esté visible,
    // especialmente si aparece después de una acción.
    await errorElement.waitForDisplayed({ timeout: 5000, timeoutMsg: `Elemento de error (${this.mainError}) no visible` });
    return (await errorElement.getText()).trim();
  }
}

module.exports = SignInPage;
