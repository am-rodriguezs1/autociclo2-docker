class NewMemberPage {
    constructor(driver) {
        this.driver = driver;
        this.url = ""
        this.nameInputSelector = 'input[id="member-name"]';
        this.emailInputSelector = 'input[id="member-email"]';
        this.noteTextareaSelector = 'textarea[id="member-note"]';
        this.saveButtonSelector = 'button.gh-btn-primary';
    }

    async open(baseUrl, path) { 
        this.url = baseUrl + path;
        console.log("base path", this.url)
        await this.driver.url(this.url); 
    }

    async fillMemberForm(name, email, note = null) {
        const nameInput = await this.driver.$(this.nameInputSelector);
        const emailInput = await this.driver.$(this.emailInputSelector);
        await nameInput.waitForDisplayed({ timeout: 5000 });
        await emailInput.waitForDisplayed({ timeout: 5000 });
        await nameInput.setValue(name);
        await emailInput.setValue(email);
        if (note !== null) {
            const noteTextarea = await this.driver.$(this.noteTextareaSelector);
            await noteTextarea.waitForDisplayed({ timeout: 5000 });
            await noteTextarea.setValue(note);
        }
    }

    async clickSaveButton() {
        const saveButton = await this.driver.$(this.saveButtonSelector);
        await saveButton.waitForClickable({ timeout: 5000 });
        await saveButton.click();
    }

    async confirmRetry() {
        const saveButton =  await this.driver.$(this.saveButtonSelector);
        await this.driver.waitUntil(
            async () => {
                const newText = await saveButton.getText();
                return newText === 'Retry';
            },
            {
                timeout: 5000,
                timeoutMsg: 'Expected button text to change to "Retry" within 5 seconds',
            }
        );
    }

    async confirmSaved() {
        const saveButton =  await this.driver.$(this.saveButtonSelector);
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
    }
}
module.exports = NewMemberPage;