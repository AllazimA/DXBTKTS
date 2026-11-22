import type { L } from '@/lib/catalogue/types'

const t = (en: string, fr: string, ar: string): L => ({ en, fr, ar })

export const diningPage = {
  eyebrow: t('Dining', 'Restaurants', 'المطاعم'),
  title: t('The tables\nwe recommend', 'Les tables\nque nous recommandons', 'الطاولات\nالتي نوصي بها'),
  lede: t(
    'A short list, not a directory: the restaurants we would book for our own guests, most of them recognised in the Time Out Dubai Restaurant Awards 2026. Tell us the night and we request the table for you.',
    'Une courte liste, pas un annuaire : les restaurants que nous réserverions pour nos propres clients, la plupart distingués aux Time Out Dubai Restaurant Awards 2026. Dites-nous le soir, nous demandons la table pour vous.',
    'قائمة قصيرة وليست دليلاً: المطاعم التي نحجزها لضيوفنا، ومعظمها نال تقديراً في جوائز تايم آوت دبي للمطاعم 2026. أخبرنا بالأمسية ونطلب الطاولة نيابةً عنك.',
  ),
  cuisine: t('Cuisine', 'Cuisine', 'المطبخ'),
  area: t('Where', 'Où', 'المكان'),
  bestFor: t('Best for', 'Idéal pour', 'الأنسب لـ'),
  request: t('Request a table', 'Demander une table', 'اطلب طاولة'),
  website: t('Restaurant website', 'Site du restaurant', 'موقع المطعم'),
  formTitle: t('Request a table', 'Demander une table', 'اطلب طاولة'),
  formCopy: t(
    'Choose a restaurant, or let us suggest one. Planning several dinners? Add them in one request and we handle them together.',
    'Choisissez un restaurant ou laissez-nous vous en proposer un. Plusieurs dîners prévus ? Ajoutez-les dans la même demande, nous nous occupons de tout.',
    'اختر مطعماً أو دعنا نقترح عليك. تخطط لعدة أمسيات؟ أضفها في طلب واحد ونتولاها معاً.',
  ),
  honesty: t(
    'We request tables on your behalf; the restaurant confirms. Some restaurants hold a card or ask for a deposit — we tell you before anything is confirmed. Awards are as published by Time Out Dubai; descriptions are our own.',
    'Nous demandons la table pour vous ; le restaurant confirme. Certains demandent une carte ou un acompte — nous vous prévenons avant toute confirmation. Les distinctions sont celles publiées par Time Out Dubai ; les descriptions sont les nôtres.',
    'نطلب الطاولة نيابةً عنك، والمطعم هو من يؤكد الحجز. بعض المطاعم تطلب ضمان بطاقة أو عربوناً — نخبرك بذلك قبل أي تأكيد. الجوائز كما نشرتها تايم آوت دبي، والأوصاف من كتابتنا.',
  ),
  empty: t('Our list is being refreshed. Tell us what you feel like and we will suggest the right table.', 'Notre liste est en cours de mise à jour. Dites-nous ce qui vous ferait plaisir, nous vous proposerons la bonne table.', 'نقوم بتحديث قائمتنا. أخبرنا بما تشتهيه وسنقترح عليك الطاولة المناسبة.'),
}

