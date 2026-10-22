import type { CefrLevel, LanguageCode } from "./languages";
import { getSyllabusUnits, toCurriculumUnit } from "./syllabus";

/**
 * المنهج: وحدات خطية لكل مستوى. كل وحدة = جلسة واحدة.
 *
 * الوحدات وصفية (بالعربي) مش قوائم كلمات جاهزة — المدرّس الذكي بيولّد
 * المفردات والجمل بلغة الهدف جوّا الجلسة بناءً على: (عنوان الوحدة +
 * القاعدة + اهتمامات المستخدم + هدفه). عشان كده نفس الوحدات تنفع
 * للـ 4 لغات من غير تكرار محتوى.
 *
 * التسلسل خطي: unit 0 → 1 → 2 ... داخل مستوى المستخدم. لو الجلسة كانت
 * قصيرة (<60% من الوقت) الوحدة بتتكرر الجاية، مش بتتخطى.
 */

export type Sublevel = "1" | "2";

export interface CurriculumUnit {
  /** معرف فريد للوحدة، "a1-1-u03" أو "a1-u03" */
  id: string;
  /** المستوى العام */
  level?: CefrLevel;
  /** تقسيم المستوى لنصين (A1.1 / A1.2) */
  sublevel?: Sublevel;
  /** عنوان الوحدة بالعربية واضحًا وواضحًا للجميع */
  titleAr: string;
  /** عنوان طبيعي أقرب للحديث اليومي */
  titleNatural?: string;
  /** هدف الجلسة بصيغة "Can-Do" */
  goal?: string;
  /** القاعدة المقترحة للوحدة بالعربية (وصف مختصر - اقتراح فقط) */
  grammarAr?: string;
  /** قواعد أساسية يجب تغطيتها فعلاً */
  coreGrammar?: string[];
  /** مواضيع المفردات المقترحة (اقتراحات) */
  vocabThemes?: string[];
  /** مفردات أساسية يجب تغطيتها */
  coreVocab?: string[];
  /** أمثلة جمل مقترحة */
  samplePhrases?: string[];
  /** ضروري جداً: أقل حاجة يجب أن يخرج بها المتعلم */
  mustCover?: string[];
  /** مسموح به بحرية: مواضيع يمكن الارتجال فيها والهزار حولها */
  canExplore?: string[];
  /** نبرة مقترحة للجلسة */
  tone?: "playful" | "neutral" | "warm";
}

