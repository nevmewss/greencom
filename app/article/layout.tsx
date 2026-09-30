import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Посібник з цифрової трансформації — GreenCom",
  description: "Практичний посібник GreenCom із цифрової трансформації бізнесу.",
};

export default function ArticleLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
