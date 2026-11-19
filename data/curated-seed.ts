import type { L } from '@/lib/catalogue/types'

/**
 * Built-in curated lists, used until the DXB CRM publishes its own (Website listings → Publish).
 * Once the CRM has published a list, data/published/<kind>.json replaces it and this file is only
 * the fallback. The same entries are seeded into the CRM so the team edits them there.
 *
 * Sources (checked 19 Nov 2026): Time Out Dubai Restaurant Awards 2026 (list updated 3 Nov 2026);
 * What's On Nightlife Awards 2025 (29 Oct 2025). Descriptions are our own words; no award text or
 * photos are reused. Where a fact was not confirmed it is left out rather than guessed.
 * Every card says we REQUEST the table on the guest's behalf — never "guaranteed".
 */

const t = (en: string, fr: string, ar: string): L => ({ en, fr, ar })

export type SeedRestaurant = {
  slug: string
  name: string
  cuisine: L
  area: string
  why: L
  bestFor: L
  basis: L
  website?: string
  active: boolean
}

export type SeedNightlife = {
  slug: string
  name: string
  kindOfNight: L
  area: string
  why: L
  bestFor: L
  basis: L
  website?: string
  active: boolean
}

export const SEED_RESTAURANTS: SeedRestaurant[] = [
  {
    slug: 'row-on-45',
    name: 'Row on 45',
    cuisine: t('Tasting menu, European and Japanese', 'Menu dégustation, européen et japonais', 'قائمة تذوّق، أوروبية ويابانية'),
    area: 'Grosvenor House, Dubai Marina',
    why: t(
      'Time Out Dubai’s Restaurant of the Year 2026: a long tasting menu where European and Japanese technique meet. The table for the night that matters most.',
      'Restaurant de l’année 2026 pour Time Out Dubai : un long menu dégustation où se rencontrent techniques européennes et japonaises. La table du soir qui compte le plus.',
      'مطعم العام 2026 بحسب تايم آوت دبي: قائمة تذوّق طويلة تلتقي فيها التقنيات الأوروبية واليابانية. الطاولة المثالية للأمسية الأهم.',
    ),
    bestFor: t('Special occasions', 'Grandes occasions', 'المناسبات الخاصة'),
    basis: t('Time Out Dubai 2026 — Restaurant of the Year', 'Time Out Dubai 2026 — Restaurant de l’année', 'تايم آوت دبي 2026 — مطعم العام'),
    website: 'https://rowon45dubai.com',
    active: true,
  },
  {
    slug: 'la-petite-maison',
    name: 'La Petite Maison (LPM)',
    cuisine: t('French Mediterranean', 'Méditerranéen à la française', 'متوسطي بلمسة فرنسية'),
    area: 'Gate Village 8, DIFC',
    why: t(
      'A DIFC institution, named Best French restaurant in 2026. Relaxed Riviera cooking that works as well for a business lunch as for a long dinner with friends.',
      'Une institution de DIFC, élue meilleur restaurant français en 2026. Une cuisine de la Riviera décontractée, aussi juste pour un déjeuner d’affaires que pour un long dîner entre amis.',
      'من معالم مركز دبي المالي العالمي، وأفضل مطعم فرنسي لعام 2026. مطبخ الريفييرا المريح يناسب غداء العمل كما يناسب عشاءً طويلاً مع الأصدقاء.',
    ),
    bestFor: t('Business lunch, social dinner', 'Déjeuner d’affaires, dîner entre amis', 'غداء العمل، العشاء مع الأصدقاء'),
    basis: t('Time Out Dubai 2026 — Winner, Best French', 'Time Out Dubai 2026 — Lauréat, meilleur français', 'تايم آوت دبي 2026 — الفائز، أفضل مطعم فرنسي'),
    website: 'https://lpmrestaurants.com/dubai',
    active: true,
  },
  {
    slug: 'zuma',
    name: 'Zuma',
    cuisine: t('Contemporary Japanese', 'Japonais contemporain', 'ياباني معاصر'),
    area: 'Gate Village 7, DIFC',
    why: t(
      'Contemporary Japanese with energy, highly commended for both Japanese cooking and brunch in 2026. Best with a group and a lively evening ahead.',
      'Un japonais contemporain plein d’énergie, distingué en 2026 pour sa cuisine japonaise comme pour son brunch. Idéal en groupe, pour une soirée animée.',
      'مطبخ ياباني معاصر مفعم بالحيوية، نال إشادة خاصة عام 2026 عن المطبخ الياباني والبرانش معاً. الأجمل مع مجموعة وأمسية حيوية.',
    ),
    bestFor: t('Groups, lively evenings', 'Groupes, soirées animées', 'المجموعات، الأمسيات الحيوية'),
    basis: t('Time Out Dubai 2026 — Highly commended, Japanese and Brunch', 'Time Out Dubai 2026 — Mention, japonais et brunch', 'تايم آوت دبي 2026 — إشادة خاصة، ياباني وبرانش'),
    website: 'https://zumarestaurant.com',
    active: true,
  },
  {
    slug: 'dinner-by-heston-blumenthal',
    name: 'Dinner by Heston Blumenthal',
    cuisine: t('British, historic recipes', 'Britannique, recettes historiques', 'بريطاني، وصفات تاريخية'),
    area: 'Atlantis The Royal, Palm Jumeirah',
    why: t(
      'British dishes rebuilt from historic recipes, and Best European restaurant in 2026. For guests who travel to eat well.',
      'Des plats britanniques recréés d’après des recettes historiques, meilleur restaurant européen en 2026. Pour ceux qui voyagent pour bien manger.',
      'أطباق بريطانية أُعيد ابتكارها من وصفات تاريخية، وأفضل مطعم أوروبي لعام 2026. لمن يسافر من أجل الطعام الجيد.',
    ),
    bestFor: t('Fine dining, food lovers', 'Gastronomie, gourmets', 'المطاعم الراقية، عشّاق الطعام'),
    basis: t('Time Out Dubai 2026 — Winner, Best European', 'Time Out Dubai 2026 — Lauréat, meilleur européen', 'تايم آوت دبي 2026 — الفائز، أفضل مطعم أوروبي'),
    website: 'https://dinnerbyheston.com',
    active: true,
  },
  {
    slug: 'mimi-kakushi',
    name: 'Mimi Kakushi',
    cuisine: t('Japanese, 1920s Osaka style', 'Japonais, esprit Osaka des années 1920', 'ياباني بروح أوساكا في عشرينيات القرن الماضي'),
    area: 'Four Seasons Resort, Jumeirah',
    why: t(
      'Japanese cooking in a setting inspired by 1920s Osaka, and Best Japanese restaurant in 2026. A natural choice for a date night.',
      'Une cuisine japonaise dans un décor inspiré de l’Osaka des années 1920, meilleur restaurant japonais en 2026. Le choix naturel pour un dîner à deux.',
      'مطبخ ياباني في أجواء مستوحاة من أوساكا العشرينيات، وأفضل مطعم ياباني لعام 2026. خيار طبيعي لعشاء رومانسي.',
    ),
    bestFor: t('Date night', 'Dîner en tête-à-tête', 'عشاء لشخصين'),
    basis: t('Time Out Dubai 2026 — Winner, Best Japanese', 'Time Out Dubai 2026 — Lauréat, meilleur japonais', 'تايم آوت دبي 2026 — الفائز، أفضل مطعم ياباني'),
    website: 'https://mimikakushi.ae',
    active: true,
  },
  {
    slug: 'seafire-steakhouse',
    name: 'Seafire Steakhouse & Bar',
    cuisine: t('Steakhouse', 'Steakhouse', 'مطعم ستيك'),
    area: 'Atlantis The Palm, Palm Jumeirah',
    why: t(
      'Named Best Steakhouse in 2026. An easy, generous choice when the whole family or a large group is at the table.',
      'Élu meilleur steakhouse en 2026. Un choix simple et généreux quand toute la famille ou un grand groupe est à table.',
      'أفضل مطعم ستيك لعام 2026. خيار سهل وسخي حين تجتمع العائلة كلها أو مجموعة كبيرة حول المائدة.',
    ),
    bestFor: t('Families, groups', 'Familles, groupes', 'العائلات، المجموعات'),
    basis: t('Time Out Dubai 2026 — Winner, Best Steakhouse', 'Time Out Dubai 2026 — Lauréat, meilleur steakhouse', 'تايم آوت دبي 2026 — الفائز، أفضل مطعم ستيك'),
    active: true,
  },
  {
    slug: 'hutong',
    name: 'Hutong',
    cuisine: t('Northern Chinese', 'Chinois du Nord', 'صيني شمالي'),
    area: 'Gate Building 6, DIFC',
    why: t(
      'Northern Chinese cooking with views over the city, highly commended in 2026. A strong room for a business dinner.',
      'Une cuisine chinoise du Nord avec vue sur la ville, distinguée en 2026. Une belle adresse pour un dîner d’affaires.',
      'مطبخ صيني شمالي بإطلالة على المدينة، نال إشادة خاصة عام 2026. مكان مناسب لعشاء عمل.',
    ),
    bestFor: t('Business dinners, skyline views', 'Dîners d’affaires, vue sur la ville', 'عشاء العمل، إطلالة على الأفق'),
    basis: t('Time Out Dubai 2026 — Highly commended, Best Chinese', 'Time Out Dubai 2026 — Mention, meilleur chinois', 'تايم آوت دبي 2026 — إشادة خاصة، أفضل مطعم صيني'),
    website: 'https://hutong-dubai.com',
    active: true,
  },
  {
    slug: 'orfali-bros',
    name: 'Orfali Bros',
    cuisine: t('Modern Middle Eastern', 'Moyen-Orient moderne', 'شرق أوسطي معاصر'),
    area: 'Wasl 51, Jumeirah',
    why: t(
      'Modern Middle Eastern cooking from three brothers, with a 13-course tasting menu highly commended in 2026. The way to taste the region today. No alcohol is served.',
      'La cuisine moderne du Moyen-Orient de trois frères, avec un menu dégustation de 13 plats distingué en 2026. La meilleure façon de goûter la région aujourd’hui. Sans alcool.',
      'مطبخ شرق أوسطي معاصر يقدّمه ثلاثة إخوة، مع قائمة تذوّق من 13 طبقاً نالت إشادة خاصة عام 2026. أفضل طريقة لتذوّق المنطقة اليوم. لا تُقدَّم المشروبات الكحولية.',
    ),
    bestFor: t('A taste of the region', 'Les saveurs de la région', 'نكهات المنطقة'),
    basis: t('Time Out Dubai 2026 — Highly commended, tasting menu under Dhs1,000', 'Time Out Dubai 2026 — Mention, menu dégustation à moins de 1 000 AED', 'تايم آوت دبي 2026 — إشادة خاصة، قائمة تذوّق بأقل من 1,000 درهم'),
    website: 'https://orfalibros.com',
    active: true,
  },
  {
    slug: 'cipriani',
    name: 'Cipriani',
    cuisine: t('Venetian Italian', 'Italien vénitien', 'إيطالي على الطريقة الفينيسية'),
    area: 'Gate Village 10, DIFC',
    why: t(
      'Classic Venetian cooking and polished service in DIFC since 2016. Our own pick for guests who want Italian done the traditional way.',
      'Cuisine vénitienne classique et service soigné à DIFC depuis 2016. Notre propre choix pour qui aime l’italien dans la tradition.',
      'مطبخ فينيسي كلاسيكي وخدمة راقية في مركز دبي المالي العالمي منذ 2016. اختيارنا الخاص لمن يحب المطبخ الإيطالي على أصوله.',
    ),
    bestFor: t('Classic, polished Italian', 'Italien classique et soigné', 'الإيطالي الكلاسيكي الراقي'),
    basis: t('DXB TKTS pick', 'Choix DXB TKTS', 'اختيار DXB TKTS'),
    website: 'https://www.cipriani.com/cipriani-dubai',
    active: true,
  },
  {
    // Owner's pick; location and cuisine still to confirm, so it stays off the site until checked in the CRM.
    slug: 'novikov',
    name: 'Novikov',
    cuisine: t('', '', ''),
    area: '',
    why: t('', '', ''),
    bestFor: t('Shopping-day lunch', 'Déjeuner en pleine journée shopping', 'غداء خلال يوم التسوق'),
    basis: t('DXB TKTS pick', 'Choix DXB TKTS', 'اختيار DXB TKTS'),
    active: false,
  },
]

