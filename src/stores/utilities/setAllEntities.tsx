import { errorHandler } from '@/utils'
import { AppDispatch } from '../store'
import { updatePopularMovies } from './entities/setPopularMoviesEntity'

const setAllEntities = async (dispatch: AppDispatch) => {
	try {
		updatePopularMovies(dispatch)
	} catch (error: unknown) {
		errorHandler(error)
	}
}

export default setAllEntities
