// مولّد تلقائياً من الـ syllabus (scripts/generate-unit-summaries.mjs).
// المحتوى الأجنبي كله مأخوذ من جمل/مفردات الـ syllabus الصحيحة؛
// والـ overview بالعربي مبني من عنوان وقواعد ومحاور الوحدة. بيانات ثابتة.
import type { UnitHandAuthored } from "../unit-summary/types";

export const UNIT_SUMMARY_DE: Record<string, UnitHandAuthored> = {
  "de-a1-u01": {
    "unitId": "de-a1-u01",
    "overview": "في وحدة «التحيات والتعريف بالنفس» (Hallo, ich heiße...)، الهدف إنك أقدر أحيّي حد، أعرّف بنفسي (اسمي/منين)، وأسأل غيري بنفس الأسئلة. غطّينا القواعد الأساسية: Verb sein: ich bin, du bist, er/sie ist؛ Präsens: ich heiße, ich wohne, ich komme؛ Personalpronomen: ich, du, er, sie, es, wir, sie/Sie. وركّزنا على المفردات في محاور: التحيات، الاسم والبلد، الوداع. ومن الجمل اللي اتدربنا عليها «Hallo, ich heiße Ahmed.» و«Wie heißt du?». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Hallo, ich heiße Ahmed. Wie heißt du?",
        "modelAnswer": "أهلاً، اسمي أحمد. / اسمك إيه؟ (غير رسمية)"
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «التحيات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Hallo, ich heiße Ahmed.",
        "modelAnswer": "أهلاً، اسمي أحمد."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "hallo",
        "modelAnswer": "أهلاً/هاي"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Ich komme aus Ägypten.",
        "modelAnswer": "أنا من مصر."
      }
    }
  },
  "de-a1-u02": {
    "unitId": "de-a1-u02",
    "overview": "في وحدة «الأرقام والوقت» (Wie spät ist es?)، الهدف إنك أقدر أقول الأرقام من 0 لـ100، وأسأل وأقول الوقت، وأسمي أيام الأسبوع. غطّينا القواعد الأساسية: Zahlen 0–100؛ Wie spät ist es? — Es ist ... Uhr / halb ...؛ um + Uhrzeit, am + Wochentag. وركّزنا على المفردات في محاور: الأرقام، الساعة، أيام الأسبوع والتواريخ. ومن الجمل اللي اتدربنا عليها «Wie spät ist es?» و«Es ist drei Uhr.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Wie spät ist es? Es ist drei Uhr.",
        "modelAnswer": "الساعة كام؟ / الساعة تلاتة."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الأرقام»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Wie spät ist es?",
        "modelAnswer": "الساعة كام؟"
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "die Uhr / die Uhrzeit",
        "modelAnswer": "الساعة/الوقت"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Es ist halb acht.",
        "modelAnswer": "الساعة سبعة ونص."
      }
    }
  },
  "de-a1-u03": {
    "unitId": "de-a1-u03",
    "overview": "في وحدة «العائلة والأصدقاء» (Das ist meine Familie)، الهدف إنك أقدر أعرّف أفراد العائلة، وأوصفهم بصفات بسيطة، وأسأل عن السن. غطّينا القواعد الأساسية: Verb haben: ich habe ... Jahre؛ Possessivartikel: mein, dein, sein, ihr؛ Adjektive: groß, klein, jung, alt, lustig. وركّزنا على المفردات في محاور: أفراد العائلة، الأصدقاء، الوصف البسيط. ومن الجمل اللي اتدربنا عليها «Das ist meine Schwester.» و«Ich habe zwei Brüder.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Das ist meine Schwester. Ich habe zwei Brüder.",
        "modelAnswer": "دي أختي. / عندي أخين."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «أفراد العائلة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Das ist meine Schwester.",
        "modelAnswer": "دي أختي."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "die Mutter",
        "modelAnswer": "أم"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Sie ist groß und lustig.",
        "modelAnswer": "هي طويلة ومضحكة."
      }
    }
  },
  "de-a1-u04": {
    "unitId": "de-a1-u04",
    "overview": "في وحدة «الأكل والشرب» (Ich möchte einen Kaffee)، الهدف إنك أقدر أطلب أكل وشرب بأدب، وأقول بحب إيه ومش بحب إيه. غطّينا القواعد الأساسية: Präsens: ich möchte, ich esse, ich trinke nicht؛ mögen / möchten + Nomen؛ ein bisschen / kein mit Getränken؛ Ich hätte gern ..., bitte. وركّزنا على المفردات في محاور: أكل البيت والمطعم، المشروبات، الإفطار والعشاء. ومن الجمل اللي اتدربنا عليها «Ich möchte einen Kaffee, bitte.» و«Was isst du?». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Ich möchte einen Kaffee, bitte. Was isst du?",
        "modelAnswer": "أريد قهوة من فضلك. / بتاكل إيه؟"
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «أكل البيت والمطعم»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Ich möchte einen Kaffee, bitte.",
        "modelAnswer": "أريد قهوة من فضلك."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "das Brot",
        "modelAnswer": "عيش/خبز"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Ich mag Käse sehr gern.",
        "modelAnswer": "بحب الجبنة أوي."
      }
    }
  },
  "de-a1-u05": {
    "unitId": "de-a1-u05",
    "overview": "في وحدة «الطقس والملابس» (Wie ist das Wetter?)، الهدف إنك أقدر أقول إيه حالة الطقس، وأوصف اللي لابسه دلوقتي. غطّينا القواعد الأساسية: Es ist + Adjektiv: es ist kalt / es ist heiß؛ Verb tragen: ich trage, du trägst؛ Adjektive: schön, schlecht, kalt, heiß. وركّزنا على المفردات في محاور: الطقس، الملابس، الوصف. ومن الجمل اللي اتدربنا عليها «Das Wetter ist heute schön.» و«Es ist kalt, ich trage meinen Mantel.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Das Wetter ist heute schön. Es ist kalt, ich trage meinen Mantel.",
        "modelAnswer": "الجو حلو النهارده. / الجو بارد، لابس بالطوي."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الطقس»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Das Wetter ist heute schön.",
        "modelAnswer": "الجو حلو النهارده."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "das Wetter",
        "modelAnswer": "الطقس"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Wie ist das Wetter in Berlin?",
        "modelAnswer": "الجو عامل إيه في برلين؟"
      }
    }
  },
  "de-a1-u06": {
    "unitId": "de-a1-u06",
    "overview": "في وحدة «الأماكن والاتجاهات» (Wo ist die Apotheke?)، الهدف إنك أقدر أسأل عن مكان وأفهم وإدي اتجاهات بسيطة في الشارع. غطّينا القواعد الأساسية: bestimmte Artikel: der, die, das؛ es gibt + Ort؛ Wo ist ...? — links, rechts, geradeaus؛ Präpositionen: neben, gegenüber, weit. وركّزنا على المفردات في محاور: محلات ومعالم الحي، الاتجاهات، اماكن. ومن الجمل اللي اتدربنا عليها «Wo ist die Apotheke, bitte?» و«Links, dann geradeaus.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Wo ist die Apotheke, bitte? Links, dann geradeaus.",
        "modelAnswer": "الصيدلية فين من فضلك؟ / على الشمال، بعدين كلها قدامك."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «محلات ومعالم الحي»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Wo ist die Apotheke, bitte?",
        "modelAnswer": "الصيدلية فين من فضلك؟"
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "die Apotheke",
        "modelAnswer": "صيدلية"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Es gibt einen Supermarkt hier.",
        "modelAnswer": "في سوبر ماركت هنا."
      }
    }
  },
  "de-a1-u07": {
    "unitId": "de-a1-u07",
    "overview": "في وحدة «الأسئلة الأساسية» (Wie sagt man ... auf Deutsch?)، الهدف إنك أقدر أسأل عن معنى كلمة، وأطلب التكرار والبطء، وأفهم رد بسيط. غطّينا القواعد الأساسية: Fragewörter: wer, was, wo, wann, wie, warum؛ Wie sagt man ... auf Deutsch?؛ Können Sie bitte wiederholen?. وركّزنا على المفردات في محاور: السؤال عن المعنى، التعلم، عدم الفهم. ومن الجمل اللي اتدربنا عليها «Wie sagt man «bread» auf Deutsch?» و«Können Sie bitte wiederholen?». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Wie sagt man «bread» auf Deutsch? Können Sie bitte wiederholen?",
        "modelAnswer": "إزاي أقول «bread» بالألمانية؟ / ممكن تكرر من فضلك؟ (رسمي)"
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «السؤال عن المعنى»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Wie sagt man «bread» auf Deutsch?",
        "modelAnswer": "إزاي أقول «bread» بالألمانية؟"
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "wie",
        "modelAnswer": "إزاي"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Bitte sprechen Sie langsamer.",
        "modelAnswer": "اتكلم ببطء أكتر من فضلك."
      }
    }
  },
  "de-a1-u08": {
    "unitId": "de-a1-u08",
    "overview": "في وحدة «الروتين اليومي والشغل» (Mein typischer Tag)، الهدف إنك أقدر أحكي عن روتيني اليومي ويوم شغلي بالمضارع البسيط. غطّينا القواعد الأساسية: Präsens regulärer Verben: lernen, arbeiten؛ reflexive Verben: aufstehen, schlafen gehen؛ um + Uhrzeit: Ich stehe um sieben auf. وركّزنا على المفردات في محاور: الصباح والمساء، الشغل والدراسة، العادة. ومن الجمل اللي اتدربنا عليها «Ich stehe um sieben auf.» و«Normalerweise fahre ich um acht zur Arbeit.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Ich stehe um sieben auf. Normalerweise fahre ich um acht zur Arbeit.",
        "modelAnswer": "بصحى الساعة سبعة. / عادةً بروح الشغل الساعة تمانية."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الصباح والمساء»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Ich stehe um sieben auf.",
        "modelAnswer": "بصحى الساعة سبعة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "aufstehen",
        "modelAnswer": "ينهض/يصحى"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Gehst du spät schlafen?",
        "modelAnswer": "بروح نام متأخر؟"
      }
    }
  },
  "de-a1-u09": {
    "unitId": "de-a1-u09",
    "overview": "في وحدة «التسوق والأسعار» (Wie viel kostet das?)، الهدف إنك أقدر أسأل عن السعر، وأشتري، وأسأل عن اللون والمقاس. غطّينا القواعد الأساسية: Zahlen 100–1000؛ Wie viel kostet das? — Das kostet ... Euro؛ ich möchte + Artikel: ich möchte ein Hemd؛ teuer / billig. وركّزنا على المفردات في محاور: المحلات، السعر والمال، اللون والمقاس. ومن الجمل اللي اتدربنا عليها «Wie viel kostet das?» و«Das kostet zehn Euro.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Wie viel kostet das? Das kostet zehn Euro.",
        "modelAnswer": "بكام ده؟ / عشرة يورو."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «المحلات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Wie viel kostet das?",
        "modelAnswer": "بكام ده؟"
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "der Preis",
        "modelAnswer": "سعر"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Ich möchte das Hemd anprobieren.",
        "modelAnswer": "حابب أجرب القميص ده."
      }
    }
  },
  "de-a1-u10": {
    "unitId": "de-a1-u10",
    "overview": "في وحدة «الصحة والجسم» (Mir tut der Kopf weh)، الهدف إنك أقدر أوصف ألم بسيط، وأنصح بالراحة، وأروح لدكتور. غطّينا القواعد الأساسية: wehtun: Mir tut der Kopf weh / Mir tut der Magen weh؛ muss + Verb: Du musst ausruhen؛ Pronomen Akkusativ: ihn, sie, es — Ich nehme es. وركّزنا على المفردات في محاور: أجهزة الجسم، عند الطبيب، الدواء والراحة. ومن الجمل اللي اتدربنا عليها «Mir tut der Kopf weh.» و«Ich bin krank, ich habe Fieber.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Mir tut der Kopf weh. Ich bin krank, ich habe Fieber.",
        "modelAnswer": "رأسي بتوجعني. / أنا تعبان وليّا حمّى."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «أجهزة الجسم»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Mir tut der Kopf weh.",
        "modelAnswer": "رأسي بتوجعني."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "der Kopf",
        "modelAnswer": "رأس"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Du musst einen Termin machen.",
        "modelAnswer": "لازم تحجز موعد."
      }
    }
  },
  "de-a1-u11": {
    "unitId": "de-a1-u11",
    "overview": "في وحدة «الهوايات والوقت الحر» (Was machst du am Wochenende?)، الهدف إنك أقدر أحكي عن هواياتي وأسأل غيري عنها بالمضارع البسيط. غطّينا القواعد الأساسية: mögen / machen + Aktivität: Ich mache Sport؛ Artikel bei Aktivitäten: Fußball spielen, Musik hören؛ Adverbien: oft, manchmal, nie. وركّزنا على المفردات في محاور: الرياضة، الفن والترفيه، العادات. ومن الجمل اللي اتدربنا عليها «Was machst du am Wochenende?» و«Ich höre gern Musik.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Was machst du am Wochenende? Ich höre gern Musik.",
        "modelAnswer": "بتعمل إيه في العطلة؟ / بحب أسمع موسيقى."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الرياضة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Was machst du am Wochenende?",
        "modelAnswer": "بتعمل إيه في العطلة؟"
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "der Sport",
        "modelAnswer": "رياضة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Ich spiele am Samstag Fußball.",
        "modelAnswer": "بلعب كورة يوم السبت."
      }
    }
  },
  "de-a1-u12": {
    "unitId": "de-a1-u12",
    "overview": "في وحدة «مراجعة ومحادثة حرة A1» (Reden wir!)، الهدف إنك محادثة حرة: أقدر أقول رأيي بسيط، وأجاوب على أسئلة يومية، وأستخدم كل اللي اتعلمت. غطّينا القواعد الأساسية: Revision: sein / haben im Präsens؛ Recap: Präsens, Fragen mit W-Fragen / ja-nein, Akkusativ؛ einfache Konjunktionen: und, aber, weil. وركّزنا على المفردات في محاور: التقييم والتقدم، الرأي البسيط، الاتفاق. ومن الجمل اللي اتدربنا عليها «Wie geht's? — Mir geht's gut, danke.» و«Was hast du heute gemacht?». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Wie geht's? — Mir geht's gut, danke. Was hast du heute gemacht?",
        "modelAnswer": "عامل إيه؟ — تمام، شكراً. / عملت إيه النهارده؟"
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «التقييم والتقدم»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Wie geht's? — Mir geht's gut, danke.",
        "modelAnswer": "عامل إيه؟ — تمام، شكراً."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "der Fortschritt",
        "modelAnswer": "تقدم"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "War es leicht oder schwer?",
        "modelAnswer": "كان سهل ولا صعب؟"
      }
    }
  },
  "de-a2-u01": {
    "unitId": "de-a2-u01",
    "overview": "في وحدة «شغل وأهل» (Berufe und Familie)، الهدف إنك أعرّف بنفسي وشغلي وعائلتي بجمل البسيطة وأستخدم ضمائر الملكية صح. غطّينا القواعد الأساسية: Possessivartikel: mein, dein, sein (Nom./Akk.)؛ Perfekt mit haben/sein (Wiederholung)؛ Wortstellung im Hauptsatz. وركّزنا على المفردات في محاور: الشغل، العائلة، الذات. ومن الجمل اللي اتدربنا عليها «Ich arbeite als Verkäufer in einem kleinen Laden.» و«Meine Schwester wohnt in Köln.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Ich arbeite als Verkäufer in einem kleinen Laden. Meine Schwester wohnt in Köln.",
        "modelAnswer": "بشتغل بائع في محل صغير. / أختي ساكنة في كولونيا."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الشغل»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Ich arbeite als Verkäufer in einem kleinen Laden.",
        "modelAnswer": "بشتغل بائع في محل صغير."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "der Beruf",
        "modelAnswer": "الشغل"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Hast du Geschwister?",
        "modelAnswer": "عندك إخوات؟"
      }
    }
  },
  "de-a2-u02": {
    "unitId": "de-a2-u02",
    "overview": "في وحدة «السكن والمكان» (Wohnen)، الهدف إنك أوصف سكني وأتحدث عن الأماكن باستخدام حركات الاتجاه بدقة. غطّينا القواعد الأساسية: Wechselpräpositionen (Dat. + Akk.): an, auf, in؛ wo? vs wohin?؛ Präpositionalphrasen als Subjekt/Adverbial. وركّزنا على المفردات في محاور: البيت، الحي، الاتجاهات. ومن الجمل اللي اتدربنا عليها «Ich hänge das Bild an die Wand.» و«Meine Wohnung liegt in der Innenstadt.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Ich hänge das Bild an die Wand. Meine Wohnung liegt in der Innenstadt.",
        "modelAnswer": "بحط اللوحة على الحيطة. / شقتي في وسط البلد."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «البيت»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Ich hänge das Bild an die Wand.",
        "modelAnswer": "بحط اللوحة على الحيطة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "das Zimmer",
        "modelAnswer": "الغرفة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Das Licht steht auf dem Tisch.",
        "modelAnswer": "اللمبة على الترابيزة."
      }
    }
  },
  "de-a2-u03": {
    "unitId": "de-a2-u03",
    "overview": "في وحدة «السفر والسياحة» (Tourismus)، الهدف إنك أخطط لرحلة وأصف أماكن سياحية وأعبّر عن تفضيلاتي. غطّينا القواعد الأساسية: Adjektivdeklination nach unbestimmtem Artikel: ein schönes Haus؛ Konjunktiv II höflich: Ich hätte gern, Könnten Sie؛ Tempuswechsel Perfekt in Reiseberichten. وركّزنا على المفردات في محاور: السفر، الحجز، الأماكن. ومن الجمل اللي اتدربنا عليها «Ich hätte gern ein Einzelzimmer mit Aussicht.» و«Wir haben das Hotel im Internet gebucht.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Ich hätte gern ein Einzelzimmer mit Aussicht. Wir haben das Hotel im Internet gebucht.",
        "modelAnswer": "أودّ غرفة مفردة بمنظر حلو. / حجزنا الفندق على النت."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «السفر»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Ich hätte gern ein Einzelzimmer mit Aussicht.",
        "modelAnswer": "أودّ غرفة مفردة بمنظر حلو."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "die Reise",
        "modelAnswer": "الرحلة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Die Stadt ist für ihre Altstadt bekannt.",
        "modelAnswer": "المدينة مشهورة بقديمها."
      }
    }
  },
  "de-a2-u04": {
    "unitId": "de-a2-u04",
    "overview": "في وحدة «التسوّق» (Einkaufen)، الهدف إنك أشتري حاجات وأسأل عن السعر والمقاس وأقارن بين المنتجات. غطّينا القواعد الأساسية: Temporale Präpositionen: am, im, bis, seit؛ Preisangaben: kostet, kostet ... , billig, teuer؛ Perfekt mit trennbaren Verben: anprobe. وركّزنا على المفردات في محاور: المحلات، الأسعار، المقاسات. ومن الجمل اللي اتدربنا عليها «Was kostet das T-Shirt?» و«Ich probiere die Jacke mal an.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Was kostet das T-Shirt? Ich probiere die Jacke mal an.",
        "modelAnswer": "التيشيرت ده بكم؟ / بجرّب الجاكيت."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «المحلات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Was kostet das T-Shirt?",
        "modelAnswer": "التيشيرت ده بكم؟"
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "der Preis",
        "modelAnswer": "السعر"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Kann ich mit Karte zahlen?",
        "modelAnswer": "أدفع بالكارت؟"
      }
    }
  },
  "de-a2-u05": {
    "unitId": "de-a2-u05",
    "overview": "في وحدة «جولة في المدينة» (Stadtbesichtigung)، الهدف إنك أرشد زائرًا في المدينة وأصف المباني والمعالم بلباقة. غطّينا القواعد الأساسية: Adjektivdeklination (bestimmter Artikel): der alte Dom؛ Relativsätze mit wo/der (erste Berührung)؛ Imperativ höflich: Schauen Sie mal. وركّزنا على المفردات في محاور: المدينة، التنقّل، الوصف. ومن الجمل اللي اتدربنا عليها «Gehen Sie geradeaus bis zum Rathaus.» و«Der Dom, der im 14. Jahrhundert gebaut wurde, ist beeindruckend.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Gehen Sie geradeaus bis zum Rathaus. Der Dom, der im 14. Jahrhundert gebaut wurde, ist beeindruckend.",
        "modelAnswer": "امشي على طول لحد البلدية. / الكاتدرائية اللي اتبنّت في القرن ال14 مبهرة."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «المدينة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Gehen Sie geradeaus bis zum Rathaus.",
        "modelAnswer": "امشي على طول لحد البلدية."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "der Dom",
        "modelAnswer": "الكاتدرائية"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Schauen Sie mal, wie schön der Platz ist!",
        "modelAnswer": "بص شوف الساحة حلوة قد إيه!"
      }
    }
  },
  "de-a2-u06": {
    "unitId": "de-a2-u06",
    "overview": "في وحدة «ثقافة وفنون» (Kultur)، الهدف إنك أتحدث عن الفن والموسيقى والمسرح وأعبّر عن رأيي بلباقة. غطّينا القواعد الأساسية: Konjunktiv II: könnte, sollte, würde؛ wenn / falls (Bedingung)؛ Meinung äußern: Ich finde, .... وركّزنا على المفردات في محاور: الفنون، المسرح، الذوق. ومن الجمل اللي اتدربنا عليها «Wenn ich Zeit hätte, würde ich öfter ins Museum gehen.» و«Ich finde, das Stück sollte man nicht verpassen.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Wenn ich Zeit hätte, würde ich öfter ins Museum gehen. Ich finde, das Stück sollte man nicht verpassen.",
        "modelAnswer": "لو كان عندي وقت، كنت بروح المتحف أكتر. / أنا شايف المسرحية دي متفوتهاش."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الفنون»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Wenn ich Zeit hätte, würde ich öfter ins Museum gehen.",
        "modelAnswer": "لو كان عندي وقت، كنت بروح المتحف أكتر."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "das Museum",
        "modelAnswer": "المتحف"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Könntest du mir bitte die Kamera reichen?",
        "modelAnswer": "تقدر توصلني الكاميرا؟"
      }
    }
  },
  "de-a2-u07": {
    "unitId": "de-a2-u07",
    "overview": "في وحدة «رياضة ولياقة» (Sport und Fitness)، الهدف إنك أتحدث عن رياضاتي المفضلة وأصف التمارين وأقدّم نصائح بسيطة. غطّينا القواعد الأساسية: weil / deshalb (Grund)؛ dass-Sätze؛ Adjektive als Prädikativ: fit, müde. وركّزنا على المفردات في محاور: الرياضة، الصحة، التحفيز. ومن الجمل اللي اتدربنا عليها «Ich trainiere dreimal die Woche, weil es mir Spaß macht.» و«Wir haben gewonnen, deshalb sind wir glücklich.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Ich trainiere dreimal die Woche, weil es mir Spaß macht. Wir haben gewonnen, deshalb sind wir glücklich.",
        "modelAnswer": "بتمرن تلات مرات في الأسبوع لأنه بيبسطني. / كسبنا، عشان كده إحنا مبسوطين."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الرياضة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Ich trainiere dreimal die Woche, weil es mir Spaß macht.",
        "modelAnswer": "بتمرن تلات مرات في الأسبوع لأنه بيبسطني."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "die Mannschaft",
        "modelAnswer": "الفريق"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Ich hoffe, dass die Verletzung schnell heilt.",
        "modelAnswer": "بأمل الإتصابة تخف بسرعة."
      }
    }
  },
  "de-a2-u08": {
    "unitId": "de-a2-u08",
    "overview": "في وحدة «الصحة والمرض» (Gesundheit und Krankheit)، الهدف إنك أصف أعراضي وأشرح شكواي الطبية وأستمع لنصائح الطبيب. غطّينا القواعد الأساسية: Reflexive Verben: sich fühlen, sich ausruhen؛ Akkusativ-Verben der Beschwerde: mich weh tun؛ Imperativ des Arztes: Trinken Sie viel Wasser. وركّزنا على المفردات في محاور: الأعراض، الصيدلية، النصيحة. ومن الجمل اللي اتدربنا عليها «Ich fühle mich nicht gut, ich habe Kopfschmerzen.» و«Der Hals tut weh und ich bin müde.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Ich fühle mich nicht gut, ich habe Kopfschmerzen. Der Hals tut weh und ich bin müde.",
        "modelAnswer": "مش حاسس بنفسي، راسي وجّعني. / حلقي موجعني ومتعب."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الأعراض»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Ich fühle mich nicht gut, ich habe Kopfschmerzen.",
        "modelAnswer": "مش حاسس بنفسي، راسي وجّعني."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "die Erkältung",
        "modelAnswer": "الرشح"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Trinken Sie viel Wasser und ruhen Sie sich aus.",
        "modelAnswer": "اشرب مياه كتير واسترح."
      }
    }
  },
  "de-a2-u09": {
    "unitId": "de-a2-u09",
    "overview": "في وحدة «الشغل اليوم» (Arbeitsleben)، الهدف إنك أصف يوم عملي وأتحدث عن مهامي وأخطط لوقتي بجمل زمنية. غطّينا القواعد الأساسية: wenn / als (unterschiedliche Zeiten)؛ Wechselpräpositionen im Arbeitskontext؛ Präsens als Erzählzeit. وركّزنا على المفردات في محاور: الشغل، المهام، الوقت. ومن الجمل اللي اتدربنا عليها «Wenn die Besprechung fertig ist, gehe ich nach Hause.» و«Als ich ankam, hatte der Chef schon angerufen.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Wenn die Besprechung fertig ist, gehe ich nach Hause. Als ich ankam, hatte der Chef schon angerufen.",
        "modelAnswer": "لما الاجتماع يخلص، أروح البيت. / لما وصلت، المدير كان اتصل قبل كده."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الشغل»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Wenn die Besprechung fertig ist, gehe ich nach Hause.",
        "modelAnswer": "لما الاجتماع يخلص، أروح البيت."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "die Besprechung",
        "modelAnswer": "الاجتماع"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Ich erledige den Bericht bis Mittag.",
        "modelAnswer": "خلّص التقرير قبل الضهر."
      }
    }
  },
  "de-a2-u10": {
    "unitId": "de-a2-u10",
    "overview": "في وحدة «في المطعم» (Im Restaurant)، الهدف إنك أطلب في المطعم وأصف أكل مفضل وأعبّر عن رضاي أو شكواي. غطّينا القواعد الأساسية: Passiv Präsens: wird zubereitet, werden bestellt؛ höfliche Bestellung: Ich möchte gern؛ Sätze mit weil (Begründung). وركّزنا على المفردات في محاور: الأكل، المطعم، الطلبات. ومن الجمل اللي اتدربنا عليها «Ich möchte gern das Tagesgericht bestellen.» و«Das Gericht wird frisch zubereitet.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Ich möchte gern das Tagesgericht bestellen. Das Gericht wird frisch zubereitet.",
        "modelAnswer": "أحبّ أطلب طبق اليوم. / الطبق بيتعمل طازة."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الأكل»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Ich möchte gern das Tagesgericht bestellen.",
        "modelAnswer": "أحبّ أطلب طبق اليوم."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "die Speisekarte",
        "modelAnswer": "منيو الأكل"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Die Suppe war leider kalt.",
        "modelAnswer": "للأسف الشوربة كانت باردة."
      }
    }
  },
  "de-a2-u11": {
    "unitId": "de-a2-u11",
    "overview": "في وحدة «عن الشركة» (Firmenporträt)، الهدف إنك أعرّف بشركة وأصف منتجاتها ونموّها بلغة إخبارية بسيطة. غطّينا القواعد الأساسية: Präteritum der Modalverben: konnte, wollte, musste؛ Relativpronomen Nom./Akk.: der, den؛ Passiv Präsens (Wiederholung). وركّزنا على المفردات في محاور: الشركات، المنتجات، النمو. ومن الجمل اللي اتدربنا عليها «Die Firma wurde 1998 gegründet.» و«Das Produkt, das wir herstellen, ist im ganzen Land bekannt.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Die Firma wurde 1998 gegründet. Das Produkt, das wir herstellen, ist im ganzen Land bekannt.",
        "modelAnswer": "الشركة اتأسّست سنة 1998. / المنتج اللي بنصنعه مشهور في البلد كلها."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الشركات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Die Firma wurde 1998 gegründet.",
        "modelAnswer": "الشركة اتأسّست سنة 1998."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "die Firma",
        "modelAnswer": "الشركة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Der Markt musste sich verändern.",
        "modelAnswer": "السوق كان لازم يتغيّر."
      }
    }
  },
  "de-a2-u12": {
    "unitId": "de-a2-u12",
    "overview": "في وحدة «الأكل والصحة» (Ernährung)، الهدف إنك أتكلم عن عادات الأكل وأصف وجباتي وأعبّر عن التفضيلات الصحية. غطّينا القواعد الأساسية: Genitiv: des Brotes, des Wassers؛ Adjektivendungen nach keiner/kein؛ Präpositionalobjekt mit für/ohne. وركّزنا على المفردات في محاور: الأكل، العادات، الصحة. ومن الجمل اللي اتدربنا عليها «Das Brot ist frisch, deshalb schmeckt es gut.» و«Ich esse ohne Fleisch, weil ich Gemüse bevorzuge.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Das Brot ist frisch, deshalb schmeckt es gut. Ich esse ohne Fleisch, weil ich Gemüse bevorzuge.",
        "modelAnswer": "العيش طازة، عشان كده طعمه حلو. / بآكل من غير لحمة لأنّي أفضّل الخضار."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الأكل»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Das Brot ist frisch, deshalb schmeckt es gut.",
        "modelAnswer": "العيش طازة، عشان كده طعمه حلو."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "die Ernährung",
        "modelAnswer": "التغذية"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Wegen des Wetters kochen wir heute zu Hause.",
        "modelAnswer": " بسبب الجو، النهاردة بناكل في البيت."
      }
    }
  },
  "de-b1-u01": {
    "unitId": "de-b1-u01",
    "overview": "في وحدة «الصداقة» (Freundschaft)، الهدف إنك أتكلم عن علاقاتي وأصف أصدقائي وأعبّر عن الولاء والمشاعر بأسلوب B1. غطّينا القواعد الأساسية: Adjektive als Nomen: der Alte, die Alte؛ n-Deklination: den jungen Mann؛ Adjektivendungen nach Possessivartikel. وركّزنا على المفردات في محاور: الصداقة، الصفات، المشاعر. ومن الجمل اللي اتدربنا عليها «Meinem besten Freund kann ich alles anvertrauen.» و«Wir haben uns mal gestritten, sind aber wieder versöhnt.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Meinem besten Freund kann ich alles anvertrauen. Wir haben uns mal gestritten, sind aber wieder versöhnt.",
        "modelAnswer": "أحكي لصاحب المفضل أي حاجة. / اتخانقنا بعدين اتصالحنا."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الصداقة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Meinem besten Freund kann ich alles anvertrauen.",
        "modelAnswer": "أحكي لصاحب المفضل أي حاجة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "die Freundschaft",
        "modelAnswer": "الصداقة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Die junge Kollegin hilft mir immer.",
        "modelAnswer": "الزميلة الصغيرة دايمًا بتساعدني."
      }
    }
  },
  "de-b1-u02": {
    "unitId": "de-b1-u02",
    "overview": "في وحدة «الشغل والعمل» (Beruf und Arbeit)، الهدف إنك أحكي مسيرتي المهنية بالأزمنة البسيطة وأصف بيئة عملي بدقة. غطّينا القواعد الأساسية: Präteritum von sein/haben/werden: war, hatte, wurde؛ Konnektoren: während, danach, daraufhin؛ Partizipialattribute (erste Berührung): die geplante Maßnahme. وركّزنا على المفردات في محاور: المسيرة، بيئة العمل، التغيير. ومن الجمل اللي اتدربنا عليها «Ich war fünf Jahre in derselben Firma tätig.» و«Danach wurde ich Teamleiterin.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Ich war fünf Jahre in derselben Firma tätig. Danach wurde ich Teamleiterin.",
        "modelAnswer": "شتغلت تمن سنين في نفس الشركة. / بعدها بقيت قائدة الفريق."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «المسيرة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Ich war fünf Jahre in derselben Firma tätig.",
        "modelAnswer": "شتغلت تمن سنين في نفس الشركة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "die Laufbahn",
        "modelAnswer": "المسار المهني"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Die geplante Maßnahme wurde gut angenommen.",
        "modelAnswer": "الإجراء المخطط اتقبل كويس."
      }
    }
  },
  "de-b1-u03": {
    "unitId": "de-b1-u03",
    "overview": "في وحدة «السكن والمنزل» (Wohnen)، الهدف إنك أصف منزلي الجديد وأربط الأماكن بصفاتها عبر جمل وصفية مركّبة. غطّينا القواعد الأساسية: Relativsätze mit Dativ: der Wohnung, in der...؛ Präpositionalattribut + Relativsatz؛ Wechselpräpositionen (Wiederholung). وركّزنا على المفردات في محاور: المنزل، الوصف، الأمور اليومية. ومن الجمل اللي اتدربنا عليها «Die Wohnung, in der wir wohnen, hat einen schönen Balkon.» و«Der Vermieter, mit dem ich sprach, war freundlich.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Die Wohnung, in der wir wohnen, hat einen schönen Balkon. Der Vermieter, mit dem ich sprach, war freundlich.",
        "modelAnswer": "الشقق اللي ساكنين فيها ليها بلكونة حلوة. / المالك اللي كلمته كان لطيف."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «المنزل»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Die Wohnung, in der wir wohnen, hat einen schönen Balkon.",
        "modelAnswer": "الشقق اللي ساكنين فيها ليها بلكونة حلوة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "die Einrichtung",
        "modelAnswer": "الأثاث والترتيب"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Wegen der Heizung müssen wir oft lüften.",
        "modelAnswer": "عشان التدفئة، لازم نفتح الشباك كتير."
      }
    }
  },
  "de-b1-u04": {
    "unitId": "de-b1-u04",
    "overview": "في وحدة «خدمة الزبائن» (Kundenservice)، الهدف إنك أشكوا وأطلب حلولًا وأعبّر عن الاستمرار رغم العوائق بلباقة. غطّينا القواعد الأساسية: obwohl / trotzdem (Konzession)؛ Beschwerde-Formeln: Ich möchte mich beschweren؛ Passiv im Servicekontext: wird erstattet. وركّزنا على المفردات في محاور: الخدمة، الشكوى، الحلول. ومن الجمل اللي اتدربنا عليها «Ich möchte mich beschweren, obwohl das Problem klein ist.» و«Die Rücksendung wurde bereits bearbeitet.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Ich möchte mich beschweren, obwohl das Problem klein ist. Die Rücksendung wurde bereits bearbeitet.",
        "modelAnswer": "عايز أشكو رغم إن المشكلة صغيرة. / الرجوع اتعالج خلاص."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الخدمة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Ich möchte mich beschweren, obwohl das Problem klein ist.",
        "modelAnswer": "عايز أشكو رغم إن المشكلة صغيرة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "die Reklamation",
        "modelAnswer": "الشكوى"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Trotzdem danke ich für Ihre Geduld.",
        "modelAnswer": "ورغم كده متشكر لصبرك."
      }
    }
  },
  "de-b1-u05": {
    "unitId": "de-b1-u05",
    "overview": "في وحدة «المستقبل» (Zukunft)، الهدف إنك أتنبأ بالمستقبل وأضع خططًا وأعبّر عن الآمال والأفكار الواعدة. غطّينا القواعد الأساسية: Futur I: ich werde arbeiten, es wird regnen؛ wahrscheinlich / vielleicht / bestimmt (Prognose)؛ Infinitiv mit zu nach planen. وركّزنا على المفردات في محاور: التخطيط، التنبؤ، الأهداف. ومن الجمل اللي اتدربنا عليها «Ich werde nächstes Jahr einen Kurs besuchen.» و«Es wird vermutlich kälter werden.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Ich werde nächstes Jahr einen Kurs besuchen. Es wird vermutlich kälter werden.",
        "modelAnswer": "هحضر دورة السنة الجاية. / على الأرجح هيبرد أكتر."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «التخطيط»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Ich werde nächstes Jahr einen Kurs besuchen.",
        "modelAnswer": "هحضر دورة السنة الجاية."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "die Zukunft",
        "modelAnswer": "المستقبل"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Ich plane, mehr Zeit für die Familie zu nehmen.",
        "modelAnswer": "بخطط آخد وقت أكتر للعيلة."
      }
    }
  },
  "de-b1-u06": {
    "unitId": "de-b1-u06",
    "overview": "في وحدة «دعوات ومواعيد» (Einladungen)، الهدف إنك أدعو الناس وأعتذر وأقبل الدعوات باستخدام الأساليب المهذبة. غطّينا القواعد الأساسية: Infinitiv mit zu: Ich freue mich, ... zu kommen؛ Einladungsformeln: Lust haben, mitkommen؛ etwas vorhaben + Akkusativ. وركّزنا على المفردات في محاور: الدعوات، اللباقة، الخطط. ومن الجمل اللي اتدربنا عليها «Hast du Lust, am Samstag mitzukommen?» و«Ich freue mich, dich zu sehen.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Hast du Lust, am Samstag mitzukommen? Ich freue mich, dich zu sehen.",
        "modelAnswer": "عايز تيجي معانا السبت؟ / فرحان إني هشوفك."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الدعوات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Hast du Lust, am Samstag mitzukommen?",
        "modelAnswer": "عايز تيجي معانا السبت؟"
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "die Einladung",
        "modelAnswer": "الدعوة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Leider muss ich absagen, ich habe einen Termin.",
        "modelAnswer": "للأسف لازم أعذر، عندي موعد."
      }
    }
  },
  "de-b1-u07": {
    "unitId": "de-b1-u07",
    "overview": "في وحدة «الاستشارة والمشورة» (Beratung)، الهدف إنك أستشير وأقدّم نصائح وأربط الأحداث السابقة بالحاضر بدقّة. غطّينا القواعد الأساسية: Plusquamperfekt: hatte ... gemacht؛ Beratungsformeln: Ich würde vorschlagen؛ Modalpartikeln in der Beratung: doch, mal, eben. وركّزنا على المفردات في محاور: النصيحة، الخبرة، القرار. ومن الجمل اللي اتدربنا عليها «Ich hatte das Problem schon analysiert, bevor du anriefst.» و«Ich würde vorschlagen, beide Optionen abzuwägen.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Ich hatte das Problem schon analysiert, bevor du anriefst. Ich würde vorschlagen, beide Optionen abzuwägen.",
        "modelAnswer": "كنت حلّلت المشكلة قبل ما تكلّم. / بقترح نقارن بين الخيارين."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «النصيحة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Ich hatte das Problem schon analysiert, bevor du anriefst.",
        "modelAnswer": "كنت حلّلت المشكلة قبل ما تكلّم."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "die Beratung",
        "modelAnswer": "الاستشارة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Wir sollten die Ursache erst erörtern.",
        "modelAnswer": "الأحسن نفحص السبب الأول."
      }
    }
  },
  "de-b1-u08": {
    "unitId": "de-b1-u08",
    "overview": "في وحدة «اختيار الشغل» (Berufsfindung)، الهدف إنك أحلل مسيرتي المهنية كما لو كانت رُويت للتوّ وأستنتج بدروس من الماضي. غطّينا القواعد الأساسية: Konjunktiv II Vergangenheit: hätte ... gemacht, wäre ... geworden؛  hätte / wäre + Partizip II؛ Vergangenheitsbetrachtung: Wenn ich ... hätte. وركّزنا على المفردات في محاور: الاختيار، التأمّل، التوجيه. ومن الجمل اللي اتدربنا عليها «Wenn ich mehr Zeit gehabt hätte, wäre ich länger geblieben.» و«Ich hätte die Bewerbung früher abschicken sollen.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Wenn ich mehr Zeit gehabt hätte, wäre ich länger geblieben. Ich hätte die Bewerbung früher abschicken sollen.",
        "modelAnswer": "لو كان عندي وقت أكتر، كنت فضلت أكتر. / كنت لازم أبعت التقديم بدري."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الاختيار»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Wenn ich mehr Zeit gehabt hätte, wäre ich länger geblieben.",
        "modelAnswer": "لو كان عندي وقت أكتر، كنت فضلت أكتر."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "die Berufswahl",
        "modelAnswer": "اختيار المهنة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Das Praktikum gab mir wichtige Einsichten.",
        "modelAnswer": "التدريب العملي ادّاني ملاحظات مهمة."
      }
    }
  },
  "de-b1-u09": {
    "unitId": "de-b1-u09",
    "overview": "في وحدة «الصحة» (Gesundheit)، الهدف إنك أناقش عادات صحية وأربط السبب بالنتيجة بلغة واعية. غطّينا القواعد الأساسية: Genitiv nach Präpositionen: wegen, trotz, während؛ Pronominaladverb: darauf, damit؛ Adjektiv + Präposition: abhängig von. وركّزنا على المفردات في محاور: الصحة، الأسباب، العادات. ومن الجمل اللي اتدربنا عليها «Wegen des Schlafmangels bin ich ständig müde.» و«Trotz der Mühe ist die Untersuchung wichtig.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Wegen des Schlafmangels bin ich ständig müde. Trotz der Mühe ist die Untersuchung wichtig.",
        "modelAnswer": "عشان قلة النوم، أنا متعب طول الوقت. / رغم التعب، الفحص مهم."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الصحة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Wegen des Schlafmangels bin ich ständig müde.",
        "modelAnswer": "عشان قلة النوم، أنا متعب طول الوقت."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "die Vorsorge",
        "modelAnswer": "الوقاية"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Ich bin abhängig von Kaffee, darauf muss ich achten.",
        "modelAnswer": "معتمد على القهوة، لازم أنتبه."
      }
    }
  },
  "de-b1-u10": {
    "unitId": "de-b1-u10",
    "overview": "في وحدة «فرص ضاعت» (Verpasste Gelegenheiten)، الهدف إنك أعبّر عن الندم وتحليل المواقف وأربط النتائج بأسبابها بأسلوب فصيح بسيط. غطّينا القواعد الأساسية: Folge-Konnektoren: zu ... um zu, so ... dass؛ hätte gern gewollt + Infinitiv؛ Modalverben im Konjunktiv II (Wiederholung). وركّزنا على المفردات في محاور: الندم، التحليل، الفرص. ومن الجمل اللي اتدربنا عليها «Die Stadt ist zu groß, um sie an einem Tag zu sehen.» و«Er war so müde, dass er alles vergaß.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Die Stadt ist zu groß, um sie an einem Tag zu sehen. Er war so müde, dass er alles vergaß.",
        "modelAnswer": "المدينة كبيرة أوي عشان تشوفها في يوم. / كان تعبان لدرجة إنه نسى كل حاجة."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الندم»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Die Stadt ist zu groß, um sie an einem Tag zu sehen.",
        "modelAnswer": "المدينة كبيرة أوي عشان تشوفها في يوم."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "die Gelegenheit",
        "modelAnswer": "الفرصة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Ich hätte die Chance nicht verpassen sollen.",
        "modelAnswer": "كنت ما ينفعش أفوت الفرصة دي."
      }
    }
  },
  "de-b1-u11": {
    "unitId": "de-b1-u11",
    "overview": "في وحدة «لحظات سعادة» (Glücksmomente)، الهدف إنك أصف لحظات سعيدة وأصف الشخصيات والمشاعر بأسلوب حيّ. غطّينا القواعد الأساسية: Partizipien als Adjektive: die gelaufene Sache, die geplante Reise؛ es-Ausdrücke: es gibt, es ist mir wichtig؛ Modalpartikeln: ja, doch, mal. وركّزنا على المفردات في محاور: السعادة، اللحظات، الوصف. ومن الجمل اللي اتدربنا عليها «Es ist mir wichtig, solche Momente zu genießen.» و«Die geplante Reise wurde zu einem unvergesslichen Erlebnis.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Es ist mir wichtig, solche Momente zu genießen. Die geplante Reise wurde zu einem unvergesslichen Erlebnis.",
        "modelAnswer": "مهم بالنسبة لي إني أستمتع باللحظات دي. / الرحلة المخطط لها بقت تجربة مش هتنسي."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «السعادة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Es ist mir wichtig, solche Momente zu genießen.",
        "modelAnswer": "مهم بالنسبة لي إني أستمتع باللحظات دي."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "der Glücksmoment",
        "modelAnswer": "لحظة السعادة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Die gelaufene Sache hat mich doch überrascht.",
        "modelAnswer": "الحاجة اللي حصلت فعلاً مفاجأتني."
      }
    }
  },
  "de-b1-u12": {
    "unitId": "de-b1-u12",
    "overview": "في وحدة «احتفالات بالشغل» (Feiern im Betrieb)، الهدف إنك أصف مناسبات العمل وأعبّر عن التنظيم والأغراض بلغة إدارية ميسّرة. غطّينا القواعد الأساسية: Passiv mit Modalverben: muss ... vorbereitet werden؛ Modalpartikeln in Aufforderungen: wir müssen mal؛ um ... zu / damit (Zweck). وركّزنا على المفردات في محاور: الاحتفالات، التنظيم، الأغراض. ومن الجمل اللي اتدربنا عليها «Das Buffet muss bis 16 Uhr vorbereitet werden.» و«Wir müssen die Einladungen mal rechtzeitig schicken.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Das Buffet muss bis 16 Uhr vorbereitet werden. Wir müssen die Einladungen mal rechtzeitig schicken.",
        "modelAnswer": "البوفيه لازم يتجهّز لحد الساعة 4. / لازم نبعت الدعوات بدري."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الاحتفالات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Das Buffet muss bis 16 Uhr vorbereitet werden.",
        "modelAnswer": "البوفيه لازم يتجهّز لحد الساعة 4."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "das Jubiläum",
        "modelAnswer": "العيد السنوي للشركة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Die Feier wurde ausgerichtet, damit sich alle treffen.",
        "modelAnswer": "الحفلة اتعملت عشان الكل يتقابل."
      }
    }
  },
  "de-b2-u01": {
    "unitId": "de-b2-u01",
    "overview": "في وحدة «الوطن يعني إيه؟» (Heimat ist …)، الهدف إنك أناقش معنى الوطن والانتماء بأسلوب حجاجي وأضبط التركيب والنفي بدقة. غطّينا القواعد الأساسية: Wortstellung in Nebensätzen und mit Verneinung: nicht ... nur؛ Verneinung: kein / nicht / niemand / nichts (Nuancen)؛ Modalpartikeln zur Abschwächung: eigentlich, durchaus. وركّزنا على المفردات في محاور: الانتماء، الوطن، الحجاج. ومن الجمل اللي اتدربنا عليها «Heimat ist nicht unbedingt der Geburtsort.» و«Wir gehören eigentlich überall dazu, wo wir willkommen sind.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Heimat ist nicht unbedingt der Geburtsort. Wir gehören eigentlich überall dazu, wo wir willkommen sind.",
        "modelAnswer": "الوطن مش بالضرورة مكان الولادة. / احنا أصلًا من أي مكان بيرحب بينا."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الانتماء»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Heimat ist nicht unbedingt der Geburtsort.",
        "modelAnswer": "الوطن مش بالضرورة مكان الولادة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "die Heimat",
        "modelAnswer": "الوطنيه/الانتماء"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Durchaus prägen uns die Traditionen unserer Familie.",
        "modelAnswer": "التقاليد العائلية فعلًا بتشكّلنا."
      }
    }
  },
  "de-b2-u02": {
    "unitId": "de-b2-u02",
    "overview": "في وحدة «اتكلم معايا» (Sprich mit mir!)، الهدف إنك أقارن مستويات وأعبّر عن التطور بأسلوب دقيق باستخدام أدوات المقارنة. غطّينا القواعد الأساسية: Vergleichssätze: als, wie, je ... desto؛ unregelmäßige Vergleiche: besser, mehr, gern؛ Modalverben + Infinitiv im Vergleich. وركّزنا على المفردات في محاور: التواصل، التقدّم، المقارنة. ومن الجمل اللي اتدربنا عليها «Je mehr du übst, desto sicherer wirst du.» و«Er spricht fließender als seine Kollegen.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Je mehr du übst, desto sicherer wirst du. Er spricht fließender als seine Kollegen.",
        "modelAnswer": "كل ما تتمرن أكتر، بتشعر بثقة أكتر. / بيتكلم انسيابي أكتر من زمايله."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «التواصل»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Je mehr du übst, desto sicherer wirst du.",
        "modelAnswer": "كل ما تتمرن أكتر، بتشعر بثقة أكتر."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "der Austausch",
        "modelAnswer": "التبادل"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Die Verhandlung lief so gut, wie wir es erwartet hatten.",
        "modelAnswer": "التفاوض مشي زي ما توقعنا."
      }
    }
  },
  "de-b2-u03": {
    "unitId": "de-b2-u03",
    "overview": "في وحدة «الشغل نص الحياة» (Arbeit ist das halbe Leben?)، الهدف إنك أزن بين الخيارات وأطرح الاحتمالات بلغة متوازنة وأستعمل أزواج الروابط. غطّينا القواعد الأساسية: Zweiteilige Konnektoren: entweder ... oder, weder ... noch, sowohl ... als auch؛ Implikation: wenn ... , dann ...؛ Aurede: es sei denn, andernfalls. وركّزنا على المفردات في محاور: الشغل، الموازنة، الاحتمالات. ومن الجمل اللي اتدربنا عليها «Entweder wir verlängern die Frist, oder wir streichen das Projekt.» و«Weder der Lohn noch die Bedingungen passen.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Entweder wir verlängern die Frist, oder wir streichen das Projekt. Weder der Lohn noch die Bedingungen passen.",
        "modelAnswer": "إمّا نمدّ الموعد، وإلا نلغي المشروع. / لا الأجر ولا الشروط مناسبين."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الشغل»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Entweder wir verlängern die Frist, oder wir streichen das Projekt.",
        "modelAnswer": "إمّا نمدّ الموعد، وإلا نلغي المشروع."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "die Work-Life-Balance",
        "modelAnswer": "التوازن بين الشغل والحياة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Sowohl Erfahrung als auch Ehrlichkeit zählen.",
        "modelAnswer": "الخبرة والصدق الاتنين بيتحسبوا."
      }
    }
  },
  "de-b2-u04": {
    "unitId": "de-b2-u04",
    "overview": "في وحدة «العيش مع بعض» (Zusammen leben)، الهدف إنك أعبّر عن الأغراض والبدائل في الحياة اليومية بأسلوب متقدّم قليلًا. غطّينا القواعد الأساسية: Infinitiv mit zu nach um / ohne / (an)statt؛ Alternativen: anstatt zu diskutieren؛ Kausalkette: dadurch, dass. وركّزنا على المفردات في محاور: التعايش، السلوك، الأغراض. ومن الجمل اللي اتدربنا عليها «Statt zu klagen, könnten wir eine Lösung suchen.» و«Ohne Rücksicht zu nehmen, regelt man nichts.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Statt zu klagen, könnten wir eine Lösung suchen. Ohne Rücksicht zu nehmen, regelt man nichts.",
        "modelAnswer": "بدل ما نشتكي، ممكن ندور على حل. / من غير مراعاة، محدش بيظبط حاجة."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «التعايش»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Statt zu klagen, könnten wir eine Lösung suchen.",
        "modelAnswer": "بدل ما نشتكي، ممكن ندور على حل."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "das Miteinander",
        "modelAnswer": "التعايش"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Dadurch, dass wir reden, vermeiden wir Missverständnisse.",
        "modelAnswer": "عشان بنتكلّم، بنتجنب سوء الفهم."
      }
    }
  },
  "de-b2-u05": {
    "unitId": "de-b2-u05",
    "overview": "في وحدة «العلم بيبني المعرفة» (Wer Wissen schafft, macht Wissenschaft)، الهدف إنك أكتب عن البحث والمعرفة بأسلوب منهجي وأستعمل الوصلات الاسمية والوصفية. غطّينا القواعد الأساسية: Relativsätze mit wer / was؛ Nomen-Verb-Verbindungen: eine Frage stellen – die Fragestellung؛ Nominalisierung von Verben: die Entscheidung – entscheiden. وركّزنا على المفردات في محاور: البحث، المعرفة، المنهج. ومن الجمل اللي اتدربنا عليها «Wer die Quelle nicht prüft, kann nicht argumentieren.» و«Die These lässt sich mit aktuellen Daten belegen.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Wer die Quelle nicht prüft, kann nicht argumentieren. Die These lässt sich mit aktuellen Daten belegen.",
        "modelAnswer": "مين ما بيتحقّقش من المصدر، مش بيقدر يجادل. / الأطروحة ممكن تتأيّد ببيانات حديثة."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «البحث»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Wer die Quelle nicht prüft, kann nicht argumentieren.",
        "modelAnswer": "مين ما بيتحقّقش من المصدر، مش بيقدر يجادل."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "die Forschung",
        "modelAnswer": "البحث العلمي"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Die Auswertung der Daten dauert mehrere Wochen.",
        "modelAnswer": "تحليل البيانات بياخد أسابيع."
      }
    }
  },
  "de-b2-u06": {
    "unitId": "de-b2-u06",
    "overview": "في وحدة «اللياقة والصحة» (Fit für …)، الهدف إنك أصف الخطط الصحية والممارسين بأسلوب موضوعي مستعملًا صيغ التعميم. غطّينا القواعد الأساسية: Passiv und Passiversatzformen: man sagt, es wird empfohlen؛ Vorgangspassiv vs. Zustandspassiv؛ Impersonales es: es geht darum. وركّزنا على المفردات في محاور: اللياقة، التعميم، النصح. ومن الجمل اللي اتدربنا عليها «Es wird empfohlen, dreimal pro Woche zu trainieren.» و«Man sagt, dass Bewegung vor Stress schützt.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Es wird empfohlen, dreimal pro Woche zu trainieren. Man sagt, dass Bewegung vor Stress schützt.",
        "modelAnswer": "الموصى بيها إنك تتمرن 3 مرات في الأسبوع. / بيقولوا إن الحركة بتحمي من التوتر."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «اللياقة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Es wird empfohlen, dreimal pro Woche zu trainieren.",
        "modelAnswer": "الموصى بيها إنك تتمرن 3 مرات في الأسبوع."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "die Empfehlung",
        "modelAnswer": "التوصية"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Es geht darum, Gewohnheiten langfristig zu ändern.",
        "modelAnswer": "الموضوع إننا نغيّر عاداتنا على المدى الطويل."
      }
    }
  },
  "de-b2-u07": {
    "unitId": "de-b2-u07",
    "overview": "في وحدة «عوالم ثقافية» (Kulturwelten)، الهدف إنك أقارن ثقافات وأعبّر عن أسباب وأوجه بأدوات لغوية دقيقة. غطّينا القواعد الأساسية: Indefinitpronomen: manche, diverse, sämtliche؛ Genitiv-Präpositionen: aufgrund, hinsichtlich, bezüglich؛ Nominalphrase mit Genitiv als Subjekt. وركّزنا على المفردات في محاور: الثقافات، المقارنة، الأسباب. ومن الجمل اللي اتدربنا عليها «Aufgrund der Vielfalt lohnt sich der Besuch.» و«Sämtliche Rituale erzählen eine Geschichte.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Aufgrund der Vielfalt lohnt sich der Besuch. Sämtliche Rituale erzählen eine Geschichte.",
        "modelAnswer": "بسبب التنوّع، الزيارة تستاهل. / كل الطقوس بتحكي قصة."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الثقافات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Aufgrund der Vielfalt lohnt sich der Besuch.",
        "modelAnswer": "بسبب التنوّع، الزيارة تستاهل."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "die Kulturszene",
        "modelAnswer": "المشهد الثقافي"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Hinsichtlich der Sprache gibt es große Unterschiede.",
        "modelAnswer": "بالنسبة للغة، في اختلافات كتير."
      }
    }
  },
  "de-b2-u08": {
    "unitId": "de-b2-u08",
    "overview": "في وحدة «اللي حصل تاريخًا» (Das macht(e) Geschichte)، الهدف إنك أنقل كلام الآخرين بشكل غير مباشر وأروي أحداثًا تاريخية بدقة. غطّينا القواعد الأساسية: Indirekte Rede mit Konjunktiv I: er sagte, er komme später؛ Konjunktiv II als Höflichkeitsform in der Wiedergabe؛ Zeitkonkordanz in der Wiedergabe. وركّزنا على المفردات في محاور: التاريخ، النقل، الأحداث. ومن الجمل اللي اتدربنا عليها «Er berichtete, die Verhandlungen seien ergebnislos geblieben.» و«Die Quellenlage lässt mehrere Deutungen zu.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Er berichtete, die Verhandlungen seien ergebnislos geblieben. Die Quellenlage lässt mehrere Deutungen zu.",
        "modelAnswer": "روى إن التفاوض فضل من غير نتائج. / وضع المصادر بيسمح بأكتر من تفسير."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «التاريخ»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Er berichtete, die Verhandlungen seien ergebnislos geblieben.",
        "modelAnswer": "روى إن التفاوض فضل من غير نتائج."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "die Zeitgeschichte",
        "modelAnswer": "التاريخ المعاصر"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Sie sagte, sie komme am nächsten Tag wieder.",
        "modelAnswer": "قالت إنها هترجي تاني يوم."
      }
    }
  },
  "de-b2-u09": {
    "unitId": "de-b2-u09",
    "overview": "في وحدة «مشاعر وتعبير» (Mit viel Gefühl …)، الهدف إنك أعبّر عن المشاعر بأسلوب مقنع وأستعمل التراكيب الاسمية لإيجاز الخطاب. غطّينا القواعد الأساسية: Nominalisierung von Nebensätzen: weil es regnet – wegen des Regens؛ Modalpartikeln zur Stimmung: aber, schon, ja؛ Partizipialattribute: die geplante Maßnahme. وركّزنا على المفردات في محاور: المشاعر، الإقناع، الإيجاز. ومن الجمل اللي اتدربنا عليها «Wegen des starken Regens fiel das Fest aus.» و«Die Schilderung war so eindringlich, dass alle schwiegen.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Wegen des starken Regens fiel das Fest aus. Die Schilderung war so eindringlich, dass alle schwiegen.",
        "modelAnswer": "بسبب المطر الغزير، الحفلة اتلغت. / السرد كان مؤثّر لدرجة إن الكل سكت."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «المشاعر»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Wegen des starken Regens fiel das Fest aus.",
        "modelAnswer": "بسبب المطر الغزير، الحفلة اتلغت."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "das Gefühl",
        "modelAnswer": "الشعور"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Mit der geplanten Maßnahme rechnet niemand.",
        "modelAnswer": "حدش متوقع الإجراء المخطط."
      }
    }
  },
  "de-b2-u10": {
    "unitId": "de-b2-u10",
    "overview": "في وحدة «نظرة للمستقبل» (Ein Blick in die Zukunft)، الهدف إنك أتنبأ وأصف الاتجاهات باستعمال المقارنات الشرطية والجمل الوصفية. غطّينا القواعد الأساسية: Vergleich mit als ob / als wenn (Konj. II)؛ Modalsätze: dadurch, dass, indem؛ Hypothese: wenn ... , würde .... وركّزنا على المفردات في محاور: المستقبل، الاتجاهات، التوقّع. ومن الجمل اللي اتدربنا عليها «Als ob es von selbst besser würde, sieht es nicht aus.» و«Dadurch, dass wir investieren, schaffen wir Arbeitsplätze.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Als ob es von selbst besser würde, sieht es nicht aus. Dadurch, dass wir investieren, schaffen wir Arbeitsplätze.",
        "modelAnswer": "مش باين إنها هتحسن لوحدها. / إننا بنستثمر بيوفر شغل."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «المستقبل»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Als ob es von selbst besser würde, sieht es nicht aus.",
        "modelAnswer": "مش باين إنها هتحسن لوحدها."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "die Prognose",
        "modelAnswer": "التنبؤ"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Wenn wir voraussichtlich weitermachen, wird es knapp.",
        "modelAnswer": "لو كملنا على الأرجح، هيبقى ضيق."
      }
    }
  },
  "de-b2-u11": {
    "unitId": "de-b2-u11",
    "overview": "في وحدة «مشاعر وأفكار عملاقة» (Mit Gefühl in die Zukunft)، الهدف إنك أجمع بين الوصف العميق والتحليل في نص واحد متّسق مع ربط الأفكار بأدوات ربط عالية. غطّينا القواعد الأساسية: Partizipien als Adjektive (erweitert): die künftig erwartete Zahl؛ Nomen/Verben/Adjektive mit Präpositionen: abhängig von, sich konzentrieren auf؛ Konnektoren: allerdings, mittlerweile, vielmehr. وركّزنا على المفردات في محاور: الربط، التحليل، التقدّم. ومن الجمل اللي اتدربنا عليها «Die Zahl der Nutzer ist mittlerweile deutlich gestiegen.» و«Wir sind allerdings weiterhin abhängig von Daten.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Die Zahl der Nutzer ist mittlerweile deutlich gestiegen. Wir sind allerdings weiterhin abhängig von Daten.",
        "modelAnswer": "عدد المستخدمين من وقتنا ده زاد واضح. / على أي حال، إحنا لسه معتمدين على البيانات."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الربط»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Die Zahl der Nutzer ist mittlerweile deutlich gestiegen.",
        "modelAnswer": "عدد المستخدمين من وقتنا ده زاد واضح."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "die Erwartung",
        "modelAnswer": "التوقّع"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Vielmehr sollten wir die Grundlage stärken.",
        "modelAnswer": "بل بالأحرى نقوّي الأساس."
      }
    }
  },
  "de-b2-u12": {
    "unitId": "de-b2-u12",
    "overview": "في وحدة «مراجعة المستوى B2» (Wiederholung B2)، الهدف إنك أراجع أهمّ هياكل B2 وأستعملها بثقة في مواقف متنوعة. غطّينا القواعد الأساسية: Indirekte Rede + Konjunktiv I (Sicherung)؛ Passiv und Passiversatzformen (Sicherung)؛ Konnektoren: je ... desto, obwohl, um ... zu (Sicherung). وركّزنا على المفردات في محاور: المراجعة، الاستخدام، الطلاقة. ومن الجمل اللي اتدربنا عليها «Wiederhole die Konnektoren, bevor du den Text schreibst.» و«Der Zusammenhang zwischen den Sätzen muss klar sein.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Wiederhole die Konnektoren, bevor du den Text schreibst. Der Zusammenhang zwischen den Sätzen muss klar sein.",
        "modelAnswer": "راجع الروابط قبل ما تكتب النص. / الارتباط بين الجمل لازم يكون واضح."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «المراجعة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Wiederhole die Konnektoren, bevor du den Text schreibst.",
        "modelAnswer": "راجع الروابط قبل ما تكتب النص."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "die Wiederholung",
        "modelAnswer": "المراجعة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Mit der Zeit wird die Formulierung sicherer.",
        "modelAnswer": "مع الوقت الصياغة بتبقى أثّق."
      }
    }
  },
  "de-c1-u01": {
    "unitId": "de-c1-u01",
    "overview": "في وحدة «كلام يومي بعمق» (Alltägliches – und ein Wort dazu)، الهدف إنك أناقش مواضيع يومية بأسلوب متمكّن مع تنويع روابط وأقلب بين الأساليب. غطّينا القواعد الأساسية: Konnektoren: andernfalls, folglich, außer wenn؛ Trennbare und untrennbare Verben (Feinheiten)؛ Redewiedergabe: er fügte hinzu, er wandte ein. وركّزنا على المفردات في محاور: المناقشة، التنويع، الكلام اليومي. ومن الجمل اللي اتدربنا عليها «Folglich müssen wir die Frage anders stellen.» و«Außer wenn es dringend ist, lehne ich das ab.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Folglich müssen wir die Frage anders stellen. Außer wenn es dringend ist, lehne ich das ab.",
        "modelAnswer": "وبالتالي لازم نغيّر شكل السؤال. / إلا لو مستعجل، برشّح أرفض."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «المناقشة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Folglich müssen wir die Frage anders stellen.",
        "modelAnswer": "وبالتالي لازم نغيّر شكل السؤال."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "das Alltägliche",
        "modelAnswer": "الحياة اليومية"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Er wandte ein, die Daten seien veraltet.",
        "modelAnswer": "اعتذر إن البيانات قديمة."
      }
    }
  },
  "de-c1-u02": {
    "unitId": "de-c1-u02",
    "overview": "في وحدة «الشغل والاقتصاد» (An die Arbeit! Wirtschaft im Blick)، الهدف إنك أكتب عن الشغل والاقتصاد بنبرة تحليلية متوازنة مع إيجاز الـNominalstil. غطّينا القواعد الأساسية: Nominal- und Verbalstil: wir entscheiden – die Entscheidung؛ Subjekt- und Objektsätze mit dass؛ Nominalisierung von Temporal-, Kausal- und Modalsätzen. وركّزنا على المفردات في محاور: الاقتصاد، التحليل، الأسلوب الرسمي. ومن الجمل اللي اتدربنا عليها «Nachdem die Zahlen vorlagen, folgte die Entscheidung.» و«Die Umstrukturierung führte zu spürbaren Einsparungen.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Nachdem die Zahlen vorlagen, folgte die Entscheidung. Die Umstrukturierung führte zu spürbaren Einsparungen.",
        "modelAnswer": "بعد ما البيانات وصلت، جه القرار. / إعادة الهيكلة وفّرت توفير ملموس."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الاقتصاد»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Nachdem die Zahlen vorlagen, folgte die Entscheidung.",
        "modelAnswer": "بعد ما البيانات وصلت، جه القرار."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "die Konjunktur",
        "modelAnswer": "الازدهار الاقتصادي"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Es ist unbestritten, dass die Kennzahl sinkt.",
        "modelAnswer": "من غير نقاش إن المؤشّر بيينزل."
      }
    }
  },
  "de-c1-u03": {
    "unitId": "de-c1-u03",
    "overview": "في وحدة «أهداف وصحة» (Ziele – gesund und munter)، الهدف إنك أضع أهدافًا وأحلّل عوائقها بأسلوب متقدّم مع جمل وصفية طويلة. غطّينا القواعد الأساسية: Weiterführende Nebensätze mit Relativpronomen؛ Negative Konsekutivsätze: zu ... um zu, als dass؛ Modales Partizip II: die bereits erwähnte Maßnahme. وركّزنا على المفردات في محاور: الأهداف، الصحة، الوصول. ومن الجمل اللي اتدربنا عليها «Das Ziel, für das wir uns engagieren, ist erreichbar.» و«Die Aufgabe ist zu komplex, als dass man sie sofort lösen könnte.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Das Ziel, für das wir uns engagieren, ist erreichbar. Die Aufgabe ist zu komplex, als dass man sie sofort lösen könnte.",
        "modelAnswer": "الهدف اللي ملتزمين بيه ممكن نوصله. / المهمة معقدة أوي إنها تتحل على طول."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الأهداف»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Das Ziel, für das wir uns engagieren, ist erreichbar.",
        "modelAnswer": "الهدف اللي ملتزمين بيه ممكن نوصله."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "das Vorhaben",
        "modelAnswer": "المشروع/النية"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Die bereits erwähnte Maßnahme wird evaluiert.",
        "modelAnswer": "الإجراء اللي اتكلمنا عنه قبل كده بيتم تقييمه."
      }
    }
  },
  "de-c1-u04": {
    "unitId": "de-c1-u04",
    "overview": "في وحدة «الحق والشخصية» (Recht so! Du bist, was du bist)، الهدف إنك أناقش القضايا والهوية بنبرة موزونة مع التحكم في التراكيب المركّبة. غطّينا القواعد الأساسية: Infinitivsätze (Gegenwart/Verangenheit): ohne es zu sagen, es gesagt zu haben؛ Passiv-Besonderheiten: Vorgang vs. Zustand, gemäß werden؛ Subjektive Modalverben: scheinen, gelten, pflegen. وركّزنا على المفردات في محاور: القانون، الهوية، التقدير. ومن الجمل اللي اتدربنا عليها «Ohne es zu bemerken, übernehmen wir fremde Normen.» و«Das Urteil gilt als richtungsweisend.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Ohne es zu bemerken, übernehmen wir fremde Normen. Das Urteil gilt als richtungsweisend.",
        "modelAnswer": "من غير ما نحس، بنستقبل معايير غريبة. / الحكم بيتّخذ كمرجع."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «القانون»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Ohne es zu bemerken, übernehmen wir fremde Normen.",
        "modelAnswer": "من غير ما نحس، بنستقبل معايير غريبة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "die Norm",
        "modelAnswer": "المعيار"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Es scheint, als sei die Debatte vorbei.",
        "modelAnswer": "باين إن النقاش خلص."
      }
    }
  },
  "de-c1-u05": {
    "unitId": "de-c1-u05",
    "overview": "في وحدة «فنون وذكريات» (Die schöne Welt der Künste – Erinnerungen)، الهدف إنك أكتب نصًّا وصفيًا عن الفن والذكريات بأسلوب متمكّن ومتّسق. غطّينا القواعد الأساسية: Nominalisierung von Präpositionalergänzungen؛ Konnektoren: allerdings, mittlerweile, vielmehr؛ Konditionalsätze: sofern, falls, unter der Bedingung dass. وركّزنا على المفردات في محاور: الفنون، الذاكرة، الأسلوب. ومن الجمل اللي اتدربنا عليها «Die Ausstellung, mittlerweile über zwei Jahre alt, beeindruckt noch immer.» و«Vielmehr zählt die emotionale Wirkung des Werks.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Die Ausstellung, mittlerweile über zwei Jahre alt, beeindruckt noch immer. Vielmehr zählt die emotionale Wirkung des Werks.",
        "modelAnswer": "المعرض، اللي من وقتنا ده أكتر من سنتين، لسه مبهر. / بالأحرى اللي مهم هو الأثر العاطفي للعمل."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الفنون»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Die Ausstellung, mittlerweile über zwei Jahre alt, beeindruckt noch immer.",
        "modelAnswer": "المعرض، اللي من وقتنا ده أكتر من سنتين، لسه مبهر."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "die Kunstwelt",
        "modelAnswer": "عالم الفن"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Sofern die Finanzierung hält, wird das Archiv geöffnet.",
        "modelAnswer": "طالما التمويل مستمر، الأرشيف هيفتح."
      }
    }
  },
  "de-c1-u06": {
    "unitId": "de-c1-u06",
    "overview": "في وحدة «حديث حرّ C1» (Freies Gespräch C1)، الهدف إنك أدير نقاشًا حرًّا بأسلوب ناضج: ألخّص، أنقل، وأردّ بلباقة عالية. غطّينا القواعد الأساسية: Redewiedergabe (gesichert): er argumentierte, er räumte ein؛ Modalitätsverben: dürfen, müssen, können im Diskurs؛ Diskursorganisation: eingangs, in diesem Zusammenhang, abschließend. وركّزنا على المفردات في محاور: التسيير، الإقناع، التلخيص. ومن الجمل اللي اتدربنا عليها «Eingangs möchte ich die These kurz zusammenfassen.» و«Er räumte ein, dass die Argumentation Lücken hatte.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Eingangs möchte ich die These kurz zusammenfassen. Er räumte ein, dass die Argumentation Lücken hatte.",
        "modelAnswer": "في الأول بحب ألخّص الأطروحة باختصار. / اعترف إن الحجاج فيه ثغرات."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «التسيير»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Eingangs möchte ich die These kurz zusammenfassen.",
        "modelAnswer": "في الأول بحب ألخّص الأطروحة باختصار."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "die Diskussionsrunde",
        "modelAnswer": "جولة النقاش"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "In diesem Zusammenhang ist die Statistik entscheidend.",
        "modelAnswer": "في السياق ده، الإحصائية هي الحاسمة."
      }
    }
  },
  "de-c2-u01": {
    "unitId": "de-c2-u01",
    "overview": "في وحدة «الدقة المعجمية» (Die Feinheiten des Wortschatzes)، الهدف إنك أفرّق بين مترادفات دقيقة وأستخدمها في سياقها الصحيح. غطّينا القواعد الأساسية: Falschfreunde und Nuancen؛ lexikalische Präzision؛ Register und Konnotation. وركّزنا على المفردات في محاور: الترادفات، الدقة، التمييز. ومن الجمل اللي اتدربنا عليها «Das ist nicht genau das, was ich meinte.» و«Der passende Ausdruck wäre « Nuance ».». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Das ist nicht genau das, was ich meinte. Der passende Ausdruck wäre « Nuance ».",
        "modelAnswer": "مش بالظبط قصدي. / المصطلح الصح هو «فارق دقيق»."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الترادفات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Das ist nicht genau das, was ich meinte.",
        "modelAnswer": "مش بالظبط قصدي."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "beobachten / ansehen / sehen",
        "modelAnswer": "يلاحظ/ينظر/يرى"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Es gibt einen Unterschied in der Konnotation.",
        "modelAnswer": "في فرق في الدلالة الضمنية."
      }
    }
  },
  "de-c2-u02": {
    "unitId": "de-c2-u02",
    "overview": "في وحدة «الإضاءة والسخرية» (Ironie und Feinsinn)، الهدف إنك أستخدم السخرية والتهكم اللطيف وأفكّك الحجج الدقيقة. غطّينا القواعد الأساسية: Ironie und Litotes؛ zarte Zugeständnisse (zwar ... aber)؛ Abschwächen und Betonen. وركّزنا على المفردات في محاور: السخرية، التلاعب بالأسلوب، النقد. ومن الجمل اللي اتدربنا عليها «Zwar ist die Idee verlockend; trotzdem ist sie fragil.» و«Das ist eine ... originelle Lösung.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Zwar ist die Idee verlockend; trotzdem ist sie fragil. Das ist eine ... originelle Lösung.",
        "modelAnswer": "صحيح الفكرة مغرية، ومع ذلك هشّة. / دي حل... أصيل (بمعنى ساخر)."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «السخرية»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Zwar ist die Idee verlockend; trotzdem ist sie fragil.",
        "modelAnswer": "صحيح الفكرة مغرية، ومع ذلك هشّة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "die Ironie",
        "modelAnswer": "سخرية"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Gemeint ist: niemand ist bereit.",
        "modelAnswer": "اللي مقصود: محدش مستعد."
      }
    }
  },
  "de-c2-u03": {
    "unitId": "de-c2-u03",
    "overview": "في وحدة «الأدب والأساليب الرفيعة» (Schönheiten der Sprache)، الهدف إنك أناقش نصًّا أدبيًا أو فنًّا بأسلوب راقٍ ومفردات عميقة. غطّينا القواعد الأساسية: literarische Wendungen؛ Metapher und Vergleich؛ abstrakter Ausdruck. وركّزنا على المفردات في محاور: الأدب، البلاغة، التذوّق. ومن الجمل اللي اتدربنا عليها «Die Metapher durchzieht das ganze Werk.» و«Der Stil ist von seltener Eleganz.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Die Metapher durchzieht das ganze Werk. Der Stil ist von seltener Eleganz.",
        "modelAnswer": "الاستعارة موجودة في كل العمل. / الأسلوب نادر الأناقة."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الأدب»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Die Metapher durchzieht das ganze Werk.",
        "modelAnswer": "الاستعارة موجودة في كل العمل."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "die Prosa",
        "modelAnswer": "نثر"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Diese Passage hat mich tief berührt.",
        "modelAnswer": "المقطع ده أثر فيّ بعمق."
      }
    }
  },
  "de-c2-u04": {
    "unitId": "de-c2-u04",
    "overview": "في وحدة «المهنية الأكاديمية» (Präsentation und Verteidigung)، الهدف إنك أُقدّم فكرتي بوضوح في سياق أكاديمي أو مهني عالٍ. غطّينا القواعد الأساسية: Formulierungen der Verteidigung؛ Struktur eines Vortrags؛ Hypothesen und ihre Konsequenzen. وركّزنا على المفردات في محاور: العرض، الأكاديمية، المهنة. ومن الجمل اللي اتدربنا عليها «Meine zentrale Hypothese lautet wie folgt.» و«Die Methodik basiert auf drei Schritten.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Meine zentrale Hypothese lautet wie folgt. Die Methodik basiert auf drei Schritten.",
        "modelAnswer": "فرضيتي المركزية هي التالية. / المنهجية قائمة على ثلاث خطوات."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «العرض»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Meine zentrale Hypothese lautet wie folgt.",
        "modelAnswer": "فرضيتي المركزية هي التالية."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "der Vortrag",
        "modelAnswer": "عرض تقديمي"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Ich werde diesen Punkt an späterer Stelle differenzieren.",
        "modelAnswer": "هوضّح النقطة دي في مرحلة تانية."
      }
    }
  },
  "de-c2-u05": {
    "unitId": "de-c2-u05",
    "overview": "في وحدة «القضايا المعاصرة المعقدة» (Zeitgenössische Komplexthemen)، الهدف إنك أناقش قضية عالمية مركّبة بعمق واتزان. غطّينا القواعد الأساسية: komplexe Kausalsätze (insofern als...)؛ gehobenes Passiv und unpersönliche Sätze؛ internationale Vergleiche. وركّزنا على المفردات في محاور: القضايا العالمية، التحليل، المقارنات. ومن الجمل اللي اتدربنا عليها «Insofern als die Daten es zeigen ...» و«Das Paradoxon ist: je mehr man produziert, desto mehr man verschwendet.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Insofern als die Daten es zeigen ... Das Paradoxon ist: je mehr man produziert, desto mehr man verschwendet.",
        "modelAnswer": "في حدود ما البيانات تُظهر... / المفارقة إننا كل ما ننتج أكتر نهدر أكتر."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «القضايا العالمية»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Insofern als die Daten es zeigen ...",
        "modelAnswer": "في حدود ما البيانات تُظهر..."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "die Globalisierung",
        "modelAnswer": "عولمة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Widerstandskraft wird zur zentralen Herausforderung.",
        "modelAnswer": "القدرة على التكيّف بقت محور أساسي."
      }
    }
  },
  "de-c2-u06": {
    "unitId": "de-c2-u06",
    "overview": "في وحدة «طلاقة حرة C2» (Gespräch auf höchstem Niveau)، الهدف إنك محادثة بلا حدود: أتفلسف، أستشهد، أُقدّر — بكل راحة ودقّة. غطّينا القواعد الأساسية: volle Beherrschung aller Nebensätze؛ beherrschte Spontaneität؛ Metasprache (um auf deine Idee zurückzukommen...). وركّزنا على المفردات في محاور: الطلاقة، التفلسف، التقويم الذاتي. ومن الجمل اللي اتدربنا عليها «Im Grunde liegt die Frage woanders.» و«Anders ausgedrückt: alles ist relativ.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Im Grunde liegt die Frage woanders. Anders ausgedrückt: alles ist relativ.",
        "modelAnswer": "في الحقيقة السؤال في مكان آخر. / بصياغة تانية: كل حاجة نسبية."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الطلاقة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Im Grunde liegt die Frage woanders.",
        "modelAnswer": "في الحقيقة السؤال في مكان آخر."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "der Scharfsinn",
        "modelAnswer": "روح/ذكاء"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Deine Intuition deckt sich mit meiner.",
        "modelAnswer": "حدسك بيلاقي عنددي موافقة."
      }
    }
  }
};
