import type { DataFetchParams } from '@module-federation/modern-js-v3/react';
export type ProductData = {
    products: {
        name: string;
        price: number;
    }[];
};
export declare const fetchData: (_params: DataFetchParams) => Promise<ProductData>;
