import { test } from '@playwright/test';
import { viewAllProducts } from './product.flow';
import { assertProductListPage, assertProductInList } from './product.assertions';
import { automaticEspressoMachine, TOTAL_PRODUCTS_COUNT } from './product.data';
import { openHomePage } from '../auth/auth.actions';

test.describe('product list', { tag: '@product' }, () => {

  test('validate user can view all products page', async ({ page }) => {
    await openHomePage(page);
    await viewAllProducts(page);
    await assertProductListPage(page, TOTAL_PRODUCTS_COUNT);
    await assertProductInList(page, automaticEspressoMachine);
  });

});
