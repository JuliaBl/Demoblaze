import { expect } from "@playwright/test";
import { LoginPage } from "../LoginPage";
export class Header {
    constructor(page) {
        this.page = page;
        this.homeLink = page.getByRole('link', { name: 'Home' });
        this.contactLink = this.page.getByRole('link', { name: 'Contact' });
        this.aboutUSLink = this.page.getByRole('link', { name: 'About us' });
        this.cartLink = this.page.getByRole('link', { name: 'Cart', exact: true });
        this.logOutLink = this.page.getByRole('link', { name: 'Log out' });
        this.logInLink = this.page.getByRole('link', { name: 'Log in' });
        this.welcomeUser = this.page.getByText('Welcome');
    }
    async clickLogInButton() {
        await this.logInLink.click();
        return new LoginPage(this.page);
    }
    async getWelcomeUserText() {
        await this.welcomeUser.waitFor({ state: "visible", timeout: 2000 });
        ;
        return await this.welcomeUser.textContent();
    }
    async logout() {
        await this.logOutLink.waitFor();
        await this.logOutLink.click();
        expect(this.logInLink.isVisible).toBeTruthy();
    }
}
//# sourceMappingURL=Header.js.map