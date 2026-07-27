import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакти — GreenCom",
  description: "Контактна інформація GreenCom, карта, відповіді на запитання та форма зв’язку.",
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
