"use client";

import { useRef, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Autoplay, Grid } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import {
  BackToTop,
  Button,
  ContactFormPanel,
  Eyebrow,
  NewsletterSection,
  PageHero,
  SiteFooter,
  SiteHeader,
  type SiteLinks,
} from "./site";
import {
  CmsBlock,
  CmsData,
  cmsImage,
  cmsItems,
  cmsString,
  cmsText,
  responsiveAlt,
  responsiveImage,
  useCmsPage,
} from "./cms";

const fallbackTypes: Record<string, string[]> = {
  home: ["home_header", "home_hero", "benefits", "services", "about_teaser", "partners", "news", "contact_section", "newsletter", "site_footer"],
  about: ["inner_header", "about_hero", "about_overview", "achievements", "team", "history", "partners", "contact_section", "newsletter", "site_footer"],
  contact: ["inner_header", "contact_hero", "office", "map", "faq", "contact_form", "newsletter", "site_footer"],
  price: ["inner_header", "price_hero", "price_list", "newsletter", "site_footer"],
  "404": ["inner_header", "not_found", "site_footer"],
};

const linksByPage: Record<string, SiteLinks> = {
  home: { home: "#top", about: "./about/", services: "#services", price: "./price/", news: "#news", contact: "#contact", partners: "#partners" },
  about: { home: "../", about: "#top", services: "../#services", price: "../price/", news: "../#news", contact: "#contact", partners: "#partners" },
  contact: { home: "../", about: "../about/", services: "../#services", price: "../price/", news: "../#news", contact: "#top", partners: "../#partners" },
  price: { home: "../", about: "../about/", services: "../#services", price: "#top", news: "../#news", contact: "../contact/", partners: "../#partners" },
  "404": { home: "../", about: "../about/", services: "../#services", price: "../price/", news: "../#news", contact: "../contact/", partners: "../#partners" },
};

const defaults = {
  benefits: Array.from({ length: 5 }, () => ({ title: "Досвідчені фахівці", text: "Lorem ipsum dolor sit amet consectetur. Nulla aliquam ultricies facilisi habitasse cursus diam aliquam vitae. Sed aliquet nisi morbi nisi." })),
  services: [
    ["Послуги", "Програмне забезпечення"], ["Послуги", "Системна інтеграція"], ["Обладнання", "Торгове обладнання"], ["Обладнання", "Касові рішення"],
    ["Послуги", "Послуги ІТС"], ["Обладнання", "Витратні матеріали"], ["Послуги", "ІТ-інфраструктура"], ["Послуги", "Автоматизація бізнесу"],
  ].map(([tag, title]) => ({ tag, title, text: "Коротенький опис послуги для каталогу. В два рядки, може в один." })),
  heroSlides: [
    "Налаштовуємо сучасні системи для ефективної роботи підприємств.",
    "Поєднуємо обладнання, дані та процеси в єдину систему.",
    "Допомагаємо бізнесу зростати завдяки технологіям.",
  ].map((text) => ({ title: "Автоматизація", accent: "бізнес-процесів", text, button_label: "Детальніше", url: "#services" })),
  achievements: [
    ["24/7", "успішно реалізованих проєктів для бізнесу різних масштабів"], ["100+", "клієнтів, які довіряють нашим технологічним рішенням"],
    ["5+", "років досвіду у сфері автоматизації та IT-рішень"], ["99%", "клієнтів залишаються задоволені співпрацею з нами"],
    ["24/7", "клієнтів залишаються задоволені співпрацею з нами"], ["20+", "технічна підтримка та консультації для наших клієнтів"],
  ].map(([value, text]) => ({ value, text })),
};

function dataItems(data: CmsData, key: string, fallback: CmsData[]): CmsData[] {
  const items = cmsItems(data, key);
  return items.length ? items : fallback;
}

function SectionTitle({ data, eyebrow, title }: { data: CmsData; eyebrow: string; title: string }) {
  return <><Eyebrow>{cmsString(data, "eyebrow", eyebrow)}</Eyebrow><h2>{cmsString(data, "title", title)}</h2></>;
}

