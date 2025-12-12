// import { cn } from '@/lib/utils'
// import React from 'react'
// import { Button } from './ui/button'
// import { Title } from './ui/title'

// interface Props {
// 	className?: string
// }

// export const Calculator: React.FC<Props> = ({ className }) => {
// 	return (
// 		<section className={cn(className)}>
// 			<div className='sm:container mx-auto py-5 px-3'>
// 				<Title
// 					className='text-[36px] sm:text-[50px] md:text-[56px] font-semibold'
// 					title='Рассчитайте стоимость работ!'
// 				/>
// 				<div className='border border-black rounded-[20px] p-[30px]'>
// 					<div className='grid grid-cols-12 mb-5'>
// 						<div className='col-start-1 col-end-5'>
// 							<p className='text-2xl font-bold'>
// 								Какой тип работ вас интересует?
// 							</p>
// 							<div>
// 								{' '}
// 								Впиши сюда селект-групп с полями Демонтаж перегородок Демонтаж
// 								полов / стяжки Демонтаж потолков Полный демонтаж под «бетон»
// 								Вывоз мусора Другое{' '}
// 							</div>
// 						</div>
// 						<div className='col-start-5 col-end-9'>
// 							<p className='text-2xl font-bold'>Объект работ</p>
// 							<div>
// 								Впиши сюда селект-групп с полями Квартира Коммерческое помещение
// 								Дом Производственное помещение Другое{' '}
// 							</div>
// 						</div>
// 						<div className='col-start-9 col-end-13'>
// 							<p className='text-2xl font-bold'>Площадь помещения </p>
// 							<div>Впиши сюда range</div>
// 							<div className='rounded-[13px] bg-(--layer-color) p-8'>
// 								<span className='text-2xl font-bold'>
// 									80 <small>M</small>2
// 								</span>
// 							</div>
// 						</div>
// 					</div>
// 					<div className='grid grid-cols-14 gap-5'>
// 						<div className='col-start-1 col-end-6 bg-(--layer-color) rounded-[20px] px-5 py-8 flex'>
// 							<div className='mt-4'>
// 								<span className='text-2xl text-(--accent-color1) font-semibold block'>
// 									80 м2
// 								</span>
// 								<span className='text-2xl text-(--accent-color1) font-semibold block'>
// 									Квартира
// 								</span>
// 								<span className='text-2xl text-(--accent-color1) font-semibold block'>
// 									Демонтаж перегородок
// 								</span>
// 							</div>
// 						</div>
// 						<div className='col-start-6 col-end-15 bg-(--layer-color) rounded-[20px] grid grid-cols-2 px-5 py-8'>
// 							<div className='col-start-1 col-end-2 flex items-center gap-2'>
// 								<span className='text-9xl font-bebas font-medium text-(--accent-color1) '>
// 									10.000
// 								</span>
// 								<img className='w-[67px]' src='/svg/rub.svg' alt='rub' />
// 							</div>
// 							<div className='col-start-2 col-end-3 flex items-center justify-end'>
// 								<Button
// 									className='rounded-[15px] py-6 px-11 bg-(--accent-color1) text-white text-2xl font-semibold'
// 									text='Отправить заявку'
// 								/>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</section>
// 	)
// }

// 'use client'
// import { cn } from '@/lib/utils'
// import React, { useState } from 'react'
// import { Button } from './ui/button'
// import { Title } from './ui/title'

// interface Props {
// 	className?: string
// }

// const workTypes = [
// 	{ id: 'demolition_partitions', label: 'Демонтаж перегородок' },
// 	{ id: 'demolition_floors', label: 'Демонтаж полов / стяжки' },
// 	{ id: 'demolition_ceilings', label: 'Демонтаж потолков' },
// 	{ id: 'full_demolition', label: 'Полный демонтаж под «бетон»' },
// 	{ id: 'garbage_removal', label: 'Вывоз мусора' },
// 	{ id: 'other', label: 'Другое' },
// ]

// const objectTypes = [
// 	{ id: 'apartment', label: 'Квартира' },
// 	{ id: 'commercial', label: 'Коммерческое помещение' },
// 	{ id: 'house', label: 'Дом' },
// 	{ id: 'industrial', label: 'Производственное помещение' },
// 	{ id: 'other_object', label: 'Другое' },
// ]

// export const Calculator: React.FC<Props> = ({ className }) => {
// 	const [workType, setWorkType] = useState(workTypes[0].id)
// 	const [objectType, setObjectType] = useState(objectTypes[0].id)
// 	const [area, setArea] = useState(80)
// 	const [price] = useState(10000)

// 	const getWorkTypeLabel = () => {
// 		return workTypes.find(w => w.id === workType)?.label || workTypes[0].label
// 	}

// 	const getObjectTypeLabel = () => {
// 		return (
// 			objectTypes.find(o => o.id === objectType)?.label || objectTypes[0].label
// 		)
// 	}

