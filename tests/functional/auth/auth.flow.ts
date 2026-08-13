import { Page } from '@playwright/test';
import * as authActions from './auth.actions';
import { credentials } from '../config/credentials';

export async function login(
  page: Page,
  email: string = credentials.registeredUser.email,
  password: string = credentials.registeredUser.password,
) {
  await authActions.openHomePage(page);
  await authActions.clickAccountLink(page);
  await authActions.enterEmail(page, email);
  await authActions.enterPassword(page, password);
  await authActions.clickSignInButton(page);
  await Promise.race([
    page.getByRole('button', { name: 'Sign Out' }).waitFor({ state: 'visible', timeout: 15000 }),
    page.getByText(/invalid email or password/i).waitFor({ state: 'visible', timeout: 15000 }),
  ]).catch(() => {});
}

export async function logout(page: Page) {
  await authActions.clickSignOutButton(page);
}
