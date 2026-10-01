/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef } from "react";
import { BackToTop, NewsletterSection, SiteFooter, SiteHeader, type SiteLinks } from "./site";
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
import styles from "./case-page.module.css";

const links: SiteLinks = {
  home: "../",
  about: "../about/",
  services: "../#services",
  price: "../price/",
  news: "../news/",
  contact: "../contact/",
  partners: "../partners/",
};

const fallbackFacts: CmsData[] = [
  { label: "Клієнт", value: "FRESH MARKET" },
  { label: "Сфера Діяльності", value: "РОЗДРІБНА ТОРГІВЛЯ" },
  { label: "Регіон", value: "КИЇВ" },
  { label: "Термін Реалізації", value: "14 днів" },
];

const fallbackSoftware: CmsData[] = [
  { title: "BAS Роздрібна Торгівля", description: "Система для автоматизації продажів, управління товарними залишками та контролю роботи кас." },
  { title: "BAS Бухгалтерія", description: "Рішення для ведення бухгалтерського та податкового обліку підприємства." },
  { title: "BAS Роздрібна Торгівля", description: "Система для автоматизації продажів, управління товарними залишками та контролю роботи кас." },
];

const fallbackEquipment: CmsData[] = Array.from({ length: 3 }, (_, index) => ({
  _sync_id: `equipment-${index + 1}`,
  image_url: "/assets/case-equipment.webp",
  image_alt: "Комплект торгового обладнання GreenCom",
  category: "BAS Корпоративний ринок",
  title: "BAS ERP",
}));

const fallbackGallery: CmsData[] = Array.from({ length: 12 }, (_, index) => ({
  _sync_id: `gallery-${index + 1}`,
  image_url: "/retail-tech.jpg",
  image_alt: `Автоматизація магазину Fresh Market — фото ${index + 1}`,
}));

function blockData(blocks: { type: string; data: CmsData }[], types: string[]): CmsData {
  return blocks.find((block) => types.includes(block.type))?.data ?? {};
}

function itemsOr(data: CmsData, key: string, fallback: CmsData[]): CmsData[] {
  return Array.isArray(data[key]) ? cmsItems(data, key) : fallback;
}

function itemKey(item: CmsData, index: number, prefix: string): string {
  return cmsString(item, "_sync_id", cmsString(item, "slug", `${prefix}-${index}`));
}

function SectionIcon({ variant }: { variant: "problem" | "solution" | "result" | "software" | "equipment" }) {
  const paths = {
    problem: <><path d="M12 3 3.8 6.5v5.2c0 4.7 3.5 8.1 8.2 9.3 4.7-1.2 8.2-4.6 8.2-9.3V6.5L12 3Z"/><path d="M9 12h6M12 9v6"/></>,
    solution: <><path d="M9 18h6M10 22h4"/><path d="M8.2 14.7C6.8 13.6 6 12 6 10a6 6 0 1 1 12 0c0 2-.8 3.6-2.2 4.7-.8.7-.8 1.3-.8 2.3H9c0-1-.1-1.6-.8-2.3Z"/></>,
    result: <><path d="M4 19V9m5 10V5m5 14v-7m5 7V3"/><path d="m3 7 5-3 5 4 7-6"/></>,
    software: <><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 9h18M8 14h8M8 17h5"/></>,
    equipment: <><path d="M8 3h8v6H8zM5 12h14v8H5z"/><path d="M9 15h6M12 9v3"/></>,
  };
  return <span className={styles.icon} aria-hidden="true"><svg viewBox="0 0 24 24">{paths[variant]}</svg></span>;
}

