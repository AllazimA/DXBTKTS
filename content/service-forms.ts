import type { L } from '@/lib/catalogue/types'
import type { ServiceKind } from '@/lib/service-requests'

/**
 * Field layout and wording of the service request forms (shopping, sourcing, dining, nightlife,
 * tickets). Keys match lib/service-requests.ts SERVICE_FIELDS, which match the DXB CRM request
 * type fields. Select values are sent in English (the CRM's working language); the guest sees
 * them in their own language.
 */

const t = (en: string, fr: string, ar: string): L => ({ en, fr, ar })

export type Option = { value: string; label: L }
export type FieldSpec = {
  key: string
  type: 'text' | 'textarea' | 'date' | 'time' | 'number' | 'select' | 'yesno' | 'url'
  label: L
  placeholder?: L
  options?: Option[]
  required?: boolean
  /** Spans both columns. */
  wide?: boolean
  min?: number
  max?: number
}

const o = (value: string, fr: string, ar: string): Option => ({ value, label: t(value, fr, ar) })

const OCCASIONS = [
  o('No particular occasion', 'Pas d’occasion particulière', 'لا مناسبة معيّنة'),
  o('Birthday', 'Anniversaire', 'عيد ميلاد'),
  o('Anniversary', 'Anniversaire de couple', 'ذكرى زواج'),
  o('Proposal', 'Demande en mariage', 'طلب زواج'),
  o('Business', 'Affaires', 'عمل'),
  o('Celebration with friends', 'Fête entre amis', 'احتفال مع الأصدقاء'),
]

const date = (key = 'date', required = true, label = t('Date', 'Date', 'التاريخ')): FieldSpec => ({ key, type: 'date', label, required })
const time = (required = false): FieldSpec => ({ key: 'time', type: 'time', label: t('Time', 'Heure', 'الوقت'), required })
const guests = (key: string, label = t('Guests', 'Personnes', 'عدد الأشخاص')): FieldSpec => ({ key, type: 'number', label, required: true, min: 1, max: 60 })
const budget: FieldSpec = { key: 'budget', type: 'text', label: t('Budget (optional)', 'Budget (facultatif)', 'الميزانية (اختياري)'), placeholder: t('e.g. AED 5,000', 'ex. 5 000 AED', 'مثلاً 5,000 درهم') }
const specialRequests: FieldSpec = { key: 'specialRequests', type: 'textarea', label: t('Special requests', 'Demandes particulières', 'طلبات خاصة'), placeholder: t('Dietary needs, seating, a cake, flowers…', 'Régime alimentaire, placement, un gâteau, des fleurs…', 'احتياجات غذائية، مكان الجلوس، كعكة، زهور…'), wide: true }

