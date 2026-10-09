import React, { createContext, useContext, useState, useEffect } from 'react';
import defaultHeroImg from '../assets/images/aura_luxury_suite_1791453755254.jpg';
import defaultPortraitImg from '../assets/images/aura_sensual_ritual_1791458086518.jpg';
import defaultLoungeImg from '../assets/images/aura_lounge_wine_1791453733840.jpg';
import {
  compressImage,
  savePhotoToIndexedDB,
  loadAllSavedPhotos
} from '../utils/photoStorage';

export interface BrandingSettings {
  contactEmail: string;
  contactPhone: string;
  payIdIdentifier: string;
  companionName: string;
  heroPhoto: string;
  portraitPhoto: string;
  loungePhoto: string;
}

const DEFAULT_SETTINGS: BrandingSettings = {
  contactEmail: 'booking.aurora@proton.me',
  contactPhone: '+61 400 000 000',
  payIdIdentifier: 'booking.aurora@proton.me',
  companionName: 'Aura',
  heroPhoto: defaultHeroImg,
  portraitPhoto: defaultPortraitImg,
  loungePhoto: defaultLoungeImg
};

interface BrandingContextType {
  settings: BrandingSettings;
  updateSettings: (newSettings: Partial<BrandingSettings>) => void;
  uploadPhoto: (slot: 'hero' | 'portrait' | 'lounge', file: File) => Promise<boolean>;
  applyPhotoEverywhere: (file: File) => Promise<boolean>;
  resetToDefaults: () => void;
}

const BrandingContext = createContext<BrandingContextType | undefined>(undefined);

export const BrandingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<BrandingSettings>(() => {
    try {
      const stored = localStorage.getItem('aura_branding_settings');
      if (stored) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.warn('Failed to load branding settings from localStorage', e);
    }
    return DEFAULT_SETTINGS;
  });

  // Save to localStorage whenever settings change
  useEffect(() => {
    try {
      localStorage.setItem('aura_branding_settings', JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save branding settings to localStorage', e);
    }
  }, [settings]);

  // Load persistent photos from IndexedDB and server on mount
  useEffect(() => {
    async function restorePersistentPhotos() {
      try {
        // 1. Check robust IndexedDB vault first
        const idbPhotos = await loadAllSavedPhotos();
        const hasIdbPhoto = idbPhotos.hero || idbPhotos.portrait || idbPhotos.lounge;
        if (hasIdbPhoto) {
          setSettings((prev) => ({
            ...prev,
            heroPhoto: idbPhotos.hero || prev.heroPhoto,
            portraitPhoto: idbPhotos.portrait || prev.portraitPhoto,
            loungePhoto: idbPhotos.lounge || prev.loungePhoto,
          }));
          return;
        }

        // 2. Fallback check server disk
        const res = await fetch('/api/user-profile-photos');
        const data = await res.json();
        if (data.photos) {
          setSettings((prev) => ({
            ...prev,
            heroPhoto: data.photos.hero || prev.heroPhoto,
            portraitPhoto: data.photos.portrait || prev.portraitPhoto,
            loungePhoto: data.photos.lounge || prev.loungePhoto,
          }));
        }
      } catch (err) {
        console.warn('Could not restore persistent photos:', err);
      }
    }

    restorePersistentPhotos();
  }, []);

  const updateSettings = (newSettings: Partial<BrandingSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const uploadPhoto = async (slot: 'hero' | 'portrait' | 'lounge', file: File): Promise<boolean> => {
    try {
      // Compress to high-fidelity ~250KB JPEG to avoid 5MB localStorage quota
      const compressedBase64 = await compressImage(file, 1600, 0.88);

      // 1. Update React state immediately
      setSettings((prev) => {
        const next = { ...prev };
        if (slot === 'hero') next.heroPhoto = compressedBase64;
        if (slot === 'portrait') next.portraitPhoto = compressedBase64;
        if (slot === 'lounge') next.loungePhoto = compressedBase64;
        return next;
      });

      // 2. Persist to permanent IndexedDB database (survives refreshes & reboots)
      await savePhotoToIndexedDB(slot, compressedBase64);

      // 3. Persist to server backend disk
      fetch('/api/upload-profile-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slot, base64: compressedBase64 })
      }).catch((err) => console.warn('Server photo sync notice:', err));

      return true;
    } catch (err) {
      console.error('Failed to compress or save photo:', err);
      return false;
    }
  };

  // Helper to apply the companion's single authentic photo across all slots
  const applyPhotoEverywhere = async (file: File): Promise<boolean> => {
    try {
      const compressedBase64 = await compressImage(file, 1600, 0.88);

      setSettings((prev) => ({
        ...prev,
        heroPhoto: compressedBase64,
        portraitPhoto: compressedBase64,
        loungePhoto: compressedBase64,
      }));

      await savePhotoToIndexedDB('hero', compressedBase64);
      await savePhotoToIndexedDB('portrait', compressedBase64);
      await savePhotoToIndexedDB('lounge', compressedBase64);

      // Notify server for all 3 slots
      const slots: ('hero' | 'portrait' | 'lounge')[] = ['hero', 'portrait', 'lounge'];
      for (const slot of slots) {
        fetch('/api/upload-profile-photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slot, base64: compressedBase64 })
        }).catch(() => {});
      }

      return true;
    } catch (err) {
      console.error('Failed to apply photo everywhere:', err);
      return false;
    }
  };

  const resetToDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
    try {
      localStorage.removeItem('aura_branding_settings');
    } catch {}
  };

  return (
    <BrandingContext.Provider value={{ settings, updateSettings, uploadPhoto, applyPhotoEverywhere, resetToDefaults }}>
      {children}
    </BrandingContext.Provider>
  );
};

export const useBranding = () => {
  const context = useContext(BrandingContext);
  if (!context) {
    throw new Error('useBranding must be used within a BrandingProvider');
  }
  return context;
};
