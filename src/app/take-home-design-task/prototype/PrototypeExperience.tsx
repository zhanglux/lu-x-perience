'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Bell,
  BookOpen,
  Building2,
  ChevronDown,
  ChevronRight,
  CircleUserRound,
  Clock,
  FileBarChart,
  FileText,
  GitCompare,
  HelpCircle,
  History,
  Home,
  LayoutGrid,
  LayoutList,
  MapPinned,
  MessageCircle,
  PanelLeftClose,
  PanelRightClose,
  ScanLine,
  Search,
  Send,
  ShieldAlert,
  X,
} from 'lucide-react';

type FlowStep = 'projects' | 'upload' | 'workspace';
type ComparePhase = 'idle' | 'thinking' | 'done';

interface CompareArtifact {
  id: string;
  docs: [string, string];
  createdAt: string;
}

interface PrototypeExperienceProps {
  siteBasePath: string;
}

type TransactionStage =
  | 'Intake & Setup'
  | 'Corporate Review'
  | 'Lease Abstraction'
  | 'Title & Survey'
  | 'Risk Mapping'
  | 'Closing Prep';

interface Project {
  name: string;
  color: string;
  created: string;
  lastActivity: string;
  lastActivityDetail: string;
  stage: TransactionStage;
  stageColor: string;
}

const projectsSeed: Project[] = [
  {
    name: 'Greenlock Portfolio — 14 Assets',
    color: 'bg-emerald-600/70',
    created: 'Jan 24, 2025',
    lastActivity: '2h ago',
    lastActivityDetail: 'Risk Analysis run on 6 flagged leases',
    stage: 'Lease Abstraction',
    stageColor: 'text-violet-300 bg-violet-500/15 border-violet-500/25',
  },
  {
    name: '880 Industrial Pkwy Acquisition',
    color: 'bg-sky-600/70',
    created: 'Jan 19, 2025',
    lastActivity: '1d ago',
    lastActivityDetail: 'Title commitment reviewed — 3 exceptions flagged',
    stage: 'Title & Survey',
    stageColor: 'text-sky-300 bg-sky-500/15 border-sky-500/25',
  },
  {
    name: 'Westport Commerce Center',
    color: 'bg-orange-500/65',
    created: 'Jan 14, 2025',
    lastActivity: '3d ago',
    lastActivityDetail: 'Closing checklist generated',
    stage: 'Closing Prep',
    stageColor: 'text-emerald-300 bg-emerald-500/15 border-emerald-500/25',
  },
  {
    name: 'Hargrove Logistics Hub',
    color: 'bg-indigo-600/65',
    created: 'Dec 30, 2024',
    lastActivity: '1w ago',
    lastActivityDetail: 'Entity structure extracted from LLC agreements',
    stage: 'Corporate Review',
    stageColor: 'text-indigo-300 bg-indigo-500/15 border-indigo-500/25',
  },
  {
    name: '10 Downing St — Office Conversion',
    color: 'bg-rose-600/65',
    created: 'Dec 18, 2024',
    lastActivity: '2w ago',
    lastActivityDetail: 'Cross-document inconsistencies identified',
    stage: 'Risk Mapping',
    stageColor: 'text-rose-300 bg-rose-500/15 border-rose-500/25',
  },
  {
    name: 'Meridian Cold Storage — PSA Review',
    color: 'bg-amber-600/65',
    created: 'Dec 5, 2024',
    lastActivity: '3w ago',
    lastActivityDetail: '428 files ingested, deal type confirmed',
    stage: 'Intake & Setup',
    stageColor: 'text-amber-300 bg-amber-500/15 border-amber-500/25',
  },
];

type SortKey = 'lastModified' | 'stage';

const STAGE_ORDER: TransactionStage[] = [
  'Intake & Setup',
  'Corporate Review',
  'Lease Abstraction',
  'Title & Survey',
  'Risk Mapping',
  'Closing Prep',
];

/** Surfaces use prototype palette (#2764ff, violet prompts, sky Copilot, slate chrome, portfolio terracotta #CC785C, emerald accent). Text stays dark for AA contrast on light gradients. */
const toolboxCards: ReadonlyArray<{
  title: string;
  body: string;
  surface: string;
  runClass: string;
  Icon: LucideIcon;
}> = [
  {
    title: 'Report',
    body: 'Generate reports, highlight exceptions, verify compliance.',
    Icon: FileBarChart,
    surface:
      'border-slate-300/55 bg-[linear-gradient(162deg,#f6f9ff_0%,#eef3fb_42%,#e4eaf5_100%)] hover:border-[#2764ff]/42 hover:bg-[linear-gradient(162deg,#fbfcff_0%,#f3f7fc_42%,#e9f1f8_100%)] hover:shadow-md hover:shadow-[0_12px_28px_-14px_rgba(39,100,255,0.35)]',
    runClass: 'text-[#1d4ed8]',
  },
  {
    title: 'Research',
    body: 'Query on key real estate concepts.',
    Icon: BookOpen,
    surface:
      'border-violet-200/55 bg-[linear-gradient(162deg,#f8f5ff_0%,#efeafc_42%,#e6dff7_100%)] hover:border-violet-400/45 hover:bg-[linear-gradient(162deg,#fdfbff_0%,#f5f0fc_42%,#ebe4f8_100%)] hover:shadow-md hover:shadow-[0_12px_28px_-14px_rgba(124,58,237,0.22)]',
    runClass: 'text-[#5b21b6]',
  },
  {
    title: 'Compare',
    body: 'Compare two documents and summarize key differences.',
    Icon: GitCompare,
    surface:
      'border-sky-200/60 bg-[linear-gradient(162deg,#f0f9ff_0%,#e7f4fc_42%,#d9ebf6_100%)] hover:border-sky-400/45 hover:bg-[linear-gradient(162deg,#f7fcff_0%,#edf6fc_42%,#e1eff8_100%)] hover:shadow-md hover:shadow-[0_12px_28px_-14px_rgba(14,165,233,0.24)]',
    runClass: 'text-[#0369a1]',
  },
  {
    title: 'Restore document',
    body: 'Convert hard to read scans into editable Word files.',
    Icon: ScanLine,
    surface:
      'border-slate-300/55 bg-[linear-gradient(162deg,#f6f7f9_0%,#eceff5_42%,#e2e7ef_100%)] hover:border-slate-400/65 hover:bg-[linear-gradient(162deg,#fafbfc_0%,#f1f4f8_42%,#e7ecf3_100%)] hover:shadow-md hover:shadow-[0_12px_28px_-14px_rgba(51,65,85,0.2)]',
    runClass: 'text-[#1e3a8a]',
  },
  {
    title: 'Risk analysis',
    body: 'Condense documents into key points and flag issues.',
    Icon: ShieldAlert,
    surface:
      'border-[#e8d9d3]/90 bg-[linear-gradient(162deg,#fdf9f7_0%,#f6f0ec_42%,#ede4de_100%)] hover:border-[#CC785C]/45 hover:bg-[linear-gradient(162deg,#fffefd_0%,#faf4f0_42%,#f2e8e3_100%)] hover:shadow-md hover:shadow-[0_12px_28px_-14px_rgba(204,120,92,0.22)]',
    runClass: 'text-[#9a3412]',
  },
  {
    title: 'Property visualizer',
    body: 'View legal descriptions and overlay plans.',
    Icon: MapPinned,
    surface:
      'border-emerald-200/50 bg-[linear-gradient(162deg,#f3faf7_0%,#e9f5f1_42%,#ddeee8_100%)] hover:border-emerald-400/42 hover:bg-[linear-gradient(162deg,#f7fcfa_0%,#eef7f3_42%,#e2f0ea_100%)] hover:shadow-md hover:shadow-[0_12px_28px_-14px_rgba(5,150,105,0.2)]',
    runClass: 'text-[#047857]',
  },
];


