import { Page } from '@playwright/test';

export async function clickSignUpLink(page: Page) {
  await page.getByRole('link', { name: 'Sign up' }).click();
}

export async function enterFirstName(page: Page, firstName: string) {
  await page.getByRole('textbox', { name: 'First name' }).fill(firstName);
}

export async function enterLastName(page: Page, lastName: string) {
  await page.getByRole('textbox', { name: 'Last name' }).fill(lastName);
}

export async function enterEmail(page: Page, email: string) {
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
}

export async function enterPassword(page: Page, password: string) {
  await page.locator('#password:visible').fill(password);
}

export async function enterConfirmPassword(page: Page, password: string) {
  await page.locator('#passwordConfirmation:visible').fill(password);
}

export async function checkAgreeToTerms(page: Page) {
  await page.getByRole('checkbox', { name: 'I agree to the Privacy Policy' }).check();
}

export async function clickCreateAccountButton(page: Page) {
  await page.getByRole('button', { name: 'Create Account' }).click();
}
