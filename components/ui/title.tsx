import { cn } from '@/lib/utils'
import React from 'react'

interface Props {
	className?: string
	title: string
}

export const Title: React.FC<Props> = ({ className, title }) => {
	return <h2 className={cn(className, 'text-(--accent-color1)')}>{title}</h2>
}
