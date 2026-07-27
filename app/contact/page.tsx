"use client";

import { useState } from "react";
import {
  BackToTop,
  Button,
  ContactFormPanel,
  Eyebrow,
  NewsletterSection,
  SiteFooter,
  SiteHeader,
  type SiteLinks,
} from "../components/site";

const contactLinks: SiteLinks = {
  home: "../",
  about: "../about/",
  services: "../#services",
  news: "../#news",
  contact: "#top",
  partners: "../#partners",
};

const questions = Array.from({ length: 6 }, () => ({
  title: "Як отримати кредит?",
  answer: "Ми піклуємося про вашу безпеку: підтвердіть, що банківський рахунок належить вам. Ви можете зробити це, швидко перевіривши з нашим постачальником або переказавши символічну суму в 0,01 леїв.",
}));

function ContactMethod({
  icon,
  title,
  children,
  href,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a className="contact-office__method" href={href}>
      <span><img src={icon} alt="" /></span>
      <p><b>{title}</b><em>{children}</em></p>
    </a>
  );
}

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="contact-page">
      <SiteHeader links={contactLinks} />

      <section className="contact-page-hero" id="top">
        <img className="contact-page-hero__image" src="/assets/contact-hero.png" alt="" />
        <nav className="contact-page__breadcrumbs" aria-label="Навігаційний ланцюжок">
          <a href="../">Головна</a><i /><span>Контакти</span>
        </nav>
        <div className="contact-page-hero__copy">
          <h1>Контакти</h1>
          <p>Зв’яжіться з нами для консультації, підтримки або обговорення вашого проєкту. Ми завжди готові допомогти з автоматизацією, IT-рішеннями та технологіями для бізнесу.</p>
        </div>
      </section>

      <section className="contact-office">
        <div className="contact-office__panel">
          <img className="contact-office__photo" src="/assets/contact-office.png" alt="Головний офіс GreenCom" />
          <div className="contact-office__details">
            <Eyebrow>Контакти</Eyebrow>
            <h2>Головний офіс</h2>
            <div className="contact-office__methods">
              <ContactMethod icon="/assets/contact-location-outer.svg" title="Адреса" href="#map">Одеська обл., м. Біляївка, вул. Тіниста, 42а</ContactMethod>
              <ContactMethod icon="/assets/contact-email.svg" title="Електронна пошта" href="mailto:office@greencom.od.ua">office@greencom.od.ua</ContactMethod>
              <ContactMethod icon="/assets/contact-phone.svg" title="Телефон" href="tel:+1212345678900">+12 (123) 456 78900</ContactMethod>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-map" id="map">
        <div className="contact-map__panel">
          <img src="/assets/contact-map.png" alt="Мапа з розташуванням офісу GreenCom" />
          <span className="contact-map__marker" aria-hidden="true">
            <img src="/icons/location-outer.svg" alt="" />
            <img src="/icons/location-inner.svg" alt="" />
          </span>
          <span className="contact-map__address">Одеська обл., м. Біляївка,<br />вул. Тіниста, 42а</span>
        </div>
      </section>

      <section className="contact-faq" id="faq">
        <div className="contact-faq__intro">
          <Eyebrow>Часті запитання</Eyebrow>
          <h2><strong>Відповіді</strong> на важливі<br />питання для вашого бізнесу</h2>
          <p>Ми зібрали найпоширеніші запитання щодо автоматизації, програмного забезпечення, обладнання та IT-рішень, щоб допомогти вам швидко знайти необхідну інформацію.</p>
          <Button outline href="#contact-form">Запитати.</Button>
        </div>
        <div className="contact-faq__list">
          {questions.map((question, index) => {
            const isOpen = openFaq === index;
            return (
              <article className={isOpen ? "is-open" : ""} key={index}>
                <button type="button" onClick={() => setOpenFaq(isOpen ? -1 : index)} aria-expanded={isOpen}>
                  <span>{question.title}</span><i>{isOpen ? "−" : "+"}</i>
                </button>
                {isOpen && <p>{question.answer}</p>}
              </article>
            );
          })}
        </div>
      </section>

      <section className="contact-page-form" id="contact-form">
        <div className="contact-page-form__intro">
          <Eyebrow>Форма захвату</Eyebrow>
          <h2>Ми завжди на зв’язку</h2>
          <p>Ми завжди готові допомогти. Якщо у вас є запитання, потрібна консультація або ви хочете підібрати рішення для бізнесу — зв’яжіться з нами у зручний для вас спосіб.</p>
        </div>
        <ContactFormPanel className="contact-page-form__panel" />
      </section>

      <NewsletterSection className="contact-page__newsletter" />
      <SiteFooter links={contactLinks} className="contact-page__footer" />
      <BackToTop />
    </main>
  );
}
