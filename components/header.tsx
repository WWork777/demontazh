// 'use client'

// import { cn } from '@/lib/utils'
// import Link from 'next/link'
// import React, { useEffect, useRef, useState } from 'react'
// import {
// 	FaBars,
// 	FaPhone,
// 	FaTelegramPlane,
// 	FaTimes,
// 	FaWhatsapp,
// } from 'react-icons/fa'
// import MapModal from './modals/mapModal'

// interface Props {
// 	className?: string
// }

// export const Header: React.FC<Props> = ({ className }) => {
// 	const [isMenuOpen, setIsMenuOpen] = useState(false)
// 	const [isAnimating, setIsAnimating] = useState(false)
// 	const menuRef = useRef<HTMLDivElement>(null)

// 	const navLinks = [
// 		{ title: 'О компании', path: '/#about' },
// 		{ title: 'Этапы работы', path: '/#stages' },
// 		{ title: 'Услуги', path: '/#services' },
// 		{ title: 'FAQ', path: '/#faq' },
// 		{ title: 'Контакты', path: '/#contacts' },
// 	]

// 	const handleMenuToggle = () => {
// 		if (!isMenuOpen) {
// 			// Открываем меню
// 			setIsMenuOpen(true)
// 			// Даем время для рендера DOM элемента перед анимацией
// 			setTimeout(() => {
// 				setIsAnimating(true)
// 			}, 10)
// 		} else {
// 			// Закрываем меню
// 			setIsAnimating(false)
// 			setTimeout(() => {
// 				setIsMenuOpen(false)
// 			}, 300)
// 		}
// 	}

// 	const handleLinkClick = () => {
// 		if (isMenuOpen) {
// 			setIsAnimating(false)
// 			setTimeout(() => {
// 				setIsMenuOpen(false)
// 			}, 300)
// 		}
// 	}

// 	const [isMapModalOpen, setIsMapModalOpen] = useState(false)
// 	// Добавьте обработчики для модального окна с картой
// 	const openMapModal = () => {
// 		setIsMapModalOpen(true)
// 	}

// 	const closeMapModal = () => {
// 		setIsMapModalOpen(false)
// 	}

// 	useEffect(() => {
// 		// Вычисляем высоту header и устанавливаем CSS переменную
// 		const header = document.querySelector('header')
// 		if (header) {
// 			const headerHeight = header.offsetHeight
// 			document.documentElement.style.setProperty(
// 				'--header-height',
// 				`${headerHeight}px`
// 			)
// 		}
// 	}, [])

// 	// Блокировка скролла при открытом меню
// 	useEffect(() => {
// 		if (isMenuOpen) {
// 			document.body.style.overflow = 'hidden'
// 		} else {
// 			document.body.style.overflow = 'unset'
// 		}

// 		return () => {
// 			document.body.style.overflow = 'unset'
// 		}
// 	}, [isMenuOpen])

// 	// Закрытие меню при нажатии Escape
// 	useEffect(() => {
// 		const handleEscape = (e: KeyboardEvent) => {
// 			if (e.key === 'Escape' && isMenuOpen) {
// 				handleMenuToggle()
// 			}
// 		}

// 		window.addEventListener('keydown', handleEscape)
// 		return () => window.removeEventListener('keydown', handleEscape)
// 	}, [isMenuOpen])

// 	// Закрытие меню при клике вне области
// 	useEffect(() => {
// 		const handleClickOutside = (e: MouseEvent) => {
// 			if (
// 				menuRef.current &&
// 				!menuRef.current.contains(e.target as Node) &&
// 				isMenuOpen
// 			) {
// 				handleMenuToggle()
// 			}
// 		}

// 		document.addEventListener('mousedown', handleClickOutside)
// 		return () => document.removeEventListener('mousedown', handleClickOutside)
// 	}, [isMenuOpen])

// 	return (
// 		<>
// 			<header className={cn(className, 'py-3 px-2 md:px-3')}>
// 				<div className='container mx-auto flex items-center justify-around lg:justify-between'>
// 					{/* Логотип */}
// 					<Link
// 						href={'/'}
// 						className='logo text-(--accent-color2) text-[32px] md:text-[35px] lg:text-[52px] font-bebas'
// 					>
// 						ДЕМОНТАЖ<span className='text-(--accent-color1)'>42</span>
// 					</Link>

