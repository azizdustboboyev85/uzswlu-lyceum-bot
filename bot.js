/**
 * ╔══════════════════════════════════════════════╗
 * ║  O'zDJTU Akademik Litseyi — Premium Bot      ║
 * ║  Ko'p tilli · Inline Keyboard · Modern UI    ║
 * ╚══════════════════════════════════════════════╝
 */

const TelegramBot = require('node-telegram-bot-api');

const TOKEN = process.env.TELEGRAM_TOKEN || '8706273830:AAHEF7__G3jMabnGlTK1BAQGw6hLIzj58fo';
const bot   = new TelegramBot(TOKEN, { polling: true });

// ──────────────────────────────────────────────
//  YOMON SO'ZLAR FILTRI
// ──────────────────────────────────────────────
const BAD_WORDS = [
    'la\'nat','harom','eshak','ahmoq','tentak','nokas','besharam','buzuq',
    'блять','бля','пизд','хуй','ёбан','ебан','сука','падла','мудак',
    'урод','идиот','дурак','тупой','придурок','козёл','ублюдок','дебил',
    'fuck','shit','bitch','asshole','bastard','crap','stupid','idiot','moron'
];
const hasBadWord = (t) => BAD_WORDS.some(w => t.toLowerCase().includes(w));

// ──────────────────────────────────────────────
//  SALOMLASHISH SO'ZLARI
// ──────────────────────────────────────────────
const GREETINGS = [
    'salom','assalomu alaykum','assalom','xayrli','hayrli',
    'привет','здравствуй','здравствуйте','добрый','доброе','хай',
    'hello','hi','hey','good morning','good afternoon','good evening'
];
const isGreeting = (t) => GREETINGS.some(g => t.toLowerCase().includes(g));

// ──────────────────────────────────────────────
//  FOYDALANUVCHI TILI (sessiya)
// ──────────────────────────────────────────────
const userLang = {};
const getLang  = (id) => userLang[id] || 'uz';

