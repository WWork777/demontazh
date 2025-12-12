export const TELEGRAM_USER = process.env.NEXT_PUBLIC_TELEGRAM_USER
	? process.env.NEXT_PUBLIC_TELEGRAM_USER.replace('@', '')
	: 'Destroy142'

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
	? process.env.NEXT_PUBLIC_WHATSAPP_NUMBER.replace(/\D/g, '')
	: '79059694966'

export const PHONE_NUMBER =
	process.env.NEXT_PUBLIC_PHONE_NUMBER || '+7 (905) 969 4966'

export const PHONE_NUMBER_SRC =
	process.env.NEXT_PUBLIC_PHONE_SRC || 'tel:+79059694966'

export const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN

export const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID
