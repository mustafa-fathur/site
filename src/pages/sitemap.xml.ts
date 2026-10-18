import type { APIRoute } from "astro";
import { SITE_URL } from "../config";

const routes = ["/", "/work"];

export const GET: APIRoute = ({ url }) => {
  const origin = SITE_URL || url.origin;
  const entries = routes
    .map((path) => `  <url><loc>${new URL(path, origin).href}</loc></url>`)
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries,
    "</urlset>",
  ].join("\n");

  return new Response(`${xml}\n`, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
