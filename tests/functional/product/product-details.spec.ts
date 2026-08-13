import { test } from '@playwright/test';
import { viewProductDetailsViaAllProducts, viewProductDetailsViaCategoryMenu } from './product.flow';
import { assertProductDetails } from './product.assertions';
import { automaticEspressoMachine } from './product.data';
import { openHomePage } from '../auth/auth.actions';

test.describe('product details', { tag: '@product' }, () => {

  test('validate user can view product details via All Products in left navigation', async ({ page }) => {
    await openHomePage(page);
    await viewProductDetailsViaAllProducts(page, automaticEspressoMachine);
    await assertProductDetails(page, automaticEspressoMachine);
  });

  test('validate user can view product details via category menu in left navigation', async ({ page }) => {
    await openHomePage(page);
    await viewProductDetailsViaCategoryMenu(page, automaticEspressoMachine);
    await assertProductDetails(page, automaticEspressoMachine);
  });

});
