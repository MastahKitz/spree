import { Page } from '@playwright/test';
import * as cartActions from '../cart/cart.actions';
import * as checkoutActions from './checkout.actions';
import { ShippingAddressData, CardData, testShippingAddress, testCard } from './checkout.data';

export async function checkoutCart(
  page: Page,
  address: ShippingAddressData = testShippingAddress,
  card: CardData = testCard,
) {
  await cartActions.clickViewCartLink(page);
  await checkoutActions.clickProceedToCheckoutLink(page);
  await checkoutActions.selectUseDifferentShippingAddress(page);
  await checkoutActions.fillShippingAddress(page, address);
  await checkoutActions.fillCardDetails(page, card);
  await checkoutActions.clickPayNowButton(page);
}
