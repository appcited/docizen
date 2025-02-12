import { z } from "zod";
import { mergeDeepLeft } from "ramda"

const Config = z.object({
  name: z.string(),
  icon: z.string().url(),
  content: z.array(z.object({
    name: z.string(),
    basePath: z.string(),
  })),
  links: z.array(z.string()),
});

export type Config = z.infer<typeof Config>;

export const defaultConfig = () => ({
  name: "Docizen",
  icon: `${import.meta.env.PUBLIC_DOCIZEN_ROOT}\\src\\assets\\icon.svg`,
  content: [
    {
      name: "root",
      basePath: ".",
    },
  ],
  links: [],
} satisfies Partial<Config>);

export const getConfig = async () => {
  const userConfig = (await import(/* @vite-ignore */ `file://${import.meta.env.PUBLIC_USER_ROOT}\\.docizen\\config.mjs`)).default;
  const mergedConfig = mergeDeepLeft(userConfig, defaultConfig());
  return Config.parse(mergedConfig);
};
