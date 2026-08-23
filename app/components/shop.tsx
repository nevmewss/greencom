"use client";

import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { BackToTop, NewsletterSection, SiteFooter, SiteHeader, type SiteLinks } from "./site";

export type ShopProduct = {
  id: string;
  title: string;
  category: string;
  market: string;
  price: number;
  oldPrice?: number;
  image: string;
  sale?: boolean;
};

export const shopProducts: ShopProduct[] = [
  { id: "pos-terminal-sunmi-t2s", title: "POS-Термінал Sunmi T2s", category: "Обладнання", market: "BAS Корпоративний ринок", price: 27000, oldPrice: 32000, image: "/retail-tech.jpg", sale: true },
  { id: "bas-document-flow", title: "BAS Документообіг КОРП", category: "Програмне забезпечення", market: "BAS Корпоративний ринок", price: 75600, image: "/retail-tech.jpg" },
  { id: "bas-erp", title: "BAS ERP", category: "Програмне забезпечення", market: "BAS Корпоративний ринок", price: 25000, oldPrice: 27000, image: "/retail-tech.jpg", sale: true },
  { id: "cash-register-pro", title: "Касова система Pro", category: "Обладнання", market: "BAS Масовий ринок", price: 48600, image: "/retail-tech.jpg" },
  { id: "trade-control", title: "BAS Управління торгівлею", category: "Програмне забезпечення", market: "BAS Галузеві рішення", price: 33600, image: "/retail-tech.jpg", sale: true },
  { id: "fiscal-printer", title: "Фіскальний принтер", category: "Обладнання", market: "BAS Масовий ринок", price: 18900, image: "/retail-tech.jpg" },
  { id: "crm-business", title: "CRM для бізнесу", category: "Послуги ITC", market: "BAS Додаткові можливості", price: 42000, image: "/retail-tech.jpg", sale: true },
  { id: "barcode-scanner", title: "Сканер штрих-кодів", category: "Обладнання", market: "BAS Масовий ринок", price: 8900, image: "/retail-tech.jpg" },
  { id: "cloud-accounting", title: "Хмарний облік GreenCom", category: "Послуги ITC", market: "BAS Корпоративний ринок", price: 21500, image: "/retail-tech.jpg", sale: true },
  { id: "terminal-t2-mini", title: "POS-Термінал T2 mini", category: "Обладнання", market: "BAS Масовий ринок", price: 29800, image: "/retail-tech.jpg" },
  { id: "support-24", title: "Технічна підтримка 24/7", category: "Послуги ITC", market: "BAS Додаткові можливості", price: 12000, image: "/retail-tech.jpg" },
];

export const shopLinks: SiteLinks = {
  home: "../",
  about: "../about/",
  services: "../catalog/",
  price: "../price/",
  news: "../#news",
  contact: "../contact/",
  partners: "../#partners",
};

const money = new Intl.NumberFormat("uk-UA").format;

type CartItem = ShopProduct & { quantity: number };
type StoredOrder = { id: string; date: string; status: "Новий" | "Виконано" | "Скасовано"; items: CartItem[]; total: number };

const CART_KEY = "greencom-cart";
const ORDERS_KEY = "greencom-orders";

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try { return JSON.parse(window.localStorage.getItem(key) ?? "") as T; } catch { return fallback; }
}

function writeCart(items: CartItem[]) {
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("greencom:cart", { detail: items }));
}

function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => {
    const sync = () => setItems(readStorage<CartItem[]>(CART_KEY, []));
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("greencom:cart", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("greencom:cart", sync);
    };
  }, []);
  const commit = (next: CartItem[]) => { setItems(next); writeCart(next); };
  const add = (product: ShopProduct, quantity = 1) => commit(items.some((item) => item.id === product.id) ? items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item) : [...items, { ...product, quantity }]);
  const update = (id: string, quantity: number) => commit(items.map((item) => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item));
  const remove = (id: string) => commit(items.filter((item) => item.id !== id));
  const clear = () => commit([]);
  return { items, add, update, remove, clear };
}

