import { Genre } from '@/types/genres'
import { Movie } from '@/types/movies'
import React from 'react'
import { Tag } from '../Tag/Tag'
import { getGenreNameById } from '@/utils'
import Image from 'next/image'
import moment from 'moment'

interface Props {
	movie: Movie
	genres: Genre[]
}

export const MovieCover: React.FC<Props> = (props) => {
	const { movie, genres } = props
	return (
		<li className='rounded-[20px] bg-[rgb(31,41,55)] text-white border p-4 rounded-md shadow-md mb-4 flex flex-col items-center max-w-[380px] w-full transform transition-transform duration-200 hover:scale-105 cursor-pointer'>
			<Image
				src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
				alt={movie.title}
				width={200}
				height={300}
				className='mb-2 rounded-md object-cover'
			/>
			<h2 className='text-lg font-semibold text-center mb-2'>{movie.title}</h2>
			<p className='text-white text-center mb-2'>{movie.overview}</p>
			<p className='text-yellow-300 text-center mb-2 font-semibold'>
				{moment(movie.release_date).format('MMMM D, YYYY')}
			</p>
			<ul className='flex flex-wrap justify-center'>
				{movie.genre_ids.map((genre) => (
					<Tag key={genre} name={getGenreNameById(genre, genres)} />
				))}
			</ul>
		</li>
	)
}
