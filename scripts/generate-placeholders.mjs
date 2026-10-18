/**
 * Generates the placeholder assets in `public/`:
 *
 * - `images/work/<slug>.svg`             a 16:10 dummy-UI mockup per work item
 * - `images/logos/placeholder-google.svg` the logo every organisation uses for now
 * - `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `og.png`
 *
 * Existing files are left alone, so a real screenshot or logo saved over a
 * placeholder is never overwritten. Pass `--force` to regenerate everything.
 *
 * Usage: `npm run generate:placeholders [-- --force]`
 */
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const force = process.argv.includes("--force");

/*
 * Moon palette. The theme maps `--primary-50…950` to Tailwind's gray ramp in
 * light mode and to neutral in dark mode. An <img> cannot read the page's CSS
 * variables, so the mockups are drawn in the ramp's midpoint at varying alpha
 * on a transparent canvas: the same file then reads as dark-on-light on the
 * light theme and light-on-dark on the dark one.
 */
const MOON = {
  ink: "#6a7282", // gray-500, the midpoint of --primary-*
  primary: "#1e2939", // gray-800, --primary in light mode
  muted: "#4a5565", // gray-600
  white: "#ffffff",
  dark: "#262626", // neutral-800, the dark background
};

// ---------------------------------------------------------------------------
// Drawing helpers. `a` is always an alpha between 0 and 1.
// ---------------------------------------------------------------------------

const INK = MOON.ink;
const rx = (r) => (r ? ` rx="${r}"` : "");

const box = (x, y, w, h, a, r = 0) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}"${rx(r)} fill="${INK}" fill-opacity="${a}"/>`;
const frame = (x, y, w, h, r = 0, a = 0.3) =>
  `<rect x="${x + 0.5}" y="${y + 0.5}" width="${w - 1}" height="${h - 1}"${rx(r)} fill="none" stroke="${INK}" stroke-opacity="${a}"/>`;
const dot = (cx, cy, r, a) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${INK}" fill-opacity="${a}"/>`;
const rule = (x1, y1, x2, y2, a = 0.22) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${INK}" stroke-opacity="${a}"/>`;
const shape = (d, a) => `<path d="${d}" fill="${INK}" fill-opacity="${a}"/>`;
const stroke = (d, a = 0.4, width = 1.5, extra = "") =>
  `<path d="${d}" fill="none" stroke="${INK}" stroke-opacity="${a}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"${extra}/>`;
/** A stack of bars standing in for lines of text. */
const text = (x, y, widths, a = 0.22, h = 6, gap = 12) =>
  widths.map((w, i) => box(x, y + i * gap, w, h, a, h / 2)).join("");
const at = (x, y, ...body) => `<g transform="translate(${x} ${y})">${body.join("")}</g>`;
const times = (count, draw) => Array.from({ length: count }, (_, i) => draw(i)).join("");

/** Browser window. `body` is drawn in the content area under the toolbar: w × (h - 35). */
const browser = (x, y, w, h, ...body) =>
  at(
    x,
    y,
    box(0, 0, w, h, 0.05, 12),
    frame(0, 0, w, h, 12),
    rule(0, 34.5, w, 34.5),
    dot(18, 17, 4, 0.45),
    dot(32, 17, 4, 0.3),
    dot(46, 17, 4, 0.2),
    box(72, 9, w - 144, 16, 0.1, 8),
    at(0, 35, ...body),
  );

/** Phone frame. `body` is drawn under the speaker: w × (h - 24). */
const phone = (x, y, w, h, ...body) =>
  at(x, y, box(0, 0, w, h, 0.05, 20), frame(0, 0, w, h, 20), box(w / 2 - 18, 8, 36, 6, 0.3, 3), at(0, 24, ...body));

/** Full-size browser window: content area 544 × 285. */
const page = (...body) => browser(48, 40, 544, 320, ...body);

const sparkle = (cx, cy, r, a) =>
  shape(`M${cx} ${cy - r}Q${cx} ${cy} ${cx + r} ${cy}Q${cx} ${cy} ${cx} ${cy + r}Q${cx} ${cy} ${cx - r} ${cy}Q${cx} ${cy} ${cx} ${cy - r}Z`, a);

