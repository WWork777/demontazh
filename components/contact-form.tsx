"use client";

import React, { useRef, useState } from "react";
import { Button } from "./ui/button";

interface ContactFormProps {
  className?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ className }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (!cleaned) return "";

    let formatted = "+7 ";
    if (cleaned.length > 1) formatted += "(" + cleaned.substring(1, 4);
    if (cleaned.length >= 5) formatted += ") " + cleaned.substring(4, 7);
    if (cleaned.length >= 8) formatted += "-" + cleaned.substring(7, 9);
    if (cleaned.length >= 10) formatted += "-" + cleaned.substring(9, 11);

    return formatted;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name === "phone") {
      setFormData((prev) => ({
        ...prev,
        phone: formatPhone(value),
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    if (e.currentTarget.name === "name") {
      phoneRef.current?.focus();
    } else if (e.currentTarget.name === "phone") {
      // отправка по Enter в телефоне
      (e.currentTarget.form as HTMLFormElement)?.requestSubmit?.();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Пожалуйста, заполните имя");
      nameRef.current?.focus();
      return;
    }

    if (!formData.phone.trim()) {
      alert("Пожалуйста, заполните телефон");
      phoneRef.current?.focus();
      return;
    }

    // Валидация телефона: +7 и 10 цифр = 11 цифр всего
    const digits = formData.phone.replace(/\D/g, "");
    if (digits.length < 11) {
      alert("Введите корректный номер телефона (10 цифр после +7)");
      phoneRef.current?.focus();
      return;
    }

    if (!formData.consent) {
      alert("Необходимо дать согласие на обработку персональных данных");
      return;
    }

    setIsSubmitting(true);

    try {
      const message = `📞 Новая заявка на обратную связь

👤 Имя: ${formData.name}
📱 Телефон: ${formData.phone}

📅 ${new Date().toLocaleString("ru-RU")}`;

      const response = await fetch("/api/send-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Ошибка отправки");
      }

      alert("Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.");

      setFormData({
        name: "",
        phone: "",
        consent: false,
      });

      nameRef.current?.focus();
    } catch (error) {
      console.error("Error sending form:", error);
      alert(
        "Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="space-y-4">
        <div>
          <input
            ref={nameRef}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Ваше имя"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-(--accent-color1) focus:border-(--accent-color1) outline-none disabled:opacity-60"
            disabled={isSubmitting}
            autoComplete="name"
          />
        </div>

        <div>
          <input
            ref={phoneRef}
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="+7 (XXX) XXX-XX-XX"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-(--accent-color1) focus:border-(--accent-color1) outline-none disabled:opacity-60"
            disabled={isSubmitting}
            autoComplete="tel"
          />
        </div>

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            name="consent"
            id="consent"
            checked={formData.consent}
            onChange={handleChange}
            disabled={isSubmitting}
            className="mt-1 w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 disabled:opacity-60"
          />
          <label htmlFor="consent" className="text-sm text-gray-700">
            Я даю согласие на{" "}
            <a
              href="/documents/privacy-policy.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#de7e48" }}
              className="hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              обработку персональных данных
            </a>
          </label>
        </div>

        {/* ВАЖНО: если твой Button НЕ поддерживает prop text, используй children (см. ниже) */}
        <Button
          type="submit"
          disabled={isSubmitting || !formData.consent}
          className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Отправка..." : "Отправить"}
        </Button>
      </div>
    </form>
  );
};