function HomeHero({ data }: { data: CmsData }) {
  const [active, setActive] = useState(0);
  const swiperRef = useRef<SwiperInstance | null>(null);
  const slides = dataItems(data, "slides", defaults.heroSlides);
  const stats = dataItems(data, "stats", [
    { value: "50+", text: "Рішень для автоматизації та розвитку бізнесу", url: "" },
    { value: "1000+", text: "Задоволених клієнтів", url: "#partners" },
  ]);

  return <PageHero variant="slider" className="hero" id="top">
    <picture className="hero__media">
      <source media="(min-width: 1295px)" srcSet={responsiveImage(data, "desktop", "/assets/home-hero-desktop.png")} />
      <source media="(min-width: 480px)" srcSet={responsiveImage(data, "tablet", "/assets/home-hero-tablet.png")} />
      <img src={responsiveImage(data, "mobile", "/assets/home-hero-mobile.png")} alt={responsiveAlt(data, "Цифровий лист над мікросхемою")} />
    </picture>
    <div className="hero__copy">
      <span className="hero__pill">{cmsString(data, "pill", "Технологічні рішення для розвитку бізнесу")}</span>
      <h1><span className="hero__line-one"><span>{cmsString(data, "title_prefix", "Індивідуальні")}</span> <strong>{cmsString(data, "title_highlight", "РІШЕННЯ")}</strong></span><strong className="hero__automation">{cmsString(data, "title_main", "АВТОМАТИЗАЦІЇ")}</strong><span className="hero__business">{cmsString(data, "title_suffix", "бізнесу")}</span></h1>
      <div className="hero__buttons"><Button href={cmsString(data, "primary_button_url", "#services")}>{cmsString(data, "primary_button_label", "Дізнатися більше")}</Button><Button outline href={cmsString(data, "secondary_button_url", "#contact")}>{cmsString(data, "secondary_button_label", "Консультація")}</Button></div>
    </div>
    <div className="hero__stats">{stats.map((item, index) => index === 1 ? <a className="stat-card stat-card--clients" href={cmsString(item, "url", "#partners")} key={index}><span className="avatar-stack"><img src="/assets/client-avatar-1.png" alt="" /><img src="/assets/client-avatar-2.png" alt="" /><img src="/assets/client-avatar-3.png" alt="" /></span><b>{cmsString(item, "value")}</b><p>{cmsString(item, "text")}</p><i aria-hidden="true">→</i></a> : <article className="stat-card stat-card--solutions" key={index}><b>{cmsString(item, "value")}</b><p>{cmsString(item, "text")}</p></article>)}</div>
    <article className="hero-feature" aria-label="Рішення автоматизації"><Swiper className="hero-feature__swiper" modules={[A11y, Autoplay]} loop speed={650} autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }} onSwiper={(swiper) => { swiperRef.current = swiper; setActive(swiper.realIndex); }} onSlideChange={(swiper) => setActive(swiper.realIndex)}>{slides.map((slide, index) => <SwiperSlide key={index}><h2>{cmsString(slide, "title")} <span>{cmsString(slide, "accent")}</span></h2><p>{cmsString(slide, "text")}</p><a href={cmsString(slide, "url", "#services")}>{cmsString(slide, "button_label", "Детальніше")}</a></SwiperSlide>)}</Swiper></article>
    <div className="hero__dots">{slides.map((_, index) => <button key={index} className={active === index ? "is-active" : ""} onClick={() => swiperRef.current?.slideToLoop(index)} aria-label={`Слайд ${index + 1}`} />)}</div>
  </PageHero>;
}

function Benefits({ data }: { data: CmsData }) {
  const items = dataItems(data, "items", defaults.benefits);
  return <section className="benefits section-bg section-bg--waves" id="benefits"><div className="benefits__layout"><div className="benefits__intro"><SectionTitle data={data} eyebrow="Переваги" title="Чому обирають нас — Якість, якій Довіряють" /><Button outline href={cmsString(data, "button_url", "#about-detail")}>{cmsString(data, "button_label", "Дізнатися більше")}</Button></div>{items.map((item, index) => <article className={`benefit-card benefit-card--${index + 1}`} key={index}><span className="benefit-card__icon"><img className="benefit-card__effect" src="/assets/benefit-effect-exact.svg" alt="" /><img className="benefit-card__glyph" src={cmsImage(item, "icon", "icon_url", "/assets/benefit-icon-exact.svg")} alt="" /></span><h3>{cmsString(item, "title")}</h3><p>{cmsString(item, "text")}</p></article>)}</div></section>;
}

