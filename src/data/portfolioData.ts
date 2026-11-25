export type WorkflowNodeKind =
  | 'ai'
  | 'decision'
  | 'human'
  | 'action'
  | 'monitoring';

export interface LocksmithStage {
  id: string;
  shortLabel: string;
  label: string;
  actor: 'customer' | 'ai' | 'decision' | 'human';
  actorLabel: string;
  summary: string;
  sampleTurn: {
    speaker: 'Customer' | 'AI Receptionist' | 'Routing Decision';
    message: string;
  };
  extractedFields: { label: string; value: string }[];
}

export interface SalesAgentStage {
  id: string;
  shortLabel: string;
  label: string;
  kind: WorkflowNodeKind;
  kindLabel: string;
  purpose: string;
  sanitizedExample: string;
  safeguard: string;
}

export interface EcosystemNode {
  id: 'customers' | 'providers' | 'platform' | 'teams';
  label: string;
  shortLabel: string;
  role: string;
  focus: string;
}

export interface DocumentaryLink {
  id: 'website' | 'instagram';
  label: string;
  subtitle: string;
  url: string;
}

export const LOCKSMITH_PROJECT = {
  number: '01',
  title: 'Locksmith AI Receptionist',
  category: 'Conversational AI · Service Operations',
  statusNote: 'Illustrative design & prototype workflow',
  conciseProblem:
    'Locksmiths juggle active on-site jobs while fielding urgent inquiries, causing missed leads and inconsistent intake.',
  conciseSolution:
    'Designed a structured conversational AI receptionist to identify intent, gather key job details and route requests.',
  conciseValue:
    'Designed for more consistent intake, faster initial responsiveness and less repetitive admin work.',
  fullProblem:
    'Locksmith businesses need to respond quickly to incoming customer inquiries while managing ongoing service jobs. Manual customer intake can lead to missed opportunities, inconsistent information collection and repetitive coordination.',
  fullSolution:
    'I designed an AI receptionist to understand customer needs, collect relevant service information and guide incoming requests through a structured conversational workflow.',
  fullValue:
    'More consistent customer intake, improved responsiveness and less repetitive administrative work.',
  simulationDisclaimer:
    'Illustrative prototype walkthrough using a simulated customer scenario — not connected to a live phone line, dispatch integration or production call volume.',
  stages: [
    {
      id: 'request',
      shortLabel: 'Customer request',
      label: 'Customer request',
      actor: 'customer',
      actorLabel: 'Incoming inquiry',
      summary:
        'A customer reaches out with an urgent lock issue while the technician is occupied on another job.',
      sampleTurn: {
        speaker: 'Customer',
        message:
          '“Hi, my front door key snapped inside the lock and I can’t get inside. Is someone available soon?”',
      },
      extractedFields: [
        { label: 'Channel', value: 'Inbound service inquiry (simulated)' },
        { label: 'Status', value: 'Unstructured request received' },
      ],
    },
    {
      id: 'receptionist',
      shortLabel: 'AI receptionist',
      label: 'AI receptionist',
      actor: 'ai',
      actorLabel: 'AI intake',
      summary:
        'Acknowledges urgency calmly, identifies customer intent and asks focused questions to collect structured job details.',
      sampleTurn: {
        speaker: 'AI Receptionist',
        message:
          '“I can help gather the details right away so our team can assist. Could you share your neighborhood, door type and whether anyone is locked inside?”',
      },
      extractedFields: [
        { label: 'Intent', value: 'Emergency lockout · broken key' },
        { label: 'Priority signal', value: 'High urgency — immediate access' },
      ],
    },
    {
      id: 'qualification',
      shortLabel: 'Request qualification',
      label: 'Request qualification',
      actor: 'decision',
      actorLabel: 'Conditional logic',
      summary:
        'Applies structured qualification rules to verify service scope, location coverage and safety or edge-case flags.',
      sampleTurn: {
        speaker: 'Routing Decision',
        message:
          'Verified residential cylinder lock within service area; no safety hazard flagged; complete intake summary assembled.',
      },
      extractedFields: [
        { label: 'Service type', value: 'Broken key extraction + cylinder check' },
        { label: 'Area & safety', value: 'In coverage · Standard residential lock' },
      ],
    },
    {
      id: 'next-step',
      shortLabel: 'Appropriate next step',
      label: 'Appropriate next step',
      actor: 'human',
      actorLabel: 'Human escalation',
      summary:
        'Hands off a clean, structured summary to the locksmith for confirmation—or escalates immediately when edge cases arise.',
      sampleTurn: {
        speaker: 'Routing Decision',
        message:
          'Structured ticket prepared for human confirmation and callback; ambiguous or complex requests escalate directly to the operator.',
      },
      extractedFields: [
        { label: 'Handoff', value: 'Structured summary → Human operator' },
        { label: 'Escalation rule', value: 'Immediate transfer on edge cases' },
      ],
    },
  ] as LocksmithStage[],
  capabilities: [
    'Conversational workflow design',
    'Customer intent identification',
    'Structured data collection',
    'Conditional logic',
    'Service request qualification',
    'Exception handling and escalation',
    'Customer experience design',
  ],
  prototypeScopeNote:
    'Current scope covers conversational architecture, intake logic, qualification structure and escalation rules. Production deployment details, booking integrations and measured call outcomes are intentionally not claimed here.',
};

