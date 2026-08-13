import { Page, expect } from '@playwright/test';

export async function assertLoginForm(page: Page) {
  await expect.soft(page.getByRole('main').getByText('My Account', { exact: true })).toBeVisible();
  await expect.soft(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
  await expect.soft(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
  await expect.soft(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
}

export async function assertLoggedIn(page: Page, name: string, email: string) {
  await expect.soft(page.getByRole('heading', { name: 'Account Overview' })).toBeVisible();
  await expect.soft(page.getByText(name, { exact: true })).toBeVisible();
  await expect.soft(page.getByText(email, { exact: true })).toBeVisible();
  await expect.soft(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
}

export async function assertLoginError(page: Page) {
  await expect.soft(page.getByText(/invalid email or password/i)).toBeVisible();
}
