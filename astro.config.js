import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import icons from 'unplugin-icons/vite'
import autoImport from 'astro-auto-import';
import expressiveCode from 'astro-expressive-code';
import pagefind from "astro-pagefind";

export default defineConfig({
  site: "https://animated-goggles-qzngnej.pages.github.io",
  trailingSlash: "never",
  build: {
    format: "preserve"
  },
  redirects: {
    "/": "/readme",
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
  experimental: {
    svg: true,
  },
  vite: {
    plugins: [
      tailwindcss(),
      icons({
        compiler: 'vue3',
      }),
    ]
  }
});