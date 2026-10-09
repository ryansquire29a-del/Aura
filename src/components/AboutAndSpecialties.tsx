import React, { useState } from 'react';
import { SENSUAL_SPECIALTIES } from '../data/auraData';
import sensualRitualImg from '../assets/images/aura_sensual_ritual_1791458086518.jpg';
import { Sparkles, HeartHandshake, Eye, Feather, ShieldCheck, Flame, Wine, Music2 } from 'lucide-react';
import { useBranding } from '../context/BrandingContext';

interface AboutAndSpecialtiesProps {
  onOpenInquiry: () => void;
}

export const AboutAndSpecialties: React.FC<AboutAndSpecialtiesProps> = ({
  onOpenInquiry
}) => {
  const { settings } = useBranding();
  const [activePhoto, setActivePhoto] = useState<'portrait' | 'lounge' | 'bespoke'>('portrait');

  return (
    <div id="about" className="py-24 bg-[#070d09] border-b border-[#1c2e24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section 1: About Me Story & Biography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-28">
          
          {/* Left Column: Visual Vignette with Multi-Perspective Photo Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-[#233b2e] shadow-2xl bg-[#08100b]">
              <img
                src={
                  activePhoto === 'portrait'
                    ? settings.portraitPhoto
                    : activePhoto === 'lounge'
                    ? settings.loungePhoto
                    : settings.heroPhoto
                }
                alt="Aura Companion"
                referrerPolicy="no-referrer"
                className="w-full h-[520px] object-cover object-center filter brightness-[0.93] contrast-[1.05] transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060b08]/95 via-[#060b08]/20 to-transparent" />
              
              {/* Photo Selector Switcher */}
              <div className="absolute top-4 right-4 flex items-center gap-1 p-1 bg-[#060b08]/85 backdrop-blur-md rounded border border-[#244230]">
                <button
                  type="button"
                  onClick={() => setActivePhoto('portrait')}
                  className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-medium rounded transition-all ${
                    activePhoto === 'portrait'
                      ? 'bg-[#183123] text-[#f5ebd2] border border-[#c5a86d]/60 font-semibold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Presence
                </button>
                <button
                  type="button"
                  onClick={() => setActivePhoto('lounge')}
                  className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-medium rounded transition-all ${
                    activePhoto === 'lounge'
                      ? 'bg-[#183123] text-[#f5ebd2] border border-[#c5a86d]/60 font-semibold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Dining &amp; Wine
                </button>
                <button
                  type="button"
                  onClick={() => setActivePhoto('bespoke')}
                  className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-medium rounded transition-all ${
                    activePhoto === 'bespoke'
                      ? 'bg-[#183123] text-[#f5ebd2] border border-[#c5a86d]/60 font-semibold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Bespoke
                </button>
              </div>

              {/* Caption Overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-xs tracking-[0.2em] uppercase text-[#dfca9a] font-medium mb-1">
                  {activePhoto === 'portrait'
                    ? 'Attentive Presence & Adoration'
                    : activePhoto === 'lounge'
                    ? 'Private Wine & Conversational Ease'
                    : 'Bespoke Tailoring & Penthouse Elegance'}
                </p>
                <p className="text-sm font-serif italic text-stone-300">
                  {activePhoto === 'portrait'
                    ? 'A partner who listens, adores your body, and places your pleasure at the absolute centre.'
                    : activePhoto === 'lounge'
                    ? 'Deep eye contact, shared vintage wine, and unhurried connection in an intimate setting.'
                    : 'Impeccable grooming, refined sophistication, and absolute discretion at all times.'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Profile Prose */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Unboxed category label */}
            <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#c5a86d] font-semibold mb-3">
              <span>Profile &amp; Philosophy</span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span className="text-stone-400 font-normal">Exquisite Intimacy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#f4efe6] font-normal leading-tight mb-6">
              Exquisite Intimacy &amp; Companionship for the <span className="italic text-[#dfca9a]">Discerning Woman</span>
            </h2>

            <div className="space-y-5 text-stone-300 text-base sm:text-lg font-light leading-relaxed">
              <p>
                <strong className="text-stone-100 font-medium">A sophisticated, attentive, and physically striking companion</strong> dedicated to fulfilling your deepest desires for connection and intimacy. I specialize in catering exclusively to mature women who appreciate the finer things in life—including a partner who listens, adores your body, and places your pleasure at the absolute centre of the experience.
              </p>
              <p>
                Whether you are looking for a sensual escape from the everyday, a night of passionate intimacy, or a gentle, slow-burning romantic connection, I provide a completely safe, judgement-free, and deeply fulfilling space. 
              </p>
              <p className="text-stone-400 text-sm sm:text-base border-l-2 border-[#c5a86d]/60 pl-4 py-1 italic">
                &ldquo;Absolute discretion, emotional safety, and your uncompromised comfort are my highest priorities. You are always in control of the pace.&rdquo;
              </p>
            </div>

            {/* Core Values row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 pt-8 border-t border-[#1c2e24]">
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-[0.15em] text-[#dfca9a] font-medium flex items-center gap-1.5">
                  <HeartHandshake className="w-3.5 h-3.5 text-[#c5a86d]" />
                  Zero Judgement
                </span>
                <span className="text-xs text-stone-400 leading-normal font-light">
                  A sanctuary where your fantasies and pace are met with genuine warmth.
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-[0.15em] text-[#dfca9a] font-medium flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-[#c5a86d]" />
                  Deep Devotion
                </span>
                <span className="text-xs text-stone-400 leading-normal font-light">
                  Eyes locked onto you, phone away, complete conversational &amp; sensual presence.
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-[0.15em] text-[#dfca9a] font-medium flex items-center gap-1.5">
                  <Feather className="w-3.5 h-3.5 text-[#c5a86d]" />
                  Unhurried Touch
                </span>
                <span className="text-xs text-stone-400 leading-normal font-light">
                  Never rushed. Every touch, massage stroke, and embrace is savoured.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Sensual Specialties */}
        <div id="specialties" className="pt-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-2 text-xs tracking-[0.2em] uppercase text-[#c5a86d] font-semibold mb-3">
              <span>Curated Experiences</span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span className="text-stone-400 font-normal">Customised To Your Comfort</span>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#f4efe6] font-normal leading-tight mb-4">
              Sensual Specialties
            </h3>
            <p className="text-stone-300 font-light text-base leading-relaxed">
              To ensure your experience is exactly as you desire, every encounter is shaped by three foundational pillars of slow intimacy and attentive worship.
            </p>
          </div>

          {/* 3 Columns Asymmetric Editorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {SENSUAL_SPECIALTIES.map((specialty, idx) => {
              const number = String(idx + 1).padStart(2, '0');
              return (
                <div
                  key={specialty.title}
                  className="bg-[#0b1610] border border-[#1e3327] rounded-lg p-8 flex flex-col justify-between hover:border-[#3b624b] transition-all group"
                >
                  <div>
                    {/* Natural editorial chapter index */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-serif text-2xl text-[#c5a86d] font-light">
                        {number}.
                      </span>
                      <Sparkles className="w-4 h-4 text-[#c5a86d]/40 group-hover:text-[#c5a86d] transition-colors" />
                    </div>

                    <h4 className="text-xl sm:text-2xl font-serif text-[#f2ede4] font-normal mb-3 group-hover:text-[#dfca9a] transition-colors">
                      {specialty.title}
                    </h4>

                    <p className="text-stone-300 text-sm leading-relaxed mb-6 font-light">
                      {specialty.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[#192b21]">
                    <p className="text-xs text-stone-400 leading-relaxed font-light italic">
                      {specialty.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Visual Ambiance Showcase Card (New Ritual Image) */}
          <div className="rounded-xl overflow-hidden bg-[#09140e] border border-[#1e3427] p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14">
            <div className="lg:col-span-5 relative rounded-lg overflow-hidden border border-[#233d2e] shadow-lg">
              <img
                src={sensualRitualImg}
                alt="Sensual atmosphere with luxury massage oils and candlelight"
                referrerPolicy="no-referrer"
                className="w-full h-72 sm:h-80 object-cover object-center filter brightness-[0.9] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060b08]/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#dfca9a] font-semibold block mb-0.5">
                  Five-Star Sensual Kit
                </span>
                <span className="text-xs font-serif italic text-stone-300">
                  Organic non-scented cold-pressed oils &amp; 2200K amber candle warmth
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="text-xs uppercase tracking-[0.18em] text-[#c5a86d] font-semibold block mb-1">
                  The Atmosphere Ritual
                </span>
                <h4 className="text-2xl sm:text-3xl font-serif text-[#f4efe6]">
                  Sensory Awakening in Your Private Suite
                </h4>
              </div>

              <p className="text-sm text-stone-300 font-light leading-relaxed">
                When I arrive at your hotel suite, every detail is orchestrated to remove the stress of everyday life and envelop you in sensual serenity. Harsh hotel lighting is immediately softened by warm amber candle simulators, while curated low-tempo acoustics fill the room with relaxed intimacy.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-3 rounded bg-[#0b1710] border border-[#192f22]">
                  <Flame className="w-4 h-4 text-[#c5a86d] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-medium text-stone-200 block">Organic Pure Oils</span>
                    <span className="text-[11px] text-stone-400 font-light">Cold-pressed jojoba &amp; sweet almond, completely non-scented.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded bg-[#0b1710] border border-[#192f22]">
                  <Music2 className="w-4 h-4 text-[#c5a86d] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-medium text-stone-200 block">Ambient Soundscapes</span>
                    <span className="text-[11px] text-stone-400 font-light">Minimalist sound system pre-loaded with sensual low-tempo tracks.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenInquiry}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#dfca9a] via-[#c5a86d] to-[#b39556] text-[#060b08] text-xs uppercase tracking-[0.18em] font-semibold rounded hover:brightness-110 active:brightness-95 transition-all shadow-md shadow-[#c5a86d]/20 inline-flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Curate Your Private Encounter</span>
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
