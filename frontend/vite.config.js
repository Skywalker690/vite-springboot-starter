import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        // Forward /api and /actuator to Spring Boot during development (no CORS needed)
        '/api': env.VITE_PROXY_TARGET || 'http://localhost:8080',
        '/actuator': env.VITE_PROXY_TARGET || 'http://localhost:8080',
      },
    },
  };
});
