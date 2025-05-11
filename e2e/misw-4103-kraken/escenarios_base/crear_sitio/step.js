const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

Given('I navigate to page {kraken-string} and path {kraken-string}', async function (baseUrl, path) {
    const fullUrl = baseUrl + path;
    await this.driver.url(fullUrl);
});

When('I click on create account', async function () {
  const el = await this.driver.$('#ember12');
  await el.click();
});

When('I enter text {kraken-string} into the input with id {kraken-string}', async function (text, id) {
  const input = await this.driver.$(`#${id}`);
  await input.clearValue();
  if (text !== '') {
    await input.setValue(text);
  }
});

When('I click on the submit button', async function () {
  const el = await this.driver.$('#ember29');
  await el.click();
});

When('I click skip in the invite staff users', async function () {
  const el = await this.driver.$('button.gh-flow-skip');
  await el.click();
});

Then('I should see the Ghost dashboard', async function () {
  const dashboard = await this.driver.$('.gh-nav-list.gh-nav-main a[title="Dashboard"]');
  const isDisplayed = await dashboard.isDisplayed();
  assert.strictEqual(isDisplayed, true, 'Dashboard was not visible');
});
