import { BasePage } from "./BasePage";
import { Locator, Page } from "@playwright/test";
import { ProductPage } from "./ProductPage";

export class HomePage extends BasePage {

    private readonly categoryList: Locator;
    private readonly phonesCategory: Locator;
    private readonly laptopsCategory: Locator;
    private readonly monitorsCategory: Locator;
    private readonly productCardList: Locator;
    private cardProductName;

    constructor(page: Page) {
        super(page);
        this.categoryList = page.locator('[class="list-group"]');
        this.phonesCategory = page.getByRole('link', { name: 'Phones' });
        this.laptopsCategory = page.getByRole('link', { name: 'Laptops' });
        this.monitorsCategory = page.locator('.list-group-item', {hasText: "Monitors"}) //this.categoryList.getByRole('link', { name: 'Monitors' });
        this.productCardList = page.locator('div#tbodyid > div');
    }

    async clickOnPhonesCategory() {
        await this.phonesCategory.waitFor({ state: "visible", timeout: 3000 });
        await this.phonesCategory.click();
    }

    async clickOnLaptopsCategory() {
        await this.laptopsCategory.waitFor({ state: "visible", timeout: 3000 });
        await this.laptopsCategory.click();
    }

    async clickOnMonitorsCategory() {
        await this.monitorsCategory.waitFor({ state: "visible", timeout: 3000 });
        await this.monitorsCategory.click();
    }

    async clickOnProduct(name: string): Promise<ProductPage> {
        this.cardProductName = this.page.getByRole('link', {name: `${name}` });
        await this.cardProductName.click();
        return new ProductPage(this.page);
    }
}