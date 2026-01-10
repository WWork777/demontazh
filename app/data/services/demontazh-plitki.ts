// data/services/demontazh-plitki.ts
import { ServiceData } from "../../types/services";

export const demontazhPlitkiData: ServiceData = {
  slug: "demontazh-plitki",
  title: "Демонтаж плитки",
  description:
    "Профессиональный демонтаж плитки и керамогранита со стен в Кемерово. Аккуратная работа с сохранением основания.",
  image: "/img/demontazh-plitki.jpg",
  features: [
    "Аккуратный демонтаж без повреждения основания",
    "Опытные мастера с профессиональным инструментом",
    "Полная уборка и вывоз строительного мусора",
    "Работаем с любыми типами плитки и керамогранита",
  ],
  services: [
    {
      name: "Демонтаж плитки, керамогранита со стен",
      unit: "кв.м",
      price: 500,
      minPrice: 500,
      maxPrice: 700,
    },
    {
      name: "Мешки + утарка в мешки",
      unit: "шт",
      price: 60,
      minPrice: 60,
      maxPrice: 100,
    },
  ],
};

