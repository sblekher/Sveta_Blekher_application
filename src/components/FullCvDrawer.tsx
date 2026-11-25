import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Check,
  Copy,
  ExternalLink,
  Mail,
  Printer,
} from 'lucide-react';
import {
  CANDIDATE_PROFILE,
  EXPERIENCE_ITEMS,
  WIX_MARKETPLACE_SPOTLIGHT,
} from '../data/cvData';

interface FullCvDrawerProps {
  isOpen: boolean;
  focusRoleId: string | null;
  onClose: () => void;
}

export const FullCvDrawer: React.FC<FullCvDrawerProps> = ({
  isOpen,
  focusRoleId,
  onClose,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !focusRoleId) return;
    const timer = window.setTimeout(() => {
      const target = document.getElementById(`cv-role-${focusRoleId}`);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 120);
    return () => window.clearTimeout(timer);
  }, [isOpen, focusRoleId]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CANDIDATE_PROFILE.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      // Fallback ignored gracefully
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/28 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="Full CV of Sveta Blekher"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[700px] h-full bg-[#FAF9F6] border-l border-black/[0.09] flex flex-col shadow-2xl">
        {/* Sticky Drawer Header */}
        <div className="px-5 sm:px-6 py-3.5 sm:py-4 border-b border-black/[0.08] shrink-0 bg-[#FAF9F6]">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              aria-label="Back to previous page"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 -ml-2 rounded-[9px] text-[#4A4743] hover:bg-[#ECE9E3] hover:text-[#1E1C1A] text-[13px] font-medium transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#EE6A1F]"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[9px] bg-[#2A2624] text-[#FAF9F6] text-[12px] font-medium hover:bg-[#1E1C1A] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EE6A1F]"
            >
              <Printer className="w-3.5 h-3.5 shrink-0" />
              <span>Print / Save PDF</span>
            </button>
          </div>

          <div className="min-w-0 mt-2.5">
            <h2 className="text-[19px] font-semibold text-[#1E1C1A] tracking-[-0.02em]">
              {CANDIDATE_PROFILE.name}
            </h2>
            <p className="text-[12px] text-[#77736E] mt-0.5 truncate">
              Application: {CANDIDATE_PROFILE.targetRole} · {CANDIDATE_PROFILE.targetCompany}
            </p>
          </div>
        </div>

        {/* Scrollable Full CV Body */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-6 space-y-6">
          {/* Contact & Location Strip */}
          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2 text-[13px] text-[#5B5752]">
            <span>{CANDIDATE_PROFILE.locationFooter}</span>
            <span aria-hidden="true" className="text-[#C7C3BC]">
              ·
            </span>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 text-[#1E1C1A] font-medium hover:text-[#EE6A1F] transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              {CANDIDATE_PROFILE.email}
              {copiedEmail ? (
                <Check className="w-3.5 h-3.5 text-[#3BC45E]" />
              ) : (
                <Copy className="w-3 h-3 text-[#8E8983]" />
              )}
            </button>
            <span aria-hidden="true" className="text-[#C7C3BC]">
              ·
            </span>
            <a
              href={CANDIDATE_PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#1E1C1A] font-medium hover:text-[#EE6A1F] transition-colors"
            >
              LinkedIn
              <ExternalLink className="w-3 h-3 text-[#8E8983]" />
            </a>
          </div>

          {/* Summary & Working Style */}
          <div>
            <h3 className="text-[12px] font-medium text-[#77736E] mb-2">
              Professional overview
            </h3>
            <p className="text-[14px] leading-[1.65] text-[#2A2624]">
              {CANDIDATE_PROFILE.fullSummary}
            </p>
            <p className="text-[13.5px] leading-[1.6] text-[#35322F] mt-3 px-3.5 py-2.5 rounded-[10px] bg-[#F5F3EF] border border-black/[0.07]">
              “{CANDIDATE_PROFILE.personalStatement}”
            </p>
          </div>

          {/* Why ElevenLabs Productions */}
          <div
            id="cv-role-why-elevenlabs"
            className="pt-5 border-t border-black/[0.07]"
          >
            <h3 className="text-[12px] font-medium text-[#EE6A1F] mb-2">
              Why ElevenLabs Productions
            </h3>
            <div className="space-y-2.5 text-[13.5px] leading-[1.62] text-[#2A2624]">
              {CANDIDATE_PROFILE.whyElevenLabs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          {/* Core Skills */}
          <div className="pt-5 border-t border-black/[0.07]">
            <h3 className="text-[12px] font-medium text-[#77736E] mb-2">
              Core skills
            </h3>
            <p className="text-[13.5px] leading-[1.65] text-[#1E1C1A]">
              {CANDIDATE_PROFILE.coreSkills.join(' · ')}
            </p>
          </div>

          {/* Professional Experience */}
          <div className="pt-5 border-t border-black/[0.07]">
            <h3 className="text-[12px] font-medium text-[#77736E] mb-4">
              Professional experience
            </h3>
            <div className="space-y-6">
              {EXPERIENCE_ITEMS.map((role) => {
                const isHighlighted = focusRoleId === role.id;
                return (
                  <article
                    key={role.id}
                    id={`cv-role-${role.id}`}
                    className={`rounded-[11px] transition-colors ${
                      isHighlighted
                        ? 'bg-[#F1EEE8] p-4 -mx-4 border border-black/[0.07]'
                        : ''
                    }`}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="text-[15px] font-semibold text-[#1E1C1A]">
                        {role.company}{' '}
                        <span className="font-normal text-[#5B5752]">
                          | {role.role}
                        </span>
                      </h4>
                      <span className="font-mono-tabular text-[12px] text-[#77736E]">
                        {role.period}
                      </span>
                    </div>
                    <ul className="mt-2 space-y-1.5 text-[13.5px] leading-[1.55] text-[#35322F] list-disc pl-4">
                      {role.highlights.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>

                    {role.hasMarketplaceSpotlight && (
                      <div className="mt-3 p-3.5 rounded-[10px] bg-[#F5F3EF] border border-black/[0.07]">
                        <p className="text-[12.5px] font-semibold text-[#1E1C1A]">
                          {WIX_MARKETPLACE_SPOTLIGHT.title}
                        </p>
                        <p className="text-[12.5px] leading-[1.5] text-[#4A4743] mt-1">
                          {WIX_MARKETPLACE_SPOTLIGHT.paragraphs.join(' ')}
                        </p>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>

          {/* Education */}
          <div className="pt-5 border-t border-black/[0.07]" id="cv-role-education-spertus">
            <h3 className="text-[12px] font-medium text-[#77736E] mb-3">
              Education
            </h3>
            <div className="space-y-2.5">
              {CANDIDATE_PROFILE.education.map((edu) => (
                <div
                  key={edu.degree}
                  className="flex flex-wrap items-baseline justify-between gap-2 text-[13.5px]"
                >
                  <div>
                    <span className="font-medium text-[#1E1C1A]">{edu.degree}</span>
                    <span className="text-[#6B6762]"> · {edu.institution}</span>
                  </div>
                  <span className="font-mono-tabular text-[12px] text-[#77736E]">
                    {edu.period}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Languages & Tools */}
          <div className="pt-5 border-t border-black/[0.07] grid grid-cols-1 sm:grid-cols-2 gap-6 pb-4">
            <div>
              <h3 className="text-[12px] font-medium text-[#77736E] mb-2">
                Languages
              </h3>
              <ul className="space-y-1 text-[13px] text-[#1E1C1A]">
                <li>
                  <span className="font-medium">Hebrew &amp; Russian:</span>{' '}
                  <span className="text-[#5B5752]">Native</span>
                </li>
                <li>
                  <span className="font-medium">English:</span>{' '}
                  <span className="text-[#5B5752]">Full working proficiency</span>
                </li>
                <li>
                  <span className="font-medium">Spanish:</span>{' '}
                  <span className="text-[#5B5752]">Basic</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-[12px] font-medium text-[#77736E] mb-2">
                Supporting tools
              </h3>
              <p className="text-[13px] leading-[1.6] text-[#1E1C1A]">
                {CANDIDATE_PROFILE.tools.join(' · ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Dedicated Clean Print / PDF Document (Zero Interactive Controls)           */
/* -------------------------------------------------------------------------- */
export const PrintableCv: React.FC = () => {
  return (
    <div className="print-only-cv max-w-[780px] mx-auto text-[#1E1C1A]">
      <header className="pb-3 border-b border-black/15">
        <h1 className="text-[24px] font-semibold tracking-[-0.02em]">
          {CANDIDATE_PROFILE.name}
        </h1>
        <p className="text-[11.5px] font-medium text-[#EE6A1F] mt-0.5">
          Application: {CANDIDATE_PROFILE.targetRole} · {CANDIDATE_PROFILE.targetCompany}
        </p>
        <p className="text-[10.5px] text-[#555] mt-1">
          {CANDIDATE_PROFILE.locationFooter} | {CANDIDATE_PROFILE.email} |{' '}
          {CANDIDATE_PROFILE.linkedin}
        </p>
      </header>

      <section className="mt-3">
        <p className="text-[11px] leading-[1.55] text-[#222]">
          {CANDIDATE_PROFILE.fullSummary}
        </p>
      </section>

      <section className="mt-3">
        <h2 className="text-[10.5px] font-semibold uppercase tracking-[0.06em] text-[#555] mb-1">
          Core Skills
        </h2>
        <p className="text-[11px] leading-[1.48] text-[#222]">
          {CANDIDATE_PROFILE.coreSkills.join(' · ')}
        </p>
      </section>

      <section className="mt-3.5">
        <h2 className="text-[10.5px] font-semibold uppercase tracking-[0.06em] text-[#555] mb-2">
          Professional Experience
        </h2>
        <div className="space-y-3">
          {EXPERIENCE_ITEMS.map((role) => (
            <div key={role.id}>
              <div className="flex items-baseline justify-between">
                <h3 className="text-[12px] font-semibold">
                  {role.company} | {role.role}
                </h3>
                <span className="font-mono-tabular text-[10.5px] text-[#555]">
                  {role.period}
                </span>
              </div>
              <ul className="mt-1 space-y-0.5 text-[10.8px] leading-[1.45] list-disc pl-4 text-[#222]">
                {role.highlights.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-3.5 grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-[10.5px] font-semibold uppercase tracking-[0.06em] text-[#555] mb-1.5">
            Education
          </h2>
          <div className="space-y-1 text-[10.8px]">
            {CANDIDATE_PROFILE.education.map((edu) => (
              <div key={edu.degree}>
                <span className="font-medium">{edu.degree}</span> — {edu.institution} (
                {edu.period})
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-[10.5px] font-semibold uppercase tracking-[0.06em] text-[#555] mb-1.5">
            Languages &amp; Tools
          </h2>
          <p className="text-[10.8px] leading-[1.5]">
            <strong>Languages:</strong> Hebrew and Russian (Native) · English (Full working
            proficiency) · Spanish (Basic)
          </p>
          <p className="text-[10.8px] leading-[1.5] mt-1">
            <strong>Tools:</strong> {CANDIDATE_PROFILE.tools.join(', ')}
          </p>
        </div>
      </section>
    </div>
  );
};
