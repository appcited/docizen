import { defineCollection, z, type CollectionConfig } from "astro:content";
import { glob } from 'astro/loaders';
import { getConfig } from "./config";

const config = await getConfig();

const collections = config.content.reduce((acc: { [key: string]: CollectionConfig<any> }, content) => {
  acc[content.name] = defineCollection({
    loader: glob({ pattern: `**/*.(md|mdx)`, base: `file://${import.meta.env.PUBLIC_USER_ROOT}` }),
    schema: z.object({
      layout: z.string().default("./src/layouts/Layout.astro"),
    }),
  });
  return acc;
}, {});

export {
  collections
}