function Services({ data }: { data: CmsData }) {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [navigation, setNavigation] = useState({ isBeginning: true, isEnd: false });
  const items = dataItems(data, "items", defaults.services);
  const sync = (swiper: SwiperInstance) => setNavigation({ isBeginning: swiper.isBeginning, isEnd: swiper.isEnd });
  return <section className="services section-bg section-bg--circuits" id="services"><div className="services__head"><div><SectionTitle data={data} eyebrow="Наші пропозиції" title="Пропонуємо найкращі Рішення Автоматизації Бізнесу" /></div><span className="services__badge"><img src={cmsImage(data, "sticker", "sticker_url", "/assets/service-sticker-4x.png")} alt="" /></span></div><Swiper className="services__grid" modules={[A11y, Grid]} grid={{ rows: 2, fill: "row" }} slidesPerView={3} slidesPerGroup={1} spaceBetween={24} speed={500} watchOverflow breakpoints={{ 0: { slidesPerView: 1, spaceBetween: 12, grid: { rows: 2, fill: "row" } }, 601: { slidesPerView: 2, spaceBetween: 16, grid: { rows: 2, fill: "row" } }, 1180: { slidesPerView: 3, spaceBetween: 24, grid: { rows: 2, fill: "row" } } }} onSwiper={(swiper) => { swiperRef.current = swiper; sync(swiper); }} onSlideChange={sync} onBreakpoint={sync} onResize={sync}>{items.map((item, index) => <SwiperSlide key={index}><article className="service-card"><div className="service-card__body"><span>{cmsString(item, "tag")}</span><h3>{cmsString(item, "title")}</h3><p>{cmsString(item, "text")}</p><Button outline className="button--small" href={cmsString(item, "url", "#contact")}>{cmsString(item, "button_label", "Дізнатися більше")}</Button></div></article></SwiperSlide>)}</Swiper><div className="services__arrows"><button className="services__arrow services__arrow--prev" type="button" disabled={navigation.isBeginning} onClick={() => swiperRef.current?.slidePrev()}>←</button><button className="services__arrow services__arrow--next" type="button" disabled={navigation.isEnd} onClick={() => swiperRef.current?.slideNext()}>→</button></div></section>;
}

function AboutTeaser({ data }: { data: CmsData }) {
  const advantages = dataItems(data, "advantages", ["Індивідуальні рішення для кожного бізнесу", "Покращена безпека та захист даних", "Індивідуальні рішення для кожного бізнесу", "Покращена безпека та захист даних"].map((text) => ({ text })));
  return <section className="about section-bg section-bg--circuits" id="about-detail"><div className="about__visual"><div className="about__border" /><div className="about__photo"><img src={cmsImage(data, "image", "image_url", "/developer-tech.jpg")} alt="Фахівець працює з цифровими системами" /></div><div className="about__clients"><span className="avatar-stack"><img src="/assets/client-avatar-1.png" alt="" /><img src="/assets/client-avatar-2.png" alt="" /><img src="/assets/client-avatar-3.png" alt="" /></span><b>{cmsString(data, "clients_value", "120k+")}</b><span>{cmsString(data, "clients_text", "Задоволених клієнтів")}</span></div></div><div className="about__content"><SectionTitle data={data} eyebrow="Про нас" title="Розкрийте Потенціал Бізнесу з Інноваційними Рішеннями Автоматизації" /><p>{cmsText(data, "text", "Трансформуйте свій бізнес за допомогою наших інноваційних ІТ-рішень, створених для вирішення ваших унікальних викликів і стимулювання зростання в сучасному цифровому середовищі.")}</p><ul>{advantages.map((item, index) => <li key={index}>{cmsString(item, "text")}</li>)}</ul><div className="about__bottom"><div className="about__experience"><b>{cmsString(data, "experience_value", "25")}</b><span>{cmsString(data, "experience_text", "Роки досвіду")}</span></div><i /><a className="about__phone" href={`tel:${cmsString(data, "phone", "+1212345678900").replace(/[^+\d]/g, "")}`}><span><img src="/icons/phone.svg" alt="" /></span><small>{cmsString(data, "phone_label", "Зателефонуйте нам")}</small><b>{cmsString(data, "phone", "+12 (123) 456 78900")}</b></a><i /><Button href={cmsString(data, "button_url", "./about/")}>{cmsString(data, "button_label", "Дізнатися більше")}</Button></div></div></section>;
}

