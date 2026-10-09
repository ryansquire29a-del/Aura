import React, { useState } from 'react';
import { FAQS } from '../data/auraData';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

interface FaqSectionProps {
  onOpenInquiry: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenInquiry }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#070e0a] border-b border-[#1c2e24]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-xs tracking-[0.2em] uppercase text-[#c5a86d] font-semibold mb-3">
            <span>Reassurance &amp; Clarity</span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span className="text-stone-400 font-normal">Discreet Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#f4efe6] font-normal leading-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-stone-300 font-light text-base leading-relaxed max-w-2xl mx-auto">
            Addressing common hesitations from mature women regarding discretion, expectations, and booking logistics.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4 mb-16">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#09130d] border border-[#1d3326] rounded-lg overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-[#0c1a11] transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-[#c5a86d] text-lg font-light shrink-0">
                      Q{idx + 1}.
                    </span>
                    <span className="font-serif text-lg sm:text-xl text-[#f2ede4] font-normal leading-snug">
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#c5a86d] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#dfca9a]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-stone-300 font-light text-sm sm:text-base leading-relaxed border-t border-[#16271d]/60 bg-[#08110b]/50">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Reassurance Callout Card */}
        <div className="p-8 rounded-xl bg-gradient-to-r from-[#0a1811] via-[#0e2117] to-[#0a1811] border border-[#234230] text-center shadow-lg">
          <HelpCircle className="w-8 h-8 text-[#c5a86d] mx-auto mb-3" />
          <h3 className="font-serif text-2xl text-[#f4efe6] mb-2">
            Have a private, nuanced question?
          </h3>
          <p className="text-stone-300 text-xs sm:text-sm font-light max-w-xl mx-auto mb-6 leading-relaxed">
            Every woman&apos;s desires and circumstances are unique. Inquiries are handled with the highest standard of empathy, emotional intelligence, and absolute confidentiality.
          </p>
          <button
            onClick={onOpenInquiry}
            className="px-6 py-3 bg-gradient-to-r from-[#dfca9a] via-[#c5a86d] to-[#b39556] text-[#060b08] text-xs uppercase tracking-[0.18em] font-semibold rounded hover:brightness-110 active:brightness-95 transition-all shadow-md shadow-[#c5a86d]/20 inline-flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Send A Confidential Message</span>
          </button>
        </div>

      </div>
    </section>
  );
};
