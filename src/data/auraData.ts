import { ServiceTier, AdelaideVenue, LuxuryEssentialItem, PrepRoutineStep } from '../types';

export const SERVICES: ServiceTier[] = [
  {
    id: 'hourly',
    name: 'Intimate Hourly Companion',
    tagline: 'Focused, sensual encounter where your desires are the sole priority',
    baseRate: 700,
    hourlyRate: 350,
    minHours: 2,
    durationLabel: 'Minimum 2 Hours ($350/hr)',
    description: 'An unhurried, devoted encounter crafted around your emotional ease and sensual pleasure. Tailored for women seeking attentive company and deep physical adoration.',
    inclusions: [
      'Dedicated one-on-one presence with zero outside distractions',
      'Slow-sensual pacing adapted to your comfort level',
      'Optional full-body relaxation massage using luxury unscented oils',
      'Absolute discretion and confidential outcall service'
    ],
    bestFor: 'First-time encounters, afternoon escapes, or focused evening intimacy'
  },
  {
    id: 'extended',
    name: 'The Extended Rendezvous',
    tagline: 'Half-day journey beginning with private dining and flowing into deep intimacy',
    baseRate: 1200,
    maxHours: 4,
    durationLabel: 'Up to 4 Hours',
    description: 'Begin with shared vintage wine or an intimate gourmet dinner behind closed doors, naturally deepening into hours of uninterrupted, passionate connection.',
    inclusions: [
      'Up to 4 luxurious, unhurried hours in your hotel suite',
      'Cocktails, wine, or private room-service dining companionship',
      'Extensive slow-touch and full-body sensual massage rituals',
      'Exploration of fantasies in a safe, judgement-free space'
    ],
    bestFor: 'Evenings where you wish to converse, unwind, and transition into intense passion'
  },
  {
    id: 'overnight',
    name: 'Overnight Indulgence',
    tagline: 'The ultimate sanctuary: an entire night of luxury, warmth, and unlimited intimacy',
    baseRate: 2500,
    durationLabel: 'Overnight Stay (Until Morning)',
    description: 'A complete immersion into pleasure and adoration. Fall asleep embraced in warmth and awaken together to morning intimacy and room-service breakfast.',
    inclusions: [
      'Full overnight stay in your chosen luxury hotel suite or private villa',
      'Unlimited, unhurried intimacy through the evening and morning',
      'Complete romantic presence, holding, deep conversation, and body worship',
      'Waking up together with slow morning sensual connection'
    ],
    bestFor: 'Ultimate rejuvenation, romantic weekend getaways, and total escape'
  }
];

export const SENSUAL_SPECIALTIES = [
  {
    title: 'Slow-Sensual Style',
    description: 'A relaxed, unhurried approach where the focus is on building anticipation, deep eye contact, and prolonged, passionate touch.',
    detail: 'Never rushed. Every breath and whisper is given room to breathe, honouring your pace and heightened anticipation.'
  },
  {
    title: 'Full-Body Sensual Massage',
    description: 'Using premium, non-scented luxury oils, designed to melt away your stress, awaken your senses, and transition smoothly into deeper intimacy.',
    detail: 'Cold-pressed organic jojoba and sweet almond oil gently applied to every curve to awaken nerve endings and melt accumulated tension.'
  },
  {
    title: 'Gourmet Intimacy & Exploration',
    description: 'A judgement-free space tailored entirely to your pace, preferences, and fantasies, ensuring you feel entirely worshipped.',
    detail: 'Your pleasure is the centre of gravity. Free of judgment, shame, or performance pressure—simply pure devotion.'
  }
];