const cylinder = (cx, y, r, h) =>
  shape(`M${cx - r} ${y}v${h}a${r} 8 0 0 0 ${2 * r} 0v${-h}a${r} 8 0 0 0 ${-2 * r} 0z`, 0.1) +
  stroke(`M${cx - r} ${y}v${h}a${r} 8 0 0 0 ${2 * r} 0v${-h}`, 0.3, 1) +
  `<ellipse cx="${cx}" cy="${y}" rx="${r}" ry="8" fill="${INK}" fill-opacity="0.3"/>` +
  stroke(`M${cx - r} ${y + 16}a${r} 8 0 0 0 ${2 * r} 0M${cx - r} ${y + 32}a${r} 8 0 0 0 ${2 * r} 0`, 0.3, 1);

// ---------------------------------------------------------------------------
// One layout per work item, keyed by its slug in `src/data/work.ts`.
// ---------------------------------------------------------------------------

const mockups = {
  /** Dashboard with a sidebar, stats and a table, next to its mobile app. */
  "neocentral-si": () =>
    browser(
      36,
      44,
      420,
      312,
      box(14, 14, 26, 26, 0.7, 7),
      times(6, (i) => box(14, 60 + i * 22, [64, 52, 58, 44, 60, 48][i], 8, i === 0 ? 0.6 : 0.2, 4)),
      rule(96.5, 0, 96.5, 277),
      box(114, 18, 110, 10, 0.55, 5),
      box(364, 14, 40, 18, 0.7, 9),
      times(3, (i) => {
        const x = 114 + i * 98;
        return box(x, 46, 88, 54, 0.08, 8) + box(x + 10, 58, 36, 5, 0.25, 2.5) + box(x + 10, 72, 52, 12, i === 0 ? 0.7 : 0.4, 4);
      }),
      box(114, 116, 290, 20, 0.12, 5),
      times(5, (i) => {
        const y = 146 + i * 24;
        return (
          dot(124, y + 6, 6, 0.25) +
          box(138, y + 2, [90, 70, 100, 60, 84][i], 7, 0.3, 3.5) +
          box(260, y + 2, 50, 7, 0.15, 3.5) +
          box(360, y, 44, 12, i % 2 ? 0.15 : 0.6, 6)
        );
      }),
    ) +
    phone(
      486,
      64,
      118,
      272,
      box(12, 8, 50, 9, 0.55, 4.5),
      dot(98, 12, 8, 0.25),
      box(12, 30, 94, 44, 0.14, 10),
      box(22, 40, 44, 6, 0.5, 3),
      box(22, 54, 60, 5, 0.25, 2.5),
      times(4, (i) => {
        const y = 86 + i * 32;
        return (
          box(12, y, 94, 26, 0.08, 8) +
          dot(26, y + 13, 7, i === 0 ? 0.6 : 0.25) +
          box(40, y + 7, [44, 36, 50, 40][i], 5, 0.35, 2.5) +
          box(40, y + 15, 30, 4, 0.15, 2)
        );
      }),
      rule(0, 222.5, 118, 222.5),
      dot(30, 235, 5, 0.6),
      dot(59, 235, 5, 0.2),
      dot(88, 235, 5, 0.2),
    ),

  /** Prompt form on the left, the generated document on the right. */
  genprd: () =>
    page(
      box(20, 20, 70, 9, 0.55, 4.5),
      frame(20, 42, 160, 26, 7),
      box(30, 52, 80, 6, 0.2, 3),
      frame(20, 78, 160, 26, 7),
      box(30, 88, 56, 6, 0.2, 3),
      frame(20, 114, 160, 86, 7),
      text(30, 126, [130, 118, 136, 90], 0.2),
      box(20, 214, 160, 30, 0.75, 8),
      rule(200.5, 0, 200.5, 285),
      box(224, 20, 296, 245, 0.07, 8),
      frame(224, 20, 296, 245, 8, 0.2),
      box(244, 40, 150, 12, 0.6, 6),
      sparkle(492, 46, 10, 0.7),
      sparkle(474, 62, 5, 0.4),
      text(244, 66, [256, 240, 250, 180]),
      box(244, 124, 96, 9, 0.45, 4.5),
      times(3, (i) => dot(248, 148 + i * 14, 3, 0.45) + box(258, 145 + i * 14, [200, 170, 216][i], 6, 0.22, 3)),
      box(244, 196, 80, 9, 0.45, 4.5),
      times(3, (i) => box(244 + i * 88, 216, 80, 34, 0.1, 6)),
    ),

  /** Search, a date strip and a grid of room cards with one selected. */
  bookmyspace: () =>
    page(
      box(20, 16, 180, 24, 0.1, 12),
      dot(34, 28, 4, 0.4),
      times(5, (i) => box(300 + i * 46, 16, 40, 24, i === 2 ? 0.75 : 0.1, 8)),
      times(6, (i) => {
        const x = 20 + (i % 3) * 172;
        const y = 56 + Math.floor(i / 3) * 112;
        const selected = i === 1;
        return (
          box(x, y, 160, 100, selected ? 0.14 : 0.07, 10) +
          (selected ? frame(x, y, 160, 100, 10, 0.7) : "") +
          box(x + 8, y + 8, 144, 46, 0.12, 6) +
          dot(x + 30, y + 24, 6, 0.3) +
          shape(`M${x + 14} ${y + 54}L${x + 52} ${y + 30}L${x + 78} ${y + 44}L${x + 106} ${y + 24}L${x + 146} ${y + 54}Z`, 0.2) +
          box(x + 8, y + 64, [72, 90, 60, 84, 66, 78][i], 7, 0.45, 3.5) +
          box(x + 8, y + 79, 44, 5, 0.2, 2.5) +
          box(x + 112, y + 72, 40, 16, selected ? 0.75 : 0.18, 8)
        );
      }),
    ),

  /** Stat tiles above a visitor log with status pills. */
  "visitor-management-system": () =>
    page(
      box(20, 18, 130, 11, 0.55, 5.5),
      box(396, 14, 84, 20, 0.1, 10),
      box(488, 14, 36, 20, 0.75, 10),
      times(4, (i) => {
        const x = 20 + i * 128;
        return (
          box(x, 48, 120, 50, 0.08, 8) +
          dot(x + 18, 73, 8, i === 0 ? 0.6 : 0.2) +
          box(x + 34, 62, 40, 5, 0.25, 2.5) +
          box(x + 34, 74, [56, 44, 62, 50][i], 10, 0.5, 4)
        );
      }),
      box(20, 112, 504, 22, 0.12, 6),
      [40, 200, 330, 450].map((x) => box(x, 120, 44, 6, 0.35, 3)).join(""),
      times(5, (i) => {
        const y = 146 + i * 26;
        return (
          dot(32, y + 8, 8, 0.25) +
          box(48, y + 4, [96, 80, 110, 72, 90][i], 7, 0.4, 3.5) +
          box(200, y + 4, [70, 86, 60, 78, 66][i], 7, 0.2, 3.5) +
          box(330, y + 4, 60, 7, 0.2, 3.5) +
          box(450, y, 62, 15, [0.7, 0.2, 0.7, 0.2, 0.4][i], 7.5) +
          rule(20, y + 21.5, 524, y + 21.5, 0.12)
        );
      }),
    ),

  /** Attendance calendar on the left, a bar chart and a list on the right. */
  silab: () => {
    const days = [
      0.1, 0.5, 0.5, 0.5, 0.1, 0.5, 0.1, 0.5, 0.5, 0.1, 0.5, 0.5, 0.1, 0.1, 0.5, 0.1, 0.5, 0.5, 0.85, 0.1,
      0.1, 0.5, 0.5, 0.5, 0.1, 0.5, 0.1, 0.1, 0.5, 0.5, 0.1, 0.1, 0.1, 0.1, 0.1,
    ];
    const bars = [38, 62, 46, 84, 70, 96, 54];
    return page(
      box(20, 18, 96, 11, 0.55, 5.5),
      box(196, 16, 20, 16, 0.12, 5),
      box(222, 16, 20, 16, 0.12, 5),
      times(7, (i) => box(26 + i * 32, 46, 14, 5, 0.3, 2.5)),
      days.map((a, i) => box(20 + (i % 7) * 32, 60 + Math.floor(i / 7) * 32, 26, 26, a, 6)).join(""),
      rule(262.5, 0, 262.5, 285),
      box(282, 18, 80, 11, 0.55, 5.5),
      box(470, 16, 54, 16, 0.1, 8),
      bars.map((h, i) => box(286 + i * 34, 160 - h, 22, h, i === 5 ? 0.75 : 0.28, 5)).join(""),
      rule(282, 160.5, 524, 160.5, 0.25),
      times(3, (i) => {
        const y = 180 + i * 30;
        return (
          box(282, y, 242, 24, 0.08, 7) +
          dot(296, y + 12, 6, 0.3) +
          box(310, y + 9, [110, 90, 124][i], 6, 0.35, 3) +
          box(476, y + 6, 38, 12, i === 0 ? 0.6 : 0.18, 6)
        );
      }),
    );
  },

  /** Public landing page: site nav, headline with calls to action, service cards. */
  "dpmptsp-public-website-redesign": () =>
    page(
      box(20, 14, 22, 22, 0.7, 6),
      times(4, (i) => box(250 + i * 52, 22, 38, 6, 0.25, 3)),
      box(468, 14, 56, 22, 0.75, 11),
      rule(0, 50.5, 544, 50.5, 0.15),
      box(20, 76, 210, 16, 0.6, 6),
      box(20, 100, 160, 16, 0.6, 6),
      text(20, 130, [220, 196, 150]),
      box(20, 176, 86, 26, 0.75, 13),
      frame(114, 176, 86, 26, 13, 0.45),
      box(290, 68, 234, 140, 0.1, 12),
      dot(470, 104, 14, 0.3),
      shape("M302 208L356 152L394 184L442 136L512 200V208Z", 0.22),
      times(3, (i) => {
        const x = 20 + i * 172;
        return (
          box(x, 226, 160, 46, 0.08, 8) +
          dot(x + 22, 249, 10, i === 1 ? 0.6 : 0.22) +
          box(x + 40, 240, [84, 70, 92][i], 7, 0.4, 3.5) +
          box(x + 40, 253, 56, 5, 0.2, 2.5)
        );
      }),
    ),

  /** A spiral-bound module booklet beside a code editor. */
  "web-programming-practicum-module": () => {
    const code = [
      [0, [[58, 0.6]]],
      [0, [[40, 0.6], [70, 0.25]]],
      [1, [[46, 0.6]]],
      [2, [[34, 0.6], [96, 0.25], [30, 0.45]]],
      [2, [[52, 0.6], [60, 0.25]]],
      [1, [[46, 0.6]]],
      [1, [[40, 0.6], [84, 0.25]]],
      [2, [[30, 0.6], [120, 0.25]]],
      [2, [[64, 0.6], [44, 0.45], [50, 0.25]]],
      [3, [[90, 0.25]]],
      [2, [[38, 0.6]]],
      [1, [[40, 0.6]]],
      [0, [[58, 0.6]]],
    ];
    return (
      at(
        44,
        64,
        box(0, 0, 176, 272, 0.06, 10),
        frame(0, 0, 176, 272, 10),
        times(9, (i) => dot(12, 24 + i * 28, 3.5, 0.35)),
        rule(24.5, 0, 24.5, 272, 0.15),
        box(40, 28, 44, 7, 0.3, 3.5),
        box(40, 46, 112, 14, 0.65, 5),
        box(40, 66, 84, 14, 0.65, 5),
        box(40, 96, 120, 60, 0.12, 8),
        stroke("M84 114l-12 12 12 12M116 114l12 12-12 12M106 108l-12 36", 0.6, 3),
        text(40, 176, [118, 104, 112, 80]),
        box(40, 236, 60, 16, 0.18, 8),
      ) +
      at(
        244,
        48,
        box(0, 0, 352, 304, 0.05, 12),
        frame(0, 0, 352, 304, 12),
        box(12, 10, 84, 20, 0.14, 6),
        box(22, 17, 44, 6, 0.45, 3),
        box(102, 10, 70, 20, 0.06, 6),
        box(112, 17, 40, 6, 0.2, 3),
        rule(0, 38.5, 352, 38.5),
        rule(40.5, 39, 40.5, 304, 0.12),
        box(41, 174, 310, 18, 0.07),
        code
          .map(([indent, segments], i) => {
            const y = 54 + i * 18;
            let x = 54 + indent * 18;
            const line = segments.map(([w, a]) => {
              const bar = box(x, y, w, 6, a, 3);
              x += w + 8;
              return bar;
            });
            return box(14, y, 12, 6, 0.18, 3) + line.join("");
          })
          .join(""),
      )
    );
  },

  /** Architecture diagram: users, a load balancer, three services, a database and a bucket. */
  "cloud-computing-teaching-assistant": () => {
    const grid = [];
    for (let x = 40; x <= 600; x += 40) for (let y = 40; y <= 360; y += 40) grid.push(dot(x, y, 1.25, 0.16));
    const arrow = (x, y) => shape(`M${x} ${y}l-8-4.5v9z`, 0.5);
    return (
      grid.join("") +
      box(40, 28, 132, 22, 0.1, 11) +
      dot(54, 39, 4, 0.5) +
      box(64, 36, 96, 6, 0.35, 3) +
      // Region
      stroke("M312 56h268a16 16 0 0 1 16 16v260a16 16 0 0 1-16 16H312a16 16 0 0 1-16-16V72a16 16 0 0 1 16-16z", 0.35, 1, ' stroke-dasharray="4 6"') +
      box(312, 68, 64, 8, 0.35, 4) +
      // Users
      dot(84, 204, 26, 0.1) +
      `<circle cx="84" cy="204" r="25.5" fill="none" stroke="${INK}" stroke-opacity="0.3"/>` +
      dot(84, 196, 7, 0.55) +
      shape("M70 218a14 12 0 0 1 28 0z", 0.55) +
      // Load balancer
      box(164, 176, 84, 56, 0.08, 10) +
      frame(164, 176, 84, 56, 10) +
      stroke("M186 196h36M214 189l8 7-8 7", 0.6, 2.5) +
      box(180, 214, 52, 6, 0.3, 3) +
      // Services
      times(3, (i) => {
        const y = 92 + i * 84;
        return (
          box(312, y, 112, 56, i === 1 ? 0.16 : 0.08, 10) +
          frame(312, y, 112, 56, 10, i === 1 ? 0.6 : 0.3) +
          box(324, y + 14, 28, 28, i === 1 ? 0.7 : 0.35, 7) +
          box(362, y + 18, 46, 6, 0.4, 3) +
          box(362, y + 31, 30, 5, 0.2, 2.5)
        );
      }) +
      // Data stores
      cylinder(536, 108, 30, 48) +
      shape("M508 256H564L557 304H515Z", 0.1) +
      stroke("M508 256L515 304H557L564 256", 0.3, 1) +
      `<ellipse cx="536" cy="256" rx="28" ry="7" fill="${INK}" fill-opacity="0.3"/>` +
      box(520, 276, 32, 6, 0.3, 3) +
      // Connectors
      stroke("M112 204h42M250 204h30M280 120v168M280 120h22M280 204h22M280 288h22", 0.45) +
      stroke("M426 120h44v12h26M426 204h44v-72M426 288h44v-8h28", 0.45) +
      arrow(162, 204) +
      arrow(310, 120) +
      arrow(310, 204) +
      arrow(310, 288) +
      arrow(504, 132) +
      arrow(506, 280)
    );
  },
};

