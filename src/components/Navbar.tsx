import React from 'react';
import { Compass, Sparkles, BookOpen, Eye } from 'lucide-react';

interface NavbarProps {
  activeView: 'client' | 'operator';
  onViewChange: (view: 'client' | 'operator') => void;
  onOpenInquiry: () => void;
  onTriggerOperatorAccess?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onViewChange,
  onOpenInquiry,
  onTriggerOperatorAccess
}) => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#060b08]/90 border-b border-[#1c2e24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Brand title wordmark (Double-click opens discreet operator access) */}
        <button
          onClick={() => {
            if (activeView === 'operator') {
              onViewChange('client');
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          onDoubleClick={(e) => {
            e.preventDefault();
            if (onTriggerOperatorAccess) {
              onTriggerOperatorAccess();
            }
          }}
          className="text-left group flex items-baseline gap-2 focus:outline-none select-none"
          title={activeView === 'operator' ? 'Click to preview client portal' : 'Aura Companionship'}
        >
          <span className="text-2xl sm:text-3xl font-serif tracking-[0.25em] text-[#f2ede4] font-medium group-hover:text-[#c5a86d] transition-colors">
            AURA
          </span>
          <span className="text-[11px] tracking-[0.2em] uppercase text-[#c5a86d]/80 font-sans font-light hidden sm:inline">
            COMPANIONSHIP
          </span>
        </button>

        {/* Zone 2: Navigation Links (Clean text with subtle transitions) */}
        <nav className="hidden md:flex items-center gap-7 text-xs tracking-[0.15em] uppercase text-stone-300 font-medium">
          {activeView === 'client' ? (
            <>
              <a href="#about" className="hover:text-[#c5a86d] transition-colors">About</a>
              <a href="#specialties" className="hover:text-[#c5a86d] transition-colors">Specialties</a>
              <a href="#rates" className="hover:text-[#c5a86d] transition-colors">Rates &amp; Calculator</a>
              <a href="#venues" className="hover:text-[#c5a86d] transition-colors">Venues</a>
              <a href="#screening" className="hover:text-[#c5a86d] transition-colors">Screening</a>
              <a href="#faq" className="hover:text-[#c5a86d] transition-colors">FAQ</a>
            </>
          ) : (
            <>
              <span className="text-[#c5a86d] flex items-center gap-1.5 normal-case font-normal text-xs tracking-normal">
                <BookOpen className="w-3.5 h-3.5" />
                Operational Blueprint &amp; Safety Suite Active
              </span>
            </>
          )}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-3">
          {/* ONLY show Return to Client button if currently in Operator View */}
          {activeView === 'operator' && (
            <button
              onClick={() => onViewChange('client')}
              className="px-3.5 py-2 text-xs font-medium rounded border border-[#2b4d3a] bg-[#122319] hover:bg-[#1a3325] text-[#dfca9a] transition-colors whitespace-nowrap flex items-center gap-1.5"
              title="Return to previewing client-facing luxury portal"
            >
              <Eye className="w-3.5 h-3.5 text-[#c5a86d]" />
              <span>Preview Client Portal</span>
            </button>
          )}

          <button
            onClick={onOpenInquiry}
            className="px-4 sm:px-5 py-2 text-xs tracking-[0.1em] uppercase font-semibold text-[#09130e] bg-gradient-to-r from-[#dfca9a] via-[#c5a86d] to-[#b39556] rounded hover:brightness-110 active:brightness-95 transition-all shadow-sm shadow-[#c5a86d]/20 whitespace-nowrap flex items-center gap-1.5"
          >
            <Sparkles className="w-3 h-3 text-[#09130e]" />
            <span>Confidential Inquiry</span>
          </button>
        </div>
      </div>
    </header>
  );
};
