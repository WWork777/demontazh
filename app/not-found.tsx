import { PHONE_NUMBER, PHONE_NUMBER_SRC } from '@/constants'
import Link from 'next/link'

export const metadata = {
	title: 'Страница не найдена',
	description: 'Запрошенная страница не существует',
}

export default function NotFound() {
	return (
		<div className='bg-gray-50 min-h-screen flex items-center justify-center'>
			<div className='container mx-auto px-4 py-8 max-w-4xl'>
				<div className='bg-white p-8 rounded-lg shadow-md text-center'>
					<div className='mb-8'>
						<div className='bg-(--accent-color1) text-white p-6 rounded-lg mb-8'>
							<h1 className='text-4xl font-bold mb-4'>404</h1>
							<p className='text-xl text-green-100'>Страница не найдена</p>
						</div>

						<p className='text-gray-700 text-lg mb-8'>
							К сожалению, запрашиваемая страница не существует. Возможно, она
							была удалена или вы перешли по неверной ссылке.
						</p>

						<div className='space-y-4'>
							<Link
								href='/'
								className='inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-md transition-colors duration-300 text-lg'
							>
								Вернуться на главную
							</Link>

							<div className='text-gray-600'>
								<p className='mb-2'>Или свяжитесь с нами:</p>
								<div className='flex justify-center space-x-6'>
									<a
										href={PHONE_NUMBER_SRC}
										className='text-green-700 hover:text-green-800 transition-colors'
									>
										{PHONE_NUMBER}
									</a>
									<a
										href='mailto:tui.krasnodar@mail.ru'
										className='text-green-700 hover:text-green-800 transition-colors'
									>
										info@demontazh42.ru
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>

				<footer className='text-center mt-10 text-gray-600 text-sm'>
					<p>© 2025 Демонтаж42 Все права защищены.</p>
				</footer>
			</div>
		</div>
	)
}