// 	return (
// 		<section className={cn(className)}>
// 			<div className='sm:container mx-auto py-5 px-3'>
// 				<Title
// 					className='text-[36px] sm:text-[50px] md:text-[56px] font-semibold'
// 					title='Рассчитайте стоимость работ!'
// 				/>
// 				<div className='border border-black rounded-[20px] p-[30px]'>
// 					<div className='grid grid-cols-1 lg:grid-cols-12 mb-5 gap-6'>
// 						{/* Тип работ - Radio Group */}
// 						<div className='lg:col-span-4'>
// 							<p className='text-2xl font-bold mb-4'>
// 								Какой тип работ вас интересует?
// 							</p>
// 							<div className='space-y-3'>
// 								{workTypes.map(type => (
// 									<label
// 										key={type.id}
// 										className='flex items-center space-x-3 cursor-pointer group'
// 									>
// 										<div className='relative'>
// 											<input
// 												type='radio'
// 												name='workType'
// 												value={type.id}
// 												checked={workType === type.id}
// 												onChange={e => setWorkType(e.target.value)}
// 												className='sr-only peer'
// 											/>
// 											<div className='w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center group-hover:border-(--accent-color1) transition-colors peer-checked:border-(--accent-color1) peer-checked:bg-(--accent-color1)'>
// 												{workType === type.id && (
// 													<div className='w-2.5 h-2.5 rounded-full bg-white'></div>
// 												)}
// 											</div>
// 										</div>
// 										<span className='text-lg group-hover:text-(--accent-color1) transition-colors peer-checked:text-(--accent-color1)'>
// 											{type.label}
// 										</span>
// 									</label>
// 								))}
// 							</div>
// 						</div>

// 						{/* Объект работ - Radio Group */}
// 						<div className='lg:col-span-4'>
// 							<p className='text-2xl font-bold mb-4'>Объект работ</p>
// 							<div className='space-y-3'>
// 								{objectTypes.map(type => (
// 									<label
// 										key={type.id}
// 										className='flex items-center space-x-3 cursor-pointer group'
// 									>
// 										<div className='relative'>
// 											<input
// 												type='radio'
// 												name='objectType'
// 												value={type.id}
// 												checked={objectType === type.id}
// 												onChange={e => setObjectType(e.target.value)}
// 												className='sr-only peer'
// 											/>
// 											<div className='w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center group-hover:border-(--accent-color1) transition-colors peer-checked:border-(--accent-color1) peer-checked:bg-(--accent-color1)'>
// 												{objectType === type.id && (
// 													<div className='w-2.5 h-2.5 rounded-full bg-white'></div>
// 												)}
// 											</div>
// 										</div>
// 										<span className='text-lg group-hover:text-(--accent-color1) transition-colors peer-checked:text-(--accent-color1)'>
// 											{type.label}
// 										</span>
// 									</label>
// 								))}
// 							</div>
// 						</div>

// 						{/* Площадь помещения - Range Slider */}
// 						<div className='lg:col-span-4'>
// 							<p className='text-2xl font-bold mb-4'>Площадь помещения</p>
// 							<div className='space-y-4'>
// 								<div className='relative'>
// 									<input
// 										type='range'
// 										min='10'
// 										max='500'
// 										step='5'
// 										value={area}
// 										onChange={e => setArea(Number(e.target.value))}
// 										className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-(--accent-color1)'
// 									/>
// 									<div className='flex justify-between text-sm text-gray-500 mt-2'>
// 										<span>10 м²</span>
// 										<span>250 м²</span>
// 										<span>500 м²</span>
// 									</div>
// 								</div>
// 								<div className='rounded-[13px] bg-(--layer-color) p-6 text-center'>
// 									<span className='text-2xl font-bold'>
// 										{area} <small>м²</small>
// 									</span>
// 								</div>
// 							</div>
// 						</div>
// 					</div>

// 					{/* Результаты расчета */}
// 					<div className='grid grid-cols-1 lg:grid-cols-14 gap-6'>
// 						<div className='lg:col-span-5 bg-(--layer-color) rounded-[20px] px-5 py-8 flex items-center'>
// 							<div className='mt-4'>
// 								<span className='text-2xl text-(--accent-color1) font-semibold block'>
// 									{area} м²
// 								</span>
// 								<span className='text-2xl text-(--accent-color1) font-semibold block'>
// 									{getObjectTypeLabel()}
// 								</span>
// 								<span className='text-2xl text-(--accent-color1) font-semibold block'>
// 									{getWorkTypeLabel()}
// 								</span>
// 							</div>
// 						</div>
// 						<div className='lg:col-span-9 bg-(--layer-color) rounded-[20px] grid grid-cols-1 md:grid-cols-2 px-5 py-8 gap-6 md:gap-0'>
// 							<div className='flex items-center gap-2 justify-center md:justify-start'>
// 								<span className='text-7xl lg:text-9xl font-bebas font-medium text-(--accent-color1)'>
// 									{price.toLocaleString('ru-RU')}
// 								</span>
// 								<img
// 									className='w-12 lg:w-[67px]'
// 									src='/svg/rub.svg'
// 									alt='rub'
// 								/>
// 							</div>
// 							<div className='flex items-center justify-center md:justify-end'>
// 								<Button
// 									className='rounded-[15px] py-6 px-8 lg:px-11 bg-(--accent-color1) text-white text-xl lg:text-2xl font-semibold'
// 									text='Отправить заявку'
// 								/>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</section>
// 	)
// }

// 'use client'
// import { cn } from '@/lib/utils'
// import React, { useEffect, useMemo, useState } from 'react'
// import { Button } from './ui/button'
// import { Title } from './ui/title'

// interface Props {
// 	className?: string
// }

