// data/services/index.ts
import { ServiceData } from "../../types/services";
import { demontazhPolaData } from "./demontazh-pola";
import { demontazhStenData } from "./demontazh-sten";
import { demontazhPotolkovData } from "./demontazh-potolkov";

// Экспортируем все данные услуг
export const servicesData: Record<string, ServiceData> = {
  "demontazh-pola": demontazhPolaData,
  "demontazh-sten": demontazhStenData,
  "demontazh-potolkov": demontazhPotolkovData,
};

// Экспортируем отдельные константы для удобства
export { demontazhPolaData, demontazhStenData, demontazhPotolkovData };

// Функция для получения данных услуги по slug
export function getServiceData(slug: string): ServiceData | null {
  return servicesData[slug] || null;
}

// Функция для получения всех slugs услуг
export function getAllServiceSlugs(): string[] {
  return Object.keys(servicesData);
}

// Функция для получения всех услуг для главной страницы
export function getAllServicesForHomepage(): Array<{
  title: string;
  slug: string;
  description: string;
  image: string;
}> {
  return Object.values(servicesData).map((service) => ({
    title: service.title,
    slug: service.slug,
    description: service.description,
    image: service.image,
  }));
}
