interface Props {
	name: string
}

export const Tag: React.FC<Props> = (props) => {
	const { name } = props
	return (
		<span className='inline-block bg-blue-500 text-white text-xs font-bold rounded-full px-3 py-1 mr-2 mb-2'>
			{name}
		</span>
	)
}
