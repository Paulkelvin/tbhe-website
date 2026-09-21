// Centralized site copy so pages/components stay free of hardcoded strings.

export const SITE = {
  name: "The Beautifully Human Educator",
  shortName: "TBHE",
  founderName: "Cyrkle Brent",
  founderTitle: "Founder & Chief Coach",
  tagline: "Liberating educators. Advocating for neurodiverse learners.",
  taglineLead: "Liberating educators.",
  taglineSub: "Advocating for neurodiverse learners.",
  description:
    "TBHE is an ecosystem of educational consulting, special education advocacy through Mission 139, and thought leadership for the educator community.",
} as const

// Placeholders — replace each with the real Cal.com username/event-type
// slug once confirmed (e.g. "cyrkle-brent/discovery-call"). These three
// mirror the real event types already set up in Cal.com.
export const DISCOVERY_CALL_CAL_LINK = "tbhe/discovery-call"
export const EXECUTIVE_COACHING_CAL_LINK = "tbhe/executive-coaching"
export const INCLUSIVE_CLASSROOM_CAL_LINK = "tbhe/curating-an-inclusive-classroom"

export type BookableService = {
  key: string
  title: string
  tagline: string
  duration?: string
  calLink: string
}

export const BOOKABLE_SERVICES: readonly BookableService[] = [
  {
    key: "discovery",
    title: "Complimentary Discovery Call",
    tagline: "What's the 411?",
    duration: "45 min",
    calLink: DISCOVERY_CALL_CAL_LINK,
  },
  {
    key: "executive",
    title: "Executive Coaching",
    tagline: "Step Your Game Up w/ Executive Coaching",
    duration: "1 hr",
    calLink: EXECUTIVE_COACHING_CAL_LINK,
  },
  {
    key: "classroom",
    title: "Curating an Inclusive Classroom",
    tagline: "Educating Across Lines of Difference",
    calLink: INCLUSIVE_CLASSROOM_CAL_LINK,
  },
] as const

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "The Ecosystem", href: "/ecosystem" },
  { label: "Resource Center", href: "/resources" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
] as const

export type ArmSlug = "consulting" | "mission-139" | "media"

export type Arm = {
  slug: ArmSlug
  color: "consulting" | "mission" | "media"
  kicker: string
  name: string
  audience: string
  summary: string
  offerings: readonly string[]
  cta: string
}

export const ARMS: readonly Arm[] = [
  {
    slug: "consulting",
    color: "consulting",
    kicker: "Arm 01 · For-Profit",
    name: "Educational Consulting & Coaching",
    audience:
      "School administrators, district leaders, early-career & special educators",
    summary:
      "Professional development, instructional coaching, and leadership mentorship built to retain great teachers and build inclusive classrooms.",
    offerings: [
      "DEI & cultural competency PD (45+ staff workshops)",
      "Early-career teacher retention & coaching cohorts",
      "Inclusionary practices & exemplar curriculum design",
      "Hip2Hip instructional coaching & leadership mentorship",
    ],
    cta: "Book a Consultation",
  },
  {
    slug: "mission-139",
    color: "mission",
    kicker: "Arm 02 · Non-Profit 501(c)(3)",
    name: "Mission 139",
    audience:
      "Neurodivergent students (ASD, ADHD, dyslexia), high-needs families, IEP/504 clients",
    summary:
      "Special education advocacy and financial aid so families can get the evaluations, therapy, and representation their kids are entitled to.",
    offerings: [
      "Special education advocacy & IEP/504 representation",
      "Financial aid grants for evaluations, therapy & tutoring",
      "Parent empowerment toolkits & community resources",
      "District inclusion partnerships",
    ],
    cta: "Apply for Family Aid",
  },
  {
    slug: "media",
    color: "media",
    kicker: "Arm 03 · Thought Leadership",
    name: "Media & Publishing",
    audience:
      "Educational researchers, policy makers, conference organizers, the educator community",
    summary:
      "Research, keynotes, and live community events that push the national conversation on equity, burnout, and educator protection forward.",
    offerings: [
      'White paper releases (e.g., "Playing Chess: IP Protection in Education")',
      "Keynote addresses & guest speaker series",
      'Webinars (e.g., "Protect Your Peace & Intellectual Property")',
      '"Disrupt & Connect" live community networking events',
    ],
    cta: "Book a Speaker",
  },
] as const

export const ARM_COLOR_CLASS: Record<
  Arm["color"],
  { text: string; bg: string; border: string; softBg: string }
> = {
  consulting: {
    text: "text-arm-consulting",
    bg: "bg-arm-consulting",
    border: "border-arm-consulting",
    softBg: "bg-arm-consulting/10",
  },
  mission: {
    text: "text-arm-mission-ink",
    bg: "bg-arm-mission",
    border: "border-arm-mission",
    softBg: "bg-arm-mission/10",
  },
  media: {
    text: "text-arm-media-ink",
    bg: "bg-arm-media",
    border: "border-arm-media",
    softBg: "bg-arm-media/10",
  },
}

