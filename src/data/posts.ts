/**
 * Blog posts, read from a generated snapshot of the blog's published notes.
 * Do not edit `posts.json` by hand: run `npm run sync:posts` to refresh it.
 */
import { BLOG_URL } from "../config";
import snapshot from "./posts.json";

export type Lang = "en" | "id";

export interface Post {
  title: string;
  description: string;
  /** `YYYY-MM-DD` */
  date: string;
  tags: string[];
  lang: Lang;
  /** Path of the post on the blog, e.g. `guides/deploy-to-cloud-run`. */
  slug: string;
}

/** Newest first. */
export const posts: Post[] = (snapshot as Post[]).toSorted(
  (a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug),
);

export const latestPosts = posts.slice(0, 3);

export function postUrl(post: Post): string {
  return `${BLOG_URL}/posts/${post.slug}/`;
}

const month = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" });

/** `20 Sep 2026`. Snapshot dates are UTC, so they are formatted in UTC too. */
export function formatDate(iso: string): string {
  const date = new Date(iso);
  return `${date.getUTCDate()} ${month.format(date)} ${date.getUTCFullYear()}`;
}
