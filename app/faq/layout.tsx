import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "База знань — GreenCom",
  description: "Відповіді на поширені запитання щодо автоматизації, IT-рішень, обладнання та сервісів GreenCom.",
};

export default function FaqLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
