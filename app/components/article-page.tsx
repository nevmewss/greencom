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
import styles from "./article-page.module.css";

const links: SiteLinks = {
  home: "../",
  about: "../about/",
  services: "../#services",
  price: "../price/",
  news: "../news/",
  contact: "../contact/",
  partners: "../partners/",
};

const fallbackTitle = "Посібник з цифрової трансформації 2026 року";

const fallbackSections: CmsData[] = [
  {
    _sync_id: "strategy",
    anchor: "strategy",
    title: "Стратегія цифрової трансформації",
    paragraphs: [
      "Цифрова трансформація — це не просто впровадження нових технологій, а комплексна зміна підходу до ведення бізнесу. Вона охоплює процеси, команду, дані та взаємодію з клієнтами.",
      "Щоб зміни давали вимірюваний результат, важливо почати з чіткого розуміння цілей. Проаналізуйте поточні процеси, знайдіть ручні операції та визначте показники, які мають покращитися.",
    ],
  },
  {
    _sync_id: "roadmap",
    anchor: "roadmap",
    title: "Побудуйте дорожню карту",
    paragraphs: [
      "Розділіть трансформацію на зрозумілі етапи. Почніть із процесу, де результат можна швидко виміряти, перевірте рішення разом із командою та поступово масштабуйте його на інші напрямки.",
      "Такий підхід знижує ризики, допомагає працівникам адаптуватися до змін і дає керівникам прозору картину ефективності інвестицій.",
    ],
    image_url: "/developer-tech.jpg",
    image_alt: "Фахівець працює над цифровим проєктом",
  },
  {
    _sync_id: "principles",
    anchor: "principles",
    title: "Ключові принципи успішних змін",
    paragraphs: [
      "Технології мають підтримувати бізнес-стратегію, а не існувати окремо від неї. Залучайте працівників до проєкту, пояснюйте цінність змін і регулярно вимірюйте результат.",
      "GreenCom допомагає пройти весь шлях цифрової трансформації: від аудиту та проєктування архітектури до впровадження, навчання команди й подальшої підтримки.",
    ],
  },
];

const fallbackRelated: CmsData[] = [
  { _sync_id: "related-1", image_url: "/assets/news-leaf.png", title: "Як автоматизація допомагає бізнесу зростати", url: "../article/" },
  { _sync_id: "related-2", image_url: "/retail-tech.jpg", title: "Технології для сучасної роздрібної торгівлі", url: "../article/" },
  { _sync_id: "related-3", image_url: "/developer-tech.jpg", title: "Дані як основа управлінських рішень", url: "../article/" },
];

function blockData(blocks: { type: string; data: CmsData }[], types: string[]): CmsData {
  return blocks.find((block) => types.includes(block.type))?.data ?? {};
}

function itemKey(item: CmsData, index: number, prefix: string): string {
  return cmsString(item, "_sync_id", cmsString(item, "anchor", `${prefix}-${index}`));
}

function stringList(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0) : [];
}

function AuthorMeta({ data }: { data: CmsData }) {
  return (
    <div className={styles.meta}>
      <img src={cmsImage(data, "author_image", "author_image_url", "/assets/news-avatar-exact.png")} alt="" />
      <span>
        <b>{cmsString(data, "author", "Jane Cooper")}</b>
        <small>{cmsString(data, "date", "26.04.2026")}</small>
      </span>
      <em>{cmsString(data, "category", "Категорія")}</em>
      <i aria-hidden="true"><img src="/assets/menu-dots-exact.svg" alt="" /></i>
    </div>
  );
}

