/* eslint-disable @next/next/no-img-element */
"use client";

import { BackToTop, NewsletterSection, SiteFooter, SiteHeader, type SiteLinks } from "./site";
import { type CmsData, cmsImage, cmsItems, cmsString, cmsText, responsiveAlt, responsiveImage, useCmsPage } from "./cms";
import styles from "./article-page.module.css";

const links: SiteLinks = { home: "../", about: "../about/", services: "../#services", price: "../price/", news: "../news/", contact: "../contact/", partners: "../partners/" };
const fallbackTitle = "Посібник З Цифрової Трансформації 2026 Року";
const fallbackParagraphs = [
  "Cras sapien integer eu pellentesque massa. Suspendisse ut amet sed pharetra varius venenatis feugiat morbi orci. Sit commodo tellus aliquam fringilla morbi proin sapien cursus. Sit ornare a mauris erat integer dolor in nam. Posuere placerat suspendisse velit sagittis feugiat.",
  "Aenean id proin est commodo. Magna adipiscing purus tincidunt quis eget in varius massa. Vitae nec dictum eu nullam eu habitant id feugiat. Ut cursus orci eget adipiscing leo urna. Ullamcorper leo ut urna nisl tortor commodo in amet eu. Nulla varius congue sem feugiat egestas magna tincidunt fusce. Purus ut praesent mauris nec vitae ac.",
  "Erat metus aliquam cum sodales. Proin dictumst platea dolor natoque scelerisque nascetur sit. Morbi vel rhoncus cursus dictumst tortor mauris interdum eget at. Quis ac fermentum vulputate sit orci. Aliquam tellus nulla sit quis tellus egestas sed a amet. Eu laoreet pharetra at et. Tempus nascetur sed tellus in pellentesque. Et tristique sed augue et bibendum. Varius dictum interdum sagittis leo orci.",
];
const fallbackAfterImage = [
  "Cras sapien integer eu pellentesque massa. Suspendisse ut amet sed pharetra varius venenatis feugiat morbi orci. Sit commodo tellus aliquam fringilla morbi proin sapien cursus. Sit ornare a mauris erat integer dolor in nam. Posuere placerat suspendisse velit sagittis feugiat.",
  "Aenean id proin est commodo. Magna adipiscing purus tincidunt quis eget in varius massa. Vitae nec dictum eu nullam eu habitant id feugiat. Ut cursus orci eget adipiscing leo urna. Ullamcorper leo ut urna nisl tortor commodo in amet eu. Nulla varius congue sem feugiat egestas magna tincidunt fusce.",
];
const fallbackBullets = ["Lorem ipsum dolor sit amet consectetur.", "Lorem ipsum dolor sit amet consectetur.", "Lorem ipsum dolor sit amet consectetur. Aliquet vitae est odio laoreet tellus id tincidunt at. Vestibulum id pulvinar sed integer in ut nec nulla.", "Lorem ipsum dolor sit amet consectetur."];
const fallbackCategories: CmsData[] = Array.from({ length: 7 }, (_, index) => ({ _sync_id: `category-${index + 1}`, title: "Категорія", count: "15", url: "../news/" }));
const fallbackPopular: CmsData[] = Array.from({ length: 4 }, (_, index) => ({ _sync_id: `popular-${index + 1}`, image_url: "/assets/news-leaf.png", author: "Jane Cooper", date: "26.04.2026", title: "Посібник з цифрової трансформації 2026 року", url: "../article/" }));

function blockData(blocks: { type: string; data: CmsData }[], types: string[]): CmsData { return blocks.find((block) => types.includes(block.type))?.data ?? {}; }
function itemKey(item: CmsData, index: number, prefix: string): string { return cmsString(item, "_sync_id", `${prefix}-${index}`); }
function stringList(value: unknown, fallback: string[]): string[] {
  if (!Array.isArray(value)) return fallback;
  const items = value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
  return items.length ? items : fallback;
}

