import { cn } from "@/lib/utils";
import React from "react";
import { Title } from "./ui/title";

interface Props {
  className?: string;
}

export const About: React.FC<Props> = ({ className }) => {
  const data = [
    {
      title: "Соблюдение сроков",
      desc: "Благодаря большому опыту и высококлассному оборудованию мы уверенно выполняем все проекты в сроки",
      bg: "bg-(--layer-color)",
    },
    {
      title: "РАБОТАЕМ В ЛЮБОЕ ВРЕМЯ ГОДА",
      bg: "bg-(--accent-color1)",
      src: "/img/master1.png",
    },
    {
      title: "Гибкий график",
      desc: "Работаем по гибкому графику, чтобы не создавать дискомфорта вам и вашим соседям, выполняя демонтажные работы в удобное для всех время",
      bg: "bg-(--layer-color)",
    },
    {
      title: "Квалифицированный персонал",
      desc: "Все специалисты обладают необходимыми навыками и опытом, чтобы выполнять работу безупречно",
      bg: "bg-(--layer-color)",
      resize: true,
    },
    {
      title: "Гарантия безопасности",
      desc: "Соблюдаем все нормативы и стандарты безопасности, работаем только с сертифицированным оборудованием",
      bg: "bg-(--layer-color)",
    },
    {
      title: "Вы в надежных руках!",
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
                      className="absolute object-bottom-right bottom-0 right-0 h-[110%] xs:h-full sm:h-[75%] 2xl:h-[85%] max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="relative z-10 w-1/2">
                    <h3 className="hidden xs:block font-bebas text-5xl 2xl:text-6xl font-medium text-white transition-transform duration-300 group-hover:translate-x-1">
                      {item.title}
                    </h3>
                  </div>
                </li>
              );
            } else {
              // Обычная текстовая карточка
              return (
                <li
                  key={index}
                  className={cn(
                    "p-6 md:p-8 rounded-[20px]",
                    "group hover:scale-[1.02] transform transition-all duration-300 ease-out",
                    "hover:shadow-lg hover:shadow-black/10",
                    item.bg,
                    "flex flex-col justify-center"
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
                  <p className="text-gray-600 text-lg md:text-xl font-semibold leading-5 transition-transform duration-300 group-hover:translate-x-1">
                    {item.desc}
                  </p>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </section>
  );
};