export function ArticlePage() {
  const { blocks, menuData, footerData, locale, locales, setLocale } = useCmsPage(
    "article",
    ["article_page", "article", "newsletter", "site_footer"],
  );
  const pageData = blockData(blocks, ["article_page", "article", "news_article"]);
  const newsletterData = blockData(blocks, ["newsletter", "newsletter_section"]);
  const configuredSections = cmsItems(pageData, "sections");
  const sections = Array.isArray(pageData.sections) ? configuredSections : fallbackSections;
  const configuredRelated = cmsItems(pageData, "related_items");
  const related = Array.isArray(pageData.related_items) ? configuredRelated : fallbackRelated;
  const title = cmsString(pageData, "title", fallbackTitle);

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

      <section className={styles.hero} aria-labelledby="article-title">
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
            <a href={links.news}>{cmsString(pageData, "news_label", "Новини")}</a>
            <i />
            <span>{cmsString(pageData, "breadcrumb", "Стаття")}</span>
          </nav>
          <h1 id="article-title">{title}</h1>
        </div>
      </section>

      <article className={styles.article}>
        <img
          className={styles.cover}
          src={cmsImage(pageData, "cover_image", "cover_image_url", "/assets/contact-office.png")}
          alt={cmsString(pageData, "cover_image_alt", "Сучасний цифровий простір для бізнесу")}
        />

        <div className={styles.articleGrid}>
          <div className={styles.content}>
            <AuthorMeta data={pageData} />
            <p className={styles.lead}>
              {cmsText(pageData, "lead", "Цифрова трансформація стала ключовим фактором розвитку сучасного бізнесу. Вона допомагає компаніям швидше реагувати на зміни, краще розуміти клієнтів і приймати рішення на основі даних.")}
            </p>

            {sections.map((section, index) => {
              const anchor = cmsString(section, "anchor", `section-${index + 1}`);
              const paragraphs = stringList(section.paragraphs);
              const image = cmsImage(section, "image", "image_url");
              return (
                <section id={anchor} className={styles.copySection} key={itemKey(section, index, "section")}>
                  <h2>{cmsString(section, "title", `Розділ ${index + 1}`)}</h2>
                  {(paragraphs.length ? paragraphs : [cmsText(section, "text")]).filter(Boolean).map((paragraph, paragraphIndex) => (
                    <p key={`${anchor}-paragraph-${paragraphIndex}`}>{paragraph}</p>
                  ))}
                  {image && (
                    <img src={image} alt={cmsString(section, "image_alt", cmsString(section, "title"))} loading="lazy" />
                  )}
                </section>
              );
            })}

            <blockquote>
              {cmsText(pageData, "quote", "Сильна цифрова стратегія поєднує технології, людей і процеси навколо однієї зрозумілої бізнес-мети.")}
            </blockquote>

            <div className={styles.share}>
              <span>{cmsString(pageData, "share_label", "Поділитися статтею")}</span>
              <div>
                <a href="#" aria-label="Поділитися у Facebook">f</a>
                <a href="#" aria-label="Поділитися у LinkedIn">in</a>
                <a href="#" aria-label="Скопіювати посилання">↗</a>
              </div>
            </div>
          </div>

          <aside className={styles.aside}>
            <nav className={styles.contents} aria-label="Зміст статті">
              <h2>{cmsString(pageData, "contents_title", "Зміст статті")}</h2>
              {sections.map((section, index) => {
                const anchor = cmsString(section, "anchor", `section-${index + 1}`);
                return <a href={`#${anchor}`} key={`${itemKey(section, index, "nav")}-link`}>{cmsString(section, "title", `Розділ ${index + 1}`)}</a>;
              })}
            </nav>

            <section className={styles.related}>
              <h2>{cmsString(pageData, "related_title", "Схожі матеріали")}</h2>
              {related.map((item, index) => (
                <a href={cmsString(item, "url", "../article/")} key={itemKey(item, index, "related")}>
                  <img src={cmsImage(item, "image", "image_url", "/assets/news-leaf.png")} alt="" loading="lazy" />
                  <span>
                    <small>{cmsString(item, "category", "Категорія")}</small>
                    <b>{cmsString(item, "title", fallbackTitle)}</b>
                  </span>
                </a>
              ))}
            </section>
          </aside>
        </div>
      </article>

      <NewsletterSection className={styles.newsletter} data={newsletterData} />
      <SiteFooter data={footerData} links={links} className={styles.footer} />
      <BackToTop className={styles.backToTop} />
    </main>
  );
}