// const workTypes = [
// 	{ id: 'demolition_partitions', label: 'Демонтаж перегородок' },
// 	{ id: 'demolition_floors', label: 'Демонтаж полов / стяжки' },
// 	{ id: 'demolition_ceilings', label: 'Демонтаж потолков' },
// 	{ id: 'full_demolition', label: 'Полный демонтаж под «бетон»' },
// 	{ id: 'garbage_removal', label: 'Вывоз мусора' },
// 	{ id: 'other', label: 'Другое' },
// ]

// const objectTypes = [
// 	{ id: 'apartment', label: 'Квартира' },
// 	{ id: 'commercial', label: 'Коммерческое помещение' },
// 	{ id: 'house', label: 'Дом' },
// 	{ id: 'industrial', label: 'Производственное помещение' },
// 	{ id: 'other_object', label: 'Другое' },
// ]

// // Базовая стоимость работ за м² в Кемерово (руб.)
// // Основано на реальных прайс-листах компаний Кемерово[citation:1][citation:2][citation:4]
// const priceRates = {
// 	// Демонтаж перегородок: ГКЛ, кирпич, бетон[citation:2][citation:4]
// 	demolition_partitions: {
// 		baseRate: 300, // Средняя цена за м²
// 		minArea: 10,
// 		maxArea: 500,
// 		description: 'Демонтаж перегородок (ГКЛ, кирпич)',
// 	},
// 	// Демонтаж полов и стяжки[citation:1][citation:3][citation:7]
// 	demolition_floors: {
// 		baseRate: 250,
// 		minArea: 10,
// 		maxArea: 500,
// 		description: 'Демонтаж полов, стяжки, покрытий',
// 	},
// 	// Демонтаж потолков[citation:2][citation:8]
// 	demolition_ceilings: {
// 		baseRate: 150,
// 		minArea: 10,
// 		maxArea: 500,
// 		description: 'Демонтаж подвесных, натяжных потолков',
// 	},
// 	// Полный демонтаж (комплексная работа дороже)[citation:9]
// 	full_demolition: {
// 		baseRate: 600,
// 		minArea: 10,
// 		maxArea: 500,
// 		description: 'Полный демонтаж помещения',
// 	},
// 	// Вывоз мусора (фиксированная ставка + за площадь)[citation:4][citation:6]
// 	garbage_removal: {
// 		baseRate: 100,
// 		minArea: 10,
// 		maxArea: 500,
// 		fixedCost: 2000, // Фиксированная стоимость за вызов
// 		description: 'Вывоз строительного мусора',
// 	},
// 	// Другое (базовая ставка)
// 	other: {
// 		baseRate: 200,
// 		minArea: 10,
// 		maxArea: 500,
// 		description: 'Индивидуальный расчёт',
// 	},
// }

// // Коэффициенты для типа объекта[citation:2]
// const objectCoefficients = {
// 	apartment: 1.0, // Квартира - базовая ставка
// 	commercial: 1.3, // Коммерческое помещение +30%
// 	house: 1.1, // Дом +10%
// 	industrial: 1.5, // Производственное помещение +50%
// 	other_object: 1.2, // Другое +20%
// }

// // Скидки/надбавки за площадь[citation:3]
// const areaCoefficients = {
// 	small: { min: 10, max: 50, coefficient: 1.3 }, // До 50 м² +30%
// 	medium: { min: 51, max: 100, coefficient: 1.0 }, // 51-100 м² базовая
// 	large: { min: 101, max: 200, coefficient: 0.9 }, // 101-200 м² -10%
// 	xlarge: { min: 201, max: 500, coefficient: 0.8 }, // 201-500 м² -20%
// }

// export const Calculator: React.FC<Props> = ({ className }) => {
// 	const [workType, setWorkType] = useState(workTypes[0].id)
// 	const [objectType, setObjectType] = useState(objectTypes[0].id)
// 	const [area, setArea] = useState(80)
// 	const [price, setPrice] = useState(0)
// 	const [breakdown, setBreakdown] = useState<string[]>([])

// 	// Функция расчета стоимости
// 	const calculatePrice = useMemo(() => {
// 		return (workId: string, objectId: string, areaValue: number) => {
// 			const rate = priceRates[workId as keyof typeof priceRates]
// 			const objectCoeff =
// 				objectCoefficients[objectId as keyof typeof objectCoefficients]

// 			// Определяем коэффициент площади
// 			let areaCoeff = 1.0
// 			for (const key in areaCoefficients) {
// 				const range = areaCoefficients[key as keyof typeof areaCoefficients]
// 				if (areaValue >= range.min && areaValue <= range.max) {
// 					areaCoeff = range.coefficient
// 					break
// 				}
// 			}

// 			// Расчет стоимости
// 			let calculatedPrice = 0
// 			const breakdownSteps: string[] = []

// 			// Базовая стоимость
// 			const baseCost = rate.baseRate * areaValue
// 			calculatedPrice = baseCost
// 			breakdownSteps.push(
// 				`${rate.baseRate} ₽/м² × ${areaValue} м² = ${baseCost.toLocaleString(
// 					'ru-RU'
// 				)} ₽`
// 			)

// 			// Применяем коэффициент объекта
// 			if (objectCoeff !== 1.0) {
// 				const objectAdjustment = calculatedPrice * (objectCoeff - 1)
// 				calculatedPrice *= objectCoeff
// 				breakdownSteps.push(
// 					`Коэф. объекта (${objectCoeff.toFixed(
// 						1
// 					)}): ${objectAdjustment.toLocaleString('ru-RU')} ₽`
// 				)
// 			}