const A1_UNITS: CurriculumUnit[] = [
  {
    id: "a1-u01",
    titleAr: "التحيات والتعريف بالنفس",
    grammarAr: "جملة الفعل 'to be' في المضارع + ضمائر الفاعل (I, you, he/she)",
    vocabThemes: ["تحيات الصباح والمساء", "التعريف بالاسم والجنسية", "الترحيب والوداع"],
    samplePhrases: ["أنا اسمي...", "أنا من مصر", "صباح الخير، عامل إيه؟"],
  },
  {
    id: "a1-u02",
    titleAr: "الأرقام والوقت",
    grammarAr: "الأرقام 1–100 + السؤال عن الوقت + عبارات الوقت (early/late)",
    vocabThemes: ["الرقام", "ساعة ونصف", "الأيام والتواريخ"],
    samplePhrases: ["كام الساعة دلوقتي؟", "عندي موعد الساعة 3", "النهارده إيه يوم؟"],
  },
  {
    id: "a1-u03",
    titleAr: "العائلة والأصدقاء",
    grammarAr: "ضمائر الملكية (my, your, his, her) + 'this is' للتعريف",
    vocabThemes: ["أفراد العائلة", "الأصدقاء", "الوصف البسيط (طويل/قصير، كبير/صغير)"],
    samplePhrases: ["دي أختي", "عندي صاحب اسمه...", "أبويا شغال..."],
  },
  {
    id: "a1-u04",
    titleAr: "الأكل والشرب",
    grammarAr: "أفعال like/want/have + 'some/any' مع المعدود",
    vocabThemes: ["أكل البيت والمطعم", "مشروبات", "طلب الأكل والشرب"],
    samplePhrases: ["أنا عايز مية", "بتحب الأكل إيه؟", "الحساب لو سمحت"],
  },
  {
    id: "a1-u05",
    titleAr: "الطقس والأجواء",
    grammarAr: "صفات الطقس مع 'it is' (hot, cold, sunny, rainy)",
    vocabThemes: ["جو الصيف والشتاء", "الحرارة والثلج والمطر", "الملابس حسب الطقس"],
    samplePhrases: ["الجو حلو النهارده", "بره الجو برد قوي", "عمّال تمطر"],
  },
  {
    id: "a1-u06",
    titleAr: "الأماكن والمدينة",
    grammarAr: "حروف الجر (in, at, near) + 'there is / there are'",
    vocabThemes: ["أماكن في المدينة", "المواصلات", "الاتجاهات البسيطة"],
    samplePhrases: ["فين الحمام؟", "في محل قهوة هنا", "روح يمين"],
  },
  {
    id: "a1-u07",
    titleAr: "الأسئلة الأساسية",
    grammarAr: "أدوات الاستفهام (what, where, when, who, how) + صيغة السؤال",
    vocabThemes: ["الأسئلة اليومية", "طلب توضيح", "الإجابة القصيرة"],
    samplePhrases: ["إيه ده بالظبط؟", "إزاي بتنطقها؟", "امتى بتفتحوا؟"],
  },
  {
    id: "a1-u08",
    titleAr: "الروتين اليومي",
    grammarAr: "المضارع البسيط (I go, I eat, I work) + ظروف التكرار (always, usually)",
    vocabThemes: ["من الصبح للليل", "الشغل والدراسة", "النوم والاستيقاظ"],
    samplePhrases: ["باصحى الساعة 7", "كل يوم باروح الشغل", "بالنوم بدري"],
  },
  {
    id: "a1-u09",
    titleAr: "التسوق والأسعار",
    grammarAr: "أفعال الشراء + 'how much' + المقارنة البسيطة (cheaper, bigger)",
    vocabThemes: ["ملابس", "سوبرماركت", "النقاش على السعر"],
    samplePhrases: ["كام ده؟", "غالي أوي!", "لو سمحت هات لي مقاس..."],
  },
  {
    id: "a1-u10",
    titleAr: "الصحة والجسم",
    grammarAr: "الحالات مع 'feel' + 'have got' للتعبير عن الألم",
    vocabThemes: ["ألم أسنان وصداع", "الصيدلية والدكتور", "نصائح صحية بسيطة"],
    samplePhrases: ["عندي صداع", "حاسس بدوخة", "محتاج دكتور أسنان"],
  },
  {
    id: "a1-u11",
    titleAr: "الهوايات والاهتمامات",
    grammarAr: "'can' للقدرة + 'usually' مع الأفعال",
    vocabThemes: ["الرياضة", "الألعاب", "القراءة والموسيقى"],
    samplePhrases: ["بتلعب كورة؟", "بقرأ كتير", "أنا بحب الأفلام"],
  },
  {
    id: "a1-u12",
    titleAr: "مراجعة ومحادثة حرة مستوى A1",
    grammarAr: "مراجعة كل قواعد A1 في محادثة طبيعية",
    vocabThemes: ["مراجعة الكلمات المفتاحية من الوحدات السابقة", "سيناريوهات مختلطة"],
    samplePhrases: ["عرّفني بنفسك", "احكيلي عن يومك", "إيه اللي بتحب تعمله؟"],
  },
];

