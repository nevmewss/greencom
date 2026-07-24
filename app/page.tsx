"use client";

import { FormEvent, useState } from "react";

const services = [
  { tag: "Послуги", title: "Програмне забезпечення", text: "Комплексні рішення для обліку, продажів та автоматизації процесів." },
  { tag: "Послуги", title: "Інтеграція систем", text: "Поєднуємо сервіси й дані в єдину керовану екосистему." },
  { tag: "Обладнання", title: "Торгове обладнання", text: "Надійне оснащення для сучасного бізнесу.", image: "/retail-tech.jpg" },
  { tag: "Обладнання", title: "Касові рішення", text: "Швидка робота персоналу та прозора аналітика.", image: "/retail-tech.jpg" },
  { tag: "Послуги", title: "Послуги ІТС", text: "Супровід, консультації та своєчасні оновлення." },
  { tag: "Обладнання", title: "Витратні матеріали", text: "Усе необхідне для безперервної роботи." },
];

const news = [
  { image: "/retail-tech.jpg", title: "Посібник з цифрової трансформації 2026 року" },
  { image: "/developer-tech.jpg", title: "Як автоматизація допомагає бізнесу зростати" },
  { image: "/hero-leaf.png", title: "Екологічні технології та ефективні процеси" },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main>
      <div className="topbar">
        <div className="container topbar__inner">
          <span>✉ example@domain.com</span><span>│</span><span>☏ +12 (123) 456 78900</span>
          <nav><a href="#about">Про компанію</a><a href="#partners">Партнери</a><a href="#news">База знань</a><span>UA⌄</span></nav>
        </div>
      </div>

      <header className="header">
        <div className="container nav">
          <a className="logo" href="#"><i>✺</i>GreenCom</a>
          <button className="menuButton" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Відкрити меню">☰</button>
          <nav className={menuOpen ? "mainNav open" : "mainNav"}>
            <a className="active" href="#">Головна</a><a href="#services">Послуги</a><a href="#services">Обладнання</a>
            <a href="#news">Кейси</a><a href="#contact">Контакти</a><a href="#services">Ціни</a>
          </nav>
          <div className="actions"><button>⌕ пошук</button><button className="light">♙ Вхід</button><button>🛒 12 450₴</button></div>
        </div>
      </header>

      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__copy">
            <span className="pill">Технологічні рішення для розвитку бізнесу</span>
            <h1>Індивідуальні РІШЕННЯ<br /><strong>АВТОМАТИЗАЦІЇ</strong><br />бізнесу</h1>
            <div className="buttonRow"><a className="btn" href="#services">Дізнатися більше</a><a className="btn btn--ghost" href="#contact">Консультація</a></div>
            <div className="stats"><div><b>50+</b><small>Рішень для автоматизації</small></div><div><b>1000+</b><small>Задоволених клієнтів</small></div></div>
          </div>
          <img className="hero__image" src="/hero-leaf.png" alt="Цифровий лист над мікросхемою" />
          <div className="heroCard"><b>АВТОМАТИЗАЦІЯ<br />бізнес-процесів</b><p>Налаштовуємо сучасні системи для ефективної роботи підприємств.</p><a href="#services">Детальніше</a></div>
        </div>
      </section>

      <section className="section benefits" id="about">
        <div className="container">
          <div className="sectionHead"><div><span className="eyebrow">Переваги</span><h2>Чому обирають Нас<br />Якість, Якій<br />Довіряють</h2><a className="btn btn--outline" href="#contact">Дізнатися більше</a></div></div>
          <div className="benefitGrid">{["Досвідчені фахівці","Індивідуальні рішення","Надійна підтримка","Безпека даних"].map((x,i)=><article key={x} className={`glass benefit b${i}`}><span>✺</span><h3>{x}</h3><p>Будуємо рішення навколо завдань вашого бізнесу та супроводжуємо на кожному етапі.</p></article>)}</div>
        </div>
      </section>

      <section className="section" id="services">
        <div className="container"><span className="eyebrow">Наші пропозиції</span><h2>Пропонуємо Найкращі<br />Рішення Автоматизації Бізнесу</h2>
          <div className="serviceGrid">{services.map((s,i)=><article className={`serviceCard ${s.image ? "withImage" : ""}`} key={i}>{s.image && <img src={s.image} alt="" />}<div><span className="tag">{s.tag}</span><h3>{s.title}</h3><p>{s.text}</p><a className="miniBtn" href="#contact">Дізнатися більше <Arrow /></a></div></article>)}</div>
        </div>
      </section>

      <section className="section aboutDetail">
        <div className="container split">
          <div className="photoCard"><img src="/developer-tech.jpg" alt="Фахівець працює з цифровими системами" /><span><b>120k+</b> Задоволених клієнтів</span></div>
          <div><span className="eyebrow">Про нас</span><h2>Розкрийте Потенціал Бізнесу Інноваційними Рішеннями Автоматизації</h2><p>Трансформуйте свій бізнес за допомогою наших інноваційних ІТ-рішень, створених для вирішення ваших унікальних викликів.</p>
            <ul className="checks"><li>Індивідуальні рішення для кожного бізнесу</li><li>Покращена безпека та захист даних</li><li>Швидке впровадження</li><li>Професійна підтримка</li></ul>
            <div className="experience"><b>25</b><span>Років<br />досвіду</span><a className="btn" href="#contact">Дізнатися більше</a></div>
          </div>
        </div>
      </section>

      <section className="section partners" id="partners"><div className="container split"><div><span className="eyebrow">Наші партнери</span><h2>Компанії Які<br />Довіряють Нам</h2><a className="btn" href="#contact">Дізнатися більше</a></div><div className="logoCloud">{["NATIONAL GEOGRAPHIC","Walmart ✣","slack","LinkedIn","NATIONAL GEOGRAPHIC"].map((x,i)=><div key={i}>{x}</div>)}</div></div></section>

      <section className="section news" id="news"><div className="container"><span className="eyebrow">Новини</span><h2>Ділимося Останніми<br />Новинами у Сфері<br />Автоматизації</h2><div className="newsGrid">{news.map((n,i)=><article key={i}><img src={n.image} alt="" /><small>Jane Cooper · 26.04.2026</small><h3>{n.title}</h3><p>Перемога в цифровій гонці: практичні рішення для трансформації компанії.</p><a className="miniBtn" href="#">Дізнатися більше</a></article>)}</div></div></section>

      <section className="section contact" id="contact"><div className="container split"><div><span className="eyebrow">Контакти</span><h2>Зв’яжіться з Нами<br />Ми Завжди на Зв’язку</h2><p>Ми завжди готові допомогти. Оберіть зручний спосіб зв’язку.</p><div className="contactCards"><div>✉ <b>Електронна пошта</b><span>office@greencom.od.ua</span></div><div>☏ <b>Телефон</b><span>+12 (123) 456 78900</span></div><div>⌖ <b>Адреса</b><span>Одеська обл., м. Біляївка</span></div></div></div>
          <form onSubmit={submit}><div className="fieldGrid"><label>Ім’я та прізви<input required placeholder="Іван Іванов" /></label><label>Електронна пошта<input type="email" required placeholder="Email" /></label><label>Номер телефону<input placeholder="+12 (123) 456 78900" /></label><label>Тема звернення<input placeholder="Введіть назву" /></label></div><label>Ваше повідомлення<textarea required placeholder="Напишіть ваше повідомлення" /></label><button className="btn" type="submit">{sent ? "Надіслано ✓" : "Відправити"}</button></form>
        </div></section>

      <section className="newsletter"><div className="container"><div><h2>Підпишіться на нашу<br />Розсилку</h2><p>Отримуйте новини, оновлення та корисні рішення.</p></div><form onSubmit={submit}><input type="email" required placeholder="Email" /><button>Підписатися →</button></form></div></section>
      <footer><div className="container footerGrid"><div className="footerBrand"><a className="logo" href="#"><i>✺</i>GreenCom</a><p>office@greencom.od.ua<br />+12 (123) 456 78900</p><p>Одеська обл.,<br />м. Біляївка, вул. Тіниста, 42а</p></div>{[["Інформація","Про компанію","Контакти","Ціни","Партнери","FAQ"],["Підтримка","Про компанію","Контакти","Ціни","Вакансії","FAQ"],["Сервіси","Програмне забезпечення","Торгове обладнання","Послуги ІТС","Витратні матеріали"]].map(col=><div key={col[0]}><h4>{col[0]}</h4>{col.slice(1).map(x=><a key={x} href="#">{x}</a>)}</div>)}</div><div className="container copyright">© 2026. All rights reserved</div></footer>
    </main>
  );
}