// 			// Применяем коэффициент площади
// 			if (areaCoeff !== 1.0) {
// 				const areaAdjustment = calculatedPrice * (areaCoeff - 1)
// 				calculatedPrice *= areaCoeff
// 				breakdownSteps.push(
// 					`Коэф. площади (${areaCoeff.toFixed(
// 						1
// 					)}): ${areaAdjustment.toLocaleString('ru-RU')} ₽`
// 				)
// 			}

// 			// Добавляем фиксированную стоимость для вывоза мусора
// 			if (workId === 'garbage_removal' && 'fixedCost' in rate) {
// 				calculatedPrice += rate.fixedCost
// 				breakdownSteps.push(
// 					`Фиксированная стоимость вывоза: ${rate.fixedCost.toLocaleString(
// 						'ru-RU'
// 					)} ₽`
// 				)
// 			}

// 			// Минимальная стоимость работы
// 			const minPrice = 5000
// 			if (calculatedPrice < minPrice) {
// 				calculatedPrice = minPrice
// 				breakdownSteps.push(
// 					`Минимальная стоимость работ: ${minPrice.toLocaleString('ru-RU')} ₽`
// 				)
// 			}

// 			// Округляем до сотен
// 			calculatedPrice = Math.ceil(calculatedPrice / 100) * 100

// 			return { price: calculatedPrice, breakdown: breakdownSteps }
// 		}
// 	}, [])

// 	// Пересчет при изменении параметров
// 	useEffect(() => {
// 		const { price: newPrice, breakdown: newBreakdown } = calculatePrice(
// 			workType,
// 			objectType,
// 			area
// 		)
// 		setPrice(newPrice)
// 		setBreakdown(newBreakdown)
// 	}, [workType, objectType, area, calculatePrice])

// 	const getWorkTypeLabel = () => {
// 		return workTypes.find(w => w.id === workType)?.label || workTypes[0].label
// 	}

// 	const getObjectTypeLabel = () => {
// 		return (
// 			objectTypes.find(o => o.id === objectType)?.label || objectTypes[0].label
// 		)
// 	}

// 	const getRateDescription = () => {
// 		return priceRates[workType as keyof typeof priceRates]?.description || ''
// 	}

// 	return (
// 		<section className={cn(className)}>
// 			<div className='sm:container mx-auto py-5 px-3'>
// 				<Title
// 					className='text-[36px] sm:text-[50px] md:text-[56px] font-semibold'
// 					title='Рассчитайте стоимость работ!'
// 				/>
// 				<div className='border border-black rounded-[20px] p-[30px]'>
// 					<div className='grid grid-cols-1 lg:grid-cols-12 mb-5 gap-6'>
// 						{/* Тип работ - Radio Group */}
// 						<div className='lg:col-span-4'>
// 							<p className='text-2xl font-bold mb-4'>
// 								Какой тип работ вас интересует?
// 							</p>
// 							<div className='space-y-3'>
// 								{workTypes.map(type => (
// 									<label
// 										key={type.id}
// 										className='flex items-center space-x-3 cursor-pointer group'
// 									>
// 										<div className='relative'>
// 											<input
// 												type='radio'
// 												name='workType'
// 												value={type.id}
// 												checked={workType === type.id}
// 												onChange={e => setWorkType(e.target.value)}
// 												className='sr-only peer'
// 											/>
// 											<div className='w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center group-hover:border-(--accent-color1) transition-colors peer-checked:border-(--accent-color1) peer-checked:bg-(--accent-color1)'>
// 												{workType === type.id && (
// 													<div className='w-2.5 h-2.5 rounded-full bg-white'></div>
// 												)}
// 											</div>
// 										</div>
// 										<span className='text-lg group-hover:text-(--accent-color1) transition-colors peer-checked:text-(--accent-color1)'>
// 											{type.label}
// 										</span>
// 									</label>
// 								))}
// 							</div>
// 							<div className='mt-4 p-3 bg-gray-50 rounded-lg'>
// 								<p className='text-sm text-gray-600'>
// 									<strong>Тариф:</strong> {getRateDescription()}
// 								</p>
// 								<p className='text-sm text-gray-600'>
// 									<strong>Базовая ставка:</strong>{' '}
// 									{priceRates[workType as keyof typeof priceRates]?.baseRate}{' '}
// 									₽/м²
// 								</p>
// 							</div>
// 						</div>