function ShopChrome({ title, text, breadcrumb, children, newsletter = false }: { title: string; text: string; breadcrumb: string; children: ReactNode; newsletter?: boolean }) {
  return <main className="shop-page"><SiteHeader links={shopLinks} variant="inner" /><ShopHero title={title} text={text} breadcrumb={breadcrumb} />{children}{newsletter && <NewsletterSection />}<SiteFooter links={shopLinks} /><BackToTop /></main>;
}

export function ShopHero({ title, text, breadcrumb }: { title: string; text: string; breadcrumb: string }) {
  return (
    <section className="shop-hero">
      <picture className="shop-hero__media">
        <source media="(min-width: 1295px)" srcSet="/assets/contact-hero-desktop-exact.png" />
        <source media="(min-width: 601px)" srcSet="/assets/contact-hero-tablet-exact.png" />
        <img src="/assets/contact-hero-mobile-exact.png" alt="" />
      </picture>
      <nav className="shop-breadcrumbs"><a href="../">Головна</a><i /><span>{breadcrumb}</span></nav>
      <div className="shop-hero__copy"><h1>{title}</h1><p>{text}</p></div>
    </section>
  );
}

export function ProductCard({ product }: { product: ShopProduct }) {
  const [favorite, setFavorite] = useState(false);
  const [added, setAdded] = useState(false);
  const cart = useCart();

  return (
    <article className="shop-product-card">
      <a className="shop-product-card__media" href={`../product/?id=${product.id}`}>
        <img src={product.image} alt={product.title} />
        {product.sale && <span>Акція</span>}
      </a>
      <button className={`shop-favorite ${favorite ? "is-active" : ""}`} type="button" onClick={() => setFavorite(!favorite)} aria-label={favorite ? "Прибрати зі списку бажань" : "Додати до списку бажань"}>♡</button>
      <a className="shop-product-card__body" href={`../product/?id=${product.id}`}>
        <small>{product.market}</small>
        <h3>{product.title}</h3>
      </a>
      <div className="shop-product-card__price">
        <span>{product.oldPrice && <del>{money(product.oldPrice)} ₴</del>}<strong>{money(product.price)} ₴</strong></span>
        <button className={added ? "is-added" : ""} type="button" onClick={() => { cart.add(product); setAdded(true); window.setTimeout(() => setAdded(false), 1100); }} aria-label={`Додати ${product.title} до кошика`}>{added ? "✓" : "⌁"}</button>
      </div>
    </article>
  );
}

const categories = ["Усі категорії", "Програмне забезпечення", "Обладнання", "Послуги ITC"];

export function CatalogPage() {
  const [category, setCategory] = useState("Усі категорії");
  const visible = useMemo(() => category === "Усі категорії" ? shopProducts : shopProducts.filter((product) => product.category === category), [category]);

  return (
    <main className="shop-page shop-catalog-page">
      <SiteHeader links={shopLinks} variant="inner" />
      <ShopHero breadcrumb="Каталог" title="Каталог" text="Знайдіть відповіді на найпоширеніші запитання щодо автоматизації, IT-рішень, обладнання та сервісів GreenCore." />
      <section className="shop-category-strip">
        {categories.slice(1).concat("Витратні матеріали").map((item) => <article key={item}><small>{item === "Обладнання" ? "Обладнання" : "Послуги"}</small><h2>{item}</h2><p>Коротенький опис послуги для каталогу. В два рядки, може в один.</p><a href="#catalog-grid">Дізнатися більше</a></article>)}
      </section>
      <section className="shop-catalog" id="catalog-grid">
        <aside className="shop-catalog__side">
          <nav>{categories.map((item) => <button className={category === item ? "is-active" : ""} type="button" key={item} onClick={() => setCategory(item)}>{item}<span>›</span></button>)}</nav>
          <div className="shop-filter"><h2>Фільтр</h2><details open><summary>Категорія</summary>{categories.slice(1).map((item) => <label key={item}><input type="checkbox" checked={category === item} onChange={() => setCategory(category === item ? "Усі категорії" : item)} />{item}</label>)}</details><details><summary>Бренд</summary><label><input type="checkbox" />Sunmi</label><label><input type="checkbox" />BAS</label></details></div>
        </aside>
        <div className="shop-product-grid">{visible.map((product) => <ProductCard product={product} key={product.id} />)}</div>
      </section>
      <NewsletterSection />
      <SiteFooter links={shopLinks} />
      <BackToTop />
    </main>
  );
}