function Partners({ data }: { data: CmsData }) {
  const fallback = ["natgeo", "walmart", "slack", "natgeo", "natgeo", "linkedin", "natgeo"].map((logo) => ({ image_url: `/assets/partner-${logo}.svg`, alt: logo, url: "" }));
  const logos = dataItems(data, "logos", fallback);
  return <section className="partners section-bg section-bg--waves" id="partners"><div className="partners__intro"><SectionTitle data={data} eyebrow="Наші партнери" title="Компанії які Довіряють нам" /><Button href={cmsString(data, "button_url", "#contact")}>{cmsString(data, "button_label", "Дізнатися більше")}</Button></div><div className="partners__cloud">{logos.map((logo, index) => <div className={`partner partner--${index + 1}`} key={index}><span><a href={cmsString(logo, "url", "#")}><img src={cmsImage(logo, "image", "image_url")} alt={cmsString(logo, "alt")} /></a></span></div>)}</div></section>;
}

function News({ data }: { data: CmsData }) {
  const fallback = ["/retail-tech.jpg", "/assets/news-leaf.png", "/developer-tech.jpg", "/assets/news-leaf.png"].map((image, index) => ({ image_url: image, author: "Jane Cooper", date: "26.04.2026", category: "Категорія", title: "Посібник з цифрової трансформації 2026 року", text: "Перемога в цифровій гонці: Дорожня карта трансформації 2025 року.", button_label: "Дізнатися більше", url: "#news", featured: index === 0 }));
  const items = dataItems(data, "items", fallback);
  const card = (item: CmsData, index: number) => <article className={`news-card ${item.featured === true ? "news-card--featured" : ""}`} key={index}><img className="news-card__image" src={cmsImage(item, "image", "image_url")} alt="" /><div className="news-card__body"><div className="article-meta"><span className="article-meta__avatar"><img src="/assets/news-avatar-exact.png" alt="" /></span><span>{cmsString(item, "author")}<small>{cmsString(item, "date")}</small></span><em>{cmsString(item, "category")}</em><b><img src="/assets/menu-dots-exact.svg" alt="" /></b></div><h3>{cmsString(item, "title")}</h3><p>{cmsString(item, "text")}</p><Button outline className="button--small" href={cmsString(item, "url", "#news")}>{cmsString(item, "button_label", "Дізнатися більше")}</Button></div></article>;
  const featuredIndex = Math.max(0, items.findIndex((item) => item.featured === true));
  return <section className="news section-bg section-bg--waves" id="news"><div className="news__head"><SectionTitle data={data} eyebrow="Новини" title="Ділимося Останніми Новинами у Сфері Автоматизації" /><Button href={cmsString(data, "all_news_button_url", "#news-list")}>{cmsString(data, "all_news_button_label", "Всі новини")}</Button></div><div className="news__cards" id="news-list">{card(items[featuredIndex], featuredIndex)}<div className="news__stack">{items.filter((_, index) => index !== featuredIndex).map(card)}</div></div></section>;
}

function ContactMethods({ data, className = "contact__methods" }: { data: CmsData; className?: string }) {
  const methods = dataItems(data, "methods", [
    { type: "email", title: "Електронна пошта", value: "office@greencom.od.ua", url: "mailto:office@greencom.od.ua" },
    { type: "phone", title: "Телефон", value: "+12 (123) 456 78900", url: "tel:+1212345678900" },
    { type: "address", title: "Адреса", value: "Одеська обл., м. Біляївка, вул. Тіниста, 42а", url: "#map" },
  ]);
  const icon = (type: string) => type === "email" ? "/assets/contact-email.svg" : type === "phone" ? "/assets/contact-phone.svg" : "/assets/contact-location-outer.svg";
  return <div className={className}>{methods.map((item, index) => <a href={cmsString(item, "url", "#")} key={index}><span><img src={icon(cmsString(item, "type"))} alt="" /></span><b>{cmsString(item, "title")}</b><em>{cmsString(item, "value")}</em></a>)}</div>;
}

