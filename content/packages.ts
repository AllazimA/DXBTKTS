import type { L } from '@/lib/catalogue/types'

const t = (en: string, fr: string, ar: string): L => ({ en, fr, ar })

export const packagesCopy = {
  eyebrow: t('Packages', 'Formules', 'الباقات'),
  title: t('Days that are already\nput together', 'Des journées\ndéjà composées', 'أيام\nمرتبة مسبقاً'),
  lede: t(
    'Each package joins experiences that belong together — same place, same part of the day, same kind of guest — with the car between them. The price is simply the sum of its parts; change anything once it is in your plan.',
    'Chaque formule réunit des expériences qui vont ensemble — même lieu, même moment de la journée, même type de voyageur — avec la voiture entre elles. Le prix est simplement la somme des éléments ; modifiez ce que vous voulez dans votre programme.',
    'تجمع كل باقة تجارب تنتمي لبعضها — المكان نفسه، والوقت نفسه من اليوم، ونوع الضيف نفسه — مع السيارة بينها. السعر هو مجموع عناصرها ببساطة؛ ويمكنك تعديل أي شيء في خطتك.',
  ),
  themes: {
    downtown: t('Downtown', 'Downtown', 'وسط المدينة'),
    palm: t('Palm Jumeirah', 'Palm Jumeirah', 'نخلة جميرا'),
    family: t('Family', 'Famille', 'العائلة'),
    desert: t('Desert', 'Désert', 'الصحراء'),
    romance: t('For two', 'À deux', 'لشخصين'),
    'first-visit': t('First visit', 'Premier séjour', 'الزيارة الأولى'),
  },
  instant: t('Instant confirmation', 'Confirmation immédiate', 'تأكيد فوري'),
  concierge: t('Confirmed by our team', 'Confirmé par notre équipe', 'يؤكده فريقنا'),
  multiDay: t('Multi-day', 'Plusieurs jours', 'عدة أيام'),
  view: t('See the package', 'Voir la formule', 'اطّلع على الباقة'),
  from: t('Total', 'Total', 'الإجمالي'),
  howItRuns: t('How the day runs', 'Le déroulé', 'كيف يسير اليوم'),
  inThePackage: t('What is in the package', 'Ce que comprend la formule', 'محتوى الباقة'),
  sumNote: t(
    'The package price is the sum of these items at today’s prices — no hidden extras and no invented saving. Restaurants are reserved for you and paid on the night.',
    'Le prix de la formule est la somme de ces éléments aux prix du jour — sans frais cachés ni économie inventée. Les restaurants sont réservés pour vous et réglés sur place.',
    'سعر الباقة هو مجموع هذه العناصر بأسعار اليوم — بلا رسوم خفية ولا توفير مصطنع. نحجز المطاعم لك وتُدفع في الليلة نفسها.',
  ),
  date: t('Preferred date', 'Date souhaitée', 'التاريخ المفضل'),
  dateHint: t('Optional — you can set dates per item in your plan.', 'Facultatif — vous pourrez fixer une date par élément.', 'اختياري — يمكنك تحديد التاريخ لكل عنصر في خطتك.'),
  add: t('Add the package to my plan', 'Ajouter la formule à mon programme', 'أضف الباقة إلى خطتي'),
  added: t('Added — open your plan to pay or send it', 'Ajoutée — ouvrez votre programme pour payer ou l’envoyer', 'أُضيفت — افتح خطتك للدفع أو الإرسال'),
  openPlan: t('Open my plan', 'Ouvrir mon programme', 'افتح خطتي'),
  tailor: t('Prefer it tailored? Tell us and we will adjust it.', 'Envie d’une version sur mesure ? Dites-le-nous.', 'تفضّلها مصممة لك؟ أخبرنا وسنعدّلها.'),
  tailorCta: t('Ask for a tailored version', 'Demander une version sur mesure', 'اطلب نسخة مخصصة'),
  shelfTitle: t('Packages', 'Formules', 'الباقات'),
  shelfCopy: t('Ready-made days that join the right experiences, with the car between them.', 'Des journées toutes prêtes qui réunissent les bonnes expériences, avec la voiture entre elles.', 'أيام جاهزة تجمع التجارب المناسبة مع السيارة بينها.'),
  shelfCta: t('See all packages', 'Voir toutes les formules', 'اطّلع على كل الباقات'),
}
