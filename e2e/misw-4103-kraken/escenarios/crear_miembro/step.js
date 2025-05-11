const { Given, When, Then, Before } = require('@cucumber/cucumber');
const { faker } = require('@faker-js/faker')
const SignInPage = require('../page_objects/SignInPage');
const NewMemberPage = require('../page_objects/NewMemberPage');
const { takeKrakenScreenshot: takeScreenshot } = require('../../../takeScreenshot');
const regex = /^(ESC\d{3})/;

Before(function (scenario) {
    this.scenarioName = scenario.pickle.name;
    const match = this.scenarioName.match(regex);
    
    if (match) {
        this.scenarioNumber = match[1];
    } else {
        this.scenarioNumber = 0;
    }
});


/**Patron Given When Then */

// Login
Given('{kraken-string} I navigate to page {kraken-string} and path {kraken-string}', async function (step, baseUrl, path) {
    const fullUrl = baseUrl + path;
    await this.driver.url(fullUrl);
    await takeScreenshot(this.driver, this.scenarioNumber, step);
});
  
  When('{kraken-string} I enter the email {kraken-string}', async function (step, email) {
      let emailInput = await this.driver.$('input[type="email"]');
      await emailInput.setValue(email);
      await takeScreenshot(this.driver, this.scenarioNumber, step);
      return;
  });
  
  When('{kraken-string} I enter the password {kraken-string}', async function (step, password) {
      let passwordInput = await this.driver.$('input[type="password"]');
      await passwordInput.setValue(password);
      await takeScreenshot(this.driver, this.scenarioNumber, step);
      return;
  });
  
  When('{kraken-string} I click next', async function (step) {
      let nextButton = await this.driver.$('button[type="submit"]');
      await nextButton.click();
      await takeScreenshot(this.driver, this.scenarioNumber, step);
      return;
  });
  
  // Crear miembro
  When('{kraken-string} I enter the member name', async function (step) {
      let nameInput = await this.driver.$('input[id="member-name"]');
      await nameInput.waitForDisplayed({ timeout: 5000 });
      await nameInput.waitForEnabled({ timeout: 5000 });
      await nameInput.setValue(faker.person.fullName());
      await takeScreenshot(this.driver, this.scenarioNumber, step);
      return;
  });
  
  When('{kraken-string} I enter the member email', async function (step) {
      let emailInput = await this.driver.$('input[id="member-email"]');
      await emailInput.waitForDisplayed({ timeout: 5000 });
      await emailInput.waitForEnabled({ timeout: 5000 });
      await emailInput.setValue(faker.internet.email());
      await takeScreenshot(this.driver, this.scenarioNumber, step);
      return;
  });
  
  When('{kraken-string} I enter an invalid member note', async function (step) {
      let noteInput = await this.driver.$('textarea[id="member-note"]');
      await noteInput.waitForDisplayed({ timeout: 5000 });
  
      const words = faker.lorem.words(1000);
      const result = words.slice(0, 501);
      await noteInput.setValue(result);
      await takeScreenshot(this.driver, this.scenarioNumber, step);
      return;
  });
  
  
  When('{kraken-string} I click save member', async function (step) {
      let saveButton = await this.driver.$('button.gh-btn-primary');
      await saveButton.waitForClickable({ timeout: 5000 });
      await saveButton.click();
      await takeScreenshot(this.driver, this.scenarioNumber, step);
      return;
  });
  
  Then('{kraken-string} I should see the validation message {kraken-string}', async function (step, expectedMessage) {
    await this.driver.waitUntil(async () => {
        const bodyText = await this.driver.$('body').getText();
        return bodyText.includes(expectedMessage);
    }, {
        timeout: 5000,
        timeoutMsg: `Expected "${expectedMessage}" to appear somewhere in <body>`
    });
    await takeScreenshot(this.driver, this.scenarioNumber, step);
  });
  
  
  Then('{kraken-string} I should see the saved message', async function (step) {
      const saveButton = await this.driver.$('button.gh-btn-primary');
      await this.driver.waitUntil(
        async () => {
          const newText = await saveButton.getText();
          return newText === 'Saved';
        },
        {
          timeout: 5000,
          timeoutMsg: 'Expected button text to change to "Saved" within 5 seconds',
        }
      );
      await takeScreenshot(this.driver, this.scenarioNumber, step);
  });


/**Patron Page Object */

//Login
  Given('{kraken-string} I go to page {kraken-string} and path {kraken-string}', async function (step, baseUrl, path) {
    const fullUrl = baseUrl + path;
    await this.driver.navigateTo(fullUrl);
    await takeScreenshot(this.driver, this.scenarioNumber, step);
  });

  When('{kraken-string} I sign in with {kraken-string} and {kraken-string}', async function (step, email, password) {
      console.log("entro en signIn() con", email, password)
      const page = new SignInPage(this.driver);
      await page.signIn(email, password);
      await takeScreenshot(this.driver, this.scenarioNumber, step);
  });
  
// Crear miembro
    Given('{kraken-string} I am on the new member page: {kraken-string}{kraken-string}', async function (step, url, path) {
        const newMemberPage = new NewMemberPage(this.driver);
        await newMemberPage.open(url, path);
        await this.driver.$(newMemberPage.nameInputSelector).waitForDisplayed({ timeout: 10000 });
        await takeScreenshot(this.driver, this.scenarioNumber, step);
        return;
    });

    When('{kraken-string} I fill the member form with name and invalid email', async function (step) {
    const newMemberPage = new NewMemberPage(this.driver);
    await newMemberPage.fillMemberForm(faker.person.fullName(), faker.person.firstName());
    await takeScreenshot(this.driver, this.scenarioNumber, step);
    return;
    });

    When('{kraken-string} I fill the member email only', async function (step) {
    const newMemberPage = new NewMemberPage(this.driver);
    await newMemberPage.fillMemberForm(null, faker.internet.email());
    await takeScreenshot(this.driver, this.scenarioNumber, step);
    return;
    });

    When('{kraken-string} I click save member button', async function (step) {
        const newMemberPage = new NewMemberPage(this.driver);
        await newMemberPage.clickSaveButton();
        await takeScreenshot(this.driver, this.scenarioNumber, step);
        return;
    });

    Then('{kraken-string} I should see the retry message in the button', async function (step) {
        const newMemberPage = new NewMemberPage(this.driver);
        await newMemberPage.confirmRetry();
        await takeScreenshot(this.driver, this.scenarioNumber, step);
        return;
    });
  
    Then('{kraken-string} I should see the saved message in the button', async function (step) {
        const newMemberPage = new NewMemberPage(this.driver);
        await newMemberPage.confirmSaved();
        await takeScreenshot(this.driver, this.scenarioNumber, step);
        return;
    });

