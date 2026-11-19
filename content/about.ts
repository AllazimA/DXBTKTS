import type { L } from '@/lib/catalogue/types'

/**
 * About page copy — company first. The founder appears as one short note
 * (expertise and the houses he trained in), not as a CV. Nothing here may
 * claim history, scale, client numbers or partnerships DXB TKTS does not have.
 */

export const about = {
  eyebrow: { en: 'About DXB TKTS', fr: 'À propos de DXB TKTS', ar: 'عن DXB TKTS' } as L,
  title: {
    en: 'Dubai, arranged by people\nwho know how it should feel.',
    fr: 'Dubaï, orchestrée par ceux\nqui savent ce qu’elle doit faire ressentir.',
    ar: 'دبي، يرتّبها من يعرف\nكيف يجب أن تُعاش.',
  } as L,
  lede: {
    en: 'DXB TKTS is a Dubai house for private experiences and lifestyle arrangements. We exist for one reason: the city’s best moments should be easy to reach — and they should be handled by people who care how they turn out.',
    fr: 'DXB TKTS est une maison dubaïote d’expériences privées et de conciergerie. Notre raison d’être : rendre les plus beaux moments de la ville faciles d’accès — et les confier à des personnes qui tiennent à leur réussite.',
    ar: 'DXB TKTS دار في دبي للتجارب الخاصة وخدمات أسلوب الحياة. وُجدنا لسبب واحد: أن تكون أجمل لحظات المدينة في متناولك — وأن يتولاها أشخاص يهمّهم أن تكون كما يجب.',
  } as L,

  storyLabel: { en: 'Our story', fr: 'Notre histoire', ar: 'قصتنا' } as L,
  storyTitle: {
    en: 'Between a booking site and a private concierge, there was a gap.',
    fr: 'Entre un site de réservation et une conciergerie privée, il manquait quelque chose.',
    ar: 'بين مواقع الحجز والكونسيرج الخاص، كانت هناك فجوة.',
  } as L,
  story: {
    en: [
      'Booking platforms are fast but anonymous: thousands of listings, no one to ask, nobody who notices when something is wrong. Traditional concierges are personal, but closed — no prices, long email chains, and doors that only open to members.',
      'DXB TKTS sits in between. You can see what we offer, what it costs and book in minutes. And behind every booking is a concierge team that chooses the operators, checks the details, answers on WhatsApp and stays with you until the experience is over.',
      'For the requests that cannot be booked with a button — the full table, the sold-out night, the proposal, the ten-day itinerary — we work the way the best concierge houses do: quietly, personally, and honestly about what is possible.',
    ],
    fr: [
      'Les plateformes de réservation sont rapides mais anonymes : des milliers d’annonces, personne à qui parler, personne pour remarquer un problème. Les conciergeries traditionnelles sont personnelles mais fermées — pas de prix, de longs échanges d’e-mails, des portes réservées aux membres.',
      'DXB TKTS se situe entre les deux. Vous voyez ce que nous proposons, ce que cela coûte, et réservez en quelques minutes. Derrière chaque réservation, une équipe de concierges choisit les prestataires, vérifie les détails, répond sur WhatsApp et reste à vos côtés jusqu’à la fin.',
      'Pour les demandes qui ne se réservent pas en un clic — la table complète, la soirée à guichets fermés, la demande en mariage, l’itinéraire de dix jours — nous travaillons comme les meilleures maisons de conciergerie : avec discrétion, personnellement, et en disant honnêtement ce qui est possible.',
    ],
    ar: [
      'منصات الحجز سريعة لكنها بلا وجه: آلاف العروض، ولا أحد تسأله، ولا أحد يلاحظ حين يحدث خطأ. أما الكونسيرج التقليدي فشخصي لكنه مغلق — لا أسعار، ورسائل بريد طويلة، وأبواب لا تُفتح إلا للأعضاء.',
      'تقف DXB TKTS بين الاثنين. ترى ما نقدّمه وكم يكلّف، وتحجز في دقائق. وخلف كل حجز فريق كونسيرج يختار المشغّلين ويتحقق من التفاصيل ويرد عبر واتساب ويبقى معك حتى نهاية التجربة.',
      'وللطلبات التي لا تُحجز بضغطة زر — الطاولة المحجوزة، والأمسية النافدة، وطلب الزواج، والبرنامج لعشرة أيام — نعمل كما تعمل أفضل دور الكونسيرج: بهدوء، وبشكل شخصي، وبصدق حول ما هو ممكن.',
    ],
  } as L<string[]>,

  pillarsLabel: { en: 'What we do', fr: 'Ce que nous faisons', ar: 'ما نقدّمه' } as L,
  pillars: [
    {
      title: { en: 'Experiences', fr: 'Expériences', ar: 'التجارب' } as L,
      copy: {
        en: 'A curated collection of private and premium experiences across Dubai and the UAE, with clear prices and confirmation before you pay.',
        fr: 'Une collection d’expériences privées et haut de gamme à Dubaï et aux Émirats, aux prix clairs et confirmées avant paiement.',
        ar: 'مجموعة مختارة من التجارب الخاصة والمميزة في دبي والإمارات، بأسعار واضحة وتأكيد قبل الدفع.',
      } as L,
      href: '/experiences',
    },
    {
      title: { en: 'Concierge', fr: 'Conciergerie', ar: 'الكونسيرج' } as L,
      copy: {
        en: 'Everything else: reservations, celebrations, itineraries, arrivals, sourcing and special access — arranged and confirmed in writing.',
        fr: 'Tout le reste : réservations, célébrations, itinéraires, arrivées, recherche d’exception et accès privilégiés — organisés et confirmés par écrit.',
        ar: 'كل ما عدا ذلك: الحجوزات والاحتفالات والبرامج والاستقبال والبحث عن القطع النادرة والوصول الخاص — مرتبة ومؤكدة كتابياً.',
      } as L,
      href: '/services',
    },
    {
      title: { en: 'Membership', fr: 'Membership', ar: 'العضوية' } as L,
      copy: {
        en: 'A standing relationship for residents and frequent visitors: a named lifestyle manager and priority on the requests that matter.',
        fr: 'Une relation durable pour résidents et visiteurs réguliers : un lifestyle manager attitré et la priorité sur les demandes qui comptent.',
        ar: 'علاقة دائمة للمقيمين والزوار الدائمين: مدير أسلوب حياة مخصص وأولوية في الطلبات المهمة.',
      } as L,
      href: '/membership',
    },
  ],

  principlesLabel: { en: 'How we work', fr: 'Notre manière de travailler', ar: 'كيف نعمل' } as L,
  principlesTitle: {
    en: 'Four habits from the concierge desk',
    fr: 'Quatre réflexes hérités de la conciergerie',
    ar: 'أربع عادات من مكتب الكونسيرج',
  } as L,
  principles: [
    {
      title: { en: 'We ask the second question', fr: 'Nous posons la deuxième question', ar: 'نطرح السؤال الثاني' } as L,
      copy: {
        en: '“A yacht on Saturday” is the first question. Who is it for, what are you celebrating, does anyone get seasick — that is where the evening is actually decided.',
        fr: '« Un yacht samedi » est la première question. Pour qui, que célèbre-t-on, quelqu’un a-t-il le mal de mer — c’est là que la soirée se décide vraiment.',
        ar: '«يخت يوم السبت» هو السؤال الأول. لمن هو، وما المناسبة، وهل يعاني أحد من دوار البحر — هنا تتحدد الأمسية فعلاً.',
      } as L,
    },
    {
      title: { en: 'Relationships before listings', fr: 'Les relations avant les annonces', ar: 'العلاقات قبل القوائم' } as L,
      copy: {
        en: 'We choose operators the way a concierge does: by visiting, testing and remembering who answers the phone when something goes wrong.',
        fr: 'Nous choisissons nos prestataires comme le ferait un concierge : en visitant, en testant, et en retenant qui répond quand quelque chose ne va pas.',
        ar: 'نختار المشغّلين كما يفعل الكونسيرج: بالزيارة والتجربة، وبتذكّر من يجيب الهاتف حين يحدث خطأ.',
      } as L,
    },
    {
      title: { en: 'An honest no', fr: 'Un non honnête', ar: 'رفض صادق' } as L,
      copy: {
        en: 'If a table cannot be had, or an experience is not right for your group, we say so — and offer the best alternative instead of a promise we cannot keep.',
        fr: 'Si une table est impossible, ou qu’une expérience ne convient pas à votre groupe, nous le disons — et proposons la meilleure alternative plutôt qu’une promesse intenable.',
        ar: 'إن تعذّر الحصول على طاولة، أو لم تناسب تجربةٌ مجموعتك، نقول ذلك — ونقدّم أفضل بديل بدلاً من وعد لا نستطيع الوفاء به.',
      } as L,
    },
    {
      title: { en: 'Details nobody sees', fr: 'Les détails invisibles', ar: 'تفاصيل لا يراها أحد' } as L,
      copy: {
        en: 'Car seats already fitted, the cake confirmed twice, a driver who knows the lobby. Done properly, you never notice any of it.',
        fr: 'Sièges enfants déjà installés, gâteau confirmé deux fois, un chauffeur qui connaît le lobby. Bien fait, rien de tout cela ne se remarque.',
        ar: 'مقاعد الأطفال مثبتة مسبقاً، والكعكة مؤكدة مرتين، وسائق يعرف بهو الفندق. حين يُنجز ذلك جيداً، لا تلاحظ شيئاً منه.',
      } as L,
    },
  ],

  founderLabel: { en: 'A note from our founder', fr: 'Le mot du fondateur', ar: 'كلمة المؤسس' } as L,
  founderName: 'Ahmed Allazim',
  founderRole: { en: 'Founder', fr: 'Fondateur', ar: 'المؤسس' } as L,
  founderNote: {
    en: 'I have spent my career on the other side of the request — at the concierge desks, lifestyle-management teams and premium client services of some of the world’s leading hospitality, concierge and financial houses. They taught me that luxury is not a product; it is judgement, relationships and the discipline to get small things right. DXB TKTS is built on those lessons, for a new generation of travellers and residents who want that standard without the closed doors.',
    fr: 'J’ai passé ma carrière de l’autre côté de la demande — aux comptoirs de conciergerie, dans les équipes de lifestyle management et les services clients premium de grandes maisons internationales de l’hôtellerie, de la conciergerie et de la finance. J’y ai appris que le luxe n’est pas un produit : c’est du discernement, des relations, et la rigueur de bien faire les petites choses. DXB TKTS repose sur ces leçons, pour une nouvelle génération de voyageurs et de résidents qui veulent ce niveau d’exigence sans les portes closes.',
    ar: 'أمضيت مسيرتي على الجانب الآخر من الطلب — في مكاتب الكونسيرج وفرق إدارة أسلوب الحياة وخدمات العملاء المميزين لدى دور عالمية رائدة في الضيافة والكونسيرج والخدمات المالية. تعلّمت هناك أن الفخامة ليست منتجاً، بل حسن تقدير وعلاقات وانضباط في إتقان التفاصيل الصغيرة. على هذه الدروس بُنيت DXB TKTS، لجيل جديد من المسافرين والمقيمين يريد هذا المستوى دون أبواب مغلقة.',
  } as L,
  houses: {
    en: 'Experience across Hilton, Aspire Lifestyles, Quintessentially and American Express.',
    fr: 'Expérience chez Hilton, Aspire Lifestyles, Quintessentially et American Express.',
    ar: 'خبرة في هيلتون وAspire Lifestyles وQuintessentially وأمريكان إكسبريس.',
  } as L,
  housesNote: {
    en: 'Listed as professional experience only — not partners of DXB TKTS.',
    fr: 'Mentionnées au titre de l’expérience professionnelle uniquement — non partenaires de DXB TKTS.',
    ar: 'مذكورة كخبرة مهنية فقط — وليست شركاء لـ DXB TKTS.',
  } as L,

  teamLabel: { en: 'The team', fr: 'L’équipe', ar: 'الفريق' } as L,
  teamTitle: { en: 'A young house with old-school standards.', fr: 'Une jeune maison aux exigences d’autrefois.', ar: 'دار شابة بمعايير أصيلة.' } as L,
  teamCopy: {
    en: 'We are a growing team of driven young entrepreneurs based in Dubai — people who move fast, use technology properly and still believe a phone call, a handwritten card and a confirmed detail matter. We are starting deliberately: a focused collection, operators we trust, and clients we can look after properly. We would rather be small and exceptional than large and ordinary.',
    fr: 'Nous sommes une équipe grandissante de jeunes entrepreneurs ambitieux basés à Dubaï — rapides, à l’aise avec la technologie, et convaincus qu’un appel, une carte manuscrite et un détail confirmé comptent toujours. Nous démarrons avec intention : une collection resserrée, des prestataires de confiance, et des clients que nous pouvons servir comme il se doit. Mieux vaut être petit et exceptionnel que grand et ordinaire.',
    ar: 'نحن فريق متنامٍ من رواد الأعمال الشباب الطموحين في دبي — نتحرك بسرعة ونستخدم التقنية جيداً، وما زلنا نؤمن بأن المكالمة والبطاقة المكتوبة بخط اليد والتفصيل المؤكد أمور مهمة. نبدأ بتأنٍّ: مجموعة مختارة، ومشغّلون نثق بهم، وعملاء نستطيع خدمتهم كما ينبغي. نفضّل أن نكون صغاراً واستثنائيين على أن نكون كباراً وعاديين.',
  } as L,
  ctaPrimary: { en: 'Explore experiences', fr: 'Découvrir les expériences', ar: 'اكتشف التجارب' } as L,
  ctaSecondary: { en: 'Talk to the team', fr: 'Parler à l’équipe', ar: 'تحدث مع الفريق' } as L,
}
