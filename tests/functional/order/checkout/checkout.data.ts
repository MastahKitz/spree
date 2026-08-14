export interface ShippingAddressData {
  country: string;
  address: string;
  city: string;
  state: string;
  stateAbbreviation: string;
  zip: string;
  phone: string;
}

export interface CardData {
  number: string;
  expiry: string;
  cvc: string;
  zip: string;
}

export const testShippingAddress: ShippingAddressData = {
  country: 'United States',
  address: '123 Market Street',
  city: 'San Francisco',
  state: 'California',
  stateAbbreviation: 'CA',
  zip: '94105',
  phone: '4155551234',
};

export const testCard: CardData = {
  number: '4242424242424242',
  expiry: '12/34',
  cvc: '123',
  zip: '94105',
};
