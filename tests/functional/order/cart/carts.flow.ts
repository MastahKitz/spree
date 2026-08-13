import { Page } from '@playwright/test';
import { viewProductDetailsViaAllProducts } from '../../product/product.flow';
import { ProductData } from '../../product/product.data';
import * as cartActions from './cart.actions';

export async function addProductToCart(page: Page, product: ProductData) {
  await viewProductDetailsViaAllProducts(page, product);
  await cartActions.clickAddToCartButton(page);
}

export async function viewCartDetails(page: Page) {
  await cartActions.clickViewCartLink(page);
}

async function viewCartDetailsFromHomePage(page: Page) {
  await cartActions.clickOpenCartButton(page);
  await cartActions.clickViewCartLink(page);
}

export async function viewCartDetailsAndIncreaseProductQuantity(page: Page, productName: string) {
  await viewCartDetailsFromHomePage(page);
  await cartActions.clickIncreaseQuantityButton(page, productName);
}

export async function viewCartDetailsAndDecreaseProductQuantity(page: Page, productName: string) {
  await viewCartDetailsFromHomePage(page);
  await cartActions.clickDecreaseQuantityButton(page, productName);
}

export async function viewCartDetailsAndRemoveProduct(page: Page, productName: string) {
  await viewCartDetailsFromHomePage(page);
  await cartActions.clickRemoveItemButton(page, productName);
}
