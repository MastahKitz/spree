export interface UserCredentials {
  email: string;
  password: string;
  name: string;
}

// Credentials come from environment variables — set locally via .env (see
// .env.example) or from GitHub Actions secrets in CI. No real values here.

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing ${name}. Copy .env.example to .env and fill in real values.`
    );
  }
  return value;
}

export const credentials = {
  registeredUser: {
    email: requireEnv('QA_EMAIL'),
    password: requireEnv('QA_PASSWORD'),
    name: requireEnv('QA_NAME'),
  } as UserCredentials,
};