export const ADELAIDE_VENUES: AdelaideVenue[] = [
  {
    id: 'eos',
    name: 'Eos by SkyCity & Sol Rooftop',
    subtitle: 'The Sky-High Elegance (Discreet & Glamorous)',
    location: 'North Terrace, Adelaide CBD',
    vibe: 'Modern architectural luxury with sweeping panoramic sunset views of the River Torrens.',
    itinerary: {
      arrival: 'Meet directly in the quiet, five-star lobby of Eos Hotel away from street view.',
      dining: 'Take the private elevator to Sol Rooftop for a reserved corner booth just before golden hour.',
      drinks: 'Share a bottle of local Ashton Hills Pinot Noir paired with South Australian artisan cheeses.',
      transition: 'After twilight drinks, transition effortlessly downstairs directly into your private Eos suite.'
    },
    recommendedWine: 'Ashton Hills Vineyard Estate Pinot Noir',
    bestSuitedFor: 'Clients seeking modern glamour, city skyline lights, and immediate suite access.'
  },
  {
    id: 'mayfair',
    name: 'The Mayfair Hotel & Hennessy Rooftop',
    subtitle: 'The Intimate Heritage Escape (Dark & Romantic)',
    location: 'King William St, Adelaide',
    vibe: 'Subtle Art Deco richness, candlelit corners, crystal chandeliers, and velvet upholstery.',
    itinerary: {
      arrival: 'Greet in the jewel-toned Art Deco grand lobby of The Mayfair Hotel.',
      dining: 'Descend to Mayflower Restaurant for an intimate dinner booth featuring South Australian wagyu.',
      drinks: 'Sip bespoke craft cocktails under crystal chandeliers at Hennessy Rooftop Bar.',
      transition: 'Retire upstairs to the lavish comfort of your Mayfair luxury room.'
    },
    recommendedWine: 'Henschke Keyneton Euphonium Shiraz Blend',
    bestSuitedFor: 'Dark romantic mood, deep candlelit conversation, and discreet heritage elegance.'
  },
  {
    id: 'mount_lofty',
    name: 'Mount Lofty House & Hardys Verandah',
    subtitle: 'The Hillside Romance (Scenic & Private)',
    location: 'Crafers, Adelaide Hills',
    vibe: 'Historic estate seclusion surrounded by manicured rose gardens and mist over Piccadilly Valley.',
    itinerary: {
      arrival: 'Arrive at the historic heritage estate away from the city hustle.',
      dining: 'Walk hand-in-hand through manicured heritage gardens before a multi-course degustation at Hardys Verandah.',
      drinks: 'Valley view wine pairing overlooking the twilight mist in the Adelaide Hills.',
      transition: 'Retreat to a private secluded luxury villa on-site or return comfortably to your city hotel.'
    },
    recommendedWine: 'Shaw + Smith Lenswood Vineyard Chardonnay',
    bestSuitedFor: 'Unrushed daytime or sunset escapes, absolute seclusion, and scenic romanticism.'
  }
];

export const FAQS = [
  {
    q: 'I have never booked a male companion before. What can I expect?',
    a: 'Welcome, and please rest assured you are in gentle hands. Our time together is completely tailored to your comfort level and pace. There is absolutely no rush, no pressure, and no expectations. We can begin with relaxed conversation over a drink, transition into a soothing massage, and follow your desires wherever they lead. You are completely in control.'
  },
  {
    q: 'Will my privacy and identity be protected?',
    a: 'Absolutely. Discretion is the cornerstone of Aura. Any identification provided during the screening process is handled via encrypted channels and permanently deleted immediately after verification. I operate with absolute confidentiality—your identity, occupation, and personal life will never be discussed with anyone else.'
  },
  {
    q: 'How do hotel outcalls work?',
    a: 'You choose and book an upscale hotel of your choice within Adelaide. Once confirmed, you provide me with the hotel name and room number. I will arrive impeccably groomed and dressed to your specifications. Upon entry, we settle any final details seamlessly so that the rest of our time can be entirely uninterrupted.'
  },
  {
    q: 'What if I need to change or cancel my booking?',
    a: 'Life can be unpredictable. You can reschedule or cancel your booking up to 24 hours in advance. Please note that deposits are non-refundable but can be credited toward a rescheduled date if notice is given within the appropriate timeframe.'
  }
];

export const TERMS_AND_CONDITIONS = [
  {
    title: '1. Nature of Services',
    content: 'All engagements booked through this platform are strictly for private companionship, emotional connection, and sensual entertainment between consenting adults. Booking a companion does not imply a contract for forced or non-consensual acts. Both parties reserve the right to establish personal boundaries at any point during the booking.'
  },
  {
    title: '2. Code of Conduct & Mutual Respect',
    content: 'Clients are expected to maintain a high standard of personal hygiene and conduct themselves with absolute respect, courtesy, and sobriety. Any form of physical aggression, verbal abuse, boundary violations, or illicit drug use will result in the immediate termination of the booking without a refund.'
  },
  {
    title: '3. Cancellation & Deposit Policy',
    content: 'A non-refundable 20% deposit is required to secure all bookings. Cancellations made by the client with less than 24 hours\' notice will result in the forfeiture of the deposit. If the companion must cancel due to unforeseen circumstances, the deposit will be refunded in full or credited to a rescheduled date.'
  },
  {
    title: '4. Liability & Accommodation',
    content: 'The client assumes full financial and legal responsibility for booking and funding the upscale hotel or private accommodation where the engagement takes place. The companion is not liable for any incidental costs, damages to the property, or venue-related issues incurred during the booking duration.'
  }
];

