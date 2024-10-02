import { getPopularMovies } from '@/services'
import { setPopularMovies } from '@/stores/reducers/popularMovies'
import { AppDispatch } from '@/stores/store'

export const updatePopularMovies = async (dispatch: AppDispatch) => {
	const popularMovies = await getPopularMovies()
	dispatch(setPopularMovies(popularMovies ?? []))
}
