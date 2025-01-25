import { test, expect } from "@playwright/test";
import { LoginPage } from '../pages/LoginPage';
import { Header } from "../pages/components/Header";
const { USER_NAME, PASSWORD } = process.env

let header: Header;
let loginPage: LoginPage;

test.describe('Login/Logout to Demoblaze', () => {
    test.beforeEach(async ({page}) => {
       header = new Header(page);
       loginPage = new LoginPage(page);
       await loginPage.goto();  
    })

    test('should be able to successfully login', async () => {
      await header.clickLogInButton();
      await loginPage.enterUsername(USER_NAME);
      await loginPage.enterPassword(PASSWORD);
      await loginPage.clickLogIn();
      expect(await loginPage.isLoginModalWindowVisible()).toBeFalsy();
      const welcomeText = await header.getWelcomeUserText();
      expect(welcomeText).toEqual(`Welcome ${USER_NAME}`);
    })

    test('should not be able to login with wrong username', async () => {
      await header.clickLogInButton();
      await loginPage.enterUsername('mess');
      await loginPage.enterPassword(PASSWORD);
      await loginPage.alertListener('User does not exist.');
      await loginPage.clickLogIn();
    })

    test('should not be able to login with wrong password', async () => {
      await header.clickLogInButton();
      await loginPage.enterUsername(USER_NAME);
      await loginPage.enterPassword('invalid_password');
      await loginPage.alertListener('Wrong password.');
      await loginPage.clickLogIn();
    })

    test('should not be able to login with empty username and password', async () => {
      await header.clickLogInButton();
      await loginPage.enterUsername('');
      await loginPage.enterPassword('');
      await loginPage.alertListener('Please fill out Username and Password.');
      await loginPage.clickLogIn();
    })
    
    test('should be possible to close modal window login', async () => {
      await header.clickLogInButton();
      await loginPage.clickClose();
      expect(await loginPage.isLoginModalWindowVisible()).toBeFalsy();
    })

    test('should be possible to log out from Demoblaze', async () => {
      await header.clickLogInButton();
      await loginPage.enterUsername(USER_NAME);
      await loginPage.enterPassword(PASSWORD);
      await loginPage.clickLogIn();
      await header.logout();
      expect(await header.isLogInLinkVisible()).toBeTruthy();
  })  
})

