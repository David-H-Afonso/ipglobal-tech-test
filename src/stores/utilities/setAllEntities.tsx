import { errorHandler } from '@/utils'
import { AppDispatch } from '../store'
import { updatePopularMovies } from './entities/setPopularMoviesEntity'
import { updateGenres } from './entities/setGenres'
import { updateGuest } from './entities/setGuest'
import { Guest } from '@/types/guest'

const setAllEntities = async (dispatch: AppDispatch, guest: Guest) => {
	try {
		updatePopularMovies(dispatch)
		updateGenres(dispatch)
		/*
			API Info on this topic is a bit missinforming
			On the documentation you can see this statement:
			"Guest sessions will automatically be deleted if they are not used within 60 minutes of it being issued."
			But then, the `expired_at` date that is generated isn't 1 hour from creation time, but 1 day
			I've not seen an endpoint to be able to call and check remaining time for a guest session
			Having this in mind, some minor bugs may occur until the exact time is figured out before a session expires
			As of right now, I'm trusting the data I'm getting and checking if date has happend.
			If any bug occur before a fix can be issued, a simple cache clearing should generate a new guest session to be able to test the app
		*/
		if (!guest.expires_at || new Date(guest.expires_at) < new Date()) {
			updateGuest(dispatch)
		}
	} catch (error: unknown) {
		errorHandler(error)
	}
}

export default setAllEntities
