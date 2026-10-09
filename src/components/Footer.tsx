import React from 'react';
import { ShieldCheck, Lock, Mail } from 'lucide-react';
import { useBranding } from '../context/BrandingContext';

interface FooterProps {
  onOpenInquiry: () => void;
  onOpenOperatorSuite: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInquiry, onOpenOperatorSuite }) => {
  const { settings } = useBranding();

  return (
    <footer className="bg-[#050907] border-t border-[#182c20] text-stone-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#132219]">
          
          {/* Brand Col */}
          <div className="md:col-span-5">
            <span className="text-2xl font-serif tracking-[0.25em] text-[#f2ede4] font-medium block mb-2">
              AURA
            </span>
            <p className="text-xs tracking-[0.15em] uppercase text-[#c5a86d] mb-4">
              Curated Intimacy &amp; Sophisticated Companionship
            </p>
            <p className="text-stone-300 text-xs font-light leading-relaxed max-w-sm mb-6">
              Dedicated exclusively to discerning mature women seeking unhurried devotion, deep sensual adoration, and absolute discretion in Adelaide, South Australia.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-[#dfca9a]">
              <Lock className="w-3.5 h-3.5 text-[#c5a86d]" />
              <span>Encrypted Communications · Zero Digital Trace</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-stone-200 font-semibold mb-3">
              Navigation
            </h4>
            <div><a href="#about" className="hover:text-[#c5a86d] transition-colors">About &amp; Philosophy</a></div>
            <div><a href="#specialties" className="hover:text-[#c5a86d] transition-colors">Sensual Specialties</a></div>
            <div><a href="#rates" className="hover:text-[#c5a86d] transition-colors">Services &amp; Rates</a></div>
            <div><a href="#venues" className="hover:text-[#c5a86d] transition-colors">Adelaide Venues Guide</a></div>
            <div><a href="#screening" className="hover:text-[#c5a86d] transition-colors">Screening Policy</a></div>
            <div><a href="#faq" className="hover:text-[#c5a86d] transition-colors">Discretion FAQ</a></div>
          </div>

          {/* Contact & Legal */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-stone-200 font-semibold mb-3">
              Secure Communications
            </h4>
            <div className="flex items-center gap-2 text-stone-300">
              <Mail className="w-3.5 h-3.5 text-[#c5a86d]" />
              <span className="font-mono text-xs text-[#dfca9a]">{settings.contactEmail}</span>
            </div>
            <p className="text-[11px] text-stone-400 font-light leading-relaxed">
              Serving luxury hotel suites, private villas, and upscale estates across Adelaide CBD and the Adelaide Hills.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenInquiry}
                className="px-4 py-2 bg-[#122319] hover:bg-[#1a3325] text-[#dfca9a] rounded border border-[#274834] text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                Inquire With Discretion
              </button>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div>
            &copy; {new Date().getFullYear()} Aura Companionship. All rights reserved. Strictly 18+ consenting adults.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={onOpenOperatorSuite}
              className="text-stone-600 hover:text-stone-400 transition-colors flex items-center gap-1 group"
              title="Companion Access Portal"
            >
              <Lock className="w-2.5 h-2.5 text-stone-600 group-hover:text-[#c5a86d] transition-colors" />
              <span>Portal</span>
            </button>
            <a href="#screening" className="hover:text-stone-300 transition-colors">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
