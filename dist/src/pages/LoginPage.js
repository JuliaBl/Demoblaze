import { BasePage } from "./BasePage";
export let alertMessage = "";
export class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.loginButton = page.locator('button[class="btn btn-primary"]:has-text("Log in")');
        //   this.userNameTitle = page.locator('[for="log-name"]:has-text("Username:")');
        this.userNameField = page.locator('input[id="loginusername"]');
        //    this.passwordTitle = page.locator('[for="log-pass"]:has-text("Password:")');
        this.passwordField = page.locator('input[id="loginpassword"]');
        this.closeButton = page.locator('button[type="button"]');
    }
    async enterUsername(userName) {
        await this.userNameField.waitFor({ state: "visible", timeout: 3000 });
        await this.userNameField.fill(userName);
    }
    async enterPassword(password) {
        await this.passwordField.waitFor({ state: "visible", timeout: 3000 });
        await this.passwordField.fill(password);
    }
    async clickLogIn() {
        await this.loginButton.waitFor({ state: "visible", timeout: 3000 });
        await this.loginButton.click();
    }
    async alertListener() {
        this.page.on('dialog', async (dialog) => {
            const message = dialog.message();
            alertMessage = message;
            await dialog.accept();
        });
    }
}
//# sourceMappingURL=LoginPage.js.map