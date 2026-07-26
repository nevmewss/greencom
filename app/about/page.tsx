"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const partnerLogos = ["natgeo", "walmart", "slack", "natgeo", "natgeo", "linkedin", "natgeo"];

const achievements = [
  { value: "24/7", text: "успішно реалізованих проєктів для бізнесу різних масштабів" },
  { value: "100+", text: "клієнтів, які довіряють нашим технологічним рішенням" },
  { value: "5+", text: "років досвіду у сфері автоматизації та IT-рішень" },
  { value: "99%", text: "клієнтів залишаються задоволені співпрацею з нами" },
  { value: "24/7", text: "клієнтів залишаються задоволені співпрацею з нами" },
  { value: "20+", text: "технічна підтримка та консультації для наших клієнтів" },
];

const historyItems = Array.from({ length: 6 }, () => ({
  year: "2000",
  title: "Заснування компанії",
  text: "Розпочали діяльність у сфері автоматизації та IT-рішень для бізнесу.",
}));

const team = [
  { role: "Посада", name: "Ім’я спеціаліста" },
  { role: "Обладнання", name: "Ім’я спеціаліста" },
  { role: "Обладнання", name: "Ім’я спеціаліста" },
];

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

function Check({ defaultChecked = false }: { defaultChecked?: boolean }) {
  return <input className="checkbox" type="checkbox" defaultChecked={defaultChecked} required />;
}