const mockup = (slug) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" width="640" height="400" role="img">` +
  `<title>${slug} placeholder mockup</title>${mockups[slug]()}</svg>\n`;

// ---------------------------------------------------------------------------
// Logo, favicon and social image
// ---------------------------------------------------------------------------

/** Stand-in for every organisation's logo until the real ones are dropped in. */
const googleLogo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" role="img">
<title>Placeholder logo</title>
<path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
<path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
<path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
<path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
</svg>
`;

/** The "F" initial on a rounded tile. `size` is the tile's side; the glyph is drawn on a 32 grid. */
const fMark = (size, tile, glyph, radius = 7) =>
  `<g transform="scale(${size / 32})"><rect width="32" height="32" rx="${radius}" fill="${tile}"/>` +
  `<path fill="${glyph}" d="M10.5 8h12v3.6h-8v3.3h6.6v3.5h-6.6V24h-4z"/></g>`;

/** Follows the OS theme, like Moon's primary color does: dark tile on light, white tile on dark. */
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
<style>.t{fill:${MOON.primary}}.g{fill:${MOON.white}}@media (prefers-color-scheme:dark){.t{fill:${MOON.white}}.g{fill:${MOON.dark}}}</style>
<rect class="t" width="32" height="32" rx="7"/>
<path class="g" d="M10.5 8h12v3.6h-8v3.3h6.6v3.5h-6.6V24h-4z"/>
</svg>
`;