// 						{/* Объект работ - Radio Group */}
// 						<div className='lg:col-span-4'>
// 							<p className='text-2xl font-bold mb-4'>Объект работ</p>
// 							<div className='space-y-3'>
// 								{objectTypes.map(type => (
// 									<label
// 										key={type.id}
// 										className='flex items-center space-x-3 cursor-pointer group'
// 									>
// 										<div className='relative'>
// 											<input
// 												type='radio'
// 												name='objectType'
// 												value={type.id}
// 												checked={objectType === type.id}
// 												onChange={e => setObjectType(e.target.value)}
// 												className='sr-only peer'
// 											/>
// 											<div className='w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center group-hover:border-(--accent-color1) transition-colors peer-checked:border-(--accent-color1) peer-checked:bg-(--accent-color1)'>
// 												{objectType === type.id && (
// 													<div className='w-2.5 h-2.5 rounded-full bg-white'></div>
// 												)}
// 											</div>
// 										</div>
// 										<span className='text-lg group-hover:text-(--accent-color1) transition-colors peer-checked:text-(--accent-color1)'>
// 											{type.label}
// 										</span>
// 									</label>
// 								))}
// 							</div>
// 							<div className='mt-4 p-3 bg-gray-50 rounded-lg'>
// 								<p className='text-sm text-gray-600'>
// 									<strong>Коэффициент:</strong> ×
// 									{objectCoefficients[
// 										objectType as keyof typeof objectCoefficients
// 									].toFixed(1)}
// 								</p>
// 								<p className='text-sm text-gray-600'>
// 									{objectCoefficients[
// 										objectType as keyof typeof objectCoefficients
// 									] > 1
// 										? '(повышающий, сложность работ)'
// 										: '(базовая ставка)'}
// 								</p>
// 							</div>
// 						</div>

// 						{/* Площадь помещения - Range Slider */}
// 						<div className='lg:col-span-4'>
// 							<p className='text-2xl font-bold mb-4'>Площадь помещения</p>
// 							<div className='space-y-4'>
// 								<div className='relative'>
// 									<input
// 										type='range'
// 										min='10'
// 										max='500'
// 										step='5'
// 										value={area}
// 										onChange={e => setArea(Number(e.target.value))}
// 										className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-(--accent-color1)'
// 									/>
// 									<div className='flex justify-between text-sm text-gray-500 mt-2'>
// 										<span>10 м²</span>
// 										<span>250 м²</span>
// 										<span>500 м²</span>
// 									</div>
// 								</div>
// 								<div className='rounded-[13px] bg-(--layer-color) p-6 text-center'>
// 									<span className='text-2xl font-bold'>
// 										{area} <small>м²</small>
// 									</span>
// 								</div>
// 								<div className='p-3 bg-gray-50 rounded-lg'>
// 									<p className='text-sm text-gray-600'>
// 										<strong>Коэффициент площади:</strong>{' '}
// 										{(() => {
// 											for (const key in areaCoefficients) {
// 												const range =
// 													areaCoefficients[key as keyof typeof areaCoefficients]
// 												if (area >= range.min && area <= range.max) {
// 													return `×${range.coefficient.toFixed(1)}`
// 												}
// 											}
// 											return '×1.0'
// 										})()}
// 									</p>
// 									<p className='text-sm text-gray-600'>
// 										{area > 100
// 											? '(скидка за большой объем)'
// 											: area < 50
// 											? '(надбавка за малый объем)'
// 											: '(базовая ставка)'}
// 									</p>
// 								</div>
// 							</div>
// 						</div>
// 					</div>

// 					{/* Результаты расчета */}
// 					<div className='grid grid-cols-1 lg:grid-cols-14 gap-6'>
// 						<div className='lg:col-span-5 bg-(--layer-color) rounded-[20px] px-5 py-8'>
// 							<div className='mt-4'>
// 								<span className='text-2xl text-(--accent-color1) font-semibold block'>
// 									{area} м²
// 								</span>
// 								<span className='text-2xl text-(--accent-color1) font-semibold block'>
// 									{getObjectTypeLabel()}
// 								</span>
// 								<span className='text-2xl text-(--accent-color1) font-semibold block'>
// 									{getWorkTypeLabel()}
// 								</span>
// 								<div className='mt-6 p-4 bg-white/50 rounded-lg'>
// 									<p className='text-lg font-semibold mb-2'>Состав расчета:</p>
// 									<ul className='text-sm space-y-1'>
// 										{breakdown.map((step, index) => (
// 											<li key={index} className='text-gray-700'>
// 												{step}
// 											</li>
// 										))}
// 									</ul>
// 								</div>
// 							</div>
// 						</div>
// 						<div className='lg:col-span-9 bg-(--layer-color) rounded-[20px] grid grid-cols-1 md:grid-cols-2 px-5 py-8 gap-6 md:gap-0'>
// 							<div className='flex flex-col items-center md:items-start gap-2 justify-center md:justify-start'>
// 								<div className='flex items-center gap-2'>
// 									<span className='text-7xl lg:text-9xl font-bebas font-medium text-(--accent-color1)'>
// 										{price.toLocaleString('ru-RU')}
// 									</span>
// 									<img
// 										className='w-12 lg:w-[67px]'
// 										src='/svg/rub.svg'
// 										alt='rub'
// 									/>
// 								</div>
// 								<p className='text-gray-600 text-lg mt-2'>
// 									Итоговая стоимость работ
// 								</p>
// 								<p className='text-sm text-gray-500'>
// 									*Расчет ориентировочный. Точную смету составит мастер после
// 									осмотра
// 								</p>
// 							</div>
// 							<div className='flex items-center justify-center md:justify-end'>
// 								<Button
// 									className='rounded-[15px] py-6 px-8 lg:px-11 bg-(--accent-color1) text-white text-xl lg:text-2xl font-semibold hover:bg-(--accent-color1-dark) transition-colors'
// 									text='Отправить заявку'
// 								/>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</section>
// 	)
// }

'use client'

import { cn } from '@/lib/utils'
import React, { useEffect, useMemo, useState } from 'react'
import { OrderModal } from './modals/orderModal'
import { Button } from './ui/button'
import { Title } from './ui/title'

