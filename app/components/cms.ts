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
  const value = cmsString(data, uploadKey) || cmsString(data, pathKey) || fallback;
  if (value.startsWith("/storage/")) return `${cmsBaseUrl}${value}`;
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
  const [locale, setLocaleState] = useState<string>();
  const [locales, setLocales] = useState<CmsLocale[]>([]);

  const load = useCallback(async (requestedLocale?: string) => {
    const query = requestedLocale ? `?locale=${encodeURIComponent(requestedLocale)}` : "";

    try {
      const response = await fetch(`${cmsBaseUrl}/api/pages/${encodeURIComponent(slug)}${query}`, {
        headers: { Accept: "application/json" },
      });

      if (!response.ok) return;

      const payload = (await response.json()) as CmsPageResponse;
      const page = payload.data;
      const nextBlocks = page?.blocks?.filter((block) => cmsBoolean(block.data ?? {}, "enabled"));

      if (nextBlocks) setBlocks(nextBlocks);
      if (page?.locale) setLocaleState(page.locale);
      if (page?.available_locales) setLocales(page.available_locales);
    } catch {
      // Keep the original static page as a safe fallback when the CMS is unavailable.
    }
  }, [slug]);

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

  return { blocks, locale, locales, setLocale };
}
