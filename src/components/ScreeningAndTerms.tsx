import React, { useState } from 'react';
import { TERMS_AND_CONDITIONS } from '../data/auraData';
import { ShieldCheck, FileText, Lock, CheckCircle2, UserCheck, Hotel, Sparkles, X } from 'lucide-react';

export const ScreeningAndTerms: React.FC = () => {
  const [showTermsModal, setShowTermsModal] = useState<boolean>(false);

  return (
    <section id="screening" className="py-24 bg-[#060b08] border-b border-[#1c2e24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs tracking-[0.2em] uppercase text-[#c5a86d] font-semibold mb-3">
            <span>Discretion &amp; Trust</span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span className="text-stone-400 font-normal">A Mutual Luxury</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#f4efe6] font-normal leading-tight mb-4">
            Screening &amp; Safety Policy
          </h2>
          <p className="text-stone-300 font-light text-base leading-relaxed">
            To ensure absolute discretion, peace of mind, and mutual comfort for both of us, all new clients complete a quick, confidential screening process prior to confirmation.
          </p>
        </div>

        {/* 3 Step Verification Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          <div className="bg-[#09130d] border border-[#1b2f23] p-8 rounded-lg flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#12241b] border border-[#234230] flex items-center justify-center text-[#dfca9a] mb-6">
                <UserCheck className="w-6 h-6 text-[#c5a86d]" />
              </div>
              <div className="text-xs font-serif text-[#c5a86d] mb-1">Pillar 1</div>
              <h3 className="text-xl font-serif text-[#f4efe6] mb-3">
                1. Confidential Verification
              </h3>
              <p className="text-stone-300 text-sm font-light leading-relaxed mb-4">
                Provide either a link to a verifiable professional/social profile (LinkedIn, Instagram) or a clear photo of valid government ID matching your booking name.
              </p>
            </div>
            <div className="pt-4 border-t border-[#172a1e] flex items-center gap-2 text-xs text-stone-400">
              <Lock className="w-3.5 h-3.5 text-[#c5a86d] shrink-0" />
              <span>Encrypted transfer; permanently deleted immediately after review.</span>
            </div>
          </div>

          <div className="bg-[#09130d] border border-[#1b2f23] p-8 rounded-lg flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#12241b] border border-[#234230] flex items-center justify-center text-[#dfca9a] mb-6">
                <Hotel className="w-6 h-6 text-[#c5a86d]" />
              </div>
              <div className="text-xs font-serif text-[#c5a86d] mb-1">Pillar 2</div>
              <h3 className="text-xl font-serif text-[#f4efe6] mb-3">
                2. Hotel Confirmation
              </h3>
              <p className="text-stone-300 text-sm font-light leading-relaxed mb-4">
                For outcall and overnight stays, a copy of the upscale hotel reservation showing your name and room details confirms your private, secure venue prior to arrival.
              </p>
            </div>
            <div className="pt-4 border-t border-[#172a1e] flex items-center gap-2 text-xs text-stone-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c5a86d] shrink-0" />
              <span>Ensures a secure, upscale setting suited for five-star outcall intimacy.</span>
            </div>
          </div>

          <div className="bg-[#09130d] border border-[#1b2f23] p-8 rounded-lg flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#12241b] border border-[#234230] flex items-center justify-center text-[#dfca9a] mb-6">
                <CheckCircle2 className="w-6 h-6 text-[#c5a86d]" />
              </div>
              <div className="text-xs font-serif text-[#c5a86d] mb-1">Pillar 3</div>
              <h3 className="text-xl font-serif text-[#f4efe6] mb-3">
                3. Non-Refundable 20% Deposit
              </h3>
              <p className="text-stone-300 text-sm font-light leading-relaxed mb-4">
                A non-refundable 20% deposit secures your date and time exclusively on my calendar. This guarantees serious inquiries and covers bespoke travel preparation.
              </p>
            </div>
            <div className="pt-4 border-t border-[#172a1e] flex items-center gap-2 text-xs text-stone-400">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a86d] shrink-0" />
              <span>Remaining 80% settled discreetly bedside upon arrival.</span>
            </div>
          </div>

        </div>

        {/* Framing callout & Terms Trigger */}
        <div className="bg-[#0a150f] border border-[#1b3123] rounded-lg p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#14281c] border border-[#274532] flex items-center justify-center text-[#dfca9a] shrink-0 mt-1">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif text-[#f4efe6] mb-1">
                Transparent Legal &amp; Ethical Standards
              </h3>
              <p className="text-xs text-stone-300 font-light max-w-2xl leading-relaxed">
                Review the comprehensive Terms &amp; Conditions governing consensual companionship, strict mutual respect, client accommodation responsibilities, and cancellation frameworks.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowTermsModal(true)}
            className="px-5 py-2.5 text-xs uppercase tracking-[0.18em] font-semibold text-[#dfca9a] hover:text-white bg-[#102217] hover:bg-[#163021] border border-[#294c37] rounded transition-all whitespace-nowrap flex items-center gap-2"
          >
            <FileText className="w-3.5 h-3.5 text-[#c5a86d]" />
            <span>Read Terms &amp; Conditions</span>
          </button>
        </div>

      </div>

      {/* Terms and Conditions Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#09130d] border border-[#244230] rounded-xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#1b3123] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5a86d] font-semibold">
                  Aura Companionship Legal Framework
                </span>
                <h3 className="text-2xl font-serif text-[#f4efe6]">
                  Website Terms &amp; Conditions
                </h3>
              </div>
              <button
                onClick={() => setShowTermsModal(false)}
                className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-[#122319] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-stone-300 font-light leading-relaxed">
              {TERMS_AND_CONDITIONS.map((clause) => (
                <div key={clause.title} className="p-4 rounded bg-[#0c1811] border border-[#182c20]">
                  <h4 className="font-serif text-base text-[#dfca9a] font-medium mb-2">
                    {clause.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {clause.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#1b3123] bg-[#070f0a] flex justify-end">
              <button
                onClick={() => setShowTermsModal(false)}
                className="px-6 py-2 bg-[#14281d] hover:bg-[#1c3627] text-stone-200 text-xs uppercase tracking-wider font-semibold rounded border border-[#2a4d38] transition-colors"
              >
                Close &amp; Return
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
