import { Page } from '@playwright/test';
import * as productActions from './product.actions';

export async function viewProductDetailsViaAllProducts(page: Page, productName: string) {
  await productActions.clickAllProductsLink(page);
  await productActions.clickProduct(page, productName);
}
