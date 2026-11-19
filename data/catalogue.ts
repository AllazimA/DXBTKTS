/**
 * DXB TKTS launch catalogue.
 *
 * ⚠️  PRICES ARE PLACEHOLDERS. No supplier agreements exist yet. Every
 * product has `priceVerified: false`, which makes the site label its price
 * "indicative". Replace each price with the supplier net rate + DXB TKTS
 * margin (see DXB_TKTS_ONLINE_BOOKING_AND_PRICING_STRATEGY.md §7) and set
 * `priceVerified: true` once the rate sheet is signed.
 */
import type { Category, Product } from '@/lib/catalogue/types'
import { signatureProducts, moreProducts } from './catalogue-more'
import { shoppingProducts } from './catalogue-shopping'

const allCategories: Category[] = [
  {
    slug: 'shopping',
    image: 'privateVilla',
    name: { en: 'Luxury Shopping', fr: 'Shopping de luxe', ar: 'التسوق الفاخر' },
    intro: {
      en: 'A personalised shopping experience: Dubai Mall’s Fashion Avenue, watches and fine jewellery, the Gold Souk and a full shopping day — with a personal shopper and a car.',
      fr: 'Une expérience de shopping personnalisée : la Fashion Avenue du Dubai Mall, horlogerie et joaillerie, le souk de l’or et une journée complète — avec personal shopper et voiture.',
      ar: 'تجربة تسوق شخصية: فاشن أفينيو في دبي مول، والساعات والمجوهرات الراقية، وسوق الذهب، ويوم تسوق كامل — مع متسوق شخصي وسيارة.',
    },
  },
  {
    slug: 'signature',
    image: 'dubaiSkyline',
    name: { en: 'Signature & VIP', fr: 'Signature & VIP', ar: 'التجارب المميزة وكبار الشخصيات' },
    intro: {
      en: 'Our most exclusive experiences — private, hosted and tailored to you. Every detail can be adapted.',
      fr: 'Nos expériences les plus exclusives — privées, accompagnées et adaptées à vous. Chaque détail peut être personnalisé.',
      ar: 'أكثر تجاربنا تميّزاً — خاصة ومُرافَقة ومصممة لك. يمكن تعديل كل تفصيل.',
    },
  },
  {
    slug: 'on-the-water',
    image: 'yacht',
    name: { en: 'Water & Yachts', fr: 'Mer & Yachts', ar: 'البحر واليخوت' },
    intro: {
      en: 'Private yachts, celebrations at sea and jet skis past Dubai’s most famous skyline.',
      fr: 'Yachts privés, célébrations en mer et jet-ski face à la skyline la plus célèbre de Dubaï.',
      ar: 'يخوت خاصة، واحتفالات في البحر، ودراجات مائية أمام أشهر أفق في دبي.',
    },
  },
  {
    slug: 'desert',
    image: 'desert',
    name: { en: 'Desert', fr: 'Désert', ar: 'الصحراء' },
    intro: {
      en: 'Private safaris, dune buggies and sunrise balloon flights, an hour from the city.',
      fr: 'Safaris privés, buggys dans les dunes et montgolfière au lever du soleil, à une heure de la ville.',
      ar: 'سفاري خاص، ودراجات رملية، ورحلات منطاد عند الشروق، على بعد ساعة من المدينة.',
    },
  },
  {
    slug: 'sky',
    image: 'burjAlArabAerial',
    name: { en: 'Sky & Adventure', fr: 'Ciel & Aventure', ar: 'السماء والمغامرة' },
    intro: {
      en: 'Scenic helicopter flights over Palm Jumeirah, Burj Al Arab and Downtown.',
      fr: 'Vols panoramiques en hélicoptère au-dessus de Palm Jumeirah, du Burj Al Arab et de Downtown.',
      ar: 'رحلات هليكوبتر فوق نخلة جميرا وبرج العرب ووسط المدينة.',
    },
  },
  {
    slug: 'lifestyle',
    image: 'fineDining',
    name: { en: 'Dining & Lifestyle', fr: 'Gastronomie & Lifestyle', ar: 'المطاعم وأسلوب الحياة' },
    intro: {
      en: 'Chef-led dining, beach clubs, spa days, championship golf and the cars to match.',
      fr: 'Dîners de chefs, beach clubs, journées spa, golf de championnat et les voitures assorties.',
      ar: 'تجارب طعام يقودها طهاة، ونوادي شاطئ، وأيام سبا، وغولف البطولات، والسيارات التي تليق بها.',
    },
  },
  {
    slug: 'transfers',
    image: 'arrival',
    name: { en: 'Chauffeurs & Transfers', fr: 'Chauffeurs & Transferts', ar: 'السائقون والتنقلات' },
    intro: {
      en: 'Airport meet-and-greet, private transfers and a chauffeur by the hour.',
      fr: 'Accueil à l’aéroport, transferts privés et chauffeur à l’heure.',
      ar: 'استقبال في المطار، وتنقلات خاصة، وسائق بالساعة.',
    },
  },
  {
    slug: 'day-trips',
    image: 'grandMosque',
    name: { en: 'Day Trips & Culture', fr: 'Excursions & Culture', ar: 'رحلات يومية وثقافة' },
    intro: {
      en: 'Private guided tours of Dubai and days out to Abu Dhabi, with your own driver.',
      fr: 'Visites privées de Dubaï avec guide et journées à Abu Dhabi, avec votre propre chauffeur.',
      ar: 'جولات خاصة بمرشد في دبي ورحلات يومية إلى أبوظبي، مع سائقك الخاص.',
    },
  },
  {
    slug: 'attractions',
    image: 'burjKhalifa',
    name: { en: 'Attractions & Tickets', fr: 'Attractions & Billets', ar: 'المعالم والتذاكر' },
    intro: {
      en: 'Tickets to Dubai’s landmarks, added to your plan in one step.',
      fr: 'Billets pour les sites emblématiques de Dubaï, ajoutés à votre programme en un clic.',
      ar: 'تذاكر لمعالم دبي، تُضاف إلى خطتك بخطوة واحدة.',
    },
  },
]

const noGuides = { en: [], fr: [], ar: [] }

