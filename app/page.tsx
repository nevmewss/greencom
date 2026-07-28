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
  PartnersSection,
  SiteFooter,
  SiteHeader,
  type SiteLinks,
} from "./components/site";

const benefits = Array.from({ length: 5 }, () => ({
  title: "Досвідчені фахівці",
  text: "Lorem ipsum dolor sit amet consectetur. Nulla aliquam ultricies facilisi habitasse cursus diam aliquam vitae. Sed aliquet nisi morbi nisi.",
}));

const services = [
  { tag: "Послуги", title: "Програмне забезпечення" },
  { tag: "Послуги", title: "Системна інтеграція" },
  { tag: "Обладнання", title: "Торгове обладнання" },
  { tag: "Обладнання", title: "Касові рішення" },
  { tag: "Послуги", title: "Послуги ІТС" },
  { tag: "Обладнання", title: "Витратні матеріали" },
  { tag: "Послуги", title: "ІТ-інфраструктура" },
  { tag: "Послуги", title: "Автоматизація бізнесу" },
].map((item) => ({
  ...item,
  text: "Коротенький опис послуги для каталогу. В два рядки, може в один.",
}));

const news = [
  { image: "/retail-tech.jpg" },
  { image: "/assets/news-leaf.png" },
  { image: "/developer-tech.jpg" },
  { image: "/assets/news-leaf.png" },
].map((item) => ({
  ...item,
  title: "Посібник з цифрової трансформації 2026 року",
  text: "Перемога в цифровій гонці: Дорожня карта трансформації 2025 року. Цифрова трансформація наступного покоління",
}));

const heroSlides = [
  "Налаштовуємо сучасні системи для ефективної роботи підприємств.",
  "Поєднуємо обладнання, дані та процеси в єдину систему.",
  "Допомагаємо бізнесу зростати завдяки технологіям.",
];

function BenefitCard({ index }: { index: number }) {
  const benefit = benefits[index];
  return (
    <article className={`benefit-card benefit-card--${index + 1}`}>
      <span className="benefit-card__icon">
        <img className="benefit-card__effect" src="/assets/benefit-effect-exact.svg" alt="" />
        <img className="benefit-card__glyph" src="/assets/benefit-icon-exact.svg" alt="" />
      </span>
      <h3>{benefit.title}</h3>
      <p>{benefit.text}</p>
    </article>
  );
}

function ArticleMeta() {
  return (
    <div className="article-meta">
      <span className="article-meta__avatar">
        <img src="/assets/news-avatar-exact.png" alt="" />
      </span>
      <span>Jane Cooper<small>26.04.2026</small></span>
      <em>Категорія</em>
      <b aria-hidden="true"><img src="/assets/menu-dots-exact.svg" alt="" /></b>
    </div>
  );
}

function NewsCard({ index, featured = false }: { index: number; featured?: boolean }) {
  const item = news[index];
  return (
    <article className={`news-card ${featured ? "news-card--featured" : ""}`}>
      <img className="news-card__image" src={item.image} alt="" />
      <div className="news-card__body">
        <ArticleMeta />
        <h3>{item.title}</h3>
        <p>{item.text}</p>
        <Button outline className="button--small" href="#news">Дізнатися більше</Button>
      </div>
    </article>
  );
}

const homeLinks: SiteLinks = {
  home: "#top",
  about: "./about/",
  services: "#services",
  news: "#news",
  contact: "#contact",
  partners: "#partners",
};

