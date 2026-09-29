"use client";

import { FormEvent, ReactNode, useMemo, useState } from "react";
import { BackToTop, Button, NewsletterSection, SiteFooter, SiteHeader, SiteLinks } from "./site";
import styles from "./editorial-pages.module.css";

export type EditorialPageKind = "news" | "article" | "faq" | "partners" | "cases" | "case" | "vacancies" | "vacancy";

const links: SiteLinks = {
  home: "/",
  about: "/about/",
  services: "/catalog/",
  price: "/price/",
  news: "/news/",
  contact: "/contact/",
  partners: "/partners/",
};

const headerData = {
  top_links: [
    { label: "Про компанію", url: "/about/" },
    { label: "Партнери", url: "/partners/" },
    { label: "Вакансії", url: "/vacancies/" },
    { label: "База знань", url: "/faq/" },
  ],
  nav_items: [
    { label: "Головна", url: "/", children: [] },
    { label: "Послуги", url: "", children: [{ label: "Програмне забезпечення", url: "/catalog/" }, { label: "Системна інтеграція", url: "/catalog/" }, { label: "Послуги ІТС", url: "/catalog/" }] },
    { label: "Кейси", url: "/cases/", children: [] },
    { label: "Контакти", url: "/contact/", children: [] },
    { label: "Ціни", url: "/price/", children: [] },
    { label: "Обладнання", url: "", children: [{ label: "Торгове обладнання", url: "/catalog/" }, { label: "Касові рішення", url: "/catalog/" }, { label: "Витратні матеріали", url: "/catalog/" }] },
  ],
};

const news = [
  ["Цифрова трансформація", "Посібник з цифрової трансформації 2026 року", "/retail-tech.jpg"],
  ["Автоматизація", "Як автоматизація змінює роздрібну торгівлю", "/developer-tech.jpg"],
  ["Обладнання", "П’ять технологій для швидкої роботи каси", "/assets/contact-office.png"],
  ["Бізнес", "Єдина система обліку: від складу до аналітики", "/assets/about-history.png"],
  ["Безпека", "Як захистити дані компанії у 2026 році", "/assets/news-leaf.png"],
  ["Інтеграції", "Поєднуємо сервіси без зупинки бізнесу", "/assets/contact-map.png"],
  ["Поради", "Що врахувати перед оновленням IT-систем", "/assets/about-streams.png"],
  ["Команда", "Технології, люди та процеси в одному ритмі", "/assets/about-team.png"],
  ["Аналітика", "Дані, які допомагають приймати рішення", "/assets/about-hero.png"],
] as const;

const cases = [
  ["Retail", "Автоматизація мережі магазинів", "Єдина система продажів, складу й аналітики для 24 торгових точок.", "/retail-tech.jpg"],
  ["HoReCa", "Цифрова екосистема ресторану", "Каса, кухня, доставка та програма лояльності в одному рішенні.", "/assets/contact-office.png"],
  ["Дистрибуція", "Прозорий облік великого складу", "Контроль залишків і відвантажень у реальному часі.", "/developer-tech.jpg"],
  ["Сервіс", "CRM для сервісної компанії", "Швидша обробка звернень і контроль якості на кожному етапі.", "/assets/about-team.png"],
  ["E-commerce", "Синхронізація онлайн та офлайн", "Актуальні ціни й залишки в усіх каналах продажу.", "/assets/about-history.png"],
  ["Виробництво", "Аналітика виробничих процесів", "Зрозумілі показники, менше простоїв, точніше планування.", "/assets/contact-map.png"],
] as const;

const vacancies = [
  ["Project manager", "Одеса / гібрид", "Повна зайнятість"],
  ["Business analyst", "Віддалено", "Повна зайнятість"],
  ["Front-end developer", "Одеса / віддалено", "Повна зайнятість"],
  ["Technical support specialist", "Одеса", "Позмінно"],
  ["Sales manager B2B", "Київ / гібрид", "Повна зайнятість"],
] as const;

const partners = ["natgeo", "walmart", "slack", "linkedin", "walmart", "natgeo", "linkedin", "slack", "natgeo", "walmart", "slack", "linkedin"];

