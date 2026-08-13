export interface ProductData {
  name: string;
  price: string;
  description: string;
  properties: {
    warranty: string;
    wattage: string;
    voltage: string;
  };
  details: {
    sku: string;
    options: string;
  };
}

export const automaticEspressoMachine: ProductData = {
  name: 'Automatic Espresso Machine',
  price: '$879.99',
  description:
    'Fully automatic bean-to-cup espresso machine with ceramic grinder, 15-bar pressure system, and intuitive touch display. Delivers barista-quality espresso, cappuccino, and latte at the touch of a button.',
  properties: {
    warranty: '2 Years',
    wattage: '1400W',
    voltage: '220-240V',
  },
  details: {
    sku: 'AUTOMATIC-ESPRESSO-MACHINE-MATTE-BLACK',
    options: 'Color: Matte Black',
  },
};
