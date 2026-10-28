// مولّد تلقائياً من الـ syllabus (scripts/generate-unit-summaries.mjs).
// المحتوى الأجنبي كله مأخوذ من جمل/مفردات الـ syllabus الصحيحة؛
// والـ overview بالعربي مبني من عنوان وقواعد ومحاور الوحدة. بيانات ثابتة.
import type { UnitHandAuthored } from "../unit-summary/types";

export const UNIT_SUMMARY_ES: Record<string, UnitHandAuthored> = {
  "es-a1-u01": {
    "unitId": "es-a1-u01",
    "overview": "في وحدة «التحيات والتعريف بالنفس» (¡Hola! Me llamo...)، الهدف إنك أقدر أحيّي حد، أعرّف بنفسي (اسمي/منين)، وأسأل غيري بنفس الأسئلة. غطّينا القواعد الأساسية: verbo ser: soy, eres, es, somos؛ presente: me llamo, vivo, vengo؛ sujetos: yo, tú, él, ella, nosotros, ustedes. وركّزنا على المفردات في محاور: التحيات، الاسم والبلد، الوداع. ومن الجمل اللي اتدربنا عليها «¡Hola! Me llamo Ahmed.» و«¿Cómo te llamas?». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "¡Hola! Me llamo Ahmed. ¿Cómo te llamas?",
        "modelAnswer": "أهلاً! اسمي أحمد. / اسمك إيه؟ (غير رسمية)"
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «التحيات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "¡Hola! Me llamo Ahmed.",
        "modelAnswer": "أهلاً! اسمي أحمد."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "hola",
        "modelAnswer": "أهلاً/هاي"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Soy de Egipto.",
        "modelAnswer": "أنا من مصر."
      }
    }
  },
  "es-a1-u02": {
    "unitId": "es-a1-u02",
    "overview": "في وحدة «الأرقام والوقت» (¿Qué hora es?)، الهدف إنك أقدر أقول الأرقام من 0 لـ100، وأسأل وأقول الوقت، وأسمي أيام الأسبوع. غطّينا القواعد الأساسية: números 0–100؛ ¿Qué hora es? — Son las ... / Es la ...؛ a + hora, el + día de la semana. وركّزنا على المفردات في محاور: الأرقام، الساعة، أيام الأسبوع والتواريخ. ومن الجمل اللي اتدربنا عليها «¿Qué hora es?» و«Son las tres.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "¿Qué hora es? Son las tres.",
        "modelAnswer": "الساعة كام؟ / الساعة تلاتة."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الأرقام»، زي المثال واستخدم نفس القواعد.",
        "prompt": "¿Qué hora es?",
        "modelAnswer": "الساعة كام؟"
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "la hora",
        "modelAnswer": "الساعة/الوقت"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Son las ocho y media.",
        "modelAnswer": "الساعة تمانية ونص."
      }
    }
  },
  "es-a1-u03": {
    "unitId": "es-a1-u03",
    "overview": "في وحدة «العائلة والأصدقاء» (Esta es mi familia)، الهدف إنك أقدر أعرّف أفراد العائلة، وأوصفهم بصفات بسيطة، وأسأل عن السن. غطّينا القواعد الأساسية: verbo tener: tengo ... años؛ posesivos: mi, tu, su؛ adjetivos: alto, bajo, joven, mayor, gracioso. وركّزنا على المفردات في محاور: أفراد العائلة، الأصدقاء، الوصف البسيط. ومن الجمل اللي اتدربنا عليها «Esta es mi hermana.» و«Tengo dos hermanos.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Esta es mi hermana. Tengo dos hermanos.",
        "modelAnswer": "دي أختي. / عندي أخين."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «أفراد العائلة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Esta es mi hermana.",
        "modelAnswer": "دي أختي."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "la madre",
        "modelAnswer": "أم"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Ella es alta y graciosa.",
        "modelAnswer": "هي طويلة ومضحكة."
      }
    }
  },
  "es-a1-u04": {
    "unitId": "es-a1-u04",
    "overview": "في وحدة «الأكل والشرب» (Quiero un café)، الهدف إنك أقدر أطلب أكل وشرب بأدب، وأقول بحب إيه ومش بحب إيه. غطّينا القواعد الأساسية: presente: quiero, me gusta, como؛ gustar: me gusta / no me gusta؛ algo de / nada de؛ Quiero ..., por favor. وركّزنا على المفردات في محاور: أكل البيت والمطعم، المشروبات، الإفطار والعشاء. ومن الجمل اللي اتدربنا عليها «Quiero un café, por favor.» و«¿Qué comes?». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Quiero un café, por favor. ¿Qué comes?",
        "modelAnswer": "أريد قهوة من فضلك. / بتاكل إيه؟"
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «أكل البيت والمطعم»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Quiero un café, por favor.",
        "modelAnswer": "أريد قهوة من فضلك."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "el pan",
        "modelAnswer": "عيش/خبز"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Me gusta mucho el queso.",
        "modelAnswer": "بحب الجبنة أوي."
      }
    }
  },
  "es-a1-u05": {
    "unitId": "es-a1-u05",
    "overview": "في وحدة «الطقس والملابس» (Hace buen tiempo)، الهدف إنك أقدر أقول إيه حالة الطقس، وأوصف اللي لابسه دلوقتي. غطّينا القواعد الأساسية: hace + adjectivo: hace frío / hace calor؛ verbo llevar: llevo, llevas؛ adjetivos: bueno, malo, chaud → caluroso, frío. وركّزنا على المفردات في محاور: الطقس، الملابس، الوصف. ومن الجمل اللي اتدربنا عليها «Hace buen tiempo hoy.» و«Hace frío, llevo mi abrigo.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Hace buen tiempo hoy. Hace frío, llevo mi abrigo.",
        "modelAnswer": "الجو حلو النهارده. / الجو بارد، لابس بالطوي."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الطقس»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Hace buen tiempo hoy.",
        "modelAnswer": "الجو حلو النهارده."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "el tiempo",
        "modelAnswer": "الطقس"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "¿Qué tiempo hace en Madrid?",
        "modelAnswer": "الجو عامل إيه في مدريد؟"
      }
    }
  },
  "es-a1-u06": {
    "unitId": "es-a1-u06",
    "overview": "في وحدة «الأماكن والاتجاهات» (¿Dónde está la farmacia?)، الهدف إنك أقدر أسأل عن مكان وأفهم وإدي اتجاهات بسيطة في الشارع. غطّينا القواعد الأساسية: artículos definidos: el, la, los, las؛ hay + lugar؛ ¿Dónde está ...? — a la izquierda, a la derecha, todo recto؛ preposiciones: cerca de, lejos de, enfrente de. وركّزنا على المفردات في محاور: محلات ومعالم الحي، الاتجاهات، اماكن. ومن الجمل اللي اتدربنا عليها «¿Dónde está la farmacia, por favor?» و«Está a la izquierda, todo recto.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "¿Dónde está la farmacia, por favor? Está a la izquierda, todo recto.",
        "modelAnswer": "الصيدلية فين من فضلك؟ / على الشمال، كلها قدامك."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «محلات ومعالم الحي»، زي المثال واستخدم نفس القواعد.",
        "prompt": "¿Dónde está la farmacia, por favor?",
        "modelAnswer": "الصيدلية فين من فضلك؟"
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "la farmacia",
        "modelAnswer": "صيدلية"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Hay un supermercado aquí.",
        "modelAnswer": "في سوبر ماركت هنا."
      }
    }
  },
  "es-a1-u07": {
    "unitId": "es-a1-u07",
    "overview": "في وحدة «الأسئلة الأساسية» (¿Cómo se dice...?)، الهدف إنك أقدر أسأل عن معنى كلمة، وأطلب التكرار والبطء، وأفهم رد بسيط. غطّينا القواعد الأساسية: interrogativos: quién, qué, dónde, cuándo, cómo, por qué؛ ¿... ? con ¿Cómo se dice ...?؛ ¿Puede repetir, por favor?. وركّزنا على المفردات في محاور: السؤال عن المعنى، التعلم، عدم الفهم. ومن الجمل اللي اتدربنا عليها «¿Cómo se dice «bread» en español?» و«¿Puede repetir, por favor?». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "¿Cómo se dice «bread» en español? ¿Puede repetir, por favor?",
        "modelAnswer": "إزاي أقول «bread» بالإسبانية؟ / ممكن تكرر من فضلك؟"
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «السؤال عن المعنى»، زي المثال واستخدم نفس القواعد.",
        "prompt": "¿Cómo se dice «bread» en español?",
        "modelAnswer": "إزاي أقول «bread» بالإسبانية؟"
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "cómo",
        "modelAnswer": "إزاي"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Hable más despacio, por favor.",
        "modelAnswer": "اتكلم ببطء أكتر من فضلك."
      }
    }
  },
  "es-a1-u08": {
    "unitId": "es-a1-u08",
    "overview": "في وحدة «الروتين اليومي والشغل» (Mi día típico)، الهدف إنك أقدر أحكي عن روتيني اليومي ويوم شغلي بالمضارع البسيط. غطّينا القواعد الأساسية: presente de verbos regulares: -ar, -er, -ir؛ reflexivos: levantarse, acostarse؛ a + hora: me levanto a las siete. وركّزنا على المفردات في محاور: الصباح والمساء، الشغل والدراسة، العادة. ومن الجمل اللي اتدربنا عليها «Me levanto a las siete.» و«Normalmente voy al trabajo a las ocho.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Me levanto a las siete. Normalmente voy al trabajo a las ocho.",
        "modelAnswer": "بصحى الساعة سبعة. / عادةً بروح الشغل الساعة تمانية."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الصباح والمساء»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Me levanto a las siete.",
        "modelAnswer": "بصحى الساعة سبعة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "levantarse",
        "modelAnswer": "ينهض/يصحى"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "¿Te acuestas tarde?",
        "modelAnswer": "بتروح نام متأخر؟"
      }
    }
  },
  "es-a1-u09": {
    "unitId": "es-a1-u09",
    "overview": "في وحدة «التسوق والأسعار» (¿Cuánto cuesta?)، الهدف إنك أقدر أسأل عن السعر، وأشتري، وأسأل عن اللون والمقاس. غطّينا القواعد الأساسية: números 100–1000؛ ¿Cuánto cuesta? — Cuesta ... euros؛ quiero + artículo: quiero una camisa؛ muy caro / barato. وركّزنا على المفردات في محاور: المحلات، السعر والمال، اللون والمقاس. ومن الجمل اللي اتدربنا عليها «¿Cuánto cuesta?» و«Cuesta diez euros.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "¿Cuánto cuesta? Cuesta diez euros.",
        "modelAnswer": "بكام ده؟ / عشرة يورو."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «المحلات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "¿Cuánto cuesta?",
        "modelAnswer": "بكام ده؟"
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "el precio",
        "modelAnswer": "سعر"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Quiero probarme esta camisa.",
        "modelAnswer": "حابب أجرب القميص ده."
      }
    }
  },
  "es-a1-u10": {
    "unitId": "es-a1-u10",
    "overview": "في وحدة «الصحة والجسم» (Me duele la cabeza)، الهدف إنك أقدر أوصف ألم بسيط، وأنصح بالراحة، وأروح لدكتور. غطّينا القواعد الأساسية: doler: me duele la cabeza / me duele el estómago؛ hay que + verbo: hay que descansar؛ pronombres de objeto: lo, la, les — lo tomo. وركّزنا على المفردات في محاور: أجهزة الجسم، عند الطبيب، الدواء والراحة. ومن الجمل اللي اتدربنا عليها «Me duele la cabeza.» و«Estoy enfermo, tengo fiebre.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Me duele la cabeza. Estoy enfermo, tengo fiebre.",
        "modelAnswer": "رأسي بتوجعني. / أنا تعبان وليّا حمّى."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «أجهزة الجسم»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Me duele la cabeza.",
        "modelAnswer": "رأسي بتوجعني."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "la cabeza",
        "modelAnswer": "رأس"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Hay que pedir cita.",
        "modelAnswer": "لازم تحجز موعد."
      }
    }
  },
  "es-a1-u11": {
    "unitId": "es-a1-u11",
    "overview": "في وحدة «الهوايات والوقت الحر» (¿Qué haces el fin de semana?)، الهدف إنك أقدر أحكي عن هواياتي وأسأل غيري عنها بالمضارع البسيط. غطّينا القواعد الأساسية: gustar / hacer + actividad: hago deporte؛ artículos con actividades: jugar al fútbol, escuchar música؛ adverbios: siempre, a veces, nunca. وركّزنا على المفردات في محاور: الرياضة، الفن والترفيه، العادات. ومن الجمل اللي اتدربنا عليها «¿Qué haces el fin de semana?» و«Me gusta escuchar música.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "¿Qué haces el fin de semana? Me gusta escuchar música.",
        "modelAnswer": "بتعمل إيه في العطلة؟ / بحب أسمع موسيقى."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الرياضة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "¿Qué haces el fin de semana?",
        "modelAnswer": "بتعمل إيه في العطلة؟"
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "el deporte",
        "modelAnswer": "رياضة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Juego al fútbol el sábado.",
        "modelAnswer": "بلعب كورة يوم السبت."
      }
    }
  },
  "es-a1-u12": {
    "unitId": "es-a1-u12",
    "overview": "في وحدة «مراجعة ومحادثة حرة A1» (¡Hablamos!)، الهدف إنك محادثة حرة: أقدر أقول رأيي بسيط، وأجاوب على أسئلة يومية، وأستخدم كل اللي اتعلمت. غطّينا القواعد الأساسية: revisión: ser / estar en presente؛ recap: presente, preguntas con ¿...?, gustar؛ conectores simples: y, pero, porque. وركّزنا على المفردات في محاور: التقييم والتقدم، الرأي البسيط، الاتفاق. ومن الجمل اللي اتدربنا عليها «¿Cómo estás? — Bien, gracias.» و«¿Qué hiciste hoy?». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "¿Cómo estás? — Bien, gracias. ¿Qué hiciste hoy?",
        "modelAnswer": "عامل إيه؟ — تمام، شكراً. / عملت إيه النهارده؟"
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «التقييم والتقدم»، زي المثال واستخدم نفس القواعد.",
        "prompt": "¿Cómo estás? — Bien, gracias.",
        "modelAnswer": "عامل إيه؟ — تمام، شكراً."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "el progreso",
        "modelAnswer": "تقدم"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "¿Fue fácil o difícil?",
        "modelAnswer": "كان سهل ولا صعب؟"
      }
    }
  },
  "es-a2-u01": {
    "unitId": "es-a2-u01",
    "overview": "في وحدة «الإسبانية وأنت» (El español y tú)، الهدف إنك أوصف نفسي وروتيني اليومي وأسأل الآخرين عن لغاتهم بثقة. غطّينا القواعد الأساسية: Presente de indicativo (repaso de irregularidades)؛ Pronombres reflexivos: me levanto, se ducha؛ desde hace... que / hace... que؛ para + infinitivo vs porque + verbo. وركّزنا على المفردات في محاور: الذات والروتين، اللغات، التعلّم. ومن الجمل اللي اتدربنا عليها «Llevo dos años estudiando español.» و«Me levanto a las siete de la mañana.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Llevo dos años estudiando español. Me levanto a las siete de la mañana.",
        "modelAnswer": "بقالي سنتين بدرس إسباني. / بستيقظ سبعة الصبح."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الذات والروتين»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Llevo dos años estudiando español.",
        "modelAnswer": "بقالي سنتين بدرس إسباني."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "aprender",
        "modelAnswer": "يتعلّم"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "¿Desde cuándo hablas chino?",
        "modelAnswer": "بتتكلم صيني من إمتى؟"
      }
    }
  },
  "es-a2-u02": {
    "unitId": "es-a2-u02",
    "overview": "في وحدة «فيلم من حياتي» (Una vida de película)، الهدف إنك أحكي أحداث الماضي بالتسلسل وأصف أفلام ومسلسلات أعجبتني. غطّينا القواعد الأساسية: Pretérito indefinido: regulares e irregulares؛ empezar a / terminar de + infinitivo؛ Adverbios de tiempo: ayer, anoche, el año pasado. وركّزنا على المفردات في محاور: الأفلام، القصص، الأحداث. ومن الجمل اللي اتدربنا عليها «Ayer vi una película francesa increíble.» و«La película empezó a las nueve.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Ayer vi una película francesa increíble. La película empezó a las nueve.",
        "modelAnswer": "امس شفت فرنسي جامد. / الفيلم بدأ الساعة تسع."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الأفلام»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Ayer vi una película francesa increíble.",
        "modelAnswer": "امس شفت فرنسي جامد."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "la película",
        "modelAnswer": "الفيلم"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "¿Terminaste el libro?",
        "modelAnswer": "خلّصت الكتاب؟"
      }
    }
  },
  "es-a2-u03": {
    "unitId": "es-a2-u03",
    "overview": "في وحدة «البيت الحلو» (Hogar, dulce hogar)، الهدف إنك أوصف بيتي وأقارن بين الأماكن وأعبّر عن تفضيلاتي في السكن. غطّينا القواعد الأساسية: Comparativos: más... que, menos... que, tan... como؛ Pronombres posesivos: el mío, la tuya؛ ser vs estar con características y estados؛ gustar / encantar / interesar. وركّزنا على المفردات في محاور: البيت، الأثاث، التفضيلات. ومن الجمل اللي اتدربنا عليها «Mi piso es más pequeño que el tuyo.» و«El salón es muy luminoso.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Mi piso es más pequeño que el tuyo. El salón es muy luminoso.",
        "modelAnswer": "شقتي أصغر من بتاعتك. / الصالة مضيئة قوي."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «البيت»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Mi piso es más pequeño que el tuyo.",
        "modelAnswer": "شقتي أصغر من بتاعتك."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "el piso",
        "modelAnswer": "الشقة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Vivo en un barrio tranquilo.",
        "modelAnswer": "ساكن في حي هادي."
      }
    }
  },
  "es-a2-u04": {
    "unitId": "es-a2-u04",
    "overview": "في وحدة «عامل إيه؟» (¿Cómo va todo?)، الهدف إنك أصف اللي بيحصل دلوقتي وأعبّر عن خطط وآراء بسيطة. غطّينا القواعد الأساسية: Estar + gerundio (acción en curso)؛ Condicional de cortesía: querría, me gustaría؛ Conectores: pero, y, luego. وركّزنا على المفردات في محاور: اللحظة الحاضرة، الحركة، الخطط. ومن الجمل اللي اتدربنا عليها «Ahora mismo estoy trabajando en un proyecto.» و«Mientras espero, leo el periódico.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Ahora mismo estoy trabajando en un proyecto. Mientras espero, leo el periódico.",
        "modelAnswer": "دلوقتي بشتغل على مشروع. / وأنا مستني بقرأ الجورنال."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «اللحظة الحاضرة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Ahora mismo estoy trabajando en un proyecto.",
        "modelAnswer": "دلوقتي بشتغل على مشروع."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "de repente",
        "modelAnswer": "فجأة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "¿Qué harías este fin de semana?",
        "modelAnswer": "هتعمل إيه آخر الأسبوع؟"
      }
    }
  },
  "es-a2-u05": {
    "unitId": "es-a2-u05",
    "overview": "في وحدة «دليل الترفيه» (Guía del ocio)، الهدف إنك أرتب أوقات فراغي وأنوي أروح أماكن وأنشطة بثقة. غطّينا القواعد الأساسية: Pretérito perfecto: he visto, hemos ido؛ ir a + infinitivo (planes futuros)؛ ya / todavía / aún no. وركّزنا على المفردات في محاور: الترفيه، الخروجات، الخطط. ومن الجمل اللي اتدربنا عليها «Este sábado he ido a un concierto.» و«Vamos a ir al museo mañana.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Este sábado he ido a un concierto. Vamos a ir al museo mañana.",
        "modelAnswer": "السبت ده رحت حفلة. / هنروح المتحف بكرة."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الترفيه»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Este sábado he ido a un concierto.",
        "modelAnswer": "السبت ده رحت حفلة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "el concierto",
        "modelAnswer": "الحفلة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Todavía no he comprado las entradas.",
        "modelAnswer": "لسه مخلصتش شراء التذاكر."
      }
    }
  },
  "es-a2-u06": {
    "unitId": "es-a2-u06",
    "overview": "في وحدة «بلا لحمة» (No como carne)، الهدف إنك أعبّر عن عاداتي في الأكل وأصف أطعمة وأفضّل أنواعًا بعينها. غطّينا القواعد الأساسية: Pronombres de objeto directo: lo, la, los, las؛ Se impersonal: se come, se vive؛ ser vs estar con estados. وركّزنا على المفردات في محاور: الطعام، التنويع، العادات. ومن الجمل اللي اتدربنا عليها «No como carne, soy vegetariano.» و«Se come mucho pescado en el norte.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "No como carne, soy vegetariano. Se come mucho pescado en el norte.",
        "modelAnswer": "بآكلش لحمة، أنا نباتي. / بيتآكل سمك كتير في الشمال."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الطعام»، زي المثال واستخدم نفس القواعد.",
        "prompt": "No como carne, soy vegetariano.",
        "modelAnswer": "بآكلش لحمة، أنا نباتي."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "la receta",
        "modelAnswer": "الوصفة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "La sopa está muy salada.",
        "modelAnswer": "الشوربة مالحة قوي."
      }
    }
  },
  "es-a2-u07": {
    "unitId": "es-a2-u07",
    "overview": "في وحدة «عجبنا أوي» (Nos gustó mucho)، الهدف إنك أحكي تجارب من الماضي وأعبّر عن انطباعي وأتمنّى أكرّر التجربة. غطّينا القواعد الأساسية: indefinido vs pretérito perfecto؛ me gustaría + infinitivo؛ Exclamativas: ¡qué + adjetivo!, ¡cuánto!. وركّزنا على المفردات في محاور: التجارب، المشاعر، التقييم. ومن الجمل اللي اتدربنا عليها «Nos gustó mucho la visita al castillo.» و«Me gustaría volver el año que viene.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Nos gustó mucho la visita al castillo. Me gustaría volver el año que viene.",
        "modelAnswer": "عجبنى جدًا جولة القلعة. / أتمنى أرجع السنة الجاية."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «التجارب»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Nos gustó mucho la visita al castillo.",
        "modelAnswer": "عجبنى جدًا جولة القلعة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "encantar",
        "modelAnswer": "يعجب جدًا"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "¡Qué viaje tan bonito!",
        "modelAnswer": "يا إيه الرحلة الجميلة دي!"
      }
    }
  },
  "es-a2-u08": {
    "unitId": "es-a2-u08",
    "overview": "في وحدة «احسنلك» (Estamos muy bien)، الهدف إنك أصف حالتي الصحية وأطلب وأوصي بنصائح بسيطة. غطّينا القواعد الأساسية: doler: me duele la cabeza (objeto indirecto)؛ Imperativo afirmativo (tú): come, bebe, sal؛ estar + adjetivo de estado. وركّزنا على المفردات في محاور: الصحة، الصيدلية، النصائح. ومن الجمل اللي اتدربنا عليها «Me duele la cabeza desde ayer.» و«Tómate esta pastilla después de comer.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Me duele la cabeza desde ayer. Tómate esta pastilla después de comer.",
        "modelAnswer": "راجعني من الامس. / خد الحبوب دي بعد الأكل."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الصحة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Me duele la cabeza desde ayer.",
        "modelAnswer": "راجعني من الامس."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "el médico",
        "modelAnswer": "الطبيب"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Deberías descansar más.",
        "modelAnswer": "لازم تستريح أكتر."
      }
    }
  },
  "es-a2-u09": {
    "unitId": "es-a2-u09",
    "overview": "في وحدة «قبل ودلوقتي» (Antes y ahora)، الهدف إنك أقارن بين حياتي في الماضي ودلوقتي وأصف عاداتي القديمة. غطّينا القواعد الأساسية: Pretérito imperfecto: era, tenía, iba؛ Marcadores: antes, antes de, en el pasado؛ Contraste habitual vs puntual. وركّزنا على المفردات في محاور: الماضي، التحوّلات، العادات. ومن الجمل اللي اتدربنا عليها «Antes vivía en un pueblo pequeño.» و«Ahora trabajo en el centro.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Antes vivía en un pueblo pequeño. Ahora trabajo en el centro.",
        "modelAnswer": "قبل كنت ساكن في قرية صغيرة. / دلوقتي بشتغل في وسط البلد."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الماضي»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Antes vivía en un pueblo pequeño.",
        "modelAnswer": "قبل كنت ساكن في قرية صغيرة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "de niño",
        "modelAnswer": "وهو طفل"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "De pequeño iba al cole andando.",
        "modelAnswer": "وأنا صغير كنت بروح المدرسة مشي."
      }
    }
  },
  "es-a2-u10": {
    "unitId": "es-a2-u10",
    "overview": "في وحدة «لحظات مميزة» (Momentos especiales)، الهدف إنك أحكي ذكريات مناسبات مميزة وأرتّب أحداثها بزمن الماضي. غطّينا القواعد الأساسية: indefinido irregular: tuve, pude, hice؛ indefinido vs imperfecto en narración؛ estar + gerundio en el pasado. وركّزنا على المفردات في محاور: الذكريات، المناسبات، السرد. ومن الجمل اللي اتدربنا عليها «El año pasado celebramos su boda.» و«Estábamos preparando la sorpresa cuando llegó.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "El año pasado celebramos su boda. Estábamos preparando la sorpresa cuando llegó.",
        "modelAnswer": "السنة اللي فاتت احتفلنا بعرسته. / كنا بنجهّز المفاجأة لما جه."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الذكريات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "El año pasado celebramos su boda.",
        "modelAnswer": "السنة اللي فاتت احتفلنا بعرسته."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "la boda",
        "modelAnswer": "العرس"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Hice un regalo hecho a mano.",
        "modelAnswer": "عملت هدية مصنوعة بإيدي."
      }
    }
  },
  "es-a2-u11": {
    "unitId": "es-a2-u11",
    "overview": "في وحدة «نلتقي إمتى؟» (¿Quedamos?)، الهدف إنك أتفق مع أصدقائي على لقاءات وأنشطة وأأكّد أو أجّل بثقة. غطّينا القواعد الأساسية: quedar / quedar con (citas)؛ ¿Y si...? y Debería + infinitivo (sugerencias)؛ Opinión: parece que, opino que. وركّزنا على المفردات في محاور: المواعيد، الأصدقاء، الاتفاقات. ومن الجمل اللي اتدربنا عليها «¿Quedamos el jueves a las ocho?» و«Propongo ir a una cafetería cerca.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "¿Quedamos el jueves a las ocho? Propongo ir a una cafetería cerca.",
        "modelAnswer": "نتقابل الخميس الساعة تمانية؟ / بقترح نروح كافيه قريب."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «المواعيد»، زي المثال واستخدم نفس القواعد.",
        "prompt": "¿Quedamos el jueves a las ocho?",
        "modelAnswer": "نتقابل الخميس الساعة تمانية؟"
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "quedar",
        "modelAnswer": "يتفق على لقاء"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Te confirmo esta noche.",
        "modelAnswer": "بأكّدلك الليلة."
      }
    }
  },
  "es-a2-u12": {
    "unitId": "es-a2-u12",
    "overview": "في وحدة «مراجعة المستوى A2» (Repaso A2)، الهدف إنك أراجع أهم ما تعلّمته في A2 وأستعد للانتقال إلى B1. غطّينا القواعد الأساسية: Contraste: indefinido, imperfecto, perfecto؛ Imperativo y condicional en situaciones diarias؛ Conectores temporales y causales. وركّزنا على المفردات في محاور: المراجعة، التقدّم، التواصل. ومن الجمل اللي اتدربنا عليها «He mejorado mucho este año.» و«Repasa los tiempos pasados antes del examen.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "He mejorado mucho este año. Repasa los tiempos pasados antes del examen.",
        "modelAnswer": "تحسّنت كتير السنة دي. / راجع الأزمنة الماضية قبل الامتحان."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «المراجعة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "He mejorado mucho este año.",
        "modelAnswer": "تحسّنت كتير السنة دي."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "repasar",
        "modelAnswer": "يراجع"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "¿Qué incluye el nivel B1?",
        "modelAnswer": "مستوى B1 بيضم إيه؟"
      }
    }
  },
  "es-b1-u01": {
    "unitId": "es-b1-u01",
    "overview": "في وحدة «البداية من جديد» (Volver a empezar)، الهدف إنك أتكلم عن محاولاتي في البدايات الجديدة وأستنتج من تجاربي السابقة. غطّينا القواعد الأساسية: Perífrasis: volver a, acabar de, llevar + gerundio؛ Pretérito perfecto vs indefinido (repaso)؛ Marcadores de duración: desde, durante, hace... que. وركّزنا على المفردات في محاور: البدايات، المحاولة، الزمن. ومن الجمل اللي اتدربنا عليها «Acabo de empezar un curso nuevo.» و«Llevo seis meses sin fumar.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Acabo de empezar un curso nuevo. Llevo seis meses sin fumar.",
        "modelAnswer": "مبديت دورة جديدة حالا. / بقالي ست شهور مبقتش أشرب."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «البدايات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Acabo de empezar un curso nuevo.",
        "modelAnswer": "مبديت دورة جديدة حالا."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "reintentar",
        "modelAnswer": "يعاود المحاولة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Vuelvo a intentarlo el año que viene.",
        "modelAnswer": "هرجع أحاول السنة الجاية."
      }
    }
  },
  "es-b1-u02": {
    "unitId": "es-b1-u02",
    "overview": "في وحدة «قبل ودلوقتي بالتفصيل» (Antes y ahora)، الهدف إنك أقارن بين الماضي والحاضر بتفصيل وأشرح أسباب التغييرات. غطّينا القواعد الأساسية: Imperfecto vs presente (hábitos y circunstancias)؛ Marcadores: de pequeño, en aquella época, actualmente؛ Mientras / cuando + imperfecto. وركّزنا على المفردات في محاور: التحوّلات، المقارنة، الأسباب. ومن الجمل اللي اتدربنا عليها «De pequeño pasaba los veranos en el campo.» و«Actualmente todo va más rápido.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "De pequeño pasaba los veranos en el campo. Actualmente todo va más rápido.",
        "modelAnswer": "وأنا صغير كنت بأقضي الصيف في الريف. / حاليًا كل حاجة ماشية أسرع."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «التحوّلات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "De pequeño pasaba los veranos en el campo.",
        "modelAnswer": "وأنا صغير كنت بأقضي الصيف في الريف."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "antiguamente",
        "modelAnswer": "قديمًا"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Mientras mis padres trabajaban, yo jugaba.",
        "modelAnswer": "أهلي كانوا بيشتغلوا وأنا بلعب."
      }
    }
  },
  "es-b1-u03": {
    "unitId": "es-b1-u03",
    "overview": "في وحدة «المنع والإلزام» (Prohibido prohibir)، الهدف إنك أعبّر عن القواعد والمنع والأماكن المعتادة بثقة. غطّينا القواعد الأساسية: soler + infinitivo؛ Se impersonal: aquí se habla, se prohíbe؛ Cuantificadores: mucho, poco, demasiado, bastante؛ prohibido / obligatorio + infinitivo. وركّزنا على المفردات في محاور: القواعد، القوانين، العادات. ومن الجمل اللي اتدربنا عليها «Aquí se prohíbe fumar en interior.» و«Suelo ir al gimnasio tres veces por semana.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Aquí se prohíbe fumar en interior. Suelo ir al gimnasio tres veces por semana.",
        "modelAnswer": "ممنوع التدخين جوه هنا. / عادي بروح الجيم تلات مرات في الأسبوع."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «القواعد»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Aquí se prohíbe fumar en interior.",
        "modelAnswer": "ممنوع التدخين جوه هنا."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "prohibir",
        "modelAnswer": "يمنع"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Es obligatorio llevar casco.",
        "modelAnswer": "لازم تلبس خوذة."
      }
    }
  },
  "es-b1-u04": {
    "unitId": "es-b1-u04",
    "overview": "في وحدة «حكاية بتحكي» (Va y le dice…)، الهدف إنك أروي قصة بأسلوب حيّ وأربط أحداثها وأستخدم ضمائر الكائنات بانسيابية. غطّينا القواعد الأساسية: Relato en presente con conectores؛ Pronombres de objeto directo e indirecto: se lo doy؛ Conectores: entonces, después, por eso. وركّزنا على المفردات في محاور: السرد، المشاهد، التسلسل. ومن الجمل اللي اتدربنا عليها «Le llamó por teléfono y le contó la noticia.» و«Se lo daré mañana sin falta.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Le llamó por teléfono y le contó la noticia. Se lo daré mañana sin falta.",
        "modelAnswer": "اتصل بيه وحكاله الخبر. / هديهولك بكرة من غير نسيان."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «السرد»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Le llamó por teléfono y le contó la noticia.",
        "modelAnswer": "اتصل بيه وحكاله الخبر."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "la anécdota",
        "modelAnswer": "القصة الصغيرة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Entonces el jefe reaccionó con calma.",
        "modelAnswer": "بعدها المدير رد بهدوء."
      }
    }
  },
  "es-b1-u05": {
    "unitId": "es-b1-u05",
    "overview": "في وحدة «ابحث وقارن» (Busque y compare)، الهدف إنك أصدر أحكام وأوامر وأقارن بين البدائل بأدب وحزم. غطّينا القواعد الأساسية: Imperativo afirmativo y negativo (tú/usted)؛ Colocación de pronombres: dámelo, no me lo des؛ Comparativos y superlativos (repaso). وركّزنا على المفردات في محاور: الاختيار، المقارنة، الخدمة. ومن الجمل اللي اتدربنا عليها «Búsqueme una opción más barata.» و«No me lo devuelvas antes del viernes.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Búsqueme una opción más barata. No me lo devuelvas antes del viernes.",
        "modelAnswer": "دوّرلي على خيار أرخص. / ترجعلهوش قبل الجمعة."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الاختيار»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Búsqueme una opción más barata.",
        "modelAnswer": "دوّرلي على خيار أرخص."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "comparar",
        "modelAnswer": "يقارن"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Esta marca es mejor que la otra.",
        "modelAnswer": "الماركة دي أحسن من التانية."
      }
    }
  },
  "es-b1-u06": {
    "unitId": "es-b1-u06",
    "overview": "في وحدة «كفاية بقى» (¡Basta ya!)، الهدف إنك أعبّر عن الانزعاج وأقترح حلولًا وأصف الحالات المستمرة. غطّينا القواعد الأساسية: Presente de subjuntivo: quiero que, es necesario que؛ cuando + subjuntivo (futuro)؛ Propuestas: deberían, habría que. وركّزنا على المفردات في محاور: الشكوى، الاقتراحات، الاستمرار. ومن الجمل اللي اتدربنا عليها «Quiero que esto acabe ya.» و«Deberíamos hablar con el vecino.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Quiero que esto acabe ya. Deberíamos hablar con el vecino.",
        "modelAnswer": "عايز ده يخلص حالا. / لازم نتكلم مع الجار."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الشكوى»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Quiero que esto acabe ya.",
        "modelAnswer": "عايز ده يخلص حالا."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "el abuso",
        "modelAnswer": "الإساءة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Cuando llegue el verano, nos iremos.",
        "modelAnswer": "لما الصيف ييجي، هنسافر."
      }
    }
  },
  "es-b1-u07": {
    "unitId": "es-b1-u07",
    "overview": "في وحدة «رسائل وكلام مسموع» (Mensajes)، الهدف إنك أروي كلام الناس على نحو غير مباشر وأربط الأسباب بنتائجها. غطّينا القواعد الأساسية: Estilo indirecto: me dijo que...؛ Conectores causa-consecuencia: por eso, así que, debido a؛ Estar + gerundio (repaso). وركّزنا على المفردات في محاور: التواصل، الإشاعة، السبب والنتيجة. ومن الجمل اللي اتدربنا عليها «Me dijo que no estaba de acuerdo.» و«Debido a la lluvia, la fiesta se aplazó.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Me dijo que no estaba de acuerdo. Debido a la lluvia, la fiesta se aplazó.",
        "modelAnswer": "قالّي إنه مش موافق. / بسبب المطر، الحفلة اتأجّلت."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «التواصل»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Me dijo que no estaba de acuerdo.",
        "modelAnswer": "قالّي إنه مش موافق."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "el rumor",
        "modelAnswer": "الإشاعة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Según ella, la noticia no es cierta.",
        "modelAnswer": "حسب كلامها، الخبر مش حقيقي."
      }
    }
  },
  "es-b1-u08": {
    "unitId": "es-b1-u08",
    "overview": "في وحدة «السائح بالصدفة» (El turista accidental)، الهدف إنك أحكي حكاية غريبة بالأزمنة الماضية المركّبة وأربط أحداثها زمنيًا. غطّينا القواعد الأساسية: Pretérito pluscuamperfecto: había llegado...؛ Combinación de tiempos pasados en narración؛ Aunque / mientras que en relato. وركّزنا على المفردات في محاور: السفر، المغامرة، الأخطاء. ومن الجمل اللي اتدربنا عليها «Cuando llegué a la estación, el tren ya había salido.» و«Habíamos reservado el hotel dos semanas antes.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Cuando llegué a la estación, el tren ya había salido. Habíamos reservado el hotel dos semanas antes.",
        "modelAnswer": "لما وصلت المحطة، القطار كان راح. / كنا حجزنا الفندق من تمنين."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «السفر»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Cuando llegué a la estación, el tren ya había salido.",
        "modelAnswer": "لما وصلت المحطة، القطار كان راح."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "la maleta",
        "modelAnswer": "الشنطة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Aunque perdí el vuelo, conocí a alguien interesante.",
        "modelAnswer": "رغم إني فوتت الرحلة، اتعرفت على حد حلو."
      }
    }
  },
  "es-b1-u09": {
    "unitId": "es-b1-u09",
    "overview": "في وحدة «لازم نتكلم» (Tenemos que hablar)، الهدف إنك أعبّر عن المشاعر تجاه الأشخاص وأخفّف نبرة الخلاف بلباقة. غطّينا القواعد الأساسية: me encanta/odio + infinitivo o que + subjuntivo؛ Suavizar el desacuerdo: no estoy seguro de que...؛ Es + adjetivo + que + subjuntivo. وركّزنا على المفردات في محاور: المشاعر، الآراء، اللباقة. ومن الجمل اللي اتدربنا عليها «Me encanta trabajar con el equipo.» و«No estoy seguro de que tenga razón.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Me encanta trabajar con el equipo. No estoy seguro de que tenga razón.",
        "modelAnswer": "بموت في الشغل مع الفريق. / مش متأكد إنه عنده حق."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «المشاعر»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Me encanta trabajar con el equipo.",
        "modelAnswer": "بموت في الشغل مع الفريق."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "el desacuerdo",
        "modelAnswer": "الخلاف"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Odio que me interrumpan.",
        "modelAnswer": "بكره إن حد يقاطعني."
      }
    }
  },
  "es-b1-u10": {
    "unitId": "es-b1-u10",
    "overview": "في وحدة «أزياء وذوق» (De diseño)، الهدف إنك أوصف الأشياء بتفصيل وأبالغ في المدح والذم وأحكّم على الجودة. غطّينا القواعد الأساسية: Superlativos: -ísimo, el más... de؛ Exclamativas: ¡qué...!؛ Oraciones de relativo con preposición: para el que.... وركّزنا على المفردات في محاور: الذوق، الجودة، الوصف. ومن الجمل اللي اتدربنا عليها «Es el traje más caro de la tienda.» و«¡Qué diseño tan elegante!». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Es el traje más caro de la tienda. ¡Qué diseño tan elegante!",
        "modelAnswer": "غالية تاجرتي في المحل. / يا إيه الديزاين الأنيق ده!"
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الذوق»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Es el traje más caro de la tienda.",
        "modelAnswer": "غالية تاجرتي في المحل."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "el tejido",
        "modelAnswer": "القماش"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Es un modelo para el que tiene buen gusto.",
        "modelAnswer": "موديل للي ذوقه حلو."
      }
    }
  },
  "es-b1-u11": {
    "unitId": "es-b1-u11",
    "overview": "في وحدة «عالم أحسن» (Un mundo mejor)، الهدف إنك أقيّم القضايا بأدب وأعبّر عن الآفاق المستقبلية بأسلوب واعٍ. غطّينا القواعد الأساسية: Evaluación impersonal: es injusto que... + subjuntivo؛ Condicional de resultado: ayudaría a...؛ Hay que + infinitivo (repaso). وركّزنا على المفردات في محاور: المجتمع، البيئة، المسؤولية. ومن الجمل اللي اتدربنا عليها «Es injusto que se desperdicie comida.» و«Reciclar ayudaría a reducir la basura.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Es injusto que se desperdicie comida. Reciclar ayudaría a reducir la basura.",
        "modelAnswer": "ظلم إن الأكل يترمي. / إعادة التدوير هتقلل الزبالة."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «المجتمع»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Es injusto que se desperdicie comida.",
        "modelAnswer": "ظلم إن الأكل يترمي."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "el medio ambiente",
        "modelAnswer": "البيئة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Hay que actuar ya.",
        "modelAnswer": "لازم نتحرك حالا."
      }
    }
  },
  "es-b1-u12": {
    "unitId": "es-b1-u12",
    "overview": "في وحدة «أسرار وألغاز» (Misterios y enigmas)، الهدف إنك أتمهّل للاحتمالات وأطرح فرضيات وأعبّر عن الاحتمال بلباقة. غطّينا القواعد الأساسية: Futuro simple para hipótesis: será, llegarán؛ Construcciones de hipótesis: puede que, tal vez؛ subjuntivo tras expresiones de duda. وركّزنا على المفردات في محاور: الاحتمالات، الغموض، التنبؤ. ومن الجمل اللي اتدربنا عليها «Tal vez tenga la respuesta.» و«¿Quién habrá dejado esto aquí?». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Tal vez tenga la respuesta. ¿Quién habrá dejado esto aquí?",
        "modelAnswer": "يمكن تكون عندي الإجابة. / مين اللي فاكل حاجة هنا؟"
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الاحتمالات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Tal vez tenga la respuesta.",
        "modelAnswer": "يمكن تكون عندي الإجابة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "el misterio",
        "modelAnswer": "السرّ"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Puede que el tesoro esté en el jardín.",
        "modelAnswer": "يمكن الكنز موجود في الحديقة."
      }
    }
  },
  "es-b2-u01": {
    "unitId": "es-b2-u01",
    "overview": "في وحدة «أخبار حلوة» (Buenas noticias)، الهدف إنك أنقل أخبارًا وأحداثًا بأسلوب مبسط ومهني مع الحفاظ على وضوح الفاعل. غطّينا القواعد الأساسية: Voz pasiva con ser + participio؛ Se impersonal: se informa, se anunció؛ Repaso de tiempos pasados en narración؛ Anticipación del OD: lo construyeron. وركّزنا على المفردات في محاور: الأخبار، التقارير، الأحداث. ومن الجمل اللي اتدربنا عليها «Se anunció un nuevo plan de movilidad.» و«Las obras fueron terminadas en mayo.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Se anunció un nuevo plan de movilidad. Las obras fueron terminadas en mayo.",
        "modelAnswer": "اتعلن عن خطة جديدة للتنقّل. / الأشغال خلصت في مايو."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الأخبار»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Se anunció un nuevo plan de movilidad.",
        "modelAnswer": "اتعلن عن خطة جديدة للتنقّل."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "el comunicado",
        "modelAnswer": "البيان"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Según el informe, la cifra subió un 10%.",
        "modelAnswer": "حسب التقرير، الرقم زاد 10%."
      }
    }
  },
  "es-b2-u02": {
    "unitId": "es-b2-u02",
    "overview": "في وحدة «إيه رأيك؟» (¿Y tú qué opinas?)، الهدف إنك أعرض رأيي وأعبّر عن الشروط والاحتمالات بأسلوب مقنع. غطّينا القواعد الأساسية: creo que + indicativo / no creo que + subjuntivo؛ Condiciones: solo si, siempre que, siempre y cuando؛ no es posible que + subjuntivo. وركّزنا على المفردات في محاور: الرأي، الشرط، الإقناع. ومن الجمل اللي اتدربنا عليها «No creo que sea tan difícil.» و«Solo si todos colaboramos saldrá bien.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "No creo que sea tan difícil. Solo si todos colaboramos saldrá bien.",
        "modelAnswer": "مش معتقد إنها صعبة أوي. / بس لو كلنا تعاوننا هتنجح."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الرأي»، زي المثال واستخدم نفس القواعد.",
        "prompt": "No creo que sea tan difícil.",
        "modelAnswer": "مش معتقد إنها صعبة أوي."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "el criterio",
        "modelAnswer": "المعيار"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Siempre que haya tiempo, lo haremos.",
        "modelAnswer": "طول ما في وقت، هنعمله."
      }
    }
  },
  "es-b2-u03": {
    "unitId": "es-b2-u03",
    "overview": "في وحدة «أنا ما كنتش أعملها» (Yo nunca lo haría)، الهدف إنك أعبّر عن الاحتمالات والنصائح وأصف ما يُرجّح حدوثه. غطّينا القواعد الأساسية: Usos del condicional: sería, podría؛ recomiendo que + subjuntivo؛ Imperfecto de subjuntivo: fuera, tuviera. وركّزنا على المفردات في محاور: النصيحة، التوقّع، التفضيل. ومن الجمل اللي اتدربنا عليها «Yo nunca aceptaría esa oferta.» و«Te recomiendo que lo pienses bien.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Yo nunca aceptaría esa oferta. Te recomiendo que lo pienses bien.",
        "modelAnswer": "أنا عمري ما أوافق على العرض ده. / بنصحك تفكر كويس."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «النصيحة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Yo nunca aceptaría esa oferta.",
        "modelAnswer": "أنا عمري ما أوافق على العرض ده."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "aconsejar",
        "modelAnswer": "ينصح"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Si fuera yo, evitaría el riesgo.",
        "modelAnswer": "لو كان مكاني، كنت أتفادى المخاطرة."
      }
    }
  },
  "es-b2-u04": {
    "unitId": "es-b2-u04",
    "overview": "في وحدة «أساليب حياة» (Maneras de vivir)، الهدف إنك أقارن أنماط حياة مختلفة وأربط الأفكار بسلسلة منطقية. غطّينا القواعد الأساسية: Imperfecto de subjuntivo (repaso y contraste)؛ por vs para (repaso fino)؛ Oraciones de relativo con preposición؛ Conectores: en cambio, sin embargo, no obstante. وركّزنا على المفردات في محاور: أنماط الحياة، الاختيار، التخطيط. ومن الجمل اللي اتدربنا عليها «Aunque quisiera, no podría mudarme.» و«Trabajo para mantener el equilibrio.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Aunque quisiera, no podría mudarme. Trabajo para mantener el equilibrio.",
        "modelAnswer": "رغم إني ممكن، مش هقدر أنتقل. / بشتغل عشان أافظ على التوازن."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «أنماط الحياة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Aunque quisiera, no podría mudarme.",
        "modelAnswer": "رغم إني ممكن، مش هقدر أنتقل."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "el estilo",
        "modelAnswer": "الأسلوب"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "En cambio, su vida es más tranquila.",
        "modelAnswer": "عكس كده، حياته أهدى."
      }
    }
  },
  "es-b2-u05": {
    "unitId": "es-b2-u05",
    "overview": "في وحدة «أماكن ساحرة» (Lugares con encanto)، الهدف إنك أصف الأماكن بأسلوب أدبي وأستعمل أفعال الإدراك والوصف بدقة. غطّينا القواعد الأساسية: Oraciones de relativo: que, quien, cuyo؛ Participio pasivo como adjetivo: la casa construida؛ Verbos de percepción: ver que, oír que + indicativo/subjuntivo. وركّزنا على المفردات في محاور: الأماكن، الوصف، الانطباع. ومن الجمل اللي اتدربنا عليها «Es un pueblo que conserva su encanto original.» و«La plaza, construida en el siglo XV, es única.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Es un pueblo que conserva su encanto original. La plaza, construida en el siglo XV, es única.",
        "modelAnswer": "قرية بتحافظ على جمالها القديم. / الساحة المبنية في القرن ال15 فريدة."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الأماكن»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Es un pueblo que conserva su encanto original.",
        "modelAnswer": "قرية بتحافظ على جمالها القديم."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "el encanto",
        "modelAnswer": "السحر"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Vi a alguien que parecía perdido.",
        "modelAnswer": "شفت حد كان تايه."
      }
    }
  },
  "es-b2-u06": {
    "unitId": "es-b2-u06",
    "overview": "في وحدة «الخبرة هي اللي تهم» (Se valorará la experiencia)، الهدف إنك أكتب لغة إدارية موجزة وأصف العمليات والإجراءات بوضوح. غطّينا القواعد الأساسية: Voz pasiva y se impersonal en texto formal؛ Infinitivo compuesto: al haber terminado؛ Subjuntivo perfecto: es necesario que haya.... وركّزنا على المفردات في محاور: التوظيف، الإجراءات، اللغة الإدارية. ومن الجمل اللي اتدربنا عليها «Se valorará la experiencia previa.» و«Es necesario que hayas enviado la solicitud.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Se valorará la experiencia previa. Es necesario que hayas enviado la solicitud.",
        "modelAnswer": "هتُقيَّم الخبرة السابقة. / لازم تكون أرسلت الطلب."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «التوظيف»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Se valorará la experiencia previa.",
        "modelAnswer": "هتُقيَّم الخبرة السابقة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "el requisito",
        "modelAnswer": "الاشتراك"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Al haber completado el trámite, recibirá respuesta.",
        "modelAnswer": "لما يخلص الإجراء، هيوصله رد."
      }
    }
  },
  "es-b2-u07": {
    "unitId": "es-b2-u07",
    "overview": "في وحدة «الجسم في حركة» (El cuerpo en movimiento)، الهدف إنك أصف الأفعال الجارية والمتزامنة بانسيابية وأربطها بالزمن. غطّينا القواعد الأساسية: Gerundio y adverbios de modo: diciendo, corriendo؛ mientras / al + infinitivo؛ Verbos pronominales: quejarse, fijarse. وركّزنا على المفردات في محاور: الحركة، الرياضة، الصحة. ومن الجمل اللي اتدربنا عليها «Mientras corro, escucho música.» و«Al calentar, evitas lesiones.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Mientras corro, escucho música. Al calentar, evitas lesiones.",
        "modelAnswer": "وأنا بجري بسمع أغاني. / بالإحماء بتتجنب الإصابات."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الحركة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Mientras corro, escucho música.",
        "modelAnswer": "وأنا بجري بسمع أغاني."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "el estiramiento",
        "modelAnswer": "الإطالة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Me fijo mucho en mi postura.",
        "modelAnswer": "بنتبه لوضعيتي جدًا."
      }
    }
  },
  "es-b2-u08": {
    "unitId": "es-b2-u08",
    "overview": "في وحدة «قال إنه هيعملها» (Dijo que lo haría)، الهدف إنك أروي كلام منقول وأربط الجمل الزمنية والشرطية بدقة. غطّينا القواعد الأساسية: para + infinitivo o subjuntivo (finalidad)؛ Oraciones temporales: hasta que, tan pronto como؛ Se involuntario: se me olvidó. وركّزنا على المفردات في محاور: النقل، الوعد، الشرط الزمني. ومن الجمل اللي اتدربنا عليها «Dijo que lo haría la semana pasada.» و«Se me olvidó avisarles.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Dijo que lo haría la semana pasada. Se me olvidó avisarles.",
        "modelAnswer": "قال إنه هيعملها الأسبوع اللي فات. / نسيت أبلغكم من غير قصد."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «النقل»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Dijo que lo haría la semana pasada.",
        "modelAnswer": "قال إنه هيعملها الأسبوع اللي فات."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "prometer",
        "modelAnswer": "يعد"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Hasta que no termine, no saldré.",
        "modelAnswer": "لما مخلصش، مش هخرج."
      }
    }
  },
  "es-b2-u09": {
    "unitId": "es-b2-u09",
    "overview": "في وحدة «كده حصل» (Así pasó)، الهدف إنك أروي الماضي بتفاصيل مع التمييز بين الحالات والوقائع وأصف بدقة. غطّينا القواعد الأساسية: Imperfecto de subjuntivo vs indicativo en relato؛ Gerundio de causa: aburrido, se marchó؛ Posición del adjetivo y matices de significado؛ Marcadores de tiempo pasado. وركّزنا على المفردات في محاور: السرد، التفسير، التفاصيل. ومن الجمل اللي اتدربنا عليها «Si yo lo supiera, te lo contaría.» و«Aburrido, decidió marcharse.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Si yo lo supiera, te lo contaría. Aburrido, decidió marcharse.",
        "modelAnswer": "لو كنت عارف، كنت حكيتهالك. / متضايق، قرر يمشي."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «السرد»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Si yo lo supiera, te lo contaría.",
        "modelAnswer": "لو كنت عارف، كنت حكيتهالك."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "el episodio",
        "modelAnswer": "الحلقة/الواقعة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Aquella noche pasó algo extraño.",
        "modelAnswer": "في الليلة دي حصل حاجة غريبة."
      }
    }
  },
  "es-b2-u10": {
    "unitId": "es-b2-u10",
    "overview": "في وحدة «قبل ما يفوت الأوان» (Antes de que sea tarde)، الهدف إنك أخطط لوقت محدد وأربط الشروط بنتائجها وأنسّق نصوصًا طويلة. غطّينا القواعد الأساسية: Subjuntivo perfecto: antes de que hayas...؛ Conectores temporales: antes de que, en cuanto, mientras tanto؛ Cohesión textual: por un lado, en definitiva. وركّزنا على المفردات في محاور: الاستعجال، التنسيق، التخطيط. ومن الجمل اللي اتدربنا عليها «Antes de que se acabe el plazo, envía el informe.» و«En cuanto tenga noticias, te aviso.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Antes de que se acabe el plazo, envía el informe. En cuanto tenga noticias, te aviso.",
        "modelAnswer": "قبل ما تخلص المهلة، أرسل التقرير. / أول ما أعرف حاجة، أبلّغك."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الاستعجال»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Antes de que se acabe el plazo, envía el informe.",
        "modelAnswer": "قبل ما تخلص المهلة، أرسل التقرير."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "la urgencia",
        "modelAnswer": "الاستعجال"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Por un lado es arriesgado; en definitiva, vale la pena.",
        "modelAnswer": "من ناحية مخاطرة، بس في الآخر تستاهل."
      }
    }
  },
  "es-b2-u11": {
    "unitId": "es-b2-u11",
    "overview": "في وحدة «الشغل والحياة» (Vivir para trabajarse)، الهدف إنك أناقش معنى العمل وأعبّر عن التنازل والإعتراف بأسلوب ناضج. غطّينا القواعد الأساسية: Concesivos: a pesar de, por mucho que؛ Reformulación y ejemplificación: es decir, a modo de ejemplo؛ Infinitivo con sujeto: es difícil vivir así. وركّزنا على المفردات في محاور: العمل، التنازل، المعنى. ومن الجمل اللي اتدربنا عليها «A pesar de las dificultades, siguió adelante.» و«Por mucho que trabaje, nunca alcanza.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "A pesar de las dificultades, siguió adelante. Por mucho que trabaje, nunca alcanza.",
        "modelAnswer": "رغم الصعوبات، كمّل. / مهما اشتغل، دايمًا مش واصل."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «العمل»، زي المثال واستخدم نفس القواعد.",
        "prompt": "A pesar de las dificultades, siguió adelante.",
        "modelAnswer": "رغم الصعوبات، كمّل."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "el jornal",
        "modelAnswer": "أجر اليوم"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Es decir, buscamos más sentido.",
        "modelAnswer": "يعني، بندور على معنى أكتر."
      }
    }
  },
  "es-b2-u12": {
    "unitId": "es-b2-u12",
    "overview": "في وحدة «لو كنتش أعرف» (Como no lo sabía…)، الهدف إنك أربط الأسباب بنتائجها وأستعمل التراكيب المركّبة في مواقف يومية. غطّينا القواعد الأساسية: Subjuntivo perfecto y condicional compuesto؛ Doble pronombre: se lo dije؛ Causa-consecuencia: dado que, por lo tanto. وركّزنا على المفردات في محاور: السبب والنتيجة، التراكيب المركّبة، المفاجأة. ومن الجمل اللي اتدربنا عليها «Si lo hubiera sabido, te lo habría dicho.» و«Se lo explicó todo de una vez.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Si lo hubiera sabido, te lo habría dicho. Se lo explicó todo de una vez.",
        "modelAnswer": "لو كنت عارف، كنت قلتلك. / شرحهاله كله مرة واحدة."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «السبب والنتيجة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Si lo hubiera sabido, te lo habría dicho.",
        "modelAnswer": "لو كنت عارف، كنت قلتلك."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "el descuido",
        "modelAnswer": "الإهمال"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Dado que nadie avisó, fallamos.",
        "modelAnswer": "محدش بلّغ، فالبنجح."
      }
    }
  },
  "es-c1-u01": {
    "unitId": "es-c1-u01",
    "overview": "في وحدة «الابتسامة والأداء» (¡Qué gracia! Comienza el espectáculo)، الهدف إنك أميّز بين ser وestar بدقّة وأروي الماضي وأستعمل الماضي في السرد بأسلوب طبيعي. غطّينا القواعد الأساسية: Contraste ser/estar en descripciones؛ Voz pasiva: se considera que... / es considerado por...؛ Presente histórico en relato y crónica؛ Pasado compuesto del sistema temporal: condicional como pasado. وركّزنا على المفردات في محاور: التمييز، السرد، التقييم. ومن الجمل اللي اتدربنا عليها «La película fue considerada un éxito.» و«El público estalla en aplausos cuando ella entra.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "La película fue considerada un éxito. El público estalla en aplausos cuando ella entra.",
        "modelAnswer": "الفيلم اتعدّ نجاح. / الجمهور يصفّق بجنون أول ما تدخل."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «التمييز»، زي المثال واستخدم نفس القواعد.",
        "prompt": "La película fue considerada un éxito.",
        "modelAnswer": "الفيلم اتعدّ نجاح."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "el matiz",
        "modelAnswer": "التلوين الدقيق"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Si lo hubiera sabido, habría actuado de otro modo.",
        "modelAnswer": "لو كنت عارف، كنت اتصرفت بشكل تاني."
      }
    }
  },
  "es-c1-u02": {
    "unitId": "es-c1-u02",
    "overview": "في وحدة «السعادة بأرخص سعر» (Felicidad a buen precio)، الهدف إنك أعبّر عن المشاعر العميقة وأُصدر أوامر لبقة وأستعمل ضمائر المفعول المزدوجة بانسيابية. غطّينا القواعد الأساسية: Oraciones sustantivas: me alegra que... + subjuntivo؛ ojalá + subjuntivo (imposible/deseo)؛ Imperativo con doble pronombre: dímelo, démelo؛ Contraste gustar/encantar/caer bien a nivel fino. وركّزنا على المفردات في محاور: المشاعر، القيم، التقييم. ومن الجمل اللي اتدربنا عليها «Me alegra mucho que hayas venido.» و«Ojalá pudiera quedarme más tiempo.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Me alegra mucho que hayas venido. Ojalá pudiera quedarme más tiempo.",
        "modelAnswer": "فرحت جدًا إنك جيت. / يا ريتني أقدر أفضل أكتر."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «المشاعر»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Me alegra mucho que hayas venido.",
        "modelAnswer": "فرحت جدًا إنك جيت."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "la bienaventuranza",
        "modelAnswer": "السعادة الغامرة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Pásame el periódico, por favor.",
        "modelAnswer": "ممّعاي الجورنال لو سمحت."
      }
    }
  },
  "es-c1-u03": {
    "unitId": "es-c1-u03",
    "overview": "في وحدة «الخيال والذاكرة» (Imaginar y recordar)، الهدف إنك أُنَوّع بين أسلوب السرد والوصف وأستعمل أدوات الربط ونبرات الخطاب المختلفة. غطّينا القواعد الأساسية: Conectores temporales y modales: en cuanto a, a medida de que؛ Comparaciones no reales: como si... fuera؛ Registro formal vs informal: sería preciso / habría que؛ Concesivos: pese a lo cual, no obstante. وركّزنا على المفردات في محاور: الخيال، الذاكرة، أسلوب الخطاب. ومن الجمل اللي اتدربنا عليها «A medida de que envejecemos, la memoria cambia.» و«Hablaba como si lo hubiera vivido él mismo.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "A medida de que envejecemos, la memoria cambia. Hablaba como si lo hubiera vivido él mismo.",
        "modelAnswer": "كل ما بيكبر سنّنا، الذاكرة بيتغيّر. / بيتكلم كأنه عاش الحكاية بنفسه."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الخيال»، زي المثال واستخدم نفس القواعد.",
        "prompt": "A medida de que envejecemos, la memoria cambia.",
        "modelAnswer": "كل ما بيكبر سنّنا، الذاكرة بيتغيّر."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "la ensoñación",
        "modelAnswer": "الحُلم اليقظ"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Sería preciso revisar el archivo antes de opinar.",
        "modelAnswer": "من الأهم رجوع الأرشيف قبل التقييم."
      }
    }
  },
  "es-c1-u04": {
    "unitId": "es-c1-u04",
    "overview": "في وحدة «أعد صياغة الكلام» (Reducir, reutilizar, repetir)، الهدف إنك أُعيد صياغة كلام الآخرين بدقّة وأستعمل جمل الوصف الموصولي في سياقات معقّدة. غطّينا القواعد الأساسية: Oraciones de relativo con indicativo y subjuntivo: el que / quienquiera que؛ Estilo indirecto y transformaciones: aseguró que...؛ Consecutivos: tanto... que, tan... como para que. وركّزنا على المفردات في محاور: إعادة الصياغة، الوصف، الإقناع. ومن الجمل اللي اتدربنا عليها «Quienquiera que haya redactado esto, no entiende el tema.» و«Aseguró que el dato era verificable.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Quienquiera que haya redactado esto, no entiende el tema. Aseguró que el dato era verificable.",
        "modelAnswer": "مين ما كان كتب ده، مش فاهم الموضوع. / أكّد إن المعلومة قابلة للتحقّق."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «إعادة الصياغة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Quienquiera que haya redactado esto, no entiende el tema.",
        "modelAnswer": "مين ما كان كتب ده، مش فاهم الموضوع."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "el residuo",
        "modelAnswer": "المخلّف"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "El informe es tan denso que pocos lo terminan.",
        "modelAnswer": "التقرير طويل لدرجة إن قليلين بيخلّصوه."
      }
    }
  },
  "es-c1-u05": {
    "unitId": "es-c1-u05",
    "overview": "في وحدة «أحلام وواقع» (Sueños y realidades)، الهدف إنك أُناقش قضايا أخلاقية ومالية بأسلوب استدلالي وأربط الأسباب بنتائجها بدقّة. غطّينا القواعد الأساسية: Futuro y condicional de probabilidad: habrá / sería؛ Condicionales complejas: siempre que, solo si, con tal de que؛ Clausulas de finalidad: para que + subjuntivo؛ Por vs para en nivel avanzado: por lo que respecta a. وركّزنا على المفردات في محاور: الأخلاق، المال، الاستدلال. ومن الجمل اللي اتدربنا عليها «Habrá un debate sobre los límites del capital.» و«Solo si hay transparencia, el proyecto funciona.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Habrá un debate sobre los límites del capital. Solo si hay transparencia, el proyecto funciona.",
        "modelAnswer": "هيبقى فيه نقاش عن حدود رأس المال. / بس لو في شفافية، المشروع بينجح."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الأخلاق»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Habrá un debate sobre los límites del capital.",
        "modelAnswer": "هيبقى فيه نقاش عن حدود رأس المال."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "la ética",
        "modelAnswer": "الأخلاق"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Lo hice para que el equipo entendiera el riesgo.",
        "modelAnswer": "عملتها عشان الفريق يفهم المخاطرة."
      }
    }
  },
  "es-c1-u06": {
    "unitId": "es-c1-u06",
    "overview": "في وحدة «نقاش حرّ C1» (Debate libre C1)، الهدف إنك أُدير نقاشًا حرًّا بأسلوب متمكّن: أوصل لأفكاري بدقّة وأستمع وأستأنس وأستدير بلباقة. غطّينا القواعد الأساسية: Estructuras de apertura y cierre en debate: en primer lugar, cabe señalar؛ Atenuación: en cierto modo, hasta cierto punto؛ Discurso enlazado: encadenar ideas sin marcadores blandos. وركّزنا على المفردات في محاور: الإقناع، التسيير، الاستماع. ومن الجمل اللي اتدربنا عليها «Cabe señalar que el dato no es concluyente.» و«Hasta cierto punto estoy de acuerdo contigo.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Cabe señalar que el dato no es concluyente. Hasta cierto punto estoy de acuerdo contigo.",
        "modelAnswer": "ينفع نقول إن المعلومة مش حاسمة. / لحد درجة معينة متفق معاك."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الإقناع»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Cabe señalar que el dato no es concluyente.",
        "modelAnswer": "ينفع نقول إن المعلومة مش حاسمة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "el argumento",
        "modelAnswer": "الحجة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "¿Me permites replicar un instante?",
        "modelAnswer": "تسمحلي أردّ لحظة؟"
      }
    }
  },
  "es-c2-u01": {
    "unitId": "es-c2-u01",
    "overview": "في وحدة «التعليم والإحساس» (Enseñar y sentir)، الهدف إنك أُميّز دلالات se وlo بدقّة وأستعمل صيغة المستقبل في النصوص التنظيمية وأضبط إيقاع الجملة. غطّينا القواعد الأساسية: Valores de se y lo: se dice lo mismo / lo que se dice؛ Futuro en textos normativos: se requerirá, se informará؛ Posición del adjetivo y su efecto de sentido؛ Marcadores intensificadores y atenuadores + colocaciones. وركّزنا على المفردات في محاور: التعليم، التنظيم، الدلالة. ومن الجمل اللي اتدربنا عليها «Se requerirá una validación previa del documento.» و«Lo que se dice aquí no siempre es lo que se piensa.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Se requerirá una validación previa del documento. Lo que se dice aquí no siempre es lo que se piensa.",
        "modelAnswer": "هيتم طلب توثيق مسبق للمستند. / اللي اتقال هنا مش دايمًا اللي في البال."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «التعليم»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Se requerirá una validación previa del documento.",
        "modelAnswer": "هيتم طلب توثيق مسبق للمستند."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "la enseñanza",
        "modelAnswer": "التعليم"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "El problema, grave por cierto, tiene solución.",
        "modelAnswer": "المشكلة، خطيرة على فكرة، ليها حل."
      }
    }
  },
  "es-c2-u02": {
    "unitId": "es-c2-u02",
    "overview": "في وحدة «كلمات ناجحة» (Palabras con éxito)، الهدف إنك أكتب بنبرة مقنعة وأربط الأفكار بأدوات ربط عالية المستوى وأستعمل الزمن الماضي بظلاله المختلفة. غطّينا القواعد الأساسية: Adverbios cortos y enfáticos: ya, aún, apenas؛ Conectores argumentativos: en virtud de, en aras de؛ Preposiciones regidas por verbo/ sustantivo: insistir en, a pesar de؛ Pretérito imperfecto narrativo vs semántica verbal + metáfora. وركّزنا على المفردات في محاور: الإقناع، الزمن، الأسلوب. ومن الجمل اللي اتدربنا عليها «Apenas si se percibe el cambio.» و«En virtud de los acuerdos, se aplazó la sesión.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Apenas si se percibe el cambio. En virtud de los acuerdos, se aplazó la sesión.",
        "modelAnswer": "بالكاد تحس بالتغيير. / بناءً على الاتفاقات، اتأجّلت الجلسة."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الإقناع»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Apenas si se percibe el cambio.",
        "modelAnswer": "بالكاد تحس بالتغيير."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "el adverbio",
        "modelAnswer": "ظرف"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Insistió en que el relato era fiel a los hechos.",
        "modelAnswer": "اصرّ إن الرواية وفيقة للحقائق."
      }
    }
  },
  "es-c2-u03": {
    "unitId": "es-c2-u03",
    "overview": "في وحدة «تصدّق ولا تصدّق» (Creer o no creer)، الهدف إنك أُعبّر عن درجات اليقين والشكّ بأسلوب مرن وأستعمل الاستفهام البلاغي وأبني الحجاج بذكاء. غطّينا القواعد الأساسية: Marcadores de certeza: sin duda, desde luego, es probable que؛ Contraste indicativo/subjuntivo tras epistémicos؛ Estructuras coloquiales cultas y comparativas con subjuntivo؛ Preguntas retóricas en argumentación. وركّزنا على المفردات في محاور: اليقين، الشكّ، البلاغة. ومن الجمل اللي اتدربنا عليها «Sin duda, el dato confirma la hipótesis.» و«Es probable que la versión oficial cambie.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Sin duda, el dato confirma la hipótesis. Es probable que la versión oficial cambie.",
        "modelAnswer": "من غير شك، المعلومة بتؤكّد الفرضية. / من المحتمل النسخة الرسمية تتغيّر."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «اليقين»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Sin duda, el dato confirma la hipótesis.",
        "modelAnswer": "من غير شك، المعلومة بتؤكّد الفرضية."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "la certeza",
        "modelAnswer": "القاطع"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "¿Acaso alguien esperaba otro resultado?",
        "modelAnswer": "في حد كان متوقع نتيجة تانية؟"
      }
    }
  },
  "es-c2-u04": {
    "unitId": "es-c2-u04",
    "overview": "في وحدة «علم وقانون» (Ciencia y ley)، الهدف إنك أكتب بنبرة رسمية دقيقة وأستعمل التراكيب التفسيرية وأضبط استعمال المضارع التام في السياقات القانونية. غطّينا القواعد الأساسية: Prefijos y reformuladores explicativos: esto es, en otros términos؛ Consecutivos con subjuntivo: con lo cual, de ahí que + subj؛ Usos del gerundio en lenguaje jurídico: consta adjuntando؛ Lenguaje administrativo: conviene, procede, queda constancia. وركّزنا على المفردات في محاور: العلم، القانون، اللغة الرسمية. ومن الجمل اللي اتدربنا عليها «De ahí que el tribunal haya estimado el recurso.» و«Con lo cual, queda descartada la hipótesis inicial.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "De ahí que el tribunal haya estimado el recurso. Con lo cual, queda descartada la hipótesis inicial.",
        "modelAnswer": "علشان كده المحكمة قبّلت الطعن. / وبكده، اتسحبت الفرضية الأولية."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «العلم»، زي المثال واستخدم نفس القواعد.",
        "prompt": "De ahí que el tribunal haya estimado el recurso.",
        "modelAnswer": "علشان كده المحكمة قبّلت الطعن."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "el expediente",
        "modelAnswer": "الملف القضائي"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Consta adjuntando la documentación requerida.",
        "modelAnswer": "مذكور بضمّ المستندات المطلوبة."
      }
    }
  },
  "es-c2-u05": {
    "unitId": "es-c2-u05",
    "overview": "في وحدة «اللسان ولغته» (Darle a la lengua)، الهدف إنك أُعبّر عن التلطيف والتشديد وأنوع بين التسجيلات اللغوية وأستعمل صيغ التوكيد النادرة. غطّينا القواعد الأساسية: Cortesía y atenuación: si no es mucha molestia, cabe destacar؛ Estructuras de énfasis: lo que más... es que..., en lo que va؛ Masculino genérico no sexista y sustantivación؛ Pretérito anterior y negación enfática: ni siquiera. وركّزنا على المفردات في محاور: اللباقة، التسجيلات، التشديد. ومن الجمل اللي اتدربنا عليها «Si no es mucha molestia, podría repetirlo.» و«Lo que más llama la atención es el silencio.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Si no es mucha molestia, podría repetirlo. Lo que más llama la atención es el silencio.",
        "modelAnswer": "لو مش كتير إزعاج، تقدر تعيد. / أكتر حاجة بتلفت النظر هو الصمت."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «اللباقة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Si no es mucha molestia, podría repetirlo.",
        "modelAnswer": "لو مش كتير إزعاج، تقدر تعيد."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "la cortesía",
        "modelAnswer": "اللباقة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Ni siquiera se mencionó el coste.",
        "modelAnswer": "ولا حتى اتكلموا عن التكلفة."
      }
    }
  },
  "es-c2-u06": {
    "unitId": "es-c2-u06",
    "overview": "في وحدة «كلام عالي المستوى» (Conversación de alto niveau)، الهدف إنك أُدير حوارًا متمكّنًا في مواضيع متشابكة: ألخّص، أنقل، وأستأنس بلغة تُحسَب لأعلى مستوى. غطّينا القواعد الأساسية: Síntesis oral y reencuadre del discurso del otro؛ Matices de evidencialidad: según parece, por lo que se ve؛ Imperfecto de cortesía en narración y matización final. وركّزنا على المفردات في محاور: التسيير، التركيب، الثقة. ومن الجمل اللي اتدربنا عليها «Según parece, la tendencia se mantiene.» و«Si me permites, voy a reencuadrar la pregunta.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Según parece, la tendencia se mantiene. Si me permites, voy a reencuadrar la pregunta.",
        "modelAnswer": "على ما يبدو، الاتجاه مستمر. / إذا سمحت، هعيد تأطير السؤال."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «التسيير»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Según parece, la tendencia se mantiene.",
        "modelAnswer": "على ما يبدو، الاتجاه مستمر."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "la síntesis",
        "modelAnswer": "التركيب"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Por lo que se ve, aún hay margen.",
        "modelAnswer": "من اللي باين، لسه في هامش."
      }
    }
  }
};