const coreProducts: Product[] = [
  // ───────────────────────────── ON THE WATER ─────────────────────────────
  {
    slug: 'private-yacht-charter',
    category: 'on-the-water',
    image: 'yacht',
    name: { en: 'Private Yacht Charter', fr: 'Yacht Privé avec Équipage', ar: 'استئجار يخت خاص' },
    tagline: {
      en: 'Dubai Marina, Palm Jumeirah and Burj Al Arab from your own crewed yacht.',
      fr: 'Dubai Marina, Palm Jumeirah et le Burj Al Arab depuis votre propre yacht avec équipage.',
      ar: 'دبي مارينا ونخلة جميرا وبرج العرب من يختك الخاص مع طاقمه.',
    },
    description: {
      en: 'The whole yacht is yours: captain and crew, soft drinks and a route along the coast you choose with us. Ideal for families, friends and small celebrations — the bigger your group, the better the value.',
      fr: 'Le yacht entier vous appartient : capitaine et équipage, boissons fraîches et un itinéraire le long de la côte choisi avec nous. Idéal pour les familles, les amis et les petites célébrations — plus le groupe est grand, plus le prix par personne baisse.',
      ar: 'اليخت كله لك: قبطان وطاقم ومشروبات غازية ومسار على طول الساحل تختاره معنا. مثالي للعائلات والأصدقاء والاحتفالات الصغيرة — كلما كبرت المجموعة كانت القيمة أفضل.',
    },
    duration: { en: 'From 2 hours', fr: 'À partir de 2 heures', ar: 'من ساعتين' },
    groupSize: { en: 'Up to 30 guests', fr: 'Jusqu’à 30 personnes', ar: 'حتى 30 ضيفاً' },
    priceType: 'per_hour',
    confirmation: 'on_request',
    minQty: 2,
    maxQty: 8,
    variants: [
      {
        id: 'yacht-45',
        name: { en: '45 ft yacht', fr: 'Yacht de 45 pieds', ar: 'يخت 45 قدماً' },
        detail: { en: 'Up to 10 guests', fr: 'Jusqu’à 10 personnes', ar: 'حتى 10 ضيوف' },
        price: 750,
        capacity: 10,
      },
      {
        id: 'yacht-60',
        name: { en: '60 ft yacht', fr: 'Yacht de 60 pieds', ar: 'يخت 60 قدماً' },
        detail: { en: 'Up to 18 guests', fr: 'Jusqu’à 18 personnes', ar: 'حتى 18 ضيفاً' },
        price: 1100,
        capacity: 18,
        recommended: true,
      },
      {
        id: 'yacht-80',
        name: { en: '80 ft yacht', fr: 'Yacht de 80 pieds', ar: 'يخت 80 قدماً' },
        detail: { en: 'Up to 30 guests', fr: 'Jusqu’à 30 personnes', ar: 'حتى 30 ضيفاً' },
        price: 2100,
        capacity: 30,
      },
    ],
    extras: [
      { id: 'decor-cake', name: { en: 'Decoration & celebration cake', fr: 'Décoration & gâteau de fête', ar: 'زينة وكعكة احتفال' }, price: 750, per: 'booking', max: 1 },
      { id: 'bbq', name: { en: 'BBQ on board (per person)', fr: 'Barbecue à bord (par personne)', ar: 'شواء على متن اليخت (للشخص)' }, price: 120, per: 'person', max: 30 },
      { id: 'jetski-hour', name: { en: 'Jet ski delivered to the yacht (1 hour)', fr: 'Jet-ski livré au yacht (1 heure)', ar: 'دراجة مائية إلى اليخت (ساعة)' }, price: 800, per: 'booking', max: 3 },
    ],
    highlights: {
      en: ['The whole yacht, not a shared cruise', 'Sunset departures available', 'Swim stop on longer charters (weather permitting)'],
      fr: ['Le yacht entier, pas une croisière partagée', 'Départs au coucher du soleil possibles', 'Baignade lors des sorties plus longues (selon la météo)'],
      ar: ['اليخت كاملاً، لا رحلة مشتركة', 'رحلات عند الغروب متاحة', 'توقف للسباحة في الرحلات الأطول (حسب الطقس)'],
    },
    included: {
      en: ['Captain and crew', 'Soft drinks and water', 'Bluetooth sound system', 'Life jackets and safety briefing'],
      fr: ['Capitaine et équipage', 'Boissons fraîches et eau', 'Système audio Bluetooth', 'Gilets de sauvetage et consignes de sécurité'],
      ar: ['القبطان والطاقم', 'مشروبات غازية ومياه', 'نظام صوت بلوتوث', 'سترات نجاة وتعليمات السلامة'],
    },
    notIncluded: {
      en: ['Hotel transfers', 'Food unless added as an extra'],
      fr: ['Transferts depuis l’hôtel', 'Repas sauf en option'],
      ar: ['التنقل من الفندق', 'الطعام إلا إذا أُضيف كخدمة إضافية'],
    },
    goodToKnow: {
      en: ['Minimum 2 hours.', 'Departs from Dubai Marina; exact berth confirmed with your booking.', 'Routes and swim stops depend on weather and port authority rules.'],
      fr: ['Minimum 2 heures.', 'Départ de Dubai Marina ; le quai exact est confirmé avec la réservation.', 'Itinéraires et baignades selon la météo et les règles portuaires.'],
      ar: ['الحد الأدنى ساعتان.', 'الانطلاق من دبي مارينا؛ يُؤكَّد الرصيف مع الحجز.', 'المسارات والتوقف للسباحة حسب الطقس وأنظمة الميناء.'],
    },
    faq: {
      en: [
        { q: 'Is the price per person?', a: 'No. The price is for the whole yacht, per hour.' },
        { q: 'Can you arrange a birthday or proposal?', a: 'Yes — add decoration and a cake, or tell us your idea and we will plan it with you.' },
      ],
      fr: [
        { q: 'Le prix est-il par personne ?', a: 'Non. Le prix est pour le yacht entier, à l’heure.' },
        { q: 'Pouvez-vous organiser un anniversaire ou une demande en mariage ?', a: 'Oui — ajoutez la décoration et un gâteau, ou parlez-nous de votre idée et nous l’organiserons avec vous.' },
      ],
      ar: [
        { q: 'هل السعر للشخص الواحد؟', a: 'لا. السعر لليخت كاملاً، بالساعة.' },
        { q: 'هل يمكنكم ترتيب عيد ميلاد أو طلب زواج؟', a: 'نعم — أضف الزينة والكعكة، أو أخبرنا بفكرتك وسنخطط لها معك.' },
      ],
    },
    related: ['sunset-celebration-yacht', 'jet-ski-burj-al-arab', 'helicopter-tour'],
    priceVerified: false,
  },
  {
    slug: 'sunset-celebration-yacht',
    category: 'on-the-water',
    image: 'yacht',
    name: { en: 'Sunset Celebration Yacht', fr: 'Yacht de Célébration au Coucher du Soleil', ar: 'يخت الاحتفال عند الغروب' },
    tagline: {
      en: 'Birthday, anniversary or proposal: a private yacht at golden hour, decorated for the occasion.',
      fr: 'Anniversaire, fête ou demande en mariage : un yacht privé à l’heure dorée, décoré pour l’occasion.',
      ar: 'عيد ميلاد أو ذكرى سنوية أو طلب زواج: يخت خاص في الساعة الذهبية، مزيّن للمناسبة.',
    },
    description: {
      en: 'A three-hour private sunset cruise with the yacht decorated before you board, a celebration cake and soft drinks. Tell us the occasion and the names — we take care of the details.',
      fr: 'Une croisière privée de trois heures au coucher du soleil, yacht décoré avant votre arrivée, gâteau de fête et boissons fraîches. Indiquez-nous l’occasion et les prénoms — nous nous occupons des détails.',
      ar: 'رحلة خاصة لثلاث ساعات عند الغروب، مع تزيين اليخت قبل صعودكم، وكعكة احتفال ومشروبات غازية. أخبرنا بالمناسبة والأسماء — ونحن نهتم بالتفاصيل.',
    },
    duration: { en: '3 hours', fr: '3 heures', ar: '3 ساعات' },
    groupSize: { en: 'Up to 18 guests', fr: 'Jusqu’à 18 personnes', ar: 'حتى 18 ضيفاً' },
    priceType: 'per_group',
    confirmation: 'on_request',
    minQty: 1,
    maxQty: 1,
    variants: [
      {
        id: 'celebration-45',
        name: { en: 'Intimate — 45 ft yacht', fr: 'Intime — yacht de 45 pieds', ar: 'خاص — يخت 45 قدماً' },
        detail: { en: 'Up to 10 guests', fr: 'Jusqu’à 10 personnes', ar: 'حتى 10 ضيوف' },
        price: 2950,
        capacity: 10,
        recommended: true,
      },
      {
        id: 'celebration-60',
        name: { en: 'Party — 60 ft yacht', fr: 'Fête — yacht de 60 pieds', ar: 'حفلة — يخت 60 قدماً' },
        detail: { en: 'Up to 18 guests', fr: 'Jusqu’à 18 personnes', ar: 'حتى 18 ضيفاً' },
        price: 4100,
        capacity: 18,
      },
    ],
    extras: [
      { id: 'photographer', name: { en: 'Photographer (1 hour)', fr: 'Photographe (1 heure)', ar: 'مصوّر (ساعة)' }, price: 900, per: 'booking', max: 1 },
      { id: 'flowers', name: { en: 'Rose bouquet', fr: 'Bouquet de roses', ar: 'باقة ورد' }, price: 450, per: 'booking', max: 2 },
      { id: 'bbq', name: { en: 'BBQ on board (per person)', fr: 'Barbecue à bord (par personne)', ar: 'شواء على متن اليخت (للشخص)' }, price: 120, per: 'person', max: 18 },
    ],
    highlights: {
      en: ['Decorated before you board', 'Celebration cake included', 'Timed for sunset'],
      fr: ['Décoré avant votre arrivée', 'Gâteau de fête inclus', 'Calé sur le coucher du soleil'],
      ar: ['تزيين قبل صعودكم', 'كعكة الاحتفال مشمولة', 'توقيت يناسب الغروب'],
    },
    included: {
      en: ['3-hour private charter', 'Captain and crew', 'Themed decoration', 'Celebration cake', 'Soft drinks and water'],
      fr: ['Croisière privée de 3 heures', 'Capitaine et équipage', 'Décoration à thème', 'Gâteau de fête', 'Boissons fraîches et eau'],
      ar: ['رحلة خاصة لثلاث ساعات', 'القبطان والطاقم', 'زينة حسب المناسبة', 'كعكة الاحتفال', 'مشروبات غازية ومياه'],
    },
    notIncluded: {
      en: ['Hotel transfers', 'Food unless added'],
      fr: ['Transferts depuis l’hôtel', 'Repas sauf en option'],
      ar: ['التنقل من الفندق', 'الطعام إلا إذا أُضيف'],
    },
    goodToKnow: {
      en: ['Please book at least 3 days ahead so decoration can be prepared.', 'Tell us names, colours and the occasion in your request.'],
      fr: ['Merci de réserver au moins 3 jours à l’avance pour préparer la décoration.', 'Indiquez prénoms, couleurs et occasion dans votre demande.'],
      ar: ['يرجى الحجز قبل 3 أيام على الأقل لتجهيز الزينة.', 'أخبرنا بالأسماء والألوان والمناسبة في طلبك.'],
    },
    faq: {
      en: [{ q: 'Can I keep the proposal a surprise?', a: 'Yes. Message us on WhatsApp and we will coordinate the timing discreetly.' }],
      fr: [{ q: 'La demande peut-elle rester une surprise ?', a: 'Oui. Écrivez-nous sur WhatsApp et nous coordonnerons le moment en toute discrétion.' }],
      ar: [{ q: 'هل يمكن أن يبقى طلب الزواج مفاجأة؟', a: 'نعم. راسلنا على واتساب وسننسق التوقيت بسرية.' }],
    },
    related: ['private-yacht-charter', 'private-desert-safari', 'private-chauffeur'],
    priceVerified: false,
  },
  {
    slug: 'jet-ski-burj-al-arab',
    category: 'on-the-water',
    image: 'burjAlArabAerial',
    name: { en: 'Jet Ski to Burj Al Arab', fr: 'Jet-Ski jusqu’au Burj Al Arab', ar: 'دراجة مائية إلى برج العرب' },
    tagline: {
      en: 'Ride past Burj Al Arab and Atlantis with a guide.',
      fr: 'Longez le Burj Al Arab et l’Atlantis avec un guide.',
      ar: 'انطلق بمحاذاة برج العرب وأتلانتس مع مرشد.',
    },
    description: {
      en: 'A guided jet ski ride along the Jumeirah coast with photo stops in front of Burj Al Arab — and, on the one-hour ride, around Palm Jumeirah to Atlantis. No licence needed.',
      fr: 'Une sortie guidée en jet-ski le long de la côte de Jumeirah avec arrêts photo devant le Burj Al Arab — et, en une heure, autour de Palm Jumeirah jusqu’à l’Atlantis. Aucun permis requis.',
      ar: 'جولة بالدراجة المائية مع مرشد على ساحل جميرا مع توقف للتصوير أمام برج العرب — وفي جولة الساعة حول نخلة جميرا حتى أتلانتس. لا حاجة لرخصة.',
    },
    duration: { en: '30 or 60 minutes', fr: '30 ou 60 minutes', ar: '30 أو 60 دقيقة' },
    groupSize: { en: '1–2 riders per jet ski', fr: '1 à 2 personnes par jet-ski', ar: '1–2 لكل دراجة' },
    priceType: 'per_unit',
    confirmation: 'on_request',
    minQty: 1,
    maxQty: 6,
    variants: [
      {
        id: 'jetski-30',
        name: { en: '30 minutes — Burj Al Arab', fr: '30 minutes — Burj Al Arab', ar: '30 دقيقة — برج العرب' },
        detail: { en: 'Per jet ski, up to 2 riders', fr: 'Par jet-ski, jusqu’à 2 personnes', ar: 'لكل دراجة، حتى شخصين' },
        price: 450,
        capacity: 2,
      },
      {
        id: 'jetski-60',
        name: { en: '60 minutes — Burj Al Arab & Atlantis', fr: '60 minutes — Burj Al Arab & Atlantis', ar: '60 دقيقة — برج العرب وأتلانتس' },
        detail: { en: 'Per jet ski, up to 2 riders', fr: 'Par jet-ski, jusqu’à 2 personnes', ar: 'لكل دراجة، حتى شخصين' },
        price: 750,
        capacity: 2,
        recommended: true,
      },
    ],
    highlights: {
      en: ['Guide rides with you', 'Photo stops at Burj Al Arab', 'No licence needed'],
      fr: ['Un guide vous accompagne', 'Arrêts photo au Burj Al Arab', 'Aucun permis requis'],
      ar: ['مرشد يرافقك', 'توقف للتصوير عند برج العرب', 'لا حاجة لرخصة'],
    },
    included: {
      en: ['Jet ski and fuel', 'Guide', 'Life jacket and safety briefing'],
      fr: ['Jet-ski et carburant', 'Guide', 'Gilet de sauvetage et consignes'],
      ar: ['الدراجة المائية والوقود', 'المرشد', 'سترة نجاة وتعليمات السلامة'],
    },
    notIncluded: {
      en: ['Transfers', 'Photos and video (ask us)'],
      fr: ['Transferts', 'Photos et vidéo (sur demande)'],
      ar: ['التنقلات', 'الصور والفيديو (اسألنا)'],
    },
    goodToKnow: {
      en: ['Drivers must be 16 or older; passengers from 8 years.', 'Emirates ID or passport required on the day.', 'Rides may be rescheduled for wind or sea conditions.'],
      fr: ['Pilote dès 16 ans ; passager dès 8 ans.', 'Pièce d’identité ou passeport requis le jour même.', 'Sorties reportables selon le vent et la mer.'],
      ar: ['السائق من عمر 16 عاماً؛ الراكب من 8 أعوام.', 'يلزم إحضار الهوية الإماراتية أو جواز السفر.', 'قد تُؤجَّل الجولة بسبب الرياح أو حالة البحر.'],
    },
    faq: {
      en: [{ q: 'Is the price per person?', a: 'No — per jet ski, which can carry up to two people.' }],
      fr: [{ q: 'Le prix est-il par personne ?', a: 'Non — par jet-ski, qui peut transporter deux personnes.' }],
      ar: [{ q: 'هل السعر للشخص؟', a: 'لا — لكل دراجة مائية، وتتسع لشخصين.' }],
    },
    related: ['private-yacht-charter', 'helicopter-tour', 'dune-buggy'],
    priceVerified: false,
  },

  // ───────────────────────────────── DESERT ────────────────────────────────
  {
    slug: 'private-desert-safari',
    category: 'desert',
    image: 'desert',
    name: { en: 'Private Desert Safari', fr: 'Safari Privé dans le Désert', ar: 'سفاري صحراوي خاص' },
    tagline: {
      en: 'Your own 4×4 and driver, sunset in the dunes and dinner at camp.',
      fr: 'Votre propre 4×4 avec chauffeur, coucher de soleil dans les dunes et dîner au camp.',
      ar: 'سيارتك الرباعية الدفع وسائقك الخاص، والغروب في الكثبان، والعشاء في المخيم.',
    },
    description: {
      en: 'Hotel pickup in a private 4×4 for your group only, dune driving at the pace you choose, a sunset stop and dinner at a desert camp. The private alternative to the crowded shared safaris.',
      fr: 'Prise en charge à l’hôtel en 4×4 privé pour votre seul groupe, conduite dans les dunes au rythme que vous choisissez, pause au coucher du soleil et dîner dans un camp. L’alternative privée aux safaris partagés.',
      ar: 'استقبال من الفندق بسيارة رباعية الدفع لمجموعتك فقط، وقيادة في الكثبان بالإيقاع الذي تختاره، وتوقف عند الغروب، وعشاء في مخيم صحراوي. البديل الخاص عن رحلات السفاري المزدحمة.',
    },
    duration: { en: 'About 6 hours', fr: 'Environ 6 heures', ar: 'نحو 6 ساعات' },
    groupSize: { en: 'Up to 6 per vehicle', fr: 'Jusqu’à 6 par véhicule', ar: 'حتى 6 لكل سيارة' },
    priceType: 'per_vehicle',
    confirmation: 'on_request',
    minQty: 1,
    maxQty: 4,
    variants: [
      {
        id: 'private-evening',
        name: { en: 'Evening safari with dinner', fr: 'Safari du soir avec dîner', ar: 'سفاري مسائي مع عشاء' },
        detail: { en: 'Per vehicle, up to 6 guests', fr: 'Par véhicule, jusqu’à 6 personnes', ar: 'لكل سيارة، حتى 6 ضيوف' },
        price: 1900,
        capacity: 6,
        recommended: true,
      },
      {
        id: 'private-morning',
        name: { en: 'Morning dunes (no dinner)', fr: 'Dunes du matin (sans dîner)', ar: 'كثبان الصباح (بدون عشاء)' },
        detail: { en: 'Per vehicle, up to 6 guests, about 4 hours', fr: 'Par véhicule, jusqu’à 6 personnes, environ 4 heures', ar: 'لكل سيارة، حتى 6 ضيوف، نحو 4 ساعات' },
        price: 1250,
        capacity: 6,
      },
    ],
    extras: [
      { id: 'quad-30', name: { en: 'Quad bike, 30 minutes (per bike)', fr: 'Quad, 30 minutes (par quad)', ar: 'دراجة رباعية، 30 دقيقة (لكل دراجة)' }, price: 300, per: 'booking', max: 6 },
      { id: 'private-table', name: { en: 'Private dinner table set-up', fr: 'Table de dîner privée', ar: 'طاولة عشاء خاصة' }, price: 650, per: 'booking', max: 1 },
    ],
    highlights: {
      en: ['Your group only', 'Sunset in the dunes', 'Dinner at a desert camp'],
      fr: ['Votre groupe uniquement', 'Coucher de soleil dans les dunes', 'Dîner dans un camp'],
      ar: ['مجموعتك فقط', 'الغروب في الكثبان', 'عشاء في مخيم صحراوي'],
    },
    included: {
      en: ['Private 4×4 with driver', 'Hotel pickup and drop-off in Dubai', 'Dune drive and sunset stop', 'Dinner and soft drinks (evening option)'],
      fr: ['4×4 privé avec chauffeur', 'Prise en charge et retour à l’hôtel à Dubaï', 'Conduite dans les dunes et pause au coucher du soleil', 'Dîner et boissons (option du soir)'],
      ar: ['سيارة رباعية خاصة مع سائق', 'الاستقبال والتوصيل من وإلى الفندق في دبي', 'قيادة في الكثبان وتوقف عند الغروب', 'العشاء والمشروبات الغازية (الخيار المسائي)'],
    },
    notIncluded: {
      en: ['Quad bikes unless added', 'Pickup outside Dubai'],
      fr: ['Quad sauf en option', 'Prise en charge hors de Dubaï'],
      ar: ['الدراجات الرباعية إلا إذا أُضيفت', 'الاستقبال خارج دبي'],
    },
    goodToKnow: {
      en: ['Dune driving can be gentle on request — tell us if you are travelling with children or prefer a calm drive.', 'Not recommended during pregnancy or with back problems.'],
      fr: ['La conduite peut être douce sur demande — prévenez-nous si vous voyagez avec des enfants.', 'Déconseillé pendant la grossesse ou en cas de problèmes de dos.'],
      ar: ['يمكن أن تكون القيادة هادئة عند الطلب — أخبرنا إن كنت مع أطفال.', 'لا يُنصح به أثناء الحمل أو لمن يعاني من مشاكل في الظهر.'],
    },
    faq: {
      en: [{ q: 'Is it suitable for children?', a: 'Yes. Car seats can be arranged — mention ages in your request.' }],
      fr: [{ q: 'Est-ce adapté aux enfants ?', a: 'Oui. Des sièges enfants peuvent être prévus — indiquez les âges dans votre demande.' }],
      ar: [{ q: 'هل يناسب الأطفال؟', a: 'نعم. يمكن ترتيب مقاعد أطفال — اذكر الأعمار في طلبك.' }],
    },
    related: ['dune-buggy', 'hot-air-balloon', 'premium-desert-safari'],
    priceVerified: false,
  },
  {
    slug: 'premium-desert-safari',
    category: 'desert',
    image: 'desert',
    name: { en: 'Premium Evening Desert Safari', fr: 'Safari du Soir Premium', ar: 'سفاري مسائي مميز' },
    tagline: {
      en: 'Small-group evening in the dunes with dinner at a quieter camp.',
      fr: 'Une soirée en petit groupe dans les dunes, avec dîner dans un camp plus calme.',
      ar: 'أمسية بمجموعة صغيرة في الكثبان مع عشاء في مخيم أهدأ.',
    },
    description: {
      en: 'Shared 4×4 with a small group, dune drive, sunset photo stop and dinner at a camp chosen for space and quality rather than crowds.',
      fr: '4×4 partagé en petit groupe, conduite dans les dunes, arrêt photo au coucher du soleil et dîner dans un camp choisi pour son espace et sa qualité.',
      ar: 'سيارة رباعية مشتركة بمجموعة صغيرة، وقيادة في الكثبان، وتوقف للتصوير عند الغروب، وعشاء في مخيم اخترناه لرحابته وجودته.',
    },
    duration: { en: 'About 6 hours', fr: 'Environ 6 heures', ar: 'نحو 6 ساعات' },
    groupSize: { en: 'Small groups', fr: 'Petits groupes', ar: 'مجموعات صغيرة' },
    priceType: 'per_person',
    confirmation: 'on_request',
    minQty: 1,
    maxQty: 12,
    variants: [
      {
        id: 'premium-shared',
        name: { en: 'Evening safari with dinner', fr: 'Safari du soir avec dîner', ar: 'سفاري مسائي مع عشاء' },
        detail: { en: 'Per person · children 3–11 at a reduced rate', fr: 'Par personne · enfants 3–11 ans à tarif réduit', ar: 'للشخص · الأطفال 3–11 بسعر مخفّض' },
        price: 320,
        childPrice: 240,
        recommended: true,
      },
    ],
    highlights: {
      en: ['Small groups', 'Sunset photo stop', 'Dinner at a quieter camp'],
      fr: ['Petits groupes', 'Arrêt photo au coucher du soleil', 'Dîner dans un camp plus calme'],
      ar: ['مجموعات صغيرة', 'توقف للتصوير عند الغروب', 'عشاء في مخيم أهدأ'],
    },
    included: {
      en: ['Hotel pickup in Dubai', 'Dune drive', 'Dinner and soft drinks', 'Camp activities'],
      fr: ['Prise en charge à l’hôtel à Dubaï', 'Conduite dans les dunes', 'Dîner et boissons', 'Activités au camp'],
      ar: ['الاستقبال من الفندق في دبي', 'القيادة في الكثبان', 'العشاء والمشروبات الغازية', 'أنشطة المخيم'],
    },
    notIncluded: {
      en: ['Quad bikes', 'Pickup outside Dubai'],
      fr: ['Quad', 'Prise en charge hors de Dubaï'],
      ar: ['الدراجات الرباعية', 'الاستقبال خارج دبي'],
    },
    goodToKnow: {
      en: ['Children under 3 travel free on an adult’s lap where permitted.', 'Pickup time is usually mid-afternoon; we confirm it the day before.'],
      fr: ['Enfants de moins de 3 ans gratuits sur les genoux d’un adulte lorsque c’est autorisé.', 'Prise en charge en milieu d’après-midi ; horaire confirmé la veille.'],
      ar: ['الأطفال دون 3 سنوات مجاناً في حضن شخص بالغ حيث يُسمح بذلك.', 'موعد الاستقبال عادةً بعد الظهر؛ نؤكده قبل يوم.'],
    },
    faq: noGuides,
    related: ['private-desert-safari', 'dune-buggy', 'burj-khalifa-at-the-top'],
    priceVerified: false,
  },
  {
    slug: 'dune-buggy',
    category: 'desert',
    image: 'desert',
    name: { en: 'Dune Buggy', fr: 'Buggy dans les Dunes', ar: 'دراجة الكثبان (باغي)' },
    tagline: {
      en: 'One hour at the wheel on the red dunes, with a guide in front.',
      fr: 'Une heure au volant sur les dunes rouges, guide en tête.',
      ar: 'ساعة خلف المقود على الكثبان الحمراء، مع مرشد في المقدمة.',
    },
    description: {
      en: 'Drive your own buggy through the dunes behind an experienced guide, with photo stops along the way. Choose a two-seat or four-seat buggy.',
      fr: 'Pilotez votre propre buggy dans les dunes derrière un guide expérimenté, avec des arrêts photo. Choisissez un buggy deux ou quatre places.',
      ar: 'قُد باغي خاص بك عبر الكثبان خلف مرشد خبير، مع توقفات للتصوير. اختر باغي بمقعدين أو أربعة مقاعد.',
    },
    duration: { en: '1 hour of driving', fr: '1 heure de conduite', ar: 'ساعة من القيادة' },
    groupSize: { en: '2 or 4 per buggy', fr: '2 ou 4 par buggy', ar: '2 أو 4 لكل باغي' },
    priceType: 'per_unit',
    confirmation: 'on_request',
    minQty: 1,
    maxQty: 6,
    variants: [
      {
        id: 'buggy-2',
        name: { en: '2-seat buggy', fr: 'Buggy 2 places', ar: 'باغي بمقعدين' },
        detail: { en: 'Per buggy, 1 hour', fr: 'Par buggy, 1 heure', ar: 'لكل باغي، ساعة' },
        price: 950,
        capacity: 2,
        recommended: true,
      },
      {
        id: 'buggy-4',
        name: { en: '4-seat buggy', fr: 'Buggy 4 places', ar: 'باغي بأربعة مقاعد' },
        detail: { en: 'Per buggy, 1 hour', fr: 'Par buggy, 1 heure', ar: 'لكل باغي، ساعة' },
        price: 1300,
        capacity: 4,
      },
    ],
    extras: [
      { id: 'buggy-transfer', name: { en: 'Private return transfer from your hotel', fr: 'Transfert privé aller-retour depuis l’hôtel', ar: 'توصيل خاص ذهاباً وإياباً من الفندق' }, price: 400, per: 'booking', max: 2 },
    ],
    highlights: {
      en: ['You drive, the guide leads', 'Morning or late-afternoon light', '2 or 4 seats'],
      fr: ['Vous conduisez, le guide ouvre la voie', 'Lumière du matin ou de fin d’après-midi', '2 ou 4 places'],
      ar: ['أنت تقود والمرشد يتقدّم', 'ضوء الصباح أو آخر النهار', 'مقعدان أو أربعة'],
    },
    included: {
      en: ['Buggy and fuel', 'Guide', 'Helmet and safety gear', 'Water'],
      fr: ['Buggy et carburant', 'Guide', 'Casque et équipement', 'Eau'],
      ar: ['الباغي والوقود', 'المرشد', 'الخوذة ومعدات السلامة', 'المياه'],
    },
    notIncluded: {
      en: ['Hotel transfer unless added'],
      fr: ['Transfert sauf en option'],
      ar: ['التوصيل من الفندق إلا إذا أُضيف'],
    },
    goodToKnow: {
      en: ['Drivers need a valid driving licence and must be 18 or older.', 'Wear closed shoes and sunglasses.'],
      fr: ['Le pilote doit avoir 18 ans et un permis valide.', 'Prévoyez des chaussures fermées et des lunettes de soleil.'],
      ar: ['يجب أن يكون السائق بعمر 18 عاماً ويحمل رخصة سارية.', 'ارتدِ حذاءً مغلقاً ونظارات شمسية.'],
    },
    faq: {
      en: [{ q: 'Is the price per person?', a: 'No — per buggy. A 4-seat buggy shared by four is the best value per person.' }],
      fr: [{ q: 'Le prix est-il par personne ?', a: 'Non — par buggy. Un buggy 4 places partagé à quatre est le plus avantageux.' }],
      ar: [{ q: 'هل السعر للشخص؟', a: 'لا — لكل باغي. الباغي بأربعة مقاعد لأربعة أشخاص هو الأوفر للفرد.' }],
    },
    related: ['private-desert-safari', 'hot-air-balloon', 'jet-ski-burj-al-arab'],
    priceVerified: false,
  },
  {
    slug: 'hot-air-balloon',
    category: 'desert',
    image: 'desert',
    name: { en: 'Hot Air Balloon at Sunrise', fr: 'Montgolfière au Lever du Soleil', ar: 'منطاد الهواء الساخن عند الشروق' },
    tagline: {
      en: 'Float over the desert as the sun comes up.',
      fr: 'Survolez le désert au lever du soleil.',
      ar: 'حلّق فوق الصحراء مع شروق الشمس.',
    },
    description: {
      en: 'An early-morning pickup, about an hour in the air over the dunes at sunrise, and a landing celebration. One of the most memorable mornings in Dubai.',
      fr: 'Prise en charge très tôt, environ une heure de vol au-dessus des dunes au lever du soleil, puis célébration à l’atterrissage. L’un des matins les plus mémorables à Dubaï.',
      ar: 'استقبال في الصباح الباكر، ونحو ساعة في الجو فوق الكثبان عند الشروق، واحتفال عند الهبوط. من أجمل صباحات دبي.',
    },
    duration: { en: 'About 4 hours incl. transfers', fr: 'Environ 4 heures avec transferts', ar: 'نحو 4 ساعات مع التنقلات' },
    groupSize: { en: 'Per person', fr: 'Par personne', ar: 'للشخص' },
    priceType: 'per_person',
    confirmation: 'on_request',
    minQty: 1,
    maxQty: 12,
    variants: [
      {
        id: 'balloon-classic',
        name: { en: 'Classic basket', fr: 'Nacelle classique', ar: 'سلة عادية' },
        detail: { en: 'Per person, shared basket', fr: 'Par personne, nacelle partagée', ar: 'للشخص، سلة مشتركة' },
        price: 1150,
        recommended: true,
      },
      {
        id: 'balloon-premium',
        name: { en: 'Premium small basket', fr: 'Petite nacelle premium', ar: 'سلة صغيرة مميزة' },
        detail: { en: 'Per person, fewer guests per basket', fr: 'Par personne, moins de passagers', ar: 'للشخص، عدد ركاب أقل' },
        price: 1750,
      },
    ],
    highlights: {
      en: ['Sunrise over the dunes', 'About an hour in the air', 'Hotel pickup'],
      fr: ['Lever du soleil sur les dunes', 'Environ une heure de vol', 'Prise en charge à l’hôtel'],
      ar: ['الشروق فوق الكثبان', 'نحو ساعة في الجو', 'الاستقبال من الفندق'],
    },
    included: {
      en: ['Hotel pickup and drop-off in Dubai', 'Balloon flight', 'Light refreshments'],
      fr: ['Prise en charge et retour à l’hôtel à Dubaï', 'Vol en montgolfière', 'Rafraîchissements'],
      ar: ['الاستقبال والتوصيل في دبي', 'رحلة المنطاد', 'مرطبات خفيفة'],
    },
    notIncluded: { en: ['Breakfast unless stated by the operator'], fr: ['Petit-déjeuner sauf mention contraire'], ar: ['الإفطار ما لم يذكره المشغّل'] },
    goodToKnow: {
      en: ['Pickup is very early, usually between 4 and 5 am.', 'Flights depend on wind; if cancelled by the operator you can rebook or be refunded.', 'Minimum age and health restrictions apply.'],
      fr: ['Prise en charge très tôt, généralement entre 4 h et 5 h.', 'Vols selon le vent ; en cas d’annulation par l’opérateur, report ou remboursement.', 'Âge minimum et restrictions de santé.'],
      ar: ['الاستقبال مبكر جداً، عادةً بين 4 و5 صباحاً.', 'الرحلات حسب الرياح؛ عند الإلغاء من المشغّل يمكنك إعادة الحجز أو الاسترداد.', 'توجد قيود عمرية وصحية.'],
    },
    faq: noGuides,
    related: ['private-desert-safari', 'helicopter-tour', 'dune-buggy'],
    priceVerified: false,
  },

  // ─────────────────────────────────── SKY ──────────────────────────────────
  {
    slug: 'helicopter-tour',
    category: 'sky',
    image: 'burjAlArabAerial',
    name: { en: 'Helicopter Tour over Dubai', fr: 'Vol en Hélicoptère au-dessus de Dubaï', ar: 'جولة هليكوبتر فوق دبي' },
    tagline: {
      en: 'Palm Jumeirah, Burj Al Arab and Downtown from above.',
      fr: 'Palm Jumeirah, le Burj Al Arab et Downtown vus d’en haut.',
      ar: 'نخلة جميرا وبرج العرب ووسط المدينة من الأعلى.',
    },
    description: {
      en: 'A scenic flight over Dubai’s icons. The longer the flight, the more of the city you see — from the Palm and Burj Al Arab to Downtown and Burj Khalifa.',
      fr: 'Un vol panoramique au-dessus des icônes de Dubaï. Plus le vol est long, plus vous voyez la ville — de la Palm et du Burj Al Arab jusqu’à Downtown et Burj Khalifa.',
      ar: 'رحلة فوق معالم دبي. كلما طالت الرحلة رأيت أكثر — من النخلة وبرج العرب إلى وسط المدينة وبرج خليفة.',
    },
    duration: { en: '12, 17 or 22 minutes', fr: '12, 17 ou 22 minutes', ar: '12 أو 17 أو 22 دقيقة' },
    groupSize: { en: 'Per seat', fr: 'Par siège', ar: 'للمقعد' },
    priceType: 'per_person',
    confirmation: 'on_request',
    minQty: 1,
    maxQty: 6,
    variants: [
      {
        id: 'heli-12',
        name: { en: '12 minutes — Palm & Burj Al Arab', fr: '12 minutes — Palm & Burj Al Arab', ar: '12 دقيقة — النخلة وبرج العرب' },
        detail: { en: 'Per seat', fr: 'Par siège', ar: 'للمقعد' },
        price: 750,
      },
      {
        id: 'heli-17',
        name: { en: '17 minutes — adds Dubai Marina', fr: '17 minutes — avec Dubai Marina', ar: '17 دقيقة — مع دبي مارينا' },
        detail: { en: 'Per seat', fr: 'Par siège', ar: 'للمقعد' },
        price: 1050,
        recommended: true,
      },
      {
        id: 'heli-22',
        name: { en: '22 minutes — adds Downtown & Burj Khalifa', fr: '22 minutes — avec Downtown & Burj Khalifa', ar: '22 دقيقة — مع وسط المدينة وبرج خليفة' },
        detail: { en: 'Per seat', fr: 'Par siège', ar: 'للمقعد' },
        price: 1350,
      },
    ],
    highlights: {
      en: ['Dubai’s icons in one flight', 'Window seats for everyone on most aircraft', 'Private aircraft on request'],
      fr: ['Les icônes de Dubaï en un vol', 'Places côté hublot sur la plupart des appareils', 'Appareil privatisé sur demande'],
      ar: ['معالم دبي في رحلة واحدة', 'مقاعد بجانب النافذة في معظم الطائرات', 'طائرة خاصة عند الطلب'],
    },
    included: {
      en: ['Scenic flight', 'Safety briefing'],
      fr: ['Vol panoramique', 'Consignes de sécurité'],
      ar: ['الرحلة الجوية', 'تعليمات السلامة'],
    },
    notIncluded: { en: ['Hotel transfers'], fr: ['Transferts'], ar: ['التنقلات'] },
    goodToKnow: {
      en: ['Passport or Emirates ID required for every passenger.', 'Weight and age limits apply; flights may move for weather.'],
      fr: ['Passeport ou pièce d’identité requis pour chaque passager.', 'Limites de poids et d’âge ; horaires selon la météo.'],
      ar: ['يلزم جواز السفر أو الهوية لكل راكب.', 'توجد قيود على الوزن والعمر؛ وقد تتغير المواعيد حسب الطقس.'],
    },
    faq: {
      en: [{ q: 'Can we book the whole helicopter?', a: 'Yes — ask us for a private flight quote.' }],
      fr: [{ q: 'Peut-on privatiser l’hélicoptère ?', a: 'Oui — demandez-nous un devis pour un vol privé.' }],
      ar: [{ q: 'هل يمكن حجز الطائرة كاملة؟', a: 'نعم — اطلب منا عرض سعر لرحلة خاصة.' }],
    },
    related: ['private-yacht-charter', 'burj-khalifa-at-the-top', 'hot-air-balloon'],
    priceVerified: false,
  },

  // ─────────────────────────── CHAUFFEUR & TRANSFERS ───────────────────────
  {
    slug: 'airport-transfer',
    category: 'transfers',
    image: 'arrival',
    name: { en: 'Airport Meet & Greet Transfer', fr: 'Transfert Aéroport avec Accueil', ar: 'استقبال وتوصيل من المطار' },
    tagline: {
      en: 'Met at arrivals and driven straight to your hotel.',
      fr: 'Accueilli à l’arrivée et conduit directement à votre hôtel.',
      ar: 'استقبال في صالة الوصول وتوصيل مباشر إلى فندقك.',
    },
    description: {
      en: 'Your driver meets you in the arrivals hall with a name sign, helps with luggage and drives you privately to your hotel or home anywhere in Dubai. Flight tracking means we wait if you are late.',
      fr: 'Votre chauffeur vous attend dans le hall des arrivées avec une pancarte, s’occupe des bagages et vous conduit à votre hôtel ou domicile à Dubaï. Nous suivons votre vol en cas de retard.',
      ar: 'يستقبلك السائق في صالة الوصول بلافتة باسمك، ويساعدك في الأمتعة، ويوصلك إلى فندقك أو منزلك في أي مكان في دبي. نتابع رحلتك وننتظر إن تأخرت.',
    },
    duration: { en: 'One way', fr: 'Aller simple', ar: 'اتجاه واحد' },
    groupSize: { en: 'Up to 7 per vehicle', fr: 'Jusqu’à 7 par véhicule', ar: 'حتى 7 لكل سيارة' },
    priceType: 'per_vehicle',
    confirmation: 'on_request',
    minQty: 1,
    maxQty: 4,
    variants: [
      {
        id: 'airport-sedan',
        name: { en: 'Business sedan', fr: 'Berline affaires', ar: 'سيدان رجال أعمال' },
        detail: { en: 'Up to 3 passengers, 2 large bags', fr: 'Jusqu’à 3 passagers, 2 grandes valises', ar: 'حتى 3 ركاب وحقيبتين كبيرتين' },
        price: 280,
        capacity: 3,
      },
      {
        id: 'airport-suv',
        name: { en: 'Premium SUV', fr: 'SUV premium', ar: 'سيارة دفع رباعي فاخرة' },
        detail: { en: 'Up to 6 passengers, 4 large bags', fr: 'Jusqu’à 6 passagers, 4 grandes valises', ar: 'حتى 6 ركاب و4 حقائب كبيرة' },
        price: 420,
        capacity: 6,
        recommended: true,
      },
      {
        id: 'airport-van',
        name: { en: 'Luxury van', fr: 'Van de luxe', ar: 'فان فاخر' },
        detail: { en: 'Up to 7 passengers, 6 large bags', fr: 'Jusqu’à 7 passagers, 6 grandes valises', ar: 'حتى 7 ركاب و6 حقائب كبيرة' },
        price: 480,
        capacity: 7,
      },
    ],
    extras: [
      { id: 'fast-track', name: { en: 'Arrival fast-track assistance (per person)', fr: 'Assistance coupe-file à l’arrivée (par personne)', ar: 'مساعدة المسار السريع عند الوصول (للشخص)' }, price: 350, per: 'person', max: 7 },
      { id: 'child-seat', name: { en: 'Child seat', fr: 'Siège enfant', ar: 'مقعد طفل' }, price: 0, per: 'booking', max: 3 },
    ],
    highlights: {
      en: ['Name-sign welcome in arrivals', 'Flight tracking', 'Fixed price to anywhere in Dubai'],
      fr: ['Accueil avec pancarte', 'Suivi du vol', 'Prix fixe partout à Dubaï'],
      ar: ['استقبال بلافتة باسمك', 'متابعة الرحلة', 'سعر ثابت لأي مكان في دبي'],
    },
    included: {
      en: ['Private vehicle and driver', 'Meet & greet in arrivals', 'Up to 60 minutes waiting after landing', 'Water on board'],
      fr: ['Véhicule privé avec chauffeur', 'Accueil dans le hall des arrivées', 'Jusqu’à 60 minutes d’attente après l’atterrissage', 'Eau à bord'],
      ar: ['سيارة خاصة مع سائق', 'الاستقبال في صالة الوصول', 'انتظار حتى 60 دقيقة بعد الهبوط', 'مياه في السيارة'],
    },
    notIncluded: { en: ['Destinations outside Dubai (ask us)'], fr: ['Destinations hors Dubaï (sur demande)'], ar: ['الوجهات خارج دبي (اسألنا)'] },
    goodToKnow: {
      en: ['Price covers Dubai International (DXB) to any address in Dubai. Al Maktoum (DWC) on request.', 'Send your flight number with your request.'],
      fr: ['Prix valable de Dubai International (DXB) vers toute adresse à Dubaï. Al Maktoum (DWC) sur demande.', 'Indiquez votre numéro de vol dans la demande.'],
      ar: ['السعر من مطار دبي الدولي (DXB) إلى أي عنوان في دبي. مطار آل مكتوم (DWC) عند الطلب.', 'أرسل رقم رحلتك مع الطلب.'],
    },
    faq: {
      en: [{ q: 'What if my flight is delayed?', a: 'We track your flight and adjust the pickup time automatically.' }],
      fr: [{ q: 'Et si mon vol est en retard ?', a: 'Nous suivons votre vol et ajustons l’heure de prise en charge.' }],
      ar: [{ q: 'ماذا لو تأخرت رحلتي؟', a: 'نتابع رحلتك ونعدّل موعد الاستقبال تلقائياً.' }],
    },
    related: ['private-chauffeur', 'abu-dhabi-day-trip', 'private-yacht-charter'],
    priceVerified: false,
  },
  {
    slug: 'private-chauffeur',
    category: 'transfers',
    image: 'dubaiSkyline',
    name: { en: 'Private Chauffeur by the Hour', fr: 'Chauffeur Privé à l’Heure', ar: 'سائق خاص بالساعة' },
    tagline: {
      en: 'A car and driver at your disposal for half a day or a full day.',
      fr: 'Une voiture avec chauffeur à votre disposition pour une demi-journée ou une journée.',
      ar: 'سيارة وسائق تحت تصرفك لنصف يوم أو يوم كامل.',
    },
    description: {
      en: 'Shopping, meetings, sightseeing or an evening out — your driver waits and takes you wherever you need within Dubai.',
      fr: 'Shopping, rendez-vous, visites ou soirée — votre chauffeur vous attend et vous conduit partout à Dubaï.',
      ar: 'تسوق أو اجتماعات أو جولات أو سهرة — ينتظرك السائق ويأخذك أينما احتجت داخل دبي.',
    },
    duration: { en: '5 or 10 hours', fr: '5 ou 10 heures', ar: '5 أو 10 ساعات' },
    groupSize: { en: 'Up to 6 per vehicle', fr: 'Jusqu’à 6 par véhicule', ar: 'حتى 6 لكل سيارة' },
    priceType: 'per_vehicle',
    confirmation: 'on_request',
    minQty: 1,
    maxQty: 3,
    variants: [
      { id: 'sedan-5', name: { en: 'Sedan — 5 hours', fr: 'Berline — 5 heures', ar: 'سيدان — 5 ساعات' }, detail: { en: 'Up to 3 passengers', fr: 'Jusqu’à 3 passagers', ar: 'حتى 3 ركاب' }, price: 800, capacity: 3 },
      { id: 'sedan-10', name: { en: 'Sedan — 10 hours', fr: 'Berline — 10 heures', ar: 'سيدان — 10 ساعات' }, detail: { en: 'Up to 3 passengers', fr: 'Jusqu’à 3 passagers', ar: 'حتى 3 ركاب' }, price: 1400, capacity: 3 },
      { id: 'suv-5', name: { en: 'Premium SUV — 5 hours', fr: 'SUV premium — 5 heures', ar: 'دفع رباعي فاخر — 5 ساعات' }, detail: { en: 'Up to 6 passengers', fr: 'Jusqu’à 6 passagers', ar: 'حتى 6 ركاب' }, price: 1000, capacity: 6, recommended: true },
      { id: 'suv-10', name: { en: 'Premium SUV — 10 hours', fr: 'SUV premium — 10 heures', ar: 'دفع رباعي فاخر — 10 ساعات' }, detail: { en: 'Up to 6 passengers', fr: 'Jusqu’à 6 passagers', ar: 'حتى 6 ركاب' }, price: 1750, capacity: 6 },
    ],
    highlights: {
      en: ['Driver waits for you', 'Fuel and parking included', 'Arabic- and English-speaking drivers'],
      fr: ['Le chauffeur vous attend', 'Carburant et parking inclus', 'Chauffeurs arabophones et anglophones'],
      ar: ['السائق ينتظرك', 'الوقود والمواقف مشمولة', 'سائقون يتحدثون العربية والإنجليزية'],
    },
    included: {
      en: ['Vehicle and driver', 'Fuel, tolls and parking within Dubai', 'Water on board'],
      fr: ['Véhicule et chauffeur', 'Carburant, péages et parking à Dubaï', 'Eau à bord'],
      ar: ['السيارة والسائق', 'الوقود والرسوم والمواقف داخل دبي', 'مياه في السيارة'],
    },
    notIncluded: { en: ['Trips to other emirates (see Day Trips)', 'Extra hours (charged per hour)'], fr: ['Trajets vers d’autres émirats (voir Excursions)', 'Heures supplémentaires'], ar: ['الرحلات إلى إمارات أخرى (انظر الرحلات اليومية)', 'الساعات الإضافية'] },
    goodToKnow: {
      en: ['Hours run from the pickup time.', 'Tell us your rough plan so we can suggest timings.'],
      fr: ['Les heures commencent à la prise en charge.', 'Partagez votre programme pour que nous suggérions les horaires.'],
      ar: ['تبدأ الساعات من موعد الاستقبال.', 'أخبرنا بخطتك التقريبية لنقترح التوقيت.'],
    },
    faq: noGuides,
    related: ['airport-transfer', 'abu-dhabi-day-trip', 'burj-khalifa-at-the-top'],
    priceVerified: false,
  },

  // ──────────────────────────────── DAY TRIPS ──────────────────────────────
  {
    slug: 'abu-dhabi-day-trip',
    category: 'day-trips',
    image: 'grandMosque',
    name: { en: 'Private Abu Dhabi Day Trip', fr: 'Journée Privée à Abu Dhabi', ar: 'رحلة يومية خاصة إلى أبوظبي' },
    tagline: {
      en: 'Sheikh Zayed Grand Mosque and the capital’s landmarks with your own driver.',
      fr: 'La Grande Mosquée Cheikh Zayed et les sites de la capitale avec votre propre chauffeur.',
      ar: 'جامع الشيخ زايد الكبير ومعالم العاصمة مع سائقك الخاص.',
    },
    description: {
      en: 'A full day from Dubai to Abu Dhabi in a private car: the Grand Mosque, the Corniche and your choice of Louvre Abu Dhabi or Qasr Al Watan. Your pace, your stops.',
      fr: 'Une journée complète de Dubaï à Abu Dhabi en voiture privée : la Grande Mosquée, la Corniche et, au choix, le Louvre Abu Dhabi ou Qasr Al Watan. À votre rythme.',
      ar: 'يوم كامل من دبي إلى أبوظبي بسيارة خاصة: الجامع الكبير والكورنيش، ومتحف اللوفر أبوظبي أو قصر الوطن حسب اختيارك. على إيقاعك.',
    },
    duration: { en: 'About 9 hours', fr: 'Environ 9 heures', ar: 'نحو 9 ساعات' },
    groupSize: { en: 'Up to 6 per vehicle', fr: 'Jusqu’à 6 par véhicule', ar: 'حتى 6 لكل سيارة' },
    priceType: 'per_vehicle',
    confirmation: 'on_request',
    minQty: 1,
    maxQty: 3,
    variants: [
      { id: 'ad-sedan', name: { en: 'Sedan', fr: 'Berline', ar: 'سيدان' }, detail: { en: 'Up to 3 guests', fr: 'Jusqu’à 3 personnes', ar: 'حتى 3 ضيوف' }, price: 1450, capacity: 3 },
      { id: 'ad-suv', name: { en: 'Premium SUV', fr: 'SUV premium', ar: 'دفع رباعي فاخر' }, detail: { en: 'Up to 6 guests', fr: 'Jusqu’à 6 personnes', ar: 'حتى 6 ضيوف' }, price: 1850, capacity: 6, recommended: true },
    ],
    extras: [
      { id: 'louvre-ticket', name: { en: 'Louvre Abu Dhabi ticket (per person)', fr: 'Billet Louvre Abu Dhabi (par personne)', ar: 'تذكرة اللوفر أبوظبي (للشخص)' }, price: 75, per: 'person', max: 6 },
      { id: 'qasr-ticket', name: { en: 'Qasr Al Watan ticket (per person)', fr: 'Billet Qasr Al Watan (par personne)', ar: 'تذكرة قصر الوطن (للشخص)' }, price: 75, per: 'person', max: 6 },
    ],
    highlights: {
      en: ['Sheikh Zayed Grand Mosque', 'Louvre Abu Dhabi or Qasr Al Watan', 'Private car door to door'],
      fr: ['Grande Mosquée Cheikh Zayed', 'Louvre Abu Dhabi ou Qasr Al Watan', 'Voiture privée de porte à porte'],
      ar: ['جامع الشيخ زايد الكبير', 'اللوفر أبوظبي أو قصر الوطن', 'سيارة خاصة من الباب إلى الباب'],
    },
    included: {
      en: ['Private vehicle and driver for the day', 'Pickup and drop-off in Dubai', 'Fuel and tolls', 'Water on board'],
      fr: ['Véhicule privé et chauffeur pour la journée', 'Prise en charge et retour à Dubaï', 'Carburant et péages', 'Eau à bord'],
      ar: ['سيارة خاصة وسائق طوال اليوم', 'الاستقبال والتوصيل في دبي', 'الوقود والرسوم', 'مياه في السيارة'],
    },
    notIncluded: { en: ['Entry tickets unless added', 'Lunch', 'Licensed guide (ask us)'], fr: ['Billets sauf en option', 'Déjeuner', 'Guide agréé (sur demande)'], ar: ['تذاكر الدخول إلا إذا أُضيفت', 'الغداء', 'مرشد مرخّص (اسألنا)'] },
    goodToKnow: {
      en: ['The Grand Mosque has a dress code: long sleeves and trousers or long skirts; women cover their hair.', 'The Mosque is closed to visitors on Friday mornings.'],
      fr: ['Code vestimentaire à la Grande Mosquée : manches longues et pantalon ou jupe longue ; les femmes couvrent leurs cheveux.', 'La Mosquée est fermée aux visiteurs le vendredi matin.'],
      ar: ['للجامع قواعد لباس: أكمام طويلة وسراويل أو تنانير طويلة، وتغطي النساء شعرهن.', 'الجامع مغلق أمام الزوار صباح الجمعة.'],
    },
    faq: noGuides,
    related: ['private-chauffeur', 'airport-transfer', 'burj-khalifa-at-the-top'],
    priceVerified: false,
  },

  // ─────────────────────────────── ATTRACTIONS ─────────────────────────────
  {
    slug: 'burj-khalifa-at-the-top',
    category: 'attractions',
    image: 'burjKhalifa',
    name: { en: 'Burj Khalifa: At the Top', fr: 'Burj Khalifa : At the Top', ar: 'برج خليفة: At the Top' },
    tagline: {
      en: 'The view from the world’s tallest building.',
      fr: 'La vue depuis le plus haut bâtiment du monde.',
      ar: 'الإطلالة من أعلى مبنى في العالم.',
    },
    description: {
      en: 'Entry to the observation decks of Burj Khalifa. Choose levels 124 & 125, or add the higher level 148 lounge experience. Sunset slots are the most popular — book early.',
      fr: 'Accès aux terrasses d’observation de Burj Khalifa. Choisissez les niveaux 124 & 125, ou l’expérience du niveau 148. Les créneaux au coucher du soleil partent vite.',
      ar: 'الدخول إلى منصات المشاهدة في برج خليفة. اختر الطابقين 124 و125، أو أضف تجربة الطابق 148. مواعيد الغروب الأكثر طلباً — احجز مبكراً.',
    },
    duration: { en: '1–1.5 hours', fr: '1 à 1,5 heure', ar: 'ساعة إلى ساعة ونصف' },
    groupSize: { en: 'Per person', fr: 'Par personne', ar: 'للشخص' },
    priceType: 'per_person',
    confirmation: 'on_request',
    minQty: 1,
    maxQty: 12,
    variants: [
      {
        id: 'bk-124',
        name: { en: 'Levels 124 & 125', fr: 'Niveaux 124 & 125', ar: 'الطابقان 124 و125' },
        detail: { en: 'Non-prime hours · children 4–12 reduced', fr: 'Heures creuses · enfants 4–12 ans réduit', ar: 'خارج أوقات الذروة · الأطفال 4–12 بسعر مخفّض' },
        price: 199,
        childPrice: 159,
        recommended: true,
      },
      {
        id: 'bk-148',
        name: { en: 'Levels 148, 125 & 124', fr: 'Niveaux 148, 125 & 124', ar: 'الطوابق 148 و125 و124' },
        detail: { en: 'Lounge access and refreshments', fr: 'Accès lounge et rafraîchissements', ar: 'دخول الصالة ومرطبات' },
        price: 449,
        childPrice: 449,
      },
    ],
    highlights: {
      en: ['Two observation levels', 'Sunset slots available', 'Add to any day in your plan'],
      fr: ['Deux niveaux d’observation', 'Créneaux au coucher du soleil', 'À ajouter à n’importe quelle journée'],
      ar: ['منصتا مشاهدة', 'مواعيد عند الغروب متاحة', 'أضفه إلى أي يوم في خطتك'],
    },
    included: { en: ['Entry ticket for the selected levels'], fr: ['Billet pour les niveaux choisis'], ar: ['تذكرة الدخول للطوابق المختارة'] },
    notIncluded: { en: ['Transfers', 'Prime-hour (sunset) supplement — confirmed with your booking'], fr: ['Transferts', 'Supplément heures de pointe (coucher du soleil) — confirmé à la réservation'], ar: ['التنقلات', 'رسوم أوقات الذروة (الغروب) — تُؤكَّد مع الحجز'] },
    goodToKnow: {
      en: ['Entry times are fixed; arrive 15 minutes early.', 'Prices change by time slot; we confirm the exact price before you pay.'],
      fr: ['Horaires fixes ; arrivez 15 minutes avant.', 'Les prix varient selon le créneau ; prix exact confirmé avant paiement.'],
      ar: ['مواعيد الدخول محددة؛ احضر قبل 15 دقيقة.', 'تختلف الأسعار حسب الموعد؛ نؤكد السعر الدقيق قبل الدفع.'],
    },
    faq: noGuides,
    related: ['helicopter-tour', 'private-chauffeur', 'abu-dhabi-day-trip'],
    priceVerified: false,
  },
]

