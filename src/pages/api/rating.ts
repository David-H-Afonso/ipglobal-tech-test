// Route to find the movie url

import { Rating } from '@/types/rating'
import { errorHandler, respondeErrorHandler } from '@/utils'
import type { NextApiRequest, NextApiResponse } from 'next'

const rating = async (req: NextApiRequest, res: NextApiResponse<Rating>) => {
	const apiKey = process.env.TMDB_API_KEY
	const { movieId, guestSessionId } = req.query
	const value = req.body

	const url = `https://api.themoviedb.org/3/movie/${encodeURIComponent(
		movieId as string
	)}/rating?guest_session_id=${encodeURIComponent(guestSessionId as string)}&api_key=${apiKey}`

	if (req.method !== 'POST') {
		throw new Error('Method Not Allowed')
	}

	if (!value) {
		throw new Error('Rating value is required')
	}

	if (!apiKey) throw new Error('API Key is missing!')

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({ value }),
		})

		if (!response.ok) {
			respondeErrorHandler(response)
			return
		}

		const data: Rating = await response.json()

		res.status(200).json(data)
	} catch (e: unknown) {
		// We're outsourcing all error handling to this function
		errorHandler(e)
	}
}

export default rating
