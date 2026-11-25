import { useEffect, useRef, useState } from 'react';

export interface MasterClockState {
  /** Elapsed time in seconds from the single Web Animation clock */
  nowSec: number;
  /** Whether the user prefers reduced motion */
  reducedMotion: boolean;
}

/**
 * Single master clock driven by one long-running Web Animation on a hidden element,
 * sampled inside a single requestAnimationFrame loop.
 * Frame-by-frame recorders that pause/seek Web Animations therefore capture it deterministically.
 */
export function useMasterClock(): MasterClockState {
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [nowSec, setNowSec] = useState<number>(0);
  const animRef = useRef<Animation | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      // Settled static timestamp past entrance animations
      setNowSec(10);
      return;
    }

    const clockNode = document.createElement('div');
    clockNode.setAttribute('aria-hidden', 'true');
    clockNode.style.position = 'fixed';
    clockNode.style.width = '0px';
    clockNode.style.height = '0px';
    clockNode.style.opacity = '0';
    clockNode.style.pointerEvents = 'none';
    document.body.appendChild(clockNode);

    // 1-hour linear Web Animation used purely as the unified clock source
    const animation = clockNode.animate([{ opacity: 0 }, { opacity: 0 }], {
      duration: 3_600_000,
      iterations: Infinity,
      easing: 'linear',
    });
    animRef.current = animation;

    let rafId = 0;
    const tick = () => {
      const currentMs = typeof animation.currentTime === 'number' ? animation.currentTime : 0;
      setNowSec(currentMs / 1000);
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
      animation.cancel();
      clockNode.remove();
      animRef.current = null;
    };
  }, [reducedMotion]);

  return { nowSec, reducedMotion };
}

/**
 * Cubic ease-out helper for staggered entrance rises (14px rise & fade over 0.7s).
 */
export function getEntranceStyle(
  nowSec: number,
  index: number,
  reducedMotion: boolean
): { opacity: number; transform: string } {
  if (reducedMotion) {
    return { opacity: 1, transform: 'translate3d(0, 0px, 0)' };
  }
  const delay = index * 0.08;
  const duration = 0.7;
  const raw = (nowSec - delay) / duration;
  const clamped = Math.max(0, Math.min(1, raw));
  const eased = 1 - Math.pow(1 - clamped, 3);
  const y = (1 - eased) * 14;
  return {
    opacity: eased,
    transform: `translate3d(0, ${y.toFixed(2)}px, 0)`,
  };
}
