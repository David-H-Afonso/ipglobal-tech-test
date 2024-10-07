import { describe, it, expect, vi } from 'vitest'
import { createRequest, createResponse } from 'node-mocks-http'
import findMovie from './findMovie'

global.fetch = vi.fn()

describe('findMovie API', () => {
	beforeAll(() => {
		process.env.TMDB_API_KEY = 'mocked_api_key'
	})

	it('should return movie data on valid request', async () => {
		const mockData = { results: [{ id: 1, title: 'Test Movie' }] }
		;(fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: async () => mockData,
		})

		const req = createRequest({
			method: 'POST',
			query: { query: 'Test Movie' },
		})
		const res = createResponse()

		await findMovie(req, res)

		expect(res.statusCode).toBe(200)
		expect(JSON.parse(res._getData())).toEqual({ movies: mockData })
	})

	it('should throw error for unsupported method', async () => {
		const req = createRequest({
			method: 'GET',
		})
		const res = createResponse()

		await findMovie(req, res).catch((error: unknown) => {
			expect(error).toEqual(new Error('Method Not Allowed'))
		})
	})

	it('should throw error if API key is missing', async () => {
		const req = createRequest({
			method: 'POST',
			query: { query: 'Test Movie' },
		})
		const res = createResponse()

		const originalApiKey = process.env.TMDB_API_KEY
		delete process.env.TMDB_API_KEY

		await findMovie(req, res).catch((error: unknown) => {
			expect(error).toEqual(new Error('API Key is missing!'))
		})

		process.env.TMDB_API_KEY = originalApiKey
	})

	it('should handle fetch error', async () => {
		;(fetch as jest.Mock).mockResolvedValueOnce({
			ok: false,
			json: async () => ({ status_message: 'Error fetching data' }),
		})

		const req = createRequest({
			method: 'POST',
			query: { query: 'Test Movie' },
		})
		const res = createResponse()

		await findMovie(req, res)

		expect(res._getData()).toBe('')
	})
})
