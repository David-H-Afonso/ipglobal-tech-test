import { GenresData } from '@/types/genres'
import { errorHandler, respondeErrorHandler } from '@/utils'

export const getGenres = async () => {
	try {
		const response = await fetch('/api/genres')
		if (!response.ok) {
			respondeErrorHandler(response)
			return
		}

		const data: GenresData = await response.json()
		return data.genres
	} catch (error: unknown) {
		errorHandler(error)
	}
}
