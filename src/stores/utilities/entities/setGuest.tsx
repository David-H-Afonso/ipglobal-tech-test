import { getGuest } from '@/services'
import { setGuest } from '@/stores/reducers/guest'
import { AppDispatch } from '@/stores/store'
import { Guest } from '@/types/guest'

export const updateGuest = async (dispatch: AppDispatch) => {
	const guest = await getGuest()
	dispatch(setGuest(guest ?? ({} as Guest)))
}