interface Props {
	className?: string
}

const workTypes = [
	{ id: 'demolition_partitions', label: 'Демонтаж перегородок' },
	{ id: 'demolition_floors', label: 'Демонтаж полов / стяжки' },
	{ id: 'demolition_ceilings', label: 'Демонтаж потолков' },
	{ id: 'full_demolition', label: 'Полный демонтаж под «бетон»' },
	{ id: 'garbage_removal', label: 'Вывоз мусора' },
	{ id: 'other', label: 'Другое' },
]

const objectTypes = [
	{ id: 'apartment', label: 'Квартира' },
	{ id: 'commercial', label: 'Коммерческое помещение' },
	{ id: 'house', label: 'Дом' },
	{ id: 'industrial', label: 'Производственное помещение' },
	{ id: 'other_object', label: 'Другое' },
]

const priceRates = {
	demolition_partitions: {
		baseRate: 300,
		minArea: 10,
		maxArea: 500,
		description: 'Демонтаж перегородок (ГКЛ, кирпич)',
	},
	demolition_floors: {
		baseRate: 250,
		minArea: 10,
		maxArea: 500,
		description: 'Демонтаж полов, стяжки, покрытий',
	},
	demolition_ceilings: {
		baseRate: 150,
		minArea: 10,
		maxArea: 500,
		description: 'Демонтаж подвесных, натяжных потолков',
	},
	full_demolition: {
		baseRate: 600,
		minArea: 10,
		maxArea: 500,
		description: 'Полный демонтаж помещения',
	},
	garbage_removal: {
		baseRate: 100,
		minArea: 10,
		maxArea: 500,
		fixedCost: 2000,
		description: 'Вывоз строительного мусора',
	},
	other: {
		baseRate: 200,
		minArea: 10,
		maxArea: 500,
		description: 'Индивидуальный расчёт',
	},
}

const objectCoefficients = {
	apartment: 1.0,
	commercial: 1.3,
	house: 1.1,
	industrial: 1.5,
	other_object: 1.2,
}

const areaCoefficients = {
	small: { min: 10, max: 50, coefficient: 1.3 },
	medium: { min: 51, max: 100, coefficient: 1.0 },
	large: { min: 101, max: 200, coefficient: 0.9 },
	xlarge: { min: 201, max: 500, coefficient: 0.8 },
}