function AuthorMeta({ data }: { data: CmsData }) {
  return <div className={styles.meta}>
    <div className={styles.author}><img src={cmsImage(data, "author_image", "author_image_url", "/assets/news-avatar-exact.png")} alt="" /><span><b>{cmsString(data, "author", "Jane Cooper")}</b><small>{cmsString(data, "date", "26.04.2026")}</small></span></div>
    <div className={styles.articleActions} aria-label="Соціальні мережі"><i aria-hidden="true" />
      <a href={cmsString(data, "instagram_url", "https://www.instagram.com/")} aria-label="Instagram" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></svg></a>
      <a href={cmsString(data, "twitter_url", "https://twitter.com/")} aria-label="Twitter" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 5a8 8 0 0 1-2.4.7 4 4 0 0 0 1.8-2.2 8 8 0 0 1-2.6 1 4 4 0 0 0-6.9 3.7A11.3 11.3 0 0 1 3.7 4a4 4 0 0 0 1.2 5.4A4 4 0 0 1 3 9a4 4 0 0 0 3.2 4 4 4 0 0 1-1.8.1 4 4 0 0 0 3.8 2.8A8 8 0 0 1 2 17.6a11.4 11.4 0 0 0 17.6-9.7V7.4A8 8 0 0 0 22 5Z" /></svg></a>
      <a href={cmsString(data, "facebook_url", "https://www.facebook.com/")} aria-label="Facebook" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 21v-8h3l.5-4H14V7c0-1 .3-2 2-2h2V1.5L15 1c-3 0-5 2-5 5v3H7v4h3v8Z" /></svg></a>
    </div>
  </div>;
}

function Categories({ data, items }: { data: CmsData; items: CmsData[] }) {
  return <section className={styles.categories}><h2>{cmsString(data, "categories_title", "Категорії новин")}</h2><div>{items.map((item, index) => <a href={cmsString(item, "url", "../news/")} key={itemKey(item, index, "category")}><span>{cmsString(item, "title", "Категорія")}</span><small>({cmsString(item, "count", "15")})</small></a>)}</div><a className={styles.moreCategories} href={cmsString(data, "categories_url", "../news/")}>Ще категорії <b>→</b></a></section>;
}

function PopularArticles({ data, items }: { data: CmsData; items: CmsData[] }) {
  return <section className={styles.popular}><h2>{cmsString(data, "popular_title", "Популярні статті")}</h2><div className={styles.popularList}>{items.map((item, index) => <a href={cmsString(item, "url", "../article/")} className={styles.popularCard} key={itemKey(item, index, "popular")}><img src={cmsImage(item, "image", "image_url", "/assets/news-leaf.png")} alt="" loading="lazy" /><span className={styles.popularCopy}><span className={styles.popularMeta}><img src={cmsImage(item, "author_image", "author_image_url", "/assets/news-avatar-exact.png")} alt="" /><span><b>{cmsString(item, "author", "Jane Cooper")}</b><small>{cmsString(item, "date", "26.04.2026")}</small></span><i>⋮</i></span><strong>{cmsString(item, "title", "Посібник з цифрової трансформації 2026 року")}</strong><em>Детальніше <b>→</b></em></span></a>)}</div></section>;
}

function RelatedNavigation({ data }: { data: CmsData }) {
  const previous = (data.previous_article && typeof data.previous_article === "object" ? data.previous_article : {}) as CmsData;
  const next = (data.next_article && typeof data.next_article === "object" ? data.next_article : {}) as CmsData;
  return <nav className={styles.articleNavigation} aria-label="Інші статті">
    {[{ item: previous, label: "Попередня новина", arrow: "←" }, { item: next, label: "Наступна новина", arrow: "→" }].map(({ item, label, arrow }) => <a href={cmsString(item, "url", "../article/")} aria-label={`${label}: ${cmsString(item, "title", fallbackTitle)}`} key={label}>
      <span className={styles.navHeading}><span className={styles.navArrow} aria-hidden="true">{arrow}</span><small>{label}</small></span>
      <span className={styles.navCard}><img src={cmsImage(item, "image", "image_url", "/assets/news-leaf.png")} alt="" /><span><b>{cmsString(item, "title", "Посібник з цифрової трансформації 2026 року")}</b><em>Детальніше →</em></span></span>
    </a>)}
  </nav>;
}

