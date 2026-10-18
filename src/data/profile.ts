/**
 * Single source of truth for the profile content. Edit text here; the
 * components only handle presentation.
 */

/**
 * Every organisation uses this placeholder for now. To swap one, drop its logo
 * into `public/images/logos/` and point that entry's `logo` at the new file.
 */
export const PLACEHOLDER_LOGO = "/images/logos/placeholder-google.svg";

export interface SocialLink {
  label: string;
  /** What the contact list prints as the link text: the address or the handle. */
  handle?: string;
  href: string;
  /** Icon for the contact list and footer. */
  icon: "mail" | "linkedin" | "instagram" | "github";
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Role {
  role: string;
  /** Short name, printed as "<role> at <org>". */
  org: string;
  /**
   * One line under the title. It holds the department or office for now;
   * replace it with a sentence about the role whenever you like.
   */
  description?: string;
  period: string;
  logo: string;
  bullets: string[];
}

export interface Education {
  school: string;
  program: string;
  /** Second line under the program, e.g. who runs it. */
  detail?: string;
  period: string;
  /** Short highlight shown as a badge, e.g. a GPA. */
  note?: string;
  logo: string;
}

export interface Award {
  title: string;
  detail?: string;
  date: string;
  type: "Certification" | "Award" | "Exchange Program";
  logo: string;
}

export const profile = {
  name: "Mustafa Fathur Rahman",
  /** Text wordmark in the navbar. */
  brand: "Fathur",
  role: "Cloud Engineer / Backend Developer",
  email: "mustafa.fathur@gmail.com",
  /** CV summary, one entry per paragraph. */
  // summary: [
  //   "Google Cloud Certified Associate Cloud Engineer and Information Systems graduate (Universitas Andalas, GPA 3.82/4.00) with hands-on experience deploying and running web applications on Google Cloud and Linux servers using Docker, Nginx, Cloudflare, Cloud Run and Cloud SQL. Taught core Google Cloud services as a Cloud Computing teaching assistant, with a backend foundation in Node.js, Express and TypeScript.",
  //   "Looking for an entry-level Cloud Engineer role that bridges development, deployment and operations.",
  // ],
  summary : [
    "Hello, World!"
  ],
  /** Default meta description, also used for Open Graph and Twitter cards. */
  description:
    "Mustafa Fathur Rahman is a Google Cloud Certified Associate Cloud Engineer and Backend Developer based in Indonesia, building and deploying web applications with Node.js, TypeScript, Express, Laravel, Docker and Google Cloud.",
};

export const links = {
  email: { label: "Email", handle: profile.email, href: `mailto:${profile.email}`, icon: "mail" },
  linkedin: {
    label: "LinkedIn",
    handle: "mustafa-fathur-rahman",
    href: "https://www.linkedin.com/in/mustafa-fathur-rahman",
    icon: "linkedin",
  },
  instagram: {
    label: "Instagram",
    handle: "@mustafa_fathur",
    href: "https://www.instagram.com/mustafa_fathur/",
    icon: "instagram",
  },
  github: {
    label: "GitHub",
    handle: "mustafa-fathur",
    href: "https://github.com/mustafa-fathur",
    icon: "github",
  },
} satisfies Record<string, SocialLink>;

export const skills: SkillGroup[] = [
  {
    label: "Platform",
    items: [
      "Google Cloud",
      "AWS",
      "Linux",
      "Docker",
      "Nginx",
      "Cloudflare",
      "GitHub",
    ],
  },
  {
    label: "Programming",
    items: [
      "Git",
      "JavaScript",
      "TypeScript",
      "Node.js",
      "Express.js",
      "Python",
      "PHP (Laravel)",
      "React",
      "Next.js",
      "Prisma",
      "Redis",
      "MySQL",
      "PostgreSQL",
    ],
  },
  {
    label: "Languages",
    items: ["Indonesian", "English"],
  },
];

export const experience: Role[] = [
  {
    role: "Cloud Computing Teaching Assistant",
    org: "Universitas Andalas",
    description: "Information Systems Dept.",
    period: "Apr 2026 – Jun 2026",
    logo: "/images/logos/unand.svg",
    bullets: [
      "Guided hands-on sessions on Compute Engine, App Engine, Cloud Run, Cloud SQL and Cloud Storage.",
      "Supported deployment exercises, assignments and Google Cloud Skills Boost labs.",
    ],
  },
  {
    role: "Assistant Coordinator",
    org: "Universitas Andalas",
    description: "Laboratory of System Development",
    period: "Feb 2025 – Dec 2025",
    logo: "/images/logos/lsd.png",
    bullets: [
      "Coordinated the lab assistant team, including operational meetings and skill-upgrading sessions.",
      "Authored the Web Programming practicum module; managed schedules, pre-quizzes and assignment monitoring.",
    ],
  },
  {
    role: "Web Developer Intern",
    org: "DPMPTSP Kota Padang",
    description: "Investment & One-Stop Integrated Services Office",
    period: "Jan 2025 – Feb 2025",
    logo: "/images/logos/kota-padang.svg",
    bullets: [
      "Built backend features for a visitor management system and a whistleblowing system (workflow automation, RBAC, notifications).",
      "Contributed to the redesign and content-management features of the office's public website.",
    ],
  },
];

export const education: Education[] = [
  {
    school: "Universitas Andalas",
    program: "B.Comp.Sc. in Information Systems",
    period: "2022 – 2026",
    note: "GPA 3.82/4.00",
    logo: "/images/logos/unand.svg",
  },
  {
    school: "Bangkit Academy",
    program: "Cloud Computing Learning Path",
    detail: "by Google, GoTo, Traveloka",
    period: "Completed Jan 2025",
    logo: "/images/logos/bangkit.svg",
  },
];

export const awards: Award[] = [
  {
    title: "Short-Term Student Exchange Program",
    detail: "National Institute of Technology, Kochi College (Kochi KOSEN), Japan",
    date: "8–19 Jun 2026",
    type: "Exchange Program",
    logo: "/images/logos/kosen.png",
  },
  {
    title: "Bronze Medal, Idea Regeneration Expo (iReX) 2025",
    detail: "Management and Science University, Malaysia · GenPRD",
    date: "Jun 2025",
    type: "Award",
    logo: "/images/logos/msu.png",
  },
  {
    title: "Google Cloud Certified – Associate Cloud Engineer",
    detail: "Google Cloud",
    date: "May 2025",
    type: "Certification",
    logo: "/images/logos/google.svg",
  },
  {
    title: "Best Team & Best Contributor, Bangkit Company Track Capstone",
    detail: "Algo Network · Bangkit Academy",
    date: "Jan 2025",
    type: "Award",
    logo: "/images/logos/algo-bangkit.svg",
  },
  {
    title: "Third Place, CyberTech Hackathon",
    detail: "Politeknik Negeri Padang",
    date: "2024",
    type: "Award",
    logo: "/images/logos/pnp.svg",
  },
];

export const contact = {
  heading: "Get in touch",
  pitch: "Have a role, project, or technical problem where I might be useful?",
};