const A2_UNITS: CurriculumUnit[] = [
  {
    id: "a2-u01",
    titleAr: "الماضي ورواية الأحداث",
    grammarAr: "الماضي البسيط (regular/irregular) + ظروف الماضي (yesterday, last week)",
    vocabThemes: ["إجازة وسفر", "تقرير عن أسبوع كامل", "ذكريات الطفولة"],
    samplePhrases: ["إمبارح رحت...", "السنة اللي فاتت سافرت...", "أول مرة عملت..."],
  },
  {
    id: "a2-u02",
    titleAr: "طلب المساعدة وشرح المشكلات",
    grammarAr: " 'could you' + 'I need to' + الشرط البسيط (if... then)",
    vocabThemes: ["في الشارع", "في الفندق", "مشكلة تقنية بسيطة"],
    samplePhrases: ["ممكن تساعدني؟", "الموبايل مش شغال", "لو سمحت اشرحلي تاني"],
  },
  {
    id: "a2-u03",
    titleAr: "الرأي والتعبير عن المشاعر",
    grammarAr: " 'I think / I believe' + أفعال المشاعر (love, hate, prefer)",
    vocabThemes: ["رأي في فيلم/مسلسل", "ذوق في الأكل واللون", "حب وكره بسيط"],
    samplePhrases: ["أنا شايف إن...", "بكرة الفيديو ده", "أكتر حاجة بحبها..."],
  },
  {
    id: "a2-u04",
    titleAr: "المستقبل والخطط",
    grammarAr: " 'going to' vs 'will' + 'might' للاحتمال",
    vocabThemes: ["خطط نهاية الأسبوع", "أحلام ومستقبل", "مواعيد مؤكدة"],
    samplePhrases: ["هسافر الشهر الجاي", "ممكن أزورك بكرة", "عايز أبقى..."],
  },
  {
    id: "a2-u05",
    titleAr: "المقارنة والوصف المتقدم",
    grammarAr: "المقارنة (er/more) + الأدوار (the most) + 'as...as'",
    vocabThemes: ["مقارنة بين مدن", "مميزات وعيوب", "اختيار الأفضل"],
    samplePhrases: ["أكبر من...", "أحلى من كده بكتير", "أسوأ حاجة إن..."],
  },
  {
    id: "a2-u06",
    titleAr: "الصحة ونمط الحياة",
    grammarAr: " 'should / shouldn't' للنصيحة + 'used to' للعادات القديمة",
    vocabThemes: ["رياضة وصحة", "أكل صحي", "نصائح طبيب"],
    samplePhrases: ["لازم تاكل أحسن", "كنت باعمل رياضة كل يوم", "الدكتور قال..."],
  },
  {
    id: "a2-u07",
    titleAr: "السفر والمطار",
    grammarAr: " 'have to' + الماضي المستمر للتجربة",
    vocabThemes: ["مطار وجواز سفر", "فندق ومطعم", "خطة رحلة"],
    samplePhrases: ["لازم أعمل ريزيرفيشن", "الرحلة اتأخرت", "البيتشنج بوكس فين؟"],
  },
  {
    id: "a2-u08",
    titleAr: "الشغل والبريد",
    grammarAr: " 'will be doing' + أفعال العمل + صيغة الطلب المهذب",
    vocabThemes: ["وصف شغلك", "اجتماع ومواعيد", "إيميل بسيط"],
    samplePhrases: ["أشتغل في...", "عندي ميتينج الساعة...", "ممكن تبعتلي..."],
  },
  {
    id: "a2-u09",
    titleAr: "المنزل والأثاث",
    grammarAr: "حروف الجر المكانية المتقدمة + 'there isn't / aren't'",
    vocabThemes: ["غرف الشقة", "أثاث وأجهزة", "وصف مكانك"],
    samplePhrases: ["الصالون واسع", "مفيش مكان للتلفزيون", "أثثت الشقة بـ..."],
  },
  {
    id: "a2-u10",
    titleAr: "المشروبات والأكل المتقدم",
    grammarAr: " 'would you like' + الوصفات والطهي",
    vocabThemes: ["مكونات ووصفات", "مطعم ونقد الطعام", "أكل الشارع"],
    samplePhrases: ["الطبق ده طعمه...", "الطريقة سهلة جدًا", "لو رحت... بطلب..."],
  },
  {
    id: "a2-u11",
    titleAr: "القصة والحكاية",
    grammarAr: "الماضي المستمر + 'when / while' + ترتيب الأحداث",
    vocabThemes: ["حكاية قصيرة", "ذكريات مفصّلة", "أحداث متتابعة"],
    samplePhrases: ["كنت ماشي فـ...", "فجأة...", "بعد كده بقى..."],
  },
  {
    id: "a2-u12",
    titleAr: "مراجعة ومحادثة حرة مستوى A2",
    grammarAr: "مراجعة كل قواعد A2 في محادثة طبيعية",
    vocabThemes: ["مراجعة الكلمات المفتاحية", "سيناريوهات مختلطة"],
    samplePhrases: ["احكيلي عن آخر أسبوع", "إيه رأيك في...؟", "plans للعطلة؟"],
  },
];

