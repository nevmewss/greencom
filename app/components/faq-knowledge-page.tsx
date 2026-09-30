"use client";

import { useState } from "react";
import { BackToTop, SiteFooter, SiteHeader, type SiteLinks } from "./site";
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
import styles from "./faq-knowledge-page.module.css";

const links: SiteLinks = {
  home: "../",
  about: "../about/",
  services: "../#services",
  price: "../price/",
  news: "../news/",
  contact: "../contact/",
  partners: "../partners/",
};

const fallbackArticles: CmsData[] = Array.from({ length: 11 }, (_, index) => ({
  _sync_id: `knowledge-article-${index + 1}`,
  category: "Категорія",
  category_value: ["Категорія", "Категорія 2", "Категорія 3"][index % 3],
  title: "Посібник з цифрової трансформації 2026 року",
  excerpt: "Перемога в цифровій гонці. Дорожня карта трансформації 2025 року. Цифрова трансформація...",
  button_label: "Дізнатися більше",
  url: "#",
}));

const fallbackCategories: CmsData[] = [
  { _sync_id: "all", label: "Усі статті", value: "all" },
  { _sync_id: "category-1", label: "Категорія", value: "Категорія" },
  { _sync_id: "category-2", label: "Категорія", value: "Категорія 2" },
  { _sync_id: "category-3", label: "Категорія", value: "Категорія 3" },
];

function blockData(blocks: { type: string; data: CmsData }[], types: string[]): CmsData {
  return blocks.find((block) => types.includes(block.type))?.data ?? {};
}

function itemKey(item: CmsData, index: number): string {
  return cmsString(item, "_sync_id", cmsString(item, "slug", `knowledge-article-${index}`));
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 18 10">
      <path d="M1 5h15M12 1l4 4-4 4" />
    </svg>
  );
}

export function FaqKnowledgePage() {
  const {
    blocks,
    menuData,
    footerData,
    locale,
    locales,
    setLocale,
  } = useCmsPage("faq", ["knowledge_base", "site_footer"]);
  const pageData = blockData(blocks, ["knowledge_base", "faq_page", "faq_articles", "faq"]);
  const configuredArticles = cmsItems(pageData, "items");
  const articles = Array.isArray(pageData.items) ? configuredArticles : fallbackArticles;
  const configuredCategories = cmsItems(pageData, "categories");
  const categories = Array.isArray(pageData.categories) ? configuredCategories : fallbackCategories;
  const [activeCategory, setActiveCategory] = useState("all");
  const availableValues = categories.map((item, index) => index === 0 ? "all" : cmsString(item, "value", cmsString(item, "label")));
  const selectedCategory = activeCategory === "all" || availableValues.includes(activeCategory) ? activeCategory : "all";
  const visibleArticles = selectedCategory === "all"
    ? articles
    : articles.filter((item) => cmsString(item, "category_value", cmsString(item, "category")) === selectedCategory);

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

      <section className={styles.hero} aria-labelledby="knowledge-title">
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
            <span>{cmsString(pageData, "breadcrumb", "База знань")}</span>
          </nav>
          <div className={styles.heroCopy}>
            <h1 id="knowledge-title">{cmsString(pageData, "title", "База Знань")}</h1>
            <p>{cmsText(pageData, "description", "Знайдіть відповіді на найпоширеніші запитання щодо автоматизації, IT-рішень, обладнання та сервісів GreenCom.")}</p>
          </div>
        </div>
      </section>

      <section className={styles.articles} aria-label={cmsString(pageData, "articles_label", "Статті бази знань")}>
        <div className={styles.filters} role="group" aria-label={cmsString(pageData, "filters_label", "Категорії статей")}>
          {categories.map((category, index) => {
            const value = cmsString(category, "value", cmsString(category, "label", index === 0 ? "all" : `category-${index}`));
            const normalizedValue = index === 0 ? "all" : value;
            const active = selectedCategory === normalizedValue;
            return (
              <button
                className={active ? styles.filterActive : ""}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveCategory(normalizedValue)}
                key={cmsString(category, "_sync_id", `${value}-${index}`)}
              >
                {cmsString(category, "label", value)}
              </button>
            );
          })}
        </div>

        <div className={styles.grid} aria-live="polite">
          {visibleArticles.map((article, index) => (
            <article className={styles.card} key={itemKey(article, index)}>
              <span className={styles.category}>{cmsString(article, "category", "Категорія")}</span>
              <h2>{cmsString(article, "title", "Посібник з цифрової трансформації 2026 року")}</h2>
              <p>{cmsText(article, "excerpt", "Перемога в цифровій гонці. Дорожня карта трансформації 2025 року. Цифрова трансформація...")}</p>
              <a href={cmsString(article, "url", "#")}>
                {cmsString(article, "button_label", "Дізнатися більше")}
                <ArrowIcon />
              </a>
            </article>
          ))}
        </div>

        {visibleArticles.length === 0 && (
          <p className={styles.empty}>{cmsString(pageData, "empty_label", "У цій категорії поки немає статей.")}</p>
        )}

        {visibleArticles.length > 0 && (
          <nav className={styles.pagination} aria-label="Пагінація">
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

      <SiteFooter data={footerData} links={links} className={styles.footer} />
      <BackToTop className={styles.backToTop} />
    </main>
  );
}
