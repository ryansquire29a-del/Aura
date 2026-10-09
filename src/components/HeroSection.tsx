import React from 'react';
import { Calendar, Shield, MapPin, ChevronDown } from 'lucide-react';
import { useBranding } from '../context/BrandingContext';

interface HeroSectionProps {
  onOpenInquiry: () => void;
  onExploreRates: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenInquiry,
  onExploreRates
}) => {
  const { settings } = useBranding();

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-[#1c2e24]">
      {/* Background Image with Fallback and Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={settings.heroPhoto}
          alt="Aura Companionship - Sophisticated Companion"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-[1.02] filter brightness-[0.72] contrast-[1.05]"
        />
        {/* Measured Multi-Stop Scrim for 4.5:1 text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060b08] via-[#060b08]/70 to-[#060b08]/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#060b08]/40 to-[#060b08]/85" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Unboxed editorial trust marker (Anti-slop: NO PILL BADGE) */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs tracking-[0.2em] uppercase text-[#dfca9a] font-medium mb-6">
          <span className="flex items-center gap-1.5 text-stone-300">
            <MapPin className="w-3.5 h-3.5 text-[#c5a86d]" />
            Adelaide, South Australia
          </span>
          <span aria-hidden="true" className="text-stone-600">·</span>
          <span>Private Outcall & Overnight</span>
          <span aria-hidden="true" className="text-stone-600">·</span>
          <span className="flex items-center gap-1.5 text-stone-300">
            <Shield className="w-3.5 h-3.5 text-[#c5a86d]" />
            Absolute Discretion
          </span>
        </div>

        {/* Primary Headline with balance */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#f6f2ea] font-normal tracking-tight leading-[1.12] max-w-4xl mx-auto mb-6 text-balance">
          Curated Intimacy &amp; Sophisticated Companionship for the <span className="italic text-[#dfca9a] font-light">Discerning Woman</span>
        </h1>

        {/* Subtitle / Philosophy */}
        <p className="text-base sm:text-lg md:text-xl text-stone-300/90 font-light max-w-2xl mx-auto leading-relaxed mb-10">
          A sophisticated, attentive, and physically striking companion dedicated to fulfilling your deepest desires for connection, touch, and passionate adoration.
        </p>

        {/* Primary and Secondary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-14">
          <button
            onClick={onOpenInquiry}
            className="w-full sm:w-auto px-8 py-3.5 text-xs tracking-[0.18em] uppercase font-semibold text-[#09130e] bg-gradient-to-r from-[#dfca9a] via-[#c5a86d] to-[#b39556] rounded hover:brightness-110 active:brightness-95 transition-all shadow-lg shadow-[#c5a86d]/20 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Calendar className="w-4 h-4 text-[#09130e]" />
            <span>Book an Experience</span>
          </button>

          <button
            onClick={onExploreRates}
            className="w-full sm:w-auto px-8 py-3.5 text-xs tracking-[0.18em] uppercase font-medium text-stone-200 bg-[#0d1c14]/80 hover:bg-[#13281c] border border-[#2b4b39] hover:border-[#c5a86d]/60 rounded transition-all whitespace-nowrap"
          >
            <span>Explore Services &amp; Rates</span>
          </button>
        </div>

        {/* Editorial Brand Quote Card */}
        <div className="max-w-xl mx-auto pt-6 border-t border-[#1c2e24]/80 text-center">
          <blockquote className="text-sm sm:text-base font-serif italic text-stone-300 leading-relaxed">
            &ldquo;True connection is never rushed. It is found in the unhurried moments, the deep conversations, and the undivided attention you deserve. Let the world fade away for an evening.&rdquo;
          </blockquote>
          <p className="mt-2 text-[11px] tracking-[0.25em] uppercase text-[#c5a86d]/80 font-sans">
            — AURA COMPANIONSHIP
          </p>
        </div>
      </div>

      {/* Down Chevron link */}
      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-stone-400 hover:text-[#c5a86d] transition-colors p-2"
      >
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </a>
    </section>
  );
};
