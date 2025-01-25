import { BasePage } from "./BasePage";
import { Locator, Page } from "@playwright/test";

export class ProductPage extends BasePage {

    private readonly titleName: Locator;
    private readonly productPrice: Locator;
    private readonly addToCartButton: Locator;

    constructor(page: Page) {
        super(page);
        this.titleName = page.locator('h2.name');
        this.productPrice = page.locator('h3.price-container');
        this.addToCartButton = page.getByRole('link', {name: 'Add to cart'});
    }

    async getTitleName(): Promise<string> {
        await this.titleName.waitFor({ state: "visible", timeout: 3000 });
        const titleProduct = await this.titleName.textContent();
        return titleProduct;
    }

    async getPriceText(): Promise<string> {
        await this.productPrice.waitFor({ state: "visible", timeout: 3000 });
        const prodPrice = await this.productPrice.textContent();
        const price = prodPrice.match(/\$([\d,]+)/);
        if (!price) {
          throw new Error("No price match found in the string.");
        }
        return price[1];
    }

    async clickOnAddProduct() {
        await this.addToCartButton.waitFor({ state: "visible", timeout: 5000 });
        await this.addToCartButton.click();
    }
}