export const LUXURY_ESSENTIALS_CHECKLIST: LuxuryEssentialItem[] = [
  {
    id: 'fragrance',
    category: 'grooming',
    title: 'Signature Masculine Fragrance',
    description: 'Bleu de Chanel / Tom Ford Oud Wood / Creed Aventus',
    detail: 'Applied subtly to pulse points—never overpowering, intimate sillage only.',
    isPacked: true
  },
  {
    id: 'breath',
    category: 'grooming',
    title: 'Breath Optimization Kit',
    description: 'Luxury botanical mints & travel micro-oral kit',
    detail: 'Use discreet breath spray right before knocking at the hotel suite door.',
    isPacked: true
  },
  {
    id: 'nails',
    category: 'grooming',
    title: 'Nail & Hand Hydration Ritual',
    description: 'Meticulously trimmed, filed nails & rich hydrating hand balm',
    detail: 'Hands are the primary conduit of sensual touch; must be soft, clean, and smooth.',
    isPacked: true
  },
  {
    id: 'massage_oil',
    category: 'atmosphere',
    title: 'Premium Organic Massage Oil',
    description: 'Fragrance-free cold-pressed jojoba or sweet almond in pump bottle',
    detail: 'Leak-proof pump bottle; fragrance-free eliminates skin or allergy complications.',
    isPacked: true
  },
  {
    id: 'speaker',
    category: 'atmosphere',
    title: 'Minimalist Bluetooth Speaker',
    description: 'Bang & Olufsen Beosound / JBL Go Luxe with offline sensual playlist',
    detail: 'Curated low-tempo acoustic, sensual ambient, and slow jazz offline tracks.',
    isPacked: true
  },
  {
    id: 'lighting',
    category: 'atmosphere',
    title: 'Warm-LED Ambient Puck Light',
    description: 'Rechargeable 2200K warm candle simulator',
    detail: 'Instantly softens harsh fluorescent hotel suite lighting to create intimate warmth.',
    isPacked: true
  },
  {
    id: 'envelopes',
    category: 'practical',
    title: 'Luxury Unmarked Envelopes',
    description: 'Heavyweight matte black or cream stationery envelopes',
    detail: 'Discreetly houses balance arrangements on the bedside table without feeling transactional.',
    isPacked: true
  }
];

export const PRE_DATE_ROUTINE: PrepRoutineStep[] = [
  {
    id: 'step_1',
    stepNumber: 1,
    timing: '90 Minutes Out',
    title: 'The Physical Polish',
    objective: 'Flawless grooming, deep skin hydration, and pristine sartorial presentation.',
    checklist: [
      'Warm shower with neutral cleansing wash; exfoliate dry skin zones (elbows, shoulders)',
      'Precision shave and beard edging with crisp definition',
      'Hydrate with at least 750ml water; light clean meal (protein & clean carbs, no garlic/onion)',
      'Oral hygiene: floss, brush, antiseptic mouthwash, apply luxury hand balm',
      'Pristine tailored outfit ironed to perfection with matching luxury undergarments'
    ]
  },
  {
    id: 'step_2',
    stepNumber: 2,
    timing: '30 Minutes Out',
    title: 'The Mental Reset & Focus',
    objective: 'Complete presence: shed external stress and enter total devotion to her desires.',
    checklist: [
      '10 minutes of complete silence or calming breathwork; detach from all personal worries',
      'Embody core purpose: She is the most beautiful, compelling, and adored woman in the room',
      'Commit to absolute presence: phone on silent, undivided eye contact and active listening',
      'Review client inquiry notes: memorise her name, preferences, boundary markers, and fantasies'
    ]
  },
  {
    id: 'step_3',
    stepNumber: 3,
    timing: '10 Minutes Out',
    title: 'The Arrival Execution',
    objective: 'Immaculate first impression and flawless safety protocol execution.',
    checklist: [
      'Arrive in hotel lobby 10 minutes early; quick restroom mirror check and hair touch-up',
      'Final discreet breath spray application',
      'Send mandatory Safety Check-In text to trusted buddy with hotel room number',
      'Calm, confident walk to door; knock with poise, warm genuine smile, ready for a tender embrace'
    ]
  }
];

export const OPERATIONAL_TEMPLATES = {
  inquiryEmail: {
    subject: 'Re: Inquiry for Premium Companionship & Intimacy',
    body: (clientName: string, serviceTitle: string) => `Hello ${clientName || '[Client Name]'},

Thank you so much for reaching out to Aura Companionship. I am delighted to hear from you, and I would love the opportunity to provide you with an unforgettable, deeply attentive experience tailored entirely to your desires.

To help me curate the perfect encounter for us, please let me know your preferred date, time, and the duration you had in mind (${serviceTitle || 'Hourly, Half-Day, or Overnight'}).

As a professional independent companion, I prioritize the safety, privacy, and comfort of both of us. To finalize your booking and secure your chosen date on my calendar, I kindly ask all new clients to complete our quick, confidential screening process.

Whenever you are ready, please reply with your preferred details, and we can take the next steps to arrange our rendezvous. I look forward to making you feel completely desired and worshipped.

Warm regards,
Aura Companionship`
  },
  automatedSms: {
    body: 'Hello, thank you for contacting Aura. Your confidential inquiry has been securely received. A private response containing our booking next steps has been sent to your provided email address. I look forward to connecting with you soon.'
  },
  rejectionMessage: {
    body: (clientName: string) => `Hello ${clientName || '[Client Name]'},

Thank you for your reply. I completely understand if you prefer not to share your verification details; however, my screening and deposit policies are strictly mandatory for all new clients to ensure mutual safety and discretion.

Because I cannot compromise on these safety standards, I will not be able to move forward with your booking request at this time.

I wish you all the very best in finding a companion who better suits your needs.

Warm regards,
Aura Companionship`
  }
};