export const IMPACT_STATS = [
  { value: "45+", label: "Staff PD workshops delivered" },
  { value: "139+", label: "Families served through Mission 139" },
  { value: "3", label: "Operational arms, one mission" },
  { value: "DMV", label: "Advocacy region for IEP/504 support" },
] as const

export const SCHOOL_PARTNERS = [
  {
    name: "Cedar Tree Academy",
    logo: "/logos/cedar-tree-academy.png",
    width: 2048,
    height: 497,
  },
  {
    name: "Saint Martin's Lutheran School of Annapolis",
    logo: "/logos/saint-martins-lutheran.png",
    width: 463,
    height: 145,
  },
] as const

export const FEATURED_RESOURCE = {
  kind: "White Paper",
  title: "Playing Chess: IP Protection in Education",
  description:
    "A federal-advocacy-minded look at intellectual property protection for educators, published alongside commentary on Department of Education special ed policy updates.",
  cta: "Download the White Paper",
} as const

export const CONSULTING_MODULES = [
  {
    icon: "HandHeart",
    title: "DEI & Cultural Competency PD",
    description:
      "Whole-staff workshops (45+ educators) on implicit bias, cultural competency, and building inclusive school culture.",
  },
  {
    icon: "Plant",
    title: "Early-Career Teacher Retention",
    description:
      "Coaching cohorts and onboarding support designed to keep new teachers in the classroom and growing.",
  },
  {
    icon: "PuzzlePiece",
    title: "Inclusionary Practices & Curriculum",
    description:
      "Exemplar curriculum design and inclusionary teaching practices for special and general education classrooms alike.",
  },
  {
    icon: "Handshake",
    title: "Hip2Hip Instructional Coaching",
    description:
      "One-on-one and small-group instructional coaching paired with leadership mentorship for school teams.",
  },
] as const

export const MISSION_139_PROGRAMS = [
  {
    icon: "HandCoins",
    title: "Family Assistance & Scholarships",
    description:
      "Grants for psychological evaluations, therapy, and tutoring so cost is never the reason a child goes without support.",
  },
  {
    icon: "Scales",
    title: "Advocacy & IEP/504 Representation",
    description:
      "Consultation and representation for district meetings and IEP/504 planning across the DMV region.",
  },
  {
    icon: "BookOpenText",
    title: "Parent Empowerment Toolkits",
    description:
      "Plain-language resources that help families understand their rights and advocate with confidence.",
  },
  {
    icon: "Gift",
    title: "Donor & Corporate Sponsorship",
    description:
      "Tax-deductible giving with tiered corporate sponsorship options, all directly funding family aid.",
  },
] as const

export const KEYNOTE_TOPICS = [
  "Diversity as Divine Design",
  "Teacher Burnout vs. Systemic Change",
  "Something else / custom topic",
] as const

export const MEDIA_OFFERINGS = [
  {
    icon: "FileText",
    title: "Research & White Papers",
    description:
      "A growing library of published research and IP-protection resources for educators, free to download.",
  },
  {
    icon: "Microphone",
    title: "Speaker Bureau",
    description:
      'Keynote topics include "Diversity as Divine Design" and "Teacher Burnout vs. Systemic Change," booked for conferences and district events.',
  },
  {
    icon: "CalendarBlank",
    title: '"Disrupt & Connect" Events',
    description:
      "Live community networking events, webinars, and workshop series for the wider educator community.",
  },
] as const

export const EVENTS = [
  {
    title: "Disrupt & Connect: Fall Networking Mixer",
    type: "Community Event",
    description:
      "An in-person meetup for educators, advocates, and district partners to connect and share what's working.",
  },
  {
    title: "Protect Your Peace & Intellectual Property",
    type: "Webinar",
    description:
      "A live session on protecting your original curriculum and creative work as an educator.",
  },
  {
    title: "DEI & Cultural Competency Workshop",
    type: "Staff Workshop",
    description:
      "A full-day professional development session for school staff, booked directly through the Consulting arm.",
  },
] as const

export const RESOURCES = [
  {
    kind: "White Paper",
    title: "Playing Chess: IP Protection in Education",
    description:
      "Federal-advocacy-minded research on protecting educators' intellectual property.",
  },
  {
    kind: "Toolkit",
    title: "IEP/504 Parent Empowerment Toolkit",
    description:
      "A plain-language guide to understanding and advocating in IEP/504 meetings.",
  },
  {
    kind: "Webinar Recording",
    title: "Protect Your Peace & Intellectual Property",
    description: "Recorded session on IP protection for classroom creators.",
  },
  {
    kind: "Article",
    title: "Teacher Burnout vs. Systemic Change",
    description:
      "A look at what actually moves the needle on educator retention.",
  },
] as const

export const FOOTER_COLUMNS = [
  {
    title: "The Ecosystem",
    links: [
      ["Educational Consulting & Coaching", "/ecosystem/consulting"],
      ["Mission 139", "/ecosystem/mission-139"],
      ["Media & Publishing", "/ecosystem/media"],
    ],
  },
  {
    title: "Site",
    links: [
      ["About", "/about"],
      ["Resource Center", "/resources"],
      ["Events", "/events"],
      ["Contact", "/contact"],
    ],
  },
] as const
