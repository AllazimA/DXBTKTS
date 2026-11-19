import type { L } from '@/lib/catalogue/types'

type Service = {
  id: string
  title: L
  line: L
  arranges: L<string[]>
  charged: L
  link?: { href: string; label: L }
}

export const servicesPage = {
  eyebrow: { en: 'Services', fr: 'Services', ar: 'الخدمات' } as L,
  title: {
    en: 'Everything that cannot be\nbooked with a button.',
    fr: 'Tout ce qui ne se réserve pas\nen un clic.',
    ar: 'كل ما لا يمكن\nحجزه بضغطة زر.',
  } as L,
  lede: {
    en: 'Our experiences are ready to book. Our concierge is for the rest: the table that is full, the itinerary for six people with six opinions, the watch that is not in the window, the birthday that has to be unforgettable. Tell us once — we arrange it, confirm it in writing and stay with you until it is done.',
    fr: 'Nos expériences se réservent en ligne. Notre conciergerie s’occupe du reste : la table complète, le programme pour six personnes aux six avis différents, la montre absente de la vitrine, l’anniversaire qui doit être inoubliable. Dites-le-nous une fois — nous organisons, confirmons par écrit et restons à vos côtés jusqu’au bout.',
    ar: 'تجاربنا جاهزة للحجز. أما الكونسيرج فللباقي: الطاولة المحجوزة بالكامل، وبرنامج لستة أشخاص بستة آراء، والساعة غير المعروضة في الواجهة، وعيد الميلاد الذي يجب ألا يُنسى. أخبرنا مرة واحدة — ونحن نرتّب ونؤكد كتابياً ونبقى معك حتى النهاية.',
  } as L,
  services: [
    {
      id: 'private-concierge',
      title: { en: 'Private concierge', fr: 'Conciergerie privée', ar: 'كونسيرج خاص' },
      line: {
        en: 'One contact on WhatsApp for your whole stay — before you land, while you are here, and after you leave.',
        fr: 'Un seul contact sur WhatsApp pour tout votre séjour — avant l’arrivée, pendant et après.',
        ar: 'جهة تواصل واحدة عبر واتساب طوال إقامتك — قبل وصولك وأثناء وجودك وبعد مغادرتك.',
      },
      arranges: {
        en: ['Day-by-day planning and timing', 'Changes and last-minute requests', 'Recommendations you can trust'],
        fr: ['Planification jour par jour', 'Changements et demandes de dernière minute', 'Des recommandations fiables'],
        ar: ['تخطيط يومي ومواعيد مدروسة', 'التعديلات والطلبات في اللحظة الأخيرة', 'توصيات يمكنك الوثوق بها'],
      },
      charged: {
        en: 'Coordination fee per stay, quoted upfront · included for members',
        fr: 'Frais de coordination par séjour, annoncés à l’avance · inclus pour les membres',
        ar: 'رسوم تنسيق لكل إقامة تُحدد مسبقاً · مشمولة للأعضاء',
      },
    },
    {
      id: 'itineraries',
      title: { en: 'Bespoke itineraries', fr: 'Itinéraires sur mesure', ar: 'برامج مصممة خصيصاً' },
      line: {
        en: 'A few days or two weeks across Dubai, Abu Dhabi, Hatta and Ras Al Khaimah — planned around your pace, not a tour bus.',
        fr: 'Quelques jours ou deux semaines entre Dubaï, Abu Dhabi, Hatta et Ras Al Khaimah — à votre rythme, pas à celui d’un car.',
        ar: 'بضعة أيام أو أسبوعان بين دبي وأبوظبي وحتا ورأس الخيمة — على إيقاعك أنت، لا إيقاع حافلة سياحية.',
      },
      arranges: {
        en: ['Multi-day UAE itineraries', 'Family and multi-generation trips', 'Honeymoons and milestone journeys'],
        fr: ['Itinéraires de plusieurs jours aux EAU', 'Voyages en famille, toutes générations', 'Lunes de miel et voyages marquants'],
        ar: ['برامج لعدة أيام في الإمارات', 'رحلات عائلية لكل الأجيال', 'شهر العسل والرحلات المميزة'],
      },
      charged: {
        en: 'Planning fee credited against your bookings · experiences at listed prices',
        fr: 'Frais de conception déduits de vos réservations · expériences aux prix affichés',
        ar: 'رسوم تخطيط تُخصم من حجوزاتك · التجارب بالأسعار المعلنة',
      },
      link: { href: '/experiences', label: { en: 'See experiences', fr: 'Voir les expériences', ar: 'عرض التجارب' } },
    },
    {
      id: 'arrivals',
      title: { en: 'Arrivals & VIP travel assistance', fr: 'Arrivées & assistance VIP', ar: 'الاستقبال والمساعدة الخاصة' },
      line: {
        en: 'From the aircraft door to the hotel suite without queues or guesswork.',
        fr: 'De la porte de l’avion à la suite de l’hôtel, sans file d’attente ni incertitude.',
        ar: 'من باب الطائرة إلى جناح الفندق بلا طوابير ولا ارتباك.',
      },
      arranges: {
        en: ['Meet & greet and fast-track where available', 'Private transfers and luggage handling', 'Hotel liaison and early check-in requests'],
        fr: ['Accueil et coupe-file lorsque disponible', 'Transferts privés et bagages', 'Liaison hôtel et demandes d’arrivée anticipée'],
        ar: ['الاستقبال والمسار السريع حيث يتوفر', 'تنقلات خاصة ونقل الأمتعة', 'التنسيق مع الفندق وطلبات تسجيل الدخول المبكر'],
      },
      charged: { en: 'Fixed prices online', fr: 'Prix fixes en ligne', ar: 'أسعار ثابتة عبر الإنترنت' },
      link: { href: '/experiences/transfers', label: { en: 'Book a transfer', fr: 'Réserver un transfert', ar: 'احجز توصيلاً' } },
    },
    {
      id: 'transport',
      title: { en: 'Chauffeurs & luxury cars', fr: 'Chauffeurs & voitures de prestige', ar: 'سائقون وسيارات فاخرة' },
      line: {
        en: 'A driver for the day, a Rolls-Royce for the evening, or a supercar for yourself.',
        fr: 'Un chauffeur pour la journée, une Rolls-Royce pour la soirée, ou une supercar à conduire vous-même.',
        ar: 'سائق لليوم، أو رولز رويس للأمسية، أو سيارة خارقة تقودها بنفسك.',
      },
      arranges: {
        en: ['Chauffeur by the hour or day', 'Prestige cars for occasions', 'Self-drive luxury rentals through licensed partners'],
        fr: ['Chauffeur à l’heure ou à la journée', 'Voitures de prestige pour les occasions', 'Location de luxe via des loueurs agréés'],
        ar: ['سائق بالساعة أو باليوم', 'سيارات فاخرة للمناسبات', 'استئجار سيارات فاخرة عبر شركاء مرخّصين'],
      },
      charged: { en: 'Fixed prices online or quoted', fr: 'Prix fixes en ligne ou sur devis', ar: 'أسعار ثابتة أو عرض سعر' },
    },
    {
      id: 'dining',
      title: { en: 'Dining & reservations', fr: 'Restaurants & réservations', ar: 'المطاعم والحجوزات' },
      line: {
        en: 'The right table at the right moment — from the counter everyone talks about to a private room for twelve.',
        fr: 'La bonne table au bon moment — du comptoir dont tout le monde parle au salon privé pour douze.',
        ar: 'الطاولة المناسبة في اللحظة المناسبة — من الركن الذي يتحدث عنه الجميع إلى غرفة خاصة لاثني عشر شخصاً.',
      },
      arranges: {
        en: ['Requests at sought-after restaurants', 'Private dining rooms and chef’s tables', 'Private chefs at villas and on yachts'],
        fr: ['Demandes dans les restaurants les plus prisés', 'Salons privés et tables du chef', 'Chefs privés en villa ou sur yacht'],
        ar: ['طلبات في أكثر المطاعم طلباً', 'غرف خاصة وطاولات الشيف', 'طهاة خاصون في الفلل وعلى اليخوت'],
      },
      charged: {
        en: 'Reservations included for members · otherwise a small request fee',
        fr: 'Réservations incluses pour les membres · sinon de petits frais de demande',
        ar: 'الحجوزات مشمولة للأعضاء · وإلا رسوم طلب بسيطة',
      },
    },
    {
      id: 'occasions',
      title: { en: 'Celebrations & proposals', fr: 'Célébrations & demandes en mariage', ar: 'الاحتفالات وطلبات الزواج' },
      line: {
        en: 'Birthdays on the water, anniversaries in the dunes, a proposal timed to the last light over the Gulf.',
        fr: 'Anniversaires en mer, fêtes dans les dunes, une demande en mariage calée sur la dernière lumière du Golfe.',
        ar: 'أعياد ميلاد على الماء، وذكريات سنوية في الكثبان، وطلب زواج في آخر ضوء فوق الخليج.',
      },
      arranges: {
        en: ['Venue, décor, cake and flowers', 'Photographers and musicians', 'Discreet timing and surprises'],
        fr: ['Lieu, décoration, gâteau et fleurs', 'Photographes et musiciens', 'Surprises et timing discrets'],
        ar: ['المكان والزينة والكعكة والورود', 'مصورون وموسيقيون', 'توقيت ومفاجآت بسرية تامة'],
      },
      charged: { en: 'Packages online or a tailored quote', fr: 'Forfaits en ligne ou devis sur mesure', ar: 'باقات عبر الإنترنت أو عرض سعر مخصص' },
    },
    {
      id: 'shopping',
      title: { en: 'Shopping & sourcing', fr: 'Shopping & recherche d’exception', ar: 'التسوق والبحث عن القطع النادرة' },
      line: {
        en: 'Private appointments at the boutiques of Dubai Mall and Mall of the Emirates, and help finding the piece that is not on display.',
        fr: 'Rendez-vous privés dans les boutiques du Dubai Mall et du Mall of the Emirates, et aide pour trouver la pièce absente des vitrines.',
        ar: 'مواعيد خاصة في متاجر دبي مول ومول الإمارات، ومساعدة في إيجاد القطعة غير المعروضة.',
      },
      arranges: {
        en: ['Personal shopping appointments', 'Sourcing of watches, jewellery and limited editions through authorised and reputable sellers', 'Gifting, wrapping and delivery'],
        fr: ['Rendez-vous de personal shopping', 'Recherche de montres, bijoux et éditions limitées auprès de vendeurs agréés et reconnus', 'Cadeaux, emballage et livraison'],
        ar: ['مواعيد تسوق شخصي', 'البحث عن الساعات والمجوهرات والإصدارات المحدودة عبر بائعين معتمدين وموثوقين', 'الهدايا والتغليف والتوصيل'],
      },
      charged: {
        en: 'Sourcing fee agreed before we start · items at the seller’s price',
        fr: 'Frais de recherche convenus à l’avance · articles au prix du vendeur',
        ar: 'رسوم بحث يُتفق عليها مسبقاً · القطع بسعر البائع',
      },
    },
    {
      id: 'access',
      title: { en: 'Events & special access', fr: 'Événements & accès privilégiés', ar: 'الفعاليات والوصول الخاص' },
      line: {
        en: 'Grand Prix weekends, championship tennis, the concerts that sell out in minutes — through official hospitality and legitimate channels only.',
        fr: 'Week-ends de Grand Prix, tennis de haut niveau, concerts complets en quelques minutes — uniquement via l’hospitalité officielle et des canaux légitimes.',
        ar: 'عطلات سباق الجائزة الكبرى، وبطولات التنس، والحفلات التي تنفد تذاكرها في دقائق — عبر باقات الضيافة الرسمية والقنوات المشروعة فقط.',
      },
      arranges: {
        en: ['Official hospitality packages', 'Premium seating and VIP tickets', 'Transport and dining around the event'],
        fr: ['Forfaits d’hospitalité officiels', 'Places premium et billets VIP', 'Transport et dîner autour de l’événement'],
        ar: ['باقات الضيافة الرسمية', 'مقاعد مميزة وتذاكر كبار الشخصيات', 'التنقل والعشاء حول الفعالية'],
      },
      charged: {
        en: 'Quoted per request · never guaranteed until confirmed in writing',
        fr: 'Sur devis · jamais garanti avant confirmation écrite',
        ar: 'عرض سعر لكل طلب · لا ضمان قبل التأكيد كتابياً',
      },
    },
    {
      id: 'lifestyle',
      title: { en: 'Lifestyle & personal assistance', fr: 'Lifestyle & assistance personnelle', ar: 'أسلوب الحياة والمساعدة الشخصية' },
      line: {
        en: 'For residents and frequent visitors: the errands, appointments and arrangements that quietly take over your week.',
        fr: 'Pour les résidents et visiteurs réguliers : les courses, rendez-vous et démarches qui envahissent votre semaine.',
        ar: 'للمقيمين والزوار الدائمين: المهام والمواعيد والترتيبات التي تستهلك أسبوعك بصمت.',
      },
      arranges: {
        en: ['Appointments, wellness and spa bookings', 'Household and family logistics', 'Visiting family and guest hosting'],
        fr: ['Rendez-vous, bien-être et spa', 'Logistique de la maison et de la famille', 'Accueil de la famille et des invités'],
        ar: ['المواعيد وحجوزات العافية والسبا', 'شؤون المنزل والعائلة', 'استضافة العائلة والضيوف'],
      },
      charged: { en: 'Part of membership', fr: 'Compris dans le membership', ar: 'ضمن العضوية' },
      link: { href: '/membership', label: { en: 'About membership', fr: 'Découvrir le membership', ar: 'عن العضوية' } },
    },
  ] as Service[],
  groupsTitle: { en: 'Groups & companies', fr: 'Groupes & entreprises', ar: 'المجموعات والشركات' } as L,
  groupsCopy: {
    en: 'Client evenings, team days and guest logistics — planned with the same care, invoiced in one place.',
    fr: 'Soirées clients, journées d’équipe et logistique des invités — préparées avec le même soin, facturées en un seul endroit.',
    ar: 'أمسيات العملاء وأيام الفرق وتنقلات الضيوف — بالعناية نفسها، وبفاتورة واحدة.',
  } as L,
  groupsCta: { en: 'Corporate & groups', fr: 'Entreprises & groupes', ar: 'الشركات والمجموعات' } as L,
  howTitle: { en: 'How it works', fr: 'Comment ça marche', ar: 'كيف نعمل' } as L,
  how: [
    {
      title: { en: 'Tell us once', fr: 'Dites-le une fois', ar: 'أخبرنا مرة واحدة' },
      copy: { en: 'WhatsApp, the request form or a call. Dates, guests, the occasion, the budget if you have one.', fr: 'WhatsApp, le formulaire ou un appel. Dates, invités, occasion, budget si vous en avez un.', ar: 'عبر واتساب أو النموذج أو مكالمة. التواريخ والضيوف والمناسبة والميزانية إن وُجدت.' },
    },
    {
      title: { en: 'Receive a proposal', fr: 'Recevez une proposition', ar: 'استلم مقترحاً' },
      copy: { en: 'Options with clear prices, what is included and our fee — before you commit to anything.', fr: 'Des options aux prix clairs, ce qui est inclus et nos frais — avant tout engagement.', ar: 'خيارات بأسعار واضحة، وما هو مشمول، ورسومنا — قبل أي التزام.' },
    },
    {
      title: { en: 'Consider it handled', fr: 'C’est entre nos mains', ar: 'اعتبره منجزاً' },
      copy: { en: 'We confirm with partners, send everything in writing and stay reachable until it is over.', fr: 'Nous confirmons avec nos partenaires, envoyons tout par écrit et restons joignables jusqu’à la fin.', ar: 'نؤكد مع الشركاء ونرسل كل شيء كتابياً ونبقى متاحين حتى النهاية.' },
    },
  ] as { title: L; copy: L }[],
  cta: { en: 'Start a request', fr: 'Faire une demande', ar: 'قدّم طلباً' } as L,
  chargedLabel: { en: 'How it’s charged', fr: 'Tarification', ar: 'طريقة الاحتساب' } as L,
  arrangesLabel: { en: 'We arrange', fr: 'Nous organisons', ar: 'نرتّب' } as L,
}

