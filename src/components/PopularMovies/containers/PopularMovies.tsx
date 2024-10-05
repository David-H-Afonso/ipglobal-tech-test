import { useAppSelector } from '@/stores/hooks/hooks'
import PopularMoviesComponent from '../components/PopularMoviesComponent'

const PopularMovies = () => {
	const movies = useAppSelector((state) => state.popularMovies.value)
	const genres = useAppSelector((state) => state.genres.value)
	// To check if a movie has been rated and show rating
	const ratedMovies = useAppSelector((state) => state.ratedMovies.value)

	return <PopularMoviesComponent movies={movies} genres={genres} ratedMovies={ratedMovies} />
}

export default PopularMovies