// ──────────────────────────────────────────────
//  UI MATNLARI
// ──────────────────────────────────────────────
const UI = {
    uz: {
        welcome: (n) =>
`╔═══════════════════════════╗
🎓  *O'zDJTU Akademik Litseyi*
╚═══════════════════════════╝

Assalomu alaykum, *${n}!* 👋

Men litseyga *2026/2027* qabul jarayoni haqida sizga tezkor ma'lumot beruvchi rasmiy botman. 🤖

▸ Qabul muddatlari
▸ Imtihon fanlari va ballar
▸ IELTS / CEFR imtiyozlari
▸ Kerakli hujjatlar
▸ Ta'lim yo'nalishlari
▸ Aloqa va manzil

👇 *Qiziqtirgan bo'limni tanlang:*`,

        greeting: (n) =>
`👋 Va alaykum assalom, *${n}!*

Sizga qanday yordam bera olaman?
Quyidagi bo'limlardan birini tanlang 👇`,

        notFound:
`🔍 *Kerakli ma'lumot topilmadi*

Iltimos, quyidagi bo'limlardan birini tanlang yoki savolni boshqacha yozib ko'ring.`,

        badWord:
`⚠️ *Diqqat!*

Iltimos, hurmatli muloqot tarzida muloqot qiling.
Bot madaniyatli so'zlashuvga mo'ljallangan. 🙏`,

        back: '‹ Ortga qaytish',
        menu: '≡  Bosh menyu',
        callcenter: '☎  Call-Center',
        video: '▶  Video qo\'llanma',
        changeLang: '🌐  Tilni o\'zgartirish',

        sections: {
            muddatlar:  '📅  Qabul muddatlari',
            fanlar:     '📝  Imtihon fanlari',
            imtiyozlar: '🏆  IELTS imtiyozlari',
            hujjatlar:  '📂  Kerakli hujjatlar',
            yonalishlar:'🏫  Ta\'lim yo\'nalishlari',
            aloqa:      '📍  Aloqa va Manzil',
        }
    },
    ru: {
        welcome: (n) =>
`╔═══════════════════════════╗
🎓  *Академический лицей УЗГМИИЯ*
╚═══════════════════════════╝

Здравствуйте, *${n}!* 👋

Я официальный бот, который предоставляет актуальную информацию о поступлении в лицей на *2026/2027* учебный год. 🤖

▸ Сроки приёма
▸ Предметы и баллы
▸ Льготы IELTS / CEFR
▸ Необходимые документы
▸ Направления обучения
▸ Контакты и адрес

👇 *Выберите нужный раздел:*`,

        greeting: (n) =>
`👋 Здравствуйте, *${n}!*

Чем могу помочь?
Выберите раздел ниже 👇`,

        notFound:
`🔍 *Информация не найдена*

Пожалуйста, выберите раздел из меню или переформулируйте вопрос.`,

        badWord:
`⚠️ *Внимание!*

Пожалуйста, общайтесь уважительно.
Бот предназначен для культурного общения. 🙏`,

        back: '‹ Назад',
        menu: '≡  Главное меню',
        callcenter: '☎  Call-Center',
        video: '▶  Видео-инструкция',
        changeLang: '🌐  Сменить язык',

        sections: {
            muddatlar:  '📅  Сроки приёма',
            fanlar:     '📝  Предметы экзаменов',
            imtiyozlar: '🏆  Льготы IELTS',
            hujjatlar:  '📂  Документы',
            yonalishlar:'🏫  Направления',
            aloqa:      '📍  Контакты',
        }
    },
    en: {
        welcome: (n) =>
`╔═══════════════════════════╗
🎓  *UZSWLU Academic Lyceum*
╚═══════════════════════════╝

Hello, *${n}!* 👋

I'm the official bot providing up-to-date information about *2026/2027* lyceum admissions. 🤖

▸ Admission deadlines
▸ Exam subjects & scores
▸ IELTS / CEFR benefits
▸ Required documents
▸ Study tracks
▸ Contacts & address

👇 *Choose a section below:*`,

        greeting: (n) =>
`👋 Hello, *${n}!*

How can I help you?
Please choose a section below 👇`,

        notFound:
`🔍 *Information not found*

Please choose a section from the menu or rephrase your question.`,

        badWord:
`⚠️ *Warning!*

Please communicate respectfully.
This bot is designed for polite conversation. 🙏`,

        back: '‹ Go back',
        menu: '≡  Main menu',
        callcenter: '☎  Call-Center',
        video: '▶  Video Tutorial',
        changeLang: '🌐  Change language',

        sections: {
            muddatlar:  '📅  Admission Dates',
            fanlar:     '📝  Exam Subjects',
            imtiyozlar: '🏆  IELTS Benefits',
            hujjatlar:  '📂  Documents',
            yonalishlar:'🏫  Study Tracks',
            aloqa:      '📍  Contacts',
        }
    }
};

// ──────────────────────────────────────────────
//  INLINE KEYBOARD YARATUVCHILAR
// ──────────────────────────────────────────────

/** Til tanlash keyboard */
const langKeyboard = () => ({
    inline_keyboard: [[
        { text: '🇺🇿  O\'zbekcha', callback_data: 'lang_uz' },
        { text: '🇷🇺  Русский',    callback_data: 'lang_ru' },
        { text: '🇬🇧  English',    callback_data: 'lang_en' },
    ]]
});

/** Asosiy menyu keyboard */
const mainMenu = (lang) => {
    const s = UI[lang].sections;
    const u = UI[lang];
    return {
        inline_keyboard: [
            [
                { text: s.muddatlar,   callback_data: `info_muddatlar_${lang}`   },
                { text: s.fanlar,      callback_data: `info_fanlar_${lang}`      },
            ],
            [
                { text: s.imtiyozlar,  callback_data: `info_imtiyozlar_${lang}`  },
                { text: s.hujjatlar,   callback_data: `info_hujjatlar_${lang}`   },
            ],
            [
                { text: s.yonalishlar, callback_data: `info_yonalishlar_${lang}` },
                { text: s.aloqa,       callback_data: `info_aloqa_${lang}`       },
            ],
            [
                { text: u.callcenter,  callback_data: `callcenter_${lang}`       },
                { text: u.video,       callback_data: `video_${lang}`            },
            ],
            [
                { text: u.changeLang,  callback_data: 'select_lang'              },
            ]
        ]
    };
};