const allKbDocuments: ReadonlyArray<{ label: string; checked: boolean }> = [
  // Organizational (22)
  { label: 'LLC agreements — Portfolio Holdings', checked: false },
  { label: 'Authority to sell — TX Holdings LLC', checked: false },
  { label: 'Good standing — GA Industrial LLC', checked: false },
  { label: 'Operating agreement — TX Holdings LLC', checked: false },
  { label: 'Certificate of formation — FL Logistics LLC', checked: false },
  { label: 'Entity org chart', checked: false },
  { label: 'UCC lien search — TX entities', checked: false },
  { label: 'UCC lien search — GA entities', checked: false },
  { label: 'UCC lien search — FL entities', checked: false },
  // Leases (112 — showing a sample)
  { label: 'Lease — 1421 Commerce Blvd, TX', checked: false },
  { label: 'Lease — 880 Industrial Pkwy, GA', checked: false },
  { label: 'Lease — 2200 Logistics Way, FL', checked: false },
  { label: 'Lease — 4500 Warehouse Dr, TX', checked: false },
  { label: 'Lease — 760 Distribution Ct, GA', checked: false },
  { label: 'Lease — 330 Freight Loop, FL', checked: false },
  { label: 'Lease — 9900 Port Access Rd, TX', checked: false },
  { label: 'Lease — 100 Industrial Park Ave, GA', checked: false },
  // Lease amendments (96)
  { label: 'Amendment #1 — 1421 Commerce Blvd', checked: false },
  { label: 'Amendment #2 — 1421 Commerce Blvd', checked: false },
  { label: 'Amendment #1 — 880 Industrial Pkwy', checked: false },
  { label: 'Amendment #1 — 4500 Warehouse Dr', checked: false },
  { label: 'Amendment #1 — 330 Freight Loop', checked: false },
  { label: 'Amendment #2 — 330 Freight Loop', checked: false },
  // Title commitments (14)
  { label: 'Title commitment — Property 01 (Commerce Blvd)', checked: false },
  { label: 'Title commitment — Property 02 (Industrial Pkwy)', checked: false },
  { label: 'Title commitment — Property 03 (Logistics Way)', checked: false },
  { label: 'Title commitment — Property 04 (Warehouse Dr)', checked: false },
  { label: 'Title commitment — Property 05 (Distribution Ct)', checked: false },
  { label: 'Title commitment — Property 06 (Freight Loop)', checked: false },
  // Surveys (14)
  { label: 'Survey — Property 01 (Commerce Blvd)', checked: false },
  { label: 'Survey — Property 02 (Industrial Pkwy)', checked: false },
  { label: 'Survey — Property 03 (Logistics Way)', checked: false },
  { label: 'Survey — Property 04 (Warehouse Dr)', checked: false },
  // Environmental reports (11)
  { label: 'Phase I ESA — 1421 Commerce Blvd', checked: false },
  { label: 'Phase I ESA — 880 Industrial Pkwy', checked: false },
  { label: 'Phase II ESA — 4500 Warehouse Dr', checked: false },
  { label: 'Phase I ESA — 330 Freight Loop', checked: false },
  { label: 'Phase I ESA — 9900 Port Access Rd', checked: false },
  // Service / vendor contracts (37)
  { label: 'HVAC maintenance contract', checked: false },
  { label: 'Security services agreement', checked: false },
  { label: 'Landscaping contract — Portfolio', checked: false },
  { label: 'Elevator inspection agreement', checked: false },
  { label: 'Waste management contract', checked: false },
  { label: 'Fire suppression maintenance', checked: false },
  // Loan-related docs (8)
  { label: 'Loan agreement — First National Bank', checked: false },
  { label: 'Promissory note — $45M facility', checked: false },
  { label: 'Deed of trust — TX properties', checked: false },
  { label: 'Intercreditor agreement', checked: false },
  // Miscellaneous
  { label: 'Property tax assessments 2023', checked: false },
  { label: 'Insurance certificates — All properties', checked: false },
  { label: 'Zoning confirmation letters', checked: false },
  { label: 'ADA compliance report', checked: false },
  { label: 'Permitted use letters — TX portfolio', checked: false },
  { label: 'FIRPTA certificates — Seller entities', checked: false },
  { label: 'Estoppel certificates — Major tenants', checked: false },
  { label: 'SNDA agreements', checked: false },
];

const kbCheckboxClassName =
  'size-4 shrink-0 rounded border border-[#00BBFF]/40 bg-[#00BBFF]/25 accent-[#00BBFF] text-[#0B0E14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00BBFF]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121722]';

type WorkflowStepStatus = 'done' | 'warn' | 'progress' | 'pending' | 'blocker';

type WorkflowStepSpec = {
  status: WorkflowStepStatus;
  text: string;
  detail?: string;
};

type WorkflowPhaseSpec = {
  phase: number;
  title: string;
  subtitle: string;
  steps: WorkflowStepSpec[];
};

const WORKFLOW_STATUS_GLYPH: Record<WorkflowStepStatus, string> = {
  done: '✅',
  warn: '⚠️',
  progress: '🔄',
  pending: '⬜',
  blocker: '🔴',
};

const WORKFLOW_STATUS_A11Y: Record<WorkflowStepStatus, string> = {
  done: 'Copilot completed',
  warn: 'Copilot flagged — needs review',
  progress: 'In progress',
  pending: 'Awaiting progression or lawyer sign-off',
  blocker: 'Needs lawyer judgment',
};