export function ProductPage() {
  const [product, setProduct] = useState(shopProducts[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [tab, setTab] = useState<"description" | "characteristics" | "reviews">("description");
  const [added, setAdded] = useState(false);
  const cart = useCart();

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    // The query string is a browser-owned external source and is unavailable during SSR.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProduct(shopProducts.find((item) => item.id === id) ?? shopProducts[0]);
  }, []);

  const add = () => { cart.add(product, quantity); setAdded(true); window.setTimeout(() => setAdded(false), 1400); };

  return <ShopChrome title="Програмне Забезпечення" text="Коротенький опис послуги для каталогу. В два рядки, може в один." breadcrumb="Каталог" newsletter>
    <section className="product-detail">
      <div className="product-gallery shop-glass">
        <div className="product-gallery__main"><img src={product.image} alt={product.title} />{product.sale && <span>Акція</span>}</div>
        <div className="product-gallery__thumbs">{Array.from({ length: 5 }, (_, index) => <button className={activeImage === index ? "is-active" : ""} type="button" onClick={() => setActiveImage(index)} key={index}><img src={product.image} alt="" /></button>)}</div>
      </div>
      <article className="product-summary shop-glass">
        <div className="product-summary__top"><div><small>{product.category}</small><h2>{product.title}</h2></div><button className="shop-favorite shop-favorite--static" type="button" aria-label="Додати до списку бажань">♡</button></div>
        <div className="product-rating"><strong>★★★★★</strong><span>(5 відгуків)</span><i />Код товару: 123456</div>
        <p>Сучасний POS-термінал для автоматизації касових процесів, обліку продажів та ефективного управління торговою точкою.</p>
        <p>Ідеально підходить для магазинів, ресторанів, кафе та мереж роздрібної торгівлі.</p>
        <div className="product-summary__price">{product.oldPrice && <del>{money(product.oldPrice)}₴</del>}<strong>{money(product.price)}₴</strong></div>
        <div className="product-benefits"><span>◉ <b>Доставка</b><small>1–3 дні по всій Україні</small></span><span>◉ <b>Гарантія</b><small>12 місяців</small></span><span>◉ <b>Тех. підтримка</b><small>24/7</small></span></div>
        <div className="product-actions"><div className="quantity"><span>{quantity}</span><button type="button" onClick={() => setQuantity(quantity + 1)}>+</button><button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button></div><button className="shop-primary" type="button" onClick={add}>{added ? "Додано ✓" : "Додати до кошика"}</button><a className="shop-outline" href="../contact/">Отримати консультацію</a></div>
      </article>
    </section>
    <section className="product-tabs shop-glass">
      <nav><button className={tab === "description" ? "is-active" : ""} type="button" onClick={() => setTab("description")}>Опис</button><button className={tab === "characteristics" ? "is-active" : ""} type="button" onClick={() => setTab("characteristics")}>Характеристики</button><button className={tab === "reviews" ? "is-active" : ""} type="button" onClick={() => setTab("reviews")}>Відгуки (5)</button></nav>
      {tab === "description" && <div className="product-tabs__copy"><h3>Повний опис товару</h3><p>Потужне та надійне рішення для автоматизації бізнесу. Термінал поєднує продуктивне обладнання, сучасний дизайн і просте керування, допомагаючи прискорити обслуговування клієнтів та контролювати всі операції.</p><p>Корпус розрахований на інтенсивне щоденне використання, а програмне забезпечення легко інтегрується з обліковими системами GreenCom.</p><h3>Переваги рішення</h3><ul><li>Швидка робота та стабільне підключення.</li><li>Інтеграція з BAS і системами обліку.</li><li>Гарантія та технічна підтримка 24/7.</li></ul></div>}
      {tab === "characteristics" && <dl className="product-characteristics"><div><dt>Процесор</dt><dd>Octa Core 2.0 GHz</dd></div><div><dt>Пам’ять</dt><dd>4 GB / 64 GB</dd></div><div><dt>Дисплей</dt><dd>15.6″ Full HD</dd></div><div><dt>Гарантія</dt><dd>12 місяців</dd></div></dl>}
      {tab === "reviews" && <div className="product-review"><strong>★★★★★</strong><h3>Іван, 26.04.2026</h3><p>Зручне рішення, швидко встановили та підключили до нашої системи обліку.</p></div>}
    </section>
    <section className="related-products"><div><span>— Останні ——</span><h2>Переглянуті Товари</h2></div><div className="related-products__grid">{shopProducts.slice(0,4).map((item) => <ProductCard product={item} key={item.id} />)}</div></section>
  </ShopChrome>;
}

