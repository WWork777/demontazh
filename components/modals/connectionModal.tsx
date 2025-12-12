'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import {
	FaClock,
	FaEnvelope,
	FaMapMarkerAlt,
	FaPhoneAlt,
	FaTelegramPlane,
	FaWhatsapp,
} from 'react-icons/fa'
import { RxCross1 } from 'react-icons/rx'

interface ConnectionModalProps {
	isOpen: boolean
	onClose: () => void
}

const ConnectionModal = ({ isOpen, onClose }: ConnectionModalProps) => {
	const modalRef = useRef<HTMLDivElement>(null)
	const [selectedMessenger, setSelectedMessenger] = useState<
		'telegram' | 'whatsapp'
	>('telegram')

	// Телефон и контакты
	const phoneNumber = '79991234567'
	const formattedPhone = phoneNumber.replace(
		/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/,
		'+$1 ($2) $3-$4-$5'
	)
	const telegramLink = `https://t.me/${phoneNumber.replace('+', '')}`
	const whatsappLink = `https://wa.me/${phoneNumber.replace('+', '')}`
	const email = 'info@example.com'
	const address = 'г. Уран-Батор, пл. Бабаясина д. 123'
	const workHours = 'Пн-Пт: 9:00-18:00'

	// Формирование сообщения
	const createMessage = () => {
		return `📱 Запрос на связь\n\n👤 Клиент заинтересован в наших услугах\n📞 Телефон: ${formattedPhone}\n📅 Дата обращения: ${new Date().toLocaleString(
			'ru-RU'
		)}`
	}

	// Отправка в Telegram
	const sendToTelegram = () => {
		const message = createMessage()
		const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
		const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID

		if (botToken && chatId) {
			fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					chat_id: chatId,
					text: message,
					parse_mode: 'HTML',
				}),
			})
		} else {
			const url = `https://t.me/share/url?url=&text=${encodeURIComponent(
				message
			)}`
			window.open(url, '_blank')
		}
	}

	// Отправка в WhatsApp
	const sendToWhatsApp = () => {
		const message = createMessage()
		const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''
		const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
			message
		)}`
		window.open(url, '_blank')
	}

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

	if (!isOpen) return null

	return (
		<>
			<div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
				<div
					ref={modalRef}
					className='relative w-full max-w-md border border-black rounded-[20px] bg-white'
				>
					{/* Заголовок модального окна */}
					<div className='p-4 border-b border-gray-200'>
						<div className='flex items-center justify-between'>
							<h3 className='text-xl font-bold text-gray-900'>
								Связаться с нами
							</h3>
							<button
								onClick={onClose}
								className='p-1 text-gray-500 hover:text-gray-700 transition-colors'
								aria-label='Закрыть'
							>
								<RxCross1 className='size-5' />
							</button>
						</div>
						<p className='text-gray-600 mt-1 text-sm'>
							Выберите удобный способ связи
						</p>
					</div>

					{/* Контент модального окна */}
					<div className='p-4 space-y-4'>
						{/* Основные контакты */}
						<div className='bg-(--layer-color) rounded-[10px] border border-gray-200 p-3'>
							<div className='grid grid-cols-1 gap-3'>
								<div className='flex items-center gap-3'>
									<FaPhoneAlt className='text-(--accent-color1) size-4 shrink-0' />
									<div className='flex-1'>
										<p className='text-xs text-gray-500'>Телефон</p>
										<a
											href={`tel:${phoneNumber}`}
											className='text-sm font-semibold text-gray-800 hover:text-(--accent-color1) transition-colors'
										>
											{formattedPhone}
										</a>
									</div>
								</div>

								<div className='flex items-center gap-3'>
									<FaEnvelope className='text-(--accent-color1) size-4 shrink-0' />
									<div className='flex-1'>
										<p className='text-xs text-gray-500'>Email</p>
										<a
											href={`mailto:${email}`}
											className='text-sm font-semibold text-gray-800 hover:text-(--accent-color1) transition-colors'
										>
											{email}
										</a>
									</div>
								</div>

								<div className='flex items-center gap-3'>
									<FaMapMarkerAlt className='text-(--accent-color1) size-4 shrink-0' />
									<div className='flex-1'>
										<p className='text-xs text-gray-500'>Адрес</p>
										<p className='text-sm font-semibold text-gray-800'>
											{address}
										</p>
									</div>
								</div>

								<div className='flex items-center gap-3'>
									<FaClock className='text-(--accent-color1) size-4 flex-shrink-0' />
									<div className='flex-1'>
										<p className='text-xs text-gray-500'>Режим работы</p>
										<p className='text-sm font-semibold text-gray-800'>
											{workHours}
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Выбор мессенджера */}
						<div>
							<p className='text-sm font-medium text-gray-700 mb-2'>
								Написать в мессенджер
							</p>
							<div className='grid grid-cols-2 gap-3'>
								<button
									type='button'
									onClick={() => setSelectedMessenger('telegram')}
									className={cn(
										'p-3 border-2 rounded-[10px] flex flex-col items-center justify-center space-y-2 transition-all',
										selectedMessenger === 'telegram'
											? 'border-(--accent-color1) bg-(--accent-color1)/5'
											: 'border-gray-200 hover:border-gray-300'
									)}
								>
									<FaTelegramPlane className='size-6 text-blue-500' />
									<span className='text-sm font-medium'>Telegram</span>
								</button>

								<button
									type='button'
									onClick={() => setSelectedMessenger('whatsapp')}
									className={cn(
										'p-3 border-2 rounded-[10px] flex flex-col items-center justify-center space-y-2 transition-all',
										selectedMessenger === 'whatsapp'
											? 'border-green-500 bg-green-50'
											: 'border-gray-200 hover:border-gray-300'
									)}
								>
									<FaWhatsapp className='size-6 text-green-500' />
									<span className='text-sm font-medium'>WhatsApp</span>
								</button>
							</div>
						</div>

						{/* Прямые ссылки на мессенджеры */}
						<div className='space-y-2'>
							<a
								href={telegramLink}
								target='_blank'
								rel='noopener noreferrer'
								className='block w-full text-center py-2.5 border border-gray-300 rounded-[10px] text-gray-700 font-medium hover:border-gray-400 transition-colors'
							>
								Перейти в Telegram
							</a>
							<a
								href={whatsappLink}
								target='_blank'
								rel='noopener noreferrer'
								className='block w-full text-center py-2.5 border border-gray-300 rounded-[10px] text-gray-700 font-medium hover:border-gray-400 transition-colors'
							>
								Перейти в WhatsApp
							</a>
						</div>

						{/* Информация о конфиденциальности */}
						<div className='pt-4 border-t border-gray-200'>
							<p className='text-xs text-gray-500 text-center'>
								Нажимая на кнопки, вы соглашаетесь с{' '}
								<Link
									href='/privacy'
									className='text-(--accent-color1) hover:underline font-medium'
								>
									политикой конфиденциальности
								</Link>{' '}
								и даете согласие на обработку персональных данных
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ConnectionModal
