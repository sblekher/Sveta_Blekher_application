import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  Film,
  Globe,
  Network,
  Users,
} from 'lucide-react';
import {
  INDEPENDENT_DOCUMENTARY_PROJECT,
  SCALING_GLOBAL_OPERATIONS,
  type EcosystemNode,
} from '../data/portfolioData';

interface ScalingGlobalOpsCardProps {
  onExploreExperience: () => void;
  onOpenMarketplaceSpotlight: () => void;
}

export const ScalingGlobalOpsCard: React.FC<ScalingGlobalOpsCardProps> = ({
  onExploreExperience,
  onOpenMarketplaceSpotlight,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<EcosystemNode['id']>('platform');

  const activeNode =
    SCALING_GLOBAL_OPERATIONS.ecosystemNodes.find((n) => n.id === selectedNodeId) ??
    SCALING_GLOBAL_OPERATIONS.ecosystemNodes[2];

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

      {/* Main Narrative + Illustrative Ecosystem Relationship Diagram */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className="lg:col-span-6 space-y-3 text-[14px] leading-[1.6] text-[#3F3C39]">
          <p>{SCALING_GLOBAL_OPERATIONS.mainCopy}</p>
          <p className="text-[13.5px] text-[#55524E] rounded-[10px] bg-[#EFECE7] border border-black/[0.06] px-3.5 py-3">
            {SCALING_GLOBAL_OPERATIONS.marketplaceNote}
          </p>
        </div>

        {/* Illustrative Interactive Ecosystem Relationship Diagram */}
        <div className="lg:col-span-6 rounded-[12px] bg-[#EFECE7] border border-black/[0.07] p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#1E1C1A]">
              <Network className="w-3.5 h-3.5 text-[#EE6A1F]" />
              <span>Interconnected ecosystem view</span>
            </span>
            <span className="text-[11px] text-[#77736E]">
              Illustrative relationship · Click a group
            </span>
          </div>

          {/* 3-Row Connected Relationship Map: Customers & Providers -> Marketplace Platform -> Cross-Functional Teams */}
          <div className="space-y-2">
            {/* Top Pair: Global Customers <-> Professional Service Providers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SCALING_GLOBAL_OPERATIONS.ecosystemNodes.slice(0, 2).map((node) => {
                const isSelected = node.id === selectedNodeId;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`rounded-[9px] px-3 py-2 text-left border transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#EE6A1F] ${
                      isSelected
                        ? 'bg-[#2A2624] text-[#FAF9F6] border-[#2A2624]'
                        : 'bg-[#FAF9F6] text-[#1E1C1A] border-black/[0.08] hover:border-black/[0.2]'
                    }`}
                  >
                    <span className="block text-[12.5px] font-medium">
                      {node.label}
                    </span>
                    <span
                      className={`block text-[11px] mt-0.5 ${
                        isSelected ? 'text-[#D6D2CB]' : 'text-[#77736E]'
                      }`}
                    >
                      {node.role}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Subtle Connector Row */}
            <div
              aria-hidden="true"
              className="flex items-center justify-center gap-12 text-[11px] text-[#9A9690] leading-none py-0.5"
            >
              <span>↓</span>
              <span className="font-mono-tabular text-[10.5px] text-[#77736E]">
                connected via
              </span>
              <span>↓</span>
            </div>

            {/* Center Node: Marketplace Platform */}
            {(() => {
              const platformNode = SCALING_GLOBAL_OPERATIONS.ecosystemNodes[2];
              const isSelected = selectedNodeId === platformNode.id;
              return (
                <button
                  type="button"
                  onClick={() => setSelectedNodeId(platformNode.id)}
                  className={`w-full rounded-[9px] px-3.5 py-2.5 text-left border transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#EE6A1F] flex flex-wrap items-center justify-between gap-2 ${
                    isSelected
                      ? 'bg-[#FAF9F6] text-[#1E1C1A] border-[#EE6A1F] shadow-sm'
                      : 'bg-[#FAF9F6]/85 text-[#1E1C1A] border-black/[0.08] hover:border-black/[0.2]'
                  }`}
                >
                  <div>
                    <span className="text-[13px] font-semibold">
                      {platformNode.label}
                    </span>
                    <span className="block text-[11px] text-[#77736E]">
                      {platformNode.role}
                    </span>
                  </div>
                  <span className="font-mono-tabular text-[11.5px] font-medium text-[#EE6A1F]">
                    36+ languages
                  </span>
                </button>
              );
            })()}

            <div
              aria-hidden="true"
              className="flex items-center justify-center text-[10.5px] text-[#77736E] py-0.5"
            >
              ↑ supported &amp; localized by ↑
            </div>

            {/* Bottom Node: Internal Cross-Functional Teams */}
            {(() => {
              const teamNode = SCALING_GLOBAL_OPERATIONS.ecosystemNodes[3];
              const isSelected = selectedNodeId === teamNode.id;
              return (
                <button
                  type="button"
                  onClick={() => setSelectedNodeId(teamNode.id)}
                  className={`w-full rounded-[9px] px-3.5 py-2 text-left border transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#EE6A1F] flex flex-wrap items-center justify-between gap-2 ${
                    isSelected
                      ? 'bg-[#2A2624] text-[#FAF9F6] border-[#2A2624]'
                      : 'bg-[#FAF9F6] text-[#1E1C1A] border-black/[0.08] hover:border-black/[0.2]'
                  }`}
                >
                  <span className="inline-flex items-center gap-1.5 text-[12.5px] font-medium">
                    <Users className="w-3.5 h-3.5 text-[#EE6A1F]" />
                    {teamNode.label}
                  </span>
                  <span
                    className={`text-[11px] ${
                      isSelected ? 'text-[#D6D2CB]' : 'text-[#77736E]'
                    }`}
                  >
                    {teamNode.role}
                  </span>
                </button>
              );
            })()}
          </div>

          {/* Active Node Operational Focus Readout */}
          <div className="mt-3 pt-2.5 border-t border-black/[0.07] text-[12.5px] leading-[1.48] text-[#35322F]">
            <span className="font-semibold text-[#1E1C1A]">{activeNode.label}: </span>
            {activeNode.focus}
          </div>
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
/* Independent Documentary Project                                            */
/* -------------------------------------------------------------------------- */
export const BeyondTheCvCard: React.FC = () => {
  return (
    <section
      aria-labelledby="documentary-project-heading"
      className="bento-card p-5 sm:p-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Left: Independent Documentary Project Intro */}
        <div className="lg:col-span-7 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-[5px] rounded-[8px] bg-[#E9E6E1] text-[#4A4743] text-[12px] font-medium leading-none mb-2.5">
            <Film className="w-3.5 h-3.5 text-[#EE6A1F]" />
            <span>{INDEPENDENT_DOCUMENTARY_PROJECT.eyebrow}</span>
          </div>
          <h2
            id="documentary-project-heading"
            className="text-[21px] sm:text-[23px] font-semibold tracking-[-0.02em] text-[#1E1C1A]"
          >
            {INDEPENDENT_DOCUMENTARY_PROJECT.title}
          </h2>
          <p className="text-[14.5px] sm:text-[15px] leading-[1.6] text-[#3F3C39] max-w-[640px] mt-2">
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
