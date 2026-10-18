import type { APIRoute } from "astro";
import { SITE_URL } from "../config";

export const GET: APIRoute = () => {
  const lines = ["User-agent: *", "Allow: /"];
  if (SITE_URL) {
    lines.push("", `Sitemap: ${new URL("/sitemap.xml", SITE_URL).href}`);
  }
  return new Response(`${lines.join("\n")}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