const faq = [
  ["Які бізнес-процеси можна автоматизувати?", "Ми автоматизуємо продажі, склад, фінанси, взаємодію з клієнтами, аналітику та внутрішні операції. Рішення підбирається під реальні процеси вашої компанії."],
  ["Скільки часу займає впровадження?", "Термін залежить від масштабу проєкту. Базове рішення запускаємо за декілька тижнів, складні інтеграції реалізуємо поетапно без зупинки бізнесу."],
  ["Чи можна інтегрувати рішення з нашими системами?", "Так. Ми працюємо з обліковими системами, CRM, інтернет-магазинами, платіжними сервісами та API сторонніх продуктів."],
  ["Чи навчаєте ви співробітників?", "Проводимо навчання команди, готуємо інструкції та супроводжуємо користувачів після запуску."],
  ["Яку підтримку отримує клієнт?", "Команда GreenCom залишається на зв’язку, контролює стабільність систем і допомагає розвивати рішення разом із бізнесом."],
  ["Як дізнатися вартість проєкту?", "Залиште заявку на консультацію. Ми уточнимо задачі, запропонуємо архітектуру та підготуємо прозорий кошторис."],
] as const;

function Breadcrumbs({ current, parent, parentHref }: { current: string; parent?: string; parentHref?: string }) {
  return <nav className={styles.breadcrumbs} aria-label="Навігаційний ланцюжок"><a href={links.home}>Головна</a><i />{parent && <><a href={parentHref}>{parent}</a><i /></>}<span>{current}</span></nav>;
}

function Shell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <main className={`${styles.page} ${className}`}><SiteHeader links={links} data={headerData} variant="inner" active={null} />{children}<NewsletterSection className={styles.newsletter} /><SiteFooter links={links} /><BackToTop /></main>;
}

function Hero({ eyebrow, title, text, current, parent, parentHref, compact = false }: { eyebrow: string; title: ReactNode; text?: string; current: string; parent?: string; parentHref?: string; compact?: boolean }) {
  return <section className={`${styles.hero} ${compact ? styles.heroCompact : ""}`}><div className={styles.heroGlow} /><Breadcrumbs current={current} parent={parent} parentHref={parentHref} /><div className={styles.heroCopy}><span className={styles.eyebrow}>{eyebrow}</span><h1>{title}</h1>{text && <p>{text}</p>}</div><div className={styles.heroOrb}><span /><i /><b /></div></section>;
}

function Meta({ category = "Автоматизація" }: { category?: string }) {
  return <div className={styles.meta}><img src="/assets/news-avatar-exact.png" alt="" /><span><b>GreenCom</b><small>26.04.2026</small></span><em>{category}</em><img src="/assets/menu-dots-exact.svg" alt="" /></div>;
}

function NewsCard({ item, featured = false }: { item: typeof news[number]; featured?: boolean }) {
  return <article className={`${styles.newsCard} ${featured ? styles.newsFeatured : ""}`}><a className={styles.cardImage} href="/article/"><img src={item[2]} alt="" /></a><div className={styles.cardBody}><Meta category={item[0]} /><h2><a href="/article/">{item[1]}</a></h2><p>Практичний досвід, інструменти та рішення, що допомагають бізнесу працювати швидше й ефективніше.</p><Button outline className={styles.smallButton} href="/article/">Дізнатися більше</Button></div></article>;
}

function NewsPage() {
  const [category, setCategory] = useState("Усі");
  const visible = category === "Усі" ? news.slice(1) : news.slice(1).filter((item) => item[0] === category);
  const categories = ["Усі", ...new Set(news.map((item) => item[0]))];
  return <Shell><Hero eyebrow="Новини" title={<>Новини та <strong>корисні матеріали</strong></>} text="Технології, практичні поради й актуальні події у світі автоматизації бізнесу." current="Новини" /><section className={styles.newsLead}><div className={styles.sectionHeading}><span className={styles.eyebrow}>Останні новини</span><h2>Будьте в курсі <strong>головного</strong></h2></div><NewsCard item={news[0]} featured /></section><section className={styles.newsGridSection}><div className={styles.filters}>{categories.map((item) => <button className={category === item ? styles.active : ""} type="button" onClick={() => setCategory(item)} key={item}>{item}</button>)}</div><div className={styles.newsGrid}>{visible.map((item) => <NewsCard item={item} key={item[1]} />)}</div></section></Shell>;
}

