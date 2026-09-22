// Centralized site copy so pages/components stay free of hardcoded strings.

export const SITE = {
  name: "The Beautifully Human Educator",
  shortName: "TBHE",
  founderName: "Cyrkle B. Brent",
  founderCredential: "M.Ed.",
  founderTitle: "Founder & Chief Coach",
  founderSecondaryTitle: "Head of School & Principal, St. Martin's Lutheran School",
  tagline: "Be a Better Teacher.",
  taglineLead: "Be a Better Teacher.",
  taglineSub: "Transforming the landscape for underserved, under-resourced learners.",
  description:
    "TBHE is a leadership and professional-learning platform for educators, paired with Mission 139, its advocacy arm for neurodivergent students and the families and schools that serve them.",
} as const

export const BUSINESS_CONTACT = {
  address: "12530 Fairwood Pkwy Ste. 102 #568, Bowie, MD 20720",
  phone: "(202) 642-6982",
  phoneHref: "tel:+12026426982",
  email: "info@thebeautifullyhumaneducator.com",
} as const

export const COACHING_TEAM = [
  { name: "Yolanda Barber", role: "Head Coach — Principals & School Planning" },
  { name: "Rossana Mahvi", role: "Head Coach — Literacy & Special Education" },
  { name: "Kawan Jones", role: "Head Coach — Culture & Classroom Management" },
  { name: "Kitrece Carr", role: "Instructional Coach — Math" },
  { name: "Ashley Dominique", role: "Instructional Coach — ELA" },
] as const

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/the_beautifullyhuman_educator",
  linkedin: "https://www.linkedin.com/company/the-beautifully-human-educator/",
} as const

export const MISSION_139_INSTAGRAM = "https://www.instagram.com/tbhe_mission_139"

// Real Calendly link the client provided. It's a single general-purpose
// meeting scheduler (not per-service event types), so every service below
// points to the same link until she sets up distinct Calendly event types.
export const CALENDLY_BOOKING_LINK =
  "https://calendly.com/cbrent-stmartinsonline/new-meeting"

// Mirrors the real site's own grouping: "educator" services are directly
// self-bookable on a calendar; "school" services are scoped engagements
// the client quotes per school, so they route to a quote request instead
// of a live calendar. See BookingServices.
export type ServiceCategory = "educator" | "school"

export type BookableService = {
  key: string
  category: ServiceCategory
  title: string
  tagline: string
  duration?: string
  calLink: string
  // Real photo for the service card — falls back to a plain icon
  // treatment when unset. See BookingServices for the fallback.
  image?: string
  imageAlt?: string
  imagePosition?: string
}

export const BOOKABLE_SERVICES: readonly BookableService[] = [
  {
    key: "discovery",
    category: "educator",
    title: "Complimentary Discovery Call",
    tagline: "What's the 411?",
    duration: "45 min",
    calLink: CALENDLY_BOOKING_LINK,
    image: "/images/service-discovery-call.jpg",
    imageAlt: "A smiling consultant on a video call with a notebook and coffee mug",
    imagePosition: "50% 12%",
  },
  {
    key: "executive",
    category: "educator",
    title: "Executive Coaching",
    tagline: "Step Your Game Up w/ Executive Coaching",
    duration: "1 hr",
    calLink: CALENDLY_BOOKING_LINK,
    image: "/images/service-executive-coaching.jpg",
    imageAlt: "Two educators in a one-on-one coaching conversation",
    imagePosition: "50% 18%",
  },
  {
    key: "classroom",
    category: "school",
    title: "Curating an Inclusive Classroom",
    tagline: "Educating Across Lines of Difference",
    image: "/images/service-inclusive-classroom.jpg",
    imageAlt: "An educator leading a workshop at a whiteboard titled Inclusive Classrooms",
    imagePosition: "50% 22%",
    calLink: CALENDLY_BOOKING_LINK,
  },
  {
    key: "professional-development",
    category: "school",
    title: "Professional Development & Coaching",
    tagline: "Whole-Staff PD, Tailored to Your School",
    calLink: CALENDLY_BOOKING_LINK,
  },
] as const

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "The Ecosystem", href: "/ecosystem" },
  { label: "Resource Center", href: "/resources" },
  { label: "Events", href: "/events" },
  { label: "Contact Us", href: "/contact" },
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
      "Published research & commentary on policy affecting educators",
      "Keynote addresses & guest speaker series",
      "Webinars for the wider educator community",
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
  { value: "3", label: "School communities served" },
  { value: "300+", label: "Students impacted" },
  { value: "50–150", label: "Staff per engagement supported" },
  { value: "2", label: "Specialized classrooms built" },
] as const

export const SCHOOLS_SERVED = [
  "St. Mary's High School of Annapolis",
  "Cedar Tree Academy",
  "Citizens of the World Charter School — Los Angeles",
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

// Categories the Resource Center is organized by. Most are empty for now —
// each renders as a "coming soon" placeholder until real resources are
// added, so the page doesn't need restructuring as the library grows.
export const RESOURCE_CATEGORIES = [
  "Articles & Thought Leadership",
  "Downloadable Tools & Guides",
  "Webinar & Workshop Recordings",
  "For Families",
  "For Educators & Leaders",
  "Intellectual Property & Educator Protection",
] as const

export type ResourceCategory = (typeof RESOURCE_CATEGORIES)[number]

export type Resource = {
  kind: string
  category: ResourceCategory
  title: string
  description: string
  file: string
}

export const FEATURED_RESOURCE: Resource & { cta: string } = {
  kind: "White Paper",
  category: "Articles & Thought Leadership",
  title:
    'What the "Big Beautiful Bill" Actually Means for Your Neurodivergent Family',
  description:
    "A plain-language breakdown of a major piece of federal legislation and what it changes for neurodivergent students, families, and the safeguards they rely on.",
  file: "/resources/big-beautiful-bill-white-paper.pdf",
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

export const MEDIA_OFFERINGS = [
  {
    icon: "FileText",
    title: "Research & White Papers",
    description:
      "A growing library of research and white papers on policy affecting educators and neurodivergent students, free to download.",
  },
  {
    icon: "Microphone",
    title: "Speaker Bureau",
    description:
      "Keynote and workshop bookings for conferences and district events, tailored to your audience.",
  },
  {
    icon: "CalendarBlank",
    title: '"Disrupt & Connect" Events',
    description:
      "Live community networking events, webinars, and workshop series for the wider educator community.",
  },
] as const

// No confirmed public events during the rebrand — the /events page shows a
// "coming soon" state when this is empty. Add real events here once
// scheduled.
export const EVENTS: readonly {
  title: string
  type: string
  description: string
}[] = []

export const RESOURCES: readonly Resource[] = [
  {
    kind: "White Paper",
    category: "Articles & Thought Leadership",
    title:
      'What the "Big Beautiful Bill" Actually Means for Your Neurodivergent Family',
    description:
      "A plain-language breakdown of a major piece of federal legislation and what it changes for neurodivergent students, families, and the safeguards they rely on.",
    file: "/resources/big-beautiful-bill-white-paper.pdf",
  },
  {
    kind: "White Paper",
    category: "Articles & Thought Leadership",
    title: "Creating Rigorous Classrooms for All Students",
    description:
      "Research-backed strategies for building inclusive rigor for neurodivergent learners, with real-world lesson examples across grade bands.",
    file: "/resources/creating-rigorous-classrooms-for-all-students.pdf",
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
