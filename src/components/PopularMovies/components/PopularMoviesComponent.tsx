import { MovieCover } from '@/components/elements'
import { Genre } from '@/types/genres'
import { Movie } from '@/types/movies'
import React from 'react'

interface Props {
	movies: Movie[]
	genres: Genre[]
}

const PopularMoviesComponent: React.FC<Props> = (props) => {
	const { movies, genres } = props

	return (
		<div className=''>
			<h1 className='w-full text-4xl font-bold text-center pt-5 pb-5'>Popular Movies</h1>

			<ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center pr-3 pl-3'>
				{movies.map((movie) => (
					<MovieCover key={movie.id} movie={movie} genres={genres} />
				))}
			</ul>
		</div>
	)
}

export default PopularMoviesComponent
