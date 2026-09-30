import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Партнери — GreenCom",
  description: "Партнери GreenCom — провідні виробники, технологічні бренди та постачальники сучасних рішень.",
};

export default function PartnersLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
