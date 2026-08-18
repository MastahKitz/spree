export interface EnvironmentConfig {
  baseUrl: string;
}

const environments: Record<string, EnvironmentConfig> = {
  demo: {
    baseUrl: 'https://demo.spreecommerce.org/',
  },
  // Add more environments here, e.g.:
  // staging: { baseUrl: 'https://staging.spreecommerce.org/' },
};

const envName = process.env.QA_ENV || 'demo';

export const environment = environments[envName];
