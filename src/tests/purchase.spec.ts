import { expect, test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { IProduct } from "../model/IProduct";
import { getProductsByCategory } from "../utils/parseProducts";
import { ProductCategory } from "../model/ProductCategory";
import { ProductPage } from "../pages/ProductPage";
import { Header } from "../pages/components/Header";
import { CartPage } from "../pages/CartPage";
import { IPlaceOrder } from "../model/IPlaceOrder";
import { purchaseDataGenerator } from "../utils/purchaseDataGenerator";

let header: Header;
let homePage: HomePage;
let productPage: ProductPage;
let cartPage: CartPage;

test.describe('Purchase in Demoblaze', () => {
    test.beforeEach(async ({page}) => {
       homePage = new HomePage(page);
       await homePage.goto();  
       header = new Header(page);     
    })

    test('should be able to add product to the cart', async () => {
       const monitor: IProduct = getProductsByCategory(ProductCategory.MONITORS)[0];
       await homePage.clickOnMonitorsCategory();
       productPage = await homePage.clickOnProduct(monitor.name); 
       expect(await productPage.getTitleName()).toEqual(monitor.name);
       expect(await productPage.getPriceText()).toEqual(monitor.price);
       await productPage.alertListener('Product added');
       await productPage.clickOnAddProduct();
    })

    
    test('should be able to place order', async () => {
       const placeOrder: IPlaceOrder = await purchaseDataGenerator();
       const monitor: IProduct = getProductsByCategory(ProductCategory.MONITORS)[0];
       await homePage.clickOnMonitorsCategory();
       productPage = await homePage.clickOnProduct(monitor.name); 
       await productPage.alertListener('Product added');
       await productPage.clickOnAddProduct();
       cartPage = await header.clickOnCart();
       expect(await cartPage.isProductVisibleByName(monitor.name)).toBeTruthy();
       await cartPage.clickOnPlaceOrder();
       expect(await cartPage.getPriceInPurchaseModal()).toEqual(monitor.price);
       await cartPage.fillOrderModal(placeOrder);
       await cartPage.clickOnPurchaseButton();
       await cartPage.clickOnOk();
       expect(await cartPage.isThankYouModalVisible()).toBeFalsy();;
    })

    test('should be able to delete product from the cart', async () => {
       const monitor: IProduct = getProductsByCategory(ProductCategory.MONITORS)[0];
       await homePage.clickOnMonitorsCategory();
       productPage = await homePage.clickOnProduct(monitor.name); 
       await productPage.alertListener('Product added');
       await productPage.clickOnAddProduct();
       cartPage = await header.clickOnCart();
       expect(await cartPage.isProductVisibleByName(monitor.name)).toBeTruthy();
       await cartPage.deleteProductFromCart(monitor.name);
       expect(await cartPage.isProductListEmpty()).toBeTruthy();
  })
})

