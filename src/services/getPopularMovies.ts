import { MoviesData } from '@/types/movies'
import { errorHandler } from '@/utils'

export const getPopularMovies = async () => {
	try {
		const response = await fetch('/api/popularMovies')
		if (!response.ok) return

		const data: MoviesData = await response.json()
		return data.movies
	} catch (error: unknown) {
		errorHandler(error)
	}
}
