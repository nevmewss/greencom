"use client";

import { useState, type FormEvent } from "react";
import { BackToTop, NewsletterSection, SiteFooter, SiteHeader, type SiteLinks } from "./site";
import {
  type CmsData,
  cmsItems,
  cmsString,
  cmsText,
  responsiveAlt,
  responsiveImage,
  useCmsPage,
} from "./cms";
import styles from "./vacancy-page.module.css";

const links: SiteLinks = {
  home: "../",
  about: "../about/",
  services: "../#services",
  price: "../price/",
  news: "../news/",
  contact: "../contact/",
  partners: "../partners/",
};

const fallbackDuties = [
  "Консультація клієнтів щодо продуктів та послуг компанії",
  "Робота з вхідними заявками та супровід клієнтів",
  "Комунікація з новими та постійними клієнтами",
  "Підбір рішень відповідно до потреб клієнта",
  "Робота з клієнтською базою та звітністю",
];

const fallbackExpectations = [
  "Досвід роботи у сфері продажів буде перевагою",
  "Хороші комунікаційні навички",
  "Вміння працювати з клієнтами та вести переговори",
];

const fallbackBenefits = [
  "Роботу в сучасній технологічній компанії",
  "Конкурентну заробітну плату",
  "Роботу з сучасними технологіями компанії",
  "Комфортну робочу атмосферу",
];

function blockData(blocks: { type: string; data: CmsData }[], types: string[]): CmsData {
  return blocks.find((block) => types.includes(block.type))?.data ?? {};
}

function textList(data: CmsData, key: string, fallback: string[]): string[] {
  if (!Array.isArray(data[key])) return fallback;
  return cmsItems(data, key)
    .map((item) => cmsText(item, "text", cmsString(item, "label")))
    .filter(Boolean);
}

function PinIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-5.35 10.06-7.24 11.72a1.15 1.15 0 0 1-1.52 0C9.35 20.06 4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>;
}

function BriefcaseIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2"/></svg>;
}

function WalletIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6.5h14a2 2 0 0 1 2 2V19H5a2 2 0 0 1-2-2V6.5A2.5 2.5 0 0 1 5.5 4H17"/><path d="M16 11h5v5h-5a2.5 2.5 0 0 1 0-5Z"/><circle cx="16.5" cy="13.5" r=".7"/></svg>;
}

function ClockIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/></svg>;
}

const facts = [
  { key: "location", labelKey: "location_label", label: "Локація", value: "м. Київ", icon: PinIcon },
  { key: "employment", labelKey: "employment_label", label: "Зайнятість", value: "Повна", icon: BriefcaseIcon },
  { key: "salary", labelKey: "salary_label", label: "Заробітна плата", value: "від 25 000 грн", icon: WalletIcon },
  { key: "experience", labelKey: "experience_label", label: "Досвід роботи", value: "від 1 року", icon: ClockIcon },
];

