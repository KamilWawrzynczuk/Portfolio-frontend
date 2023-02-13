import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': {},
  },
  plugins: [react()],
  // proxy: {
  //   '/trunk': {
  //     target: 'http://localhost:8080',
  //     changeOrigin: true,
  //   },
  // },
});
