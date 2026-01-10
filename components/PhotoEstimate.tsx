"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { FaTelegramPlane } from "react-icons/fa";
import { IoChevronForwardSharp } from "react-icons/io5";

interface Props {
  className?: string;
}

export const PhotoEstimate: React.FC<Props> = ({ className }) => {
  const imgSrc = "/img/photo_2026-01-10_15-39-48.jpg"; // твоя узкая/высокая

  return (
    <section className={cn(className)}>
      <div className="sm:container mx-auto px-3 pb-7 mt-10">
        <div className="rounded-[20px] xl:rounded-[33px] 2xl:rounded-[58px] bg-(--layer-color) border border-black/10 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* LEFT */}
            <div className="lg:w-[48%] w-full">
              <div className="relative h-[260px] sm:h-[340px] lg:min-h-[380px] lg:h-full overflow-hidden bg-(--layer-color)">
                {/* blur background */}
                <img
                  src={imgSrc}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover scale-110 blur-[16px] opacity-70"
                  aria-hidden="true"
                />
                {/* мягкое затемнение */}
                <div className="absolute inset-0 bg-black/10" />

                {/* ВОТ ОН — плавный переход в цвет правой части */}
                <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-28 lg:w-40 bg-gradient-to-r from-transparent to-[var(--layer-color)]" />

                {/* main image (не режем) */}
                <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
                  <img
                    src={imgSrc}
                    alt="Оценка демонтажа по фото"
                    className="max-h-full max-w-full object-contain rounded-[16px] shadow-xl"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="lg:w-[52%] w-full p-6 md:p-10 flex flex-col justify-center gap-6">
              <div>
                <h2 className="font-bebas text-4xl md:text-5xl xl:text-6xl leading-none">
                  Расчет стоимости демонтажа по фотографиям
                </h2>

                <p className="mt-3 text-gray-700 text-lg md:text-xl font-semibold leading-6 md:leading-7">
                  Напишите нам в <strong>MAX</strong> или <strong>TG</strong> —
                  отправьте фотографии, и мы скажем предварительную стоимость
                  демонтажа вашего объекта.
                </p>

                <p className="mt-3 text-sm md:text-base text-gray-600">
                  Обычно отвечаем быстро. Чем больше фото — тем точнее расчет.
                </p>
              </div>

              <div className="w-full flex flex-col sm:flex-row gap-3">
                <Button
                  className="w-full sm:w-auto px-6 lg:px-10 py-4 rounded-[14px] bg-(--accent-color2) text-white text-lg md:text-xl font-semibold hover:opacity-90 transition-opacity"
                  text="Написать в MAX"
                  link="https://max.example.com"
                  icon={<IoChevronForwardSharp className="text-2xl" />}
                />

                <Button
                  className="w-full sm:w-auto px-6 lg:px-10 py-4 rounded-[14px] bg-(--accent-color1) text-white text-lg md:text-xl font-semibold hover:opacity-90 transition-opacity"
                  text="Написать в Telegram"
                  link="https://t.me/your_username"
                  icon={<FaTelegramPlane className="text-2xl" />}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