export function VacancyPage() {
  const { blocks, menuData, footerData, locale, locales, setLocale } = useCmsPage(
    "vacancy",
    ["vacancy_page", "vacancy", "newsletter", "site_footer"],
  );
  const pageData = blockData(blocks, ["vacancy_page", "vacancy", "job"]);
  const newsletterData = blockData(blocks, ["newsletter", "newsletter_section"]);
  const duties = textList(pageData, "duties", fallbackDuties);
  const expectations = textList(pageData, "expectations", fallbackExpectations);
  const benefits = textList(pageData, "benefits", fallbackBenefits);
  const [fileName, setFileName] = useState("");
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

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

      <section className={styles.hero} aria-labelledby="vacancy-title">
        <picture className={styles.heroMedia}>
          <source media="(max-width: 600px)" srcSet={responsiveImage(pageData, "mobile", "/assets/news-hero-mobile.webp")} />
          <source media="(max-width: 1000px)" srcSet={responsiveImage(pageData, "tablet", "/assets/news-hero-tablet.webp")} />
          <img src={responsiveImage(pageData, "desktop", "/assets/news-hero-desktop.webp")} alt={responsiveAlt(pageData, "")} />
        </picture>
        <div className={styles.heroInner}>
          <nav className={styles.breadcrumbs} aria-label="Навігаційний шлях">
            <a href={links.home}>{cmsString(pageData, "home_label", "Головна")}</a>
            <i />
            <a href="../vacancies/">{cmsString(pageData, "vacancies_label", "Вакансії")}</a>
            <i />
            <span>{cmsString(pageData, "breadcrumb", "Менеджер з продажу")}</span>
          </nav>
          <div className={styles.heroCopy}>
            <h1 id="vacancy-title">{cmsString(pageData, "title", "Менеджер з продажу")}</h1>
            <p>{cmsText(pageData, "hero_description", "Станьте частиною команди, яка створює технологічні рішення майбутнього та допомагає сучасному бізнесу рости й розвиватися разом з GreenCom.")}</p>
          </div>
        </div>
      </section>

      <section className={styles.content} aria-label={cmsString(pageData, "content_label", "Опис вакансії") }>
        <div className={styles.facts}>
          {facts.map((fact) => {
            const Icon = fact.icon;
            return (
              <div className={styles.fact} key={fact.key}>
                <span className={styles.factIcon}><Icon /></span>
                <span><small>{cmsString(pageData, fact.labelKey, fact.label)}</small><b>{cmsString(pageData, fact.key, fact.value)}</b></span>
              </div>
            );
          })}
        </div>

        <div className={styles.details}>
          <article className={styles.descriptionCard}>
            <h2>{cmsString(pageData, "description_title", "Про вакансію")}</h2>
            <p>{cmsText(pageData, "description", "Ми шукаємо активного та комунікабельного менеджера з продажу для розвитку клієнтської бази та роботи з проєктами автоматизації бізнесу. Ви будете працювати з сучасними технологічними рішеннями, торговим обладнанням та програмним забезпеченням для бізнесу.")}</p>

            <VacancyList title={cmsString(pageData, "duties_title", "Основні обов’язки:")} items={duties} />
            <VacancyList title={cmsString(pageData, "expectations_title", "Наші очікування:")} items={expectations} />
            <VacancyList title={cmsString(pageData, "benefits_title", "Ми пропонуємо:")} items={benefits} />
          </article>

          <aside className={styles.contactCard}>
            <h2>{cmsString(pageData, "form_title", "Відгукнутися на вакансію")}</h2>
            <p>{cmsText(pageData, "form_description", "Заповніть форму нижче та надішліть своє резюме. Ми обов’язково розглянемо вашу кандидатуру.")}</p>
            <form onSubmit={submit}>
              <label><span>{cmsString(pageData, "name_label", "Ім’я")}</span><input type="text" name="name" required placeholder={cmsString(pageData, "name_placeholder", "Ваше ім’я")} /></label>
              <label><span>{cmsString(pageData, "email_label", "Електронна пошта")}</span><input type="email" name="email" required placeholder={cmsString(pageData, "email_placeholder", "example@email.com")} /></label>
              <label><span>{cmsString(pageData, "phone_label", "Номер телефону")}</span><input type="tel" name="phone" required placeholder={cmsString(pageData, "phone_placeholder", "+38 (___) ___-__-__")} /></label>
              <label className={styles.fileField}>
                <span>{cmsString(pageData, "resume_label", "Резюме")}</span>
                <span className={styles.fileControl}>{fileName || cmsString(pageData, "resume_placeholder", "Прикріпити файл")}<b>+</b></span>
                <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={(event) => setFileName(event.currentTarget.files?.[0]?.name ?? "")} />
              </label>
              <label className={styles.consent}><input type="checkbox" defaultChecked required /><i>✓</i><span>{cmsString(pageData, "consent", "Відправляючи форму, ви погоджуєтесь з політикою конфіденційності")}</span></label>
              <button type="submit">{sent ? cmsString(pageData, "success_label", "Надіслано ✓") : cmsString(pageData, "submit_label", "Відправити")}</button>
            </form>
          </aside>
        </div>
      </section>

      <NewsletterSection className={styles.newsletter} data={newsletterData} />
      <SiteFooter data={footerData} links={links} className={styles.footer} />
      <BackToTop className={styles.backToTop} />
    </main>
  );
}

function VacancyList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className={styles.textSection}>
      <h3>{title}</h3>
      <ul>{items.map((item, index) => <li key={`${item}-${index}`}><i>✓</i><span>{item}</span></li>)}</ul>
    </section>
  );
}