// 					{/* Десктопное меню (скрыто на мобильных) */}
// 					<nav className='hidden md:flex items-center gap-8'>
// 						<ul className='flex items-center gap-2 xl:gap-4 2xl:gap-8'>
// 							{navLinks.map(link => (
// 								<li key={link.path}>
// 									<Link
// 										href={link.path}
// 										className='text-xl lg:text-2xl hover:text-(--accent-color1) transition-colors duration-300 font-medium'
// 									>
// 										{link.title}
// 									</Link>
// 								</li>
// 							))}
// 						</ul>
// 					</nav>

// 					{/* Десктопные контакты (скрыто на мобильных) */}
// 					<div className='hidden lg:flex items-center gap-4'>
// 						{/* Иконки соцсетей с черным фоном */}
// 						<div className='flex items-center gap-2'>
// 							{/* Ссылка на телефон */}
// 							<a
// 								href='tel:+79999999999'
// 								className='flex items-center gap-2 text-gray-700 hover:text-(--accent-color1) transition-colors duration-300'
// 								aria-label='Позвонить по телефону'
// 							>
// 								<div
// 									style={{ width: '45px', height: '45px' }}
// 									className='bg-(--accent-color1) text-white p-2 rounded-full hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center xl:hidden'
// 								>
// 									{' '}
// 									<FaPhone className='text-2xl' />
// 								</div>
// 								<span className='hidden xl:block text-lg'>
// 									+7 (999) 999 99 99
// 								</span>
// 							</a>
// 							<a
// 								href='https://t.me/your_username'
// 								target='_blank'
// 								rel='noopener noreferrer'
// 								className='bg-(--accent-color2) text-white p-2 rounded-full hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center'
// 								aria-label='Наш Telegram'
// 								style={{ width: '45px', height: '45px' }}
// 							>
// 								<FaTelegramPlane className='text-3xl mr-1' />
// 							</a>
// 							<a
// 								href='https://wa.me/79999999999'
// 								target='_blank'
// 								rel='noopener noreferrer'
// 								className='bg-(--accent-color1) text-white p-2 rounded-full hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center'
// 								aria-label='Наш WhatsApp'
// 								style={{ width: '45px', height: '45px' }}
// 							>
// 								<FaWhatsapp className='text-4xl ml-0.5' />
// 							</a>
// 						</div>
// 					</div>

// 					{/* Кнопка бургер-меню (только на мобильных) */}
// 					<button
// 						className='md:hidden text-2xl text-gray-700 hover:text-(--accent-color1) transition-colors duration-300 z-50 relative'
// 						onClick={handleMenuToggle}
// 						aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
// 					>
// 						{isMenuOpen ? <FaTimes /> : <FaBars />}
// 					</button>
// 				</div>

// 				{/* Мобильное меню - выезжает сверху */}
// 				{(isMenuOpen || isAnimating) && (
// 					<div className='md:hidden fixed inset-0 z-40' ref={menuRef}>
// 						{/* Затемнение фона */}
// 						<div
// 							className={`absolute inset-0 bg-black transition-opacity duration-300 ${
// 								isAnimating ? 'opacity-50' : 'opacity-0'
// 							}`}
// 							onClick={handleMenuToggle}
// 						/>

// 						{/* Само меню */}
// 						<div
// 							className={`absolute top-0 left-0 right-0 bg-white shadow-lg transform transition-all duration-300 ease-out ${
// 								isAnimating ? 'translate-y-0' : '-translate-y-full'
// 							}`}
// 							style={{
// 								// Гарантируем, что меню всегда будет в DOM во время анимации
// 								visibility: isMenuOpen ? 'visible' : 'hidden',
// 							}}
// 						>
// 							{/* Контент меню */}
// 							<div className='container mx-auto px-4 py-8'>
// 								{/* Навигация */}
// 								<ul className='flex flex-col gap-6 mb-8'>
// 									{navLinks.map(link => (
// 										<li key={link.path}>
// 											<Link
// 												href={link.path}
// 												className='text-2xl text-gray-800 hover:text-(--accent-color1) transition-colors duration-300 font-wix block py-1'
// 												onClick={handleLinkClick}
// 											>
// 												{link.title}
// 											</Link>
// 										</li>
// 									))}
// 								</ul>

