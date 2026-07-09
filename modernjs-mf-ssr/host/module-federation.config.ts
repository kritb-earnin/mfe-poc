import { createModuleFederationConfig } from '@module-federation/modern-js-v3';

export default createModuleFederationConfig({
  name: 'host',
  remotes: {
    promo: 'promo@http://localhost:3021/mf-manifest.json',
    product: 'product@http://localhost:3022/mf-manifest.json',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
});
