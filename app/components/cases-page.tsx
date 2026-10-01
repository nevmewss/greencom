/* eslint-disable @next/next/no-img-element */
"use client";

import {
  BackToTop,
  NewsletterSection,
  SiteFooter,
  SiteHeader,
  type SiteLinks,
} from "./site";
import {
  type CmsData,
  cmsImage,
  cmsItems,
  cmsString,
  cmsText,
  responsiveAlt,
  responsiveImage,
  useCmsPage,
} from "./cms";
import styles from "./cases-page.module.css";

const links: SiteLinks = {
  home: "../",
  about: "../about/",
  services: "../#services",
  price: "../price/",
  news: "../news/",
  contact: "../contact/",
  partners: "../partners/",
};

const caseDescription = "Комплексна автоматизація продуктового магазину з впровадженням сучасного торгового обладнання, POS-систем та програмного забезпечення для швидкого обслуговування клієнтів і контролю бізнес-процесів.";

const fallbackCases: CmsData[] = Array.from({ length: 8 }, (_, index) => ({
  _sync_id: `case-${index + 1}`,
  image_url: "/assets/cases-fresh-market.webp",
  image_alt: "Каса автоматизованого магазину Fresh Market",
  title: "Автоматизація магазину «Fresh Market»",
  description: caseDescription,
  button_label: "Дізнатися більше",
  url: "../case/",
}));

function blockData(blocks: { type: string; data: CmsData }[], types: string[]): CmsData {
  return blocks.find((block) => types.includes(block.type))?.data ?? {};
}

function caseKey(item: CmsData, index: number): string {
  return cmsString(item, "_sync_id", cmsString(item, "slug", `case-${index}`));
}

export function CasesPage() {
  const { blocks, menuData, footerData, locale, locales, setLocale } = useCmsPage(
    "cases",
    ["cases_page", "cases", "newsletter", "site_footer"],
  );
  const pageData = blockData(blocks, ["cases_page", "cases", "case_list"]);
  const newsletterData = blockData(blocks, ["newsletter", "newsletter_section"]);
  const configuredCases = cmsItems(pageData, "items");
  const cases = Array.isArray(pageData.items) ? configuredCases : fallbackCases;

  return (
    <main className={styles.page}>
      <SiteHeader
        data={menuData}
        links={links}
        locale={locale}
        locales={locales}
        onLocaleChange={setLocale}
        variant="inner"
      />

      <section className={styles.hero} aria-labelledby="cases-title">
        <picture className={styles.heroMedia}>
          <source media="(max-width: 600px)" srcSet={responsiveImage(pageData, "mobile", "/assets/news-hero-mobile.webp")} />
          <source media="(max-width: 1000px)" srcSet={responsiveImage(pageData, "tablet", "/assets/news-hero-tablet.webp")} />
          <img
            src={responsiveImage(pageData, "desktop", cmsImage(pageData, "hero_image", "hero_image_url", "/assets/news-hero-desktop.webp"))}
            alt={responsiveAlt(pageData, "")}
          />
        </picture>
        <div className={styles.heroInner}>
          <nav className={styles.breadcrumbs} aria-label="Навігаційний шлях">
            <a href={links.home}>{cmsString(pageData, "home_label", "Головна")}</a>
            <i />
            <span>{cmsString(pageData, "breadcrumb", "Кейси")}</span>
          </nav>
          <div className={styles.heroCopy}>
            <h1 id="cases-title">{cmsString(pageData, "title", "Кейси")}</h1>
            <p>{cmsText(pageData, "description", "Ми співпрацюємо з провідними виробниками, технологічними брендами та постачальниками сучасних рішень, щоб забезпечувати нашим клієнтам надійне обладнання, якісний сервіс та ефективну автоматизацію бізнесу.")}</p>
          </div>
        </div>
      </section>

      <section className={styles.caseList} aria-label={cmsString(pageData, "list_label", "Кейси GreenCom")}>
        <div className={styles.grid}>
          {cases.map((item, index) => (
            <article className={styles.card} key={caseKey(item, index)}>
              <img
                className={styles.cardImage}
                src={cmsImage(item, "image", "image_url", "/assets/cases-fresh-market.webp")}
                alt={cmsString(item, "image_alt", cmsString(item, "title", "Кейс GreenCom"))}
                loading={index < 2 ? "eager" : "lazy"}
              />
              <div className={styles.cardCopy}>
                <h2>{cmsString(item, "title", "Автоматизація магазину «Fresh Market»")}</h2>
                <p>{cmsText(item, "description", cmsText(item, "text", caseDescription))}</p>
                <a href={cmsString(item, "url", "../case/")}>{cmsString(item, "button_label", "Дізнатися більше")}</a>
              </div>
            </article>
          ))}
        </div>

        {cases.length > 0 && (
          <nav className={styles.pagination} aria-label="Пагінація кейсів">
            <button type="button" aria-label="Попередня сторінка">←</button>
            <button className={styles.currentPage} type="button" aria-current="page">99</button>
            <button type="button">99</button>
            <button type="button">99</button>
            <button type="button">99</button>
            <button type="button" aria-label="Наступна сторінка">→</button>
          </nav>
        )}
      </section>

      <NewsletterSection className={styles.newsletter} data={newsletterData} />
      <SiteFooter data={footerData} links={links} className={styles.footer} />
      <BackToTop className={styles.backToTop} />
    </main>
  );
}
