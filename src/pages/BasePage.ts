import { expect, Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }  
    
    async goto() {
        await this.page.goto('/index.html');
    }

    async alertListener(errorMessage: string) {
        this.page.on('dialog', async (dialog) => {
           const message = dialog.message();
           expect(message).toEqual(errorMessage);
           await dialog.accept();
         })
    }    
}