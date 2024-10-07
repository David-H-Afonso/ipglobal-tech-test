// Route to get the guest session

import { GuestData } from '@/types/guest'
import { errorHandler } from '@/utils'
import type { NextApiRequest, NextApiResponse } from 'next'

const guest = async (req: NextApiRequest, res: NextApiResponse<GuestData>) => {
	const apiKey = process.env.TMDB_API_KEY
	const url = `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${apiKey}`

	if (!apiKey) throw new Error('API Key is missing!')

	try {
		const response = await fetch(url)

		if (!response.ok) return

		const data = await response.json()

		res.status(200).json({ guest: data })
	} catch (e: unknown) {
		// We're outsourcing all error handling to this function
		errorHandler(e)
	}
}

export default guest
