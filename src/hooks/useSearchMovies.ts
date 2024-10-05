import { useState, useEffect } from 'react'
import { postFindMovies } from '@/services/postFindMovies'
import { Movie } from '@/types/movies'
import { errorHandler } from '@/utils'

export const useSearchMovies = (initialSearch = '') => {
	const [search, setSearch] = useState(initialSearch)
	const [movies, setMovies] = useState<Movie[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const timeoutId = setTimeout(async () => {
			if (!search.trim()) return setMovies([])

			setLoading(true)
			try {
				const movies = await postFindMovies(search)
				if (movies && movies.results) {
					setMovies(movies.results)
				} else {
					setMovies([])
				}
			} catch (e: unknown) {
				setError('Failed to fetch movies.')
				errorHandler(e)
			} finally {
				setLoading(false)
			}
		}, 500)

		return () => {
			clearTimeout(timeoutId)
		}
	}, [search])

	return { search, setSearch, movies, loading, error }
}
