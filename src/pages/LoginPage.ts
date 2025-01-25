import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
   
    private readonly loginModal; Locator;
    private readonly loginButton: Locator;
    private readonly userNameField: Locator;
    private readonly passwordField: Locator;
    private readonly closeButton: Locator;

    constructor(page: Page) {
      super(page);
      this.loginModal = page.locator('modal-content');
      this.loginButton = page.locator('div#logInModal > div[role="document"] .btn.btn-primary');
      this.userNameField = page.locator('input[id="loginusername"]');
      this.passwordField = page.locator('input[id="loginpassword"]');
      this.closeButton = page.locator('div#logInModal > div[role="document"] .btn.btn-secondary');
    }    

    async enterUsername(userName: string) {
        await this.userNameField.waitFor({ state: "visible", timeout: 5000 });
        await this.userNameField.fill(userName); 
    }

    async enterPassword(password: string) {
        await this.passwordField.waitFor({ state: "visible", timeout: 5000 });
        await this.passwordField.fill(password);
    }

    async clickLogIn() {
        await this.loginButton.waitFor({ state: "visible", timeout: 5000 });
        await this.loginButton.click();
    }

    async clickClose() {
      await this.closeButton.waitFor({ state: "visible", timeout: 5000 });
      await this.closeButton.click();
    }

    async isLoginModalWindowVisible(): Promise<boolean> {
      const isModalVisible = await this.loginModal.isVisible();
      return isModalVisible;
    }
}    

