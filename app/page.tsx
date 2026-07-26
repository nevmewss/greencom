"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Grid } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";

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

const partnerLogos = ["natgeo", "walmart", "slack", "natgeo", "natgeo", "linkedin", "natgeo"];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}

function Button({
  children,
  href = "#contact",
  outline = false,
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  outline?: boolean;
  className?: string;
}) {
  return (
    <a className={`button ${outline ? "button--outline" : ""} ${className}`} href={href}>
      {children}
    </a>
  );
}

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

function Check({ defaultChecked = false }: { defaultChecked?: boolean }) {
  return <input className="checkbox" type="checkbox" defaultChecked={defaultChecked} required />;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("UA");
  const [heroSlide, setHeroSlide] = useState(0);
  const serviceSwiper = useRef<SwiperInstance | null>(null);
  const [serviceNavigation, setServiceNavigation] = useState({ isBeginning: true, isEnd: false });
  const [contactSent, setContactSent] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  function syncServiceNavigation(swiper: SwiperInstance) {
    setServiceNavigation({ isBeginning: swiper.isBeginning, isEnd: swiper.isEnd });
  }

  useEffect(() => {
    document.body.classList.toggle("no-scroll", menuOpen || searchOpen || loginOpen || cartOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [menuOpen, searchOpen, loginOpen, cartOpen]);

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setContactSent(true);
  }

  function submitNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribed(true);
  }

  function closeMenu() {
    setMenuOpen(false);
    setOpenDropdown(null);
  }

  return (
    <main className="site-shell">
      <header className="site-header">
        <div className="topbar">
          <div className="topbar__inner">
            <div className="topbar__contacts">
              <a href="mailto:example@domain.com"><img src="/icons/mail.svg" alt="" />example@domain.com</a>
              <i />
              <a href="tel:+1212345678900"><img src="/icons/phone.svg" alt="" />+12 (123) 456 78900</a>
            </div>
            <nav className="topbar__nav">
              <a href="./about/">Про компанію</a><i />
              <a href="#partners">Партнери</a><i />
              <a href="#news">Вакансії</a><i />
              <a href="#news">База знань</a><i />
              <div className="header-select">
                <button onClick={() => setOpenDropdown(openDropdown === "currency" ? null : "currency")}>{currency}<img src="/icons/chevron.svg" alt="" /></button>
                {openDropdown === "currency" && <div className="header-dropdown header-dropdown--small">{["USD", "EUR", "UAH"].map((item) => <button key={item} onClick={() => { setCurrency(item); setOpenDropdown(null); }}>{item}</button>)}</div>}
              </div><i />
              <div className="header-select">
                <button onClick={() => setOpenDropdown(openDropdown === "language" ? null : "language")}>{language}<img src="/icons/chevron.svg" alt="" /></button>
                {openDropdown === "language" && <div className="header-dropdown header-dropdown--small">{["UA", "EN", "PL"].map((item) => <button key={item} onClick={() => { setLanguage(item); setOpenDropdown(null); }}>{item}</button>)}</div>}
              </div>
            </nav>
          </div>
        </div>
        <div className="navbar">
          <a className="brand" href="#top" aria-label="GreenCom — головна"><img src="/icons/logo.png" alt="GreenCom" /></a>
          <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`}>
            <a className="is-active" href="#top" onClick={closeMenu}>Головна</a>
            <div className="nav-item">
              <button onClick={() => setOpenDropdown(openDropdown === "services" ? null : "services")}>Послуги<img src="/icons/chevron.svg" alt="" /></button>
              {openDropdown === "services" && <div className="header-dropdown"><a href="#services" onClick={closeMenu}>Програмне забезпечення</a><a href="#services" onClick={closeMenu}>Інтеграція систем</a><a href="#services" onClick={closeMenu}>Послуги ІТС</a></div>}
            </div>
            <div className="nav-item">
              <button onClick={() => setOpenDropdown(openDropdown === "equipment" ? null : "equipment")}>Обладнання<img src="/icons/chevron.svg" alt="" /></button>
              {openDropdown === "equipment" && <div className="header-dropdown"><a href="#services" onClick={closeMenu}>Торгове обладнання</a><a href="#services" onClick={closeMenu}>Касові рішення</a><a href="#services" onClick={closeMenu}>Витратні матеріали</a></div>}
            </div>
            <a href="#news" onClick={closeMenu}>Кейси</a>
            <a href="#contact" onClick={closeMenu}>Контакти</a>
            <a href="#services" onClick={closeMenu}>Ціни</a>
          </nav>
          <div className="navbar__actions">
            <button className="search-trigger" onClick={() => setSearchOpen(true)}><img src="/icons/search.svg" alt="" /><span>пошук</span></button>
            <button className="login-trigger" onClick={() => setLoginOpen(true)}><img src="/icons/user.svg?v=2" alt="" /><span>Вхід</span></button>
            <button className="cart-trigger" onClick={() => setCartOpen(true)}><span className="cart-trigger__icon"><img src="/icons/cart-badge.svg" alt="" /><b>99</b></span><span>12 450₴</span></button>
            <button className={`menu-trigger ${menuOpen ? "is-open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Закрити меню" : "Відкрити меню"}><span /><span /><span /></button>
          </div>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero__media"><img src="/assets/figma-hero-tablet.png" alt="Цифровий лист над мікросхемою" /></div>
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
        <article className="hero-feature">
          <h2>Автоматизація <span>бізнес-процесів</span></h2>
          <p>{heroSlide === 0 ? "Налаштовуємо сучасні системи для ефективної роботи підприємств." : heroSlide === 1 ? "Поєднуємо обладнання, дані та процеси в єдину систему." : "Допомагаємо бізнесу зростати завдяки технологіям."}</p>
          <a href="#services">Детальніше</a>
        </article>
        <div className="hero__dots">{[0, 1, 2].map((item) => <button key={item} className={heroSlide === item ? "is-active" : ""} onClick={() => setHeroSlide(item)} aria-label={`Слайд ${item + 1}`} />)}</div>
      </section>

      <section className="benefits section-bg section-bg--waves" id="benefits">
        <div className="benefits__layout">
          <div className="benefits__intro">
            <Eyebrow>Переваги</Eyebrow>
            <h2><strong>Чому</strong> обирають нас<br />Якість, якій<br className="benefits__mobile-break" />Довіряють</h2>
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

      <section className="partners section-bg section-bg--waves" id="partners">
        <div className="partners__intro"><Eyebrow>Наші партнери</Eyebrow><h2><strong>Компанії</strong> які<br />Довіряють нам</h2><Button>Дізнатися більше</Button></div>
        <div className="partners__cloud">{partnerLogos.map((logo, index) => <div className={`partner partner--${index + 1}`} key={`${logo}-${index}`}><span><img src={`/assets/partner-${logo}.svg`} alt={logo} /></span></div>)}</div>
      </section>

      <section className="news section-bg section-bg--waves" id="news">
        <div className="news__head"><Eyebrow>Новини</Eyebrow><h2><strong>Ділимося</strong> Останніми<br />Новинами у Сфері<br /><strong>Автоматизації</strong></h2><Button>Всі новини</Button></div>
        <div className="news__cards"><NewsCard index={0} featured /><div className="news__stack"><NewsCard index={1} /><NewsCard index={2} /><NewsCard index={3} /></div></div>
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
        <form className="contact-form" onSubmit={submitContact}>
          <div className="contact-form__grid">
            <label>Ім’я та прізвище<span><input required placeholder="Іван Іванов" /><img src="/assets/form-user.svg" alt="" /></span></label>
            <label>Електронна пошта<span><input type="email" required placeholder="Email" /><img src="/assets/form-email.svg" alt="" /></span></label>
            <label>Номер телефону<span><input placeholder="+12 (123) 456 78900" /><img src="/assets/form-phone.svg" alt="" /></span></label>
            <label>Тема звернення<span><select defaultValue=""><option value="" disabled>Введіть назву</option><option>Консультація</option><option>Обладнання</option><option>Послуги ІТС</option></select><img src="/assets/form-chevron.svg" alt="" /></span></label>
          </div>
          <label className="contact-form__message">Ваше повідомлення<textarea required placeholder="Напишіть ваше повідомлення" /></label>
          <label className="consent"><Check defaultChecked />Відправивши це повідомлення Ви приймаєте політику конфіденційності</label>
          <button className="button" type="submit">{contactSent ? "Надіслано ✓" : "Відправити"}</button>
        </form>
      </section>

      <section className="newsletter" id="newsletter">
        <img className="newsletter__decor newsletter__decor--left" src="/assets/newsletter-left.png" alt="" />
        <img className="newsletter__decor newsletter__decor--right" src="/assets/newsletter-right.png" alt="" />
        <div className="newsletter__content"><h2>Підпишіться на нашу розсилку</h2><p>Отримуйте новини, оновлення та корисні рішення для автоматизації бізнесу прямо на вашу електронну пошту.</p></div>
        <form className="newsletter__form" onSubmit={submitNewsletter}>
          <div><input type="email" required placeholder="Email" aria-label="Email для розсилки" /><button type="submit">{subscribed ? "Готово ✓" : "Підписатися"} <span>›</span></button></div>
          <label className="consent"><Check defaultChecked />підписуючись. Ви приймаєте політику конфіденційності</label>
        </form>
      </section>

      <footer className="footer section-bg section-bg--circuits" id="footer">
        <div className="footer__main">
          <div className="footer__brand">
            <img src="/icons/logo.png" alt="GreenCom" />
            <i />
            <div className="footer__contact"><span><img src="/icons/footer-mail.svg" alt="" /></span><p><b>Контактна інформація</b><a href="mailto:office@greencom.od.ua">office@greencom.od.ua</a><a href="tel:+1212345678900">+12 (123) 456 78900</a></p></div>
            <i />
            <div className="footer__contact"><span><span className="location-icon"><img src="/icons/location-outer.svg" alt="" /><img src="/icons/location-inner.svg" alt="" /></span></span><p><b>Адреса</b><em>Одеська обл.,</em><em>м. Біляївка, вул. Тіниста, 42а</em></p></div>
          </div>
          <nav className="footer__nav">
            {[
              ["Інформація", "Про компанію", "Контакти", "Ціни", "Партнери", "Вакансії", "FAQ"],
              ["Підтримка", "Про компанію", "Контакти", "Ціни", "Партнери", "Вакансії", "FAQ"],
              ["Сервіси", "Програмне забезпечення", "Торгове обладнання", "Послуги ІТС", "Витратні матеріали"],
            ].map((column) => <div key={column[0]}><h3>{column[0]}</h3>{column.slice(1).map((item) => <a href="#" key={item}>{item}</a>)}</div>)}
          </nav>
        </div>
        <div className="footer__bottom"><span>© 2026. All rights reserved</span><div><a href="#" aria-label="Instagram"><img src="/icons/instagram.svg" alt="" /></a><a href="#" aria-label="Instagram"><img src="/icons/instagram.svg" alt="" /></a></div></div>
      </footer>

      <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Повернутися нагору">↑</button>

      {searchOpen && <div className="overlay" role="dialog" aria-modal="true" aria-label="Пошук"><button className="overlay__close" onClick={() => setSearchOpen(false)} aria-label="Закрити">×</button><form className="search-panel" onSubmit={(event) => { event.preventDefault(); setSearchOpen(false); }}><img src="/icons/search.svg" alt="" /><input autoFocus placeholder="Що ви шукаєте?" /><button className="button">Знайти</button></form></div>}
      {loginOpen && <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="login-title"><div className="modal"><button className="overlay__close" onClick={() => setLoginOpen(false)} aria-label="Закрити">×</button><img src="/icons/logo.png" alt="GreenCom" /><h2 id="login-title">Вхід до кабінету</h2><label>Email<input type="email" placeholder="name@email.com" /></label><label>Пароль<input type="password" placeholder="••••••••" /></label><button className="button" onClick={() => setLoginOpen(false)}>Увійти</button><a href="#">Забули пароль?</a></div></div>}
      {cartOpen && <><button className="drawer-backdrop" onClick={() => setCartOpen(false)} aria-label="Закрити кошик" /><aside className="drawer"><div className="drawer__head"><h2>Кошик</h2><button onClick={() => setCartOpen(false)} aria-label="Закрити">×</button></div><div className="drawer__item"><img src="/retail-tech.jpg" alt="" /><div><b>Торгове обладнання</b><span>1 × 12 450₴</span></div></div><div className="drawer__total"><span>Разом</span><b>12 450₴</b></div><button className="button">Оформити замовлення</button></aside></>}
    </main>
  );
}