export const SEED_NIGHTLIFE: SeedNightlife[] = [
  {
    slug: 'ling-ling-ultra-lounge',
    name: 'Ling Ling Ultra Lounge',
    kindOfNight: t('Ultra lounge, late-night club', 'Ultra lounge, club de fin de soirée', 'ألترا لاونج ونادٍ ليلي متأخر'),
    area: 'Atlantis The Royal, Palm Jumeirah',
    why: t('Nightclub of the Year at the What’s On Nightlife Awards 2025. Where the night goes after dinner.', 'Club de l’année aux What’s On Nightlife Awards 2025. Là où la nuit continue après le dîner.', 'النادي الليلي لعام 2025 في جوائز What’s On للحياة الليلية. حيث تستمر الليلة بعد العشاء.'),
    bestFor: t('Late nights', 'Nuits tardives', 'السهرات المتأخرة'),
    basis: t('What’s On 2025 — Nightclub of the Year', 'What’s On 2025 — Club de l’année', 'What’s On 2025 — النادي الليلي لهذا العام'),
    active: true,
  },
  {
    slug: 'ushuaia-dubai-harbour',
    name: 'Ushüaïa Dubai Harbour',
    kindOfNight: t('Open-air, international DJs', 'En plein air, DJ internationaux', 'في الهواء الطلق مع منسّقي أغانٍ عالميين'),
    area: 'Dubai Harbour',
    why: t('Open-air nights with headline DJs; it hosted the best international DJ set of 2025.', 'Des nuits en plein air avec des DJ de premier plan ; il a accueilli le meilleur set international de 2025.', 'سهرات في الهواء الطلق مع أبرز منسّقي الأغاني؛ واستضاف أفضل عرض دي جي عالمي لعام 2025.'),
    bestFor: t('Big DJ nights', 'Grandes soirées DJ', 'ليالي الدي جي الكبرى'),
    basis: t('What’s On 2025 — Best International DJ Set', 'What’s On 2025 — Meilleur set DJ international', 'What’s On 2025 — أفضل عرض دي جي عالمي'),
    active: true,
  },
  {
    slug: 'playa-pacha',
    name: 'Playa Pacha',
    kindOfNight: t('Beach club into night, house music', 'Beach club jusqu’à la nuit, musique house', 'نادٍ شاطئي يمتد إلى الليل، موسيقى هاوس'),
    area: 'FIVE LUXE, JBR',
    why: t('A beach afternoon that turns into a house-music night, highly commended for its DJ sets in 2025.', 'Un après-midi à la plage qui devient une nuit house, distingué pour ses sets DJ en 2025.', 'ظهيرة على الشاطئ تتحول إلى ليلة موسيقى هاوس، نال إشادة خاصة عن عروض الدي جي عام 2025.'),
    bestFor: t('Sunset into night', 'Du coucher de soleil à la nuit', 'من الغروب حتى الليل'),
    basis: t('What’s On 2025 — Highly commended, International DJ Set', 'What’s On 2025 — Mention, set DJ international', 'What’s On 2025 — إشادة خاصة، عرض دي جي عالمي'),
    active: true,
  },
  {
    slug: 'ce-la-vi',
    name: 'CÉ LA VI',
    kindOfNight: t('Rooftop restaurant and party', 'Restaurant et fête sur le toit', 'مطعم وسهرة على السطح'),
    area: 'Address Sky View, Downtown',
    why: t('Dinner high above Downtown that becomes a party, highly commended as a party restaurant in 2025.', 'Un dîner au-dessus de Downtown qui se transforme en fête, distingué comme restaurant festif en 2025.', 'عشاء مرتفع فوق وسط المدينة يتحول إلى سهرة، نال إشادة خاصة كمطعم سهرات عام 2025.'),
    bestFor: t('Dinner that becomes a party', 'Un dîner qui devient une fête', 'عشاء يتحول إلى سهرة'),
    basis: t('What’s On 2025 — Highly commended, Party Restaurant', 'What’s On 2025 — Mention, restaurant festif', 'What’s On 2025 — إشادة خاصة، مطعم سهرات'),
    active: true,
  },
  {
    slug: 'gatsby',
    name: 'Gatsby',
    kindOfNight: t('Dinner and a show', 'Dîner-spectacle', 'عشاء مع عرض'),
    area: '',
    why: t('Winner of Dinner and a Show at the What’s On Nightlife Awards 2025.', 'Lauréat du dîner-spectacle aux What’s On Nightlife Awards 2025.', 'الفائز بفئة العشاء مع عرض في جوائز What’s On للحياة الليلية 2025.'),
    bestFor: t('A night out with a show', 'Une soirée avec spectacle', 'سهرة مع عرض'),
    basis: t('What’s On 2025 — Winner, Dinner and a Show', 'What’s On 2025 — Lauréat, dîner-spectacle', 'What’s On 2025 — الفائز، عشاء مع عرض'),
    active: true,
  },
  {
    slug: 'billionaire-dubai',
    name: 'Billionaire Dubai',
    kindOfNight: t('Dinner, show and late night', 'Dîner, spectacle et fin de soirée', 'عشاء وعرض وسهرة متأخرة'),
    area: '',
    why: t('Dinner, a show and a late night in one place; highly commended for Dinner and a Show in 2025.', 'Dîner, spectacle et fin de soirée au même endroit ; distingué pour le dîner-spectacle en 2025.', 'عشاء وعرض وسهرة متأخرة في مكان واحد؛ نال إشادة خاصة في فئة العشاء مع عرض عام 2025.'),
    bestFor: t('Celebrations', 'Célébrations', 'الاحتفالات'),
    basis: t('What’s On 2025 — Highly commended, Dinner and a Show', 'What’s On 2025 — Mention, dîner-spectacle', 'What’s On 2025 — إشادة خاصة، عشاء مع عرض'),
    active: true,
  },
  {
    slug: 'opa',
    name: 'Opa',
    kindOfNight: t('Greek party restaurant', 'Restaurant grec festif', 'مطعم سهرات يوناني'),
    area: '',
    why: t('Greek food and a party atmosphere; Party Restaurant of the Year at the 2025 awards.', 'Cuisine grecque et ambiance de fête ; restaurant festif de l’année aux prix 2025.', 'طعام يوناني وأجواء احتفالية؛ مطعم السهرات لعام 2025.'),
    bestFor: t('Groups, birthdays', 'Groupes, anniversaires', 'المجموعات، أعياد الميلاد'),
    basis: t('What’s On 2025 — Winner, Party Restaurant', 'What’s On 2025 — Lauréat, restaurant festif', 'What’s On 2025 — الفائز، مطعم سهرات'),
    active: true,
  },
  {
    slug: 'mercury-rooftop',
    name: 'Mercury Rooftop',
    kindOfNight: t('Rooftop bar, sunset into night', 'Bar sur le toit, du coucher de soleil à la nuit', 'بار على السطح، من الغروب حتى الليل'),
    area: 'Four Seasons Resort, Jumeirah',
    why: t('Rooftop Bar of the Year 2025: sunset drinks that easily become the evening.', 'Bar sur le toit de l’année 2025 : un verre au coucher du soleil qui devient la soirée.', 'أفضل بار على السطح لعام 2025: مشروبات الغروب التي تصبح الأمسية كلها.'),
    bestFor: t('Sunset drinks', 'Apéritif au coucher du soleil', 'مشروبات الغروب'),
    basis: t('What’s On 2025 — Winner, Rooftop Bar', 'What’s On 2025 — Lauréat, bar sur le toit', 'What’s On 2025 — الفائز، بار على السطح'),
    active: true,
  },
  {
    slug: 'blind-tiger',
    name: 'Blind Tiger',
    kindOfNight: t('Speakeasy', 'Speakeasy', 'بار سرّي (سبيك إيزي)'),
    area: 'Jumeirah Al Naseem',
    why: t('A hidden speakeasy, named the best of its kind in 2025. Small, discreet and worth finding.', 'Un speakeasy caché, élu meilleur du genre en 2025. Petit, discret et à découvrir.', 'بار سرّي مخفي، الأفضل في فئته لعام 2025. صغير وهادئ ويستحق البحث عنه.'),
    bestFor: t('Cocktails for two', 'Cocktails à deux', 'كوكتيلات لشخصين'),
    basis: t('What’s On 2025 — Winner, Speakeasy Bar', 'What’s On 2025 — Lauréat, speakeasy', 'What’s On 2025 — الفائز، بار سرّي'),
    active: true,
  },
  {
    slug: 'bla-bla-dubai',
    name: 'Bla Bla Dubai',
    kindOfNight: t('Live music by the beach', 'Musique live près de la plage', 'موسيقى حية بجانب الشاطئ'),
    area: 'The Beach, JBR',
    why: t('Live Music Venue of the Year 2025, a few steps from the sea.', 'Salle de musique live de l’année 2025, à quelques pas de la mer.', 'أفضل مكان للموسيقى الحية لعام 2025، على بُعد خطوات من البحر.'),
    bestFor: t('Live bands, relaxed groups', 'Concerts live, groupes détendus', 'الفرق الحية، المجموعات الهادئة'),
    basis: t('What’s On 2025 — Winner, Live Music Venue', 'What’s On 2025 — Lauréat, musique live', 'What’s On 2025 — الفائز، مكان الموسيقى الحية'),
    active: true,
  },
]
