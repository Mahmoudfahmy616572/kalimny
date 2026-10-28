// مولّد تلقائياً من الـ syllabus (scripts/generate-unit-summaries.mjs).
// المحتوى الأجنبي كله مأخوذ من جمل/مفردات الـ syllabus الصحيحة؛
// والـ overview بالعربي مبني من عنوان وقواعد ومحاور الوحدة. بيانات ثابتة.
import type { UnitHandAuthored } from "../unit-summary/types";

export const UNIT_SUMMARY_FR: Record<string, UnitHandAuthored> = {
  "fr-a1-u01": {
    "unitId": "fr-a1-u01",
    "overview": "في وحدة «التحيات والتعريف بالنفس» (Bonjour, je m'appelle...)، الهدف إنك أقدر أحيّي حد بأدب (Bonjour/Bonsoir)، أعرّف بنفسي، وأسأل عن الاسم والبلد. غطّينا القواعد الأساسية: verbe être: je suis, tu es, il est, elle est؛ présent simple: je m'appelle, j'habite, je viens؛ pronoms sujets: je, tu, il, elle, nous, vous. وركّزنا على المفردات في محاور: التحيات، الاسم والبلد، الوداع. ومن الجمل اللي اتدربنا عليها «Bonjour, je m'appelle Sara.» و«Comment tu t'appelles ?». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Bonjour, je m'appelle Sara. Comment tu t'appelles ?",
        "modelAnswer": "أهلاً، اسمي سارة. / اسمك إيه؟ (غير رسمية)"
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «التحيات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Bonjour, je m'appelle Sara.",
        "modelAnswer": "أهلاً، اسمي سارة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "bonjour",
        "modelAnswer": "صباح الخير/أهلاً"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Je viens d'Égypte.",
        "modelAnswer": "أنا من مصر."
      }
    }
  },
  "fr-a1-u02": {
    "unitId": "fr-a1-u02",
    "overview": "في وحدة «الأرقام والوقت» (Quelle heure est-il ?)، الهدف إنك أقدر أقول الأرقام من 0 لـ100، وأسأل وأقول الوقت، وأسمي أيام الأسبوع. غطّينا القواعد الأساسية: nombres 0–100؛ Quelle heure est-il ? — Il est ... heures / ... heures et demie؛ à + heure, le + jour de la semaine. وركّزنا على المفردات في محاور: الأرقام، الساعة، أيام الأسبوع والتواريخ. ومن الجمل اللي اتدربنا عليها «Quelle heure est-il ?» و«Il est trois heures.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Quelle heure est-il ? Il est trois heures.",
        "modelAnswer": "الساعة كام؟ / الساعة تلاتة."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الأرقام»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Quelle heure est-il ?",
        "modelAnswer": "الساعة كام؟"
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "l'heure",
        "modelAnswer": "الساعة/الوقت"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Il est huit heures et demie.",
        "modelAnswer": "الساعة تمانية ونص."
      }
    }
  },
  "fr-a1-u03": {
    "unitId": "fr-a1-u03",
    "overview": "في وحدة «العائلة والأصدقاء» (Voici ma famille)، الهدف إنك أقدر أعرّف أفراد العائلة، وأوصفهم بصفات بسيطة، وأسأل عن السن. غطّينا القواعد الأساسية: verbe avoir: j'ai ... ans؛ possessifs: mon, ma, mes, ton, ta؛ adjectifs: grand, petit, jeune, vieux, drôle. وركّزنا على المفردات في محاور: أفراد العائلة، الأصدقاء، الوصف البسيط. ومن الجمل اللي اتدربنا عليها «Voici ma sœur.» و«J'ai deux frères.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Voici ma sœur. J'ai deux frères.",
        "modelAnswer": "دي أختي. / عندي أخين."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «أفراد العائلة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Voici ma sœur.",
        "modelAnswer": "دي أختي."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "la mère",
        "modelAnswer": "أم"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Elle est grande et drôle.",
        "modelAnswer": "هي طويلة ومضحكة."
      }
    }
  },
  "fr-a1-u04": {
    "unitId": "fr-a1-u04",
    "overview": "في وحدة «الأكل والشرب» (Je voudrais un café)، الهدف إنك أقدر أطلب أكل وشرب بأدب، وأقول بحب إيه ومش بحب إيه. غطّينا القواعد الأساسية: présent: je veux, j'aime, je ne mange pas؛ vouloir / aimer + nom؛ partitifs: un peu de, pas de, du, de la؛ Je voudrais ..., s'il vous plaît. وركّزنا على المفردات في محاور: أكل البيت والمطعم، المشروبات، الإفطار والعشاء. ومن الجمل اللي اتدربنا عليها «Je voudrais un café, s'il vous plaît.» و«Tu manges quoi ?». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Je voudrais un café, s'il vous plaît. Tu manges quoi ?",
        "modelAnswer": "أريد قهوة من فضلك. / بتاكل إيه؟"
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «أكل البيت والمطعم»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Je voudrais un café, s'il vous plaît.",
        "modelAnswer": "أريد قهوة من فضلك."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "le pain",
        "modelAnswer": "عيش/خبز"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "J'aime beaucoup le fromage.",
        "modelAnswer": "بحب الجبنة أوي."
      }
    }
  },
  "fr-a1-u05": {
    "unitId": "fr-a1-u05",
    "overview": "في وحدة «الطقس والملابس» (Il fait beau)، الهدف إنك أقدر أقول إيه حالة الطقس، وأوصف اللي لابسه دلوقتي. غطّينا القواعد الأساسية: il fait + adjectif: il fait froid / il fait chaud؛ verbe porter: je porte, tu portes؛ adjectifs: beau, mauvais, chaud, froid. وركّزنا على المفردات في محاور: الطقس، الملابس، الوصف. ومن الجمل اللي اتدربنا عليها «Il fait beau aujourd'hui.» و«Il fait froid, je porte mon manteau.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Il fait beau aujourd'hui. Il fait froid, je porte mon manteau.",
        "modelAnswer": "الجو حلو النهارده. / الجو بارد، لابس بالطوي."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الطقس»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Il fait beau aujourd'hui.",
        "modelAnswer": "الجو حلو النهارده."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "le temps",
        "modelAnswer": "الطقس/الوقت"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Quel temps fait-il à Paris ?",
        "modelAnswer": "الجو عامل إيه في باريس؟"
      }
    }
  },
  "fr-a1-u06": {
    "unitId": "fr-a1-u06",
    "overview": "في وحدة «الأماكن والاتجاهات» (Où est la pharmacie ?)، الهدف إنك أقدر أسأل عن مكان وأفهم وإدي اتجاهات بسيطة في الشارع. غطّينا القواعد الأساسية: articles définis: le, la, l', les؛ il y a + lieu؛ où est ... ? — à gauche, à droite, tout droit؛ prépositions: près de, loin de, en face de. وركّزنا على المفردات في محاور: محلات ومعالم الحي، الاتجاهات، الاماكن. ومن الجمل اللي اتدربنا عليها «Où est la pharmacie, s'il vous plaît ?» و«C'est à gauche, tout droit.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Où est la pharmacie, s'il vous plaît ? C'est à gauche, tout droit.",
        "modelAnswer": "الصيدلية فين من فضلك؟ / على الشمال، كلها قدامك."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «محلات ومعالم الحي»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Où est la pharmacie, s'il vous plaît ?",
        "modelAnswer": "الصيدلية فين من فضلك؟"
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "la pharmacie",
        "modelAnswer": "صيدلية"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Il y a un supermarché ici.",
        "modelAnswer": "في سوبر ماركت هنا."
      }
    }
  },
  "fr-a1-u07": {
    "unitId": "fr-a1-u07",
    "overview": "في وحدة «الأسئلة الأساسية» (Comment dit-on ... ?)، الهدف إنك أقدر أسأل عن معنى كلمة، وأطلب التكرار والبطء، وأفهم رد بسيط. غطّينا القواعد الأساسية: mots interrogatifs: qui, que, où, quand, comment, pourquoi؛ est-ce que ... ?؛ inversion simple: tu es d'où ? / tu viens d'où ?. وركّزنا على المفردات في محاور: السؤال عن المعنى، التعلم، عدم الفهم. ومن الجمل اللي اتدربنا عليها «Comment dit-on « pain » en français ?» و«Pouvez-vous répéter, s'il vous plaît ?». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Comment dit-on « pain » en français ? Pouvez-vous répéter, s'il vous plaît ?",
        "modelAnswer": "إزاي أقول «pain» بالفرنسية؟ / ممكن تكرر من فضلك؟"
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «السؤال عن المعنى»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Comment dit-on « pain » en français ?",
        "modelAnswer": "إزاي أقول «pain» بالفرنسية؟"
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "comment",
        "modelAnswer": "إزاي"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Parlez plus lentement, s'il vous plaît.",
        "modelAnswer": "اتكلم ببطء أكتر من فضلك."
      }
    }
  },
  "fr-a1-u08": {
    "unitId": "fr-a1-u08",
    "overview": "في وحدة «الروتين اليومي والشغل» (Ma journée type)، الهدف إنك أقدر أحكي عن روتيني اليومي ويوم شغلي بالمضارع البسيط. غطّينا القواعد الأساسية: présent des verbes réguliers: -er, -ir, -re؛ verbes pronominaux: se lever, se coucher؛ à + heure: je me lève à sept heures. وركّزنا على المفردات في محاور: الصباح والمساء، الشغل والدراسة، العادة. ومن الجمل اللي اتدربنا عليها «Je me lève à sept heures.» و«Habituellement, je vais au travail à huit heures.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Je me lève à sept heures. Habituellement, je vais au travail à huit heures.",
        "modelAnswer": "بصحى الساعة سبعة. / عادةً بروح الشغل الساعة تمانية."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الصباح والمساء»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Je me lève à sept heures.",
        "modelAnswer": "بصحى الساعة سبعة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "se lever",
        "modelAnswer": "ينهض/يصحى"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Tu te couches tard ?",
        "modelAnswer": "بتروح نام متأخر؟"
      }
    }
  },
  "fr-a1-u09": {
    "unitId": "fr-a1-u09",
    "overview": "في وحدة «التسوق والأسعار» (Combien ça coûte ?)، الهدف إنك أقدر أسأل عن السعر، وأشتري، وأسأل عن اللون والمقاس. غطّينا القواعد الأساسية: nombres 100–1000؛ combien + coûter / ça coûte ... euros؛ je voudrais + article: je voudrais une chemise؛ très cher / pas cher. وركّزنا على المفردات في محاور: المحلات، السعر والمال، اللون والمقاس. ومن الجمل اللي اتدربنا عليها «Combien ça coûte ?» و«C'est dix euros.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Combien ça coûte ? C'est dix euros.",
        "modelAnswer": "بكام ده؟ / عشرة يورو."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «المحلات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Combien ça coûte ?",
        "modelAnswer": "بكام ده؟"
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "le prix",
        "modelAnswer": "سعر"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Je voudrais essayer cette chemise.",
        "modelAnswer": "حابب أجرب القميص ده."
      }
    }
  },
  "fr-a1-u10": {
    "unitId": "fr-a1-u10",
    "overview": "في وحدة «الصحة والجسم» (J'ai mal à la tête)، الهدف إنك أقدر أوصف ألم بسيط، وأنصح بالراحة، وأروح لدكتور. غطّينا القواعد الأساسية: j'ai mal à + partie du corps؛ il faut + verbe: il faut dormir؛ pronoms COD: le, la, les — je le prends. وركّزنا على المفردات في محاور: أجهزة الجسم، عند الطبيب، الدواء والراحة. ومن الجمل اللي اتدربنا عليها «J'ai mal à la tête.» و«Je suis malade, j'ai de la fièvre.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "J'ai mal à la tête. Je suis malade, j'ai de la fièvre.",
        "modelAnswer": "رأسي بتوجعني. / أنا تعبان وليّا حمّى."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «أجهزة الجسم»، زي المثال واستخدم نفس القواعد.",
        "prompt": "J'ai mal à la tête.",
        "modelAnswer": "رأسي بتوجعني."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "la tête",
        "modelAnswer": "رأس"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Il faut prendre un rendez-vous.",
        "modelAnswer": "لازم تحجز موعد."
      }
    }
  },
  "fr-a1-u11": {
    "unitId": "fr-a1-u11",
    "overview": "في وحدة «الهوايات والوقت الحر» (Tu fais quoi le week-end ?)، الهدف إنك أقدر أحكي عن هواياتي وأسأل غيري عنها بالمضارع البسيط. غطّينا القواعد الأساسية: aimer / faire + activité: je fais du sport؛ le / la / les avec activités: jouer au football, écouter de la musique؛ adverbes: souvent, jamais, parfois. وركّزنا على المفردات في محاور: الرياضة، الفن والترفيه، العادات. ومن الجمل اللي اتدربنا عليها «Tu fais quoi le week-end ?» و«J'aime écouter de la musique.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Tu fais quoi le week-end ? J'aime écouter de la musique.",
        "modelAnswer": "بتعمل إيه في العطلة؟ / بحب أسمع موسيقى."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الرياضة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Tu fais quoi le week-end ?",
        "modelAnswer": "بتعمل إيه في العطلة؟"
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "le sport",
        "modelAnswer": "رياضة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Je joue au football le samedi.",
        "modelAnswer": "بلعب كورة يوم السبت."
      }
    }
  },
  "fr-a1-u12": {
    "unitId": "fr-a1-u12",
    "overview": "في وحدة «مراجعة ومحادثة حرة A1» (On discute !)، الهدف إنك محادثة حرة: أقدر أقول رأيي بسيط، وأجاوب على أسئلة يومية، وأستخدم كل اللي اتعلمت. غطّينا القواعد الأساسية: révision: être / avoir au présent؛ récapitulatif: présent, questions avec est-ce que, partitifs؛ connecteurs simples: et, mais, parce que. وركّزنا على المفردات في محاور: التقييم والتقدم، الرأي البسيط، الاتفاق. ومن الجمل اللي اتدربنا عليها «Ça va ? — Ça va bien, merci.» و«Qu'est-ce que tu as fait aujourd'hui ?». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Ça va ? — Ça va bien, merci. Qu'est-ce que tu as fait aujourd'hui ?",
        "modelAnswer": "عامل إيه؟ — الحمد لله، تمام. / عملت إيه النهارده؟"
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «التقييم والتقدم»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Ça va ? — Ça va bien, merci.",
        "modelAnswer": "عامل إيه؟ — الحمد لله، تمام."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "le progrès",
        "modelAnswer": "تقدم"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "C'était facile ou difficile ?",
        "modelAnswer": "كان سهل ولا صعب؟"
      }
    }
  },
  "fr-a2-u01": {
    "unitId": "fr-a2-u01",
    "overview": "في وحدة «حيوات جديدة» (Nouvelles vies)، الهدف إنك أقدر أحكي عن تجربة حد بدأ حياة جديدة، وأستعمل الماضي والنفي بثقة. غطّينا القواعد الأساسية: la négation: ne ... pas, ne ... jamais, ne ... plus؛ passé composé avec avoir et être؛ les participes passés réguliers et irréguliers. وركّزنا على المفردات في محاور: البدايات الجديدة، الماضي، الوصف. ومن الجمل اللي اتدربنا عليها «J'ai déménagé à Lyon l'année dernière.» و«Elle a changé de travail et elle est contente.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "J'ai déménagé à Lyon l'année dernière. Elle a changé de travail et elle est contente.",
        "modelAnswer": "انتقلت للون السنة اللي فاتت. / هي غيّرت شغلها وبقت مبسوطة."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «البدايات الجديدة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "J'ai déménagé à Lyon l'année dernière.",
        "modelAnswer": "انتقلت للون السنة اللي فاتت."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "déménager",
        "modelAnswer": "ينتقل/يغيّر سكنه"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Je n'ai pas rencontré mes voisins encore.",
        "modelAnswer": "لسه ما قابلتش جيراني."
      }
    }
  },
  "fr-a2-u02": {
    "unitId": "fr-a2-u02",
    "overview": "في وحدة «بتذكر» (Je me souviens)، الهدف إنك أقدر أفتكر طفولتي وأحكي عن عادات قديمة بالماضي المستمر. غطّينا القواعد الأساسية: l'imparfait: je me souvenais, il faisait, nous habitions؛ différence imparfait / passé composé (rappel)؛ les adverbes d'habitude: d'habitude, toujours, souvent. وركّزنا على المفردات في محاور: الطفولة، الذكريات، العادات القديمة. ومن الجمل اللي اتدربنا عليها «Je me souviens de mes vacances au bord de la mer.» و«Quand j'étais petit, je jouais toujours dans le jardin.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Je me souviens de mes vacances au bord de la mer. Quand j'étais petit, je jouais toujours dans le jardin.",
        "modelAnswer": "بتذكر إجازتي على البحر. / وأنا صغير كنت دايمًا بلعب في الجنينة."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الطفولة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Je me souviens de mes vacances au bord de la mer.",
        "modelAnswer": "بتذكر إجازتي على البحر."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "le souvenir",
        "modelAnswer": "ذكرى"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "D'habitude, ma grand-mère faisait des crêpes le dimanche.",
        "modelAnswer": "كانت جدتي دايمًا تعمل كريب يوم الأحد."
      }
    }
  },
  "fr-a2-u03": {
    "unitId": "fr-a2-u03",
    "overview": "في وحدة «زي البيت» (Comme à la maison)، الهدف إنك أقدر أوصّف بيتي وأقارن بين الأماكن بأسئلة الأماكن والصفات. غطّينا القواعد الأساسية: les pronoms relatifs qui, que, où؛ le comparatif: plus ... que, moins ... que, aussi ... que؛ les adjectifs possessifs (rappel). وركّزنا على المفردات في محاور: البيت، الغرف، المقارنة. ومن الجمل اللي اتدربنا عليها «Ma chambre, qui est petite, est confortable.» و«L'immeuble où j'habite est près du marché.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Ma chambre, qui est petite, est confortable. L'immeuble où j'habite est près du marché.",
        "modelAnswer": "أوضتي الصغيرة مريحة. / العمارة اللي ساكن فيها قريبة من السوق."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «البيت»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Ma chambre, qui est petite, est confortable.",
        "modelAnswer": "أوضتي الصغيرة مريحة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "la chambre",
        "modelAnswer": "أوضة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Ma cuisine est plus grande que celle de mon frère.",
        "modelAnswer": "مطبخي أكبر من مطبخ أخويا."
      }
    }
  },
  "fr-a2-u04": {
    "unitId": "fr-a2-u04",
    "overview": "في وحدة «الكل زيو بعض والكل مختلف» (Tous pareils, tous différents)، الهدف إنك أوصّف شخصيات وأتكلم عن أوجه الاختلاف، وأعبّر عن نواياي للمستقبل. غطّينا القواعد الأساسية: le futur proche: je vais + infinitif؛ le futur simple: je deviendrai, tu rencontreras؛ l'intention: je compte + infinitif. وركّزنا على المفردات في محاور: الشخصيات، الاختلاف، النوايا. ومن الجمل اللي اتدربنا عليها «Elle est sociable, tandis que son frère est timide.» و«Demain, je vais rencontrer mon nouveau collègue.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Elle est sociable, tandis que son frère est timide. Demain, je vais rencontrer mon nouveau collègue.",
        "modelAnswer": "هي اجتماعية بينما أخوها خجول. / بكرة هقابل زميلي الجديد."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الشخصيات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Elle est sociable, tandis que son frère est timide.",
        "modelAnswer": "هي اجتماعية بينما أخوها خجول."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "la personnalité",
        "modelAnswer": "شخصية"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Je compte visiter plusieurs quartiers.",
        "modelAnswer": "ناوي أزور أكتر من حي."
      }
    }
  },
  "fr-a2-u05": {
    "unitId": "fr-a2-u05",
    "overview": "في وحدة «قدامنا المستقبل» (En route vers le futur !)، الهدف إنك أخطط لمستقبلي الدراس والمهني وأتكلم عن أهدافي. غطّينا القواعد الأساسية: le futur simple: j'étudierai, nous réussirons؛ vouloir et devoir + infinitif au futur؛ l'organisation: d'abord, ensuite, puis. وركّزنا على المفردات في محاور: المستقبل، الخطط، الأهداف. ومن الجمل اللي اتدربنا عليها «L'année prochaine, j'étudierai la médecine.» و«Je vais d'abord passer mon examen.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "L'année prochaine, j'étudierai la médecine. Je vais d'abord passer mon examen.",
        "modelAnswer": "السنة الجاية هدرس طب. / الأول هقدّم الامتحان."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «المستقبل»، زي المثال واستخدم نفس القواعد.",
        "prompt": "L'année prochaine, j'étudierai la médecine.",
        "modelAnswer": "السنة الجاية هدرس طب."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "l'avenir",
        "modelAnswer": "المستقبل"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Tu réussiras, je le sais !",
        "modelAnswer": "هتنجح، أنا متأكد!"
      }
    }
  },
  "fr-a2-u06": {
    "unitId": "fr-a2-u06",
    "overview": "في وحدة «في المطبخ» (En cuisine)، الهدف إنك أقدر أوصّف وصفة بسيطة وأشرح خطوات الطبخ. غطّينا القواعد الأساسية: pour + infinitif pour exprimer le but؛ en + gérondif pour la manière؛ les quantifieurs: un peu de, beaucoup de, trop de. وركّزنا على المفردات في محاور: الوصفة، المكوّنات، الطهي. ومن الجمل اللي اتدربنا عليها «Pour réussir la recette, il faut bien mélanger les œufs.» و«En coupant les oignons, fais attention !». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Pour réussir la recette, il faut bien mélanger les œufs. En coupant les oignons, fais attention !",
        "modelAnswer": "عشان الوصفة تنجح، لازم تخلط البيض كويس. / وأنت بتقطع البصل انتبه!"
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الوصفة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Pour réussir la recette, il faut bien mélanger les œufs.",
        "modelAnswer": "عشان الوصفة تنجح، لازم تخلط البيض كويس."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "la recette",
        "modelAnswer": "وصفة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "J'ai ajouté un peu d'huile et beaucoup de persil.",
        "modelAnswer": "ضفت شوية زيت وكتير بقدونس."
      }
    }
  },
  "fr-a2-u07": {
    "unitId": "fr-a2-u07",
    "overview": "في وحدة «بالصحة والسلامة» (À votre santé !)، الهدف إنك أشرح أعراضي وأسمع نصيحة صحية وأقدّم نصيحة بسيطة. غطّينا القواعد الأساسية: se sentir + adjectif: je me sens fatigué؛ avoir mal à + partie du corps؛ devoir et avoir besoin de + infinitif. وركّزنا على المفردات في محاور: الأعراض، الدواء، الراحة. ومن الجمل اللي اتدربنا عليها «Je me sens fatigué, j'ai mal à la tête.» و«Tu dois prendre ce médicament deux fois par jour.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Je me sens fatigué, j'ai mal à la tête. Tu dois prendre ce médicament deux fois par jour.",
        "modelAnswer": "حاسس إني تعبان ورأسي بتوجعني. / لازم تاخد الدوا ده مرتين في اليوم."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الأعراض»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Je me sens fatigué, j'ai mal à la tête.",
        "modelAnswer": "حاسس إني تعبان ورأسي بتوجعني."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "la santé",
        "modelAnswer": "صحة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Le médecin a dit de beaucoup se reposer.",
        "modelAnswer": "الدكتور قال يريح كتير."
      }
    }
  },
  "fr-a2-u08": {
    "unitId": "fr-a2-u08",
    "overview": "في وحدة «في الإعلام» (Dans les médias)، الهدف إنك أعلّق على خبر وأفرّق بين الحقيقة والكذب، وأطلب الحاجات بتحذير. غطّينا القواعد الأساسية: la cause et la conséquence: parce que, car, à cause de, c'est pourquoi؛ les pronoms COD et COI: le, la, les, lui, leur؛ l'impératif présent: donne, écoutons, aidez. وركّزنا على المفردات في محاور: الأخبار، الصحافة، الصدق. ومن الجمل اللي اتدربنا عليها «Cette information est fausse, on ne peut pas la croire.» و«Le journaliste a diffusé le reportage et les gens l'ont écouté.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Cette information est fausse, on ne peut pas la croire. Le journaliste a diffusé le reportage et les gens l'ont écouté.",
        "modelAnswer": "المعلومة دي غلط، مينفعش تصدقها. / الصحفي بثّ التقرير والناس سمعته."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الأخبار»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Cette information est fausse, on ne peut pas la croire.",
        "modelAnswer": "المعلومة دي غلط، مينفعش تصدقها."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "l'information",
        "modelAnswer": "خبر/معلومات"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "N'éteins pas la télé, s'il te plaît !",
        "modelAnswer": "متطفيش التلفزيون من فضلك!"
      }
    }
  },
  "fr-a2-u09": {
    "unitId": "fr-a2-u09",
    "overview": "في وحدة «استهلاك مسؤول» (Consommer responsable)، الهدف إنك أطلب الحاجات بأدب وأتكلم عن عاداتي في الشراء. غطّينا القواعد الأساسية: le conditionnel présent: je voudrais, je prendrais, ce serait؛ les quantifieurs: trop, assez, suffisamment؛ préférer ... plutôt que. وركّزنا على المفردات في محاور: الشراء، العادات، الاختيار. ومن الجمل اللي اتدربنا عليها «Je voudrais un sac en tissu, s'il vous plaît.» و«Plutôt que d'acheter, tu pourrais réutiliser.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Je voudrais un sac en tissu, s'il vous plaît. Plutôt que d'acheter, tu pourrais réutiliser.",
        "modelAnswer": "كنت أحب كيس قماش من فضلك. / بدل ما تشتري، تقدر تعيد الاستخدام."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الشراء»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Je voudrais un sac en tissu, s'il vous plaît.",
        "modelAnswer": "كنت أحب كيس قماش من فضلك."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "consommer",
        "modelAnswer": "يستهلك"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Ce serait mieux de réduire les déchets.",
        "modelAnswer": "الأحسن نقلّل النفايات."
      }
    }
  },
  "fr-a2-u10": {
    "unitId": "fr-a2-u10",
    "overview": "في وحدة «الشوق للغريب» (Envie d'ailleurs ?)، الهدف إنك أتكلم عن السفر والبلدان اللي زرتها وأستعمل depuis وil y a. غطّينا القواعد الأساسية: depuis, pendant et il y a avec le présent et l'imparfait؛ encore, déjà, toujours, ne ... plus؛ les prépositions de lieu: en, au, à, de. وركّزنا على المفردات في محاور: السفر، البلدان، الانطباعات. ومن الجمل اللي اتدربنا عليها «Je vis au Caire depuis dix ans.» و«Il y a deux ans, j'ai visité le Maroc.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Je vis au Caire depuis dix ans. Il y a deux ans, j'ai visité le Maroc.",
        "modelAnswer": "عايز القاهرة من عشر سنين. / من سنتين زرت المغرب."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «السفر»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Je vis au Caire depuis dix ans.",
        "modelAnswer": "عايز القاهرة من عشر سنين."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "le pays",
        "modelAnswer": "دولة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Tu as déjà été en France ?",
        "modelAnswer": "رحت فرنسا قبل كده؟"
      }
    }
  },
  "fr-a2-u11": {
    "unitId": "fr-a2-u11",
    "overview": "في وحدة «مسارات حلوة» (De jolis parcours)، الهدف إنك أحكي عن مسار حد ناجح وأستعمل التوكيد والكلام المنقول. غطّينا القواعد الأساسية: la mise en relief: c'est ... qui, c'est ... que؛ le discours rapporté simple: il a dit que, elle a demandé si؛ les connecteurs: d'abord, ensuite, enfin. وركّزنا على المفردات في محاور: المسارات، النجاح، التوكيد. ومن الجمل اللي اتدربنا عليها «C'est sa famille qui l'a aidé à réussir.» و«Elle a raconté qu'elle avait rencontré beaucoup d'obstacles.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "C'est sa famille qui l'a aidé à réussir. Elle a raconté qu'elle avait rencontré beaucoup d'obstacles.",
        "modelAnswer": "عيلته هي اللي ساعدته ينجح. / حكت إنها قابلت عقبات كتير."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «المسارات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "C'est sa famille qui l'a aidé à réussir.",
        "modelAnswer": "عيلته هي اللي ساعدته ينجح."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "le parcours",
        "modelAnswer": "مسار"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "C'est le travail qui a changé sa vie.",
        "modelAnswer": "الشغل هو اللي غيّر حياته."
      }
    }
  },
  "fr-a2-u12": {
    "unitId": "fr-a2-u12",
    "overview": "في وحدة «عطش الطبيعة» (Soif de nature)، الهدف إنك أتكلم عن نشاطات الطبيعة وأنصح بحمايتها. غطّينا القواعد الأساسية: l'expression du but: pour que, afin de, pour + infinitif؛ la voix passive: le sentier est balisé, les arbres sont plantés؛ rappel: futur, conditionnel, impératif. وركّزنا على المفردات في محاور: الطبيعة، المشي في الجبال، حماية البيئة. ومن الجمل اللي اتدربنا عليها «Les randonneurs protègent la nature pour que les forêts restent vertes.» و«Le chemin a été nettoyé par les bénévoles.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Les randonneurs protègent la nature pour que les forêts restent vertes. Le chemin a été nettoyé par les bénévoles.",
        "modelAnswer": "محبو المشي بيحافظوا على الطبيعة عشان الغابات تفضل خضراء. / الطريق اتنضف من المتطوعين."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الطبيعة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Les randonneurs protègent la nature pour que les forêts restent vertes.",
        "modelAnswer": "محبو المشي بيحافظوا على الطبيعة عشان الغابات تفضل خضراء."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "la nature",
        "modelAnswer": "طبيعة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Emporte tes déchets, s'il te plaît !",
        "modelAnswer": "خد نفايتك معاك من فضلك!"
      }
    }
  },
  "fr-b1-u01": {
    "unitId": "fr-b1-u01",
    "overview": "في وحدة «كل واحد والتاني» (Les uns et les autres)، الهدف إنك أوصّف ناس وأعبّر عن مشاعري ناحيتهم بجُمل أدق. غطّينا القواعد الأساسية: le subjonctif présent (découverte): je suis content que, il faut que؛ les pronoms relatifs composés: celui qui, celle que, ce dont؛ les émotions et les jugements sur autrui. وركّزنا على المفردات في محاور: الشخصيات، الانطباعات، العلاقات. ومن الجمل اللي اتدربنا عليها «Je suis content que tu aies rencontré des gens bienveillants.» و«Celui qui écoute vraiment est rare.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Je suis content que tu aies rencontré des gens bienveillants. Celui qui écoute vraiment est rare.",
        "modelAnswer": "مبسوط إنك قابلت ناس ودودة. / اللي بيسمع بجد قليل."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الشخصيات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Je suis content que tu aies rencontré des gens bienveillants.",
        "modelAnswer": "مبسوط إنك قابلت ناس ودودة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "le caractère",
        "modelAnswer": "طبع"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Je n'oublierai pas ce dont tu m'as parlé.",
        "modelAnswer": "مش هنسي اللي حكيتهولي."
      }
    }
  },
  "fr-b1-u02": {
    "unitId": "fr-b1-u02",
    "overview": "في وحدة «عايشين مع بعض على الأرض» (Vivre ensemble sur la Terre)، الهدف إنك أناقش مشاكل بيئية وأعبّر عن السبب والنتيجة. غطّينا القواعد الأساسية: le gérondif: en réduisant, en recyclant؛ la cause et la conséquence: ce qui fait que, c'est pourquoi, en raison de؛ les circonstancielles de temps: quand, lorsque, dès que. وركّزنا على المفردات في محاور: الكوكب، التلوث، التضامن. ومن الجمل اللي اتدربنا عليها «En triant nos déchets, nous protégeons la planète.» و«La sécheresse fait que les récoltes diminuent.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "En triant nos déchets, nous protégeons la planète. La sécheresse fait que les récoltes diminuent.",
        "modelAnswer": "بالفرز بنحمي الكوكب. / الجفاف بينقص المحاصيل."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الكوكب»، زي المثال واستخدم نفس القواعد.",
        "prompt": "En triant nos déchets, nous protégeons la planète.",
        "modelAnswer": "بالفرز بنحمي الكوكب."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "la planète",
        "modelAnswer": "كوكب"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "C'est pourquoi il faut économiser l'eau.",
        "modelAnswer": "عشان كده لازم نوفّر المية."
      }
    }
  },
  "fr-b1-u03": {
    "unitId": "fr-b1-u03",
    "overview": "في وحدة «نعزف الفنون» (Cultivons les arts)، الهدف إنك أحكي عن عمل فني وأعبّر عن رأيي وأنقل كلام الآخرين. غطّينا القواعد الأساسية: le discours indirect: il a dit que, elle a demandé pourquoi؛ les verbes de parole: raconter, affirmer, nier؛ les connecteurs temporels: alors, soudain, enfin. وركّزنا على المفردات في محاور: الفنون، الأعمال، التعبير. ومن الجمل اللي اتدربنا عليها «L'artiste a raconté qu'il avait créé l'œuvre en un jour.» و«Le guide a affirmé que le tableau était unique.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "L'artiste a raconté qu'il avait créé l'œuvre en un jour. Le guide a affirmé que le tableau était unique.",
        "modelAnswer": "الفنان حكى إنه عمل القطعة في يوم. / المرشد أكد إن اللوحة فريدة."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الفنون»، زي المثال واستخدم نفس القواعد.",
        "prompt": "L'artiste a raconté qu'il avait créé l'œuvre en un jour.",
        "modelAnswer": "الفنان حكى إنه عمل القطعة في يوم."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "l'œuvre",
        "modelAnswer": "عمل فني"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Elle a demandé si nous aimions l'exposition.",
        "modelAnswer": "سألتنا لو عجبنا المعرض."
      }
    }
  },
  "fr-b1-u04": {
    "unitId": "fr-b1-u04",
    "overview": "في وحدة «الفرنكوفونية في الطبق» (La francophonie jusque dans l'assiette)، الهدف إنك أتذوق أطباقاً فرنكفونية وأقارن أذواقها. غطّينا القواعد الأساسية: le conditionnel présent de politesse et d'hypothèse؛ les comparatifs irréguliers: meilleur, pire, moindre؛ les expressions de la table avec le verbe prendre. وركّزنا على المفردات في محاور: المطبخ، الأطباق، المشاركة. ومن الجمل اللي اتدربنا عليها «Au Sénégal, on prépare le thiéboudienne, qui est meilleur avec du poisson.» و«Je voudrais goûter ce plat, s'il vous plaît.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Au Sénégal, on prépare le thiéboudienne, qui est meilleur avec du poisson. Je voudrais goûter ce plat, s'il vous plaît.",
        "modelAnswer": "في السنغال بيحضّروا الطياب، وهو أحلى بالسمك. / كنت أحب أتذوّق الطبق ده من فضلك."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «المطبخ»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Au Sénégal, on prépare le thiéboudienne, qui est meilleur avec du poisson.",
        "modelAnswer": "في السنغال بيحضّروا الطياب، وهو أحلى بالسمك."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "la cuisine",
        "modelAnswer": "مطبخ/طبخ"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "La cuisine marocaine est aussi épicée que la cuisine indienne.",
        "modelAnswer": "المطبخ المغربي حار زي المطبخ الهندي."
      }
    }
  },
  "fr-b1-u05": {
    "unitId": "fr-b1-u05",
    "overview": "في وحدة «عوالم المدينة» (Mondes urbains)، الهدف إنك أوصّف مدينة وأتكلم عن مشاكلها وحلولها. غطّينا القواعد الأساسية: la voix passive: le métro a été construit en 1900؛ les impersonnels: il est possible de, il y a lieu de, on constate que؛ les quantifieurs de nombre et de proportion. وركّزنا على المفردات في محاور: المدن، النقل، السكن. ومن الجمل اللي اتدربنا عليها «Le nouveau tramway a été inauguré le mois dernier.» و«Il est possible de mieux organiser les transports.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Le nouveau tramway a été inauguré le mois dernier. Il est possible de mieux organiser les transports.",
        "modelAnswer": "الترام الجديد افتتح الشهر اللي فات. / ممكن ننظّم المواصلات أحسن."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «المدن»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Le nouveau tramway a été inauguré le mois dernier.",
        "modelAnswer": "الترام الجديد افتتح الشهر اللي فات."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "la ville",
        "modelAnswer": "مدينة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "On constate que la circulation empire le matin.",
        "modelAnswer": "الزحام بيزيد الصبح."
      }
    }
  },
  "fr-b1-u06": {
    "unitId": "fr-b1-u06",
    "overview": "في وحدة «يوّلا!» (En route !)، الهدف إنك أحكي عن رحلة وأوصّف الطريق والوقت. غطّينا القواعد الأساسية: le plus-que-parfait: j'avais réservé, nous étions partis؛ les compléments circonstanciels: hier, deux jours avant, à la frontière؛ les connecteurs de suite: d'abord, puis, enfin. وركّزنا على المفردات في محاور: السفر، المحطات، المغادرة. ومن الجمل اللي اتدربنا عليها «Quand nous sommes arrivés à la gare, le train était déjà parti.» و«J'avais réservé l'hôtel deux mois avant.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Quand nous sommes arrivés à la gare, le train était déjà parti. J'avais réservé l'hôtel deux mois avant.",
        "modelAnswer": "لما وصلنا المحطة القطار كان راح خالص. / كنت حجزت الفندق من شهرين."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «السفر»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Quand nous sommes arrivés à la gare, le train était déjà parti.",
        "modelAnswer": "لما وصلنا المحطة القطار كان راح خالص."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "le départ",
        "modelAnswer": "انطلاق"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "D'abord, nous avons visité la vieille ville, puis nous sommes partis.",
        "modelAnswer": "الأول زرنا المدينة القديمة وبعدين سافرنا."
      }
    }
  },
  "fr-b1-u07": {
    "unitId": "fr-b1-u07",
    "overview": "في وحدة «نتعلّم… دايمًا!» (Apprendre… encore et toujours !)، الهدف إنك أناقش طرق التعلّم وأنصح بأفضل الطرق. غطّينا القواعد الأساسية: le subjonctif avec pour que et afin que؛ les moyens: en + gérondif, à l'aide de, au moyen de؛ apprendre à, faire apprendre, réapprendre. وركّزنا على المفردات في محاور: التعليم، الطرق، التحفيز. ومن الجمل اللي اتدربنا عليها «Il faut réviser chaque jour pour que la mémoire reste vive.» و«En faisant des fiches, tu apprends plus vite.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Il faut réviser chaque jour pour que la mémoire reste vive. En faisant des fiches, tu apprends plus vite.",
        "modelAnswer": "لازم تراجع كل يوم عشان الذاكرة تفضل نشيطة. / لما تعمل بطاقات بتتعلم أسرع."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «التعليم»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Il faut réviser chaque jour pour que la mémoire reste vive.",
        "modelAnswer": "لازم تراجع كل يوم عشان الذاكرة تفضل نشيطة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "l'apprentissage",
        "modelAnswer": "تعلّم"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Le professeur explique la leçon afin que tout le monde comprenne.",
        "modelAnswer": "المدرس بيشرح الدرس عشان الكل يفهم."
      }
    }
  },
  "fr-b1-u08": {
    "unitId": "fr-b1-u08",
    "overview": "في وحدة «نستهلك أحسن» (Mieux consommer !)، الهدف إنك أناقش عادات الاستهلاك وأنصح باختيارات أحسن. غطّينا القواعد الأساسية: les quantifieurs: la plupart de, peu de, la majorité de؛ les conseils: il faudrait, vous devriez, pourquoi ne pas؛ le comparatif des quantités. وركّزنا على المفردات في محاور: الاستهلاك، الميزانية، الاختيار. ومن الجمل اللي اتدربنا عليها «La plupart des gens achètent sans lire l'étiquette.» و«Il faudrait comparer les prix avant d'acheter.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "La plupart des gens achètent sans lire l'étiquette. Il faudrait comparer les prix avant d'acheter.",
        "modelAnswer": "أغلب الناس بتشتري من غير ما تقرأ الملصق. / الأحسن تقارن الأسعار قبل الشراء."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الاستهلاك»، زي المثال واستخدم نفس القواعد.",
        "prompt": "La plupart des gens achètent sans lire l'étiquette.",
        "modelAnswer": "أغلب الناس بتشتري من غير ما تقرأ الملصق."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "le consommateur",
        "modelAnswer": "مستهلك"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Tu devrais acheter moins mais mieux.",
        "modelAnswer": "المفروض تشتري أقل بس أجود."
      }
    }
  },
  "fr-b1-u09": {
    "unitId": "fr-b1-u09",
    "overview": "في وحدة «راحة ورضا في الشغل» (Mieux-être au travail)، الهدف إنك أتكلم عن راحة العامل وأنصح بتحسين أجواء الشغل. غطّينا القواعد الأساسية: l'obligation et la permission: il faut, je dois, je peux؛ le registre courtois: je souhaiterais, pourriez-vous؛ le gérondif de cause: en travaillant à la maison. وركّزنا على المفردات في محاور: الراحة، الزملاء، التوازن. ومن الجمل اللي اتدربنا عليها «En travaillant de chez soi, on gagne du temps.» و«Je souhaiterais prendre une pause, s'il vous plaît.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "En travaillant de chez soi, on gagne du temps. Je souhaiterais prendre une pause, s'il vous plaît.",
        "modelAnswer": "بالشغل من البيت بتوفّر وقت. / كنت أحب آخد استراحة من فضلك."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الراحة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "En travaillant de chez soi, on gagne du temps.",
        "modelAnswer": "بالشغل من البيت بتوفّر وقت."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "le bien-être",
        "modelAnswer": "راحة/رفاه"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Il faut que l'ambiance reste positive.",
        "modelAnswer": "لازم الأجواء تفضل إيجابية."
      }
    }
  },
  "fr-b1-u10": {
    "unitId": "fr-b1-u10",
    "overview": "في وحدة «جديد في الترفيه» (Du neuf dans les loisirs)، الهدف إنك أتكلم عن هواية جديدة ابتدأتها وليه. غطّينا القواعد الأساسية: les verbes + infinitif: commencer à, continuer de, arrêter de, se mettre à؛ les habitudes: prendre l'habitude de, avoir l'occasion de؛ le passé récent: venir de, être en train de. وركّزنا على المفردات في محاور: الهوايات، الأنشطة، التطور. ومن الجمل اللي اتدربنا عليها «Je me suis inscrit à un cours de photographie.» و«Elle a arrêté de regarder la télé pour lire plus.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Je me suis inscrit à un cours de photographie. Elle a arrêté de regarder la télé pour lire plus.",
        "modelAnswer": "سجّلت في كورس تصوير. / قعدت تقلّل التلفزيون وتقرأ أكتر."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الهوايات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Je me suis inscrit à un cours de photographie.",
        "modelAnswer": "سجّلت في كورس تصوير."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "le loisir",
        "modelAnswer": "ترفيه"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "On a l'occasion de faire du bénévolat le week-end.",
        "modelAnswer": "عندنا فرصة نتطوع في الويك إند."
      }
    }
  },
  "fr-b1-u11": {
    "unitId": "fr-b1-u11",
    "overview": "في وحدة «نرتّب صورتنا» ((Se) mettre en scène)، الهدف إنك أتكلم عن صورتي في السوشيال ميديا وأفرّق بينها وبين الحقيقة. غطّينا القواعد الأساسية: ce qui, ce que, ce dont (approfondissement)؛ le discours rapporté avec les réactions: il a expliqué que...؛ les connecteurs d'opposition: pourtant, cependant. وركّزنا على المفردات في محاور: الصورة الشخصية، التواصل، الاختلاف. ومن الجمل اللي اتدربنا عليها «Ce qu'on montre en ligne n'est pas toujours la réalité.» و«Il a expliqué qu'il créait son image avec soin.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Ce qu'on montre en ligne n'est pas toujours la réalité. Il a expliqué qu'il créait son image avec soin.",
        "modelAnswer": "اللي بتوريه أونلاين مش دايمًا الحقيقة. / وضّح إنه بيبني صورته بعناية."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الصورة الشخصية»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Ce qu'on montre en ligne n'est pas toujours la réalité.",
        "modelAnswer": "اللي بتوريه أونلاين مش دايمًا الحقيقة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "l'image",
        "modelAnswer": "صورة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Elle publie beaucoup, pourtant elle est très discrète.",
        "modelAnswer": "كتير بتنشر، مع إنها بتتكلم قليل."
      }
    }
  },
  "fr-b1-u12": {
    "unitId": "fr-b1-u12",
    "overview": "في وحدة «نكون مواطنين» (Être citoyen(ne))، الهدف إنك أكلم عن المسؤولية المدنية وأؤيد وأعترض بأدب. غطّينا القواعد الأساسية: l'opposition et la concession: pourtant, cependant, bien que, tandis que؛ le passé simple: il devint, elle prit, nous fûmes؛ les structures: non seulement ... mais aussi. وركّزنا على المفردات في محاور: المواطنة، الحقوق، التضامن. ومن الجمل اللي اتدربنا عليها «Bien que ce soit difficile, chaque citoyen peut agir.» و«La loi fut votée après un long débat.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Bien que ce soit difficile, chaque citoyen peut agir. La loi fut votée après un long débat.",
        "modelAnswer": "رغم إنها صعبة، كل مواطن يقدر يتحرك. / القانون اتصوّت عليه بعد نقاش طويل."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «المواطنة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Bien que ce soit difficile, chaque citoyen peut agir.",
        "modelAnswer": "رغم إنها صعبة، كل مواطن يقدر يتحرك."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "le citoyen",
        "modelAnswer": "مواطن"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Non seulement il a voté, mais il a aussi proposé une idée.",
        "modelAnswer": "مش بس صوّت، كمان اقترح فكرة."
      }
    }
  },
  "fr-b2-u01": {
    "unitId": "fr-b2-u01",
    "overview": "في وحدة «نخضرّ» (Se mettre au vert)، الهدف إنك أناقش العلاقة بين الطبيعة والصحة وأبني حجة متماسكة. غطّينا القواعد الأساسية: les connecteurs de cause et de but: étant donné que, pour que, de sorte que؛ les impersonnels: il s'agit de, il est question de؛ les propositions infinitives: à force de, sans oublier de. وركّزنا على المفردات في محاور: الطبيعة، الاسترخاء، الموازنة. ومن الجمل اللي اتدربنا عليها «Étant donné le stress quotidien, il est utile de se mettre au vert.» و«Il s'agit de ralentir pour mieux respirer.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Étant donné le stress quotidien, il est utile de se mettre au vert. Il s'agit de ralentir pour mieux respirer.",
        "modelAnswer": "بسبب التوتر اليومي، من المفيد تخرج للطبيعة. / الموضوع إننا نبطّأ عشان نتنفس أحسن."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الطبيعة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Étant donné le stress quotidien, il est utile de se mettre au vert.",
        "modelAnswer": "بسبب التوتر اليومي، من المفيد تخرج للطبيعة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "le cadre naturel",
        "modelAnswer": "مكان طبيعي"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Le week-end, je pars à la campagne afin de me ressourcer.",
        "modelAnswer": "في الويك إند بروح الريف عشان أجدد طاقتي."
      }
    }
  },
  "fr-b2-u02": {
    "unitId": "fr-b2-u02",
    "overview": "في وحدة «تكون ولا تملك؟» (Être ou avoir ?)، الهدف إنك أناقش قيمة الأشياء مقابل القيم والتجارب. غطّينا القواعد الأساسية: le conditionnel présent et passé (rappel approfondi)؛ les structures comparatives: au même titre que, à l'inverse de, contrairement à؛ exprimer l'évaluation: cela vaut la peine de, rien ne vaut. وركّزنا على المفردات في محاور: القيم، الملكية، التجارب. ومن الجمل اللي اتدربنا عليها «Rien ne vaut une expérience bien vécue.» و«À l'inverse du luxe, le calme enrichit vraiment.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Rien ne vaut une expérience bien vécue. À l'inverse du luxe, le calme enrichit vraiment.",
        "modelAnswer": "مفيش حاجة تعدل تجربة عايشتها كويس. / عكس الفخامة، الهدوء بيثرّينا بجد."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «القيم»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Rien ne vaut une expérience bien vécue.",
        "modelAnswer": "مفيش حاجة تعدل تجربة عايشتها كويس."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "la valeur",
        "modelAnswer": "قيمة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Cela vaut la peine de posséder moins pour vivre plus.",
        "modelAnswer": "يستاهل تملك أقل عشان تعيش أكتر."
      }
    }
  },
  "fr-b2-u03": {
    "unitId": "fr-b2-u03",
    "overview": "في وحدة «تدور على طريقك» (Chercher sa voie)، الهدف إنك أنصح حدّ يدور على مساره المهني بأسلوب مهني مرن. غطّينا القواعد الأساسية: le subjonctif présent et passé avec les verbes de pensée؛ orienter et conseiller: il convient de, vous pourriez envisager؛ les hypothèses: à condition que, pourvu que. وركّزنا على المفردات في محاور: التوجيه، المهنة، المشروع. ومن الجمل اللي اتدربنا عليها «Il convient de clarifier sa vocation avant de postuler.» و«À condition que tu t'entraînes, tu réussiras l'entretien.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Il convient de clarifier sa vocation avant de postuler. À condition que tu t'entraînes, tu réussiras l'entretien.",
        "modelAnswer": "من المناسب توضّح ميّزاتك قبل ما تقدّم. / بشرط إنك تتمرن هتنجح في المقابلة."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «التوجيه»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Il convient de clarifier sa vocation avant de postuler.",
        "modelAnswer": "من المناسب توضّح ميّزاتك قبل ما تقدّم."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "l'orientation",
        "modelAnswer": "توجيه"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Je doute que ce poste corresponde à ton profil.",
        "modelAnswer": "بشك إن الوظيفة دي تناسب ملفك."
      }
    }
  },
  "fr-b2-u04": {
    "unitId": "fr-b2-u04",
    "overview": "في وحدة «متصل ولا غير متصل» (Être connecté ou ne pas être)، الهدف إنك أحلّل أثر الرقمنة في حياتي بأسلوب متوازن. غطّينا القواعد الأساسية: la voix pronominale passive: on dit que, il se raconte que؛ les registres: soutenu, courant, familier؛ les modalisateurs d'atténuation: en quelque sorte, pour ainsi dire. وركّزنا على المفردات في محاور: الرقمنة، المنصات، العلاقات. ومن الجمل اللي اتدربنا عليها «On dit que l'algorithme oriente nos choix.» و«Il se trouve que je suis hyperconnecté depuis deux ans.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "On dit que l'algorithme oriente nos choix. Il se trouve que je suis hyperconnecté depuis deux ans.",
        "modelAnswer": "بيقولوا إن الخوارزمية بتوجّه اختياراتنا. / طلع إني فرط الاتصال من سنتين."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الرقمنة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "On dit que l'algorithme oriente nos choix.",
        "modelAnswer": "بيقولوا إن الخوارزمية بتوجّه اختياراتنا."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "la connexion",
        "modelAnswer": "اتصال"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "En quelque sorte, la plateforme nous connaît mieux que nous.",
        "modelAnswer": "شكل ما المنصة بتعرفنا أكتر منّا."
      }
    }
  },
  "fr-b2-u05": {
    "unitId": "fr-b2-u05",
    "overview": "في وحدة «الماضي والحاضر» (Histoire au passé et au présent)، الهدف إنك أقارن بين حقبة تاريخية واليوم بسرد سلس. غطّينا القواعد الأساسية: le passé simple narratif: il devint, elles prirent؛ le plus-que-parfait: avait déjà؛ les relations temporelles: lorsque, alors que, depuis que, auparavant. وركّزنا على المفردات في محاور: الماضي، التراث، التغيّر. ومن الجمل اللي اتدربنا عليها «Auparavant, le quartier était un champ ; aujourd'hui, c'est un parc.» و«Lorsque la ville fut fondée, personne n'imaginait ce développement.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Auparavant, le quartier était un champ ; aujourd'hui, c'est un parc. Lorsque la ville fut fondée, personne n'imaginait ce développement.",
        "modelAnswer": "قبل كان حقل، دلوقتي بقى حديقة. / لما المدينة اتأسست محدش كان متخيل التطور ده."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الماضي»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Auparavant, le quartier était un champ ; aujourd'hui, c'est un parc.",
        "modelAnswer": "قبل كان حقل، دلوقتي بقى حديقة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "l'héritage",
        "modelAnswer": "إرث"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Les monuments avaient déjà été restaurés avant la visite.",
        "modelAnswer": "الأثار كانت اترمّمت قبل الزيارة."
      }
    }
  },
  "fr-b2-u06": {
    "unitId": "fr-b2-u06",
    "overview": "في وحدة «نرفع المرساة» (Lever l'ancre)، الهدف إنك أروي رحلة تغيير في حياتي بتفاصيل مكانية وزمنية. غطّينا القواعد الأساسية: le récit: imparfait, passé simple, plus-que-parfait؛ les compléments de lieu détaillés: au-delà de, à travers, le long de؛ le gérondif de circonstance: en longeant la côte. وركّزنا على المفردات في محاور: الإبحار، الرحلات، التحول. ومن الجمل اللي اتدربنا عليها «En longeant la côte, nous avons aperçu un vieux port.» و«Le navire leva l'ancre alors que le soleil se couchait.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "En longeant la côte, nous avons aperçu un vieux port. Le navire leva l'ancre alors que le soleil se couchait.",
        "modelAnswer": "وإحنا ماشيين على الساحل شفنا ميناء قديم. / السفينة رفعت المرساة والشمس كانت بتغرب."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الإبحار»، زي المثال واستخدم نفس القواعد.",
        "prompt": "En longeant la côte, nous avons aperçu un vieux port.",
        "modelAnswer": "وإحنا ماشيين على الساحل شفنا ميناء قديم."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "l'ancre",
        "modelAnswer": "مرساة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Au-delà du cap, la mer devenait agitée.",
        "modelAnswer": "بعد الرأس البحر بيبقى هايج."
      }
    }
  },
  "fr-b2-u07": {
    "unitId": "fr-b2-u07",
    "overview": "في وحدة «معنى الخبر» (Le sens de l'actu)، الهدف إنك أحلّل مقالاً إخبارياً وأميّز المعلومة عن التأويل. غطّينا القواعد الأساسية: l'information indirecte: selon, d'après, on affirme que؛ le conditionnel de l'information: serait, pourrait؛ les modalisateurs: sans doute, apparemment, manifestement. وركّزنا على المفردات في محاور: الإعلام، المصادر، التحليل. ومن الجمل اللي اتدربنا عليها «D'après le sondage, la mesure serait impopulaire.» و«On affirme que les chiffres ont été vérifiés.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "D'après le sondage, la mesure serait impopulaire. On affirme que les chiffres ont été vérifiés.",
        "modelAnswer": "حسب الاستطلاع المقترح مش رأي شعبي. / بيتأكدوا إن الأرقام اتأكّدت."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الإعلام»، زي المثال واستخدم نفس القواعد.",
        "prompt": "D'après le sondage, la mesure serait impopulaire.",
        "modelAnswer": "حسب الاستطلاع المقترح مش رأي شعبي."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "l'actualité",
        "modelAnswer": "أخبار"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Apparemment, la rédaction a retiré l'article.",
        "modelAnswer": "على ما يبدو هيئة التحرير سحبت المقال."
      }
    }
  },
  "fr-b2-u08": {
    "unitId": "fr-b2-u08",
    "overview": "في وحدة «اهتموا بنفسكم!» (Prenez soin de vous !)، الهدف إنك أنصح بنمط حياة صحي بنبرة مقنعة ومرنة. غطّينا القواعد الأساسية: les recommandations nuancées: il serait souhaitable que + subjonctif؛ le gérondif de cause: en dormant mieux؛ les infinitifs de conseil: veiller à, éviter de, essayer de. وركّزنا على المفردات في محاور: الصحة، التوازن، العادات. ومن الجمل اللي اتدربنا عليها «En dormant sept heures, tu gardes ton énergie.» و«Il serait souhaitable que tu réduises ton stress.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "En dormant sept heures, tu gardes ton énergie. Il serait souhaitable que tu réduises ton stress.",
        "modelAnswer": "بنوم سبع ساعات بتحافظ على طاقتك. / من الأنسب إنك تقلّل توترك."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الصحة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "En dormant sept heures, tu gardes ton énergie.",
        "modelAnswer": "بنوم سبع ساعات بتحافظ على طاقتك."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "l'équilibre",
        "modelAnswer": "توازن"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Veille à bien t'alimenter et à marcher chaque jour.",
        "modelAnswer": "اهتم بأكلك كويس وامشي كل يوم."
      }
    }
  },
  "fr-b2-u09": {
    "unitId": "fr-b2-u09",
    "overview": "في وحدة «الغنى بالمشاركة» (La richesse en partage)، الهدف إنك ناقش اقتصاد المشاركة وقيم التضامن بأسلوب راقٍ. غطّينا القواعد الأساسية: les impersonnels élevés: il incombe à, il convient de, il est du devoir de؛ les comparaisons économiques: à l'instar de, à l'image de؛ les structures de quantité abstraite: une part de, un sentiment de. وركّزنا على المفردات في محاور: التضامن، الاقتصاد، المشاركة. ومن الجمل اللي اتدربنا عليها «Il incombe aux entreprises de favoriser le partage.» و«À l'instar des coopératives, certaines structures partagent leurs bénéfices.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Il incombe aux entreprises de favoriser le partage. À l'instar des coopératives, certaines structures partagent leurs bénéfices.",
        "modelAnswer": "من واجب الشركات تيسّر المشاركة. / زي التعاونيات، بعض المؤسسات بتشارك أرباحها."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «التضامن»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Il incombe aux entreprises de favoriser le partage.",
        "modelAnswer": "من واجب الشركات تيسّر المشاركة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "la richesse",
        "modelAnswer": "غنى/ثروة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Il convient de repenser la redistribution des richesses.",
        "modelAnswer": "من المناسب نعيد التفكير في إعادة توزيع الثروات."
      }
    }
  },
  "fr-b2-u10": {
    "unitId": "fr-b2-u10",
    "overview": "في وحدة «بتتكلّم فرنسي؟» (Parlez-vous français ?)، الهدف إنك أناقش قيمة تعلّم الفرنسي وأستعمل المصطلحات اللغوية. غطّينا القواعد الأساسية: la problématique: non seulement ... mais encore؛ le métalangage linguistique: le lexique, la syntaxe, la prononciation؛ le discours rapporté avec citation: il a soutenu que.... وركّزنا على المفردات في محاور: اللغات، التعلّم، الفرنكوفونية. ومن الجمل اللي اتدربنا عليها «Non seulement le français élargit l'horizon, mais encore il ouvre des portes.» و«Il a soutenu que l'accent n'était pas un obstacle.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Non seulement le français élargit l'horizon, mais encore il ouvre des portes. Il a soutenu que l'accent n'était pas un obstacle.",
        "modelAnswer": "مش بس يوسّع الأفق، كمان بيفتح أبواب. / أكد إن اللكنة مش عقبة."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «اللغات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Non seulement le français élargit l'horizon, mais encore il ouvre des portes.",
        "modelAnswer": "مش بس يوسّع الأفق، كمان بيفتح أبواب."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "la langue",
        "modelAnswer": "لغة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Le lexique d'une langue révèle sa culture.",
        "modelAnswer": "معجم اللغة بينكشف ثقافتها."
      }
    }
  },
  "fr-b2-u11": {
    "unitId": "fr-b2-u11",
    "overview": "في وحدة «هنوصل لفين؟» (Jusqu'où irons-nous ?)، الهدف إنك أناقش تطورات علمية مستقبلية بحذر واحتمالات. غطّينا القواعد الأساسية: les hypothèses lointaines: si jamais, dans l'hypothèse où + subjonctif؛ les probabilités: il se peut que, sans doute que, nul doute que؛ les projets: envisager que, prévoir que. وركّزنا على المفردات في محاور: المستقبل، العلم، الأخلاقيات. ومن الجمل اللي اتدربنا عليها «Si jamais l'intelligence artificielle devient consciente, il faudra légiférer.» و«Il se peut que les métiers changent plus vite qu'on ne le croit.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Si jamais l'intelligence artificielle devient consciente, il faudra légiférer. Il se peut que les métiers changent plus vite qu'on ne le croit.",
        "modelAnswer": "لو الذكاء الاصطناعي بقى واعي، هنحتاج نشرّع. / ممكن الشغل يتغيّر أسرع من ما نصدق."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «المستقبل»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Si jamais l'intelligence artificielle devient consciente, il faudra légiférer.",
        "modelAnswer": "لو الذكاء الاصطناعي بقى واعي، هنحتاج نشرّع."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "l'avenir",
        "modelAnswer": "المستقبل"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Dans l'hypothèse où la fusion réussirait, l'énergie serait abondante.",
        "modelAnswer": "في حالة نجاح الاندماج، الطاقة هتبقى وفيرة."
      }
    }
  },
  "fr-b2-u12": {
    "unitId": "fr-b2-u12",
    "overview": "في وحدة «قوة الفنون» (La force des arts)، الهدف إنك أقدّر عملاً فنياً بأسلوب راقٍ وأراجع تقدّمي في المستوى. غطّينا القواعد الأساسية: les jugements esthétiques: cela m'a beaucoup touché que + subjonctif؛ les figures de style courantes: métaphore, comparaison, antithèse؛ le registre soutenu et la récapitulation du niveau. وركّزنا على المفردات في محاور: الفنون، التقدير، المستوى. ومن الجمل اللي اتدربنا عليها «Cette œuvre m'a touché qu'elle soit si simple et si forte.» و«La métaphore traverse tout le recueil.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Cette œuvre m'a touché qu'elle soit si simple et si forte. La métaphore traverse tout le recueil.",
        "modelAnswer": "القطعة دي أثرت فيّ إنها بسيطة وفيها قوة. / الاستعارة ممتدة في المجموعة كلها."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الفنون»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Cette œuvre m'a touché qu'elle soit si simple et si forte.",
        "modelAnswer": "القطعة دي أثرت فيّ إنها بسيطة وفيها قوة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "l'œuvre",
        "modelAnswer": "عمل فني"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Antithèse : le silence y est plus éloquent que les cris.",
        "modelAnswer": "في مقابلة: الصمت فيها أبلغ من الصراخ."
      }
    }
  },
  "fr-c1-u01": {
    "unitId": "fr-c1-u01",
    "overview": "في وحدة «إتقان الجزم والتنغيم» (Le subjonctif au naturel)، الهدف إنك أستخدم subjonctif بشكل طبيعي في كل السياقات. غطّينا القواعد الأساسية: subjonctif présent complet (que je sois, qu'il ait)؛ locutions: bien que, pour que, avant que؛ les impersonnels: il faut que, il est bon que. وركّزنا على المفردات في محاور: التعبيرات الجملية، التفضيلات، التقدير. ومن الجمل اللي اتدربنا عليها «Bien que ce soit difficile, je continue.» و«Il faut que la réponse soit claire.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Bien que ce soit difficile, je continue. Il faut que la réponse soit claire.",
        "modelAnswer": "رغم إن ده صعب، بكمل. / لازم الإجابة تبقى واضحة."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «التعبيرات الجملية»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Bien que ce soit difficile, je continue.",
        "modelAnswer": "رغم إن ده صعب، بكمل."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "bien que",
        "modelAnswer": "رغم أن"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "À moins que tu ne puisses venir.",
        "modelAnswer": "إلا إذا قدرت تيجي."
      }
    }
  },
  "fr-c1-u02": {
    "unitId": "fr-c1-u02",
    "overview": "في وحدة «السياقات والسجلات اللغوية» (Selon le registre)، الهدف إنك أبدّل بين الفصحى والعامية (soutenu/courant/familier) حسب الموقف. غطّينا القواعد الأساسية: les registres de langue؛ passif et tournures impersonnelles؛ les formules de politesse élevées. وركّزنا على المفردات في محاور: الرسمية، اللباقة، التباين. ومن الجمل اللي اتدربنا عليها «Dans un contexte formel, j'utilise un registre soutenu.» و«Je me permets de vous signaler...». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Dans un contexte formel, j'utilise un registre soutenu. Je me permets de vous signaler...",
        "modelAnswer": "في سياق رسمي بستخدم لغة مؤدبة. / اسمح لي أشير لكم..."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الرسمية»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Dans un contexte formel, j'utilise un registre soutenu.",
        "modelAnswer": "في سياق رسمي بستخدم لغة مؤدبة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "le registre",
        "modelAnswer": "سجل لغوي"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "En termes simples, c'est trop compliqué.",
        "modelAnswer": "ببساطة، الموضوع معقّد أوي."
      }
    }
  },
  "fr-c1-u03": {
    "unitId": "fr-c1-u03",
    "overview": "في وحدة «التعبيرات والأمثال» (Les expressions idiomatiques)، الهدف إنك أستخدم تعابير وأمثال فرنسية بشكل مناسب وسليم. غطّينا القواعد الأساسية: les expressions figées؛ les proverbes؛ les figures de style basiques. وركّزنا على المفردات في محاور: التعبيرات، الأمثال، الأغاني الشائعة. ومن الجمل اللي اتدربنا عليها «Ça coûte les yeux de la tête à Paris.» و«On est sur la même longueur d'onde.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Ça coûte les yeux de la tête à Paris. On est sur la même longueur d'onde.",
        "modelAnswer": "غالي جداً في باريس. / إحنا متفقين في الرأي."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «التعبيرات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Ça coûte les yeux de la tête à Paris.",
        "modelAnswer": "غالي جداً في باريس."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "avoir le cafard",
        "modelAnswer": "يكون زعلان/كئيب"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Il est tombé dans les pommes hier.",
        "modelAnswer": "وقع من طوله إمبارح."
      }
    }
  },
  "fr-c1-u04": {
    "unitId": "fr-c1-u04",
    "overview": "في وحدة «قيادة الاجتماعات» (Réunion de travail)، الهدف إنك أقود أو أشارك في اجتماع مهني: أفكار، اعتراضات، خلاصات. غطّينا القواعد الأساسية: les tours professionnels (je propose que...)؛ les passives: il a été décidé que...؛ récapituler et conclure. وركّزنا على المفردات في محاور: الاجتماع، الإدارة، الخلاصة. ومن الجمل اللي اتدربنا عليها «Je propose que nous passions au point suivant.» و«Il a été décidé de repousser la date.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Je propose que nous passions au point suivant. Il a été décidé de repousser la date.",
        "modelAnswer": "أقترح إننا نروح للنقطة اللي بعدها. / اتقرر تأجيل التاريخ."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الاجتماع»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Je propose que nous passions au point suivant.",
        "modelAnswer": "أقترح إننا نروح للنقطة اللي بعدها."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "l'ordre du jour",
        "modelAnswer": "جدول الأعمال"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Faisons le point sur les réserves.",
        "modelAnswer": "نراجع التحفظات."
      }
    }
  },
  "fr-c1-u05": {
    "unitId": "fr-c1-u05",
    "overview": "في وحدة «الإعلام والنقد النقدي» (Analyser un article)، الهدف إنك أحلّل مقال أو تقرير: مواقف، حجج، منهجية. غطّينا القواعد الأساسية: analyser: l'auteur soutient que...؛ les connecteurs logiques avancés؛ le discours indirect complet. وركّزنا على المفردات في محاور: التحليل، النقض، المنهجية. ومن الجمل اللي اتدربنا عليها «L'auteur soutient que la tendance va s'inverser.» و«Sa démonstration manque de preuves.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "L'auteur soutient que la tendance va s'inverser. Sa démonstration manque de preuves.",
        "modelAnswer": "كاتب بيؤيد إن الترند هيتقلب. / برهانه ناقص أدلة."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «التحليل»، زي المثال واستخدم نفس القواعد.",
        "prompt": "L'auteur soutient que la tendance va s'inverser.",
        "modelAnswer": "كاتب بيؤيد إن الترند هيتقلب."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "l'analyse",
        "modelAnswer": "تحليل"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "L'angle pris est original.",
        "modelAnswer": "الزاوية المختارة أصلية."
      }
    }
  },
  "fr-c1-u06": {
    "unitId": "fr-c1-u06",
    "overview": "في وحدة «محادثة حرّة C1» (Débat libre C1)، الهدف إنك محادثة طويلة بثقة: أدافع، أحلّل، وأستمع وأردّ بعمق. غطّينا القواعد الأساسية: révision: tous les subjonctifs, conditionnels؛ les structures emphatiques؛ relancer et synthétiser. وركّزنا على المفردات في محاور: النقاش، التقييم، العمق. ومن الجمل اللي اتدربنا عليها «Pourrais-tu préciser ton propos ?» و«J'y vois deux aspects distincts.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Pourrais-tu préciser ton propos ? J'y vois deux aspects distincts.",
        "modelAnswer": "ممكن توضّح قصدك؟ / بشوف فيها وجهين مختلفين."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «النقاش»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Pourrais-tu préciser ton propos ?",
        "modelAnswer": "ممكن توضّح قصدك؟"
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "la profondeur",
        "modelAnswer": "عمق"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Le fond est juste, la forme moins.",
        "modelAnswer": "الجوهر صح، الشكل أقل."
      }
    }
  },
  "fr-c2-u01": {
    "unitId": "fr-c2-u01",
    "overview": "في وحدة «الدقة المعجمية» (Les nuances du lexique)، الهدف إنك أفرّق بين مترادفات دقيقة وأستخدمها في سياقها الصحيح. غطّينا القواعد الأساسية: les faux amis et les nuances؛ la précision lexicale؛ les registres et la connotation. وركّزنا على المفردات في محاور: الترادفات، الدقة، التمييز. ومن الجمل اللي اتدربنا عليها «Ce n'est pas exactement ce que je voulais dire.» و«Le terme juste serait « nuance ».». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Ce n'est pas exactement ce que je voulais dire. Le terme juste serait « nuance ».",
        "modelAnswer": "مش بالظبط قصدي. / المصطلح الصح هو «فارق دقيق»."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الترادفات»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Ce n'est pas exactement ce que je voulais dire.",
        "modelAnswer": "مش بالظبط قصدي."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "observer / regarder / voir",
        "modelAnswer": "يلاحظ/ينظر/يرى"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Il y a une différence de connotation.",
        "modelAnswer": "في فرق في الدلالة الضمنية."
      }
    }
  },
  "fr-c2-u02": {
    "unitId": "fr-c2-u02",
    "overview": "في وحدة «الإضاءة والسخرية» (Ironie et argumentation fine)، الهدف إنك أستخدم السخرية والتهكم اللطيف وأفكّك الحجج الدقيقة. غطّينا القواعد الأساسية: l'ironie et l'understatement؛ les concessives délicates (certes... mais)؛ les atténuations et renforcements. وركّزنا على المفردات في محاور: السخرية، التلاعب بالأسلوب، النقد. ومن الجمل اللي اتدربنا عليها «Certes, l'idée est séduisante ; pour autant, elle est fragile.» و«C'est une solution... originale.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Certes, l'idée est séduisante ; pour autant, elle est fragile. C'est une solution... originale.",
        "modelAnswer": "صحيح الفكرة مغرية، ومع ذلك هشّة. / دي حل... أصيل (بمعنى ساخر)."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «السخرية»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Certes, l'idée est séduisante ; pour autant, elle est fragile.",
        "modelAnswer": "صحيح الفكرة مغرية، ومع ذلك هشّة."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "l'ironie",
        "modelAnswer": "سخرية"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Sous-entendu : personne n'est prêt.",
        "modelAnswer": "اللي مقصود: محدش مستعد."
      }
    }
  },
  "fr-c2-u03": {
    "unitId": "fr-c2-u03",
    "overview": "في وحدة «الأدب والأساليب الرفيعة» (Beaux-arts de la langue)، الهدف إنك أناقش نصًّا أدبيًا أو فنًّا بأسلوب راقٍ ومفردات عميقة. غطّينا القواعد الأساسية: les tournures littéraires؛ la métaphore et la comparaison؛ l'expression abstraite. وركّزنا على المفردات في محاور: الأدب، البلاغة، التذوّق. ومن الجمل اللي اتدربنا عليها «La métaphore traverse toute l'œuvre.» و«Le style est d'une rare élégance.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "La métaphore traverse toute l'œuvre. Le style est d'une rare élégance.",
        "modelAnswer": "الاستعارة موجودة في كل العمل. / الأسلوب نادر الأناقة."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الأدب»، زي المثال واستخدم نفس القواعد.",
        "prompt": "La métaphore traverse toute l'œuvre.",
        "modelAnswer": "الاستعارة موجودة في كل العمل."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "la prose",
        "modelAnswer": "نثر"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Ce passage m'a profondément touché.",
        "modelAnswer": "المقطع ده أثر فيّ بعمق."
      }
    }
  },
  "fr-c2-u04": {
    "unitId": "fr-c2-u04",
    "overview": "في وحدة «المهنية الأكاديمية» (Soutenance et entretien)، الهدف إنك أُقدّم فكرتي بوضوح في سياق أكاديمي أو مهني عالٍ. غطّينا القواعد الأساسية: les formules de soutenance؛ la structure d'un exposé؛ les hypothèses et leurs implications. وركّزنا على المفردات في محاور: العرض، الأكاديمية، المهنة. ومن الجمل اللي اتدربنا عليها «Mon hypothèse centrale est la suivante.» و«La méthodologie repose sur trois étapes.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Mon hypothèse centrale est la suivante. La méthodologie repose sur trois étapes.",
        "modelAnswer": "فرضيتي المركزية هي التالية. / المنهجية قائمة على ثلاث خطوات."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «العرض»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Mon hypothèse centrale est la suivante.",
        "modelAnswer": "فرضيتي المركزية هي التالية."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "l'exposé",
        "modelAnswer": "عرض تقديمي"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Je nuancerai ce point dans un second temps.",
        "modelAnswer": "هوضّح النقطة دي في مرحلة تانية."
      }
    }
  },
  "fr-c2-u05": {
    "unitId": "fr-c2-u05",
    "overview": "في وحدة «القضايا المعاصرة المعقدة» (Enjeux contemporains)، الهدف إنك أناقش قضية عالمية مركّبة بعمق واتزان. غطّينا القواعد الأساسية: les causales complexes (dans la mesure où...)؛ les passives et impersonnels élevés؛ les comparaisons internationales. وركّزنا على المفردات في محاور: القضايا العالمية، التحليل، المقارنات. ومن الجمل اللي اتدربنا عليها «Dans la mesure où les données le montrent...» و«Le paradoxe est que plus on produit, plus on gaspille.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Dans la mesure où les données le montrent... Le paradoxe est que plus on produit, plus on gaspille.",
        "modelAnswer": "في حدود ما البيانات تُظهر... / المفارقة إننا كل ما ننتج أكتر نهدر أكتر."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «القضايا العالمية»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Dans la mesure où les données le montrent...",
        "modelAnswer": "في حدود ما البيانات تُظهر..."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "la mondialisation",
        "modelAnswer": "عولمة"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "La résilience devient un enjeu central.",
        "modelAnswer": "القدرة على التكيّف بقت محور أساسي."
      }
    }
  },
  "fr-c2-u06": {
    "unitId": "fr-c2-u06",
    "overview": "في وحدة «طلاقة حرة C2» (Conversation d'exception)، الهدف إنك محادثة بلا حدود: أتفلسف، أستشهد، أُقدّر — بكل راحة ودقّة. غطّينا القواعد الأساسية: maîtrise totale: toutes les subordonnées؛ la spontanéité maîtrisée؛ le métalangage (pour reprendre ton idée...). وركّزنا على المفردات في محاور: الطلاقة، التفلسف، التقويم الذاتي. ومن الجمل اللي اتدربنا عليها «Au fond, la question est ailleurs.» و«Pour le dire autrement : tout est relatif.». ليّن تخلص الوحدة دي، لازم تكون قادر تستخدم الكلام ده في محادثة حقيقية مع المدرّس.",
    "skills": {
      "reading": {
        "instruction": "اقرأ النص وجاوب: إيه اللي بيقوله الكاتب، وإيه معنى الجملة؟",
        "prompt": "Au fond, la question est ailleurs. Pour le dire autrement : tout est relatif.",
        "modelAnswer": "في الحقيقة السؤال في مكان آخر. / بصياغة تانية: كل حاجة نسبية."
      },
      "writing": {
        "instruction": "اكتب ٣ جمل قصيرة عن «الطلاقة»، زي المثال واستخدم نفس القواعد.",
        "prompt": "Au fond, la question est ailleurs.",
        "modelAnswer": "في الحقيقة السؤال في مكان آخر."
      },
      "listening": {
        "instruction": "اسمع الكلمة وقل معناها بالعربي:",
        "prompt": "l'esprit",
        "modelAnswer": "روح/ذكاء"
      },
      "speaking": {
        "instruction": "قول بالصوت:",
        "prompt": "Ton intuition rejoint la mienne.",
        "modelAnswer": "حدسك بيلاقي عنددي موافقة."
      }
    }
  }
};