/** Orqaga qaytish tugmasi */
const backBtn = (lang) => ({
    inline_keyboard: [[
        { text: UI[lang].back, callback_data: `menu_${lang}` },
        { text: UI[lang].menu, callback_data: `menu_${lang}` },
    ]]
});

// ──────────────────────────────────────────────
//  MA'LUMOTLAR BAZASI
// ──────────────────────────────────────────────
const DB = {
    uz: {
        muddatlar: {
            title: '📅  Qabul va Imtihon Muddatlari',
            body: `━━━━━━━━━━━━━━━━━━━━━━

🗓 *10 iyun — 10 iyul*
   ▸ Onlayn hujjat topshirish
     _(my.edu.uz | my.gov.uz)_

🗓 *15 iyul — 30 iyul*
   ▸ Kirish imtihonlari

🗓 *1 avgust — 15 avgust*
   ▸ Natijalar e'lon qilinishi

━━━━━━━━━━━━━━━━━━━━━━
✅ Barcha jarayonlar shaffof va adolatli tashkil etiladi.`
        },
        fanlar: {
            title: '📝  Imtihon Fanlari va Baholash',
            body: `━━━━━━━━━━━━━━━━━━━━━━

🔤 *Xorijiy filologiya:*
  • Chet tili         → maks. *62 ball*
  • Ona tili/Adabiyot → maks. *62 ball*
  • IQ / Mantiq       → maks. *22 ball*

📚 *Ijtimoiy-gumanitar:*
  • Huquq             → maks. *62 ball*
  • Chet tili         → maks. *62 ball*
  • IQ / Mantiq       → maks. *22 ball*

📐 *Aniq fanlar:*
  • Matematika        → maks. *62 ball*
  • Chet tili         → maks. *62 ball*
  • IQ / Mantiq       → maks. *22 ball*

━━━━━━━━━━━━━━━━━━━━━━
🏅 Jami maksimal: *146 ball*`
        },
        imtiyozlar: {
            title: '🏆  IELTS / CEFR Imtiyozlari',
            body: `━━━━━━━━━━━━━━━━━━━━━━

🥇 *Imtiyoz beruvchi sertifikatlar:*

🇬🇧 Ingliz  → IELTS ≥ 5.5  |  CEFR B1+
🇩🇪 Nemis   → Goethe B1, TestDaF
🇫🇷 Fransuz → DELF B1, TCF B1
🇹🇷 Turk    → Milliy sertifikat

━━━━━━━━━━━━━━━━━━━━━━
✨ Sertifikat egalariga chet tili imtihonidan _ozod etiladi_ va ularga *62 ball* avtomatik yoziladi.`
        },
        hujjatlar: {
            title: '📂  Kerakli Hujjatlar Ro\'yxati',
            body: `━━━━━━━━━━━━━━━━━━━━━━

📌 *Topshirish:* my.edu.uz | my.gov.uz

1️⃣  9-sinf bitiruv *attestati*
2️⃣  Tug'ilganlik *guvohnomasi* yoki ID-karta
3️⃣  *3.5×4.5 sm* rangli rasm (oq fon)
4️⃣  *Imtiyoz hujjati* (IELTS/CEFR bo'lsa)

━━━━━━━━━━━━━━━━━━━━━━
🔒 Shaxsiy ma'lumotlar O'zbekiston qonunlariga muvofiq himoyalangan.`
        },
        yonalishlar: {
            title: '🏫  Ta\'lim Yo\'nalishlari',
            body: `━━━━━━━━━━━━━━━━━━━━━━

🔤 *1 · Xorijiy filologiya*
   Ingliz, Nemis, Fransuz, Turk, Arab tillari

📐 *2 · Aniq fanlar*
   Matematika, Fizika, Informatika, Kimyo

📚 *3 · Ijtimoiy-gumanitar*
   Tarix, Huquqshunoslik, Adabiyot

━━━━━━━━━━━━━━━━━━━━━━
🎯 Bitiruvchilar nufuzli universitetlarga kirish uchun tayyorlanadi.`
        },
        aloqa: {
            title: '📍  Aloqa va Manzil',
            body: `━━━━━━━━━━━━━━━━━━━━━━

📍 *Manzil:*
   Toshkent, Chilonzor, Muqimiy 104

━━━━━━━━━━━━━━━━━━━━━━
📞 *Qabul komissiyasi:*
   +998 90 943-28-71
   +998 97 441-03-66
   +998 90 971-06-90

📞 *Mas'ul xodimlar:*
   +998 90 134-56-76
   +998 90 944-09-05
   +998 93 370-08-01
   +998 93 738-18-31

━━━━━━━━━━━━━━━━━━━━━━
✈️  Telegram: @aluzswlu\\_uz
📸  Instagram: aluzswlu\\_official
🗺  [Google Maps](https://google.com/maps?q=41.287263,69.231516)`
        }
    },
    ru: {
        muddatlar: {
            title: '📅  Сроки приёма и экзаменов',
            body: `━━━━━━━━━━━━━━━━━━━━━━

🗓 *10 июня — 10 июля*
   ▸ Онлайн-подача документов
     _(my.edu.uz | my.gov.uz)_

🗓 *15 июля — 30 июля*
   ▸ Вступительные экзамены

🗓 *1 августа — 15 августа*
   ▸ Объявление результатов

━━━━━━━━━━━━━━━━━━━━━━
✅ Все процессы организованы прозрачно и справедливо.`
        },
        fanlar: {
            title: '📝  Предметы и оценивание',
            body: `━━━━━━━━━━━━━━━━━━━━━━

🔤 *Иностранная филология:*
  • Иностранный язык   → макс. *62 балла*
  • Родной язык/лит.   → макс. *62 балла*
  • IQ / Логика        → макс. *22 балла*

📚 *Социально-гуманитарное:*
  • Право              → макс. *62 балла*
  • Иностранный язык   → макс. *62 балла*
  • IQ / Логика        → макс. *22 балла*

📐 *Точные науки:*
  • Математика         → макс. *62 балла*
  • Иностранный язык   → макс. *62 балла*
  • IQ / Логика        → макс. *22 балла*

━━━━━━━━━━━━━━━━━━━━━━
🏅 Максимум: *146 баллов*`
        },
        imtiyozlar: {
            title: '🏆  Льготы IELTS / CEFR',
            body: `━━━━━━━━━━━━━━━━━━━━━━

🥇 *Льготные сертификаты:*

🇬🇧 Английский → IELTS ≥ 5.5  |  CEFR B1+
🇩🇪 Немецкий   → Goethe B1, TestDaF
🇫🇷 Французский→ DELF B1, TCF B1
🇹🇷 Турецкий   → национальный серт.

━━━━━━━━━━━━━━━━━━━━━━
✨ Обладатели освобождаются от экзамена по ин. языку и получают *62 балла* автоматически.`
        },
        hujjatlar: {
            title: '📂  Необходимые документы',
            body: `━━━━━━━━━━━━━━━━━━━━━━

📌 *Подача:* my.edu.uz | my.gov.uz

1️⃣  *Аттестат* об окончании 9 класса
2️⃣  *Свидетельство* о рождении или ID
3️⃣  Цветное фото *3.5×4.5 см* (белый фон)
4️⃣  *Льготный документ* (IELTS/CEFR)

━━━━━━━━━━━━━━━━━━━━━━
🔒 Данные защищены законодательством РУз.`
        },
        yonalishlar: {
            title: '🏫  Направления обучения',
            body: `━━━━━━━━━━━━━━━━━━━━━━

🔤 *1 · Иностранная филология*
   Английский, Немецкий, Французский, Турецкий, Арабский

📐 *2 · Точные науки*
   Математика, Физика, Информатика, Химия

📚 *3 · Социально-гуманитарное*
   История, Правоведение, Литература

━━━━━━━━━━━━━━━━━━━━━━
🎯 Выпускники поступают в ведущие университеты страны.`
        },
        aloqa: {
            title: '📍  Контакты и адрес',
            body: `━━━━━━━━━━━━━━━━━━━━━━

📍 *Адрес:*
   Ташкент, Чиланзар, ул. Мукимий, 104

━━━━━━━━━━━━━━━━━━━━━━
📞 *Приёмная комиссия:*
   +998 90 943-28-71
   +998 97 441-03-66
   +998 90 971-06-90

📞 *Ответственные:*
   +998 90 134-56-76
   +998 90 944-09-05
   +998 93 370-08-01
   +998 93 738-18-31

━━━━━━━━━━━━━━━━━━━━━━
✈️  Telegram: @aluzswlu\\_uz
📸  Instagram: aluzswlu\\_official
🗺  [Google Maps](https://google.com/maps?q=41.287263,69.231516)`
        }
    },
    en: {
        muddatlar: {
            title: '📅  Admission & Exam Dates',
            body: `━━━━━━━━━━━━━━━━━━━━━━

🗓 *June 10 — July 10*
   ▸ Online document submission
     _(my.edu.uz | my.gov.uz)_

🗓 *July 15 — July 30*
   ▸ Entrance examinations

🗓 *August 1 — August 15*
   ▸ Results announcement

━━━━━━━━━━━━━━━━━━━━━━
✅ All processes are transparent and fair.`
        },
        fanlar: {
            title: '📝  Exam Subjects & Scoring',
            body: `━━━━━━━━━━━━━━━━━━━━━━

🔤 *Foreign Philology:*
  • Foreign Language   → max. *62 pts*
  • Native Lang./Lit.  → max. *62 pts*
  • IQ / Logic         → max. *22 pts*

📚 *Social-Humanitarian:*
  • Law                → max. *62 pts*
  • Foreign Language   → max. *62 pts*
  • IQ / Logic         → max. *22 pts*

📐 *Exact Sciences:*
  • Mathematics        → max. *62 pts*
  • Foreign Language   → max. *62 pts*
  • IQ / Logic         → max. *22 pts*

━━━━━━━━━━━━━━━━━━━━━━
🏅 Maximum total: *146 points*`
        },
        imtiyozlar: {
            title: '🏆  IELTS / CEFR Benefits',
            body: `━━━━━━━━━━━━━━━━━━━━━━

🥇 *Qualifying certificates:*

🇬🇧 English → IELTS ≥ 5.5  |  CEFR B1+
🇩🇪 German  → Goethe B1, TestDaF
🇫🇷 French  → DELF B1, TCF B1
🇹🇷 Turkish → national cert.

━━━━━━━━━━━━━━━━━━━━━━
✨ Holders are _exempt_ from the foreign language exam and receive *62 points* automatically.`
        },
        hujjatlar: {
            title: '📂  Required Documents',
            body: `━━━━━━━━━━━━━━━━━━━━━━

📌 *Submit via:* my.edu.uz | my.gov.uz

1️⃣  Grade 9 graduation *certificate*
2️⃣  *Birth certificate* or ID card copy
3️⃣  Colour photo *3.5×4.5 cm* (white bg)
4️⃣  *Privilege doc* (if IELTS/CEFR)

━━━━━━━━━━━━━━━━━━━━━━
🔒 Personal data is protected under RUz law.`
        },
        yonalishlar: {
            title: '🏫  Study Tracks',
            body: `━━━━━━━━━━━━━━━━━━━━━━

🔤 *1 · Foreign Philology*
   English, German, French, Turkish, Arabic

📐 *2 · Exact Sciences*
   Mathematics, Physics, IT, Chemistry

📚 *3 · Social-Humanitarian*
   History, Law, Literature

━━━━━━━━━━━━━━━━━━━━━━
🎯 Graduates are prepared for leading universities.`
        },
        aloqa: {
            title: '📍  Contacts & Address',
            body: `━━━━━━━━━━━━━━━━━━━━━━

📍 *Address:*
   Tashkent, Chilanzar, Mukimiy 104

━━━━━━━━━━━━━━━━━━━━━━
📞 *Admission committee:*
   +998 90 943-28-71
   +998 97 441-03-66
   +998 90 971-06-90

📞 *Officers:*
   +998 90 134-56-76
   +998 90 944-09-05
   +998 93 370-08-01
   +998 93 738-18-31

━━━━━━━━━━━━━━━━━━━━━━
✈️  Telegram: @aluzswlu\\_uz
📸  Instagram: aluzswlu\\_official
🗺  [Google Maps](https://google.com/maps?q=41.287263,69.231516)`
        }
    }
};

