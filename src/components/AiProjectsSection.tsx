import React, { useState } from 'react';
import {
  Activity,
  ArrowRight,
  Bot,
  CheckCircle2,
  GitBranch,
  MessageSquare,
  ShieldCheck,
  UserCheck,
  Workflow,
  X,
} from 'lucide-react';
import {
  LOCKSMITH_PROJECT,
  SALES_AGENT_PROJECT,
  type WorkflowNodeKind,
} from '../data/portfolioData';

interface AiProjectsSectionProps {
  onOpenLocksmithModal: () => void;
  onOpenSalesAgentModal: () => void;
}

const NODE_KIND_STYLES: Record<
  WorkflowNodeKind,
  { badgeText: string; dotColor: string; label: string }
> = {
  ai: {
    badgeText: 'text-[#EE6A1F]',
    dotColor: '#EE6A1F',
    label: 'AI processing',
  },
  decision: {
    badgeText: 'text-[#5B5752]',
    dotColor: '#5B5752',
    label: 'Decision',
  },
  human: {
    badgeText: 'text-[#1E1C1A]',
    dotColor: '#1E1C1A',
    label: 'Human approval',
  },
  action: {
    badgeText: 'text-[#3F5A45]',
    dotColor: '#3B7A4B',
    label: 'External action',
  },
  monitoring: {
    badgeText: 'text-[#6A5A43]',
    dotColor: '#8C6D3F',
    label: 'Monitoring & loop',
  },
};

/* Quiet decorative conversational activity bars (step-driven, NOT looping, NOT linked to audio player) */
const CONVERSATION_BAR_PRESETS: number[][] = [
  [35, 68, 52, 84, 46, 62, 30, 48, 24],
  [50, 88, 96, 70, 92, 64, 78, 54, 42],
  [40, 56, 74, 62, 50, 44, 38, 32, 28],
  [26, 38, 46, 34, 28, 52, 68, 44, 30],
];

