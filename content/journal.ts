import type { L } from '@/lib/catalogue/types'

/**
 * DXB TKTS Journal.
 *
 * Editorial rules: few articles, each one useful and checked. No invented
 * venues, prices, opening hours or partnerships. Prices and hours change, so
 * we point to what we can arrange rather than quoting them.
 * Article bodies are written in English; French and Arabic pages show the
 * translated title and introduction with a note (and canonical → English).
 */

const t = (en: string, fr: string, ar: string): L => ({ en, fr, ar })

export type JournalCategory =
  | 'dubai-lifestyle'
  | 'luxury-experiences'
  | 'restaurants-dining'
  | 'hotels-resorts'
  | 'whats-new'
  | 'insider-guides'
  | 'family-experiences'
  | 'uae-travel'

export const journalCategories: { slug: JournalCategory; name: L }[] = [
  { slug: 'dubai-lifestyle', name: t('Dubai Lifestyle', 'Art de vivre à Dubaï', 'أسلوب الحياة في دبي') },
  { slug: 'luxury-experiences', name: t('Luxury Experiences', 'Expériences d’exception', 'تجارب فاخرة') },
  { slug: 'restaurants-dining', name: t('Restaurants & Dining', 'Restaurants & gastronomie', 'المطاعم والمأكولات') },
  { slug: 'hotels-resorts', name: t('Hotels & Resorts', 'Hôtels & resorts', 'الفنادق والمنتجعات') },
  { slug: 'whats-new', name: t('What’s New in Dubai', 'Nouveautés à Dubaï', 'الجديد في دبي') },
  { slug: 'insider-guides', name: t('Insider Guides', 'Guides d’initiés', 'أدلة من الداخل') },
  { slug: 'family-experiences', name: t('Family Experiences', 'Expériences en famille', 'تجارب عائلية') },
  { slug: 'uae-travel', name: t('UAE Travel & Discoveries', 'Voyages & découvertes aux Émirats', 'السفر والاكتشاف في الإمارات') },
]

export type Block = { h: string } | { p: string } | { list: string[] } | { tip: string }

export type Article = {
  slug: string
  category: JournalCategory
  /** Image slot in lib/ai-images.json, with a registry fallback. */
  image: { slot: string; fallback: 'dubaiSkyline' | 'grandMosque' | 'fineDining' | 'privateVilla'; alt: string }
  published: string // YYYY-MM-DD
  featured?: boolean
  title: L
  excerpt: L
  body: Block[] // English
  /** Where a reader can take it further with us. */
  related: { href: string; label: L }[]
}

