import { z } from "zod";
import { mergeDeepLeft } from "ramda"

const Config = z.object({
  _docizenRoot: z.string().url(),
  _userRoot: z.string().url(),
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
  _docizenRoot: import.meta.env.PUBLIC_DOCIZEN_ROOT,
  _userRoot: import.meta.env.PUBLIC_USER_ROOT,
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
  const userConfigFile = await import(`file://${import.meta.env.PUBLIC_USER_ROOT}\\.docizen\\config.mjs`)
  const mergedConfig = mergeDeepLeft(userConfigFile.default, defaultConfig());
  return Config.parse(mergedConfig);
};
