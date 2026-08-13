import { test } from '@playwright/test';
import { openHomePage } from '../../auth/auth.actions';
import { automaticEspressoMachine } from '../../product/product.data';
import {
  addProductToCart,
  viewCartDetails,
  viewCartDetailsAndIncreaseProductQuantity,
  viewCartDetailsAndDecreaseProductQuantity,
  viewCartDetailsAndRemoveProduct,
} from './carts.flow';
import { assertCartDetails, assertCartIsEmpty } from './cart.assertions';

test.describe.configure({ mode: 'serial' });

test.describe('cart', { tag: '@cart' }, () => {

  test('validate user can add a product to the cart', async ({ page }) => {
    await openHomePage(page);
    await addProductToCart(page, automaticEspressoMachine);
    await viewCartDetails(page);
    await assertCartDetails(page, { items: [{ product: automaticEspressoMachine, quantity: 1 }] });
  });

  test('validate user can increase product quantity in the cart', async ({ page }) => {
    await openHomePage(page);
    await viewCartDetailsAndIncreaseProductQuantity(page, automaticEspressoMachine.name);
    await assertCartDetails(page, { items: [{ product: automaticEspressoMachine, quantity: 2 }] });
  });

  test('validate user can decrease product quantity in the cart', async ({ page }) => {
    await openHomePage(page);
    await viewCartDetailsAndDecreaseProductQuantity(page, automaticEspressoMachine.name);
    await assertCartDetails(page, { items: [{ product: automaticEspressoMachine, quantity: 1 }] });
  });

  test('validate user can remove product from the cart', async ({ page }) => {
    await openHomePage(page);
    await viewCartDetailsAndRemoveProduct(page, automaticEspressoMachine.name);
    await assertCartIsEmpty(page);
  });

});
