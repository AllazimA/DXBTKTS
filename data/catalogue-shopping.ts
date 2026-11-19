import type { L, Product } from '@/lib/catalogue/types'

/**
 * Luxury Shopping — a personalised shopping category (strategy report, section 5).
 * Request-only until the personal-shopping partner's fee is agreed (launch
 * partner: Dubai Mall Personal Shopping by ELITE). No brand affiliation is
 * claimed: we request appointments; each boutique confirms availability.
 */

const t = (en: string, fr: string, ar: string): L => ({ en, fr, ar })
const ta = (en: string[], fr: string[], ar: string[]): L<string[]> => ({ en, fr, ar })
const noFaq: L<{ q: string; a: string }[]> = { en: [], fr: [], ar: [] }

const BRAND_NOTE = ta(
  [
    'We request boutique appointments on your behalf; availability, allocation-controlled pieces and appointments are confirmed by each boutique.',
    'DXB TKTS is independent and not affiliated with any brand. Purchases are paid directly to the boutique.',
  ],
  [
    'Nous demandons les rendez-vous en boutique pour vous ; disponibilités, pièces sous allocation et rendez-vous sont confirmés par chaque maison.',
    'DXB TKTS est indépendant et n’est affilié à aucune marque. Les achats sont réglés directement à la boutique.',
  ],
  [
    'نطلب مواعيد البوتيكات نيابةً عنك؛ ويؤكد كل بوتيك التوفر والقطع المحدودة والمواعيد.',
    'DXB TKTS جهة مستقلة ولا ترتبط بأي علامة تجارية. تُدفع المشتريات مباشرة للبوتيك.',
  ],
)

const base = {
  category: 'shopping' as const,
  priceType: 'per_group' as const,
  confirmation: 'on_request' as const,
  quoteOnly: true,
  minQty: 1,
  maxQty: 1,
  variants: [],
  faq: noFaq,
  priceVerified: false,
}