// ──────────────────────────────────────────────
//  KALIT SO'Z BO'YICHA QIDIRISH
// ──────────────────────────────────────────────
const KEYWORDS = {
    uz: {
        muddatlar:   ['muddat','sana','qachon','vaqt','iyun','iyul','avgust','boshlanish','qabul'],
        fanlar:      ['fan','imtihon','ball','test','matematika','ingliz','chet tili','baholash'],
        imtiyozlar:  ['imtiyoz','ielts','cefr','sertifikat','ozod','b1','b2'],
        hujjatlar:   ['hujjat','attestat','shahodatnoma','rasm','pasport','guvohnoma','onlayn'],
        yonalishlar: ['yonalish','mutaxassislik','qaysi','tillar','filologiya','gumanitar'],
        aloqa:       ['aloqa','manzil','telefon','lokatsiya','telegram','instagram','chilonzor'],
    },
    ru: {
        muddatlar:   ['срок','дата','когда','июнь','июль','август','приём'],
        fanlar:      ['предмет','экзамен','балл','тест','математика','язык','оценка'],
        imtiyozlar:  ['льгота','ielts','cefr','сертификат','освобождение','b1','b2'],
        hujjatlar:   ['документ','аттестат','свидетельство','фото','паспорт','онлайн'],
        yonalishlar: ['направление','специальность','какое','языки','филология','гуманитарный'],
        aloqa:       ['контакт','адрес','телефон','локация','telegram','instagram'],
    },
    en: {
        muddatlar:   ['deadline','date','when','june','july','august','admission'],
        fanlar:      ['subject','exam','score','test','math','language','grade'],
        imtiyozlar:  ['benefit','ielts','cefr','certificate','exempt','b1','b2'],
        hujjatlar:   ['document','certificate','photo','passport','online','apply'],
        yonalishlar: ['track','major','which','languages','philology','humanities'],
        aloqa:       ['contact','address','phone','location','telegram','instagram'],
    }
};

