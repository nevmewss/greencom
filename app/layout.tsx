import type { Metadata } from "next";
import { Inter, Manrope, Roboto } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-manrope" });
const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });
const roboto = Roboto({ subsets: ["latin", "cyrillic"], weight: ["300", "400"], variable: "--font-roboto" });

export const metadata: Metadata = {
  metadataBase: new URL("https://nevmewss.github.io/greencom/"),
  title: "GreenCom — автоматизація бізнесу",
  description: "Індивідуальні рішення автоматизації, обладнання та підтримка бізнесу.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "GreenCom — автоматизація бізнесу",
    description: "Технології, які створюють ефективний бізнес.",
    images: [{ url: "og.png", width: 1200, height: 630, alt: "GreenCom" }],
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GreenCom — автоматизація бізнесу",
    description: "Технології, які створюють ефективний бізнес.",
    images: ["og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="uk"><body className={`${manrope.variable} ${inter.variable} ${roboto.variable}`}>{children}</body></html>;
}
