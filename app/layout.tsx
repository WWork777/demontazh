import ScrollToTopButton from "@/components/ui/scrollToTop";
import type { Metadata } from "next";
import { Montserrat, Wix_Madefor_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const wix = Wix_Madefor_Display({
  variable: "--font-wix",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["cyrillic", "cyrillic-ext"],
});
const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["cyrillic", "cyrillic-ext"],
});

const bebas = localFont({
  variable: "--font-bebas",
  src: [
    {
      path: "./fonts/BebasNeueCyrillic.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/BebasNeueCyrillic.woff",
      weight: "400",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Демонтаж любой сложности",
  description: "Профессиональный демонтаж в Кемерово и Кемеровской области",
  alternates: {
    canonical: "https://demontazh42.ru/",
  },
  icons: {
    icon: [
      { rel: "icon", type: "image/svg+xml", url: "/favicon/favicon.ico" },
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        url: "/favicon/favicon-96x96.png",
      },
    ],
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${bebas.variable} ${wix.variable} ${montserrat.variable} antialiased`}
      >
        {children}
        <ScrollToTopButton />
      </body>
    </html>
  );
}
