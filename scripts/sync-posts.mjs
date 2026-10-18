/**
 * Snapshots the blog's published posts into `src/data/posts.json`.
 *
 * Only the frontmatter is read; the blog stays the source of truth and is never
 * written to. Rules mirror the blog's own content collection:
 *
 * - posts are the Markdown notes under `<blog>/vault/notes/`, subfolders included;
 * - only notes with `publish: true` are kept;
 * - the slug is the note's path with every segment slugified by github-slugger,
 *   the same way the blog builds its `/posts/<slug>/` URLs.
 *
 * Usage: `npm run sync:posts`
 * Overrides: BLOG_DIR (default `../blog`), VAULT_DIR (default `vault`, as in the blog).
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { slug as slugify } from "github-slugger";
import { parse } from "yaml";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const blogDir = path.resolve(root, process.env.BLOG_DIR ?? "../blog");
const notesDir = path.resolve(blogDir, process.env.VAULT_DIR ?? "vault", "notes");
const outFile = path.join(root, "src/data/posts.json");

const LANGS = ["en", "id"];

/** Markdown files under `dir`, skipping dot folders such as `.obsidian`. */
async function findNotes(dir) {
  const notes = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) notes.push(...(await findNotes(full)));
    else if (entry.isFile() && /\.md$/i.test(entry.name)) notes.push(full);
  }
  return notes;
}

function frontmatter(source) {
  const match = /^﻿?---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(source);
  const data = match ? parse(match[1]) : null;
  return data && typeof data === "object" ? data : null;
}

/** `guides/Deploy ke Cloud Run.md` → `guides/deploy-ke-cloud-run` */
function noteSlug(relativePath) {
  return relativePath
    .replaceAll("\\", "/")
    .replace(/\.md$/i, "")
    .split("/")
    .map((segment) => slugify(segment))
    .filter(Boolean)
    .join("/");
}

/** Frontmatter dates have no time zone, so they are read as UTC, like the blog does. */
function isoDate(value) {
  const date = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(date.valueOf()) ? null : date.toISOString().slice(0, 10);
}

let files;
try {
  files = await findNotes(notesDir);
} catch (error) {
  console.error(`sync:posts: cannot read ${notesDir} (${error.code ?? error.message}).`);
  console.error("Set BLOG_DIR to the blog project. The existing snapshot was left untouched.");
  process.exit(1);
}

const posts = [];
let drafts = 0;

for (const file of files.sort()) {
  const relative = path.relative(notesDir, file);
  const data = frontmatter(await readFile(file, "utf8"));

  if (data?.publish !== true) {
    drafts += 1;
    continue;
  }

  const date = isoDate(data.date);
  const problems = [
    typeof data.title !== "string" && "title",
    typeof data.description !== "string" && "description",
    !date && "date",
    !LANGS.includes(data.lang) && "lang",
  ].filter(Boolean);

  if (problems.length > 0) {
    console.warn(`sync:posts: skipped "${relative}" (invalid ${problems.join(", ")}).`);
    continue;
  }

  posts.push({
    title: data.title,
    description: data.description,
    date,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    lang: data.lang,
    slug: noteSlug(relative),
  });
}

// Newest first, with the slug as a stable tiebreaker.
posts.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));

await writeFile(outFile, `${JSON.stringify(posts, null, 2)}\n`);

console.log(
  `sync:posts: wrote ${posts.length} published post(s) to ${path.relative(root, outFile)}` +
    ` (${drafts} unpublished note(s) left out).`,
);
