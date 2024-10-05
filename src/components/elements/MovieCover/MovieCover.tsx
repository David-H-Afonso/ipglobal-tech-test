import { Movie } from '@/types/movies'
import React, { useState } from 'react'
import Image from 'next/image'
import moment from 'moment'
import { MovieInfo } from '../MovieInfo/MovieInfo'
import { Genre } from '@/types/genres'

interface Props {
	movie: Movie
	genres: Genre[]
}

export const MovieCover: React.FC<Props> = (props) => {
	const [isMovieInfoOpen, setIsMovieInfoOpen] = useState(false)
	const { movie, genres } = props

	const toggleMovieInfo = () => {
		setIsMovieInfoOpen(!isMovieInfoOpen)
	}

	return (
		<>
			{/* 
				Invoke portal when clicking on a movie information
				This logic has been moved to this component to avoid having to repeat it when invoking MovieCover, i.e. Popular Movies, Search
				With this logic here, we just need to summon the card and it'll have the popup ready to be opened
			*/}
			{isMovieInfoOpen && (
				<MovieInfo
					open={isMovieInfoOpen}
					setOpen={setIsMovieInfoOpen}
					movie={movie}
					genres={genres}
				/>
			)}

			{/* 
				Movie Cover Render
			*/}
			<li
				onClick={toggleMovieInfo}
				className='rounded-[20px] bg-[rgb(31,41,55)] text-white border p-4 rounded-md shadow-md mb-4 flex flex-col items-center max-w-[380px] w-full transform transition-transform duration-200 hover:scale-105 cursor-pointer'>
				<Image
					priority
					src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
					alt={movie.title}
					width={200}
					height={300}
					className='mb-2 rounded-md object-cover'
				/>
				<h2 className='text-lg font-semibold text-center mb-2'>{movie.title}</h2>
				<p className='text-yellow-300 text-center mb-2 font-semibold'>
					{moment(movie.release_date).format('MMMM D, YYYY')}
				</p>
			</li>
		</>
	)
}
