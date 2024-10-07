// Route to find the movie url

import { MoviesData } from '@/types/movies'
import { errorHandler } from '@/utils'
import type { NextApiRequest, NextApiResponse } from 'next'

const findMovie = async (req: NextApiRequest, res: NextApiResponse<MoviesData>) => {
	const apiKey = process.env.TMDB_API_KEY
	const { query } = req.query
	const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=1&query=${encodeURIComponent(
		query as string
	)}`

	if (req.method !== 'POST') {
		throw new Error('Method Not Allowed')
	}

	if (!apiKey) throw new Error('API Key is missing!')

	try {
		const response = await fetch(url)

		if (!response.ok) return

		const data = await response.json()

		res.status(200).json({ movies: data })
	} catch (e: unknown) {
		// We're outsourcing all error handling to this function
		errorHandler(e)
	}
}

export default findMovie
