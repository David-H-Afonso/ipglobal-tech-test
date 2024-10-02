import { Movie } from './movies'

export interface Search {
	page: number
	results: Movie[]
	total_pages: number
	total_results: number
}

export interface SearchData {
	movies: Search
	errors?: string
}
