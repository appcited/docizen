import { defineCollection, z } from "astro:content";
import { glob } from 'astro/loaders';
import { env } from 'process';
import { cwd } from "process";


const contentBase = `file://${env.DOCIZEN_ROOT}/docs`
console.log(`glob`, contentBase)

const docs = defineCollection({
  loader: glob({ pattern: `**/*.mdx`, base: contentBase }),
  schema: z.object({
    layout: z.string().default("./src/layouts/Layout.astro"),
  }),
});

export const collections = {
  docs,
};