export const SALES_AGENT_PROJECT = {
  number: '02',
  title: 'AI Sales Operations Agent',
  category: 'Agentic Automation · Business Operations',
  statusNote: 'Implemented core workflow · Iterative expansion',
  conciseProblem:
    'Running a studio pipeline involves repetitive research, lead qualification, outreach drafting, CRM updates and follow-ups.',
  conciseSolution:
    'Built an AI-assisted operational system uniting discovery, qualification, outreach prep, approval gates, CRM sync and monitoring.',
  conciseValue:
    'Designed for a more scalable, repeatable sales process with less manual coordination and stronger operational consistency.',
  fullProblem:
    'Managing the studio’s sales pipeline requires repetitive research, lead qualification, personalized outreach, CRM coordination and follow-ups across multiple systems.',
  fullSolution:
    'I built an AI-assisted operational system connecting lead discovery, research, qualification, communication preparation, CRM management and follow-up monitoring into a structured workflow.',
  fullValue:
    'A more scalable, repeatable sales process designed to reduce manual coordination and improve operational consistency.',
  sanitizedNote:
    'All stage examples below use sanitized illustrative records — no actual client data, personal emails or credentials are shown.',
  stages: [
    {
      id: 'discovery',
      shortLabel: 'Lead Discovery',
      label: 'Lead Discovery',
      kind: 'ai',
      kindLabel: 'AI Processing',
      purpose:
        'Collects structured business prospects from defined sources into a single intake queue instead of scattered notes.',
      sanitizedExample:
        'Sample record: Regional Wellness Studio (Example Co.) · Website & public profile queued.',
      safeguard: 'Normalized record schema at intake to prevent malformed entries.',
    },
    {
      id: 'research',
      shortLabel: 'Research & Qualify',
      label: 'Research & Qualification',
      kind: 'decision',
      kindLabel: 'Decision',
      purpose:
        'Classifies fit criteria, checks existing pipeline records for duplicates and summarizes relevant context before drafting.',
      sanitizedExample:
        'Classification: Fit = Medium-High · Multilingual site opportunity · Duplicate check passed.',
      safeguard: 'Duplicate prevention check against existing records prior to outreach prep.',
    },
    {
      id: 'outreach-prep',
      shortLabel: 'Outreach Prep',
      label: 'Personalized Outreach Preparation',
      kind: 'ai',
      kindLabel: 'AI Processing',
      purpose:
        'Prepares tailored draft communication anchored in verified research notes rather than generic templates.',
      sanitizedExample:
        'Draft prepared referencing Example Co.’s international audience; held in review queue.',
      safeguard: 'Staged as draft only — no automatic external sending.',
    },
    {
      id: 'validation',
      shortLabel: 'Validation & Approval',
      label: 'Validation & Approval',
      kind: 'human',
      kindLabel: 'Human Approval',
      purpose:
        'Enforces rule checks and a mandatory human review gate so tone, accuracy and timing are verified before execution.',
      sanitizedExample:
        'Operator reviews draft, confirms contact relevance and approves or edits before dispatch.',
      safeguard: 'Explicit human sign-off required; incomplete records route to exception queue.',
    },
    {
      id: 'crm',
      shortLabel: 'CRM Coordination',
      label: 'CRM Coordination',
      kind: 'action',
      kindLabel: 'External Action',
      purpose:
        'Logs approved actions, updates pipeline stage and keeps status history consistent across systems.',
      sanitizedExample:
        'Pipeline status updated to “Outreach Sent” with timestamp and next review date.',
      safeguard: 'Controlled execution with idempotent status updates to prevent duplicate logs.',
    },
    {
      id: 'monitoring',
      shortLabel: 'Reply Monitoring',
      label: 'Reply Monitoring',
      kind: 'monitoring',
      kindLabel: 'Monitoring & Loop',
      purpose:
        'Watches for inbound responses, bounces or exceptions so active conversations return immediately to human handling.',
      sanitizedExample:
        'Inbound reply detected → automated follow-up sequence paused and flagged for personal reply.',
      safeguard: 'Automatic stop-on-reply rule prevents awkward follow-ups after a prospect responds.',
    },
    {
      id: 'follow-up',
      shortLabel: 'Follow-up',
      label: 'Follow-up',
      kind: 'monitoring',
      kindLabel: 'Monitoring & Loop',
      purpose:
        'Schedules structured follow-up reminders when no reply arrives, feeding status outcomes back into pipeline prioritization.',
      sanitizedExample:
        '7-day no-response window → prepares concise follow-up draft for human review.',
      safeguard: 'Capped follow-up cadence with clear opt-out and exception handling.',
    },
  ] as SalesAgentStage[],
  capabilities: [
    'Agent orchestration',
    'Workflow automation',
    'Data classification',
    'Cross-system coordination',
    'Human approval checkpoints',
    'Validation and duplicate prevention',
    'Controlled execution',
    'Exception handling',
    'Monitoring and follow-up management',
  ],
  implementedAndTested: [
    'Structured lead intake, classification and duplicate checks',
    'Context-based personalized outreach draft preparation',
    'Mandatory human validation & approval checkpoints before sending',
    'Status tracking and exception flagging for incomplete or ambiguous records',
  ],
  inDevelopment: [
    'Expanded multi-system CRM synchronization across higher pipeline volume',
    'Automated reply-signal routing and adaptive multi-step follow-up scheduling',
  ],
};

