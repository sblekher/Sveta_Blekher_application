import React, { useRef, useState } from 'react';
import {
  ArrowRight,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import {
  ACHIEVEMENT_SLIDES,
  EXPERIENCE_ITEMS,
} from '../data/cvData';

interface CardLabelProps {
  icon: React.ReactNode;
  label: string;
}

const CardChip: React.FC<CardLabelProps> = ({ icon, label }) => (
  <div className="inline-flex items-center gap-1.5 px-2.5 py-[5px] rounded-[8px] bg-[#E9E6E1] text-[#4A4743] text-[12px] font-medium leading-none select-none w-fit">
    <span className="text-[#6F6B65] flex items-center">{icon}</span>
    <span className="whitespace-nowrap">{label}</span>
  </div>
);

/* -------------------------------------------------------------------------- */
/* Experience Card — Web Coconuts & Wix immediately visible, no clipping      */
/* -------------------------------------------------------------------------- */
interface ExperienceCardProps {
  onSelectRole: (roleId: string) => void;
  onOpenMarketplaceSpotlight: () => void;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  onSelectRole,
  onOpenMarketplaceSpotlight,
}) => {
  const webCoconuts = EXPERIENCE_ITEMS[0];
  const wix = EXPERIENCE_ITEMS[1];
  const earlierRoles = EXPERIENCE_ITEMS.slice(2);

  return (
    <section
      aria-label="Professional experience"
      className="bento-card w-full h-full p-5 flex flex-col justify-between"
    >
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <CardChip icon={<Briefcase className="w-3.5 h-3.5" />} label="Experience" />
          <span className="text-[12px] text-[#77736E]">10+ yrs · Click any role</span>
        </div>

        <div className="relative pl-5 space-y-4">
          {/* Continuous vertical timeline line */}
          <div
            aria-hidden="true"
            className="absolute left-[4px] top-[8px] bottom-[8px] w-[1.5px] bg-[#2A2624]/70"
          />

          {/* Role 1: Web Coconuts — AI-powered operational solutions & end-to-end ownership */}
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[20px] top-[6px] w-[9px] h-[9px] rounded-full bg-[#EE6A1F] ring-[3px] ring-[#F5F3EF]"
            />
            <button
              type="button"
              onClick={() => onSelectRole(webCoconuts.id)}
              className="group block w-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#EE6A1F] rounded"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
                <span className="text-[14.5px] font-semibold text-[#1E1C1A] group-hover:text-[#EE6A1F] transition-colors">
                  {webCoconuts.company} · Founder
                </span>
                <span className="font-mono-tabular text-[11.5px] text-[#77736E] shrink-0">
                  {webCoconuts.shortPeriod}
                </span>
              </div>
              <p className="text-[12.5px] text-[#55524E] leading-[1.48] mt-1">
                Independently design, build and test AI-powered operational tools,
                agent-based workflows, conversational AI solutions and process automations.
              </p>
            </button>
          </div>

          {/* Role 2: Wix — Product Localization, Wix Studio, Wix Marketplace, Partners Dashboard */}
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[20px] top-[6px] w-[9px] h-[9px] rounded-full bg-[#1E1C1A] ring-[3px] ring-[#F5F3EF]"
            />
            <button
              type="button"
              onClick={() => onSelectRole(wix.id)}
              className="group block w-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#EE6A1F] rounded"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
                <span className="text-[14.5px] font-semibold text-[#1E1C1A] group-hover:text-[#EE6A1F] transition-colors">
                  {wix.company} · Product Localization &amp; Ops Mgr
                </span>
                <span className="font-mono-tabular text-[11.5px] text-[#77736E] shrink-0">
                  Feb 2022 – Aug 2025
                </span>
              </div>
              <p className="text-[12.5px] text-[#55524E] leading-[1.48] mt-1">
                Led global localization and cross-functional operations across Wix Studio,
                Wix Marketplace and Partners Dashboard in 36+ languages.
              </p>
            </button>

            <button
              type="button"
              onClick={onOpenMarketplaceSpotlight}
              className="mt-1.5 inline-flex items-center gap-1 text-[12px] font-medium text-[#EE6A1F] hover:text-[#C85413] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#EE6A1F] rounded"
            >
              <span>Wix Marketplace spotlight</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Earlier Verified Career Progression */}
          <div className="pt-3 border-t border-black/[0.07] space-y-2">
            {earlierRoles.map((role) => (
              <div key={role.id} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[19px] top-[7px] w-[7px] h-[7px] rounded-full bg-[#9A9690] ring-[2px] ring-[#F5F3EF]"
                />
                <button
                  type="button"
                  onClick={() => onSelectRole(role.id)}
                  className="group flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5 w-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#EE6A1F] rounded"
                >
                  <span className="text-[12.5px] font-medium text-[#3F3C39] group-hover:text-[#EE6A1F] transition-colors">
                    {role.company} · {role.role}
                  </span>
                  <span className="font-mono-tabular text-[11px] text-[#8E8983] shrink-0">
                    {role.shortPeriod}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* Proven Impact Card — Manual Navigation Only (No auto-rotation / timer)     */
/* -------------------------------------------------------------------------- */
export const ImpactDeckCard: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [transitionKey, setTransitionKey] = useState(0);
  const touchStartXRef = useRef<number | null>(null);

  const totalSlides = ACHIEVEMENT_SLIDES.length;
  const activeSlide = ACHIEVEMENT_SLIDES[activeIdx];

  const goToSlide = (nextIdx: number) => {
    const normalized = (nextIdx + totalSlides) % totalSlides;
    if (normalized === activeIdx) return;
    setActiveIdx(normalized);
    setTransitionKey((k) => k + 1);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartXRef.current;
    const delta = endX - touchStartXRef.current;
    touchStartXRef.current = null;
    if (Math.abs(delta) >= 42) {
      goToSlide(delta < 0 ? activeIdx + 1 : activeIdx - 1);
    }
  };

  return (
    <section
      aria-label="Proven impact and selected career achievements"
      className="bento-card w-full h-full p-5 flex flex-col justify-between"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') {
          goToSlide(activeIdx + 1);
        } else if (e.key === 'ArrowLeft') {
          goToSlide(activeIdx - 1);
        }
      }}
    >
      {/* Top Bar: Chip + Readable Slide Position Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <CardChip icon={<TrendingUp className="w-3.5 h-3.5" />} label="Proven impact" />

        <div className="flex items-center gap-3">
          <span className="font-mono-tabular text-[12px] text-[#6B6762]">
            {activeIdx + 1} of {totalSlides}
          </span>
          <div
            role="tablist"
            aria-label="Select career achievement"
            className="flex items-center gap-1"
          >
            {ACHIEVEMENT_SLIDES.map((slide, idx) => {
              const isCurrent = idx === activeIdx;
              return (
                <button
                  key={slide.id}
                  role="tab"
                  type="button"
                  aria-selected={isCurrent}
                  aria-label={`Achievement ${idx + 1}: ${slide.title}`}
                  onClick={() => goToSlide(idx)}
                  className={`font-mono-tabular min-w-[28px] h-[28px] px-1.5 text-[11.5px] rounded-[7px] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#EE6A1F] ${
                    isCurrent
                      ? 'bg-[#2A2624] text-[#FAF9F6]'
                      : 'text-[#77736E] hover:bg-[#E9E6E1] hover:text-[#1E1C1A]'
                  }`}
                >
                  0{idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Split: Scale Metric Block + Narrative Contribution & Outcome */}
      <div
        key={transitionKey}
        className="impact-slide-enter flex flex-col sm:flex-row items-stretch gap-4 sm:gap-5 my-5"
      >
        <div className="sm:w-[172px] shrink-0 rounded-[12px] bg-[#ECE9E2] border border-black/[0.06] p-4 flex flex-col justify-between gap-2">
          <span className="text-[12px] text-[#5B5752] leading-[1.35]">
            {activeSlide.scaleLabel}
          </span>
          <div className="font-mono-tabular text-[38px] sm:text-[40px] font-medium tracking-[-0.04em] leading-none text-[#1E1C1A] my-1">
            {activeSlide.metric}
          </div>
          <span className="text-[11.5px] font-medium text-[#EE6A1F] leading-tight">
            {activeSlide.organization}
          </span>
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <h3 className="text-[18px] sm:text-[19px] font-semibold text-[#1E1C1A] leading-[1.28] tracking-[-0.015em]">
            {activeSlide.title}
          </h3>
          <p className="text-[13.5px] text-[#55524E] leading-[1.55] mt-2">
            {activeSlide.contribution}
          </p>
          <p className="text-[13.5px] text-[#1E1C1A] leading-[1.5] mt-2.5">
            <span className="font-semibold text-[#EE6A1F]">Outcome: </span>
            {activeSlide.outcome}
          </p>
        </div>
      </div>

      {/* Bottom Manual Navigation Bar (Prominent Previous & Next Arrows Only) */}
      <div className="pt-3.5 border-t border-black/[0.07] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goToSlide(activeIdx - 1)}
            aria-label="Previous achievement"
            className="inline-flex items-center gap-1 h-[38px] px-3 rounded-[9px] bg-[#EAE7E1] text-[#1E1C1A] text-[12.5px] font-medium hover:bg-[#DFDCD4] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#EE6A1F]"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
          <button
            type="button"
            onClick={() => goToSlide(activeIdx + 1)}
            aria-label="Next achievement"
            className="inline-flex items-center gap-1 h-[38px] px-3.5 rounded-[9px] bg-[#2A2624] text-[#FAF9F6] text-[12.5px] font-medium hover:bg-[#1E1C1A] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EE6A1F]"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <span className="text-[12px] text-[#77736E]">
          Selected career achievements
        </span>
      </div>
    </section>
  );
};
