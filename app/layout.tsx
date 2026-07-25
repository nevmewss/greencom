import type { Metadata } from "next";
import { Inter, Manrope, Roboto } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-manrope" });
const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });
const roboto = Roboto({ subsets: ["latin", "cyrillic"], weight: ["300", "400"], variable: "--font-roboto" });

export const metadata: Metadata = {
  title: "GreenCom — автоматизація бізнесу",
  description: "Індивідуальні рішення автоматизації, обладнання та підтримка бізнесу.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="uk"><body className={`${manrope.variable} ${inter.variable} ${roboto.variable}`}>{children}</body></html>;
}
