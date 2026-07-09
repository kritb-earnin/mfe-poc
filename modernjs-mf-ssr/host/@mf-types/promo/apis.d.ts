
    export type RemoteKeys = 'promo/PromoBanner';
    type PackageType<T> = T extends 'promo/PromoBanner' ? typeof import('promo/PromoBanner') :any;