function ArticlePage() {
  return <Shell><Hero eyebrow="Новини" title={<>Посібник з цифрової<br /><strong>трансформації 2026 року</strong></>} current="Посібник з цифрової трансформації" parent="Новини" parentHref="/news/" compact /><article className={styles.article}><img className={styles.articleCover} src="/retail-tech.jpg" alt="Цифрові системи керування бізнесом" /><div className={styles.articleLayout}><div className={styles.articleContent}><Meta category="Цифрова трансформація" /><p className={styles.lead}>Цифрова трансформація — це не одноразове впровадження технологій, а послідовна зміна процесів, культури та способу прийняття рішень.</p><h2>З чого почати трансформацію</h2><p>Спочатку важливо зафіксувати поточні процеси, знайти ручні операції та визначити показники, які мають змінитися. Технологія повинна вирішувати конкретну бізнес-задачу.</p><blockquote>Успішна автоматизація починається не з вибору програми, а з розуміння процесу та очікуваного результату.</blockquote><h2>Побудуйте дорожню карту</h2><p>Розділіть впровадження на короткі етапи. Почніть із ділянки, де результат можна швидко виміряти, зберіть зворотний зв’язок команди та масштабуйте рішення.</p><img src="/developer-tech.jpg" alt="Команда працює над цифровим проєктом" /><h2>Три принципи сталого результату</h2><ul><li>Єдині й достовірні дані для всіх підрозділів.</li><li>Зрозумілі ролі, процеси та відповідальність команди.</li><li>Регулярне вимірювання ефекту й розвиток системи.</li></ul><p>GreenCom допомагає пройти цей шлях: від аудиту й архітектури до навчання команди та підтримки після запуску.</p></div><aside className={styles.articleAside}><div><span className={styles.eyebrow}>Зміст</span><a href="#">З чого почати</a><a href="#">Дорожня карта</a><a href="#">Ключові принципи</a></div><div><h3>Потрібна консультація?</h3><p>Обговоримо задачу та запропонуємо наступний крок.</p><Button href="/contact/">Зв’язатися з нами</Button></div><div><h3>Схожі матеріали</h3>{news.slice(1, 4).map((item) => <a className={styles.related} href="/article/" key={item[1]}><img src={item[2]} alt="" /><span>{item[1]}</span></a>)}</div></aside></div></article></Shell>;
}

function FaqList() {
  return <div className={styles.faqList}>{faq.map(([question, answer], index) => <details open={index === 0} key={question}><summary><span>{String(index + 1).padStart(2, "0")}</span><b>{question}</b><i>+</i></summary><p>{answer}</p></details>)}</div>;
}

function FaqPage() {
  return <Shell><Hero eyebrow="FAQ" title={<>Відповіді на <strong>поширені питання</strong></>} text="Зібрали найважливіше про автоматизацію, впровадження та підтримку рішень GreenCom." current="FAQ" /><section className={styles.faqSection}><div className={styles.faqIntro}><span className={styles.eyebrow}>База знань</span><h2>Знайдіть відповідь<br /><strong>на своє питання</strong></h2><p>Не знайшли потрібної інформації? Напишіть нам — спеціаліст підготує відповідь саме для вашої ситуації.</p><Button href="/contact/">Поставити питання</Button></div><FaqList /></section></Shell>;
}

