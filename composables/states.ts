import type Author from "~~/types/Author"
import type Tag from "~~/types/Tag"

export const userUser = () => useState<Author | null>("user", () => null)
export const usePinnedTags = () =>
  useState<Tag[] | null>("pinnedTags", () => [])