export const AiProjectsSection: React.FC<AiProjectsSectionProps> = ({
  onOpenLocksmithModal,
  onOpenSalesAgentModal,
}) => {
  const [locksmithStep, setLocksmithStep] = useState(0);
  const [salesStep, setSalesStep] = useState(0);

  const activeLocksmithStage = LOCKSMITH_PROJECT.stages[locksmithStep];
  const activeSalesStage = SALES_AGENT_PROJECT.stages[salesStep];
  const activeBars = CONVERSATION_BAR_PRESETS[locksmithStep];

  return (
    <section aria-labelledby="ai-solutions-heading" className="w-full">
      {/* Section Header */}
      <div className="mb-4 px-0.5">
        <h2
          id="ai-solutions-heading"
          className="text-[22px] sm:text-[24px] font-semibold tracking-[-0.02em] text-[#1E1C1A]"
        >
          Projects I’ve built recently
        </h2>
      </div>

      {/* Two Simultaneously Visible Featured Project Cards (Mandatory Order: 01 Locksmith, 02 Sales Agent) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
        {/* ================= PROJECT 01: LOCKSMITH AI RECEPTIONIST ================= */}
        <article
          aria-label="Project 01: Locksmith AI Receptionist"
          className="bento-card p-5 sm:p-6 flex flex-col justify-between border-black/[0.09] bg-[#F7F5F1]"
        >
          <div>
            {/* Card Header */}
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 text-[12px] text-[#77736E]">
                  <span className="font-mono-tabular font-medium text-[#EE6A1F]">
                    {LOCKSMITH_PROJECT.number}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{LOCKSMITH_PROJECT.category}</span>
                </div>
                <h3 className="text-[20px] sm:text-[21px] font-semibold tracking-[-0.02em] text-[#1E1C1A] mt-1">
                  {LOCKSMITH_PROJECT.title}
                </h3>
              </div>
              <span className="text-[11.5px] text-[#77736E] px-2.5 py-1 rounded-[7px] bg-[#EAE7E1] whitespace-nowrap">
                Prototype workflow
              </span>
            </div>

            {/* Problem / Solution / Operational Value (Always Visible Without Clicking) */}
            <dl className="mt-4 space-y-2 text-[13.5px] leading-[1.5]">
              <div>
                <dt className="inline font-semibold text-[#1E1C1A]">Problem: </dt>
                <dd className="inline text-[#55524E]">
                  {LOCKSMITH_PROJECT.conciseProblem}
                </dd>
              </div>
              <div>
                <dt className="inline font-semibold text-[#1E1C1A]">Solution: </dt>
                <dd className="inline text-[#55524E]">
                  {LOCKSMITH_PROJECT.conciseSolution}
                </dd>
              </div>
              <div>
                <dt className="inline font-semibold text-[#EE6A1F]">
                  Operational value:{' '}
                </dt>
                <dd className="inline text-[#2A2624]">
                  {LOCKSMITH_PROJECT.conciseValue}
                </dd>
              </div>
            </dl>

            {/* Interactive Customer Intake Workflow Visualization */}
            <div className="mt-5 rounded-[12px] bg-[#EFECE7] border border-black/[0.07] p-3.5 sm:p-4">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 text-[12px] font-medium text-[#1E1C1A]">
                  <MessageSquare className="w-3.5 h-3.5 text-[#EE6A1F]" />
                  <span>Customer intake flow</span>
                  {/* Subtle non-looping conversational activity indicator tied to selected step */}
                  <span
                    aria-hidden="true"
                    className="inline-flex items-center gap-[2px] h-3.5 ml-1"
                  >
                    {activeBars.map((pct, i) => (
                      <span
                        key={i}
                        className="w-[2px] rounded-full transition-all duration-300"
                        style={{
                          height: `${Math.max(25, pct)}%`,
                          backgroundColor:
                            activeLocksmithStage.actor === 'ai'
                              ? '#EE6A1F'
                              : activeLocksmithStage.actor === 'human'
                              ? '#2A2624'
                              : '#9A9690',
                        }}
                      />
                    ))}
                  </span>
                </div>
                <span className="text-[11px] text-[#77736E]">
                  Simulated intake · Not live audio
                </span>
              </div>

              {/* 4 Progressive Clickable Workflow Nodes */}
              <div
                role="tablist"
                aria-label="Locksmith AI Receptionist workflow stages"
                className="grid grid-cols-2 sm:grid-cols-4 gap-1.5"
              >
                {LOCKSMITH_PROJECT.stages.map((stage, idx) => {
                  const isCurrent = idx === locksmithStep;
                  const isCompleted = idx < locksmithStep;
                  const isHumanNode = stage.actor === 'human';
                  return (
                    <button
                      key={stage.id}
                      role="tab"
                      type="button"
                      aria-selected={isCurrent}
                      onClick={() => setLocksmithStep(idx)}
                      className={`group relative rounded-[9px] px-2.5 py-2 text-left border transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#EE6A1F] ${
                        isCurrent
                          ? isHumanNode
                            ? 'bg-[#2A2624] text-[#FAF9F6] border-[#2A2624]'
                            : 'bg-[#FAF9F6] text-[#1E1C1A] border-[#EE6A1F] shadow-sm'
                          : isCompleted
                          ? 'bg-[#FAF9F6]/80 text-[#35322F] border-black/[0.11]'
                          : 'bg-[#F5F3EF] text-[#6A6660] border-black/[0.06] hover:border-black/[0.14]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span
                          className={`font-mono-tabular text-[10.5px] font-medium ${
                            isCurrent
                              ? isHumanNode
                                ? 'text-[#EE6A1F]'
                                : 'text-[#EE6A1F]'
                              : isCompleted
                              ? 'text-[#1E1C1A]'
                              : 'text-[#8E8983]'
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <span
                          className={`text-[10px] font-medium ${
                            isCurrent && isHumanNode
                              ? 'text-[#E5E2DC]'
                              : stage.actor === 'ai'
                              ? 'text-[#EE6A1F]'
                              : 'text-[#77736E]'
                          }`}
                        >
                          {stage.actor === 'ai'
                            ? 'AI'
                            : stage.actor === 'human'
                            ? 'Human'
                            : stage.actor === 'decision'
                            ? 'Rules'
                            : 'Input'}
                        </span>
                      </div>
                      <span className="block text-[11.5px] font-medium leading-[1.25]">
                        {stage.shortLabel}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Structured Service Information Output for Active Stage */}
              <div className="mt-3 rounded-[9px] bg-[#FAF9F6] border border-black/[0.06] p-3">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-[#1E1C1A]">
                    {activeLocksmithStage.actor === 'human' ? (
                      <UserCheck className="w-3.5 h-3.5 text-[#2A2624]" />
                    ) : activeLocksmithStage.actor === 'ai' ? (
                      <Bot className="w-3.5 h-3.5 text-[#EE6A1F]" />
                    ) : (
                      <GitBranch className="w-3.5 h-3.5 text-[#6F6B65]" />
                    )}
                    {activeLocksmithStage.label}
                  </span>
                  <span className="text-[11px] text-[#77736E]">
                    {activeLocksmithStage.actorLabel}
                  </span>
                </div>

                <p className="text-[12.5px] text-[#4A4743] leading-[1.45]">
                  {activeLocksmithStage.summary}
                </p>

                {/* Structured fields captured at this stage */}
                <div className="mt-2.5 pt-2 border-t border-black/[0.06] grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeLocksmithStage.extractedFields.map((field) => (
                    <div key={field.label} className="text-[11.5px] leading-[1.35]">
                      <span className="text-[#8E8983]">{field.label}: </span>
                      <span className="font-medium text-[#1E1C1A]">{field.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card Footer Action */}
          <div className="mt-4 pt-3.5 border-t border-black/[0.07] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-[12px] text-[#77736E]">
              <button
                type="button"
                onClick={() =>
                  setLocksmithStep((prev) =>
                    prev === LOCKSMITH_PROJECT.stages.length - 1 ? 0 : prev + 1
                  )
                }
                className="font-medium text-[#4A4743] hover:text-[#1E1C1A] underline underline-offset-4 decoration-black/20 hover:decoration-black/50 cursor-pointer"
              >
                Next stage ({locksmithStep + 1}/{LOCKSMITH_PROJECT.stages.length})
              </button>
            </div>
            <button
              type="button"
              onClick={onOpenLocksmithModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[9px] bg-[#2A2624] text-[#FAF9F6] text-[12.5px] font-medium hover:bg-[#1E1C1A] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EE6A1F]"
            >
              <span>Explore the workflow</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </article>

        {/* ================= PROJECT 02: AI SALES OPERATIONS AGENT ================= */}
        <article
          aria-label="Project 02: AI Sales Operations Agent"
          className="bento-card p-5 sm:p-6 flex flex-col justify-between border-black/[0.09] bg-[#F7F5F1]"
        >
          <div>
            {/* Card Header */}
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 text-[12px] text-[#77736E]">
                  <span className="font-mono-tabular font-medium text-[#EE6A1F]">
                    {SALES_AGENT_PROJECT.number}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{SALES_AGENT_PROJECT.category}</span>
                </div>
                <h3 className="text-[20px] sm:text-[21px] font-semibold tracking-[-0.02em] text-[#1E1C1A] mt-1">
                  {SALES_AGENT_PROJECT.title}
                </h3>
              </div>
              <span className="text-[11.5px] text-[#77736E] px-2.5 py-1 rounded-[7px] bg-[#EAE7E1] whitespace-nowrap">
                Core system built
              </span>
            </div>

            {/* Problem / Solution / Operational Value */}
            <dl className="mt-4 space-y-2 text-[13.5px] leading-[1.5]">
              <div>
                <dt className="inline font-semibold text-[#1E1C1A]">Problem: </dt>
                <dd className="inline text-[#55524E]">
                  {SALES_AGENT_PROJECT.conciseProblem}
                </dd>
              </div>
              <div>
                <dt className="inline font-semibold text-[#1E1C1A]">Solution: </dt>
                <dd className="inline text-[#55524E]">
                  {SALES_AGENT_PROJECT.conciseSolution}
                </dd>
              </div>
              <div>
                <dt className="inline font-semibold text-[#EE6A1F]">
                  Operational value:{' '}
                </dt>
                <dd className="inline text-[#2A2624]">
                  {SALES_AGENT_PROJECT.conciseValue}
                </dd>
              </div>
            </dl>

            {/* Interactive 7-Stage Agentic Orchestration Diagram */}
            <div className="mt-5 rounded-[12px] bg-[#EFECE7] border border-black/[0.07] p-3.5 sm:p-4">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2 text-[12px] font-medium text-[#1E1C1A]">
                  <Workflow className="w-3.5 h-3.5 text-[#EE6A1F]" />
                  <span>7-stage orchestrated pipeline</span>
                </div>
                {/* Compact Legend Distinguishing Stage Types */}
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10.5px] text-[#6B6762]">
                  {(['ai', 'decision', 'human', 'action', 'monitoring'] as WorkflowNodeKind[]).map(
                    (kind) => (
                      <span key={kind} className="inline-flex items-center gap-1">
                        <span
                          aria-hidden="true"
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: NODE_KIND_STYLES[kind].dotColor }}
                        />
                        <span>{NODE_KIND_STYLES[kind].label}</span>
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Connected 7-Node Interactive Grid (Fits Desktop & Mobile Without Horizontal Scroll) */}
              <div
                role="tablist"
                aria-label="AI Sales Operations Agent stages"
                className="grid grid-cols-2 sm:grid-cols-4 gap-1.5"
              >
                {SALES_AGENT_PROJECT.stages.map((stage, idx) => {
                  const isCurrent = idx === salesStep;
                  const isReached = idx <= salesStep;
                  const style = NODE_KIND_STYLES[stage.kind];
                  const isHumanGate = stage.kind === 'human';

                  return (
                    <button
                      key={stage.id}
                      role="tab"
                      type="button"
                      aria-selected={isCurrent}
                      onClick={() => setSalesStep(idx)}
                      className={`relative rounded-[8px] px-2 py-1.5 text-left border transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#EE6A1F] ${
                        idx === 6 ? 'col-span-2 sm:col-span-2' : ''
                      } ${
                        isCurrent
                          ? isHumanGate
                            ? 'bg-[#2A2624] text-[#FAF9F6] border-[#2A2624]'
                            : 'bg-[#FAF9F6] text-[#1E1C1A] border-[#EE6A1F] shadow-sm'
                          : isReached
                          ? 'bg-[#FAF9F6]/80 text-[#35322F] border-black/[0.11]'
                          : 'bg-[#F5F3EF] text-[#6A6660] border-black/[0.06] hover:border-black/[0.14]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="inline-flex items-center gap-1 min-w-0">
                          <span
                            aria-hidden="true"
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{
                              backgroundColor:
                                isCurrent && isHumanGate ? '#EE6A1F' : style.dotColor,
                            }}
                          />
                          <span className="font-mono-tabular text-[10px] opacity-75">
                            0{idx + 1}
                          </span>
                        </span>
                        {idx < SALES_AGENT_PROJECT.stages.length - 1 && (
                          <ArrowRight
                            aria-hidden="true"
                            className={`w-2.5 h-2.5 shrink-0 ${
                              isCurrent
                                ? 'text-[#EE6A1F]'
                                : isReached
                                ? 'text-[#5B5752]'
                                : 'text-[#C2BEB7]'
                            }`}
                          />
                        )}
                      </div>
                      <span className="block text-[11px] font-medium leading-[1.25] mt-0.5 truncate">
                        {stage.shortLabel}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Stage Inspection Panel */}
              <div className="mt-3 rounded-[9px] bg-[#FAF9F6] border border-black/[0.06] p-3">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-[#1E1C1A]">
                    {activeSalesStage.kind === 'human' ? (
                      <ShieldCheck className="w-3.5 h-3.5 text-[#1E1C1A]" />
                    ) : activeSalesStage.kind === 'monitoring' ? (
                      <Activity className="w-3.5 h-3.5 text-[#8C6D3F]" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#EE6A1F]" />
                    )}
                    {activeSalesStage.label}
                  </span>
                  <span
                    className={`text-[11px] font-medium ${
                      NODE_KIND_STYLES[activeSalesStage.kind].badgeText
                    }`}
                  >
                    {activeSalesStage.kindLabel}
                  </span>
                </div>
                <p className="text-[12.5px] text-[#4A4743] leading-[1.45]">
                  {activeSalesStage.purpose}
                </p>
                <p className="mt-2 pt-2 border-t border-black/[0.06] text-[11.5px] text-[#6B6762] leading-[1.38]">
                  <span className="font-medium text-[#1E1C1A]">Control: </span>
                  {activeSalesStage.safeguard}
                </p>
              </div>
            </div>
          </div>

          {/* Card Footer Action */}
          <div className="mt-4 pt-3.5 border-t border-black/[0.07] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-[12px] text-[#77736E]">
              <button
                type="button"
                onClick={() =>
                  setSalesStep((prev) =>
                    prev === SALES_AGENT_PROJECT.stages.length - 1 ? 0 : prev + 1
                  )
                }
                className="font-medium text-[#4A4743] hover:text-[#1E1C1A] underline underline-offset-4 decoration-black/20 hover:decoration-black/50 cursor-pointer"
              >
                Next stage ({salesStep + 1}/{SALES_AGENT_PROJECT.stages.length})
              </button>
            </div>
            <button
              type="button"
              onClick={onOpenSalesAgentModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[9px] bg-[#2A2624] text-[#FAF9F6] text-[12.5px] font-medium hover:bg-[#1E1C1A] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EE6A1F]"
            >
              <span>Explore the system</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </article>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* Expanded Modal 01: Locksmith AI Receptionist                               */
/* -------------------------------------------------------------------------- */
export const LocksmithDetailModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [stepIdx, setStepIdx] = useState(0);
  const current = LOCKSMITH_PROJECT.stages[stepIdx];

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[12px] font-medium text-[#EE6A1F]">
            Project 01 · {LOCKSMITH_PROJECT.category}
          </p>
          <h2 className="text-[21px] font-semibold text-[#1E1C1A] tracking-[-0.02em] mt-1">
            {LOCKSMITH_PROJECT.title}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Locksmith AI Receptionist details"
          className="w-8 h-8 rounded-full bg-[#ECE9E3] text-[#4A4743] hover:text-[#1E1C1A] flex items-center justify-center cursor-pointer shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Honest Simulation Disclaimer */}
      <div className="mt-4 rounded-[10px] bg-[#F2EFEA] border border-black/[0.07] px-3.5 py-2.5 text-[12.5px] text-[#4A4743] leading-[1.5]">
        <span className="font-semibold text-[#1E1C1A]">Prototype simulation: </span>
        {LOCKSMITH_PROJECT.simulationDisclaimer}
      </div>

      {/* Full Problem / Solution / Value */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-[13px] leading-[1.55]">
        <div className="rounded-[10px] bg-[#F5F3EF] border border-black/[0.06] p-3">
          <h3 className="text-[11.5px] font-semibold text-[#1E1C1A] mb-1">Problem</h3>
          <p className="text-[#4F4C48]">{LOCKSMITH_PROJECT.fullProblem}</p>
        </div>
        <div className="rounded-[10px] bg-[#F5F3EF] border border-black/[0.06] p-3">
          <h3 className="text-[11.5px] font-semibold text-[#1E1C1A] mb-1">Solution</h3>
          <p className="text-[#4F4C48]">{LOCKSMITH_PROJECT.fullSolution}</p>
        </div>
        <div className="rounded-[10px] bg-[#F5F3EF] border border-black/[0.06] p-3">
          <h3 className="text-[11.5px] font-semibold text-[#EE6A1F] mb-1">
            Operational value
          </h3>
          <p className="text-[#2A2624]">{LOCKSMITH_PROJECT.fullValue}</p>
        </div>
      </div>

      {/* Interactive Simulated Walkthrough */}
      <div className="mt-5 pt-4 border-t border-black/[0.08]">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <h3 className="text-[13px] font-semibold text-[#1E1C1A]">
            Illustrative intake walkthrough
          </h3>
          <span className="text-[11.5px] text-[#77736E]">
            Select each step to inspect conversation &amp; structured extraction
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-3">
          {LOCKSMITH_PROJECT.stages.map((st, idx) => (
            <button
              key={st.id}
              type="button"
              onClick={() => setStepIdx(idx)}
              className={`px-2.5 py-2 rounded-[8px] text-left text-[12px] font-medium border transition-colors cursor-pointer ${
                idx === stepIdx
                  ? 'bg-[#2A2624] text-[#FAF9F6] border-[#2A2624]'
                  : 'bg-[#F5F3EF] text-[#55524E] border-black/[0.07] hover:border-black/[0.18]'
              }`}
            >
              <span className="font-mono-tabular text-[10.5px] text-[#EE6A1F] block">
                Step 0{idx + 1}
              </span>
              {st.shortLabel}
            </button>
          ))}
        </div>

        <div className="rounded-[11px] bg-[#F5F3EF] border border-black/[0.07] p-4 space-y-3">
          <div className="flex items-center justify-between gap-2 text-[12px]">
            <span className="font-semibold text-[#1E1C1A]">
              {current.sampleTurn.speaker}
            </span>
            <span className="text-[#77736E]">{current.actorLabel}</span>
          </div>
          <p className="text-[13.5px] text-[#2A2624] leading-[1.55]">
            {current.sampleTurn.message}
          </p>
          <div className="pt-2.5 border-t border-black/[0.07] grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {current.extractedFields.map((field) => (
              <div key={field.label} className="text-[12px]">
                <span className="text-[#77736E]">{field.label}: </span>
                <span className="font-medium text-[#1E1C1A]">{field.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Supported Capabilities & Scope Note */}
      <div className="mt-5 pt-4 border-t border-black/[0.08]">
        <h3 className="text-[12.5px] font-semibold text-[#1E1C1A] mb-2">
          Capabilities demonstrated
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[12.5px] text-[#2A2624]">
          {LOCKSMITH_PROJECT.capabilities.map((cap) => (
            <div key={cap} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EE6A1F] shrink-0" />
              <span>{cap}</span>
            </div>
          ))}
        </div>
        <p className="mt-3.5 text-[12px] text-[#6B6762] leading-[1.5]">
          <span className="font-medium text-[#1E1C1A]">Scope note: </span>
          {LOCKSMITH_PROJECT.prototypeScopeNote}
        </p>
      </div>
    </>
  );
};

/* -------------------------------------------------------------------------- */
/* Expanded Modal 02: AI Sales Operations Agent                               */
/* -------------------------------------------------------------------------- */
export const SalesAgentDetailModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [stageIdx, setStageIdx] = useState(0);
  const current = SALES_AGENT_PROJECT.stages[stageIdx];
  const style = NODE_KIND_STYLES[current.kind];

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[12px] font-medium text-[#EE6A1F]">
            Project 02 · {SALES_AGENT_PROJECT.category}
          </p>
          <h2 className="text-[21px] font-semibold text-[#1E1C1A] tracking-[-0.02em] mt-1">
            {SALES_AGENT_PROJECT.title}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close AI Sales Operations Agent details"
          className="w-8 h-8 rounded-full bg-[#ECE9E3] text-[#4A4743] hover:text-[#1E1C1A] flex items-center justify-center cursor-pointer shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Sanitized Dataset Disclaimer */}
      <div className="mt-4 rounded-[10px] bg-[#F2EFEA] border border-black/[0.07] px-3.5 py-2.5 text-[12.5px] text-[#4A4743] leading-[1.5]">
        {SALES_AGENT_PROJECT.sanitizedNote}
      </div>

      {/* Problem / Solution / Value */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-[13px] leading-[1.55]">
        <div className="rounded-[10px] bg-[#F5F3EF] border border-black/[0.06] p-3">
          <h3 className="text-[11.5px] font-semibold text-[#1E1C1A] mb-1">Problem</h3>
          <p className="text-[#4F4C48]">{SALES_AGENT_PROJECT.fullProblem}</p>
        </div>
        <div className="rounded-[10px] bg-[#F5F3EF] border border-black/[0.06] p-3">
          <h3 className="text-[11.5px] font-semibold text-[#1E1C1A] mb-1">Solution</h3>
          <p className="text-[#4F4C48]">{SALES_AGENT_PROJECT.fullSolution}</p>
        </div>
        <div className="rounded-[10px] bg-[#F5F3EF] border border-black/[0.06] p-3">
          <h3 className="text-[11.5px] font-semibold text-[#EE6A1F] mb-1">
            Operational value
          </h3>
          <p className="text-[#2A2624]">{SALES_AGENT_PROJECT.fullValue}</p>
        </div>
      </div>

      {/* Interactive 7-Stage Inspector */}
      <div className="mt-5 pt-4 border-t border-black/[0.08]">
        <h3 className="text-[13px] font-semibold text-[#1E1C1A] mb-2.5">
          Inspect each stage of the orchestrated system
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-3">
          {SALES_AGENT_PROJECT.stages.map((st, idx) => (
            <button
              key={st.id}
              type="button"
              onClick={() => setStageIdx(idx)}
              className={`px-2.5 py-2 rounded-[8px] text-left text-[11.5px] font-medium border transition-colors cursor-pointer ${
                idx === stageIdx
                  ? 'bg-[#2A2624] text-[#FAF9F6] border-[#2A2624]'
                  : 'bg-[#F5F3EF] text-[#55524E] border-black/[0.07] hover:border-black/[0.18]'
              }`}
            >
              <span className="font-mono-tabular text-[10px] text-[#EE6A1F] block">
                0{idx + 1} · {st.kindLabel}
              </span>
              <span className="block truncate">{st.shortLabel}</span>
            </button>
          ))}
        </div>

        <div className="rounded-[11px] bg-[#F5F3EF] border border-black/[0.07] p-4 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[14px] font-semibold text-[#1E1C1A]">
              0{stageIdx + 1}. {current.label}
            </span>
            <span className={`text-[11.5px] font-medium ${style.badgeText}`}>
              {current.kindLabel}
            </span>
          </div>
          <p className="text-[13px] text-[#35322F] leading-[1.55]">{current.purpose}</p>
          <div className="pt-2 border-t border-black/[0.07] space-y-1.5 text-[12px]">
            <p className="text-[#4A4743]">
              <span className="font-semibold text-[#1E1C1A]">Illustrative record: </span>
              {current.sanitizedExample}
            </p>
            <p className="text-[#4A4743]">
              <span className="font-semibold text-[#1E1C1A]">Operational safeguard: </span>
              {current.safeguard}
            </p>
          </div>
        </div>
      </div>

      {/* Capabilities & Implementation Status */}
      <div className="mt-5 pt-4 border-t border-black/[0.08] space-y-4">
        <div>
          <h3 className="text-[12.5px] font-semibold text-[#1E1C1A] mb-2">
            Operational capabilities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-[12px] text-[#2A2624]">
            {SALES_AGENT_PROJECT.capabilities.map((cap) => (
              <div key={cap} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EE6A1F] shrink-0" />
                <span>{cap}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-black/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h3 className="text-[12px] font-semibold text-[#1E1C1A] mb-1.5">
              Implemented &amp; tested
            </h3>
            <ul className="space-y-1 text-[12.5px] list-disc pl-4 text-[#35322F]">
              {SALES_AGENT_PROJECT.implementedAndTested.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[12px] font-semibold text-[#77736E] mb-1.5">
              Under active development
            </h3>
            <ul className="space-y-1 text-[12.5px] list-disc pl-4 text-[#6B6762]">
              {SALES_AGENT_PROJECT.inDevelopment.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
