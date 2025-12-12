'use client'
import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import {
	FaBus,
	FaCar,
	FaClock,
	FaCompass,
	FaMapMarkedAlt,
	FaPhone,
	FaSubway,
} from 'react-icons/fa'
import { RxCross1 } from 'react-icons/rx'

interface MapModalProps {
	isOpen: boolean
	onClose: () => void
}

const MapModal = ({ isOpen, onClose }: MapModalProps) => {
	const modalRef = useRef<HTMLDivElement>(null)
	const [isIframeLoaded, setIsIframeLoaded] = useState<boolean>(false)
	const [isMobile, setIsMobile] = useState(false)

	// Координаты центра Кемерово
	const center: [number, number] = [55.3542, 86.0897]

	// Определяем мобильное устройство
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 640)
		}

		checkMobile()
		window.addEventListener('resize', checkMobile)
		return () => window.removeEventListener('resize', checkMobile)
	}, [])

	// Закрытие модального окна
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
		<div className='fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto'>
			<div
				ref={modalRef}
				className={cn(
					'relative w-full max-w-2xl border border-black rounded-[20px] bg-white',
					'my-auto max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)] overflow-hidden'
				)}
				onClick={e => e.stopPropagation()}
			>
				{/* Заголовок - фиксированный */}
				<div className='sticky top-0 bg-white p-3 sm:p-4 border-b border-gray-200 rounded-t-[20px] z-10'>
					<div className='flex items-center justify-between'>
						<div>
							<h2 className='text-lg sm:text-xl font-bold text-gray-900'>
								Наш офис
							</h2>
							<p className='text-xs sm:text-sm text-gray-600 mt-0.5'>
								г. Кемерово, ул. Садовая, 123
							</p>
						</div>
						<button
							onClick={onClose}
							className='p-1.5 text-gray-500 hover:text-gray-700 transition-colors'
							aria-label='Закрыть'
						>
							<RxCross1 className='size-5' />
						</button>
					</div>
				</div>

				{/* Прокручиваемый контент */}
				<div className='overflow-y-auto max-h-[calc(100vh-8rem)] sm:max-h-[calc(100vh-10rem)]'>
					<div className='p-3 sm:p-4 space-y-4'>
						{/* Яндекс.Карты через iframe */}
						<div className='h-48 sm:h-64 w-full rounded-[10px] overflow-hidden border-2 border-gray-200 relative'>
							{!isIframeLoaded && (
								<div className='absolute inset-0 flex items-center justify-center bg-gray-100'>
									<div className='text-center text-gray-500'>
										<div className='animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-(--accent-color1) mx-auto mb-2'></div>
										<p className='text-xs sm:text-sm'>Загрузка карты...</p>
									</div>
								</div>
							)}

							<iframe
								src={`https://yandex.ru/map-widget/v1/?ll=${center[1]}%2C${center[0]}&z=15&pt=${center[1]}%2C${center[0]}%2Cpm2gnl`}
								width='100%'
								height='100%'
								frameBorder='0'
								allowFullScreen={true}
								style={{ position: 'relative' }}
								onLoad={() => setIsIframeLoaded(true)}
								title='Яндекс.Карта - Демонтаж в Кемерово и области'
							/>
						</div>

						{/* Контактная информация */}
						<div className='p-3 bg-(--layer-color) rounded-[10px] border border-gray-200'>
							<div className='grid grid-cols-1 gap-3'>
								<div className='flex items-center gap-3'>
									<FaMapMarkedAlt className='text-(--accent-color1) size-4 shrink-0' />
									<div className='flex-1 min-w-0'>
										<p className='text-xs text-gray-500'>Адрес</p>
										<p className='text-sm font-semibold text-gray-800 truncate'>
											г. Кемерово, ул. Садовая, 123
										</p>
									</div>
								</div>

								<div className='flex items-center gap-3'>
									<FaPhone className='text-(--accent-color1) size-4 shrink-0' />
									<div className='flex-1 min-w-0'>
										<p className='text-xs text-gray-500'>Телефон</p>
										<a
											href='tel:+79999999999'
											className='text-sm font-semibold text-gray-800 hover:text-(--accent-color1) transition-colors truncate block'
										>
											+7 (999) 999-99-99
										</a>
									</div>
								</div>

								<div className='flex items-center gap-3'>
									<FaClock className='text-(--accent-color1) size-4 shrink-0' />
									<div className='flex-1 min-w-0'>
										<p className='text-xs text-gray-500'>Часы работы</p>
										<p className='text-sm font-semibold text-gray-800'>
											Пн-Пт: 9:00-18:00
										</p>
										<p className='text-xs text-gray-600 mt-0.5'>
											Сб-Вс: 10:00-16:00
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Как добраться */}
						<div>
							<p className='text-sm font-medium text-gray-700 mb-2 flex items-center gap-2'>
								<FaCompass className='size-4 shrink-0' />
								Как добраться
							</p>
							<div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
								<div className='flex items-center gap-2 p-2 bg-gray-50 rounded-lg min-h-10'>
									<FaBus className='size-4 text-(--accent-color1) shrink-0' />
									<span className='text-xs sm:text-sm truncate'>
										Автобус: "Центральный рынок"
									</span>
								</div>
								<div className='flex items-center gap-2 p-2 bg-gray-50 rounded-lg min-h-10'>
									<FaSubway className='size-4 text-(--accent-color1) shrink-0' />
									<span className='text-xs sm:text-sm truncate'>
										Трамвай: "Садовая улица"
									</span>
								</div>
								<div className='flex items-center gap-2 p-2 bg-gray-50 rounded-lg min-h-10'>
									<FaCar className='size-4 text-(--accent-color1) shrink-0' />
									<span className='text-xs sm:text-sm truncate'>
										На машине: бесплатная парковка
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Фиксированные кнопки действий */}
				<div className='sticky bottom-0 bg-white p-3 sm:p-4 border-t border-gray-200 rounded-b-[20px]'>
					<div className='space-y-2'>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
							<a
								href={`https://yandex.ru/maps/?pt=${center[1]}%2C${center[0]}&z=15&l=map`}
								target='_blank'
								rel='noopener noreferrer'
								className='block text-center py-2.5 px-4 border border-gray-300 rounded-[10px] text-gray-700 font-medium hover:border-gray-400 transition-colors text-sm sm:text-base'
							>
								{isMobile ? 'Яндекс' : 'Открыть в Яндекс'}
							</a>
							<a
								href={`https://www.google.com/maps/search/?api=1&query=${center[0]},${center[1]}`}
								target='_blank'
								rel='noopener noreferrer'
								className='block text-center py-2.5 px-4 border border-gray-300 rounded-[10px] text-gray-700 font-medium hover:border-gray-400 transition-colors text-sm sm:text-base'
							>
								{isMobile ? 'Google Maps' : 'Открыть в Google Maps'}
							</a>
						</div>
						<a
							href='tel:+79999999999'
							className='block text-center py-2.5 px-4 rounded-[10px] bg-(--accent-color1) text-white font-medium hover:bg-(--accent-color1-dark) transition-colors text-sm sm:text-base'
						>
							{isMobile ? 'Позвонить' : 'Позвонить нам'}
						</a>
					</div>

					{/* Информация о конфиденциальности */}
					<div className='mt-3 pt-3 border-t border-gray-200'>
						<p className='text-xs text-gray-500 text-center'>
							Для точного построения маршрута используйте навигатор
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MapModal
