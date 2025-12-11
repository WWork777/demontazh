'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa'
import MapModal from './modals/mapModal'

interface Props {
	className?: string
}

export const Footer: React.FC<Props> = ({ className }) => {
	const [isMapModalOpen, setIsMapModalOpen] = useState(false)

	// Функции для управления модалкой карты
	const openMapModal = () => {
		setIsMapModalOpen(true)
	}

	const closeMapModal = () => {
		setIsMapModalOpen(false)
	}
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
	const handleNavLinkClick = (link: (typeof navLinks)[0]) => {
		if (link.onClick) {
			// Если есть onClick, вызываем его
			link.onClick()
		}
	}
	return (
		<>
			<footer
				className={cn(
					className,
					'rounded-[20px] mx-3 lg:mx-8 xl:mx-16 bg-(--layer-color) mb-3 lg:mb-10'
				)}
			>
				<div className='sm:container mx-auto py-11 grid grid-cols-12 px-3 '>
					<div className='col-start-1 col-end-13 md:col-end-5'>
						<div>
							{/* Логотип */}
							<Link
								href={'/'}
								className='logo text-(--accent-color2) text-[32px] md:text-[35px] lg:text-[52px] font-bebas'
							>
								ДЕМОНТАЖ<span className='text-(--accent-color1)'>42</span>
							</Link>
						</div>
						<nav className=''>
							<ul className='flex flex-col items-left gap-1'>
								{navLinks.map(link => (
									<li key={link.title}>
										{link.onClick ? (
											<button
												onClick={() => handleNavLinkClick(link)}
												className='md:text-xl hover:text-(--accent-color1) transition-colors duration-300 font-medium flex items-center gap-1 cursor-pointer bg-transparent border-none p-0'
											>
												{link.title}
											</button>
										) : (
											<Link
												href={link.path}
												className='md:text-xl hover:text-(--accent-color1) transition-colors duration-300 font-medium'
											>
												{link.title}
											</Link>
										)}
									</li>
								))}
							</ul>
						</nav>
					</div>
					<div className='col-start-1 md:col-start-5 col-end-13 md:col-end-9 flex flex-col justify-end'>
						<Link
							className='hidden md:block text-center font-medium font-montserrat hover:text-(--accent-color1)'
							href={'/privacy'}
						>
							Политика конфиденциальности
						</Link>
					</div>
					<div className='col-start-1 md:col-start-10 col-end-13 flex flex-col justify-end pt-1 md:pt-0'>
						<div className='pb-3'>
							<a
								href='tel:+79999999999'
								className='flex items-center md:justify-end gap-2 hover:text-(--accent-color1) transition-colors duration-300'
								aria-label='Позвонить по телефону'
							>
								<span className='md:text-xl font-medium'>
									+7 (999) 999 99 99
								</span>
							</a>
						</div>
						<div className='flex gap-3 md:justify-end'>
							<a
								href='https://t.me/your_username'
								target='_blank'
								rel='noopener noreferrer'
								className='bg-(--accent-color2) text-white p-2 rounded-full hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center w-10 md:w-[45px] h-10 md:h-[45px]'
								aria-label='Наш Telegram'
							>
								<FaTelegramPlane className='text-3xl mr-1' />
							</a>
							<a
								href='https://wa.me/79999999999'
								target='_blank'
								rel='noopener noreferrer'
								className='bg-(--accent-color1) text-white p-2 rounded-full hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center w-10 md:w-[45px] h-10 md:h-[45px]'
								aria-label='Наш WhatsApp'
							>
								<FaWhatsapp className='text-4xl ml-0.5' />
							</a>
						</div>
						<Link
							className='md:hidden pt-10 md:pt-0 text-center xl:text-left xl:font-xl text-sm  font-medium font-montserrat hover:text-(--accent-color1)'
							href={'/privacy'}
						>
							Политика конфиденциальности
						</Link>
					</div>
				</div>
			</footer>
			{/* Модальное окно с картой */}
			<MapModal isOpen={isMapModalOpen} onClose={closeMapModal} />
		</>
	)
}
