import type { DataFetchParams } from '@module-federation/modern-js-v3/react';

export type ProductData = {
  products: { name: string; price: number }[];
};

export const fetchData = async (
  _params: DataFetchParams
): Promise<ProductData> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    products: [
      { name: 'Trail Running Shoes', price: 129.99 },
      { name: 'Insulated Water Bottle', price: 34.5 },
      { name: 'Daypack 24L', price: 89.0 },
    ],
  };
};
