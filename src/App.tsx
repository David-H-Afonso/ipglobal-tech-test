import { AppProps } from 'next/app'
import { MainLayout } from './layouts'
import setAllEntities from '@/stores/utilities/setAllEntities'
import { useAppDispatch } from '@/stores/hooks/hooks'
import { useEffect } from 'react'

const App = ({ Component, pageProps }: AppProps) => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		console.log('loading')
		setAllEntities(dispatch)

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
