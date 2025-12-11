'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import {
	FaClock,
	FaEnvelope,
	FaMapMarkerAlt,
	FaPhoneAlt,
	FaTelegramPlane,
	FaWhatsapp,
} from 'react-icons/fa'
import { RxCross1 } from 'react-icons/rx'

interface ConectionModalProps {
	isOpen: boolean
	onClose: () => void
}

const ConectionModal = ({ isOpen, onClose }: ConectionModalProps) => {
	const modalRef = useRef<HTMLDivElement>(null)

	// Закрытие модального окна по клику вне его области и клавише Escape
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				onClose()
			}
		}

		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose()
			}
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside)
			document.addEventListener('keydown', handleEscapeKey)
			document.body.style.overflow = 'hidden'
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			document.removeEventListener('keydown', handleEscapeKey)
			document.body.style.overflow = 'unset'
		}
	}, [isOpen, onClose])

	// Телефон и контакты
	const phoneNumber = '79991234567'
	const telegramLink = `https://t.me/${phoneNumber.replace('+', '')}`
	const whatsappLink = `https://wa.me/${phoneNumber.replace('+', '')}`
	const email = 'info@example.com'
	const address = 'г. Уран-Батор, пл. Бабаясина д. 123'
	const workHours = 'Пн-Пт: 9:00-18:00'

	if (!isOpen) return null

	return (
		<>
			{/* Оверлей с затемнением */}
			<div className='fixed inset-0 bg-black/50 z-40' />

			<div className='fixed inset-0 flex items-center justify-center z-50 p-4'>
				<div
					ref={modalRef}
					className='bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-scale-in shadow-2xl'
				>
					{/* Заголовок модального окна */}
					<div className='flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10'>
						<h3 className='text-2xl font-bold text-gray-800'>
							Связаться с нами
						</h3>
						<button
							onClick={onClose}
							className='text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full cursor-pointer'
							aria-label='Закрыть'
						>
							<RxCross1 className='size-6 text-(--accent-color2)' />
						</button>
					</div>

					{/* Тело модального окна с контактами */}
					<div className='p-6 space-y-6'>
						{/* Основные контакты */}
						<div className='space-y-4'>
							<div className='flex items-center gap-3'>
								<div className='bg-blue-100 p-3 rounded-full'>
									<FaPhoneAlt className='text-blue-600 size-5' />
								</div>
								<div>
									<p className='text-sm text-gray-500'>Телефон</p>
									<a
										href={`tel:${phoneNumber}`}
										className='text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors'
									>
										{phoneNumber.replace(
											/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/,
											'+$1 ($2) $3-$4-$5'
										)}
									</a>
								</div>
							</div>

							<div className='flex items-center gap-3'>
								<div className='bg-green-100 p-3 rounded-full'>
									<FaEnvelope className='text-green-600 size-5' />
								</div>
								<div>
									<p className='text-sm text-gray-500'>Email</p>
									<a
										href={`mailto:${email}`}
										className='text-lg font-semibold text-gray-800 hover:text-green-600 transition-colors'
									>
										{email}
									</a>
								</div>
							</div>

							<div className='flex items-center gap-3'>
								<div className='bg-purple-100 p-3 rounded-full'>
									<FaMapMarkerAlt className='text-purple-600 size-5' />
								</div>
								<div>
									<p className='text-sm text-gray-500'>Адрес</p>
									<p className='text-lg font-semibold text-gray-800'>
										{address}
									</p>
								</div>
							</div>

							<div className='flex items-center gap-3'>
								<div className='bg-yellow-100 p-3 rounded-full'>
									<FaClock className='text-yellow-600 size-5' />
								</div>
								<div>
									<p className='text-sm text-gray-500'>Режим работы</p>
									<p className='text-lg font-semibold text-gray-800'>
										{workHours}
									</p>
								</div>
							</div>
						</div>

						{/* Кнопки мессенджеров */}
						<div className='space-y-4'>
							<h4 className='text-xl font-semibold text-gray-800 text-center'>
								Напишите нам в мессенджер
							</h4>

							<div className='grid grid-cols-2 gap-4'>
								{/* Telegram кнопка */}
								<a
									href={telegramLink}
									target='_blank'
									rel='noopener noreferrer'
									className='flex items-center justify-center gap-3 bg-blue-500 text-white py-4 px-6 rounded-xl hover:bg-blue-600 transition-colors font-semibold'
								>
									<FaTelegramPlane className='size-6' />
									<span>Telegram</span>
								</a>

								{/* WhatsApp кнопка */}
								<a
									href={whatsappLink}
									target='_blank'
									rel='noopener noreferrer'
									className='flex items-center justify-center gap-3 bg-green-500 text-white py-4 px-6 rounded-xl hover:bg-green-600 transition-colors font-semibold'
								>
									<FaWhatsapp className='size-6' />
									<span>WhatsApp</span>
								</a>
							</div>
						</div>

						{/* Дополнительная информация */}
						<div className='bg-gray-50 rounded-xl p-4'>
							<h5 className='font-semibold text-gray-800 mb-2'>
								Почему стоит связаться с нами:
							</h5>
							<ul className='space-y-2 text-gray-600'>
								<li className='flex items-start gap-2'>
									<span className='text-green-500 mt-1'>✓</span>
									<span>Бесплатная консультация</span>
								</li>
								<li className='flex items-start gap-2'>
									<span className='text-green-500 mt-1'>✓</span>
									<span>Быстрый ответ в мессенджерах</span>
								</li>
								<li className='flex items-start gap-2'>
									<span className='text-green-500 mt-1'>✓</span>
									<span>Профессиональные специалисты</span>
								</li>
								<li className='flex items-start gap-2'>
									<span className='text-green-500 mt-1'>✓</span>
									<span>Гибкие условия работы</span>
								</li>
							</ul>
						</div>

						{/* Ссылки на политики */}
						<p className='text-xs text-gray-500 text-center'>
							Нажимая на кнопки, вы соглашаетесь с{' '}
							<Link
								href='/privacy'
								className='text-blue-600 hover:underline font-medium'
							>
								политикой конфиденциальности
							</Link>{' '}
							и{' '}
							<Link
								href='/terms'
								className='text-blue-600 hover:underline font-medium'
							>
								обработкой персональных данных
							</Link>
						</p>
					</div>
				</div>
			</div>

			<style jsx>{`
				@keyframes scale-in {
					0% {
						opacity: 0;
						transform: scale(0.9);
					}
					100% {
						opacity: 1;
						transform: scale(1);
					}
				}

				.animate-scale-in {
					animation: scale-in 0.3s ease-out forwards;
				}
			`}</style>
		</>
	)
}

export default ConectionModal