// 								{/* Контакты */}
// 								<div className='border-t border-gray-200 pt-6'>
// 									{/* Телефон */}
// 									<a
// 										href='tel:+79999999999'
// 										className='flex items-center gap-4 text-gray-700 hover:text-(--accent-color1) transition-colors duration-300 mb-6'
// 										onClick={handleLinkClick}
// 									>
// 										<div className='bg-gray-100 p-3 rounded-full'>
// 											<FaPhone className='text-xl' />
// 										</div>
// 										<div>
// 											<span className='text-sm text-gray-500'>
// 												Позвоните нам
// 											</span>
// 											<p className='text-xl font-semibold'>
// 												+7 (999) 999 99 99
// 											</p>
// 										</div>
// 									</a>

// 									{/* Соцсети */}
// 									<div className='mb-6'>
// 										<span className='text-gray-600 block mb-4'>
// 											Мы в соцсетях:
// 										</span>
// 										<div className='flex items-center gap-4'>
// 											<a
// 												href='https://t.me/your_username'
// 												target='_blank'
// 												rel='noopener noreferrer'
// 												className='bg-(--accent-color2) text-white p-3 rounded-full hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center'
// 												aria-label='Наш Telegram'
// 												style={{ width: '45px', height: '45px' }}
// 												onClick={handleLinkClick}
// 											>
// 												<FaTelegramPlane className='text-3xl mr-1' />
// 											</a>
// 											<a
// 												href='https://wa.me/79999999999'
// 												target='_blank'
// 												rel='noopener noreferrer'
// 												className='bg-(--accent-color1) text-white p-3 rounded-full hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center'
// 												aria-label='Наш WhatsApp'
// 												style={{ width: '45px', height: '45px' }}
// 												onClick={handleLinkClick}
// 											>
// 												<FaWhatsapp className='text-3xl' />
// 											</a>
// 										</div>
// 									</div>

// 									{/* Кнопка заказа звонка */}
// 									<button
// 										className='w-full bg-(--accent-color1) text-white py-4 rounded-[76px] hover:bg-(--accent-color1)/90 transition-colors duration-300 font-semibold text-lg'
// 										onClick={() => {
// 											handleLinkClick()
// 											// Здесь можно добавить логику открытия формы заказа звонка
// 										}}
// 									>
// 										Заказать звонок
// 									</button>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				)}
// 			</header>
// 			<MapModal isOpen={isMapModalOpen} onClose={closeMapModal} />
// 		</>
// 	)
// }
'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import {
	FaBars,
	FaPhone,
	FaTelegramPlane,
	FaTimes,
	FaWhatsapp,
} from 'react-icons/fa'
import MapModal from './modals/mapModal'

interface Props {
	className?: string
}

