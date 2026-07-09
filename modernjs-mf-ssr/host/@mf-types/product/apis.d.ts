
    export type RemoteKeys = 'product/ProductCard' | 'product/ProductCard.data';
    type PackageType<T> = T extends 'product/ProductCard.data' ? typeof import('product/ProductCard.data') :T extends 'product/ProductCard' ? typeof import('product/ProductCard') :any;