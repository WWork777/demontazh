import { cn } from '@/lib/utils'
import React from 'react'
import { IoChevronForwardSharp } from 'react-icons/io5'
import { Button } from './ui/button'
import { Title } from './ui/title'

interface Props {
	className?: string
}

export const Services: React.FC<Props> = ({ className }) => {
	const data = [
		{ title: 'Демонтаж потолка', src: '/img/master3.png' },
		{ title: 'Демонтаж стен', src: '/img/master3.png' },
		{ title: 'Демонтаж пола', src: '/img/master3.png' },
		{ title: 'Демонтаж перегородок', src: '/img/master3.png' },
		{ title: 'Демонтаж сантехники', src: '/img/master3.png' },
		{ title: 'Вывоз мусора', src: '/img/master3.png' },
	]

	return (
		<section id='services' className={cn(className)}>
			<div className='sm:container mx-auto pt-5 lg:pt-0 pb-5 px-3'>
				<Title
					className='text-[36px] sm:text-[50px] md:text-[56px] font-semibold'
					title='Услуги'
				/>
				<ul className='md:py-10 lg:py-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 md:gap-6'>
					{data.map((item, index) => (
						<li
							key={index}
							className={cn(
								'group relative rounded-[20px] overflow-hidden',
								'min-h-[280px] md:min-h-[300px]',
								'transform transition-all duration-300 ease-out',
								'hover:scale-[1.02] hover:shadow-xl hover:shadow-black/20',
								'cursor-pointer'
							)}
						>
							{/* Фоновое изображение */}
							<div className='absolute inset-0'>
								<img
									src={item.src}
									alt={item.title}
									className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
								/>
								{/* Темный оверлей для лучшей читаемости текста */}
								<div className='absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-black/10' />
							</div>

							{/* Контент */}
							<div className='relative z-10 h-full p-6 md:p-8 flex flex-col justify-end'>
								<h3 className='font-bebas text-3xl md:text-4xl xl:text-[40px] font-medium text-white mb-3 transition-transform duration-300 group-hover:translate-y-[-5px]'>
									{item.title}
								</h3>

								{/* Кнопка/ссылка */}
								<Button
									className=' text-[12px] md:text-[15px] text-white py-2 rounded-[14px] bg-(--accent-color1) flex flex-row-reverse cursor-pointer hover:opacity-90 transition-opacity w-[180px]  md:w-[200px]'
									icon={<IoChevronForwardSharp className='text-2xl' />}
									text='Расчитать стоимость'
									link='/#calc'
								/>
							</div>

							{/* Индикатор номера (опционально) */}
							<div className='absolute top-6 left-6 z-20'>
								<span className='font-bebas text-5xl md:text-6xl font-bold text-white/30'>
									{String(index + 1).padStart(2, '0')}
								</span>
							</div>

							{/* Кнопка/ссылка */}
							<Button
								className='absolute top-6 right-6 z-20 text-[12px] md:text-[15px] text-white py-[5px] rounded-[14px] bg-(--accent-color2) flex flex-row-reverse cursor-pointer hover:opacity-90 transition-opacity w-[150px] md:w-40 pl-1'
								icon={<IoChevronForwardSharp className='text-xl' />}
								text='Смотреть прайс'
								link='/price'
							/>
						</li>
					))}
				</ul>

				{/* Кнопка "Показать все" (опционально) */}
				{/* <div className='mt-12 text-center'>
					<button
						className={cn(
							'px-8 py-4 rounded-full',
							'bg-(--accent-color1) text-white',
							'font-semibold text-lg md:text-xl',
							'transition-all duration-300',
							'hover:scale-105 hover:shadow-lg',
							'active:scale-95'
						)}
					>
						Все услуги
					</button>
				</div> */}
			</div>
		</section>
	)
}