function PartnersPage() {
  return <Shell><Hero eyebrow="Партнери" title={<>Зростаємо разом із <strong>сильними партнерами</strong></>} text="Поєднуємо експертизу, технології та досвід, щоб створювати надійні рішення для бізнесу." current="Партнери" /><section className={styles.partnersIntro}><div><span className={styles.eyebrow}>Співпраця</span><h2>Компанії, які<br /><strong>довіряють нам</strong></h2></div><p>Ми будуємо довгострокові відносини на прозорості, спільних цінностях і вимірюваному результаті. Партнерська мережа допомагає швидко підбирати найкращі технології для кожного проєкту.</p></section><section className={styles.logoGrid}>{partners.map((logo, index) => <article key={`${logo}-${index}`}><span><img src={`/assets/partner-${logo}.svg`} alt={logo} /></span><p>Технологічний партнер GreenCom</p><a href="/contact/">Дізнатися більше →</a></article>)}</section><section className={styles.partnerCta}><div><span className={styles.eyebrow}>Стати партнером</span><h2>Створюймо майбутнє<br /><strong>бізнесу разом</strong></h2></div><Button href="/contact/">Обговорити співпрацю</Button></section></Shell>;
}

function CasesPage() {
  const [filter, setFilter] = useState("Усі кейси");
  const categories = ["Усі кейси", ...new Set(cases.map((item) => item[0]))];
  const filtered = filter === "Усі кейси" ? cases : cases.filter((item) => item[0] === filter);
  return <Shell><Hero eyebrow="Кейси" title={<>Результати, що <strong>говорять за нас</strong></>} text="Реальні задачі бізнесу, продумані рішення та вимірюваний ефект від автоматизації." current="Кейси" /><section className={styles.casesSection}><div className={styles.filters}>{categories.map((item) => <button className={filter === item ? styles.active : ""} onClick={() => setFilter(item)} type="button" key={item}>{item}</button>)}</div><div className={styles.caseGrid}>{filtered.map(([category, title, text, image]) => <article key={title}><a className={styles.caseImage} href="/case/"><img src={image} alt="" /><span>{category}</span></a><div><h2><a href="/case/">{title}</a></h2><p>{text}</p><a href="/case/">Переглянути кейс <b>→</b></a></div></article>)}</div></section></Shell>;
}

function CasePage() {
  return <Shell><Hero eyebrow="Кейс" title={<>Автоматизація<br /><strong>мережі магазинів</strong></>} current="Автоматизація мережі магазинів" parent="Кейси" parentHref="/cases/" compact /><article className={styles.caseDetail}><img className={styles.caseHeroImage} src="/retail-tech.jpg" alt="Автоматизований магазин" /><section className={styles.caseSummary}><div><span className={styles.eyebrow}>Про проєкт</span><h2>Єдина система для<br /><strong>24 торгових точок</strong></h2></div><p>Клієнту було важливо об’єднати продажі, складські залишки та аналітику, не зупиняючи роботу магазинів. Ми побудували поетапний план міграції та запустили рішення за вісім тижнів.</p></section><section className={styles.metrics}><div><b>24</b><span>магазини в системі</span></div><div><b>−35%</b><span>часу на звітність</span></div><div><b>99.9%</b><span>точності залишків</span></div><div><b>8</b><span>тижнів до запуску</span></div></section><section className={styles.caseStory}><div><span className={styles.eyebrow}>Завдання</span><h2>Виклик бізнесу</h2><p>Дані зберігалися у різних системах, звіти формувалися вручну, а актуальні залишки були доступні із затримкою. Це ускладнювало закупівлі та управління мережею.</p><h2>Наше рішення</h2><p>Ми інтегрували касове обладнання, облік товарів, програму лояльності й аналітичну панель. Керівники отримали єдину картину, а команда — прості робочі сценарії.</p><ul><li>Централізований каталог товарів і цін.</li><li>Онлайн-контроль продажів та залишків.</li><li>Автоматичні управлінські звіти.</li><li>Навчання персоналу й підтримка 24/7.</li></ul></div><img src="/developer-tech.jpg" alt="Налаштування системи" /></section><section className={styles.result}><span className={styles.eyebrow}>Результат</span><h2>Кероване зростання<br /><strong>на основі даних</strong></h2><p>Команда витрачає менше часу на рутинні операції, швидше реагує на попит і бачить результат кожної торгової точки у реальному часі.</p><Button href="/contact/">Обговорити ваш проєкт</Button></section></article></Shell>;
}