/** Demo checklist: Copilot auto-updates; ⬜ sign-off rows expect lawyer confirmation. */
const diligenceWorkflowPhases: WorkflowPhaseSpec[] = [
  {
    phase: 1,
    title: 'Intake & Setup',
    subtitle: 'Copilot auto-completes this on document ingestion.',
    steps: [
      {
        status: 'done',
        text: 'Documents ingested (428 files indexed)',
      },
      {
        status: 'done',
        text: 'Deal type identified (asset purchase)',
      },
      {
        status: 'warn',
        text:
          'Document gap detection — Copilot flags missing items against expected checklist for a 14-property portfolio acquisition',
        detail:
          'e.g. “14 surveys uploaded — but only 11 environmental reports. 3 properties missing environmental coverage.”',
      },
      {
        status: 'pending',
        text: 'Confirm document set is complete (lawyer sign-off)',
      },
    ],
  },
  {
    phase: 2,
    title: 'Corporate & Authority Review',
    subtitle:
      'Maps to LLC agreements, Authority, Good standing docs already in your left column.',
    steps: [
      {
        status: 'done',
        text: 'Entity structure extracted (LLC agreements reviewed)',
      },
      {
        status: 'done',
        text: 'Good standing confirmed across entities',
      },
      {
        status: 'warn',
        text: 'Authority to sell — needs lawyer review (one entity flagged)',
      },
      { status: 'pending', text: 'UCC lien search reviewed' },
      { status: 'pending', text: 'Entity chain sign-off' },
    ],
  },
  {
    phase: 3,
    title: 'Lease Abstraction',
    subtitle: 'The biggest time sink — 112 leases + 96 amendments.',
    steps: [
      {
        status: 'progress',
        text: 'Lease abstraction in progress (74/112 complete)',
      },
      {
        status: 'pending',
        text: 'Amendment reconciliation (96 amendments mapped to parent leases)',
      },
      {
        status: 'blocker',
        text: 'ROFR / assignment clauses — 6 leases flagged, need judgment',
      },
      { status: 'pending', text: 'Co-tenancy and exclusivity review' },
      { status: 'pending', text: 'CAM obligation summary' },
      { status: 'pending', text: 'Lease abstraction sign-off' },
    ],
  },
  {
    phase: 4,
    title: 'Title & Survey Review',
    subtitle: '14 title commitments + 14 surveys.',
    steps: [
      {
        status: 'pending',
        text: 'Title exceptions extracted across all 14 properties',
      },
      {
        status: 'pending',
        text: 'Survey vs title comparison (boundary, easement cross-check)',
      },
      {
        status: 'blocker',
        text: 'Material exceptions flagged — awaiting lawyer review',
      },
      {
        status: 'pending',
        text: 'Access rights confirmed for all properties',
      },
      { status: 'pending', text: 'Title objection letter drafted' },
      { status: 'pending', text: 'Title sign-off' },
    ],
  },
  {
    phase: 5,
    title: 'Risk & Issue Mapping',
    subtitle:
      'The showcase phase — where Risk Analysis tool feeds into this.',
    steps: [
      {
        status: 'pending',
        text: 'Cross-document inconsistencies identified',
      },
      {
        status: 'blocker',
        text: 'Red issues — requires immediate lawyer judgment',
      },
      {
        status: 'warn',
        text: 'Yellow issues — flagged, lower urgency',
      },
      {
        status: 'pending',
        text: 'Risk categorisation confirmed by lawyer',
      },
      { status: 'pending', text: 'Issues assigned / escalated' },
    ],
  },
  {
    phase: 6,
    title: 'Environmental & Regulatory',
    subtitle:
      '11 environmental reports for a 14-property industrial portfolio — industrial land raises contamination risk.',
    steps: [
      {
        status: 'pending',
        text: 'Environmental reports reviewed (11/14 — 3 missing)',
      },
      {
        status: 'pending',
        text: 'Zoning compliance confirmed across all properties',
      },
      {
        status: 'blocker',
        text:
          'Industrial use flags — contamination or restriction risks on industrial sites',
      },
      { status: 'pending', text: 'ADA and code violations checked' },
      { status: 'pending', text: 'Permits verified' },
    ],
  },
  {
    phase: 7,
    title: 'Commercial & Third-Party Contracts',
    subtitle: '37 service/vendor contracts + 8 loan-related docs.',
    steps: [
      {
        status: 'pending',
        text: 'Service contracts reviewed (assignment on sale implications)',
      },
      { status: 'pending', text: 'Loan documents reviewed' },
      {
        status: 'pending',
        text:
          'Financing assumptions or payoff requirements identified',
      },
      {
        status: 'pending',
        text: 'Third-party consent requirements flagged',
      },
    ],
  },
  {
    phase: 8,
    title: 'Closing Preparation',
    subtitle:
      'Becomes active as deal approaches — PSA deadline in 19 days makes this urgent.',
    steps: [
      { status: 'pending', text: 'Closing checklist generated' },
      { status: 'pending', text: 'Signature packets prepared' },
      { status: 'pending', text: 'FIRPTA certificates' },
      { status: 'pending', text: 'Estoppels and SNDAs collected' },
      { status: 'pending', text: 'Settlement statement reviewed' },
      { status: 'pending', text: 'Recording instructions confirmed' },
    ],
  },
];

