import { AppProps } from 'next/app'
import { MainLayout } from './layouts'
import setAllEntities from '@/stores/utilities/setAllEntities'
import { useAppDispatch, useAppSelector } from '@/stores/hooks/hooks'
import { useEffect } from 'react'

const App = ({ Component, pageProps }: AppProps) => {
	const dispatch = useAppDispatch()
	const guest = useAppSelector((state) => state.guest.value)

	useEffect(() => {
		// We're sending guest here to check first if enough time has happend, if true, we're creating a new session id
		// We should be able to check the remaining time for a guest session and do this conditional check from there
		// Since the scope of this project is smaller, I'm going to just do a refresh when the expire time happens, but if the API provide the means, an improvement could be done
		setAllEntities(dispatch, guest)

		// We want this only running once the index is built
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<MainLayout>
			<Component {...pageProps} />
		</MainLayout>
	)
}

export default App