function ContactSection({ data }: { data: CmsData }) {
  return <section className="contact section-bg section-bg--waves" id="contact"><div className="contact__info"><SectionTitle data={data} eyebrow="Контакти" title="Зв’яжіться з Нами — Ми Завжди на Зв’язку" /><p>{cmsText(data, "text", "Ми завжди готові допомогти. Якщо у вас є запитання, потрібна консультація або ви хочете підібрати рішення для бізнесу — зв’яжіться з нами у зручний для вас спосіб.")}</p><ContactMethods data={data} /></div><ContactFormPanel data={data} /></section>;
}

function AboutHero({ data, links }: { data: CmsData; links: SiteLinks }) {
  return <PageHero variant="image" className="about-hero" id="top"><picture className="about-hero__media"><source media="(min-width: 1295px)" srcSet={responsiveImage(data, "desktop", "/assets/about-hero.png")} /><source media="(min-width: 601px)" srcSet={responsiveImage(data, "tablet", "/assets/about-hero-tablet.png")} /><img src={responsiveImage(data, "mobile", "/assets/about-hero-mobile.png")} alt={responsiveAlt(data, "Сучасний офіс GreenCom із серверним обладнанням")} /></picture><div className="about-hero__shade" /><nav className="about-breadcrumbs"><a href={links.home}>Головна</a><i /><span>{cmsString(data, "breadcrumb", "Про компанію")}</span></nav><div className="about-hero__content"><Eyebrow>{cmsString(data, "eyebrow", "Про компанію")}</Eyebrow><h1>{cmsString(data, "title", "Технології, які створюють ефективний бізнес")}</h1><p>{cmsText(data, "text", "GreenCore — це команда експертів, яка з 2019 року допомагає компаніям оптимізувати процеси, підвищувати ефективність та масштабувати свій бізнес за допомогою сучасних технологічних рішень.")}</p><Button outline href={cmsString(data, "button_url", "#contact")}>{cmsString(data, "button_label", "Зв’язатися з нами")}</Button></div></PageHero>;
}

function TextBlock({ data }: { data: CmsData }) {
  const paragraphs = dataItems(data, "paragraphs", Array.from({ length: 5 }, () => ({ text: "Lorem ipsum dolor sit amet consectetur. Tristique pulvinar feugiat id ipsum sodales nam arcu fringilla in. Ipsum quam id venenatis sem elit faucibus diam eu." })));
  return <section className="about-overview"><div className="about-section-inner"><div className="about-section-title"><SectionTitle data={data} eyebrow="Текст" title="Великий оглядовий текст про компанію" /></div><div className="about-overview__copy">{paragraphs.map((item, index) => <p key={index}>{cmsText(item, "text")}</p>)}</div></div></section>;
}

function Achievements({ data }: { data: CmsData }) {
  const items = dataItems(data, "items", defaults.achievements);
  return <section className="about-results"><div className="about-results__panel"><div className="about-results__intro"><SectionTitle data={data} eyebrow="Наші досягнення" title="Результати, які говорять за нас" /></div><div className="about-results__grid">{items.map((item, index) => <article key={index}><b>{cmsString(item, "value")}</b><p>{cmsString(item, "text")}</p></article>)}</div></div></section>;
}

function Team({ data }: { data: CmsData }) {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [navigation, setNavigation] = useState({ isBeginning: true, isEnd: false });
  const items = dataItems(data, "items", Array.from({ length: 3 }, () => ({ role: "Посада", name: "Ім’я спеціаліста", image_url: "/assets/about-team.png", alt: "Спеціалістка GreenCom" })));
  const sync = (swiper: SwiperInstance) => setNavigation({ isBeginning: swiper.isBeginning, isEnd: swiper.isEnd });
  return <section className="about-team"><div className="about-team__intro"><SectionTitle data={data} eyebrow="Наша команда" title="Експерти, створюють майбутнє разом з вами" /><p>{cmsString(data, "text", "Ми — команда професіоналів із досвідом у IT, автоматизації, інженерії та бізнес-експертизі, об’єднані спільною метою — допомагати бізнесу зростати через технології.")}</p><div className="about-team__arrows"><button type="button" disabled={navigation.isBeginning} onClick={() => swiperRef.current?.slidePrev()}>←</button><button type="button" disabled={navigation.isEnd} onClick={() => swiperRef.current?.slideNext()}>→</button></div></div><Swiper className="about-team__slider" modules={[A11y]} slidesPerView={2} spaceBetween={24} watchOverflow breakpoints={{ 0: { slidesPerView: 1, spaceBetween: 18 }, 1295: { slidesPerView: 2, spaceBetween: 24 } }} onSwiper={(swiper) => { swiperRef.current = swiper; sync(swiper); }} onSlideChange={sync}>{items.map((item, index) => <SwiperSlide key={index}><article className="about-team-card"><div className="about-team-card__image"><img src={cmsImage(item, "image", "image_url", "/assets/about-team.png")} alt={cmsString(item, "alt")} /></div><span>{cmsString(item, "role")}</span><h3>{cmsString(item, "name")}</h3></article></SwiperSlide>)}</Swiper></section>;
}