function findCategory(text, lang) {
    const q = text.toLowerCase();
    let best = null, max = 0;
    for (const [key, kws] of Object.entries(KEYWORDS[lang])) {
        const matches = kws.filter(kw => q.includes(kw)).length;
        if (matches > max) { max = matches; best = key; }
    }
    return max > 0 ? best : null;
}

// ──────────────────────────────────────────────
//  XABAR YUBORUVCHI FUNKSIYALAR
// ──────────────────────────────────────────────
function sendWelcome(chatId, name, lang) {
    const path = require('path');
    const photo = path.join(__dirname, 'welcome.jpg');
    const text  = UI[lang].welcome(name);

    bot.sendPhoto(chatId, photo, {
        caption: text,
        parse_mode: 'Markdown',
        reply_markup: mainMenu(lang)
    }).catch(() => {
        bot.sendMessage(chatId, text, {
            parse_mode: 'Markdown',
            reply_markup: mainMenu(lang)
        });
    });
}

function sendInfo(chatId, key, lang) {
    const d = DB[lang][key];
    const msg = `*${d.title}*\n${d.body}`;
    bot.sendMessage(chatId, msg, {
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
        reply_markup: backBtn(lang)
    });
}

function sendCallCenter(chatId, lang) {
    const path = require('path');
    const photo = path.join(__dirname, 'call_center.jpg');

    const texts = {
        uz: `📞 *Call-Center — O'zDJTU Akademik Litseyi*\n\n━━━━━━━━━━━━━━━━━━━━━━\n👤 *Yunusova Shahlo* — +998 90 943-28-71\n👤 *Yadgarov Alisher* — +998 97 441-03-66\n👤 *Dustboboyev Aziz* — +998 90 971-06-90\n👤 *Mirkomilova Muxlisa* — +998 94 685-60-75\n━━━━━━━━━━━━━━━━━━━━━━\n👤 Zohidova Muxlisa — +998 90 944-09-05\n👤 Saydaliyeva Jumagul — +998 88 038-44-99\n👤 Ubaydullayeva Sabina — +998 93 370-08-01\n👤 Davlyatova Marjona — +998 93 738-18-31\n👤 Hamidullayev Bobur — +998 90 134-56-76`,
        ru: `📞 *Call-Center — Академический лицей УЗГМИИЯ*\n\n━━━━━━━━━━━━━━━━━━━━━━\n👤 *Юнусова Шахло* — +998 90 943-28-71\n👤 *Ядгаров Алишер* — +998 97 441-03-66\n👤 *Дустбобоев Азиз* — +998 90 971-06-90\n👤 *Миркомилова Мухлиса* — +998 94 685-60-75\n━━━━━━━━━━━━━━━━━━━━━━\n👤 Зохидова Мухлиса — +998 90 944-09-05\n👤 Сайдалиева Жумагул — +998 88 038-44-99\n👤 Убайдуллаева Сабина — +998 93 370-08-01\n👤 Давлятова Маржона — +998 93 738-18-31\n👤 Хамидуллаев Бобур — +998 90 134-56-76`,
        en: `📞 *Call-Center — UZSWLU Academic Lyceum*\n\n━━━━━━━━━━━━━━━━━━━━━━\n👤 *Yunusova Shahlo* — +998 90 943-28-71\n👤 *Yadgarov Alisher* — +998 97 441-03-66\n👤 *Dustboboyev Aziz* — +998 90 971-06-90\n👤 *Mirkomilova Mukhlisa* — +998 94 685-60-75\n━━━━━━━━━━━━━━━━━━━━━━\n👤 Zohidova Mukhlisa — +998 90 944-09-05\n👤 Saydaliyeva Jumagul — +998 88 038-44-99\n👤 Ubaydullayeva Sabina — +998 93 370-08-01\n👤 Davlyatova Marjona — +998 93 738-18-31\n👤 Hamidullayev Bobur — +998 90 134-56-76`,
    };

    bot.sendPhoto(chatId, photo, {
        caption: texts[lang],
        parse_mode: 'Markdown',
        reply_markup: backBtn(lang)
    }).catch(() => {
        bot.sendMessage(chatId, texts[lang], {
            parse_mode: 'Markdown',
            reply_markup: backBtn(lang)
        });
    });
}