const CATEGORY_ORDER = ['signature', 'attractions', 'shopping', 'desert', 'on-the-water', 'sky', 'day-trips', 'lifestyle', 'transfers']
export const categories: Category[] = CATEGORY_ORDER.map(slug => allCategories.find(c => c.slug === slug)!).filter(Boolean)

/** Display order: Signature first, then core and additional experiences. */
/** Audience tags for core products defined before tags existed (used by the catalogue filters). */
const CORE_SUITS: Record<string, Product['suits']> = {
  'private-yacht-charter': ['families', 'friends', 'groups', 'couples'],
  'sunset-celebration-yacht': ['couples', 'friends', 'groups'],
  'jet-ski-burj-al-arab': ['friends', 'couples'],
  'private-desert-safari': ['families', 'couples', 'friends'],
  'premium-desert-safari': ['families', 'friends', 'groups'],
  'dune-buggy': ['friends', 'couples'],
  'hot-air-balloon': ['couples', 'families'],
  'helicopter-tour': ['couples', 'families', 'friends'],
  'airport-transfer': ['families', 'couples', 'friends', 'groups', 'vip'],
  'private-chauffeur': ['families', 'couples', 'friends', 'vip'],
  'abu-dhabi-day-trip': ['families', 'couples'],
  'burj-khalifa-at-the-top': ['families', 'couples', 'friends'],
}

export const products: Product[] = [...signatureProducts, ...coreProducts, ...moreProducts, ...shoppingProducts].map(p =>
  p.suits?.length || !CORE_SUITS[p.slug] ? p : { ...p, suits: CORE_SUITS[p.slug] },
)

export function getCategory(slug: string) {
  return categories.find(c => c.slug === slug)
}

export function getProduct(slug: string) {
  return products.find(p => p.slug === slug)
}

export function productsIn(category: string) {
  return products.filter(p => p.category === category)
}

export function fromPrice(product: Product): number | null {
  if (product.quoteOnly || !product.variants.length) return null
  return Math.min(...product.variants.map(v => v.price))
}

export function categoryFromPrice(category: string) {
  const prices = productsIn(category).map(fromPrice).filter((p): p is number => p !== null)
  return prices.length ? Math.min(...prices) : null
}
