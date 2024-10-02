export interface GenresData {
	genres: Genre[]
	error?: string
}

export interface Genre {
	id: number
	name: string
}
