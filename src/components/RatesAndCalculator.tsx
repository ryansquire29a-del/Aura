import React, { useState } from 'react';
import { SERVICES } from '../data/auraData';
import { ServiceTierId } from '../types';
import { Check, ShieldCheck, CreditCard, Lock, Sparkles, ArrowRight } from 'lucide-react';
import { useBranding } from '../context/BrandingContext';

interface RatesAndCalculatorProps {
  onSelectPackageForBooking: (tier: ServiceTierId, hours: number) => void;
}

export const RatesAndCalculator: React.FC<RatesAndCalculatorProps> = ({
  onSelectPackageForBooking
}) => {
  const { settings } = useBranding();
  const [selectedTier, setSelectedTier] = useState<ServiceTierId>('extended');
  const [hourlyHours, setHourlyHours] = useState<number>(2);

  // Calculation logic
  let totalRate = 1200;
  if (selectedTier === 'hourly') {
    totalRate = hourlyHours * 350;
  } else if (selectedTier === 'extended') {
    totalRate = 1200;
  } else if (selectedTier === 'overnight') {
    totalRate = 2500;
  }

  const depositRate = Math.round(totalRate * 0.2);
  const balanceRate = totalRate - depositRate;

  return (
    <section id="rates" className="py-24 bg-[#060b08] border-b border-[#1c2e24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs tracking-[0.2em] uppercase text-[#c5a86d] font-semibold mb-3">
            <span>Transparent Investment</span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span className="text-stone-400 font-normal">Discreet &amp; Unhurried</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#f4efe6] font-normal leading-tight mb-4">
            Services &amp; Rates
          </h2>
          <p className="text-stone-300 font-light text-base leading-relaxed">
            All engagements require a safe, upscale environment. For outcall and overnight stays, hotel suite bookings and costs are arranged and covered by the client.
          </p>
        </div>

        {/* 3 Main Service Tiers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 items-stretch">
          {SERVICES.map((service) => {
            const isFeatured = service.id === 'extended';
            return (
              <div
                key={service.id}
                className={`relative rounded-lg p-8 flex flex-col justify-between transition-all ${
                  isFeatured
                    ? 'bg-[#0b1812] border-2 border-[#c5a86d]/80 shadow-2xl shadow-[#c5a86d]/10 ring-1 ring-[#c5a86d]/20'
                    : 'bg-[#09120c] border border-[#1e3326] hover:border-[#2d4d3a]'
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-0.5 bg-gradient-to-r from-[#dfca9a] to-[#c5a86d] text-[#060b08] text-[11px] tracking-[0.2em] uppercase font-bold rounded-sm">
                    Most Requested Rendezvous
                  </div>
                )}

                <div>
                  <div className="mb-6">
                    <h3 className="text-2xl font-serif text-[#f4efe6] mb-2">
                      {service.name}
                    </h3>
                    <p className="text-xs text-[#c5a86d] tracking-[0.05em] font-medium min-h-[32px]">
                      {service.tagline}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="pb-6 mb-6 border-b border-[#1c2e24]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-serif text-[#f4efe6] tabular-nums font-light">
                        ${service.baseRate.toLocaleString()}
                      </span>
                      <span className="text-xs text-stone-400 font-sans tracking-wide">
                        AUD
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 mt-1 font-sans">
                      {service.durationLabel}
                    </p>
                  </div>

                  <p className="text-sm text-stone-300 font-light leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Inclusions List */}
                  <div className="space-y-3 mb-8">
                    <p className="text-[11px] tracking-[0.18em] uppercase text-stone-400 font-semibold">
                      Curated Inclusions:
                    </p>
                    {service.inclusions.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-stone-300 leading-normal">
                        <Check className="w-3.5 h-3.5 text-[#c5a86d] shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="pt-4 mb-6 border-t border-[#192b21] text-[11px] text-stone-400 italic">
                    <span className="font-medium text-stone-300 not-italic">Ideal for: </span>
                    {service.bestFor}
                  </div>

                  <button
                    onClick={() => {
                      setSelectedTier(service.id);
                      const defaultHours = service.id === 'hourly' ? 2 : service.id === 'extended' ? 4 : 8;
                      onSelectPackageForBooking(service.id, defaultHours);
                    }}
                    className={`w-full py-3 px-4 text-xs tracking-[0.18em] uppercase font-semibold rounded transition-all flex items-center justify-center gap-2 ${
                      isFeatured
                        ? 'bg-gradient-to-r from-[#dfca9a] via-[#c5a86d] to-[#b39556] text-[#060b08] hover:brightness-110 active:brightness-95'
                        : 'bg-[#122319] hover:bg-[#1a3325] text-stone-200 border border-[#2b4b38]'
                    }`}
                  >
                    <span>Select &amp; Inquire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Experience Builder & Rate Breakdown */}
        <div className="bg-[#0a140e] border border-[#1e3427] rounded-lg p-6 sm:p-10 mb-20 shadow-xl">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-[#1a2f23] gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-[#c5a86d] font-semibold mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#c5a86d]" />
                  <span>Interactive Estimation Calculator</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#f4efe6]">
                  Configure Your Private Encounter
                </h3>
              </div>
              <p className="text-xs text-stone-400 max-w-xs font-light">
                Calculate total investment and instant deposit breakdown in Australian Dollars ($AUD).
              </p>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Service Selection */}
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-stone-300 font-medium mb-3">
                  1. Select Experience Tier
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {SERVICES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedTier(s.id)}
                      className={`py-3 px-2 text-xs rounded border text-center transition-all ${
                        selectedTier === s.id
                          ? 'bg-[#183123] border-[#c5a86d] text-[#faeed3] font-semibold shadow-inner'
                          : 'bg-[#08100b] border-[#1d3125] text-stone-400 hover:text-stone-200 hover:border-[#2d4b39]'
                      }`}
                    >
                      <div className="font-serif text-sm truncate">{s.name.replace('Companion', '').replace('Indulgence', '')}</div>
                      <div className="text-[10px] text-stone-400 tracking-wider mt-0.5 font-sans">
                        {s.id === 'hourly' ? '$350/hr' : s.id === 'extended' ? '$1,200' : '$2,500'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration Slider (if hourly) */}
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-stone-300 font-medium mb-3">
                  2. Duration Allocation
                </label>
                {selectedTier === 'hourly' ? (
                  <div className="bg-[#08100b] p-4 rounded border border-[#1c3024]">
                    <div className="flex justify-between items-center text-xs text-stone-300 mb-2">
                      <span>Booking Duration:</span>
                      <span className="font-serif text-base text-[#dfca9a] tabular-nums font-semibold">
                        {hourlyHours} Hours
                      </span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={8}
                      step={1}
                      value={hourlyHours}
                      onChange={(e) => setHourlyHours(Number(e.target.value))}
                      className="w-full accent-[#c5a86d] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-stone-500 mt-1">
                      <span>2 hrs (Min)</span>
                      <span>4 hrs</span>
                      <span>6 hrs</span>
                      <span>8 hrs</span>
                    </div>
                  </div>
                ) : selectedTier === 'extended' ? (
                  <div className="bg-[#08100b] p-4 rounded border border-[#1c3024] flex items-center justify-between">
                    <div>
                      <div className="text-xs text-stone-200 font-medium">The Extended Rendezvous</div>
                      <div className="text-[11px] text-stone-400">Up to 4 hours of dinner &amp; continuous intimacy</div>
                    </div>
                    <span className="text-xs font-semibold text-[#c5a86d] uppercase tracking-wider">Fixed Tier</span>
                  </div>
                ) : (
                  <div className="bg-[#08100b] p-4 rounded border border-[#1c3024] flex items-center justify-between">
                    <div>
                      <div className="text-xs text-stone-200 font-medium">Overnight Indulgence</div>
                      <div className="text-[11px] text-stone-400">Full night luxury stay until morning checkout</div>
                    </div>
                    <span className="text-xs font-semibold text-[#c5a86d] uppercase tracking-wider">All-Night</span>
                  </div>
                )}
              </div>
            </div>

            {/* Financial Breakdown Card */}
            <div className="p-6 bg-[#08110c] rounded border border-[#223b2c] grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
              <div>
                <span className="text-[11px] uppercase tracking-[0.18em] text-stone-400 block mb-1">
                  Total Engagement Rate
                </span>
                <span className="font-serif text-3xl sm:text-4xl text-[#f4efe6] tabular-nums font-light">
                  ${totalRate.toLocaleString()}
                </span>
                <span className="text-xs text-stone-500 ml-1">AUD</span>
              </div>

              <div className="border-t sm:border-t-0 sm:border-l border-[#1a2f23] pt-4 sm:pt-0 sm:pl-6">
                <span className="text-[11px] uppercase tracking-[0.18em] text-[#dfca9a] font-medium block mb-1">
                  20% Booking Deposit
                </span>
                <span className="font-serif text-3xl sm:text-4xl text-[#dfca9a] tabular-nums font-light">
                  ${depositRate.toLocaleString()}
                </span>
                <span className="text-xs text-stone-400 block mt-0.5">
                  To secure date (PayID / Crypto)
                </span>
              </div>

              <div className="border-t sm:border-t-0 sm:border-l border-[#1a2f23] pt-4 sm:pt-0 sm:pl-6">
                <span className="text-[11px] uppercase tracking-[0.18em] text-stone-400 block mb-1">
                  80% Bedside Balance
                </span>
                <span className="font-serif text-3xl sm:text-4xl text-stone-200 tabular-nums font-light">
                  ${balanceRate.toLocaleString()}
                </span>
                <span className="text-xs text-stone-400 block mt-0.5">
                  Discreet envelope upon arrival
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#172b1f]">
              <div className="text-xs text-stone-400 font-light flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#c5a86d] shrink-0" />
                <span>Accommodation &amp; luxury hotel booking is arranged directly by client.</span>
              </div>
              <button
                onClick={() => {
                  const chosenHours = selectedTier === 'hourly' ? hourlyHours : selectedTier === 'extended' ? 4 : 8;
                  onSelectPackageForBooking(selectedTier, chosenHours);
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-[#dfca9a] via-[#c5a86d] to-[#b39556] text-[#060b08] text-xs uppercase tracking-[0.18em] font-semibold rounded hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <span>Book This Selection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Secure & Discreet Australian Payment Methods (Section 2) */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-serif text-[#f4efe6] mb-2">
              Secure &amp; Discreet Payment Architecture
            </h3>
            <p className="text-xs text-stone-400 font-light">
              Designed specifically for high-end Australian clientele prioritizing total financial privacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#09130d] border border-[#1b2f23] p-6 rounded-lg flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded bg-[#13281c] border border-[#2b4d3a] flex items-center justify-center text-[#dfca9a] mb-4">
                  <CreditCard className="w-4 h-4" />
                </div>
                <h4 className="text-base font-serif text-[#f4efe6] mb-2">
                  1. Discreet Osko / PayID
                </h4>
                <p className="text-xs text-stone-300 font-light leading-relaxed mb-4">
                  Linked strictly to your dedicated, secure booking identifier (<code className="text-[#dfca9a] font-mono text-[11px] bg-[#0f1f16] px-1 py-0.5 rounded">{settings.payIdIdentifier}</code>).
                </p>
              </div>
              <p className="text-[11px] text-stone-400 italic border-t border-[#16271d] pt-3">
                Your bank statement will only display the business name: <strong>Aura</strong>.
              </p>
            </div>

            <div className="bg-[#09130d] border border-[#1b2f23] p-6 rounded-lg flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded bg-[#13281c] border border-[#2b4d3a] flex items-center justify-center text-[#dfca9a] mb-4">
                  <Lock className="w-4 h-4" />
                </div>
                <h4 className="text-base font-serif text-[#f4efe6] mb-2">
                  2. Cryptocurrency (BTC / USDT)
                </h4>
                <p className="text-xs text-stone-300 font-light leading-relaxed mb-4">
                  The ultimate option for clients seeking absolute anonymity on bank records. Secure wallet address provided upon screening clearance.
                </p>
              </div>
              <p className="text-[11px] text-stone-400 italic border-t border-[#16271d] pt-3">
                Zero banking trail; instantaneous cryptographic confirmation.
              </p>
            </div>

            <div className="bg-[#09130d] border border-[#1b2f23] p-6 rounded-lg flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded bg-[#13281c] border border-[#2b4d3a] flex items-center justify-center text-[#dfca9a] mb-4">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-base font-serif text-[#f4efe6] mb-2">
                  3. Bedside Cash for Balance
                </h4>
                <p className="text-xs text-stone-300 font-light leading-relaxed mb-4">
                  Standard industry protocol: The 20% deposit locks in your date; the remaining 80% is placed in a discreet, unmarked envelope on the hotel bedside table upon arrival.
                </p>
              </div>
              <p className="text-[11px] text-stone-400 italic border-t border-[#16271d] pt-3">
                Settled seamlessly before services commence so the evening is pure romance.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
