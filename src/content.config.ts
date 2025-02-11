import { defineCollection, z } from "astro:content";
import { glob } from 'astro/loaders';
import { env } from 'process';

const contentBase = `file://${env.PUBLIC_USER_ROOT}`

const root = defineCollection({
  loader: glob({ pattern: `**/*.md[x]`, base: contentBase }),
  schema: z.object({
    layout: z.string().default("./src/layouts/Layout.astro"),
  }),
});

export const collections = {
  root,
};
