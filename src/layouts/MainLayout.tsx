import Navbar from '@/components/Navbar/containers/Navbar'

interface Props {
	children: JSX.Element
}

export const MainLayout: React.FC<Props> = ({ children }) => {
	return (
		<>
			<div>
				<Navbar />
				<main>
					{/* 
						Portal useful to render a modal over the content, in this case, the movie information
					*/}
					<div id='movieInfoPortal' />
					{/* 
						Portal to render a snackbar over the content
					*/}
					<div id='snackbarPortal' />

					{/* 
						Content render
					*/}
					{children}
				</main>
			</div>
		</>
	)
}
