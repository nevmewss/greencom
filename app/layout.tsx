import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GreenCom — автоматизація бізнесу",
  description: "Індивідуальні рішення автоматизації, обладнання та підтримка бізнесу.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="uk"><body>{children}</body></html>;
}
