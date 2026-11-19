import type { L } from '@/lib/catalogue/types'
import type { CardFinish } from '@/components/membership/membership-card'

/**
 * DXB TKTS Membership — Oasis · Pearl · Najm (all paid, annual, by
 * application) + The Majlis Account for companies and advisers.
 * Structure follows the owner's chosen logic: cumulative tiers, service
 * inclusions (guest places, household ledger, home readiness) rather than
 * freebies, fees shared personally after an introduction.
 * Fees are NOT published (owner decision pending).
 * Access to venues, events and products is always a priority REQUEST, never
 * a guarantee, and only through legitimate channels.
 */

/**
 * Sample details printed on the illustrated cards.
 * Sample card shown on the website (member no. 00001). Numbers are 5 digits.
 */
export const memberCardSample = {
  memberName: 'MR. AHMED BIN ABDSALAM',
  memberNumber: '00001',
  expiry: '11/33',
}

const t = (en: string, fr: string, ar: string): L => ({ en, fr, ar })
const ta = (en: string[], fr: string[], ar: string[]): L<string[]> => ({ en, fr, ar })

export type Tier = {
  id: CardFinish
  name: L
  arabicName: string
  tagline: L
  who: L
  fee: L
  inherits: L
  benefits: L<string[]>
  cta: L
  featured?: boolean
}

