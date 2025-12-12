import Link from 'next/link'

export const metadata = {
	title: 'Политика конфиденциальности - Демонтажные работы',
	description:
		'Политика конфиденциальности и использование сайта демонтажной компании',
}

export default function PrivacyPage() {
	return (
		<div className='min-h-screen bg-gray-50'>
			<div className='container mx-auto px-4 py-8 max-w-4xl'>
				{/* Заголовок */}
				<header className='text-center mb-8'>
					<h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-3'>
						Политика конфиденциальности
					</h1>
					<p className='text-gray-600 italic'>
						Последнее обновление: {new Date().getFullYear()} год
					</p>
				</header>

				<div className='bg-white border border-gray-200 rounded-[20px] p-6 md:p-8'>
					{/* Вступление */}
					<section className='mb-8'>
						<div className='p-4 bg-(--layer-color) rounded-[13px] border border-gray-200 mb-6'>
							<h2 className='text-xl font-semibold text-(--accent-color1) mb-3'>
								Важная информация
							</h2>
							<p className='text-gray-700'>
								Настоящая Политика конфиденциальности объясняет, как мы
								используем информацию на сайте демонтажной компании. Мы ценим
								вашу конфиденциальность и стремимся обеспечить прозрачность в
								отношении обработки данных.
							</p>
						</div>
					</section>

					{/* Основной принцип */}
					<section className='mb-8'>
						<h2 className='text-2xl font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200'>
							<span className='text-(--accent-color1)'>1.</span> Основной
							принцип работы сайта
						</h2>
						<div className='bg-green-50 border border-green-200 rounded-[13px] p-5 mb-4'>
							<h3 className='text-lg font-medium text-green-800 mb-2 flex items-center gap-2'>
								<svg
									className='w-5 h-5'
									fill='currentColor'
									viewBox='0 0 20 20'
								>
									<path
										fillRule='evenodd'
										d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
										clipRule='evenodd'
									/>
								</svg>
								Использование сайта
							</h3>
							<p className='text-gray-700'>
								Наш сайт представляет собой информационный ресурс и калькулятор
								стоимости работ. <strong>Мы не запрашиваем и не храним </strong>
								ваши персональные данные (такие как имя, email или телефон)
								через формы на сайте. Для анализа посещаемости используется
								сервис Яндекс.Метрика.
							</p>
						</div>
					</section>

					{/* Информация на сайте */}
					<section className='mb-8'>
						<h2 className='text-2xl font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200'>
							<span className='text-(--accent-color1)'>2.</span> Какая
							информация используется на сайте
						</h2>
						<div className='space-y-4'>
							<div className='p-4 bg-gray-50 rounded-[10px]'>
								<h3 className='font-medium text-gray-800 mb-2'>
									Калькулятор стоимости
								</h3>
								<p className='text-gray-600 text-sm'>
									Калькулятор работает полностью на стороне клиента. Введенные
									параметры (площадь, тип работ, объект) используются только для
									расчета стоимости и не передаются на сервер.
								</p>
							</div>

							<div className='p-4 bg-gray-50 rounded-[10px]'>
								<h3 className='font-medium text-gray-800 mb-2'>
									Контактные данные компании
								</h3>
								<p className='text-gray-600 text-sm'>
									На сайте размещена публичная контактная информация компании
									(телефон, адрес, режим работы) для информирования клиентов.
								</p>
							</div>
						</div>
					</section>

					{/* Внешние сервисы */}
					<section className='mb-8'>
						<h2 className='text-2xl font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200'>
							<span className='text-(--accent-color1)'>3.</span> Внешние сервисы
							и ссылки
						</h2>
						<div className='p-4 bg-(--layer-color) rounded-[13px] border border-gray-200'>
							<h3 className='font-medium text-gray-800 mb-3'>
								Мессенджеры для связи
							</h3>
							<ul className='space-y-3'>
								<li className='flex items-start gap-3'>
									<div className='bg-blue-100 p-2 rounded-full mt-0.5'>
										<svg
											className='w-4 h-4 text-blue-600'
											fill='currentColor'
											viewBox='0 0 24 24'
										>
											<path d='M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.064-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' />
										</svg>
									</div>
									<div>
										<p className='text-sm font-medium text-gray-700'>
											Telegram
										</p>
										<p className='text-xs text-gray-600'>
											При нажатии кнопки "Telegram" вы переходите в мессенджер.
											Вся переписка остается только в мессенджере.
										</p>
									</div>
								</li>
								<li className='flex items-start gap-3'>
									<div className='bg-green-100 p-2 rounded-full mt-0.5'>
										<svg
											className='w-4 h-4 text-green-600'
											fill='currentColor'
											viewBox='0 0 24 24'
										>
											<path d='M12.032 0a12 12 0 0 0-10.56 17.76L0 24l6.336-1.44A12 12 0 1 0 12.032 0zm6.336 15.84c-.288.816-1.44 1.44-2.304 1.632-.576.096-1.344.192-3.936-.96-3.36-1.536-5.52-5.28-5.664-5.52-.144-.24-1.152-1.536-1.152-2.928 0-1.392.72-2.064.96-2.304.24-.24.48-.336.624-.336.144 0 .288 0 .336.048.096.048.144.144.24.432.096.288.336 1.104.384 1.248.048.144.096.336.048.48-.048.144-.048.24-.096.336-.048.096-.096.192-.144.24-.048.048-.096.144-.192.24-.096.096-.192.24-.096.432.096.192.432.912.936 1.44.672.72 1.44 1.248 1.68 1.392.24.144.384.144.528.048.144-.096.576-.48.72-.624.144-.144.288-.192.432-.144.144.048.912.432 1.056.528.144.096.288.144.336.24.048.096.048.528-.24 1.344z' />
										</svg>
									</div>
									<div>
										<p className='text-sm font-medium text-gray-700'>
											WhatsApp
										</p>
										<p className='text-xs text-gray-600'>
											При нажатии кнопки "WhatsApp" вы переходите в мессенджер.
											Вся переписка остается только в мессенджере.
										</p>
									</div>
								</li>
							</ul>
						</div>
					</section>

					{/* Техническая информация */}
					<section className='mb-8'>
						<h2 className='text-2xl font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200'>
							<span className='text-(--accent-color1)'>4.</span> Техническая
							информация
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div className='p-4 bg-gray-50 rounded-[10px]'>
								<h3 className='font-medium text-gray-800 mb-2'>
									Cookies и Яндекс.Метрика
								</h3>
								<p className='text-gray-600 text-sm'>
									Для анализа посещаемости сайт использует сервис
									Яндекс.Метрика, который применяет файлы cookie. Собирается
									обезличенная информация о поведении пользователей
									(просмотренные страницы, время на сайте). Вы можете отключить
									cookies в настройках браузера.
								</p>
							</div>

							<div className='p-4 bg-gray-50 rounded-[10px]'>
								<h3 className='font-medium text-gray-800 mb-2'>Логи сервера</h3>
								<p className='text-gray-600 text-sm'>
									Сервер может автоматически собирать техническую информацию
									(IP-адрес, тип браузера), которая не позволяет
									идентифицировать личность и используется для обеспечения
									безопасности и работоспособности сайта.
								</p>
							</div>
						</div>
					</section>

					{/* Контактная информация */}
					<section className='mb-8'>
						<h2 className='text-2xl font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200'>
							<span className='text-(--accent-color1)'>5.</span> Контактная
							информация
						</h2>
						<div className='p-5 bg-(--layer-color) rounded-[13px] border border-gray-200'>
							<h3 className='text-lg font-medium text-gray-800 mb-3'>
								Демонтажная компания
							</h3>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div>
									<p className='text-sm font-medium text-gray-700 mb-1'>
										Адрес
									</p>
									<p className='text-gray-600'>г. Кемерово</p>
								</div>
								<div>
									<p className='text-sm font-medium text-gray-700 mb-1'>
										Телефон
									</p>
									<p className='text-gray-600'>+79059694966</p>
								</div>
								<div>
									<p className='text-sm font-medium text-gray-700 mb-1'>
										Режим работы
									</p>
									<p className='text-gray-600'>Пн-Пт: 9:00-18:00</p>
									<p className='text-gray-600 text-sm'>Сб-Вс: 10:00-16:00</p>
								</div>
								<div>
									<p className='text-sm font-medium text-gray-700 mb-1'>
										Email
									</p>
									<p className='text-gray-600'>info@demontazh42.ru</p>
								</div>
							</div>
						</div>
					</section>

					{/* Заключение */}
					<section className='mb-8'>
						<h2 className='text-2xl font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200'>
							<span className='text-(--accent-color1)'>6.</span> Заключительные
							положения
						</h2>
						<div className='p-4 bg-blue-50 border border-blue-200 rounded-[13px]'>
							<h3 className='font-medium text-blue-800 mb-2'>
								Изменения в политике
							</h3>
							<p className='text-gray-700 text-sm'>
								Мы оставляем за собой право вносить изменения в настоящую
								Политику конфиденциальности. Актуальная версия всегда доступна
								на этой странице.
							</p>
						</div>
					</section>

					{/* Кнопка возврата */}
					<div className='flex justify-center mt-8'>
						<Link
							href='/'
							className='px-6 py-3 bg-(--accent-color1) text-white font-medium rounded-[15px] hover:bg-(--accent-color2) transition-colors'
						>
							Вернуться на главную страницу
						</Link>
					</div>
				</div>

				{/* Футер */}
				<footer className='text-center mt-10 text-gray-600 text-sm'>
					<p>
						© {new Date().getFullYear()} Демонтажные работы. Все права защищены.
					</p>
				</footer>
			</div>
		</div>
	)
}
