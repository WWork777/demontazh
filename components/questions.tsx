'use client'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import { IoChevronForwardSharp } from 'react-icons/io5'
import ConectionModal from './modals/connectionModal'
import { Accordion } from './ui/accordion/accordion'
import { Button } from './ui/button'
import { Title } from './ui/title'

interface Props {
	className?: string
}

export const Questions: React.FC<Props> = ({ className }) => {
	const questions = [
		{
			query: 'Сколько стоит демонтаж?',
			response:
				'Стоимость демонтажа формируется индивидуально и зависит от множества факторов: типа конструкции, материалов, этажа, сложности работ и доступности объекта. Мы не работаем по усредненным тарифам, так как каждый проект уникален. После бесплатного выезда специалист составляет детальную смету с поэтапной разбивкой затрат, чтобы вы видели, за что именно платите. Окончательная цена фиксируется в договоре и не меняется в процессе работ.',
		},
		{
			query: 'Вы делаете выезд и замер бесплатно?',
			response:
				'Да, первичный выезд инженера, консультация и точные замеры абсолютно бесплатны. Специалист оценит объем работ, сложность, доступность объекта и особенности конструкций. Это позволяет нам составить точный расчет и предложить оптимальное решение. Выезжаем в удобное для вас время, включая выходные дни. После замера вы получаете подробное коммерческое предложение без каких-либо обязательств.',
		},
		{
			query: 'Когда вы можете начать работы?',
			response:
				'Срок начала работ зависит от текущей загрузки бригад и сложности проекта. Обычно мы начинаем через 2-5 рабочих дней после подписания договора и согласования всех деталей. Для срочных заказов возможен выезд в течение 24 часов. Мы заранее согласовываем график работ, который будет удобен вам, и строго его придерживаемся. Все сроки фиксируются в договоре.',
		},
		{
			query: 'Вывозите ли вы строительный мусор?',
			response:
				'Да, мы обеспечиваем полный цикл работ, включая вывоз и утилизацию строительного мусора. После демонтажа все отходы сортируются, упаковываются в специальные контейнеры и вывозятся на лицензированные полигоны. Мы предоставляем документы об утилизации. Эта услуга может быть как включена в общую стоимость, так и рассчитана отдельно - в зависимости от объема и типа мусора.',
		},
		{
			query: 'У вас своя техника и рабочие?',
			response:
				'Да, мы работаем исключительно со своим оборудованием и штатными сотрудниками. В нашем парке есть вся необходимая техника: от малогабаритных установок для работы в стесненных условиях до мощного оборудования для сложных задач. Все рабочие имеют необходимые допуски, регулярно проходят обучение и застрахованы. Это позволяет нам контролировать каждый этап работ и гарантировать качество.',
		},
	]
	const [isModalOpen, setIsModalOpen] = useState(false)
	const handleOpenModal = () => {
		setIsModalOpen(true)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
	}
	return (
		<>
			<section id='faq' className={cn(className)}>
				<div className='sm:container mx-auto py-5 lg:pb-0 px-3 grid grid-cols-12 gap-4 '>
					<div className='col-start-1 col-end-13 lg:col-end-7 flex flex-col gap-3 justify-around items-center lg:items-start'>
						<Title
							className='text-[36px] sm:text-[50px] md:text-[56px] font-semibold leading-13 md:pb-10 lg:pb-0'
							title='Часто задаваемые вопросы'
						/>
						<div className='bg-(--layer-color) p-[25px] rounded-[15px] max-w-[534px] lg:mb-10'>
							<h3 className='text-2xl font-semibold'>Остались вопросы? </h3>
							<p className='text-xl leading-5 pt-3'>
								Если у вас остались вопросы, свяжитесь с нами и мы ответим на
								все вопросы
							</p>
							<div className='flex justify-end pt-3 lg:pt-1'>
								<Button
									className='md:text-lg text-white py-3 px-4 rounded-lg bg-(--accent-color1) flex flex-row-reverse cursor-pointer hover:opacity-90 transition-opacity '
									icon={<IoChevronForwardSharp className='text-2xl' />}
									text='Связаться'
									onClick={handleOpenModal}
								/>
							</div>
						</div>
					</div>
					<div className='col-start-1 lg:col-start-7  col-end-13 lg:min-h-[630px] flex items-center '>
						<Accordion items={questions} />
					</div>
				</div>
			</section>
			<ConectionModal isOpen={isModalOpen} onClose={handleCloseModal} />
		</>
	)
}
