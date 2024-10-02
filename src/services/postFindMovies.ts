import { SearchData } from '@/types/search'
import { errorHandler, respondeErrorHandler } from '@/utils'

export const postFindMovies = async (searchTerm: string) => {
	try {
		const response = await fetch(`/api/findMovie?query=${searchTerm}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		if (!response.ok) {
			respondeErrorHandler(response)
			return
		}

		const data: SearchData = await response.json()
		return data.movies
	} catch (error: unknown) {
		errorHandler(error)
	}
}
