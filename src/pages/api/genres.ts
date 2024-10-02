// Route to get the genre list

import { GenresData } from '@/types/genres'
import { errorHandler, respondeErrorHandler } from '@/utils'
import type { NextApiRequest, NextApiResponse } from 'next'

const genres = async (req: NextApiRequest, res: NextApiResponse<GenresData>) => {
	const apiKey = process.env.TMDB_API_KEY
	const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`

	if (!apiKey) throw new Error('API Key is missing!')

	try {
		const response = await fetch(url)

		if (!response.ok) {
			respondeErrorHandler(response)
			return
		}

		const data = await response.json()

		res.status(200).json({ genres: data.genres })
	} catch (e: unknown) {
		// We're outsourcing all error handling to this function
		errorHandler(e)
	}
}

export default genres
