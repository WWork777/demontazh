'use client'
import { cn } from '@/lib/utils'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
// import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'

export interface StagesSLiderHandle {
	slidePrev: () => void
	slideNext: () => void
}

interface Props {
	className?: string
}

const StagesSLider = forwardRef<StagesSLiderHandle, Props>(
	({ className }, ref) => {
		const swiperRef = useRef<SwiperRef>(null)

		useImperativeHandle(ref, () => ({
			slidePrev: () => {
				swiperRef.current?.swiper.slidePrev()
			},
			slideNext: () => {
				swiperRef.current?.swiper.slideNext()
			},
		}))
		const slides = [
			{
				num: '01',
				title: 'Бесплатный выезд специалиста-сметчика',
				desc: 'Наш специалист выезжает на объект для осмотра и оценки объема работ.',
			},
			{
				num: '02',
				title: 'Составление и согласование сметного расчета',
				desc: 'Мы подготавливаем смету, согласовываем все детали и подтверждаем стоимость работ.',
			},
			{
				num: '03',
				title: 'Заключение договора',
				desc: 'Подписываем договор,в котором оговариваем все условия и сроки выполнения работ.',
			},
			{
				num: '01',
				title: 'Бесплатный выезд специалиста-сметчика',
				desc: 'Наш специалист выезжает на объект для осмотра и оценки объема работ.',
			},
			{
				num: '02',
				title: 'Составление и согласование сметного расчета',
				desc: 'Мы подготавливаем смету, согласовываем все детали и подтверждаем стоимость работ.',
			},
			{
				num: '03',
				title: 'Заключение договора',
				desc: 'Подписываем договор,в котором оговариваем все условия и сроки выполнения работ.',
			},
		]

		return (
			<div className={cn(className)}>
				<Swiper
					ref={swiperRef}
					loop={true}
					grabCursor={true}
					centeredSlides={false}
					// slidesPerView={3}
					// spaceBetween={0}
					pagination={false}
					navigation={false}
					autoplay={{
						delay: 4000, // 4 секунды
						disableOnInteraction: false,
						pauseOnMouseEnter: true,
						waitForTransition: true,
					}}
					speed={1000} // 1 секунда анимации
					modules={[Navigation, Pagination, Autoplay]}
					className='overflow-visible'
					breakpoints={{
						320: {
							slidesPerView: 1.3,
							spaceBetween: 15,
						},
						640: {
							slidesPerView: 1.5,
							spaceBetween: 20,
						},
						768: {
							slidesPerView: 1.5,
							spaceBetween: 25,
						},
						1024: {
							slidesPerView: 2.5, // Немного больше для выхода за границы
							spaceBetween: 15,
						},
						1280: {
							slidesPerView: 3, // Больше для эффекта выхода
							spaceBetween: 20,
						},
					}}
				>
					{slides.map(slide => (
						<SwiperSlide
							className={'border-2 border-gray-300 rounded-2xl min-h-[300px]'}
						>
							<div className='flex items-center gap-0.5 pt-2 md:pt-1'>
								<div className='w-8 h-[2.5px] bg-(--accent-color1)'></div>
								<div className='text-5xl xs:text-6xl lg:text-4xl 2xl:text-5xl text-(--accent-color1) font-medium'>
									{slide.num}
								</div>
								<div className='w-full h-[2.5px] bg-(--accent-color1)'></div>
							</div>
							<div className='pl-4 xl:pl-8 pt-4 xl:pt-8'>
								<h3 className='font-bebas text-2xl  xl:text-3xl font-medium leading-6 xl:leading-10'>
									{slide.title}
								</h3>
								<p className='pt-4 pr-1 text-xl lg:text-lg xl:text-xl font-normal leading-5'>
									{slide.desc}
								</p>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		)
	}
)

StagesSLider.displayName = 'StagesSLider'

export { StagesSLider }
