"use client";

import { FormEvent, useState } from "react";

const services = [
  { tag: "Послуги", title: "Програмне забезпечення", text: "Комплексні рішення для обліку, продажів та автоматизації процесів." },
  { tag: "Послуги", title: "Інтеграція систем", text: "Поєднуємо сервіси й дані в єдину керовану екосистему." },
  { tag: "Обладнання", title: "Торгове обладнання", text: "Надійне оснащення для сучасного бізнесу.", image: "/assets/service-chip.png" },
  { tag: "Обладнання", title: "Касові рішення", text: "Швидка робота персоналу та прозора аналітика.", image: "/assets/service-chip.png" },
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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("UA");

  function submit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main>
      <div className="topbar">
        <div className="container topbar__inner">
          <a className="contactLink" href="mailto:example@domain.com"><img src="/icons/mail.svg" alt="" />example@domain.com</a><span>│</span>
          <a className="contactLink" href="tel:+1212345678900"><img src="/icons/phone.svg" alt="" />+12 (123) 456 78900</a>
          <nav>
            <a href="#about">Про компанію</a><a href="#partners">Партнери</a><a href="#news">Вакансії</a><a href="#news">База знань</a>
            <div className="compactDropdown">
              <button onClick={() => setOpenDropdown(openDropdown === "currency" ? null : "currency")} aria-expanded={openDropdown === "currency"}>{currency}<img src="/icons/chevron.svg" alt="" /></button>
              {openDropdown === "currency" && <div className="dropdown dropdown--compact">{["USD","EUR","UAH"].map(x=><button key={x} onClick={() => {setCurrency(x);setOpenDropdown(null)}}>{x}</button>)}</div>}
            </div>
            <div className="compactDropdown">
              <button onClick={() => setOpenDropdown(openDropdown === "language" ? null : "language")} aria-expanded={openDropdown === "language"}>{language}<img src="/icons/chevron.svg" alt="" /></button>
              {openDropdown === "language" && <div className="dropdown dropdown--compact">{["UA","EN","PL"].map(x=><button key={x} onClick={() => {setLanguage(x);setOpenDropdown(null)}}>{x}</button>)}</div>}
            </div>
          </nav>
        </div>
      </div>

      <header className="header">
        <div className="container nav">
          <a className="logo" href="#" aria-label="GreenCom — на головну"><img src="/icons/logo.png" alt="GreenCom" /></a>
          <button className="menuButton" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? "Закрити меню" : "Відкрити меню"}><span></span><span></span><span></span></button>
          <nav className={menuOpen ? "mainNav open" : "mainNav"}>
            <a className="active" href="#" onClick={() => setMenuOpen(false)}>Головна</a>
            <div className="navDropdown">
              <button onClick={() => setOpenDropdown(openDropdown === "services" ? null : "services")} aria-expanded={openDropdown === "services"}>Послуги<img src="/icons/chevron.svg" alt="" /></button>
              {openDropdown === "services" && <div className="dropdown"><a href="#services">Програмне забезпечення</a><a href="#services">Інтеграція систем</a><a href="#services">Послуги ІТС</a></div>}
            </div>
            <div className="navDropdown">
              <button onClick={() => setOpenDropdown(openDropdown === "equipment" ? null : "equipment")} aria-expanded={openDropdown === "equipment"}>Обладнання<img src="/icons/chevron.svg" alt="" /></button>
              {openDropdown === "equipment" && <div className="dropdown"><a href="#services">Торгове обладнання</a><a href="#services">Касові рішення</a><a href="#services">Витратні матеріали</a></div>}
            </div>
            <a href="#news">Кейси</a><a href="#contact">Контакти</a><a href="#services">Ціни</a>
          </nav>
          <div className="actions">
            <button className="searchButton" onClick={() => setSearchOpen(true)}><img src="/icons/search.svg" alt="" />пошук</button>
            <button className="light" onClick={() => setLoginOpen(true)}><img src="/icons/user.svg" alt="" />Вхід</button>
            <button className="cartButton" onClick={() => setCartOpen(true)}><span><img src="/icons/cart.svg" alt="" /><b>99</b></span>12 450₴</button>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__copy">
            <span className="pill">Технологічні рішення для розвитку бізнесу</span>
            <h1>Індивідуальні РІШЕННЯ<br /><strong>АВТОМАТИЗАЦІЇ</strong><br />бізнесу</h1>
            <div className="buttonRow"><a className="btn" href="#services">Дізнатися більше</a><a className="btn btn--ghost" href="#contact">Консультація</a></div>
            <div className="stats"><div><b>50+</b><small>Рішень для автоматизації<br />розвитку бізнесу</small></div><div><span className="avatarGroup"><i></i><i></i><i></i><i></i><em>+</em></span><b>1000+</b><small>Задоволених клієнтів</small></div></div>
          </div>
          <picture><source media="(max-width: 600px)" srcSet="/assets/hero-main-alt.png" /><img className="hero__image" src="/assets/hero-main.png" alt="Цифровий лист над мікросхемою" /></picture>
          <div className="heroCard"><b>АВТОМАТИЗАЦІЯ<br />бізнес-процесів</b><p>Налаштовуємо сучасні системи для ефективної роботи підприємств.</p><a href="#services">Детальніше</a></div>
          <div className="heroDots" aria-label="Слайди"><button className="active" aria-label="Слайд 1"></button><button aria-label="Слайд 2"></button><button aria-label="Слайд 3"></button></div>
        </div>
      </section>

      <section className="section benefits" id="about">
        <div className="container">
          <div className="sectionHead"><div><span className="eyebrow">Переваги</span><h2>Чому обирають Нас<br />Якість, Якій<br />Довіряють</h2><a className="btn btn--outline" href="#contact">Дізнатися більше</a></div></div>
          <div className="benefitGrid">{["Досвідчені фахівці","Індивідуальні рішення","Надійна підтримка","Безпека даних","Стабільний результат"].map((x,i)=><article key={x} className={`glass benefit b${i}`}><span className="benefitIcon">✦</span><h3>{x}</h3><p>Будуємо рішення навколо завдань вашого бізнесу та супроводжуємо на кожному етапі.</p></article>)}</div>
        </div>
      </section>

      <section className="section" id="services">
        <div className="container"><span className="eyebrow">Наші пропозиції</span><h2>Пропонуємо Найкращі<br />Рішення Автоматизації Бізнесу</h2>
          <div className="serviceBadge"><span>♡</span><small>РЕКОМЕНДОВАНІ РІШЕННЯ · ТОП РІШЕННЯ ·</small></div>
          <div className="serviceGrid">{services.map((s,i)=><article className={`serviceCard ${s.image ? "withImage" : ""}`} key={i}>{s.image && <img src={s.image} alt="" />}<div><span className="tag">{s.tag}</span><h3>{s.title}</h3><p>{s.text}</p><a className="miniBtn" href="#contact">Дізнатися більше <Arrow /></a></div></article>)}</div>
          <div className="serviceArrows" aria-hidden="true">←　→</div>
        </div>
      </section>

      <section className="section aboutDetail" id="about-detail">
        <div className="container split">
          <div className="photoCard"><img src="/developer-tech.jpg" alt="Фахівець працює з цифровими системами" /><span><b>120k+</b> Задоволених клієнтів</span></div>
          <div><span className="eyebrow">Про нас</span><h2>Розкрийте Потенціал<br />Бізнесу Інноваційними<br />Рішеннями Автоматизації</h2><p>Трансформуйте свій бізнес за допомогою наших інноваційних ІТ-рішень, створених для вирішення ваших унікальних викликів.</p>
            <ul className="checks"><li>Індивідуальні рішення для кожного бізнесу</li><li>Покращена безпека та захист даних</li><li>Швидке впровадження</li><li>Професійна підтримка</li></ul>
            <div className="experience"><b>25</b><span>Років<br />досвіду</span><a className="callUs" href="tel:+1212345678900"><img src="/icons/phone.svg" alt="" /><small>Зателефонуйте нам</small><strong>+12 (123) 456 78900</strong></a><a className="btn" href="#contact">Дізнатися більше</a></div>
          </div>
        </div>
      </section>

      <section className="section partners" id="partners"><div className="container split"><div><span className="eyebrow">Наші партнери</span><h2>Компанії Які<br />Довіряють Нам</h2><a className="btn" href="#contact">Дізнатися більше</a></div><div className="logoCloud">{["▯ NATIONAL GEOGRAPHIC","Walmart ✣","✣ slack","in LinkedIn","▯ NATIONAL GEOGRAPHIC","▯ NATIONAL GEOGRAPHIC","▯ NATIONAL GEOGRAPHIC"].map((x,i)=><div key={i}><span>{x}</span></div>)}</div></div></section>

      <section className="section news" id="news"><div className="container newsLayout"><div className="newsLead"><span className="eyebrow">Новини</span><h2>Ділимося Останніми<br />Новинами у Сфері<br />Автоматизації</h2><a className="btn allNews" href="#">Всі новини</a><article><img src={news[0].image} alt="" /><div className="articleMeta"><span className="authorAvatar">JC</span><small>Jane Cooper<br />26.04.2026</small><em>Категорія</em><b>⋮</b></div><h3>{news[0].title}</h3><p>Перемога в цифровій гонці: практичні рішення для трансформації компанії.</p><a className="miniBtn" href="#">Дізнатися більше</a></article></div><div className="newsStack">{[news[2],news[1],news[2]].map((n,i)=><article key={i}><img src={n.image} alt="" /><div><div className="articleMeta"><span className="authorAvatar">JC</span><small>Jane Cooper<br />26.04.2026</small><em>Категорія</em><b>⋮</b></div><h3>{n.title}</h3><p>Перемога в цифровій гонці: дорожня карта цифрової трансформації компанії.</p><a className="miniBtn" href="#">Дізнатися більше</a></div></article>)}</div></div></section>

      <section className="section contact" id="contact"><div className="container split"><div><span className="eyebrow">Контакти</span><h2>Зв’яжіться з Нами<br />Ми Завжди на Зв’язку</h2><p>Ми завжди готові допомогти. Оберіть зручний спосіб зв’язку.</p><div className="contactCards"><a href="mailto:office@greencom.od.ua"><img src="/icons/footer-mail.svg" alt="" /><b>Електронна пошта</b><span>office@greencom.od.ua</span></a><a href="tel:+1212345678900"><img src="/icons/footer-phone.svg" alt="" /><b>Телефон</b><span>+12 (123) 456 78900</span></a><a href="https://maps.google.com" target="_blank" rel="noreferrer"><img src="/icons/location.svg" alt="" /><b>Адреса</b><span>Одеська обл., м. Біляївка</span></a></div></div>
          <form onSubmit={submit}><div className="fieldGrid"><label>Ім’я та прізви<input required placeholder="Іван Іванов" /></label><label>Електронна пошта<input type="email" required placeholder="Email" /></label><label>Номер телефону<input placeholder="+12 (123) 456 78900" /></label><label>Тема звернення<input placeholder="Введіть назву" /></label></div><label>Ваше повідомлення<textarea required placeholder="Напишіть ваше повідомлення" /></label><label className="consent"><input type="checkbox" required /> Я погоджуюсь на обробку персональних даних</label><button className="btn" type="submit">{sent ? "Надіслано ✓" : "Відправити"}</button></form>
        </div></section>

      <section className="newsletter"><img className="newsletterDecor newsletterDecor--left" src="/assets/newsletter-left.png" alt="" /><img className="newsletterDecor newsletterDecor--right" src="/assets/newsletter-right.png" alt="" /><div className="container"><div><h2>Підпишіться на нашу<br />Розсилку</h2><p>Отримуйте новини, оновлення та корисні рішення.</p></div><form onSubmit={submit}><div className="subscribeRow"><input type="email" required placeholder="Email" aria-label="Email для розсилки" /><button>Підписатися <span>→</span></button></div><label className="consent"><input type="checkbox" required /> Я погоджуюсь з політикою конфіденційності</label></form></div></section>
      <footer><div className="container footerGrid"><div className="footerBrand"><a className="logo" href="#"><img src="/icons/logo.png" alt="GreenCom" /></a><p><img src="/icons/footer-mail.svg" alt="" />office@greencom.od.ua<br /><img src="/icons/footer-phone.svg" alt="" />+12 (123) 456 78900</p><p><img src="/icons/location.svg" alt="" />Одеська обл.,<br />м. Біляївка, вул. Тіниста, 42а</p></div>{[["Інформація","Про компанію","Контакти","Ціни","Партнери","FAQ"],["Підтримка","Про компанію","Контакти","Ціни","Вакансії","FAQ"],["Сервіси","Програмне забезпечення","Торгове обладнання","Послуги ІТС","Витратні матеріали"]].map(col=><div key={col[0]}><h4>{col[0]}</h4>{col.slice(1).map(x=><a key={x} href="#">{x}</a>)}</div>)}</div><div className="container copyright"><span>© 2026. All rights reserved</span><div className="socials"><a href="#" aria-label="Instagram"><img src="/icons/instagram.svg" alt="" /></a><a href="#" aria-label="Instagram 2"><img src="/icons/instagram.svg" alt="" /></a></div></div></footer>

      <button className="backTop" onClick={() => window.scrollTo({top:0,behavior:"smooth"})} aria-label="Повернутися нагору">↑</button>
      {searchOpen && <div className="overlay" role="dialog" aria-modal="true" aria-label="Пошук"><button className="overlayClose" onClick={() => setSearchOpen(false)} aria-label="Закрити">×</button><form className="searchPanel" onSubmit={(e) => {e.preventDefault();setSearchOpen(false)}}><img src="/icons/search.svg" alt="" /><input autoFocus placeholder="Що ви шукаєте?" aria-label="Пошуковий запит" /><button className="btn">Знайти</button></form></div>}
      {loginOpen && <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="login-title"><div className="modal"><button className="overlayClose" onClick={() => setLoginOpen(false)} aria-label="Закрити">×</button><img className="modalLogo" src="/icons/logo.png" alt="GreenCom" /><h2 id="login-title">Вхід до кабінету</h2><label>Email<input type="email" placeholder="name@email.com" /></label><label>Пароль<input type="password" placeholder="••••••••" /></label><button className="btn" onClick={() => setLoginOpen(false)}>Увійти</button><a href="#">Забули пароль?</a></div></div>}
      <aside className={cartOpen ? "drawer open" : "drawer"} aria-hidden={!cartOpen}><div className="drawerHead"><h2>Кошик</h2><button onClick={() => setCartOpen(false)} aria-label="Закрити">×</button></div><div className="cartItem"><img src="/retail-tech.jpg" alt="" /><div><b>Торгове обладнання</b><span>1 × 12 450₴</span></div></div><div className="drawerTotal"><span>Разом</span><b>12 450₴</b></div><button className="btn">Оформити замовлення</button></aside>
      {cartOpen && <button className="drawerBackdrop" aria-label="Закрити кошик" onClick={() => setCartOpen(false)}></button>}
    </main>
  );
}
