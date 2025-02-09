import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import icons from 'unplugin-icons/vite'
import autoImport from 'astro-auto-import';
import expressiveCode from 'astro-expressive-code';
import pagefind from "astro-pagefind";

export default defineConfig({
  build: {
    format: "file",
  },
  site: "https://animated-goggles-qzngnej.pages.github.io",
  trailingSlash: "never",
  build: {
    format: "preserve"
  },
  redirects: {
    "/": "/einleitung/willkommen",
  },
  integrations: [
    expressiveCode(),
    autoImport({
      imports: [
        './src/components/Aside.astro',
        './src/components/Icon.astro',
      ],
    }),
    mdx(),
    vue(),
    pagefind()
  ],
  vite: {
    plugins: [
      tailwindcss(),
      icons({
        compiler: 'vue3',
      }),
    ]
  }
});