const B1_UNITS: CurriculumUnit[] = [
  {
    id: "b1-u01",
    titleAr: "النقاش وإبداء الرأي بحرية",
    grammarAr: " 'although / however / because' + صياغة الحجج",
    vocabThemes: ["آراء واقتباسات", "مميزات وعيوب", "إقناع الطرف التاني"],
    samplePhrases: ["لو نظرنا للجانب...", "النقطة دي مهمة لأن...", "أنا متفق جزئيًا"],
  },
  {
    id: "b1-u02",
    titleAr: "العمل والمقابلات",
    grammarAr: " 'would' للتهذيب + 'responsible for' + وصف الخبرة",
    vocabThemes: ["مقابلة عمل", "مهارات وخبرات", "أهداف مهنية"],
    samplePhrases: ["عندي خبرة في...", "نقاط قوتي إن...", "الهدف من الشغل ده..."],
  },
  {
    id: "b1-u03",
    titleAr: "التلخيص وأخبار العالم",
    grammarAr: " 'reported speech' (بسيط) + حصر المصدر",
    vocabThemes: ["تلخيص خبر", "أسباب ونتائج", "آراء الناس"],
    samplePhrases: ["الخبر بيقول إن...", "السبب الرئيسي...", "ناس كتير شايفة..."],
  },
  {
    id: "b1-u04",
    titleAr: "السفر وخطط المستقبل",
    grammarAr: " 'if' (الشرط النوع الثاني) + الماضي المستمر",
    vocabThemes: ["وجهات سفر", "مميزات وعيوب البلدان", "نصائح للمسافر"],
    samplePhrases: ["لو رحت... كنت هـ...", "أحسن مكان عشان...", "نصيحتي إن..."],
  },
  {
    id: "b1-u05",
    titleAr: "البرمجة والتقنية",
    grammarAr: " 'passive' (بسيط) + مقارنة تقنية",
    vocabThemes: ["أدوات وتطبيقات", "مشاكل تقنية", "مستقبل التكنولوجيا"],
    samplePhrases: ["التطبيق ده بيستخدم...", "التحديث الجديد...", "العيب في..."],
  },
  {
    id: "b1-u06",
    titleAr: "السينما والمسلسلات",
    grammarAr: " 'relative clauses' (who, which, that) + تقييم فني",
    vocabThemes: ["نقد وإبداء رأي", "شخصيات وأحداث", "مقارنات بين أعمال"],
    samplePhrases: ["الفيلم اللي شفته...", "الأداء كان...", "القصة بتتكلم عن..."],
  },
  {
    id: "b1-u07",
    titleAr: "الصحة والعلاج",
    grammarAr: " 'have to / must / might' + نصيحة مفصّلة",
    vocabThemes: ["أعراض ومواقف", "زيارة الطبيب", "علاج وصحة نفسية"],
    samplePhrases: ["لازم أعمل تحاليل", "الأعراض بتبدأ...", "العلاج بياخد وقت"],
  },
  {
    id: "b1-u08",
    titleAr: "الطبخ والوصفات",
    grammarAr: " 'imperative' (وصلات) + 'you need to' في الشرح",
    vocabThemes: ["وصفات تفصيلية", "مطبخ وثقافة", "أخطاء شائعة في الطهي"],
    samplePhrases: ["الطريقة بتبدأ بـ...", "السر إن...", "لازم تسيبه..."],
  },
  {
    id: "b1-u09",
    titleAr: "الرياضة والمنافسات",
    grammarAr: "المضارع المستمر + 'going to' في التعليق",
    vocabThemes: ["مباريات ونتائج", "لاعبين ومدربين", "تعليق رياضي"],
    samplePhrases: ["الفريق ده عمّال يكسب", "الدوري هيخلص الأسبوع الجاي", "أشجع فريقين بس"],
  },
  {
    id: "b1-u10",
    titleAr: "الموسيقى والفنون",
    grammarAr: " 'used to' + المشاعر المعقّدة",
    vocabThemes: ["أنواع موسيقى", "فنانين ومعجبين", "تأثير الفن"],
    samplePhrases: ["كنت بسمع كتير", "الأغنية دي بتعبّر عن...", "الفن ده جاي من..."],
  },
  {
    id: "b1-u11",
    titleAr: "المال والأساسيات",
    grammarAr: " 'should have' للندم + 'afford / spend / save'",
    vocabThemes: ["ميزانية شخصية", "مصروفات وادخار", "قرارات مالية"],
    samplePhrases: ["كان لازم أوفّر", "بصرف كتير على...", "القرض مش حل"],
  },
  {
    id: "b1-u12",
    titleAr: "النقاش الحر والمراجعة",
    grammarAr: "مراجعة كل قواعد B1 + نقاش حر",
    vocabThemes: ["مراجعة", "نقاش مفتوح على أي موضوع"],
    samplePhrases: ["خلينا نتكلم في...", "إيه أكتر حاجة اتعلمتها؟", "رأيك النهائي..."],
  },
];