function DiligenceWorkflowPanel() {
  return (
    <div className="space-y-5">
      <p className="text-[12px] text-slate-400 leading-relaxed rounded-lg border border-white/10 bg-black/25 px-3.5 py-2.5">
        Copilot advances this checklist as tools run and documents are reviewed. You
        don&apos;t tick items manually — Copilot updates status and surfaces what
        needs{' '}
        <span className="text-slate-200 font-medium">
          confirmation or judgment
        </span>
        .
      </p>

      <div className="space-y-4">
        {diligenceWorkflowPhases.map((phase) => (
          <section
            key={phase.phase}
            className="rounded-xl border border-white/[0.08] bg-[#0e131c]/95 p-4 shadow-sm shadow-black/15"
          >
            <header className="mb-3">
              <h2 className="text-[13px] font-semibold text-white tracking-tight">
                Phase {phase.phase} — {phase.title}
              </h2>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                {phase.subtitle}
              </p>
            </header>
            <ul className="space-y-2.5 list-none m-0 p-0">
              {phase.steps.map((step, i) => (
                <li
                  key={i}
                  aria-label={`${WORKFLOW_STATUS_A11Y[step.status]} — ${step.text}`}
                >
                  <div className="flex gap-2.5 text-[13px] leading-snug">
                    <span
                      className="shrink-0 w-7 text-center select-none"
                      title={WORKFLOW_STATUS_A11Y[step.status]}
                      aria-hidden
                    >
                      {WORKFLOW_STATUS_GLYPH[step.status]}
                    </span>
                    <span className="text-slate-200 min-w-0">{step.text}</span>
                  </div>
                  {step.detail ? (
                    <p className="mt-1.5 ml-9 text-[11.5px] text-slate-500 leading-relaxed border-l border-white/10 pl-3">
                      {step.detail}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

function WorkspaceThreeColumnSkeleton() {
  const pulse = 'rounded-md bg-white/[0.055] animate-pulse';
  return (
    <div className="space-y-6 max-w-[1400px]">
      <header className="flex items-start gap-3">
        <div className="mt-1 size-11 rounded-lg bg-white/[0.06] animate-pulse shrink-0" />
        <div className="space-y-3 flex-1 pt-0.5">
          <div className={`h-6 max-w-xl ${pulse}`} />
          <div className={`h-3 max-w-sm ${pulse}`} />
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
        <div className="xl:col-span-3 rounded-xl border border-white/[0.08] bg-[#121722]/90 min-h-[500px] overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-white/10 flex justify-between items-center">
            <div className={`h-4 w-14 ${pulse}`} />
            <div className={`size-4 rounded ${pulse}`} />
          </div>
          <div className="p-4 space-y-4 flex-1">
            <div className="h-36 rounded-xl bg-white/[0.04] animate-pulse border border-dashed border-white/10" />
            <div className={`h-3 w-full ${pulse}`} />
            <div className={`h-3 w-[88%] ${pulse}`} />
            <div className={`h-3 w-[92%] ${pulse}`} />
            <div className={`h-8 w-full rounded-lg ${pulse}`} />
          </div>
        </div>

        <div className="xl:col-span-5 rounded-xl border border-white/[0.08] bg-[#121722]/90 min-h-[500px] overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-white/10">
            <div className={`h-4 w-44 ${pulse}`} />
          </div>
          <div className="p-5 space-y-5 flex-1">
            <div className="space-y-2">
              <div className={`h-3 w-12 ${pulse}`} />
              <div className={`h-4 w-full max-w-md ${pulse}`} />
            </div>
            <div className="space-y-2">
              <div className={`h-3 w-24 ${pulse}`} />
              <div className={`h-4 w-36 ${pulse}`} />
            </div>
            <div className={`h-24 w-full rounded-lg ${pulse}`} />
            <div className="flex gap-2">
              <div className={`h-8 flex-1 rounded-lg ${pulse}`} />
              <div className={`h-8 flex-1 rounded-lg ${pulse}`} />
              <div className={`h-8 flex-1 rounded-lg ${pulse}`} />
            </div>
            <div className={`h-12 w-full rounded-xl ${pulse} mt-auto`} />
          </div>
        </div>

        <div className="xl:col-span-4 rounded-xl border border-white/[0.08] bg-[#121722]/90 min-h-[500px] overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-white/10 flex justify-between items-center">
            <div className={`h-4 w-16 ${pulse}`} />
            <div className={`size-4 rounded ${pulse}`} />
          </div>
          <div className="p-3 grid grid-cols-2 gap-2 flex-1">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-28 rounded-xl bg-[#eef2f8]/[0.15] animate-pulse border border-white/[0.06]"
              />
            ))}
          </div>
          <div className="border-t border-white/10 p-4 space-y-3 bg-[#0e1219]/95">
            <div className={`h-3 w-28 ${pulse}`} />
            <div className={`h-11 w-full rounded-lg ${pulse}`} />
            <div className={`h-11 w-full rounded-lg ${pulse}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

function shortName(label: string): string {
  const before = label.split('—')[0].split('–')[0].trim();
  return before.length > 28 ? before.slice(0, 26) + '…' : before;
}

export function PrototypeExperience({ siteBasePath }: PrototypeExperienceProps) {
  const homeHref = `${siteBasePath}/`;
  const takeHomeHref = `${siteBasePath}/take-home-design-task`;
  const prototypeHref = `${siteBasePath}/take-home-design-task/prototype`;

  const [step, setStep] = useState<FlowStep>('projects');
  const [uploadedNames, setUploadedNames] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [transactionPanelTab, setTransactionPanelTab] = useState<'chat' | 'workflow'>(
    'chat',
  );
  const [copilotInput, setCopilotInput] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('lastModified');
  const [kbSearch, setKbSearch] = useState('');
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [comparePhase, setComparePhase] = useState<ComparePhase>('idle');
  const [thinkingExpanded, setThinkingExpanded] = useState(true);
  const [artifacts, setArtifacts] = useState<CompareArtifact[]>([]);
  const [activeArtifact, setActiveArtifact] = useState<CompareArtifact | null>(null);
  const [toolboxOpen, setToolboxOpen] = useState(true);
  const [artifactsOpen, setArtifactsOpen] = useState(false);

  const selectAllRef = useRef<HTMLInputElement>(null);
  const threadBottomRef = useRef<HTMLDivElement>(null);
  const selectedCount = selectedDocs.length;
  const totalCount = allKbDocuments.length;

  useEffect(() => {
    if (!selectAllRef.current) return;
    selectAllRef.current.indeterminate = selectedCount > 0 && selectedCount < totalCount;
    selectAllRef.current.checked = selectedCount === totalCount;
  }, [selectedCount, totalCount]);

  const toggleDoc = useCallback((label: string) => {
    setSelectedDocs((prev) =>
      prev.includes(label) ? prev.filter((d) => d !== label) : [...prev, label],
    );
  }, []);

  const runCompare = useCallback(() => {
    if (selectedDocs.length !== 2) return;
    setComparePhase('thinking');
    setThinkingExpanded(true);
    setTimeout(() => {
      setThinkingExpanded(false);
      setComparePhase('done');
      const artifact: CompareArtifact = {
        id: Date.now().toString(),
        docs: selectedDocs as [string, string],
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setArtifacts((prev) => [artifact, ...prev]);
      setActiveArtifact(artifact);
      setArtifactsOpen(true);
    }, 2800);
  }, [selectedDocs]);

  // Auto-scroll thread to bottom when new content is added
  useEffect(() => {
    if (transactionPanelTab === 'chat') {
      threadBottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [selectedDocs.length, comparePhase, transactionPanelTab]);

  const ingestFiles = useCallback((files: FileList | null) => {
    if (!files?.length) return;
    const names = Array.from(files).map((f) => f.name);
    setUploadedNames((prev) => Array.from(new Set([...prev, ...names])));
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      ingestFiles(e.dataTransfer.files);
    },
    [ingestFiles],
  );

  const breadcrumbTail =
    step === 'projects'
      ? 'Prototype home'
      : step === 'upload'
        ? 'New project · Upload'
        : 'Buyer acquisition workspace';

  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-100 antialiased font-sans">
      <div className="px-6 pt-4 pb-2">
        <nav className="text-xs text-slate-500 flex items-center gap-2 flex-wrap">
          <a href={homeHref} className="hover:text-slate-200 transition-colors">
            Portfolio
          </a>
          <span className="text-slate-600">/</span>
          <a href={takeHomeHref} className="hover:text-slate-200 transition-colors">
            Take-home design task
          </a>
          <span className="text-slate-600">/</span>
          <a href={prototypeHref} className="hover:text-slate-200 transition-colors">
            Prototype
          </a>
          <span className="text-slate-600">/</span>
          <span className="text-slate-300">{breadcrumbTail}</span>
        </nav>
      </div>

      <div className="flex min-h-[calc(100vh-44px)]">
        <aside className="w-14 shrink-0 border-r border-white/10 bg-[#070b12] py-6 flex flex-col items-center gap-6">
          <div className="size-9 rounded-lg bg-orange-400/85" />
          <button
            type="button"
            className={`p-2.5 rounded-lg ${
              step === 'projects'
                ? 'bg-[#00BBFF]/25 text-white border border-[#00BBFF]/35 shadow-sm shadow-black/20'
                : 'text-slate-400 hover:bg-white/5 border border-transparent'
            }`}
            aria-current={step === 'projects' ? 'page' : undefined}
          >
            <Home className="size-[18px]" />
          </button>
          <button
            type="button"
            className={`p-2.5 rounded-lg ${step !== 'projects' ? 'bg-white/12 text-slate-300 border border-white/10' : 'text-slate-400 hover:bg-white/5 border border-transparent'}`}
          >
            <FileText className="size-[18px]" />
          </button>
          <button type="button" className="p-2.5 rounded-lg text-slate-400 hover:bg-white/5">
            <LayoutGrid className="size-[18px]" />
          </button>
          <div className="flex-1" />
          <div className="flex flex-col gap-3 pb-4">
            <button type="button" className="p-2 text-slate-500 hover:text-slate-300 hover:bg-white/5 rounded-lg">
              <Bell className="size-[18px]" />
            </button>
            <button type="button" className="p-2 text-slate-500 hover:text-slate-300 hover:bg-white/5 rounded-lg">
              <History className="size-[18px]" />
            </button>
            <button type="button" className="p-2 text-slate-500 hover:text-slate-300 hover:bg-white/5 rounded-lg">
              <HelpCircle className="size-[18px]" />
            </button>
          </div>
          <button
            type="button"
            className="mt-auto size-9 rounded-full bg-slate-600 text-[10px] font-semibold text-white"
          >
            TR
          </button>
        </aside>

        <main
          className={`flex-1 px-10 py-8 min-h-0 flex flex-col ${
            step === 'workspace'
              ? 'overflow-hidden max-xl:overflow-x-auto'
              : 'overflow-x-auto relative'
          }`}
        >
          {step === 'projects' && (
            <>
              <header className="mb-12 flex items-center gap-3">
                <div
                  className="size-11 rounded-xl bg-white/[0.08] border border-white/[0.12] shadow-inner grid place-items-center text-slate-200"
                  role="img"
                  aria-label="User profile"
                >
                  <CircleUserRound className="size-7" strokeWidth={1.75} aria-hidden />
                </div>
                <h1 className="text-[28px] font-medium tracking-tight text-white">
                  Welcome back, Tommy
                </h1>
              </header>

              <section className="max-w-6xl">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <p className="text-[15px] text-slate-300">Your projects</p>
                    <span className="text-[12px] text-slate-600">{projectsSeed.length} projects</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 h-9">
                      <span className="text-[11px] text-slate-500 shrink-0">Sort by</span>
                      <select
                        value={sortKey}
                        onChange={(e) => setSortKey(e.target.value as SortKey)}
                        className="bg-transparent text-[12px] text-slate-300 outline-none cursor-pointer"
                        aria-label="Sort projects"
                      >
                        <option value="lastModified">Last modified</option>
                        <option value="stage">Transaction stage</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      className="size-9 rounded-md border border-white/15 bg-white/[0.04] text-slate-400 grid place-items-center"
                      aria-label="Grid view"
                    >
                      <LayoutGrid className="size-4" />
                    </button>
                    <button
                      type="button"
                      className="size-9 rounded-md border border-white/15 bg-white/[0.04] text-slate-400 grid place-items-center"
                      aria-label="List view"
                    >
                      <LayoutList className="size-4" />
                    </button>
                    <button
                      type="button"
                      className="h-9 px-4 rounded-md bg-[#2764ff] text-[13px] font-medium text-white hover:bg-[#356dff]"
                      onClick={() => setStep('upload')}
                    >
                      + Create new project
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {[...projectsSeed]
                    .sort((a, b) =>
                      sortKey === 'stage'
                        ? STAGE_ORDER.indexOf(a.stage) - STAGE_ORDER.indexOf(b.stage)
                        : 0,
                    )
                    .map((project) => (
                    <article
                      key={project.name}
                      className="rounded-xl border border-white/[0.12] bg-[#0f141d] shadow-sm shadow-black/20 overflow-hidden hover:border-white/20 transition-colors cursor-default"
                    >
                      <div className={`h-1.5 ${project.color}`} />
                      <div className="p-4 flex flex-col gap-3">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-[14px] text-slate-100 font-medium leading-snug">
                            {project.name}
                          </p>
                          <span
                            className={`shrink-0 mt-0.5 text-[10px] font-medium px-2 py-0.5 rounded-full border ${project.stageColor}`}
                          >
                            {project.stage}
                          </span>
                        </div>
                        <p className="text-[11.5px] text-slate-500 leading-relaxed border-l-2 border-white/10 pl-2.5">
                          {project.lastActivityDetail}
                        </p>
                        <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 border-t border-white/[0.06]">
                          <span>Created {project.created}</span>
                          <span className="text-slate-500">{project.lastActivity}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </>
          )}

          {step === 'upload' && (
            <>
              <div className="pointer-events-none select-none opacity-80" aria-hidden>
                <WorkspaceThreeColumnSkeleton />
              </div>

              <div
                className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-8 bg-[#0B0E14]/50 backdrop-blur-[3px]"
                role="presentation"
                onClick={() => {
                  setStep('projects');
                  setUploadedNames([]);
                }}
              >
                <div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="upload-modal-title"
                  className="relative z-50 w-full max-w-lg rounded-2xl border border-white/[0.14] bg-[#0f141d] shadow-2xl shadow-black/50 p-6 sm:p-8"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2
                    id="upload-modal-title"
                    className="text-lg font-semibold text-white text-center mb-1"
                  >
                    Upload documents
                  </h2>
                  <p className="text-sm text-slate-500 text-center mb-6">
                    Add at least one file to open the full workspace.
                  </p>
                  <label
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={onDrop}
                    className={`block rounded-xl border-2 border-dashed px-6 py-12 text-center cursor-pointer transition-colors ${
                      dragOver
                        ? 'border-[#00BBFF]/70 bg-[#00BBFF]/15'
                        : 'border-white/20 bg-[#131822] hover:border-white/30'
                    }`}
                  >
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      onChange={(e) => ingestFiles(e.target.files)}
                    />
                    <p className="text-slate-200 font-medium mb-2">Drop your files</p>
                    <p className="text-[13px] text-slate-500">
                      PDF, images, docs, audio, and more—or click to browse
                    </p>
                  </label>
                  {uploadedNames.length > 0 && (
                    <ul className="mt-4 rounded-xl border border-white/10 divide-y divide-white/10 bg-[#0a0e16] text-sm max-h-36 overflow-auto">
                      {uploadedNames.map((n) => (
                        <li key={n} className="px-4 py-2 text-slate-300 flex gap-2">
                          <FileText className="size-4 shrink-0 text-slate-500 mt-0.5" />
                          <span className="truncate">{n}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex flex-wrap gap-3 justify-end pt-6">
                    <button
                      type="button"
                      className="h-10 px-4 rounded-lg border border-white/15 text-slate-400 text-sm hover:bg-white/5"
                      onClick={() => {
                        setStep('projects');
                        setUploadedNames([]);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={uploadedNames.length === 0}
                      className="h-10 px-5 rounded-lg bg-[#2764ff] text-sm font-medium text-white hover:bg-[#356dff] disabled:opacity-40 disabled:pointer-events-none"
                      onClick={() => setStep('workspace')}
                    >
                      Open project
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 'workspace' && (
            <div className="flex flex-col flex-1 min-h-0 gap-5 max-w-[1400px] w-full xl:max-h-[calc(100vh-7rem)]">
              <button
                type="button"
                className="self-start text-xs text-slate-500 hover:text-slate-300 transition-colors"
                onClick={() => setStep('projects')}
              >
                ← Back to projects
              </button>
              <header className="shrink-0 flex items-start gap-3">
                <div className="mt-1 p-2 rounded-lg bg-white/[0.08] border border-white/10">
                  <Building2 className="size-5 text-slate-300" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-white tracking-tight">
                    Buyer acquisition of 14-property industrial portfolio
                  </h1>
                  <p className="text-[13px] text-slate-500 mt-1">
                    Uploaded {uploadedNames.length || 428} file
                    {(uploadedNames.length || 428) !== 1 ? 's' : ''}. Demo
                    layout for review.
                  </p>
                </div>
              </header>

              <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 xl:flex-1 xl:min-h-0 xl:h-full xl:overflow-hidden xl:items-stretch xl:auto-rows-fr">
                {/* Knowledge base */}
                <div className="xl:col-span-3 rounded-xl border border-white/[0.1] bg-[#121722] overflow-hidden flex flex-col min-h-[420px] xl:h-full xl:min-h-0">
                  <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-white/10">
                    <span className="text-sm font-medium text-slate-100">Knowledge base</span>
                    <button
                      type="button"
                      className="text-slate-400 hover:text-slate-200 p-1 rounded-md hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2764ff]/50"
                      aria-label="Collapse Knowledge base panel"
                    >
                      <PanelLeftClose className="size-4" aria-hidden />
                    </button>
                  </div>
                  <div className="flex-1 min-h-0 flex flex-col p-4 gap-3">
                    <label
                      className="rounded-xl border border-dashed border-white/25 bg-[#eef2f8]/[0.96] hover:bg-[#f4f7fc] px-4 py-6 text-center text-slate-700 cursor-pointer text-sm shadow-inner transition-colors block shrink-0"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={onDrop}
                    >
                      <input
                        type="file"
                        className="hidden"
                        multiple
                        onChange={(e) => ingestFiles(e.target.files)}
                      />
                      <span className="font-medium block text-[#1c2230] mb-1">Drop your files</span>
                      <span className="text-xs text-[#676f83] leading-relaxed">
                        pdf, images, docs, audio, and more
                      </span>
                    </label>

                    {/* Over-selection nudge */}
                    {selectedDocs.length > 2 && (
                      <div className="shrink-0 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-[11px] text-amber-300 leading-relaxed">
                        {selectedDocs.length} selected — Compare needs exactly 2. Unselect some to continue.
                      </div>
                    )}

                    <div className="flex flex-col flex-1 min-h-0 gap-2.5">
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer shrink-0">
                          <input
                            ref={selectAllRef}
                            type="checkbox"
                            className={kbCheckboxClassName}
                          />
                          Select all
                        </label>
                        <span className="text-[11px] text-slate-500">
                          <span className={selectedCount > 0 ? 'text-slate-200 font-medium' : ''}>{selectedCount}</span>/428 files
                        </span>
                      </div>
                      <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-slate-500 pointer-events-none" aria-hidden />
                        <input
                          type="search"
                          placeholder="Search documents…"
                          value={kbSearch}
                          onChange={(e) => setKbSearch(e.target.value)}
                          className="w-full rounded-lg border border-white/10 bg-white/[0.04] pl-8 pr-3 py-1.5 text-[12px] text-slate-200 placeholder:text-slate-600 outline-none focus:border-[#00BBFF]/40 focus:ring-1 focus:ring-[#00BBFF]/25"
                        />
                      </div>
                      <ul className="flex-1 min-h-0 overflow-y-auto overscroll-contain space-y-1.5 pr-0.5">
                        {allKbDocuments
                          .filter((f) =>
                            kbSearch.trim() === '' ||
                            f.label.toLowerCase().includes(kbSearch.toLowerCase()),
                          )
                          .map((f) => {
                            const isSelected = selectedDocs.includes(f.label);
                            return (
                              <li
                                key={f.label}
                                onClick={() => toggleDoc(f.label)}
                                className={`flex items-center justify-between rounded-lg px-3 py-2 border transition-colors cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#00BBFF]/10 border-[#00BBFF]/35'
                                    : 'bg-white/[0.04] border-white/[0.06] hover:border-white/[0.12]'
                                }`}
                              >
                                <span className="flex items-center gap-2 text-[12px] text-slate-200 min-w-0">
                                  <FileText className={`size-3.5 shrink-0 ${isSelected ? 'text-[#00BBFF]' : 'text-slate-500'}`} />
                                  <span className="truncate">{f.label}</span>
                                </span>
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => toggleDoc(f.label)}
                                  onClick={(e) => e.stopPropagation()}
                                  className={`${kbCheckboxClassName} ml-2 shrink-0`}
                                  aria-label={`Select ${f.label}`}
                                />
                              </li>
                            );
                          })}
                        {allKbDocuments.filter((f) =>
                          kbSearch.trim() === '' ||
                          f.label.toLowerCase().includes(kbSearch.toLowerCase()),
                        ).length === 0 && (
                          <li className="py-6 text-center text-[12px] text-slate-600">
                            No documents match &ldquo;{kbSearch}&rdquo;
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Middle column — permanent header, threaded content */}
                <div className="xl:col-span-5 rounded-xl border border-white/[0.1] bg-[#121722] overflow-hidden flex flex-col min-h-[420px] xl:h-full xl:min-h-0">
                  {/* Header — always the same */}
                  <div className="shrink-0 flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10">
                    <span className="text-sm font-medium text-slate-100">Transaction</span>
                    <div className="inline-flex shrink-0 rounded-lg border border-white/10 bg-black/25 p-0.5" role="group" aria-label="View mode">
                      <button
                        type="button"
                        aria-pressed={transactionPanelTab === 'chat'}
                        onClick={() => setTransactionPanelTab('chat')}
                        className={`px-3 py-1 rounded-md text-xs font-medium transition-colors border ${transactionPanelTab === 'chat' ? 'bg-[#00BBFF]/25 text-slate-100 border-[#00BBFF]/35' : 'text-slate-400 hover:text-slate-200 border-transparent'}`}
                      >
                        Chat
                      </button>
                      <button
                        type="button"
                        aria-pressed={transactionPanelTab === 'workflow'}
                        onClick={() => setTransactionPanelTab('workflow')}
                        className={`px-3 py-1 rounded-md text-xs font-medium transition-colors border ${transactionPanelTab === 'workflow' ? 'bg-[#00BBFF]/25 text-slate-100 border-[#00BBFF]/35' : 'text-slate-400 hover:text-slate-200 border-transparent'}`}
                      >
                        Workflow
                      </button>
                    </div>
                  </div>

                  {/* Content area */}
                  <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-5 text-[13px]">
                    {transactionPanelTab === 'workflow' ? (
                      <DiligenceWorkflowPanel />
                    ) : (
                      /* Chat thread — items stack in order, new ones auto-scrolled into view */
                      <div className="space-y-5">

                        {/* ── Thread item 1: Transaction overview (always present) ── */}
                        <div className="space-y-4">
                          <dl className="space-y-3 text-slate-400">
                            <div>
                              <dt className="text-slate-500 text-xs uppercase tracking-wide mb-0.5">Deal</dt>
                              <dd className="text-slate-200 leading-snug">Buyer acquisition of 14-property industrial portfolio (TX, GA, FL)</dd>
                            </div>
                            <div>
                              <dt className="text-slate-500 text-xs uppercase tracking-wide mb-0.5">Purchase Price</dt>
                              <dd className="text-slate-100 font-semibold">$182,500,000</dd>
                            </div>
                            <div>
                              <dt className="text-slate-500 text-xs uppercase tracking-wide mb-0.5">Deal Type</dt>
                              <dd className="text-slate-200">Asset purchase</dd>
                            </div>
                            <div>
                              <dt className="text-slate-500 text-xs uppercase tracking-wide mb-0.5">PSA Deadline</dt>
                              <dd className="text-slate-300">Due diligence expires in 19 days</dd>
                            </div>
                            <div>
                              <dt className="text-slate-500 text-xs uppercase tracking-wide mb-1">Documents Uploaded</dt>
                              <dd className="text-slate-300">
                                <span className="text-white font-medium">428</span> files ingested
                                <ul className="mt-2 list-disc list-inside space-y-0.5 text-slate-500 text-[12px]">
                                  <li>112 leases · 96 amendments</li>
                                  <li>14 title commitments · 14 surveys</li>
                                  <li>37 service/vendor contracts</li>
                                  <li>22 organisational docs</li>
                                  <li>11 environmental reports</li>
                                  <li>8 loan-related docs · 128 misc</li>
                                </ul>
                              </dd>
                            </div>
                          </dl>
                          <div className="space-y-3 pt-4 border-t border-white/10">
                            <p className="text-[13px] text-slate-300 leading-relaxed">
                              This looks like an industrial portfolio asset purchase. I suggest running the Industrial Portfolio Blueprint to structure your due diligence workflow.
                            </p>
                            <div className="flex flex-wrap items-center gap-2">
                              <button type="button" className="h-8 shrink-0 rounded-md bg-[#2764ff] px-3 text-xs font-medium text-white hover:bg-[#356dff]">Apply Blueprint</button>
                              <select aria-label="Choose a different blueprint" defaultValue="" className="h-8 min-w-[12.5rem] max-w-full cursor-pointer rounded-md border border-white/15 bg-[#0f141d] px-2.5 py-1 text-xs text-slate-300 outline-none hover:border-white/25">
                                <option value="" disabled>Choose a different one</option>
                                <option value="industrial-portfolio">Industrial Portfolio Blueprint</option>
                                <option value="sale-leaseback">Sale-leaseback diligence</option>
                                <option value="single-asset-psa">Single-asset PSA review</option>
                                <option value="loan-workout">Loan &amp; workout package</option>
                              </select>
                              <button type="button" className="text-xs text-slate-400 hover:text-slate-200">Skip</button>
                            </div>
                          </div>
                          <div className="pt-4 space-y-3 border-t border-white/10">
                            <p className="text-[11px] text-slate-500 uppercase tracking-wide font-medium">Suggested prompts</p>
                            <div className="flex flex-wrap gap-2">
                              {['Tell me what breaks underwriting.', 'What impairs ownership or financing?', 'Can seller legally sign?'].map((p) => (
                                <button key={p} type="button" className="rounded-full bg-violet-500/22 border border-violet-400/40 text-[11px] text-violet-200 px-3 py-1.5 hover:bg-violet-500/30">{p}</button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* ── Thread item 2: File selection + pre-flight (appears when files chosen) ── */}
                        {selectedDocs.length > 0 && (
                          <div className="border-t border-white/[0.08] pt-5 space-y-3">
                            <div className="rounded-xl border border-white/[0.1] bg-[#0e1219] p-4 space-y-3">
                              <div className="flex items-start gap-3">
                                <div className="size-7 rounded-lg bg-[#00BBFF]/15 border border-[#00BBFF]/25 grid place-items-center shrink-0">
                                  <FileText className="size-3.5 text-[#00BBFF]" aria-hidden />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-[13px] font-medium text-slate-200">
                                    {selectedDocs.length} file{selectedDocs.length !== 1 ? 's' : ''} selected
                                  </p>
                                  <ul className="mt-1 space-y-0.5">
                                    {selectedDocs.map((d) => (
                                      <li key={d} className="text-[11.5px] text-slate-500 truncate">{d}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              {comparePhase === 'idle' && (
                                <>
                                  <p className="text-[12.5px] text-slate-400">What would you like to do?</p>
                                  <div className="flex flex-wrap gap-2">
                                    <button
                                      type="button"
                                      disabled={selectedDocs.length !== 2}
                                      onClick={runCompare}
                                      title={selectedDocs.length !== 2 ? 'Select exactly 2 documents to compare' : undefined}
                                      className={`h-8 px-3 rounded-md text-xs font-medium border transition-colors ${selectedDocs.length === 2 ? 'bg-sky-500/20 border-sky-400/40 text-sky-200 hover:bg-sky-500/30' : 'bg-white/[0.04] border-white/10 text-slate-600 cursor-not-allowed'}`}
                                    >
                                      Compare{selectedDocs.length === 1 && <span className="ml-1 opacity-60">(need 2)</span>}
                                    </button>
                                    <button type="button" className="h-8 px-3 rounded-md text-xs font-medium border bg-white/[0.04] border-white/10 text-slate-400 hover:bg-white/[0.08] transition-colors">Risk analysis</button>
                                    <button type="button" className="h-8 px-3 rounded-md text-xs font-medium border bg-white/[0.04] border-white/10 text-slate-400 hover:bg-white/[0.08] transition-colors">Research</button>
                                  </div>
                                  {selectedDocs.length !== 2 && (
                                    <p className="text-[11px] text-slate-600">
                                      {selectedDocs.length === 1 ? 'Select one more document to enable Compare.' : 'Unselect files until exactly 2 are chosen for Compare.'}
                                    </p>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        )}

                        {/* ── Thread item 3: Compare workspace (appears after tool triggered) ── */}
                        {comparePhase !== 'idle' && (
                          <div className="border-t border-white/[0.08] pt-5 space-y-4">
                            {/* System prompt */}
                            <div className="rounded-xl border border-[#2764ff]/25 bg-[#2764ff]/[0.06] p-4">
                              <p className="text-[10px] text-[#2764ff]/60 uppercase tracking-widest font-semibold mb-2.5">System prompt</p>
                              <p className="text-[12px] text-slate-300 font-mono leading-relaxed">
                                Compare the following two legal documents and identify all material differences.
                                Focus on: (1) effective dates and deadlines, (2) governing law and jurisdiction,
                                (3) termination and notice provisions, (4) financial obligations.
                                For each difference, assess materiality and flag potential legal risk.
                              </p>
                              <div className="mt-3 pt-3 border-t border-white/[0.06] flex flex-wrap items-center gap-x-2 gap-y-1">
                                <FileText className="size-3 text-slate-600 shrink-0" aria-hidden />
                                <span className="text-[11px] text-slate-600 truncate max-w-[140px]">{selectedDocs[0]}</span>
                                <span className="text-slate-700 text-[10px] font-medium">vs</span>
                                <FileText className="size-3 text-slate-600 shrink-0" aria-hidden />
                                <span className="text-[11px] text-slate-600 truncate max-w-[140px]">{selectedDocs[1]}</span>
                              </div>
                            </div>

                            {/* Thinking — collapsible */}
                            <div className="rounded-xl border border-white/[0.08] bg-[#0e1219] overflow-hidden">
                              <button
                                type="button"
                                onClick={() => setThinkingExpanded((v) => !v)}
                                className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-white/[0.03] transition-colors"
                              >
                                <div className="flex items-center gap-2">
                                  {comparePhase === 'thinking' ? (
                                    <span className="size-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                                  ) : (
                                    <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
                                  )}
                                  <span className="text-[12px] text-slate-400">
                                    {comparePhase === 'thinking' ? 'Thinking…' : 'Thinking complete'}
                                  </span>
                                </div>
                                <ChevronDown className={`size-3.5 text-slate-600 transition-transform duration-200 ${thinkingExpanded ? '' : '-rotate-90'}`} aria-hidden />
                              </button>
                              {thinkingExpanded && (
                                <div className="px-4 pb-3 pt-2 space-y-1.5 border-t border-white/[0.06]">
                                  {[
                                    `Reading "${shortName(selectedDocs[0])}"…`,
                                    `Reading "${shortName(selectedDocs[1])}"…`,
                                    'Identifying structural differences across both documents…',
                                    'Comparing dates, jurisdictions, and termination clauses…',
                                    comparePhase === 'thinking' ? 'Flagging material clauses…' : 'Flagged 3 material differences.',
                                  ].map((step, i) => (
                                    <p key={i} className={`text-[11.5px] leading-relaxed ${comparePhase === 'thinking' && i === 4 ? 'text-slate-400 animate-pulse' : 'text-slate-600'}`}>
                                      {step}
                                    </p>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Output */}
                            {comparePhase === 'done' && (
                              <div className="space-y-3">
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-[13px] font-medium text-slate-200">3 material differences found</span>
                                    <span className="text-[10px] text-amber-400 bg-amber-500/15 border border-amber-500/25 px-2 py-0.5 rounded-full font-medium">Review needed</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => { if (artifacts[0]) setActiveArtifact(artifacts[0]); }}
                                    className="text-[11px] text-[#2764ff] hover:text-[#6b9aff] transition-colors shrink-0"
                                  >
                                    View diff →
                                  </button>
                                </div>
                                <ul className="space-y-2">
                                  {[
                                    { label: 'Effective date differs by 74 days', sev: 'high' },
                                    { label: 'Governing law: TX vs DE jurisdiction mismatch', sev: 'high' },
                                    { label: 'Notice period: 30 days vs 60 days', sev: 'medium' },
                                  ].map((diff, i) => (
                                    <li key={i} className="flex items-start gap-2.5 rounded-lg px-3 py-2.5 bg-white/[0.03] border border-white/[0.06]">
                                      <span className={`shrink-0 size-1.5 rounded-full mt-[5px] ${diff.sev === 'high' ? 'bg-amber-400' : 'bg-sky-400'}`} />
                                      <span className="text-[12.5px] text-slate-300">{diff.label}</span>
                                    </li>
                                  ))}
                                </ul>
                                <p className="text-[11px] text-slate-600 flex items-center gap-1.5">
                                  <Clock className="size-3 shrink-0" aria-hidden />
                                  Artifact saved to Toolbox · {artifacts[0]?.createdAt}
                                </p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Scroll anchor */}
                        <div ref={threadBottomRef} />
                      </div>
                    )}
                  </div>

                  {/* Copilot bar */}
                  <div className="shrink-0 border-t border-white/10 bg-[#0f141d] p-4">
                    <div className="rounded-xl bg-sky-500/14 border border-[rgba(0,187,255,0.25)] flex items-center gap-2 px-4 py-2.5">
                      <input
                        type="text"
                        placeholder="Ask Copilot…"
                        value={copilotInput}
                        onChange={(e) => setCopilotInput(e.target.value)}
                        className="flex-1 bg-transparent text-sm text-sky-50 placeholder:text-sky-900/55 outline-none min-w-0"
                      />
                      <span className="text-[11px] text-sky-200/85 shrink-0">{selectedDocs.length || 5} sources</span>
                      <button
                        type="button"
                        disabled={!copilotInput.trim()}
                        className={`p-2 rounded-lg shrink-0 border transition-colors ${copilotInput.trim() ? 'bg-[#00BBFF]/25 border-[#00BBFF]/35 text-slate-100 hover:bg-[#00BBFF]/38' : 'bg-white/[0.06] border-white/10 text-slate-500 cursor-not-allowed opacity-55'}`}
                        aria-label="Send"
                      >
                        <Send className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Column 3 — Tools panel (Toolbox + Artifacts) or Split-diff view */}
                <div className="xl:col-span-4 rounded-xl border border-white/[0.1] bg-[#121722] overflow-hidden flex flex-col min-h-[420px] xl:h-full xl:min-h-0">
                  {activeArtifact ? (
                    /* ── Split-diff view ── */
                    <>
                      <div className="shrink-0 flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10">
                        <div className="flex items-center gap-2 min-w-0">
                          <GitCompare className="size-4 text-sky-400 shrink-0" aria-hidden />
                          <p className="text-[13px] font-medium text-slate-100 truncate">
                            Compare: {shortName(activeArtifact.docs[0])} vs {shortName(activeArtifact.docs[1])}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveArtifact(null)}
                          className="text-slate-500 hover:text-slate-200 p-1 rounded-md hover:bg-white/5 shrink-0"
                          aria-label="Close diff view"
                        >
                          <X className="size-4" />
                        </button>
                      </div>
                      <div className="shrink-0 flex items-center gap-3 px-4 py-2 border-b border-white/[0.06] bg-[#0e1219]">
                        <span className="size-2 rounded-full bg-amber-400 shrink-0" />
                        <span className="text-[12px] text-amber-300 font-medium">3 material differences found</span>
                      </div>
                      <div className="shrink-0 grid grid-cols-2 border-b border-white/[0.06] bg-[#0a0e16]">
                        <div className="px-3 py-2 border-r border-white/[0.06]">
                          <p className="text-[10px] text-slate-600 uppercase tracking-wide mb-0.5">Doc A</p>
                          <p className="text-[11px] text-slate-400 truncate">{activeArtifact.docs[0]}</p>
                        </div>
                        <div className="px-3 py-2">
                          <p className="text-[10px] text-slate-600 uppercase tracking-wide mb-0.5">Doc B</p>
                          <p className="text-[11px] text-slate-400 truncate">{activeArtifact.docs[1]}</p>
                        </div>
                      </div>
                      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain divide-y divide-white/[0.05]">
                        {[
                          { tag: 'Material', tagColor: 'text-amber-400 bg-amber-500/15 border-amber-500/25', field: 'Effective Date', left: 'This Agreement is effective as of January 1, 2024.', right: 'This Agreement is effective as of March 15, 2024.', note: 'Effective date differs by 74 days — verify alignment with PSA closing timeline.' },
                          { tag: 'Material', tagColor: 'text-amber-400 bg-amber-500/15 border-amber-500/25', field: 'Governing Law', left: 'This Agreement shall be governed by and construed in accordance with the laws of the State of Texas.', right: 'This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware.', note: 'Jurisdiction mismatch — TX vs DE — may affect enforcement and dispute resolution.' },
                          { tag: 'Notable', tagColor: 'text-sky-400 bg-sky-500/15 border-sky-500/25', field: 'Termination Notice', left: 'Either party may terminate this Agreement upon thirty (30) days written notice.', right: 'Either party may terminate this Agreement upon sixty (60) days written notice.', note: 'Notice period doubles from 30 to 60 days — review impact on exit provisions.' },
                        ].map((diff, i) => (
                          <div key={i} className="text-[12px]">
                            <div className="px-3 py-2 bg-[#0e1219] flex items-center justify-between gap-2">
                              <span className="text-slate-500 font-medium">{diff.field}</span>
                              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border ${diff.tagColor}`}>{diff.tag}</span>
                            </div>
                            <div className="grid grid-cols-2 divide-x divide-white/[0.05]">
                              <div className="px-3 py-2.5 bg-red-950/20"><p className="text-slate-400 leading-relaxed">{diff.left}</p></div>
                              <div className="px-3 py-2.5 bg-emerald-950/20"><p className="text-slate-300 leading-relaxed">{diff.right}</p></div>
                            </div>
                            <div className="px-3 py-2 border-t border-white/[0.04] bg-[#0a0e16]">
                              <p className="text-[11px] text-slate-500 leading-relaxed italic">{diff.note}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    /* ── Tools panel: Toolbox + Artifacts stacked ── */
                    <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain flex flex-col">

                      {/* ── Toolbox section ── */}
                      <div className="shrink-0">
                        <button
                          type="button"
                          onClick={() => setToolboxOpen((v) => !v)}
                          className="w-full flex items-center justify-between px-4 py-3 border-b border-white/10 hover:bg-white/[0.02] transition-colors"
                        >
                          <span className="text-sm font-medium text-slate-100">Toolbox</span>
                          <ChevronDown className={`size-4 text-slate-500 transition-transform duration-200 ${toolboxOpen ? '' : '-rotate-90'}`} aria-hidden />
                        </button>
                        {toolboxOpen && (
                          <>
                            {selectedDocs.length === 0 && (
                              <p className="text-[11px] text-slate-600 text-center px-5 pt-3 pb-1">
                                Select documents from the Knowledge base to activate tools.
                              </p>
                            )}
                            <div className="p-4 grid grid-cols-2 gap-3">
                              {toolboxCards.map((tool) => {
                                const ToolIcon = tool.Icon;
                                const isCompare = tool.title === 'Compare';
                                const inactive = selectedDocs.length === 0 || (isCompare && selectedDocs.length !== 2);
                                const tooltip = selectedDocs.length === 0
                                  ? 'Select documents to use this tool'
                                  : isCompare && selectedDocs.length !== 2
                                    ? `Select exactly 2 documents to compare (${selectedDocs.length} selected)`
                                    : undefined;
                                return (
                                  <button
                                    key={tool.title}
                                    type="button"
                                    title={tooltip}
                                    onClick={isCompare && !inactive ? runCompare : undefined}
                                    className={`group w-full min-h-[100px] rounded-xl border px-3.5 py-3 text-left shadow-sm shadow-black/8 transition-[transform,box-shadow,border-color,opacity] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2764ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#121722] ${tool.surface} ${inactive ? 'opacity-35 cursor-not-allowed' : 'active:scale-[0.98]'}`}
                                  >
                                    <div className="flex items-start gap-2.5 mb-1">
                                      <ToolIcon className="size-[18px] shrink-0 text-[#374151] mt-px transition-colors group-hover:text-[#111827]" strokeWidth={2} aria-hidden />
                                      <span className="text-[13px] font-semibold text-[#111827] [text-wrap:balance] leading-snug">{tool.title}</span>
                                    </div>
                                    <p className="text-[11px] text-[#374151] leading-relaxed line-clamp-3">{tool.body}</p>
                                    <span className={`mt-2.5 inline-flex items-center gap-0.5 text-[11px] font-semibold ${tool.runClass}`}>
                                      Run
                                      <ChevronRight className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </>
                        )}
                      </div>

                      {/* ── Artifacts section ── */}
                      <div className="border-t border-white/10">
                        <button
                          type="button"
                          onClick={() => setArtifactsOpen((v) => !v)}
                          className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/[0.02] transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-100">Artifacts</span>
                            {artifacts.length > 0 && (
                              <span className="text-[10px] font-medium text-slate-500 bg-white/[0.07] px-1.5 py-0.5 rounded-full">{artifacts.length}</span>
                            )}
                          </div>
                          <ChevronDown className={`size-4 text-slate-500 transition-transform duration-200 ${artifactsOpen ? '' : '-rotate-90'}`} aria-hidden />
                        </button>
                        {artifactsOpen && (
                          <div className="px-4 pb-4">
                            {artifacts.length === 0 ? (
                              <p className="text-[11px] text-slate-600 py-3">No artifacts yet. Run a tool to generate one.</p>
                            ) : (
                              <ul className="space-y-1.5">
                                {artifacts.map((a) => (
                                  <li key={a.id}>
                                    <button
                                      type="button"
                                      onClick={() => setActiveArtifact(a)}
                                      className="w-full flex items-start gap-2.5 rounded-lg px-3 py-2.5 hover:bg-white/[0.05] transition-colors text-left group"
                                    >
                                      <GitCompare className="size-3.5 text-slate-500 shrink-0 mt-0.5" aria-hidden />
                                      <div className="flex-1 min-w-0">
                                        <p className="text-[12px] text-slate-300 truncate">
                                          Compare: {shortName(a.docs[0])} vs {shortName(a.docs[1])}
                                        </p>
                                        <p className="text-[10.5px] text-slate-600 mt-0.5 flex items-center gap-1">
                                          <Clock className="size-2.5 shrink-0" aria-hidden />
                                          {a.createdAt} · 3 differences
                                        </p>
                                      </div>
                                      <ChevronRight className="size-3.5 text-slate-700 shrink-0 mt-0.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {step !== 'workspace' ? (
        <button
          type="button"
          className="fixed bottom-8 right-8 size-14 rounded-full bg-orange-400 text-white shadow-lg shadow-orange-500/40 hover:bg-orange-300 grid place-items-center"
          aria-label="Chat support"
        >
          <MessageCircle className="size-8" strokeWidth={1.9} />
        </button>
      ) : null}
    </div>
  );
}
