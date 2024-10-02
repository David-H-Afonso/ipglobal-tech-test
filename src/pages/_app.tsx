import { persistor, store } from '@/stores/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { AppProps } from 'next/app'
import App from '@/App'
import '../index.css'

const MyApp = (props: AppProps) => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<App {...props} />
			</PersistGate>
		</Provider>
	)
}

export default MyApp
