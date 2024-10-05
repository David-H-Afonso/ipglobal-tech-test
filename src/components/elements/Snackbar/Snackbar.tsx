import React from 'react'
import { createPortal } from 'react-dom'

export interface SnackbarProps {
	message: string
	isSuccess: boolean
	isVisible: boolean
}

export const Snackbar: React.FC<SnackbarProps> = (props) => {
	const { message, isSuccess, isVisible } = props
	const element = document.getElementById('snackbarPortal')
	if (!element) return null

	return createPortal(
		<div
			className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 transition-opacity duration-300 ease-in-out z-[999] ${
				isVisible ? 'opacity-100' : 'opacity-0'
			}`}>
			<div
				className={`px-4 py-2 rounded-lg text-white shadow-lg ${
					isSuccess ? 'bg-green-500' : 'bg-red-500'
				}`}>
				{message}
			</div>
		</div>,
		element
	)
}
