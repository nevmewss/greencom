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
import styles from "./partners-page.module.css";

const links: SiteLinks = {
  home: "../",
  about: "../about/",
  services: "../#services",
  price: "../price/",
  news: "../news/",
  contact: "../contact/",
  partners: "./",
};

const partnerDescription = "Міжнародний бренд із багаторічною історією та високими стандартами якості. Співпраця дозволяє реалізовувати сучасні технологічні рішення та підтримувати інноваційний підхід у розвитку проєктів.";

const fallbackPartners: CmsData[] = [
  ["partner-1", "natgeo"],
  ["partner-2", "slack"],
  ["partner-3", "walmart"],
  ["partner-4", "natgeo"],
  ["partner-5", "natgeo"],
  ["partner-6", "linkedin"],
  ["partner-7", "natgeo"],
  ["partner-8", "natgeo"],
  ["partner-9", "natgeo"],
  ["partner-10", "natgeo"],
].map(([id, logo]) => ({
  _sync_id: id,
  name: "National Geographic",
  description: partnerDescription,
  logo_url: `/assets/partner-${logo}.svg`,
  logo_alt: logo,
}));

function blockData(blocks: { type: string; data: CmsData }[], types: string[]): CmsData {
  return blocks.find((block) => types.includes(block.type))?.data ?? {};
}

function partnerKey(item: CmsData, index: number): string {
  return cmsString(item, "_sync_id", cmsString(item, "slug", `partner-${index}`));
}

export function PartnersPage() {
  const {
    blocks,
    menuData,
    footerData,
    locale,
    locales,
    setLocale,
  } = useCmsPage("partners", ["partners_page", "partners", "newsletter", "site_footer"]);
  const pageData = blockData(blocks, ["partners_page", "partners", "partner_list"]);
  const newsletterData = blockData(blocks, ["newsletter", "newsletter_section"]);
  const configuredPartners = cmsItems(pageData, "items");
  const partners = Array.isArray(pageData.items) ? configuredPartners : fallbackPartners;

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

      <section className={styles.hero} aria-labelledby="partners-title">
        <picture className={styles.heroMedia}>
          <source
            media="(max-width: 600px)"
            srcSet={responsiveImage(pageData, "mobile", "/assets/contact-hero-mobile-exact.png")}
          />
          <source
            media="(max-width: 1000px)"
            srcSet={responsiveImage(pageData, "tablet", "/assets/contact-hero-tablet-exact.png")}
          />
          <img
            src={responsiveImage(pageData, "desktop", cmsImage(pageData, "hero_image", "hero_image_url", "/assets/contact-hero-desktop-exact.png"))}
            alt={responsiveAlt(pageData, "")}
          />
        </picture>
        <div className={styles.heroInner}>
          <nav className={styles.breadcrumbs} aria-label="Навігаційний шлях">
            <a href={links.home}>{cmsString(pageData, "home_label", "Головна")}</a>
            <i />
            <span>{cmsString(pageData, "breadcrumb", "Партнери")}</span>
          </nav>
          <div className={styles.heroCopy}>
            <h1 id="partners-title">{cmsString(pageData, "title", "Партнери")}</h1>
            <p>{cmsText(pageData, "description", "Ми співпрацюємо з провідними виробниками, технологічними брендами та постачальниками сучасних рішень, щоб забезпечувати нашим клієнтам надійне обладнання, якісний сервіс та ефективну автоматизацію бізнесу.")}</p>
          </div>
        </div>
      </section>

      <section className={styles.partnerList} aria-label={cmsString(pageData, "list_label", "Наші партнери") }>
        <div className={styles.grid}>
          {partners.map((partner, index) => (
            <article className={styles.card} key={partnerKey(partner, index)}>
              <div className={styles.logoShape}>
                <img
                  src={cmsImage(partner, "logo", "logo_url", "/assets/partner-natgeo.svg")}
                  alt={cmsString(partner, "logo_alt", cmsString(partner, "name", "Партнер"))}
                />
              </div>
              <div className={styles.cardCopy}>
                <h2>{cmsString(partner, "name", "National Geographic")}</h2>
                <p>{cmsText(partner, "description", partnerDescription)}</p>
              </div>
            </article>
          ))}
        </div>
        {partners.length > 0 && (
          <nav className={styles.pagination} aria-label="Пагінація партнерів">
            <button type="button" aria-label="Попередня сторінка"><span>←</span></button>
            <button className={styles.currentPage} type="button" aria-current="page">01</button>
            <button type="button">02</button>
            <button type="button">03</button>
            <span>…</span>
            <button type="button">10</button>
            <button type="button" aria-label="Наступна сторінка"><span>→</span></button>
          </nav>
        )}
      </section>

      <NewsletterSection className={styles.newsletter} data={newsletterData} />
      <SiteFooter data={footerData} links={links} className={styles.footer} />
      <BackToTop className={styles.backToTop} />
    </main>
  );
}
