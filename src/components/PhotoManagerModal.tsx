import React, { useRef, useState } from 'react';
import { useBranding } from '../context/BrandingContext';
import { X, Upload, Camera, Check, AlertCircle, RefreshCw, Mail, Phone, Lock } from 'lucide-react';

interface PhotoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoManagerModal: React.FC<PhotoManagerModalProps> = ({ isOpen, onClose }) => {
  const { settings, updateSettings, uploadPhoto, resetToDefaults } = useBranding();
  const [activeSlot, setActiveSlot] = useState<'portrait' | 'lounge' | 'hero'>('portrait');
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState(settings.contactEmail);
  const [phoneInput, setPhoneInput] = useState(settings.contactPhone);
  const [payIdInput, setPayIdInput] = useState(settings.payIdIdentifier);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadStatus('Uploading and updating website...');
    const ok = await uploadPhoto(activeSlot, file);
    if (ok) {
      setUploadStatus(`Photo successfully updated for ${activeSlot}!`);
      setTimeout(() => setUploadStatus(null), 3000);
    } else {
      setUploadStatus('Failed to upload image. Please try again.');
    }
  };

  const handleSaveContact = () => {
    updateSettings({
      contactEmail: emailInput.trim(),
      contactPhone: phoneInput.trim(),
      payIdIdentifier: payIdInput.trim()
    });
    setUploadStatus('Contact & payment settings saved!');
    setTimeout(() => setUploadStatus(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#09130e] border border-[#233d2e] rounded-xl max-w-2xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="p-5 border-b border-[#1b2f23] flex items-center justify-between bg-[#070e0a]">
          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#c5a86d] font-semibold block mb-0.5">
              Personal Identity &amp; Setup
            </span>
            <h3 className="text-xl font-serif text-[#f4efe6]">
              Upload Your Real Photos &amp; Communications
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-[#122319] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Explanation Banner */}
          <div className="p-4 rounded-lg bg-[#0c1811] border border-[#1d3326] text-xs text-stone-300 font-light leading-relaxed">
            <strong className="text-[#dfca9a] font-medium block mb-1">
              Your Real Authenticity Guarantee:
            </strong>
            Upload your actual photos here (e.g. your wine cellar photo <code className="text-[#c5a86d]">IMG_2850.jpeg</code> or tailored suit photo <code className="text-[#c5a86d]">IMG_2801.png</code>). They will replace all placeholders immediately across the website.
          </div>

          {/* Slot Selector */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-400 mb-2 font-medium">
              Choose Photo Placement Slot:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setActiveSlot('portrait')}
                className={`p-3 rounded border text-left transition-all ${
                  activeSlot === 'portrait'
                    ? 'bg-[#183123] border-[#c5a86d] text-[#faedd0]'
                    : 'bg-[#08110b] border-[#1d3326] text-stone-400 hover:text-stone-200'
                }`}
              >
                <div className="text-xs font-serif font-medium">Primary Portrait</div>
                <div className="text-[10px] text-stone-400">About Me / Profile Presence</div>
              </button>

              <button
                type="button"
                onClick={() => setActiveSlot('lounge')}
                className={`p-3 rounded border text-left transition-all ${
                  activeSlot === 'lounge'
                    ? 'bg-[#183123] border-[#c5a86d] text-[#faedd0]'
                    : 'bg-[#08110b] border-[#1d3326] text-stone-400 hover:text-stone-200'
                }`}
              >
                <div className="text-xs font-serif font-medium">Dining &amp; Wine</div>
                <div className="text-[10px] text-stone-400">Lounge &amp; Conversation</div>
              </button>

              <button
                type="button"
                onClick={() => setActiveSlot('hero')}
                className={`p-3 rounded border text-left transition-all ${
                  activeSlot === 'hero'
                    ? 'bg-[#183123] border-[#c5a86d] text-[#faedd0]'
                    : 'bg-[#08110b] border-[#1d3326] text-stone-400 hover:text-stone-200'
                }`}
              >
                <div className="text-xs font-serif font-medium">Hero Banner</div>
                <div className="text-[10px] text-stone-400">Main Homepage Background</div>
              </button>
            </div>
          </div>

          {/* Current Photo Preview & Upload Button */}
          <div className="p-4 bg-[#08100b] rounded border border-[#1b3123] flex flex-col sm:flex-row items-center gap-5">
            <div className="w-28 h-36 rounded-lg overflow-hidden border border-[#2b4c37] shrink-0 bg-[#050806]">
              <img
                src={
                  activeSlot === 'portrait'
                    ? settings.portraitPhoto
                    : activeSlot === 'lounge'
                    ? settings.loungePhoto
                    : settings.heroPhoto
                }
                alt="Current Preview"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 space-y-3 text-center sm:text-left">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#dfca9a] font-medium block">
                  Replace {activeSlot.toUpperCase()} with your authentic photo
                </span>
                <p className="text-[11px] text-stone-400 font-light mt-0.5">
                  Select <code className="text-[#c5a86d]">IMG_2850.jpeg</code>, <code className="text-[#c5a86d]">IMG_2801.png</code>, or any photo on your device.
                </p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#dfca9a] via-[#c5a86d] to-[#b39556] text-[#060b08] text-xs uppercase tracking-wider font-semibold rounded hover:brightness-110 transition-all flex items-center justify-center sm:justify-start gap-2 mx-auto sm:mx-0 shadow-md"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose Photo File From Device</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {uploadStatus && (
                <div className="text-xs text-[#dfca9a] flex items-center gap-1.5 justify-center sm:justify-start animate-fade-in">
                  <Check className="w-3.5 h-3.5" />
                  <span>{uploadStatus}</span>
                </div>
              )}
            </div>
          </div>

          {/* Real Contact & Email Settings Section */}
          <div className="p-4 bg-[#0a150f] rounded-lg border border-[#1e3427] space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#c5a86d]" />
              <h4 className="text-xs uppercase tracking-[0.18em] text-[#dfca9a] font-semibold">
                Real Communications &amp; PayID Setup
              </h4>
            </div>

            <p className="text-[11px] text-stone-400 font-light leading-relaxed">
              Configure your actual email and booking contacts. The blueprint recommended <code className="text-[#c5a86d]">booking.aurora@proton.me</code>, but you can set your customized email address and registered PayID right here:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1">
                  Your Real Booking Email Address
                </label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="e.g. booking.aurora@proton.me"
                  className="w-full px-3 py-2 text-xs bg-[#060b08] border border-[#1d3326] rounded text-stone-200 focus:outline-none focus:border-[#c5a86d]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1">
                  Your Real PayID / Bank Tag
                </label>
                <input
                  type="text"
                  value={payIdInput}
                  onChange={(e) => setPayIdInput(e.target.value)}
                  placeholder="e.g. your PayID email or mobile"
                  className="w-full px-3 py-2 text-xs bg-[#060b08] border border-[#1d3326] rounded text-stone-200 focus:outline-none focus:border-[#c5a86d]"
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={handleSaveContact}
                className="px-4 py-2 bg-[#14281c] hover:bg-[#1b3526] text-[#dfca9a] text-xs font-semibold rounded border border-[#2c4e3a] transition-colors"
              >
                Save Contact &amp; PayID Settings
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1b2f23] bg-[#070e0a] flex items-center justify-between">
          <button
            type="button"
            onClick={resetToDefaults}
            className="text-[11px] text-stone-500 hover:text-stone-300 transition-colors flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset to defaults</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#122319] hover:bg-[#1a3325] text-stone-200 text-xs font-semibold rounded border border-[#274834] transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
