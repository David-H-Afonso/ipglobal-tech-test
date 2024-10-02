import Navbar from '@/components/Navbar/containers/Navbar'

interface Props {
	children: JSX.Element
}

export const MainLayout: React.FC<Props> = ({ children }) => {
	return (
		<>
			<div>
				<Navbar />
				<main>{children}</main>
			</div>
		</>
	)
}
