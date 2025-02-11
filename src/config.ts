import { z } from "zod";
import { mergeDeepLeft } from "ramda"

const Config = z.object({
  name: z.string(),
});

export type Config = z.infer<typeof Config>;

export const defaultConfig = () => ({
  name: "Docizen",
} satisfies Partial<Config>);

export const getConfig = async () => {
  const userConfig = (await import(/* @vite-ignore */ `file://${import.meta.env.PUBLIC_DOCIZEN_ROOT}\\.docizen\\config.js`)).default;
  const mergedConfig = mergeDeepLeft(userConfig, defaultConfig());
  return Config.parse(mergedConfig);
};
