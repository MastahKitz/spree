import { test } from '@playwright/test';
import { login } from './auth.flow';
import { credentials } from '../config/credentials';
import { assertLoginError } from './auth.assertions';

test.describe('auth - errors', { tag: '@auth' }, () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('validate user cannot login with invalid credentials', async ({ page }) => {
    await login(page, credentials.registeredUser.email, 'WrongPassword123');
    await assertLoginError(page);
  });
});
