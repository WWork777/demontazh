'use client'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import { RxCross2, RxPlus } from 'react-icons/rx'
import './accordion.css'

interface AccordionItem {
	query: string
	response: string
}

interface Props {
	className?: string
	items: AccordionItem[]
}

export const Accordion: React.FC<Props> = ({ className, items }) => {
	const [activeIndex, setActiveIndex] = useState<number | null>(null)

	const onTitleClick = (index: number) => {
		setActiveIndex(index === activeIndex ? null : index)
	}

	return (
		<div className={cn('accordion', className)}>
			{items.map((item, index) => (
				<div
					key={item.query + index}
					className='accordion-item hover:scale-[101%] border border-gray-300 transition-all '
				>
					<div
						className={`accordion-title text-xl xs:text-2xl lg:text-xl xl:text-2xl ${
							index === activeIndex ? 'active' : ''
						}`}
						onClick={() => onTitleClick(index)}
					>
						<span className='chevron'>
							{index === activeIndex ? (
								<RxCross2 color='var(--accent-color1)' size={32} />
							) : (
								<RxPlus color='var(--accent-color2)' size={35} />
							)}
						</span>
						{item.query}
					</div>
					<div
						className={`accordion-content leading-5 ${
							index === activeIndex ? 'open' : ''
						}`}
					>
						<ul className='list-disc pl-[3%]'>
							<li
								key={item.query}
								className='accordion-service hover:scale-[102%]  hover:rounded-md transition-all'
							>
								{item.response}
							</li>
						</ul>
					</div>
				</div>
			))}
		</div>
	)
}