const icon = (size, radius) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">${fMark(size, MOON.primary, MOON.white, radius)}</svg>`;

/** 1200 × 630 Open Graph card. Edit the two lines of text if the name or role changes. */
function socialCard() {
  const tiles = [];
  const corners = (x, y, c) => [
    `M${x} ${y}h${c}a${c} ${c} 0 0 1 ${-c} ${c}z`,
    `M${x + c} ${y}v${c}a${c} ${c} 0 0 1 ${-c} ${-c}z`,
    `M${x + c} ${y + c}h${-c}a${c} ${c} 0 0 1 ${c} ${-c}z`,
    `M${x} ${y + c}v${-c}a${c} ${c} 0 0 1 ${c} ${c}z`,
  ];
  // Corner index and alpha per tile, row by row. Two columns only: the text is set
  // in whatever sans-serif the machine has, so it needs room to run wide.
  const pattern = [
    [0, 0.85], [2, 0.18],
    [3, 0.3], [0, 0.6],
    [1, 0.18], [3, 0.85],
    [2, 0.5], [1, 0.12],
  ];
  pattern.forEach(([corner, a], i) => {
    const x = 930 + (i % 2) * 120;
    const y = 75 + Math.floor(i / 2) * 120;
    tiles.push(`<path d="${corners(x, y, 120)[corner]}" fill="${MOON.primary}" fill-opacity="${a}"/>`);
  });
  const font = `font-family="Inter, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'DejaVu Sans', 'Liberation Sans', sans-serif"`;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">` +
    `<rect width="1200" height="630" fill="${MOON.white}"/>${tiles.join("")}` +
    `<g transform="translate(90 96)">${fMark(96, MOON.primary, MOON.white)}</g>` +
    `<text x="90" y="372" ${font} font-size="56" font-weight="600" fill="${MOON.primary}" letter-spacing="-1">Mustafa Fathur Rahman</text>` +
    `<text x="90" y="432" ${font} font-size="32" fill="${MOON.muted}">Cloud Engineer / Backend Developer</text>` +
    `</svg>`
  );
}