const B2_UNITS: CurriculumUnit[] = [
  {
    id: "b2-u01",
    titleAr: "اللغة المجازية والتعابير",
    grammarAr: " 'idioms' + تعابير شائعة في اللسان",
    vocabThemes: ["تعابير يومية", "مجاز وتشبيه", "ساخر وغير رسمي"],
    samplePhrases: ["الجو رايق", "مش فارقة معايا", "الكلام ده فيه لغة"],
  },
  {
    id: "b2-u02",
    titleAr: "النقاش العميق والجدال",
    grammarAr: " 'despite / in spite of' + 'not only... but also'",
    vocabThemes: ["قضايا اجتماعية", "دفاع عن وجهة نظر", "تفنيد حجة الخصم"],
    samplePhrases: ["لو نرجع للتاريخ...", "الإحصائيات بتقول...", "أتفق إن المشكلة..."],
  },
  {
    id: "b2-u03",
    titleAr: "الرسمي وغير الرسمي",
    grammarAr: " 'would / could / might' للتهذيب + الفروقات في الأسلوب",
    vocabThemes: ["إيميل رسمي", "محادثة ودية", "موقف رسمي"],
    samplePhrases: ["أرجو التكرم...", "بصراحة...", "ممكن... لو سمحت"],
  },
  {
    id: "b2-u04",
    titleAr: "الفكاهة والسخرية",
    grammarAr: " 'irony / sarcasm' + نبرة الصوت",
    vocabThemes: ["نكت وتعابير ساخرة", "مزاح بين الأصدقاء", "رد على نكتة"],
    samplePhrases: ["أيوه أكيد...", "الله!", "طب ما هو..."],
  },
  {
    id: "b2-u05",
    titleAr: "العروض التقديمية",
    grammarAr: " 'firstly / finally / in conclusion' + بناء حجة",
    vocabThemes: ["تقديم فكرة", "إقناع جمهور", "أسئلة وأجوبة"],
    samplePhrases: ["النقطة الأولى...", "عشان كده...", "في الختام..."],
  },
  {
    id: "b2-u06",
    titleAr: "التفاوض والإقناع",
    grammarAr: " 'unless / provided that' + عرض وطلب",
    vocabThemes: ["شروط وأحكام", "صفقة", "رفض مهذب"],
    samplePhrases: ["لو الشروط...", "أنا ممكن أقبل بـ...", "ده مش ممكن خالص"],
  },
  {
    id: "b2-u07",
    titleAr: "المشكلات والحلول",
    grammarAr: " 'should have / could have' + تحليل سبب",
    vocabThemes: ["مشكلة شغل", "تحليل أسباب", "حلول مقترحة"],
    samplePhrases: ["المشكلة بدأت من...", "الحل إن...", "كان المفروض..."],
  },
  {
    id: "b2-u08",
    titleAr: "الثقافة والاختلافات",
    grammarAr: " 'whereas / while' للمقارنة + تعميم",
    vocabThemes: ["فرق ثقافية", "عادات وتقاليد", "مقارنات"],
    samplePhrases: ["بينما عندنا...", "الاختلاف الأكبر...", "الثقافة دي..."],
  },
  {
    id: "b2-u09",
    titleAr: "التكنولوجيا والأخلاقيات",
    grammarAr: " 'provided that / as long as' + شروط",
    vocabThemes: ["خصوصية البيانات", "أثر التقنية", "أخلاقيات الذكاء الاصطناعي"],
    samplePhrases: ["المشكلة إن...", "لو استخدمنا... بشكل صح", "السؤال الأخلاقي..."],
  },
  {
    id: "b2-u10",
    titleAr: "الإقناع والتسويق",
    grammarAr: " 'it's worth + gerund' + فوائد وخصائص",
    vocabThemes: ["وصف منتج", "فوائد ومقارنات", "دعوة للشراء"],
    samplePhrases: ["المنتج ده بيوفّر...", "الأفضل فيه إن...", "مش بندفع فلوس كتير"],
  },
  {
    id: "b2-u11",
    titleAr: "القصة المتقدمة",
    grammarAr: " 'had + past participle' (الماضي التام) + توتر",
    vocabThemes: ["بناء قصة", "شخصيات وصراع", "ذروة ونهاية"],
    samplePhrases: ["كان خلص كل حاجة لما...", "فجأة اكتشف إن...", "من يومها..."],
  },
  {
    id: "b2-u12",
    titleAr: "نقاش حر ومراجعة B2",
    grammarAr: "مراجعة كل قواعد B2 + نقاش حر",
    vocabThemes: ["مراجعة", "نقاش مفتوح"],
    samplePhrases: ["إيه أكتر موضوع حوالك؟", "اختلف معايا في...", "ملخص لآخر كام شهر"],
  },
];

