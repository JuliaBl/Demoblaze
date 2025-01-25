import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { IPlaceOrder } from "../model/IPlaceOrder";

export class CartPage extends BasePage {

    private readonly productsTable: Locator; 
    private readonly productList: Locator;
    private readonly placeOrderButton: Locator;
    private readonly modalPlaceOrder: Locator;
    private readonly nameInput: Locator;
    private readonly cityInput: Locator;
    private readonly countryInput: Locator;
    private readonly creditCardInput: Locator;
    private readonly monthInput: Locator;
    private readonly yearInput: Locator;
    private readonly purchaseButton: Locator;
    private readonly totalPrice: Locator;
    private readonly modalThankYou: Locator;
    private readonly okButton: Locator;


    constructor(page: Page) {
        super(page);
        this.productsTable = page.locator('.table');
        this.productList = this.productsTable.locator("#tbodyid tr");
        this.placeOrderButton = page.getByRole('button', {name: "Place Order"});
        this.modalPlaceOrder = page.locator('div#orderModal  .modal-content');

        this.nameInput = page.locator('[id="name"]');
        this.cityInput = page.locator('[id="city"]');
        this.countryInput = page.locator('[id="country"]');
        this.creditCardInput = page.locator('[id="card"]');
        this.monthInput = page.locator('[id="month"]');
        this.yearInput = page.locator('[id="year"]');
        this.purchaseButton = page.getByRole('button', { name: "Purchase" });
        this.totalPrice = page.locator('[id="totalm"]');
        this.modalThankYou = page.locator('.showSweetAlert.sweet-alert.visible');
        this.okButton = page.getByRole('button', {name: "OK"})
    }

    async clickOnPurchaseButton() {
        await this.purchaseButton.waitFor({ state: "visible", timeout: 3000 });
        await this.purchaseButton.click();
    }

    async deleteProductFromCart(productName: string) {
        await this.productList.waitFor({ state: "visible", timeout: 3000 });
        const productRows: Locator[] = await this.productList.all();
        const productToDelete: Locator =  productRows.find(el => el.locator('style', {hasText: `${productName}`}));
        await productToDelete.getByRole('link', {name: "Delete"}).waitFor({ state: "visible", timeout: 3000 }) 
        await productToDelete.getByRole('link', {name: "Delete"}).click();
    }
    
    async isProductListEmpty(): Promise<boolean> {
        await this.productList.waitFor({ state: "hidden", timeout: 3000 });
        const isProductListVisible =  await this.productList.isVisible();
        return !isProductListVisible;
    }

    async isProductVisibleByName(productName: string): Promise<boolean> {
        await this.productList.waitFor({ state: "visible", timeout: 7000 });
        const productRows: Locator[] = await this.productList.all();
        const product: Locator =  productRows.find(el => el.locator('style', {hasText: `${productName}`})); 
        const isProductVisible = await product.isVisible();
        return isProductVisible;  
    }

    async clickOnPlaceOrder() {
        await this.placeOrderButton.waitFor({ state: "visible", timeout: 3000 });
        await this.placeOrderButton.click();
        await this.modalPlaceOrder.waitFor({ state: "visible", timeout: 3000 });
    }

    async getPriceInPurchaseModal(): Promise<string> {
        await this.modalPlaceOrder.waitFor({ state: "visible", timeout: 3000 });
        const priceInModal = await this.totalPrice.textContent();
        const price = priceInModal!.replace("Total: ", "");
        return price;
    }

    async fillOrderModal(placeOrder: IPlaceOrder) {
        await this.modalPlaceOrder.waitFor();
        await this.nameInput.fill(placeOrder.name);
        await this.countryInput.fill(placeOrder.country);
        await this.cityInput.fill(placeOrder.city);
        await this.creditCardInput.fill(placeOrder.creditCardNumber);
        await this.monthInput.fill(placeOrder.month);
        await this.yearInput.fill(placeOrder.year);
      }
      
    async isThankYouModalVisible() {
        const isModalVisible = await this.modalThankYou.isVisible();
        return isModalVisible; 
    } 
    
    async clickOnOk() {
        await this.okButton.waitFor({ state: "visible", timeout: 3000 });
        await this.okButton.click();
    }
}