import { useEffect, useState } from 'react'
import SearchComponent from '../components/SearchComponent'
import { Movie } from '@/types/movies'
import { useAppSelector } from '@/stores/hooks/hooks'
import { postFindMovies } from '@/services/postFindMovies'

const Search = () => {
	const [search, setSearch] = useState('')
	const [movies, setMovies] = useState<Movie[]>([])
	const genres = useAppSelector((state) => state.genres.value)

	useEffect(() => {
		const timeoutId = setTimeout(async () => {
			// Check if string is clean
			if (search.trim()) {
				// Searchs movies with that query
				const movies = await postFindMovies(search)
				// Check if movies exists, as well as if it has results, no matter the size
				if (movies && movies.results) {
					// Gets assigned here to the useState and is displayed on the SearchComponent. Same styles
					setMovies(movies.results)
				}
			}
		}, 500)
		// Here we're creating and clearing a small 500ms timeout, to allow the user to write without
		// oversaturating the API, some example values to my liking, may be modified
		return () => {
			clearTimeout(timeoutId)
		}
	}, [search])

	return <SearchComponent search={search} setSearch={setSearch} movies={movies} genres={genres} />
}

export default Search