function VacanciesPage() {
  return <Shell><Hero eyebrow="Кар’єра" title={<>Розвивайте технології <strong>разом із нами</strong></>} text="Приєднуйтеся до команди, що створює корисні цифрові рішення та цінує ініціативу." current="Вакансії" /><section className={styles.careerIntro}><img src="/assets/about-team.png" alt="Команда GreenCom" /><div><span className={styles.eyebrow}>GreenCom team</span><h2>Робота, в якій є<br /><strong>простір для зростання</strong></h2><p>Ми об’єднуємо людей, які люблять складні задачі, відкрито діляться знаннями та відповідають за результат.</p><ul><li>Навчання та професійний розвиток</li><li>Гнучкий формат роботи</li><li>Сильна команда й реальні проєкти</li><li>Відкрита комунікація без зайвої бюрократії</li></ul></div></section><section className={styles.vacancySection}><div className={styles.sectionHeading}><span className={styles.eyebrow}>Відкриті позиції</span><h2>Знайдіть свою <strong>роль</strong></h2></div><div className={styles.vacancyList}>{vacancies.map(([title, place, type]) => <article key={title}><div><span>GreenCom</span><h2>{title}</h2></div><p><b>⌖</b>{place}</p><p><b>◷</b>{type}</p><a href="/vacancy/">Детальніше <i>→</i></a></article>)}</div></section></Shell>;
}

function VacancyPage() {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSent(true); event.currentTarget.reset(); }
  return <Shell><Hero eyebrow="Вакансія" title={<>Front-end <strong>developer</strong></>} text="Створюйте швидкі, зручні та візуально точні інтерфейси для продуктів GreenCom." current="Front-end developer" parent="Вакансії" parentHref="/vacancies/" compact /><article className={styles.vacancyDetail}><section><div className={styles.jobFacts}><span><b>Локація</b>Одеса / віддалено</span><span><b>Формат</b>Повна зайнятість</span><span><b>Досвід</b>Від 2 років</span></div><h2>Про роль</h2><p>Шукаємо розробника, який уважний до деталей, розуміє адаптивну верстку та вміє перетворювати дизайн на стабільний продукт.</p><h2>Що потрібно робити</h2><ul><li>Розробляти та вдосконалювати клієнтські інтерфейси.</li><li>Працювати разом із дизайнерами й back-end командою.</li><li>Підтримувати якість, доступність і швидкодію.</li><li>Брати участь у code review та розвитку компонентної системи.</li></ul><h2>Що ми очікуємо</h2><ul><li>Впевнені знання HTML, CSS, JavaScript і React.</li><li>Практичний досвід responsive та cross-browser розробки.</li><li>Розуміння Git, API й сучасного процесу збірки.</li><li>Відповідальність, самостійність і бажання навчатися.</li></ul><h2>Ми пропонуємо</h2><p>Конкурентну винагороду, гнучкий графік, оплачуване навчання, техніку для роботи та команду, у якій можна впливати на результат.</p></section><aside><form onSubmit={submit}><span className={styles.eyebrow}>Відгукнутися</span><h2>Станьте частиною команди</h2><label>Ім’я<input required placeholder="Ваше ім’я" /></label><label>Email<input required type="email" placeholder="name@email.com" /></label><label>Телефон<input required type="tel" placeholder="+38 (___) ___-__-__" /></label><label>Посилання на резюме<input type="url" placeholder="https://" /></label><label>Коротко про себе<textarea rows={5} placeholder="Повідомлення" /></label><button className="button" type="submit">Надіслати резюме</button>{sent && <p className={styles.success}>Дякуємо! Відгук надіслано.</p>}</form></aside></article></Shell>;
}

export function EditorialPage({ kind }: { kind: EditorialPageKind }) {
  const page = useMemo(() => ({ news: <NewsPage />, article: <ArticlePage />, faq: <FaqPage />, partners: <PartnersPage />, cases: <CasesPage />, case: <CasePage />, vacancies: <VacanciesPage />, vacancy: <VacancyPage /> })[kind], [kind]);
  return page;
}