export const nightlifePage = {
  eyebrow: t('Nightlife', 'Vie nocturne', 'الحياة الليلية'),
  title: t('Dubai after dark,\nwithout the queue', 'Dubaï la nuit,\nsans la file d’attente', 'دبي بعد الغروب،\nدون طوابير'),
  lede: t(
    'Ten kinds of night out, from a hidden speakeasy to an open-air DJ set — chosen from the What’s On Nightlife Awards 2025. We request the table, the entry and the car home.',
    'Dix façons de sortir, du speakeasy caché au set DJ en plein air — choisies parmi les What’s On Nightlife Awards 2025. Nous demandons la table, l’entrée et la voiture du retour.',
    'عشر طرق للسهر، من بار سرّي مخفي إلى عرض دي جي في الهواء الطلق — اخترناها من جوائز What’s On للحياة الليلية 2025. نطلب لك الطاولة والدخول وسيارة العودة.',
  ),
  kindOfNight: t('The night', 'L’ambiance', 'نوع السهرة'),
  area: t('Where', 'Où', 'المكان'),
  bestFor: t('Best for', 'Idéal pour', 'الأنسب لـ'),
  request: t('Request a table', 'Demander une table', 'اطلب طاولة'),
  website: t('Venue website', 'Site du lieu', 'موقع المكان'),
  formTitle: t('Plan the night', 'Organiser la soirée', 'خطّط للسهرة'),
  formCopy: t(
    'Tell us the venue, the night and how many of you. Minimum spends, dress codes and door policies are the venue’s own; we confirm them with you before anything is booked.',
    'Indiquez le lieu, le soir et le nombre de personnes. Les minimums de consommation, codes vestimentaires et politiques d’entrée sont ceux du lieu ; nous vous les confirmons avant toute réservation.',
    'أخبرنا بالمكان والليلة وعدد الأشخاص. الحد الأدنى للإنفاق وقواعد اللباس وسياسة الدخول يحددها المكان؛ ونؤكدها لك قبل أي حجز.',
  ),
  honesty: t(
    'We request tables and entry on your behalf; the venue decides. Guests must be 21 or over and carry ID. Awards are as published by What’s On; descriptions are our own.',
    'Nous demandons tables et entrées pour vous ; le lieu décide. Les invités doivent avoir 21 ans ou plus et une pièce d’identité. Les distinctions sont celles publiées par What’s On ; les descriptions sont les nôtres.',
    'نطلب الطاولات والدخول نيابةً عنك، والقرار للمكان. يجب ألا يقل عمر الضيوف عن 21 عاماً مع حمل الهوية. الجوائز كما نشرتها What’s On، والأوصاف من كتابتنا.',
  ),
  empty: t('Our list is being refreshed. Tell us the kind of night you want and we will suggest the place.', 'Notre liste est en cours de mise à jour. Décrivez la soirée souhaitée, nous vous proposerons le lieu.', 'نقوم بتحديث قائمتنا. صف لنا السهرة التي تريدها وسنقترح المكان.'),
}

export const sourcingPage = {
  eyebrow: t('Limited-edition sourcing', 'Recherche d’éditions limitées', 'البحث عن الإصدارات المحدودة'),
  title: t('The piece everyone\nis queuing for', 'La pièce que tout le monde\nattend', 'القطعة التي\nينتظرها الجميع'),
  lede: t(
    'First releases, limited editions and hard-to-find pieces: we research where they will be sold, speak to retailers, watch the release and, where the retailer allows it, queue and buy on your behalf.',
    'Premières sorties, éditions limitées et pièces introuvables : nous cherchons où elles seront vendues, contactons les revendeurs, suivons la sortie et, quand le revendeur l’autorise, faisons la queue et achetons pour vous.',
    'الإصدارات الأولى والطبعات المحدودة والقطع النادرة: نبحث عن أماكن بيعها، ونتواصل مع المتاجر، ونتابع موعد الطرح، وحيثما يسمح المتجر نقف في الطابور ونشتري نيابةً عنك.',
  ),
  howTitle: t('How it works', 'Comment ça marche', 'كيف تعمل الخدمة'),
  steps: [
    t('You tell us the piece', 'Vous nous décrivez la pièce', 'تخبرنا بالقطعة'),
    t('We research retailers and the release', 'Nous étudions les revendeurs et la sortie', 'نبحث في المتاجر وموعد الطرح'),
    t('We quote our sourcing fee', 'Nous chiffrons nos frais de recherche', 'نرسل لك رسوم البحث'),
    t('You pay the fee; the work starts', 'Vous réglez les frais ; le travail commence', 'تدفع الرسوم ويبدأ العمل'),
    t('We monitor, queue and try to buy', 'Nous suivons, faisons la queue et tentons l’achat', 'نتابع ونقف في الطابور ونحاول الشراء'),
    t('Secured: you pay the retailer’s price', 'Obtenu : vous payez le prix du revendeur', 'عند النجاح: تدفع سعر المتجر'),
  ],
  termsTitle: t('Sourcing terms', 'Conditions de recherche', 'شروط البحث'),
  terms: t(
    'The sourcing fee pays for our research, retailer contact, monitoring, coordination and, where agreed, queueing and purchase assistance. It is charged in advance and is non-refundable once work has started, because the work is done whether or not the item is secured. We work on a best-efforts basis and cannot guarantee stock, a place in a queue or a purchase. The product price is separate and paid only once the item is secured, at the retailer’s price. We follow each retailer’s rules, including purchase limits and identification requirements, and never use unauthorised means.',
    'Les frais de recherche rémunèrent nos recherches, les contacts avec les revendeurs, le suivi, la coordination et, si convenu, l’attente et l’aide à l’achat. Ils sont facturés à l’avance et ne sont pas remboursables une fois le travail commencé, car ce travail est effectué que la pièce soit obtenue ou non. Nous agissons au mieux de nos moyens et ne pouvons garantir ni le stock, ni une place dans la file, ni l’achat. Le prix du produit est distinct et n’est payé qu’une fois la pièce obtenue, au prix du revendeur. Nous respectons les règles de chaque revendeur, y compris les limites d’achat et les justificatifs d’identité, et n’utilisons jamais de moyens non autorisés.',
    'تغطي رسوم البحث أبحاثنا، والتواصل مع المتاجر، والمتابعة، والتنسيق، وعند الاتفاق، الوقوف في الطابور والمساعدة في الشراء. تُدفع الرسوم مقدماً ولا تُسترد بعد بدء العمل، لأن العمل يُنجز سواء حصلنا على القطعة أم لا. نبذل أقصى جهدنا ولا يمكننا ضمان توفر المخزون أو مكان في الطابور أو إتمام الشراء. سعر المنتج منفصل ولا يُدفع إلا بعد الحصول على القطعة، وبسعر المتجر. نلتزم بقواعد كل متجر، بما في ذلك حدود الشراء ومتطلبات الهوية، ولا نستخدم أي وسيلة غير مصرح بها.',
  ),
  formTitle: t('Tell us what you are looking for', 'Dites-nous ce que vous cherchez', 'أخبرنا بما تبحث عنه'),
  formCopy: t(
    'The more precise, the better: reference, size, colour and the date you need it. We reply with what is possible and our fee before anything starts.',
    'Plus c’est précis, mieux c’est : référence, taille, couleur et date souhaitée. Nous vous répondons avec ce qui est possible et nos frais avant de commencer.',
    'كلما كانت التفاصيل أدق كان أفضل: الرقم المرجعي والمقاس واللون والموعد الذي تحتاجها فيه. نرد عليك بما هو ممكن وبرسومنا قبل أن نبدأ.',
  ),
}

