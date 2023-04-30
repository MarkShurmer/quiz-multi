import { defineConfig, coverageConfigDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './setup/setup-tests.ts',
    coverage: {
      ...coverageConfigDefaults,
      provider: 'c8',
      all: true,
      exclude: ['src/main.tsx', '**/*.d.ts', 'vite.*.ts', '*.cjs', '**/*.test.ts?'],
    },
  },
});
