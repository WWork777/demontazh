// components/service-calculator.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  const [selectedServices, setSelectedServices] = useState<
    Record<
      string,
      {
        quantity: number;
        customPrice?: number;
      }
    >
  >({});

  const [showCustomPrice, setShowCustomPrice] = useState<
    Record<string, boolean>
  >({});
  const [total, setTotal] = useState(0);

  // Основные цвета
  const primaryColor = "#de7e48";
  const primaryHover = "#d26933";
  const darkColor = "#000000";
  const lightOrange = "#fdf3ee";
  const darkOrange = "#c56a37";

  // Функция для расчета общей суммы с useCallback
  const calculateTotal = useCallback(() => {
    let sum = 0;
    Object.entries(selectedServices).forEach(([name, data]) => {
      const service = services.find((s) => s.name === name);
      if (service && data.quantity > 0) {
        const price = data.customPrice || service.price;
        sum += price * data.quantity;
      }
    });
    setTotal(sum);
  }, [selectedServices, services]);

  // Автоматически пересчитываем сумму при изменении selectedServices
  useEffect(() => {
    calculateTotal();
  }, [calculateTotal]);

  const handleQuantityChange = (serviceName: string, quantity: number) => {
    setSelectedServices((prev) => {
      const newState = {
        ...prev,
        [serviceName]: {
          ...prev[serviceName],
          quantity: Math.max(0, quantity),
        },
      };

      // Удаляем услугу из состояния, если количество стало 0
      if (quantity === 0) {
        const { [serviceName]: _, ...rest } = newState;
        return rest;
      }

      return newState;
    });
  };

  const handlePriceChange = (serviceName: string, price: number) => {
    const service = services.find((s) => s.name === serviceName);
    if (!service) return;

    const validatedPrice = Math.max(
      service.minPrice || service.price,
      Math.min(price, service.maxPrice || service.price * 2)
    );

    setSelectedServices((prev) => ({
      ...prev,
      [serviceName]: {
        ...prev[serviceName],
        customPrice: validatedPrice,
      },
    }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const resetCalculator = () => {
    setSelectedServices({});
    setShowCustomPrice({});
    setTotal(0);
  };

  const handleSendCalculation = () => {
    const calculationData = {
      serviceName,
      selectedServices: Object.entries(selectedServices)
        .filter(([_, data]) => data.quantity > 0)
        .map(([name, data]) => {
          const service = services.find((s) => s.name === name);
          return {
            name,
            quantity: data.quantity,
            unit: service?.unit,
            pricePerUnit: data.customPrice || service?.price,
            total: data.quantity * (data.customPrice || service?.price || 0),
          };
        }),
      totalAmount: total,
      timestamp: new Date().toISOString(),
    };

    console.log("Отправка расчета:", calculationData);

    // Форматируем выбранные услуги для отображения
    const selectedList = Object.entries(selectedServices)
      .filter(([_, data]) => data.quantity > 0)
      .map(([name, data]) => {
        const service = services.find((s) => s.name === name);
        const price = data.customPrice || service?.price;
        return `${name}: ${data.quantity} ${service?.unit} × ${formatCurrency(
          price || 0
        )} = ${formatCurrency(data.quantity * (price || 0))}`;
      })
      .join("\n");

    alert(
      `Заявка на расчет отправлена!\n\nВыбранные услуги:\n${selectedList}\n\nИтого: ${formatCurrency(
        total
      )}\n\nМы свяжемся с вами в ближайшее время.`
    );
  };

  // Функция для форматирования единицы измерения
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

  // Получаем общее количество выбранных услуг
  const selectedServicesCount = Object.keys(selectedServices).filter(
    (name) => selectedServices[name].quantity > 0
  ).length;

  return (
    <div
      className={cn(
        "bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 border border-gray-100",
        className
      )}
    >
      {/* Заголовок */}
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

      {/* Список услуг */}
      <div className="space-y-2 sm:space-y-3">
        {services.map((service, index) => (
          <div
            key={index}
            style={{
              borderColor:
                selectedServices[service.name]?.quantity > 0
                  ? primaryColor
                  : "#e5e7eb",
              backgroundColor:
                selectedServices[service.name]?.quantity > 0
                  ? lightOrange
                  : "white",
            }}
            className="border rounded-lg sm:rounded-xl p-3 sm:p-4 transition-all duration-300 hover:shadow-md"
          >
            <div className="flex gap-3 sm:gap-4 sm:items-center flex-col sm:flex-row">
              {/* Левая часть - название и цена */}
              <div className="flex-1">
                <div className="flex items-start gap-2 sm:gap-3">
                  {/* Номер позиции */}
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
                              min={service.minPrice || service.price}
                              max={service.maxPrice || service.price * 2}
                              value={
                                selectedServices[service.name]?.customPrice ||
                                service.price
                              }
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

              {/* Правая часть - счетчик и сумма */}
              <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3">
                {/* Счетчик */}
                <div className="flex items-center justify-between xs:justify-start gap-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        service.name,
                        (selectedServices[service.name]?.quantity || 0) - 1
                      )
                    }
                    style={{
                      borderColor: primaryColor,
                      color: primaryColor,
                    }}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg border-2 flex items-center justify-center hover:bg-orange-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                    disabled={
                      (selectedServices[service.name]?.quantity || 0) <= 0
                    }
                  >
                    <span className="text-lg sm:text-xl font-bold">-</span>
                  </button>

                  <div className="relative flex-1 xs:flex-none min-w-[120px] xs:min-w-[130px] sm:min-w-[140px]">
                    <input
                      type="number"
                      min="0"
                      value={selectedServices[service.name]?.quantity || 0}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (!isNaN(value)) {
                          handleQuantityChange(service.name, value);
                        }
                      }}
                      onFocus={(e) => {
                        // Очищаем поле при фокусе, если значение 0
                        if (e.target.value === "0") {
                          e.target.value = "";
                        }
                      }}
                      onBlur={(e) => {
                        // Если поле пустое, устанавливаем 0
                        if (e.target.value === "") {
                          handleQuantityChange(service.name, 0);
                        }
                      }}
                      style={{
                        borderColor: primaryColor,
                        outlineColor: primaryColor,
                      }}
                      className="w-full px-9 sm:px-12 py-2 border-2 rounded-lg text-center font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-opacity-20 focus:ring-orange-500 appearance-none text-sm sm:text-base"
                    />
                    {/* Квадратик с единицей измерения */}
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
                    onClick={() =>
                      handleQuantityChange(
                        service.name,
                        (selectedServices[service.name]?.quantity || 0) + 1
                      )
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

                {/* Сумма */}
                <div className="text-right xs:w-28 sm:w-32 mt-2 xs:mt-0">
                  <div className="text-xs sm:text-sm text-gray-600 mb-1">
                    Сумма:
                  </div>
                  <div
                    style={{ color: darkColor }}
                    className="font-bold text-base sm:text-lg xs:text-xl whitespace-nowrap"
                  >
                    {formatCurrency(
                      (selectedServices[service.name]?.quantity || 0) *
                        (selectedServices[service.name]?.customPrice ||
                          service.price)
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Итоговая сумма */}
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

        {/* Детали расчета */}
        {selectedServicesCount > 0 && (
          <div className="mt-4 sm:mt-6 p-3 sm:wp-4 bg-white/50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
              Детали расчета:
            </h4>
            <div className="space-y-1 sm:space-y-2 max-h-32 sm:max-h-40 overflow-y-auto text-xs sm:text-sm">
              {Object.entries(selectedServices)
                .filter(([_, data]) => data.quantity > 0)
                .map(([name, data]) => {
                  const service = services.find((s) => s.name === name);
                  const price = data.customPrice || service?.price;
                  const itemTotal = data.quantity * (price || 0);

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
                        {formatCurrency(price || 0)} ={" "}
                        {formatCurrency(itemTotal)}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Кнопки действий */}
        <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
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
            onClick={() => {
              window.location.href = "tel:+74951234567";
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

        {/* Дополнительная информация */}
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
                  ></div>
                  Бесплатный выезд
                </span>
                <span className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700 whitespace-nowrap">
                  <div
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                  ></div>
                  Гарантия работ
                </span>
                <span className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700 whitespace-nowrap">
                  <div
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                  ></div>
                  Вывоз мусора
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Прогресс выбранных услуг */}
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
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};
