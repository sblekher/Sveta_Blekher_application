import React from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  Film,
  Globe,
} from 'lucide-react';
import {
  INDEPENDENT_DOCUMENTARY_PROJECT,
  SCALING_GLOBAL_OPERATIONS,
} from '../data/portfolioData';

interface ScalingGlobalOpsCardProps {
  onExploreExperience: () => void;
  onOpenMarketplaceSpotlight: () => void;
}

export const ScalingGlobalOpsCard: React.FC<ScalingGlobalOpsCardProps> = ({
  onExploreExperience,
  onOpenMarketplaceSpotlight,
}) => {
  return (
    <section
      aria-labelledby="scaling-global-ops-heading"
      className="bento-card p-5 sm:p-6"
    >
      {/* Top Row: Title, Subtitle & Explore Experience Action */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="max-w-[740px] min-w-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-[5px] rounded-[8px] bg-[#E9E6E1] text-[#4A4743] text-[12px] font-medium leading-none mb-2.5">
            <Globe className="w-3.5 h-3.5 text-[#6F6B65]" />
            <span>Global platform expertise</span>
          </div>
          <h2
            id="scaling-global-ops-heading"
            className="text-[21px] sm:text-[23px] font-semibold tracking-[-0.02em] text-[#1E1C1A]"
          >
            {SCALING_GLOBAL_OPERATIONS.title}
          </h2>
          <p className="text-[13.5px] text-[#77736E] mt-0.5">
            {SCALING_GLOBAL_OPERATIONS.subtitle}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 w-full sm:w-auto lg:shrink-0">
          <button
            type="button"
            onClick={onOpenMarketplaceSpotlight}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 sm:py-2 rounded-[9px] bg-[#EAE7E1] text-[#1E1C1A] text-[12.5px] font-medium hover:bg-[#E1DDD5] transition-colors cursor-pointer whitespace-nowrap"
          >
            <span>Wix Marketplace context</span>
          </button>
          <button
            type="button"
            onClick={onExploreExperience}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 sm:py-2 rounded-[9px] bg-[#2A2624] text-[#FAF9F6] text-[12.5px] font-medium hover:bg-[#1E1C1A] transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EE6A1F]"
          >
            <span>Explore my experience</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </button>
        </div>
      </div>

      {/* Balanced Two-Column Narrative Row on Desktop, Cleanly Stacked on Mobile */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch">
        <div className="lg:col-span-6 flex items-center">
          <p className="text-[14.5px] leading-[1.64] text-[#3F3C39]">
            {SCALING_GLOBAL_OPERATIONS.mainCopy}
          </p>
        </div>

        <div className="lg:col-span-6 rounded-[12px] bg-[#EFECE7] border border-black/[0.06] px-4 py-3.5 flex items-center">
          <p className="text-[13.5px] leading-[1.58] text-[#4F4C48]">
            {SCALING_GLOBAL_OPERATIONS.marketplaceNote}
          </p>
        </div>
      </div>

      {/* Three Complementary Expertise Columns */}
      <div className="mt-5 pt-5 border-t border-black/[0.07] grid grid-cols-1 md:grid-cols-3 gap-5">
        {SCALING_GLOBAL_OPERATIONS.pillars.map((pillar) => (
          <div key={pillar.title}>
            <h3 className="text-[14.5px] font-semibold text-[#1E1C1A]">
              {pillar.title}
            </h3>
            <p className="text-[13px] leading-[1.52] text-[#5B5752] mt-1.5">
              {pillar.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* Beyond the CV — Personal Card                                              */
/* -------------------------------------------------------------------------- */
export const BeyondTheCvCard: React.FC = () => {
  return (
    <section
      aria-labelledby="beyond-cv-heading"
      className="bento-card p-5 sm:p-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Left: Beyond the CV Narrative */}
        <div className="lg:col-span-7 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-[5px] rounded-[8px] bg-[#E9E6E1] text-[#4A4743] text-[12px] font-medium leading-none mb-2.5">
            <Film className="w-3.5 h-3.5 text-[#EE6A1F]" />
            <span>{INDEPENDENT_DOCUMENTARY_PROJECT.eyebrow}</span>
          </div>
          <h2
            id="beyond-cv-heading"
            className="text-[21px] sm:text-[23px] font-semibold tracking-[-0.02em] text-[#1E1C1A]"
          >
            {INDEPENDENT_DOCUMENTARY_PROJECT.title}
          </h2>
          <p className="text-[14.5px] sm:text-[15px] leading-[1.62] text-[#3F3C39] max-w-[640px] mt-2">
            {INDEPENDENT_DOCUMENTARY_PROJECT.description}
          </p>
        </div>

        {/* Right: Two Easy-to-Click External Links */}
        <div className="lg:col-span-5 flex flex-col gap-2.5">
          {INDEPENDENT_DOCUMENTARY_PROJECT.links.map((link) => {
            const isPrimary = link.id === 'website';
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center justify-between gap-3 w-full px-4 py-3.5 rounded-[12px] border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EE6A1F] ${
                  isPrimary
                    ? 'bg-[#2A2624] text-[#FAF9F6] border-[#2A2624] hover:bg-[#1E1C1A]'
                    : 'bg-[#FAF9F6] text-[#1E1C1A] border-black/[0.1] hover:border-[#EE6A1F]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`w-9 h-9 rounded-[9px] flex items-center justify-center shrink-0 ${
                      isPrimary
                        ? 'bg-white/10 text-[#EE6A1F]'
                        : 'bg-[#EFECE7] text-[#EE6A1F]'
                    }`}
                  >
                    {link.id === 'website' ? (
                      <Globe className="w-4 h-4" />
                    ) : (
                      <Camera className="w-4 h-4" />
                    )}
                  </span>
                  <div className="min-w-0">
                    <span className="block text-[13.5px] font-semibold leading-tight truncate">
                      {link.label}
                    </span>
                    <span
                      className={`block text-[12px] mt-0.5 truncate ${
                        isPrimary ? 'text-[#D6D2CB]' : 'text-[#6B6762]'
                      }`}
                    >
                      {link.subtitle}
                    </span>
                  </div>
                </div>
                <ArrowUpRight
                  className={`w-4 h-4 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                    isPrimary ? 'text-[#FAF9F6]' : 'text-[#6B6762] group-hover:text-[#EE6A1F]'
                  }`}
                />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
