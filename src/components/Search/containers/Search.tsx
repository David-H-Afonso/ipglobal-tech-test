import SearchComponent from '../components/SearchComponent'
import { useAppSelector } from '@/stores/hooks/hooks'
import { useSearchMovies } from '@/hooks'

const Search = () => {
	const genres = useAppSelector((state) => state.genres.value)
	// To check if a movie has been rated and show rating
	const ratedMovies = useAppSelector((state) => state.ratedMovies.value)
	const { search, setSearch, movies, loading, error } = useSearchMovies()

	if (error) return <p>{error}</p>

	return (
		<SearchComponent
			search={search}
			setSearch={setSearch}
			movies={movies}
			genres={genres}
			ratedMovies={ratedMovies}
			loading={loading}
		/>
	)
}

export default Search
