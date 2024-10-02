// Route to get the movie url

import { MoviesData } from '@/types/movies'
import { errorHandler, respondeErrorHandler } from '@/utils'
import type { NextApiRequest, NextApiResponse } from 'next'

const popularMovies = async (req: NextApiRequest, res: NextApiResponse<MoviesData>) => {
	const apiKey = process.env.TMDB_API_KEY
	const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`

	if (!apiKey) throw new Error('API Key is missing!')

	try {
		const response = await fetch(url)

		if (!response.ok) {
			respondeErrorHandler(response)
			return
		}

		const data = await response.json()

		res.status(200).json({ movies: data.results })
	} catch (e: unknown) {
		// We're outsourcing all error handling to this function
		errorHandler(e)
	}
}

export default popularMovies
