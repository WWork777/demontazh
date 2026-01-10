import { cn } from "@/lib/utils";
import React from "react";
import { Title } from "./ui/title";

interface Props {
  className?: string;
}

export const About: React.FC<Props> = ({ className }) => {
  const data = [
    {
      title: "ЧЕСТНОСТЬ",
      desc: "Работаем без конфликтов и строго выдерживаем сроки. Без затягиваний и «ещё пару дней».",
      bg: "bg-(--layer-color)",
    },
    {
      title: "ПРОФЕССИОНАЛЬНЫЙ ИНСТРУМЕНТ",
      bg: "bg-(--accent-color1)",
      src: "/img/master1.png",
    },
    {
      title: "АККУРАТНЫЙ ДЕМОНТАЖ",
      desc: "Работаем максимально аккуратно - при необходимости защищаем мебель, полы, окна и инженерные коммуникации. Демонтируем только то, что согласовано, без лишних повреждений.",
      bg: "bg-(--layer-color)",
    },
    {
      title: "КВАЛИФИЦИРОВАННЫЙ ПЕРСОНАЛ",
      desc: "Работы выполняют опытные специалисты демонтажа, а не почасовые разнорабочие. Знаем, что можно ломать, а что - нельзя.",
      bg: "bg-(--layer-color)",
      resize: true,
    },
    {
      title: "ЧИСТО ПОСЛЕ РАБОТ",
      desc: "После демонтажа убираем за собой:\nсобираем мусор, выносим его и оставляем объект в аккуратном состоянии, готовом к следующим этапам ремонта.",
      bg: "bg-(--layer-color)",
    },
    {
      title: "ВЫВОЗ И УТИЛИЗАЦИЯ МУСОРА",
      bg: "bg-(--accent-color2)",
      src: "/img/about2.png",
    },
  ];

  return (
    <section id="about" className={cn(className, "about")}>
      <div className="sm:container mx-auto py-5 px-3">
        <Title
          className="text-[36px] sm:text-[50px] md:text-[56px] font-semibold"
          title="О компании"
        />

        <ul className="pt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {data.map((item, index) => {
            if (item.src) {
              // Карточка с изображением
              return (
                <li
                  key={index}
                  className={cn(
                    "relative p-6 md:p-8 rounded-[20px] min-h-[280px]",
                    "group hover:scale-[1.02] transform transition-all duration-300 ease-out",
                    "hover:shadow-lg hover:shadow-black/10",
                    item.bg
                  )}
                >
                  <div className="absolute inset-0 md:overflow-hidden rounded-[20px]">
                    <img
                      src={item.src}
                      alt={item.title}
                      className={cn(
                        "absolute object-bottom-right bottom-0 right-0 h-[110%] xs:h-full sm:h-[75%] 2xl:h-[85%] max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                      )}
                    />
                  </div>

                  <div className="relative z-10 w-1/2">
                    <h3 className="hidden xs:block font-bebas text-5xl 2xl:text-6xl font-medium text-white transition-transform duration-300 group-hover:translate-x-1">
                      {item.title}
                    </h3>
                  </div>
                </li>
              );
            }

            // Обычная текстовая карточка (текст прижат к верху)
            return (
              <li
                key={index}
                className={cn(
                  "p-6 md:p-8 rounded-[20px]",
                  "group hover:scale-[1.02] transform transition-all duration-300 ease-out",
                  "hover:shadow-lg hover:shadow-black/10",
                  item.bg,
                  "flex flex-col justify-start" // <-- было justify-center
                )}
              >
                <h3
                  className={cn(
                    "font-bebas text-3xl medium mb-3 md:mb-4 transition-transform duration-300 group-hover:translate-x-1",
                    item.resize ? "md:text-[37px]" : "md:text-5xl",
                    "xl:text-5xl"
                  )}
                >
                  {item.title}
                </h3>

                <p className="text-gray-600 text-lg md:text-xl font-semibold leading-5 transition-transform duration-300 group-hover:translate-x-1 whitespace-pre-line">
                  {item.desc}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
