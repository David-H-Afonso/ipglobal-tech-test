import { errorHandler } from '@/utils'
import { AppDispatch } from '../store'
import { updatePopularMovies } from './entities/setPopularMoviesEntity'
import { updateGenres } from './entities/setGenres'

const setAllEntities = async (dispatch: AppDispatch) => {
	try {
		updatePopularMovies(dispatch)
		updateGenres(dispatch)
	} catch (error: unknown) {
		errorHandler(error)
	}
}

export default setAllEntities
