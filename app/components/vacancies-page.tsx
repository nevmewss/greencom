/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { BackToTop, SiteFooter, SiteHeader, type SiteLinks } from "./site";
import {
  type CmsData,
  cmsItems,
  cmsString,
  cmsText,
  responsiveAlt,
  responsiveImage,
  useCmsPage,
} from "./cms";
import styles from "./vacancies-page.module.css";

const links: SiteLinks = {
  home: "../",
  about: "../about/",
  services: "../#services",
  price: "../price/",
  news: "./",
  contact: "../contact/",
  partners: "../partners/",
};

const vacancyTemplates: CmsData[] = [
  {
    department: "Продажі",
    department_value: "sales",
    title: "Менеджер з продажу",
    description: "Робота з клієнтами та розвиток продажів продуктів і рішень для бізнесу.",
  },
  {
    department: "IT та Розробка",
    department_value: "development",
    title: "Інженер-програміст",
    description: "Розробка, підтримка та впровадження програмних рішень для автоматизації бізнес-процесів.",
  },
  {
    department: "Маркетинг",
    department_value: "marketing",
    title: "Маркетолог",
    description: "Просування продуктів компанії, розвиток digital-реклами та комунікацій.",
  },
];

const fallbackVacancies: CmsData[] = Array.from({ length: 9 }, (_, index) => ({
  _sync_id: `vacancy-${index + 1}`,
  ...vacancyTemplates[index % vacancyTemplates.length],
  city: "м. Київ",
  employment: "Повна",
  salary: "від 25000 грн",
  button_label: "Дізнатися більше",
  url: "../vacancy/",
}));

const fallbackCategories: CmsData[] = [
  { _sync_id: "all", label: "Усі відділи", value: "all" },
  { _sync_id: "sales", label: "Продажі", value: "sales" },
  { _sync_id: "development", label: "IT та Розробка", value: "development" },
  { _sync_id: "marketing", label: "Маркетинг", value: "marketing" },
];

function blockData(blocks: { type: string; data: CmsData }[], types: string[]): CmsData {
  return blocks.find((block) => types.includes(block.type))?.data ?? {};
}

function vacancyKey(item: CmsData, index: number): string {
  return cmsString(item, "_sync_id", cmsString(item, "slug", `vacancy-${index}`));
}

function LocationIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 18s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z"/><circle cx="10" cy="7" r="2.2"/></svg>;
}

function BriefcaseIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 6.5h14v10H3zM7 6.5V4h6v2.5M3 10h14M8 10v1.5h4V10"/></svg>;
}

function WalletIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 5.2h11.5A2.5 2.5 0 0 1 17 7.7v7.1H3zM3 5.2V4h11M13 9h4v3.5h-4a1.75 1.75 0 1 1 0-3.5Z"/></svg>;
}

export function VacanciesPage() {
  const { blocks, menuData, footerData, locale, locales, setLocale } = useCmsPage(
    "vacancies",
    ["vacancies_page", "vacancies", "site_footer"],
  );
  const pageData = blockData(blocks, ["vacancies_page", "vacancies", "vacancy_list"]);
  const configuredVacancies = cmsItems(pageData, "items");
  const vacancies = Array.isArray(pageData.items) ? configuredVacancies : fallbackVacancies;
  const configuredCategories = cmsItems(pageData, "categories");
  const categories = Array.isArray(pageData.categories) ? configuredCategories : fallbackCategories;
  const [activeCategory, setActiveCategory] = useState("all");
  const visibleVacancies = activeCategory === "all"
    ? vacancies
    : vacancies.filter((vacancy) => cmsString(vacancy, "department_value", cmsString(vacancy, "department")) === activeCategory);

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

      <section className={styles.hero} aria-labelledby="vacancies-title">
        <picture className={styles.heroMedia}>
          <source media="(max-width: 600px)" srcSet={responsiveImage(pageData, "mobile", "/assets/news-hero-mobile.webp")} />
          <source media="(max-width: 1000px)" srcSet={responsiveImage(pageData, "tablet", "/assets/news-hero-tablet.webp")} />
          <img src={responsiveImage(pageData, "desktop", "/assets/news-hero-desktop.webp")} alt={responsiveAlt(pageData, "")} />
        </picture>
        <div className={styles.heroInner}>
          <nav className={styles.breadcrumbs} aria-label="Навігаційний шлях">
            <a href={links.home}>{cmsString(pageData, "home_label", "Головна")}</a>
            <i />
            <span>{cmsString(pageData, "breadcrumb", "Вакансії")}</span>
          </nav>
          <div className={styles.heroCopy}>
            <h1 id="vacancies-title">{cmsString(pageData, "title", "Кар’єра в GreenCom")}</h1>
            <p>{cmsText(pageData, "description", "Станьте частиною команди, яка створює технологічне майбутнє та розвиває сучасний бізнес разом із компанією GreenCom.")}</p>
          </div>
        </div>
      </section>

      <section className={styles.vacancyList} aria-label={cmsString(pageData, "list_label", "Відкриті вакансії GreenCom")}>
        <div className={styles.filters} role="group" aria-label={cmsString(pageData, "filters_label", "Відділи")}>
          {categories.map((category, index) => {
            const value = index === 0 ? "all" : cmsString(category, "value", cmsString(category, "label"));
            const active = activeCategory === value;
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
          {visibleVacancies.map((vacancy, index) => (
            <article className={styles.card} key={vacancyKey(vacancy, index)}>
              <span className={styles.department}>{cmsString(vacancy, "department", "Категорія")}</span>
              <h2>{cmsString(vacancy, "title", "Відкрита вакансія")}</h2>
              <p>{cmsText(vacancy, "description", cmsText(vacancy, "text", "Приєднуйтесь до команди GreenCom."))}</p>
              <div className={styles.meta}>
                <span><i><LocationIcon /></i><small>Місто</small><b>{cmsString(vacancy, "city", "м. Київ")}</b></span>
                <span><i><BriefcaseIcon /></i><small>Зайнятість</small><b>{cmsString(vacancy, "employment", "Повна")}</b></span>
                <span><i><WalletIcon /></i><small>Зарплата</small><b>{cmsString(vacancy, "salary", "від 25000 грн")}</b></span>
              </div>
              <a className={styles.details} href={cmsString(vacancy, "url", "../vacancy/")}>{cmsString(vacancy, "button_label", "Дізнатися більше")}</a>
            </article>
          ))}
        </div>

        {visibleVacancies.length > 0 && (
          <nav className={styles.pagination} aria-label="Пагінація вакансій">
            <button type="button" aria-label="Попередня сторінка">←</button>
            <button className={styles.currentPage} type="button" aria-current="page">01</button>
            <button type="button">02</button>
            <button type="button">03</button>
            <span>…</span>
            <button type="button">10</button>
            <button type="button" aria-label="Наступна сторінка">→</button>
          </nav>
        )}
      </section>

      <SiteFooter data={footerData} links={links} className={styles.footer} />
      <BackToTop className={styles.backToTop} />
    </main>
  );
}
