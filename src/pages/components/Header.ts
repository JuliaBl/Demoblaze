import { Locator, Page } from "@playwright/test";
import { LoginPage } from "../LoginPage";
import { CartPage } from "../CartPage";

export class Header {
    page: Page;

    private readonly homeLink: Locator;
    private readonly contactLink: Locator;
    private readonly aboutUSLink: Locator;
    private readonly cartLink: Locator;
    private readonly logOutLink: Locator;
    private readonly logInLink: Locator;
    private readonly welcomeUser: Locator;

    constructor(page: Page) {
      this.page = page;
      this.homeLink = page.getByRole('link', { name: 'Home' });
      this.contactLink = this.page.getByRole('link', { name: 'Contact' });
      this.aboutUSLink = this.page.getByRole('link', { name: 'About us' });
      this.cartLink = this.page.getByRole('link', { name: 'Cart', exact: true });
      this.logOutLink = this.page.getByRole('link', { name: 'Log out' });
      this.logInLink = this.page.getByRole('link', { name: 'Log in' });
      this.welcomeUser = this.page.getByText('Welcome'); 
    }

    async clickLogInButton(): Promise<LoginPage> {
        await this.logInLink.waitFor({ state: "visible", timeout: 5000 });
        await this.logInLink.click();
        return new LoginPage(this.page);
      }
    
    async clickOnCart(): Promise<CartPage> {
        await this.cartLink.waitFor({ state: "visible", timeout: 5000 });
        await this.cartLink.click();
        return new CartPage(this.page);
      }  

    async getWelcomeUserText(): Promise<null | string> {
        await this.welcomeUser.waitFor({ state: "visible", timeout: 5000 });
        return await this.welcomeUser.textContent();
    }
    
    async logout() {
      await this.logOutLink.waitFor({ state: "visible", timeout: 5000 });
      await this.logOutLink.click();
      await this.logInLink.waitFor({ state: "visible", timeout: 5000 });
    }

    async isLogInLinkVisible() {
      const isLoginVisible = await this.logInLink.isVisible();
      return isLoginVisible;
    }
}



