import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Movie } from '@/types/movies'
import type { RootState } from '../store'

interface PopularMoviesState {
	value: Movie[]
}

const initialState: PopularMoviesState = {
	value: [] as Movie[],
}

export const popularPopularMovies = createSlice({
	name: 'popularPopularMovies',
	initialState,
	reducers: {
		updatePopularMovies: (state, payload: PayloadAction<Movie[]>) => {
			state.value = [...state.value, ...payload.payload]
		},
		setPopularMovies: (state, payload: PayloadAction<Movie[]>) => {
			state.value = payload.payload
		},
	},
})

export const { updatePopularMovies, setPopularMovies } = popularPopularMovies.actions
export default popularPopularMovies.reducer

export const selectPopularMovies = (state: RootState) => state.popularMovies.value
