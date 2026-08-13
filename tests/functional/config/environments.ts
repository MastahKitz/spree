export interface EnvironmentConfig {
  baseUrl: string;
}

// Target under test. Defaults to the public Spree demo storefront, but can be
// pointed elsewhere via QA_BASE_URL.
const DEFAULT_BASE_URL = 'https://demo.spreecommerce.org/';

export const environment = {
  demo: {
    baseUrl: process.env.QA_BASE_URL || DEFAULT_BASE_URL,
  } as EnvironmentConfig,
};
