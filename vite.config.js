import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000', // без /api
      changeOrigin: true,
      secure: false,
    },
  },
},

  define: {
    'process.env': {},
  },
}));
