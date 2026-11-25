export type PitchLocaleCode = 'en' | 'he' | 'ru' | 'es';

export interface LocalizedAudioConfig {
  code: PitchLocaleCode;
  shortLabel: string;
  languageName: string;
  nativeName: string;
  targetLocale: string;
  /**
   * Confirmed spoken proficiency from CV, or AI-assisted localization note.
   */
  proficiencyLabel: string;
  category: 'spoken' | 'ai-assisted-demo';
  scriptNote: string;
  dir: 'ltr' | 'rtl';
  /**
   * Path to your final ElevenLabs recording (e.g. '/audio/intro-en.mp3').
   * Leave null until the actual audio file is added so the UI stays honest
   * and never simulates playback.
   */
  audioFilePath: string | null;
  /**
   * Set to true once the corresponding audioFilePath contains your real
   * ElevenLabs recording created with your voice.
   */
  isElevenLabsGenerated: boolean;
  plannedDurationLabel: string;
  waveformSeed: number;
  pitchHeadline: string;
  localizationHeading: string;
  whatIAdapted: string;
  whatMattersInLocalization: string;
  transcript: string;
  voiceGenerationDisclosure: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  shortTitle: string;
  period: string;
  shortPeriod: string;
  summary: string;
  focusAreas?: string[];
  highlights: string[];
  hasMarketplaceSpotlight?: boolean;
}

export interface AchievementSlide {
  id: string;
  metric: string;
  scaleLabel: string;
  title: string;
  contribution: string;
  outcome: string;
  organization: string;
}

export interface AiOpsCapabilityTab {
  id: 'build' | 'automate' | 'scale';
  label: string;
  description: string;
  capabilities: string[];
  supportingTools: string;
}

export interface WorkflowStage {
  id: string;
  label: string;
  shortLabel: string;
  detail: string;
}

export interface MethodologyStep {
  number: string;
  shortLabel: string;
  title: string;
  body: string;
  principle: string;
}

export const VOICE_GENERATION_DISCLOSURE =
  'AI-generated voice samples created with ElevenLabs using my own voice.';

export const CANDIDATE_PROFILE = {
  name: 'Sveta Blekher',
  monogram: 'SB',
  eyebrow: 'APPLICATION · MARKETPLACE OPERATIONS · ELEVENLABS PRODUCTIONS',
  mainHeadline:
    'Hi, I’m Sveta Blekher. I build systems that make global operations scale.',
  secondaryHeadline:
    'Formerly at Wix. Now building AI-powered operational solutions.',
  supportingDescription:
    '10+ years in international operations, combining product localization across 36+ languages, marketplace ecosystem experience, cross-functional leadership and hands-on AI development. I connect people, processes and technology to turn complex challenges into scalable solutions.',
  availabilityLabel: 'Available · Remote · UTC+7',
  locationFooter:
    'Based in Thailand · UTC+7 · European and APAC working-hour overlap',
  location: 'Koh Samui, Thailand',
  timezoneLabel: 'UTC+7',
  workMode: 'Remote',
  email: 'sblekher@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sveta-blekher-86028347/',
  targetRole: 'Marketplace Operations (Productions)',
  targetCompany: 'ElevenLabs',
  fullSummary:
    'Operations leader with 10+ years across international programs, multilingual delivery and technology. Led Wix Studio localization in 36+ languages across 20+ teams, improving delivery speed and quality, and managed localization across Wix Marketplace, Partners Dashboard and Events. Now builds AI-assisted workflows, reusable skills and operational tools through Web Coconuts. Combines operational ownership, cross-functional coordination and hands-on AI experimentation with a practical understanding of global content and platform delivery.',
  personalStatement:
    'I work best at the intersection of people, processes and technology. I enjoy making complex problems understandable, bringing the right people together and turning ideas into practical solutions. I take ownership independently while believing that the strongest outcomes are built collaboratively.',
  whyElevenLabs: [
    'What excites me about ElevenLabs Productions is the opportunity to work at the intersection of AI technology, human expertise and global scale.',
    'My experience at Wix introduced me to the complexity of growing a global platform and supporting a marketplace that connects professionals with customers. Throughout my career, I have managed international projects, aligned diverse stakeholders and turned complex requirements into actionable processes.',
    'Today, I combine that operational experience with hands-on AI development. I see ElevenLabs as a natural intersection of the areas I genuinely enjoy: technology, international operations, localization, problem-solving and building systems that make ambitious ideas scalable.',
  ],
  coreSkills: [
    'Global & localization operations',
    'Cross-functional program leadership',
    'Vendor and linguistic-expert coordination',
    'Operational workflow & process design',
    'Quality control & KPI reporting',
    'Training & stakeholder enablement',
    'AI-assisted tool building & workflow automation with human review',
  ],
  tools: [
    'Smartling',
    'Jira',
    'Monday',
    'Google Workspace',
    'Claude Code',
    'MCP Integrations',
    'GitHub',
    'Vercel',
  ],
  education: [
    {
      degree: 'MA, Jewish Professional Studies',
      institution: 'Spertus Institute',
      period: '2015 – 2017',
    },
    {
      degree: 'Diploma, International Business and Management',
      institution: 'Ariel University',
      period: '2010 – 2011',
    },
    {
      degree: 'BA, Economics and Management',
      institution: 'St. Petersburg State Polytechnical University',
      period: '2004 – 2009',
    },
  ],
};