export default function Home() {
  const [heroSlide, setHeroSlide] = useState(0);
  const heroSwiper = useRef<SwiperInstance | null>(null);
  const serviceSwiper = useRef<SwiperInstance | null>(null);
  const [serviceNavigation, setServiceNavigation] = useState({ isBeginning: true, isEnd: false });

  function syncServiceNavigation(swiper: SwiperInstance) {
    setServiceNavigation({ isBeginning: swiper.isBeginning, isEnd: swiper.isEnd });
  }

  return (
    <main className="site-shell">
      <SiteHeader links={homeLinks} />

      <PageHero variant="slider" className="hero" id="top">
        <picture className="hero__media">
          <source media="(min-width: 1295px)" srcSet="/assets/home-hero-desktop.png" />
          <source media="(min-width: 601px)" srcSet="/assets/home-hero-tablet.png" />
          <img src="/assets/home-hero-mobile.png" alt="Цифровий лист над мікросхемою" />
        </picture>
        <div className="hero__copy">
          <span className="hero__pill">Технологічні рішення для розвитку бізнесу</span>
          <h1>
            <span className="hero__line-one"><span>Індивідуальні</span> <strong>РІШЕННЯ</strong></span>
            <strong className="hero__automation">АВТОМАТИЗАЦІЇ</strong>
            <span className="hero__business">бізнесу</span>
          </h1>
          <div className="hero__buttons"><Button href="#services">Дізнатися більше</Button><Button outline href="#contact">Консультація</Button></div>
        </div>
        <div className="hero__stats">
          <article className="stat-card stat-card--solutions"><b>50+</b><p>Рішень для автоматизації та розвитку бізнесу</p></article>
          <a className="stat-card stat-card--clients" href="#partners" aria-label="1000+ задоволених клієнтів — переглянути партнерів">
            <span className="avatar-stack"><img src="/assets/client-avatar-1.png" alt="" /><img src="/assets/client-avatar-2.png" alt="" /><img src="/assets/client-avatar-3.png" alt="" /></span>
            <b>1000+</b><p>Задоволених клієнтів</p><i aria-hidden="true">→</i>
          </a>
        </div>
        <article className="hero-feature" aria-label="Рішення автоматизації">
          <Swiper
            className="hero-feature__swiper"
            modules={[A11y, Autoplay]}
            loop
            speed={650}
            autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            onSwiper={(swiper) => {
              heroSwiper.current = swiper;
              setHeroSlide(swiper.realIndex);
            }}
            onSlideChange={(swiper) => setHeroSlide(swiper.realIndex)}
          >
            {heroSlides.map((text, index) => (
              <SwiperSlide key={text}>
                <h2>Автоматизація <span>бізнес-процесів</span></h2>
                <p>{text}</p>
                <a href="#services" aria-label={`Детальніше про рішення ${index + 1}`}>Детальніше</a>
              </SwiperSlide>
            ))}
          </Swiper>
        </article>
        <div className="hero__dots">{heroSlides.map((_, item) => <button key={item} className={heroSlide === item ? "is-active" : ""} onClick={() => heroSwiper.current?.slideToLoop(item)} aria-label={`Слайд ${item + 1}`} aria-current={heroSlide === item ? "true" : undefined} />)}</div>
      </PageHero>

      <section className="benefits section-bg section-bg--waves" id="benefits">
        <div className="benefits__layout">
          <div className="benefits__intro">
            <Eyebrow>Переваги</Eyebrow>
            <h2><strong>Чому</strong> обирають нас<br />Якість, якій<br className="benefits__mobile-break" />{" "}Довіряють</h2>
            <Button outline>Дізнатися більше</Button>
          </div>
          {benefits.map((_, index) => <BenefitCard key={index} index={index} />)}
        </div>
      </section>

      <section className="services section-bg section-bg--circuits" id="services">
        <div className="services__head">
          <div><Eyebrow>Наші пропозиції</Eyebrow><h2><strong>Пропонуємо</strong> найкращі<br />Рішення Автоматизації <strong>Бізнесу</strong></h2></div>
          <span className="services__badge" aria-label="Рекомендовані рішення">
            <img src="/assets/service-badge-ring.svg" alt="" />
            <img src="/assets/service-badge-icon.svg" alt="" />
          </span>
        </div>
        <Swiper
          className="services__grid"
          modules={[A11y, Grid]}
          a11y={{ enabled: true }}
          grid={{ rows: 2, fill: "row" }}
          slidesPerView={3}
          slidesPerGroup={1}
          spaceBetween={24}
          speed={500}
          watchOverflow
          breakpoints={{
            0: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 12, grid: { rows: 2, fill: "row" } },
            601: { slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 16, grid: { rows: 2, fill: "row" } },
            1180: { slidesPerView: 3, slidesPerGroup: 1, spaceBetween: 24, grid: { rows: 2, fill: "row" } },
          }}
          onSwiper={(swiper) => {
            serviceSwiper.current = swiper;
            syncServiceNavigation(swiper);
          }}
          onSlideChange={syncServiceNavigation}
          onBreakpoint={syncServiceNavigation}
          onResize={syncServiceNavigation}
          onReachBeginning={syncServiceNavigation}
          onReachEnd={syncServiceNavigation}
        >
          {services.map((service, index) => (
            <SwiperSlide key={`${service.title}-${index}`}>
              <article className="service-card">
                <div className="service-card__body">
                  <span>{service.tag}</span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <Button outline className="button--small">Дізнатися більше</Button>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="services__arrows">
          <button
            className="services__arrow services__arrow--prev"
            type="button"
            disabled={serviceNavigation.isBeginning}
            onClick={() => serviceSwiper.current?.slidePrev()}
            aria-label="Попередні послуги"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            className="services__arrow services__arrow--next"
            type="button"
            disabled={serviceNavigation.isEnd}
            onClick={() => serviceSwiper.current?.slideNext()}
            aria-label="Наступні послуги"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      <section className="about section-bg section-bg--circuits" id="about-detail">
        <div className="about__visual">
          <div className="about__border" />
          <div className="about__photo"><img src="/developer-tech.jpg" alt="Фахівець працює з цифровими системами" /></div>
          <div className="about__clients"><span className="avatar-stack"><img src="/assets/client-avatar-1.png" alt="" /><img src="/assets/client-avatar-2.png" alt="" /><img src="/assets/client-avatar-3.png" alt="" /></span><b>120k+</b><span>Задоволених клієнтів</span></div>
        </div>
        <div className="about__content">
          <Eyebrow>Про нас</Eyebrow>
          <h2><strong>Розкрийте</strong> Потенціал<br />Бізнесуз Інноваційними<br /><strong>Рішеннями Автоматизації</strong></h2>
          <p>Трансформуйте свій бізнес за допомогою наших інноваційних ІТ-рішень, створених для вирішення ваших унікальних викликів і стимулювання зростання в сучасному цифровому середовищі.</p>
          <ul>{["Індивідуальні рішення для кожного бізнесу", "Покращена безпека та захист даних", "Індивідуальні рішення для кожного бізнесу", "Покращена безпека та захист даних"].map((item, index) => <li key={index}>{item}</li>)}</ul>
          <div className="about__bottom">
            <div className="about__experience"><b>25</b><span>Роки<br />Досвіду</span></div>
            <i />
            <a className="about__phone" href="tel:+1212345678900"><span><img src="/icons/phone.svg" alt="" /></span><small>Зателефонуйте нам</small><b>+12 (123) 456 78900</b></a>
            <i />
            <Button>Дізнатися більше</Button>
          </div>
        </div>
      </section>

      <PartnersSection />

      <section className="news section-bg section-bg--waves" id="news">
        <div className="news__head"><Eyebrow>Новини</Eyebrow><h2><strong>Ділимося</strong> Останніми<br />Новинами у Сфері<br /><strong>Автоматизації</strong></h2><Button href="#news-list">Всі новини</Button></div>
        <div className="news__cards" id="news-list"><NewsCard index={0} featured /><div className="news__stack"><NewsCard index={1} /><NewsCard index={2} /><NewsCard index={3} /></div></div>
      </section>

      <section className="contact section-bg section-bg--waves" id="contact">
        <div className="contact__info">
          <Eyebrow>Контакти</Eyebrow><h2><strong>Зв’яжіться</strong> з Нами<br />Ми Завжди на Зв’язку</h2>
          <p>Ми завжди готові допомогти. Якщо у вас є запитання, потрібна консультація або ви хочете підібрати рішення для бізнесу — зв’яжіться з нами у зручний для вас спосіб.</p>
          <div className="contact__methods">
            <a href="mailto:office@greencom.od.ua"><span><img src="/assets/contact-email.svg" alt="" /></span><b>Електронна пошта</b><em>office@greencom.od.ua</em></a>
            <a href="tel:+1212345678900"><span><img src="/assets/contact-phone.svg" alt="" /></span><b>Телефон</b><em>office@greencom.od.ua</em></a>
            <a href="#contact"><span><span className="location-icon"><img src="/assets/contact-location-outer.svg" alt="" /><img src="/assets/contact-location-inner.svg" alt="" /></span></span><b>Адреса</b><em>office@greencom.od.ua</em></a>
          </div>
        </div>
        <ContactFormPanel />
      </section>

      <NewsletterSection />
      <SiteFooter links={homeLinks} />
      <BackToTop />
    </main>
  );
}
