import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Прайс — GreenCom",
  description: "Вартість послуг, обладнання та рішень GreenCom для автоматизації бізнесу.",
};

export default function PriceLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
