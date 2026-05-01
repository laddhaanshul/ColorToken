import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Point @laddhaanshul/color-tokens to the source entry point.
      // This lets the web example run without first building the core package.
      '@laddhaanshul/color-tokens': fileURLToPath(
        new URL('../../packages/color-tokens/src/index.ts', import.meta.url)
      ),
    },
  },
  optimizeDeps: {
    // Vite needs to know about JSX files inside the aliased source.
    include: ['@laddhaanshul/color-tokens'],
  },
});
