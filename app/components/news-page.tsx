/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
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
import styles from "./news-page.module.css";

const links: SiteLinks = {
  home: "../",
  about: "../about/",
  services: "../#services",
  price: "../price/",
  news: "./",
  contact: "../contact/",
  partners: "../partners/",
};

const articleTitle = "Посібник з цифрової трансформації 2026 року";
const articleExcerpt = "Перемога в цифровій гонці. Дорожня карта трансформації 2025 року. Цифрова трансформація наступного покоління.";
const articleImages = ["/retail-tech.jpg", "/assets/news-leaf.png", "/developer-tech.jpg"];

const fallbackArticles: CmsData[] = Array.from({ length: 12 }, (_, index) => ({
  _sync_id: `news-article-${index + 1}`,
  image_url: articleImages[index % articleImages.length],
  image_alt: articleTitle,
  author: "Jane Cooper",
  date: "26.04.2026",
  category: "Категорія",
  category_value: ["Категорія", "Категорія 2", "Категорія 3"][index % 3],
  title: articleTitle,
  excerpt: articleExcerpt,
  button_label: "Дізнатися більше",
  url: "../article/",
}));

const fallbackCategories: CmsData[] = [
  { _sync_id: "all", label: "Усі статті", value: "all" },
  { _sync_id: "category-1", label: "Категорія статті", value: "Категорія" },
  { _sync_id: "category-2", label: "Категорія статті", value: "Категорія 2" },
  { _sync_id: "category-3", label: "Категорія статті", value: "Категорія 3" },
];

function blockData(blocks: { type: string; data: CmsData }[], types: string[]): CmsData {
  return blocks.find((block) => types.includes(block.type))?.data ?? {};
}

function articleKey(item: CmsData, index: number): string {
  return cmsString(item, "_sync_id", cmsString(item, "slug", `news-article-${index}`));
}

function ArticleMeta({ article }: { article: CmsData }) {
  return (
    <div className={styles.meta}>
      <img className={styles.avatar} src={cmsImage(article, "author_image", "author_image_url", "/assets/news-avatar-exact.png")} alt="" />
      <span>
        {cmsString(article, "author", "Jane Cooper")}
        <small>{cmsString(article, "date", "26.04.2026")}</small>
      </span>
      <em>{cmsString(article, "category", "Категорія")}</em>
      <b aria-hidden="true"><img src="/assets/menu-dots-exact.svg" alt="" /></b>
    </div>
  );
}

function NewsCard({ article, index, variant = "standard" }: { article: CmsData; index: number; variant?: "featured" | "compact" | "standard" }) {
  return (
    <article className={`${styles.card} ${styles[variant]}`}>
      <img
        className={styles.cardImage}
        src={cmsImage(article, "image", "image_url", articleImages[index % articleImages.length])}
        alt={cmsString(article, "image_alt", cmsString(article, "title", articleTitle))}
        loading="lazy"
      />
      <div className={styles.cardBody}>
        <ArticleMeta article={article} />
        <h3>{cmsString(article, "title", articleTitle)}</h3>
        <p>{cmsText(article, "excerpt", cmsText(article, "text", articleExcerpt))}</p>
        <a href={cmsString(article, "url", "../article/")}>{cmsString(article, "button_label", "Дізнатися більше")}</a>
      </div>
    </article>
  );
}

export function NewsPage() {
  const {
    blocks,
    menuData,
    footerData,
    locale,
    locales,
    setLocale,
  } = useCmsPage("news", ["news_page", "news", "newsletter", "site_footer"]);
  const pageData = blockData(blocks, ["news_page", "news", "articles"]);
  const newsletterData = blockData(blocks, ["newsletter", "newsletter_section"]);
  const configuredArticles = cmsItems(pageData, "items");
  const articles = Array.isArray(pageData.items) ? configuredArticles : fallbackArticles;
  const configuredLatest = cmsItems(pageData, "latest_items");
  const latestArticles = Array.isArray(pageData.latest_items) ? configuredLatest : articles.slice(0, 3);
  const configuredCategories = cmsItems(pageData, "categories");
  const categories = Array.isArray(pageData.categories) ? configuredCategories : fallbackCategories;
  const listArticles = Array.isArray(pageData.latest_items) ? articles : articles.slice(3);
  const [activeCategory, setActiveCategory] = useState("all");
  const categoryValues = categories.map((category, index) => index === 0 ? "all" : cmsString(category, "value", cmsString(category, "label")));
  const selectedCategory = activeCategory === "all" || categoryValues.includes(activeCategory) ? activeCategory : "all";
  const visibleArticles = selectedCategory === "all"
    ? listArticles
    : listArticles.filter((article) => cmsString(article, "category_value", cmsString(article, "category")) === selectedCategory);

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

      <section className={styles.hero} aria-labelledby="news-title">
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
            <span>{cmsString(pageData, "breadcrumb", "Новини")}</span>
          </nav>
          <div className={styles.heroCopy}>
            <h1 id="news-title">{cmsString(pageData, "title", "Новини")}</h1>
            <p>{cmsText(pageData, "description", "Корисні матеріали про автоматизацію, IT-рішення та інновації для бізнесу. Інсайти, кейси та поради від експертів GreenCore.")}</p>
          </div>
        </div>
      </section>

      <section className={styles.latest} aria-labelledby="latest-news-title">
        <h2 id="latest-news-title">{cmsString(pageData, "latest_title", "Останні Новини")}</h2>
        <div className={styles.latestGrid}>
          {latestArticles[0] && <NewsCard article={latestArticles[0]} index={0} variant="featured" />}
          <div className={styles.latestStack}>
            {latestArticles.slice(1, 3).map((article, index) => (
              <NewsCard article={article} index={index + 1} variant="compact" key={articleKey(article, index + 1)} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.allNews} aria-label={cmsString(pageData, "list_label", "Усі новини") }>
        <div className={styles.filters} role="group" aria-label={cmsString(pageData, "filters_label", "Категорії новин") }>
          {categories.map((category, index) => {
            const value = index === 0 ? "all" : cmsString(category, "value", cmsString(category, "label", `category-${index}`));
            const active = selectedCategory === value;
            return (
              <button
                className={active ? styles.filterActive : ""}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveCategory(value)}
                key={cmsString(category, "_sync_id", `${value}-${index}`)}
              >
                {cmsString(category, "label", value)}
              </button>
            );
          })}
        </div>

        <div className={styles.grid} aria-live="polite">
          {visibleArticles.map((article, index) => (
            <NewsCard article={article} index={index} key={articleKey(article, index)} />
          ))}
        </div>

        {visibleArticles.length === 0 && (
          <p className={styles.empty}>{cmsString(pageData, "empty_label", "У цій категорії поки немає новин.")}</p>
        )}

        {visibleArticles.length > 0 && (
          <nav className={styles.pagination} aria-label="Пагінація новин">
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
