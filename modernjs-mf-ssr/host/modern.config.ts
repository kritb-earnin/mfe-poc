import { appTools, defineConfig } from '@modern-js/app-tools';
import { moduleFederationPlugin } from '@module-federation/modern-js-v3';

export default defineConfig({
  server: {
    ssr: { mode: 'stream' },
    port: 3020,
  },
  plugins: [appTools(), moduleFederationPlugin()],
});
