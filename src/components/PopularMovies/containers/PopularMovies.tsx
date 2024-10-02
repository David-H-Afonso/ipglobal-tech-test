import { useAppSelector } from '@/stores/hooks/hooks'
import PopularMoviesComponent from '../components/PopularMoviesComponent'

const PopularMovies = () => {
	const movies = useAppSelector((state) => state.popularMovies.value)
	const genres = useAppSelector((state) => state.genres.value)

	return <PopularMoviesComponent movies={movies} genres={genres} />
}

export default PopularMovies