export const shoppingProducts: Product[] = [
  {
    ...base,
    slug: 'dubai-mall-luxury-shopping',
    image: 'privateVilla',
    name: t('Dubai Mall Luxury Shopping Experience', 'Shopping de luxe au Dubai Mall', 'تجربة التسوق الفاخر في دبي مول'),
    tagline: t('Fashion Avenue with a personal shopper and a route planned around you.', 'Fashion Avenue avec un personal shopper et un parcours pensé pour vous.', 'فاشن أفينيو مع متسوق شخصي ومسار مخطط لك.'),
    description: t(
      'Before you arrive we learn your brands, sizes and budget and plan a route through Dubai Mall’s Fashion Avenue. On the day a personal shopper walks with you, handles the queues, shop-and-drop and tax-refund forms, and keeps the pace easy, with a table booked for lunch or coffee.',
      'Avant votre arrivée, nous notons vos marques, tailles et budget et planifions un parcours dans la Fashion Avenue du Dubai Mall. Le jour J, un personal shopper vous accompagne, gère les files, le dépôt des achats et la détaxe, avec une table réservée pour le déjeuner ou un café.',
      'قبل وصولك نتعرف إلى علاماتك ومقاساتك وميزانيتك ونخطط مساراً في فاشن أفينيو في دبي مول. وفي اليوم يرافقك متسوق شخصي، ويتولى الطوابير وخدمة حفظ المشتريات واسترداد الضريبة، مع طاولة محجوزة للغداء أو القهوة.',
    ),
    duration: t('About 3 hours', 'Environ 3 heures', 'نحو 3 ساعات'),
    groupSize: t('Up to 4 guests', 'Jusqu’à 4 personnes', 'حتى 4 أشخاص'),
    highlights: ta(['Route planned around your brands', 'Personal shopper beside you', 'Shop-and-drop and tax-refund help'], ['Parcours selon vos marques', 'Personal shopper à vos côtés', 'Dépôt des achats et détaxe'], ['مسار حسب علاماتك', 'متسوق شخصي بجانبك', 'المساعدة في حفظ المشتريات واسترداد الضريبة']),
    included: ta(['Pre-visit brief on WhatsApp', 'Personal shopper for the session', 'Lunch or coffee reservation'], ['Brief préalable sur WhatsApp', 'Personal shopper pendant la séance', 'Réservation déjeuner ou café'], ['تعارف مسبق عبر واتساب', 'متسوق شخصي طوال الجلسة', 'حجز غداء أو قهوة']),
    notIncluded: ta(['Your purchases', 'Meals (reserved, paid on the day)', 'Private car unless added'], ['Vos achats', 'Repas (réservés, réglés sur place)', 'Voiture privée sauf en option'], ['مشترياتك', 'الوجبات (محجوزة وتُدفع في اليوم)', 'السيارة الخاصة إلا إذا أُضيفت']),
    goodToKnow: BRAND_NOTE,
    related: ['watches-fine-jewellery-discovery', 'ultimate-dubai-shopping-day', 'private-chauffeur'],
    suits: ['couples', 'friends', 'vip'],
  },
  {
    ...base,
    slug: 'watches-fine-jewellery-discovery',
    image: 'eveningEvent',
    name: t('Watches & Fine Jewellery Discovery', 'Horlogerie et haute joaillerie', 'اكتشاف الساعات والمجوهرات الراقية'),
    tagline: t('A quiet, planned route through the watch and jewellery houses.', 'Un parcours calme et préparé chez les horlogers et joailliers.', 'مسار هادئ ومخطط بين دور الساعات والمجوهرات.'),
    description: t(
      'For collectors and first-time buyers of a serious piece. Tell us the references or styles you are interested in; we request appointments in advance, plan the route and accompany you at an unhurried pace. We never promise allocation-controlled models — boutiques decide.',
      'Pour les collectionneurs comme pour un premier achat important. Indiquez les références ou styles qui vous intéressent ; nous demandons les rendez-vous à l’avance, planifions le parcours et vous accompagnons sans hâte. Nous ne promettons jamais les modèles sous allocation — les boutiques décident.',
      'لهواة الجمع ولمن يشتري قطعة مهمة لأول مرة. أخبرنا بالطرازات أو الأنماط التي تهمك؛ نطلب المواعيد مسبقاً ونخطط المسار ونرافقك دون عجلة. لا نعد أبداً بالطرازات المحدودة التوزيع — القرار للبوتيك.',
    ),
    duration: t('2–3 hours', '2 à 3 heures', '2–3 ساعات'),
    groupSize: t('1–2 guests', '1 à 2 personnes', '1–2 شخص'),
    highlights: ta(['Appointments requested in advance', 'Specialist companion', 'No pressure, no promises we cannot keep'], ['Rendez-vous demandés à l’avance', 'Accompagnement spécialisé', 'Sans pression ni promesse intenable'], ['طلب المواعيد مسبقاً', 'مرافق متخصص', 'بلا ضغط ولا وعود لا يمكن الوفاء بها']),
    included: ta(['Brief on the pieces you are looking for', 'Appointment requests', 'Companion for the visit'], ['Brief sur les pièces recherchées', 'Demandes de rendez-vous', 'Accompagnement pendant la visite'], ['تعارف حول القطع المطلوبة', 'طلبات المواعيد', 'مرافق أثناء الزيارة']),
    notIncluded: ta(['Your purchases', 'Private car unless added'], ['Vos achats', 'Voiture privée sauf en option'], ['مشترياتك', 'السيارة الخاصة إلا إذا أُضيفت']),
    goodToKnow: ta(
      ['Please allow 3–7 days for appointment requests.', ...BRAND_NOTE.en],
      ['Prévoyez 3 à 7 jours pour les demandes de rendez-vous.', ...BRAND_NOTE.fr],
      ['يُرجى ترك 3–7 أيام لطلبات المواعيد.', ...BRAND_NOTE.ar],
    ),
    related: ['dubai-mall-luxury-shopping', 'personal-shopping-sourcing', 'gold-souk-traditional-jewellery'],
    suits: ['couples', 'vip'],
  },
  {
    ...base,
    slug: 'designer-fashion-accessories',
    image: 'privateVilla',
    name: t('Designer Fashion & Accessories', 'Mode et accessoires de créateurs', 'أزياء وإكسسوارات المصممين'),
    tagline: t('A styled route through ready-to-wear, bags, shoes and accessories.', 'Un parcours stylé entre prêt-à-porter, sacs, souliers et accessoires.', 'مسار أنيق بين الأزياء الجاهزة والحقائب والأحذية والإكسسوارات.'),
    description: t(
      'With a stylist who knows the boutiques, we plan try-on appointments where boutiques offer them and build a route around your style brief — for a wardrobe refresh, a special occasion or a bridal party.',
      'Avec une styliste qui connaît les boutiques, nous organisons des essayages là où les maisons le proposent et construisons un parcours selon votre style — pour renouveler une garde-robe, une occasion spéciale ou un mariage.',
      'مع مصممة أزياء تعرف البوتيكات، نرتب مواعيد القياس حيث تتيحها البوتيكات ونبني مساراً حسب أسلوبك — لتجديد خزانتك أو لمناسبة خاصة أو لحفل زفاف.',
    ),
    duration: t('3–4 hours', '3 à 4 heures', '3–4 ساعات'),
    groupSize: t('Up to 4 guests', 'Jusqu’à 4 personnes', 'حتى 4 أشخاص'),
    highlights: ta(['Personal stylist', 'Try-on appointments where offered', 'Sizes and preferences collected in advance'], ['Styliste personnelle', 'Essayages lorsque proposés', 'Tailles et préférences recueillies à l’avance'], ['مصممة أزياء شخصية', 'مواعيد قياس حيث تتاح', 'جمع المقاسات والتفضيلات مسبقاً']),
    included: ta(['Style brief', 'Stylist for the session', 'Shop-and-drop coordination'], ['Brief de style', 'Styliste pendant la séance', 'Coordination du dépôt des achats'], ['تحديد الأسلوب', 'مصممة طوال الجلسة', 'تنسيق حفظ المشتريات']),
    notIncluded: ta(['Your purchases', 'Hair and make-up unless added'], ['Vos achats', 'Coiffure et maquillage sauf en option'], ['مشترياتك', 'الشعر والمكياج إلا إذا أُضيفا']),
    goodToKnow: BRAND_NOTE,
    related: ['dubai-mall-luxury-shopping', 'ultimate-dubai-shopping-day', 'spa-private-treatment'],
    suits: ['friends', 'couples', 'vip'],
  },
  {
    ...base,
    slug: 'personal-shopping-sourcing',
    image: 'eveningEvent',
    name: t('Personal Shopping & Sourcing', 'Personal shopping et recherche', 'التسوق الشخصي والبحث عن القطع'),
    tagline: t('You know what you want. We find where it is and arrange the rest.', 'Vous savez ce que vous voulez. Nous trouvons où et organisons le reste.', 'تعرف ما تريد. نجد مكانه ونرتب الباقي.'),
    description: t(
      'Send us the piece — a bag, a size, an edition. We check which boutiques carry it, ask about availability, request an appointment and coordinate collection or delivery to your hotel. If it is not available, we say so clearly.',
      'Envoyez-nous la pièce — un sac, une taille, une édition. Nous vérifions quelles boutiques la proposent, demandons la disponibilité et un rendez-vous, et coordonnons le retrait ou la livraison à l’hôtel. Si elle n’est pas disponible, nous le disons clairement.',
      'أرسل لنا القطعة — حقيبة أو مقاساً أو إصداراً. نتحقق من البوتيكات التي تتوفر فيها، ونسأل عن التوفر، ونطلب موعداً، وننسق الاستلام أو التوصيل إلى فندقك. وإن لم تتوفر نخبرك بوضوح.',
    ),
    duration: t('1–5 days, mostly remote', '1 à 5 jours, surtout à distance', '1–5 أيام، غالباً عن بُعد'),
    groupSize: t('Per request', 'Par demande', 'لكل طلب'),
    highlights: ta(['Availability checked for you', 'Appointment and collection arranged', 'Clear answers, no deposits taken for boutiques'], ['Disponibilité vérifiée', 'Rendez-vous et retrait organisés', 'Réponses claires, aucun acompte pour les boutiques'], ['نتحقق من التوفر لك', 'ترتيب الموعد والاستلام', 'إجابات واضحة، ولا عربون نيابة عن البوتيكات']),
    included: ta(['Sourcing request and availability checks', 'Appointment request', 'Delivery coordination'], ['Recherche et vérification des disponibilités', 'Demande de rendez-vous', 'Coordination de la livraison'], ['طلب البحث والتحقق من التوفر', 'طلب الموعد', 'تنسيق التوصيل']),
    notIncluded: ta(['The item itself (paid to the boutique)'], ['L’article (réglé à la boutique)'], ['القطعة نفسها (تُدفع للبوتيك)']),
    goodToKnow: BRAND_NOTE,
    related: ['watches-fine-jewellery-discovery', 'dubai-mall-luxury-shopping', 'private-chauffeur'],
    suits: ['vip'],
  },
  {
    ...base,
    slug: 'gold-souk-traditional-jewellery',
    image: 'grandMosque',
    name: t('Gold Souk & Traditional Jewellery', 'Souk de l’or et joaillerie traditionnelle', 'سوق الذهب والمجوهرات التقليدية'),
    tagline: t('Deira’s gold souk with a guide who explains purity, weight and making charges.', 'Le souk de l’or de Deira avec un guide qui explique titre, poids et façon.', 'سوق الذهب في ديرة مع مرشد يشرح العيار والوزن وأجرة الصنعة.'),
    description: t(
      'A guided morning in Deira’s Gold Souk and the lanes around it. Your guide explains how gold is priced — by weight at the day’s rate plus a making charge, the part you can negotiate — and stays neutral: no shop pays us to steer you. Crossing the Creek by abra is part of the way.',
      'Une matinée guidée dans le souk de l’or de Deira et ses ruelles. Votre guide explique le prix de l’or — au poids selon le cours du jour, plus la façon, la part négociable — et reste neutre : aucune boutique ne nous paie pour vous orienter. La traversée de la Creek en abra fait partie du chemin.',
      'صباح مع مرشد في سوق الذهب في ديرة والأزقة المحيطة. يشرح لك المرشد طريقة تسعير الذهب — بالوزن وفق سعر اليوم مع أجرة الصنعة القابلة للتفاوض — ويبقى محايداً: لا يدفع لنا أي متجر لتوجيهك. وعبور الخور بالعَبرة جزء من الطريق.',
    ),
    duration: t('2–3 hours', '2 à 3 heures', '2–3 ساعات'),
    groupSize: t('Up to 6 guests', 'Jusqu’à 6 personnes', 'حتى 6 أشخاص'),
    highlights: ta(['How gold is priced, explained', 'Abra across the Creek', 'Neutral guide, no commissions'], ['Le prix de l’or expliqué', 'Abra sur la Creek', 'Guide neutre, sans commission'], ['شرح تسعير الذهب', 'العَبرة عبر الخور', 'مرشد محايد بلا عمولات']),
    included: ta(['Licensed guide', 'Abra crossing'], ['Guide agréé', 'Traversée en abra'], ['مرشد مرخص', 'عبور بالعَبرة']),
    notIncluded: ta(['Your purchases', 'Private car unless added'], ['Vos achats', 'Voiture privée sauf en option'], ['مشترياتك', 'السيارة الخاصة إلا إذا أُضيفت']),
    goodToKnow: ta(['Best in the morning in the cool season; dress modestly in the old districts.'], ['Idéal le matin en saison fraîche ; tenue modeste dans les vieux quartiers.'], ['الأفضل صباحاً في الموسم البارد؛ مع لباس محتشم في الأحياء القديمة.']),
    related: ['old-dubai-heritage-walk', 'watches-fine-jewellery-discovery', 'private-dubai-city-tour'],
    suits: ['couples', 'families', 'friends'],
  },
  {
    ...base,
    slug: 'ultimate-dubai-shopping-day',
    image: 'privateVilla',
    name: t('The Ultimate Dubai Shopping Day', 'La journée shopping ultime à Dubaï', 'يوم التسوق المثالي في دبي'),
    tagline: t('A personal shopper and a car all day, from Fashion Avenue to the souks.', 'Un personal shopper et une voiture toute la journée, de la Fashion Avenue aux souks.', 'متسوق شخصي وسيارة طوال اليوم، من فاشن أفينيو إلى الأسواق.'),
    description: t(
      'Fashion Avenue in the morning, lunch, then a second destination chosen for you — Mall of the Emirates, Souk Madinat Jumeirah or the Gold Souk — with a driver for the day and everything delivered to your hotel. An evening at Burj Khalifa SKY 148 can end it.',
      'La Fashion Avenue le matin, un déjeuner, puis une seconde destination choisie pour vous — Mall of the Emirates, Souk Madinat Jumeirah ou le souk de l’or — avec chauffeur pour la journée et tout livré à l’hôtel. Une soirée au Burj Khalifa SKY 148 peut la conclure.',
      'فاشن أفينيو صباحاً، ثم الغداء، ثم وجهة ثانية نختارها لك — مول الإمارات أو سوق مدينة جميرا أو سوق الذهب — مع سائق طوال اليوم وتوصيل كل شيء إلى فندقك. ويمكن أن يُختتم بأمسية في برج خليفة SKY 148.',
    ),
    duration: t('7–9 hours', '7 à 9 heures', '7–9 ساعات'),
    groupSize: t('Up to 4 guests', 'Jusqu’à 4 personnes', 'حتى 4 أشخاص'),
    highlights: ta(['Personal shopper all day', 'Car and driver', 'Delivery to your hotel coordinated'], ['Personal shopper toute la journée', 'Voiture et chauffeur', 'Livraison à l’hôtel coordonnée'], ['متسوق شخصي طوال اليوم', 'سيارة وسائق', 'تنسيق التوصيل إلى الفندق']),
    included: ta(['Personal shopper', 'Car and driver for the day', 'Lunch reservation', 'Delivery coordination'], ['Personal shopper', 'Voiture avec chauffeur pour la journée', 'Réservation du déjeuner', 'Coordination de la livraison'], ['متسوق شخصي', 'سيارة وسائق لليوم', 'حجز الغداء', 'تنسيق التوصيل']),
    notIncluded: ta(['Your purchases', 'Meals (reserved, paid on the day)'], ['Vos achats', 'Repas (réservés, réglés sur place)'], ['مشترياتك', 'الوجبات (محجوزة وتُدفع في اليوم)']),
    goodToKnow: BRAND_NOTE,
    related: ['dubai-mall-luxury-shopping', 'burj-khalifa-at-the-top', 'rolls-royce-chauffeur'],
    suits: ['vip', 'friends', 'couples'],
  },
]
