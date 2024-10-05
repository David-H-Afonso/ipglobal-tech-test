import { MovieCover } from '@/components/elements'
import { Genre } from '@/types/genres'
import { RatedMovie } from '@/types/movies'

interface Props {
	ratedMovies: RatedMovie[]
	genres: Genre[]
}

const RatedMoviesComponent: React.FC<Props> = (props) => {
	const { ratedMovies, genres } = props

	return (
		<div className=''>
			<h1 className='w-full text-4xl font-bold text-center pt-5 pb-5'>Rated Movies</h1>
			<ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center pr-3 pl-3'>
				{ratedMovies.map((ratedMovie) => (
					<MovieCover
						key={ratedMovie.movie.id}
						movie={ratedMovie.movie}
						genres={genres}
						rating={ratedMovie.rating}
					/>
				))}
			</ul>
		</div>
	)
}

export default RatedMoviesComponent
