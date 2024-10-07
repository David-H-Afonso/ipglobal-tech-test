import { SearchData } from '@/types/search'
import { errorHandler } from '@/utils'

export const postFindMovies = async (searchTerm: string) => {
	try {
		const response = await fetch(`/api/findMovie?query=${searchTerm}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		if (!response.ok) return

		const data: SearchData = await response.json()
		return data.movies
	} catch (error: unknown) {
		errorHandler(error)
	}
}
