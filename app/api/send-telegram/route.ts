import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Сообщение обязательно" },
        { status: 400 }
      );
    }

    // Проверяем наличие токенов Telegram
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return NextResponse.json(
        {
          error:
            "Telegram бот не настроен. Пожалуйста, настройте TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID в переменных окружения.",
        },
        { status: 500 }
      );
    }

    // Отправляем в Telegram
    try {
      const telegramResponse = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: "HTML",
          }),
        }
      );

      if (!telegramResponse.ok) {
        const errorText = await telegramResponse.text();
        console.error("Telegram API error:", errorText);
        return NextResponse.json(
          {
            error: "Ошибка при отправке в Telegram. Проверьте настройки бота.",
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Заявка успешно отправлена в Telegram",
      });
    } catch (error) {
      console.error("Error sending to Telegram:", error);
      return NextResponse.json(
        { error: "Ошибка при отправке в Telegram" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Ошибка при обработке заявки" },
      { status: 500 }
    );
  }
}
