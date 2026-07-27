import { NotFoundContent } from "../components/not-found-content";
import type { SiteLinks } from "../components/site";

const links: SiteLinks = {
  home: "../",
  about: "../about/",
  services: "../#services",
  news: "../#news",
  contact: "../contact/",
  partners: "../#partners",
};

export default function Error404Page() {
  return <NotFoundContent links={links} />;
}
