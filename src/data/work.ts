/**
 * Work items, in display order. `/work` lists all of them; the home page shows
 * the ones marked `featured`.
 *
 * Images live in `public/images/work/`. They are generated placeholders: replace
 * a file (or point `image` at a real 16:10 screenshot) to swap one.
 */

export interface WorkItem {
  slug: string;
  title: string;
  context: string;
  year: number;
  stack: string[];
  /** One or two sentences for the card. */
  summary: string;
  /** Detail for a future case-study page; not rendered yet. */
  bullets: string[];
  repo?: string;
  url?: string;
  image: string;
  featured: boolean;
}

const image = (slug: string) => `/images/work/${slug}.svg`;

export const work: WorkItem[] = [
  {
    slug: "neocentral-si",
    title: "NeoCentral SI",
    context: "Academic Information System",
    year: 2025, // TODO: confirm. Inferred from the public repositories (created Oct 2025).
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "Prisma",
      "MySQL",
      "Flutter",
      "Docker",
      "Docker Compose",
      "Nginx",
      "Cloudflare",
      "Redis",
    ],
    summary:
      "Thesis seminar, thesis defense and graduation modules built end to end across web, API and a Flutter mobile app, deployed on a Linux server with Docker Compose behind Nginx and Cloudflare.",
    bullets: [
      "Deployed and maintained the stack on a Linux server with Docker Compose, serving traffic through Nginx and Cloudflare, with Redis supporting app services.",
      "Built end-to-end thesis seminar, thesis defense and graduation modules across web, API, data layer and Flutter mobile app.",
      "Implemented auth/authorization, file handling and notification services.",
    ],
    repo: "https://github.com/NeoCentralSI",
    image: image("neocentral-si"),
    featured: true,
  },
  {
    slug: "genprd",
    title: "GenPRD",
    context: "AI-Assisted PRD Generator",
    year: 2024, // TODO: confirm. Inferred from the public repository (created Nov 2024).
    stack: ["Express.js", "Google Cloud", "MySQL"],
    summary:
      "Express.js backend API deployed to Cloud Run and App Engine, with separate staging and production MySQL on Compute Engine and Cloud SQL. Bronze Medal at iReX 2025 and Best Team in the Bangkit capstone.",
    bullets: [
      "Deployed components to Cloud Run and App Engine, with separate staging and production MySQL on Compute Engine and Cloud SQL.",
      "Built the Express.js backend API and integrated it with cloud and ML teammates' services.",
    ],
    repo: "https://github.com/mustafa-fathur/PRD-Maker-with-LLM",
    image: image("genprd"),
    featured: true,
  },
  {
    slug: "bookmyspace",
    title: "BookMySpace",
    context: "Containerized Deployment on Google Cloud",
    year: 2024, // TODO: confirm. Inferred from the public repository (created Dec 2024).
    stack: ["Express.js", "Docker", "Google Cloud"],
    summary:
      "A full-stack Express app containerized and deployed to Cloud Run (asia-southeast1), with images built by Cloud Build and stored in Artifact Registry.",
    bullets: [
      "Containerized a full-stack Express app and deployed it to Cloud Run (asia-southeast1), building images with Cloud Build and storing them in Artifact Registry.",
    ],
    image: image("bookmyspace"),
    featured: true,
  },
  {
    slug: "visitor-management-system",
    title: "Visitor Management System",
    context: "DPMPTSP Kota Padang",
    year: 2025,
    stack: ["Laravel"],
    summary:
      "Web-based system replacing manual visitor records, with workflow automation, role-based access control and notifications.",
    bullets: [
      "Web-based system replacing manual visitor records, with workflow automation, role-based access control and notifications.",
    ],
    image: image("visitor-management-system"),
    featured: true,
  },
  {
    slug: "silab",
    title: "SILAB",
    context: "Laboratory Management Information System",
    year: 2025, // TODO: confirm. Inferred from the public repository (created Mar 2025).
    stack: ["Laravel", "Inertia.js", "React"],
    summary:
      "Owned the backend of the internal correspondence and lab-assistant duty attendance modules.",
    bullets: [
      "Owned the backend of the internal correspondence and lab-assistant duty attendance modules.",
    ],
    repo: "https://github.com/mustafa-fathur/silab",
    image: image("silab"),
    featured: true,
  },
  {
    slug: "dpmptsp-public-website-redesign",
    title: "DPMPTSP Public Website Redesign",
    context: "DPMPTSP Kota Padang",
    year: 2025,
    stack: ["Laravel"],
    summary:
      "Contributed to the redesign and content-management features of the office's public website as a web developer intern.",
    bullets: [
      "Contributed to the redesign and content-management features of the office's public website.",
    ],
    image: image("dpmptsp-public-website-redesign"),
    featured: true,
  },
];

export const featuredWork = work.filter((item) => item.featured);