function History({ data }: { data: CmsData }) {
  const items = dataItems(data, "items", Array.from({ length: 6 }, () => ({ year: "2000", title: "Заснування компанії", text: "Розпочали діяльність у сфері автоматизації та IT-рішень для бізнесу." })));
  return <section className="about-history"><div className="about-history__visual"><div className="about-section-title"><SectionTitle data={data} eyebrow="Історія розвитку" title="Шлях розвитку та технологічних досягнень" /></div><div className="about-history__image"><i /><img src={cmsImage(data, "image", "image_url", "/assets/about-history.png")} alt={cmsString(data, "image_alt", "Графік технологічного розвитку GreenCom")} /></div></div><div className="about-history__timeline">{items.map((item, index) => <article key={index}><time>{cmsString(item, "year")}</time><img src="/assets/about-history-marker.svg" alt="" /><div><h3>{cmsString(item, "title")}</h3><p>{cmsString(item, "text")}</p></div></article>)}</div></section>;
}

function ContactHero({ data, links }: { data: CmsData; links: SiteLinks }) {
  return <PageHero variant="image" className="contact-page-hero" id="top"><picture className="contact-page-hero__media"><source media="(min-width: 1295px)" srcSet={responsiveImage(data, "desktop", "/assets/contact-hero-desktop-exact.png")} /><source media="(min-width: 601px)" srcSet={responsiveImage(data, "tablet", "/assets/contact-hero-tablet-exact.png")} /><img className="contact-page-hero__image" src={responsiveImage(data, "mobile", "/assets/contact-hero-mobile-exact.png")} alt={responsiveAlt(data)} /></picture><nav className="contact-page__breadcrumbs"><a href={links.home}>Головна</a><i /><span>{cmsString(data, "breadcrumb", "Контакти")}</span></nav><div className="contact-page-hero__copy"><h1>{cmsString(data, "title", "Контакти")}</h1><p>{cmsString(data, "text", "Зв’яжіться з нами для консультації, підтримки або обговорення вашого проєкту. Ми завжди готові допомогти з автоматизацією, IT-рішеннями та технологіями для бізнесу.")}</p></div></PageHero>;
}

function PriceHero({ data, links }: { data: CmsData; links: SiteLinks }) {
  return <PageHero variant="image" className="price-hero" id="top"><picture className="price-hero__media"><source media="(min-width: 1295px)" srcSet={responsiveImage(data, "desktop", "/assets/contact-hero-desktop-exact.png")} /><source media="(min-width: 601px)" srcSet={responsiveImage(data, "tablet", "/assets/contact-hero-tablet-exact.png")} /><img src={responsiveImage(data, "mobile", "/assets/contact-hero-mobile-exact.png")} alt={responsiveAlt(data)} /></picture><nav className="price-page__breadcrumbs"><a href={links.home}>Головна</a><i /><span>{cmsString(data, "breadcrumb", "Прайс")}</span></nav><div className="price-hero__copy"><h1>{cmsString(data, "title", "Прайс")}</h1><p>{cmsString(data, "text", "Ознайомтесь із вартістю послуг, обладнання та рішень для автоматизації бізнесу. Оберіть оптимальний варіант для ваших потреб та масштабу компанії.")}</p></div></PageHero>;
}

