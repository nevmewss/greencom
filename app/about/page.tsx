"use client";

import { useRef, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
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
} from "../components/site";

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
  const teamSwiper = useRef<SwiperInstance | null>(null);
  const [teamNavigation, setTeamNavigation] = useState({ isBeginning: true, isEnd: false });

  function syncTeamNavigation(swiper: SwiperInstance) {
    setTeamNavigation({ isBeginning: swiper.isBeginning, isEnd: swiper.isEnd });
  }

  const aboutLinks: SiteLinks = {
    home: "../",
    about: "#top",
    services: "../#services",
    news: "../#news",
    contact: "#contact",
    partners: "#partners",
  };

  return (
    <main className="about-page">
      <SiteHeader links={aboutLinks} />

      <PageHero variant="image" className="about-hero" id="top">
        <picture className="about-hero__media">
          <source media="(min-width: 1295px)" srcSet="/assets/about-hero.png" />
          <source media="(min-width: 601px)" srcSet="/assets/about-hero-tablet.png" />
          <img src="/assets/about-hero-mobile.png" alt="Сучасний офіс GreenCom із серверним обладнанням" />
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
      </PageHero>

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

      <PartnersSection />

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
      <SiteFooter links={aboutLinks} />
      <BackToTop />
    </main>
  );
}