export const WIX_MARKETPLACE_SPOTLIGHT = {
  title: 'Wix Marketplace — Connecting a global professional ecosystem',
  paragraphs: [
    'Wix Marketplace connects agencies, freelancers and other Wix professionals with customers seeking their services.',
    'My responsibilities included product localization and cross-functional coordination supporting the marketplace’s international accessibility and the broader scaling of the Wix ecosystem.',
    'This experience gave me practical exposure to the challenges of operating a global platform serving multiple interconnected audiences — professional service providers and customers.',
  ],
  pillars: [
    'Marketplace ecosystem understanding',
    'International product adoption',
    'Global platform scalability',
    'Professional & customer experience',
    'Cross-functional stakeholder alignment',
    'Multilingual product delivery',
  ],
};

export const AUDIO_SECTION_COPY = {
  exploreLabel: 'Explore the localization choices',
  adaptedHeading: 'What I adapted in my message',
  mattersHeading: 'What matters in localization',
};

export const AUDIO_LOCALES_CONFIG: Record<PitchLocaleCode, LocalizedAudioConfig> = {
  en: {
    code: 'en',
    shortLabel: 'EN',
    languageName: 'English',
    nativeName: 'English',
    targetLocale: 'en-US',
    proficiencyLabel: 'Full working proficiency',
    category: 'spoken',
    scriptNote: 'LTR · Primary working language',
    dir: 'ltr',
    audioFilePath:
      '/assets/aistudio/ElevenLabs_2026-11-25T07_09_43_Sveta_Personal_ivc_s50_sim100_v4_e533cc41.mp3',
    isElevenLabsGenerated: true,
    plannedDurationLabel: '0:51',
    waveformSeed: 101,
    pitchHeadline: 'English introduction — concise, systems-first register',
    localizationHeading: 'EN — International English',
    whatIAdapted:
      'I chose a professional yet approachable tone, clear sentence structures and internationally accessible business terminology.',
    whatMattersInLocalization:
      'Regional vocabulary, spelling, idioms, formality and pronunciation can vary significantly between English-speaking markets. The target audience matters as much as the language itself.',
    transcript:
      'Hi, I’m Sveta. Thank you for taking a moment to get to know me. My career has been about making complex things work better, whether that’s scaling global products at Wix, supporting marketplace ecosystems, or bringing international teams together across more than 36 languages. What I enjoy most is figuring out what isn’t working, finding a solution, and making it happen. Today, I combine that experience with AI, building agents and tools that solve real operational challenges. And here’s a little example: you’re listening to my voice, generated with ElevenLabs, but the linguistic and cultural choices behind each language version are mine. Because to me, great localization isn’t simply about translating words. It’s about making technology feel human, wherever you are. I’d love to bring that mindset to ElevenLabs.',
    voiceGenerationDisclosure: VOICE_GENERATION_DISCLOSURE,
  },
  he: {
    code: 'he',
    shortLabel: 'HE',
    languageName: 'Hebrew',
    nativeName: 'עברית',
    targetLocale: 'he-IL',
    proficiencyLabel: 'Native',
    category: 'spoken',
    scriptNote: 'RTL · Native language',
    dir: 'rtl',
    audioFilePath:
      '/assets/aistudio/ElevenLabs_2026-11-25T07_15_31_Sveta_Personal_ivc_s50_sim100_v4_370ba7f1.mp3',
    isElevenLabsGenerated: true,
    plannedDurationLabel: '0:52',
    waveformSeed: 207,
    pitchHeadline: 'הצגה בעברית — ישירה, תפעולית וברורה',
    localizationHeading: 'HE — Israeli Hebrew',
    whatIAdapted:
      'I used a warmer, more conversational greeting, direct communication and a natural combination of Hebrew and English technology terminology.',
    whatMattersInLocalization:
      'Gendered language, forms of address, cultural references and context-specific greetings, such as “Shabbat Shalom” on Fridays, can make communication feel more authentic when appropriate for the audience.',
    transcript:
      'היי, אני סבטה. איזה כיף לפגוש אתכם. אם יש משהו שמלווה אותי לאורך כל הקריירה שלי, זו האהבה לקחת דברים מורכבים ולמצוא דרך לגרום להם לעבוד טוב יותר. ב-Wix עבדתי על מוצרים גלובליים, ביניהם Wix Marketplace, וחיברתי בין צוותים ותהליכים בעולם הלוקליזציה ביותר מ-36 שפות. היום אני משלבת את הניסיון הזה עם AI, ובונה בעצמי כלים ואייג׳נטים שנותנים מענה לאתגרים עסקיים אמיתיים. ואגב, הקול שאתם שומעים עכשיו נוצר באמצעות ElevenLabs, על בסיס הקול שלי. אבל את הבחירות הלשוניות, התרבותיות והסגנוניות בכל גרסה עשיתי בעצמי. כי מבחינתי, לוקליזציה טובה היא לא רק לתרגם — היא לגרום לצד השני להרגיש שמדברים אליו באמת. ואשמח מאוד להביא את הגישה הזאת גם ל-ElevenLabs.',
    voiceGenerationDisclosure: VOICE_GENERATION_DISCLOSURE,
  },
  ru: {
    code: 'ru',
    shortLabel: 'RU',
    languageName: 'Russian',
    nativeName: 'Русский',
    targetLocale: 'ru-RU',
    proficiencyLabel: 'Native',
    category: 'spoken',
    scriptNote: 'Cyrillic · Native language',
    dir: 'ltr',
    audioFilePath:
      '/assets/aistudio/ElevenLabs_2026-11-25T07_13_46_Sveta_Personal_ivc_s50_sim100_v4_770a7fea.mp3',
    isElevenLabsGenerated: true,
    plannedDurationLabel: '0:59',
    waveformSeed: 313,
    pitchHeadline: 'Представление на русском — структурированный деловой стиль',
    localizationHeading: 'RU — Russian',
    whatIAdapted:
      'I used the respectful form of address «вы», a slightly more formal register and natural Russian professional phrasing to establish credibility and respect.',
    whatMattersInLocalization:
      'The level of formality, professional distance, grammatical gender and natural sentence structure are essential. Literal translations of English business expressions can sound artificial or culturally inappropriate.',
    transcript:
      'Здравствуйте. Меня зовут Света, и я рада с вами познакомиться. На протяжении всей моей карьеры я занималась сложными международными проектами, объединяя людей, процессы и технологии. В Wix я работала над продвижением глобальных продуктов, включая Wix Marketplace, и координировала процессы локализации более чем на 36 языков. Мне особенно интересно находить причины сложных проблем, разрабатывать решения и доводить их до реализации. Сегодня я также создаю собственные инструменты и AI-агентов для решения реальных бизнес-задач. Кстати, голос, который вы сейчас слышите, сгенерирован с помощью ElevenLabs на основе моего собственного голоса. При этом языковые, культурные и стилистические особенности каждой версии я определила самостоятельно. Ведь настоящая локализация — это далеко не только перевод, а умение говорить с человеком на понятном ему языке. Именно такой подход я хотела бы привнести в ElevenLabs.',
    voiceGenerationDisclosure: VOICE_GENERATION_DISCLOSURE,
  },
  es: {
    code: 'es',
    shortLabel: 'ES',
    languageName: 'Spanish',
    nativeName: 'Español',
    targetLocale: 'es-419',
    proficiencyLabel: 'Basic · AI-assisted demo',
    category: 'ai-assisted-demo',
    scriptNote: 'AI-assisted localization workflow with human validation',
    dir: 'ltr',
    audioFilePath:
      '/assets/aistudio/ElevenLabs_2026-11-25T07_17_07_Sveta_Personal_ivc_s50_sim100_v4_288bde0f.mp3',
    isElevenLabsGenerated: true,
    plannedDurationLabel: '0:51',
    waveformSeed: 419,
    pitchHeadline:
      'Demostración en español — localización asistida por IA con revisión humana',
    localizationHeading: 'ES — Latin American Spanish',
    whatIAdapted:
      'I chose a warm, approachable tone, the personal form of address «tú» and accessible professional vocabulary suited to the intended audience.',
    whatMattersInLocalization:
      'Regional vocabulary, forms of address, cultural conventions and pronunciation differ across Spanish-speaking markets. Choosing the right locale is essential, and native-speaker validation is particularly valuable.',
    transcript:
      'Hola, soy Sveta. Me alegra mucho que estés aquí. A lo largo de mi carrera he disfrutado conectando personas, procesos y tecnología para encontrar soluciones a problemas complejos. En Wix trabajé con productos globales, incluido Wix Marketplace, y coordiné proyectos de localización en más de 36 idiomas. Hoy combino esa experiencia con la inteligencia artificial, creando herramientas y agentes que ayudan a resolver desafíos operativos reales. Y quiero compartir contigo un pequeño detalle: la voz que estás escuchando ha sido generada con ElevenLabs a partir de mi propia voz, pero yo he definido las decisiones lingüísticas y culturales de cada versión. Porque localizar no es simplemente traducir, es crear una conexión auténtica con las personas. Me encantaría aportar esa perspectiva al equipo de ElevenLabs.',
    voiceGenerationDisclosure: VOICE_GENERATION_DISCLOSURE,
  },
};

