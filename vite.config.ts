import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Keep the bundle out of /assets/ — that path belongs to the site's own
    // photo/PDF content (public/assets/**), referenced by relative paths in
    // the JSON files and the hard-coded og:image tag.
    assetsDir: 'app',
  },
});