export function ArticlePage() {
  const { blocks, menuData, footerData, locale, locales, setLocale } = useCmsPage("article", ["article_page", "article", "newsletter", "site_footer"]);
  const pageData = blockData(blocks, ["article_page", "article", "news_article"]);
  const newsletterData = blockData(blocks, ["newsletter", "newsletter_section"]);
  const paragraphs = stringList(pageData.paragraphs, [`${fallbackParagraphs[0]} ${fallbackParagraphs[1]}`, fallbackParagraphs[2]]);
  const afterImage = stringList(pageData.after_image_paragraphs, [fallbackAfterImage.join(" ")]);
  const bullets = stringList(pageData.bullets, fallbackBullets);
  const configuredCategories = cmsItems(pageData, "categories");
  const categories = configuredCategories.length ? configuredCategories : fallbackCategories;
  const configuredPopular = cmsItems(pageData, "popular_items");
  const popular = configuredPopular.length ? configuredPopular : fallbackPopular;
  const tags = stringList(pageData.tags, ["Категорія", "Категорія", "Категорія", "Категорія"]);
  const title = cmsString(pageData, "title", fallbackTitle);

  return <main className={styles.page}>
    <SiteHeader data={menuData} links={links} locale={locale} locales={locales} onLocaleChange={setLocale} variant="inner" />
    <section className={styles.hero} aria-labelledby="article-title">
      <picture className={styles.heroMedia}><source media="(max-width: 600px)" srcSet={responsiveImage(pageData, "mobile", "/assets/news-hero-mobile.webp")} /><source media="(max-width: 1000px)" srcSet={responsiveImage(pageData, "tablet", "/assets/news-hero-tablet.webp")} /><img src={responsiveImage(pageData, "desktop", cmsImage(pageData, "hero_image", "hero_image_url", "/assets/news-hero-desktop.webp"))} alt={responsiveAlt(pageData, "")} /></picture>
      <div className={styles.heroInner}><nav className={styles.breadcrumbs} aria-label="Навігаційний шлях"><a href={links.home}>{cmsString(pageData, "home_label", "Головна")}</a><i /><a href={links.news}>{cmsString(pageData, "news_label", "Новини")}</a><i /><span>{cmsString(pageData, "breadcrumb", "Посібник з цифрової трансформації 2026 року")}</span></nav><h1 id="article-title">{title}</h1></div>
    </section>
    <article className={styles.article}>
      <img className={styles.cover} src={cmsImage(pageData, "cover_image", "cover_image_url", "/assets/article-cover.webp")} alt={cmsString(pageData, "cover_image_alt", "Сучасний офіс GreenCom")} />
      <div className={styles.articleGrid}>
        <div className={styles.content}>
          <AuthorMeta data={pageData} />
          <div className={styles.bodyCopy}>{paragraphs.map((paragraph, index) => <p key={`intro-${index}`}>{paragraph}</p>)}</div>
          <img className={styles.inlineImage} src={cmsImage(pageData, "content_image", "content_image_url", "/developer-tech.jpg")} alt={cmsString(pageData, "content_image_alt", "Фахівець працює з цифровими технологіями")} loading="lazy" />
          <div className={styles.bodyCopy}>{afterImage.map((paragraph, index) => <p key={`after-image-${index}`}>{paragraph}</p>)}</div>
          <section className={styles.articleSection}><h2>{cmsString(pageData, "section_title", "Cras sapien integer eu pellentesque massa")}</h2><p>{cmsText(pageData, "section_text", "Erat metus aliquam cum sodales. Proin dictumst platea dolor natoque scelerisque nascetur sit. Morbi vel rhoncus cursus dictumst tortor mauris interdum eget at. Quis ac fermentum vulputate sit orci. Aliquam tellus nulla sit quis tellus egestas sed a amet. Eu laoreet pharetra at et. Tempus nascetur sed tellus in pellentesque. Et tristique sed augue et bibendum. Varius dictum interdum sagittis leo orci.")}</p><ul>{bullets.map((bullet, index) => <li key={`bullet-${index}`}>{bullet}</li>)}</ul></section>
          <blockquote>{cmsText(pageData, "quote", "Mauris amet malesuada enim aliquet facilisi diam vitae dis. Et facilisis facilisi nunc orci non. Eget tempor enim a faucibus aenean augue blandit fringilla. Volutpat purus magnis volutpat in nisi vitae ut elementum hendrerit convallis at elementum scelerisque. Ligula elit non velit ut libero. Enim vitae mauris dignissim molestie eu quisque urna enim.")}</blockquote>
          <div className={styles.tags}>{tags.map((tag, index) => <a href="../news/" key={`${tag}-${index}`}>{tag}</a>)}</div>
          <RelatedNavigation data={pageData} />
        </div>
        <aside className={styles.aside}><Categories data={pageData} items={categories} /><PopularArticles data={pageData} items={popular} /></aside>
      </div>
    </article>
    <NewsletterSection className={styles.newsletter} data={newsletterData} />
    <SiteFooter data={footerData} links={links} className={styles.footer} />
    <BackToTop className={styles.backToTop} />
  </main>;
}