function PriceList({ data }: { data: CmsData }) {
  const items = dataItems(data, "items", Array.from({ length: 6 }, (_, index) => index % 2 === 0 ? {
    title: "Торгове обладнання",
    text: "Актуальні ціни на POS-системи, сканери, ваги, принтери чеків, фіскальне обладнання та інші рішення для автоматизації торгівлі й обслуговування клієнтів.",
    price: "217 000 ₴",
  } : {
    title: "Програмне забезпечення",
    text: "Прайс-листи на CRM-системи, облікові програми, програмне забезпечення для автоматизації бізнес-процесів та сучасні цифрові рішення для компаній.",
    price: "217 000 ₴",
  }));

  return <section className="price-list" aria-label={cmsString(data, "aria_label", "Прайс-лист GreenCom")}><div className="price-list__inner">{items.map((item, index) => <article className="price-card" key={index}><span className="price-card__icon"><img className="price-card__effect" src={cmsImage(item, "effect", "effect_url", "/assets/benefit-effect-exact.svg")} alt="" /><i /><b /><img className="price-card__glyph" src={cmsImage(item, "icon", "icon_url", "/assets/benefit-icon-exact.svg")} alt="" /></span><div className="price-card__copy"><h2>{cmsString(item, "title")}</h2><p>{cmsString(item, "text")}</p></div><strong>{cmsString(item, "price", "217 000 ₴")}</strong></article>)}</div></section>;
}

function Office({ data }: { data: CmsData }) {
  const methods = dataItems(data, "methods", [
    { type: "address", title: "Адреса", value: "Одеська обл., м. Біляївка, вул. Тіниста, 42а", url: "#map" },
    { type: "email", title: "Електронна пошта", value: "office@greencom.od.ua", url: "mailto:office@greencom.od.ua" },
    { type: "phone", title: "Телефон", value: "+12 (123) 456 78900", url: "tel:+1212345678900" },
  ]);
  const icon = (type: string) => type === "email" ? "/assets/contact-email.svg" : type === "phone" ? "/assets/contact-phone.svg" : "/assets/contact-location-outer.svg";
  return <section className="contact-office"><div className="contact-office__panel"><img className="contact-office__photo" src={cmsImage(data, "image", "image_url", "/assets/contact-office.png")} alt={cmsString(data, "image_alt", "Головний офіс GreenCom")} /><div className="contact-office__details"><SectionTitle data={data} eyebrow="Контакти" title="Головний офіс" /><div className="contact-office__methods">{methods.map((item, index) => <a className="contact-office__method" href={cmsString(item, "url", "#")} key={index}><span><img src={icon(cmsString(item, "type"))} alt="" /></span><p><b>{cmsString(item, "title")}</b><em>{cmsString(item, "value")}</em></p></a>)}</div></div></div></section>;
}

function MapSection({ data }: { data: CmsData }) {
  return <section className="contact-map" id="map"><div className="contact-map__panel"><img src={cmsImage(data, "image", "image_url", "/assets/contact-map.png")} alt={cmsString(data, "image_alt", "Мапа з розташуванням офісу GreenCom")} /><a className="contact-map__marker" href={cmsString(data, "map_url", "#map")}><img src="/icons/location-outer.svg" alt="" /><img src="/icons/location-inner.svg" alt="" /></a><span className="contact-map__address">{cmsString(data, "address", "Одеська обл., м. Біляївка, вул. Тіниста, 42а")}</span></div></section>;
}

function Faq({ data }: { data: CmsData }) {
  const [open, setOpen] = useState(0);
  const items = dataItems(data, "items", Array.from({ length: 6 }, () => ({ title: "Як отримати кредит?", answer: "Ми піклуємося про вашу безпеку: підтвердіть, що банківський рахунок належить вам." })));
  return <section className="contact-faq" id="faq"><div className="contact-faq__intro"><SectionTitle data={data} eyebrow="Часті запитання" title="Відповіді на важливі питання для вашого бізнесу" /><p>{cmsString(data, "text", "Ми зібрали найпоширеніші запитання щодо автоматизації, програмного забезпечення, обладнання та IT-рішень, щоб допомогти вам швидко знайти необхідну інформацію.")}</p><Button outline href={cmsString(data, "button_url", "#contact-form")}>{cmsString(data, "button_label", "Запитати")}</Button></div><div className="contact-faq__list">{items.map((item, index) => <article className={open === index ? "is-open" : ""} key={index}><button type="button" onClick={() => setOpen(open === index ? -1 : index)}><span>{cmsString(item, "title")}</span><i>{open === index ? "−" : "+"}</i></button>{open === index && <p>{cmsText(item, "answer")}</p>}</article>)}</div></section>;
}

