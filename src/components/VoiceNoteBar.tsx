import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Info,
  Pause,
  Play,
  VolumeX,
  X,
} from 'lucide-react';
import {
  AUDIO_LOCALES_CONFIG,
  AUDIO_SECTION_COPY,
  buildWaveformBars,
  PITCH_LOCALE_ORDER,
  type PitchLocaleCode,
} from '../data/cvData';

interface VoiceNoteBarProps {
  nowSec: number;
  reducedMotion: boolean;
  activeLocale: PitchLocaleCode;
  externalOpenSignal: number;
  onSelectLocale: (locale: PitchLocaleCode) => void;
}

function formatTime(sec: number): string {
  const clamped = Math.max(0, Math.floor(sec));
  const mins = Math.floor(clamped / 60);
  const secs = clamped % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export const VoiceNoteBar: React.FC<VoiceNoteBarProps> = ({
  nowSec,
  reducedMotion,
  activeLocale,
  externalOpenSignal,
  onSelectLocale,
}) => {
  const localeConfig = AUDIO_LOCALES_CONFIG[activeLocale];
  const bars = useMemo(
    () => buildWaveformBars(localeConfig.waveformSeed, 48),
    [localeConfig.waveformSeed]
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioCurrentSec, setAudioCurrentSec] = useState(0);
  const [audioDurationSec, setAudioDurationSec] = useState(0);
  const [audioLoadError, setAudioLoadError] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const resolvedAudioSrc = localeConfig.audioFilePath;
  const hasPlayableAudio = Boolean(resolvedAudioSrc) && !audioLoadError;

  // Stop previous recording immediately when locale or audio source changes (no autoplay)
  useEffect(() => {
    const el = audioRef.current;
    setIsPlayingAudio(false);
    setAudioCurrentSec(0);
    setAudioDurationSec(0);
    setAudioLoadError(false);

    if (!el) return;
    el.pause();
    if (resolvedAudioSrc) {
      el.src = resolvedAudioSrc;
      el.load();
    } else if (el.hasAttribute('src')) {
      el.removeAttribute('src');
      el.load();
    }
  }, [resolvedAudioSrc, activeLocale]);

  // Respond when triggered externally
  useEffect(() => {
    if (externalOpenSignal === 0) return;
    const el = audioRef.current;
    if (resolvedAudioSrc && !audioLoadError && el) {
      el.currentTime = 0;
      const playPromise = el.play();
      if (playPromise) {
        playPromise
          .then(() => setIsPlayingAudio(true))
          .catch(() => setIsPlayingAudio(false));
      }
    } else {
      setIsPanelOpen(true);
    }
  }, [externalOpenSignal, resolvedAudioSrc, audioLoadError]);

  // Close panel on Escape
  useEffect(() => {
    if (!isPanelOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsPanelOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isPanelOpen]);

  const progressRatio =
    hasPlayableAudio && audioDurationSec > 0
      ? Math.max(0, Math.min(1, audioCurrentSec / audioDurationSec))
      : 0;
  const playheadIdx = progressRatio * bars.length;

  const handleTogglePlay = () => {
    const el = audioRef.current;
    if (!hasPlayableAudio || !el) {
      setIsPanelOpen(true);
      return;
    }

    if (isPlayingAudio) {
      el.pause();
      setIsPlayingAudio(false);
    } else {
      if (
        el.ended ||
        (audioDurationSec > 0 && el.currentTime >= audioDurationSec - 0.1)
      ) {
        el.currentTime = 0;
      }
      el.play()
        .then(() => setIsPlayingAudio(true))
        .catch(() => setIsPlayingAudio(false));
    }
  };

  const handleLocaleClick = (code: PitchLocaleCode) => {
    const el = audioRef.current;
    if (el) {
      el.pause();
      setIsPlayingAudio(false);
    }
    onSelectLocale(code);
  };

  const handleWaveformSeek = (barIndex: number) => {
    const el = audioRef.current;
    if (!hasPlayableAudio || !el || audioDurationSec <= 0) {
      setIsPanelOpen(true);
      return;
    }
    const targetSec = (barIndex / bars.length) * audioDurationSec;
    el.currentTime = targetSec;
    setAudioCurrentSec(targetSec);
  };

  return (
    <div className="relative w-full">
      <audio
        ref={audioRef}
        preload="metadata"
        onLoadedMetadata={(e) => {
          const d = e.currentTarget.duration;
          if (Number.isFinite(d) && d > 0) setAudioDurationSec(d);
        }}
        onTimeUpdate={(e) => {
          setAudioCurrentSec(e.currentTarget.currentTime);
        }}
        onEnded={() => {
          setIsPlayingAudio(false);
        }}
        onError={() => {
          if (resolvedAudioSrc) {
            setAudioLoadError(true);
            setIsPlayingAudio(false);
          }
        }}
      />

      {/* Main Voice-Note Pill */}
      <div
        className="flex items-center justify-between gap-1.5 sm:gap-2 w-full h-[50px] px-2 sm:px-2.5 rounded-full bg-[#FAF9F6] border border-black/[0.08]"
        style={{ boxShadow: '0 1px 3px rgba(30,28,26,0.03)' }}
      >
        {/* Play / Pause Button */}
        <button
          type="button"
          onClick={handleTogglePlay}
          aria-label={
            !hasPlayableAudio
              ? `${localeConfig.languageName} audio recording unavailable`
              : isPlayingAudio
              ? `Pause ${localeConfig.languageName} audio introduction`
              : `Play ${localeConfig.languageName} audio introduction`
          }
          title={
            hasPlayableAudio
              ? isPlayingAudio
                ? 'Pause recording'
                : `Play ${localeConfig.languageName} recording`
              : `${localeConfig.languageName} audio unavailable`
          }
          className={`w-[32px] h-[32px] sm:w-[30px] sm:h-[30px] rounded-full flex items-center justify-center shrink-0 cursor-pointer transition-transform duration-150 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EE6A1F] ${
            hasPlayableAudio
              ? 'bg-[#EE6A1F] text-white'
              : 'bg-[#EE6A1F]/80 text-white'
          }`}
        >
          {!hasPlayableAudio ? (
            <VolumeX className="w-3.5 h-3.5" />
          ) : isPlayingAudio ? (
            <Pause className="w-3.5 h-3.5 fill-current" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
          )}
        </button>

        {/* Inline 4-Language Switcher */}
        <div
          role="group"
          aria-label="Audio introduction language selector"
          className="flex items-center gap-0.5 p-0.5 rounded-full bg-[#ECE9E3] shrink-0"
        >
          {PITCH_LOCALE_ORDER.map((code) => {
            const isSelected = code === activeLocale;
            const cfg = AUDIO_LOCALES_CONFIG[code];
            return (
              <button
                key={code}
                type="button"
                onClick={() => handleLocaleClick(code)}
                aria-pressed={isSelected}
                title={cfg.localizationHeading}
                className={`px-1.5 sm:px-2 py-1 text-[10.5px] sm:text-[11px] font-medium leading-none rounded-full transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#EE6A1F] ${
                  isSelected
                    ? 'bg-[#2A2624] text-[#FAF9F6]'
                    : 'text-[#6A6660] hover:text-[#1E1C1A]'
                }`}
              >
                {cfg.shortLabel}
              </button>
            );
          })}
        </div>

        {/* Responsive Seekable Waveform (24 bars on narrow mobile, 48 bars on sm+) */}
        <div
          className="flex-1 min-w-0 h-[26px] flex items-center justify-between gap-[1px] sm:gap-[1.5px] px-0.5 sm:px-1 overflow-hidden cursor-pointer select-none"
          role="slider"
          aria-label={
            hasPlayableAudio
              ? `${localeConfig.languageName} audio playback position`
              : `${localeConfig.languageName} audio unavailable`
          }
          aria-valuemin={0}
          aria-valuemax={Math.round(audioDurationSec)}
          aria-valuenow={Math.round(audioCurrentSec)}
          aria-disabled={!hasPlayableAudio}
          tabIndex={0}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const ratio = Math.max(
              0,
              Math.min(1, (e.clientX - rect.left) / rect.width)
            );
            handleWaveformSeek(Math.floor(ratio * bars.length));
          }}
          onKeyDown={(e) => {
            if (!hasPlayableAudio) {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsPanelOpen(true);
              }
              return;
            }
            if (e.key === 'ArrowRight') {
              handleWaveformSeek(
                Math.min(bars.length - 1, Math.floor(playheadIdx) + 4)
              );
            } else if (e.key === 'ArrowLeft') {
              handleWaveformSeek(Math.max(0, Math.floor(playheadIdx) - 4));
            } else if (e.key === ' ') {
              e.preventDefault();
              handleTogglePlay();
            }
          }}
        >
          {bars.map((height, idx) => {
            const isPast = hasPlayableAudio && idx < playheadIdx;
            const dist = Math.abs(idx - playheadIdx);
            let bounceScale = 1;
            if (
              hasPlayableAudio &&
              isPlayingAudio &&
              !reducedMotion &&
              dist < 4.5
            ) {
              const proximity = Math.max(0, 1 - dist / 4.5);
              const wave = 0.5 + 0.5 * Math.sin(nowSec * 15 + idx * 0.85);
              bounceScale = 1 + proximity * wave * 0.55;
            }
            const basePx = Math.max(4, Math.round(height * 21));
            return (
              <span
                key={idx}
                className={`${
                  idx % 2 === 1 ? 'hidden sm:block' : 'block'
                } w-[2px] rounded-full shrink-0`}
                style={{
                  height: `${basePx}px`,
                  backgroundColor: isPast
                    ? '#1E1C1A'
                    : hasPlayableAudio
                    ? '#CFCBC4'
                    : '#DAD6CF',
                  transform: `scaleY(${bounceScale.toFixed(3)})`,
                  transformOrigin: 'center center',
                  transition: 'background-color 90ms linear',
                }}
              />
            );
          })}
        </div>

        {/* Right-Aligned Real Timer */}
        <span className="font-mono-tabular text-[10.5px] sm:text-[11px] text-[#77736E] shrink-0 text-right min-w-[34px] sm:min-w-[40px]">
          {!hasPlayableAudio
            ? 'Pending'
            : isPlayingAudio || audioCurrentSec > 0
            ? formatTime(audioCurrentSec)
            : audioDurationSec > 0
            ? formatTime(audioDurationSec)
            : localeConfig.plannedDurationLabel}
        </span>

        {/* Desktop Compact Info Toggle */}
        <button
          type="button"
          onClick={() => setIsPanelOpen((prev) => !prev)}
          aria-expanded={isPanelOpen}
          aria-label={AUDIO_SECTION_COPY.exploreLabel}
          title={AUDIO_SECTION_COPY.exploreLabel}
          className={`hidden sm:flex w-[28px] h-[28px] rounded-full items-center justify-center shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#EE6A1F] ${
            isPanelOpen
              ? 'bg-[#2A2624] text-white'
              : 'bg-[#ECE9E3] text-[#5B5752] hover:text-[#1E1C1A]'
          }`}
        >
          <Info className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Discreet Explore Trigger Below Pill (Touch-Friendly on Mobile) */}
      <div className="mt-1.5 px-1 flex items-center justify-start">
        <button
          type="button"
          onClick={() => setIsPanelOpen((prev) => !prev)}
          aria-expanded={isPanelOpen}
          className="inline-flex items-center gap-1.5 py-1 text-[12px] sm:text-[11.5px] font-medium text-[#6B6762] hover:text-[#EE6A1F] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#EE6A1F] rounded"
        >
          <span>{AUDIO_SECTION_COPY.exploreLabel}</span>
          {isPanelOpen ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Expandable Localization Choices Panel — Inline on Mobile/Tablet, Floating on Desktop */}
      {isPanelOpen && (
        <div
          className="mt-2 lg:absolute lg:left-0 lg:right-0 lg:top-full lg:mt-2 z-50 rounded-[14px] bg-[#FAF9F6] border border-black/[0.1] p-4 sm:p-5"
          style={{ boxShadow: '0 18px 44px rgba(30, 28, 26, 0.14)' }}
          role="dialog"
          aria-label={AUDIO_SECTION_COPY.exploreLabel}
        >
          {/* Header Row: Active Language Heading + Close Button */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-[14px] sm:text-[14.5px] font-semibold text-[#1E1C1A] tracking-[-0.012em] leading-[1.35]">
              {localeConfig.localizationHeading}
            </h3>
            <button
              type="button"
              onClick={() => setIsPanelOpen(false)}
              aria-label="Close localization choices"
              className="w-7 h-7 -mt-0.5 -mr-1 rounded-full flex items-center justify-center text-[#77736E] hover:bg-[#ECE9E3] hover:text-[#1E1C1A] transition-colors cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Synced Locale Switcher Inside Panel for Effortless Exploration Across All 4 Languages */}
          <div
            role="tablist"
            aria-label="Select language to view localization choices"
            className="mt-3 grid grid-cols-4 gap-1 p-1 rounded-[10px] bg-[#ECE9E3] sm:inline-flex sm:w-auto"
          >
            {PITCH_LOCALE_ORDER.map((code) => {
              const cfg = AUDIO_LOCALES_CONFIG[code];
              const isSelected = code === activeLocale;
              return (
                <button
                  key={code}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleLocaleClick(code)}
                  className={`px-3 py-1.5 text-[11.5px] font-medium rounded-[7px] transition-colors duration-150 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#EE6A1F] ${
                    isSelected
                      ? 'bg-[#2A2624] text-[#FAF9F6]'
                      : 'text-[#5B5752] hover:text-[#1E1C1A]'
                  }`}
                >
                  {cfg.shortLabel}
                </button>
              );
            })}
          </div>

          {/* Two Structured Localization Sections — Exact Requested Copy Only */}
          <div className="mt-3.5 space-y-2.5">
            <div className="rounded-[10px] bg-[#F5F3EF] border border-black/[0.06] px-3.5 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.055em] text-[#EE6A1F] mb-1">
                {AUDIO_SECTION_COPY.adaptedHeading}
              </p>
              <p className="text-[13px] sm:text-[13.5px] leading-[1.58] text-[#1E1C1A]">
                {localeConfig.whatIAdapted}
              </p>
            </div>

            <div className="rounded-[10px] bg-[#F5F3EF] border border-black/[0.06] px-3.5 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.055em] text-[#6B6762] mb-1">
                {AUDIO_SECTION_COPY.mattersHeading}
              </p>
              <p className="text-[13px] sm:text-[13.5px] leading-[1.58] text-[#35322F]">
                {localeConfig.whatMattersInLocalization}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
