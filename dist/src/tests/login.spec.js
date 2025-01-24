import { test, expect } from "@playwright/test";
import { alertMessage, LoginPage } from '../pages/LoginPage';
import { Header } from "../pages/components/Header";
const { USER_NAME, PASSWORD } = process.env;
let header;
let loginPage;
test.describe('Log/Logout into Demoblaze', () => {
    test.beforeEach(async ({ page }) => {
        header = new Header(page);
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });
    test('should be able to successfully login', async () => {
        await header.clickLogInButton();
        await loginPage.enterUsername(USER_NAME);
        await loginPage.enterPassword(PASSWORD);
        await loginPage.clickLogIn();
        const welcomeText = await header.getWelcomeUserText();
        expect(welcomeText).toEqual(`Welcome ${USER_NAME}`);
    });
    test('should not be able to login with wrogn username', async () => {
        await header.clickLogInButton();
        await loginPage.enterUsername("invalid_user");
        await loginPage.enterPassword(PASSWORD);
        await loginPage.clickLogIn();
        await loginPage.alertListener();
        expect(alertMessage).toMatch("User does not exist.");
    });
    test('should not be able to login with wrogn password', async () => {
        await header.clickLogInButton();
        await loginPage.enterUsername(USER_NAME);
        await loginPage.enterPassword('invalid_password');
        await loginPage.clickLogIn();
        await loginPage.alertListener();
        expect(alertMessage).toMatch('Wrong password.');
    });
    test('should not be able to login with empty username and password', async () => {
        await header.clickLogInButton();
        await loginPage.enterUsername('');
        await loginPage.enterPassword('');
        await loginPage.clickLogIn();
        await loginPage.alertListener();
        expect(alertMessage).toMatch('Please fill out Username and Password.');
    });
    test('should be possible to log out from Demo', async () => {
        await header.clickLogInButton();
        await loginPage.enterUsername(USER_NAME);
        await loginPage.enterPassword(PASSWORD);
        await loginPage.clickLogIn();
        await header.logout();
    });
});
//# sourceMappingURL=login.spec.js.map