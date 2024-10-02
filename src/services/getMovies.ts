import { MoviesData } from '@/types/movies'
import { errorHandler, respondeErrorHandler } from '@/utils'

export const getMovies = async () => {
	try {
		const response = await fetch('/api/movies')
		if (!response.ok) {
			respondeErrorHandler(response)
			return
		}

		const data: MoviesData = await response.json()
		return data.movies
	} catch (error: unknown) {
		errorHandler(error)
	}
}
