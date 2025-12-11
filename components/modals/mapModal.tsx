'use client'
import { useEffect, useRef, useState } from 'react'

interface MapModalProps {
	isOpen: boolean
	onClose: () => void
}

const MapModal = ({ isOpen, onClose }: MapModalProps) => {
	const modalRef = useRef<HTMLDivElement>(null)
	const [isIframeLoaded, setIsIframeLoaded] = useState<boolean>(false)

	// Координаты центра Кемерово
	const center: [number, number] = [55.3542, 86.0897]

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
		<div className='fixed inset-0 bg-custom-image bg-opacity-50 flex items-center justify-center z-50 p-4'>
			<div
				ref={modalRef}
				className='bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-scale-in'
			>
				{/* Заголовок */}
				<div className='flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10'>
					<h3 className='text-2xl font-medium text-(--accent-color2) font-bebas '>
						Доверяй
						<span className='text-(--accent-color1)'> Профессионалам</span>
					</h3>
					<button
						onClick={onClose}
						className='text-gray-400 hover:text-gray-600 transition-colors cursor-pointer'
						aria-label='Закрыть'
						type='button'
					>
						<XIcon className='size-6' />
					</button>
				</div>

				{/* Тело модального окна */}
				<div className='p-6'>
					<div className='mb-4'>
						<p className='text-gray-600 mb-2'>
							<strong>Адрес:</strong> г. Кемерово, ул. Садовая, 123
						</p>
						<p className='text-gray-600'>
							<strong>Часы работы:</strong> Пн-Пт: 9:00-18:00, Сб-Вс:
							10:00-16:00
						</p>
						<p className='text-gray-600'>
							<strong>Телефон:</strong> +7 (999) 999-99-99
						</p>
					</div>

					{/* Яндекс.Карты через iframe */}
					<div className='h-96 w-full rounded-lg overflow-hidden border-2 border-gray-200 relative'>
						{!isIframeLoaded && (
							<div className='absolute inset-0 flex items-center justify-center bg-gray-100'>
								<div className='text-center text-gray-500'>
									<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-2'></div>
									<p>Загрузка карты...</p>
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

					{/* Информация о местоположении */}
					<div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
						<div className='bg-(--layer-color) p-4 rounded-lg'>
							<h4 className='font-semibold text-(--accent-color1)  mb-3 flex items-center gap-2'>
								<CompassIcon className='size-5' />
								Как добраться
							</h4>
							<ul className='text-sm text-(--accent-color1)  space-y-2'>
								<li className='flex items-start gap-2'>
									<BusIcon className='size-5 mt-0.5' />
									<span>
										<strong>Автобус:</strong> ост. "Центральный рынок"
									</span>
								</li>
								<li className='flex items-start gap-2'>
									<TramIcon className='size-5 mt-0.5' />
									<span>
										<strong>Трамвай:</strong> ост. "Садовая улица"
									</span>
								</li>
								<li className='flex items-start gap-2'>
									<CarIcon className='size-5 mt-0.5' />
									<span>
										<strong>На машине:</strong> бесплатная парковка
									</span>
								</li>
							</ul>
						</div>

						<div className='bg-(--layer-color) p-4 rounded-lg'>
							<h4 className='font-semibold text-(--accent-color2)  mb-3 flex items-center gap-2'>
								<ClockIcon className='size-5' />
								Часы работы
							</h4>
							<ul className='text-sm text-(--accent-color2) space-y-2'>
								<li>
									<strong>Пн-Пт:</strong> 9:00 - 18:00
								</li>
								<li>
									<strong>Сб-Вс:</strong> 10:00 - 16:00
								</li>
								<li>
									<strong>Без перерыва:</strong> Работаем без выходных
								</li>
								<li>
									<strong>Консультации:</strong> По предварительной записи
								</li>
							</ul>
						</div>
					</div>

					{/* Кнопки действий */}
					<div className='mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3'>
						<a
							href={`https://yandex.ru/maps/?pt=${center[1]}%2C${center[0]}&z=15&l=map`}
							target='_blank'
							rel='noopener noreferrer'
							className='flex items-center justify-center gap-2 bg-[rgba(16,22,17,0.52)] text-white px-4 py-3 rounded-lg hover:bg-[rgba(16,22,17,0.60)] transition-colors text-sm'
						>
							<YandexIcon className='size-5' />
							Открыть в Яндекс
						</a>

						<a
							href={`https://www.google.com/maps/search/?api=1&query=${center[0]},${center[1]}`}
							target='_blank'
							rel='noopener noreferrer'
							className='flex items-center justify-center gap-2 bg-(--accent-color2) text-white px-4 py-3 rounded-lg hover:bg-green-900 transition-colors text-sm'
						>
							<GoogleMapsIcon className='size-5' />
							Google Maps
						</a>

						<a
							href='tel:+78611234567'
							className='flex items-center justify-center gap-2 bg-(--accent-color1) text-white px-4 py-3 rounded-lg hover:bg-orange-500 transition-colors text-sm'
						>
							<PhoneIcon className='size-5' />
							Позвонить
						</a>
					</div>

					{/* Дополнительная информация */}
					<div className='mt-6 p-4 bg-(--layer-color) rounded-lg'>
						<h4 className='font-semibold text-yellow-800 mb-2 flex items-center gap-2'>
							<InfoIcon className='size-5' />
							Важная информация
						</h4>
						<p className='text-sm text-yellow-700'>
							Для точного построения маршрута рекомендуем использовать кнопку
							"Открыть в Яндекс". При посещении нашей компании возьмите с собой
							навигатор или распечатанную карту.
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
					animation: scale-in 0.2s ease-out forwards;
				}
			`}</style>
		</div>
	)
}

// Иконки с интерфейсами
interface IconProps {
	className?: string
}

const XIcon = ({ className = '' }: IconProps) => (
	<svg
		className={className}
		fill='none'
		stroke='currentColor'
		viewBox='0 0 24 24'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={2}
			d='M6 18L18 6M6 6l12 12'
		/>
	</svg>
)

const CompassIcon = ({ className = '' }: IconProps) => (
	<svg
		className={className}
		fill='none'
		stroke='currentColor'
		viewBox='0 0 24 24'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={2}
			d='M13 10V3L4 14h7v7l9-11h-7z'
		/>
	</svg>
)

const BusIcon = ({ className = '' }: IconProps) => (
	<svg
		className={className}
		fill='none'
		stroke='currentColor'
		viewBox='0 0 24 24'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={2}
			d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
		/>
	</svg>
)

const TramIcon = ({ className = '' }: IconProps) => (
	<svg
		className={className}
		fill='none'
		stroke='currentColor'
		viewBox='0 0 24 24'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={2}
			d='M13 10V3L4 14h7v7l9-11h-7z'
		/>
	</svg>
)

const CarIcon = ({ className = '' }: IconProps) => (
	<svg
		className={className}
		fill='none'
		stroke='currentColor'
		viewBox='0 0 24 24'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={2}
			d='M5 13l4 4L19 7'
		/>
	</svg>
)

const ClockIcon = ({ className = '' }: IconProps) => (
	<svg
		className={className}
		fill='none'
		stroke='currentColor'
		viewBox='0 0 24 24'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={2}
			d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
		/>
	</svg>
)

const PhoneIcon = ({ className = '' }: IconProps) => (
	<svg
		className={className}
		fill='none'
		stroke='currentColor'
		viewBox='0 0 24 24'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={2}
			d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
		/>
	</svg>
)

const InfoIcon = ({ className = '' }: IconProps) => (
	<svg
		className={className}
		fill='none'
		stroke='currentColor'
		viewBox='0 0 24 24'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={2}
			d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
		/>
	</svg>
)

const YandexIcon = ({ className = '' }: IconProps) => (
	<svg
		className={className}
		viewBox='0 0 24 24'
		fill='currentColor'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path d='M12 2a10 10 0 1010 10A10 10 0 0012 2zm5.69 11.53l-3.29 3.3a1.22 1.22 0 01-.85.36 1.22 1.22 0 01-.85-.36l-3.29-3.3a4.37 4.37 0 01-1.23-3.06 4.35 4.35 0 018.7 0 4.37 4.37 0 01-1.19 3.06zm-5.69-4.87a1.73 1.73 0 111.73 1.73 1.73 1.73 0 01-1.73-1.73z' />
	</svg>
)

const GoogleMapsIcon = ({ className = '' }: IconProps) => (
	<svg
		className={className}
		viewBox='0 0 24 24'
		fill='currentColor'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z' />
	</svg>
)

export default MapModal
