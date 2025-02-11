import { z } from "zod";
import { mergeDeepLeft } from "ramda"

const Config = z.object({
  name: z.string(),
  content: z.array(z.object({
    name: z.string(),
    basePath: z.string(),
  }))
});

export type Config = z.infer<typeof Config>;

export const defaultConfig = () => ({
  name: "Docizen",
  content: [
    {
      name: "root",
      basePath: ".",
    },
  ],
} satisfies Partial<Config>);

export const getConfig = async () => {
  const userConfig = (await import(/* @vite-ignore */ `file://${import.meta.env.PUBLIC_USER_ROOT}\\.docizen\\config.mjs`)).default;
  const mergedConfig = mergeDeepLeft(userConfig, defaultConfig());
  return Config.parse(mergedConfig);
};
