import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Кейси — GreenCom",
  description: "Кейси GreenCom з автоматизації магазинів, торгового обладнання та програмних рішень.",
};

export default function CasesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