export const PITCH_LOCALE_ORDER: PitchLocaleCode[] = ['en', 'he', 'ru', 'es'];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'web-coconuts',
    company: 'Web Coconuts',
    role: 'Founder, AI & Operational Solutions',
    shortTitle: 'Web Coconuts — Founder, AI & Operational Solutions',
    period: '2025 – Present',
    shortPeriod: '2025 – Present',
    summary:
      'Independently identify business bottlenecks and build AI-powered operational tools, agent-based workflows, conversational AI solutions and process automations from concept through testing and iteration.',
    focusAreas: [
      'AI-powered operational tools',
      'Agent-based workflows',
      'Conversational AI solutions',
      'Business process automation',
      'Digital applications and integrations',
    ],
    highlights: [
      'Design and build AI-powered operational tools, agent-based workflows, conversational AI prototypes and business process automations with end-to-end ownership from problem definition through testing and improvement.',
      'Build reusable Claude Skills, MCP integrations and structured QA/validation guidelines covering RTL/i18n, accessibility and production readiness.',
      'Develop and ship multilingual digital applications and integrations using AI-assisted development on a React, GitHub and Vercel stack.',
    ],
  },
  {
    id: 'wix',
    company: 'Wix',
    role: 'Product Localization and Operations Manager',
    shortTitle: 'Wix — Product Localization & Operations Manager',
    period: 'Feb 2022 – Aug 2025',
    shortPeriod: 'Feb 2022 – Aug 2025',
    summary:
      'Managed multilingual product localization and cross-functional operations across Wix Studio, Wix Marketplace, Partners Dashboard and other Wix products across 36+ languages.',
    hasMarketplaceSpotlight: true,
    highlights: [
      'Led Wix Studio localization in 36+ languages, aligning 20+ cross-functional teams across Product, Engineering, Design and localization.',
      'Managed product localization and cross-functional coordination for Wix Marketplace, Partners Dashboard and Events, supporting international accessibility across interconnected professional service providers and customers—contributing to an estimated 15% engagement increase and 20%+ fewer localization support tickets.',
      'Built scalable collaboration workflows and introduced localization earlier in development, cutting estimated time-to-market by 25%.',
      'Ran translation and quality workflows in Smartling, Jira and Monday; trained Product Managers to integrate localization into product planning.',
    ],
  },
  {
    id: 'moroccanoil',
    company: 'Moroccanoil',
    role: 'Marketing Project Manager',
    shortTitle: 'Moroccanoil — Marketing Project Manager',
    period: 'Jun 2021 – Feb 2022',
    shortPeriod: '2021 – 2022',
    summary:
      'Coordinated international campaign production, vendor workflows and multi-market adaptation across 30+ markets.',
    highlights: [
      'Managed global campaign timelines and workflows with a 100% on-time delivery rate, coordinating 20+ stakeholders and vendors.',
      'Adapted marketing copy and graphics for 30+ markets, addressing local requirements and cultural relevance.',
    ],
  },
  {
    id: 'taglit',
    company: 'Taglit Birthright Israel HQ',
    role: 'Program Director',
    shortTitle: 'Taglit Birthright Israel HQ — Program Director',
    period: 'May 2017 – Sep 2020',
    shortPeriod: '2017 – 2020',
    summary:
      'Directed large-scale international operations, partner networks and multi-country CRM localization.',
    highlights: [
      'Directed international programs for 10,000+ participants annually and directly managed a $1.5M annual budget, coordinating partners, vendors and donors.',
      'Led localization and management of an operational CRM across countries to support local teams.',
    ],
  },
  {
    id: 'israel-experts',
    company: 'Israel Experts',
    role: 'Head of Europe and FSU Birthright Desk',
    shortTitle: 'Israel Experts — Head of Europe & FSU Desk',
    period: 'Jan 2013 – Apr 2017',
    shortPeriod: '2013 – 2017',
    summary:
      'Led regional program adaptation and localized web and marketing delivery across 15+ countries.',
    highlights: [
      'Managed program adaptation across 15+ countries and developed localized website and marketing strategies for Europe and the FSU.',
    ],
  },
];

