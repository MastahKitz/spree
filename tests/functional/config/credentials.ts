export interface UserCredentials {
  email: string;
  password: string;
  name?: string;
}

// to do: migrate to jenkins or github actions, please use your own credentials here for local run

export const credentials = {
  registeredUser: {
    email: 'mastahkitz@gmail.com',
    password: 'Test123',
    name: 'kitz wang',
  } as UserCredentials,
};
