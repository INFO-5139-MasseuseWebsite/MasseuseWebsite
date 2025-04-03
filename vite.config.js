import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',       // or use '0.0.0.0' for external devices
    port: 5173,
    strictPort: true,        // if port 5173 is in use, don't auto-switch
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
    },
  },
});
