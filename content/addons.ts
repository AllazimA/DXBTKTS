import type { L } from '@/lib/catalogue/types'

const t = (en: string, fr: string, ar: string): L => ({ en, fr, ar })

export const addonsCopy = {
  doorTitle: t('Make it door to door', 'De porte à porte', 'من الباب إلى الباب'),
  doorCopy: t(
    'A private car and driver for five hours: from your hotel, waiting while you enjoy it, and on to dinner or back.',
    'Une voiture privée avec chauffeur pendant cinq heures : depuis votre hôtel, qui vous attend, puis vers le dîner ou le retour.',
    'سيارة خاصة مع سائق لخمس ساعات: من فندقك، وتنتظرك أثناء التجربة، ثم إلى العشاء أو العودة.',
  ),
  doorAdd: t('Add the car', 'Ajouter la voiture', 'أضف السيارة'),
  doorAdded: t('Car added to your plan', 'Voiture ajoutée', 'أُضيفت السيارة إلى خطتك'),
  stepUpTitle: t('Step up', 'Pour aller plus loin', 'ارتقِ بالتجربة'),
  stepUpCopy: t('The more private version of this experience.', 'La version plus privée de cette expérience.', 'النسخة الأكثر خصوصية من هذه التجربة.'),
  from: t('From', 'À partir de', 'ابتداءً من'),
}

export const filterCopy = {
  label: t('Show experiences for', 'Afficher les expériences pour', 'اعرض التجارب لـ'),
  all: t('Everyone', 'Tous', 'الجميع'),
  families: t('Families', 'Familles', 'العائلات'),
  couples: t('Couples', 'Couples', 'الأزواج'),
  friends: t('Friends & groups', 'Amis & groupes', 'الأصدقاء والمجموعات'),
  vip: t('VIP', 'VIP', 'كبار الشخصيات'),
  instant: t('Instant confirmation', 'Confirmation immédiate', 'تأكيد فوري'),
  results: t('{n} experiences', '{n} expériences', '{n} تجربة'),
  none: t('Nothing here yet for this filter — ask us and we will arrange it.', 'Rien pour ce filtre pour l’instant — demandez-nous, nous l’organiserons.', 'لا شيء لهذا الاختيار بعد — اسألنا وسنرتّبه.'),
  explore: t('Explore', 'Explorer', 'استكشف'),
}
