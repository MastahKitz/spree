export interface UserCredentials {
  email: string;
  password: string;
  name: string;
}

export const credentials = {
  registeredUser: {
    email: process.env.QA_EMAIL || 'mastahkitz@gmail.com',
    password: process.env.QA_PASSWORD || 'Test123',
    name: process.env.QA_NAME || 'kitz wang',
  } as UserCredentials,
};