export const membership = {
  eyebrow: t('Membership', 'Membership', 'العضوية'),
  title: t('A standing relationship\nwith the city.', 'Une relation privilégiée\navec la ville.', 'علاقة دائمة\nمع المدينة.'),
  lede: t(
    'Membership is for people who live in Dubai, or keep coming back, and would rather not start from zero every time. A named lifestyle manager who knows your preferences; priority on the tables, evenings and objects that matter; and a team that plans each visit before you land.',
    'Le membership s’adresse à ceux qui vivent à Dubaï, ou y reviennent souvent, et ne veulent pas repartir de zéro à chaque fois. Un lifestyle manager attitré qui connaît vos préférences ; la priorité sur les tables, les soirées et les objets qui comptent ; et une équipe qui prépare chaque séjour avant votre arrivée.',
    'العضوية لمن يعيش في دبي أو يعود إليها باستمرار، ولا يريد أن يبدأ من الصفر في كل مرة. مدير أسلوب حياة مخصص يعرف تفضيلاتك، وأولوية في الطاولات والأمسيات والمقتنيات المهمة، وفريق يخطط لكل زيارة قبل وصولك.',
  ),
  founding: t(
    'Founding membership opens in Dubai with a limited number of places. Applications are reviewed personally.',
    'Le membership fondateur ouvre à Dubaï avec un nombre de places limité. Chaque candidature est étudiée personnellement.',
    'تُفتتح العضوية التأسيسية في دبي بعدد محدود من الأماكن. تُراجع كل طلبات الانضمام شخصياً.',
  ),
  apply: t('Apply for membership', 'Demander une adhésion', 'قدّم طلب العضوية'),
  cardLabel: t('Private member', 'Membre privé', 'عضو خاص'),

  cardsLabel: t('The cards', 'Les cartes', 'البطاقات'),
  cardsTitle: t('Three names from the story of the Gulf', 'Trois noms tirés de l’histoire du Golfe', 'ثلاثة أسماء من حكاية الخليج'),
  cardsCopy: t(
    'Oasis, where every journey across the desert was welcomed. Pearl, the treasure that built Dubai before oil. Najm, the star that guided every crossing of sea and sand. Each card opens a different depth of service.',
    'Oasis, là où chaque traversée du désert trouvait l’accueil. Pearl, le trésor qui a bâti Dubaï avant le pétrole. Najm, l’étoile qui guidait chaque traversée, en mer comme dans les sables. Chaque carte ouvre un niveau de service différent.',
    'الواحة، حيث كانت كل رحلة عبر الصحراء تجد الترحيب. اللؤلؤة، الكنز الذي بنى دبي قبل النفط. النجم، الذي هدى كل رحلة عبر البحر والرمال. كل بطاقة تفتح مستوى مختلفاً من الخدمة.',
  ),

  privilegesLabel: t('Privileges', 'Privilèges', 'الامتيازات'),
  privilegesTitle: t('What membership opens in Dubai', 'Ce que le membership ouvre à Dubaï', 'ما تفتحه العضوية في دبي'),
  privileges: [
    {
      title: t('Tables', 'Tables', 'الطاولات'),
      copy: t(
        'Priority requests at the city’s Michelin-starred and most-booked rooms — the Friday-night table, the chef’s counter, the private dining room for twelve, and iftar and suhoor tables during Ramadan.',
        'Demandes prioritaires dans les adresses étoilées et les plus courues de la ville — la table du vendredi soir, le comptoir du chef, le salon privé pour douze, et les tables d’iftar et de suhoor pendant le Ramadan.',
        'طلبات بأولوية في مطاعم المدينة الحاصلة على نجوم ميشلان والأكثر حجزاً — طاولة ليلة الجمعة، وركن الشيف، والغرفة الخاصة لاثني عشر شخصاً، وطاولات الإفطار والسحور في رمضان.',
      ),
    },
    {
      title: t('The season', 'La saison', 'الموسم'),
      copy: t(
        'Help with the nights that sell out: race day at Meydan, Grand Prix weekend in Abu Dhabi, championship golf and tennis, New Year’s Eve with a view of the fireworks — through official hospitality and legitimate resale only.',
        'Aide pour les soirées à guichets fermés : la course à Meydan, le Grand Prix d’Abu Dhabi, le golf et le tennis de championnat, le Nouvel An face aux feux d’artifice — uniquement via l’hospitalité officielle et la revente légitime.',
        'مساعدة في الأمسيات التي تنفد تذاكرها: يوم السباق في ميدان، وعطلة الجائزة الكبرى في أبوظبي، وبطولات الغولف والتنس، وليلة رأس السنة بإطلالة على الألعاب النارية — عبر الضيافة الرسمية وإعادة البيع المشروعة فقط.',
      ),
    },
    {
      title: t('Objects', 'Objets', 'المقتنيات'),
      copy: t(
        'Private appointments in the boutiques of Dubai Mall and Mall of the Emirates, early word on limited editions around Dubai Watch Week, and discreet sourcing of watches, jewellery and leather through authorised and reputable sellers.',
        'Rendez-vous privés dans les boutiques du Dubai Mall et du Mall of the Emirates, informations en avant-première sur les éditions limitées autour de la Dubai Watch Week, et recherche discrète de montres, bijoux et maroquinerie auprès de vendeurs agréés.',
        'مواعيد خاصة في متاجر دبي مول ومول الإمارات، ومعرفة مبكرة بالإصدارات المحدودة حول أسبوع دبي للساعات، وبحث بسرية عن الساعات والمجوهرات والمنتجات الجلدية عبر بائعين معتمدين وموثوقين.',
      ),
    },
    {
      title: t('The sea', 'La mer', 'البحر'),
      copy: t(
        'First call on sunset yacht slots and superyacht weekends, berth-side arrangements, and a private chef on board when the evening deserves it.',
        'Priorité sur les créneaux de yacht au coucher du soleil et les week-ends en superyacht, arrangements à quai, et un chef privé à bord quand la soirée le mérite.',
        'أولوية في مواعيد اليخوت عند الغروب وعطلات اليخوت الفاخرة، وترتيبات على الرصيف، وطاهٍ خاص على متن اليخت حين تستحق الأمسية ذلك.',
      ),
    },
    {
      title: t('Arrivals', 'Arrivées', 'الوصول'),
      copy: t(
        'Your preferences on file — the car, the driver, the hotel, the first dinner. Meet-and-greet at DXB, the bags handled, the suite ready. Every visit starts already arranged.',
        'Vos préférences enregistrées — la voiture, le chauffeur, l’hôtel, le premier dîner. Accueil à DXB, bagages pris en charge, suite prête. Chaque séjour commence déjà organisé.',
        'تفضيلاتك محفوظة — السيارة والسائق والفندق والعشاء الأول. استقبال في مطار دبي، والأمتعة مُدارة، والجناح جاهز. كل زيارة تبدأ وقد رُتّب كل شيء.',
      ),
    },
    {
      title: t('The desert', 'Le désert', 'الصحراء'),
      copy: t(
        'Private access to the experiences we are proudest of — safaris in the conservation reserve, dinners in the dunes, falconry at dawn — with the best guides and dates held for members first.',
        'Accès privé à nos expériences les plus abouties — safaris dans la réserve, dîners dans les dunes, fauconnerie à l’aube — avec les meilleurs guides et dates réservés d’abord aux membres.',
        'وصول خاص إلى أكثر تجاربنا تميّزاً — سفاري المحمية، والعشاء بين الكثبان، والصقور عند الفجر — مع أفضل المرشدين والمواعيد المحجوزة للأعضاء أولاً.',
      ),
    },
    {
      title: t('Home & family', 'Maison & famille', 'المنزل والعائلة'),
      copy: t(
        'For residents: household logistics, visiting family, school-holiday plans, private chefs and villa staffing introductions — handled by someone who already knows how you like things done.',
        'Pour les résidents : logistique de la maison, visites de la famille, vacances scolaires, chefs privés et mise en relation avec du personnel de villa — par quelqu’un qui connaît déjà vos habitudes.',
        'للمقيمين: شؤون المنزل، وزيارات العائلة، وخطط العطل المدرسية، والطهاة الخاصون، وترشيح طاقم الفيلا — يتولاها من يعرف مسبقاً كيف تحب أن تُنجز الأمور.',
      ),
    },
    {
      title: t('Gifting & occasions', 'Cadeaux & occasions', 'الهدايا والمناسبات'),
      copy: t(
        'Birthdays and anniversaries remembered, Eid and Ramadan gifting for family and clients, and proposals planned down to the minute.',
        'Anniversaires et dates importantes mémorisés, cadeaux de l’Aïd et du Ramadan pour la famille et les clients, et demandes en mariage préparées à la minute près.',
        'نتذكر أعياد الميلاد والمناسبات، ونرتب هدايا العيد ورمضان للعائلة والعملاء، ونخطط لطلبات الزواج بالدقيقة.',
      ),
    },
  ],

  seasonLabel: t('The Dubai season', 'La saison à Dubaï', 'موسم دبي'),
  seasonTitle: t('A year of moments, handled for members', 'Une année de moments, orchestrée pour nos membres', 'عام من اللحظات، مرتّب للأعضاء'),
  season: [
    { when: t('November', 'Novembre', 'نوفمبر'), what: t('Dubai Watch Week · Abu Dhabi Grand Prix weekend', 'Dubai Watch Week · Grand Prix d’Abu Dhabi', 'أسبوع دبي للساعات · عطلة جائزة أبوظبي الكبرى') },
    { when: t('December', 'Décembre', 'ديسمبر'), what: t('Desert season opens · New Year’s Eve by the Burj', 'Ouverture de la saison du désert · Nouvel An près du Burj', 'افتتاح موسم الصحراء · ليلة رأس السنة قرب البرج') },
    { when: t('January', 'Janvier', 'يناير'), what: t('Championship golf · Dubai Shopping Festival', 'Golf de championnat · Dubai Shopping Festival', 'بطولة الغولف · مهرجان دبي للتسوق') },
    { when: t('February', 'Février', 'فبراير'), what: t('Championship tennis · balloon season at its best', 'Tennis de championnat · la plus belle saison des montgolfières', 'بطولة التنس · أجمل مواسم المناطيد') },
    { when: t('March', 'Mars', 'مارس'), what: t('Race night at Meydan · Ramadan iftars (dates vary)', 'Soirée de course à Meydan · iftars du Ramadan (dates variables)', 'ليلة السباق في ميدان · إفطارات رمضان (تختلف التواريخ)') },
    { when: t('April', 'Avril', 'أبريل'), what: t('Art Dubai · Eid gifting and family gatherings', 'Art Dubai · cadeaux de l’Aïd et réunions de famille', 'آرت دبي · هدايا العيد واللقاءات العائلية') },
  ],
  seasonNote: t(
    'Event dates change every year; access is arranged through official channels and confirmed in writing.',
    'Les dates changent chaque année ; l’accès passe par des canaux officiels et est confirmé par écrit.',
    'تتغير التواريخ كل عام؛ يُرتب الوصول عبر القنوات الرسمية ويُؤكَّد كتابياً.',
  ),

  tiersLabel: t('Membership', 'Membership', 'العضوية'),
  tiersTitle: t('Three cards. Each opens more of the city.', 'Trois cartes. Chacune ouvre davantage la ville.', 'ثلاث بطاقات، كل واحدة تفتح المزيد من المدينة.'),
  tiersCopy: t(
    'Every membership is annual and by application. Each card includes everything in the one before it.',
    'Chaque membership est annuel et sur candidature. Chaque carte comprend tout ce qu’offre la précédente.',
    'كل عضوية سنوية وبطلب انضمام. وكل بطاقة تشمل كل ما في التي قبلها.',
  ),
  tiers: [
    {
      id: 'oasis',
      name: t('Oasis', 'Oasis', 'الواحة'),
      arabicName: 'الواحة',
      tagline: t('For guests who keep coming back', 'Pour ceux qui reviennent toujours', 'لمن يعود دائماً'),
      who: t('Regular visitors to Dubai', 'Visiteurs réguliers de Dubaï', 'الزوار الدائمون لدبي'),
      fee: t('Annual · or for the season, November to April', 'Annuel · ou pour la saison, de novembre à avril', 'سنوية · أو للموسم من نوفمبر إلى أبريل'),
      inherits: t('', '', ''),
      benefits: ta(
        [
          'A named concierge who knows you and your preferences',
          'Your requests handled ahead of non-member requests',
          'A planning call before each visit — tables, cars and experiences lined up before you land',
          'Two guest places a year for friends or family travelling without you',
        ],
        [
          'Un concierge attitré qui vous connaît, vous et vos préférences',
          'Vos demandes traitées avant celles des non-membres',
          'Un appel de préparation avant chaque séjour — tables, voitures et expériences prêtes avant votre arrivée',
          'Deux places invités par an pour des proches voyageant sans vous',
        ],
        [
          'كونسيرج مخصص يعرفك ويعرف تفضيلاتك',
          'طلباتك تُعالج قبل طلبات غير الأعضاء',
          'مكالمة تخطيط قبل كل زيارة — الطاولات والسيارات والتجارب جاهزة قبل وصولك',
          'مكانان للضيوف سنوياً لأصدقاء أو أفراد عائلة يسافرون من دونك',
        ],
      ),
      cta: t('Request an introduction', 'Demander une introduction', 'اطلب لقاءً تعريفياً'),
    },
    {
      id: 'pearl',
      name: t('Pearl', 'Pearl', 'اللؤلؤة'),
      arabicName: 'اللؤلؤة',
      tagline: t('For households and people short on time', 'Pour les familles et ceux qui manquent de temps', 'للعائلات ومن يضيق وقتهم'),
      who: t('Families, frequent business travellers', 'Familles, grands voyageurs d’affaires', 'العائلات ورجال الأعمال كثيرو السفر'),
      fee: t('Annual · per household', 'Annuel · par foyer', 'سنوية · لكل أسرة'),
      featured: true,
      inherits: t('Everything in Oasis, and', 'Tout ce qu’offre Oasis, et', 'كل ما في الواحة، بالإضافة إلى'),
      benefits: ta(
        [
          'A dedicated lifestyle manager, directly on WhatsApp',
          'The household ledger — preferences, allergies, car seats, sizes and dates for every member of the family',
          'Proposals before you ask: the season’s tables, openings and events chosen for you',
          'Birthdays and anniversaries remembered and planned ahead',
          'Six guest places a year',
        ],
        [
          'Un lifestyle manager dédié, directement sur WhatsApp',
          'Le registre du foyer — préférences, allergies, sièges enfants, tailles et dates pour chaque membre de la famille',
          'Des propositions avant même de demander : tables, ouvertures et événements de la saison choisis pour vous',
          'Anniversaires et dates importantes mémorisés et préparés à l’avance',
          'Six places invités par an',
        ],
        [
          'مدير أسلوب حياة مخصص مباشرة عبر واتساب',
          'سجل الأسرة — التفضيلات والحساسية ومقاعد الأطفال والمقاسات والتواريخ لكل فرد في العائلة',
          'مقترحات قبل أن تطلب: طاولات الموسم وافتتاحاته وفعالياته مختارة لك',
          'أعياد الميلاد والمناسبات نتذكرها ونخطط لها مسبقاً',
          'ستة أماكن للضيوف سنوياً',
        ],
      ),
      cta: t('Request an introduction', 'Demander une introduction', 'اطلب لقاءً تعريفياً'),
    },
    {
      id: 'najm',
      name: t('Najm', 'Najm', 'نجم'),
      arabicName: 'نجم',
      tagline: t('For residents, homeowners and principals', 'Pour les résidents, propriétaires et dirigeants', 'للمقيمين وأصحاب المنازل وكبار الشخصيات'),
      who: t('By invitation or introduction', 'Sur invitation ou introduction', 'بدعوة أو تعريف'),
      fee: t('Annual · by arrangement', 'Annuel · sur accord', 'سنوية · بالاتفاق'),
      inherits: t('Everything in Pearl, and', 'Tout ce qu’offre Pearl, et', 'كل ما في اللؤلؤة، بالإضافة إلى'),
      benefits: ta(
        [
          'Full lifestyle management for you and your household',
          'Home readiness: your villa or apartment opened, cooled, stocked and staffed before you arrive — and closed properly after you leave',
          'Family care while you are abroad: visiting parents, children’s plans, the things that cannot wait',
          'Trusted introductions — doctors, schools, property and private services — never paid placements',
          'A quarterly review of the year ahead, with your manager',
        ],
        [
          'Une gestion complète de votre style de vie et de votre foyer',
          'Maison prête : villa ou appartement ouvert, rafraîchi, approvisionné et pourvu en personnel avant votre arrivée — et correctement fermé après votre départ',
          'Soin de la famille pendant votre absence : parents en visite, programmes des enfants, tout ce qui ne peut attendre',
          'Mises en relation de confiance — médecins, écoles, immobilier, services privés — jamais rémunérées par des tiers',
          'Un point trimestriel sur l’année à venir avec votre manager',
        ],
        [
          'إدارة كاملة لأسلوب حياتك وحياة أسرتك',
          'جاهزية المنزل: فيلتك أو شقتك مفتوحة ومكيّفة ومجهزة بالمؤن والطاقم قبل وصولك — ومغلقة كما يجب بعد مغادرتك',
          'رعاية العائلة أثناء غيابك: زيارات الوالدين وخطط الأطفال وكل ما لا يحتمل الانتظار',
          'تعارف موثوق — أطباء ومدارس وعقارات وخدمات خاصة — دون أي مقابل من الأطراف الأخرى',
          'مراجعة ربع سنوية للعام القادم مع مديرك',
        ],
      ),
      cta: t('Ask to be introduced', 'Demander à être introduit', 'اطلب التعريف'),
    },
  ] as Tier[],

  majlis: {
    name: t('The Majlis Account', 'Le compte Majlis', 'حساب المجلس'),
    arabicName: 'المجلس',
    who: t('For companies, family offices and travel advisers', 'Pour les entreprises, family offices et conseillers en voyage', 'للشركات ومكاتب العائلات ومستشاري السفر'),
    copy: t(
      'In the Gulf, the majlis is where guests are received and business is done. The Majlis Account brings that hospitality to your organisation: one account for many travellers — executives, clients, guests — with a single contact, agreed service standards and one monthly statement.',
      'Dans le Golfe, le majlis est le lieu où l’on reçoit ses invités et où l’on fait affaire. Le compte Majlis offre cette hospitalité à votre organisation : un compte pour plusieurs voyageurs — dirigeants, clients, invités — avec un interlocuteur unique, des standards convenus et un relevé mensuel.',
      'في الخليج، المجلس هو حيث يُستقبل الضيوف وتُعقد الأعمال. يجلب حساب المجلس هذه الضيافة إلى مؤسستك: حساب واحد لعدة مسافرين — تنفيذيين وعملاء وضيوف — مع جهة تواصل واحدة ومعايير خدمة متفق عليها وكشف شهري واحد.',
    ),
    cta: t('Ask about a Majlis Account', 'Se renseigner sur le compte Majlis', 'استفسر عن حساب المجلس'),
  },

  differentLabel: t('What makes it different', 'Ce qui fait la différence', 'ما الذي يميزها'),
  differentTitle: t('Three things you will not find elsewhere', 'Trois choses que vous ne trouverez pas ailleurs', 'ثلاثة أمور لن تجدها في مكان آخر'),
  different: [
    {
      title: t('Guest places', 'Places invités', 'أماكن الضيوف'),
      copy: t(
        'Your membership travels with the people you care about. Send friends or family to Dubai and they are looked after as if they were you — even when you are not here.',
        'Votre membership accompagne ceux qui vous sont chers. Envoyez amis ou famille à Dubaï : ils sont reçus comme vous le seriez — même en votre absence.',
        'عضويتك تسافر مع من تحب. أرسل أصدقاءك أو عائلتك إلى دبي وسيُعاملون كما لو كانوا أنت — حتى في غيابك.',
      ),
    },
    {
      title: t('The household ledger', 'Le registre du foyer', 'سجل الأسرة'),
      copy: t(
        'One private record of how your family likes things: the allergies, the car seats, the favourite table, the shoe sizes for gifts, the dates that matter. Nobody has to explain twice.',
        'Un registre privé de la façon dont votre famille aime les choses : allergies, sièges enfants, table préférée, pointures pour les cadeaux, dates importantes. Personne n’a à se répéter.',
        'سجل خاص بطريقة عائلتك في كل شيء: الحساسية، ومقاعد الأطفال، والطاولة المفضلة، ومقاسات الأحذية للهدايا، والتواريخ المهمة. لا أحد يضطر لتكرار الشرح.',
      ),
    },
    {
      title: t('Designed around the season', 'Pensé autour de la saison', 'مصممة حول الموسم'),
      copy: t(
        'Dubai lives in seasons — the cool months of races, galas and desert nights, Ramadan and Eid, the summer escapes. Membership follows that rhythm, so the right things are arranged before everyone else thinks of them.',
        'Dubaï vit au rythme des saisons — mois frais des courses, galas et nuits dans le désert, Ramadan et Aïd, évasions d’été. Le membership suit ce rythme pour que tout soit prêt avant que les autres n’y pensent.',
        'تعيش دبي على إيقاع المواسم — الأشهر الباردة للسباقات والحفلات وليالي الصحراء، ورمضان والعيد، ورحلات الصيف. تتبع العضوية هذا الإيقاع ليُرتّب الصحيح قبل أن يفكر فيه الآخرون.',
      ),
    },
  ],

  plainLabel: t('In plain terms', 'En toute clarté', 'بوضوح'),
  plain: [
    {
      title: t('What membership is', 'Ce qu’est le membership', 'ما هي العضوية'),
      copy: t(
        'An annual relationship with a team that knows you: priority, planning, memory and care — paid for the time and judgement we give you.',
        'Une relation annuelle avec une équipe qui vous connaît : priorité, préparation, mémoire et attention — rémunérée pour le temps et le discernement que nous vous consacrons.',
        'علاقة سنوية مع فريق يعرفك: أولوية وتخطيط وذاكرة وعناية — مقابل الوقت وحسن التقدير اللذين نمنحك إياهما.',
      ),
    },
    {
      title: t('What it is not', 'Ce qu’il n’est pas', 'ما ليست عليه'),
      copy: t(
        'It is not a discount club, and it is not a guarantee of availability. Fully booked tables, sold-out evenings and limited editions remain requests until confirmed in writing, through legitimate channels only.',
        'Ce n’est ni un club de réductions, ni une garantie de disponibilité. Tables complètes, soirées à guichets fermés et éditions limitées restent des demandes jusqu’à confirmation écrite, par des canaux légitimes uniquement.',
        'ليست نادي خصومات، وليست ضماناً للتوفر. الطاولات المحجوزة والأمسيات النافدة والإصدارات المحدودة تبقى طلبات حتى تُؤكد كتابياً، وعبر القنوات المشروعة فقط.',
      ),
    },
    {
      title: t('What it costs', 'Ce que cela coûte', 'كم تكلّف'),
      copy: t(
        'Every card has an annual fee, shared personally in our reply to your introduction. Everything we arrange — tables, yachts, tickets, cars, products — is quoted separately and approved by you before it is confirmed.',
        'Chaque carte a une cotisation annuelle, communiquée personnellement dans notre réponse à votre introduction. Tout ce que nous organisons — tables, yachts, billets, voitures, produits — est chiffré séparément et approuvé par vous avant confirmation.',
        'لكل بطاقة رسوم سنوية نشاركها معك شخصياً في ردنا على طلب التعريف. وكل ما نرتبه — طاولات ويخوت وتذاكر وسيارات ومنتجات — يُسعّر منفصلاً وتوافق عليه قبل التأكيد.',
      ),
    },
  ],
  noMembershipNeeded: t(
    'Membership is never required: anyone can book our experiences or send us a request.',
    'Le membership n’est jamais obligatoire : chacun peut réserver nos expériences ou nous envoyer une demande.',
    'العضوية ليست شرطاً أبداً: يمكن لأي شخص حجز تجاربنا أو إرسال طلب إلينا.',
  ),
  foundingNote: t(
    'Places are limited in our founding year. Every introduction is read personally and answered by our team.',
    'Les places sont limitées pendant notre année fondatrice. Chaque introduction est lue personnellement et reçoit une réponse de notre équipe.',
    'الأماكن محدودة في عامنا التأسيسي. كل طلب تعريف يُقرأ شخصياً ويرد عليه فريقنا.',
  ),

  formTitle: t('Request an introduction', 'Demander une introduction', 'اطلب لقاءً تعريفياً'),
  formCopy: t(
    'Tell us a little about yourself. A member of the team will call you for a short, confidential conversation — there is no obligation.',
    'Parlez-nous un peu de vous. Un membre de l’équipe vous appellera pour un court échange confidentiel — sans engagement.',
    'أخبرنا قليلاً عن نفسك. سيتصل بك أحد أعضاء الفريق لمحادثة قصيرة وسرية — دون أي التزام.',
  ),
  form: {
    name: t('Full name', 'Nom complet', 'الاسم الكامل'),
    email: t('Email', 'Email', 'البريد الإلكتروني'),
    whatsapp: t('WhatsApp', 'WhatsApp', 'واتساب'),
    residence: t('You are', 'Vous êtes', 'أنت'),
    residenceOptions: ta(
      ['A UAE resident', 'A frequent visitor to Dubai', 'Planning a first visit'],
      ['Résident aux EAU', 'Visiteur régulier de Dubaï', 'En préparation d’une première visite'],
      ['مقيم في الإمارات', 'زائر دائم لدبي', 'أخطط لزيارتي الأولى'],
    ),
    level: t('Card of interest', 'Carte souhaitée', 'البطاقة المطلوبة'),
    message: t('What would you most like us to look after? (optional)', 'Que souhaitez-vous nous confier en priorité ? (facultatif)', 'ما أكثر ما تريد أن نهتم به؟ (اختياري)'),
    consent: t('I agree to be contacted about membership.', 'J’accepte d’être contacté(e) au sujet du membership.', 'أوافق على التواصل معي بشأن العضوية.'),
    submit: t('Request an introduction', 'Demander une introduction', 'اطلب لقاءً تعريفياً'),
    sending: t('Sending…', 'Envoi…', 'جارٍ الإرسال…'),
    success: t('Thank you. We will be in touch personally to arrange a short call.', 'Merci. Nous vous contacterons personnellement pour convenir d’un court appel.', 'شكراً لك. سنتواصل معك شخصياً لترتيب مكالمة قصيرة.'),
    error: t('Something went wrong. Please try again or message us on WhatsApp.', 'Une erreur est survenue. Réessayez ou écrivez-nous sur WhatsApp.', 'حدث خطأ. حاول مجدداً أو راسلنا عبر واتساب.'),
  },
}
