const { Given, When, Then, Before } = require('@cucumber/cucumber');
const assert = require('assert');
const SignInPage = require('../page_objects/SignInPagev4');
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

const waitStep = async function (step, seconds) {
    await this.driver.pause(seconds * 1000);
    await takeScreenshot(this.driver, this.scenarioNumber, step);
};

/**Patron Given When Then */

Given('{kraken-string} I wait for {int} seconds', waitStep);


Given('I navigate to page {kraken-string} and path {kraken-string}', async function (baseUrl, path) {
  const fullUrl = baseUrl + path;
  await this.driver.url(fullUrl);
});

When('I enter the email {kraken-string}', async function (email) {
    let emailInput = await this.driver.$('input[type="email"]');
    await emailInput.setValue(email);
    return;
});

When('I enter the password {kraken-string}', async function (password) {
    let passwordInput = await this.driver.$('input[type="password"]');
    await passwordInput.setValue(password);
    return;
});

When('I click next', async function () {
    let nextButton = await this.driver.$('button[type="submit"]');
    await nextButton.click();
    return;
});

Then('I should see the validation message {kraken-string}', async function (expectedMessage) {
  await this.driver.waitUntil(async () => {
      const bodyText = await this.driver.$('body').getText();
      return bodyText.includes(expectedMessage);
  }, {
      timeout: 5000,
      timeoutMsg: `Expected "${expectedMessage}" to appear somewhere in <body>`
  });
});

Then('I logout', async function () {
  // Click on the user menu (avatar)
  let userMenu = await this.driver.$('.gh-user-avatar');
  await userMenu.click();
  
  // Click on the Sign out button
  let signOutButton = await this.driver.$('a[href="#/signout/"]');
  await signOutButton.click();
  
  // Wait for the sign in page to load
  await this.driver.waitUntil(async () => {
      return (await this.driver.getUrl()).includes('/signin');
  }, {
      timeout: 5000,
      timeoutMsg: 'Expected to be redirected to sign in page after logout'
  });
  return;
});


  /**Patron Page Object */

  Given('I go to page {kraken-string} and path {kraken-string}', async function (baseUrl, path) {
    const fullUrl = baseUrl + path;
    await this.driver.navigateTo(fullUrl);
  });

  
  When('I sign in with {kraken-string} and {kraken-string}', async function (email, password) {
    console.log("entro en signIn() con", email, password)
    const page = new SignInPage(this.driver);
    await page.signIn(email, password);
  });

  When('I sign in without email and {kraken-string}', async function (password) {
    console.log("entro en signIn() con", password)
    const page = new SignInPage(this.driver);
    await page.signIn(null, password);
  });
  
  Then('I should see error message {kraken-string}', async function (expectedError) {
    const page = new SignInPage(this.driver);
    const actualError = await page.getErrorMessage();
    assert.strictEqual(actualError, expectedError);
  });
  