export function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (new URLSearchParams(window.location.search).get("mode") === "signup") setMode("signup");
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "Іван");
    window.localStorage.setItem("greencom-user", JSON.stringify({ name, email: String(form.get("email") || "") }));
    setMessage(mode === "login" ? "Вхід виконано" : "Акаунт створено");
    window.setTimeout(() => { window.location.href = "../personal/"; }, 650);
  }

  return <ShopChrome title={mode === "login" ? "Вхід" : "Реєстрація"} text="Ласкаво просимо у Ваш центр сучасних технологій та автоматизації бізнесу." breadcrumb={mode === "login" ? "Вхід" : "Реєстрація"}>
    <section className="auth-section">
      <div className="auth-visual"><i /><img src="/assets/shop-auth.jpg" alt="Захищений вхід до кабінету GreenCom" /></div>
      <form className="auth-form shop-glass" onSubmit={submit}>
        <nav><button className={mode === "login" ? "is-active" : ""} type="button" onClick={() => setMode("login")}>Вхід</button><button className={mode === "signup" ? "is-active" : ""} type="button" onClick={() => setMode("signup")}>Реєстрація</button></nav>
        {mode === "signup" && <label>Ім’я<input name="name" required placeholder="Введіть ім’я" /></label>}
        <label>Email<span><input name="email" type="email" required placeholder="Введіть Email" /><i>✉</i></span></label>
        <label>Пароль<span><input name="password" type={passwordVisible ? "text" : "password"} minLength={6} required placeholder="******" /><button type="button" onClick={() => setPasswordVisible(!passwordVisible)} aria-label="Показати пароль">◉</button></span></label>
        {mode === "signup" && <label>Повторіть пароль<input type={passwordVisible ? "text" : "password"} minLength={6} required placeholder="******" /></label>}
        <div className="auth-form__bottom"><button className="shop-primary" type="submit">{mode === "login" ? "Увійти" : "Зареєструватися"}</button>{mode === "login" && <a href="#">Забули пароль?</a>}</div>
        {message && <p className="shop-success">{message} ✓</p>}
      </form>
    </section>
  </ShopChrome>;
}