export const ACHIEVEMENT_SLIDES: AchievementSlide[] = [
  {
    id: 'wix-36-languages',
    metric: '36+',
    scaleLabel: 'Languages · 20+ teams',
    title: 'Scaling Wix Studio international delivery',
    contribution:
      'Aligned Product, Engineering, Design and localization teams and embedded localization earlier into product planning.',
    outcome: 'Cut estimated time-to-market by 25% across global releases.',
    organization: 'Wix Studio · 2022–2025',
  },
  {
    id: 'wix-marketplace',
    metric: '−20%+',
    scaleLabel: 'Wix Marketplace & Partners',
    title: 'Global ecosystem quality & adoption',
    contribution:
      'Managed multilingual product delivery and Smartling QA workflows across Wix Marketplace, Partners Dashboard and Events.',
    outcome:
      'Contributed to an estimated 15% engagement lift and 20%+ fewer localization support tickets.',
    organization: 'Wix Marketplace · Ecosystem',
  },
  {
    id: 'moroccanoil-markets',
    metric: '100%',
    scaleLabel: '30+ markets · 20+ stakeholders',
    title: 'On-time global campaign production',
    contribution:
      'Coordinated international stakeholders, vendors, timelines and cultural adaptation of copy and creative assets.',
    outcome:
      'Delivered every global campaign milestone on schedule across 30+ markets.',
    organization: 'Moroccanoil · 2021–2022',
  },
  {
    id: 'taglit-scale',
    metric: '$1.5M',
    scaleLabel: '10,000+ annual participants',
    title: 'Direct budget & multi-country operations',
    contribution:
      'Directly managed a $1.5M annual program budget across partners, vendors and donors, and led multi-country CRM localization.',
    outcome:
      'Sustained reliable international program delivery for 10,000+ participants annually.',
    organization: 'Taglit Birthright HQ · 2017–2020',
  },
  {
    id: 'web-coconuts-ai',
    metric: 'AI→Ops',
    scaleLabel: 'End-to-end systems',
    title: 'Hands-on AI workflow & tool development',
    contribution:
      'Built reusable Claude Skills, MCP integrations, and controlled outreach/QA workflows with human approval checkpoints.',
    outcome:
      'Reduced repetitive manual work and standardized repeatable multilingual delivery.',
    organization: 'Web Coconuts · 2025–Present',
  },
];

