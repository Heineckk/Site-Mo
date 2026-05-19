import fs from "fs";
import path from "path";
import type { SiteConfig } from "@/types/site-config";

const SITES_DIR = path.join(process.cwd(), "sites");

export function getSiteSlugs(): string[] {
  if (!fs.existsSync(SITES_DIR)) return [];
  return fs
    .readdirSync(SITES_DIR)
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.replace(/\.json$/, ""));
}

export function getSiteConfig(slug: string): SiteConfig | null {
  const filePath = path.join(SITES_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;

  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const config = JSON.parse(raw) as SiteConfig;
    if (config.slug !== slug) {
      config.slug = slug;
    }
    return config;
  } catch {
    return null;
  }
}

/** Slug do site pessoal (acesso só por link direto, ex.: /ana-livia) */
export const DEFAULT_SITE_SLUG = "ana-livia";
