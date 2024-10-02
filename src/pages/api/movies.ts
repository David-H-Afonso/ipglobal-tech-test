// Route to get the movie url

import { Movies } from '@/types/movies'
import { errorHandler } from '@/utils'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
	movies: Movies
	error?: string
}

const movies = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const apiKey = process.env.TMDB_API_KEY
	const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`

	if (!apiKey) throw new Error('API Key is missing!')

	try {
		const response = await fetch(url)

		if (!response.ok) throw new Error('Failed to fetch movies')

		const data = await response.json()

		res.status(200).json({ movies: data.results })
	} catch (e: unknown) {
		// We're outsourcing all error handling to this function
		errorHandler(e)
	}
}

export default movies
