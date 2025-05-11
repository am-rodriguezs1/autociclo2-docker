const { Given, When, Then } = require('@cucumber/cucumber');

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

When('I click on tags option', async function () {
    let tagsButton = await this.driver.$('a[href="#/tags/"]');
    await tagsButton.click();
});

When('I click on {kraken-string} button', async function (buttonText) {
    let button = await this.driver.$('a[href="#/tags/new/"]'); 
    await button.click();
    return;
});

When('I enter the tag name {kraken-string}', async function (tagName) {
    let tagNameInput = await this.driver.$('input[name="name"]'); 
    await tagNameInput.setValue(tagName);
    return;
});

When('I enter the tag description {kraken-string}', async function (tagDescription) {
    let tagDescriptionInput = await this.driver.$('textarea[name="description"]'); 
    await tagDescriptionInput.setValue(tagDescription);
    return;
});


When('I click on {kraken-string} button for save tag', async function (buttonText) {
    let button = await this.driver.$('button[data-test-button=save]'); 
    await button.click();
    return;
});


Then('I should see the tag {kraken-string} in the tags list', async function (tagName) {
    let tag = await this.driver.$(`//*[text()="${tagName}"]`); 
    let isDisplayed = await tag.isDisplayed();
    return;
});


Then('I should see an error message {string}', async function (errorMessage) {
    let errorElement = await this.driver.$(`//p[@class="response" and text()="${errorMessage}"]`);
    let isDisplayed = await errorElement.isDisplayed();
});

When('I click on {kraken-string} button metadata', async function (buttonText) {
    let button = await this.driver.$(`//button[@class="gh-btn gh-btn-expand"]`);
    await button.click();
    return;
});
When('I enter the metadata title {kraken-string}', async function (metadataTitle) {
    let metadataTitleInput = await this.driver.$('input[name="metaTitle"]'); 
    await metadataTitleInput.setValue(metadataTitle);
    return;
});

When('I enter the metadata description {kraken-string}', async function (metadataDescription) {
    let metadataDescriptionInput = await this.driver.$('textarea[name="metaDescription"]'); 
    await metadataDescriptionInput.setValue(metadataDescription);
    return;
});
