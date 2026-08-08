"use client";

import { FormEvent, Fragment, ReactNode, useEffect, useState } from "react";
import { CmsData, CmsLocale, cmsImage, cmsItems, cmsString } from "./cms";

export type SiteLinks = {
  home: string;
  about: string;
  services: string;
  price: string;
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

export type PageHeroVariant = "slider" | "standard" | "image";

export function PageHero({
  variant,
  className = "",
  id,
  children,
}: {
  variant: PageHeroVariant;
  className?: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <section className={`page-hero page-hero--${variant} ${className}`} id={id}>
      {children}
    </section>
  );
}

const partnerLogos = ["natgeo", "walmart", "slack", "natgeo", "natgeo", "linkedin", "natgeo"];

export function PartnersSection({ id = "partners" }: { id?: string }) {
  return (
    <section className="partners section-bg section-bg--waves" id={id}>
      <div className="partners__intro">
        <Eyebrow>Наші партнери</Eyebrow>
        <h2><strong>Компанії</strong> які<br />Довіряють нам</h2>
        <Button href="#contact">Дізнатися більше</Button>
      </div>
      <div className="partners__cloud">
        {partnerLogos.map((logo, index) => (
          <div className={`partner partner--${index + 1}`} key={`${logo}-${index}`}>
            <span><img src={`/assets/partner-${logo}.svg`} alt={logo} /></span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Check({ defaultChecked = false }: { defaultChecked?: boolean }) {
  return <input className="checkbox" type="checkbox" defaultChecked={defaultChecked} required />;
}

export function SiteHeader({
  links,
  active = "home",
  data = {},
  locale,
  locales = [],
  onLocaleChange,
  variant = "home",
}: {
  links: SiteLinks;
  active?: "home" | "about" | "contact" | "price" | null;
  data?: CmsData;
  locale?: string;
  locales?: CmsLocale[];
  onLocaleChange?: (code: string) => void;
  variant?: "home" | "inner";
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("uk");

  const logo = cmsImage(data, "logo", "logo_url", "/icons/logo.png");
  const topLinks = cmsItems(data, "top_links");
  const navItems = cmsItems(data, "nav_items");
  const currencies = cmsItems(data, "currencies").map((item) => cmsString(item, "value")).filter(Boolean);
  const configuredLanguages = cmsItems(data, "languages").map((item) => cmsString(item, "value")).filter(Boolean);
  const languageOptions = locales.length
    ? locales.map((item) => ({ code: item.code, label: item.code === "uk" ? "UA" : item.code.toUpperCase() }))
    : configuredLanguages.length
      ? configuredLanguages.map((item) => ({ code: item.toLowerCase() === "ua" ? "uk" : item.toLowerCase(), label: item }))
      : [{ code: "uk", label: "UA" }, { code: "en", label: "EN" }, { code: "ru", label: "RU" }];
  const currentLanguage = languageOptions.find((item) => item.code === (locale ?? language)) ?? languageOptions[0];
  const configuredTopLinks = topLinks.length ? topLinks : [
    { label: "Про компанію", url: links.about },
    { label: "Партнери", url: links.partners },
    { label: "Вакансії", url: links.news },
    { label: "База знань", url: links.news },
  ];
  const configuredNavItems = navItems.length ? navItems : [
    { group: "main", label: "Головна", url: links.home },
    { group: "services", label: "Програмне забезпечення", url: links.services },
    { group: "services", label: "Інтеграція систем", url: links.services },
    { group: "services", label: "Послуги ІТС", url: links.services },
    { group: "equipment", label: "Торгове обладнання", url: links.services },
    { group: "equipment", label: "Касові рішення", url: links.services },
    { group: "equipment", label: "Витратні матеріали", url: links.services },
    { group: "main", label: "Кейси", url: links.news },
    { group: "main", label: "Контакти", url: links.contact },
    { group: "main", label: "Ціни", url: links.price },
  ];
  const mainNavItems = configuredNavItems.filter((item) => cmsString(item, "group") === "main");

  useEffect(() => {
    document.body.classList.toggle("no-scroll", menuOpen || searchOpen || loginOpen || cartOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [menuOpen, searchOpen, loginOpen, cartOpen]);

  function closeMenu() {
    setMenuOpen(false);
    setOpenDropdown(null);
  }

  return (
    <>
      <header className={`site-header site-header--${variant}`}>
        <div className="topbar">
          <div className="topbar__inner">
            <div className="topbar__contacts">
              <a href={`mailto:${cmsString(data, "email", "example@domain.com")}`}><img src="/icons/mail.svg" alt="" />{cmsString(data, "email", "example@domain.com")}</a>
              <i />
              <a href={`tel:${cmsString(data, "phone", "+12 (123) 456 78900").replace(/[^+\d]/g, "")}`}><img src="/icons/phone.svg" alt="" />{cmsString(data, "phone", "+12 (123) 456 78900")}</a>
            </div>
            <nav className="topbar__nav">
              {configuredTopLinks.map((item, index) => <Fragment key={`${cmsString(item, "label")}-${index}`}><a href={cmsString(item, "url", "#")}>{cmsString(item, "label")}</a><i /></Fragment>)}
              <div className="header-select">
                <button type="button" onClick={() => setOpenDropdown(openDropdown === "currency" ? null : "currency")}>{currency}<img src="/icons/chevron.svg" alt="" /></button>
                {openDropdown === "currency" && (
                  <div className="header-dropdown header-dropdown--small">
                    {(currencies.length ? currencies : ["USD", "EUR", "UAH"]).map((item) => <button type="button" key={item} onClick={() => { setCurrency(item); setOpenDropdown(null); }}>{item}</button>)}
                  </div>
                )}
              </div><i />
              <div className="header-select">
                <button type="button" onClick={() => setOpenDropdown(openDropdown === "language" ? null : "language")}>{currentLanguage?.label ?? "UA"}<img src="/icons/chevron.svg" alt="" /></button>
                {openDropdown === "language" && (
                  <div className="header-dropdown header-dropdown--small">
                    {languageOptions.map((item) => <button type="button" key={item.code} onClick={() => { setLanguage(item.code); onLocaleChange?.(item.code); setOpenDropdown(null); }}>{item.label}</button>)}
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
        <div className="navbar">
          <a className="brand" href={links.home} aria-label="GreenCom — головна"><img src={logo} alt="GreenCom" /></a>
          <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`}>
            {mainNavItems.slice(0, 1).map((item, index) => <a className={active === "home" ? "is-active" : ""} href={cmsString(item, "url", "#")} onClick={closeMenu} key={`${cmsString(item, "label")}-${index}`}>{cmsString(item, "label")}</a>)}
            <div className="nav-item">
              <button type="button" onClick={() => setOpenDropdown(openDropdown === "services" ? null : "services")}>Послуги<img src="/icons/chevron.svg" alt="" /></button>
              {openDropdown === "services" && <div className="header-dropdown">{configuredNavItems.filter((item) => cmsString(item, "group") === "services").map((item, index) => <a href={cmsString(item, "url", links.services)} onClick={closeMenu} key={`${cmsString(item, "label")}-${index}`}>{cmsString(item, "label")}</a>)}</div>}
            </div>
            {mainNavItems.slice(1).map((item, index) => <a className={active === "contact" && cmsString(item, "label").toLowerCase().includes("конт") ? "is-active" : ""} href={cmsString(item, "url", "#")} onClick={closeMenu} key={`${cmsString(item, "label")}-${index}`}>{cmsString(item, "label")}</a>)}
            <div className="nav-item">
              <button type="button" onClick={() => setOpenDropdown(openDropdown === "equipment" ? null : "equipment")}>Обладнання<img src="/icons/chevron.svg" alt="" /></button>
              {openDropdown === "equipment" && <div className="header-dropdown">{configuredNavItems.filter((item) => cmsString(item, "group") === "equipment").map((item, index) => <a href={cmsString(item, "url", links.services)} onClick={closeMenu} key={`${cmsString(item, "label")}-${index}`}>{cmsString(item, "label")}</a>)}</div>}
            </div>
          </nav>
          <div className="navbar__actions">
            <button className="search-trigger" type="button" onClick={() => setSearchOpen(true)}><img src="/icons/search.svg" alt="" /><span>{cmsString(data, "search_label", "пошук")}</span></button>
            <button className="login-trigger" type="button" onClick={() => setLoginOpen(true)}><img src="/icons/user.svg?v=2" alt="" /><span>{cmsString(data, "login_label", "Вхід")}</span></button>
            <button className="cart-trigger" type="button" onClick={() => setCartOpen(true)}><span className="cart-trigger__icon"><img src="/icons/cart-badge.svg" alt="" /><b>99</b></span><span>{cmsString(data, "cart_label", "12 450₴")}</span></button>
            <button className={`menu-trigger ${menuOpen ? "is-open" : ""}`} type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Закрити меню" : "Відкрити меню"}><span /><span /><span /></button>
          </div>
        </div>
      </header>

      {searchOpen && <div className="overlay" role="dialog" aria-modal="true" aria-label="Пошук"><button className="overlay__close" type="button" onClick={() => setSearchOpen(false)} aria-label="Закрити">×</button><form className="search-panel" onSubmit={(event) => { event.preventDefault(); setSearchOpen(false); }}><img src="/icons/search.svg" alt="" /><input autoFocus placeholder="Що ви шукаєте?" /><button className="button">Знайти</button></form></div>}
      {loginOpen && <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="login-title"><div className="modal"><button className="overlay__close" type="button" onClick={() => setLoginOpen(false)} aria-label="Закрити">×</button><img src={logo} alt="GreenCom" /><h2 id="login-title">Вхід до кабінету</h2><label>Email<input type="email" placeholder="name@email.com" /></label><label>Пароль<input type="password" placeholder="••••••••" /></label><button className="button" type="button" onClick={() => setLoginOpen(false)}>Увійти</button><a href="#">Забули пароль?</a></div></div>}
      {cartOpen && <><button className="drawer-backdrop" type="button" onClick={() => setCartOpen(false)} aria-label="Закрити кошик" /><aside className="drawer"><div className="drawer__head"><h2>Кошик</h2><button type="button" onClick={() => setCartOpen(false)} aria-label="Закрити">×</button></div><div className="drawer__item"><img src="/retail-tech.jpg" alt="" /><div><b>Торгове обладнання</b><span>1 × 12 450₴</span></div></div><div className="drawer__total"><span>Разом</span><b>12 450₴</b></div><button className="button" type="button">Оформити замовлення</button></aside></>}
    </>
  );
}

export function ContactFormPanel({ className = "", data = {} }: { className?: string; data?: CmsData }) {
  const [contactSent, setContactSent] = useState(false);
  const configuredFields = cmsItems(data, "form_fields");
  const fields = configuredFields.length ? configuredFields : [
    { name: "name", label: "Ім’я та прізвище", placeholder: "Іван Іванов", type: "text", required: true },
    { name: "email", label: "Електронна пошта", placeholder: "Email", type: "email", required: true },
    { name: "phone", label: "Номер телефону", placeholder: "+12 (123) 456 78900", type: "tel", required: false },
    { name: "subject", label: "Тема звернення", placeholder: "Введіть назву", type: "select", options: "Консультація, Обладнання, Послуги ІТС", required: false },
    { name: "message", label: "Ваше повідомлення", placeholder: "Напишіть ваше повідомлення", type: "textarea", required: true },
  ];
  const iconFor = (type: string) => ({ email: "/assets/form-email.svg", tel: "/assets/form-phone.svg", select: "/assets/form-chevron.svg" }[type] ?? "/assets/form-user.svg");

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setContactSent(true);
  }

  return (
    <form className={`contact-form ${className}`} onSubmit={submitContact}>
      <div className="contact-form__grid">
        {fields.filter((field) => cmsString(field, "type") !== "textarea").map((field, index) => {
          const type = cmsString(field, "type", "text");
          const options = cmsString(field, "options").split(",").map((item) => item.trim()).filter(Boolean);
          return <label key={`${cmsString(field, "name")}-${index}`}>{cmsString(field, "label")}<span>{type === "select" ? <select name={cmsString(field, "name")} required={field.required === true} defaultValue=""><option value="" disabled>{cmsString(field, "placeholder")}</option>{options.map((option) => <option key={option}>{option}</option>)}</select> : <input name={cmsString(field, "name")} type={type} required={field.required === true} placeholder={cmsString(field, "placeholder")} />}<img src={iconFor(type)} alt="" /></span></label>;
        })}
      </div>
      {fields.filter((field) => cmsString(field, "type") === "textarea").map((field, index) => <label className="contact-form__message" key={`${cmsString(field, "name")}-${index}`}>{cmsString(field, "label")}<textarea name={cmsString(field, "name")} required={field.required === true} placeholder={cmsString(field, "placeholder")} /></label>)}
      <label className="consent"><Check defaultChecked />{cmsString(data, "form_consent", "Відправивши це повідомлення Ви приймаєте політику конфіденційності")}</label>
      <button className="button" type="submit">{contactSent ? cmsString(data, "form_success_label", "Надіслано ✓") : cmsString(data, "form_button_label", "Відправити")}</button>
    </form>
  );
}

export function NewsletterSection({ className = "", data = {} }: { className?: string; data?: CmsData }) {
  const [subscribed, setSubscribed] = useState(false);

  function submitNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribed(true);
  }

  return (
    <section className={`newsletter ${className}`} id="newsletter">
      <img className="newsletter__decor newsletter__decor--left" src={cmsImage(data, "left_image", "left_image_url", "/assets/newsletter-left.png")} alt="" />
      <img className="newsletter__decor newsletter__decor--right" src={cmsImage(data, "right_image", "right_image_url", "/assets/newsletter-right.png")} alt="" />
      <div className="newsletter__content"><h2>{cmsString(data, "title", "Підпишіться на нашу розсилку")}</h2><p>{cmsString(data, "text", "Отримуйте новини, оновлення та корисні рішення для автоматизації бізнесу прямо на вашу електронну пошту.")}</p></div>
      <form className="newsletter__form" onSubmit={submitNewsletter}>
        <div><input type="email" required placeholder={cmsString(data, "email_placeholder", "Email")} aria-label="Email для розсилки" /><button type="submit">{subscribed ? "Готово ✓" : cmsString(data, "button_label", "Підписатися")} <span>›</span></button></div>
        <label className="consent"><Check defaultChecked />{cmsString(data, "consent", "підписуючись. Ви приймаєте політику конфіденційності")}</label>
      </form>
    </section>
  );
}

export function SiteFooter({ links, className = "", data = {} }: { links: SiteLinks; className?: string; data?: CmsData }) {
  const information = [
    ["Про компанію", links.about],
    ["Контакти", links.contact],
    ["Ціни", links.price],
    ["Партнери", links.partners],
    ["Вакансії", links.news],
    ["FAQ", links.news],
  ];
  const services = ["Програмне забезпечення", "Торгове обладнання", "Послуги ІТС", "Витратні матеріали"];
  const configuredColumns = cmsItems(data, "columns");
  const columns = configuredColumns.length ? configuredColumns : [
    { title: "Інформація", links: information.map(([label, url]) => ({ label, url })) },
    { title: "Підтримка", links: information.map(([label, url]) => ({ label, url })) },
    { title: "Сервіси", links: services.map((label) => ({ label, url: links.services })) },
  ];
  const socials = cmsItems(data, "socials");

  return (
    <footer className={`footer section-bg section-bg--circuits ${className}`} id="footer">
      <div className="footer__main">
        <div className="footer__brand">
          <img src={cmsImage(data, "logo", "logo_url", "/icons/logo.png")} alt="GreenCom" />
          <i />
          <div className="footer__contact"><span><img src="/icons/footer-mail.svg" alt="" /></span><p><b>{cmsString(data, "contact_title", "Контактна інформація")}</b><a href={`mailto:${cmsString(data, "email", "office@greencom.od.ua")}`}>{cmsString(data, "email", "office@greencom.od.ua")}</a><a href={`tel:${cmsString(data, "phone", "+12 (123) 456 78900").replace(/[^+\d]/g, "")}`}>{cmsString(data, "phone", "+12 (123) 456 78900")}</a></p></div>
          <i />
          <div className="footer__contact"><span><span className="location-icon"><img src="/icons/location-outer.svg" alt="" /><img src="/icons/location-inner.svg" alt="" /></span></span><p><b>{cmsString(data, "address_title", "Адреса")}</b><em>{cmsString(data, "address", "Одеська обл., м. Біляївка, вул. Тіниста, 42а")}</em></p></div>
        </div>
        <nav className="footer__nav">
          {columns.map((column, index) => <div key={`${cmsString(column, "title")}-${index}`}><h3>{cmsString(column, "title")}</h3>{cmsItems(column, "links").map((link, linkIndex) => <a href={cmsString(link, "url", "#")} key={`${cmsString(link, "label")}-${linkIndex}`}>{cmsString(link, "label")}</a>)}</div>)}
        </nav>
      </div>
      <div className="footer__bottom"><span>{cmsString(data, "copyright", "© 2026. All rights reserved")}</span><div>{(socials.length ? socials : [{ label: "Instagram", url: "#", icon_url: "/icons/instagram.svg" }]).map((social, index) => <a href={cmsString(social, "url", "#")} aria-label={cmsString(social, "label", "Соціальна мережа")} key={`${cmsString(social, "label")}-${index}`}><img src={cmsImage(social, "icon", "icon_url", "/icons/instagram.svg")} alt="" /></a>)}</div></div>
    </footer>
  );
}

export function BackToTop({ className = "" }: { className?: string }) {
  return <button className={`back-to-top ${className}`} type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Повернутися нагору">↑</button>;
}
