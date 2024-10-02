import { ChangeEventHandler } from 'react'

interface Props {
	value: string | number | readonly string[] | undefined
	onChange: ChangeEventHandler<HTMLInputElement>
}

export const SearchBar: React.FC<Props> = (props) => {
	const { value, onChange } = props

	return (
		<div className='relative w-full max-w-md mx-auto'>
			<input
				value={value}
				onChange={onChange}
				type='text'
				placeholder='Search'
				className='w-full pl-12 pr-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400'
			/>
			<div className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-5 w-5'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'>
					<circle cx='11' cy='11' r='8' />
					<line x1='21' y1='21' x2='16.65' y2='16.65' />
				</svg>
			</div>
		</div>
	)
}