function ContactFormSection({ data }: { data: CmsData }) {
  return <section className="contact-page-form" id="contact-form"><div className="contact-page-form__intro"><SectionTitle data={data} eyebrow="Форма захвату" title="Ми завжди на зв’язку" /><p>{cmsString(data, "text", "Ми завжди готові допомогти. Якщо у вас є запитання, потрібна консультація або ви хочете підібрати рішення для бізнесу — зв’яжіться з нами у зручний для вас спосіб.")}</p></div><ContactFormPanel className="contact-page-form__panel" data={data} /></section>;
}

function NotFoundHero({ data, links }: { data: CmsData; links: SiteLinks }) {
  const paragraphs = dataItems(data, "paragraphs", [{ text: "Схоже, ви потрапили на неіснуючу сторінку." }, { text: "Але не хвилюйтеся, навіть найкращі дослідники іноді збиваються з курсу." }]);
  return <><nav className="not-found-page__breadcrumbs"><a href={links.home}>Головна</a><i /><span>{cmsString(data, "breadcrumb", "404")}</span></nav><PageHero variant="standard" className="not-found-page__content"><div className="not-found-page__copy"><strong>{cmsString(data, "code", "404")}</strong><h1>{cmsString(data, "title", "Х’юстон, щось пішло не так...")}</h1>{paragraphs.map((item, index) => <p key={index}>{cmsText(item, "text")}</p>)}<Button href={cmsString(data, "button_url", links.home)}>{cmsString(data, "button_label", "Повернутися на головну")}</Button></div><img src={cmsImage(data, "image", "image_url", "/assets/not-found-art.png")} alt={cmsString(data, "image_alt", "Астронавт і повідомлення про помилку 404")} /></PageHero></>;
}

function renderBlock(block: CmsBlock, index: number, context: { links: SiteLinks; locale?: string; locales: { code: string; name: string }[]; setLocale: (code: string) => void }) {
  const props = { data: block.data };
  switch (block.type) {
    case "home_header": return <SiteHeader {...props} links={context.links} locale={context.locale} locales={context.locales} onLocaleChange={context.setLocale} variant="home" key={index} />;
    case "inner_header": return <SiteHeader {...props} links={context.links} locale={context.locale} locales={context.locales} onLocaleChange={context.setLocale} active={null} variant="inner" key={index} />;
    case "home_hero": return <HomeHero {...props} key={index} />;
    case "about_hero": return <AboutHero {...props} links={context.links} key={index} />;
    case "contact_hero": return <ContactHero {...props} links={context.links} key={index} />;
    case "price_hero": return <PriceHero {...props} links={context.links} key={index} />;
    case "price_list": return <PriceList {...props} key={index} />;
    case "not_found": return <NotFoundHero {...props} links={context.links} key={index} />;
    case "about_overview": return <TextBlock {...props} key={index} />;
    case "benefits": return <Benefits {...props} key={index} />;
    case "services": return <Services {...props} key={index} />;
    case "about_teaser": return <AboutTeaser {...props} key={index} />;
    case "achievements": return <Achievements {...props} key={index} />;
    case "team": return <Team {...props} key={index} />;
    case "history": return <History {...props} key={index} />;
    case "partners": return <Partners {...props} key={index} />;
    case "news": return <News {...props} key={index} />;
    case "office": return <Office {...props} key={index} />;
    case "map": return <MapSection {...props} key={index} />;
    case "faq": return <Faq {...props} key={index} />;
    case "contact_section": return <ContactSection {...props} key={index} />;
    case "contact_form": return <ContactFormSection {...props} key={index} />;
    case "newsletter": return <NewsletterSection {...props} key={index} />;
    case "site_footer": return <SiteFooter {...props} links={context.links} key={index} />;
    default: return null;
  }
}

export function CmsPage({ slug }: { slug: "home" | "about" | "contact" | "price" | "404" }) {
  const { blocks, locale, locales, setLocale } = useCmsPage(slug, fallbackTypes[slug]);
  const links = linksByPage[slug];
  const rootClass = slug === "home" ? "site-shell" : slug === "about" ? "about-page" : slug === "contact" ? "contact-page" : slug === "price" ? "price-page" : "not-found-page";
  return <main className={`cms-page ${rootClass}`}>{blocks.map((block, index) => renderBlock(block, index, { links, locale, locales, setLocale }))}<BackToTop /></main>;
}
