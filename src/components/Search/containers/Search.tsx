import SearchComponent from '../components/SearchComponent'
import { useAppSelector } from '@/stores/hooks/hooks'
import { useSearchMovies } from '@/hooks'
import { Loading } from '@/components/elements'

const Search = () => {
	const genres = useAppSelector((state) => state.genres.value)
	const { search, setSearch, movies, loading, error } = useSearchMovies()

	if (loading) return <Loading />
	if (error) return <p>{error}</p>

	return <SearchComponent search={search} setSearch={setSearch} movies={movies} genres={genres} />
}

export default Search
