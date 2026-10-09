import React, { useState } from 'react';
import { ADELAIDE_VENUES } from '../data/auraData';
import vineyardImg from '../assets/images/aura_adelaide_vineyard_1791453745168.jpg';
import suiteImg from '../assets/images/aura_luxury_suite_1791453755254.jpg';
import { MapPin, Wine, Compass, Sparkles, Building2, Trees } from 'lucide-react';

interface AdelaideVenuesProps {
  onSelectVenueForBooking: (venueId: string) => void;
}

export const AdelaideVenues: React.FC<AdelaideVenuesProps> = ({
  onSelectVenueForBooking
}) => {
  const [activeVenueId, setActiveVenueId] = useState<string>('eos');

  const currentVenue = ADELAIDE_VENUES.find((v) => v.id === activeVenueId) || ADELAIDE_VENUES[0];

  return (
    <section id="venues" className="py-24 bg-[#070e0a] border-b border-[#1c2e24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs tracking-[0.2em] uppercase text-[#c5a86d] font-semibold mb-3">
            <span>Curated Rendezvous</span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span className="text-stone-400 font-normal">World-Class Adelaide Settings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#f4efe6] font-normal leading-tight mb-4">
            Premium Adelaide Venue &amp; Itinerary Guide
          </h2>
          <p className="text-stone-300 font-light text-base leading-relaxed">
            If you desire a public rendezvous or glass of fine wine prior to heading back to your hotel suite for intimate adoration, these world-class locations offer unmatched elegance, romantic lighting, and privacy.
          </p>
        </div>

        {/* Interactive Segmented Selector (Anti-slop: functional tab buttons) */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 p-1.5 bg-[#0a150f] border border-[#1b3123] rounded-lg max-w-2xl mx-auto mb-12">
          {ADELAIDE_VENUES.map((venue) => {
            const isActive = venue.id === activeVenueId;
            return (
              <button
                key={venue.id}
                onClick={() => setActiveVenueId(venue.id)}
                className={`flex-1 py-3 px-4 text-xs tracking-wider uppercase font-medium rounded transition-all whitespace-nowrap flex items-center justify-center gap-2 ${
                  isActive
                    ? 'bg-[#183123] text-[#f5ebd2] shadow-sm border border-[#c5a86d]/50 font-semibold'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-[#0e1d15]'
                }`}
              >
                {venue.id === 'eos' ? (
                  <Building2 className="w-3.5 h-3.5 text-[#c5a86d]" />
                ) : venue.id === 'mayfair' ? (
                  <Compass className="w-3.5 h-3.5 text-[#c5a86d]" />
                ) : (
                  <Trees className="w-3.5 h-3.5 text-[#c5a86d]" />
                )}
                <span>{venue.name.split('&')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Itinerary Stage Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#09130d] border border-[#1d3326] rounded-xl p-6 sm:p-10 shadow-2xl">
          
          {/* Visual Showcase (Images) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-lg overflow-hidden border border-[#233d2e] shadow-lg">
              <img
                src={activeVenueId === 'mount_lofty' ? vineyardImg : suiteImg}
                alt={currentVenue.name}
                referrerPolicy="no-referrer"
                className="w-full h-64 sm:h-72 object-cover object-center filter brightness-[0.88] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060b08] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-stone-200 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#c5a86d]" />
                  {currentVenue.location}
                </span>
                <span className="text-[#dfca9a] font-serif italic text-sm">
                  Exclusive Outcall
                </span>
              </div>
            </div>

            {/* Atmosphere note */}
            <div className="p-4 bg-[#0b1710] rounded border border-[#1b3123] text-xs text-stone-300 font-light leading-relaxed">
              <strong className="text-[#dfca9a] font-medium block mb-1">Ambiance &amp; Vibe:</strong>
              {currentVenue.vibe}
            </div>

            {/* Wine Pairing */}
            <div className="p-4 bg-[#0b1710] rounded border border-[#1b3123] flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#13271c] border border-[#244230] flex items-center justify-center shrink-0">
                <Wine className="w-4 h-4 text-[#c5a86d]" />
              </div>
              <div className="text-xs">
                <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Recommended South Australian Vintage:</span>
                <span className="text-stone-200 font-medium">{currentVenue.recommendedWine}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Step-by-Step Experiential Flow */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#c5a86d] font-semibold mb-2">
                <span>Curated Experience Guide</span>
                <span aria-hidden="true" className="text-stone-600">·</span>
                <span className="text-stone-400 font-normal">{currentVenue.subtitle}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#f4efe6] mb-3">
                {currentVenue.name}
              </h3>
              
              <p className="text-xs text-stone-400 mb-8 italic">
                Best suited for: {currentVenue.bestSuitedFor}
              </p>

              {/* 4 Steps Itinerary List */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3.5 p-3.5 rounded bg-[#0b1610] border border-[#1a3023]">
                  <span className="text-xs font-serif text-[#c5a86d] font-bold px-2 py-0.5 rounded bg-[#122319] border border-[#254231] shrink-0">
                    Step 1
                  </span>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-stone-200 font-medium mb-1">
                      Private Arrival &amp; Greet
                    </h4>
                    <p className="text-xs text-stone-300 font-light leading-relaxed">
                      {currentVenue.itinerary.arrival}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded bg-[#0b1610] border border-[#1a3023]">
                  <span className="text-xs font-serif text-[#c5a86d] font-bold px-2 py-0.5 rounded bg-[#122319] border border-[#254231] shrink-0">
                    Step 2
                  </span>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-stone-200 font-medium mb-1">
                      Intimate Dining Atmosphere
                    </h4>
                    <p className="text-xs text-stone-300 font-light leading-relaxed">
                      {currentVenue.itinerary.dining}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded bg-[#0b1610] border border-[#1a3023]">
                  <span className="text-xs font-serif text-[#c5a86d] font-bold px-2 py-0.5 rounded bg-[#122319] border border-[#254231] shrink-0">
                    Step 3
                  </span>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-stone-200 font-medium mb-1">
                      Sunset Drinks &amp; Conversation
                    </h4>
                    <p className="text-xs text-stone-300 font-light leading-relaxed">
                      {currentVenue.itinerary.drinks}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded bg-[#0b1610] border border-[#1a3023]">
                  <span className="text-xs font-serif text-[#c5a86d] font-bold px-2 py-0.5 rounded bg-[#122319] border border-[#254231] shrink-0">
                    Step 4
                  </span>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-stone-200 font-medium mb-1">
                      Seamless Suite Transition
                    </h4>
                    <p className="text-xs text-stone-300 font-light leading-relaxed">
                      {currentVenue.itinerary.transition}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#182c20] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-stone-400 font-light flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#c5a86d]" />
                Custom private hotels or luxury Airbnbs also welcome.
              </span>
              <button
                onClick={() => onSelectVenueForBooking(currentVenue.id)}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#14281d] hover:bg-[#1b3527] text-stone-200 hover:text-white border border-[#284a36] text-xs uppercase tracking-[0.18em] font-semibold rounded transition-all"
              >
                Select {currentVenue.name.split(' ')[0]} for Rendezvous
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
