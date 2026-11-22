import type { L, PlanItem, Suit } from '@/lib/catalogue/types'

/**
 * DXB TKTS packages — themed combinations of EXISTING catalogue products.
 *
 * Rules (see the commercial strategy report, sections 4 and 8):
 * - A package is only a set of plan items; its price is always the sum of
 *   the current catalogue prices for those items (recomputed server-side at
 *   checkout). No package price is stored here, so none can drift.
 * - No "saving" is shown unless a supplier gives a real combo rate and the
 *   package line is cheaper than the same items bought separately.
 * - Guests can change dates, quantities or remove items in their plan.
 */

export type PackageItem = Omit<PlanItem, 'key'>

export type Package = {
  slug: string
  /** AI image slot (lib/ai-images.json) + registry fallback */
  image: { slot: string; fallback: 'dubaiSkyline' | 'burjKhalifa' | 'burjAlArabAerial' | 'grandMosque' | 'fineDining' | 'eveningEvent' | 'privateVilla' | 'arrival' | 'desert' | 'yacht' }
  theme: 'downtown' | 'palm' | 'family' | 'desert' | 'romance' | 'first-visit'
  name: L
  tagline: L
  description: L
  duration: L
  /** Who the default quantities are set for, e.g. "Priced for 2 adults". */
  party: L
  suits: Suit[]
  /** instant = fixed tickets only; concierge = the team confirms car, boat, table or guide. */
  booking: 'instant' | 'concierge'
  multiDay?: boolean
  items: PackageItem[]
  /** Short "how the day runs" steps. */
  flow: L<string[]>
  note?: L
}

const t = (en: string, fr: string, ar: string): L => ({ en, fr, ar })
const ta = (en: string[], fr: string[], ar: string[]): L<string[]> => ({ en, fr, ar })
const item = (slug: string, variantId: string, qty: number, extra: Partial<PackageItem> = {}): PackageItem => ({
  slug,
  variantId,
  date: '',
  time: 'any',
  qty,
  children: 0,
  extras: {},
  ...extra,
})

