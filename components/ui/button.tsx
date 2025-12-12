import { cn } from '@/lib/utils'
import Link from 'next/link'
import React, { ReactNode } from 'react'

interface Props {
	disabled?: boolean
	className?: string
	text?: string
	link?: string
	icon?: ReactNode
	children?: ReactNode
	onClick?: () => void // Добавляем обработчик клика
	type?: 'button' | 'submit' | 'reset'
}

export const Button: React.FC<Props> = ({
	className,
	children,
	text,
	link,
	icon,
	onClick,
	type = 'button',
}) => {
	const content = (
		<>
			{icon || children}
			{text && <span>{text}</span>}
		</>
	)

	const classes = cn('flex items-center justify-center gap-2', className)

	if (link) {
		return (
			<Link href={link} className={classes}>
				{content}
			</Link>
		)
	}

	return (
		<button className={classes} onClick={onClick} type={type}>
			{content}
		</button>
	)
}
