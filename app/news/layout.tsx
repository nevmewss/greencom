import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Новини — GreenCom",
  description: "Новини, кейси та експертні матеріали GreenCom про автоматизацію, IT-рішення та інновації для бізнесу.",
};

export default function NewsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