export const articles: Article[] = [
  {
    slug: 'when-to-visit-dubai-month-by-month',
    category: 'insider-guides',
    image: { slot: 'gallery-icons', fallback: 'dubaiSkyline', alt: 'Dubai skyline in the soft light of the cool season' },
    published: '2026-11-18',
    title: t(
      'When to visit Dubai: the season, month by month',
      'Quand venir à Dubaï : la saison, mois par mois',
      'متى تزور دبي: الموسم شهراً بشهر',
    ),
    excerpt: t(
      'Dubai has two lives — an outdoor city from November to March, an indoor one in high summer. Here is how the year really works, and how to choose your dates.',
      'Dubaï vit deux vies — une ville à ciel ouvert de novembre à mars, une ville intérieure au cœur de l’été. Voici comment l’année fonctionne vraiment, et comment choisir vos dates.',
      'لدبي حياتان — مدينة في الهواء الطلق من نوفمبر إلى مارس، ومدينة داخلية في ذروة الصيف. إليك كيف يسير العام فعلاً وكيف تختار مواعيدك.',
    ),
    body: [
      { p: 'Ask anyone who lives here when to come and the answer is almost always the same: between November and March. It is a good answer, but not a complete one. Dubai’s year has a rhythm — weather, holidays, the event calendar and hotel demand all move together — and knowing it is the difference between a trip that flows and one spent queuing in the heat.' },
      { h: 'November to March: the outdoor season' },
      { p: 'This is when the city lives outside. Days are warm and dry, usually somewhere in the twenties Celsius, and evenings are cool enough for a jacket in the desert. Beach clubs, terraces, dhow dinners on the Creek and dune evenings are all at their best. It is also when Dubai is busiest: the big sporting weekends, art and design weeks, the Dubai Shopping Festival and New Year’s Eve all fall in these months.' },
      { list: [
        'December and January are the peak. Book flights, hotels and any important dinners early — New Year’s Eve tables and yachts are often committed months ahead.',
        'February and March are, for many residents, the sweet spot: still mild, a little less crowded, with the region’s great sporting and cultural events in full swing.',
        'Desert nights can be genuinely cold in mid-winter. If you are planning a dinner in the dunes, bring a layer.',
      ] },
      { h: 'April and October: the shoulder months' },
      { p: 'Warm rather than hot, with the sea at its most inviting. Mornings and evenings are still very pleasant outside; the middle of the day is for the pool, a long lunch or a museum. Prices start to soften in April and rise again through October as the season returns.' },
      { h: 'May to September: the indoor season' },
      { p: 'From late May the heat builds, and from June to September daytime temperatures regularly pass 40°C, with real humidity on the coast. The city does not stop — it moves indoors and late. Malls, spas, indoor attractions and long dinners carry the day; desert activities shift to the early morning or after sunset. Hotel rates are often at their lowest, which makes summer a quietly good time for a city-and-spa stay if you plan around the heat.' },
      { tip: 'If you are visiting in summer, plan everything outdoors before 9:00 or after sunset, and keep transfers air-conditioned door to door. It changes the whole experience.' },
      { h: 'Ramadan, Eid and the moving calendar' },
      { p: 'Ramadan follows the lunar calendar and arrives roughly eleven days earlier each year; in 2027 it is expected to begin around 8 February, with Eid al-Fitr in early March, subject to the moon sighting. The holy month is a beautiful time to visit: days are calmer, and evenings come alive with iftar at sunset and long, generous nights. Some opening hours change, and visitors should be discreet about eating and drinking in public during fasting hours. Eid itself brings public holidays and a rush of travel — hotels fill quickly.' },
      { h: 'The weekend' },
      { p: 'Since January 2022 the UAE’s official weekend has been Saturday and Sunday, and most businesses follow it. Restaurants and beach clubs are busiest from Friday evening through Saturday, and weekend brunch remains a Dubai institution.' },
      { h: 'Choosing your dates' },
      { p: 'If you have flexibility, decide what matters most. For guaranteed outdoor weather, aim for December to March. For value with good weather, look at the edges of the season — early November or late March into April. And if you are coming for a specific event, check our calendar for the official dates, then build the rest of the stay around it.' },
    ],
    related: [
      { href: '/tickets', label: t('See the Dubai & UAE calendar', 'Voir l’agenda de Dubaï et des Émirats', 'اطّلع على تقويم دبي والإمارات') },
      { href: '/request', label: t('Plan your dates with us', 'Organiser vos dates avec nous', 'خطط لمواعيدك معنا') },
    ],
  },
  {
    slug: 'dubai-desert-conservation-reserve',
    category: 'luxury-experiences',
    image: { slot: 'product-desert-safari-in-style', fallback: 'dubaiSkyline', alt: 'A classic open-top 4x4 crossing the dunes of the Dubai Desert Conservation Reserve' },
    published: '2026-11-18',
    title: t(
      'Inside the Dubai Desert Conservation Reserve',
      'Au cœur de la Dubai Desert Conservation Reserve',
      'داخل محمية دبي الصحراوية',
    ),
    excerpt: t(
      'Not every desert safari is the same desert. Why the protected reserve south-east of the city offers a quieter, wilder and more meaningful way to see the dunes.',
      'Tous les safaris ne se valent pas. Pourquoi la réserve protégée au sud-est de la ville offre une manière plus calme, plus sauvage et plus juste de découvrir les dunes.',
      'ليست كل رحلات السفاري في الصحراء نفسها. لماذا تقدم المحمية جنوب شرق المدينة طريقة أهدأ وأكثر برية وعمقاً لرؤية الكثبان.',
    ),
    body: [
      { p: 'Most visitors to Dubai spend an evening in the desert, and most of those evenings happen in the same few areas: busy dune-bashing grounds, large camps, a hundred cars on the same ridge at sunset. It can be fun. It is not the only way.' },
      { p: 'South-east of the city lies the Dubai Desert Conservation Reserve — around 225 square kilometres, close to five per cent of the emirate’s land, protected since 2003. Inside it the rules are different: only a limited number of licensed operators may work there, routes are controlled, and the point of being there is the desert itself.' },
      { h: 'What you actually see' },
      { p: 'The reserve’s best-known residents are its Arabian oryx — the white antelope with long straight horns that was extinct in the wild by the early 1970s and has since been brought back through breeding and reintroduction programmes across the region. In 2011 it became the first animal to move from “extinct in the wild” to “vulnerable” on the IUCN Red List. Seeing a herd moving across the sand in the early light is one of the quiet great moments of a Dubai visit.' },
      { list: [
        'Arabian oryx and two species of gazelle, often seen in the morning and late afternoon.',
        'Ghaf trees — the UAE’s national tree — which survive on roots that reach deep groundwater.',
        'Desert foxes, lizards and, in winter, migrating birds; tracks in the sand at dawn tell you who passed overnight.',
      ] },
      { h: 'How a reserve experience differs' },
      { p: 'Because numbers are limited, the atmosphere is calm. The best experiences in the reserve lean on story rather than speed: a drive in a classic open-top 4x4, an hour with a falconer, a guide who explains how Bedouin families lived and moved with the seasons, and a meal under the sky. There is no rush to the top of a dune to compete for the sunset.' },
      { tip: 'Choose the morning if wildlife is your priority — the animals are most active and the light is soft. Choose the late afternoon if you want the sunset and dinner that follows.' },
      { h: 'Who it suits' },
      { p: 'Families with curious children, photographers, couples who want the desert without the crowd, and anyone who has done a classic safari before and wants to see the desert properly. It also works beautifully as a private experience for a small group, timed to your schedule.' },
      { h: 'Planning it' },
      { p: 'Reserve experiences are run by licensed operators and are subject to their availability, especially at weekends and during the peak season. We arrange private and small-group safaris in the reserve and can combine them with a private dinner in the dunes.' },
    ],
    related: [
      { href: '/experiences/signature/desert-safari-in-style', label: t('Desert Safari in Style', 'Safari dans le désert, en toute élégance', 'سفاري الصحراء بأناقة') },
      { href: '/experiences/signature/private-dune-dinner', label: t('Private dinner in the dunes', 'Dîner privé dans les dunes', 'عشاء خاص بين الكثبان') },
    ],
  },
  {
    slug: 'old-dubai-in-a-morning',
    category: 'dubai-lifestyle',
    image: { slot: 'blog-old-dubai', fallback: 'grandMosque', alt: 'A guide walking visitors past the spice stalls and wind towers beside Dubai Creek' },
    published: '2026-11-18',
    title: t(
      'Old Dubai in a morning: Al Fahidi, the Creek and the souks',
      'Le vieux Dubaï en une matinée : Al Fahidi, la Creek et les souks',
      'دبي القديمة في صباح واحد: الفهيدي والخور والأسواق',
    ),
    excerpt: t(
      'Before the towers, there was the Creek. A walking route through the oldest part of the city — wind towers, an abra crossing and the spice and gold souks of Deira.',
      'Avant les tours, il y avait la Creek. Un itinéraire à pied dans le plus vieux quartier de la ville — tours à vent, traversée en abra et souks aux épices et à l’or de Deira.',
      'قبل الأبراج كان الخور. مسار سيراً على الأقدام في أقدم أجزاء المدينة — أبراج الرياح وعبور بالعَبرة وسوقا التوابل والذهب في ديرة.',
    ),
    body: [
      { p: 'Dubai grew up around its Creek, the saltwater inlet that divides Bur Dubai from Deira. Pearling boats, traders from Persia and India, and the dhows that still load cargo along the wharves made the city long before the skyline did. The best way to understand it is on foot, early, in the cool season.' },
      { h: 'Start in Al Fahidi' },
      { p: 'The Al Fahidi Historical Neighbourhood, on the Bur Dubai side, is a quiet maze of restored coral-stone and gypsum houses. Look up and you will see the barjeel — wind towers that caught the breeze and pushed it down into the rooms below, the city’s original air-conditioning. Many of the houses are now small galleries, cafés and cultural spaces, and the lanes are at their best before the day warms up.' },
      { tip: 'For a genuine introduction to Emirati customs, the Sheikh Mohammed Centre for Cultural Understanding in Al Fahidi hosts meals and conversations with Emirati hosts — questions are welcome. Sessions need booking ahead.' },
      { h: 'Along the water' },
      { p: 'From Al Fahidi it is a short walk to the Creek. Following the water north brings you towards Al Shindagha, the historic district at the mouth of the Creek, where restored houses tell the story of the families who built the city.' },
      { h: 'Cross by abra' },
      { p: 'The abra — a small wooden water taxi — has carried people across the Creek for generations, and it still does: a few minutes on open water, at eye level with the dhows. It is the simplest, most local thing you can do in Dubai, and one of the most memorable.' },
      { h: 'The souks of Deira' },
      { list: [
        'The Spice Souk: sacks of frankincense, saffron, dried limes and rose petals. Ask before photographing a stall, and expect to bargain.',
        'The Gold Souk: a covered street of jewellers whose windows have become one of the city’s classic sights. Prices for gold follow the daily market rate plus a charge for the workmanship — the part that is negotiable.',
        'Between the two, the lanes of small traders selling everything from textiles to tea glasses.',
      ] },
      { h: 'Practical notes' },
      { p: 'Go between November and March and start by 8:30 to finish before the midday heat. Wear comfortable shoes and dress modestly — shoulders and knees covered is respectful in the older districts. Friday midday, around prayer time, is quieter and some shops close briefly. A private guide makes a real difference here: the stories behind the houses and the trade routes are what bring the neighbourhood to life.' },
    ],
    related: [
      { href: '/experiences/day-trips/old-dubai-heritage-walk', label: t('Old Dubai heritage walk', 'Balade patrimoniale dans le vieux Dubaï', 'جولة تراثية في دبي القديمة') },
      { href: '/experiences/day-trips/private-dubai-city-tour', label: t('Private Dubai city tour', 'Visite privée de Dubaï', 'جولة خاصة في دبي') },
    ],
  },
  {
    slug: 'hatta-dubai-mountain-escape',
    category: 'uae-travel',
    image: { slot: 'product-hatta-mountain-day', fallback: 'dubaiSkyline', alt: 'Kayaks on the turquoise water of Hatta Dam in the Hajar Mountains' },
    published: '2026-11-18',
    title: t(
      'Hatta: Dubai’s mountain escape',
      'Hatta : l’échappée montagnarde de Dubaï',
      'حتا: ملاذ دبي الجبلي',
    ),
    excerpt: t(
      'An hour and a half from Downtown, the Hajar Mountains, a turquoise reservoir and a heritage village. Why Hatta is the day out most visitors never hear about.',
      'À une heure et demie de Downtown, les montagnes du Hajar, un lac turquoise et un village patrimonial. Pourquoi Hatta est l’escapade dont la plupart des visiteurs n’entendent jamais parler.',
      'على بعد ساعة ونصف من وسط المدينة: جبال الحجر وبحيرة فيروزية وقرية تراثية. لماذا تبقى حتا الرحلة التي لا يسمع بها معظم الزوار.',
    ),
    body: [
      { p: 'Most people think of Dubai as coast and desert. But the emirate also reaches into the Hajar Mountains, the rocky range that runs along the eastern side of the UAE into Oman. Its mountain town is Hatta, roughly 130 kilometres from Downtown — about an hour and a half by road — and it feels like a different country.' },
      { h: 'Hatta Dam' },
      { p: 'The centrepiece is the reservoir behind Hatta Dam: a ribbon of turquoise water held between bare, folded mountains. You can kayak or take a pedal boat across it, and the colour against the rock is extraordinary in the morning light.' },
      { h: 'Hatta Heritage Village' },
      { p: 'The restored village shows how life worked in the mountains before the modern road: stone and mud-brick houses, defensive towers, a falaj irrigation channel and date gardens. It is compact, shaded in places and easy to see in an hour.' },
      { h: 'For the active' },
      { p: 'Hatta Wadi Hub is the base for outdoor activities — mountain-bike trails for different levels, hiking routes and family-friendly adventure activities. Trails in the surrounding hills give wide views over the valleys and the dam.' },
      { list: [
        'Best season: November to March, when hiking and biking are comfortable through the day.',
        'Start early: leave Dubai by 7:30 to be on the water before the crowds and the heat.',
        'Bring proper shoes, sun protection and more water than you think you need.',
      ] },
      { tip: 'Hatta is busiest on weekends and public holidays. A weekday visit in the cool season is a completely different, much quieter experience.' },
      { h: 'Staying overnight' },
      { p: 'There are mountain lodges and caravan-style stays overlooking the dam and the valleys, which make Hatta a good overnight escape — the stars, away from the city lights, are a reward in themselves. These sell out on winter weekends, so plan ahead.' },
      { h: 'How we plan it' },
      { p: 'Hatta is at its best as a private day: a driver who knows the road, an early start, the dam and the heritage village in the morning, lunch, and a slow drive back in the late afternoon. It pairs well with a family stay and is an easy yes for anyone who has already seen the city.' },
    ],
    related: [
      { href: '/experiences/day-trips/hatta-mountain-day', label: t('Private Hatta mountain day', 'Journée privée à Hatta', 'يوم خاص في جبال حتا') },
      { href: '/services#transport', label: t('Chauffeur for the day', 'Chauffeur pour la journée', 'سائق خاص لليوم') },
    ],
  },
  {
    slug: 'getting-a-great-table-in-dubai',
    category: 'restaurants-dining',
    image: { slot: 'story-evening', fallback: 'fineDining', alt: 'A dinner table overlooking the Dubai skyline at night' },
    published: '2026-11-18',
    title: t(
      'Getting a great table in Dubai — and making the most of it',
      'Obtenir une belle table à Dubaï — et en profiter pleinement',
      'كيف تحصل على طاولة مميزة في دبي — وتستمتع بها',
    ),
    excerpt: t(
      'Dubai is one of the world’s great dining cities, and its best rooms are busy. What actually helps when you want a particular table on a particular night.',
      'Dubaï est l’une des grandes villes gastronomiques du monde, et ses meilleures adresses sont prises d’assaut. Ce qui aide vraiment pour obtenir une table précise un soir précis.',
      'دبي من أعظم مدن المطاعم في العالم، وأفضل مطاعمها مزدحمة. ما الذي يساعد فعلاً حين تريد طاولة بعينها في ليلة بعينها.',
    ),
    body: [
      { p: 'Since the Michelin Guide arrived in Dubai in 2022, the city’s dining has had the international recognition locals always said it deserved. Chefs from around the world have opened here, Emirati and regional cooking has its own proud places, and some of the most interesting meals are in neighbourhood restaurants that have fed the city for decades. The challenge is not finding somewhere good. It is getting the table you want, when you want it.' },
      { h: 'Know when the city is busiest' },
      { list: [
        'Friday and Saturday evenings are the peak of the week; the official weekend is Saturday and Sunday.',
        'Weekend brunch is an institution — popular brunches are booked well ahead.',
        'In the cool season, terraces and tables with a view go first. In summer, the same rooms are often far easier.',
        'New Year’s Eve, Valentine’s Day and big event weekends are in a category of their own: plan weeks or months ahead.',
      ] },
      { h: 'What actually helps' },
      { p: 'Be specific about what matters. A table by the window or on the terrace, a quiet corner for a conversation, a time that suits a family with young children — say it when you book, not when you arrive. Flexibility helps too: an earlier sitting or a weeknight can open doors that a Saturday at 9pm will not.' },
      { p: 'Tell the restaurant about the occasion and any allergies in advance. A good kitchen would much rather know about a nut allergy or a birthday the day before than at the table.' },
      { tip: 'Many of the best rooms have dress codes — smart rather than formal, but sportswear and beachwear are usually not welcome in the evening. Check before you go.' },
      { h: 'Local etiquette' },
      { p: 'Alcohol is served only in licensed venues, which includes most hotel restaurants and many independent ones. During Ramadan, restaurants stay open and many offer iftar menus at sunset; it is a lovely time to eat out, but be discreet about eating and drinking in public during fasting hours. Service charges and VAT are usually included in or added to the bill — read it before adding a tip.' },
      { h: 'Where a concierge helps' },
      { p: 'No one can promise a table at a fully booked restaurant, and anyone who does should make you wary. What a good concierge can do is know which rooms suit which evening, ask early and through the right channels, have a strong second choice ready, and handle the details — the occasion, the cake, the car home — so the evening simply works.' },
    ],
    related: [
      { href: '/services#dining', label: t('Dining requests', 'Demandes de restaurants', 'طلبات المطاعم') },
      { href: '/experiences/signature/private-dune-dinner', label: t('Private dinner in the dunes', 'Dîner privé dans les dunes', 'عشاء خاص بين الكثبان') },
    ],
  },
  {
    slug: 'dubai-etiquette-rules-for-visitors',
    category: 'insider-guides',
    image: { slot: 'blog-etiquette', fallback: 'grandMosque', alt: 'An Emirati host welcoming a visitor in a traditional courtyard majlis' },
    published: '2026-11-19',
    featured: true,
    title: t(
      'Dubai etiquette: the rules and customs every visitor should know',
      'Les usages à Dubaï : règles et coutumes à connaître avant de partir',
      'آداب دبي: القواعد والعادات التي يجب أن يعرفها كل زائر',
    ),
    excerpt: t(
      'What to wear, how couples should behave, where you can drink, what to know about medication and photographs — a calm, practical guide to getting it right in Dubai.',
      'Que porter, comment se comporter en couple, où boire un verre, que savoir sur les médicaments et les photos — un guide pratique et serein pour bien faire à Dubaï.',
      'ماذا ترتدي، وكيف يتصرف الأزواج، وأين يمكنك تناول المشروبات، وما يجب معرفته عن الأدوية والتصوير — دليل عملي وهادئ لتكون على صواب في دبي.',
    ),
    body: [
      { p: 'Dubai is one of the most international cities in the world — around nine in ten residents come from somewhere else — and it is relaxed, welcoming and easy to visit. It is also a city in a Muslim country, with laws and customs that differ from Europe, the Americas or Asia. Most of what follows is common sense and courtesy. A few points are law, and those are worth knowing before you land.' },
      { h: 'What to wear' },
      { p: 'There is no dress code on the street, but modesty is appreciated. In malls, souks, government buildings and older neighbourhoods, covering shoulders and knees is respectful, and some malls display signs asking visitors to dress modestly. Swimwear belongs at the beach, the pool or the beach club — cover up when you walk into a hotel lobby, a restaurant or the street.' },
      { list: [
        'Evenings out: smart casual is the norm; many restaurants and lounges have dress codes and will refuse beachwear and sportswear.',
        'Mosques: women cover their hair, arms and legs; men wear long trousers. Places that welcome visitors usually lend suitable clothing.',
        'Desert: closed shoes, light layers and a scarf against the sand — winter evenings in the dunes are colder than you expect.',
      ] },
      { h: 'Couples and affection in public' },
      { p: 'Holding hands is fine. Kissing and more intimate affection in public places is not, and can lead to a complaint. Since the UAE’s 2020 legal reforms, unmarried couples sharing a hotel room is not an issue. In public, simply keep it discreet — the same rule applies to everyone.' },
      { h: 'Alcohol' },
      { p: 'The legal drinking age is 21. Alcohol is served in licensed venues — most hotel bars and restaurants, beach clubs and many independent restaurants — and can be drunk in private homes. Drinking in public places such as beaches, parks or the street is not allowed, and being drunk in public is an offence. The UAE has zero tolerance for drinking and driving: not one drink.' },
      { tip: 'If you are out for the evening, keep a driver for the night. It is the simplest way to enjoy dinner and never think about the car.' },
      { h: 'Medication' },
      { p: 'The UAE has very strict drug laws, and some medicines that are common elsewhere — certain painkillers, sleeping tablets and ADHD or anxiety medication — are controlled here. If you travel with prescription medicine, carry it in its original packaging with a copy of the prescription, bring only what you need for your stay, and check the UAE Ministry of Health’s guidance before travelling; some medicines require approval in advance.' },
      { h: 'Photographs and privacy' },
      { p: 'Privacy is taken seriously. Do not photograph people — particularly women and families — without asking first, and never post photos or videos of other people online without their permission. Avoid photographing government buildings, military sites and airports. Landmarks, skylines and your own group are, of course, fine.' },
      { h: 'Words, gestures and online behaviour' },
      { p: 'Swearing and rude gestures — including in traffic and including online, in messages and on social media — can be treated as offences. So can insulting someone or criticising the country and its leaders in public. Courtesy goes a long way, and patience at a counter will usually get you further than raised voices anywhere in the world.' },
      { h: 'Religion, mosques and the call to prayer' },
      { p: 'Islam is the state religion, and other faiths are practised freely in their own places of worship. You will hear the call to prayer five times a day — a beautiful part of the city’s soundtrack. Visitors are welcome at several mosques; the Jumeirah Mosque in Dubai and the Sheikh Zayed Grand Mosque in Abu Dhabi are the best known. Friday midday prayers are the most important of the week, and some services pause around them.' },
      { h: 'Ramadan' },
      { p: 'During the holy month, Muslims fast from dawn to sunset. Restaurants stay open and many serve as usual, but visitors should be discreet about eating, drinking and smoking in public during fasting hours, dress a little more conservatively and keep music low. Evenings, from iftar onwards, are generous and social — if you are invited to an iftar, accept.' },
      { h: 'Greetings and manners' },
      { list: [
        'A handshake is normal between men. With someone of the opposite sex, wait for them to offer a hand; a hand on the heart and a smile is a perfectly polite alternative.',
        'Use your right hand to eat, give and receive.',
        'Do not point the soles of your feet at someone when sitting in a majlis.',
        'Coffee is offered as a welcome: accept a cup, and gently shake the cup from side to side when you have had enough.',
      ] },
      { h: 'Tipping' },
      { p: 'Restaurant bills usually include a service charge and VAT; read the bill before adding more. Tipping is not mandatory, but around ten per cent for good service is appreciated, and small tips for drivers, guides, valets and housekeeping are welcome.' },
      { h: 'In short' },
      { p: 'Dress a little more modestly than you might at home, keep affection and alcohol to the right places, ask before you photograph people, travel with your prescriptions and never drink and drive. Do that, and Dubai is one of the easiest, safest and most welcoming cities you will ever visit. Rules can change, so if anything matters to your trip, ask us — we check before we plan.' },
    ],
    related: [
      { href: '/blog/when-to-visit-dubai-month-by-month', label: t('When to visit Dubai, month by month', 'Quand venir à Dubaï, mois par mois', 'متى تزور دبي، شهراً بشهر') },
      { href: '/services#transport', label: t('A driver for the evening', 'Un chauffeur pour la soirée', 'سائق خاص للأمسية') },
    ],
  },
  {
    slug: 'where-to-stay-in-dubai',
    category: 'hotels-resorts',
    image: { slot: 'blog-where-to-stay', fallback: 'privateVilla', alt: 'A couple on a yacht deck looking towards the Burj Al Arab at sunset' },
    published: '2026-11-19',
    title: t(
      'Where to stay in Dubai: choosing the right neighbourhood',
      'Où séjourner à Dubaï : choisir le bon quartier',
      'أين تقيم في دبي: اختيار الحي المناسب',
    ),
    excerpt: t(
      'Dubai is spread out along fifty kilometres of coast, and where you sleep shapes the whole trip. A clear guide to the city’s main areas — and when to split your stay.',
      'Dubaï s’étire sur cinquante kilomètres de côte, et le lieu où vous dormez façonne tout le séjour. Un guide clair des grands quartiers — et quand diviser votre séjour.',
      'تمتد دبي على نحو خمسين كيلومتراً من الساحل، ومكان إقامتك يحدد شكل رحلتك كلها. دليل واضح لأهم المناطق — ومتى تقسّم إقامتك.',
    ),
    body: [
      { p: 'Dubai is not a city you cross on foot. It runs along the coast from the old Creek in the north-east to the Marina and beyond in the south-west, with the desert behind it. The hotel you choose matters less than the area it is in: that decides how long you spend in the car, what you can walk to and what the trip feels like.' },
      { h: 'Downtown Dubai' },
      { p: 'Burj Khalifa, The Dubai Mall, the fountains and Dubai Opera. Downtown is the most central base, ideal for a first visit and for short stays: you can walk to dinner, and most of the city is a short drive away. It is urban rather than beach — you will drive to the sea.' },
      { h: 'DIFC and Business Bay' },
      { p: 'Dubai’s financial district is also one of its best dining and gallery quarters. It suits business travellers and anyone who cares more about restaurants than a beach. Business Bay, along the canal next door, offers newer hotels and apartments close to Downtown.' },
      { h: 'Jumeirah and Umm Suqeim' },
      { p: 'The classic beach stretch, between the city and the Palm: low-rise villas, public beaches, the Burj Al Arab and the waterways of Madinat Jumeirah. Beach resorts here combine proper sand with easy access to the city — a balanced choice for families and couples alike.' },
      { h: 'Palm Jumeirah' },
      { p: 'The island of resorts. Large beach hotels, private beaches and some of the city’s most spectacular pools and restaurants. You stay on the Palm to stay in the resort; it is further from the old city and evening traffic on and off the island can be slow, so plan outings with that in mind.' },
      { h: 'Dubai Marina, JBR and Dubai Harbour' },
      { p: 'Towers around a marina, a long beach walk at JBR, yachts, cafés and a lively evening atmosphere. Good for younger travellers, groups and families who like to walk out of the hotel into the action; it is a longer drive to Downtown and the old city. Bluewaters and Dubai Harbour, just offshore and alongside, add newer hotels and a quieter waterfront.' },
      { h: 'Old Dubai and the Creek' },
      { p: 'Heritage hotels, the souks, the abra crossings and the most atmospheric streets in the city. It suits travellers who have seen the skyline before and want the Dubai of the Creek — and it is close to the airport.' },
      { h: 'The desert' },
      { p: 'A few desert resorts, an hour or less from the city, offer silence, dunes and stars. They work best as two or three nights at the end of a city stay rather than as a base.' },
      { tip: 'For a week or more, split the stay: three or four nights in the city, then a beach resort or the desert. You see more, spend less time in traffic and end the trip rested.' },
      { h: 'Practical points' },
      { list: [
        'Most flights use Dubai International (DXB); some use Al Maktoum International (DWC) in the south — check which before choosing an area.',
        'Rush hours are real. If you have commitments in one district, stay near it.',
        'In the cool season, the best beach hotels and family rooms book out early, especially over school holidays and New Year.',
      ] },
      { p: 'We do not take commissions to steer you to a hotel. Tell us how you like to travel — beach or city, quiet or lively, family or couple — and we will suggest where to stay and arrange everything around it.' },
    ],
    related: [
      { href: '/request', label: t('Plan your stay with us', 'Organiser votre séjour avec nous', 'خطط لإقامتك معنا') },
      { href: '/experiences/transfers/airport-transfer', label: t('Airport arrival', 'Accueil à l’aéroport', 'الاستقبال في المطار') },
    ],
  },
  {
    slug: 'dubai-with-children',
    category: 'family-experiences',
    image: { slot: 'blog-family', fallback: 'dubaiSkyline', alt: 'A family walking on a Dubai beach with the Burj Al Arab behind them' },
    published: '2026-11-19',
    title: t(
      'Dubai with children: a calm guide for families',
      'Dubaï avec des enfants : le guide serein des familles',
      'دبي مع الأطفال: دليل هادئ للعائلات',
    ),
    excerpt: t(
      'Few cities are as easy with children. How to pace the days, which experiences genuinely work for different ages, and the practical details that make a family trip smooth.',
      'Peu de villes sont aussi faciles avec des enfants. Comment rythmer les journées, quelles expériences conviennent vraiment selon l’âge, et les détails pratiques qui facilitent tout.',
      'قليلة هي المدن السهلة مع الأطفال مثل دبي. كيف تنظّم الأيام، وما التجارب المناسبة فعلاً لكل عمر، والتفاصيل العملية التي تجعل رحلة العائلة سلسة.',
    ),
    body: [
      { p: 'Dubai is built for families: it is safe, clean, child-friendly in its restaurants and hotels, and full of things designed for younger visitors. The challenge is not finding things to do — it is pacing the days so that children (and parents) enjoy them.' },
      { h: 'Pace the day around the sun' },
      { p: 'Even in the cool season the midday sun is strong. Plan outdoor activities for the morning and late afternoon, and keep the middle of the day for the pool, a long lunch, a nap or something indoors. In summer, outdoor plans move to the early morning and after sunset.' },
      { h: 'What works, by age' },
      { list: [
        'Little ones: the beach and the hotel pool, the aquarium at The Dubai Mall, Global Village in the evening, and gentle boat rides on the Creek or in the Marina.',
        'Five to twelve: waterparks, theme parks, the indoor snow park at Mall of the Emirates, a desert afternoon with sandboarding and camels, and the Museum of the Future.',
        'Teenagers: a helicopter or seaplane flight, kayaking at Hatta, a morning in the dunes on a buggy, and the city’s viewpoints after dark.',
      ] },
      { h: 'The desert with children' },
      { p: 'Children love the desert, but high-speed dune driving is not suitable for very young children, and operators set their own age limits. A gentler format — a heritage drive in the conservation reserve, camels, sandboarding and dinner at camp — is a better fit for mixed ages.' },
      { h: 'Getting around' },
      { p: 'UAE law requires child seats for young children in cars, and taxis do not always carry them. Arrange transfers in advance with seats installed for each child’s age — it makes every journey calmer, from the airport onwards.' },
      { tip: 'Ask your hotel about connecting rooms and baby equipment when you book, not when you arrive. In peak season, family rooms are the first to go.' },
      { h: 'Practical notes' },
      { list: [
        'Pharmacies are everywhere and many are open around the clock.',
        'Restaurants welcome children, often with kids’ menus; late dinners are normal in Dubai.',
        'Pack sun hats, rash vests and plenty of sun cream; tap water is safe but most visitors drink bottled.',
        'Book popular attractions and timed entries ahead in the school holidays.',
      ] },
      { h: 'How we help families' },
      { p: 'We plan family stays around nap times, ages and energy levels: a driver with the right seats, a private guide who is good with children, a private chef for an evening in, and a babysitting or nanny service from licensed providers for an adults’ dinner. One message, and the details are handled.' },
    ],
    related: [
      { href: '/experiences/attractions/theme-park-day', label: t('Theme park day', 'Journée au parc à thème', 'يوم في مدينة الملاهي') },
      { href: '/experiences/attractions/aquaventure-waterpark', label: t('Aquaventure waterpark', 'Parc aquatique Aquaventure', 'منتزه أكوافنتشر المائي') },
    ],
  },
  {
    slug: 'how-to-choose-a-desert-safari',
    category: 'luxury-experiences',
    image: { slot: 'blog-desert-safari', fallback: 'dubaiSkyline', alt: 'Two private 4x4s arriving at a dinner set-up among the dunes' },
    published: '2026-11-19',
    title: t(
      'How to choose a desert safari in Dubai',
      'Comment choisir son safari dans le désert à Dubaï',
      'كيف تختار رحلة السفاري الصحراوية في دبي',
    ),
    excerpt: t(
      'From dune bashing with a hundred other cars to a silent dinner on a private dune — the desert can be very different experiences. How to choose the right one for you.',
      'Du dune bashing avec cent autres voitures au dîner silencieux sur une dune privée — le désert peut être des expériences très différentes. Comment choisir la bonne.',
      'من التطعيس مع مئة سيارة أخرى إلى عشاء هادئ على كثيب خاص — قد تكون الصحراء تجارب مختلفة جداً. كيف تختار ما يناسبك.',
    ),
    body: [
      { p: 'A desert evening is the experience almost every visitor to Dubai wants — and the one where the difference between a good and a disappointing choice is greatest. The same word, “safari”, covers everything from a crowded camp show to a quiet, beautifully run private evening. Here is how to tell them apart.' },
      { h: 'The main formats' },
      { list: [
        'Classic evening safari: hotel pick-up in the afternoon, dune driving, a sunset stop and a camp with dinner and entertainment. Lively and good value, but usually shared with many others.',
        'Morning desert: cooler, quieter and ideal for sandboarding, quad or buggy driving and photography.',
        'Conservation reserve: classic open-top vehicles, wildlife and Bedouin history inside the protected reserve, with no dune bashing — calm and meaningful.',
        'Private evening: your own vehicle and guide, your own timing, and a dinner set up just for your group on the dunes.',
        'Dawn from the air: a hot-air balloon flight over the dunes at sunrise.',
      ] },
      { h: 'Shared or private?' },
      { p: 'Shared safaris run on a schedule and big camps can host hundreds of guests a night. That suits some people perfectly. If you want to stop where you like, linger at sunset, choose your own menu or mark an occasion, a private format is worth it — the desert is at its best when it is quiet.' },
      { h: 'Dune driving: who should skip it' },
      { p: 'Fast dune driving is thrilling, but it is not suitable for everyone. It is generally not recommended for pregnant women, people with back or neck problems or heart conditions, or very young children, and reputable operators will tell you so. If anyone in your group should not ride the dunes, choose a heritage drive or a gentle route to camp.' },
      { h: 'What to look for in an operator' },
      { list: [
        'A licensed operator with experienced, trained drivers and well-maintained vehicles.',
        'Clear information on group size, timings and what is included.',
        'Respect for the desert: established tracks, no litter and care around wildlife.',
        'Honest answers about age limits and medical restrictions.',
      ] },
      { tip: 'In winter, desert evenings are cold once the sun goes down. Bring a warm layer — and closed shoes rather than sandals.' },
      { h: 'Timing and the season' },
      { p: 'November to March is the desert’s best season. In summer, morning and evening experiences still run, but the heat is serious in the middle of the day. During Ramadan, camp entertainment programmes often change, and evenings take on a quieter character.' },
      { p: 'We arrange every format, from classic evenings to private dinners in the dunes, with licensed operators we know — and we will tell you honestly which one suits your group.' },
    ],
    related: [
      { href: '/experiences/desert/private-desert-safari', label: t('Private desert safari', 'Safari privé dans le désert', 'سفاري صحراوية خاصة') },
      { href: '/experiences/signature/desert-safari-in-style', label: t('Desert Safari in Style', 'Safari dans le désert, en toute élégance', 'سفاري الصحراء بأناقة') },
    ],
  },
  {
    slug: 'abu-dhabi-day-trip-from-dubai',
    category: 'uae-travel',
    image: { slot: 'product-abu-dhabi-day-trip', fallback: 'grandMosque', alt: 'The white domes of the Sheikh Zayed Grand Mosque in Abu Dhabi' },
    published: '2026-11-19',
    title: t(
      'Abu Dhabi in a day: the Grand Mosque, the Louvre and the capital’s best',
      'Abu Dhabi en une journée : la Grande Mosquée, le Louvre et le meilleur de la capitale',
      'أبوظبي في يوم: الجامع الكبير واللوفر وأجمل ما في العاصمة',
    ),
    excerpt: t(
      'The UAE’s capital is about ninety minutes from Dubai by road and feels completely different. How to plan a day that is unhurried rather than exhausting.',
      'La capitale des Émirats est à environ quatre-vingt-dix minutes de Dubaï par la route et semble un autre monde. Comment organiser une journée sans précipitation.',
      'عاصمة الإمارات على بعد نحو تسعين دقيقة من دبي بالسيارة، وتبدو مختلفة تماماً. كيف تخطط ليوم هادئ لا مرهق.',
    ),
    body: [
      { p: 'Abu Dhabi is the capital of the UAE and the largest of the seven emirates — greener, calmer and more spacious than Dubai, with some of the most remarkable cultural sites in the region. It is roughly ninety minutes from Dubai by road, which makes a day trip easy, provided you do not try to see everything.' },
      { h: 'Sheikh Zayed Grand Mosque' },
      { p: 'For most visitors this is the reason to come: a vast white mosque of marble, gold and reflecting pools, among the largest in the world, and open to visitors of all faiths. Entry is free; check the mosque’s official website for visiting hours and book a time online before you go. Visitors must dress modestly — women with hair, arms and legs covered, men in long trousers — and the mosque closes to visitors on Friday mornings for prayer.' },
      { tip: 'Go in the late afternoon and stay until the lights come on: the mosque at dusk is unforgettable, and it is cooler too.' },
      { h: 'Louvre Abu Dhabi' },
      { p: 'On Saadiyat Island, Jean Nouvel’s museum sits under a great perforated dome that filters the sun into a “rain of light”. The collection tells the story of humanity across civilisations rather than by country, with loans from French museums alongside its own works. Allow two to three hours.' },
      { h: 'Qasr Al Watan' },
      { p: 'The presidential palace opens its grand halls to visitors, with exhibitions on Arab science, governance and craftsmanship, and an evening light show on the façade. It sits close to the Emirates Palace hotel, which many visitors combine for coffee or lunch.' },
      { h: 'Yas Island and Saadiyat' },
      { p: 'Families often choose Yas Island instead of museums: the theme parks, the waterpark and SeaWorld Abu Dhabi are all here, alongside Yas Marina Circuit. Saadiyat offers quiet beaches and, near the Louvre, the Abrahamic Family House — a mosque, a church and a synagogue side by side.' },
      { h: 'A day that works' },
      { list: [
        'Leave Dubai around 9:00 to miss the worst of the traffic.',
        'Late morning: Louvre Abu Dhabi.',
        'Lunch on Saadiyat or at the Corniche.',
        'Afternoon: Qasr Al Watan, then the Grand Mosque for sunset.',
        'Back in Dubai for a late dinner — or stay the night and slow down.',
      ] },
      { p: 'A private driver is the easiest way to do it: no parking, no navigation, and the freedom to change the plan. We arrange the day with a driver and, if you wish, a licensed guide who brings the mosque and the palace to life.' },
    ],
    related: [
      { href: '/experiences/day-trips/abu-dhabi-day-trip', label: t('Private Abu Dhabi day trip', 'Excursion privée à Abu Dhabi', 'رحلة خاصة إلى أبوظبي') },
      { href: '/blog/dubai-etiquette-rules-for-visitors', label: t('Dubai etiquette & rules', 'Les usages à Dubaï', 'آداب دبي وقواعدها') },
    ],
  },
]

