import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/

// @ts-ignore
const root = resolve(__dirname, 'src');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias:
    {
      'Assets': resolve(root, 'Assets'),
      'Components': resolve(root, 'Components'),
      'Layout': resolve(root, 'Layout'),
      'MenuItems': resolve(root, 'MenuItems'),
      'Modules': resolve(root, 'Modules'),
      'Services': resolve(root, 'Services'),
      'Themes': resolve(root, 'Themes'),
    },
  },
});
