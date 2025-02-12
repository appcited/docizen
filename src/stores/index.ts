import { persistentAtom } from "@nanostores/persistent";
import type { ItemId } from "../components/Item";

export const $openSidebarItems = persistentAtom("openSidebarItems", { "Einleitung": true } as Record<ItemId, true>, {
  encode: JSON.stringify,
  decode: JSON.parse,
})

export const $theme = persistentAtom("theme", "light" as "light" | "dark", {
  encode: JSON.stringify,
  decode: JSON.parse,
})