function TeamCard({ role, name }: { role: string; name: string }) {
  return (
    <article className="about-team-card">
      <div className="about-team-card__image">
        <img src="/assets/about-team.png" alt="Спеціалістка GreenCom" />
      </div>
      <span>{role}</span>
      <h3>{name}</h3>
    </article>
  );
}

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("UA");
  const [contactSent, setContactSent] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const teamSwiper = useRef<SwiperInstance | null>(null);
  const [teamNavigation, setTeamNavigation] = useState({ isBeginning: true, isEnd: false });

  useEffect(() => {
    document.body.classList.toggle("no-scroll", menuOpen || searchOpen || loginOpen || cartOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [menuOpen, searchOpen, loginOpen, cartOpen]);

  function closeMenu() {
    setMenuOpen(false);
    setOpenDropdown(null);
  }

  function syncTeamNavigation(swiper: SwiperInstance) {
    setTeamNavigation({ isBeginning: swiper.isBeginning, isEnd: swiper.isEnd });
  }

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setContactSent(true);
  }

  function submitNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribed(true);
  }

  return (
    <main className="about-page">
      <header className="site-header">
        <div className="topbar">
          <div className="topbar__inner">
            <div className="topbar__contacts">
              <a href="mailto:example@domain.com"><img src="/icons/mail.svg" alt="" />example@domain.com</a>
              <i />
              <a href="tel:+1212345678900"><img src="/icons/phone.svg" alt="" />+12 (123) 456 78900</a>
            </div>
            <nav className="topbar__nav">
              <a href="#top">Про компанію</a><i />
              <a href="#partners">Партнери</a><i />
              <a href="../#news">Вакансії</a><i />
              <a href="../#news">База знань</a><i />
              <div className="header-select">
                <button type="button" onClick={() => setOpenDropdown(openDropdown === "currency" ? null : "currency")}>{currency}<img src="/icons/chevron.svg" alt="" /></button>
                {openDropdown === "currency" && <div className="header-dropdown header-dropdown--small">{["USD", "EUR", "UAH"].map((item) => <button type="button" key={item} onClick={() => { setCurrency(item); setOpenDropdown(null); }}>{item}</button>)}</div>}
              </div><i />
              <div className="header-select">
                <button type="button" onClick={() => setOpenDropdown(openDropdown === "language" ? null : "language")}>{language}<img src="/icons/chevron.svg" alt="" /></button>
                {openDropdown === "language" && <div className="header-dropdown header-dropdown--small">{["UA", "EN", "PL"].map((item) => <button type="button" key={item} onClick={() => { setLanguage(item); setOpenDropdown(null); }}>{item}</button>)}</div>}
              </div>
            </nav>
          </div>
        </div>
        <div className="navbar">
          <a className="brand" href="../" aria-label="GreenCom — головна"><img src="/icons/logo.png" alt="GreenCom" /></a>
          <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`}>
            <a className="is-active" href="../" onClick={closeMenu}>Головна</a>
            <div className="nav-item">
              <button type="button" onClick={() => setOpenDropdown(openDropdown === "services" ? null : "services")}>Послуги<img src="/icons/chevron.svg" alt="" /></button>
              {openDropdown === "services" && <div className="header-dropdown"><a href="../#services" onClick={closeMenu}>Програмне забезпечення</a><a href="../#services" onClick={closeMenu}>Інтеграція систем</a><a href="../#services" onClick={closeMenu}>Послуги ІТС</a></div>}
            </div>
            <div className="nav-item">
              <button type="button" onClick={() => setOpenDropdown(openDropdown === "equipment" ? null : "equipment")}>Обладнання<img src="/icons/chevron.svg" alt="" /></button>
              {openDropdown === "equipment" && <div className="header-dropdown"><a href="../#services" onClick={closeMenu}>Торгове обладнання</a><a href="../#services" onClick={closeMenu}>Касові рішення</a><a href="../#services" onClick={closeMenu}>Витратні матеріали</a></div>}
            </div>
            <a href="../#news" onClick={closeMenu}>Кейси</a>
            <a href="#contact" onClick={closeMenu}>Контакти</a>
            <a href="../#services" onClick={closeMenu}>Ціни</a>
          </nav>
          <div className="navbar__actions">
            <button className="search-trigger" type="button" onClick={() => setSearchOpen(true)}><img src="/icons/search.svg" alt="" /><span>пошук</span></button>
            <button className="login-trigger" type="button" onClick={() => setLoginOpen(true)}><img src="/icons/user.svg?v=2" alt="" /><span>Вхід</span></button>
            <button className="cart-trigger" type="button" onClick={() => setCartOpen(true)}><span className="cart-trigger__icon"><img src="/icons/cart-badge.svg" alt="" /><b>99</b></span><span>12 450₴</span></button>
            <button className={`menu-trigger ${menuOpen ? "is-open" : ""}`} type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Закрити меню" : "Відкрити меню"}><span /><span /><span /></button>
          </div>
        </div>
      </header>

      <section className="about-hero" id="top">
        <picture className="about-hero__media">
          <source media="(max-width: 600px)" srcSet="/assets/about-hero-mobile.png" />
          <source media="(max-width: 1294px)" srcSet="/assets/about-hero-tablet.png" />
          <img src="/assets/about-hero.png" alt="Сучасний офіс GreenCom із серверним обладнанням" />
        </picture>
        <div className="about-hero__shade" />
        <nav className="about-breadcrumbs" aria-label="Навігаційний ланцюжок">
          <a href="../">Головна</a><i /> <span>Про компанію</span>
        </nav>
        <div className="about-hero__content">
          <Eyebrow>Про компанію</Eyebrow>
          <h1><strong>Технології, які<br />створюють</strong><br />ефективний</h1>
          <p>GreenCore — це команда експертів, яка з 2019 року допомагає компаніям оптимізувати процеси, підвищувати ефективність та масштабувати свій бізнес за допомогою сучасних технологічних рішень.</p>
          <Button outline href="#contact">Зв&apos;язатися з нами</Button>
        </div>
      </section>

      <section className="about-overview">
        <div className="about-section-inner">
          <div className="about-section-title">
            <Eyebrow>Текст</Eyebrow>
            <h2><strong>Великий</strong> оглядовий<br />текст про компанію</h2>
          </div>
          <div className="about-overview__copy">
            <p>Lorem ipsum dolor sit amet consectetur. Tristique pulvinar feugiat id ipsum sodales nam arcu fringilla in. Ipsum quam id venenatis sem elit faucibus diam eu. Lorem ut mattis amet ac. Sem eleifend aliquet proin interdum donec. Diam id sem ipsum iaculis interdum orci. Aliquam eget elementum faucibus integer etiam interdum. Urna dolor mi risus porttitor orci est. Orci vestibulum turpis vulputate turpis pulvinar dictumst vitae leo arcu. Non pellentesque magna elit velit id ante facilisi lacus in. Tortor dictumst sed ante integer sit. Dignissim luctus mauris donec amet interdum orci ac.</p>
            <p>Quis diam pulvinar nunc tellus duis pulvinar pellentesque elit purus. Leo quis eros quisque a convallis. Sed mi sagittis gravida risus aliquam magna augue neque. Laoreet arcu pellentesque amet vestibulum. Id erat et massa vitae.</p>
            <p>Tincidunt quam purus quis netus porta tristique. Aliquet aliquam rutrum eget quis in mi quis posuere. Pulvinar luctus pharetra elit elementum sed sagittis elit vitae. Sit mi risus quam erat tortor at sollicitudin. Sit sed sapien amet at. Id habitant at elit libero nec cras eu. Scelerisque arcu aliquam nec est aliquam sapien placerat. Ultricies nunc amet laoreet interdum posuere at. Commodo ipsum placerat ac vitae in purus mauris ultricies dictumst. Porttitor nunc sit ante pellentesque sed lectus lectus dolor praesent. Facilisi orci dictum neque leo. Mattis elit erat arcu ac elementum aliquet est egestas nisl. Suspendisse quis tincidunt aliquet volutpat.</p>
            <p>Quis diam pulvinar nunc tellus duis pulvinar pellentesque elit purus. Leo quis eros quisque a convallis. Sed mi sagittis gravida risus aliquam magna augue neque. Laoreet arcu pellentesque amet vestibulum. Id erat et massa vitae.</p>
            <p>Tincidunt quam purus quis netus porta tristique. Aliquet aliquam rutrum eget quis in mi quis posuere. Pulvinar luctus pharetra elit elementum sed sagittis elit vitae. Sit mi risus quam erat tortor at sollicitudin. Sit sed sapien amet at. Id habitant at elit libero nec cras eu. Scelerisque arcu aliquam nec est aliquam sapien placerat. Ultricies nunc amet laoreet interdum posuere at. Commodo ipsum placerat ac vitae in purus mauris ultricies dictumst. Porttitor nunc sit ante pellentesque sed lectus lectus dolor praesent. Facilisi orci dictum neque leo. Mattis elit erat arcu ac elementum aliquet est egestas nisl. Suspendisse quis tincidunt aliquet volutpat.</p>
          </div>
        </div>
      </section>

      <section className="about-results">
        <div className="about-results__panel">
          <div className="about-results__intro">
            <Eyebrow>Наші досягнення</Eyebrow>
            <h2><strong>Результати</strong><br />які говорить за нас</h2>
          </div>
          <div className="about-results__grid">
            {achievements.map((item, index) => <article key={`${item.value}-${index}`}><b>{item.value}</b><p>{item.text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="about-team">
        <div className="about-team__intro">
          <Eyebrow>Наша команда</Eyebrow>
          <h2><strong>Експерти,</strong> створюють<br />майбутнє разом з вами</h2>
          <p>Ми — команда професіоналів із досвідом у IT, автоматизації, інженерії та бізнес-експертизі, об’єднані спільною метою — допомагати бізнесу зростати через технології.</p>
          <div className="about-team__arrows">
            <button type="button" disabled={teamNavigation.isBeginning} onClick={() => teamSwiper.current?.slidePrev()} aria-label="Попередній спеціаліст">←</button>
            <button type="button" disabled={teamNavigation.isEnd} onClick={() => teamSwiper.current?.slideNext()} aria-label="Наступний спеціаліст">→</button>
          </div>
        </div>
        <Swiper
          className="about-team__slider"
          modules={[A11y]}
          a11y={{ enabled: true }}
          slidesPerView={2}
          slidesPerGroup={1}
          spaceBetween={24}
          speed={500}
          watchOverflow
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 18 },
            601: { slidesPerView: 1, spaceBetween: 24 },
            1295: { slidesPerView: 2, spaceBetween: 24 },
          }}
          onSwiper={(swiper) => { teamSwiper.current = swiper; syncTeamNavigation(swiper); }}
          onSlideChange={syncTeamNavigation}
          onBreakpoint={syncTeamNavigation}
          onResize={syncTeamNavigation}
          onReachBeginning={syncTeamNavigation}
          onReachEnd={syncTeamNavigation}
        >
          {team.map((member, index) => <SwiperSlide key={`${member.role}-${index}`}><TeamCard {...member} /></SwiperSlide>)}
        </Swiper>
      </section>

      <section className="about-history">
        <div className="about-history__visual">
          <div className="about-section-title">
            <Eyebrow>Історія розвитку</Eyebrow>
            <h2><strong>Шлях</strong> розвитку<br />та технологічних досягнень</h2>
          </div>
          <div className="about-history__image"><i /><img src="/assets/about-history.png" alt="Графік технологічного розвитку GreenCom" /></div>
        </div>
        <div className="about-history__timeline">
          {historyItems.map((item, index) => (
            <article key={index}>
              <time>{item.year}</time>
              <img src="/assets/about-history-marker.svg" alt="" />
              <div><h3>{item.title}</h3><p>{item.text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="partners section-bg section-bg--waves" id="partners">
        <div className="partners__intro"><Eyebrow>Наші партнери</Eyebrow><h2><strong>Компанії</strong> які<br />Довіряють нам</h2><Button>Дізнатися більше</Button></div>
        <div className="partners__cloud">{partnerLogos.map((logo, index) => <div className={`partner partner--${index + 1}`} key={`${logo}-${index}`}><span><img src={`/assets/partner-${logo}.svg`} alt={logo} /></span></div>)}</div>
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
            <div><h3>Інформація</h3><a href="#top">Про компанію</a><a href="#contact">Контакти</a><a href="../#services">Ціни</a><a href="#partners">Партнери</a><a href="../#news">Вакансії</a><a href="../#news">FAQ</a></div>
            <div><h3>Підтримка</h3><a href="#top">Про компанію</a><a href="#contact">Контакти</a><a href="../#services">Ціни</a><a href="#partners">Партнери</a><a href="../#news">Вакансії</a><a href="../#news">FAQ</a></div>
            <div><h3>Сервіси</h3><a href="../#services">Програмне забезпечення</a><a href="../#services">Торгове обладнання</a><a href="../#services">Послуги ІТС</a><a href="../#services">Витратні матеріали</a></div>
          </nav>
        </div>
        <div className="footer__bottom"><span>© 2026. All rights reserved</span><div><a href="#" aria-label="Instagram"><img src="/icons/instagram.svg" alt="" /></a><a href="#" aria-label="Instagram"><img src="/icons/instagram.svg" alt="" /></a></div></div>
      </footer>

      <button className="back-to-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Повернутися нагору">↑</button>

      {searchOpen && <div className="overlay" role="dialog" aria-modal="true" aria-label="Пошук"><button className="overlay__close" type="button" onClick={() => setSearchOpen(false)} aria-label="Закрити">×</button><form className="search-panel" onSubmit={(event) => { event.preventDefault(); setSearchOpen(false); }}><img src="/icons/search.svg" alt="" /><input autoFocus placeholder="Що ви шукаєте?" /><button className="button">Знайти</button></form></div>}
      {loginOpen && <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="login-title"><div className="modal"><button className="overlay__close" type="button" onClick={() => setLoginOpen(false)} aria-label="Закрити">×</button><img src="/icons/logo.png" alt="GreenCom" /><h2 id="login-title">Вхід до кабінету</h2><label>Email<input type="email" placeholder="name@email.com" /></label><label>Пароль<input type="password" placeholder="••••••••" /></label><button className="button" type="button" onClick={() => setLoginOpen(false)}>Увійти</button><a href="#">Забули пароль?</a></div></div>}
      {cartOpen && <><button className="drawer-backdrop" type="button" onClick={() => setCartOpen(false)} aria-label="Закрити кошик" /><aside className="drawer"><div className="drawer__head"><h2>Кошик</h2><button type="button" onClick={() => setCartOpen(false)} aria-label="Закрити">×</button></div><div className="drawer__item"><img src="/retail-tech.jpg" alt="" /><div><b>Торгове обладнання</b><span>1 × 12 450₴</span></div></div><div className="drawer__total"><span>Разом</span><b>12 450₴</b></div><button className="button" type="button">Оформити замовлення</button></aside></>}
    </main>
  );
}
