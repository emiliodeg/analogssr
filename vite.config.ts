/// <reference types="vitest" />
import devtoolsJson from 'vite-plugin-devtools-json';
import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module', 'browser'],
  },
  optimizeDeps: {
    include: ['@supabase/supabase-js', '@supabase/ssr']
  },
  plugins: [
    analog(),
    tailwindcss(),
    devtoolsJson()
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
