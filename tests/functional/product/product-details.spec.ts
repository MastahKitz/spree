import { test } from '@playwright/test';
import { viewProductDetailsViaAllProducts } from './product.flow';
import { assertProductDetails } from './product.assertions';
import { automaticEspressoMachine } from './product.data';
import { openHomePage } from '../auth/auth.actions';

// Uses the default storageState (auth.json from global setup) — already
// logged in as the registered user, so no explicit login step is needed.
test.describe('product details', { tag: '@product' }, () => {

  test('validate user can view product details via All Products', async ({ page }) => {
    await openHomePage(page);
    await viewProductDetailsViaAllProducts(page, automaticEspressoMachine.name);
    await assertProductDetails(page, automaticEspressoMachine);
  });

});
