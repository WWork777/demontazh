import { About } from "@/components/about";
import { Calculator } from "@/components/calculator";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Questions } from "@/components/questions";
import { Reviews } from "@/components/reviews";
import { Services } from "@/components/services";
import { Stages } from "@/components/stages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Демонтаж в Кемерово под ключ — снос зданий, квартир и сооружений",
  description:
    "Профессиональный демонтаж в Кемерово: снос домов и зданий, демонтаж квартир, стен, перегородок и промышленных объектов. Работаем быстро, официально и с вывозом мусора.",
  keywords: [
    "демонтаж Кемерово",
    "снос зданий Кемерово",
    "демонтаж дома",
    "демонтаж квартиры",
    "демонтаж стен",
    "демонтаж перегородок",
    "промышленный демонтаж",
    "вывоз строительного мусора",
  ],
  openGraph: {
    title: "Демонтаж в Кемерово под ключ",
    description:
      "Снос и демонтаж любых объектов в Кемерово. Квартиры, дома, здания, промышленные сооружения. Бесплатный расчет стоимости.",
    url: "https://demontazh42.ru",
    siteName: "Демонтаж Кемерово",
    locale: "ru_RU",
    type: "website",
  },
  alternates: {
    canonical: "https://demontazh42.ru",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Stages />
      <Services />
      <Calculator />
      <Questions />
      <Reviews />
    </>
  );
}