export function CartPage() {
  const cart = useCart();
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = Math.max(0, subtotal - discount);

  function checkout() {
    if (!cart.items.length) return;
    const orders = readStorage<StoredOrder[]>(ORDERS_KEY, []);
    const order: StoredOrder = { id: String(Date.now()).slice(-7), date: new Date().toLocaleDateString("uk-UA"), status: "Новий", items: cart.items, total };
    window.localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...orders]));
    cart.clear();
    window.location.href = "../orders/";
  }

  return <ShopChrome title="Кошик" text="Ознайомтесь із вартістю послуг, обладнання та рішень для автоматизації бізнесу. Оберіть оптимальний варіант для ваших потреб та масштабу компанії." breadcrumb="Кошик" newsletter>
    <section className="cart-layout">
      <div className="cart-table shop-glass">
        <div className="cart-table__head"><span>Товар</span><span>Ціна</span><span>Кількість</span><span>Всього</span><span>Видалити</span></div>
        {cart.items.length ? cart.items.map((item) => <article className="cart-row" key={item.id}><div><img src={item.image} alt="" /><a href={`../product/?id=${item.id}`}>{item.title}</a></div><strong>{money(item.price)} ₴</strong><div className="quantity"><span>{item.quantity}</span><button type="button" onClick={() => cart.update(item.id,item.quantity+1)}>+</button><button type="button" onClick={() => cart.update(item.id,item.quantity-1)}>−</button></div><strong>{money(item.price * item.quantity)} ₴</strong><button className="cart-remove" type="button" onClick={() => cart.remove(item.id)} aria-label={`Видалити ${item.title}`}>×</button></article>) : <div className="cart-empty"><h2>Ваш кошик порожній</h2><p>Додайте потрібне обладнання або програмне забезпечення з каталогу.</p><a className="shop-primary" href="../catalog/">Перейти до каталогу</a></div>}
        {cart.items.length > 0 && <footer><a href="../catalog/">← Продовжити покупки</a><button type="button" onClick={cart.clear}>Очистити кошик</button></footer>}
      </div>
      <aside className="cart-total shop-glass"><h2>Сума кошика</h2><h3>Промо-код</h3><p>Активуйте промокод та заощаджуйте більше.</p><label>Код<input value={promo} onChange={(event) => setPromo(event.target.value)} placeholder="Введіть код" /></label><button className="shop-outline" type="button" onClick={() => setDiscount(promo.trim().toUpperCase() === "GREENCOM" ? Math.round(subtotal * .1) : 0)}>Застосувати</button><dl><div><dt>Сума кошика</dt><dd>{money(subtotal)} ₴</dd></div><div><dt>Знижка</dt><dd>{money(discount)} ₴</dd></div><div><dt>Загальна сума кошика</dt><dd>{money(total)} ₴</dd></div></dl><button className="shop-primary" type="button" disabled={!cart.items.length} onClick={checkout}>Оформити</button></aside>
    </section>
  </ShopChrome>;
}

function AccountSidebar({ active }: { active: "personal" | "orders" | "wishlist" }) {
  const [name, setName] = useState("Іван");
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setName(readStorage<{ name?: string }>("greencom-user", {}).name || "Іван");
  }, []);
  return <aside className="account-sidebar shop-glass"><div className="account-sidebar__user"><img src="/assets/shop-avatar.jpg" alt="" /><span>Привіт!<strong>{name}</strong></span></div><i /><nav><a className={active === "personal" ? "is-active" : ""} href="../personal/">♙ <span>Персональні дані</span></a><a className={active === "orders" ? "is-active" : ""} href="../orders/">▣ <span>Історія замовлень</span></a><a className={active === "wishlist" ? "is-active" : ""} href="../catalog/">♡ <span>Список бажань</span></a><a href="../login/" onClick={() => window.localStorage.removeItem("greencom-user")}>⇥ <span>Вихід</span></a></nav></aside>;
}

