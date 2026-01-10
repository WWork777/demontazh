import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: NextRequest) {
  try {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return NextResponse.json(
        {
          error:
            "Telegram бот не настроен. Настройте TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID.",
        },
        { status: 500 }
      );
    }

    const form = await request.formData();
    const message = String(form.get("message") || "");
    const photos = form.getAll("photos") as File[];

    if (!message) {
      return NextResponse.json(
        { error: "Сообщение обязательно" },
        { status: 400 }
      );
    }

    // 1) отправляем текст
    const textResp = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
        }),
      }
    );

    const textData = await textResp.json();
    if (!textResp.ok) {
      console.error("Telegram sendMessage error:", textData);
      return NextResponse.json(
        { error: textData?.description || "Ошибка отправки текста в Telegram" },
        { status: 500 }
      );
    }

    // 2) если фото нет — ок
    if (!photos.length) {
      return NextResponse.json({ success: true });
    }

    // 3) одно фото -> sendPhoto
    if (photos.length === 1) {
      const tgForm = new FormData();
      tgForm.append("chat_id", TELEGRAM_CHAT_ID);
      tgForm.append("photo", photos[0], photos[0].name);

      const r = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`,
        { method: "POST", body: tgForm }
      );

      const data = await r.json();
      if (!r.ok) {
        console.error("Telegram sendPhoto error:", data);
        return NextResponse.json(
          { error: data?.description || "Ошибка отправки фото в Telegram" },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true });
    }

    // 4) несколько фото -> sendMediaGroup (до 10)
    const limited = photos.slice(0, 10);

    const tgForm = new FormData();
    tgForm.append("chat_id", TELEGRAM_CHAT_ID);

    const media = limited.map((_, i) => ({
      type: "photo",
      media: `attach://file${i}`,
    }));

    tgForm.append("media", JSON.stringify(media));

    limited.forEach((file, i) => {
      tgForm.append(`file${i}`, file, file.name);
    });

    const r = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMediaGroup`,
      { method: "POST", body: tgForm }
    );

    const data = await r.json();
    if (!r.ok) {
      console.error("Telegram sendMediaGroup error:", data);
      return NextResponse.json(
        { error: data?.description || "Ошибка отправки фото в Telegram" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Ошибка при обработке заявки" },
      { status: 500 }
    );
  }
}
