// types/services.ts
export interface ServiceItem {
  name: string;
  unit: string;
  price: number;
  minPrice?: number;
  maxPrice?: number;
}

export interface ServiceData {
  title: string;
  description: string;
  services: ServiceItem[];
  image: string;
  features: string[];
  slug: string;
}
