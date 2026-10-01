import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Автоматизація магазину Fresh Market — GreenCom",
  description: "Кейс GreenCom: комплексна автоматизація магазину Fresh Market.",
};

export default function CaseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
