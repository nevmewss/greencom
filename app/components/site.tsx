"use client";

import { FormEvent, ReactNode, useEffect, useState } from "react";

export type SiteLinks = {
  home: string;
  about: string;
  services: string;
  news: string;
  contact: string;
  partners: string;
};

export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}

export function Button({
  children,
  href = "#contact",
  outline = false,
  className = "",
}: {
  children: ReactNode;
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

export function Check({ defaultChecked = false }: { defaultChecked?: boolean }) {
  return <input className="checkbox" type="checkbox" defaultChecked={defaultChecked} required />;
}

export function SiteHeader({
  links,
  active = "home",
}: {
  links: SiteLinks;
  active?: "home" | "about" | "contact" | null;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("UA");

  useEffect(() => {
    document.body.classList.toggle("no-scroll", menuOpen || searchOpen || loginOpen || cartOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [menuOpen, searchOpen, loginOpen, cartOpen]);

  useEffect(() => {
    const shell = document.querySelector<HTMLElement>(".site-shell, .about-page, .contact-page, .not-found-page");
    if (!shell) return;

    const syncDesktopScale = () => {
      if (window.innerWidth >= 1295) {
        const viewportWidth = document.documentElement.clientWidth;
        shell.style.setProperty("zoom", String(viewportWidth / 1440));
      } else {
        shell.style.removeProperty("zoom");
      }
    };

    syncDesktopScale();
    window.addEventListener("resize", syncDesktopScale);
    return () => {
      window.removeEventListener("resize", syncDesktopScale);
      shell.style.removeProperty("zoom");
    };
  }, []);

  function closeMenu() {
    setMenuOpen(false);
    setOpenDropdown(null);
  }

  return (
    <>
      <header className="site-header">
        <div className="topbar">
          <div className="topbar__inner">
            <div className="topbar__contacts">
              <a href="mailto:example@domain.com"><img src="/icons/mail.svg" alt="" />example@domain.com</a>
              <i />
              <a href="tel:+1212345678900"><img src="/icons/phone.svg" alt="" />+12 (123) 456 78900</a>
            </div>
            <nav className="topbar__nav">
              <a href={links.about}>Про компанію</a><i />
              <a href={links.partners}>Партнери</a><i />
              <a href={links.news}>Вакансії</a><i />
              <a href={links.news}>База знань</a><i />
              <div className="header-select">
                <button type="button" onClick={() => setOpenDropdown(openDropdown === "currency" ? null : "currency")}>{currency}<img src="/icons/chevron.svg" alt="" /></button>
                {openDropdown === "currency" && (
                  <div className="header-dropdown header-dropdown--small">
                    {["USD", "EUR", "UAH"].map((item) => <button type="button" key={item} onClick={() => { setCurrency(item); setOpenDropdown(null); }}>{item}</button>)}
                  </div>
                )}
              </div><i />
              <div className="header-select">
                <button type="button" onClick={() => setOpenDropdown(openDropdown === "language" ? null : "language")}>{language}<img src="/icons/chevron.svg" alt="" /></button>
                {openDropdown === "language" && (
                  <div className="header-dropdown header-dropdown--small">
                    {["UA", "EN", "PL"].map((item) => <button type="button" key={item} onClick={() => { setLanguage(item); setOpenDropdown(null); }}>{item}</button>)}
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
        <div className="navbar">
          <a className="brand" href={links.home} aria-label="GreenCom — головна"><img src="/icons/logo.png" alt="GreenCom" /></a>
          <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`}>
            <a className={active === "home" ? "is-active" : ""} href={links.home} onClick={closeMenu}>Головна</a>
            <div className="nav-item">
              <button type="button" onClick={() => setOpenDropdown(openDropdown === "services" ? null : "services")}>Послуги<img src="/icons/chevron.svg" alt="" /></button>
              {openDropdown === "services" && <div className="header-dropdown"><a href={links.services} onClick={closeMenu}>Програмне забезпечення</a><a href={links.services} onClick={closeMenu}>Інтеграція систем</a><a href={links.services} onClick={closeMenu}>Послуги ІТС</a></div>}
            </div>
            <div className="nav-item">
              <button type="button" onClick={() => setOpenDropdown(openDropdown === "equipment" ? null : "equipment")}>Обладнання<img src="/icons/chevron.svg" alt="" /></button>
              {openDropdown === "equipment" && <div className="header-dropdown"><a href={links.services} onClick={closeMenu}>Торгове обладнання</a><a href={links.services} onClick={closeMenu}>Касові рішення</a><a href={links.services} onClick={closeMenu}>Витратні матеріали</a></div>}
            </div>
            <a href={links.news} onClick={closeMenu}>Кейси</a>
            <a className={active === "contact" ? "is-active" : ""} href={links.contact} onClick={closeMenu}>Контакти</a>
            <a href={links.services} onClick={closeMenu}>Ціни</a>
          </nav>
          <div className="navbar__actions">
            <button className="search-trigger" type="button" onClick={() => setSearchOpen(true)}><img src="/icons/search.svg" alt="" /><span>пошук</span></button>
            <button className="login-trigger" type="button" onClick={() => setLoginOpen(true)}><img src="/icons/user.svg?v=2" alt="" /><span>Вхід</span></button>
            <button className="cart-trigger" type="button" onClick={() => setCartOpen(true)}><span className="cart-trigger__icon"><img src="/icons/cart-badge.svg" alt="" /><b>99</b></span><span>12 450₴</span></button>
            <button className={`menu-trigger ${menuOpen ? "is-open" : ""}`} type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Закрити меню" : "Відкрити меню"}><span /><span /><span /></button>
          </div>
        </div>
      </header>

      {searchOpen && <div className="overlay" role="dialog" aria-modal="true" aria-label="Пошук"><button className="overlay__close" type="button" onClick={() => setSearchOpen(false)} aria-label="Закрити">×</button><form className="search-panel" onSubmit={(event) => { event.preventDefault(); setSearchOpen(false); }}><img src="/icons/search.svg" alt="" /><input autoFocus placeholder="Що ви шукаєте?" /><button className="button">Знайти</button></form></div>}
      {loginOpen && <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="login-title"><div className="modal"><button className="overlay__close" type="button" onClick={() => setLoginOpen(false)} aria-label="Закрити">×</button><img src="/icons/logo.png" alt="GreenCom" /><h2 id="login-title">Вхід до кабінету</h2><label>Email<input type="email" placeholder="name@email.com" /></label><label>Пароль<input type="password" placeholder="••••••••" /></label><button className="button" type="button" onClick={() => setLoginOpen(false)}>Увійти</button><a href="#">Забули пароль?</a></div></div>}
      {cartOpen && <><button className="drawer-backdrop" type="button" onClick={() => setCartOpen(false)} aria-label="Закрити кошик" /><aside className="drawer"><div className="drawer__head"><h2>Кошик</h2><button type="button" onClick={() => setCartOpen(false)} aria-label="Закрити">×</button></div><div className="drawer__item"><img src="/retail-tech.jpg" alt="" /><div><b>Торгове обладнання</b><span>1 × 12 450₴</span></div></div><div className="drawer__total"><span>Разом</span><b>12 450₴</b></div><button className="button" type="button">Оформити замовлення</button></aside></>}
    </>
  );
}

export function ContactFormPanel({ className = "" }: { className?: string }) {
  const [contactSent, setContactSent] = useState(false);

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setContactSent(true);
  }

  return (
    <form className={`contact-form ${className}`} onSubmit={submitContact}>
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
  );
}

export function NewsletterSection({ className = "" }: { className?: string }) {
  const [subscribed, setSubscribed] = useState(false);

  function submitNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribed(true);
  }

  return (
    <section className={`newsletter ${className}`} id="newsletter">
      <img className="newsletter__decor newsletter__decor--left" src="/assets/newsletter-left.png" alt="" />
      <img className="newsletter__decor newsletter__decor--right" src="/assets/newsletter-right.png" alt="" />
      <div className="newsletter__content"><h2>Підпишіться на нашу розсилку</h2><p>Отримуйте новини, оновлення та корисні рішення для автоматизації бізнесу прямо на вашу електронну пошту.</p></div>
      <form className="newsletter__form" onSubmit={submitNewsletter}>
        <div><input type="email" required placeholder="Email" aria-label="Email для розсилки" /><button type="submit">{subscribed ? "Готово ✓" : "Підписатися"} <span>›</span></button></div>
        <label className="consent"><Check defaultChecked />підписуючись. Ви приймаєте політику конфіденційності</label>
      </form>
    </section>
  );
}

export function SiteFooter({ links, className = "" }: { links: SiteLinks; className?: string }) {
  const information = [
    ["Про компанію", links.about],
    ["Контакти", links.contact],
    ["Ціни", links.services],
    ["Партнери", links.partners],
    ["Вакансії", links.news],
    ["FAQ", links.news],
  ];
  const services = ["Програмне забезпечення", "Торгове обладнання", "Послуги ІТС", "Витратні матеріали"];

  return (
    <footer className={`footer section-bg section-bg--circuits ${className}`} id="footer">
      <div className="footer__main">
        <div className="footer__brand">
          <img src="/icons/logo.png" alt="GreenCom" />
          <i />
          <div className="footer__contact"><span><img src="/icons/footer-mail.svg" alt="" /></span><p><b>Контактна інформація</b><a href="mailto:office@greencom.od.ua">office@greencom.od.ua</a><a href="tel:+1212345678900">+12 (123) 456 78900</a></p></div>
          <i />
          <div className="footer__contact"><span><span className="location-icon"><img src="/icons/location-outer.svg" alt="" /><img src="/icons/location-inner.svg" alt="" /></span></span><p><b>Адреса</b><em>Одеська обл.,</em><em>м. Біляївка, вул. Тіниста, 42а</em></p></div>
        </div>
        <nav className="footer__nav">
          <div><h3>Інформація</h3>{information.map(([label, href]) => <a href={href} key={label}>{label}</a>)}</div>
          <div><h3>Підтримка</h3>{information.map(([label, href]) => <a href={href} key={label}>{label}</a>)}</div>
          <div><h3>Сервіси</h3>{services.map((label) => <a href={links.services} key={label}>{label}</a>)}</div>
        </nav>
      </div>
      <div className="footer__bottom"><span>© 2026. All rights reserved</span><div><a href="#" aria-label="Instagram"><img src="/icons/instagram.svg" alt="" /></a><a href="#" aria-label="Instagram"><img src="/icons/instagram.svg" alt="" /></a></div></div>
    </footer>
  );
}

export function BackToTop({ className = "" }: { className?: string }) {
  return <button className={`back-to-top ${className}`} type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Повернутися нагору">↑</button>;
}