export function PersonalPage() {
  const [saved, setSaved] = useState("");
  function save(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const data = new FormData(event.currentTarget); window.localStorage.setItem("greencom-user", JSON.stringify({ name: data.get("name"), email: data.get("email") })); setSaved("Збережено"); }
  return <ShopChrome title="Персональні Дані" text="Ласкаво просимо до простору сучасних технологій, автоматизації та інноваційних рішень для розвитку вашого бізнесу." breadcrumb="Персональні дані">
    <section className="account-layout"><AccountSidebar active="personal" /><div className="personal-panels">
      <form className="personal-form shop-glass" onSubmit={save}><h2>Особиста інформація</h2><div className="personal-form__grid"><label>Ім’я<input name="name" defaultValue="Іван" /></label><label>Електронна пошта<input name="email" type="email" placeholder="Email" /></label><label>Номер телефону<input name="phone" type="tel" placeholder="+12 (123) 456 78900" /></label><label>Дата народження<input name="birthday" type="date" /></label><label className="personal-photo">Завантажити фото<span><input type="file" accept="image/*" /><b>＋</b><i>▧</i></span></label></div><button className="shop-outline" type="submit">Зберегти</button>{saved && <em>{saved} ✓</em>}</form>
      <form className="password-form shop-glass" onSubmit={(event) => { event.preventDefault(); setSaved("Пароль змінено"); }}><h2>Заміна паролю</h2><div><label>Старий пароль<input type="password" required placeholder="******" /></label><label>Новий пароль<input type="password" required minLength={6} placeholder="******" /></label><label>Повторити пароль<input type="password" required minLength={6} placeholder="******" /></label></div><button className="shop-outline" type="submit">Зберегти</button></form>
    </div></section>
  </ShopChrome>;
}

const fallbackOrders: StoredOrder[] = [
  { id: "1234567", date: "26.04.2026", status: "Новий", total: 217000, items: [{ ...shopProducts[0], quantity: 1 }, { ...shopProducts[1], quantity: 2 }] },
  { id: "1234566", date: "26.04.2026", status: "Скасовано", total: 1217000, items: [{ ...shopProducts[2], quantity: 5 }] },
  { id: "1234565", date: "26.04.2026", status: "Виконано", total: 217000, items: [{ ...shopProducts[3], quantity: 2 }] },
];

export function OrdersPage() {
  const [filter, setFilter] = useState("Усі замовлення");
  const [open, setOpen] = useState(0);
  const [orders, setOrders] = useState(fallbackOrders);
  useEffect(() => {
    const stored = readStorage<StoredOrder[]>(ORDERS_KEY, []);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored.length) setOrders([...stored, ...fallbackOrders]);
  }, []);
  const visible = orders.filter((order) => filter === "Усі замовлення" || order.status === filter);
  return <ShopChrome title="Історія Замовлень" text="Ласкаво просимо до простору сучасних технологій, автоматизації та інноваційних рішень для розвитку вашого бізнесу." breadcrumb="Історія замовлень">
    <section className="account-layout account-layout--orders"><AccountSidebar active="orders" /><div className="orders-content"><nav className="order-filters">{["Усі замовлення","Виконано","Новий","Скасовано"].map((item) => <button className={filter === item ? "is-active" : ""} type="button" onClick={() => setFilter(item)} key={item}>{item === "Новий" ? "Нові" : item}</button>)}</nav>{visible.map((order,index) => <article className={`order-card ${open === index ? "is-open" : ""}`} key={`${order.id}-${index}`}><button className="order-card__head" type="button" onClick={() => setOpen(open === index ? -1 : index)}><span><b>№{order.id}</b><small>{order.date}</small></span><em className={`status status--${order.status.toLowerCase()}`}>{order.status}</em><span>{order.items.reduce((sum,item)=>sum+item.quantity,0)} товари</span><strong>{money(order.total)} ₴</strong><span>Детальніше⌄</span></button>{open === index && <div className="order-card__details"><div className="order-products"><header><span>Товар</span><span>Ціна</span><span>Кількість</span><span>Сума</span></header>{order.items.map((item) => <div key={item.id}><span><img src={item.image} alt="" />{item.title}</span><span>{money(item.price)} ₴</span><span>{item.quantity} шт</span><span>{money(item.price*item.quantity)} ₴</span></div>)}</div><h3>Доставка / Оплата</h3><div className="order-meta"><div><b>Отримувач</b><p>Іванов Олексій Олександрович</p><p>+38 (012) 345-67-89</p></div><div><b>Доставка</b><p>Нова пошта</p><p>Область, Назва населеного пункту, № Відділення</p></div><div><b>Форма оплати</b><p>Накладений платіж</p></div><div><b>Статус</b><p className="green">Оплачено</p></div></div></div>}</article>)}</div></section>
  </ShopChrome>;
}
