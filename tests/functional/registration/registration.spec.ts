import { test } from '@playwright/test';
import { register } from './registration.flow';
import { getRegistrationData } from './registration.data';
import { assertLoggedIn } from '../auth/auth.assertions';
import { login } from '../auth/auth.flow';

test.describe.configure({ mode: 'serial' });

test.describe('registration', { tag: '@registration' }, () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  const newUserData = getRegistrationData();

  test('validate user can register a new account', async ({ page }) => {
    await register(page, newUserData);
    await assertLoggedIn(page, `${newUserData.firstName} ${newUserData.lastName}`, newUserData.email);
  });

  test('validate user can login using newly registered account', async ({ page }) => {
    await login(page, newUserData.email, newUserData.password);
    await assertLoggedIn(page, `${newUserData.firstName} ${newUserData.lastName}`, newUserData.email);
  });

});