export const FORM_FIELDS: Record<ServiceKind, FieldSpec[]> = {
  dining: [
    { key: 'restaurant', type: 'select', label: t('Restaurant', 'Restaurant', 'المطعم'), required: true, options: [] /* filled from the list on the page */ },
    date(),
    time(true),
    guests('partySize'),
    { key: 'occasion', type: 'select', label: t('Occasion', 'Occasion', 'المناسبة'), options: OCCASIONS },
    { key: 'restaurants', type: 'textarea', label: t('More tables during your stay (optional)', 'D’autres tables pendant votre séjour (facultatif)', 'طاولات أخرى خلال إقامتك (اختياري)'), placeholder: t('e.g. Zuma on Friday, 4 guests, 21:00', 'ex. Zuma vendredi, 4 personnes, 21h', 'مثلاً زوما يوم الجمعة، 4 أشخاص، 21:00'), wide: true },
    specialRequests,
  ],
  nightlife: [
    { key: 'venue', type: 'select', label: t('Venue', 'Lieu', 'المكان'), required: true, options: [] },
    date(),
    time(),
    guests('partySize'),
    {
      key: 'seating',
      type: 'select',
      label: t('Table or entry', 'Table ou entrée', 'طاولة أم دخول'),
      options: [o('A table', 'Une table', 'طاولة'), o('Entry only', 'Entrée seule', 'دخول فقط'), o('Not sure — advise me', 'Je ne sais pas — conseillez-moi', 'لست متأكداً — انصحوني')],
    },
    { key: 'occasion', type: 'select', label: t('Occasion', 'Occasion', 'المناسبة'), options: OCCASIONS },
    budget,
    { key: 'eventPreference', type: 'text', label: t('Event or DJ (optional)', 'Événement ou DJ (facultatif)', 'الفعالية أو الدي جي (اختياري)') },
    { key: 'transport', type: 'yesno', label: t('Car to and from the venue?', 'Voiture aller-retour ?', 'سيارة ذهاباً وإياباً؟') },
    specialRequests,
  ],
  tickets: [
    { key: 'event', type: 'text', label: t('Show or event', 'Spectacle ou événement', 'العرض أو الفعالية'), required: true, wide: true },
    date(),
    time(),
    guests('tickets', t('Tickets', 'Billets', 'عدد التذاكر')),
    { key: 'ticketCategory', type: 'select', label: t('Seats', 'Places', 'المقاعد'), options: [] /* set by the page */ },
    budget,
    { key: 'dinnerAndShow', type: 'yesno', label: t('Dinner before the show?', 'Dîner avant le spectacle ?', 'عشاء قبل العرض؟') },
    { key: 'notes', type: 'textarea', label: t('Anything else', 'Autre chose', 'أي شيء آخر'), placeholder: t('Seating together, accessibility, a car to the venue…', 'Places côte à côte, accessibilité, une voiture jusqu’au lieu…', 'مقاعد متجاورة، احتياجات خاصة، سيارة إلى المكان…'), wide: true },
  ],
  shopping: [
    {
      key: 'location',
      type: 'select',
      label: t('Where', 'Où', 'المكان'),
      options: [
        o('The Dubai Mall', 'The Dubai Mall', 'دبي مول'),
        o('Mall of the Emirates', 'Mall of the Emirates', 'مول الإمارات'),
        o('Gold & Diamond Souk', 'Souk de l’or et des diamants', 'سوق الذهب والألماس'),
        o('Dubai Design District', 'Dubai Design District', 'حي دبي للتصميم'),
        o('Several places / advise me', 'Plusieurs lieux / conseillez-moi', 'عدة أماكن / انصحوني'),
      ],
    },
    date(),
    time(),
    {
      key: 'duration',
      type: 'select',
      label: t('How long', 'Durée', 'المدة'),
      options: [o('2–3 hours', '2 à 3 heures', 'من ساعتين إلى 3 ساعات'), o('Half day', 'Demi-journée', 'نصف يوم'), o('Full day', 'Journée entière', 'يوم كامل'), o('Not sure', 'Je ne sais pas', 'لست متأكداً')],
    },
    guests('guests'),
    { key: 'personalShopper', type: 'yesno', label: t('Personal shopper with you?', 'Un personal shopper à vos côtés ?', 'مستشار تسوّق يرافقك؟') },
    { key: 'brands', type: 'text', label: t('Brands or stores', 'Marques ou boutiques', 'العلامات أو المتاجر'), wide: true },
    { key: 'productCategory', type: 'text', label: t('What you are shopping for', 'Ce que vous cherchez', 'ما الذي تتسوّق من أجله'), placeholder: t('Watches, jewellery, fashion, gifts…', 'Montres, bijoux, mode, cadeaux…', 'ساعات، مجوهرات، أزياء، هدايا…') },
    budget,
    { key: 'itemsSought', type: 'textarea', label: t('Specific pieces (optional)', 'Pièces précises (facultatif)', 'قطع محددة (اختياري)'), wide: true },
    {
      key: 'assistance',
      type: 'select',
      label: t('Help you would like', 'Aide souhaitée', 'المساعدة المطلوبة'),
      options: [
        o('Chauffeur between stores', 'Chauffeur entre les boutiques', 'سائق بين المتاجر'),
        o('Private appointments', 'Rendez-vous privés', 'مواعيد خاصة'),
        o('Shipping or delivery to the hotel', 'Expédition ou livraison à l’hôtel', 'الشحن أو التوصيل إلى الفندق'),
        o('All of the above', 'Tout cela', 'كل ما سبق'),
      ],
    },
    { key: 'referenceLinks', type: 'url', label: t('Reference link (optional)', 'Lien de référence (facultatif)', 'رابط مرجعي (اختياري)'), placeholder: t('A product page or photo link', 'Une page produit ou une photo', 'صفحة منتج أو رابط صورة') },
    { key: 'preferences', type: 'textarea', label: t('Preferences', 'Préférences', 'التفضيلات'), placeholder: t('Sizes, styles, what you already own…', 'Tailles, styles, ce que vous possédez déjà…', 'المقاسات، الأنماط، ما تملكه بالفعل…'), wide: true },
  ],
  sourcing: [
    { key: 'productName', type: 'text', label: t('Product', 'Produit', 'المنتج'), required: true, wide: true, placeholder: t('e.g. a limited-edition watch or sneaker', 'ex. une montre ou une sneaker en édition limitée', 'مثلاً ساعة أو حذاء رياضي بإصدار محدود') },
    { key: 'brand', type: 'text', label: t('Brand', 'Marque', 'العلامة التجارية') },
    { key: 'model', type: 'text', label: t('Model or reference', 'Modèle ou référence', 'الطراز أو الرقم المرجعي') },
    { key: 'edition', type: 'text', label: t('Edition / release name', 'Édition / nom de la sortie', 'الإصدار / اسم الطرح') },
    { key: 'colour', type: 'text', label: t('Colour', 'Couleur', 'اللون') },
    { key: 'size', type: 'text', label: t('Size', 'Taille', 'المقاس') },
    { key: 'quantity', type: 'number', label: t('Quantity', 'Quantité', 'الكمية'), min: 1, max: 20 },
    budget,
    date('releaseDate', false, t('Release date (if known)', 'Date de sortie (si connue)', 'تاريخ الطرح (إن كان معروفاً)')),
    date('neededBy', false, t('Needed by', 'Pour le', 'مطلوب قبل')),
    { key: 'retailer', type: 'text', label: t('Preferred retailer or city', 'Revendeur ou ville préférés', 'المتجر أو المدينة المفضّلة') },
    { key: 'referenceUrl', type: 'url', label: t('Reference link', 'Lien de référence', 'رابط مرجعي') },
    {
      key: 'urgency',
      type: 'select',
      label: t('Urgency', 'Urgence', 'درجة الاستعجال'),
      options: [o('No rush', 'Pas pressé', 'غير مستعجل'), o('Within a month', 'Dans le mois', 'خلال شهر'), o('Urgent', 'Urgent', 'عاجل')],
    },
    { key: 'brandNewOnly', type: 'yesno', label: t('Brand new only?', 'Neuf uniquement ?', 'جديد فقط؟') },
    { key: 'alternativesOk', type: 'yesno', label: t('Close alternatives acceptable?', 'Alternatives proches acceptées ?', 'هل تقبل بدائل قريبة؟') },
    { key: 'specifications', type: 'textarea', label: t('Specifications', 'Spécifications', 'المواصفات'), placeholder: t('Anything that must be exactly right', 'Ce qui doit être exactement conforme', 'كل ما يجب أن يكون مطابقاً تماماً'), wide: true },
  ],
}