/** Wraps a PNG in a single-image .ico container. */
function ico(png, size) {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // image count
  header.writeUInt8(size, 6);
  header.writeUInt8(size, 7);
  header.writeUInt16LE(1, 10); // color planes
  header.writeUInt16LE(32, 12); // bits per pixel
  header.writeUInt32LE(png.length, 14);
  header.writeUInt32LE(22, 18); // offset of the image data
  return Buffer.concat([header, png]);
}

// ---------------------------------------------------------------------------

const written = [];
const kept = [];

async function emit(relative, contents) {
  const file = path.join(publicDir, relative);
  if (existsSync(file) && !force) return void kept.push(relative);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, typeof contents === "function" ? await contents() : contents);
  written.push(relative);
}

for (const slug of Object.keys(mockups)) await emit(`images/work/${slug}.svg`, mockup(slug));
await emit("images/logos/placeholder-google.svg", googleLogo);
await emit("favicon.svg", favicon);

// The raster files need sharp, which Astro already installs for its image service.
let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.warn("generate:placeholders: sharp is not installed, skipped favicon.ico, apple-touch-icon.png and og.png.");
}

if (sharp) {
  const png = (svg) => sharp(Buffer.from(svg)).png().toBuffer();
  await emit("favicon.ico", async () => ico(await png(icon(32, 7)), 32));
  await emit("apple-touch-icon.png", () => png(icon(180, 0)));
  await emit("og.png", () => png(socialCard()));
}

console.log(`generate:placeholders: wrote ${written.length} file(s), kept ${kept.length} existing.`);
for (const file of written) console.log(`  + public/${file}`);
if (kept.length > 0) console.log("  (pass --force to overwrite the existing files)");
