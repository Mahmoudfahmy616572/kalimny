// مولّد تلقائياً من الـ syllabus (scripts/generate-unit-summaries.mjs).
// المحتوى الأجنبي كله مأخوذ من جمل/مفردات الـ syllabus الصحيحة؛
// والـ overview بالعربي مبني من عنوان وقواعد ومحاور الوحدة. بيانات ثابتة.
import type { UnitHandAuthored } from "../unit-summary/types";

export const UNIT_SUMMARY_EN: Record<string, UnitHandAuthored> = {
  "en-a1-u01": {
    "unitId": "en-a1-u01",
    "overview": "في وحدة «التحيات والتعريف بالنفس» (Hi, I'm...)، الهدف إنك أقدر أحيّي حد، أعرّف بنفسي (اسمي/منين/ساكن فين)، وأسأله نفس الأسئلة. غطّينا القواعد الأساسية: verb be: I am / you are / he is / she is؛ subject pronouns: I, you, he, she, it, we, they؛ possessive adjectives: my, your, his, her. وركّزنا على المفردات في محاور: التحيات، الاسم والبلد، الوداع. ومن الجمل اللي اتدربنا عليها «Hi, I'm Ahmed.» و«What's your name?». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Hi, I'm Ahmed. What's your name?",
        "modelAnswer": "أهلاً، أنا أحمد. / اسمك إيه؟"
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «التحيات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Hi, I'm Ahmed.",
        "modelAnswer": "أهلاً، أنا أحمد."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "hello",
        "modelAnswer": "أهلاً"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Where are you from?",
        "modelAnswer": "أنت منين؟"
      }
    }
  },
  "en-a1-u02": {
    "unitId": "en-a1-u02",
    "overview": "في وحدة «الأرقام والوقت» (What time is it?)، الهدف إنك أقدر أقول وأفهم الأرقام من 1 لـ100، وأسأل عن الوقت واليوم والتاريخ. غطّينا القواعد الأساسية: numbers 1–100؛ What time is it? + It's ... o'clock / half past ...؛ at + time, on + day/date. وركّزنا على المفردات في محاور: الأرقام، الساعة، أيام الأسبوع والتواريخ. ومن الجمل اللي اتدربنا عليها «What time is it?» و«It's three o'clock.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "What time is it? It's three o'clock.",
        "modelAnswer": "الساعة كام؟ / الساعة تلاتة."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الأرقام»، زي المثال واستخدم نفس القواعد.",
        "prompt": "What time is it?",
        "modelAnswer": "الساعة كام؟"
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "number",
        "modelAnswer": "رقم"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "It's half past seven.",
        "modelAnswer": "الساعة سبعة ونص."
      }
    }
  },
  "en-a1-u03": {
    "unitId": "en-a1-u03",
    "overview": "في وحدة «العائلة والأصدقاء» (This is my family)، الهدف إنك أقدر أعرّف الناس اللي حواليا وأوصفهم بصفات بسيطة وأسأل عن سنهم. غطّينا القواعد الأساسية: possessive 's: my sister's name؛ have got / has got؛ adjectives: tall, short, old, young, funny. وركّزنا على المفردات في محاور: أفراد العائلة، الأصدقاء، الوصف البسيط. ومن الجمل اللي اتدربنا عليها «This is my sister.» و«I've got two brothers.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "This is my sister. I've got two brothers.",
        "modelAnswer": "دي أختي. / عندي أخين."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «أفراد العائلة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "This is my sister.",
        "modelAnswer": "دي أختي."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "mother",
        "modelAnswer": "أم"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "She's tall and funny.",
        "modelAnswer": "هي طويلة ومضحكة."
      }
    }
  },
  "en-a1-u04": {
    "unitId": "en-a1-u04",
    "overview": "في وحدة «الأكل والشرب» (I'd like some water)، الهدف إنك أقدر أطلب أكل وشرب بأدب، وأقول بحب إيه ومش بحب إيه. غطّينا القواعد الأساسية: present simple: I like / I want / I don't eat؛ some / any with food and drinks؛ countable and uncountable nouns؛ I'd like ... , please. وركّزنا على المفردات في محاور: أكل البيت والمطعم، المشروبات، الطلب والفاتورة. ومن الجمل اللي اتدربنا عليها «I'd like some water, please.» و«Do you like coffee?». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "I'd like some water, please. Do you like coffee?",
        "modelAnswer": "عايز مية لو سمحت. / بتحب القهوة؟"
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «أكل البيت والمطعم»، زي المثال واستخدم نفس القواعد.",
        "prompt": "I'd like some water, please.",
        "modelAnswer": "عايز مية لو سمحت."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "water",
        "modelAnswer": "مية"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "I don't eat meat.",
        "modelAnswer": "أنا مش باكل لحمة."
      }
    }
  },
  "en-a1-u05": {
    "unitId": "en-a1-u05",
    "overview": "في وحدة «الطقس والملابس» (What's the weather like?)، الهدف إنك أقدر أتكلم عن الجو وأقول لابس إيه، وأفهم جُمل عن الطقس والملابس. غطّينا القواعد الأساسية: It's + adjective: It's hot / cold / sunny؛ present continuous for now: I'm wearing ...؛ this / these with clothes. وركّزنا على المفردات في محاور: الطقس، الملابس، اختيار اللبس. ومن الجمل اللي اتدربنا عليها «It's really hot today.» و«I'm wearing a jacket.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "It's really hot today. I'm wearing a jacket.",
        "modelAnswer": "الجو حر قوي النهارده. / أنا لابس جاكيت."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الطقس»، زي المثال واستخدم نفس القواعد.",
        "prompt": "It's really hot today.",
        "modelAnswer": "الجو حر قوي النهارده."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "hot",
        "modelAnswer": "حر"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Take an umbrella.",
        "modelAnswer": "خد شمسية معاك."
      }
    }
  },
  "en-a1-u06": {
    "unitId": "en-a1-u06",
    "overview": "في وحدة «الأماكن والاتجاهات» (Where is the pharmacy?)، الهدف إنك أقدر أسأل عن مكان وأفهم الاتجاهات، وأسمّي الأماكن المشهورة في المدينة. غطّينا القواعد الأساسية: there is / there are؛ prepositions of place: next to, near, opposite, between؛ imperatives for directions: go, turn, take. وركّزنا على المفردات في محاور: أماكن في المدينة، الاتجاهات، المواصلات. ومن الجمل اللي اتدربنا عليها «Is there a pharmacy near here?» و«Go straight and turn left.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Is there a pharmacy near here? Go straight and turn left.",
        "modelAnswer": "في صيدلية قريبة من هنا؟ / امشي على طول وبعدين خد شمال."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «أماكن في المدينة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Is there a pharmacy near here?",
        "modelAnswer": "في صيدلية قريبة من هنا؟"
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "bank",
        "modelAnswer": "بنك"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "It's next to the bank.",
        "modelAnswer": "دي جنب البنك."
      }
    }
  },
  "en-a1-u07": {
    "unitId": "en-a1-u07",
    "overview": "في وحدة «الأسئلة الأساسية» (How do you say...?)، الهدف إنك أقدر أسأل أسئلة بسيطة وأطلب توضيح أو إعادة بأدب. غطّينا القواعد الأساسية: question words: what, where, when, who, why, how؛ present simple questions: Do you ...? Does she ...?؛ short answers: Yes, I do / No, I don't. وركّزنا على المفردات في محاور: الأسئلة اليومية، طلب التوضيح، الإجابة القصيرة. ومن الجمل اللي اتدربنا عليها «What does this mean?» و«How do you say ... in English?». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "What does this mean? How do you say ... in English?",
        "modelAnswer": "ده معناه إيه؟ / بتقول ... بالإنجليزي إزاي؟"
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الأسئلة اليومية»، زي المثال واستخدم نفس القواعد.",
        "prompt": "What does this mean?",
        "modelAnswer": "ده معناه إيه؟"
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "what",
        "modelAnswer": "إيه"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Can you repeat that, please?",
        "modelAnswer": "تقدر تعيد تاني لو سمحت؟"
      }
    }
  },
  "en-a1-u08": {
    "unitId": "en-a1-u08",
    "overview": "في وحدة «الروتين اليومي والشغل» (My typical day)، الهدف إنك أقدر أحكي عن يومي وشغلي وأقول بحب أعمل إيه كل يوم. غطّينا القواعد الأساسية: present simple: he works / she goes؛ adverbs of frequency: always, usually, sometimes, never؛ time expressions: in the morning, at night, on Fridays. وركّزنا على المفردات في محاور: الروتين اليومي، الشغل والدراسة، النوم والاستيقاظ. ومن الجمل اللي اتدربنا عليها «I usually get up at seven.» و«She works in a hospital.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "I usually get up at seven. She works in a hospital.",
        "modelAnswer": "عادةً بصحى الساعة سبعة. / هي بتشتغل في مستشفى."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الروتين اليومي»، زي المثال واستخدم نفس القواعد.",
        "prompt": "I usually get up at seven.",
        "modelAnswer": "عادةً بصحى الساعة سبعة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "wake up",
        "modelAnswer": "أصحى"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "I'm never late.",
        "modelAnswer": "أنا عمري ما بتأخر."
      }
    }
  },
  "en-a1-u09": {
    "unitId": "en-a1-u09",
    "overview": "في وحدة «التسوق والأسعار» (How much is this?)، الهدف إنك أقدر أسأل عن السعر، أجرّب حاجة، وأقارن بين حاجتين بسيط. غطّينا القواعد الأساسية: How much is ...? / How much are ...?؛ this / that / these / those؛ comparative adjectives: cheaper, bigger, nicer. وركّزنا على المفردات في محاور: الملابس، السوبرماركت، السعر والمقاس. ومن الجمل اللي اتدربنا عليها «How much is this?» و«Can I try it on?». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "How much is this? Can I try it on?",
        "modelAnswer": "ده بكام؟ / أقدر أقيسه؟"
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الملابس»، زي المثال واستخدم نفس القواعد.",
        "prompt": "How much is this?",
        "modelAnswer": "ده بكام؟"
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "price",
        "modelAnswer": "سعر"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Do you have it in a bigger size?",
        "modelAnswer": "عندك منه مقاس أكبر؟"
      }
    }
  },
  "en-a1-u10": {
    "unitId": "en-a1-u10",
    "overview": "في وحدة «الصحة والجسم» (I've got a headache)، الهدف إنك أقدر أقول إيه اللي وجعني وأدي نصيحة بسيطة لحد. غطّينا القواعد الأساسية: have got: I've got a headache / She's got a cold؛ should / shouldn't for advice؛ imperatives: rest, drink water, see a doctor. وركّزنا على المفردات في محاور: أجزاء الجسم، الأعراض، النصيحة الصحية. ومن الجمل اللي اتدربنا عليها «I've got a headache.» و«You should rest.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "I've got a headache. You should rest.",
        "modelAnswer": "عندي صداع. / لازم ترتاح."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «أجزاء الجسم»، زي المثال واستخدم نفس القواعد.",
        "prompt": "I've got a headache.",
        "modelAnswer": "عندي صداع."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "head",
        "modelAnswer": "راس"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "You shouldn't drink coffee.",
        "modelAnswer": "ماينفعش تشرب قهوة."
      }
    }
  },
  "en-a1-u11": {
    "unitId": "en-a1-u11",
    "overview": "في وحدة «الهوايات والوقت الحر» (What do you do in your free time?)، الهدف إنك أقدر أتكلم عن هواياتي وأقول بعرف أعمل إيه ومش بعرف. غطّينا القواعد الأساسية: like / love / hate + -ing؛ can / can't for ability؛ object pronouns: me, you, him, her, it, us, them. وركّزنا على المفردات في محاور: الرياضة، الأفلام والموسيقى، القراءة والطبخ. ومن الجمل اللي اتدربنا عليها «I love playing football.» و«Can you swim?». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "I love playing football. Can you swim?",
        "modelAnswer": "أنا بحب ألعب كورة. / بتعرف تعوم؟"
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الرياضة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "I love playing football.",
        "modelAnswer": "أنا بحب ألعب كورة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "hobby",
        "modelAnswer": "هواية"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "I'm not good at cooking.",
        "modelAnswer": "أنا مش شاطر في الطبخ."
      }
    }
  },
  "en-a1-u12": {
    "unitId": "en-a1-u12",
    "overview": "في وحدة «مراجعة ومحادثة حرة A1» (Let's just talk)، الهدف إنك أقدر أستخدم كل حاجة اتعلمتها في محادثة طبيعية من غير سكريبت. غطّينا القواعد الأساسية: review: verb be, present simple, present continuous؛ review: questions, short answers, frequency adverbs؛ review: there is/are, can, should. وركّزنا على المفردات في محاور: مراجعة مفردات A1، مواضيع مختلطة، التعريف بالنفس. ومن الجمل اللي اتدربنا عليها «Let me introduce myself.» و«I usually ... but today I'm ...». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Let me introduce myself. I usually ... but today I'm ...",
        "modelAnswer": "خليني أعرّفك بنفسي. / عادةً ... بس النهارده ..."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «مراجعة مفردات A1»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Let me introduce myself.",
        "modelAnswer": "خليني أعرّفك بنفسي."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "remember",
        "modelAnswer": "يفتكر"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Can you say that again?",
        "modelAnswer": "تقولها تاني؟"
      }
    }
  },
  "en-a2-u01": {
    "unitId": "en-a2-u01",
    "overview": "في وحدة «التعارف وعنّي وعنك» (Who's who?)، الهدف إنك أقدر أسأل عن الناس وأعرّف نفسي وأوصف شخصيات بالمضارع البسيط والمستمر. غطّينا القواعد الأساسية: word order in questions: Where do you live? / Do you have any brothers?؛ present simple: I work, she works (third person -s)؛ present continuous: I'm studying, they're waiting؛ defining relative clauses: a person who..., a thing which.... وركّزنا على المفردات في محاور: العيلة والأصدقاء، صفات الشخصية، الشغل والدراسة. ومن الجمل اللي اتدربنا عليها «Where do you work?» و«She's a friend who always makes me laugh.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Where do you work? She's a friend who always makes me laugh.",
        "modelAnswer": "بتشتغل فين؟ / دي صاحبة بتخليني أضحك دايماً."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «العيلة والأصدقاء»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Where do you work?",
        "modelAnswer": "بتشتغل فين؟"
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "relative",
        "modelAnswer": "قريب"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "What are you doing right now?",
        "modelAnswer": "بتعمل إيه دلوقتي؟"
      }
    }
  },
  "en-a2-u02": {
    "unitId": "en-a2-u02",
    "overview": "في وحدة «المكان الصح والوقت الغلط» (Right place, wrong time)، الهدف إنك أحكي عن إجازة أو حدث فات بالماضي البسيط والمستمر. غطّينا القواعد الأساسية: past simple: regular (-ed) and irregular verbs (went, saw, had)؛ past continuous: I was walking when...؛ prepositions of time and place: at, in, on. وركّزنا على المفردات في محاور: الإجازات، الأماكن، حكايات الماضي. ومن الجمل اللي اتدربنا عليها «We were waiting at the gate when the flight was cancelled.» و«I missed the bus, so I walked home.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "We were waiting at the gate when the flight was cancelled. I missed the bus, so I walked home.",
        "modelAnswer": "كنا مستنيين عند البوابة لما الرحلة اتلغت. / فاتني الأتوبيس، فمشيت للبيت."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الإجازات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "We were waiting at the gate when the flight was cancelled.",
        "modelAnswer": "كنا مستنيين عند البوابة لما الرحلة اتلغت."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "holiday",
        "modelAnswer": "إجازة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Did you enjoy the holiday?",
        "modelAnswer": "استمتعت بالإجازة؟"
      }
    }
  },
  "en-a2-u03": {
    "unitId": "en-a2-u03",
    "overview": "في وحدة «أسئلة وروابط» (Fifty years of pop / One October evening)، الهدف إنك أسأل أسئلة عن الماضي والحاضر وأربط الجمل بمنطقية. غطّينا القواعد الأساسية: questions with and without auxiliaries: Did you...? / Who won?؛ linkers: so, because, but, although. وركّزنا على المفردات في محاور: الأسئلة، الموسيقى، الأفعال المركّبة. ومن الجمل اللي اتدربنا عليها «Who sang that song at the concert?» و«Did you know that band in the nineties?». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Who sang that song at the concert? Did you know that band in the nineties?",
        "modelAnswer": "مين غنى الأغنية دي في الحفلة؟ / كنت تعرف الفرقة دي في التسعينات؟"
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الأسئلة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Who sang that song at the concert?",
        "modelAnswer": "مين غنى الأغنية دي في الحفلة؟"
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "question word",
        "modelAnswer": "أداة استفهام"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "I didn't go out because I was tired.",
        "modelAnswer": "ما خرجتش عشان كنت تعبان."
      }
    }
  },
  "en-a2-u04": {
    "unitId": "en-a2-u04",
    "overview": "في وحدة «خطط ووعود» (Where are you going?)، الهدف إنك أتكلم عن خططي ومواعيدي وأوعد وأعرض مساعدة وأقرر بسرعة. غطّينا القواعد الأساسية: going to for plans and predictions؛ present continuous for fixed arrangements: I'm meeting Sara at 8؛ will / won't for predictions, promises, offers and decisions. وركّزنا على المفردات في محاور: الخطط، المواعيد، الوعود والعروض. ومن الجمل اللي اتدربنا عليها «I'm meeting my friends after work.» و«It's going to rain this afternoon.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "I'm meeting my friends after work. It's going to rain this afternoon.",
        "modelAnswer": "هقابل أصحابي بعد الشغل. / هتمطر بعد الظهر."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الخطط»، زي المثال واستخدم نفس القواعد.",
        "prompt": "I'm meeting my friends after work.",
        "modelAnswer": "هقابل أصحابي بعد الشغل."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "look after",
        "modelAnswer": "يهتم بـ"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "I'll call you when I get home.",
        "modelAnswer": "هكلمك لما أوصل البيت."
      }
    }
  },
  "en-a2-u05": {
    "unitId": "en-a2-u05",
    "overview": "في وحدة «من الصفر للنجاح» (From rags to riches / Family conflicts)، الهدف إنك أتكلم عن تجاربي وإنجازاتي وأحكي عن اللي عملته من غير ما أحدد وقته. غطّينا القواعد الأساسية: present perfect for experience: I've been to Paris; ever and never؛ present perfect vs past simple: I've lost my keys / I lost my keys yesterday؛ yet, just, already with present perfect. وركّزنا على المفردات في محاور: الملابس، التجارب، الخلافات العائلية. ومن الجمل اللي اتدربنا عليها «Have you ever been to Alexandria?» و«I've never tried sushi.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Have you ever been to Alexandria? I've never tried sushi.",
        "modelAnswer": "إنت جيت الإسكندرية قبل كده؟ / أنا عمري ما جربت سوشي."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الملابس»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Have you ever been to Alexandria?",
        "modelAnswer": "إنت جيت الإسكندرية قبل كده؟"
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "clothes",
        "modelAnswer": "هدوم"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "I've just finished my homework.",
        "modelAnswer": "خلصت الواجب لتوي."
      }
    }
  },
  "en-a2-u06": {
    "unitId": "en-a2-u06",
    "overview": "في وحدة «أسرع وأحسن» (Faster, faster! / The world's friendliest city)، الهدف إنك أقارن بين الأشياء وأوصف الأفضل والأسوأ وأتكلم عن الوقت والفلوس. غطّينا القواعد الأساسية: comparatives: bigger than, more expensive than؛ as...as and less...than؛ superlatives: the best, the friendliest (+ ever + present perfect). وركّزنا على المفردات في محاور: المدن، المقارنات، الوقت. ومن الجمل اللي اتدربنا عليها «This city is more crowded than Cairo.» و«The train is as fast as the metro.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "This city is more crowded than Cairo. The train is as fast as the metro.",
        "modelAnswer": "المدينة دي أزحم من القاهرة. / القطر سريع زي المترو."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «المدن»، زي المثال واستخدم نفس القواعد.",
        "prompt": "This city is more crowded than Cairo.",
        "modelAnswer": "المدينة دي أزحم من القاهرة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "crowded",
        "modelAnswer": "زحمة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "It's less expensive than I thought.",
        "modelAnswer": "هو أرخص من ما كنت فاكر."
      }
    }
  },
  "en-a2-u07": {
    "unitId": "en-a2-u07",
    "overview": "في وحدة «حفلات وأهداف» (Are you a party animal?)، الهدف إنك أعبّر عن اللي بحبه وبكرهه، وأتكلم عن الواجبات والقوانين، وأوصف الحركة. غطّينا القواعد الأساسية: uses of the infinitive with to: I want to, It's easy to؛ verb + -ing: I enjoy dancing; verbs describing emotions؛ have to, don't have to, must, mustn't؛ prepositions of movement: across, through, into, out of. وركّزنا على المفردات في محاور: الحفلات والخروجات، المشاعر، الحركة. ومن الجمل اللي اتدربنا عليها «I love going out with friends on Friday.» و«You mustn't use your phone in the exam.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "I love going out with friends on Friday. You mustn't use your phone in the exam.",
        "modelAnswer": "بحب أخرج مع أصحابي يوم الجمعة. / ممنوع تستخدم الموبايل في الامتحان."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الحفلات والخروجات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "I love going out with friends on Friday.",
        "modelAnswer": "بحب أخرج مع أصحابي يوم الجمعة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "party animal",
        "modelAnswer": "بيحب السهر والحفلات"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "You don't have to come if you're tired.",
        "modelAnswer": "مش لازم تيجي لو تعبان."
      }
    }
  },
  "en-a2-u08": {
    "unitId": "en-a2-u08",
    "overview": "في وحدة «لو حصل كذا» (If something bad can happen, it will)، الهدف إنك أتكلم عن احتمالات المستقبل والمواقف المتخيلة. غطّينا القواعد الأساسية: first conditional: If it rains, we'll stay home؛ second conditional: If I had more money, I would travel. وركّزنا على المفردات في محاور: الحيوانات، الاحتمالات، المواقف. ومن الجمل اللي اتدربنا عليها «If you study hard, you'll pass the exam.» و«If I were rich, I would buy a big house.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "If you study hard, you'll pass the exam. If I were rich, I would buy a big house.",
        "modelAnswer": "لو ذاكرت كويس، هتنجح في الامتحان. / لو كنت غني، كنت هشتري بيت كبير."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الحيوانات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "If you study hard, you'll pass the exam.",
        "modelAnswer": "لو ذاكرت كويس، هتنجح في الامتحان."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "confuse",
        "modelAnswer": "يلخبط"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "If you don't feed a dog, it will get angry.",
        "modelAnswer": "لو ما اكلتش الكلب، هيزعل."
      }
    }
  },
  "en-a2-u09": {
    "unitId": "en-a2-u09",
    "overview": "في وحدة «قرارات ونصايح» (Decisions, decisions / What should I do?)، الهدف إنك أدي نصايح وأتكلم عن الاحتمالات والقرارات. غطّينا القواعد الأساسية: may / might for possibility: I might go later؛ should / shouldn't for advice؛ get (become, receive, arrive). وركّزنا على المفردات في محاور: القرارات، النصايح، بناء الكلمات. ومن الجمل اللي اتدربنا عليها «I might go to the gym later.» و«You should see a doctor.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "I might go to the gym later. You should see a doctor.",
        "modelAnswer": "ممكن أروح الجيم بعدين. / المفروض تروح للدكتور."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «القرارات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "I might go to the gym later.",
        "modelAnswer": "ممكن أروح الجيم بعدين."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "decision",
        "modelAnswer": "قرار"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "You shouldn't eat so much sugar.",
        "modelAnswer": "ما ينفعش تاكل سكر كتير كده."
      }
    }
  },
  "en-a2-u10": {
    "unitId": "en-a2-u10",
    "overview": "في وحدة «حكايات ومخترعين» (Famous fears and phobias)، الهدف إنك أتكلم عن مخاوف وعادات قديمة وأحكي سيرة شخص بالمضارع التام والماضي. غطّينا القواعد الأساسية: present perfect with for and since: I've lived here since 2019؛ used to for past habits: I used to hate maths؛ passive (simple): it was invented in..., the phone was discovered by.... وركّزنا على المفردات في محاور: المخاوف، السير الذاتية، الاختراعات. ومن الجمل اللي اتدربنا عليها «I've been afraid of dogs since I was a child.» و«She used to hate school, but now she loves it.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "I've been afraid of dogs since I was a child. She used to hate school, but now she loves it.",
        "modelAnswer": "خايف من الكلاب من وأنا طفل. / كانت بتكره المدرسة، بس دلوقتي بتحبها."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «المخاوف»، زي المثال واستخدم نفس القواعد.",
        "prompt": "I've been afraid of dogs since I was a child.",
        "modelAnswer": "خايف من الكلاب من وأنا طفل."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "fear",
        "modelAnswer": "خوف"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "The printing press was invented in the 15th century.",
        "modelAnswer": "المطبعة اتخترعت في القرن الخامس عشر."
      }
    }
  },
  "en-a2-u11": {
    "unitId": "en-a2-u11",
    "overview": "في وحدة «عادات وتشابه» (I hate weekends!)، الهدف إنك أعبّر عن رأيي في الأيام والعادات وأقول إني موافق أو لأ، وأتكلم عن الكميات. غطّينا القواعد الأساسية: something, anything, nothing, everything and their compounds؛ adjectives ending in -ed and -ing: bored / boring؛ quantifiers: too much, too many, not enough؛ phrasal verbs and their word order: wake up / wake her up؛ so and neither + auxiliary: So am I. / Neither do I.. وركّزنا على المفردات في محاور: الويكند والروتين، الصحة ونمط الحياة، الاتفاق والاختلاف. ومن الجمل اللي اتدربنا عليها «I don't like anything on TV on Sunday.» و«Waking up early is hard for me.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "I don't like anything on TV on Sunday. Waking up early is hard for me.",
        "modelAnswer": "مش بيعجبني أي حاجة في التلفزيون يوم الحد. / الصحيان بدري صعب عليا."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الويكند والروتين»، زي المثال واستخدم نفس القواعد.",
        "prompt": "I don't like anything on TV on Sunday.",
        "modelAnswer": "مش بيعجبني أي حاجة في التلفزيون يوم الحد."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "weekend",
        "modelAnswer": "الويكند"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "I'm exhausted. So am I.",
        "modelAnswer": "أنا تعبان جداً. أنا كمان."
      }
    }
  },
  "en-a2-u12": {
    "unitId": "en-a2-u12",
    "overview": "في وحدة «أسبوع فيه كل حاجة» (What a week!)، الهدف إنك أحكي عن أسبوع صعب وأنقل كلام الناس بعد كده. غطّينا القواعد الأساسية: past perfect for an earlier past: I had finished before he arrived؛ reported speech: He said he was tired; She told me she would come؛ say, tell and ask in reported speech. وركّزنا على المفردات في محاور: أحداث مفاجئة، نقل الكلام. ومن الجمل اللي اتدربنا عليها «By the time I got to work, the meeting had started.» و«She told me she had lost her phone.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "By the time I got to work, the meeting had started. She told me she had lost her phone.",
        "modelAnswer": "لما وصلت الشغل، الاجتماع كان بدأ. / قالتلي إنها ضاعت موبايلها."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «أحداث مفاجئة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "By the time I got to work, the meeting had started.",
        "modelAnswer": "لما وصلت الشغل، الاجتماع كان بدأ."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "suddenly",
        "modelAnswer": "فجأة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "He asked me where I had been.",
        "modelAnswer": "سألني كنت فين."
      }
    }
  },
  "en-b1-u01": {
    "unitId": "en-b1-u01",
    "overview": "في وحدة «أكل برّه وجوّه» (Eating in...and out)، الهدف إنك أتكلم عن عادات الأكل والعيلة، وأتكلم عن خططي ووعودي بالمستقبل. غطّينا القواعد الأساسية: present simple vs present continuous; action and non-action verbs (I know, I want)؛ future forms: present continuous, be going to, will / won't. وركّزنا على المفردات في محاور: الأكل والطبخ، العيلة الحديثة، صفات الشخصية. ومن الجمل اللي اتدربنا عليها «We don't need tinned tomatoes, we need fresh ones.» و«I'm meeting my cousin at the restaurant tonight.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "We don't need tinned tomatoes, we need fresh ones. I'm meeting my cousin at the restaurant tonight.",
        "modelAnswer": "مش محتاجين طماطم معلّبة، محتاجين طازة. / هقابل ابن عمي في المطعم بالليل."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الأكل والطبخ»، زي المثال واستخدم نفس القواعد.",
        "prompt": "We don't need tinned tomatoes, we need fresh ones.",
        "modelAnswer": "مش محتاجين طماطم معلّبة، محتاجين طازة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "grilled",
        "modelAnswer": "متشوي"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "I'll cook dinner, and you're going to wash up.",
        "modelAnswer": "أنا هطبخ العشا، وإنت هتغسل المواعين."
      }
    }
  },
  "en-b1-u02": {
    "unitId": "en-b1-u02",
    "overview": "في وحدة «حياة بتتغير» (Spending money / Changing lives)، الهدف إنك أتكلم عن فلوسي وعن تغييرات حصلت في حياتي، وأوصف مشاعري بقوة. غطّينا القواعد الأساسية: present perfect vs past simple: I've bought a car / I bought it last year؛ present perfect with for and since; present perfect continuous (I've been waiting)؛ strong adjectives: exhausted, amazed, delighted. وركّزنا على المفردات في محاور: الفلوس والمصروف، التغييرات في الحياة، المشاعر القوية. ومن الجمل اللي اتدربنا عليها «I've saved enough money for a new laptop.» و«I've been working here since 2020.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "I've saved enough money for a new laptop. I've been working here since 2020.",
        "modelAnswer": "جمعت فلوس كفاية للاب توب جديد. / أنا شغال هنا من سنة 2020."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الفلوس والمصروف»، زي المثال واستخدم نفس القواعد.",
        "prompt": "I've saved enough money for a new laptop.",
        "modelAnswer": "جمعت فلوس كفاية للاب توب جديد."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "spend",
        "modelAnswer": "يصرف"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "I was amazed when I saw the results.",
        "modelAnswer": "اتفاجئت لما شفت النتايج."
      }
    }
  },
  "en-b1-u03": {
    "unitId": "en-b1-u03",
    "overview": "في وحدة «المواصلات والمقارنات» (Survive the drive / Men, women, and children)، الهدف إنك أقارن بين وسائل المواصلات والناس، وأستخدم أدوات التعريف والتحديد بشكل صح. غطّينا القواعد الأساسية: choosing between comparatives and superlatives (the most, the best, than)؛ articles: a / an, the, and no article؛ collocations: verbs and adjectives + prepositions (good at, depend on). وركّزنا على المفردات في محاور: المواصلات، الزحمة والسواقة، العلاقات بين الجنسين. ومن الجمل اللي اتدربنا عليها «The metro is faster than the bus during rush hour.» و«It's the most crowded road in the city.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "The metro is faster than the bus during rush hour. It's the most crowded road in the city.",
        "modelAnswer": "المترو أسرع من الأتوبيس وقت الزحمة. / دي أكتر طريق زحمة في المدينة."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «المواصلات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "The metro is faster than the bus during rush hour.",
        "modelAnswer": "المترو أسرع من الأتوبيس وقت الزحمة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "traffic jam",
        "modelAnswer": "زحمة مرور"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "I'm not good at driving in traffic.",
        "modelAnswer": "أنا مش شاطر في السواقة وسط الزحمة."
      }
    }
  },
  "en-b1-u04": {
    "unitId": "en-b1-u04",
    "overview": "في وحدة «الأدب في الكلام والتليفون» (Bad manners? / Yes, I can!)، الهدف إنك أتكلم عن القوانين والواجبات، وأعبّر عن القدرة والإمكانية، وأتكلم في التليفون بأدب. غطّينا القواعد الأساسية: obligation and prohibition: have to, must, should؛ ability and possibility: can, could, be able to؛ reflexive pronouns: myself, yourself, themselves. وركّزنا على المفردات في محاور: الأدب والسلوك، الكلام في التليفون، الثقة بالنفس. ومن الجمل اللي اتدربنا عليها «You mustn't use your phone in the cinema.» و«I can't come, but I could call you later.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "You mustn't use your phone in the cinema. I can't come, but I could call you later.",
        "modelAnswer": "ممنوع تستخدم الموبايل في السينما. / مش هقدر أجي، بس ممكن أكلمك بعدين."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الأدب والسلوك»، زي المثال واستخدم نفس القواعد.",
        "prompt": "You mustn't use your phone in the cinema.",
        "modelAnswer": "ممنوع تستخدم الموبايل في السينما."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "rude",
        "modelAnswer": "قليل أدب"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Could you hold on, please?",
        "modelAnswer": "ممكن تستنى ثانية من فضلك؟"
      }
    }
  },
  "en-b1-u05": {
    "unitId": "en-b1-u05",
    "overview": "في وحدة «خرافات الرياضة» (Sporting superstitions)، الهدف إنك أحكي عن أحداث في الماضي بالتفصيل وأربط بين الأحداث بالوقت الصح. غطّينا القواعد الأساسية: past simple vs past continuous: I was watching the match when the lights went out؛ past perfect vs past simple: By the time we arrived, the game had started. وركّزنا على المفردات في محاور: الرياضة، الخرافات، المنافسات. ومن الجمل اللي اتدربنا عليها «He was wearing his lucky socks when they won the final.» و«We had already left when the match finished.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "He was wearing his lucky socks when they won the final. We had already left when the match finished.",
        "modelAnswer": "كان لابس شراب الحظ بتاعه لما كسبوا النهائي. / كنا مشينا خلاص لما الماتش خلص."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الرياضة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "He was wearing his lucky socks when they won the final.",
        "modelAnswer": "كان لابس شراب الحظ بتاعه لما كسبوا النهائي."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "superstition",
        "modelAnswer": "خرافة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "The coach was shouting while the players were running.",
        "modelAnswer": "المدرب كان بيزعق واللاعبين بيجروا."
      }
    }
  },
  "en-b1-u06": {
    "unitId": "en-b1-u06",
    "overview": "في وحدة «زمان وكنت» (#thewaywemet)، الهدف إنك أتكلم عن عادات كانت عندي وعلاقات اتغيرت، وأوصف حالات كانت موجودة. غطّينا القواعد الأساسية: past habits: used to, would (for repeated actions in the past)؛ states in the past vs present: I used to live in Alex, now I live in Cairo. وركّزنا على المفردات في محاور: العلاقات، التعارف، الذكريات. ومن الجمل اللي اتدربنا عليها «I used to play football every Friday.» و«We would meet every summer at my uncle's house.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "I used to play football every Friday. We would meet every summer at my uncle's house.",
        "modelAnswer": "كنت بلعب كورة كل يوم جمعة. / كنا بنتقابل كل صيف في بيت عمي."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «العلاقات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "I used to play football every Friday.",
        "modelAnswer": "كنت بلعب كورة كل يوم جمعة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "relationship",
        "modelAnswer": "علاقة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "I didn't use to like coffee, but now I love it.",
        "modelAnswer": "كنت مش بحب القهوة، بس دلوقتي بحبها."
      }
    }
  },
  "en-b1-u07": {
    "unitId": "en-b1-u07",
    "overview": "في وحدة «وراء الكواليس» (Behind the scenes / Every picture tells a story)، الهدف إنك أوصف عملية أو حدث بالمبني للمجهول، وأستنتج وأخمّن بثقة معقولة عن المواقف. غطّينا القواعد الأساسية: passive (all tenses): The film was shot in Cairo; The scene has been cut؛ modals of deduction: must be, might be, can't be. وركّزنا على المفردات في محاور: السينما والإنتاج، الجسم والصحة، التخمين والاستنتاج. ومن الجمل اللي اتدربنا عليها «The movie was filmed entirely in Egypt.» و«The scene has been cut from the final version.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "The movie was filmed entirely in Egypt. The scene has been cut from the final version.",
        "modelAnswer": "الفيلم اتصوّر في مصر بالكامل. / المشهد اتشال من النسخة النهائية."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «السينما والإنتاج»، زي المثال واستخدم نفس القواعد.",
        "prompt": "The movie was filmed entirely in Egypt.",
        "modelAnswer": "الفيلم اتصوّر في مصر بالكامل."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "director",
        "modelAnswer": "مخرج"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "He must be tired after that long flight.",
        "modelAnswer": "لازم يكون تعبان بعد الرحلة الطويلة دي."
      }
    }
  },
  "en-b1-u08": {
    "unitId": "en-b1-u08",
    "overview": "في وحدة «التعليم والمستقبل» (Live and learn)، الهدف إنك أتكلم عن خطط بعد وقت معيّن وأربط الأحداث بالوقت الصح. غطّينا القواعد الأساسية: first conditional: If I study hard, I'll pass؛ future time clauses with when, until, as soon as, after. وركّزنا على المفردات في محاور: التعليم، الجامعة والكورسات، الخطط. ومن الجمل اللي اتدربنا عليها «I'll call you as soon as I finish work.» و«We won't leave until the rain stops.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "I'll call you as soon as I finish work. We won't leave until the rain stops.",
        "modelAnswer": "هكلمك أول ما أخلص الشغل. / مش هنمشي لحد ما المطر يقف."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «التعليم»، زي المثال واستخدم نفس القواعد.",
        "prompt": "I'll call you as soon as I finish work.",
        "modelAnswer": "هكلمك أول ما أخلص الشغل."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "graduate",
        "modelAnswer": "يتخرّج"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "If you study hard, you'll pass the exam.",
        "modelAnswer": "لو ذاكرت كويس، هتنجح في الامتحان."
      }
    }
  },
  "en-b1-u09": {
    "unitId": "en-b1-u09",
    "overview": "في وحدة «البيت الحلم» (The hotel of Mum and Dad)، الهدف إنك أتخيل مواقف مختلفة عن الحاضر وأوصف البيوت والأماكن اللي عايش فيها. غطّينا القواعد الأساسية: second conditional: If I had more money, I'd buy a flat؛ choosing between first and second conditional. وركّزنا على المفردات في محاور: البيوت والأماكن، التخيّل والأحلام. ومن الجمل اللي اتدربنا عليها «If I had more money, I'd buy a flat by the sea.» و«If I were you, I'd move out of my parents' house.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "If I had more money, I'd buy a flat by the sea. If I were you, I'd move out of my parents' house.",
        "modelAnswer": "لو كان معايا فلوس أكتر، كنت هشتري شقة على البحر. / لو كنت مكانك، كنت هطلع من بيت أهلي."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «البيوت والأماكن»، زي المثال واستخدم نفس القواعد.",
        "prompt": "If I had more money, I'd buy a flat by the sea.",
        "modelAnswer": "لو كان معايا فلوس أكتر، كنت هشتري شقة على البحر."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "apartment",
        "modelAnswer": "شقة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "We have a small balcony with a nice view.",
        "modelAnswer": "عندنا بلكونة صغيرة بمنظر حلو."
      }
    }
  },
  "en-b1-u10": {
    "unitId": "en-b1-u10",
    "overview": "في وحدة «شغلانة مناسبة» (The right job for you / Have a nice day!)، الهدف إنك أتكلم عن الشغل والتسوّق، وأنقل كلام الناس بالـ reported speech، وأختار بين gerund والـ infinitive. غطّينا القواعد الأساسية: choosing between gerunds and infinitives: enjoy doing, decide to do؛ reported speech: sentences and questions (He said he was tired; She asked where I lived). وركّزنا على المفردات في محاور: الشغل والوظايف، التسوّق، تكوين الأسماء من الأفعال. ومن الجمل اللي اتدربنا عليها «I enjoy working in a team.» و«She decided to change jobs last year.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "I enjoy working in a team. She decided to change jobs last year.",
        "modelAnswer": "بستمتع إني أشتغل في فريق. / قررت تغيّر شغلها السنة اللي فاتت."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الشغل والوظايف»، زي المثال واستخدم نفس القواعد.",
        "prompt": "I enjoy working in a team.",
        "modelAnswer": "بستمتع إني أشتغل في فريق."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "employer",
        "modelAnswer": "صاحب الشغل"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "He said he would call me back.",
        "modelAnswer": "قال إنه هيكلمني تاني."
      }
    }
  },
  "en-b1-u11": {
    "unitId": "en-b1-u11",
    "overview": "في وحدة «صدفة حلوة وإنترنت» (Lucky encounters / Digital detox)، الهدف إنك أحكي عن موقف كان ممكن يحصل بشكل مختلف، وأتكلم عن الكميات والأجهزة. غطّينا القواعد الأساسية: third conditional: If I had seen him, I would have said hello؛ quantifiers: a lot of, a few, a little, enough, not any. وركّزنا على المفردات في محاور: المصادفات، الأجهزة الإلكترونية، الفصل من الموبايل. ومن الجمل اللي اتدربنا عليها «If I had seen the bus, I would have run for it.» و«If she hadn't lost her phone, she wouldn't have missed the call.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "If I had seen the bus, I would have run for it. If she hadn't lost her phone, she wouldn't have missed the call.",
        "modelAnswer": "لو كنت شفت الأتوبيس، كنت جريت وراه. / لو ما كانتش ضيعت موبايلها، ما كانتش فاتتها المكالمة."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «المصادفات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "If I had seen the bus, I would have run for it.",
        "modelAnswer": "لو كنت شفت الأتوبيس، كنت جريت وراه."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "encounter",
        "modelAnswer": "مقابلة/صدفة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "I don't have a lot of free time these days.",
        "modelAnswer": "مش عندي وقت فاضي كتير الأيام دي."
      }
    }
  },
  "en-b1-u12": {
    "unitId": "en-b1-u12",
    "overview": "في وحدة «الناس الكبار وقصص الجريمة» (Idols and icons / And the murderer is...)، الهدف إنك أوصف الناس والأشياء بجمل الوصف، وأتأكد من المعلومة بسؤال تأكيد في آخر الجملة. غطّينا القواعد الأساسية: relative clauses: defining (the man who...) and non-defining (My sister, who lives in Cairo...)؛ question tags: It's cold, isn't it? You don't like it, do you?. وركّزنا على المفردات في محاور: المشاهير، الجريمة والقضايا، الأسماء المركّبة. ومن الجمل اللي اتدربنا عليها «The actor who starred in that film is my idol.» و«My brother, who lives in Berlin, is a doctor.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "The actor who starred in that film is my idol. My brother, who lives in Berlin, is a doctor.",
        "modelAnswer": "الممثل اللي عمل الفيلم ده هو القدوة بتاعتي. / أخويا، اللي عايش في برلين، دكتور."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «المشاهير»، زي المثال واستخدم نفس القواعد.",
        "prompt": "The actor who starred in that film is my idol.",
        "modelAnswer": "الممثل اللي عمل الفيلم ده هو القدوة بتاعتي."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "celebrity",
        "modelAnswer": "مشهور"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "You don't know who did it, do you?",
        "modelAnswer": "إنت مش عارف مين عمل كده، صح؟"
      }
    }
  },
  "en-b2-u01": {
    "unitId": "en-b2-u01",
    "overview": "في وحدة «أسئلة وألغاز» (Questions and answers / It's a mystery)، الهدف إنك أسأل أسئلة معقّدة، وأستنتج معنى الكلمة من السياق، وأقارن بـ the more... the more. غطّينا القواعد الأساسية: question formation with auxiliary verbs and indirect questions؛ the more... the more..., comparatives with the same meaning. وركّزنا على المفردات في محاور: الأسئلة والإجابات، الألغاز، الصفات المركّبة. ومن الجمل اللي اتدربنا عليها «Could you tell me where the station is?» و«The more you practise, the better you get.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Could you tell me where the station is? The more you practise, the better you get.",
        "modelAnswer": "ممكن تقولي المحطة فين؟ / كل ما تتدرّب أكتر، هتبقى أحسن."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الأسئلة والإجابات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Could you tell me where the station is?",
        "modelAnswer": "ممكن تقولي المحطة فين؟"
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "context",
        "modelAnswer": "السياق"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "I wonder if he knows what happened.",
        "modelAnswer": "نفسي أعرف هو عارف اللي حصل ولا لأ."
      }
    }
  },
  "en-b2-u02": {
    "unitId": "en-b2-u02",
    "overview": "في وحدة «الدكتور وعمر الطلعة» (Doctor, doctor! / Act your age)، الهدف إنك أوصف المرض والإصابة وأتكلم عن اللبس والموضة، وأتكلم عن حالة مستمرة من الماضي للحاضر. غطّينا القواعد الأساسية: present perfect simple vs continuous: I've been feeling tired all week؛ using adjectives as nouns: the rich, the young؛ adjective order: a small old Italian car. وركّزنا على المفردات في محاور: الأمراض والإصابات، الملابس والموضة، الأعمار. ومن الجمل اللي اتدربنا عليها «I've been coughing since Monday.» و«She's been working here for ten years.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "I've been coughing since Monday. She's been working here for ten years.",
        "modelAnswer": "بقالي من الاتنين بكح. / هي شغالة هنا من عشر سنين."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الأمراض والإصابات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "I've been coughing since Monday.",
        "modelAnswer": "بقالي من الاتنين بكح."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "injury",
        "modelAnswer": "إصابة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "He's wearing a smart grey suit.",
        "modelAnswer": "لابس بدلة رمادي شيك."
      }
    }
  },
  "en-b2-u03": {
    "unitId": "en-b2-u03",
    "overview": "في وحدة «ربط الأحداث في الحكاية» (Fasten your seat belts)، الهدف إنك أحكي قصة سفر بالترتيب الزمني وأوضح تسلسل الأحداث وأستخدم so و such that. غطّينا القواعد الأساسية: narrative tenses: past simple, past continuous, past perfect, past perfect continuous؛ so / such... that for result. وركّزنا على المفردات في محاور: السفر بالطيارة، أحداث الرحلة، الترتيب الزمني. ومن الجمل اللي اتدربنا عليها «The plane had been waiting on the runway for an hour.» و«It was such a bumpy flight that I couldn't sleep.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "The plane had been waiting on the runway for an hour. It was such a bumpy flight that I couldn't sleep.",
        "modelAnswer": "الطيارة كانت مستنية على المدرج ساعة. / كانت رحلة مهزوزة لدرجة إني ما نمتش."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «السفر بالطيارة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "The plane had been waiting on the runway for an hour.",
        "modelAnswer": "الطيارة كانت مستنية على المدرج ساعة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "boarding pass",
        "modelAnswer": "بورد باس"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "We were flying over the mountains when the lights went off.",
        "modelAnswer": "كنا بنطير فوق الجبال لما النور قطع."
      }
    }
  },
  "en-b2-u04": {
    "unitId": "en-b2-u04",
    "overview": "في وحدة «مكان الكلمة الصح» (A really good ending?)، الهدف إنك أحط الـ adverbs والعبارات الظرفية في مكانها الصح وأحكي عن كتب وأفلام بنهاية حلوة. غطّينا القواعد الأساسية: position of adverbs: always, never, just, still with the verb؛ position of adverbial phrases: at the end, in the morning. وركّزنا على المفردات في محاور: الكتب والروايات، الأفلام، النهايات. ومن الجمل اللي اتدربنا عليها «I have never read a better ending.» و«The story eventually makes sense in the last chapter.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "I have never read a better ending. The story eventually makes sense in the last chapter.",
        "modelAnswer": "عمري ما قريت نهاية أحسن من كده. / القصة في الآخر بتتفهم في الفصل الأخير."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الكتب والروايات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "I have never read a better ending.",
        "modelAnswer": "عمري ما قريت نهاية أحسن من كده."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "plot",
        "modelAnswer": "حبكة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "I hardly ever watch films at the cinema.",
        "modelAnswer": "بالكاد بتفرج على أفلام في السينما."
      }
    }
  },
  "en-b2-u05": {
    "unitId": "en-b2-u05",
    "overview": "في وحدة «الجو والمستقبل المتوقع» (Stormy weather / A risky business)، الهدف إنك أتكلم عن المستقبل وأتوقع اللي هيحصل، وأتكلم عن الشروط اللي بتحصل بشكل متكرر وعن المخاطرة. غطّينا القواعد الأساسية: future perfect and future continuous: I'll have finished by 6; I'll be working at 9؛ zero and first conditionals, future time clauses (when, as soon as, until). وركّزنا على المفردات في محاور: البيئة والطقس، المخاطرة والقرارات، تعبيرات بـ take. ومن الجمل اللي اتدربنا عليها «By next year, I'll have finished my degree.» و«At this time tomorrow, I'll be flying to Dubai.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "By next year, I'll have finished my degree. At this time tomorrow, I'll be flying to Dubai.",
        "modelAnswer": "لحد السنة الجاية، هكون خلصت الجامعة. / الساعة كده بكرة، هكون طاير لدبي."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «البيئة والطقس»، زي المثال واستخدم نفس القواعد.",
        "prompt": "By next year, I'll have finished my degree.",
        "modelAnswer": "لحد السنة الجاية، هكون خلصت الجامعة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "climate",
        "modelAnswer": "مناخ"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "If you take a risk, you might lose everything.",
        "modelAnswer": "لو خاطرت، ممكن تخسر كل حاجة."
      }
    }
  },
  "en-b2-u06": {
    "unitId": "en-b2-u06",
    "overview": "في وحدة «لو كنت مكانه» (I'm a survivor / Wish you were here)، الهدف إنك أتكلم عن مواقف متخيلة، وأعبّر عن أمنيات وندم على الماضي، ومشاعري بالصفات الصح. غطّينا القواعد الأساسية: unreal conditionals (second): If I were you, I'd...؛ wish for present / future and wish for past regrets: I wish I had studied. وركّزنا على المفردات في محاور: المشاعر، الصفات المرتبطة بالمشاعر، الأسفار والذكريات. ومن الجمل اللي اتدربنا عليها «If I were you, I'd apologise.» و«I wish I could speak French fluently.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "If I were you, I'd apologise. I wish I could speak French fluently.",
        "modelAnswer": "لو كنت مكانك، كنت هعتذر. / نفسي أتكلم فرنساوي بطلاقة."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «المشاعر»، زي المثال واستخدم نفس القواعد.",
        "prompt": "If I were you, I'd apologise.",
        "modelAnswer": "لو كنت مكانك، كنت هعتذر."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "survivor",
        "modelAnswer": "ناجي"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "I wish I had listened to my parents.",
        "modelAnswer": "نفسي كنت سمعت كلام أهلي."
      }
    }
  },
  "en-b2-u07": {
    "unitId": "en-b2-u07",
    "overview": "في وحدة «عادات النوم والموسيقى» (Night night / Music to my ears)، الهدف إنك أتكلم عن عادات قديمة وتغيّرها، وأختار بين gerund و infinitive، وأتكلم عن الموسيقى. غطّينا القواعد الأساسية: used to, be used to, get used to؛ gerunds and infinitives: stop doing vs stop to do, remember + -ing / to. وركّزنا على المفردات في محاور: النوم والعادات، الموسيقى، كلمات من لغات تانية. ومن الجمل اللي اتدربنا عليها «I used to sleep with the TV on.» و«I'm not used to waking up so early.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "I used to sleep with the TV on. I'm not used to waking up so early.",
        "modelAnswer": "كنت بنام والتلفزيون شغال. / مش متعود أصحى بدري كده."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «النوم والعادات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "I used to sleep with the TV on.",
        "modelAnswer": "كنت بنام والتلفزيون شغال."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "insomnia",
        "modelAnswer": "أرق"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "I stopped to buy some water on the way.",
        "modelAnswer": "وقفت أشتري مية في الطريق."
      }
    }
  },
  "en-b2-u08": {
    "unitId": "en-b2-u08",
    "overview": "في وحدة «أعذار وأفعال متلخبطة» (Let's not argue / It's all an act)، الهدف إنك أتكلم عن الماضي المحتمل والندم، وأفرّق بين الأفعال المتشابهة، وأوصف الإحساس بالحواس. غطّينا القواعد الأساسية: past modals: must have, might have, can't have, should have؛ would rather; verbs of the senses: look, sound, feel, smell + adjective. وركّزنا على المفردات في محاور: الخلافات، الأفعال المتلخبطة، الجسم والحواس. ومن الجمل اللي اتدربنا عليها «She must have forgotten the meeting.» و«I should have called you earlier.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "She must have forgotten the meeting. I should have called you earlier.",
        "modelAnswer": "لازم تكون نسيت الاجتماع. / كان المفروض أكلمك بدري."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الخلافات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "She must have forgotten the meeting.",
        "modelAnswer": "لازم تكون نسيت الاجتماع."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "argue",
        "modelAnswer": "يتخانق"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "I'd rather stay at home tonight.",
        "modelAnswer": "أفضّل أقعد في البيت النهارده."
      }
    }
  },
  "en-b2-u09": {
    "unitId": "en-b2-u09",
    "overview": "في وحدة «الجريمة والقانون» (Cutting crime)، الهدف إنك أحكي عن الجريمة والعقاب بالمبني للمجهول، وأتكلم عن الأخبار المنقولة. غطّينا القواعد الأساسية: the passive in all forms, including have something done؛ it is said that..., he is thought to.... وركّزنا على المفردات في محاور: الجريمة والعقاب، القانون، الشرطة والمحاكم. ومن الجمل اللي اتدربنا عليها «The thief was arrested last night.» و«We're having the car repaired tomorrow.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "The thief was arrested last night. We're having the car repaired tomorrow.",
        "modelAnswer": "الحرامي اتقبض عليه امبارح بالليل. / هنخلي العربية تتصلّح بكرة."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الجريمة والعقاب»، زي المثال واستخدم نفس القواعد.",
        "prompt": "The thief was arrested last night.",
        "modelAnswer": "الحرامي اتقبض عليه امبارح بالليل."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "theft",
        "modelAnswer": "سرقة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "It is said that the house is haunted.",
        "modelAnswer": "بيقولوا إن البيت ده فيه عفاريت."
      }
    }
  },
  "en-b2-u10": {
    "unitId": "en-b2-u10",
    "overview": "في وحدة «الأخبار ومن قال إيه» (Fake news)، الهدف إنك أنقل كلام الناس بأفعال الإبلاغ الصح، وأتعرف على الأخبار المزيفة والإعلام. غطّينا القواعد الأساسية: reporting verbs + pattern: admit doing, deny doing, suggest doing / suggest that؛ reporting verbs: promise to, refuse to, agree to. وركّزنا على المفردات في محاور: الإعلام، الأخبار المزيفة، نقل الكلام. ومن الجمل اللي اتدربنا عليها «He admitted lying about the report.» و«She denied making the decision alone.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "He admitted lying about the report. She denied making the decision alone.",
        "modelAnswer": "هو اعترف إنه كدب في التقرير. / هي نفت إنها اتخذت القرار لوحدها."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الإعلام»، زي المثال واستخدم نفس القواعد.",
        "prompt": "He admitted lying about the report.",
        "modelAnswer": "هو اعترف إنه كدب في التقرير."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "headline",
        "modelAnswer": "عنوان الخبر"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "They suggested meeting at the cafe.",
        "modelAnswer": "اقترحوا نتقابل في الكافيه."
      }
    }
  },
  "en-b2-u11": {
    "unitId": "en-b2-u11",
    "overview": "في وحدة «الإعلانات والشركات» (Good business? / Super cities)، الهدف إنك أتكلم عن الإعلانات والشغل، وأستخدم clauses of contrast و purpose، وأتكلم عن المدن. غطّينا القواعد الأساسية: clauses of contrast (although, despite, however) and purpose (to, so that, in order to)؛ uncountable and plural nouns: information, advice, furniture; the police. وركّزنا على المفردات في محاور: الإعلانات، الشغل والشركات، المدن الكبيرة. ومن الجمل اللي اتدربنا عليها «Although the ad was short, it was very effective.» و«We saved money in order to buy a flat.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Although the ad was short, it was very effective. We saved money in order to buy a flat.",
        "modelAnswer": "رغم إن الإعلان كان قصير، كان مؤثر جداً. / وفّرنا فلوس عشان نشتري شقة."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الإعلانات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Although the ad was short, it was very effective.",
        "modelAnswer": "رغم إن الإعلان كان قصير، كان مؤثر جداً."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "advertising",
        "modelAnswer": "إعلانات"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "I need some advice about the furniture.",
        "modelAnswer": "محتاج نصيحة عن الفرش."
      }
    }
  },
  "en-b2-u12": {
    "unitId": "en-b2-u12",
    "overview": "في وحدة «علم ولا خيال علمي» (Science fact, science-fiction / Free speech)، الهدف إنك أتكلم عن العلم والخيال العلمي باستخدام الـ quantifiers والـ articles، وأتكلم عن حرية التعبير. غطّينا القواعد الأساسية: quantifiers: all, every, both, either, neither, none؛ articles: a, an, the, zero article with general nouns. وركّزنا على المفردات في محاور: العلم، الخيال العلمي، حرية التعبير. ومن الجمل اللي اتدربنا عليها «Both films are about time travel.» و«Neither of the experiments worked.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Both films are about time travel. Neither of the experiments worked.",
        "modelAnswer": "الفيلمين الاتنين عن السفر عبر الزمن. / ولا واحدة من التجربتين نجحت."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «العلم»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Both films are about time travel.",
        "modelAnswer": "الفيلمين الاتنين عن السفر عبر الزمن."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "experiment",
        "modelAnswer": "تجربة علمية"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Every scientist should respect the facts.",
        "modelAnswer": "كل عالم لازم يحترم الحقايق."
      }
    }
  },
  "en-c1-u01": {
    "unitId": "en-c1-u01",
    "overview": "في وحدة «احنا عيلة» (We are family / A job for life?)، الهدف إنك أتكلم عن الشخصية والعيلة والشغل بشكل دقيق، وأستخدم الـ linkers بثقة. غطّينا القواعد الأساسية: have: lexical and grammatical uses (have a shower, have got, have to)؛ discourse markers (1): linkers such as however, although, moreover. وركّزنا على المفردات في محاور: الشخصية، العيلة، الشغل. ومن الجمل اللي اتدربنا عليها «I have a lot of respect for my parents.» و«However hard the job is, I'll stay.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "I have a lot of respect for my parents. However hard the job is, I'll stay.",
        "modelAnswer": "عندي احترام كبير لأهلي. / مهما كان الشغل صعب، هفضل."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الشخصية»، زي المثال واستخدم نفس القواعد.",
        "prompt": "I have a lot of respect for my parents.",
        "modelAnswer": "عندي احترام كبير لأهلي."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "personality",
        "modelAnswer": "شخصية"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "She has a strong personality, moreover she's very organised.",
        "modelAnswer": "عندها شخصية قوية، وعلاوة على كده منظمة جداً."
      }
    }
  },
  "en-c1-u02": {
    "unitId": "en-c1-u02",
    "overview": "في وحدة «ذكريات وكلمات على طرف اللسان» (Do you remember...? / On the tip of my tongue)، الهدف إنك أحكي عن عادات وذكريات في الماضي، وأستخدم الضمائر والمفردات الدقيقة بتعبيرات الكلام. غطّينا القواعد الأساسية: the past: habitual events and specific incidents (would, used to vs past simple)؛ pronouns: indefinite and reflexive uses (someone, nobody, each other). وركّزنا على المفردات في محاور: الذكريات، الكلمات المنسية، الاسماء المجردة. ومن الجمل اللي اتدربنا عليها «When I was a child, I would spend hours at my grandmother's house.» و«I used to hate school, but I loved my friends.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "When I was a child, I would spend hours at my grandmother's house. I used to hate school, but I loved my friends.",
        "modelAnswer": "لما كنت طفل، كنت بقضي ساعات في بيت جدتي. / كنت بكره المدرسة، بس كنت بحب أصحابي."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الذكريات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "When I was a child, I would spend hours at my grandmother's house.",
        "modelAnswer": "لما كنت طفل، كنت بقضي ساعات في بيت جدتي."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "memory",
        "modelAnswer": "ذاكرة/ذكرى"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "I can't recall his name, it's on the tip of my tongue.",
        "modelAnswer": "مش فاكر اسمه، على طرف لساني."
      }
    }
  },
  "en-c1-u03": {
    "unitId": "en-c1-u03",
    "overview": "في وحدة «علاقة حب وكره» (A love-hate relationship / Dramatic licence)، الهدف إنك أعبّر عن المواقف والمشاعر بـ get، وأستخدم المحددات المتقدمة للربط والتعبير عن التوقعات. غطّينا القواعد الأساسية: get: passive (get hurt), change of state (get tired), get + to + infinitive؛ discourse markers (2): adverbs and adverbial expressions (in fact, actually, frankly). وركّزنا على المفردات في محاور: العلاقات والمشاعر، الصراع والحرب، التاريخ. ومن الجمل اللي اتدربنا عليها «I got hurt when I fell off my bike.» و«We don't really get on with our neighbours.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "I got hurt when I fell off my bike. We don't really get on with our neighbours.",
        "modelAnswer": "اتوجعت لما وقعت من على العجلة. / إحنا فعلاً مش متعايشين مع الجيران."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «العلاقات والمشاعر»، زي المثال واستخدم نفس القواعد.",
        "prompt": "I got hurt when I fell off my bike.",
        "modelAnswer": "اتوجعت لما وقعت من على العجلة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "attitude",
        "modelAnswer": "موقف/تصرف"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Frankly, I think the film was exaggerated.",
        "modelAnswer": "بصراحة، أنا شايف إن الفيلم كان مبالغ فيه."
      }
    }
  },
  "en-c1-u04": {
    "unitId": "en-c1-u04",
    "overview": "في وحدة «كتاب مفتوح وصوت الصمت» (An open book / The sound of silence)، الهدف إنك أعلّق على الكتب والأفلام بتراكيب تأكيد، وأتكلم عن الأصوات والاستنتاج. غطّينا القواعد الأساسية: adding emphasis (1): inversion (Never have I..., Rarely does he...)؛ speculation and deduction: must, might, can't, could have + past participle. وركّزنا على المفردات في محاور: الكتب والأفلام، الأصوات، الاستنتاج. ومن الجمل اللي اتدربنا عليها «Never have I read such a gripping book.» و«Rarely does a film surprise me like this one.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Never have I read such a gripping book. Rarely does a film surprise me like this one.",
        "modelAnswer": "عمري ما قريت كتاب مشوّق كده. / نادراً ما فيلم يفاجئني زي ده."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الكتب والأفلام»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Never have I read such a gripping book.",
        "modelAnswer": "عمري ما قريت كتاب مشوّق كده."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "plot",
        "modelAnswer": "حبكة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "That noise must have come from the kitchen.",
        "modelAnswer": "الصوت ده لازم يكون جاي من المطبخ."
      }
    }
  },
  "en-c1-u05": {
    "unitId": "en-c1-u05",
    "overview": "في وحدة «مفيش وقت لأي حاجة» (No time for anything / Not for profit?)، الهدف إنك أتكلم عن الوقت والفلوس وأعبّر عن الأسف والافتراضات بالماضي غير الحقيقي. غطّينا القواعد الأساسية: distancing: it's possible that, it is unlikely that, I would prefer it if؛ unreal uses of past tenses: It's time we left; I'd rather you didn't; if only. وركّزنا على المفردات في محاور: الوقت، الفلوس، الاستقرار والضغط. ومن الجمل اللي اتدربنا عليها «It's time we talked about the budget.» و«I'd rather you didn't come late again.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "It's time we talked about the budget. I'd rather you didn't come late again.",
        "modelAnswer": "حان الوقت نتكلم في الميزانية. / أفضّل إنك ما تتأخرش تاني."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الوقت»، زي المثال واستخدم نفس القواعد.",
        "prompt": "It's time we talked about the budget.",
        "modelAnswer": "حان الوقت نتكلم في الميزانية."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "deadline",
        "modelAnswer": "ميعاد أخير"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "If only I had more time for myself.",
        "modelAnswer": "ياريت كان عندي وقت أكتر لنفسي."
      }
    }
  },
  "en-c1-u06": {
    "unitId": "en-c1-u06",
    "overview": "في وحدة «ساعدوني، أنا محتاج حد» (Help, I need somebody! / Can't give it up)، الهدف إنك أطلب مساعدة وأتكلم عن العادات والإدمان بشرط وكلام مصوغ بدقة. غطّينا القواعد الأساسية: verb + object + infinitive or gerund: help someone (to) do; let me do / letting me do؛ conditional sentences: mixed and advanced forms (If I hadn't..., I'd be...). وركّزنا على المفردات في محاور: المساعدة، التكنولوجيا، الإدمان والعادات. ومن الجمل اللي اتدربنا عليها «Could you help me (to) move this table?» و«If I hadn't checked my phone, I'd have finished the work.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Could you help me (to) move this table? If I hadn't checked my phone, I'd have finished the work.",
        "modelAnswer": "ممكن تساعدني أحرّك الترابيزة دي؟ / لو ما كنتش بصيت على الموبايل، كنت خلصت الشغل."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «المساعدة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Could you help me (to) move this table?",
        "modelAnswer": "ممكن تساعدني أحرّك الترابيزة دي؟"
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "assist",
        "modelAnswer": "يساعد"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "I can't give up coffee, even though I know it's bad.",
        "modelAnswer": "مش قادر أبطّل قهوة، رغم إني عارف إنها وحشة."
      }
    }
  },
  "en-c1-u07": {
    "unitId": "en-c1-u07",
    "overview": "في وحدة «بالحق كده» (As a matter of fact... / A masterpiece?)، الهدف إنك أعبّر عن الإذن والالتزام والضرورة، وأوصف الفن والإحساس بدقة. غطّينا القواعد الأساسية: permission, obligation and necessity: be allowed to, be supposed to, needn't, mustn't؛ perception and sensation: see / watch / notice + object + verb (base or -ing). وركّزنا على المفردات في محاور: الفن، الألوان، الإنتاج الفني. ومن الجمل اللي اتدربنا عليها «You're not allowed to take photos in this room.» و«We needn't hurry, the exhibition is open all day.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "You're not allowed to take photos in this room. We needn't hurry, the exhibition is open all day.",
        "modelAnswer": "مش مسموح تصوّر في الأوضة دي. / مش لازم نستعجل، المعرض مفتوح طول اليوم."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الفن»، زي المثال واستخدم نفس القواعد.",
        "prompt": "You're not allowed to take photos in this room.",
        "modelAnswer": "مش مسموح تصوّر في الأوضة دي."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "prefix",
        "modelAnswer": "بادئة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "I watched the painter add the final colour.",
        "modelAnswer": "تفرّجت على الرسام وهو بيحط اللون الأخير."
      }
    }
  },
  "en-c1-u08": {
    "unitId": "en-c1-u08",
    "overview": "في وحدة «صحة وسفر» (The best medicine? / A 'must see' attraction)، الهدف إنك أتكلم عن الصحة والطب بالمصادر، وأعبّر عن الخطط المستقبلية والترتيبات. غطّينا القواعد الأساسية: advanced gerunds and infinitives: after prepositions, as subjects, with it + adjective؛ expressing future plans and arrangements: be due to, be about to, be to + infinitive. وركّزنا على المفردات في محاور: الصحة والطب، السفر والسياحة، التشبيهات. ومن الجمل اللي اتدربنا عليها «Laughing is the best medicine for stress.» و«We're about to start the tour.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Laughing is the best medicine for stress. We're about to start the tour.",
        "modelAnswer": "الضحك أحسن دوا للتوتر. / إحنا على وشك نبدأ الجولة."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الصحة والطب»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Laughing is the best medicine for stress.",
        "modelAnswer": "الضحك أحسن دوا للتوتر."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "remedy",
        "modelAnswer": "علاج"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "The train is due to leave at seven.",
        "modelAnswer": "القطر من المفروض يمشي الساعة سبعة."
      }
    }
  },
  "en-c1-u09": {
    "unitId": "en-c1-u09",
    "overview": "في وحدة «حيوانات وأكل» (Pet hates / How to cook, how to eat)، الهدف إنك أتكلم عن الحيوانات الأليفة والأكل، وأختصر الكلام بالـ ellipsis والـ compound nouns. غطّينا القواعد الأساسية: ellipsis: leaving out repeated words (I can, and so can she; Want some tea? Yes)؛ nouns: compound nouns and possessive forms (a dog's bowl, a cookbook). وركّزنا على المفردات في محاور: الحيوانات الأليفة، الطبخ، الأكل. ومن الجمل اللي اتدربنا عليها «Do you want some soup? Yes, please.» و«I can cook, and so can my sister.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Do you want some soup? Yes, please. I can cook, and so can my sister.",
        "modelAnswer": "عايز شوربة؟ أيوه من فضلك. / أنا بعرف أطبخ، وأختي كمان بتعرف."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الحيوانات الأليفة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Do you want some soup? Yes, please.",
        "modelAnswer": "عايز شوربة؟ أيوه من فضلك."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "pet",
        "modelAnswer": "حيوان أليف"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "The cat's bowl is empty again.",
        "modelAnswer": "طبق القطة فاضي تاني."
      }
    }
  },
  "en-c1-u10": {
    "unitId": "en-c1-u10",
    "overview": "في وحدة «على علامتكم جاهزين، ابدأوا» (On your marks, set, go! / No direction home)، الهدف إنك أوصف الرياضة والناس بجمل الوصف، وأركّز على الكلام بالـ cleft sentences للتأكيد. غطّينا القواعد الأساسية: relative clauses (defining, non-defining, with prepositions)؛ adding emphasis (2): cleft sentences (It was Ali who..., What I need is...). وركّزنا على المفردات في محاور: الرياضة، الكلمات المتشابهة، الأماكن والاتجاهات. ومن الجمل اللي اتدربنا عليها «The athlete who won the race lives in Cairo.» و«It was my brother who fixed the car.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "The athlete who won the race lives in Cairo. It was my brother who fixed the car.",
        "modelAnswer": "الرياضي اللي كسب السباق عايش في القاهرة. / أخويا هو اللي صلّح العربية."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الرياضة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "The athlete who won the race lives in Cairo.",
        "modelAnswer": "الرياضي اللي كسب السباق عايش في القاهرة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "race",
        "modelAnswer": "سباق"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "What I really need is a holiday.",
        "modelAnswer": "اللي أنا محتاجه فعلاً إجازة."
      }
    }
  },
  "en-c2-u01": {
    "unitId": "en-c2-u01",
    "overview": "في وحدة «كلمة في مكانها بالظبط» (Precision in words)، الهدف إنك أختار الكلمة والتعبير الأدق من بين بدائل قريبة من بعض، وأستخدم الـ idioms والـ collocations في سياقها. غطّينا القواعد الأساسية: complementation: verb + -ing / to-infinitive with change of meaning (regret to say vs regret saying)؛ word formation: negative and reversive prefixes (dis-, de-, un-, mis-) and suffixes (-ify, -ise, -ness). وركّزنا على المفردات في محاور: التعبيرات الاصطلاحية، الكلمات المتقاربة في المعنى، الفعل والمصطلح. ومن الجمل اللي اتدربنا عليها «I regret to inform you that the position has been filled.» و«I regret saying that; I didn't mean it.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "I regret to inform you that the position has been filled. I regret saying that; I didn't mean it.",
        "modelAnswer": "للأسف أبلغك إن الوظيفة اتملّت. / ندمان إني قلت كده، ما كنتش قاصد."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «التعبيرات الاصطلاحية»، زي المثال واستخدم نفس القواعد.",
        "prompt": "I regret to inform you that the position has been filled.",
        "modelAnswer": "للأسف أبلغك إن الوظيفة اتملّت."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "meticulous",
        "modelAnswer": "دقيق جداً"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "The delay was inadvertently caused by a clerical error.",
        "modelAnswer": "التأخير حصل من غير قصد بسبب غلطة إدارية."
      }
    }
  },
  "en-c2-u02": {
    "unitId": "en-c2-u02",
    "overview": "في وحدة «القواعد في الجملة الدقيقة» (Grammar under pressure)، الهدف إنك أكمّل الجمل بالقواعد الصح بدون غلط، وأعيد صياغة الجمل بنفس المعنى بالتراكيب المتقدمة. غطّينا القواعد الأساسية: inversion after negative and restrictive adverbials: Hardly had I arrived when...; Not only did she...؛ mixed conditionals and the subjunctive: It is essential that he be informed; If I had taken the job, I'd be living abroad now. وركّزنا على المفردات في محاور: التراكيب المعقدة، الشرط والافتراض، الرسمية. ومن الجمل اللي اتدربنا عليها «Hardly had we sat down when the lights went out.» و«Had it not been for your help, we would have failed.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Hardly had we sat down when the lights went out. Had it not been for your help, we would have failed.",
        "modelAnswer": "ما كنا قعدنا خالص لما النور قطع. / لولا مساعدتك، كنا هنفشل."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «التراكيب المعقدة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Hardly had we sat down when the lights went out.",
        "modelAnswer": "ما كنا قعدنا خالص لما النور قطع."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "hardly",
        "modelAnswer": "بالكاد"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "It is imperative that the report be submitted on time.",
        "modelAnswer": "من الضروري جداً إن التقرير يتسلّم في معاده."
      }
    }
  },
  "en-c2-u03": {
    "unitId": "en-c2-u03",
    "overview": "في وحدة «القراءة بين السطور» (Reading between the lines)، الهدف إنك أستنتج الرأي والنبرة والنية في النص، وأفرّق بين المعلومة الصريحة والمقصودة ضمنياً. غطّينا القواعد الأساسية: hedging and stance: arguably, presumably, it could be argued that؛ reference and emphasis that signal attitude: such, the very, nothing short of. وركّزنا على المفردات في محاور: الرأي والنبرة، النقد، الاستنتاج من النص. ومن الجمل اللي اتدربنا عليها «The review was scathing, though arguably a little unfair.» و«His tone was tongue-in-cheek, presumably to soften the criticism.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "The review was scathing, though arguably a little unfair. His tone was tongue-in-cheek, presumably to soften the criticism.",
        "modelAnswer": "المراجعة كانت لاذعة، وممكن نقول إنها شوية ظالمة. / نبرته كانت ساخرة بخفة، غالباً عشان يخفف النقد."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الرأي والنبرة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "The review was scathing, though arguably a little unfair.",
        "modelAnswer": "المراجعة كانت لاذعة، وممكن نقول إنها شوية ظالمة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "ambivalent",
        "modelAnswer": "متردد بين رأيين"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "The result was nothing short of a triumph.",
        "modelAnswer": "النتيجة ماكانتش أقل من انتصار."
      }
    }
  },
  "en-c2-u04": {
    "unitId": "en-c2-u04",
    "overview": "في وحدة «النص متماسك ومترابط» (Holding a text together)، الهدف إنك أرتّب الأفكار في نص طويل بحيث كل فكرة تتصل بالتي قبلها، وأستخدم روابط ومراجع دقيقة. غطّينا القواعد الأساسية: cohesion: reference (this, such, the former / the latter) and substitution (do so, one)؛ linking adverbials of result, contrast and concession: consequently, nevertheless, by contrast. وركّزنا على المفردات في محاور: الترابط النصي، تنظيم الأفكار، الانتقال بين الأفكار. ومن الجمل اللي اتدربنا عليها «Prices rose sharply; consequently, many families cut back.» و«The first plan was cheap, whereas the second was far more reliable.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Prices rose sharply; consequently, many families cut back. The first plan was cheap, whereas the second was far more reliable.",
        "modelAnswer": "الأسعار طلعت جامد؛ ونتيجة لكده، عيلات كتير قللت مصاريفها. / الخطة الأولى كانت رخيصة، في حين إن التانية كانت أكتر موثوقية."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الترابط النصي»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Prices rose sharply; consequently, many families cut back.",
        "modelAnswer": "الأسعار طلعت جامد؛ ونتيجة لكده، عيلات كتير قللت مصاريفها."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "consequently",
        "modelAnswer": "ونتيجة لكده"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Some argue for reform; the latter view, however, is more popular.",
        "modelAnswer": "فيه ناس بتنادي بالإصلاح؛ بس الرأي التاني أشهر."
      }
    }
  },
  "en-c2-u05": {
    "unitId": "en-c2-u05",
    "overview": "في وحدة «أكتب زي المحترفين» (Writing with authority)، الهدف إنك أكتب مقال أو تقرير أو مراجعة بتلخّص وجهتين وأقيّمهم وأدي رأيي بشكل مقنع. غطّينا القواعد الأساسية: nominalisation for formal register: the implementation of, the improvement in؛ hedging and evaluation: it is widely argued that, on balance, the strongest case for. وركّزنا على المفردات في محاور: التلخيص، التقييم، الكتابة الرسمية. ومن الجمل اللي اتدربنا عليها «Both writers agree on the problem, but they differ sharply on its causes.» و«On balance, the first argument is more credible than the second.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Both writers agree on the problem, but they differ sharply on its causes. On balance, the first argument is more credible than the second.",
        "modelAnswer": "الكاتبين الاتنين متفقين على المشكلة، بس مختلفين جداً في أسبابها. / بعد ما نوازن، الحجة الأولى أكتر موثوقية من التانية."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «التلخيص»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Both writers agree on the problem, but they differ sharply on its causes.",
        "modelAnswer": "الكاتبين الاتنين متفقين على المشكلة، بس مختلفين جداً في أسبابها."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "summarise",
        "modelAnswer": "يلخّص"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "The implementation of the policy was flawed from the start.",
        "modelAnswer": "تنفيذ السياسة كان فيه عيوب من البداية."
      }
    }
  },
  "en-c2-u06": {
    "unitId": "en-c2-u06",
    "overview": "في وحدة «نتكلم ونسمع بدقة» (Listening and discussing)، الهدف إنك أفهم الكلام المسموع بسرعة وأستنتج المقصود، وأتناقش مع حد وأختلف بأدب وأوصل لقرار مشترك. غطّينا القواعد الأساسية: speculation and deduction: might have been, must have had, can't possibly be؛ agreeing, disagreeing and proposing: I see your point, but..., Let's go with.... وركّزنا على المفردات في محاور: الاستماع والفهم، المناقشة واتخاذ القرار، التخمين والتوقع. ومن الجمل اللي اتدربنا عليها «I see your point, but I'm not convinced it's the best option.» و«The speaker must have been under pressure when she said that.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "I see your point, but I'm not convinced it's the best option. The speaker must have been under pressure when she said that.",
        "modelAnswer": "فاهم وجهة نظرك، بس مش مقتنع إنها أحسن اختيار. / المتكلمة لازم كانت تحت ضغط لما قالت كده."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الاستماع والفهم»، زي المثال واستخدم نفس القواعد.",
        "prompt": "I see your point, but I'm not convinced it's the best option.",
        "modelAnswer": "فاهم وجهة نظرك، بس مش مقتنع إنها أحسن اختيار."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "gist",
        "modelAnswer": "الفكرة الأساسية"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Let's weigh up the cost against the benefits before we decide.",
        "modelAnswer": "خلينا نوازن التكلفة مع الفوايد قبل ما نقرر."
      }
    }
  }
};