export const Calculator: React.FC<Props> = ({ className }) => {
	const [workType, setWorkType] = useState(workTypes[0].id)
	const [objectType, setObjectType] = useState(objectTypes[0].id)
	const [area, setArea] = useState(80)
	const [price, setPrice] = useState(0)
	const [breakdown, setBreakdown] = useState<string[]>([])
	const [isModalOpen, setIsModalOpen] = useState(false)

	// Обновить обработчик кнопки:
	const handleOrderClick = () => {
		setIsModalOpen(true)
	}

	const calculatePrice = useMemo(() => {
		return (workId: string, objectId: string, areaValue: number) => {
			const rate = priceRates[workId as keyof typeof priceRates]
			const objectCoeff =
				objectCoefficients[objectId as keyof typeof objectCoefficients]

			let areaCoeff = 1.0
			for (const key in areaCoefficients) {
				const range = areaCoefficients[key as keyof typeof areaCoefficients]
				if (areaValue >= range.min && areaValue <= range.max) {
					areaCoeff = range.coefficient
					break
				}
			}

			let calculatedPrice = 0
			const breakdownSteps: string[] = []

			const baseCost = rate.baseRate * areaValue
			calculatedPrice = baseCost
			breakdownSteps.push(
				`${rate.baseRate} ₽/м² × ${areaValue} м² = ${baseCost.toLocaleString(
					'ru-RU'
				)} ₽`
			)

			if (objectCoeff !== 1.0) {
				const objectAdjustment = calculatedPrice * (objectCoeff - 1)
				calculatedPrice *= objectCoeff
				breakdownSteps.push(
					`Коэф. объекта (${objectCoeff.toFixed(
						1
					)}): ${objectAdjustment.toLocaleString('ru-RU')} ₽`
				)
			}

			if (areaCoeff !== 1.0) {
				const areaAdjustment = calculatedPrice * (areaCoeff - 1)
				calculatedPrice *= areaCoeff
				breakdownSteps.push(
					`Коэф. площади (${areaCoeff.toFixed(
						1
					)}): ${areaAdjustment.toLocaleString('ru-RU')} ₽`
				)
			}

			if (workId === 'garbage_removal' && 'fixedCost' in rate) {
				calculatedPrice += rate.fixedCost
				breakdownSteps.push(
					`Фиксированная стоимость вывоза: ${rate.fixedCost.toLocaleString(
						'ru-RU'
					)} ₽`
				)
			}

			const minPrice = 5000
			if (calculatedPrice < minPrice) {
				calculatedPrice = minPrice
				breakdownSteps.push(
					`Минимальная стоимость работ: ${minPrice.toLocaleString('ru-RU')} ₽`
				)
			}

			calculatedPrice = Math.ceil(calculatedPrice / 100) * 100

			return { price: calculatedPrice, breakdown: breakdownSteps }
		}
	}, [])

	useEffect(() => {
		const { price: newPrice, breakdown: newBreakdown } = calculatePrice(
			workType,
			objectType,
			area
		)
		setPrice(newPrice)
		setBreakdown(newBreakdown)
	}, [workType, objectType, area, calculatePrice])

	const getWorkTypeLabel = () => {
		return workTypes.find(w => w.id === workType)?.label || workTypes[0].label
	}

	const getObjectTypeLabel = () => {
		return (
			objectTypes.find(o => o.id === objectType)?.label || objectTypes[0].label
		)
	}

	const getRateDescription = () => {
		return priceRates[workType as keyof typeof priceRates]?.description || ''
	}

	// Получение коэффициента площади для текущего значения
	const getCurrentAreaCoefficient = () => {
		for (const key in areaCoefficients) {
			const range = areaCoefficients[key as keyof typeof areaCoefficients]
			if (area >= range.min && area <= range.max) {
				return range.coefficient
			}
		}
		return 1.0
	}

	return (
		<>
			<section id='calc' className={cn(className)}>
				<div className='sm:container mx-auto py-5 px-3'>
					<Title
						className='text-[36px] sm:text-[50px] md:text-[56px] font-semibold mb-5'
						title='Рассчитайте стоимость работ!'
					/>
					<div className='border border-black rounded-[20px] p-[30px]'>
						{/* Основные поля ввода */}
						<div className='grid grid-cols-1 lg:grid-cols-12 mb-6 gap-6'>
							{/* Тип работ */}
							<div className='lg:col-span-4'>
								<p className='text-2xl font-bold mb-4'>
									Какой тип работ вас интересует?
								</p>
								<div className='space-y-3'>
									{workTypes.map(type => (
										<label
											key={type.id}
											className='flex items-center space-x-3 cursor-pointer group'
										>
											<div className='relative'>
												<input
													type='radio'
													name='workType'
													value={type.id}
													checked={workType === type.id}
													onChange={e => setWorkType(e.target.value)}
													className='sr-only peer'
												/>
												<div className='w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center group-hover:border-(--accent-color1) transition-colors peer-checked:border-(--accent-color1) peer-checked:bg-(--accent-color1)'>
													{workType === type.id && (
														<div className='w-2.5 h-2.5 rounded-full bg-white'></div>
													)}
												</div>
											</div>
											<span className='text-lg group-hover:text-(--accent-color1) transition-colors peer-checked:text-(--accent-color1)'>
												{type.label}
											</span>
										</label>
									))}
								</div>
							</div>

							{/* Объект работ */}
							<div className='lg:col-span-4'>
								<p className='text-2xl font-bold mb-4'>Объект работ</p>
								<div className='space-y-3'>
									{objectTypes.map(type => (
										<label
											key={type.id}
											className='flex items-center space-x-3 cursor-pointer group'
										>
											<div className='relative'>
												<input
													type='radio'
													name='objectType'
													value={type.id}
													checked={objectType === type.id}
													onChange={e => setObjectType(e.target.value)}
													className='sr-only peer'
												/>
												<div className='w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center group-hover:border-(--accent-color1) transition-colors peer-checked:border-(--accent-color1) peer-checked:bg-(--accent-color1)'>
													{objectType === type.id && (
														<div className='w-2.5 h-2.5 rounded-full bg-white'></div>
													)}
												</div>
											</div>
											<span className='text-lg group-hover:text-(--accent-color1) transition-colors peer-checked:text-(--accent-color1)'>
												{type.label}
											</span>
										</label>
									))}
								</div>
							</div>

							{/* Площадь помещения */}
							<div className='lg:col-span-4'>
								<p className='text-2xl font-bold mb-4'>Площадь помещения</p>
								<div className='space-y-4'>
									<div className='relative'>
										<input
											type='range'
											min='10'
											max='500'
											step='5'
											value={area}
											onChange={e => setArea(Number(e.target.value))}
											className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-(--accent-color1)'
										/>
										<div className='flex justify-between text-sm text-gray-500 mt-2'>
											<span>10 м²</span>
											<span>250 м²</span>
											<span>500 м²</span>
										</div>
									</div>
									<div className='rounded-[13px] bg-(--layer-color) p-6 text-center'>
										<span className='text-2xl font-bold'>
											{area} <small>м²</small>
										</span>
									</div>
								</div>
							</div>
						</div>

						{/* Информационные блоки с тарифами и коэффициентами - внизу на одном уровне */}
						<div className='grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8'>
							{/* Блок тарифов для типа работ */}
							<div className='lg:col-span-4 p-4 bg-gray-50 rounded-lg border border-gray-200'>
								<h3 className='text-lg font-semibold mb-2 text-(--accent-color1)'>
									Тарифы работ
								</h3>
								<div className='space-y-2'>
									<p className='text-sm text-gray-700'>
										<span className='font-medium'>Текущий тариф:</span>{' '}
										{getRateDescription()}
									</p>
									<p className='text-sm text-gray-700'>
										<span className='font-medium'>Базовая ставка:</span>{' '}
										{priceRates[workType as keyof typeof priceRates]?.baseRate}{' '}
										₽/м²
									</p>
									<div className='pt-2 border-t border-gray-300'>
										<p className='text-xs text-gray-600 font-medium mb-1'>
											Все тарифы:
										</p>
										<ul className='text-xs text-gray-600 space-y-1'>
											<li>• Перегородки: 300 ₽/м²</li>
											<li>• Полы/стяжка: 250 ₽/м²</li>
											<li>• Потолки: 150 ₽/м²</li>
											<li>• Полный демонтаж: 600 ₽/м²</li>
										</ul>
									</div>
								</div>
							</div>

							{/* Блок коэффициентов объекта */}
							<div className='lg:col-span-4 p-4 bg-gray-50 rounded-lg border border-gray-200'>
								<h3 className='text-lg font-semibold mb-2 text-(--accent-color1)'>
									Коэффициенты объекта
								</h3>
								<div className='space-y-2'>
									<p className='text-sm text-gray-700'>
										<span className='font-medium'>Текущий коэффициент:</span> ×
										{objectCoefficients[
											objectType as keyof typeof objectCoefficients
										].toFixed(1)}
									</p>
									<p className='text-sm text-gray-700'>
										<span className='font-medium'>Тип объекта:</span>{' '}
										{objectCoefficients[
											objectType as keyof typeof objectCoefficients
										] > 1
											? '(повышающий, сложность работ)'
											: '(базовая ставка)'}
									</p>
									<div className='pt-2 border-t border-gray-300'>
										<p className='text-xs text-gray-600 font-medium mb-1'>
											Все коэффициенты:
										</p>
										<ul className='text-xs text-gray-600 space-y-1'>
											<li>• Квартира: ×1.0 (базовая)</li>
											<li>• Коммерческое: ×1.3 (+30%)</li>
											<li>• Дом: ×1.1 (+10%)</li>
											<li>• Производственное: ×1.5 (+50%)</li>
										</ul>
									</div>
								</div>
							</div>

							{/* Блок коэффициентов площади */}
							<div className='lg:col-span-4 p-4 bg-gray-50 rounded-lg border border-gray-200'>
								<h3 className='text-lg font-semibold mb-2 text-(--accent-color1)'>
									Коэффициенты площади
								</h3>
								<div className='space-y-2'>
									<p className='text-sm text-gray-700'>
										<span className='font-medium'>Текущий коэффициент:</span> ×
										{getCurrentAreaCoefficient().toFixed(1)}
									</p>
									<p className='text-sm text-gray-700'>
										<span className='font-medium'>Площадь:</span> {area} м²
										{area > 100
											? ' (скидка за большой объем)'
											: area < 50
											? ' (надбавка за малый объем)'
											: ' (базовая ставка)'}
									</p>
									<div className='pt-2 border-t border-gray-300'>
										<p className='text-xs text-gray-600 font-medium mb-1'>
											Диапазоны:
										</p>
										<ul className='text-xs text-gray-600 space-y-1'>
											<li>• 10-50 м²: ×1.3 (+30%)</li>
											<li>• 51-100 м²: ×1.0 (база)</li>
											<li>• 101-200 м²: ×0.9 (-10%)</li>
											<li>• 201-500 м²: ×0.8 (-20%)</li>
										</ul>
									</div>
								</div>
							</div>
						</div>

						{/* Результаты расчета */}
						<div className='grid grid-cols-1 lg:grid-cols-14 gap-6'>
							<div className='lg:col-span-5 bg-(--layer-color) rounded-[20px] px-5 py-8'>
								<div className='mt-4'>
									<span className='text-xl xl:text-2xl text-(--accent-color1) font-semibold block'>
										{area} м²
									</span>
									<span className='text-xl xl:text-2xl text-(--accent-color1) font-semibold block'>
										{getObjectTypeLabel()}
									</span>
									<span className='text-xl xl:text-2xl text-(--accent-color1) font-semibold block'>
										{getWorkTypeLabel()}
									</span>
									<div className='mt-6 p-4 bg-white/50 rounded-lg'>
										<p className='text-lg font-semibold mb-2'>
											Состав расчета:
										</p>
										<ul className='text-sm space-y-1'>
											{breakdown.map((step, index) => (
												<li key={index} className='text-gray-700'>
													{step}
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>
							<div className='lg:col-span-9 bg-(--layer-color) rounded-[20px] grid grid-cols-1 md:grid-cols-2 px-5 py-8 gap-6 md:gap-0'>
								<div className='flex flex-col items-center md:items-start gap-2 justify-center md:justify-start lg:justify-center'>
									<div className='flex items-center gap-2'>
										<span className='text-7xl xl:text-9xl font-bebas font-medium text-(--accent-color1)'>
											{price.toLocaleString('ru-RU')}
										</span>
										<img
											className='w-12 lg:w-[67px]'
											src='/svg/rub.svg'
											alt='rub'
										/>
									</div>
									<p className='text-gray-600 text-lg mt-2'>
										Итоговая стоимость работ
									</p>
									<p className='text-sm text-gray-500'>
										*Расчет ориентировочный. Точную смету составит мастер после
										осмотра
									</p>
								</div>
								<div className='flex items-center justify-center'>
									<Button
										className='rounded-[15px] py-6 px-8 lg:px-11 bg-(--accent-color1) text-white text-xl xl:text-2xl font-semibold hover:bg-(--accent-color2) transition-colors cursor-pointer'
										text='Отправить заявку'
										onClick={handleOrderClick}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<OrderModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				orderData={{
					area,
					objectType: getObjectTypeLabel(),
					workType: getWorkTypeLabel(),
					price,
				}}
			/>
		</>
	)
}
