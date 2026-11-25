import React, { useEffect, useRef, useState } from 'react';
import {
  Camera,
  Check,
  Download,
  ExternalLink,
  Mail,
  RotateCcw,
  X,
} from 'lucide-react';
import {
  CANDIDATE_PROFILE,
  WIX_MARKETPLACE_SPOTLIGHT,
  type PitchLocaleCode,
} from './data/cvData';
import { getEntranceStyle, useMasterClock } from './hooks/useMasterClock';
import { VoiceNoteBar } from './components/VoiceNoteBar';
import { ExperienceCard, ImpactDeckCard } from './components/BentoCards';
import {
  AiProjectsSection,
  LocksmithDetailModal,
  SalesAgentDetailModal,
} from './components/AiProjectsSection';
import {
  BeyondTheCvCard,
  ScalingGlobalOpsCard,
} from './components/GlobalOpsAndBeyond';
import { FullCvDrawer, PrintableCv } from './components/FullCvDrawer';

const AVATAR_STORAGE_KEY = 'sveta_cv_avatar_dataurl_v1';

type DetailModalType =
  | null
  | 'wix-marketplace'
  | 'locksmith-workflow'
  | 'sales-agent-system'
  | 'why-elevenlabs';

export default function App() {
  const { nowSec, reducedMotion } = useMasterClock();

  const [activeLocale, setActiveLocale] = useState<PitchLocaleCode>('en');

  const [avatarUrl, setAvatarUrl] = useState<string | null>(() => {
    try {
      return localStorage.getItem(AVATAR_STORAGE_KEY);
    } catch {
      return null;
    }
  });
  const avatarInputRef = useRef<HTMLInputElement | null>(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [focusRoleId, setFocusRoleId] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<DetailModalType>(null);
  const [copiedEmailToast, setCopiedEmailToast] = useState(false);

  useEffect(() => {
    if (!activeModal) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModal(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeModal]);

  // Availability pulsing halo on the unified clock
  const haloCycle = reducedMotion ? 0 : (nowSec % 1.8) / 1.8;
  const haloScale = 1 + haloCycle * 1.4;
  const haloOpacity = reducedMotion ? 0 : (1 - haloCycle) * 0.55;

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : null;
      if (!result) return;
      setAvatarUrl(result);
      try {
        localStorage.setItem(AVATAR_STORAGE_KEY, result);
      } catch {
        // Ignore storage quota issues for large raw images
      }
    };
    reader.readAsDataURL(file);
  };

  const handleClearAvatar = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAvatarUrl(null);
    try {
      localStorage.removeItem(AVATAR_STORAGE_KEY);
    } catch {
      // Ignore storage access errors
    }
  };

  const handleOpenRoleInDrawer = (roleId: string) => {
    setFocusRoleId(roleId);
    setIsDrawerOpen(true);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CANDIDATE_PROFILE.email);
      setCopiedEmailToast(true);
      window.setTimeout(() => setCopiedEmailToast(false), 2200);
    } catch {
      window.location.href = `mailto:${CANDIDATE_PROFILE.email}`;
    }
  };

  // Subtle staggered entrance in reading order
  const enterHero = getEntranceStyle(nowSec, 0, reducedMotion);
  const enterRow1 = getEntranceStyle(nowSec, 2, reducedMotion);
  const enterProjects = getEntranceStyle(nowSec, 4, reducedMotion);
  const enterGlobalOps = getEntranceStyle(nowSec, 5, reducedMotion);
  const enterBeyond = getEntranceStyle(nowSec, 6, reducedMotion);

  const avatarTileContent = (
    <div
      role="button"
      tabIndex={0}
      onClick={() => avatarInputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          avatarInputRef.current?.click();
        }
      }}
      aria-label={
        avatarUrl
          ? 'Change profile photo'
          : 'Upload profile photo (currently showing SB monogram)'
      }
      title="Click to upload your photo"
      className="group relative w-full h-full rounded-[14px] bg-[#EE6A1F] overflow-hidden cursor-pointer border border-black/[0.08] select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1C1A]"
      style={{ boxShadow: '0 4px 18px rgba(238, 106, 31, 0.16)' }}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={CANDIDATE_PROFILE.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-[#FAF9F6] relative">
          <div
            aria-hidden="true"
            className="absolute inset-3 rounded-[9px] border border-white/22 pointer-events-none"
          />
          <span className="text-[40px] sm:text-[48px] lg:text-[72px] font-medium tracking-[-0.04em] leading-none">
            {CANDIDATE_PROFILE.monogram}
          </span>
        </div>
      )}

      <div className="absolute inset-0 bg-[#1E1C1A]/55 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150 flex flex-col items-center justify-center gap-1 text-white">
        <Camera className="w-5 h-5" />
        <span className="text-[11.5px] font-medium">
          {avatarUrl ? 'Replace photo' : 'Upload photo'}
        </span>
      </div>

      {avatarUrl && (
        <button
          type="button"
          onClick={handleClearAvatar}
          aria-label="Revert to SB monogram"
          title="Revert to SB monogram"
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[#1E1C1A]/75 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-[#1E1C1A]"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );

  return (
    <>
      <div className="screen-only-app portfolio-shell">
        <main className="w-full max-w-[1288px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 space-y-6 sm:space-y-8">
          {/* Hidden Avatar File Input */}
          <input
            ref={avatarInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarFileChange}
            aria-label="Upload portrait photo"
          />

          {/* ======================== 1. HERO & ALIGNED PHOTOGRAPH ======================== */}
          <section
            aria-label="Candidate introduction"
            style={enterHero}
            className="relative z-30 grid grid-cols-1 lg:grid-cols-[256px_1fr] gap-5 lg:gap-7 items-stretch"
          >
            {/* Desktop Enlarged Photo: Top & bottom aligned to hero content, left edge aligned to Experience card */}
            <div className="hidden lg:block h-full">{avatarTileContent}</div>

            {/* Right Column: Hero Text + Existing Audio Experience (Unchanged) + Contact/CV Actions */}
            <div className="flex flex-col justify-between gap-3.5 min-w-0">
              {/* Mobile Compact Photo + Headline Lockup */}
              <div className="flex items-start gap-4 lg:block">
                <div className="lg:hidden w-[92px] h-[92px] sm:w-[116px] sm:h-[116px] shrink-0">
                  {avatarTileContent}
                </div>

                <header className="min-w-0 flex-1">
                  <p className="text-[11px] font-medium tracking-[0.07em] text-[#77736E] mb-1.5">
                    {CANDIDATE_PROFILE.eyebrow}
                  </p>
                  <h1 className="text-[23px] sm:text-[29px] lg:text-[34px] leading-[1.16] font-medium tracking-[-0.022em] text-[#1E1C1A] text-balance">
                    {CANDIDATE_PROFILE.mainHeadline}
                  </h1>
                  <p className="text-[15.5px] sm:text-[18px] lg:text-[20px] leading-[1.35] font-normal tracking-[-0.014em] text-[#8E8983] mt-1">
                    {CANDIDATE_PROFILE.secondaryHeadline}
                  </p>
                </header>
              </div>

              {/* Supporting Description */}
              <p className="text-[14.5px] sm:text-[15.5px] leading-[1.56] text-[#4F4C48] max-w-[900px]">
                {CANDIDATE_PROFILE.supportingDescription}
              </p>

              {/* Existing Audio Component — Strictly Preserved & Unchanged */}
              <div className="relative z-30 w-full max-w-[580px] pt-0.5">
                <VoiceNoteBar
                  nowSec={nowSec}
                  reducedMotion={reducedMotion}
                  activeLocale={activeLocale}
                  externalOpenSignal={0}
                  onSelectLocale={setActiveLocale}
                />
              </div>

              {/* Utility Controls: Availability, Contact, LinkedIn & Download CV */}
              <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
                <div
                  className="h-[44px] px-3.5 rounded-full bg-[#FAF9F6] border border-black/[0.08] flex items-center justify-center gap-2 text-[12.5px] font-medium text-[#1E1C1A] whitespace-nowrap shrink-0"
                  style={{ boxShadow: '0 1px 3px rgba(30,28,26,0.03)' }}
                >
                  <span className="relative flex items-center justify-center w-2 h-2 shrink-0">
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-[#3BC45E]"
                      style={{
                        transform: `scale(${haloScale.toFixed(3)})`,
                        opacity: haloOpacity.toFixed(3),
                      }}
                    />
                    <span className="relative w-2 h-2 rounded-full bg-[#3BC45E]" />
                  </span>
                  <span>{CANDIDATE_PROFILE.availabilityLabel}</span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  title={`Copy ${CANDIDATE_PROFILE.email}`}
                  className="h-[44px] px-3.5 rounded-full bg-[#FAF9F6] border border-black/[0.08] flex items-center justify-center gap-1.5 text-[12.5px] font-medium text-[#1E1C1A] hover:border-black/[0.18] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#EE6A1F]"
                >
                  {copiedEmailToast ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#3BC45E]" />
                      <span>Email copied</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-3.5 h-3.5 text-[#6F6B65]" />
                      <span>Contact</span>
                    </>
                  )}
                </button>

                <a
                  href={CANDIDATE_PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-[44px] px-3.5 rounded-full bg-[#FAF9F6] border border-black/[0.08] flex items-center justify-center gap-1.5 text-[12.5px] font-medium text-[#1E1C1A] hover:border-black/[0.18] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#EE6A1F]"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 text-[#6F6B65]" />
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setFocusRoleId(null);
                    setIsDrawerOpen(true);
                  }}
                  className="h-[44px] px-4 rounded-full bg-[#2A2624] text-[#FAF9F6] flex items-center justify-center gap-1.5 text-[12.5px] font-medium cursor-pointer transition-colors hover:bg-[#1E1C1A] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EE6A1F]"
                  style={{ boxShadow: '0 2px 8px rgba(30,28,26,0.12)' }}
                >
                  <Download className="w-3.5 h-3.5 shrink-0" />
                  <span>Download CV</span>
                </button>
              </div>
            </div>
          </section>

          {/* ======================== 2. EXPERIENCE & PROVEN IMPACT ======================== */}
          <div
            style={enterRow1}
            className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch"
          >
            <div className="lg:col-span-5">
              <ExperienceCard
                onSelectRole={handleOpenRoleInDrawer}
                onOpenMarketplaceSpotlight={() => setActiveModal('wix-marketplace')}
              />
            </div>

            <div className="lg:col-span-7">
              <ImpactDeckCard />
            </div>
          </div>

          {/* ======================== 3. FEATURED: AI SOLUTIONS I'VE BUILT ======================== */}
          <div style={enterProjects}>
            <AiProjectsSection
              onOpenLocksmithModal={() => setActiveModal('locksmith-workflow')}
              onOpenSalesAgentModal={() => setActiveModal('sales-agent-system')}
            />
          </div>

          {/* ======================== 4. SCALING GLOBAL OPERATIONS ======================== */}
          <div style={enterGlobalOps}>
            <ScalingGlobalOpsCard
              onExploreExperience={() => handleOpenRoleInDrawer('wix')}
              onOpenMarketplaceSpotlight={() => setActiveModal('wix-marketplace')}
            />
          </div>

          {/* ======================== 5. BEYOND THE CV ======================== */}
          <div style={enterBeyond}>
            <BeyondTheCvCard />
          </div>

          {/* ======================== 6. WHY ELEVENLABS, CONTACT & CV FOOTER ======================== */}
          <footer className="pt-4 border-t border-black/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12.5px] text-[#77736E]">
            <span>{CANDIDATE_PROFILE.locationFooter}</span>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <button
                type="button"
                onClick={() => setActiveModal('why-elevenlabs')}
                className="font-medium text-[#4A4743] hover:text-[#EE6A1F] transition-colors cursor-pointer"
              >
                Why ElevenLabs &amp; Working Style
              </button>
              <span aria-hidden="true" className="text-[#C7C3BC]">
                ·
              </span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="font-medium text-[#4A4743] hover:text-[#EE6A1F] transition-colors cursor-pointer"
              >
                {copiedEmailToast ? 'Email copied' : CANDIDATE_PROFILE.email}
              </button>
              <span aria-hidden="true" className="text-[#C7C3BC]">
                ·
              </span>
              <button
                type="button"
                onClick={() => {
                  setFocusRoleId(null);
                  setIsDrawerOpen(true);
                }}
                className="font-medium text-[#4A4743] hover:text-[#EE6A1F] transition-colors cursor-pointer"
              >
                Full CV &amp; Print
              </button>
            </div>
          </footer>
        </main>

        {/* Slide-Over Full CV Drawer */}
        <FullCvDrawer
          isOpen={isDrawerOpen}
          focusRoleId={focusRoleId}
          onClose={() => setIsDrawerOpen(false)}
        />

        {/* Focused Editorial Detail Modals */}
        {activeModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/32 backdrop-blur-[2px]"
            role="dialog"
            aria-modal="true"
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveModal(null);
            }}
          >
            <div className="w-full max-w-[680px] max-h-[90vh] overflow-y-auto rounded-[16px] bg-[#FAF9F6] border border-black/[0.1] p-5 sm:p-6 shadow-2xl">
              {activeModal === 'wix-marketplace' && (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11.5px] font-medium text-[#EE6A1F]">
                        Wix · Product Localization &amp; Operations Manager (Feb 2022 – Aug 2025)
                      </p>
                      <h2 className="text-[20px] font-semibold text-[#1E1C1A] tracking-[-0.02em] mt-1">
                        {WIX_MARKETPLACE_SPOTLIGHT.title}
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveModal(null)}
                      aria-label="Close Wix Marketplace details"
                      className="w-8 h-8 rounded-full bg-[#ECE9E3] text-[#4A4743] hover:text-[#1E1C1A] flex items-center justify-center cursor-pointer shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-4 space-y-3 text-[14px] leading-[1.6] text-[#35322F]">
                    {WIX_MARKETPLACE_SPOTLIGHT.paragraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>

                  <div className="mt-5 pt-4 border-t border-black/[0.08]">
                    <p className="text-[12px] font-medium text-[#77736E] mb-2.5">
                      Key operational perspectives gained
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {WIX_MARKETPLACE_SPOTLIGHT.pillars.map((pillar) => (
                        <div
                          key={pillar}
                          className="flex items-center gap-2 text-[13px] font-medium text-[#1E1C1A]"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#EE6A1F] shrink-0" />
                          <span>{pillar}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeModal === 'locksmith-workflow' && (
                <LocksmithDetailModal onClose={() => setActiveModal(null)} />
              )}

              {activeModal === 'sales-agent-system' && (
                <SalesAgentDetailModal onClose={() => setActiveModal(null)} />
              )}

              {activeModal === 'why-elevenlabs' && (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11.5px] font-medium text-[#EE6A1F]">
                        Motivation &amp; Working Style
                      </p>
                      <h2 className="text-[20px] font-semibold text-[#1E1C1A] tracking-[-0.02em] mt-1">
                        Why ElevenLabs Productions
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveModal(null)}
                      aria-label="Close motivation dialog"
                      className="w-8 h-8 rounded-full bg-[#ECE9E3] text-[#4A4743] hover:text-[#1E1C1A] flex items-center justify-center cursor-pointer shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-4 space-y-3 text-[14px] leading-[1.62] text-[#2A2624]">
                    {CANDIDATE_PROFILE.whyElevenLabs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>

                  <div className="mt-5 pt-4 border-t border-black/[0.08]">
                    <p className="text-[12px] font-medium text-[#77736E] mb-2">
                      How I work with teams
                    </p>
                    <p className="text-[13.5px] leading-[1.6] text-[#35322F]">
                      “{CANDIDATE_PROFILE.personalStatement}”
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Dedicated Print / PDF View */}
      <PrintableCv />
    </>
  );
}