export const formCopy = {
  name: t('Full name', 'Nom complet', 'الاسم الكامل'),
  email: t('Email', 'E-mail', 'البريد الإلكتروني'),
  phone: t('Phone / WhatsApp', 'Téléphone / WhatsApp', 'الهاتف / واتساب'),
  message: t('Anything else we should know', 'Autre chose à nous dire', 'أي شيء آخر يجب أن نعرفه'),
  choose: t('Choose…', 'Choisir…', 'اختر…'),
  yes: t('Yes', 'Oui', 'نعم'),
  no: t('No', 'Non', 'لا'),
  suggest: t('Suggest one for me', 'Proposez-m’en un', 'اقترحوا لي مكاناً'),
  submit: t('Send my request', 'Envoyer ma demande', 'أرسل طلبي'),
  sending: t('Sending…', 'Envoi…', 'جارٍ الإرسال…'),
  error: t('Something went wrong. Please try again, or message us on WhatsApp.', 'Une erreur s’est produite. Réessayez ou écrivez-nous sur WhatsApp.', 'حدث خطأ. يرجى المحاولة مرة أخرى أو مراسلتنا عبر واتساب.'),
  required: t('Required', 'Obligatoire', 'مطلوب'),
  successEyebrow: t('Request received', 'Demande reçue', 'تم استلام الطلب'),
  successTitle: t('Thank you — we are on it.', 'Merci — nous nous en occupons.', 'شكراً لك — نحن نعمل على طلبك.'),
  successCopy: t(
    'Your concierge will confirm availability with you on WhatsApp or by email, usually within a few hours. Nothing is booked or charged until you agree.',
    'Votre concierge vous confirme la disponibilité sur WhatsApp ou par e-mail, en général en quelques heures. Rien n’est réservé ni facturé sans votre accord.',
    'سيؤكد لك فريق الكونسيرج التوفر عبر واتساب أو البريد الإلكتروني، عادةً خلال ساعات قليلة. لا يُحجز أو يُدفع أي شيء قبل موافقتك.',
  ),
  assurance: t('We request on your behalf. Nothing is booked or charged until you agree.', 'Nous faisons la demande pour vous. Rien n’est réservé ni facturé sans votre accord.', 'نقدّم الطلب نيابةً عنك. لا يُحجز أو يُدفع أي شيء قبل موافقتك.'),
  termsLabel: t('I have read and accept the sourcing terms above.', 'J’ai lu et j’accepte les conditions de recherche ci-dessus.', 'قرأت شروط البحث أعلاه وأوافق عليها.'),
}
