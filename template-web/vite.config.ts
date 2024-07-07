import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        changeOrigin: true,
        secure: false,
        target: 'http://localhost:3000',

        rewrite: (path) => path.replace('/api/', ''),
      },
    },
  },
});
