import { generateUniqueId } from '../utils/data.utils';

export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

/**
 * Regenerates registration data with a unique email for each test execution,
 * since the storefront rejects registering an already-used email.
 */
export function getRegistrationData(): RegistrationData {
  return {
    firstName: 'test',
    lastName: 'automation',
    email: `test.${generateUniqueId()}@automation.com`,
    password: 'Test123',
  };
}
