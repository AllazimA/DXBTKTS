import type { Locale } from '@/i18n.config'

export type ArticleContent = {
  category: string
  title: string
  excerpt: string
  date: string
  readTime: string
  pullQuote: string
  body: string[]
}

export type JournalArticle = {
  slug: string
  img: string
  alt: string
  content: Record<Locale, ArticleContent>
}

export const articles: JournalArticle[] = [
  {
    slug: 'tables-worth-crossing-the-world-for',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2000&auto=format&fit=crop',
    alt: 'Candlelit fine dining table',
    content: {
      en: {
        category: 'Insider Dubai',
        title: 'The Tables Worth Crossing the World For',
        excerpt:
          'Seven dining rooms that never advertise, never discount, and never disappoint — and how our members find themselves seated at all of them.',
        date: 'June 2026',
        readTime: '6 min read',
        pullQuote: 'The best tables in Dubai are not booked. They are granted.',
        body: [
          'There is a particular silence that falls over a great dining room at eight in the evening — the hush of a kitchen that has rehearsed all afternoon, of sommeliers moving like stagehands before curtain. In Dubai, that silence is guarded more carefully than anywhere else on earth. The city’s finest rooms do not take reservations in any meaningful sense. They take references.',
          'Consider the chef’s counter hidden behind an unmarked door in DIFC, where eleven seats face a single flame and the menu is decided that morning at the fish market. There is no phone number. There has never been a website. The waiting list, if you can call it that, is a ledger of names vouched for by other names — a quiet economy of trust that no amount of persistence can shortcut.',
          'Our members do not join that queue. Over two decades we have built something rarer than access: familiarity. The maître d’ knows our concierges by voice. When we call about an anniversary, the kitchen already knows the vintage that was poured at the wedding. This is the difference between a booking service and a concierge — one asks for a table, the other is expected.',
          'What follows the door matters just as much. The right table in the room, the pacing of the evening, the discreet settlement of the bill before dessert arrives — these are details most guests never notice because they have never dined without them. Our members notice only that every evening simply works.',
          'The seven rooms we are thinking of will remain unnamed here, for the same reason they remain extraordinary: discretion is the ingredient that cannot be substituted. But if you would like to know how it feels to be expected at all of them, you already know how to reach us.',
        ],
      },
      fr: {
        category: 'Dubaï Confidentiel',
        title: 'Les Tables Qui Méritent de Traverser le Monde',
        excerpt:
          'Sept salles à manger qui ne font jamais de publicité, jamais de remise, et ne déçoivent jamais — et comment nos membres se retrouvent attablés à chacune d’elles.',
        date: 'Juin 2026',
        readTime: '6 min de lecture',
        pullQuote: 'Les meilleures tables de Dubaï ne se réservent pas. Elles s’accordent.',
        body: [
          'Il existe un silence particulier qui s’installe dans une grande salle à manger à huit heures du soir — le calme d’une cuisine qui a répété tout l’après-midi, de sommeliers qui se déplacent comme des machinistes avant le lever de rideau. À Dubaï, ce silence est gardé plus jalousement que partout ailleurs. Les plus belles salles de la ville ne prennent pas de réservations au sens propre. Elles prennent des références.',
          'Songez au comptoir du chef dissimulé derrière une porte sans enseigne au DIFC, où onze places font face à une seule flamme et où le menu se décide le matin même au marché aux poissons. Il n’y a pas de numéro de téléphone. Il n’y a jamais eu de site web. La liste d’attente, si l’on peut l’appeler ainsi, est un registre de noms recommandés par d’autres noms — une économie silencieuse de la confiance qu’aucune insistance ne peut contourner.',
          'Nos membres ne rejoignent pas cette file. En vingt ans, nous avons bâti quelque chose de plus rare que l’accès : la familiarité. Le maître d’hôtel reconnaît nos concierges à la voix. Quand nous appelons pour un anniversaire, la cuisine connaît déjà le millésime servi au mariage. C’est la différence entre un service de réservation et une conciergerie — l’un demande une table, l’autre est attendu.',
          'Ce qui suit la porte compte tout autant. La bonne table dans la salle, le rythme de la soirée, le règlement discret de l’addition avant l’arrivée du dessert — autant de détails que la plupart des convives ne remarquent jamais, faute d’avoir déjà dîné sans eux. Nos membres, eux, ne remarquent qu’une chose : chaque soirée fonctionne, tout simplement.',
          'Les sept salles auxquelles nous pensons resteront ici sans nom, pour la raison même qui les rend extraordinaires : la discrétion est l’ingrédient qui ne se remplace pas. Mais si vous souhaitez savoir ce que l’on ressent à être attendu dans chacune d’elles, vous savez déjà comment nous joindre.',
        ],
      },
      ar: {
        category: 'دبي من الداخل',
        title: 'طاولات تستحق عبور العالم من أجلها',
        excerpt:
          'سبع قاعات طعام لا تعلن أبداً، ولا تخفّض أسعارها أبداً، ولا تخيّب الظن أبداً — وكيف يجد أعضاؤنا أنفسهم جالسين إليها جميعاً.',
        date: 'يونيو 2026',
        readTime: '6 دقائق قراءة',
        pullQuote: 'أفضل الطاولات في دبي لا تُحجز. بل تُمنح.',
        body: [
          'ثمة صمت خاص يخيّم على قاعة طعام عريقة في الثامنة مساءً — سكون مطبخ تدرّب طوال الظهيرة، وسقاة نبيذ يتحركون كعمال مسرح قبل رفع الستارة. في دبي، يُحرس هذا الصمت بعناية تفوق أي مكان آخر على وجه الأرض. أرقى قاعات المدينة لا تقبل الحجوزات بالمعنى المتعارف عليه. إنها تقبل التزكيات.',
          'تأمّل كاونتر الشيف المخفي خلف باب بلا لافتة في مركز دبي المالي العالمي، حيث أحد عشر مقعداً تواجه لهباً واحداً، وقائمة الطعام تتقرر صباح اليوم نفسه في سوق السمك. لا يوجد رقم هاتف. ولم يكن هناك موقع إلكتروني قط. قائمة الانتظار، إن صح تسميتها كذلك، سجلّ من أسماء زكّتها أسماء أخرى — اقتصاد هادئ من الثقة لا يختصره أي قدر من الإلحاح.',
          'أعضاؤنا لا ينضمون إلى ذلك الطابور. على مدى عقدين بنينا شيئاً أندر من الوصول: الألفة. كبير المضيفين يعرف أصوات موظفينا. حين نتصل بشأن ذكرى زواج، يعرف المطبخ مسبقاً النبيذ الذي قُدّم في حفل الزفاف. هذا هو الفرق بين خدمة حجوزات وكونسيرج — الأول يطلب طاولة، والثاني يكون في الانتظار.',
          'وما يلي الباب لا يقل أهمية. الطاولة الصحيحة في القاعة، وإيقاع الأمسية، وتسوية الفاتورة بتكتم قبل وصول الحلوى — تفاصيل لا يلحظها معظم الضيوف لأنهم لم يتعشوا يوماً من دونها. أما أعضاؤنا فلا يلحظون سوى أن كل أمسية تسير ببساطة كما ينبغي.',
          'القاعات السبع التي نفكر فيها ستبقى هنا بلا أسماء، للسبب نفسه الذي يبقيها استثنائية: السرية هي المكوّن الذي لا بديل له. لكن إن أردت أن تعرف شعور أن تكون منتظَراً فيها جميعاً، فأنت تعرف مسبقاً كيف تصل إلينا.',
        ],
      },
    },
  },
  {
    slug: 'quiet-rules-of-private-aviation',
    img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2000&auto=format&fit=crop',
    alt: 'Aircraft above the clouds at golden hour',
    content: {
      en: {
        category: 'Travel',
        title: 'Wheels Up: The Quiet Rules of Private Aviation',
        excerpt:
          'What seasoned flyers know about slots, crews, and the art of leaving on your own time.',
        date: 'May 2026',
        readTime: '5 min read',
        pullQuote: 'A jet does not make you punctual. A crew that knows you does.',
        body: [
          'The romance of private aviation is the departure lounge you never see. No queue, no announcement, no gate. A car that drives onto the apron, a captain who greets you by name, and a door that closes the moment you are ready — not the moment the schedule says so.',
          'But the seasoned flyer knows the romance is engineered. Behind every effortless departure sits a small war of logistics: landing slots at congested fields, crew duty hours calculated to the minute, catering that must arrive chilled through forty-degree heat, clearances that certain airspaces grant slowly and revoke quickly. The difference between a smooth journey and a stranded one is almost never the aircraft. It is who arranged it.',
          'This is why we maintain relationships with operators rather than platforms. An app can show you a tail number; it cannot call in a favour when the fog closes Farnborough and forty jets are fighting for diversions. Our aviation desk has spent years learning which operators say yes at three in the morning — and which merely advertise that they do.',
          'There are quiet rules our members absorb over time. Book the crew, not just the plane — a familiar cabin attendant is worth more than a newer interior. Never let the itinerary drive the aircraft choice; let the shortest runway on your route decide. And leave the paperwork — permits, slots, customs pre-clearance — to people who do it daily, because aviation bureaucracy punishes amateurs with delays it never explains.',
          'The result, when it is done properly, is the rarest luxury in modern travel: a journey that bends to your day rather than the reverse. Wheels up when you say so. That is the entire point.',
        ],
      },
      fr: {
        category: 'Voyage',
        title: 'Décollage : Les Règles Silencieuses de l’Aviation Privée',
        excerpt:
          'Ce que les voyageurs aguerris savent des créneaux, des équipages, et de l’art de partir à son heure.',
        date: 'Mai 2026',
        readTime: '5 min de lecture',
        pullQuote: 'Un jet ne vous rend pas ponctuel. Un équipage qui vous connaît, si.',
        body: [
          'Le romantisme de l’aviation privée, c’est le salon d’embarquement que vous ne voyez jamais. Pas de file, pas d’annonce, pas de porte. Une voiture qui roule jusqu’au tarmac, un commandant qui vous accueille par votre nom, et une porte qui se ferme dès que vous êtes prêt — et non quand l’horaire le décide.',
          'Mais le voyageur aguerri sait que ce romantisme est une affaire d’ingénierie. Derrière chaque départ sans effort se joue une petite guerre logistique : créneaux d’atterrissage sur des terrains saturés, heures de service d’équipage calculées à la minute, traiteur qui doit arriver frais par quarante degrés, autorisations que certains espaces aériens accordent lentement et retirent vite. La différence entre un voyage fluide et un voyage immobilisé ne tient presque jamais à l’appareil. Elle tient à qui l’a organisé.',
          'C’est pourquoi nous entretenons des relations avec des opérateurs plutôt qu’avec des plateformes. Une application peut vous montrer une immatriculation ; elle ne peut pas solliciter une faveur quand le brouillard ferme Farnborough et que quarante jets se disputent les déroutements. Notre bureau aviation a passé des années à apprendre quels opérateurs disent oui à trois heures du matin — et lesquels se contentent de le prétendre.',
          'Il y a des règles silencieuses que nos membres assimilent avec le temps. Réservez l’équipage, pas seulement l’avion — un personnel de cabine familier vaut mieux qu’un intérieur plus récent. Ne laissez jamais l’itinéraire dicter le choix de l’appareil ; laissez la piste la plus courte de votre route en décider. Et confiez la paperasse — permis, créneaux, pré-dédouanement — à ceux qui la traitent quotidiennement, car la bureaucratie aérienne punit les amateurs par des retards qu’elle n’explique jamais.',
          'Le résultat, quand tout est fait dans les règles de l’art, est le luxe le plus rare du voyage moderne : un trajet qui se plie à votre journée plutôt que l’inverse. Décollage quand vous le dites. C’est tout l’enjeu.',
        ],
      },
      ar: {
        category: 'سفر',
        title: 'إقلاع: القواعد الهادئة للطيران الخاص',
        excerpt:
          'ما يعرفه المسافرون المخضرمون عن مواعيد الهبوط والأطقم، وفنّ المغادرة في وقتك أنت.',
        date: 'مايو 2026',
        readTime: '5 دقائق قراءة',
        pullQuote: 'الطائرة لا تجعلك دقيقاً في مواعيدك. الطاقم الذي يعرفك هو من يفعل.',
        body: [
          'رومانسية الطيران الخاص هي صالة المغادرة التي لا تراها أبداً. لا طابور، ولا نداء، ولا بوابة. سيارة تسير حتى مدرج الطائرة، وقبطان يرحب بك باسمك، وباب يُغلق لحظة تكون جاهزاً — لا لحظة يقرر الجدول ذلك.',
          'لكن المسافر المخضرم يعرف أن هذه الرومانسية مهندَسة بدقة. خلف كل مغادرة سلسة تدور معركة لوجستية صغيرة: مواعيد هبوط في مطارات مزدحمة، وساعات عمل أطقم تُحسب بالدقيقة، وتموين يجب أن يصل بارداً عبر حرارة الأربعين درجة، وتصاريح تمنحها بعض الأجواء ببطء وتسحبها بسرعة. الفرق بين رحلة سلسة وأخرى عالقة لا يعود أبداً تقريباً إلى الطائرة. بل إلى من رتّبها.',
          'لهذا نحافظ على علاقات مع المشغّلين لا مع المنصات. التطبيق يمكن أن يريك رقم ذيل الطائرة؛ لكنه لا يستطيع طلب معروف حين يغلق الضباب مطار فارنبورو وتتنافس أربعون طائرة على مسارات بديلة. مكتب الطيران لدينا أمضى سنوات يتعلم أي المشغّلين يقولون نعم في الثالثة فجراً — وأيهم يكتفون بالإعلان عن ذلك.',
          'ثمة قواعد هادئة يتشرّبها أعضاؤنا مع الوقت. احجز الطاقم، لا الطائرة فحسب — فمضيفة تعرفك أثمن من مقصورة أحدث. ولا تدع البرنامج يفرض اختيار الطائرة؛ بل دع أقصر مدرج في مسارك يقرر. واترك الأوراق — التصاريح والمواعيد والتخليص الجمركي المسبق — لمن يمارسونها يومياً، لأن بيروقراطية الطيران تعاقب الهواة بتأخيرات لا تشرحها أبداً.',
          'والنتيجة، حين يُنجز الأمر كما ينبغي، هي أندر رفاهية في السفر الحديث: رحلة تنحني لجدول يومك لا العكس. الإقلاع حين تقول أنت. هذا هو المغزى كله.',
        ],
      },
    },
  },
  {
    slug: 'weekend-that-never-touched-the-ground',
    img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2000&auto=format&fit=crop',
    alt: 'Yacht on open turquoise water',
    content: {
      en: {
        category: 'Lifestyle',
        title: 'A Weekend That Never Touched the Ground',
        excerpt:
          'Yacht at dawn, desert by dusk — an itinerary composed for one family, never repeated.',
        date: 'May 2026',
        readTime: '4 min read',
        pullQuote: 'The itinerary was destroyed afterwards. Some weekends should exist only in memory.',
        body: [
          'The brief arrived on a Tuesday, in one line: “Three generations, one weekend, nothing they have done before.” The family had, between them, done nearly everything. That is the kind of brief we like best.',
          'Saturday began on the water, before the sun. A ninety-foot yacht slipped out of the marina while the city still slept, the grandfather standing at the bow with coffee as the skyline caught fire behind him. The crew had been briefed on everything — the grandmother’s preference for shade, the children’s allergy list, the father’s standing rule that no phone appears at any table. Breakfast was served at anchor off a sandbank that exists only at low tide.',
          'By late afternoon the family was airborne, tracing the coastline south, and by dusk they stood on a private dune plateau an hour beyond the last road. A Bedouin camp had been raised that morning for one night only: firepits, falcons, a table dressed in linen and brass under a sky with no light pollution for thirty kilometres. Dinner was cooked over coals by a chef who had flown in from the family’s favourite restaurant — a detail no one had requested, which is precisely why it mattered.',
          'Sunday, the camp vanished. By the time the family landed back in the city, rested and sand-dusted, there was no trace it had ever existed. The itinerary document was destroyed, as agreed. Some weekends should exist only in memory — and in the retelling, at tables, for years.',
          'No two of these weekends are alike, because no two families are. Tell us who is coming and what they think they have already seen. We will take it from there.',
        ],
      },
      fr: {
        category: 'Art de Vivre',
        title: 'Un Week-end Qui n’a Jamais Touché Terre',
        excerpt:
          'Yacht à l’aube, désert au crépuscule — un itinéraire composé pour une seule famille, jamais répété.',
        date: 'Mai 2026',
        readTime: '4 min de lecture',
        pullQuote: 'L’itinéraire fut détruit ensuite. Certains week-ends ne doivent exister que dans la mémoire.',
        body: [
          'Le brief est arrivé un mardi, en une ligne : « Trois générations, un week-end, rien qu’ils aient déjà fait. » La famille, à elle seule, avait presque tout fait. C’est le genre de brief que nous préférons.',
          'Le samedi a commencé sur l’eau, avant le soleil. Un yacht de vingt-sept mètres a quitté la marina pendant que la ville dormait encore, le grand-père debout à la proue, café en main, tandis que la skyline s’embrasait derrière lui. L’équipage avait été briefé sur tout — la préférence de la grand-mère pour l’ombre, la liste d’allergies des enfants, la règle immuable du père : aucun téléphone à table. Le petit-déjeuner fut servi au mouillage, au large d’un banc de sable qui n’existe qu’à marée basse.',
          'En fin d’après-midi, la famille était dans les airs, longeant la côte vers le sud, et au crépuscule elle se tenait sur un plateau de dunes privé, à une heure au-delà de la dernière route. Un campement bédouin avait été dressé le matin même pour une seule nuit : braseros, faucons, une table habillée de lin et de laiton sous un ciel sans pollution lumineuse à trente kilomètres à la ronde. Le dîner fut cuit sur les braises par un chef venu par avion du restaurant préféré de la famille — un détail que personne n’avait demandé, et c’est précisément pour cela qu’il comptait.',
          'Le dimanche, le campement avait disparu. Lorsque la famille s’est posée en ville, reposée et poudrée de sable, il n’en restait aucune trace. Le document d’itinéraire fut détruit, comme convenu. Certains week-ends ne doivent exister que dans la mémoire — et dans les récits, à table, pendant des années.',
          'Aucun de ces week-ends ne ressemble à un autre, car aucune famille ne ressemble à une autre. Dites-nous qui vient et ce qu’ils pensent avoir déjà vu. Nous nous chargeons du reste.',
        ],
      },
      ar: {
        category: 'أسلوب حياة',
        title: 'عطلة أسبوع لم تلامس الأرض قط',
        excerpt:
          'يخت عند الفجر، وصحراء عند الغسق — برنامج صيغ لعائلة واحدة، ولن يتكرر أبداً.',
        date: 'مايو 2026',
        readTime: '4 دقائق قراءة',
        pullQuote: 'أُتلف البرنامج بعدها. بعض العطلات ينبغي ألا توجد إلا في الذاكرة.',
        body: [
          'وصل الطلب يوم ثلاثاء، في سطر واحد: «ثلاثة أجيال، عطلة أسبوع واحدة، ولا شيء سبق أن جرّبوه.» والعائلة، مجتمعةً، كانت قد جرّبت كل شيء تقريباً. وهذا هو نوع الطلبات الذي نحبه أكثر.',
          'بدأ السبت على الماء، قبل شروق الشمس. انسلّ يخت بطول تسعين قدماً من المارينا والمدينة ما تزال نائمة، والجدّ واقف عند المقدمة بقهوته بينما تشتعل ناطحات السحاب خلفه بألوان الفجر. كان الطاقم قد أُحيط علماً بكل شيء — تفضيل الجدة للظل، وقائمة حساسيات الأطفال، وقاعدة الأب الثابتة بألا يظهر هاتف على أي طاولة. قُدّم الفطور والمرساة ملقاة قبالة ضفة رملية لا توجد إلا عند الجزر.',
          'بحلول العصر كانت العائلة في الجو، تتبع الساحل جنوباً، وعند الغسق وقفوا على هضبة كثبان خاصة تبعد ساعة عن آخر طريق. كان مخيم بدوي قد نُصب صباح ذلك اليوم لليلة واحدة فقط: مواقد نار، وصقور، وطاولة كُسيت بالكتان والنحاس تحت سماء لا تلوث ضوئي فيها على امتداد ثلاثين كيلومتراً. طُهي العشاء على الجمر بيد شيف استُقدم بالطائرة من مطعم العائلة المفضل — تفصيلة لم يطلبها أحد، ولهذا بالضبط كانت مهمة.',
          'يوم الأحد، اختفى المخيم. وحين هبطت العائلة عائدة إلى المدينة، مرتاحةً وعليها غبار الرمال، لم يكن ثمة أثر يدل على أنه وُجد يوماً. أُتلفت وثيقة البرنامج كما اتُفق. بعض العطلات ينبغي ألا توجد إلا في الذاكرة — وفي الحكايات، على الموائد، لسنوات.',
          'لا تتشابه اثنتان من هذه العطلات، لأنه لا تتشابه عائلتان. أخبرنا من سيأتي وما الذي يظنون أنهم رأوه من قبل. ونحن نتولى الأمر من هناك.',
        ],
      },
    },
  },
  {
    slug: 'the-address-you-never-see-listed',
    img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2000&auto=format&fit=crop',
    alt: 'Modern waterfront villa lit at dusk',
    content: {
      en: {
        category: 'Residences',
        title: 'The Address You Will Never See Listed',
        excerpt:
          'Inside Dubai’s quiet market — where the finest homes change hands over coffee, not portals.',
        date: 'April 2026',
        readTime: '5 min read',
        pullQuote: 'By the time a great home is listed, the people it was meant for have already seen it.',
        body: [
          'Every city has two property markets. There is the one you can browse — portals, glossy brochures, weekend viewings — and there is the one that moves by introduction, where the finest addresses change ownership without a single photograph leaving a private folder. In Dubai, the gap between the two has never been wider.',
          'The reasons are simple. Owners of exceptional homes rarely need to sell, and never need to advertise. A listing invites tourists of the imagination; an introduction invites a buyer. So the palm-frond villa with its own beach, the penthouse whose terrace wraps three exposures of skyline, the courtyard house in the old district restored over four patient years — these trade quietly, between families, over coffee.',
          'Access to that market is not bought. It is accumulated — through years of transactions handled discreetly, of buyers who proved serious and sellers who were never embarrassed. Our real-estate desk exists inside that web of trust. When something remarkable is about to become available, we tend to hear of it in the week before the decision is final, which is exactly when the right buyer should appear.',
          'For our members, the process is inverted. Rather than searching, they describe: the light they want in the morning, the schools, the water, the privacy line they will not cross. Then the market comes to them — quietly, one address at a time, each seen before anyone else knows it exists.',
          'The best homes in this city will never reach a portal. If you would like to see what never gets listed, the conversation starts with us.',
        ],
      },
      fr: {
        category: 'Résidences',
        title: 'L’Adresse Que Vous Ne Verrez Jamais en Annonce',
        excerpt:
          'Au cœur du marché silencieux de Dubaï — où les plus belles demeures changent de mains autour d’un café, pas sur les portails.',
        date: 'Avril 2026',
        readTime: '5 min de lecture',
        pullQuote: 'Quand une grande demeure est mise en vente, ceux à qui elle était destinée l’ont déjà vue.',
        body: [
          'Chaque ville a deux marchés immobiliers. Il y a celui que l’on peut parcourir — portails, brochures sur papier glacé, visites du week-end — et celui qui fonctionne par introduction, où les plus belles adresses changent de propriétaire sans qu’une seule photographie ne quitte un dossier privé. À Dubaï, l’écart entre les deux n’a jamais été aussi grand.',
          'Les raisons sont simples. Les propriétaires de demeures exceptionnelles ont rarement besoin de vendre, et jamais besoin de faire de la publicité. Une annonce attire les touristes de l’imagination ; une introduction attire un acheteur. Ainsi la villa sur la Palme avec sa plage privée, le penthouse dont la terrasse embrasse trois expositions de skyline, la maison à patio du vieux quartier restaurée en quatre patientes années — tout cela s’échange discrètement, entre familles, autour d’un café.',
          'L’accès à ce marché ne s’achète pas. Il s’accumule — au fil d’années de transactions menées avec discrétion, d’acheteurs qui ont prouvé leur sérieux et de vendeurs qui n’ont jamais été embarrassés. Notre bureau immobilier vit à l’intérieur de ce réseau de confiance. Quand quelque chose de remarquable est sur le point de se libérer, nous en entendons parler la semaine qui précède la décision finale — exactement le moment où le bon acheteur doit apparaître.',
          'Pour nos membres, le processus est inversé. Plutôt que de chercher, ils décrivent : la lumière qu’ils veulent le matin, les écoles, l’eau, la ligne de confidentialité qu’ils ne franchiront pas. Puis le marché vient à eux — discrètement, une adresse à la fois, chacune vue avant que quiconque ne sache qu’elle existe.',
          'Les plus belles demeures de cette ville n’atteindront jamais un portail. Si vous souhaitez voir ce qui n’est jamais mis en annonce, la conversation commence avec nous.',
        ],
      },
      ar: {
        category: 'مساكن',
        title: 'العنوان الذي لن تراه معروضاً أبداً',
        excerpt:
          'داخل سوق دبي الهادئ — حيث تنتقل أرقى المنازل بين الأيدي على فنجان قهوة، لا عبر المواقع.',
        date: 'أبريل 2026',
        readTime: '5 دقائق قراءة',
        pullQuote: 'حين يُعرض منزل عظيم للبيع، يكون من قُصد لهم قد رأوه بالفعل.',
        body: [
          'لكل مدينة سوقان للعقارات. هناك السوق الذي يمكنك تصفحه — مواقع وكتيبات لامعة وجولات نهاية الأسبوع — وهناك السوق الذي يتحرك بالتعارف، حيث تنتقل ملكية أرقى العناوين دون أن تغادر صورة واحدة مجلداً خاصاً. وفي دبي، لم تكن الفجوة بين الاثنين أوسع مما هي اليوم.',
          'الأسباب بسيطة. مالكو المنازل الاستثنائية نادراً ما يحتاجون إلى البيع، ولا يحتاجون أبداً إلى الإعلان. الإعلان يستدعي سيّاح الخيال؛ أما التعارف فيستدعي مشترياً. وهكذا فإن فيلا النخلة بشاطئها الخاص، والبنتهاوس الذي تلتف شرفته على ثلاث واجهات من ناطحات السحاب، وبيت الفناء في الحي القديم الذي رُمم على مدى أربع سنوات صبورة — كلها تُتداول بهدوء، بين العائلات، على فنجان قهوة.',
          'الوصول إلى ذلك السوق لا يُشترى. بل يُراكم — عبر سنوات من صفقات أُديرت بتكتم، ومشترين أثبتوا جديتهم، وبائعين لم يُحرَجوا قط. مكتبنا العقاري يعيش داخل شبكة الثقة تلك. حين يوشك شيء استثنائي أن يصبح متاحاً، نسمع به عادة في الأسبوع الذي يسبق القرار النهائي — وهي بالضبط اللحظة التي ينبغي أن يظهر فيها المشتري المناسب.',
          'بالنسبة إلى أعضائنا، العملية معكوسة. فبدل البحث، يصفون: الضوء الذي يريدونه صباحاً، والمدارس، والماء، وخط الخصوصية الذي لن يتجاوزوه. ثم يأتي السوق إليهم — بهدوء، عنواناً تلو الآخر، وكل عنوان يُرى قبل أن يعلم أحد بوجوده.',
          'أفضل منازل هذه المدينة لن تصل إلى المواقع أبداً. إن أردت أن ترى ما لا يُعرض أبداً، فالحديث يبدأ معنا.',
        ],
      },
    },
  },
  {
    slug: 'dubai-after-midnight',
    img: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2000&auto=format&fit=crop',
    alt: 'City skyline glowing at night',
    content: {
      en: {
        category: 'The City',
        title: 'Dubai After Midnight, Properly Done',
        excerpt: 'Where the evening actually begins when the famous rooms close their doors.',
        date: 'April 2026',
        readTime: '4 min read',
        pullQuote: 'The city you can find on a map closes at midnight. The other one is just waking up.',
        body: [
          'Every guidebook agrees on where to spend an evening in Dubai, which is precisely why those rooms are full of people holding guidebooks. The city that interests us begins later — after the famous terraces have called last orders and the valets have gone quiet.',
          'There is the listening bar that seats twenty, where a collector plays first pressings through a sound system worth more than the building, and entry is a name whispered at an unmarked door. There is the rooftop omakase that starts at one in the morning for an audience of chefs who have just closed their own kitchens. There is the majlis in the old town where the coffee is bitter, the conversation is better, and the guest list has been curated for thirty years by one man who has never written it down.',
          'None of this is secret, exactly. It is simply private — a distinction Dubai understands better than any city on earth. The doors are not hidden; they are selective. What our members carry is not a password but a reputation, extended to them by ours.',
          'The mechanics matter too, at that hour. The car that waits without being asked. The table that appears at two a.m. because someone called ahead. The quiet word that turns a full room into a room with one more seat. After midnight, improvisation is the enemy of elegance — everything that looks spontaneous has been arranged.',
          'The city you can find on a map closes at midnight. If you would like to meet the other one, we keep its hours.',
        ],
      },
      fr: {
        category: 'La Ville',
        title: 'Dubaï Après Minuit, dans les Règles de l’Art',
        excerpt: 'Là où la soirée commence vraiment, quand les salles célèbres ferment leurs portes.',
        date: 'Avril 2026',
        readTime: '4 min de lecture',
        pullQuote: 'La ville que l’on trouve sur une carte ferme à minuit. L’autre est en train de se réveiller.',
        body: [
          'Tous les guides s’accordent sur les endroits où passer une soirée à Dubaï — et c’est précisément pour cela que ces salles sont remplies de gens qui tiennent des guides. La ville qui nous intéresse commence plus tard — après que les terrasses célèbres ont annoncé la dernière commande et que les voituriers se sont tus.',
          'Il y a ce bar d’écoute de vingt places, où un collectionneur passe des premiers pressages sur un système audio qui vaut plus cher que l’immeuble, et où l’entrée est un nom murmuré à une porte sans enseigne. Il y a l’omakase de toit qui commence à une heure du matin pour un public de chefs qui viennent de fermer leurs propres cuisines. Il y a le majlis de la vieille ville où le café est amer, la conversation meilleure, et où la liste des invités est composée depuis trente ans par un seul homme qui ne l’a jamais couchée sur papier.',
          'Rien de tout cela n’est secret, à proprement parler. C’est simplement privé — une distinction que Dubaï comprend mieux que toute autre ville au monde. Les portes ne sont pas cachées ; elles sont sélectives. Ce que portent nos membres n’est pas un mot de passe mais une réputation — la nôtre, qui leur est prêtée.',
          'La mécanique compte aussi, à cette heure-là. La voiture qui attend sans qu’on le demande. La table qui apparaît à deux heures du matin parce que quelqu’un a appelé avant. Le mot glissé qui transforme une salle comble en une salle avec une place de plus. Après minuit, l’improvisation est l’ennemie de l’élégance — tout ce qui semble spontané a été arrangé.',
          'La ville que l’on trouve sur une carte ferme à minuit. Si vous voulez rencontrer l’autre, nous en gardons les horaires.',
        ],
      },
      ar: {
        category: 'المدينة',
        title: 'دبي بعد منتصف الليل، كما ينبغي',
        excerpt: 'حيث تبدأ الأمسية فعلاً حين تغلق الأماكن الشهيرة أبوابها.',
        date: 'أبريل 2026',
        readTime: '4 دقائق قراءة',
        pullQuote: 'المدينة التي تجدها على الخريطة تغلق عند منتصف الليل. أما الأخرى فتستيقظ للتو.',
        body: [
          'تتفق كل الأدلة السياحية على أماكن قضاء الأمسية في دبي، ولهذا بالضبط تمتلئ تلك الأماكن بأشخاص يحملون أدلة سياحية. المدينة التي تعنينا تبدأ متأخرة — بعد أن تعلن الشرفات الشهيرة آخر طلباتها ويخفت صوت عمال المواقف.',
          'هناك بار الاستماع الذي يتسع لعشرين شخصاً، حيث يُشغّل أحد الجامعين نسخاً أصلية أولى عبر نظام صوتي يفوق ثمنه ثمن المبنى، والدخول اسمٌ يُهمس به عند باب بلا لافتة. وهناك الأوماكاسيه على السطح الذي يبدأ في الواحدة فجراً لجمهور من الطهاة الذين أغلقوا للتو مطابخهم. وهناك المجلس في المدينة القديمة حيث القهوة مُرّة، والحديث أطيب، وقائمة الضيوف يرعاها منذ ثلاثين عاماً رجل واحد لم يدوّنها قط.',
          'لا شيء من هذا سري بالمعنى الدقيق. إنه ببساطة خاص — وهو تمييز تفهمه دبي أفضل من أي مدينة على وجه الأرض. الأبواب ليست مخفية؛ بل انتقائية. وما يحمله أعضاؤنا ليس كلمة سر بل سمعة — سمعتنا، الممنوحة لهم.',
          'وللتفاصيل شأنها أيضاً في تلك الساعة. السيارة التي تنتظر دون أن يُطلب منها. الطاولة التي تظهر في الثانية فجراً لأن أحدهم اتصل مسبقاً. الكلمة الهادئة التي تحوّل قاعة ممتلئة إلى قاعة فيها مقعد إضافي. بعد منتصف الليل، الارتجال عدو الأناقة — فكل ما يبدو عفوياً قد رُتّب سلفاً.',
          'المدينة التي تجدها على الخريطة تغلق عند منتصف الليل. إن أردت أن تلتقي بالأخرى، فنحن نحفظ مواعيدها.',
        ],
      },
    },
  },
]

export function getArticle(slug: string): JournalArticle | undefined {
  return articles.find(a => a.slug === slug)
}

export function getArticleContent(article: JournalArticle, locale: string): ArticleContent {
  return article.content[locale as Locale] ?? article.content.en
}
