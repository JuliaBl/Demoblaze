export class BasePage {
    constructor(page) {
        this.page = page;
    }
    async goto() {
        await this.page.goto('/index.html');
    }
}
//# sourceMappingURL=BasePage.js.map