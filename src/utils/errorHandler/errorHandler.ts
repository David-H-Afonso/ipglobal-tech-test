// The goal of this file is the declare an unique way to handle errors across the application.

/* 
As the scope of this app is not big, it should be much more than just a few lines throwing information
This can be changed in case we need, for example, to return the error, execute a function that can be added as an optional parameter...
I'll leave it as it's since it'll be overkill handling more than this, but having a single file where everything is nested
may do our job easier in a future if the app scope changes.

Update: I'm adding the setError handler. With this, we can modify a useState made to display the error message inside and add the message, just if we want to.
*/

/* 
The following instances of errors are now handled properly:
- Error

In case the error didn't match any of this cases, it'll give the user a default message informing an unexpected error ocurred. 
Any error instance that's found and it's not handled should be added.
*/

import { Dispatch, SetStateAction } from 'react'

export const errorHandler = (e: unknown, setError?: Dispatch<SetStateAction<string | null>>) => {
	/*
        ERROR INSTANCE
    */
	if (e instanceof Error) {
		const errorMessage = e.message
		if (setError) setError(errorMessage)
		throw new Error(errorMessage)
	}

	/* 
        DEFAULT INSTANCE
    */

	// In case the error is not what we expect but it's a string, i.e. throw "error"
	if (typeof e === 'string' && setError) setError(e)
	// Throw default error in case error is not handled
	throw new Error('There was an unexpected error')
}
