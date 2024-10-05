import { Rating } from '@/types/rating'
import { errorHandler, respondeErrorHandler } from '@/utils'

export const postRating = async (movieId: string, guestSessionId: string, rate: string) => {
	try {
		const response = await fetch(
			`/api/rating?movieId=${movieId}&guestSessionId=${guestSessionId}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: rate,
			}
		)

		if (!response.ok) {
			respondeErrorHandler(response)
			return
		}

		const data: Rating = await response.json()
		return data
	} catch (error: unknown) {
		errorHandler(error)
	}
}
