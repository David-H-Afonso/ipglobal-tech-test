import Image from 'next/image'
import React, { useState } from 'react'
import moment from 'moment'
import { Genre } from '@/types/genres'
import { Movie } from '@/types/movies'
import { Tag } from '../Tag/Tag'
import { createPortal } from 'react-dom'
import { errorHandler, getGenreNameById } from '@/utils'
import CloseX from '@/assets/close-x.svg'
import { Rating } from '../Rating/Rating'
import { usePostRating } from '@/hooks'
import { useAppDispatch } from '@/stores/hooks/hooks'
import { updateRatedMovie } from '@/stores/reducers/ratedMovies'
import { Snackbar, SnackbarProps } from '../Snackbar/Snackbar'

interface Props {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	movie: Movie
	genres: Genre[]
	rating?: number
}

export const MovieInfo: React.FC<Props> = (props) => {
	const [snackbarProps, setSnackbarProps] = useState<SnackbarProps>({} as SnackbarProps)
	const { open, setOpen, movie, genres, rating } = props
	const dispatch = useAppDispatch()
	const { rateMovie } = usePostRating()

	const portalElement = document.getElementById('movieInfoPortal')
	if (!portalElement || !open) return null

	// This functions are created in order to make it easier to read and understand the render code below
	const closeMovieInfo = () => {
		setOpen(false)
	}

	const keepOpenOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation()
	}

	// Saving the movie into a custom entity with the user rated movies, since the API don't give us this option and it's required by specs
	const onRating = async (rating: number) => {
		try {
			await rateMovie(movie.id.toString(), rating.toString())

			// Add movie to rated movies entity
			dispatch(updateRatedMovie({ movie, rating }))
			// Display Snackbar
			setSnackbarProps({ isSuccess: true, isVisible: true, message: 'Movie rated' })
		} catch (e: unknown) {
			// Display Snackbar
			setSnackbarProps({ isSuccess: false, isVisible: true, message: 'Movie not rated' })
			errorHandler(e)
		} finally {
			// Hide Snackbar after 2s
			setTimeout(() => {
				setSnackbarProps({ isVisible: false } as SnackbarProps)
			}, 2000)
		}
	}

	// This component is inside a portal so it can be on top of all content and avoid clicking outside it when using it
	return createPortal(
		<>
			{/* Snackbar showing if movie has been properly rated or not. This uses a portal and is not directly shown inside this one */}
			{snackbarProps?.message && <Snackbar {...snackbarProps} />}

			{/* Container of modal, only used to wrap everything, give a black transparent background and close when clicked outside */}
			<div
				onClick={closeMovieInfo}
				className='cursor-pointer fixed inset-0 z-40 bg-[rgba(0,0,0,.25)] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
				{/*  Movie Info Container, used to wrap and position the actual content. Stopped propagation to avoid closing the info on click inside the information */}
				<div
					onClick={keepOpenOnClick}
					className='cursor-default relative w-auto my-6 mx-auto max-w-3xl pl-3 pr-3'>
					{/* This container align items inside it and gives the background color to the information modal */}
					<div className='border-0 rounded-lg shadow-lg relative flex flex-col items-center w-full bg-[rgb(31,41,55)] outline-none focus:outline-none p-5'>
						{/* 
                        We render a closing X so the user is able to close the modal
                        Even tho this behaviour can be replicated just clicking outside, a user may not know this information
                        By giving this visual cue, even it's a "repeating" functionailly, we're avoiding confusions and giving a better UX.
                    */}
						<span
							onClick={closeMovieInfo}
							className='text-white absolute right-5 top-4 cursor-pointer'>
							<Image src={CloseX} alt='X icon to close modal' priority className='max-w-5' />
						</span>

						{/* Movie poster */}
						<Image
							priority
							src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
							alt={movie.title}
							width={200}
							height={300}
							className='mb-2 rounded-md object-cover'
						/>

						{/* Movie title + Release date, moved together to give a different look */}
						<h2 className='text-lg font-semibold text-center mb-2 text-white'>
							{movie.title} -
							<span className='text-yellow-300 text-center mb-2 font-semibold'>
								{' '}
								{moment(movie.release_date).format('MMMM D, YYYY')}
							</span>
						</h2>

						{/* Movie Description */}
						<p className='text-white text-center mb-2'>{movie.overview}</p>

						{/* Movie tags */}
						<ul className='flex flex-wrap justify-center'>
							{movie.genre_ids.map((genre) => (
								<Tag key={genre} name={getGenreNameById(genre, genres)} />
							))}
						</ul>

						{/* Rating component, when clicked on a star, the movie is saved in "Rated movies popup" */}
						<Rating onRatingSelect={onRating} rating={rating} />
					</div>
				</div>
			</div>
		</>,
		portalElement
	)
}
