import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'

interface OrderModalProps {
	isOpen: boolean
	onClose: () => void
	orderData: {
		area: number
		objectType: string
		workType: string
		price: number
	}
}

export const OrderModal: React.FC<OrderModalProps> = ({
	isOpen,
	onClose,
	orderData,
}) => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [selectedMessenger, setSelectedMessenger] = useState<
		'telegram' | 'whatsapp'
	>('telegram')

	// Формирование сообщения
	const createMessage = () => {
		return `📋 Новая заявка на расчет работ

🏠 Объект: ${orderData.objectType}
📏 Площадь: ${orderData.area} м²
🔨 Тип работ: ${orderData.workType}
💰 Расчетная стоимость: ${orderData.price.toLocaleString('ru-RU')} ₽

📅 Дата заявки: ${new Date().toLocaleString('ru-RU')}`
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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)

		try {
			if (selectedMessenger === 'telegram') {
				sendToTelegram()
			} else {
				sendToWhatsApp()
			}

			setTimeout(() => {
				onClose()
				setIsSubmitting(false)
			}, 1500)
		} catch (error) {
			console.error('Ошибка отправки:', error)
			setIsSubmitting(false)
		}
	}

	// Закрытие по ESC
	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
		}
		if (isOpen) {
			document.addEventListener('keydown', handleEsc)
			document.body.style.overflow = 'hidden'
		}
		return () => {
			document.removeEventListener('keydown', handleEsc)
			document.body.style.overflow = 'auto'
		}
	}, [isOpen, onClose])

	if (!isOpen) return null

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm'>
			<div
				className='relative w-full max-w-md border border-black rounded-[20px] bg-white'
				onClick={e => e.stopPropagation()}
			>
				{/* Заголовок */}
				<div className='p-4 border-b border-gray-200'>
					<div className='flex items-center justify-between'>
						<h2 className='text-xl font-bold text-gray-900'>
							Отправить расчет в мессенджер
						</h2>
						<button
							onClick={onClose}
							className='p-1 text-gray-500 hover:text-gray-700 transition-colors'
							aria-label='Закрыть'
						>
							<svg
								className='w-5 h-5'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</button>
					</div>
					<p className='text-gray-600 mt-1 text-sm'>
						Выберите мессенджер для отправки расчета
					</p>
				</div>

				<div className='p-4'>
					{/* Информация о расчете */}
					<div className='mb-4 p-3 bg-(--layer-color) rounded-[10px] border border-gray-200'>
						<div className='grid grid-cols-2 gap-2'>
							<div className='space-y-1'>
								<p className='text-xs text-gray-500'>Площадь</p>
								<p className='text-sm font-semibold text-(--accent-color1)'>
									{orderData.area} м²
								</p>
							</div>
							<div className='space-y-1'>
								<p className='text-xs text-gray-500'>Объект</p>
								<p className='text-sm font-semibold text-(--accent-color1)'>
									{orderData.objectType}
								</p>
							</div>
							<div className='space-y-1'>
								<p className='text-xs text-gray-500'>Тип работ</p>
								<p className='text-sm font-semibold text-(--accent-color1)'>
									{orderData.workType}
								</p>
							</div>
							<div className='space-y-1'>
								<p className='text-xs text-gray-500'>Стоимость</p>
								<p className='text-sm font-semibold text-(--accent-color1)'>
									{orderData.price.toLocaleString('ru-RU')} ₽
								</p>
							</div>
						</div>
					</div>

					{/* Выбор мессенджера */}
					<div className='mb-4'>
						<p className='text-sm font-medium text-gray-700 mb-2'>
							Выберите мессенджер
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
								<svg
									className='w-8 h-8'
									fill='currentColor'
									viewBox='0 0 24 24'
								>
									<path d='M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.064-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' />
								</svg>
								<span className='text-sm font-medium'>Telegram</span>
							</button>

							<button
								type='button'
								onClick={() => setSelectedMessenger('whatsapp')}
								className={cn(
									'p-3 border-2 rounded-[10px] flex flex-col items-center justify-center space-y-2 transition-all',
									selectedMessenger === 'whatsapp'
										? 'border-(--accent-color2)	 bg-green-50'
										: 'border-gray-200 hover:border-gray-300'
								)}
							>
								<svg
									className='w-8 h-8'
									fill='currentColor'
									viewBox='0 0 24 24'
								>
									<path d='M12.032 0a12 12 0 0 0-10.56 17.76L0 24l6.336-1.44A12 12 0 1 0 12.032 0zm6.336 15.84c-.288.816-1.44 1.44-2.304 1.632-.576.096-1.344.192-3.936-.96-3.36-1.536-5.52-5.28-5.664-5.52-.144-.24-1.152-1.536-1.152-2.928 0-1.392.72-2.064.96-2.304.24-.24.48-.336.624-.336.144 0 .288 0 .336.048.096.048.144.144.24.432.096.288.336 1.104.384 1.248.048.144.096.336.048.48-.048.144-.048.24-.096.336-.048.096-.096.192-.144.24-.048.048-.096.144-.192.24-.096.096-.192.24-.096.432.096.192.432.912.936 1.44.672.72 1.44 1.248 1.68 1.392.24.144.384.144.528.048.144-.096.576-.48.72-.624.144-.144.288-.192.432-.144.144.048.912.432 1.056.528.144.096.288.144.336.24.048.096.048.528-.24 1.344z' />
								</svg>
								<span className='text-sm font-medium'>WhatsApp</span>
							</button>
						</div>
					</div>

					{/* Кнопки */}
					<div className='space-y-2'>
						<form onSubmit={handleSubmit}>
							<Button
								type='submit'
								className='w-full rounded-[10px] py-3 bg-(--accent-color1) text-white text-base font-semibold hover:bg-(--accent-color2) transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
								text={isSubmitting ? 'Отправка...' : 'Отправить расчет'}
								disabled={isSubmitting}
							/>
						</form>
						<Button
							type='button'
							onClick={onClose}
							className='w-full py-3 border border-gray-300 rounded-[10px] text-gray-700 font-medium hover:border-gray-400 transition-colors'
							text='Отмена'
						/>
					</div>

					{/* Информация о конфиденциальности */}
					<div className='mt-4 pt-4 border-t border-gray-200'>
						<p className='text-xs text-gray-500 text-center'>
							Расчет будет отправлен в выбранный мессенджер. Для уточнения
							деталей с вами свяжется менеджер.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
