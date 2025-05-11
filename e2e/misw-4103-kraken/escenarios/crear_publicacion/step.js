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


When('I click on New post', async function () {
    let newPostButton = await this.driver.$('a[href="#/editor/post/"]');
    await newPostButton.click();
    return;
});

When('I enter post title {kraken-string}', async function (title) {
    let titleInput = await this.driver.$('textarea[placeholder="Post title"]');
    await titleInput.setValue(title);
    return;
});

When('I enter post content {kraken-string}', async function (content) {
    let editor = await this.driver.$('[data-kg="editor"]');
    await editor.click();
    let contentInput = await this.driver.$('[data-kg="editor"]');
    await contentInput.setValue(content);
    return;
});

When('I click on Publish', async function () {
    let publishButton = await this.driver.$('button.gh-publish-trigger');
    await publishButton.click();
    
    let continueButton = await this.driver.$('button[data-test-button="continue"]');
    await continueButton.click();
    
    let confirmButton = await this.driver.$('button[data-test-button="confirm-publish"]');
    await confirmButton.click();

    let closeButton = await this.driver.$('button[data-test-button="close-publish-flow"]');
    await closeButton.click();
    
});

Then('I should see the post {kraken-string} in the posts list', async function (title) {
    
    let postItems = await this.driver.$$('h3.gh-content-entry-title');
    let found = false;
    for (let postItem of postItems) {
        let text = await postItem.getText();
        if (text === title) {
            found = true;
            break;
        }
    }
    if (!found) {
        throw new Error(`Post with title "${title}" not found in the posts list`);
    }
    return;
});

When('I click on the plus button to add content', async function () {
    let editor = await this.driver.$('[data-kg="editor"]');
    await editor.click();
    // Now click the plus button
    let plusButton = await this.driver.$('button[aria-label="Add a card"]');
    await plusButton.click();
    return;
});

When('I click on the YouTube option', async function () {
    let youtubeOption = await this.driver.$('button[data-kg-card-menu-item="YouTube"]');
    await youtubeOption.click();
    return;
});

When('I enter YouTube URL {kraken-string}', async function (url) {
    let youtubeInput = await this.driver.$('input[placeholder="Paste URL to add embedded content..."]');
    await youtubeInput.setValue(url);
    await this.driver.keys('Enter');
    return;
});

Then('I should see the error message {kraken-string}', async function (errorMessage) {
    let errorElement = await this.driver.$('div[data-testid="embed-url-error-container"]');
    await errorElement.waitForExist();
    let text = await errorElement.getText();
    if (text !== errorMessage) {
        throw new Error(`Expected error message "${errorMessage}" but got "${text}"`);
    }
    return;
});

When('I click on Posts menu', async function () {
    let postsMenu = await this.driver.$('a[href="#/posts/"]');
    await postsMenu.click();
    return;
});

Then('I should see the post {kraken-string} in the posts list with status {kraken-string}', async function (title, status) {
    
    let p = await this.driver.$('span.draft');
    let found = false;
    let text = await p.getText();
    if (text === status) {
        found = true;
    }
    
    if (!found) {
        throw new Error(`Post with title "${title}" and draft status not found in the posts list ${text}`);
    }
    return;
});



