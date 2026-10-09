import React, { useState, useEffect, useRef } from 'react';
import {
  BuddySystemState,
  LuxuryEssentialItem
} from '../types';
import {
  LUXURY_ESSENTIALS_CHECKLIST,
  PRE_DATE_ROUTINE,
  OPERATIONAL_TEMPLATES
} from '../data/auraData';
import {
  ShieldAlert,
  Clock,
  CheckSquare,
  Sparkles,
  PhoneCall,
  Copy,
  Check,
  Send,
  Hotel,
  UserCheck,
  MessageCircle,
  FileText,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Lock,
  ShieldCheck,
  ArrowRight,
  Camera,
  Upload,
  Mail,
  RefreshCw,
  Globe,
  Wifi,
  ExternalLink,
  Shield,
  Info
} from 'lucide-react';
import { useBranding } from '../context/BrandingContext';

interface OperatorSuiteProps {
  onReturnToClientView: () => void;
  onOpenPhotoManagerModal?: () => void;
  onLock?: () => void;
}

export const OperatorSuite: React.FC<OperatorSuiteProps> = ({
  onReturnToClientView,
  onOpenPhotoManagerModal,
  onLock
}) => {
  const [activeTab, setActiveTab] = useState<'buddy' | 'photos' | 'checklist' | 'prep' | 'templates' | 'anonymity' | 'manual'>('photos');
  const { settings, updateSettings, uploadPhoto, applyPhotoEverywhere, resetToDefaults } = useBranding();
  const [photoUploadMsg, setPhotoUploadMsg] = useState<string | null>(null);
  const [editingEmail, setEditingEmail] = useState(settings.contactEmail);
  const [editingPhone, setEditingPhone] = useState(settings.contactPhone);
  const [editingPayId, setEditingPayId] = useState(settings.payIdIdentifier);
  const masterInputRef = useRef<HTMLInputElement>(null);
  const portraitInputRef = useRef<HTMLInputElement>(null);
  const loungeInputRef = useRef<HTMLInputElement>(null);
  const heroInputRef = useRef<HTMLInputElement>(null);

  // 1. Buddy System State
  const [buddyState, setBuddyState] = useState<BuddySystemState>({
    clientName: 'Victoria M.',
    clientPhone: '+61 412 889 001',
    hotelName: 'Eos by SkyCity, Adelaide',
    roomNumber: 'Suite 1408',
    scheduledDurationHours: 4,
    scheduledEndTime: '23:00',
    status: 'pre_booking',
    buddyPhone: '+61 488 221 443',
    extensionMinutes: 0
  });

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [timerMinutesRemaining, setTimerMinutesRemaining] = useState<number>(240); // 4 hours in minutes
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  // Timer tick simulation
  useEffect(() => {
    let interval: any;
    if (isTimerActive && timerMinutesRemaining > -30) {
      interval = setInterval(() => {
        setTimerMinutesRemaining((prev) => {
          const next = prev - 1;
          if (next === 0 && buddyState.status !== 'safely_checked_out') {
            setBuddyState((s) => ({ ...s, status: 'overdue' }));
          }
          return next;
        });
      }, 3000); // accelerated 3-sec interval for demo
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timerMinutesRemaining, buddyState.status]);

  // Copy helper with safe iframe fallback
  const handleCopy = (text: string, key: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2000);
      }).catch(() => {
        fallbackCopy(text, key);
      });
    } else {
      fallbackCopy(text, key);
    }
  };

  const fallbackCopy = (text: string, key: string) => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (e) {
      console.warn('Clipboard copy could not be executed:', e);
    }
  };

  // 2. Checklist State
  const [checklistItems, setChecklistItems] = useState<LuxuryEssentialItem[]>(LUXURY_ESSENTIALS_CHECKLIST);
  const toggleCheckItem = (id: string) => {
    setChecklistItems((items) =>
      items.map((it) => (it.id === id ? { ...it, isPacked: !it.isPacked } : it))
    );
  };
  const packedCount = checklistItems.filter((i) => i.isPacked).length;

  // 3. Prep Routine State
  const [prepProgress, setPrepProgress] = useState<Record<string, boolean>>({});
  const togglePrepSubtask = (key: string) => {
    setPrepProgress((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Buddy text templates
  const preBookingText = `[AURA SAFETY DISPATCH]\nPre-Booking Notice:\nClient: ${buddyState.clientName}\nPhone: ${buddyState.clientPhone}\nHotel: ${buddyState.hotelName}\nRoom: ${buddyState.roomNumber}\nScheduled Duration: ${buddyState.scheduledDurationHours} hrs\nTarget Checkout: ${buddyState.scheduledEndTime}`;
  const insideText = `[AURA CHECK-IN]\nI am inside ${buddyState.hotelName}, Room ${buddyState.roomNumber}. Everything looks good and comfortable. Expected checkout is ${buddyState.scheduledEndTime}. I will text you at that time.`;
  const extensionText = `[AURA EXTENSION]\nExtending booking with client by ${buddyState.extensionMinutes || 60} mins. New target check-out time is ${buddyState.scheduledEndTime}.`;
  const checkOutText = `[AURA SAFELY COMPLETED]\nI have safely departed the room and exited ${buddyState.hotelName}. Booking concluded successfully. All good!`;

  return (
    <div className="min-h-screen bg-[#060b08] text-stone-200">
      
      {/* Operator Sub-Header */}
      <div className="bg-[#09130d] border-b border-[#1c2e24] px-4 sm:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#c5a86d] font-semibold">
              <ShieldAlert className="w-3.5 h-3.5 text-[#c5a86d]" />
              <span>Operational Command Center · Internal Companion Tools</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif text-[#f4efe6] font-normal">
              Aura Launch &amp; Operational Blueprint
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onReturnToClientView}
              className="px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded bg-[#12241a] hover:bg-[#1a3325] text-[#dfca9a] border border-[#2b4d3a] transition-colors"
            >
              ← Back to Client Luxury Portal
            </button>
            {onLock && (
              <button
                onClick={onLock}
                className="px-3.5 py-2 text-xs text-stone-400 hover:text-stone-200 rounded border border-[#233f2e] bg-[#09130d] hover:bg-[#122319] transition-colors flex items-center gap-1.5"
                title="Lock Operator Suite and remove active session"
              >
                <Lock className="w-3.5 h-3.5 text-[#c5a86d]" />
                <span>Lock</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs for Ops tools (Anti-slop: functional tab bar) */}
      <div className="border-b border-[#182b20] bg-[#070e0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex overflow-x-auto gap-2 py-3">
          <button
            onClick={() => setActiveTab('photos')}
            className={`px-4 py-2 text-xs tracking-wider uppercase font-medium rounded transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'photos'
                ? 'bg-[#183123] text-[#f5ebd2] border border-[#c5a86d]/50 font-semibold shadow-sm'
                : 'text-stone-400 hover:text-stone-200 hover:bg-[#0c1811]'
            }`}
          >
            <Camera className="w-3.5 h-3.5 text-[#c5a86d]" />
            <span>My Real Photos &amp; Contacts</span>
          </button>

          <button
            onClick={() => setActiveTab('buddy')}
            className={`px-4 py-2 text-xs tracking-wider uppercase font-medium rounded transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'buddy'
                ? 'bg-[#183123] text-[#f5ebd2] border border-[#c5a86d]/50 font-semibold shadow-sm'
                : 'text-stone-400 hover:text-stone-200 hover:bg-[#0c1811]'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-[#c5a86d]" />
            <span>Buddy System &amp; Safety</span>
          </button>

          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-4 py-2 text-xs tracking-wider uppercase font-medium rounded transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'checklist'
                ? 'bg-[#183123] text-[#f5ebd2] border border-[#c5a86d]/50 font-semibold shadow-sm'
                : 'text-stone-400 hover:text-stone-200 hover:bg-[#0c1811]'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5 text-[#c5a86d]" />
            <span>Luxury Pack Essentials ({packedCount}/{checklistItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('prep')}
            className={`px-4 py-2 text-xs tracking-wider uppercase font-medium rounded transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'prep'
                ? 'bg-[#183123] text-[#f5ebd2] border border-[#c5a86d]/50 font-semibold shadow-sm'
                : 'text-stone-400 hover:text-stone-200 hover:bg-[#0c1811]'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-[#c5a86d]" />
            <span>3-Step Pre-Date Routine</span>
          </button>

          <button
            onClick={() => setActiveTab('templates')}
            className={`px-4 py-2 text-xs tracking-wider uppercase font-medium rounded transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'templates'
                ? 'bg-[#183123] text-[#f5ebd2] border border-[#c5a86d]/50 font-semibold shadow-sm'
                : 'text-stone-400 hover:text-stone-200 hover:bg-[#0c1811]'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#c5a86d]" />
            <span>Communication Templates</span>
          </button>

          <button
            onClick={() => setActiveTab('anonymity')}
            className={`px-4 py-2 text-xs tracking-wider uppercase font-medium rounded transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'anonymity'
                ? 'bg-[#183123] text-[#f5ebd2] border border-[#c5a86d]/50 font-semibold shadow-sm'
                : 'text-stone-400 hover:text-stone-200 hover:bg-[#0c1811]'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-[#c5a86d]" />
            <span>Technical Anonymity</span>
          </button>

          <button
            onClick={() => setActiveTab('manual')}
            className={`px-4 py-2 text-xs tracking-wider uppercase font-medium rounded transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'manual'
                ? 'bg-[#183123] text-[#f5ebd2] border border-[#c5a86d]/50 font-semibold shadow-sm'
                : 'text-stone-400 hover:text-stone-200 hover:bg-[#0c1811]'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#c5a86d]" />
            <span>Complete Manual Blueprint</span>
          </button>
        </div>
      </div>

      {/* Main Tab Viewports */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">

        {/* TAB 0: REAL PHOTOS & BRANDING SETUP */}
        {activeTab === 'photos' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            {/* Header info */}
            <div className="p-6 rounded-xl bg-[#0a150f] border border-[#1c3224] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#c5a86d] font-semibold mb-1">
                  <Camera className="w-3.5 h-3.5 text-[#c5a86d]" />
                  <span>Authentic Identity Management</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-[#f4efe6]">
                  Upload Your Real Photos &amp; Set Live Contacts
                </h3>
                <p className="text-xs text-stone-300 font-light mt-1 max-w-2xl">
                  Replace any placeholder with your authentic photos (<code className="text-[#c5a86d]">IMG_2850.jpeg</code> in the wine cellar or <code className="text-[#c5a86d]">IMG_2801.png</code> in the bespoke suit). Every uploaded photo immediately updates across the entire site.
                </p>
              </div>

              <div className="flex items-center gap-2 self-start md:self-auto">
                {onOpenPhotoManagerModal && (
                  <button
                    type="button"
                    onClick={onOpenPhotoManagerModal}
                    className="px-3.5 py-2 text-xs text-[#dfca9a] hover:text-white rounded border border-[#2b4d3a] bg-[#122319] hover:bg-[#1a3325] flex items-center gap-1.5 transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Quick File Manager</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={resetToDefaults}
                  className="px-3.5 py-2 text-xs text-stone-400 hover:text-stone-200 rounded border border-[#233f2e] bg-[#0c1811] flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset to Defaults</span>
                </button>
              </div>
            </div>

            {photoUploadMsg && (
              <div className="p-4 rounded-lg bg-[#0e2417] border border-[#2b5239] text-xs text-[#dfca9a] flex items-center gap-2">
                <Check className="w-4 h-4 text-[#c5a86d] shrink-0" />
                <span>{photoUploadMsg}</span>
              </div>
            )}

            {/* Master Photo Synchronization Banner */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-[#12281a] via-[#0f2115] to-[#0a160e] border border-[#2e5e3f] flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-lg">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#c5a86d]" />
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#f4efe6]">
                    Set Your Authentic Photo Everywhere
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#1a3826] text-[#dfca9a] border border-[#2e5e3f]">
                    IndexedDB Persistent Vault
                  </span>
                </div>
                <p className="text-xs text-stone-300 font-light max-w-2xl leading-relaxed">
                  Upload a clear portrait of yourself once, and apply it to every image slot across the entire website so that all photos display <strong>only you</strong> with zero random faces. Automatically compressed to crystal-clear high fidelity so it will never disappear after reloads.
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => masterInputRef.current?.click()}
                  className="px-5 py-3 bg-gradient-to-r from-[#dfca9a] via-[#c5a86d] to-[#b39556] text-[#060b08] text-xs uppercase tracking-wider font-bold rounded-lg hover:brightness-110 transition-all flex items-center gap-2 shadow-md hover:shadow-[#c5a86d]/20 active:scale-95"
                >
                  <Upload className="w-4 h-4" />
                  <span>Set My Photo Everywhere</span>
                </button>
                <input
                  ref={masterInputRef}
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setPhotoUploadMsg('Optimizing & applying your photo across all slots...');
                      const ok = await applyPhotoEverywhere(file);
                      setPhotoUploadMsg(ok ? 'Success! Your photo is now active and saved permanently across all slots!' : 'Upload failed');
                      setTimeout(() => setPhotoUploadMsg(null), 4000);
                    }
                  }}
                  className="hidden"
                />
              </div>
            </div>

            {/* 3 Real Photo Slots */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Slot 1: Primary Portrait */}
              <div className="bg-[#09130d] border border-[#1d3326] rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-wider text-[#dfca9a] font-semibold">
                      1. Primary Portrait
                    </span>
                    <span className="text-[10px] text-stone-400">About Me &amp; Presence</span>
                  </div>

                  <div className="aspect-[3/4] rounded-lg overflow-hidden border border-[#254231] bg-[#050806] mb-4 relative group">
                    <img
                      src={settings.portraitPhoto}
                      alt="Primary Portrait"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                      <span className="text-xs text-white text-center">Click upload to replace with your photo (e.g. IMG_2801.png)</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-stone-300 font-light mb-4">
                    Shown on the main profile card under &ldquo;Attentive Presence&rdquo;. Best for a clear shot of your face and tailored attire.
                  </p>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => portraitInputRef.current?.click()}
                    className="w-full py-2.5 bg-gradient-to-r from-[#dfca9a] via-[#c5a86d] to-[#b39556] text-[#060b08] text-xs uppercase tracking-wider font-semibold rounded hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Real Portrait</span>
                  </button>
                  <input
                    ref={portraitInputRef}
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setPhotoUploadMsg('Uploading portrait...');
                        const ok = await uploadPhoto('portrait', file);
                        setPhotoUploadMsg(ok ? 'Primary Portrait updated with your photo!' : 'Upload failed');
                        setTimeout(() => setPhotoUploadMsg(null), 3000);
                      }
                    }}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Slot 2: Dining & Wine */}
              <div className="bg-[#09130d] border border-[#1d3326] rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-wider text-[#dfca9a] font-semibold">
                      2. Dining &amp; Wine Lounge
                    </span>
                    <span className="text-[10px] text-stone-400">Conversational Ease</span>
                  </div>

                  <div className="aspect-[3/4] rounded-lg overflow-hidden border border-[#254231] bg-[#050806] mb-4 relative group">
                    <img
                      src={settings.loungePhoto}
                      alt="Dining & Wine"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                      <span className="text-xs text-white text-center">Click upload to replace with your wine photo (IMG_2850.jpeg)</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-stone-300 font-light mb-4">
                    Shown when clients view &ldquo;Dining &amp; Wine&rdquo;. Perfect for your wine cellar or restaurant setting photograph.
                  </p>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => loungeInputRef.current?.click()}
                    className="w-full py-2.5 bg-gradient-to-r from-[#dfca9a] via-[#c5a86d] to-[#b39556] text-[#060b08] text-xs uppercase tracking-wider font-semibold rounded hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Wine/Lounge Photo</span>
                  </button>
                  <input
                    ref={loungeInputRef}
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setPhotoUploadMsg('Uploading lounge photo...');
                        const ok = await uploadPhoto('lounge', file);
                        setPhotoUploadMsg(ok ? 'Dining & Wine photo updated with your photo!' : 'Upload failed');
                        setTimeout(() => setPhotoUploadMsg(null), 3000);
                      }
                    }}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Slot 3: Hero Banner */}
              <div className="bg-[#09130d] border border-[#1d3326] rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-wider text-[#dfca9a] font-semibold">
                      3. Hero Banner
                    </span>
                    <span className="text-[10px] text-stone-400">Homepage Backdrop</span>
                  </div>

                  <div className="aspect-[3/4] rounded-lg overflow-hidden border border-[#254231] bg-[#050806] mb-4 relative group">
                    <img
                      src={settings.heroPhoto}
                      alt="Hero Banner"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                      <span className="text-xs text-white text-center">Click upload to replace homepage backdrop</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-stone-300 font-light mb-4">
                    The grand visual across the top of the homepage. You can upload either your wine or suit photo here.
                  </p>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => heroInputRef.current?.click()}
                    className="w-full py-2.5 bg-gradient-to-r from-[#dfca9a] via-[#c5a86d] to-[#b39556] text-[#060b08] text-xs uppercase tracking-wider font-semibold rounded hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Hero Backdrop</span>
                  </button>
                  <input
                    ref={heroInputRef}
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setPhotoUploadMsg('Uploading hero photo...');
                        const ok = await uploadPhoto('hero', file);
                        setPhotoUploadMsg(ok ? 'Hero banner updated with your photo!' : 'Upload failed');
                        setTimeout(() => setPhotoUploadMsg(null), 3000);
                      }
                    }}
                    className="hidden"
                  />
                </div>
              </div>

            </div>

            {/* Email & Communication Setup Section */}
            <div className="bg-[#09130d] border border-[#1d3326] rounded-xl p-6 space-y-5">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#c5a86d]" />
                <h4 className="text-sm font-serif text-[#f4efe6]">
                  Active Communications &amp; Registered Bank PayID
                </h4>
              </div>

              {/* Informational Box celebrating registered account */}
              <div className="p-4 rounded-lg bg-[#0c1811] border border-[#1e3326] space-y-2 text-xs text-stone-300 font-light leading-relaxed">
                <p>
                  <strong className="text-[#dfca9a]">Registered Booking Email &amp; Bank PayID Configured:</strong><br />
                  Your email address and Australian Bank PayID (<code className="text-[#c5a86d]">booking.aurora@proton.me</code>) are connected. When clients pay the 20% deposit via PayID, their Australian banking app displays your business entity name (<strong className="text-[#dfca9a]">Aura</strong>) ensuring absolute financial privacy and discretion.
                </p>
                <p>
                  You can fine-tune or update your active email address, contact phone, or PayID identifier anytime using the fields below:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1">
                    Your Active Booking Email
                  </label>
                  <input
                    type="email"
                    value={editingEmail}
                    onChange={(e) => setEditingEmail(e.target.value)}
                    placeholder="e.g. booking.aurora@proton.me"
                    className="w-full px-3 py-2 text-xs bg-[#060b08] border border-[#1d3326] rounded text-stone-200 focus:outline-none focus:border-[#c5a86d]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1">
                    Your Active Phone / SMS / Signal
                  </label>
                  <input
                    type="text"
                    value={editingPhone}
                    onChange={(e) => setEditingPhone(e.target.value)}
                    placeholder="e.g. +61 400 000 000"
                    className="w-full px-3 py-2 text-xs bg-[#060b08] border border-[#1d3326] rounded text-stone-200 focus:outline-none focus:border-[#c5a86d]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1">
                    Your Active PayID (For 20% Deposits)
                  </label>
                  <input
                    type="text"
                    value={editingPayId}
                    onChange={(e) => setEditingPayId(e.target.value)}
                    placeholder="e.g. bookings.aura@proton.me or phone"
                    className="w-full px-3 py-2 text-xs bg-[#060b08] border border-[#1d3326] rounded text-stone-200 focus:outline-none focus:border-[#c5a86d]"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => {
                    updateSettings({
                      contactEmail: editingEmail.trim(),
                      contactPhone: editingPhone.trim(),
                      payIdIdentifier: editingPayId.trim()
                    });
                    setPhotoUploadMsg('Your real email, phone, and PayID have been saved across the website!');
                    setTimeout(() => setPhotoUploadMsg(null), 3000);
                  }}
                  className="px-6 py-2.5 bg-[#14281c] hover:bg-[#1c3627] text-[#dfca9a] text-xs uppercase tracking-wider font-semibold rounded border border-[#2d4f3b] transition-all"
                >
                  Save Live Contact Settings
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: SAFETY BUDDY SYSTEM PROTOCOL (SECTION 3) */}
        {activeTab === 'buddy' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            {/* Status Banner */}
            <div className={`p-6 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
              buddyState.status === 'overdue'
                ? 'bg-[#290d0d] border-[#6b2525] text-red-200'
                : buddyState.status === 'inside_active'
                ? 'bg-[#0e2417] border-[#295437] text-stone-100'
                : buddyState.status === 'safely_checked_out'
                ? 'bg-[#0d1f14] border-[#1d422a] text-stone-200'
                : 'bg-[#0c1811] border-[#1f3829] text-stone-200'
            }`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                  buddyState.status === 'overdue'
                    ? 'bg-red-950 text-red-400 animate-pulse'
                    : buddyState.status === 'inside_active'
                    ? 'bg-[#163623] text-[#dfca9a]'
                    : 'bg-[#12241a] text-[#c5a86d]'
                }`}>
                  {buddyState.status === 'overdue' ? (
                    <AlertTriangle className="w-6 h-6" />
                  ) : (
                    <ShieldAlert className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold">
                    <span>Active Booking Safety Status:</span>
                    <span className="text-[#dfca9a] font-bold">
                      {buddyState.status === 'pre_booking' && 'Pre-Arrival Prep'}
                      {buddyState.status === 'inside_active' && 'Inside Suite (Active Session)'}
                      {buddyState.status === 'extended' && 'Booking Extended'}
                      {buddyState.status === 'overdue' && '⚠️ 15-MINUTE OVERDUE THRESHOLD EXCEEDED'}
                      {buddyState.status === 'safely_checked_out' && 'Safely Checked Out & Concluded'}
                    </span>
                  </div>
                  <p className="text-xs text-stone-300 font-light mt-0.5">
                    Client: <strong className="text-stone-100">{buddyState.clientName}</strong> · Location: <strong className="text-stone-100">{buddyState.hotelName} ({buddyState.roomNumber})</strong>
                  </p>
                </div>
              </div>

              {/* Status Controls */}
              <div className="flex flex-wrap items-center gap-2">
                {buddyState.status === 'pre_booking' && (
                  <button
                    onClick={() => {
                      setBuddyState({ ...buddyState, status: 'inside_active', checkInTimestamp: new Date().toLocaleTimeString() });
                      setIsTimerActive(true);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-[#dfca9a] via-[#c5a86d] to-[#b39556] text-[#060b08] text-xs font-semibold uppercase tracking-wider rounded hover:brightness-110 flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send &ldquo;I&apos;m In&rdquo; Text</span>
                  </button>
                )}

                {buddyState.status === 'inside_active' && (
                  <>
                    <button
                      onClick={() => {
                        setBuddyState({
                          ...buddyState,
                          status: 'extended',
                          extensionMinutes: buddyState.extensionMinutes + 60,
                          scheduledEndTime: '00:00'
                        });
                        setTimerMinutesRemaining((prev) => prev + 60);
                      }}
                      className="px-3 py-2 bg-[#1b3626] hover:bg-[#234532] text-xs font-medium rounded border border-[#2e573e] text-stone-200 flex items-center gap-1"
                    >
                      <span>+1 Hour Extension</span>
                    </button>
                    <button
                      onClick={() => {
                        setBuddyState({ ...buddyState, status: 'safely_checked_out' });
                        setIsTimerActive(false);
                      }}
                      className="px-4 py-2 bg-[#12281c] hover:bg-[#1a3827] text-xs font-semibold rounded border border-[#2b4d38] text-[#dfca9a] flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a86d]" />
                      <span>Safe Departure Check-Out</span>
                    </button>
                  </>
                )}

                {buddyState.status === 'overdue' && (
                  <button
                    onClick={() => {
                      setBuddyState({ ...buddyState, status: 'safely_checked_out' });
                      setIsTimerActive(false);
                    }}
                    className="px-4 py-2 bg-red-800 hover:bg-red-700 text-xs font-bold text-white rounded flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Clear Alarm (I am Safe)</span>
                  </button>
                )}

                {buddyState.status === 'safely_checked_out' && (
                  <button
                    onClick={() => {
                      setBuddyState({ ...buddyState, status: 'pre_booking', extensionMinutes: 0 });
                      setTimerMinutesRemaining(240);
                    }}
                    className="px-3 py-2 bg-[#122319] hover:bg-[#1a3324] text-xs text-stone-300 rounded border border-[#244230] flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Booking Flow</span>
                  </button>
                )}
              </div>
            </div>

            {/* Overdue Protocol Instruction Alert Box */}
            <div className="p-5 rounded-lg bg-[#0b1610] border border-[#1b3123] text-xs text-stone-300 font-light leading-relaxed">
              <strong className="text-[#dfca9a] font-medium block mb-1">
                The Strict Overdue Protocol (Section 3 Manual):
              </strong>
              If your buddy does not hear from you within <strong>15 minutes</strong> past your scheduled check-out time ({buddyState.scheduledEndTime}), they are instructed to call your phone directly. If you do not answer, they are mandated to call the hotel front desk immediately to request a direct wellness check on room <strong>{buddyState.roomNumber}</strong>.
            </div>

            {/* Active Booking Details & 1-Click Message Generator */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Booking Parameters Form */}
              <div className="lg:col-span-5 bg-[#09130d] border border-[#1d3326] p-6 rounded-xl space-y-4">
                <h3 className="text-base font-serif text-[#f4efe6] pb-2 border-b border-[#182c20]">
                  Booking &amp; Location Parameters
                </h3>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1">
                    Client Full Name
                  </label>
                  <input
                    type="text"
                    value={buddyState.clientName}
                    onChange={(e) => setBuddyState({ ...buddyState, clientName: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#060b08] border border-[#1d3326] rounded text-stone-200"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1">
                    Client Phone Number
                  </label>
                  <input
                    type="text"
                    value={buddyState.clientPhone}
                    onChange={(e) => setBuddyState({ ...buddyState, clientPhone: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#060b08] border border-[#1d3326] rounded text-stone-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1">
                      Hotel Venue
                    </label>
                    <input
                      type="text"
                      value={buddyState.hotelName}
                      onChange={(e) => setBuddyState({ ...buddyState, hotelName: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#060b08] border border-[#1d3326] rounded text-stone-200"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1">
                      Room / Suite #
                    </label>
                    <input
                      type="text"
                      value={buddyState.roomNumber}
                      onChange={(e) => setBuddyState({ ...buddyState, roomNumber: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#060b08] border border-[#1d3326] rounded text-stone-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1">
                      Duration
                    </label>
                    <select
                      value={buddyState.scheduledDurationHours}
                      onChange={(e) => setBuddyState({ ...buddyState, scheduledDurationHours: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-xs bg-[#060b08] border border-[#1d3326] rounded text-stone-200"
                    >
                      <option value={2}>2 Hours ($700)</option>
                      <option value={3}>3 Hours ($1,050)</option>
                      <option value={4}>4 Hours ($1,200 Extended)</option>
                      <option value={8}>Overnight ($2,500)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1">
                      Target Checkout Time
                    </label>
                    <input
                      type="time"
                      value={buddyState.scheduledEndTime}
                      onChange={(e) => setBuddyState({ ...buddyState, scheduledEndTime: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#060b08] border border-[#1d3326] rounded text-stone-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1">
                    Off-Site Buddy Emergency Phone
                  </label>
                  <input
                    type="text"
                    value={buddyState.buddyPhone}
                    onChange={(e) => setBuddyState({ ...buddyState, buddyPhone: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#060b08] border border-[#1d3326] rounded text-stone-200"
                  />
                </div>
              </div>

              {/* Right Column: 1-Click Safety Dispatch SMS Generators */}
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-base font-serif text-[#f4efe6] pb-2 border-b border-[#182c20]">
                  Automated Buddy Text Generators (Click to Copy)
                </h3>

                {/* Pre-Booking Share */}
                <div className="bg-[#09130d] border border-[#1d3326] p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-wider text-[#dfca9a] font-semibold">
                      1. Pre-Booking Share (Send Before Leaving)
                    </span>
                    <button
                      onClick={() => handleCopy(preBookingText, 'pre_booking')}
                      className="px-2.5 py-1 text-[11px] bg-[#14281c] hover:bg-[#1a3325] text-stone-200 rounded border border-[#2b4c38] flex items-center gap-1"
                    >
                      {copiedKey === 'pre_booking' ? <Check className="w-3 h-3 text-[#c5a86d]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'pre_booking' ? 'Copied' : 'Copy Text'}</span>
                    </button>
                  </div>
                  <pre className="text-xs font-mono text-stone-300 bg-[#060b08] p-3 rounded border border-[#182c20] whitespace-pre-wrap leading-relaxed">
                    {preBookingText}
                  </pre>
                </div>

                {/* The "I'm In" Text */}
                <div className="bg-[#09130d] border border-[#1d3326] p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-wider text-[#dfca9a] font-semibold">
                      2. The &ldquo;I&apos;m In&rdquo; Text (Send Moment Door Closes)
                    </span>
                    <button
                      onClick={() => handleCopy(insideText, 'inside')}
                      className="px-2.5 py-1 text-[11px] bg-[#14281c] hover:bg-[#1a3325] text-stone-200 rounded border border-[#2b4c38] flex items-center gap-1"
                    >
                      {copiedKey === 'inside' ? <Check className="w-3 h-3 text-[#c5a86d]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'inside' ? 'Copied' : 'Copy Text'}</span>
                    </button>
                  </div>
                  <pre className="text-xs font-mono text-stone-300 bg-[#060b08] p-3 rounded border border-[#182c20] whitespace-pre-wrap leading-relaxed">
                    {insideText}
                  </pre>
                </div>

                {/* The Extension Rule */}
                <div className="bg-[#09130d] border border-[#1d3326] p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-wider text-[#dfca9a] font-semibold">
                      3. The Extension Rule (Send Before Agreeing to Add Hours)
                    </span>
                    <button
                      onClick={() => handleCopy(extensionText, 'extension')}
                      className="px-2.5 py-1 text-[11px] bg-[#14281c] hover:bg-[#1a3325] text-stone-200 rounded border border-[#2b4c38] flex items-center gap-1"
                    >
                      {copiedKey === 'extension' ? <Check className="w-3 h-3 text-[#c5a86d]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'extension' ? 'Copied' : 'Copy Text'}</span>
                    </button>
                  </div>
                  <pre className="text-xs font-mono text-stone-300 bg-[#060b08] p-3 rounded border border-[#182c20] whitespace-pre-wrap leading-relaxed">
                    {extensionText}
                  </pre>
                </div>

                {/* Safe Completion */}
                <div className="bg-[#09130d] border border-[#1d3326] p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-wider text-[#dfca9a] font-semibold">
                      4. Safe Departure Confirmation
                    </span>
                    <button
                      onClick={() => handleCopy(checkOutText, 'checkout')}
                      className="px-2.5 py-1 text-[11px] bg-[#14281c] hover:bg-[#1a3325] text-stone-200 rounded border border-[#2b4c38] flex items-center gap-1"
                    >
                      {copiedKey === 'checkout' ? <Check className="w-3 h-3 text-[#c5a86d]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'checkout' ? 'Copied' : 'Copy Text'}</span>
                    </button>
                  </div>
                  <pre className="text-xs font-mono text-stone-300 bg-[#060b08] p-3 rounded border border-[#182c20] whitespace-pre-wrap leading-relaxed">
                    {checkOutText}
                  </pre>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LUXURY ESSENTIALS CHECKLIST (SECTION 7) */}
        {activeTab === 'checklist' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-xl bg-[#0a150f] border border-[#1c3224]">
              <div>
                <h3 className="text-xl font-serif text-[#f4efe6]">
                  The Outcall Luxury Essentials Pack-Out Checklist
                </h3>
                <p className="text-xs text-stone-300 font-light mt-1">
                  Pack these items into your sleek, high-end leather overnight bag before departing for the hotel.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#dfca9a] font-medium font-mono">
                  {packedCount} / {checklistItems.length} Packed
                </span>
                <div className="w-32 h-2 rounded-full bg-[#122319] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#dfca9a] to-[#c5a86d] transition-all duration-300"
                    style={{ width: `${(packedCount / checklistItems.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {checklistItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleCheckItem(item.id)}
                  className={`p-5 rounded-lg border cursor-pointer transition-all flex items-start gap-4 select-none ${
                    item.isPacked
                      ? 'bg-[#09150e] border-[#254533]'
                      : 'bg-[#0b100d] border-[#1d2720] opacity-60'
                  }`}
                >
                  <div className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center shrink-0 ${
                    item.isPacked
                      ? 'bg-[#c5a86d] border-[#c5a86d] text-[#060b08]'
                      : 'border-stone-600 bg-transparent'
                  }`}>
                    {item.isPacked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase tracking-wider text-[#c5a86d] font-semibold">
                        {item.category}
                      </span>
                      <span className="text-xs text-stone-400">·</span>
                      <span className="font-serif text-base text-[#f4efe6] font-normal">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 font-light mb-1">
                      {item.description}
                    </p>
                    <p className="text-[11px] text-stone-400 italic font-light">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PRE-DATE PREPARATION ROUTINE (SECTION 9) */}
        {activeTab === 'prep' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            <div className="p-6 rounded-xl bg-[#0a150f] border border-[#1c3224]">
              <h3 className="text-xl font-serif text-[#f4efe6]">
                Pre-Date Mental &amp; Physical Preparation Routine (3-Step Checklist)
              </h3>
              <p className="text-xs text-stone-300 font-light mt-1">
                Implement this strict 3-step preparation routine starting 3 hours before every date to deliver a flawless, high-energy, deeply sensual experience.
              </p>
            </div>

            <div className="space-y-6">
              {PRE_DATE_ROUTINE.map((routine) => (
                <div key={routine.id} className="bg-[#09130d] border border-[#1d3326] rounded-xl p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-[#182c20] gap-2">
                    <div>
                      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#c5a86d] font-semibold">
                        <span className="px-2 py-0.5 rounded bg-[#13271c] border border-[#234230] text-[#dfca9a]">
                          Step {routine.stepNumber}
                        </span>
                        <span>{routine.timing}</span>
                      </div>
                      <h4 className="text-xl font-serif text-[#f4efe6] mt-1">
                        {routine.title}
                      </h4>
                    </div>
                    <p className="text-xs text-stone-400 max-w-sm font-light italic">
                      Objective: {routine.objective}
                    </p>
                  </div>

                  {/* Checklist subtasks */}
                  <div className="space-y-3">
                    {routine.checklist.map((item, idx) => {
                      const key = `${routine.id}_${idx}`;
                      const isDone = !!prepProgress[key];
                      return (
                        <div
                          key={key}
                          onClick={() => togglePrepSubtask(key)}
                          className={`p-3 rounded-lg border text-xs flex items-center gap-3 cursor-pointer select-none transition-colors ${
                            isDone
                              ? 'bg-[#0f2116] border-[#294c37] text-stone-200'
                              : 'bg-[#070e0a] border-[#182c20] text-stone-400 hover:text-stone-300'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                            isDone ? 'bg-[#c5a86d] border-[#c5a86d] text-[#060b08]' : 'border-stone-600 bg-transparent'
                          }`}>
                            {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className={isDone ? 'line-through text-stone-400' : ''}>{item}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CLIENT COMMUNICATION TEMPLATES (SECTION 5) */}
        {activeTab === 'templates' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            <div className="p-6 rounded-xl bg-[#0a150f] border border-[#1c3224]">
              <h3 className="text-xl font-serif text-[#f4efe6]">
                Client Communications &amp; Automated Workflows
              </h3>
              <p className="text-xs text-stone-300 font-light mt-1">
                Precision-engineered templates maintaining elite professionalism, safety boundaries, and high conversion.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Inquiry Email */}
              <div className="bg-[#09130d] border border-[#1d3326] p-6 rounded-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-wider text-[#dfca9a] font-semibold">
                      1. Inquiry Email Reply
                    </span>
                    <button
                      onClick={() => handleCopy(OPERATIONAL_TEMPLATES.inquiryEmail.body('Eleanor', 'The Extended Rendezvous'), 'tpl_email')}
                      className="p-1.5 bg-[#14281c] hover:bg-[#1a3325] text-stone-200 rounded border border-[#2b4c38] text-xs flex items-center gap-1"
                    >
                      {copiedKey === 'tpl_email' ? <Check className="w-3 h-3 text-[#c5a86d]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'tpl_email' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-stone-400 mb-3">
                    Subject: <strong>{OPERATIONAL_TEMPLATES.inquiryEmail.subject}</strong>
                  </p>
                  <pre className="text-xs font-mono text-stone-300 bg-[#060b08] p-3 rounded border border-[#182c20] whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto">
                    {OPERATIONAL_TEMPLATES.inquiryEmail.body('[Client Name]', 'Hourly, Half-Day, or Overnight')}
                  </pre>
                </div>
              </div>

              {/* Instant SMS Reply */}
              <div className="bg-[#09130d] border border-[#1d3326] p-6 rounded-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-wider text-[#dfca9a] font-semibold">
                      2. Automated SMS Reply
                    </span>
                    <button
                      onClick={() => handleCopy(OPERATIONAL_TEMPLATES.automatedSms.body, 'tpl_sms')}
                      className="p-1.5 bg-[#14281c] hover:bg-[#1a3325] text-stone-200 rounded border border-[#2b4c38] text-xs flex items-center gap-1"
                    >
                      {copiedKey === 'tpl_sms' ? <Check className="w-3 h-3 text-[#c5a86d]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'tpl_sms' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-stone-400 mb-3">
                    Dispatched automatically upon web form submission.
                  </p>
                  <pre className="text-xs font-mono text-stone-300 bg-[#060b08] p-3 rounded border border-[#182c20] whitespace-pre-wrap leading-relaxed">
                    &ldquo;{OPERATIONAL_TEMPLATES.automatedSms.body}&rdquo;
                  </pre>
                </div>
              </div>

              {/* Polite Rejection */}
              <div className="bg-[#09130d] border border-[#1d3326] p-6 rounded-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-wider text-[#dfca9a] font-semibold">
                      3. Polite But Firm Rejection
                    </span>
                    <button
                      onClick={() => handleCopy(OPERATIONAL_TEMPLATES.rejectionMessage.body('Client'), 'tpl_reject')}
                      className="p-1.5 bg-[#14281c] hover:bg-[#1a3325] text-stone-200 rounded border border-[#2b4c38] text-xs flex items-center gap-1"
                    >
                      {copiedKey === 'tpl_reject' ? <Check className="w-3 h-3 text-[#c5a86d]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'tpl_reject' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-stone-400 mb-3">
                    Send immediately if a client refuses ID or objects to deposit.
                  </p>
                  <pre className="text-xs font-mono text-stone-300 bg-[#060b08] p-3 rounded border border-[#182c20] whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto">
                    {OPERATIONAL_TEMPLATES.rejectionMessage.body('[Client Name]')}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: TECHNICAL ANONYMITY (SECTION 4) */}
        {activeTab === 'anonymity' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="p-6 rounded-xl bg-[#0a150f] border border-[#1c3224]">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#c5a86d] font-semibold mb-1">
                <ShieldCheck className="w-4 h-4 text-[#c5a86d]" />
                <span>Operational Security (OpSec) Directive</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-[#f4efe6]">
                Technical Anonymity &amp; Privacy Protection Blueprint
              </h3>
              <p className="text-xs text-stone-300 font-light mt-1.5 max-w-3xl leading-relaxed">
                Maintain 100% operational privacy and legal isolation across your digital footprint. Here is exactly what each layer does and how to put them in place.
              </p>
            </div>

            {/* Quick Status Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-lg bg-[#0c1c12] border border-[#2b5239] flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#c5a86d] shrink-0" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-stone-400">1. Email &amp; PayID</div>
                  <div className="text-xs font-semibold text-[#f4efe6]">Configured</div>
                </div>
              </div>
              <div className="p-3.5 rounded-lg bg-[#09130d] border border-[#1d3326] flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-[#dfca9a] shrink-0" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-stone-400">2. Burner / SIM</div>
                  <div className="text-xs font-semibold text-stone-200">Recommended</div>
                </div>
              </div>
              <div className="p-3.5 rounded-lg bg-[#09130d] border border-[#1d3326] flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#dfca9a] shrink-0" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-stone-400">3. WHOIS Privacy</div>
                  <div className="text-xs font-semibold text-stone-200">Guide Below</div>
                </div>
              </div>
              <div className="p-3.5 rounded-lg bg-[#09130d] border border-[#1d3326] flex items-center gap-2.5">
                <Wifi className="w-4 h-4 text-[#dfca9a] shrink-0" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-stone-400">4. Zero-Logs VPN</div>
                  <div className="text-xs font-semibold text-stone-200">Guide Below</div>
                </div>
              </div>
            </div>

            {/* Pillar 1 & 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 1. Secure Encrypted Email */}
              <div className="p-6 rounded-xl bg-[#09130d] border border-[#1d3326] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#dfca9a] font-semibold">
                      <Lock className="w-4 h-4 text-[#c5a86d]" />
                      <span>1. Secure Encrypted Email</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-[#14281c] text-[#dfca9a] border border-[#264a33]">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-stone-300 font-light leading-relaxed mb-3">
                    Your active email is <code className="text-[#dfca9a] font-semibold bg-[#050907] px-1.5 py-0.5 rounded border border-[#1c3224]">booking.aurora@proton.me</code>. 
                    ProtonMail is based under Swiss jurisdiction with zero-access encryption.
                  </p>
                  <div className="text-[11px] text-stone-400 space-y-1 bg-[#060b08] p-3 rounded border border-[#15241b]">
                    <p className="font-semibold text-stone-300">Golden Rule:</p>
                    <p>Never connect your personal recovery mobile number or personal iCloud/Gmail backup to this Proton account.</p>
                  </div>
                </div>
              </div>

              {/* 2. Burner SIM */}
              <div className="p-6 rounded-xl bg-[#09130d] border border-[#1d3326] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#dfca9a] font-semibold">
                      <PhoneCall className="w-4 h-4 text-[#c5a86d]" />
                      <span>2. Prepaid Burner SIM / Dual SIM</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-[#101b13] text-stone-300 border border-[#213828]">
                      Operational
                    </span>
                  </div>
                  <p className="text-xs text-stone-300 font-light leading-relaxed mb-3">
                    Purchase an inexpensive prepaid SIM card (e.g. Amaysim, Boost, or Vodafone prepaid) purchased in cash.
                  </p>
                  <div className="text-[11px] text-stone-400 space-y-1 bg-[#060b08] p-3 rounded border border-[#15241b]">
                    <p className="font-semibold text-stone-300">Golden Rule:</p>
                    <p>Use this dedicated number exclusively for Signal and client SMS. Never use your personal family/everyday phone number.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Deep-Dive: Pillar 3 - WHOIS PRIVACY DOMAIN */}
            <div className="p-6 sm:p-7 rounded-xl bg-[#09130d] border border-[#2b5239] space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1c3525]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#14291c] border border-[#2b5239] flex items-center justify-center">
                    <Globe className="w-4 h-4 text-[#c5a86d]" />
                  </div>
                  <div>
                    <h4 className="text-base font-serif text-[#f4efe6]">
                      3. WHOIS Privacy Domain Registration
                    </h4>
                    <span className="text-[11px] text-stone-400">
                      Hides your real legal name and home address from public ICANN registries
                    </span>
                  </div>
                </div>
                <span className="self-start sm:self-auto px-3 py-1 rounded bg-[#13261a] text-[#dfca9a] border border-[#284f37] text-xs font-semibold">
                  Critical Privacy Shield
                </span>
              </div>

              {/* What is it & Threat */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-light leading-relaxed">
                <div className="bg-[#060b08] p-4 rounded-lg border border-[#182d20] space-y-1.5">
                  <h5 className="font-semibold text-[#dfca9a] uppercase tracking-wider text-[11px]">
                    What is WHOIS &amp; The Threat?
                  </h5>
                  <p className="text-stone-300">
                    By international internet law (ICANN), anyone who registers a domain name (like <code>aurora-companion.com</code>) must provide contact info: <strong>Legal Full Name, Home Residential Address, Phone Number, and Personal Email</strong>.
                  </p>
                  <p className="text-stone-400">
                    Without WHOIS Privacy, any client, ex-partner, or online stalker can search a free database like <code>whois.com</code> and immediately see your real name and street address.
                  </p>
                </div>

                <div className="bg-[#060b08] p-4 rounded-lg border border-[#182d20] space-y-1.5">
                  <h5 className="font-semibold text-[#dfca9a] uppercase tracking-wider text-[11px]">
                    How WHOIS Privacy Protects You
                  </h5>
                  <p className="text-stone-300">
                    WHOIS Privacy masks your real details with an anonymous legal proxy (e.g. <em>&ldquo;Privacy Guardian Inc, PO Box 500...&rdquo;</em>).
                  </p>
                  <p className="text-stone-400">
                    Your real identity, house location, and surname remain 100% confidential and hidden from the public ICANN directory.
                  </p>
                </div>
              </div>

              {/* Action Steps */}
              <div className="space-y-3">
                <h5 className="text-xs uppercase tracking-wider font-semibold text-[#dfca9a]">
                  Exact Action Steps to Get This in Place:
                </h5>
                <ol className="list-decimal list-inside text-xs text-stone-300 space-y-2.5 font-light">
                  <li className="pl-1">
                    <strong className="text-white">Choose a privacy-first registrar:</strong> Go to <strong className="text-[#dfca9a]">Porkbun</strong> (porkbun.com) or <strong className="text-[#dfca9a]">Namecheap</strong> (namecheap.com). Both include <strong>100% FREE WHOIS Privacy for life</strong>. (Avoid GoDaddy, which charges $15+/yr extra for privacy).
                  </li>
                  <li className="pl-1">
                    <strong className="text-white">Search your domain:</strong> Choose a luxury domain (e.g., <code>aurora-rendezvous.com</code> or <code>aurora-companion.com</code>).
                  </li>
                  <li className="pl-1">
                    <strong className="text-white">Verify Privacy is checked at checkout:</strong> On Porkbun/Namecheap, &ldquo;WHOIS Privacy&rdquo; is checked automatically ($0.00). Ensure it is toggled <strong>ON</strong>.
                  </li>
                  <li className="pl-1">
                    <strong className="text-white">Pay securely:</strong> Pay using your PayID card, prepaid card, or standard payment.
                  </li>
                  <li className="pl-1">
                    <strong className="text-white">Verify your shield:</strong> Once purchased, visit <a href="https://www.whois.com/whois" target="_blank" rel="noopener noreferrer" className="text-[#c5a86d] underline hover:text-[#dfca9a]">whois.com/whois</a> and search your new domain. Confirm that the registrant shows <em>&ldquo;Withheld for Privacy&rdquo;</em> and not your real name!
                  </li>
                </ol>
              </div>
            </div>

            {/* Deep-Dive: Pillar 4 - ZERO-LOGS VPN ALWAYS-ON */}
            <div className="p-6 sm:p-7 rounded-xl bg-[#09130d] border border-[#2b5239] space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1c3525]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#14291c] border border-[#2b5239] flex items-center justify-center">
                    <Wifi className="w-4 h-4 text-[#c5a86d]" />
                  </div>
                  <div>
                    <h4 className="text-base font-serif text-[#f4efe6]">
                      4. Zero-Logs VPN Always-On
                    </h4>
                    <span className="text-[11px] text-stone-400">
                      Military-grade encrypted tunnel masking your real Australian IP address &amp; location
                    </span>
                  </div>
                </div>
                <span className="self-start sm:self-auto px-3 py-1 rounded bg-[#13261a] text-[#dfca9a] border border-[#284f37] text-xs font-semibold">
                  Hotel &amp; Network Shield
                </span>
              </div>

              {/* What is it & Threat */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-light leading-relaxed">
                <div className="bg-[#060b08] p-4 rounded-lg border border-[#182d20] space-y-1.5">
                  <h5 className="font-semibold text-[#dfca9a] uppercase tracking-wider text-[11px]">
                    What is a Zero-Logs VPN?
                  </h5>
                  <p className="text-stone-300">
                    A VPN encrypts all internet data leaving your phone or laptop. <strong>&ldquo;Zero-Logs&rdquo;</strong> means the provider has an independently audited architecture that records <strong>zero browsing history, zero connection timestamps, and zero IP addresses</strong>.
                  </p>
                  <p className="text-stone-400">
                    Even if pressured or subpoenaed, they have literally zero data to produce.
                  </p>
                </div>

                <div className="bg-[#060b08] p-4 rounded-lg border border-[#182d20] space-y-1.5">
                  <h5 className="font-semibold text-[#dfca9a] uppercase tracking-wider text-[11px]">
                    The Hotel &amp; Wi-Fi Threat
                  </h5>
                  <p className="text-stone-300">
                    When you perform hotel outcalls (e.g. at Eos by SkyCity, Mayfair Hotel, or Mount Lofty House), public hotel Wi-Fi networks log device MAC addresses, visited domains, and unencrypted traffic.
                  </p>
                  <p className="text-stone-400">
                    Furthermore, your home ISP (Telstra, Optus) exposes your physical residential suburb. A VPN masks this with an anonymous server IP.
                  </p>
                </div>
              </div>

              {/* Top 2 Recommended Providers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-[#060b08] border border-[#182d20] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-[#f4efe6]">Option A: ProtonVPN</span>
                    <span className="text-[10px] text-[#dfca9a] font-medium bg-[#13261a] px-2 py-0.5 rounded">Recommended</span>
                  </div>
                  <p className="text-[11px] text-stone-300 leading-relaxed font-light">
                    Directly pairs with your existing <code className="text-[#dfca9a]">booking.aurora@proton.me</code> Proton account. Swiss privacy laws, audited no-logs, and NetShield ad/tracker blocker.
                  </p>
                  <a
                    href="https://protonvpn.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-[#c5a86d] hover:text-[#dfca9a] font-medium"
                  >
                    <span>Visit ProtonVPN</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="p-4 rounded-lg bg-[#060b08] border border-[#182d20] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-[#f4efe6]">Option B: Mullvad VPN</span>
                    <span className="text-[10px] text-stone-400 font-medium bg-[#101b13] px-2 py-0.5 rounded">Total Pseudonymity</span>
                  </div>
                  <p className="text-[11px] text-stone-300 leading-relaxed font-light">
                    Gold standard for total privacy. Requires no email, no name, and no phone number—generates a random 16-digit account number. Flat €5/month.
                  </p>
                  <a
                    href="https://mullvad.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-[#c5a86d] hover:text-[#dfca9a] font-medium"
                  >
                    <span>Visit Mullvad</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Action Steps */}
              <div className="space-y-3">
                <h5 className="text-xs uppercase tracking-wider font-semibold text-[#dfca9a]">
                  Exact Action Steps to Configure &ldquo;Always-On&rdquo; Protection:
                </h5>
                <ol className="list-decimal list-inside text-xs text-stone-300 space-y-2.5 font-light">
                  <li className="pl-1">
                    <strong className="text-white">Download the official app:</strong> Install ProtonVPN or Mullvad on both your phone (iOS / Android) and laptop.
                  </li>
                  <li className="pl-1">
                    <strong className="text-white">Enable the &ldquo;Kill Switch&rdquo;:</strong> Inside the VPN app settings, toggle <strong>Kill Switch = ON</strong>. If the VPN connection ever drops unexpectedly, the kill switch instantly blocks internet access, preventing your real IP or home address from leaking.
                  </li>
                  <li className="pl-1">
                    <strong className="text-white">Enable &ldquo;Always-On VPN&rdquo; on Phone:</strong> On your iPhone (Settings &rarr; VPN &rarr; Connect on Demand) or Android (Settings &rarr; Network &rarr; VPN &rarr; Always-on VPN = ON).
                  </li>
                  <li className="pl-1">
                    <strong className="text-white">Test your connection:</strong> Connect to the VPN, then visit <a href="https://www.dnsleaktest.com" target="_blank" rel="noopener noreferrer" className="text-[#c5a86d] underline hover:text-[#dfca9a]">dnsleaktest.com</a>. Verify that your ISP shows the VPN server location and NOT your home carrier (Telstra/Optus).
                  </li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: FULL COMPLETE MANUAL BLUEPRINT (SECTION 1-9 DOCUMENT) */}
        {activeTab === 'manual' && (
          <div className="bg-[#09130d] border border-[#1d3326] rounded-xl p-8 space-y-8 animate-in fade-in duration-150 font-sans">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#182c20] gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#c5a86d] font-semibold block mb-1">
                  Master Operational Reference
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#f4efe6]">
                  Aura Companionship: Complete Launch &amp; Operational Blueprint
                </h3>
              </div>
              <button
                onClick={() => {
                  const fullManual = `# Aura Companionship: Complete Launch & Operational Blueprint\n\n1. Brand Identity & Profile Description\nExquisite Intimacy & Companionship for the Discerning Woman. Specializing in mature women with unhurried devotion.\n\n2. Services, Rates & Payment Architecture\n- Intimate Hourly Companion: $350/hr (Min 2 hrs)\n- The Extended Rendezvous: $1,200 (Up to 4 hrs)\n- Overnight Indulgence: $2,500 (Full night)\n- 20% Deposit via PayID (bookings.aura@proton.me) or Crypto; remaining 80% in discreet bedside envelope.\n\n3. Screening & Safety Protocol\nMandatory screening and Buddy System safety protocol with 15-minute overdue front-desk check.\n\n4. Adelaide Luxury Venues\nEos by SkyCity, The Mayfair Hotel, Mount Lofty House.`;
                  handleCopy(fullManual, 'blueprint_manual');
                }}
                className="px-4 py-2 bg-[#14281c] hover:bg-[#1a3325] text-stone-200 text-xs font-semibold rounded border border-[#2b4c38] transition-colors flex items-center gap-1.5"
              >
                {copiedKey === 'blueprint_manual' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#c5a86d]" />
                    <span>Blueprint Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#c5a86d]" />
                    <span>Copy Full Blueprint</span>
                  </>
                )}
              </button>
            </div>

            <div className="prose prose-invert max-w-none text-stone-300 text-sm leading-relaxed space-y-6">
              <section>
                <h4 className="text-lg font-serif text-[#dfca9a] mb-2">1. Brand Identity &amp; Profile Description</h4>
                <p>
                  <strong>About Me: Exquisite Intimacy &amp; Companionship for the Discerning Woman.</strong> A sophisticated, attentive, and physically striking companion dedicated to fulfilling your deepest desires for connection and intimacy. Specializing in catering exclusively to mature women who appreciate a partner who listens, adores their body, and places their pleasure at the absolute centre of the experience.
                </p>
              </section>

              <section>
                <h4 className="text-lg font-serif text-[#dfca9a] mb-2">2. Services, Rates &amp; Payment Architecture</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Intimate Hourly Companion:</strong> $350 per hour (Minimum 2-hour booking = $700)</li>
                  <li><strong>The Extended Rendezvous (Half-Day):</strong> $1,200 (Up to 4 hours with dining &amp; intimacy)</li>
                  <li><strong>Overnight Indulgence:</strong> $2,500 (Overnight stay in client-booked hotel suite)</li>
                  <li><strong>Payment Architecture:</strong> 20% deposit via PayID (bookings.aura@proton.me) or Crypto; remaining 80% balance in unmarked bedside envelope upon arrival.</li>
                </ul>
              </section>

              <section>
                <h4 className="text-lg font-serif text-[#dfca9a] mb-2">3. Screening, Safety, &amp; Legal Infrastructure</h4>
                <p>
                  Mandatory screening: Government ID or verifiable social profile + hotel room reservation confirmation. Buddy system check-in protocol strictly enforced for every outcall with automatic 15-minute overdue wellness check trigger.
                </p>
              </section>

              <section>
                <h4 className="text-lg font-serif text-[#dfca9a] mb-2">4. Premium Adelaide Venue &amp; Itinerary Guide</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Eos by SkyCity &amp; Sol Rooftop:</strong> North Terrace (Sky-high elegance, sunset booths, Ashton Hills Pinot Noir)</li>
                  <li><strong>The Mayfair Hotel &amp; Hennessy Rooftop Bar:</strong> King William St (Dark Art Deco romance, Mayflower booth dining, crystal chandeliers)</li>
                  <li><strong>Mount Lofty House &amp; Hardys Verandah:</strong> Adelaide Hills (Scenic garden strolls, mist-covered Piccadilly Valley fine dining)</li>
                </ul>
              </section>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
