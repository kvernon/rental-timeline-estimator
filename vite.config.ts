import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { createHtmlPlugin } from 'vite-plugin-html';
import pkg from './package.json';

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    createHtmlPlugin({
      inject: {
        data: {
          appVersion: pkg.version,
        },
      },
    }),
    viteStaticCopy({
      targets: [
        { src: 'images/*', dest: './images' }, // relative to outDir
      ],
    }),
  ],
  build: {
    sourcemap: true,
    minify: 'esbuild',
  },
});