export const SCALING_GLOBAL_OPERATIONS = {
  title: 'Scaling Global Operations',
  subtitle: 'Global platforms. Marketplace ecosystems. Cross-functional execution.',
  mainCopy:
    'At Wix, I supported the international scaling of products including Wix Studio, Wix Marketplace and the Partners Dashboard across 36+ languages. My strength is connecting business requirements, people and technology to turn complex international initiatives into coordinated execution.',
  marketplaceNote:
    'Wix Marketplace connects agencies, freelancers and other Wix professionals with customers seeking their services. My responsibilities involved product localization and cross-functional coordination supporting the international accessibility and scalability of this ecosystem.',
  pillars: [
    {
      title: 'Marketplace & Platform Scaling',
      body: 'Understanding interconnected platform audiences, international product adoption and the operational complexity of global ecosystems.',
    },
    {
      title: 'Cross-functional Alignment',
      body: 'Defining problems, translating complex requirements into clear priorities and connecting stakeholders across different professional functions.',
    },
    {
      title: 'Operational Execution & Improvement',
      body: 'Coordinating dependencies, taking ownership of delivery and identifying opportunities to improve processes through technology and automation.',
    },
  ],
  ecosystemNodes: [
    {
      id: 'customers',
      label: 'Global Customers',
      shortLabel: 'Global customers',
      role: 'Demand side · 36+ languages',
      focus:
        'Need clear, localized discovery and product journeys across markets to find and work with the right professionals.',
    },
    {
      id: 'providers',
      label: 'Professional Service Providers',
      shortLabel: 'Service providers',
      role: 'Agencies & freelancers',
      focus:
        'Rely on Wix Marketplace and Partners Dashboard workflows that work seamlessly across international regions.',
    },
    {
      id: 'platform',
      label: 'Marketplace Platform',
      shortLabel: 'Marketplace platform',
      role: 'Wix Marketplace · Studio · Partners',
      focus:
        'Connects interconnected audiences at global scale—requiring consistent multilingual UX, quality standards and release readiness.',
    },
    {
      id: 'teams',
      label: 'Internal Cross-Functional Teams',
      shortLabel: 'Cross-functional teams',
      role: 'Product · Engineering · Design · Localization',
      focus:
        'Aligned 20+ teams around upstream localization planning, Smartling/Jira/Monday workflows and shared quality ownership.',
    },
  ] as EcosystemNode[],
};

export const INDEPENDENT_DOCUMENTARY_PROJECT: {
  eyebrow: string;
  title: string;
  description: string;
  links: DocumentaryLink[];
} = {
  eyebrow: 'Humans of Samui',
  title: 'Independent Documentary Project',
  description:
    'I’m endlessly curious about people, cultures and the stories behind the people I meet. Alongside my operations and AI work, I produce an independent documentary project capturing real human stories.',
  links: [
    {
      id: 'website',
      label: 'Explore the project',
      subtitle: 'web-coconuts.com/humans',
      url: 'https://www.web-coconuts.com/humans',
    },
    {
      id: 'instagram',
      label: 'Follow on Instagram',
      subtitle: '@humans_of_samui',
      url: 'https://www.instagram.com/humans_of_samui/',
    },
  ],
};
