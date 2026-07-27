"use client";

import { BackToTop, Button, SiteFooter, SiteHeader, type SiteLinks } from "./site";

export function NotFoundContent({ links }: { links: SiteLinks }) {
  return (
    <main className="not-found-page">
      <SiteHeader links={links} />
      <nav className="not-found-page__breadcrumbs" aria-label="Навігаційний ланцюжок">
        <a href={links.home}>Головна</a><i /><span>404</span>
      </nav>
      <section className="not-found-page__content">
        <div className="not-found-page__copy">
          <strong>404</strong>
          <h1>Х’юстон, щось пішло не так...</h1>
          <p>Схоже, ви потрапили на неіснуючу сторінку.</p>
          <p>Але не хвилюйтеся, навіть найкращі дослідники іноді збиваються з курсу.</p>
          <Button href={links.home}>Повернутися на головну</Button>
        </div>
        <img src="/assets/not-found-art.png" alt="Астронавт і повідомлення про помилку 404" />
      </section>
      <SiteFooter links={links} />
      <BackToTop />
    </main>
  );
}
