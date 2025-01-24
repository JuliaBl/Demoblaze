import {  expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class LoginPage extends BasePage {
    alertMessage: string;
    
    private readonly loginButton: Locator;
    private readonly userNameField: Locator;
    private readonly passwordField: Locator;
    private readonly closeButton: Locator;

    constructor(page: Page) {
      super(page);
      this.loginButton = page.locator('div#logInModal > div[role="document"] .btn.btn-primary'); //('button[class="btn btn-primary"]:has-text("Log in")');
      this.userNameField = page.locator('input[id="loginusername"]');
      this.passwordField = page.locator('input[id="loginpassword"]');
      this.closeButton = page.locator('div#logInModal > div[role="document"] .btn.btn-secondary');
    }    

    async enterUsername(userName: string) {
        await this.userNameField.waitFor({ state: "visible", timeout: 3000 });
        await this.userNameField.fill(userName); 
    }

    async enterPassword(password: string) {
        await this.passwordField.waitFor({ state: "visible", timeout: 3000 });
        await this.passwordField.fill(password);
    }

    async clickLogIn() {
        await this.loginButton.waitFor({ state: "visible", timeout: 3000 });
        await this.loginButton.click();
    }

    async clickClose() {
      await this.closeButton.waitFor({ state: "visible", timeout: 3000 });
      await this.closeButton.click();
    }

    async alertListener(errorMessage: string) {
       this.page.on('dialog', async (dialog) => {
          const message = dialog.message();
          expect(message).toEqual(errorMessage);
          await dialog.accept();
        })
    }
}    