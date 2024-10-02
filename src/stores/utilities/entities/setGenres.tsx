import { getGenres } from '@/services/getGenres'
import { setGenres } from '@/stores/reducers/genres'
import { AppDispatch } from '@/stores/store'

export const updateGenres = async (dispatch: AppDispatch) => {
	const genres = await getGenres()
	dispatch(setGenres(genres ?? []))
}
