import React, { useState, useEffect } from 'react';
import { BookingFormState, ServiceTierId } from '../types';
import { SERVICES, ADELAIDE_VENUES, OPERATIONAL_TEMPLATES } from '../data/auraData';
import { X, ShieldCheck, Sparkles, Lock, CheckCircle2, MessageSquare, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import { useBranding } from '../context/BrandingContext';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: ServiceTierId;
  initialHours?: number;
  initialVenue?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  initialService = 'extended',
  initialHours = 4,
  initialVenue = 'eos'
}) => {
  const { settings } = useBranding();
  const [formData, setFormData] = useState<BookingFormState>({
    fullName: '',
    email: '',
    phone: '',
    contactMethod: 'email',
    selectedService: initialService,
    hoursCount: initialHours,
    date: '',
    time: '19:00',
    hotelVenueType: (initialVenue as 'eos' | 'mayfair' | 'mount_lofty' | 'custom') || 'eos',
    customHotelName: '',
    roomNumber: '',
    hasConfirmedReservation: true,
    specialDesires: '',
    boundariesOrHealthNotes: '',
    verificationMethod: 'social',
    socialLink: '',
    idFileName: '',
    paymentMethod: 'payid',
    agreedToTerms: true,
    agreedToScreening: true
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [activeTabAfterSubmit, setActiveTabAfterSubmit] = useState<'sms' | 'email'>('sms');

  // Synchronize state whenever modal opens or props change
  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        selectedService: initialService,
        hoursCount: initialService === 'hourly' ? Math.max(initialHours, 2) : initialService === 'extended' ? 4 : 8,
        hotelVenueType: (initialVenue as any) || prev.hotelVenueType,
      }));
      setFormError(null);
      setIsSubmitted(false);
    }
  }, [isOpen, initialService, initialHours, initialVenue]);

  if (!isOpen) return null;

  // Rate calculation
  let totalRate = 1200;
  if (formData.selectedService === 'hourly') {
    totalRate = formData.hoursCount * 350;
  } else if (formData.selectedService === 'extended') {
    totalRate = 1200;
  } else if (formData.selectedService === 'overnight') {
    totalRate = 2500;
  }
  const deposit = Math.round(totalRate * 0.2);
  const bedsideBalance = totalRate - deposit;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim()) {
      setFormError('Please provide both your preferred name and confidential email address.');
      return;
    }
    setFormError(null);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormError(null);
    setIsSubmitted(false);
    onClose();
  };

  const selectedServiceObj = SERVICES.find((s) => s.id === formData.selectedService);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#09130e] border border-[#233d2e] rounded-xl max-w-3xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#1b2f23] flex items-center justify-between bg-[#070e0a]">
          <div>
            <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#c5a86d] font-semibold">
              <Lock className="w-3 h-3" />
              <span>Strictly Confidential · Encrypted Inquiry</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif text-[#f4efe6]">
              {isSubmitted ? 'Inquiry Dispatched Successfully' : 'Request a Private Encounter'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-[#122319] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-8 overflow-y-auto">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Service & Rate Interactive Selection Ribbon */}
              <div className="p-4 sm:p-5 rounded-lg bg-[#0c1811] border border-[#1d3326] space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-[#dfca9a] font-semibold">
                      Selected Experience Tier:
                    </span>
                    <span className="text-[11px] text-stone-400 font-light">
                      Tap any tier to switch
                    </span>
                  </div>

                  {/* 3 Tier Selector Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {SERVICES.map((s) => {
                      const isCurrent = formData.selectedService === s.id;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              selectedService: s.id,
                              hoursCount: s.id === 'hourly' ? Math.max(formData.hoursCount, 2) : s.id === 'extended' ? 4 : 8,
                            });
                          }}
                          className={`p-3 rounded border text-left transition-all ${
                            isCurrent
                              ? 'bg-[#183123] border-[#c5a86d] text-[#faedd0] ring-1 ring-[#c5a86d]/40 shadow-sm'
                              : 'bg-[#08110b] border-[#1d3326] text-stone-400 hover:text-stone-200 hover:border-[#2b4c38]'
                          }`}
                        >
                          <div className="font-serif text-sm font-medium leading-snug">{s.name}</div>
                          <div className="text-[11px] text-[#dfca9a] font-sans mt-0.5">
                            {s.id === 'hourly' ? '$350 / hr (Min 2h)' : s.id === 'extended' ? '$1,200 (Up to 4h)' : '$2,500 (Overnight)'}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* If Hourly is selected, show duration selector */}
                {formData.selectedService === 'hourly' && (
                  <div className="p-3 bg-[#08110b] rounded border border-[#1a2f23] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-xs text-stone-300">
                      <span>Duration Allocation: </span>
                      <strong className="text-[#dfca9a] font-serif text-sm">{formData.hoursCount} Hours</strong>
                      <span className="text-stone-500 text-[11px] ml-1">($350/hr · minimum 2 hours)</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {[2, 3, 4, 5, 6, 8].map((hrs) => (
                        <button
                          key={hrs}
                          type="button"
                          onClick={() => setFormData({ ...formData, hoursCount: hrs })}
                          className={`px-3 py-1 text-xs rounded border transition-colors ${
                            formData.hoursCount === hrs
                              ? 'bg-[#c5a86d] text-[#060b08] font-semibold border-[#c5a86d]'
                              : 'bg-[#122319] text-stone-300 border-[#22392c] hover:border-[#c5a86d]/60'
                          }`}
                        >
                          {hrs} hrs
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dynamic Rate & Deposit Breakdown Bar */}
                <div className="pt-3 border-t border-[#1a2f23] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="text-stone-300 font-light">
                    <span className="text-stone-400">Total Investment: </span>
                    <strong className="text-base font-serif text-[#f4efe6] font-normal tabular-nums">${totalRate.toLocaleString()} AUD</strong>
                  </div>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="text-[#dfca9a]">
                      20% Deposit: <strong className="tabular-nums">${deposit.toLocaleString()} AUD</strong>
                    </span>
                    <span className="text-stone-600">·</span>
                    <span className="text-stone-300">
                      80% Bedside Balance: <strong className="tabular-nums">${bedsideBalance.toLocaleString()} AUD</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Step 1: Personal Contact Details */}
              <div>
                <h4 className="text-xs uppercase tracking-[0.18em] text-[#dfca9a] font-semibold mb-3 flex items-center gap-2">
                  <span>1. Confidential Contact</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-stone-300 font-medium mb-1">
                      Preferred Name / Alias *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#060b08] border border-[#1d3326] rounded text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#c5a86d]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-stone-300 font-medium mb-1">
                      Private Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. eleanor.private@proton.me"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#060b08] border border-[#1d3326] rounded text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#c5a86d]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-stone-300 font-medium mb-1">
                      Phone Number (For SMS / Signal)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +61 400 000 000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#060b08] border border-[#1d3326] rounded text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#c5a86d]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-stone-300 font-medium mb-1">
                      Preferred Communication Mode
                    </label>
                    <select
                      value={formData.contactMethod}
                      onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#060b08] border border-[#1d3326] rounded text-stone-200 focus:outline-none focus:border-[#c5a86d]"
                    >
                      <option value="email">Discreet Email (Proton / Encrypted)</option>
                      <option value="signal">Signal Messenger (Ultra Secure)</option>
                      <option value="sms">Direct SMS</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 2: Date, Time & Venue */}
              <div>
                <h4 className="text-xs uppercase tracking-[0.18em] text-[#dfca9a] font-semibold mb-3">
                  2. Encounter Timing &amp; Hotel Location
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-stone-300 font-medium mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#060b08] border border-[#1d3326] rounded text-stone-200 focus:outline-none focus:border-[#c5a86d]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-stone-300 font-medium mb-1">
                      Preferred Start Time
                    </label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#060b08] border border-[#1d3326] rounded text-stone-200 focus:outline-none focus:border-[#c5a86d]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-stone-300 font-medium mb-1">
                      Hotel Suite Venue
                    </label>
                    <select
                      value={formData.hotelVenueType}
                      onChange={(e) => setFormData({ ...formData, hotelVenueType: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#060b08] border border-[#1d3326] rounded text-stone-200 focus:outline-none focus:border-[#c5a86d]"
                    >
                      <option value="eos">Eos by SkyCity (North Terrace)</option>
                      <option value="mayfair">The Mayfair Hotel (King William St)</option>
                      <option value="mount_lofty">Mount Lofty House (Adelaide Hills)</option>
                      <option value="custom">Other Upscale Hotel / Private Residence</option>
                    </select>
                  </div>
                </div>

                {formData.hotelVenueType === 'custom' && (
                  <div className="mb-4">
                    <label className="block text-xs text-stone-300 font-medium mb-1">
                      Custom Luxury Hotel / Accommodation Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sofitel Adelaide or Private Luxury Villa"
                      value={formData.customHotelName}
                      onChange={(e) => setFormData({ ...formData, customHotelName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#060b08] border border-[#1d3326] rounded text-stone-200 focus:outline-none focus:border-[#c5a86d]"
                    />
                  </div>
                )}
              </div>

              {/* Step 3: Screening Verification */}
              <div className="p-4 bg-[#0a150f] rounded-lg border border-[#1e3427]">
                <h4 className="text-xs uppercase tracking-[0.18em] text-[#dfca9a] font-semibold mb-2 flex items-center justify-between">
                  <span>3. Confidential Screening Verification</span>
                  <span className="text-[10px] text-stone-400 font-normal normal-case">Strictly confidential</span>
                </h4>
                <p className="text-[11px] text-stone-300 font-light leading-relaxed mb-3">
                  As detailed in our safety guidelines, please provide either a verifiable social profile or upload a valid ID photo matching your booking name. It is reviewed and permanently deleted immediately after verification.
                </p>

                <div className="flex gap-4 mb-3">
                  <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer">
                    <input
                      type="radio"
                      name="verif"
                      checked={formData.verificationMethod === 'social'}
                      onChange={() => setFormData({ ...formData, verificationMethod: 'social' })}
                      className="accent-[#c5a86d]"
                    />
                    <span>LinkedIn / Social Profile Link</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer">
                    <input
                      type="radio"
                      name="verif"
                      checked={formData.verificationMethod === 'id_upload'}
                      onChange={() => setFormData({ ...formData, verificationMethod: 'id_upload' })}
                      className="accent-[#c5a86d]"
                    />
                    <span>Confidential ID Upload</span>
                  </label>
                </div>

                {formData.verificationMethod === 'social' ? (
                  <input
                    type="url"
                    placeholder="https://www.linkedin.com/in/yourprofile or Instagram"
                    value={formData.socialLink}
                    onChange={(e) => setFormData({ ...formData, socialLink: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-[#060b08] border border-[#1d3326] rounded text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#c5a86d]"
                  />
                ) : (
                  <div className="flex items-center gap-3">
                    <label className="px-3 py-2 bg-[#14281c] hover:bg-[#1a3325] text-stone-200 text-xs rounded border border-[#2b4c38] cursor-pointer transition-colors">
                      <span>Choose ID Image / Document</span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setFormData({ ...formData, idFileName: file.name });
                        }}
                      />
                    </label>
                    <span className="text-xs text-stone-400">
                      {formData.idFileName || 'No file selected (driver licence or passport)'}
                    </span>
                  </div>
                )}
              </div>

              {/* Step 4: Preferences, Desires & Boundaries */}
              <div>
                <h4 className="text-xs uppercase tracking-[0.18em] text-[#dfca9a] font-semibold mb-2">
                  4. Intimacy Desires, Boundaries &amp; Special Touches
                </h4>
                <textarea
                  rows={3}
                  placeholder="Share what makes you feel adored: pacing, sensual massage focus, conversation topics, special fantasies, or specific boundaries..."
                  value={formData.specialDesires}
                  onChange={(e) => setFormData({ ...formData, specialDesires: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#060b08] border border-[#1d3326] rounded text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#c5a86d]"
                />
              </div>

              {/* Agreements Checkboxes */}
              <div className="space-y-2 pt-2 border-t border-[#182c20]">
                {formError && (
                  <div className="p-3 bg-red-950/70 border border-red-700/60 rounded text-xs text-red-200 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}
                <label className="flex items-start gap-2.5 text-xs text-stone-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreedToTerms}
                    onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                    className="mt-0.5 accent-[#c5a86d]"
                  />
                  <span>
                    I confirm that I am a consenting adult and agree to the <strong>Terms &amp; Conditions</strong>, including client accommodation coverage and mutual respect standards.
                  </span>
                </label>
                <label className="flex items-start gap-2.5 text-xs text-stone-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreedToScreening}
                    onChange={(e) => setFormData({ ...formData, agreedToScreening: e.target.checked })}
                    className="mt-0.5 accent-[#c5a86d]"
                  />
                  <span>
                    I understand that a <strong>20% deposit ($AUD)</strong> is required upon screening clearance to reserve the companion on the calendar.
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[11px] text-stone-400 font-light flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#c5a86d]" />
                  Encrypted transmission directly to private ProtonMail.
                </span>

                <button
                  type="submit"
                  disabled={!formData.agreedToTerms || !formData.agreedToScreening}
                  className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#dfca9a] via-[#c5a86d] to-[#b39556] text-[#060b08] text-xs uppercase tracking-[0.18em] font-semibold rounded hover:brightness-110 active:brightness-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-[#c5a86d]/20 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Transmit Confidential Inquiry</span>
                </button>
              </div>

            </form>
          ) : (
            /* Post-Submission Automated Response Simulator */
            <div className="space-y-6">
              
              <div className="p-5 rounded-lg bg-[#0e2117] border border-[#2b4c38] flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1b3a29] flex items-center justify-center text-[#dfca9a] shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-[#c5a86d]" />
                </div>
                <div>
                  <h4 className="text-base font-serif text-[#f4efe6] font-medium">
                    Thank you, {formData.fullName}. Your confidential inquiry is securely logged.
                  </h4>
                  <p className="text-xs text-stone-300 font-light mt-0.5">
                    Our automated infrastructure has activated instant confirmation workflows:
                  </p>
                </div>
              </div>

              {/* Tabs to inspect what was simulated (Section 5 Blueprint) */}
              <div>
                <div className="flex border-b border-[#1b2f23] mb-4">
                  <button
                    onClick={() => setActiveTabAfterSubmit('sms')}
                    className={`py-2 px-4 text-xs uppercase tracking-wider font-medium flex items-center gap-2 border-b-2 transition-all ${
                      activeTabAfterSubmit === 'sms'
                        ? 'border-[#c5a86d] text-[#dfca9a] font-semibold'
                        : 'border-transparent text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Automated SMS Delivered</span>
                  </button>
                  <button
                    onClick={() => setActiveTabAfterSubmit('email')}
                    className={`py-2 px-4 text-xs uppercase tracking-wider font-medium flex items-center gap-2 border-b-2 transition-all ${
                      activeTabAfterSubmit === 'email'
                        ? 'border-[#c5a86d] text-[#dfca9a] font-semibold'
                        : 'border-transparent text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Encrypted Inquiry Email Sent</span>
                  </button>
                </div>

                {activeTabAfterSubmit === 'sms' ? (
                  <div className="bg-[#060b08] p-5 rounded-lg border border-[#1b3124] max-w-lg mx-auto">
                    <div className="flex items-center justify-between text-[11px] text-stone-400 pb-3 mb-3 border-b border-[#16271d]">
                      <span>Instant SMS Notification to {formData.phone || '+61 4XX XXX XXX'}</span>
                      <span className="text-[#c5a86d] font-mono">Delivered Just Now</span>
                    </div>
                    <div className="bg-[#122319] p-4 rounded-xl rounded-tl-sm border border-[#234230] text-xs text-stone-200 leading-relaxed">
                      &ldquo;{OPERATIONAL_TEMPLATES.automatedSms.body}&rdquo;
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#060b08] p-5 rounded-lg border border-[#1b3124] space-y-3 font-mono text-xs">
                    <div className="text-stone-400 text-[11px] pb-2 border-b border-[#16271d]">
                      <div>From: <span className="text-[#dfca9a]">{settings.contactEmail}</span></div>
                      <div>To: <span className="text-stone-200">{formData.email}</span></div>
                      <div>Subject: <span className="text-stone-200">{OPERATIONAL_TEMPLATES.inquiryEmail.subject}</span></div>
                    </div>
                    <pre className="whitespace-pre-wrap font-sans text-xs text-stone-300 leading-relaxed">
                      {OPERATIONAL_TEMPLATES.inquiryEmail.body(formData.fullName, selectedServiceObj?.name || 'Selected Encounter')}
                    </pre>
                  </div>
                )}
              </div>

              {/* Financial Booking Recap */}
              <div className="p-4 bg-[#0a150f] rounded border border-[#1d3326] flex items-center justify-between text-xs text-stone-300">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Calculated Rates:</span>
                  <span>Total: <strong>${totalRate} AUD</strong> · 20% Deposit: <strong>${deposit} AUD</strong> (Due on approval)</span>
                </div>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-[#152a1e] hover:bg-[#1d3829] text-stone-200 text-xs font-semibold rounded border border-[#2b4c37] transition-colors"
                >
                  Done &amp; Close
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
