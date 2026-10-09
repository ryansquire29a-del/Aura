import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutAndSpecialties } from './components/AboutAndSpecialties';
import { RatesAndCalculator } from './components/RatesAndCalculator';
import { AdelaideVenues } from './components/AdelaideVenues';
import { ScreeningAndTerms } from './components/ScreeningAndTerms';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { InquiryModal } from './components/InquiryModal';
import { OperatorSuite } from './components/OperatorSuite';
import { PhotoManagerModal } from './components/PhotoManagerModal';
import { OperatorAccessModal } from './components/OperatorAccessModal';
import { BrandingProvider } from './context/BrandingContext';
import { ServiceTierId } from './types';
import { Lock, ArrowRight } from 'lucide-react';

function AppContent() {
  const [activeView, setActiveView] = useState<'client' | 'operator'>('client');
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState<boolean>(false);
  const [isPhotoManagerOpen, setIsPhotoManagerOpen] = useState<boolean>(false);
  const [isAccessModalOpen, setIsAccessModalOpen] = useState<boolean>(false);
  const [isOperatorAuthenticated, setIsOperatorAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('aura_operator_authenticated') === 'true';
    } catch {
      return false;
    }
  });

  const [selectedService, setSelectedService] = useState<ServiceTierId>('extended');
  const [selectedHours, setSelectedHours] = useState<number>(4);
  const [selectedVenue, setSelectedVenue] = useState<string>('eos');

  // Handle URL parameters and keyboard shortcuts for discreet operator entry
  useEffect(() => {
    // Check URL parameters for direct operator link
    const params = new URLSearchParams(window.location.search);
    if (params.get('operator') === 'true' || params.get('ops') === '1' || params.get('portal') === '1') {
      if (isOperatorAuthenticated) {
        setActiveView('operator');
      } else {
        setIsAccessModalOpen(true);
      }
    }

    // Keyboard shortcut (Alt + O or Ctrl + Shift + O)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && e.key.toLowerCase() === 'o') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'o')) {
        e.preventDefault();
        handleTriggerOperatorPortal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOperatorAuthenticated]);

  const handleTriggerOperatorPortal = () => {
    if (isOperatorAuthenticated) {
      setActiveView((prev) => (prev === 'operator' ? 'client' : 'operator'));
    } else {
      setIsAccessModalOpen(true);
    }
  };

  const handleOperatorUnlocked = () => {
    setIsOperatorAuthenticated(true);
    setIsAccessModalOpen(false);
    setActiveView('operator');
  };

  const handleLockOperator = () => {
    try {
      localStorage.removeItem('aura_operator_authenticated');
    } catch {}
    setIsOperatorAuthenticated(false);
    setActiveView('client');
  };

  const handleOpenInquiry = () => {
    setIsInquiryModalOpen(true);
  };

  const handleSelectPackageForBooking = (tier: ServiceTierId, hours: number) => {
    setSelectedService(tier);
    setSelectedHours(hours);
    setIsInquiryModalOpen(true);
  };

  const handleSelectVenueForBooking = (venueId: string) => {
    setSelectedVenue(venueId);
    setIsInquiryModalOpen(true);
  };

  const handleExploreRates = () => {
    const ratesEl = document.getElementById('rates');
    if (ratesEl) {
      ratesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#060b08] text-stone-200 selection:bg-[#c5a86d]/30 selection:text-[#faedd0]">
      {/* Top Bar Navigation (Clean luxury nav; NO operator toggle on client view) */}
      <Navbar
        activeView={activeView}
        onViewChange={setActiveView}
        onOpenInquiry={handleOpenInquiry}
        onTriggerOperatorAccess={handleTriggerOperatorPortal}
      />

      {/* Main Viewport */}
      {activeView === 'client' ? (
        <main>
          {/* Hero Section (No photo edit boxes on client view) */}
          <HeroSection
            onOpenInquiry={handleOpenInquiry}
            onExploreRates={handleExploreRates}
          />

          {/* Section 1: About Me & Sensual Specialties */}
          <AboutAndSpecialties
            onOpenInquiry={handleOpenInquiry}
          />

          {/* Section 2: Services, Rates, Calculator & Australian Payment Methods */}
          <RatesAndCalculator
            onSelectPackageForBooking={handleSelectPackageForBooking}
          />

          {/* Section 8: Adelaide Luxury Venue & Itinerary Guide */}
          <AdelaideVenues
            onSelectVenueForBooking={handleSelectVenueForBooking}
          />

          {/* Section 3: Screening Policy & Website Terms & Conditions */}
          <ScreeningAndTerms />

          {/* Section 6: Client FAQ */}
          <FaqSection onOpenInquiry={handleOpenInquiry} />

          {/* Footer (with discreet operator portal link) */}
          <Footer
            onOpenInquiry={handleOpenInquiry}
            onOpenOperatorSuite={handleTriggerOperatorPortal}
          />

          {/* Subtle floating badge for the operator when authenticated on their personal device previewing client view */}
          {isOperatorAuthenticated && (
            <div className="fixed bottom-4 right-4 z-40 bg-[#09130e]/95 backdrop-blur-md border border-[#274834] rounded-full shadow-2xl py-1.5 px-3.5 flex items-center gap-2.5 text-xs text-stone-300 animate-in fade-in">
              <button
                type="button"
                onClick={() => setActiveView('operator')}
                className="text-[#dfca9a] hover:text-white flex items-center gap-1.5 font-medium transition-colors"
                title="Return to Companion Operational Command Center"
              >
                <Lock className="w-3.5 h-3.5 text-[#c5a86d]" />
                <span>Command Center</span>
              </button>
              <span className="text-stone-600 select-none">|</span>
              <button
                type="button"
                onClick={handleLockOperator}
                className="text-stone-400 hover:text-rose-300 text-[11px] transition-colors"
                title="Lock session and hide operator shortcuts"
              >
                Lock
              </button>
            </div>
          )}
        </main>
      ) : (
        /* Section 3, 4, 5, 7, 9 Companion Operational Command Center */
        <OperatorSuite
          onReturnToClientView={() => setActiveView('client')}
          onOpenPhotoManagerModal={() => setIsPhotoManagerOpen(true)}
          onLock={handleLockOperator}
        />
      )}

      {/* Interactive Booking & Confidential Inquiry Modal with Automated Response Simulator */}
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        initialService={selectedService}
        initialHours={selectedHours}
        initialVenue={selectedVenue}
      />

      {/* Floating Photo & Contact Settings Modal (Accessible via Operator Suite) */}
      <PhotoManagerModal
        isOpen={isPhotoManagerOpen}
        onClose={() => setIsPhotoManagerOpen(false)}
      />

      {/* Companion Access PIN Modal */}
      <OperatorAccessModal
        isOpen={isAccessModalOpen}
        onClose={() => setIsAccessModalOpen(false)}
        onSuccess={handleOperatorUnlocked}
      />
    </div>
  );
}

export function App() {
  return (
    <BrandingProvider>
      <AppContent />
    </BrandingProvider>
  );
}

export default App;