export const AI_OPS_TABS: AiOpsCapabilityTab[] = [
  {
    id: 'build',
    label: 'Build',
    description:
      'I use AI-assisted development to turn business requirements into practical, working tools and digital solutions.',
    capabilities: [
      'AI-powered web applications',
      'Rapid prototyping',
      'API and system integrations',
      'AI-assisted development',
    ],
    supportingTools: 'Supporting stack: Claude Code · MCP · React · GitHub · Vercel',
  },
  {
    id: 'automate',
    label: 'Automate',
    description:
      'I design workflows that reduce repetitive work, connect systems and make operational processes more reliable.',
    capabilities: [
      'AI agents and orchestration',
      'Workflow automation',
      'Human approval checkpoints',
      'Validation and exception handling',
    ],
    supportingTools: 'Supporting stack: Custom Skills · Agent workflows · QA rules',
  },
  {
    id: 'scale',
    label: 'Scale',
    description:
      'I approach automation as an operational system, considering reliability, quality, ownership and continuous improvement.',
    capabilities: [
      'Process standardization',
      'Monitoring and reporting',
      'Cross-functional implementation',
      'Quality and workflow optimization',
    ],
    supportingTools: 'Supporting stack: Smartling · Jira · Monday · Google Workspace',
  },
];

export const AI_OPS_KEY_STATEMENT =
  'I don’t just use AI. I use AI to build tools that improve how work gets done.';

