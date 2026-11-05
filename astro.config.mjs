// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: 'https://growthindonesia.my.id',
  output: 'server',
  adapter: cloudflare({
    imageService: 'passthrough',
    platformProxy: {
      enabled: true,
      configPath: './wrangler.jsonc',
    },
  }),
  integrations: [
    react(),
    mdx(),
  ],
  image: {
    domains: [
      'growthindonesia.my.id',
      'picsum.photos',
      'images.unsplash.com',
    ],
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
    resolve: {
      alias: [
        { find: /^@\/layouts\/(.*)/, replacement: path.resolve(__dirname, './src/layouts/$1') },
        { find: /^@\/styles\/(.*)/, replacement: path.resolve(__dirname, './src/styles/$1') },
        { find: '@', replacement: path.resolve(__dirname, './') },
      ],
    },
    ssr: {
      noExternal: ['motion', 'lucide-react'],
      external: ['node:test', 'node:assert/strict'],
    },
  },
});
