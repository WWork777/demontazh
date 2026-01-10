// data/services/demontazh-shtukaturki.ts
import { ServiceData } from "../../types/services";

export const demontazhShtukaturkiData: ServiceData = {
  slug: "demontazh-shtukaturki",
  title: "Демонтаж штукатурки",
  description:
    "Профессиональный демонтаж штукатурки и подготовительные работы для отделки стен в Кемерово.",
  image: "/img/demontazh-shtukaturki.jpg",
  features: [
    "Аккуратный демонтаж без повреждения основания",
    "Опытные мастера с профессиональным инструментом",
    "Полная уборка и вывоз строительного мусора",
    "Работаем с любыми типами покрытий стен",
  ],
  services: [
    {
      name: "Демонтаж штукатурки со стен (3см)",
      unit: "кв.м",
      price: 500,
      minPrice: 500,
      maxPrice: 650,
    },
    {
      name: "Демонтаж штукатурки со стен (5см)",
      unit: "кв.м",
      price: 700,
      minPrice: 700,
      maxPrice: 900,
    },
    {
      name: "Удаление краски со стен",
      unit: "кв.м",
      price: 630,
      minPrice: 630,
      maxPrice: 800,
    },
    {
      name: "Удаление обоев со стен (1 слой)",
      unit: "кв.м",
      price: 200,
      minPrice: 200,
      maxPrice: 300,
    },
    {
      name: "Удаление обоев со стен (2-3 слоя)",
      unit: "кв.м",
      price: 280,
      minPrice: 280,
      maxPrice: 400,
    },
    {
      name: "Зачистка стен от шпаклевки",
      unit: "кв.м",
      price: 440,
      minPrice: 440,
      maxPrice: 600,
    },
    {
      name: "Шлифовка стен (от побелки)",
      unit: "кв.м",
      price: 450,
      minPrice: 450,
      maxPrice: 600,
    },
    {
      name: "Демонтаж подоконного блока из ж/б, бетона",
      unit: "кв.м",
      price: 13000,
      minPrice: 13000,
      maxPrice: 15000,
    },
    {
      name: "Демонтаж подоконного блока из кирпича",
      unit: "кв.м",
      price: 10000,
      minPrice: 10000,
      maxPrice: 12000,
    },
    {
      name: "Демонтаж подоконного блока из шлакоблока, пенобетона",
      unit: "кв.м",
      price: 12000,
      minPrice: 12000,
      maxPrice: 14000,
    },
    {
      name: "Демонтаж существующих кирпичных конструкций",
      unit: "кв.м",
      price: 5500,
      minPrice: 5500,
      maxPrice: 7000,
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

