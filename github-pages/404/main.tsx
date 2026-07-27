import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NotFoundContent } from "../../app/components/not-found-content";
import type { SiteLinks } from "../../app/components/site";
import "../../app/globals.css";

const links: SiteLinks = {
  home: "/greencom/",
  about: "/greencom/about/",
  services: "/greencom/#services",
  news: "/greencom/#news",
  contact: "/greencom/contact/",
  partners: "/greencom/#partners",
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NotFoundContent links={links} />
  </StrictMode>,
);
