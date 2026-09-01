import { test } from '@playwright/test';
import { openHomePage } from '../../auth/auth.actions';
import { automaticEspressoMachine } from '../../product/product.data';
import { addProductToCart } from '../cart/carts.flow';
import { checkoutCart } from './checkout.flow';
import { assertOrderConfirmation } from './checkout.assertions';
import { testShippingAddress } from './checkout.data';

test.describe('checkout', { tag: '@checkout' }, () => {

  test('validate user can checkout a product successfully', async ({ page }) => {
    await openHomePage(page);
    await addProductToCart(page, automaticEspressoMachine);
    await checkoutCart(page);
    await assertOrderConfirmation(page, {
      items: [{ product: automaticEspressoMachine, quantity: 1 }],
      shippingAddress: testShippingAddress,
    });
  });

});
