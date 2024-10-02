import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Genre } from '@/types/genres'
import type { RootState } from '../store'

interface GenresState {
	value: Genre[]
}

const initialState: GenresState = {
	value: [] as Genre[],
}

export const genres = createSlice({
	name: 'genres',
	initialState,
	reducers: {
		updateGenres: (state, payload: PayloadAction<Genre[]>) => {
			state.value = [...state.value, ...payload.payload]
		},
		setGenres: (state, payload: PayloadAction<Genre[]>) => {
			state.value = payload.payload
		},
	},
})

export const { updateGenres, setGenres } = genres.actions
export default genres.reducer

export const selectGenres = (state: RootState) => state.genres.value