export const WORKFLOW_CASE_STUDY = {
  title: 'From Problem to System',
  subtitle: 'A real AI-powered operations project.',
  shortSummary:
    'An AI-assisted outreach and follow-up workflow built through Web Coconuts to classify records, prevent duplicates, require human approval and monitor execution.',
  stages: [
    {
      id: 'problem',
      label: 'Business problem',
      shortLabel: 'Problem',
      detail:
        'Fragmented lead records and repetitive manual follow-ups created delays and inconsistent outreach.',
    },
    {
      id: 'processing',
      label: 'AI-assisted processing',
      shortLabel: 'AI Process',
      detail:
        'Connects information sources, classifies incoming records and drafts context-aware next actions.',
    },
    {
      id: 'validation',
      label: 'Validation',
      shortLabel: 'Validate',
      detail:
        'Checks required fields, prevents duplicate records and flags incomplete entries for exception handling.',
    },
    {
      id: 'approval',
      label: 'Human approval',
      shortLabel: 'Approve',
      detail:
        'Keeps a mandatory human sign-off checkpoint before any external outreach or sensitive action runs.',
    },
    {
      id: 'execution',
      label: 'Execution',
      shortLabel: 'Execute',
      detail:
        'Runs approved outreach actions cleanly within controlled guardrails rather than unmonitored blasts.',
    },
    {
      id: 'monitoring',
      label: 'Monitoring',
      shortLabel: 'Monitor',
      detail:
        'Tracks status, outcomes and follow-up timing so exceptions surface early and workflows improve over time.',
    },
  ] as WorkflowStage[],
  concepts: [
    'Data intake & classification',
    'Workflow orchestration',
    'Approval checkpoints',
    'Duplicate prevention',
    'Controlled execution',
    'Exception handling',
    'Monitoring & follow-up',
  ],
  sections: {
    problem:
      'Repetitive operational tasks, fragmented information and manual follow-ups make processes time-consuming and difficult to scale.',
    approach:
      'Designed an AI-assisted business outreach and follow-up workflow through Web Coconuts that connects information sources, classifies records, supports decision-making, prepares structured actions and monitors execution within a controlled operational process.',
    operationalThinking:
      'Introduced explicit validation rules, duplicate prevention, exception handling and mandatory human approval checkpoints before execution—ensuring reliability and preventing unnecessary or duplicate actions.',
    implementedAndTested: [
      'Structured data intake, record classification and duplicate checks',
      'AI-assisted drafting and preparation of contextual outreach actions',
      'Human-in-the-loop approval checkpoints prior to sending',
      'Status logging and exception flagging for manual review',
    ],
    experimentalAndEvolving: [
      'Automated multi-step follow-up scheduling based on response signals',
      'Broader CRM synchronization and automated anomaly alerts across higher volume',
    ],
  },
};

