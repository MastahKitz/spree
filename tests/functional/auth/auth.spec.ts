import { test } from '@playwright/test';
import { login, logout } from './auth.flow';
import { credentials } from '../config/credentials';
import { assertLoggedIn, assertLoginForm } from './auth.assertions';

test.describe('auth', { tag: '@auth' }, () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('validate user can login with valid credentials', async ({ page }) => {
    await login(page);
    await assertLoggedIn(page, credentials.registeredUser.name!, credentials.registeredUser.email);
  });

  test('validate user can logout', async ({ page }) => {
    await login(page);
    await logout(page);
    await assertLoginForm(page);
  });

});
