import { cn } from '@/lib/utils'
import React from 'react'
import { ReviewsSLider } from './sliders/reviews/reviewsSlider'
import { Title } from './ui/title'

interface Props {
	className?: string
}

export const Reviews: React.FC<Props> = ({ className }) => {
	return (
		<section className={cn(className)}>
			<div className=' sm:container mx-auto pt-5 lg:pt-0 pb-10 md:pb-20  px-3'>
				<Title
					className='text-[36px] sm:text-[50px] md:text-[56px] font-semibold'
					title='Отзывы'
				/>
				<div className='pt-10'>
					<ReviewsSLider />
				</div>
			</div>
		</section>
	)
}