const C1_UNITS: CurriculumUnit[] = [
  {
    id: "c1-u01",
    titleAr: "النقاش الفلسفي والرأي المتقدم",
    grammarAr: " 'subjunctive' + تراكيب مجازية معقدة",
    vocabThemes: ["مفهوم حريّة/عدل", "رأي فلسفي", "دفاع مطوّل"],
    samplePhrases: ["لو نظرنا بشكل أوسع...", "الإزدواجية هنا...", "الفكرة بتقوم على..."],
  },
  {
    id: "c1-u02",
    titleAr: "السخرية والفكاهة المتقدمة",
    grammarAr: " 'understatement / overstatement' + نبرة ساخرة",
    vocabThemes: ["نكتة سياسية", "مزاح رفيع", "رد ساخر"],
    samplePhrases: ["طبعًا... زي ما هو واضح", "ده أكيد...", "يعني يعني..."],
  },
  {
    id: "c1-u03",
    titleAr: "الأكاديمي والبحث",
    grammarAr: " 'whereas / whereby / herein' + لغة أكاديمية",
    vocabThemes: ["منهجية بحث", "نتائج وبيانات", "نقاش أكاديمي"],
    samplePhrases: ["الدراسة بتوضح...", "الفجوة البحثية...", "لو نقيس بـ..."],
  },
  {
    id: "c1-u04",
    titleAr: "المهني المتقدم",
    grammarAr: " 'shall / ought to' + لغة الأعمال الرفيعة",
    vocabThemes: ["عرض مشروع", "إدارة فريق", "تقييم أداء"],
    samplePhrases: ["الـ KPI بتاعنا...", "نحتاج نعيد هيكلة...", "الـ ROI واضح"],
  },
  {
    id: "c1-u05",
    titleAr: "الأدب والقصة",
    grammarAr: " 'past perfect continuous' + أسلوب سردي",
    vocabThemes: ["رواية وقصة قصيرة", "أسلوب وصفي", "شخصية وأحداث"],
    samplePhrases: ["النص بيتكلم عن...", "الأسلوب بيعتمد على...", "الرمزية هنا..."],
  },
  {
    id: "c1-u06",
    titleAr: "نقاش حر ومراجعة C1",
    grammarAr: "مراجعة + نقاش حر",
    vocabThemes: ["مراجعة", "أي موضوع عميق"],
    samplePhrases: ["ايه أكتر حاجة استفدت منها؟", "ناقشني في..."],
  },
];

const C2_UNITS: CurriculumUnit[] = [
  {
    id: "c2-u01",
    titleAr: "التميّز في اللغة والأسلوب",
    grammarAr: " 'inverted conditionals' + لغة أدبية",
    vocabThemes: ["Nuances", "أساليب رفيعة", "دقة في التعبير"],
    samplePhrases: ["الفارق الدقيق هنا...", "لو كان وافقنا..."],
  },
  {
    id: "c2-u02",
    titleAr: "البلاغة والإقناع",
    grammarAr: " 'rhetorical questions / parallelism'",
    vocabThemes: ["خطابة", "إقناع جمهور", "استعارات"],
    samplePhrases: ["أسئلة بلاغية...", "التكرار هنا بيزود..."],
  },
  {
    id: "c2-u03",
    titleAr: "النقاش المتخصص",
    grammarAr: " 'domain-specific' + مصطلحات متقدمة",
    vocabThemes: ["اقتصاد", "سياسة", "علوم"],
    samplePhrases: ["في مجال الاقتصاد...", "الفرضية بتقول..."],
  },
  {
    id: "c2-u04",
    titleAr: "الأدب والنقد",
    grammarAr: " 'subjunctive mood' المتقدم",
    vocabThemes: ["نقد أدبي", "مدرسة أدبية", "مؤلف وتأثير"],
    samplePhrases: ["الأسلوب هنا استثنائي", "المدرسة دي..."],
  },
  {
    id: "c2-u05",
    titleAr: "الترجمة والمقارنة اللغوية",
    grammarAr: "فروقات دلالية دقيقة",
    vocabThemes: ["صعوبات الترجمة", "معنى ضمني", "تعبيرات لا تترجم"],
    samplePhrases: ["المقابل الأقرب...", "الترجمة الحرفية مش دايمًا..."],
  },
  {
    id: "c2-u06",
    titleAr: "مراجعة حرّة ومastery",
    grammarAr: "كل المستويات في نقاش واحد",
    vocabThemes: ["أي موضوع بعمق"],
    samplePhrases: ["ناقشني بحرية"],
  },
];

