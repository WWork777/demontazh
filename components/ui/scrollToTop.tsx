'use client'
import { FC, useEffect, useState } from 'react'

interface ScrollToTopButtonProps {
	showAfter?: number
	className?: string
	iconColor?: string
	bgColor?: string
	textColor?: string
	position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
}

const ScrollToTopButton: FC<ScrollToTopButtonProps> = ({
	showAfter = 300,
	className = '',
	iconColor = 'currentColor',
	bgColor = 'var(--accent-color2)',
	textColor = '#fefefe',
	position = 'bottom-right',
}) => {
	const [isVisible, setIsVisible] = useState<boolean>(false)
	const [isMounted, setIsMounted] = useState<boolean>(false)

	// Позиционирование
	const positionClasses = {
		'bottom-left': 'bottom-20 left-8',
		'bottom-right': 'bottom-20 right-8',
		'top-left': 'top-20 left-8',
		'top-right': 'top-20 right-8',
	}

	useEffect(() => {
		setIsMounted(true)

		const toggleVisibility = (): void => {
			setIsVisible(window.scrollY > showAfter)
		}

		// Проверяем сразу при монтировании
		toggleVisibility()

		window.addEventListener('scroll', toggleVisibility)

		return () => {
			window.removeEventListener('scroll', toggleVisibility)
		}
	}, [showAfter])

	const scrollToTop = (): void => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	// Не рендерим на сервере
	if (!isMounted) return null

	return (
		<button
			onClick={scrollToTop}
			className={`fixed z-50 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 border cursor-pointer ${
				isVisible
					? 'opacity-100 translate-y-0'
					: 'opacity-0 translate-y-4 pointer-events-none'
			} ${positionClasses[position]} ${className}`}
			style={{
				backgroundColor: bgColor,
				color: textColor,
			}}
			aria-label='Scroll to top'
			type='button'
			title='Вернуться наверх'
		>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				className='h-6 w-6'
				fill='none'
				viewBox='0 0 24 24'
				stroke={iconColor}
				aria-hidden='true'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M5 10l7-7m0 0l7 7m-7-7v18'
				/>
			</svg>
		</button>
	)
}

export default ScrollToTopButton
