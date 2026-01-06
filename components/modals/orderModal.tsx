import { WHATSAPP_NUMBER } from "@/constants";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: {
    area: number;
    objectType: string;
    workTypeLabel: string;
    materialLabel?: string;
    price: number;
  };
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  orderData,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMessenger, setSelectedMessenger] = useState<
    "telegram" | "whatsapp"
  >("telegram");

  const createMessage = () => {
    return `📋 Новая заявка на расчет

🏠 Объект: ${orderData.objectType}
📏 Площадь: ${orderData.area} м²
🔨 Тип работ: ${orderData.workTypeLabel}
${orderData.materialLabel ? `🧱 Материал: ${orderData.materialLabel}\n` : ""}
💰 Стоимость: ${orderData.price.toLocaleString("ru-RU")} ₽

📅 ${new Date().toLocaleString("ru-RU")}`;
  };

  const sendToTelegram = async () => {
    await fetch("/api/send-telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: createMessage() }),
    });
  };

  const sendToWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      createMessage()
    )}`;
    window.open(url, "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (selectedMessenger === "telegram") {
        await sendToTelegram();
      } else {
        sendToWhatsApp();
      }
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-[20px] w-full max-w-md p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            text={isSubmitting ? "Отправка…" : "Отправить расчет"}
            className="w-full"
          />
          <Button
            type="button"
            text="Отмена"
            onClick={onClose}
            className="w-full"
          />
        </form>
      </div>
    </div>
  );
};
