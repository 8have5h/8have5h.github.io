import { MapPin, Mail, Github, Linkedin, FileText, type LucideIcon } from "lucide-react";

export const EMAIL = "bhavesh.gurnani2003@gmail.com";

// ---------------------------------------------------------------------------
// Formspree
// ---------------------------------------------------------------------------
// Create a free form at https://formspree.io and paste its form ID here.
// It looks like "xayzbqwd" (the part after https://formspree.io/f/).
// Until you set this, the contact form falls back to opening the visitor's
// email client (mailto) so the page still works.
export const FORMSPREE_ID: string = "xrewzedd";

export const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export const CONTACTS: {
  icon: LucideIcon;
  label: string;
  href: string | null;
}[] = [
  { icon: MapPin, label: "New Delhi, India", href: null },
  { icon: Mail, label: "Email", href: `mailto:${EMAIL}` },
  { icon: Github, label: "GitHub", href: "https://github.com/8have5h" },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/bhavesh-gurnani-410a68217",
  },
  { icon: FileText, label: "CV", href: "/cv.pdf" },
];

export const NEWS: { date: string; content: string }[] = [
  {
    date: "Feb'26",
    content:
      "Started as a Research Intern at <strong>Microsoft Research</strong>, building conversational agents for medical diagnosis via multi-turn dialogue modeling and clinical reasoning.",
  },
  {
    date: "Dec'25",
    content:
      "Began an AI Security internship at the <a href='https://www.comp.nus.edu.sg/' target='_blank' rel='noreferrer'>National University of Singapore</a> (<a href='http://kisp.comp.nus.edu.sg/' target='_blank' rel='noreferrer'>KISP Lab</a>, Prof. Prateek Saxena), extending <a href='https://arxiv.org/abs/2502.02542' target='_blank' rel='noreferrer'>OverThink</a> with a filtering-evasive slowdown attack on LLMs.",
  },
  {
    date: "Nov'25",
    content:
      "Our paper <em>Hierarchical Masked Diffusion Language Models</em> is under review &mdash; a two-stage diffusion model predicting token-level generation priorities before decoding.",
  },
  {
    date: "Oct'25",
    content:
      "Our paper <em>ProbMedTOD: A Probabilistic Task-Oriented Dialogue System for Patient History Taking</em> is under review, achieving a 21-pt MRR gain over baselines.",
  },
  {
    date: "Jun'25",
    content:
      "Started my M.Tech thesis on <strong>Hierarchical Masked Diffusion Language Models</strong> under <a href='https://www.cse.iitd.ac.in/~parags/' target='_blank' rel='noreferrer'>Prof. Parag Singla</a>.",
  },
  {
    date: "May'25",
    content:
      "Joined <strong>Ebullient Securities</strong> as a Quantitative Researcher Intern, building and live-testing alpha signals and a custom C++ trading strategy.",
  },
];

// Number of recent items shown on the home page before "View all".
export const HOME_NEWS_COUNT = 4;