function sendVideo(chatId, lang) {
    const texts = {
        uz: `🎬 *Ro'yxatdan o'tish — Video qo'llanma*\n\n━━━━━━━━━━━━━━━━━━━━━━\n\nQuyidagi videoda litseyga hujjat topshirish jarayoni *bosqichma-bosqich* tushuntirilgan:\n\n👉 [YouTube'da ko'rish](https://youtu.be/K_HfbjFgjCM?si=1cJSa2bv94Rp2KPE)\n\n━━━━━━━━━━━━━━━━━━━━━━\nSavollar bo'lsa, istalgan bo'limni tanlang 👇`,
        ru: `🎬 *Видео-инструкция по регистрации*\n\n━━━━━━━━━━━━━━━━━━━━━━\n\nВ видео ниже *пошагово* объясняется процесс подачи документов в лицей:\n\n👉 [Смотреть на YouTube](https://youtu.be/K_HfbjFgjCM?si=1cJSa2bv94Rp2KPE)\n\n━━━━━━━━━━━━━━━━━━━━━━\nЕсть вопросы? Выберите раздел ниже 👇`,
        en: `🎬 *Video Tutorial — How to Apply*\n\n━━━━━━━━━━━━━━━━━━━━━━\n\nWatch the *step-by-step* guide on how to submit documents to the lyceum:\n\n👉 [Watch on YouTube](https://youtu.be/K_HfbjFgjCM?si=1cJSa2bv94Rp2KPE)\n\n━━━━━━━━━━━━━━━━━━━━━━\nHave questions? Choose a section below 👇`,
    };

    bot.sendMessage(chatId, texts[lang], {
        parse_mode: 'Markdown',
        disable_web_page_preview: false,
        reply_markup: backBtn(lang)
    });
}

