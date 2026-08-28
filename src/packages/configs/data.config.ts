import type { IconKey } from "@/components/ui/icons/CoverIcon";

export type NavLink = {
  id: string;
  label: string;
  href: string;
};

export type HeroTag = {
  id: string;
  label: string;
};

export type ProblemCase = {
  id: string;
  caseLabel: string;
  title: string;
  description: string;
};

export type CoverItem = {
  id: string;
  icon: IconKey;
  title: string;
  description: string;
};

export type RuleEntry = {
  id: string;
  code: string;
  title: string;
  description: string;
  defaultOpen?: boolean;
};

export type HowItWorksStep = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export type Platform = {
  id: string;
  name: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
};

export type FaqEntry = {
  id: string;
  question: string;
  answer: string;
  defaultOpen?: boolean;
};

export type SocialLink = {
  id: string;
  label: string;
  href: string;
};

export const siteConfig = {
  name: "My Roleplay",
  tagline: "An independent player field manual",
  discordHref: "#discord",
  rulebookHref: "#cover",
  discordMemberCount: "1400+",
  copyrightYear: 2026,
} as const;

export const navLinks: NavLink[] = [
  { id: "nav-rulebook", label: "Rulebook", href: "#cover" },
  { id: "nav-rules", label: "Rules", href: "#rules" },
  { id: "life-invader-ads", label: "Ads Studio", href: "/life-invader-ads" },
  { id: "blogs", label: "Blog", href: "/blogs" },
];

export const heroTags: HeroTag[] = [
  { id: "tag-policerp", label: "PoliceRP" },
  { id: "tag-gangrp", label: "GangRP" },
  { id: "tag-lifeinvader", label: "LifeInvader" },
  { id: "tag-ems", label: "EMS" },
  { id: "tag-more", label: "+more" },
];

export const problemCases: ProblemCase[] = [
  {
    id: "problem-immersion",
    caseLabel: "Case 01",
    title: "Breaking immersion without knowing it",
    description:
      "Metagaming, powergaming, or forgetting Fear RP can get you warned — or banned — before you even understand what went wrong.",
  },
  {
    id: "problem-backstory",
    caseLabel: "Case 02",
    title: "Flat, forgettable characters",
    description:
      "A backstory that's just a name and a job falls apart under pressure. Weak characters make every scene harder to play.",
  },
  {
    id: "problem-economy",
    caseLabel: "Case 03",
    title: "No read on the server economy",
    description:
      "Not knowing what's valuable, tradeable, or worth grinding for leaves new players broke, exploited, or stuck on the sidelines.",
  },
];

export const coverItems: CoverItem[] = [
  {
    id: "cover-rules",
    icon: "shield",
    title: "Rules & Conduct",
    description:
      "Metagaming, powergaming, Fear RP and every core standard servers actually enforce.",
  },
  {
    id: "cover-character",
    icon: "user",
    title: "Character Building",
    description:
      "Backstory frameworks, motivations, and voice — characters that hold up scene after scene.",
  },
  {
    id: "cover-faction",
    icon: "building",
    title: "Family & Faction Management",
    description:
      "Running a crew, climbing a PD hierarchy, or holding a faction together under pressure.",
  },
  {
    id: "cover-jobs",
    icon: "briefcase",
    title: "Job-Specific Guides",
    description:
      "Step-by-step playbooks for cops, EMS, mechanics, criminals, and every job in between.",
  },
  {
    id: "cover-economy",
    icon: "clock",
    title: "Valuable Items & Economy",
    description:
      "What's worth grinding, trading, or protecting — read the market before you spend a dollar.",
  },
  {
    id: "cover-platforms",
    icon: "compass",
    title: "Cross-Platform Coverage",
    description:
      "FiveM, and every other major RP platform — one guide that travels with you.",
  },
];

export const ruleEntries: RuleEntry[] = [
  {
    id: "rule-metagaming",
    code: "§ 01",
    title: "No Metagaming",
    description:
      "Using information your character couldn't realistically know — from Discord, streams, or out-of-character chat — to make in-character decisions.",
    defaultOpen: true,
  },
  {
    id: "rule-powergaming",
    code: "§ 02",
    title: "No Powergaming",
    description:
      "Forcing actions on another player without giving them a realistic chance to react, resist, or roleplay their own response.",
  },
  {
    id: "rule-fearrp",
    code: "§ 03",
    title: "Fear RP",
    description:
      "Reacting to life-threatening situations the way your character actually would — with real fear — instead of ignoring the danger for a better outcome.",
  },
];

export const howItWorksSteps: HowItWorksStep[] = [
  {
    id: "step-pick",
    number: "01",
    title: "Pick your RP type",
    description:
      "PoliceRP, GangRP, EMS, LifeInvader — choose the path that matches how you want to play.",
  },
  {
    id: "step-read",
    number: "02",
    title: "Read the guide",
    description:
      "Get the rules, the jargon, and the job-specific playbook before you ever load into a server.",
  },
  {
    id: "step-play",
    number: "03",
    title: "Play with confidence",
    description:
      "Walk in knowing the standards, the economy, and how to build a character worth playing.",
  },
];

export const platforms: Platform[] = [
  { id: "platform-fivem", name: "FiveM" },
  { id: "platform-redm", name: "RedM" },
  { id: "platform-gtaworld", name: "GTA World" },
  { id: "platform-roblox", name: "Roblox RP" },
  { id: "platform-minecraft", name: "Minecraft RP" },
  { id: "platform-more", name: "+ More" },
];

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-ace",
    quote:
      "Went from getting warned for powergaming to running my own faction in three weeks. This is the manual every new server should hand out.",
    authorName: "Slim Ace",
    authorRole: "PoliceRP Player",
  },
  {
    id: "testimonial-nyzoxx",
    quote:
      "I link this to every new whitelist applicant. Cuts our onboarding tickets in half and the character-building section is genuinely good.",
    authorName: "Nyzoxx Baby",
    authorRole: "Top Shooter RP Player",
  },
  {
    id: "testimonial-marlo",
    quote:
      "The economy breakdown alone saved me from getting scammed my first week. Wish this existed when I started GangRP.",
    authorName: "Sosa Marlo",
    authorRole: "GangRP Player",
  },
];

export const faqEntries: FaqEntry[] = [
  {
    id: "faq-affiliation",
    question: "Is this affiliated with any specific FiveM server?",
    answer:
      "No — My Roleplay is an independent, platform-agnostic guide built for players across any FiveM or RP server, not one specific community.",
    defaultOpen: true,
  },
  {
    id: "faq-platform-requirement",
    question: "Do I need FiveM specifically to use this?",
    answer:
      "No. While FiveM is our largest audience, the core RP standards and character guides apply across RedM, GTA World, and other roleplay platforms.",
  },
  {
    id: "faq-pricing",
    question: "Is the rulebook free to read?",
    answer:
      "Yes. The core rulebook and starter guides are free. Join the Discord for the full library and community support.",
  },
  {
    id: "faq-server-owners",
    question: "Can server owners use this for whitelist onboarding?",
    answer:
      "Absolutely — many server owners link sections directly in their whitelist applications to speed up onboarding.",
  },
  {
    id: "faq-updates",
    question: "How often is content updated?",
    answer:
      "Guides are reviewed regularly as server standards and platforms evolve. Discord members get notified of major updates first.",
  },
];

export const socialLinks: SocialLink[] = [
  { id: "social-discord", label: "Discord", href: "#discord" },
  { id: "social-twitter", label: "Twitter / X", href: "#" },
  { id: "social-youtube", label: "YouTube", href: "#" },
];