export const showsPage = {
  perleEyebrow: t('Live show', 'Spectacle', 'عرض حي'),
  perleTitle: t('La Perle by Dragone', 'La Perle by Dragone', 'لا بيرل من دراغون'),
  perleCopy: t(
    'Dubai’s resident aqua show at Al Habtoor City: acrobatics, water and stunts on a stage that floods and drains in seconds. Tell us the night and how many of you; we request the best seats available and can add dinner before the show.',
    'Le spectacle aquatique résident de Dubaï, à Al Habtoor City : acrobaties, eau et cascades sur une scène qui s’inonde et se vide en quelques secondes. Indiquez le soir et le nombre de personnes ; nous demandons les meilleures places disponibles et pouvons ajouter un dîner avant le spectacle.',
    'عرض دبي المائي الدائم في الحبتور سيتي: ألعاب بهلوانية ومياه ومشاهد مثيرة على مسرح يمتلئ بالماء ويفرغ في ثوانٍ. أخبرنا بالأمسية وعدد الأشخاص، ونطلب أفضل المقاعد المتاحة ويمكننا إضافة عشاء قبل العرض.',
  ),
  perleNote: t(
    'Seat categories and prices are set by La Perle and change by performance; we confirm them with you before buying. Tickets are bought through official channels.',
    'Les catégories et les prix sont fixés par La Perle et varient selon la représentation ; nous vous les confirmons avant l’achat. Les billets sont achetés via les canaux officiels.',
    'تحدد لا بيرل فئات المقاعد وأسعارها وتختلف حسب العرض؛ نؤكدها لك قبل الشراء. تُشترى التذاكر عبر القنوات الرسمية.',
  ),
  operaEyebrow: t('Dubai Opera', 'Dubai Opera', 'دبي أوبرا'),
  operaTitle: t('Opera, ballet and concerts\nat Dubai Opera', 'Opéra, ballet et concerts\nà Dubai Opera', 'الأوبرا والباليه والحفلات\nفي دبي أوبرا'),
  operaCopy: t(
    'Performances our team has picked from the Dubai Opera programme. Ask us for any other date: we buy through official channels and can arrange dinner and a car around the show.',
    'Les représentations sélectionnées par notre équipe dans le programme de Dubai Opera. Demandez-nous toute autre date : nous achetons via les canaux officiels et pouvons organiser dîner et voiture autour du spectacle.',
    'عروض اختارها فريقنا من برنامج دبي أوبرا. اطلب منا أي موعد آخر: نشتري عبر القنوات الرسمية ويمكننا ترتيب العشاء والسيارة حول العرض.',
  ),
  operaEmpty: t(
    'Our next selection from the Dubai Opera programme is on its way. Tell us the performance or the date you have in mind and we will find the tickets.',
    'Notre prochaine sélection du programme de Dubai Opera arrive. Indiquez-nous la représentation ou la date souhaitée, nous trouverons les billets.',
    'اختيارنا التالي من برنامج دبي أوبرا في الطريق. أخبرنا بالعرض أو الموعد الذي تريده وسنجد لك التذاكر.',
  ),
  status: {
    on_sale: t('On sale', 'En vente', 'متاحة للبيع'),
    few_left: t('Few seats left', 'Dernières places', 'مقاعد قليلة متبقية'),
    sold_out: t('Sold out — ask us', 'Complet — demandez-nous', 'نفدت التذاكر — اسألنا'),
    announced: t('Announced', 'Annoncé', 'تم الإعلان'),
  } as Record<string, L>,
  categories: t('Seats', 'Places', 'المقاعد'),
  official: t('Official page', 'Page officielle', 'الصفحة الرسمية'),
  request: t('Request tickets', 'Demander des billets', 'اطلب التذاكر'),
  formTitle: t('Request tickets', 'Demander des billets', 'اطلب التذاكر'),
  seatsBest: t('Best available', 'Meilleures places disponibles', 'أفضل المقاعد المتاحة'),
  seatsPremium: t('Premium seats', 'Places premium', 'مقاعد مميزة'),
  seatsVip: t('VIP (lounge access where offered)', 'VIP (accès salon si proposé)', 'كبار الشخصيات (مع صالة حيث تتوفر)'),
  seatsAdvise: t('Not sure — advise me', 'Je ne sais pas — conseillez-moi', 'لست متأكداً — انصحوني'),
  detRule: t(
    'We request and buy tickets on your behalf through official channels; our handling fee is shown separately. DXB TKTS is not the ticket seller.',
    'Nous demandons et achetons les billets pour vous via les canaux officiels ; nos frais de service sont indiqués à part. DXB TKTS n’est pas le vendeur des billets.',
    'نطلب التذاكر ونشتريها نيابةً عنك عبر القنوات الرسمية، وتظهر رسوم الخدمة لدينا بشكل منفصل. DXB TKTS ليست الجهة البائعة للتذاكر.',
  ),
}

