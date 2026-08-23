"use client";

import { useCallback, useEffect, useState } from "react";

export type CmsData = Record<string, unknown>;

export type CmsBlock = {
  type: string;
  data: CmsData;
};

export type CmsLocale = {
  code: string;
  name: string;
};

type CmsPageResponse = {
  data?: {
    locale?: string;
    available_locales?: CmsLocale[];
    blocks?: CmsBlock[];
    menu?: CmsData;
    title?: string;
    seo?: {
      title?: string;
      description?: string;
      keywords?: string;
      robots?: string;
      canonical_url?: string;
      og_title?: string;
      og_description?: string;
      og_image?: string;
    };
  };
};

const cmsBaseUrl = (process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:8000").replace(/\/$/, "");

export function cmsString(data: CmsData, key: string, fallback = ""): string {
  const value = data[key];
  return typeof value === "string" && value.trim() !== "" ? value : fallback;
}

export function cmsBoolean(data: CmsData, key: string, fallback = true): boolean {
  const value = data[key];
  return typeof value === "boolean" ? value : fallback;
}

export function cmsItems(data: CmsData, key: string): CmsData[] {
  const value = data[key];
  return Array.isArray(value) ? value.filter((item): item is CmsData => Boolean(item) && typeof item === "object") : [];
}

export function cmsImage(data: CmsData, uploadKey: string, pathKey: string, fallback = ""): string {
  const configuredValue = cmsString(data, uploadKey) || cmsString(data, pathKey) || fallback;
  // Apache commonly reserves /icons as a server alias. Keep existing CMS data
  // compatible while serving the site's assets from a non-reserved URL.
  const value = /^\/icons\//.test(configuredValue)
    ? configuredValue.replace("icons/", "site-icons/")
    : configuredValue;
  if (value.startsWith("/storage/")) return `${cmsBaseUrl}${value}`;
  if (/^\/(?:assets|site-icons|fonts)\//.test(value) && typeof window !== "undefined" && window.location.pathname.startsWith("/greencom/")) {
    return `/greencom${value}`;
  }
  return value;
}

export function cmsText(data: CmsData, key: string, fallback = ""): string {
  return cmsString(data, key, fallback)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export function responsiveImage(data: CmsData, breakpoint: "desktop" | "tablet" | "mobile", fallback: string): string {
  const item = cmsItems(data, "images").find((image) => cmsString(image, "breakpoint") === breakpoint);
  return item ? cmsImage(item, "image", "image_url", fallback) : fallback;
}

export function responsiveAlt(data: CmsData, fallback = ""): string {
  const item = cmsItems(data, "images").find((image) => cmsString(image, "alt") !== "");
  return item ? cmsString(item, "alt", fallback) : fallback;
}

export function useCmsPage(slug: string, fallbackTypes: string[]) {
  const fallbackBlocks = fallbackTypes.map((type) => ({ type, data: {} }));
  const [blocks, setBlocks] = useState<CmsBlock[]>(fallbackBlocks);
  const [menuData, setMenuData] = useState<CmsData>({});
  const [found, setFound] = useState<boolean | null>(fallbackTypes.length ? true : null);
  const [locale, setLocaleState] = useState<string>();
  const [locales, setLocales] = useState<CmsLocale[]>([]);
  const [pageTitle, setPageTitle] = useState<string>();
  const [seoTitle, setSeoTitle] = useState<string>();
  const [seoDescription, setSeoDescription] = useState<string>();
  const [seoKeywords, setSeoKeywords] = useState<string>();
  const [seoRobots, setSeoRobots] = useState<string>();
  const [canonicalUrl, setCanonicalUrl] = useState<string>();
  const [ogTitle, setOgTitle] = useState<string>();
  const [ogDescription, setOgDescription] = useState<string>();
  const [ogImage, setOgImage] = useState<string>();

  const load = useCallback(async (requestedLocale?: string) => {
    const query = requestedLocale ? `?locale=${encodeURIComponent(requestedLocale)}` : "";

    try {
      const response = await fetch(`${cmsBaseUrl}/api/pages/${encodeURIComponent(slug)}${query}`, {
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        if (response.status === 404 && fallbackTypes.length === 0) setFound(false);
        return;
      }

      const payload = (await response.json()) as CmsPageResponse;
      const page = payload.data;
      const nextBlocks = page?.blocks?.filter((block) => cmsBoolean(block.data ?? {}, "enabled"));

      setFound(true);
      if (nextBlocks) setBlocks(nextBlocks);
      if (page?.menu) setMenuData(page.menu);
      if (page?.locale) setLocaleState(page.locale);
      if (page?.available_locales) setLocales(page.available_locales);
      setPageTitle(page?.title);
      setSeoTitle(page?.seo?.title);
      setSeoDescription(page?.seo?.description);
      setSeoKeywords(page?.seo?.keywords);
      setSeoRobots(page?.seo?.robots);
      setCanonicalUrl(page?.seo?.canonical_url);
      setOgTitle(page?.seo?.og_title);
      setOgDescription(page?.seo?.og_description);
      setOgImage(page?.seo?.og_image);
    } catch {
      if (fallbackTypes.length === 0) setFound(false);
    }
  }, [fallbackTypes.length, slug]);

  useEffect(() => {
    const requestedLocale = new URLSearchParams(window.location.search).get("locale") ?? undefined;
    void load(requestedLocale);
  }, [load]);

  const setLocale = useCallback((code: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("locale", code);
    window.history.replaceState({}, "", url);
    void load(code);
  }, [load]);

  return {
    blocks,
    menuData,
    found,
    locale,
    locales,
    pageTitle,
    seoTitle,
    seoDescription,
    seoKeywords,
    seoRobots,
    canonicalUrl,
    ogTitle,
    ogDescription,
    ogImage,
    setLocale,
  };
}