const t = (en: string, fr: string, ar: string): L => ({ en, fr, ar })

/** Dubai-specific detail for each service (keyed by service id). */
export const servicesDubai: Record<string, L> = {
  'private-concierge': t(
    'Staying on the Palm, in Downtown or at a villa in Emirates Hills — one WhatsApp thread covers the whole city, from your first coffee to the last car home.',
    'Sur la Palm, à Downtown ou dans une villa d’Emirates Hills — un seul fil WhatsApp couvre toute la ville, du premier café à la dernière voiture du soir.',
    'سواء كنت في النخلة أو وسط المدينة أو في فيلا بتلال الإمارات — محادثة واتساب واحدة تغطي المدينة كلها، من قهوتك الأولى حتى آخر سيارة إلى المنزل.',
  ),
  itineraries: t(
    'Al Fahidi at dawn, the Louvre Abu Dhabi by afternoon, Hatta’s mountains, Ras Al Khaimah’s coast — the UAE in the right order, with the right driver.',
    'Al Fahidi à l’aube, le Louvre Abu Dhabi l’après-midi, les montagnes de Hatta, la côte de Ras Al Khaimah — les Émirats dans le bon ordre, avec le bon chauffeur.',
    'الفهيدي عند الفجر، واللوفر أبوظبي بعد الظهر، وجبال حتا، وساحل رأس الخيمة — الإمارات بالترتيب الصحيح ومع السائق المناسب.',
  ),
  arrivals: t(
    'At DXB and DWC: meet-and-greet and fast-track where the airport offers it, your bags handled, and the car waiting outside Terminal 3 — not in the car park.',
    'À DXB et DWC : accueil et coupe-file lorsque l’aéroport le propose, bagages pris en charge, et la voiture qui attend devant le Terminal 3 — pas au parking.',
    'في مطاري DXB وDWC: استقبال ومسار سريع حيث يتيحه المطار، والأمتعة مُدارة، والسيارة تنتظر أمام المبنى 3 — لا في الموقف.',
  ),
  transport: t(
    'Rolls-Royce and Maybach for evenings, G-Class for the dunes, V-Class for families — and the same driver for the run to Abu Dhabi.',
    'Rolls-Royce et Maybach pour le soir, Classe G pour les dunes, Classe V pour les familles — et le même chauffeur jusqu’à Abu Dhabi.',
    'رولز رويس ومايباخ للأمسيات، وG-Class للكثبان، وV-Class للعائلات — والسائق نفسه في الطريق إلى أبوظبي.',
  ),
  dining: t(
    'DIFC power lunches, Downtown tables facing the fountains, beach dinners on the Palm, and iftar and suhoor during Ramadan.',
    'Déjeuners d’affaires au DIFC, tables face aux fontaines de Downtown, dîners sur la plage de la Palm, iftar et suhoor pendant le Ramadan.',
    'غداء الأعمال في مركز دبي المالي، وطاولات تطل على النوافير في وسط المدينة، وعشاء على شاطئ النخلة، والإفطار والسحور في رمضان.',
  ),
  occasions: t(
    'A midnight view of Burj Khalifa, a dune at sunset, a yacht off Atlantis, a terrace above the Marina — the setting chosen for the story.',
    'Burj Khalifa à minuit, une dune au coucher du soleil, un yacht au large de l’Atlantis, une terrasse au-dessus de la Marina — le décor choisi pour l’histoire.',
    'برج خليفة عند منتصف الليل، أو كثيب عند الغروب، أو يخت قبالة أتلانتس، أو شرفة فوق المارينا — المكان يُختار ليناسب القصة.',
  ),
  shopping: t(
    'Fashion Avenue at Dubai Mall, Mall of the Emirates, the Gold Souk in Deira, and the limited releases that arrive with Dubai Watch Week.',
    'La Fashion Avenue du Dubai Mall, le Mall of the Emirates, le souk de l’or à Deira, et les éditions limitées de la Dubai Watch Week.',
    'فاشن أفينيو في دبي مول، ومول الإمارات، وسوق الذهب في ديرة، والإصدارات المحدودة التي تصل مع أسبوع دبي للساعات.',
  ),
  access: t(
    'Race night at Meydan, championship golf and tennis, Grand Prix weekend in Abu Dhabi, Art Dubai, and New Year’s Eve with a view of the fireworks.',
    'Soirée de course à Meydan, golf et tennis de championnat, Grand Prix d’Abu Dhabi, Art Dubai, et le Nouvel An face aux feux d’artifice.',
    'ليلة السباق في ميدان، وبطولات الغولف والتنس، وعطلة الجائزة الكبرى في أبوظبي، وآرت دبي، وليلة رأس السنة بإطلالة على الألعاب النارية.',
  ),
  lifestyle: t(
    'For families in Jumeirah, Arabian Ranches or the Palm: villa logistics, household staff introductions, school holidays and visiting relatives.',
    'Pour les familles de Jumeirah, Arabian Ranches ou la Palm : logistique de la villa, personnel de maison, vacances scolaires et visites de la famille.',
    'للعائلات في جميرا والمرابع العربية والنخلة: شؤون الفيلا، وترشيح الطاقم المنزلي، والعطل المدرسية، وزيارات الأقارب.',
  ),
}

