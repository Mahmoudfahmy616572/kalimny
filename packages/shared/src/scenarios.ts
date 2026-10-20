export type ScenarioId = "restaurant" | "airport" | "interview" | "introduction" | "shopping" | "taxi";

export interface Scenario {
  id: ScenarioId;
  titleAr: string;
  emoji: string;
  promptAr: string;
}

export const SCENARIOS: Scenario[] = [
  {
    id: "introduction",
    titleAr: "التعارف",
    emoji: "👋",
    promptAr: "ركز على التعارف الطبيعي: الاسم، منين، شغال إيه، هوايات، أسئلة عادية.",
  },
  {
    id: "restaurant",
    titleAr: "في المطعم",
    emoji: "🍽️",
    promptAr: "محاكاة واقعية لطلب أكل من مطعم، السؤال عن القائمة، الأسعار، الحجز، الدفع.",
  },
  {
    id: "airport",
    titleAr: "في المطار",
    emoji: "✈️",
    promptAr: "التحدث عن التذاكر، الجواز، الأمتعة، الصالة، التأخر، الاتجاهات.",
  },
  {
    id: "interview",
    titleAr: "مقابلة عمل",
    emoji: "💼",
    promptAr: "مقابلة عمل طبيعية: التعارف، الخبرة، نقاط القوة، الأسئلة والأجوبة.",
  },
  {
    id: "shopping",
    titleAr: "التسوق",
    emoji: "🛍️",
    promptAr: "في محل ملابس/سوبرماركت: السؤال عن المقاس، السعر، المزايا، التفاوض برفق.",
  },
  {
    id: "taxi",
    titleAr: "تاكسي / أوبر",
    emoji: "🚕",
    promptAr: "الاتفاق على المكان، السعر، الطريق، المحادثة القصيرة أثناء الرحلة.",
  },
];

export function getScenario(id?: string | null) {
  if (!id) return null;
  return SCENARIOS.find((s) => s.id === id) || null;
}