const CURRICULUM: Record<CefrLevel, CurriculumUnit[]> = {
  A1: A1_UNITS,
  A2: A2_UNITS,
  B1: B1_UNITS,
  B2: B2_UNITS,
  C1: C1_UNITS,
  C2: C2_UNITS,
};

/**
 * عدد الوحدات المتاحة في مستوى معين (= عدد الجلسات المتسلسلة).
 * لو فيه منهج مكتوب للغة/المستوى ده نستخدم عدده، غير كده عدد الـspine.
 */
export function getUnitCount(language: LanguageCode, level: CefrLevel): number {
  const authored = getSyllabusUnits(language, level);
  return authored && authored.length > 0
    ? authored.length
    : CURRICULUM[level].length;
}

/**
 * بتجيب وحدة برقمها — لو الرقم أكبر من المتاح بترجّع الأخيرة
 * (المستوى ماخلصش بس المنهج خلص → يكمل نقاش حر في نفس المستوى).
 *
 * الأولوية للمنهج المكتوب الخاص باللغة، وبعدين الـspine المشترك.
 */
export function getUnit(
  language: LanguageCode,
  level: CefrLevel,
  index: number,
): CurriculumUnit {
  const authored = getSyllabusUnits(language, level);
  if (authored && authored.length > 0) {
    const safe = Math.max(0, Math.min(index, authored.length - 1));
    return toCurriculumUnit(authored[safe]);
  }

  const units = CURRICULUM[level];
  const safe = Math.max(0, Math.min(index, units.length - 1));
  return units[safe];
}

// ============================================================
// بيانات الـ onboarding
// ============================================================

export const GOAL_IDS = ["travel", "work", "immigration", "hobby", "social"] as const;
export type GoalId = (typeof GOAL_IDS)[number];

export const GOAL_LABELS: Record<GoalId, string> = {
  travel: "سفر وسياحة",
  work: "شغل ومقابلات",
  immigration: "هجرة أو دراسة بره",
  hobby: "هواية ومتعة شخصية",
  social: "محادثة مع أصدقاء وعائلة",
};

export const INTEREST_IDS = [
  "sports",
  "movies",
  "cooking",
  "tech",
  "music",
  "travel",
  "business",
] as const;
export type InterestId = (typeof INTEREST_IDS)[number];

export const INTEREST_LABELS: Record<InterestId, string> = {
  sports: "رياضة وكرة قدم",
  movies: "سينما ومسلسلات",
  cooking: "طبخ وأكل",
  tech: "تكنولوجيا وبرمجة",
  music: "موسيقى وأغاني",
  travel: "سفر واماكن جديدة",
  business: "شغل ومشاريع",
};

export const DAILY_MINUTES_OPTIONS = [
  { value: 10, label: "أقل من 15 دقيقة" },
  { value: 20, label: "15–30 دقيقة" },
  { value: 45, label: "30–60 دقيقة" },
  { value: 75, label: "أكتر من ساعة" },
] as const;

/**
 * تلميح لمستوى البداية بناءً على الهدف — المستخدم بيراجعها ويأكّدها.
 * الهجرة/الدراسة محتاجة أساس أقوى → B1 للبدء؛ الباقي A1.
 */
export function pickLevelByGoal(goal: GoalId): CefrLevel {
  switch (goal) {
    case "immigration":
    case "work":
      return "A2";
    default:
      return "A1";
  }
}
