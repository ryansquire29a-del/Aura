import React, { useState } from 'react';
import { Lock, KeyRound, Check, X, ShieldAlert, ArrowRight } from 'lucide-react';

interface OperatorAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const OperatorAccessModal: React.FC<OperatorAccessModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [pin, setPin] = useState('');
  const [rememberDevice, setRememberDevice] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleVerify = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanPin = pin.trim();

    // Default PIN is 1984, but we also allow 0000 or operator's customized pin if saved
    const savedPin = localStorage.getItem('aura_operator_pin') || '1984';

    if (cleanPin === savedPin || cleanPin === '1984' || cleanPin === '0000') {
      if (rememberDevice) {
        localStorage.setItem('aura_operator_authenticated', 'true');
      }
      setErrorMsg(null);
      setPin('');
      onSuccess();
    } else {
      setErrorMsg('Incorrect PIN. Please enter the default PIN (1984).');
    }
  };

  const handleQuickUnlock = () => {
    if (rememberDevice) {
      localStorage.setItem('aura_operator_authenticated', 'true');
    }
    setErrorMsg(null);
    setPin('');
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#09130e] border border-[#233d2e] rounded-xl max-w-md w-full overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="p-5 border-b border-[#1b2f23] flex items-center justify-between bg-[#070e0a]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#13281c] border border-[#2b4c37] flex items-center justify-center text-[#c5a86d]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#c5a86d] font-semibold block">
                Restricted Access
              </span>
              <h3 className="text-base font-serif text-[#f4efe6]">
                Companion Command Access
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded hover:bg-[#122319] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleVerify} className="p-6 space-y-5">
          <p className="text-xs text-stone-300 font-light leading-relaxed">
            This private command center houses your Safety Buddy check-in protocol, photo uploads, communication templates, and operational logs.
          </p>

          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-400 mb-2 font-medium">
              Enter Security PIN
            </label>
            <div className="relative">
              <input
                type="password"
                inputMode="numeric"
                autoFocus
                maxLength={8}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setErrorMsg(null);
                }}
                placeholder="Enter PIN (Default: 1984)"
                className="w-full px-4 py-3 bg-[#050a07] border border-[#1d3326] rounded-lg text-stone-100 text-center tracking-[0.4em] font-mono text-lg focus:outline-none focus:border-[#c5a86d] placeholder:tracking-normal placeholder:font-sans placeholder:text-xs placeholder:text-stone-500"
              />
              <KeyRound className="absolute right-3.5 top-3.5 w-4 h-4 text-stone-500 pointer-events-none" />
            </div>

            {errorMsg && (
              <p className="mt-2 text-xs text-rose-400 text-center animate-fade-in">
                {errorMsg}
              </p>
            )}
          </div>

          {/* Quick Info Box */}
          <div className="p-3 bg-[#060c08] border border-[#16271c] rounded text-[11px] text-stone-400 flex items-center justify-between">
            <span>Default PIN: <strong className="text-[#dfca9a] font-mono">1984</strong></span>
            <button
              type="button"
              onClick={handleQuickUnlock}
              className="text-[#c5a86d] hover:text-[#dfca9a] text-[11px] underline font-medium"
            >
              Direct Unlock (Owner)
            </button>
          </div>

          {/* Remember device checkbox */}
          <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-300 select-none">
            <input
              type="checkbox"
              checked={rememberDevice}
              onChange={(e) => setRememberDevice(e.target.checked)}
              className="accent-[#c5a86d] rounded w-4 h-4"
            />
            <span>Remember this device (Skip PIN on this phone/computer)</span>
          </label>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 text-xs uppercase tracking-wider font-medium text-stone-400 hover:text-stone-200 border border-[#1d3326] rounded hover:bg-[#101d15] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-gradient-to-r from-[#dfca9a] via-[#c5a86d] to-[#b39556] text-[#060b08] text-xs uppercase tracking-[0.15em] font-semibold rounded hover:brightness-110 transition-all flex items-center justify-center gap-1.5 shadow-md"
            >
              <span>Enter Suite</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
