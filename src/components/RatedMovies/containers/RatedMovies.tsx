import { useAppSelector } from '@/stores/hooks/hooks'
import RatedMoviesComponent from '../components/RatedMoviesComponent'

const RatedMovies = () => {
	const ratedMovies = useAppSelector((state) => state.ratedMovies.value)
	const genres = useAppSelector((state) => state.genres.value)

	return <RatedMoviesComponent ratedMovies={ratedMovies} genres={genres} />
}

export default RatedMovies