export function CasePage() {
  const equipmentRef = useRef<HTMLDivElement>(null);
  const { blocks, menuData, footerData, locale, locales, setLocale } = useCmsPage(
    "case",
    ["case_page", "case", "newsletter", "site_footer"],
  );
  const pageData = blockData(blocks, ["case_page", "case", "case_detail"]);
  const newsletterData = blockData(blocks, ["newsletter", "newsletter_section"]);
  const facts = itemsOr(pageData, "facts", fallbackFacts);
  const software = itemsOr(pageData, "software", fallbackSoftware);
  const equipment = itemsOr(pageData, "equipment", fallbackEquipment);
  const gallery = itemsOr(pageData, "gallery", fallbackGallery);
  const problemItems = itemsOr(pageData, "problem_items", Array.from({ length: 4 }, () => ({ text: "Відсутність єдиної системи обліку товарів та продажів" })));
  const solutionItems = itemsOr(pageData, "solution_items", [
    { text: "Автоматизацію обліку товарів, продажів та клієнтів" },
    { text: "Інтеграцію касового обладнання та програмного забезпечення" },
    { text: "Оптимізацію складських процесів і постачання" },
    { text: "Налаштування аналітики та звітності в режимі реального часу" },
  ]);
  const results = itemsOr(pageData, "results", [
    { value: "+35%", text: "Збільшення швидкості обслуговування клієнтів" },
    { value: "-20%", text: "Скорочення витрат на операційні процеси" },
    { value: ">99%", text: "Точність обліку товарів та залишків" },
    { value: "Онлайн-Доступ", text: "Аналітика та контроль показників у режимі реального часу" },
    { value: "Повний Контроль", text: "Над бізнес-процесами та роботою персоналу" },
  ]);

  const moveEquipment = (direction: number) => {
    equipmentRef.current?.scrollBy({ left: direction * 230, behavior: "smooth" });
  };

  return (
    <main className={styles.page}>
      <SiteHeader data={menuData} links={links} locale={locale} locales={locales} onLocaleChange={setLocale} variant="inner" />

      <section className={styles.hero} aria-labelledby="case-title">
        <picture className={styles.heroMedia}>
          <source media="(max-width: 600px)" srcSet={responsiveImage(pageData, "mobile", "/assets/news-hero-mobile.webp")} />
          <source media="(max-width: 1000px)" srcSet={responsiveImage(pageData, "tablet", "/assets/news-hero-tablet.webp")} />
          <img src={responsiveImage(pageData, "desktop", cmsImage(pageData, "hero_image", "hero_image_url", "/assets/news-hero-desktop.webp"))} alt={responsiveAlt(pageData, "")} />
        </picture>
        <div className={styles.heroInner}>
          <nav className={styles.breadcrumbs} aria-label="Навігаційний шлях">
            <a href={links.home}>{cmsString(pageData, "home_label", "Головна")}</a><i />
            <a href="../cases/">{cmsString(pageData, "cases_label", "Кейси")}</a><i />
            <span>{cmsString(pageData, "breadcrumb", "Автоматизація магазину «Fresh Market»")}</span>
          </nav>
          <div className={styles.heroCopy}>
            <h1 id="case-title">{cmsString(pageData, "title", "Автоматизація Магазину «Fresh Market»")}</h1>
            <p>{cmsText(pageData, "description", "Комплексне рішення для автоматизації роздрібної торгівлі, що дозволило оптимізувати процеси, підвищити контроль та збільшити прибутковість.")}</p>
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <section className={styles.facts} aria-label="Інформація про проєкт">
          {facts.map((fact, index) => <div key={itemKey(fact, index, "fact")}><span>{cmsString(fact, "label")}</span><strong>{cmsString(fact, "value")}</strong></div>)}
        </section>

        <section className={styles.story} aria-label="Опис реалізації проєкту">
          <article className={styles.storyCard}>
            <SectionIcon variant="problem" />
            <h2>{cmsString(pageData, "problem_title", "ПРОБЛЕМА / ЗАВДАННЯ")}</h2>
            <p>{cmsText(pageData, "problem_description", "Клієнт звернувся із запитом на комплексну автоматизацію магазину та модернізацію торгових процесів. Основною задачею було покращення швидкості обслуговування клієнтів, контролю залишків товарів та оптимізацію роботи персоналу.")}</p>
            <ul>{problemItems.map((item, index) => <li key={itemKey(item, index, "problem")}>{cmsText(item, "text")}</li>)}</ul>
          </article>
          <article className={styles.storyCard}>
            <SectionIcon variant="solution" />
            <h2>{cmsString(pageData, "solution_title", "РІШЕННЯ")}</h2>
            <p>{cmsText(pageData, "solution_description", "Було впроваджено сучасну систему автоматизації, що об'єднала ключові бізнес-процеси магазину в єдину цифрову екосистему.")}</p>
            <b>{cmsString(pageData, "implemented_label", "Реалізовано:")}</b>
            <ul>{solutionItems.map((item, index) => <li key={itemKey(item, index, "solution")}>{cmsText(item, "text")}</li>)}</ul>
          </article>
          <article className={`${styles.storyCard} ${styles.resultCard}`}>
            <SectionIcon variant="result" />
            <h2>{cmsString(pageData, "result_title", "РЕЗУЛЬТАТ")}</h2>
            <p>{cmsText(pageData, "result_description", "Після впровадження системи автоматизації клієнт отримав:")}</p>
            <div className={styles.results}>{results.map((item, index) => <div key={itemKey(item, index, "result")}><strong>{cmsString(item, "value")}</strong><span>{cmsText(item, "text")}</span></div>)}</div>
          </article>
        </section>

        <section className={styles.automation} aria-labelledby="automation-title">
          <h2 id="automation-title">{cmsString(pageData, "automation_title", "Автоматизація Магазину")}</h2>
          <div className={styles.automationGrid}>
            <article className={styles.featurePanel}>
              <header><SectionIcon variant="software" /><div><h3>{cmsString(pageData, "software_title", "ВИКОРИСТАНЕ ПЗ")}</h3><p>{cmsText(pageData, "software_description", "Для автоматизації бізнес-процесів було впроваджено:")}</p></div></header>
              <div className={styles.softwareList}>{software.map((item, index) => <div className={styles.softwareItem} key={itemKey(item, index, "software")}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{cmsString(item, "title")}</strong><p>{cmsText(item, "description")}</p></div><i>↗</i></div>)}</div>
            </article>
            <article className={styles.featurePanel}>
              <header><SectionIcon variant="equipment" /><div><h3>{cmsString(pageData, "equipment_title", "ВСТАНОВЛЕНЕ ОБЛАДНАННЯ")}</h3><p>{cmsText(pageData, "equipment_description", "Для стабільної та ефективної роботи магазину використано.")}</p></div></header>
              <div className={styles.equipmentViewport} ref={equipmentRef}>{equipment.map((item, index) => <article className={styles.equipmentCard} key={itemKey(item, index, "equipment")}><img src={cmsImage(item, "image", "image_url", "/assets/case-equipment.webp")} alt={cmsString(item, "image_alt", "Торгове обладнання GreenCom")} /><span>{cmsString(item, "category", "BAS Корпоративний ринок")}</span><strong>{cmsString(item, "title", "BAS ERP")}</strong></article>)}</div>
              <div className={styles.sliderControls}><button type="button" onClick={() => moveEquipment(-1)} aria-label="Попереднє обладнання">←</button><button type="button" onClick={() => moveEquipment(1)} aria-label="Наступне обладнання">→</button></div>
            </article>
          </div>
        </section>

        <section className={styles.gallery} aria-labelledby="gallery-title">
          <p><span />{cmsString(pageData, "gallery_eyebrow", "Галерея")}<span /></p>
          <h2 id="gallery-title">{cmsString(pageData, "gallery_title", "Фотогалерея Проекту")}</h2>
          <div>{gallery.map((item, index) => <img key={itemKey(item, index, "gallery")} src={cmsImage(item, "image", "image_url", "/retail-tech.jpg")} alt={cmsString(item, "image_alt", "Проєкт автоматизації Fresh Market")} loading="lazy" />)}</div>
        </section>
      </div>

      <NewsletterSection className={styles.newsletter} data={newsletterData} />
      <SiteFooter data={footerData} links={links} className={styles.footer} />
      <BackToTop className={styles.backToTop} />
    </main>
  );
}
