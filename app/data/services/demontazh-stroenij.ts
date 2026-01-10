// data/services/demontazh-stroenij.ts
import { ServiceData } from "../../types/services";

export const demontazhStroenijData: ServiceData = {
  slug: "demontazh-stroenij",
  title: "Демонтаж строений",
  description:
    "Полный демонтаж строений любой сложности в Кемерово. Жилые и нежилые здания, с вывозом мусора и расчисткой территории.",
  image: "/img/demontazh-stroenij.jpg",
  features: [
    "Профессиональный демонтаж строений любой сложности",
    "Вывоз строительного мусора",
    "Расчистка и планировка территории",
    "Работаем со всеми типами зданий и материалов",
  ],
  services: [], // Для этого типа услуги используется форма вместо калькулятора
  useForm: true, // Флаг, указывающий, что нужна форма вместо калькулятора
};

