import React, { useState } from 'react'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'

interface StarRatingProps {
	onRatingSelect: (rating: number) => void
	rating?: number
}

// This styles are shared across a full and a half star
const commonStarStyles = 'cursor-pointer transition-colors duration-200 mr-2'

export const Rating: React.FC<StarRatingProps> = (props) => {
	const { onRatingSelect, rating } = props
	const [hoverRating, setHoverRating] = useState<number>(0)
	const stars = [1, 2, 3, 4, 5] // This Array is just to avoid using [...Array(5)] on the render and having the code being more clear, the values are not used, only the index

	const checkStarPosition = (e: React.MouseEvent<HTMLElement>, index: number) => {
		// Here we're getting the posistion of the click, to later check if it's a full or half a star
		const { left, width } = e.currentTarget.getBoundingClientRect()
		const x = e.clientX - left

		// Here we get a boolean telling us if it's actually half or a full star
		const isHalf = x < width / 2

		// With that value, we're then returning the index value, from 0 to 4 and adding the full(1) or half(.5) puntuation
		return isHalf ? index + 0.5 : index + 1
	}

	const handleClick = (e: React.MouseEvent<HTMLElement>, index: number) => {
		// In this function, we're getting the value of the current star selected from the checkStarPosition function and then
		// returning it to the parent so it can be handled as needed
		const ratingValue = checkStarPosition(e, index)
		onRatingSelect(ratingValue)
	}

	const handleMouseMove = (e: React.MouseEvent<HTMLElement>, index: number) => {
		// In this function, we're getting the value every time the user hovers on a star from the checkStarPosition function and then
		// we're rendering a full or half star on the JSX depending on it's value
		const hoverValue = checkStarPosition(e, index)
		setHoverRating(hoverValue)
	}

	return (
		<div className='flex'>
			{stars.map((_, index) => {
				const fullStarValue = index + 1
				const halfStarValue = index + 0.5
				const currentValue = rating ? hoverRating || rating : hoverRating

				return (
					<div
						key={index}
						className='relative'
						onMouseMove={(e) => handleMouseMove(e, index)}
						onClick={(e) => handleClick(e, index)}>
						{/* Half Star Render */}
						<input type='radio' name='rating' className='hidden' value={halfStarValue} />
						<FaStarHalfAlt
							className={`${commonStarStyles} absolute left-0 top-0 ${
								currentValue >= halfStarValue ? 'text-yellow-400' : 'text-gray-400'
							}`}
							size={24}
						/>

						{/* Full Star Render */}
						<input type='radio' name='rating' className='hidden' value={fullStarValue} />
						<FaStar
							className={`${commonStarStyles} ${
								currentValue >= fullStarValue ? 'text-yellow-400' : 'text-gray-400'
							}`}
							size={24}
						/>
					</div>
				)
			})}
		</div>
	)
}
