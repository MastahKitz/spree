import { Page } from '@playwright/test';
import * as authActions from './auth.actions';

export async function login(page: Page, email: string, password: string) {
  await authActions.openHomePage(page);
  await authActions.clickAccountLink(page);
  await authActions.enterEmail(page, email);
  await authActions.enterPassword(page, password);
  await authActions.clickSignInButton(page);
  await page.getByRole('button', { name: 'Sign Out' }).waitFor({ state: 'visible', timeout: 10000 });
}

export async function logout(page: Page) {
  await authActions.clickSignOutButton(page);
}