export const servicesExtra = {
  inDubai: t('In Dubai', 'À Dubaï', 'في دبي'),
  paidLabel: t('How we are paid', 'Comment nous sommes rémunérés', 'كيف نتقاضى أجرنا'),
  paidTitle: t('Transparent, by design', 'Transparents, par principe', 'شفافية مقصودة'),
  paid: [
    {
      title: t('Published prices', 'Prix affichés', 'الأسعار المعلنة'),
      copy: t(
        'The prices on our experiences already include our service. What you see is what you pay — no booking fee added at the end.',
        'Les prix de nos expériences incluent déjà notre service. Ce que vous voyez est ce que vous payez — aucun frais ajouté à la fin.',
        'أسعار تجاربنا تشمل خدمتنا مسبقاً. ما تراه هو ما تدفعه — دون رسوم حجز تُضاف في النهاية.',
      ),
    },
    {
      title: t('Arranged requests', 'Demandes sur mesure', 'الطلبات المرتبة'),
      copy: t(
        'For requests we arrange for you, a coordination fee is shown in your proposal before you confirm. Members of Pearl and Najm do not pay it.',
        'Pour les demandes que nous organisons, des frais de coordination figurent dans votre proposition avant confirmation. Les membres Pearl et Najm en sont exemptés.',
        'للطلبات التي نرتبها لك، تظهر رسوم التنسيق في المقترح قبل التأكيد. أعضاء اللؤلؤة ونجم معفون منها.',
      ),
    },
    {
      title: t('Partner commissions', 'Commissions des partenaires', 'عمولات الشركاء'),
      copy: t(
        'Some partners pay us a commission. It never changes what we recommend, and it never adds to your price.',
        'Certains partenaires nous versent une commission. Elle ne change jamais nos recommandations et n’augmente jamais votre prix.',
        'يدفع لنا بعض الشركاء عمولة. لا تغيّر أبداً ما نوصي به، ولا تُضاف أبداً إلى سعرك.',
      ),
    },
  ],
  areasLabel: t('Where we work', 'Où nous intervenons', 'أين نعمل'),
  areas: {
    en: ['Downtown & DIFC', 'Dubai Marina & JBR', 'Palm Jumeirah', 'Jumeirah & Umm Suqeim', 'Emirates Hills & Al Barari', 'Deira & Old Dubai', 'Abu Dhabi', 'Ras Al Khaimah & Hatta'],
    fr: ['Downtown & DIFC', 'Dubai Marina & JBR', 'Palm Jumeirah', 'Jumeirah & Umm Suqeim', 'Emirates Hills & Al Barari', 'Deira & le vieux Dubaï', 'Abu Dhabi', 'Ras Al Khaimah & Hatta'],
    ar: ['وسط المدينة ومركز دبي المالي', 'دبي مارينا وJBR', 'نخلة جميرا', 'جميرا وأم سقيم', 'تلال الإمارات والبراري', 'ديرة ودبي القديمة', 'أبوظبي', 'رأس الخيمة وحتا'],
  } as L<string[]>,
  hoursLabel: t('Service hours', 'Horaires', 'ساعات الخدمة'),
  hours: t(
    'Our concierge team replies on WhatsApp seven days a week. Members receive extended hours as set out in their agreement.',
    'Notre équipe répond sur WhatsApp sept jours sur sept. Les membres bénéficient d’horaires étendus selon leur contrat.',
    'يرد فريقنا عبر واتساب سبعة أيام في الأسبوع. ويحصل الأعضاء على ساعات أطول وفق اتفاقيتهم.',
  ),
}
