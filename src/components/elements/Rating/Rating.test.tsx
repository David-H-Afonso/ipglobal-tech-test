import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Rating } from './Rating'
import '@testing-library/jest-dom'

describe('Rating Component', () => {
	it('renders five stars (with full and half star options)', () => {
		const { getAllByRole } = render(<Rating onRatingSelect={() => {}} />)
		const stars = getAllByRole('radio')

		// 5 full stars + 5 half stars = 10 total
		expect(stars.length).toBe(10)
	})

	it('handles half star selection', () => {
		const handleRatingSelect = vi.fn()
		const { getAllByRole } = render(<Rating onRatingSelect={handleRatingSelect} />)
		const stars = getAllByRole('radio')

		// Stars is an array of 10 items, but we've to know that it's actually only render as 5 items
		// Taking this into consideration, when clicking 0 or 1, it's going to return 1. When clicking 2 or 3, it's going to return 2...
		// Having this into consideration, in this test we're checking if when clicking the first half part, we're getting the star returned
		fireEvent.click(stars[8]) // Here we're selecting the first half of the 5th star
		expect(handleRatingSelect).toHaveBeenCalledWith(5) // Here we're checking if it's the 5th start which is selected
	})

	it('handles full star selection', () => {
		const handleRatingSelect = vi.fn()
		const { getAllByRole } = render(<Rating onRatingSelect={handleRatingSelect} />)
		const stars = getAllByRole('radio')

		// Stars is an array of 10 items, but we've to know that it's actually only render as 5 items
		// Taking this into consideration, when clicking 0 or 1, it's going to return 1. When clicking 2 or 3, it's going to return 2...
		// Having this into consideration, in this test we're checking if when clicking the first half part, we're getting the star returned
		fireEvent.click(stars[9]) // Here we're selecting the second half of the 5th star
		expect(handleRatingSelect).toHaveBeenCalledWith(5) // Here we're checking if it's the 5th start which is selected
	})

	it('updates hover rating on mouse move (half star)', () => {
		const { getAllByRole, container } = render(<Rating onRatingSelect={() => {}} />)
		const stars = getAllByRole('radio')

		// Hover over the 3rd star second half
		fireEvent.mouseMove(stars[4])
		const halfStar = container.querySelectorAll('.fa-star-half')[2] // Checking the 3rd star is selected
		expect(halfStar).toHaveClass('text-yellow-400')
	})

	it('updates hover rating on mouse move (full star)', () => {
		const { getAllByRole, container } = render(<Rating onRatingSelect={() => {}} />)
		const stars = getAllByRole('radio')

		// Hover over the 3rd star second half
		fireEvent.mouseMove(stars[5])
		const fullStar = container.querySelectorAll('.fa-star')[2] // Checking the 3rd star is selected
		expect(fullStar).toHaveClass('text-yellow-400')
	})
})