export const journalCopy = {
  eyebrow: t('The Blog', 'Le Blog', 'المدونة'),
  title: t('Dubai, seen\nfrom the inside', 'Dubaï, vue\nde l’intérieur', 'دبي\nمن الداخل'),
  lede: t(
    'Considered guides and stories from the DXB TKTS team — what we know, what we would tell a friend, and what is worth your time in Dubai and across the Emirates.',
    'Des guides et récits réfléchis par l’équipe DXB TKTS — ce que nous savons, ce que nous dirions à un ami, et ce qui vaut votre temps à Dubaï et aux Émirats.',
    'أدلة وحكايات مدروسة من فريق DXB TKTS — ما نعرفه، وما نقوله لصديق، وما يستحق وقتك في دبي وفي أنحاء الإمارات.',
  ),
  featured: t('Featured', 'À la une', 'مختارات'),
  all: t('All stories', 'Tous les articles', 'كل المقالات'),
  read: t('Read', 'Lire', 'اقرأ'),
  minRead: t('{n} min read', '{n} min de lecture', '{n} دقائق قراءة'),
  empty: t('First stories in this section are on their way.', 'Les premiers articles de cette rubrique arrivent bientôt.', 'أولى مقالات هذا القسم في الطريق.'),
  byline: t('DXB TKTS Editorial', 'Rédaction DXB TKTS', 'فريق تحرير DXB TKTS'),
  englishOnly: t(
    '',
    'Cet article est rédigé en anglais. La version française arrive bientôt.',
    'هذه المقالة متوفرة باللغة الإنجليزية، والنسخة العربية قريباً.',
  ),
  takeItFurther: t('Take it further', 'Pour aller plus loin', 'للمزيد'),
  more: t('More from the Blog', 'À lire aussi', 'المزيد من المدونة'),
  back: t('Back to the Blog', 'Retour au Blog', 'العودة إلى المدونة'),
  updatedNote: t(
    'Details such as opening times and access rules change; we check them for every request we plan.',
    'Horaires et conditions d’accès changent ; nous les vérifions pour chaque demande que nous organisons.',
    'تتغير التفاصيل مثل مواعيد العمل وشروط الدخول، ونتحقق منها في كل طلب نخطط له.',
  ),
}

export function readingMinutes(a: Article) {
  const words = a.body
    .map(b => ('p' in b ? b.p : 'h' in b ? b.h : 'tip' in b ? b.tip : b.list.join(' ')))
    .join(' ')
    .split(/\s+/).length
  return Math.max(2, Math.round(words / 220))
}

export function formatDate(locale: 'en' | 'fr' | 'ar', iso: string) {
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-AE-u-nu-latn' : locale === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${iso}T12:00:00Z`))
}
