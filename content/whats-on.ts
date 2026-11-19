import type { L } from '@/lib/catalogue/types'

const t = (en: string, fr: string, ar: string): L => ({ en, fr, ar })

export const whatsOn = {
  eyebrow: t('Tickets & events', 'Billets & événements', 'التذاكر والفعاليات'),
  title: t('What’s on in Dubai\nand across the Emirates', 'Ce qui se passe à Dubaï\net dans les Émirats', 'ما يجري في دبي\nوفي أنحاء الإمارات'),
  lede: t(
    'The races, concerts, fairs, festivals and summits worth planning a trip around — with dates taken from the organisers and official listings, and a clear note where they have not been announced yet.',
    'Les courses, concerts, salons, festivals et sommets qui valent un voyage — avec des dates issues des organisateurs et des annonces officielles, et une mention claire lorsqu’elles ne sont pas encore annoncées.',
    'السباقات والحفلات والمعارض والمهرجانات والقمم التي تستحق أن تخطط رحلتك حولها — بمواعيد مأخوذة من المنظمين والإعلانات الرسمية، مع إشارة واضحة حين لا تكون قد أُعلنت بعد.',
  ),
  nextUp: t('Coming up', 'À venir', 'قريباً'),
  onNow: t('On now', 'En cours', 'جارٍ الآن'),
  filters: t('Filter the calendar', 'Filtrer l’agenda', 'تصفية التقويم'),
  month: t('Month', 'Mois', 'الشهر'),
  category: t('Category', 'Catégorie', 'الفئة'),
  emirate: t('Emirate', 'Émirat', 'الإمارة'),
  all: t('All', 'Tous', 'الكل'),
  allMonths: t('All months', 'Tous les mois', 'كل الأشهر'),
  reset: t('Clear filters', 'Effacer les filtres', 'مسح التصفية'),
  none: t('Nothing matches these filters yet. Try another month or category.', 'Aucun événement ne correspond pour l’instant. Essayez un autre mois ou une autre catégorie.', 'لا توجد فعاليات مطابقة حالياً. جرّب شهراً أو فئة أخرى.'),
  count: t('{n} events', '{n} événements', '{n} فعالية'),
  details: t('Details', 'Détails', 'التفاصيل'),
  hide: t('Close', 'Fermer', 'إغلاق'),
  where: t('Where', 'Où', 'المكان'),
  when: t('When', 'Quand', 'الموعد'),
  official: t('Official website', 'Site officiel', 'الموقع الرسمي'),
  requestTickets: t('Request tickets', 'Demander des billets', 'اطلب التذاكر'),
  ticketsOnRequest: t('Tickets on request', 'Billets sur demande', 'التذاكر عند الطلب'),
  ticketsWhatsApp: t('Ask on WhatsApp', 'Demander sur WhatsApp', 'اسأل عبر واتساب'),
  ticketsNote: t(
    'Tell us how many guests and where you would like to sit. We source the tickets, confirm the details and the price with you before anything is booked. Subject to availability.',
    'Dites-nous combien de personnes et où vous souhaitez être placés. Nous trouvons les billets et vous confirmons les détails et le prix avant toute réservation. Sous réserve de disponibilité.',
    'أخبرنا بعدد الضيوف ومكان الجلوس المفضل. نوفر التذاكر ونؤكد معك التفاصيل والسعر قبل أي حجز. حسب التوفر.',
  ),
  ticketsWhatsAppMessage: t('Hello DXB TKTS, I would like tickets for', 'Bonjour DXB TKTS, je souhaite des billets pour', 'مرحباً DXB TKTS، أرغب في تذاكر لـ'),
  officialNote: t('The full programme and final dates are published by the organiser.', 'Le programme complet et les dates définitives sont publiés par l’organisateur.', 'ينشر المنظم البرنامج الكامل والمواعيد النهائية.'),
  tba: t('Dates TBA', 'Dates à venir', 'المواعيد لاحقاً'),
  categories: {
    business: t('Business', 'Affaires', 'أعمال'),
    sport: t('Sport', 'Sport', 'رياضة'),
    culture: t('Culture', 'Culture', 'ثقافة'),
    lifestyle: t('Luxury & lifestyle', 'Luxe & art de vivre', 'الفخامة وأسلوب الحياة'),
    entertainment: t('Concerts & shows', 'Concerts & spectacles', 'حفلات وعروض'),
  },
  emirates: {
    dubai: t('Dubai', 'Dubaï', 'دبي'),
    'abu-dhabi': t('Abu Dhabi', 'Abu Dhabi', 'أبوظبي'),
    sharjah: t('Sharjah', 'Charjah', 'الشارقة'),
    uae: t('Nationwide', 'Tout le pays', 'على مستوى الدولة'),
  },
  status: {
    confirmed: t('Confirmed', 'Confirmé', 'مؤكد'),
    expected: t('Expected', 'Prévu', 'متوقع'),
    tba: t('Dates to be announced', 'Dates à annoncer', 'المواعيد لم تُعلن بعد'),
  },
  /** Subtle, factual offers — what we can arrange around an event, never the event itself. */
  helps: {
    transport: {
      copy: t('Going? We can arrange a chauffeur for the day, so parking and taxis are not your problem.', 'Vous y allez ? Nous pouvons organiser un chauffeur pour la journée — ni parking ni taxi à gérer.', 'هل ستحضر؟ يمكننا ترتيب سائق خاص لليوم، فلا تشغل بالك بالمواقف وسيارات الأجرة.'),
      cta: t('Chauffeur & transport', 'Chauffeur & transport', 'السائق والتنقل'),
      href: '/services#transport',
    },
    dining: {
      copy: t('Busy dates fill quickly. Tell us the evening you have in mind and we will look for the right table.', 'Ces dates se remplissent vite. Dites-nous la soirée souhaitée, nous chercherons la bonne table.', 'تمتلئ هذه المواعيد بسرعة. أخبرنا بالأمسية التي تريدها وسنبحث عن الطاولة المناسبة.'),
      cta: t('Dining requests', 'Demandes de restaurants', 'طلبات المطاعم'),
      href: '/services#dining',
    },
    stay: {
      copy: t('Visiting for it? We can plan the days around it — airport, driver, and what to do with the rest of the week.', 'Vous venez pour l’occasion ? Nous organisons les jours autour — aéroport, chauffeur et le reste de la semaine.', 'هل تزور دبي لأجلها؟ نخطط الأيام من حولها — المطار والسائق وبقية الأسبوع.'),
      cta: t('Plan the trip', 'Organiser le séjour', 'خطط للرحلة'),
      href: '/request',
    },
    experiences: {
      copy: t('Make a day of it: a yacht, a desert evening or a private guide either side of the event.', 'Faites-en une journée : un yacht, une soirée dans le désert ou un guide privé avant ou après.', 'اجعلها يوماً كاملاً: يخت أو أمسية في الصحراء أو مرشد خاص قبل الفعالية أو بعدها.'),
      cta: t('See experiences', 'Voir les expériences', 'اطّلع على التجارب'),
      href: '/experiences',
    },
    arrivals: {
      copy: t('In town for the show? Airport meet-and-greet, a driver between venues and dinner bookings for your guests.', 'En ville pour le salon ? Accueil à l’aéroport, chauffeur entre les sites et réservations pour vos invités.', 'في المدينة لأجل المعرض؟ استقبال في المطار وسائق بين المواقع وحجوزات عشاء لضيوفك.'),
      cta: t('Arrivals & business travel', 'Arrivées & voyages d’affaires', 'الاستقبال ورحلات العمل'),
      href: '/services#arrivals',
    },
  },
  disclaimer: t(
    'DXB TKTS is not the organiser of these events and has no partnership with their organisers. Tickets are arranged on request and subject to availability. Dates come from official sources and can change — we confirm them with you before booking.',
    'DXB TKTS n’organise pas ces événements et n’a aucun partenariat avec leurs organisateurs. Les billets sont organisés sur demande, sous réserve de disponibilité. Les dates proviennent de sources officielles et peuvent changer — nous les confirmons avec vous avant toute réservation.',
    'DXB TKTS ليست الجهة المنظمة لهذه الفعاليات، ولا تربطها أي شراكة مع منظميها. تُرتَّب التذاكر عند الطلب وحسب التوفر. المواعيد مأخوذة من مصادر رسمية وقد تتغير — ونؤكدها معك قبل الحجز.',
  ),
  reviewed: t('Calendar last reviewed', 'Agenda mis à jour le', 'آخر مراجعة للتقويم'),
  planTitle: t('Planning a visit around one of these dates?', 'Vous organisez un séjour autour de l’une de ces dates ?', 'تخطط لزيارة حول أحد هذه المواعيد؟'),
  planCopy: t(
    'Tell us the event and your dates. We will plan the rest of the stay — where to eat, how to get around and what to do on the free days.',
    'Indiquez-nous l’événement et vos dates. Nous organisons le reste du séjour — où dîner, comment se déplacer et que faire les jours libres.',
    'أخبرنا بالفعالية ومواعيدك، ونخطط لبقية الإقامة — أين تتناول الطعام وكيف تتنقل وماذا تفعل في الأيام الحرة.',
  ),
  planCta: t('Plan with us', 'Organiser avec nous', 'خطط معنا'),
}
