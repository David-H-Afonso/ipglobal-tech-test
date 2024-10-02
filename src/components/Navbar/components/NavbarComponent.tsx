import { CustomLink } from '@/components/elements'
import React from 'react'
import TMDB_Logo from '@/assets/tmdb_logo.svg'
import Image from 'next/image'

const NavbarComponent = () => {
	const customLinkStyles =
		'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'

	return (
		<nav className='bg-gray-800'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					<div className='flex items-center'>
						<a href='/' className='text-white text-lg font-bold'>
							<Image src={TMDB_Logo} alt='TMBD logo' priority className='max-w-36' />
						</a>
						<div className='hidden md:block'>
							<div className='ml-10 flex items-baseline space-x-4'>
								<CustomLink href='/popularMovies' className={customLinkStyles}>
									Popular Movies
								</CustomLink>
								<CustomLink href='/search' className={customLinkStyles}>
									Search
								</CustomLink>
								<CustomLink href='/ratedMovies' className={customLinkStyles}>
									Rated Movies
								</CustomLink>
							</div>
						</div>
					</div>
					<div className='-mr-2 flex md:hidden'>
						<button
							type='button'
							className='bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
							<span className='sr-only'>Open main menu</span>
							<svg
								className='h-6 w-6'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M4 6h16M4 12h16M4 18h16'
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default NavbarComponent