// ──────────────────────────────────────────────
//  /start BUYRUG'I
// ──────────────────────────────────────────────
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId,
        `🌐 *Tilni tanlang · Выберите язык · Choose language*`,
        { parse_mode: 'Markdown', reply_markup: langKeyboard() }
    );
});

// ──────────────────────────────────────────────
//  /lang BUYRUG'I
// ──────────────────────────────────────────────
bot.onText(/\/lang/, (msg) => {
    bot.sendMessage(msg.chat.id,
        `🌐 *Tilni tanlang · Выберите язык · Choose language*`,
        { parse_mode: 'Markdown', reply_markup: langKeyboard() }
    );
});

// ──────────────────────────────────────────────
//  INLINE BUTTON CALLBACK HANDLERI
// ──────────────────────────────────────────────
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const msgId  = query.message.message_id;
    const data   = query.data;
    const name   = query.from.first_name || 'Foydalanuvchi';

    // "Javob olindi" signali (doira to'xtaydi)
    bot.answerCallbackQuery(query.id);

    // ── Til tanlash ──
    if (data.startsWith('lang_')) {
        const lang = data.split('_')[1];
        userLang[chatId] = lang;
        bot.deleteMessage(chatId, msgId).catch(() => {});
        return sendWelcome(chatId, name, lang);
    }

    // ── Til o'zgartirish ──
    if (data === 'select_lang') {
        bot.editMessageText(
            `🌐 *Tilni tanlang · Выберите язык · Choose language*`,
            { chat_id: chatId, message_id: msgId, parse_mode: 'Markdown',
              reply_markup: langKeyboard() }
        ).catch(() => {
            bot.sendMessage(chatId,
                `🌐 *Tilni tanlang · Выберите язык · Choose language*`,
                { parse_mode: 'Markdown', reply_markup: langKeyboard() }
            );
        });
        return;
    }

    // ── Bosh menyuga qaytish ──
    if (data.startsWith('menu_')) {
        const lang = data.split('_')[1];
        userLang[chatId] = lang;
        bot.deleteMessage(chatId, msgId).catch(() => {});
        return sendWelcome(chatId, name, lang);
    }

    // ── Ma'lumot bo'limlari ──
    if (data.startsWith('info_')) {
        const parts = data.split('_'); // info_muddatlar_uz
        const key   = parts[1];
        const lang  = parts[2];
        userLang[chatId] = lang;
        bot.deleteMessage(chatId, msgId).catch(() => {});
        return sendInfo(chatId, key, lang);
    }

    // ── Call-Center ──
    if (data.startsWith('callcenter_')) {
        const lang = data.split('_')[1];
        userLang[chatId] = lang;
        bot.deleteMessage(chatId, msgId).catch(() => {});
        return sendCallCenter(chatId, lang);
    }

    // ── Video qo'llanma ──
    if (data.startsWith('video_')) {
        const lang = data.split('_')[1];
        userLang[chatId] = lang;
        bot.deleteMessage(chatId, msgId).catch(() => {});
        return sendVideo(chatId, lang);
    }
});

