import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RatedMovie } from '@/types/movies'
import type { RootState } from '../store'

interface RatedMoviesState {
	value: RatedMovie[]
}

const initialState: RatedMoviesState = {
	value: [] as RatedMovie[],
}

export const ratedMovies = createSlice({
	name: 'ratedMovies',
	initialState,
	reducers: {
		updateRatedMovie: (state, payload: PayloadAction<RatedMovie>) => {
			// Get values from Movie
			const { movie, rating } = payload.payload
			// Check if movie already exists on the entity
			const existingMovieIndex = state.value.findIndex(
				(ratedMovie) => ratedMovie.movie.id === movie.id
			)
			const isMovieOnEntity = existingMovieIndex !== -1

			// When true, update the value
			// When false, add it to the entitiy
			if (isMovieOnEntity) {
				state.value[existingMovieIndex].rating = rating
			} else {
				state.value.push({ movie, rating })
			}
		},
		updateRatedMovies: (state, payload: PayloadAction<RatedMovie[]>) => {
			state.value = [...state.value, ...payload.payload]
		},
		setRatedMovies: (state, payload: PayloadAction<RatedMovie[]>) => {
			state.value = payload.payload
		},
	},
})

export const { updateRatedMovies, setRatedMovies } = ratedMovies.actions
export default ratedMovies.reducer

export const selectRatedMovies = (state: RootState) => state.ratedMovies.value
