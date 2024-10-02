import { Genre } from '@/types/genres'

export const getGenreNameById = (id: number, genres: Genre[]) => {
	const genreName = genres.find((genre) => genre.id === id)
	return genreName?.name || ''
}