export const METHODOLOGY_STEPS: MethodologyStep[] = [
  {
    number: '01',
    shortLabel: 'Step 01',
    title: '01 — Define the Real Problem',
    body: 'Understand the business objective, investigate the underlying challenge, identify dependencies and establish what success should look like.',
    principle: 'Solve the right problem before building the solution.',
  },
  {
    number: '02',
    shortLabel: 'Step 02',
    title: '02 — Connect the Dots',
    body: 'Bring together the right people, information and perspectives. Translate complex requirements into clear, actionable priorities for different stakeholders.',
    principle: 'Alignment creates momentum.',
  },
  {
    number: '03',
    shortLabel: 'Step 03',
    title: '03 — Build & Execute',
    body: 'Turn decisions into practical workflows, clear ownership and actionable solutions. Use technology and AI where they create meaningful operational value.',
    principle: 'Move from discussion to implementation.',
  },
  {
    number: '04',
    shortLabel: 'Step 04',
    title: '04 — Measure & Improve',
    body: 'Evaluate outcomes, identify friction, collect feedback and continuously improve the process to support sustainable scaling.',
    principle: 'Build systems that improve over time.',
  },
];

/**
 * Generates deterministic seeded waveform bar heights for visual consistency.
 */
export function buildWaveformBars(seed: number, count = 60): number[] {
  const bars: number[] = [];
  let s = seed >>> 0;
  const nextRand = () => {
    s = (1664525 * s + 1013904223) >>> 0;
    return s / 0xffffffff;
  };

  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const burst1 = Math.exp(-Math.pow((t - 0.27) / 0.1, 2)) * 0.56;
    const burst2 = Math.exp(-Math.pow((t - 0.71) / 0.12, 2)) * 0.6;
    const cadence = 0.22 + 0.16 * Math.sin(t * Math.PI * 7 + seed * 0.3);
    const jitter = nextRand() * 0.28;
    const height = Math.max(0.16, Math.min(1, cadence + burst1 + burst2 + jitter * 0.6));
    bars.push(Number(height.toFixed(3)));
  }

  return bars;
}

/**
 * Generates a clean ATS-friendly plain-text CV download file with verified CV details.
 */
export function buildAtsPlainTextCv(): string {
  const lines: string[] = [
    CANDIDATE_PROFILE.name.toUpperCase(),
    'Localization Operations | Global Delivery | AI-Powered Operational Workflows',
    `${CANDIDATE_PROFILE.location} | ${CANDIDATE_PROFILE.workMode} | ${CANDIDATE_PROFILE.timezoneLabel}`,
    `Email: ${CANDIDATE_PROFILE.email}`,
    `LinkedIn: ${CANDIDATE_PROFILE.linkedin}`,
    '',
    'TARGET APPLICATION',
    `${CANDIDATE_PROFILE.targetRole} — ${CANDIDATE_PROFILE.targetCompany}`,
    '',
    'SUMMARY',
    CANDIDATE_PROFILE.fullSummary,
    '',
    'CORE SKILLS',
    CANDIDATE_PROFILE.coreSkills.join('; '),
    '',
    'PROFESSIONAL EXPERIENCE',
    '',
  ];

  for (const role of EXPERIENCE_ITEMS) {
    lines.push(`${role.company} | ${role.role}`);
    lines.push(role.period);
    for (const h of role.highlights) {
      lines.push(`- ${h}`);
    }
    lines.push('');
  }

  lines.push('EDUCATION');
  for (const edu of CANDIDATE_PROFILE.education) {
    lines.push(`- ${edu.degree} | ${edu.institution} | ${edu.period}`);
  }
  lines.push('');
  lines.push('LANGUAGES');
  lines.push(
    'Hebrew and Russian: Native | English: Full working proficiency | Spanish: Basic'
  );
  lines.push('');
  lines.push('TOOLS & STACK');
  lines.push(CANDIDATE_PROFILE.tools.join(', '));

  return lines.join('\n');
}
