import { createModuleFederationConfig } from '@module-federation/modern-js-v3';

export default createModuleFederationConfig({
  name: 'product',
  filename: 'remoteEntry.js',
  exposes: {
    './ProductCard': './src/components/ProductCard.tsx',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
});