export const packages: Package[] = [
  {
    slug: 'burj-khalifa-sunset-evening',
    image: { slot: 'product-burj-khalifa-at-the-top', fallback: 'burjKhalifa' },
    theme: 'downtown',
    name: t('Burj Khalifa Sunset Evening', 'Soirée Burj Khalifa au coucher du soleil', 'أمسية الغروب في برج خليفة'),
    tagline: t('The view at golden hour, the fountains after dark, and a car waiting.', 'La vue à l’heure dorée, les fontaines à la nuit tombée, et une voiture qui vous attend.', 'الإطلالة في الساعة الذهبية، والنوافير بعد الغروب، وسيارة بانتظارك.'),
    description: t(
      'We book At The Top for the sunset window, reserve a table on the Boulevard or at a restaurant facing the Dubai Fountain, and keep a private car with you from the hotel and back. No taxi queue after the show.',
      'Nous réservons At The Top au coucher du soleil, une table sur le Boulevard ou face à la Dubai Fountain, et une voiture privée vous accompagne de l’hôtel au retour. Pas de file de taxis après le spectacle.',
      'نحجز At The Top في موعد الغروب، وطاولة على البوليفارد أو مطلة على نافورة دبي، وسيارة خاصة ترافقك من الفندق وإليه. بلا طوابير سيارات أجرة بعد العرض.',
    ),
    duration: t('About 5 hours', 'Environ 5 heures', 'نحو 5 ساعات'),
    party: t('Priced for 2 adults', 'Prix pour 2 adultes', 'السعر لشخصين بالغين'),
    suits: ['couples', 'friends'],
    booking: 'concierge',
    items: [item('burj-khalifa-at-the-top', 'bk-124', 2, { time: 'evening' }), item('private-chauffeur', 'sedan-5', 1, { time: 'evening' })],
    flow: ta(
      ['Pick-up at your hotel', 'Burj Khalifa, Levels 124 & 125, at sunset', 'Dubai Fountain show', 'Dinner (reservation; paid at the restaurant)', 'Car back to your hotel'],
      ['Prise en charge à l’hôtel', 'Burj Khalifa, niveaux 124 et 125, au coucher du soleil', 'Spectacle de la Dubai Fountain', 'Dîner (réservation ; réglé au restaurant)', 'Retour à l’hôtel en voiture'],
      ['الاستقبال من الفندق', 'برج خليفة، الطابقان 124 و125، عند الغروب', 'عرض نافورة دبي', 'العشاء (حجز؛ يُدفع في المطعم)', 'العودة إلى الفندق بالسيارة'],
    ),
    note: t('Sunset time slots can carry a supplement; we confirm it before you pay.', 'Les créneaux du coucher du soleil peuvent comporter un supplément, confirmé avant paiement.', 'قد تتضمن مواعيد الغروب رسوماً إضافية؛ نؤكدها قبل الدفع.'),
  },
  {
    slug: 'above-the-clouds',
    image: { slot: 'gallery-night', fallback: 'burjKhalifa' },
    theme: 'romance',
    name: t('Above the Clouds', 'Au-dessus des nuages', 'فوق السحاب'),
    tagline: t('SKY Level 148, a table for two and a chauffeur for the night.', 'Le niveau SKY 148, une table pour deux et un chauffeur pour la soirée.', 'طابق SKY 148، وطاولة لشخصين، وسائق للأمسية.'),
    description: t(
      'The higher, quieter tier of Burj Khalifa, followed by a fine-dining table we choose with you. Built for anniversaries and the first night of a special trip.',
      'Le niveau le plus haut et le plus calme de Burj Khalifa, suivi d’une table gastronomique choisie avec vous. Idéal pour un anniversaire ou le premier soir d’un voyage spécial.',
      'الطابق الأعلى والأهدأ في برج خليفة، يليه عشاء فاخر نختاره معك. مثالي للذكرى السنوية أو الليلة الأولى من رحلة مميزة.',
    ),
    duration: t('About 5 hours', 'Environ 5 heures', 'نحو 5 ساعات'),
    party: t('Priced for 2 adults', 'Prix pour 2 adultes', 'السعر لشخصين بالغين'),
    suits: ['couples', 'vip'],
    booking: 'concierge',
    items: [item('burj-khalifa-at-the-top', 'bk-148', 2, { time: 'evening' }), item('private-chauffeur', 'sedan-5', 1, { time: 'evening' })],
    flow: ta(
      ['Pick-up at your hotel', 'Burj Khalifa SKY Level 148, with Levels 124 & 125', 'Dinner at a fine-dining table (paid at the restaurant)', 'Car back to your hotel'],
      ['Prise en charge à l’hôtel', 'Burj Khalifa SKY niveau 148, avec les niveaux 124 et 125', 'Dîner gastronomique (réglé au restaurant)', 'Retour à l’hôtel en voiture'],
      ['الاستقبال من الفندق', 'برج خليفة طابق SKY 148 مع الطابقين 124 و125', 'عشاء فاخر (يُدفع في المطعم)', 'العودة إلى الفندق بالسيارة'],
    ),
  },
  {
    slug: 'palm-day-to-sunset',
    image: { slot: 'product-private-yacht-charter', fallback: 'yacht' },
    theme: 'palm',
    name: t('Palm Day to Sunset', 'La Palm, du jour au coucher du soleil', 'يوم النخلة حتى الغروب'),
    tagline: t('Aquaventure by day, the skyline from your own yacht at dusk.', 'Aquaventure en journée, la ville depuis votre yacht au crépuscule.', 'أكوافنتشر نهاراً، والأفق من يختك الخاص عند الغروب.'),
    description: t(
      'A full day on and around Palm Jumeirah: the waterpark until late afternoon, then two hours on a private yacht as the sun goes down, with a car to bring everyone between the two and home.',
      'Une journée complète autour de Palm Jumeirah : le parc aquatique jusqu’en fin d’après-midi, puis deux heures sur un yacht privé au coucher du soleil, avec une voiture entre les deux et pour le retour.',
      'يوم كامل في نخلة جميرا وحولها: الحديقة المائية حتى آخر النهار، ثم ساعتان على يخت خاص عند الغروب، مع سيارة تنقل الجميع بينهما وإلى الفندق.',
    ),
    duration: t('Full day', 'Journée complète', 'يوم كامل'),
    party: t('Priced for 2 adults and 2 children', 'Prix pour 2 adultes et 2 enfants', 'السعر لشخصين بالغين وطفلين'),
    suits: ['families', 'friends'],
    booking: 'concierge',
    items: [
      item('aquaventure-waterpark', 'aqua-day', 2, { children: 2, time: 'morning' }),
      item('private-yacht-charter', 'yacht-45', 2, { time: 'evening' }),
      item('private-chauffeur', 'suv-5', 1, { time: 'afternoon' }),
    ],
    flow: ta(
      ['Aquaventure Waterpark, morning to late afternoon', 'Car to Dubai Marina or Dubai Harbour', '2-hour private yacht at sunset', 'Car back to your hotel'],
      ['Aquaventure, du matin à la fin d’après-midi', 'Voiture vers Dubai Marina ou Dubai Harbour', 'Yacht privé 2 heures au coucher du soleil', 'Retour à l’hôtel en voiture'],
      ['أكوافنتشر من الصباح حتى آخر النهار', 'السيارة إلى دبي مارينا أو دبي هاربر', 'يخت خاص لساعتين عند الغروب', 'العودة إلى الفندق بالسيارة'],
    ),
  },
  {
    slug: 'theme-park-door-to-door',
    image: { slot: 'product-theme-park-day', fallback: 'dubaiSkyline' },
    theme: 'family',
    name: t('Theme Park Day, Door to Door', 'Parc à thème, de porte à porte', 'يوم مدينة الملاهي من الباب إلى الباب'),
    tagline: t('The park tickets and a driver for the day, with the right child seats.', 'Les billets du parc et un chauffeur pour la journée, avec les bons sièges enfants.', 'تذاكر المدينة وسائق لليوم، مع مقاعد الأطفال المناسبة.'),
    description: t(
      'Dubai’s theme parks sit 30 to 60 minutes from the coast. We book the park and a driver who waits for you all day — no taxis with tired children, no searching for a ride home.',
      'Les parcs à thème de Dubaï sont à 30–60 minutes de la côte. Nous réservons le parc et un chauffeur qui vous attend toute la journée — pas de taxi avec des enfants fatigués.',
      'تقع مدن الملاهي في دبي على بعد 30 إلى 60 دقيقة من الساحل. نحجز المدينة وسائقاً ينتظرك طوال اليوم — بلا سيارات أجرة مع أطفال متعبين.',
    ),
    duration: t('Full day', 'Journée complète', 'يوم كامل'),
    party: t('Priced for 2 adults and 2 children', 'Prix pour 2 adultes et 2 enfants', 'السعر لشخصين بالغين وطفلين'),
    suits: ['families'],
    booking: 'concierge',
    items: [item('theme-park-day', 'park-day', 2, { children: 2, extras: { 'driver-day': 1 } })],
    flow: ta(
      ['Pick-up with child seats fitted', 'Your chosen park, all day', 'Driver waits and brings you back'],
      ['Prise en charge avec sièges enfants installés', 'Le parc choisi, toute la journée', 'Le chauffeur attend et vous ramène'],
      ['الاستقبال مع تركيب مقاعد الأطفال', 'المدينة التي تختارها طوال اليوم', 'السائق ينتظر ويعيدك'],
    ),
  },
  {
    slug: 'private-desert-evening',
    image: { slot: 'product-private-dune-dinner', fallback: 'desert' },
    theme: 'desert',
    name: t('Private Desert Evening', 'Soirée privée dans le désert', 'أمسية صحراوية خاصة'),
    tagline: t('Your own 4x4 across the dunes, then a table set only for you.', 'Votre propre 4x4 dans les dunes, puis une table dressée pour vous seuls.', 'سيارتك الخاصة عبر الكثبان، ثم طاولة معدّة لك وحدك.'),
    description: t(
      'No shared camp. A private vehicle and guide for the dunes and the sunset, then a private dinner on a dune, lit by lanterns and set for your group.',
      'Aucun camp partagé. Un véhicule et un guide privés pour les dunes et le coucher du soleil, puis un dîner privé sur une dune, éclairé aux lanternes.',
      'بلا مخيم مشترك. مركبة ومرشد خاصان للكثبان والغروب، ثم عشاء خاص على كثيب تضيئه الفوانيس.',
    ),
    duration: t('About 6 hours', 'Environ 6 heures', 'نحو 6 ساعات'),
    party: t('Priced for 2 guests', 'Prix pour 2 personnes', 'السعر لشخصين'),
    suits: ['couples', 'families', 'vip'],
    booking: 'concierge',
    items: [item('private-desert-safari', 'private-evening', 1, { time: 'evening' }), item('private-dune-dinner', 'dune-dinner-2', 1, { time: 'evening' })],
    flow: ta(
      ['Pick-up at your hotel in a private 4x4', 'Dunes and sunset with your own guide', 'Private dinner on a dune', 'Back to your hotel'],
      ['Prise en charge en 4x4 privé', 'Dunes et coucher du soleil avec votre guide', 'Dîner privé sur une dune', 'Retour à l’hôtel'],
      ['الاستقبال بسيارة دفع رباعي خاصة', 'الكثبان والغروب مع مرشدك', 'عشاء خاص على كثيب', 'العودة إلى الفندق'],
    ),
  },
  {
    slug: 'desert-reserve-falconry-dawn',
    image: { slot: 'product-private-falconry-dawn', fallback: 'desert' },
    theme: 'desert',
    name: t('Desert Reserve & Falconry at Dawn', 'Réserve du désert et fauconnerie à l’aube', 'محمية الصحراء والصقارة عند الفجر'),
    tagline: t('The protected reserve at first light, and an hour with a falconer.', 'La réserve protégée aux premières lueurs, et une heure avec un fauconnier.', 'المحمية عند أول الضوء، وساعة مع صقّار.'),
    description: t(
      'A drive in a classic open-top 4x4 inside the Dubai Desert Conservation Reserve, when the oryx and gazelles are most active, followed by a private falconry session for your group.',
      'Une sortie en 4x4 classique dans la Dubai Desert Conservation Reserve, quand oryx et gazelles sont les plus actifs, suivie d’une séance de fauconnerie privée.',
      'جولة بسيارة دفع رباعي كلاسيكية داخل محمية دبي الصحراوية حين تكون المها والغزلان في أوج نشاطها، تليها جلسة صقارة خاصة لمجموعتك.',
    ),
    duration: t('About 5 hours', 'Environ 5 heures', 'نحو 5 ساعات'),
    party: t('Priced for 1 vehicle (up to 4 guests)', 'Prix pour 1 véhicule (jusqu’à 4 personnes)', 'السعر لمركبة واحدة (حتى 4 أشخاص)'),
    suits: ['couples', 'families', 'vip'],
    booking: 'concierge',
    items: [item('desert-safari-in-style', 'heritage-morning', 1, { time: 'morning' }), item('private-falconry-dawn', 'falconry-private', 1, { time: 'morning' })],
    flow: ta(
      ['Early pick-up', 'Classic 4x4 drive in the conservation reserve', 'Private falconry session', 'Back to your hotel by late morning'],
      ['Prise en charge matinale', 'Sortie en 4x4 classique dans la réserve', 'Séance de fauconnerie privée', 'Retour à l’hôtel en fin de matinée'],
      ['استقبال مبكر', 'جولة بسيارة كلاسيكية في المحمية', 'جلسة صقارة خاصة', 'العودة إلى الفندق قبل الظهر'],
    ),
  },
  {
    slug: 'couples-spa-and-chauffeur',
    image: { slot: 'product-spa-private-treatment', fallback: 'privateVilla' },
    theme: 'romance',
    name: t('Couples’ Spa & Chauffeur', 'Spa en duo et chauffeur', 'سبا للزوجين مع سائق'),
    tagline: t('Treatments for two, then the evening is yours — the car is already outside.', 'Des soins pour deux, puis la soirée vous appartient — la voiture attend déjà.', 'علاجات لشخصين، ثم الأمسية لكما — والسيارة في الانتظار.'),
    description: t(
      'A private treatment for each of you at a hotel spa we choose together, with a chauffeur for five hours so dinner or a sunset drive can follow without a plan.',
      'Un soin privé pour chacun dans un spa d’hôtel choisi ensemble, avec un chauffeur pendant cinq heures pour enchaîner sur un dîner ou une balade au coucher du soleil.',
      'علاج خاص لكل منكما في سبا فندقي نختاره معاً، مع سائق لخمس ساعات ليتبعه عشاء أو جولة عند الغروب.',
    ),
    duration: t('About 5 hours', 'Environ 5 heures', 'نحو 5 ساعات'),
    party: t('Priced for 2 adults', 'Prix pour 2 adultes', 'السعر لشخصين بالغين'),
    suits: ['couples'],
    booking: 'concierge',
    items: [item('spa-private-treatment', 'spa-villa', 2), item('private-chauffeur', 'sedan-5', 1)],
    flow: ta(
      ['Pick-up at your hotel', 'Spa treatments for two', 'Free time: dinner or a sunset drive', 'Car back to your hotel'],
      ['Prise en charge à l’hôtel', 'Soins pour deux', 'Temps libre : dîner ou balade', 'Retour à l’hôtel en voiture'],
      ['الاستقبال من الفندق', 'علاجات سبا لشخصين', 'وقت حر: عشاء أو جولة', 'العودة إلى الفندق بالسيارة'],
    ),
  },
  {
    slug: 'sunset-yacht-private-dinner',
    image: { slot: 'product-dinner-yacht-for-two', fallback: 'yacht' },
    theme: 'romance',
    name: t('Sunset Yacht & Private Dinner', 'Yacht au coucher du soleil et dîner privé', 'يخت الغروب وعشاء خاص'),
    tagline: t('Dinner for two on the water, and a chauffeur either side.', 'Dîner à deux sur l’eau, et un chauffeur à l’aller comme au retour.', 'عشاء لشخصين على الماء، وسائق ذهاباً وإياباً.'),
    description: t(
      'Our dinner yacht for two, timed for sunset, with a private car from the hotel and back. Flowers, a cake or a photographer can be added for a proposal or an anniversary.',
      'Notre yacht-dîner pour deux, au coucher du soleil, avec une voiture privée depuis l’hôtel et retour. Fleurs, gâteau ou photographe en option pour une demande ou un anniversaire.',
      'يخت العشاء لشخصين عند الغروب، مع سيارة خاصة من الفندق وإليه. ويمكن إضافة الورود أو الكعكة أو مصور لطلب زواج أو ذكرى.',
    ),
    duration: t('About 4 hours', 'Environ 4 heures', 'نحو 4 ساعات'),
    party: t('Priced for 2 adults', 'Prix pour 2 adultes', 'السعر لشخصين بالغين'),
    suits: ['couples'],
    booking: 'concierge',
    items: [item('dinner-yacht-for-two', 'dinner-yacht-2', 1, { time: 'evening' }), item('private-chauffeur', 'sedan-5', 1, { time: 'evening' })],
    flow: ta(
      ['Pick-up at your hotel', 'Dinner yacht at sunset', 'Car back to your hotel'],
      ['Prise en charge à l’hôtel', 'Yacht-dîner au coucher du soleil', 'Retour à l’hôtel en voiture'],
      ['الاستقبال من الفندق', 'يخت العشاء عند الغروب', 'العودة إلى الفندق بالسيارة'],
    ),
  },
  {
    slug: 'abu-dhabi-culture-day',
    image: { slot: 'product-abu-dhabi-day-trip', fallback: 'grandMosque' },
    theme: 'first-visit',
    name: t('Abu Dhabi Culture Day', 'Journée culturelle à Abu Dhabi', 'يوم الثقافة في أبوظبي'),
    tagline: t('The Grand Mosque, the Louvre and the Presidential Palace, unhurried.', 'La Grande Mosquée, le Louvre et le Palais présidentiel, sans précipitation.', 'الجامع الكبير واللوفر وقصر الوطن، دون استعجال.'),
    description: t(
      'A private car and driver for the day to Abu Dhabi, with tickets for Louvre Abu Dhabi and Qasr Al Watan. We book the Grand Mosque visiting slot and plan the day so you arrive at the mosque for sunset.',
      'Une voiture privée avec chauffeur pour la journée à Abu Dhabi, avec billets pour le Louvre Abu Dhabi et Qasr Al Watan. Nous réservons la visite de la Grande Mosquée pour y arriver au coucher du soleil.',
      'سيارة خاصة مع سائق ليوم في أبوظبي، مع تذاكر اللوفر أبوظبي وقصر الوطن. نحجز موعد زيارة الجامع الكبير ونرتب اليوم لتصل إليه عند الغروب.',
    ),
    duration: t('9–10 hours', '9 à 10 heures', '9–10 ساعات'),
    party: t('Priced for 2 adults', 'Prix pour 2 adultes', 'السعر لشخصين بالغين'),
    suits: ['couples', 'families'],
    booking: 'concierge',
    items: [item('abu-dhabi-day-trip', 'ad-sedan', 1, { extras: { 'louvre-ticket': 2, 'qasr-ticket': 2 } })],
    flow: ta(
      ['Leave Dubai around 9:00', 'Louvre Abu Dhabi', 'Lunch', 'Qasr Al Watan', 'Sheikh Zayed Grand Mosque at sunset', 'Back in Dubai for the evening'],
      ['Départ de Dubaï vers 9 h', 'Louvre Abu Dhabi', 'Déjeuner', 'Qasr Al Watan', 'Grande Mosquée Cheikh Zayed au coucher du soleil', 'Retour à Dubaï en soirée'],
      ['الانطلاق من دبي نحو 9:00', 'اللوفر أبوظبي', 'الغداء', 'قصر الوطن', 'جامع الشيخ زايد الكبير عند الغروب', 'العودة إلى دبي مساءً'],
    ),
    note: t('Modest dress is required at the Grand Mosque; the mosque is closed to visitors on Friday mornings.', 'Tenue modeste exigée à la Grande Mosquée ; fermée aux visiteurs le vendredi matin.', 'يُشترط اللباس المحتشم في الجامع الكبير؛ ويُغلق أمام الزوار صباح الجمعة.'),
  },
  {
    slug: 'dubai-in-3-days',
    image: { slot: 'hero-desktop', fallback: 'dubaiSkyline' },
    theme: 'first-visit',
    name: t('Dubai in 3 Days', 'Dubaï en 3 jours', 'دبي في 3 أيام'),
    tagline: t('The first visit, planned end to end — airport to airport.', 'Le premier séjour, organisé de bout en bout — d’aéroport à aéroport.', 'الزيارة الأولى، مخططة من البداية إلى النهاية — من المطار إلى المطار.'),
    description: t(
      'Arrival transfer, Burj Khalifa and the Museum of the Future, a private walk through Old Dubai and the souks, a private desert evening, and your transfer back to the airport. We set the days around your flights.',
      'Transfert d’arrivée, Burj Khalifa et le Museum of the Future, une balade privée dans le vieux Dubaï et ses souks, une soirée privée dans le désert, et le transfert retour. Nous organisons les jours selon vos vols.',
      'الاستقبال من المطار، وبرج خليفة ومتحف المستقبل، وجولة خاصة في دبي القديمة وأسواقها، وأمسية صحراوية خاصة، والتوصيل إلى المطار. نرتب الأيام حسب رحلاتك.',
    ),
    duration: t('3 days', '3 jours', '3 أيام'),
    party: t('Priced for 2 adults', 'Prix pour 2 adultes', 'السعر لشخصين بالغين'),
    suits: ['couples', 'friends'],
    booking: 'concierge',
    multiDay: true,
    items: [
      item('airport-transfer', 'airport-sedan', 1),
      item('burj-khalifa-at-the-top', 'bk-124', 2, { time: 'evening' }),
      item('museum-of-the-future', 'motf-entry', 2, { time: 'morning' }),
      item('old-dubai-heritage-walk', 'old-dubai-4', 1, { time: 'morning' }),
      item('private-desert-safari', 'private-evening', 1, { time: 'evening' }),
      item('airport-transfer', 'airport-sedan', 1),
    ],
    flow: ta(
      ['Day 1: arrival transfer; Burj Khalifa at sunset', 'Day 2: Museum of the Future; Old Dubai, the Creek and the souks', 'Day 3: private desert evening', 'Departure transfer'],
      ['Jour 1 : transfert d’arrivée ; Burj Khalifa au coucher du soleil', 'Jour 2 : Museum of the Future ; vieux Dubaï, la Creek et les souks', 'Jour 3 : soirée privée dans le désert', 'Transfert de départ'],
      ['اليوم 1: الاستقبال من المطار؛ برج خليفة عند الغروب', 'اليوم 2: متحف المستقبل؛ دبي القديمة والخور والأسواق', 'اليوم 3: أمسية صحراوية خاصة', 'التوصيل إلى المطار'],
    ),
  },
]

export function getPackage(slug: string) {
  return packages.find(p => p.slug === slug)
}
