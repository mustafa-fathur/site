/**
 * Project items, in display order. `/projects` lists all of them; the home page
 * shows the ones marked `featured`.
 *
 * Images live in `public/images/projects/`.
 */

export interface ProjectRepoLink {
  label: string;
  href: string;
}

export interface ProjectDevicePreview {
  web: string;
  /** Second web screenshot for dual-evolution projects (BookMySpace // FTIRoom). */
  webSecondary?: string;
  /** Mobile screenshot for web + mobile projects (NeoCentral SI). */
  mobile?: string;
}

export interface ProjectItem {
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
  /** Multiple repositories behind a single GitHub icon menu. */
  repos?: ProjectRepoLink[];
  url?: string;
  image: string;
  /** Real screenshots for the home tile and modal showcase. */
  devicePreview?: ProjectDevicePreview;
  featured: boolean;
}

export const projects: ProjectItem[] = [
  {
    slug: "mentarisenja",
    title: "Mentarisenja",
    context: "Psychology Practice Booking & CMS",
    year: 2026,
    stack: ["Next.js", "PostgreSQL", "Docker", "Nginx", "Cloudflare"],
    summary:
      "Web application for a psychology practice where clients schedule consultations with psychologists, paired with an admin CMS for managing articles, psychologist profiles, appointments and client reviews.",
    bullets: [
      "Built the client appointment booking flow and admin content management system for articles, psychologist schedules, appointments and reviews.",
      "Deployed with Docker behind Nginx and Cloudflare.",
    ],
    url: "https://www.mentarisenja.id/",
    image: "/images/projects/mentarisenja/landing.png",
    devicePreview: {
      web: "/images/projects/mentarisenja/landing.png",
    },
    featured: false,
  },
  {
    slug: "tora",
    title: "Tora",
    context: "Personal Finance & Expense Tracker",
    year: 2026,
    stack: ["Claude", "React Native", "Next.js", "Netlify", "Supabase", "Cloudflare"],
    summary:
      "A fully vibe-coded personal finance and money tracking app across web and mobile, inspired by Monarch Money.",
    bullets: [
      "Built web and mobile personal finance tracking interfaces backed by Supabase and deployed on Netlify behind Cloudflare.",
    ],
    repo: "https://github.com/mustafa-fathur/tora",
    repos: [
      { label: "Tora Web", href: "https://github.com/mustafa-fathur/tora" },
      { label: "Tora Mobile", href: "https://github.com/mustafa-fathur/tora-mobile" },
    ],
    url: "https://tora.fathur.site/",
    image: "/images/projects/tora/web-landing.png",
    devicePreview: {
      web: "/images/projects/tora/web-landing.png",
    },
    featured: false,
  },
  {
    slug: "neocentral-si",
    title: "NeoCentral SI",
    context: "Academic Information System",
    year: 2026,
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
    url: "https://neocentral.fathur.site",
    image: "/images/projects/neocentral/web-landing.png",
    devicePreview: {
      web: "/images/projects/neocentral/web-landing.png",
      mobile: "/images/projects/neocentral/mobile-login.jpg",
    },
    featured: true,
  },
  {
    slug: "rantauhub",
    title: "RantauHub",
    context: "Diaspora Mentorship & MSME Funding Platform",
    year: 2025,
    stack: ["Laravel", "Livewire", "MySQL"],
    summary:
      "Web platform connecting the Minangkabau diaspora with local small businesses (UMKM) through online seminars, private mentoring sessions and direct capital investment. Built for the October 2025 Firetech Neo Telemetri 24-Hour Hackathon under the theme Smart Solutions for Sustainable West Sumatra.",
    bullets: [
      "Built during the October 2025 Firetech Neo Telemetri 24-Hour Hackathon to connect Minangkabau diaspora mentors and investors with West Sumatra MSMEs.",
    ],
    repo: "https://github.com/mustafa-fathur/rantauhub",
    image: "/images/projects/rantauhub/landing.png",
    devicePreview: {
      web: "/images/projects/rantauhub/landing.png",
    },
    featured: false,
  },
  {
    slug: "silab",
    title: "SILAB",
    context: "Laboratory Management Information System",
    year: 2025,
    stack: ["Laravel", "Inertia.js", "React"],
    summary:
      "Owned the internal correspondence and lab-assistant duty attendance modules.",
    bullets: [
      "Owned the internal correspondence and lab-assistant duty attendance modules.",
    ],
    repo: "https://github.com/mustafa-fathur/silab",
    url: "https://silab.si.fti.unand.ac.id",
    image: "/images/projects/silab/login.png",
    devicePreview: {
      web: "/images/projects/silab/login.png",
    },
    featured: true,
  },
  {
    slug: "yayasan-teman-sehati-sejati",
    title: "Yayasan Teman Sehati Sejati",
    context: "Foundation Profile Website",
    year: 2025,
    stack: ["React.js"],
    summary:
      "Public profile and landing page for Yayasan Teman Sehati Sejati, a community foundation based in Padang.",
    bullets: [
      "Built and shipped the public profile website for Yayasan Teman Sehati Sejati in Padang.",
    ],
    url: "https://www.yayasantemansehatisejati.com/",
    image: "/images/projects/yayasan-teman-sehati-sejati/landing.png",
    devicePreview: {
      web: "/images/projects/yayasan-teman-sehati-sejati/landing.png",
    },
    featured: false,
  },
  {
    slug: "clear",
    title: "CLEAR",
    context: "Whistleblowing System · DPMPTSP Kota Padang",
    year: 2025,
    stack: ["React.js", "Express.js", "MySQL"],
    summary:
      "Internal whistleblowing web application for reporting misconduct and policy violations within the DPMPTSP Kota Padang agency environment.",
    bullets: [
      "Built backend features for reporting and tracking internal violation reports at DPMPTSP Kota Padang.",
    ],
    repo: "https://github.com/kp-dpmptsp-padang",
    image: "/images/projects/clear-wbs-dpmptsp-padang/landing.png",
    devicePreview: {
      web: "/images/projects/clear-wbs-dpmptsp-padang/landing.png",
    },
    featured: false,
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
    repo: "https://github.com/kp-dpmptsp-padang",
    url: "https://penerimaan-kunjungan.dpmptsp.padang.go.id/",
    image: "/images/projects/reservasi-dpmptsp-padang/landing.png",
    devicePreview: {
      web: "/images/projects/reservasi-dpmptsp-padang/landing.png",
    },
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
    repo: "https://github.com/kp-dpmptsp-padang",
    url: "https://dpmptsp.padang.go.id/",
    image: "/images/projects/profile-dpmptsp-padang/landing.png",
    devicePreview: {
      web: "/images/projects/profile-dpmptsp-padang/landing.png",
    },
    featured: true,
  },
  {
    slug: "bersama-rakyat",
    title: "Bersama Rakyat",
    context: "Public Promise & Policy Tracker",
    year: 2024,
    stack: ["React.js", "Express.js", "MySQL"],
    summary:
      "Web platform for tracking campaign promises made by elected officials and monitoring their realization in office. Built for the CyberTech 24-Hour Hackathon, where it won 3rd place.",
    bullets: [
      "Built during the CyberTech 24-Hour Hackathon (3rd Place) to track political promises and their progress.",
    ],
    repo: "https://github.com/mustafa-fathur/bersama-rakyat",
    image: "/images/projects/bersama-rakyat/landing.png",
    devicePreview: {
      web: "/images/projects/bersama-rakyat/landing.png",
    },
    featured: false,
  },
  {
    slug: "genprd",
    title: "GenPRD",
    context: "AI-Assisted PRD Generator",
    year: 2024,
    stack: ["React.js", "Express.js", "Flask", "MySQL", "Google Cloud"],
    summary:
      "Express.js backend API deployed to Cloud Run and App Engine, with separate staging and production MySQL on Compute Engine and Cloud SQL. Bronze Medal at iReX 2025 and Best Team in the Bangkit capstone.",
    bullets: [
      "Deployed components to Cloud Run and App Engine, with separate staging and production MySQL on Compute Engine and Cloud SQL.",
      "Built the Express.js backend API and integrated it with cloud and ML teammates' services.",
    ],
    repo: "https://github.com/mustafa-fathur/PRD-Maker-with-LLM",
    image: "/images/projects/genprd/landing.png",
    devicePreview: {
      web: "/images/projects/genprd/landing.png",
    },
    featured: true,
  },
  {
    slug: "mahasiswa-mengajar",
    title: "Mahasiswa Mengajar",
    context: "Student Volunteer Teaching Platform",
    year: 2024,
    stack: ["Express.js", "TailwindCSS", "MySQL"],
    summary:
      "Web platform connecting university students with understaffed schools and educational institutions to volunteer as teaching assistants. Built during the June 2024 Firetech Neo Telemetri (UNAND) 24-Hour Hackathon.",
    bullets: [
      "Built during the June 2024 Firetech Neo Telemetri 24-Hour Hackathon to match university student volunteers with schools lacking teaching staff.",
    ],
    repo: "https://github.com/mustafa-fathur/mahasiswa-mengajar",
    image: "/images/projects/mahasiswa-mengajar/landing.png",
    devicePreview: {
      web: "/images/projects/mahasiswa-mengajar/landing.png",
    },
    featured: false,
  },
  {
    slug: "bookmyspace",
    title: "BookMySpace // FTIRoom",
    context: "Containerized Deployment on Google Cloud",
    year: 2024,
    stack: ["Express.js", "Docker", "Google Cloud"],
    summary:
      "A full-stack Express app containerized and deployed to Cloud Run (asia-southeast1), with images built by Cloud Build and stored in Artifact Registry.",
    bullets: [
      "Containerized a full-stack Express app and deployed it to Cloud Run (asia-southeast1), building images with Cloud Build and storing them in Artifact Registry.",
    ],
    repo: "https://github.com/mustafa-fathur/bookmyspace",
    repos: [
      { label: "BookMySpace", href: "https://github.com/mustafa-fathur/bookmyspace" },
      { label: "FTIRoom", href: "https://github.com/mustafa-fathur/FTIRoom" },
    ],
    image: "/images/projects/bookmyspace-ftiroom/bookmyspace-landing.png",
    devicePreview: {
      web: "/images/projects/bookmyspace-ftiroom/bookmyspace-landing.png",
      webSecondary: "/images/projects/bookmyspace-ftiroom/ftiroom-landing.png",
    },
    featured: true,
  },
  {
    slug: "gudang-beasiswa",
    title: "Gudang Beasiswa",
    context: "Scholarship Directory & Management System",
    year: 2024,
    stack: ["Laravel", "MySQL"],
    summary:
      "Scholarship directory web application where administrators manage scholarship listings and partner institutions, while visitors browse available programs on the public landing page.",
    bullets: [
      "Built CRUD management for scholarship listings and partner institutions alongside a public scholarship directory.",
    ],
    repo: "https://github.com/mustafa-fathur/gudangbeasiswa",
    image: "/images/projects/gudang-beasiswa/landing.png",
    devicePreview: {
      web: "/images/projects/gudang-beasiswa/landing.png",
    },
    featured: false,
  },
];

export const featuredProjects = projects.filter((item) => item.featured);
