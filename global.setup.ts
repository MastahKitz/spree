import { chromium, devices } from '@playwright/test';
import { environment } from './tests/functional/config/environments';
import { login } from './tests/functional/auth/auth.flow';
import { clearCartIfNotEmpty } from './tests/functional/order/cart/carts.flow';

export default async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    ...devices['Desktop Chrome'],
    baseURL: environment.demo.baseUrl,
  });
  const page = await context.newPage();

  try {
    await login(page);
    await clearCartIfNotEmpty(page);
    await context.storageState({ path: 'auth.json' });
  } finally {
    await context.close();
    await browser.close();
  }
}