export const Header: React.FC<Props> = ({ className }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isAnimating, setIsAnimating] = useState(false)
	const menuRef = useRef<HTMLDivElement>(null)
	const [isMapModalOpen, setIsMapModalOpen] = useState(false)

	const navLinks = [
		{ title: 'О компании', path: '/#about' },
		{ title: 'Этапы работы', path: '/#stages' },
		{ title: 'Услуги', path: '/#services' },
		{ title: 'FAQ', path: '/#faq' },
		{
			title: 'Контакты',
			path: '#', // Оставляем # для href
			onClick: () => openMapModal(), // Обработчик для открытия модалки
		},
	]

	// Функции для управления модалкой карты
	const openMapModal = () => {
		setIsMapModalOpen(true)
	}

	const closeMapModal = () => {
		setIsMapModalOpen(false)
	}

	const handleMenuToggle = () => {
		if (!isMenuOpen) {
			setIsMenuOpen(true)
			setTimeout(() => {
				setIsAnimating(true)
			}, 10)
		} else {
			setIsAnimating(false)
			setTimeout(() => {
				setIsMenuOpen(false)
			}, 300)
		}
	}

	const handleLinkClick = () => {
		if (isMenuOpen) {
			setIsAnimating(false)
			setTimeout(() => {
				setIsMenuOpen(false)
			}, 300)
		}
	}

	// Обработчик для ссылок с проверкой onClick
	const handleNavLinkClick = (link: (typeof navLinks)[0]) => {
		if (link.onClick) {
			// Если есть onClick, вызываем его
			link.onClick()
		}

		// Закрываем мобильное меню если оно открыто
		if (isMenuOpen) {
			handleLinkClick()
		}
	}

	useEffect(() => {
		const header = document.querySelector('header')
		if (header) {
			const headerHeight = header.offsetHeight
			document.documentElement.style.setProperty(
				'--header-height',
				`${headerHeight}px`
			)
		}
	}, [])

	// Блокировка скролла при открытом меню
	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}

		return () => {
			document.body.style.overflow = 'unset'
		}
	}, [isMenuOpen])

	// Закрытие меню при нажатии Escape
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isMenuOpen) {
				handleMenuToggle()
			}
		}

		window.addEventListener('keydown', handleEscape)
		return () => window.removeEventListener('keydown', handleEscape)
	}, [isMenuOpen])

	// Закрытие меню при клике вне области
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(e.target as Node) &&
				isMenuOpen
			) {
				handleMenuToggle()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [isMenuOpen])

	return (
		<>
			<header className={cn(className, 'py-3 px-2 md:px-3')}>
				<div className='container mx-auto flex items-center justify-around lg:justify-between'>
					{/* Логотип */}
					<Link
						href={'/'}
						className='logo text-(--accent-color2) text-[32px] md:text-[35px] lg:text-[52px] font-bebas'
					>
						ДЕМОНТАЖ<span className='text-(--accent-color1)'>42</span>
					</Link>

					{/* Десктопное меню (скрыто на мобильных) */}
					<nav className='hidden md:flex items-center gap-8'>
						<ul className='flex items-center gap-2 xl:gap-4 2xl:gap-8'>
							{navLinks.map(link => (
								<li key={link.title}>
									{link.onClick ? (
										// Кнопка для Контактов (открывает модалку)
										<button
											onClick={() => handleNavLinkClick(link)}
											className='text-xl lg:text-2xl hover:text-(--accent-color1) transition-colors duration-300 font-medium flex items-center gap-1 cursor-pointer bg-transparent border-none p-0'
										>
											{link.title}
										</button>
									) : (
										// Обычная ссылка для остальных пунктов
										<Link
											href={link.path}
											className='text-xl lg:text-2xl hover:text-(--accent-color1) transition-colors duration-300 font-medium'
										>
											{link.title}
										</Link>
									)}
								</li>
							))}
						</ul>
					</nav>

					{/* Десктопные контакты (скрыто на мобильных) */}
					<div className='hidden lg:flex items-center gap-4'>
						{/* Иконки соцсетей с черным фоном */}
						<div className='flex items-center gap-2'>
							{/* Кнопка открытия карты (десктоп) */}
							<button
								onClick={openMapModal}
								className='flex items-center gap-2 text-gray-700 hover:text-(--accent-color1) transition-colors duration-300 cursor-pointer bg-transparent border-none p-0'
								aria-label='Открыть карту'
							></button>

							{/* Ссылка на телефон */}
							<a
								href='tel:+79999999999'
								className='flex items-center gap-2 text-gray-700 hover:text-(--accent-color1) transition-colors duration-300'
								aria-label='Позвонить по телефону'
							>
								<div
									style={{ width: '45px', height: '45px' }}
									className='bg-(--accent-color1) text-white p-2 rounded-full hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center xl:hidden'
								>
									<FaPhone className='text-2xl' />
								</div>
								<span className='hidden xl:block text-lg'>
									+7 (999) 999 99 99
								</span>
							</a>
							<a
								href='https://t.me/your_username'
								target='_blank'
								rel='noopener noreferrer'
								className='bg-(--accent-color2) text-white p-2 rounded-full hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center'
								aria-label='Наш Telegram'
								style={{ width: '45px', height: '45px' }}
							>
								<FaTelegramPlane className='text-3xl mr-1' />
							</a>
							<a
								href='https://wa.me/79999999999'
								target='_blank'
								rel='noopener noreferrer'
								className='bg-(--accent-color1) text-white p-2 rounded-full hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center'
								aria-label='Наш WhatsApp'
								style={{ width: '45px', height: '45px' }}
							>
								<FaWhatsapp className='text-4xl ml-0.5' />
							</a>
						</div>
					</div>

					{/* Кнопка бургер-меню (только на мобильных) */}
					<button
						className='md:hidden text-2xl text-gray-700 hover:text-(--accent-color1) transition-colors duration-300 z-50 relative'
						onClick={handleMenuToggle}
						aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
					>
						{isMenuOpen ? <FaTimes /> : <FaBars />}
					</button>
				</div>

				{/* Мобильное меню - выезжает сверху */}
				{(isMenuOpen || isAnimating) && (
					<div className='md:hidden fixed inset-0 z-40' ref={menuRef}>
						{/* Затемнение фона */}
						<div
							className={`absolute inset-0 bg-black transition-opacity duration-300 ${
								isAnimating ? 'opacity-50' : 'opacity-0'
							}`}
							onClick={handleMenuToggle}
						/>

						{/* Само меню */}
						<div
							className={`absolute top-0 left-0 right-0 bg-white shadow-lg transform transition-all duration-300 ease-out ${
								isAnimating ? 'translate-y-0' : '-translate-y-full'
							}`}
							style={{
								visibility: isMenuOpen ? 'visible' : 'hidden',
							}}
						>
							{/* Контент меню */}
							<div className='container mx-auto px-4 py-8'>
								{/* Навигация */}
								<ul className='flex flex-col gap-6 mb-8'>
									{navLinks.map(link => (
										<li key={link.title}>
											{link.onClick ? (
												// Кнопка для Контактов в мобильном меню
												<button
													onClick={() => {
														handleNavLinkClick(link)
														openMapModal()
													}}
													className='text-2xl text-gray-800 hover:text-(--accent-color1) transition-colors duration-300 font-wix py-1 w-full text-left flex items-center gap-2 bg-transparent border-none p-0'
												>
													{link.title}
												</button>
											) : (
												// Обычная ссылка для остальных пунктов
												<Link
													href={link.path}
													className='text-2xl text-gray-800 hover:text-(--accent-color1) transition-colors duration-300 font-wix block py-1'
													onClick={handleLinkClick}
												>
													{link.title}
												</Link>
											)}
										</li>
									))}
								</ul>

								{/* Контакты */}
								<div className='border-t border-gray-200 pt-6'>
									{/* Телефон */}
									<a
										href='tel:+79999999999'
										className='flex items-center gap-4 text-gray-700 hover:text-(--accent-color1) transition-colors duration-300 mb-6'
										onClick={handleLinkClick}
									>
										<div className='bg-gray-100 p-3 rounded-full'>
											<FaPhone className='text-xl' />
										</div>
										<div>
											<span className='text-sm text-gray-500'>
												Позвоните нам
											</span>
											<p className='text-xl font-semibold'>
												+7 (999) 999 99 99
											</p>
										</div>
									</a>

									{/* Соцсети */}
									<div className='mb-6'>
										<span className='text-gray-600 block mb-4'>
											Мы в соцсетях:
										</span>
										<div className='flex items-center gap-4'>
											<a
												href='https://t.me/your_username'
												target='_blank'
												rel='noopener noreferrer'
												className='bg-(--accent-color2) text-white p-3 rounded-full hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center'
												aria-label='Наш Telegram'
												style={{ width: '45px', height: '45px' }}
												onClick={handleLinkClick}
											>
												<FaTelegramPlane className='text-3xl mr-1' />
											</a>
											<a
												href='https://wa.me/79999999999'
												target='_blank'
												rel='noopener noreferrer'
												className='bg-(--accent-color1) text-white p-3 rounded-full hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center'
												aria-label='Наш WhatsApp'
												style={{ width: '45px', height: '45px' }}
												onClick={handleLinkClick}
											>
												<FaWhatsapp className='text-3xl' />
											</a>
										</div>
									</div>

									{/* Кнопка заказа звонка */}
									<button
										className='w-full bg-(--accent-color1) text-white py-4 rounded-[76px] hover:bg-(--accent-color1)/90 transition-colors duration-300 font-semibold text-lg'
										onClick={() => {
											handleLinkClick()
											// Здесь можно добавить логику открытия формы заказа звонка
										}}
									>
										Заказать звонок
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</header>

			{/* Модальное окно с картой */}
			<MapModal isOpen={isMapModalOpen} onClose={closeMapModal} />
		</>
	)
}
