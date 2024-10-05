import { useState } from 'react'
import { postRating } from '@/services/postRating'
import { errorHandler } from '@/utils'
import { useAppSelector } from '@/stores/hooks/hooks'

export const usePostRating = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const guest = useAppSelector((state) => state.guest.value)

	const rateMovie = async (movieId: string, rate: string): Promise<boolean> => {
		setLoading(true)
		setError(null)

		try {
			const response = await postRating(movieId, guest.guest_session_id, rate)
			if (response?.status_code === 12) return true
			return false
		} catch (e: unknown) {
			setError('Failed to post rating')
			errorHandler(e)
			return false
		} finally {
			setLoading(false)
		}
	}

	return { rateMovie, loading, error }
}
