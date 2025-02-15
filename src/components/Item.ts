import type { Nominal } from "../utils/Nominal"

export type ItemId = Nominal<string, "ItemId">

interface Heading {
  depth: number;
  slug: string;
  text: string;
}

export interface Item {
  id: ItemId
  name: string
  href?: string
  path?: string
  parentId?: ItemId
  children?: Item[]
  headings?: Heading[]
}
