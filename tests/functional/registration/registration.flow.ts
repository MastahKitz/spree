import { Page } from '@playwright/test';
import { openHomePage, clickAccountLink } from '../auth/auth.actions';
import * as registrationActions from './registration.actions';
import { RegistrationData } from './registration.data';

export async function register(page: Page, data: RegistrationData) {
  await openHomePage(page);
  await clickAccountLink(page);
  await registrationActions.clickSignUpLink(page);
  await registrationActions.enterFirstName(page, data.firstName);
  await registrationActions.enterLastName(page, data.lastName);
  await registrationActions.enterEmail(page, data.email);
  await registrationActions.enterPassword(page, data.password);
  await registrationActions.enterConfirmPassword(page, data.password);
  await registrationActions.checkAgreeToTerms(page);
  await registrationActions.clickCreateAccountButton(page);
  await page.getByRole('button', { name: 'Sign Out' }).waitFor({ state: 'visible', timeout: 15000 });
}
