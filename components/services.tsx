import { cn } from "@/lib/utils";
import React from "react";
import { IoChevronForwardSharp } from "react-icons/io5";
import { Button } from "./ui/button";
import { Title } from "./ui/title";

interface Props {
  className?: string;
}

export const Services: React.FC<Props> = ({ className }) => {
  const services = [
    {
      title: "Демонтаж потолка",
      src: "/img/service6.jpg",
      calculateLink: "/services/demontazh-potolkov", // Индивидуальная ссылка для рассчета
      priceLink: "/services/demontazh-potolkov", // Индивидуальная ссылка на прайс
    },
    {
      title: "Демонтаж стен и перегородок",
      src: "/img/service5.jpg",
      calculateLink: "/services/demontazh-sten",
      priceLink: "/services/demontazh-sten",
    },
    {
      title: "Демонтаж пола",
      src: "/img/service4.jpg",
      calculateLink: "/services/demontazh-pola",
      priceLink: "/services/demontazh-pola",
    },
    {
      title: "Демонтаж штукатурки",
      src: "/img/service3.jpg",
      calculateLink: "/services/demontazh-shtukaturki",
      priceLink: "/services/demontazh-shtukaturki",
    },
    {
      title: "Демонтаж плитки",
      src: "/img/service2.jpg",
      calculateLink: "/services/demontazh-plitki",
      priceLink: "/services/demontazh-plitki",
    },
    {
      title: "Демонтаж строений",
      src: "/img/service1.jpg",
      calculateLink: "/services/demontazh-stroeniy",
      priceLink: "/services/demontazh-stroeniy",
    },
  ];

  return (
    <section id="services" className={cn(className)}>
      <div className="sm:container mx-auto pt-5 lg:pt-10 pb-5 px-3">
        <Title
          className="text-[36px] sm:text-[50px] md:text-[56px] font-semibold"
          title="Попоулярные услуги"
        />
        <ul className="md:py-10 lg:py-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => (
            <li
              key={index}
              className={cn(
                "group relative rounded-[20px] overflow-hidden",
                "min-h-[280px] md:min-h-[300px]",
                "transform transition-all duration-300 ease-out",
                "hover:scale-[1.02] hover:shadow-xl hover:shadow-black/20",
                "cursor-pointer"
              )}
            >
              {/* Фоновое изображение */}
              <div className="absolute inset-0">
                <img
                  src={service.src}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Темный оверлей для лучшей читаемости текста */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-black/10" />
              </div>

              {/* Контент */}
              <div className="relative z-10 h-full p-6 md:p-8 flex flex-col justify-end">
                <h3 className="font-bebas text-3xl md:text-4xl xl:text-[40px] font-medium text-white mb-3 transition-transform duration-300 group-hover:translate-y-[-5px]">
                  {service.title}
                </h3>

                {/* Кнопка "Рассчитать стоимость" - ведет на страницу услуги с якорем #calc */}
                <Button
                  className="text-[12px] md:text-[15px] text-white py-2 rounded-[14px] bg-(--accent-color1) flex flex-row-reverse cursor-pointer hover:opacity-90 transition-opacity w-[180px] md:w-[200px]"
                  icon={<IoChevronForwardSharp className="text-2xl" />}
                  text="Расчитать стоимость"
                  link={service.calculateLink} // Индивидуальная ссылка для каждой услуги
                />
              </div>

              {/* Индикатор номера (опционально) */}
              <div className="absolute top-6 left-6 z-20">
                <span className="font-bebas text-5xl md:text-6xl font-bold text-white/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Кнопка "Смотреть прайс" - ведет на страницу с прайсом для конкретной услуги */}
              <Button
                className="absolute top-6 right-6 z-20 text-[12px] md:text-[15px] text-white py-[5px] rounded-[14px] bg-(--accent-color2) flex flex-row-reverse cursor-pointer hover:opacity-90 transition-opacity w-[150px] md:w-40 pl-1"
                icon={<IoChevronForwardSharp className="text-xl" />}
                text="Смотреть прайс"
                link={service.priceLink} // Индивидуальная ссылка для прайса
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
