import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Point @color-tokens/core to the source entry point.
      // This lets the web example run without first building the core package.
      '@color-tokens/core': fileURLToPath(
        new URL('../../packages/color-tokens/src/index.ts', import.meta.url)
      ),
    },
  },
  optimizeDeps: {
    // Vite needs to know about JSX files inside the aliased source.
    include: ['@color-tokens/core'],
  },
});