export const shoppingPanel = {
  title: t('Plan this shopping day', 'Organiser cette journée shopping', 'خطّط ليوم التسوق هذا'),
  copy: t(
    'A few details and your concierge sends you a proposal: stores, appointments, timing and our fee. Nothing is charged until you agree.',
    'Quelques détails et votre concierge vous envoie une proposition : boutiques, rendez-vous, horaires et nos frais. Rien n’est facturé sans votre accord.',
    'بعض التفاصيل ويرسل لك فريق الكونسيرج عرضاً: المتاجر والمواعيد والتوقيت ورسومنا. لا يُدفع أي شيء قبل موافقتك.',
  ),
  bespoke: t('Bespoke quote', 'Devis sur mesure', 'عرض سعر مخصص'),
  sourcingLink: t('Looking for one specific limited piece? Use limited-edition sourcing →', 'Vous cherchez une pièce limitée précise ? Passez par la recherche d’éditions limitées →', 'تبحث عن قطعة محدودة بعينها؟ استخدم خدمة البحث عن الإصدارات المحدودة ←'),
}

export const navExtra = {
  dining: t('Dining', 'Restaurants', 'المطاعم'),
  nightlife: t('Nightlife', 'Vie nocturne', 'الحياة الليلية'),
  sourcing: t('Limited-edition sourcing', 'Éditions limitées', 'الإصدارات المحدودة'),
}

export const moodCaptions = {
  chef: t('Every plate, finished by hand', 'Chaque assiette, finie à la main', 'كل طبق يُكمَّل يدوياً'),
  table: t('A long table, made for sharing', 'Une longue table, faite pour partager', 'مائدة طويلة للمشاركة'),
  occasion: t('A table set for the occasion', 'Une table dressée pour l’occasion', 'طاولة مُعدّة للمناسبة'),
  cocktail: t('The first drink of the night', 'Le premier verre de la soirée', 'أول مشروب في الليلة'),
  lounge: t('A private box above the show', 'Une loge privée au-dessus du spectacle', 'مقصورة خاصة فوق العرض'),
  rooftop: t('A table with the city at your feet', 'Une table, la ville à vos pieds', 'طاولة والمدينة عند قدميك'),
  arrival: t('Your car, waiting at the door', 'Votre voiture, qui vous attend à la porte', 'سيارتك بانتظارك عند الباب'),
}
