import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Про компанію — GreenCom",
  description: "Команда експертів GreenCom з автоматизації бізнесу та сучасних IT-рішень.",
  openGraph: {
    title: "Про компанію GreenCom",
    description: "Технології, які створюють ефективний бізнес.",
    images: [{ url: "og.png", width: 1200, height: 630, alt: "GreenCom" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Про компанію GreenCom",
    description: "Технології, які створюють ефективний бізнес.",
    images: ["og.png"],
  },
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
