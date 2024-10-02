import { GuestData } from '@/types/guest'
import { errorHandler, respondeErrorHandler } from '@/utils'

export const getGuest = async () => {
	try {
		const response = await fetch('/api/guest')
		if (!response.ok) {
			respondeErrorHandler(response)
			return
		}

		const data: GuestData = await response.json()
		return data.guest
	} catch (error: unknown) {
		errorHandler(error)
	}
}
