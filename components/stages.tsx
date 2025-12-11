'use client'
import { cn } from '@/lib/utils'
import React, { useRef } from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { StagesSLider, StagesSLiderHandle } from './sliders/stages/stagesSlider'
import { Title } from './ui/title'

interface Props {
	className?: string
}

export const Stages: React.FC<Props> = ({ className }) => {
	const sliderRef = useRef<StagesSLiderHandle>(null)

	const handlePrevClick = () => {
		sliderRef.current?.slidePrev()
	}

	const handleNextClick = () => {
		sliderRef.current?.slideNext()
	}

	return (
		<section id='stages' className={cn(className, 'stages overflow-x-hidden')}>
			<div className='sm:container mx-auto pt-5 lg:pt-20 px-3 grid grid-cols-12 gap-4'>
				<div className='col-start-1 col-end-13 lg:col-end-6	xl:col-end-5 flex flex-col gap-3 justify-center items-center lg:items-start'>
					<Title
						className='text-[36px] sm:text-[50px] md:text-[56px] font-semibold'
						title='Этапы работы'
					/>
					{/* <div className='flex gap-3'>
						<button
							onClick={handlePrevClick}
							className='flex justify-center items-center w-12 h-10 border border-black rounded-[5px] cursor-pointer hover:scale-120'
						>
							<BsChevronLeft className='text-3xl' />
						</button>
						<button
							onClick={handleNextClick}
							className='flex justify-center items-center w-12 h-10 border border-black rounded-[5px] cursor-pointer hover:scale-120'
						>
							<BsChevronRight className='text-3xl' />
						</button>
					</div> */}
					<div className='flex gap-3'>
						<button
							onClick={handlePrevClick}
							className='flex justify-center items-center w-12 h-10 md:w-14 md:h-12 rounded-[5px] cursor-pointer
					relative 
					bg-gray-100 
					border-t border-l border-gray-300
					border-b-2 border-r-2
					shadow-[4px_4px_0_0_rgba(0,0,0,0.1)]
					hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.1)]
					hover:-translate-x-0.5 hover:-translate-y-0.5
					active:shadow-[1px_1px_0_0_rgba(0,0,0,0.1)]
					active:translate-x-0.5 active:translate-y-0.5
					active:border-t-2 active:border-l-2 active:border-gray-900
					active:border-b active:border-r
					transition-all duration-150
					group'
						>
							<BsChevronLeft className='text-3xl relative group-active:scale-90 transition-transform duration-150' />
						</button>

						<button
							onClick={handleNextClick}
							className='flex justify-center items-center w-12 h-10 md:w-14 md:h-12 rounded-[5px] cursor-pointer
					relative 
					bg-gray-100 
					border-t border-l
					border-b-2 border-r-2 border-gray-300
					shadow-[4px_4px_0_0_rgba(0,0,0,0.1)]
					hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.1)]
					hover:-translate-x-0.5 hover:-translate-y-0.5
					active:shadow-[1px_1px_0_0_rgba(0,0,0,0.1)]
					active:translate-x-0.5 active:translate-y-0.5
					active:border-t-2 active:border-l-2
					active:border-b active:border-r active:border-gray-900
					transition-all duration-150
					group'
						>
							<BsChevronRight className='text-3xl relative group-active:scale-90 transition-transform duration-150' />
						</button>
					</div>
				</div>

				<div className='col-start-1 lg:col-start-6 xl:col-start-5 col-end-13 pl-0 md:pl-4 lg:pl-4'>
					<div className='relative lg:-mr-[calc(100vw/12)] xl:-mr-[calc(100vw/5)] overflow-visible '>
						<StagesSLider ref={sliderRef} />
					</div>
				</div>
			</div>
		</section>
	)
}
