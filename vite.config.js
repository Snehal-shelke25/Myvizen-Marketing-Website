import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    // No /admin proxy here on purpose.
    //
    // The React app owns the /admin/* URLs (/admin, /admin/login,
    // /admin/coaches ...). Proxying them sent the browser's request for the
    // PAGE to the backend, which answered 405 Method Not Allowed for a GET on
    // /admin/login — so refreshing any admin page showed raw JSON.
    //
    // The app talks to the API by absolute URL (VITE_API_BASE), and the API
    // already allows http://localhost:3000 via CORS, so no proxy is needed.
  },
});
