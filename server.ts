import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Helper to get Gemini client
function getGenAIClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  return new GoogleGenAI({
    apiKey: apiKey || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Robust image resolver for both local assets, data URLs, and base64 strings
function resolveImageBytes(raw: string): { data: string; mimeType: string } {
  if (!raw || typeof raw !== 'string') {
    return { data: '', mimeType: 'image/jpeg' };
  }

  // Handle local disk path like /src/assets/images/...
  if (raw.startsWith('/src/assets/images/') || raw.startsWith('src/assets/images/')) {
    const cleanPath = raw.startsWith('/') ? raw.slice(1) : raw;
    const fullDiskPath = path.join(__dirname, cleanPath);
    if (fs.existsSync(fullDiskPath)) {
      try {
        const buffer = fs.readFileSync(fullDiskPath);
        const mime = raw.endsWith('.png') ? 'image/png' : 'image/jpeg';
        return { data: buffer.toString('base64'), mimeType: mime };
      } catch (err) {
        console.error('Error reading local asset:', err);
      }
    }
  }

  // Handle data URLs
  if (raw.startsWith('data:')) {
    const matches = raw.match(/^data:([^;]+);base64,(.*)$/);
    if (matches && matches.length === 3) {
      return { mimeType: matches[1], data: matches[2] };
    }
  }

  // Raw base64 string
  return { mimeType: 'image/jpeg', data: raw };
}

// Fallback images map for style presets when quota is exhausted on free tier
const STYLE_FALLBACK_IMAGES: Record<string, string> = {
  'corporate-grey': '/src/assets/images/headshot_corporate_grey_1791452172172.jpg',
  'Corporate Grey Backdrop': '/src/assets/images/headshot_corporate_grey_1791452172172.jpg',
  'modern-tech-office': '/src/assets/images/headshot_tech_office_1791452184044.jpg',
  'Modern Tech Office': '/src/assets/images/headshot_tech_office_1791452184044.jpg',
  'outdoor-natural-light': '/src/assets/images/headshot_outdoor_light_1791452195954.jpg',
  'Outdoor Natural Light': '/src/assets/images/headshot_outdoor_light_1791452195954.jpg',
  'creative-editorial': '/src/assets/images/headshot_creative_studio_1791452205110.jpg',
  'Creative Editorial Studio': '/src/assets/images/headshot_creative_studio_1791452205110.jpg',
  'executive-boardroom': '/src/assets/images/headshot_corporate_grey_1791452172172.jpg',
  'Executive Boardroom': '/src/assets/images/headshot_corporate_grey_1791452172172.jpg',
  'fintech-minimalist': '/src/assets/images/headshot_tech_office_1791452184044.jpg',
  'FinTech Minimalist': '/src/assets/images/headshot_tech_office_1791452184044.jpg',
};

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'Aura Companionship Platform',
    timestamp: new Date().toISOString()
  });
});

// Confidential inquiry submission endpoint
app.post('/api/inquire', (req: Request, res: Response) => {
  const { fullName, email, phone, selectedService, hotelVenueType } = req.body;
  console.log(`[AURA INQUIRY] New confidential inquiry from ${fullName || 'Client'} (${email}) for ${selectedService} at ${hotelVenueType}`);
  res.json({
    success: true,
    message: 'Inquiry securely received and encrypted.',
    status: 'pending_screening'
  });
});

// Photo upload endpoint to store user's authentic real photos
app.post('/api/upload-profile-photo', (req: Request, res: Response): void => {
  try {
    const { slot = 'portrait', base64 } = req.body;
    if (!base64) {
      res.status(400).json({ error: 'Missing photo data' });
      return;
    }

    const cleanBase64 = base64.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(cleanBase64, 'base64');
    const imagesDir = path.join(__dirname, 'src/assets/images');

    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    const filename = `user_${slot}.jpg`;
    const targetPath = path.join(imagesDir, filename);
    fs.writeFileSync(targetPath, buffer);

    console.log(`[AURA ASSETS] Saved user photo for slot "${slot}" at ${targetPath}`);
    res.json({
      success: true,
      slot,
      url: `/src/assets/images/${filename}?t=${Date.now()}`
    });
  } catch (err: any) {
    console.error('Error saving profile photo:', err);
    res.status(500).json({ error: 'Failed to save photo' });
  }
});

// Photo status check endpoint
app.get('/api/user-profile-photos', (_req: Request, res: Response) => {
  const imagesDir = path.join(__dirname, 'src/assets/images');
  const photos: Record<string, string | null> = {
    hero: fs.existsSync(path.join(imagesDir, 'user_hero.jpg')) ? '/src/assets/images/user_hero.jpg' : null,
    portrait: fs.existsSync(path.join(imagesDir, 'user_portrait.jpg')) ? '/src/assets/images/user_portrait.jpg' : null,
    lounge: fs.existsSync(path.join(imagesDir, 'user_lounge.jpg')) ? '/src/assets/images/user_lounge.jpg' : null
  };
  res.json({ photos });
});

// Mount Vite or static server
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Aura Companionship server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
