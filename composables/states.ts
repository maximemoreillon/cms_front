import type Author from '~~/types/Author'

export const userUser = () => useState<Author | null>('user', () => null)
