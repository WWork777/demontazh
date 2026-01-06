// app/services/[slug]/page.tsx
import React from "react";
import { ServiceCalculator } from "@/components/service-calculator";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Title } from "@/components/ui/title";
import { Metadata } from "next";
import { servicesData, getServiceData } from "../../data/services";

// Тип для параметров
interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Генерация метаданных для Кемерово
export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceData(slug);

  if (!service) {
    return {
      title: "Услуга не найдена | Демонтажные работы Кемерово",
      description: "Запрошенная услуга не существует или была удалена",
    };
  }

  // Формируем ключевые слова с учетом города Кемерово
  const keywords = [
    service.title.toLowerCase(),
    "демонтаж",
    "демонтаж " + service.title.toLowerCase().replace("демонтаж ", ""),
    service.title.toLowerCase() + " кемерово",
    service.title.toLowerCase() + " цена",
    service.title.toLowerCase() + " стоимость",
    "демонтаж кемерово",
    "демонтажные работы кемерово",
    "строительные услуги кемерово",
    "ремонт кемерово",
    "кемерово демонтаж",
    "кемерово ремонт",
    "кемерово строительство",
    "кузбасс демонтаж",
    "услуги демонтажа",
    "цены на демонтаж",
    "калькулятор демонтажа",
    ...service.title.split(" ").map((word) => word.toLowerCase()),
    ...service.description
      .split(" ")
      .slice(0, 5)
      .map((word) => word.toLowerCase()),
  ].filter((value, index, self) => self.indexOf(value) === index);

  // Формируем описания для разных видов услуг
  const serviceDescriptions: Record<string, string> = {
    "demontazh-pola": `Демонтаж пола в Кемерово по доступным ценам. Быстро, качественно, с вывозом мусора. Калькулятор стоимости демонтажа пола онлайн. Работаем во всех районах Кемерово.`,
    "demontazh-sten": `Демонтаж стен и перегородок в Кемерово. Профессиональный снос кирпичных, бетонных и гипсокартонных стен. Рассчитайте стоимость демонтажа стен онлайн.`,
    "demontazh-potolkov": `Демонтаж потолков в Кемерово профессионально и аккуратно. Все виды потолочных конструкций. Рассчитайте стоимость демонтажа потолка прямо на сайте.`,
  };

  const defaultDescription = `${service.description} ${service.title} в Кемерово по выгодным ценам. Калькулятор стоимости онлайн. Работаем во всех районах Кемерово и Кузбассе.`;

  return {
    title: `${service.title} в Кемерово 💎 Цены и калькулятор | Демонтажные работы Кузбасс`,
    description: serviceDescriptions[slug] || defaultDescription,
    keywords: keywords.join(", "),

    // Open Graph метатеги
    openGraph: {
      title: `${service.title} в Кемерово | Цены и калькулятор`,
      description: serviceDescriptions[slug] || defaultDescription,
      type: "website",
      locale: "ru_RU",
      siteName: "Демонтажные работы Кемерово",
      url: `https://demontazh42.ru/services/${slug}`,
      images: [
        {
          url: service.image || "/img/og-kemerovo.jpg",
          width: 1200,
          height: 630,
          alt: `${service.title} в Кемерово`,
        },
      ],
    },

    // Twitter метатеги
    twitter: {
      card: "summary_large_image",
      title: `${service.title} в Кемерово | Калькулятор стоимости`,
      description: serviceDescriptions[slug] || defaultDescription,
      images: [service.image || "/img/twitter-kemerovo.jpg"],
    },

    // Canonical URL
    alternates: {
      canonical: `https://demontazh42.ru/services/${slug}`,
    },

    // Robots метатеги
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Гео-метатеги для Кемерово
    other: {
      "geo.region": "RU-KEM",
      "geo.placename": "Кемерово",
      "geo.position": "55.354968;86.087215",
      ICBM: "55.354968, 86.087215",
      "yandex-verification": "ваш-yandex-verification-code",
      "google-site-verification": "ваш-google-verification-code",
    },
  };
}

// Функция для генерации структурированных данных
function generateServiceSchema(service: any, slug: string) {
  const offers = service.services.map((item: any, index: number) => ({
    "@type": "Offer",
    name: item.name,
    price: item.price,
    priceCurrency: "RUB",
    unitCode: item.unit === "кв.м" ? "MTK" : "C62",
    priceValidUntil: "2024-12-31",
    eligibleRegion: {
      "@type": "City",
      name: "Кемерово",
    },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.title} в Кемерово`,
    description: service.description,
    serviceType: service.title,
    provider: {
      "@type": "LocalBusiness",
      name: "Демонтажные работы Кемерово",
      address: {
        "@type": "PostalAddress",
        streetAddress: "ул. Примерная, 123",
        addressLocality: "Кемерово",
        addressRegion: "Кемеровская область",
        postalCode: "650000",
        addressCountry: "RU",
      },
      telephone: "+7-3842-12-34-56",
      email: "info@demontazh-kemerovo.ru",
      openingHours: "Пн-Вс 8:00-22:00",
      priceRange: "₽₽",
      currenciesAccepted: "RUB",
      paymentAccepted: "Наличные, Безналичный расчет",
      areaServed: [
        {
          "@type": "City",
          name: "Кемерово",
        },
        {
          "@type": "City",
          name: "Новокузнецк",
        },
        {
          "@type": "City",
          name: "Прокопьевск",
        },
        {
          "@type": "City",
          name: "Ленинск-Кузнецкий",
        },
        {
          "@type": "City",
          name: "Белово",
        },
        {
          "@type": "City",
          name: "Киселёвск",
        },
        {
          "@type": "City",
          name: "Междуреченск",
        },
      ],
      geo: {
        "@type": "GeoCoordinates",
        latitude: "55.354968",
        longitude: "86.087215",
      },
    },
    areaServed: {
      "@type": "City",
      name: "Кемерово",
    },
    offers: offers,
    url: `https://demontazh-kemerovo.ru/services/${slug}`,
    image: service.image || "/img/logo.jpg",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "234",
      bestRating: "5",
      worstRating: "1",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Услуги по демонтажу в Кемерово",
      itemListElement: service.services.map((item: any, index: number) => ({
        "@type": "Offer",
        position: index + 1,
        name: item.name,
        price: item.price,
        priceCurrency: "RUB",
        description: `${item.name} в Кемерово`,
      })),
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceData(slug);

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Услуга не найдена
          </h1>
          <p className="text-gray-600 mb-8">
            Запрошенная услуга не существует или была удалена
          </p>
          <a
            href="/services"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Вернуться к услугам
          </a>
        </div>
      </div>
    );
  }

  // Генерируем JSON-LD структурированные данные
  const jsonLd = generateServiceSchema(service, slug);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Структурированные данные для поисковых систем */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },

            { label: service.title, href: `/services/${slug}` },
          ]}
        />

        <div className="mt-8">
          <Title
            title={`${service.title} в Кемерово`}
            className="text-4xl md:text-5xl font-bold mb-4"
          />

          {/* Гео-информация */}

          {/* Калькулятор */}
          <div id="calc" className="mt-12">
            <ServiceCalculator
              serviceName={`${service.title} в Кемерово`}
              services={service.services}
            />
          </div>

          {/* Дополнительная информация о городе */}
        </div>
      </div>
    </div>
  );
}

// Генерация статических путей
export async function generateStaticParams() {
  const slugs = Object.keys(servicesData);
  return slugs.map((slug) => ({
    slug,
  }));
}
