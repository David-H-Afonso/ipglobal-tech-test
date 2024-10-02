import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Guest } from '@/types/guest'
import type { RootState } from '../store'

interface GuestState {
	value: Guest
}

const initialState: GuestState = {
	value: {} as Guest,
}

export const guest = createSlice({
	name: 'guest',
	initialState,
	reducers: {
		updateGuest: (state, payload: PayloadAction<Guest>) => {
			state.value = { ...state.value, ...payload.payload }
		},
		setGuest: (state, payload: PayloadAction<Guest>) => {
			state.value = payload.payload
		},
	},
})

export const { updateGuest, setGuest } = guest.actions
export default guest.reducer

export const selectGuest = (state: RootState) => state.guest.value
