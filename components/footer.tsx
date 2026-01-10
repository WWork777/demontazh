"use client";
import {
  PHONE_NUMBER,
  PHONE_NUMBER_SRC,
  TELEGRAM_USER,
  WHATSAPP_NUMBER,
} from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import MapModal from "./modals/mapModal";
import { ContactForm } from "./contact-form";

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = ({ className }) => {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  // Функции для управления модалкой карты
  const openMapModal = () => {
    setIsMapModalOpen(true);
  };

  const closeMapModal = () => {
    setIsMapModalOpen(false);
  };
  const navLinks = [
    { title: "О компании", path: "/#about" },
    { title: "Этапы работы", path: "/#stages" },
    { title: "Услуги", path: "/#services" },
    { title: "FAQ", path: "/#faq" },
    {
      title: "Контакты",
      path: "#", // Оставляем # для href
      onClick: () => openMapModal(), // Обработчик для открытия модалки
    },
  ];
  const handleNavLinkClick = (link: (typeof navLinks)[0]) => {
    if (link.onClick) {
      // Если есть onClick, вызываем его
      link.onClick();
    }
  };
  return (
    <>
      <footer
        className={cn(
          className,
          "rounded-[20px] mx-3 lg:mx-8 xl:mx-16 bg-(--layer-color) mb-3 lg:mb-10"
        )}
      >
        <div className="sm:container mx-auto py-11 px-3">
          {/* Основной контент футера */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-8">
            {/* Левая колонка - Логотип и навигация */}
            <div className="col-span-1 md:col-span-3">
              <div className="mb-4">
                <Link
                  href={"/"}
                  className="logo text-(--accent-color2) text-[32px] md:text-[35px] lg:text-[52px] font-bebas"
                >
                  ДЕМОНТАЖ<span className="text-(--accent-color1)">42</span>
                </Link>
              </div>
              <nav>
                <ul className="flex flex-col items-left gap-1">
                  {navLinks.map((link) => (
                    <li key={link.title}>
                      {link.onClick ? (
                        <button
                          onClick={() => handleNavLinkClick(link)}
                          className="md:text-xl hover:text-(--accent-color1) transition-colors duration-300 font-medium flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
                        >
                          {link.title}
                        </button>
                      ) : (
                        <Link
                          href={link.path}
                          className="md:text-xl hover:text-(--accent-color1) transition-colors duration-300 font-medium"
                        >
                          {link.title}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Средняя колонка - Форма обратной связи (по центру) */}
            <div className="col-span-1 md:col-span-4 md:col-start-5">
              <h3 className="text-xl font-semibold mb-4 text-center md:text-left">
                Форма обратной связи
              </h3>
              <ContactForm />
            </div>

            {/* Правая колонка - Контакты (справа) */}
            <div className="col-span-1 md:col-span-4 md:col-start-10">
              <h3 className="text-xl font-semibold mb-4 md:text-right">
                Контакты
              </h3>
              <div className="space-y-3 mb-4">
                <div>
                  <a
                    href={PHONE_NUMBER_SRC}
                    className="flex items-center md:justify-end gap-2 hover:text-(--accent-color1) transition-colors duration-300"
                    aria-label="Позвонить по телефону"
                  >
                    <span className="md:text-lg font-medium">
                      {PHONE_NUMBER}
                    </span>
                  </a>
                </div>
                <div>
                  <a
                    href="mailto:info@demontazh42.ru"
                    className="flex items-center md:justify-end gap-2 hover:text-(--accent-color1) transition-colors duration-300"
                  >
                    <span className="md:text-lg font-medium">
                      info@demontazh42.ru
                    </span>
                  </a>
                </div>
                <div className="flex gap-3 md:justify-end">
                  <a
                    href={`https://t.me/${TELEGRAM_USER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-(--accent-color2) text-white p-2 rounded-full hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center w-10 md:w-[45px] h-10 md:h-[45px]"
                    aria-label="Наш Telegram"
                  >
                    <FaTelegramPlane className="text-3xl mr-1" />
                  </a>
                  <a
                    href={`https://max.ru/u/f9LHodD0cOLRWHC-_DOVb72d1VtL70nRCmoCjc3TiUNBtuW_Cm4H1Q1_FWE`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-(--accent-color1) text-white p-2 rounded-full hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center w-10 md:w-[45px] h-10 md:h-[45px]"
                    aria-label="Наш WhatsApp"
                  >
                    <img
                      src="/svg/max.svg"
                      alt="WhatsApp"
                      className="text-4xl ml-0.5"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Информация об ИП и документы */}
          <div className="border-t border-gray-300 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Информация об ИП */}
              <div>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>ИП Юрманова Валентина Валерьевна</strong>
                </p>
                <p className="text-xs text-gray-600">ИНН: 421502753701</p>
                <p className="text-xs text-gray-600">ОГРНИП: 325420500130941</p>
              </div>

              {/* Ссылки на документы */}
              <div className="flex flex-wrap items-center gap-6 md:gap-8">
                <a
                  href="/documents/privacy-policy.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-700 hover:text-(--accent-color1) transition-colors whitespace-nowrap"
                >
                  Политика конфиденциальности
                </a>
                <a
                  href="/documents/user-agreement.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-700 hover:text-(--accent-color1) transition-colors whitespace-nowrap"
                >
                  Пользовательское соглашение
                </a>
                <a
                  href="/documents/cookie-policy.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-700 hover:text-(--accent-color1) transition-colors whitespace-nowrap"
                >
                  Политика обработки куки
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* Модальное окно с картой */}
      <MapModal isOpen={isMapModalOpen} onClose={closeMapModal} />
    </>
  );
};
