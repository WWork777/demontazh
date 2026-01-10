// components/service-calculator.tsx
"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

interface ServiceItem {
  name: string;
  unit: string;
  price: number;
  minPrice?: number;
  maxPrice?: number;
}

interface ServiceCalculatorProps {
  serviceName: string;
  services: ServiceItem[];
  className?: string;
}

export const ServiceCalculator: React.FC<ServiceCalculatorProps> = ({
  serviceName,
  services,
  className,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contact, setContact] = useState({ name: "", phone: "" });
  const [consent, setConsent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  // Выбранные услуги (числовая "истина" для расчётов)
  const [selectedServices, setSelectedServices] = useState<
    Record<string, { quantity: number; customPrice?: number }>
  >({});

  // Черновики ввода количества (строка: позволяет держать "" без превращения в 0)
  const [quantityDraft, setQuantityDraft] = useState<Record<string, string>>(
    {}
  );

  const [showCustomPrice, setShowCustomPrice] = useState<
    Record<string, boolean>
  >({});
  const [total, setTotal] = useState(0);

  // Цвета
  const primaryColor = "#de7e48";
  const darkColor = "#000000";
  const lightOrange = "#fdf3ee";

  const openModal = () => {
    setIsModalOpen(true);
    setTimeout(() => nameRef.current?.focus(), 50);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setContact({ name: "", phone: "" });
    setConsent(false);
    setIsSending(false);
  };

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

  const onContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "phone") {
      setContact((p) => ({ ...p, phone: formatPhone(value) }));
      return;
    }

    setContact((p) => ({ ...p, [name]: value }));
  };

  const onContactKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    if (e.currentTarget.name === "name") {
      phoneRef.current?.focus();
    } else if (e.currentTarget.name === "phone") {
      void sendToTelegram();
    }
  };

  const calculateTotal = useCallback(() => {
    let sum = 0;

    Object.entries(selectedServices).forEach(([name, data]) => {
      const service = services.find((s) => s.name === name);
      if (!service) return;

      if (data.quantity > 0) {
        const price = data.customPrice ?? service.price;
        sum += price * data.quantity;
      }
    });

    setTotal(sum);
  }, [selectedServices, services]);

  useEffect(() => {
    calculateTotal();
  }, [calculateTotal]);

  const handleQuantityChange = (serviceName: string, quantity: number) => {
    const q = Math.max(0, quantity);

    setSelectedServices((prev) => {
      const next = {
        ...prev,
        [serviceName]: { ...prev[serviceName], quantity: q },
      };

      if (q === 0) {
        // удаляем услугу, если 0
        const { [serviceName]: _, ...rest } = next;
        return rest;
      }

      return next;
    });

    // синхронизация отображаемого значения в инпуте
    setQuantityDraft((prev) => ({
      ...prev,
      [serviceName]: q === 0 ? "" : String(q),
    }));
  };

  const handlePriceChange = (serviceName: string, price: number) => {
    const service = services.find((s) => s.name === serviceName);
    if (!service) return;

    const validatedPrice = Math.max(
      service.minPrice ?? service.price,
      Math.min(price, service.maxPrice ?? service.price * 2)
    );

    setSelectedServices((prev) => ({
      ...prev,
      [serviceName]: {
        ...prev[serviceName],
        // если пользователь уточнил цену, но ещё не выбрал количество — пусть quantity=1
        quantity: prev[serviceName]?.quantity ?? 1,
        customPrice: validatedPrice,
      },
    }));

    // если мы авто-поставили quantity=1, то надо обновить draft тоже
    setQuantityDraft((prev) => ({
      ...prev,
      [serviceName]: prev[serviceName] !== undefined ? prev[serviceName] : "1",
    }));
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  const resetCalculator = () => {
    setSelectedServices({});
    setQuantityDraft({});
    setShowCustomPrice({});
    setTotal(0);
  };

  const formatUnit = (unit: string) => {
    switch (unit) {
      case "кв.м":
        return "м²";
      case "п.м":
        return "м";
      case "шт":
        return "шт";
      default:
        return unit;
    }
  };

  const selectedServicesCount = Object.keys(selectedServices).filter(
    (name) => (selectedServices[name]?.quantity ?? 0) > 0
  ).length;

  const handleSendCalculation = () => {
    if (selectedServicesCount === 0) return;
    openModal();
  };

  const sendToTelegram = async () => {
    if (!contact.name.trim()) {
      alert("Пожалуйста, введите имя");
      nameRef.current?.focus();
      return;
    }

    if (!contact.phone.trim()) {
      alert("Пожалуйста, введите телефон");
      phoneRef.current?.focus();
      return;
    }

    const digits = contact.phone.replace(/\D/g, "");
    if (digits.length < 11) {
      alert("Введите корректный номер телефона (10 цифр после +7)");
      phoneRef.current?.focus();
      return;
    }

    if (!consent) {
      alert("Необходимо дать согласие на обработку персональных данных");
      return;
    }

    const selectedList = Object.entries(selectedServices)
      .filter(([_, data]) => (data.quantity ?? 0) > 0)
      .map(([name, data]) => {
        const service = services.find((s) => s.name === name);
        const price = data.customPrice ?? service?.price ?? 0;
        const unit = service?.unit ?? "";
        const itemTotal = (data.quantity ?? 0) * price;

        return `• ${name}: ${data.quantity} ${unit} × ${formatCurrency(
          price
        )} = ${formatCurrency(itemTotal)}`;
      })
      .join("\n");

    const message = `🧾 Заявка на расчет (калькулятор услуг)

🏷️ Услуга: ${serviceName}

👤 Имя: ${contact.name}
📞 Телефон: ${contact.phone}

📌 Выбранные работы:
${selectedList || "—"}

💰 Итого: ${formatCurrency(total)}
📅 ${new Date().toLocaleString("ru-RU")}`;

    setIsSending(true);

    try {
      const response = await fetch("/api/send-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Ошибка отправки");
      }

      alert("Расчет отправлен! Мы свяжемся с вами в ближайшее время.");
      closeModal();
    } catch (error) {
      console.error("Error sending calculation:", error);
      alert("Ошибка отправки. Попробуйте ещё раз или позвоните нам.");
      setIsSending(false);
    }
  };

  return (
    <div
      className={cn(
        "bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 border border-gray-100",
        className
      )}
    >
      {/* MODAL */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="bg-white rounded-[20px] max-w-md w-full p-6 sm:p-8 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl"
              disabled={isSending}
            >
              ×
            </button>

            <h3 className="text-2xl font-bold mb-6 text-center">
              Отправить расчет
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Ваше имя *
                </label>
                <input
                  ref={nameRef}
                  type="text"
                  name="name"
                  value={contact.name}
                  onChange={onContactChange}
                  onKeyDown={onContactKeyDown}
                  disabled={isSending}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100"
                  placeholder="Введите ваше имя"
                  autoComplete="name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Номер телефона *
                </label>
                <input
                  ref={phoneRef}
                  type="tel"
                  name="phone"
                  value={contact.phone}
                  onChange={onContactChange}
                  onKeyDown={onContactKeyDown}
                  disabled={isSending}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100"
                  placeholder="+7 (XXX) XXX-XX-XX"
                  autoComplete="tel"
                />
              </div>

              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  disabled={isSending}
                  className="mt-1 h-4 w-4 rounded border-gray-300 accent-orange-500 disabled:opacity-50"
                />
                <span className="text-sm text-gray-600 leading-snug">
                  Я даю согласие на{" "}
                  <a
                    href="/documents/privacy-policy.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="text-orange-600 underline hover:opacity-80"
                    onClick={(e) => e.stopPropagation()}
                  >
                    обработку персональных данных
                  </a>
                  .
                </span>
              </label>

              <button
                onClick={() => void sendToTelegram()}
                disabled={isSending || !consent}
                className="w-full rounded-[15px] py-3 bg-orange-500 text-white text-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? "Отправка..." : "Отправить в Telegram"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-gray-100">
        <div className="w-full">
          <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 break-words">
            Калькулятор стоимости
          </h2>
        </div>

        <button
          onClick={resetCalculator}
          style={{
            borderColor: primaryColor,
            color: primaryColor,
          }}
          className="mt-3 sm:mt-4 md:mt-0 px-4 sm:px-5 py-2 sm:py-2.5 border-2 rounded-lg sm:rounded-xl font-medium hover:bg-orange-50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full md:w-auto text-sm sm:text-base whitespace-nowrap"
        >
          Сбросить расчет
        </button>
      </div>

      {/* SERVICES LIST */}
      <div className="space-y-2 sm:space-y-3">
        {services.map((service, index) => {
          const qty = selectedServices[service.name]?.quantity ?? 0;
          const price =
            selectedServices[service.name]?.customPrice ?? service.price;

          return (
            <div
              key={service.name}
              style={{
                borderColor: qty > 0 ? primaryColor : "#e5e7eb",
                backgroundColor: qty > 0 ? lightOrange : "white",
              }}
              className="border rounded-lg sm:rounded-xl p-3 sm:p-4 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex gap-3 sm:gap-4 sm:items-center flex-col sm:flex-row">
                {/* LEFT */}
                <div className="flex-1">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div
                      style={{ backgroundColor: primaryColor }}
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    >
                      <span className="text-white text-xs font-bold">
                        {index + 1}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-1 break-words leading-tight">
                        {service.name}
                      </h3>

                      <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2 flex-wrap">
                        <div className="flex items-center gap-1 xs:gap-2">
                          <span className="text-gray-600 text-xs sm:text-sm whitespace-nowrap">
                            Цена за {service.unit}:
                          </span>

                          {showCustomPrice[service.name] ? (
                            <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2">
                              <input
                                type="number"
                                min={service.minPrice ?? service.price}
                                max={service.maxPrice ?? service.price * 2}
                                value={price}
                                onChange={(e) =>
                                  handlePriceChange(
                                    service.name,
                                    Number(e.target.value)
                                  )
                                }
                                style={{
                                  borderColor: primaryColor,
                                  outlineColor: primaryColor,
                                }}
                                className="w-full xs:w-28 sm:w-32 px-2 sm:px-3 py-1 sm:py-1.5 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-20 focus:ring-orange-500 text-sm"
                              />
                              <div className="flex items-center gap-1 xs:gap-2">
                                <span className="text-gray-500 text-sm">
                                  руб.
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setShowCustomPrice((prev) => ({
                                      ...prev,
                                      [service.name]: false,
                                    }))
                                  }
                                  style={{ color: primaryColor }}
                                  className="text-xs sm:text-sm font-medium hover:underline whitespace-nowrap"
                                >
                                  Стандартная
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 xs:gap-2">
                              <span
                                style={{ color: primaryColor }}
                                className="font-bold text-base sm:text-lg whitespace-nowrap"
                              >
                                {formatCurrency(service.price)}
                              </span>

                              {service.minPrice && service.maxPrice && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setShowCustomPrice((prev) => ({
                                      ...prev,
                                      [service.name]: true,
                                    }))
                                  }
                                  className="text-xs sm:text-sm text-gray-500 hover:text-gray-800 font-medium whitespace-nowrap"
                                >
                                  (уточнить цену)
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3">
                  {/* COUNTER */}
                  <div className="flex items-center justify-between xs:justify-start gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleQuantityChange(service.name, qty - 1)
                      }
                      style={{
                        borderColor: primaryColor,
                        color: primaryColor,
                      }}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg border-2 flex items-center justify-center hover:bg-orange-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                      disabled={qty <= 0}
                    >
                      <span className="text-lg sm:text-xl font-bold">-</span>
                    </button>

                    <div className="relative flex-1 xs:flex-none min-w-[120px] xs:min-w-[130px] sm:min-w-[140px]">
                      <input
                        type="number"
                        min={0}
                        inputMode="numeric"
                        value={
                          quantityDraft[service.name] ??
                          (qty > 0 ? String(qty) : "")
                        }
                        onChange={(e) => {
                          const raw = e.target.value; // "" или "10"
                          setQuantityDraft((prev) => ({
                            ...prev,
                            [service.name]: raw,
                          }));

                          // если очистили — ничего не пишем в selectedServices (иначе будет 0)
                          if (raw === "") return;

                          const num = Number(raw);
                          if (!Number.isNaN(num)) {
                            setSelectedServices((prev) => {
                              const q2 = Math.max(0, num);
                              const next = {
                                ...prev,
                                [service.name]: {
                                  ...prev[service.name],
                                  quantity: q2,
                                },
                              };

                              if (q2 === 0) {
                                const { [service.name]: _, ...rest } = next;
                                return rest;
                              }

                              return next;
                            });
                          }
                        }}
                        onBlur={() => {
                          const raw = quantityDraft[service.name];

                          if (raw === "" || raw == null) {
                            handleQuantityChange(service.name, 0);
                            return;
                          }

                          const num = Number(raw);
                          handleQuantityChange(
                            service.name,
                            Number.isNaN(num) ? 0 : num
                          );
                        }}
                        style={{
                          borderColor: primaryColor,
                          outlineColor: primaryColor,
                        }}
                        className="w-full px-9 sm:px-12 py-2 border-2 rounded-lg text-center font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-opacity-20 focus:ring-orange-500 appearance-none text-sm sm:text-base"
                      />

                      <div
                        style={{
                          backgroundColor: primaryColor,
                          borderColor: primaryColor,
                        }}
                        className="absolute left-0 top-0 bottom-0 w-7 sm:w-10 flex items-center justify-center rounded-l-lg border-2 border-r-0"
                      >
                        <span className="text-white font-bold text-xs sm:text-sm">
                          {formatUnit(service.unit)}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleQuantityChange(service.name, qty + 1)
                      }
                      style={{
                        backgroundColor: primaryColor,
                        borderColor: primaryColor,
                      }}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg border-2 flex items-center justify-center text-white hover:bg-orange-600 transition-colors flex-shrink-0"
                    >
                      <span className="text-lg sm:text-xl font-bold">+</span>
                    </button>
                  </div>

                  {/* SUM */}
                  <div className="text-right xs:w-28 sm:w-32 mt-2 xs:mt-0">
                    <div className="text-xs sm:text-sm text-gray-600 mb-1">
                      Сумма:
                    </div>
                    <div
                      style={{ color: darkColor }}
                      className="font-bold text-base sm:text-lg xs:text-xl whitespace-nowrap"
                    >
                      {formatCurrency(qty * price)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* TOTAL */}
      <div
        style={{
          background: `linear-gradient(135deg, ${lightOrange} 0%, #ffffff 100%)`,
          borderColor: primaryColor,
        }}
        className="mt-6 sm:mt-8 md:mt-10 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border-2"
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="w-full md:w-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
              Итого:
            </h3>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Стоимость с учетом выбранных работ
            </p>
          </div>

          <div className="mt-4 sm:mt-6 md:mt-0 text-center w-full md:w-auto">
            <div
              style={{ color: darkColor }}
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black mb-1 sm:mb-2"
            >
              {formatCurrency(total)}
            </div>
            <div className="text-gray-600 text-xs sm:text-sm">
              *Без учета дополнительных услуг
            </div>
          </div>
        </div>

        {/* DETAILS */}
        {selectedServicesCount > 0 && (
          <div className="mt-4 sm:mt-6 p-3 sm:wp-4 bg-white/50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
              Детали расчета:
            </h4>
            <div className="space-y-1 sm:space-y-2 max-h-32 sm:max-h-40 overflow-y-auto text-xs sm:text-sm">
              {Object.entries(selectedServices)
                .filter(([_, data]) => (data.quantity ?? 0) > 0)
                .map(([name, data]) => {
                  const service = services.find((s) => s.name === name);
                  const price = data.customPrice ?? service?.price ?? 0;
                  const itemTotal = (data.quantity ?? 0) * price;

                  return (
                    <div
                      key={name}
                      className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1"
                    >
                      <span className="text-gray-700 truncate text-xs sm:text-sm">
                        {name}
                      </span>
                      <span className="font-semibold text-gray-900 whitespace-nowrap text-xs sm:text-sm">
                        {data.quantity} {service?.unit} ×{" "}
                        {formatCurrency(price)} = {formatCurrency(itemTotal)}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* ACTIONS */}
        <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            type="button"
            onClick={handleSendCalculation}
            style={{
              backgroundColor: primaryColor,
              boxShadow: `0 4px 20px ${primaryColor}40`,
            }}
            disabled={selectedServicesCount === 0}
            className={`flex-1 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-lg text-white hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
              selectedServicesCount === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Отправить расчет
          </button>

          <button
            type="button"
            onClick={() => {
              window.location.href = "tel:+79059694966";
            }}
            style={{
              borderColor: darkColor,
              color: darkColor,
            }}
            className="flex-1 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-lg border-2 hover:bg-gray-900 hover:text-white transition-all duration-300 whitespace-nowrap"
          >
            Позвонить для уточнения
          </button>
        </div>

        {/* INFO */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
          <div className="flex items-start gap-2 sm:gap-3">
            <div
              style={{ backgroundColor: primaryColor }}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
            >
              <span className="text-white text-sm sm:text-lg font-bold">i</span>
            </div>
            <div className="flex-1">
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                <strong>Внимание:</strong> Окончательная стоимость может
                меняться в зависимости от сложности работ, условий объекта и
                дополнительных факторов. Для точного расчета необходим выезд
                специалиста.
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3 mt-2 sm:mt-3">
                <span className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700 whitespace-nowrap">
                  <div
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                  />
                  Бесплатный выезд
                </span>
                <span className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700 whitespace-nowrap">
                  <div
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                  />
                  Гарантия работ
                </span>
                <span className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700 whitespace-nowrap">
                  <div
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                  />
                  Вывоз мусора
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PROGRESS */}
      {selectedServicesCount > 0 && (
        <div className="mt-6 sm:mt-8">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-gray-700 font-medium text-sm sm:text-base">
              Выбрано услуг:
            </span>
            <span
              style={{ color: primaryColor }}
              className="font-bold text-sm sm:text-base"
            >
              {selectedServicesCount} из {services.length}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
            <div
              style={{
                backgroundColor: primaryColor,
                width: `${(selectedServicesCount / services.length) * 100}%`,
              }}
              className="h-1.5 sm:h-2 rounded-full transition-all duration-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};
