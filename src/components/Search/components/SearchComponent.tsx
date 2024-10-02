import { MovieCover, SearchBar } from '@/components/elements'
import { Genre } from '@/types/genres'
import { Movie } from '@/types/movies'
import React, { Dispatch, SetStateAction } from 'react'

interface Props {
	search: string
	setSearch: Dispatch<SetStateAction<string>>
	movies: Movie[]
	genres: Genre[]
}

const SearchComponent: React.FC<Props> = (props) => {
	const { search, setSearch, movies, genres } = props

	console.log('movies', movies)

	return (
		<div className=''>
			<div className='pb-5'>
				<h1 className='w-full text-4xl font-bold text-center pt-5 pb-5'>Search Movie</h1>
				<SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
			</div>

			<ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center pr-3 pl-3'>
				{movies.map((movie) => (
					<MovieCover key={movie.id} movie={movie} genres={genres} />
				))}
			</ul>
		</div>
	)
}

export default SearchComponent