// ──────────────────────────────────────────────
//  ERKIN MATN HANDLERI
// ──────────────────────────────────────────────
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text   = msg.text;
    const name   = msg.from.first_name || 'Foydalanuvchi';

    if (!text || text.startsWith('/')) return;

    // Yomon so'z filtri
    if (hasBadWord(text)) {
        const lang = getLang(chatId);
        return bot.sendMessage(chatId, UI[lang].badWord, {
            parse_mode: 'Markdown',
            reply_markup: mainMenu(lang)
        });
    }

    const lang = getLang(chatId);

    // Salomlashish
    if (isGreeting(text)) {
        return bot.sendMessage(chatId, UI[lang].greeting(name), {
            parse_mode: 'Markdown',
            reply_markup: mainMenu(lang)
        });
    }

    // Kalit so'z bo'yicha qidirish
    const cat = findCategory(text, lang);
    if (cat) {
        return sendInfo(chatId, cat, lang);
    }

    // Topilmadi
    bot.sendMessage(chatId, UI[lang].notFound, {
        parse_mode: 'Markdown',
        reply_markup: mainMenu(lang)
    });
});

// ──────────────────────────────────────────────
//  RENDER.COM HEALTH-CHECK SERVER
// ──────────────────────────────────────────────
const http = require('http');
const PORT = process.env.PORT || 3000;
http.createServer((_, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("O'zDJTU Lyceum Bot — Running\n");
}).listen(PORT, () => console.log(`Server: ${PORT}`));

console.log("🚀 O'zDJTU Premium Bot (Inline UI) ishga tushdi...");
