import { Page } from '@playwright/test';
import * as productActions from './product.actions';
import { ProductData } from './product.data';

export async function viewProductDetailsViaAllProducts(page: Page, product: ProductData) {
  await productActions.clickAllProductsLink(page);
  await productActions.clickProduct(page, product.name);
}

export async function viewProductDetailsViaCategoryMenu(page: Page, product: ProductData) {
  await productActions.clickOpenMenuButton(page);
  await productActions.clickCategoryMenuItem(page, product.category);
  await productActions.clickSubcategoryMenuItem(page, product.subcategory);
  await productActions.clickProduct(page, product.name);
}
