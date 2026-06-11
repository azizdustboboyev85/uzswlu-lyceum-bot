/**
 * O'zDJTU Akademik Litseyi Axborot Bot-Assistenti (Telegram Bot)
 * 
 * Ushbu script node-telegram-bot-api kutubxonasi yordamida ishlaydi.
 * Ishga tushirish yo'riqnomasi quyida keltirilgan.
 */

const TelegramBot = require('node-telegram-bot-api');
const http = require('http');

// ⚠️ Telegram @BotFather dan olingan Token:
const TOKEN = process.env.TELEGRAM_TOKEN || '8706273830:AAHEF7__G3jMabnGlTK1BAQGw6hLIzj58fo';
const PORT = process.env.PORT || 3000;

let bot;
if (process.env.PORT) {
    // Render.com bepul hostingida ishlaydigan Webhook rejimi
    bot = new TelegramBot(TOKEN);
    bot.setWebHook(`https://uzswlu-lyceum-bot.onrender.com/bot${TOKEN}`);
    
    // HTTP Server: Ham Render Health Check, ham Telegram Webhook'larni qabul qiladi
    const server = http.createServer((req, res) => {
        if (req.method === 'POST' && req.url === `/bot${TOKEN}`) {
            let body = '';
            req.on('data', chunk => { body += chunk.toString(); });
            req.on('end', () => {
                try {
                    const update = JSON.parse(body);
                    bot.processUpdate(update);
                } catch (e) {
                    console.error('Webhook error parsing:', e);
                }
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('OK');
            });
        } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('O\'zDJTU Lyceum Telegram Bot is running!\n');
        }
    });
    server.listen(PORT, () => {
        console.log(`Server port: ${PORT}`);
    });
} else {
    // Lokal kompyuter uchun oddiy Polling rejimi
    bot = new TelegramBot(TOKEN, { polling: true });
}

// Axborot ma'lumotlar bazasi (Markdown formatida)
const INFO_DATABASE = {
    muddatlar: {
        title: "📅 Qabul va imtihon muddatlari",
        keywords: ["muddat", "sana", "qachon", "vaqt", "boshlanadi", "tugaydi", "iyun", "iyul", "avgust"],
        content: `*O'zbekiston davlat jahon tillari universiteti akademik litseyiga 2026/2027 o'quv yili uchun muhim muddatlar:*

📅 *Muhim sanalar:*

• *10-iyundan 10-iyulgacha* — Hujjatlarni onlayn qabul qilish davri (my.edu.uz yoki my.gov.uz).

• *15-iyuldan 30-iyulgacha* — Kirish imtihonlari o'tkaziladi.

• *1-avgustdan 15-avgustgacha* — Imtihon natijalari (mandat) e'lon qilinadi.

Barcha jarayonlar to'liq shaffof va adolatli tarzda tashkil etiladi.`
    },
    fanlar: {
        title: "📝 Imtihon fanlari va baholash",
        keywords: ["fan", "imtihon", "savol", "ball", "baholash", "test", "ijodiy", "tarix", "ona tili", "adabiyot", "ingliz tili", "nemisi", "fransuz"],
        content: `*Kirish imtihon fanlari va baholash mezonlari:*

🔤 *Xorijiy filologiya yo'nalishida:*

• *Chet tili (testlar soni - 20ta):* Maksimal 62 ball.
• *Ona tili va adabiyot (testlar soni - 20ta):* Maksimal 62 ball.
* IQ-mantiqiy fikrlash (testlar soni - 20ta):* Maksimal 22 ball.


📚 *Ijtimoiy-gumanitar yo'nalishda:*

• *Huquq (testlar soni - 20ta):* Maksimal 62 ball.
• *Chet tili (testlar soni - 20ta):* Maksimal 62 ball.
* IQ-mantiqiy fikrlash (testlar soni - 20ta):* Maksimal 22 ball.


📚 *Aniq fanlar yo'nalishda:*

• *Matematika (testlar soni - 20ta):* Maksimal 62 ball.
• *Chet tili (testlar soni - 20ta):* Maksimal 62 ball.
* IQ-mantiqiy fikrlash (testlar soni - 20ta):* Maksimal 22 ball.

Jami to'plash mumkin bo'lgan eng yuqori ko'rsatkich *146 ball*ni tashkil etadi.`
    },
    imtiyozlar: {
        title: "🏆 Imtiyozlar va Til sertifikatlari",
        keywords: ["imtiyoz", "ielts", "cefr", "sertifikat", "ball berish", "ozod", "prezident maktabi", "olimpiada", "b1", "b2"],
        content: `*Chet tili sertifikatiga ega bo'lgan arizachilar uchun imtiyozlar:*

🥇 *Imtiyoz beruvchi sertifikatlar:*

• *Ingliz tili:* IELTS (kamida 5.5) yoki milliy CEFR B1 va undan yuqori.
• *Nemis tili:* Goethe-Zertifikat B1, TestDaF va h.k.
• *Fransuz tili:* DELF B1, TCF B1 va h.k.
• *Turk tili:* milliy sertifikatlari.

Ushbu sertifikatlarga ega arizachilar chet tili imtihonidan ozod etiladi va ularga chet tili fanidan *maksimal ball (62 ball)* kafolatlangan holda yoziladi.`
    },
    hujjatlar: {
        title: "📂 Kerakli hujjatlar ro'yxati",
        keywords: ["hujjat", "topshirish", "attestat", "shahodatnoma", "rasm", "id karta", "pasport", "guvohnoma", "sayt", "onlayn"],
        content: `*Hujjatlar onlayn platforma (my.edu.uz yoki my.gov.uz) orqali topshiriladi.*

📋 *Kerakli hujjatlar elektron formatda:*

1️⃣ *9-sinf bitiruv attestati* (shahodatnoma).
2️⃣ *Tug'ilganlik haqida guvohnoma* yoki ID-karta nusxasi.
3️⃣ *3,5x4,5 o'lchamdagi rangli rasm* (oq fonda).
4️⃣ *Imtiyoz hujjati* (agar IELTS, CEFR yoki boshqa til sertifikatlari bo'lsa).

🔒 *Xavfsizlik:* Shaxsiy ma'lumotlaringiz xavfsizligi O'zbekiston Respublikasining "Shaxsga doir ma'lumotlar to'g'risida"gi qonuniga muvofiq to'liq himoyalangan.`
    },
    yonalishlar: {
        title: "🏫 Ta'lim yo'nalishlari",
        keywords: ["yonalish", "mutaxassislik", "qaysi", "tillar", "ingliz", "nemis", "fransuz", "koreys", "xitoy", "gumanitar", "tarix"],
        content: `*O'zbekiston Davlat Jahon Tillari Universiteti Akademik litseyidagi ta'lim yo'nalishlari:*

🔤 *1. Xorijiy filologiya yo'nalishi:*
Chet tillari (Ingliz, Nemis, Fransuz, Turk va Arab tillari) chuqurlashtirilib o‘qitiladi. Bitiruvchilar asosan nufuzli tillar universitetlariga kirishga tayyorlanadi.


🔤 *2. Aniq fanlar yo'nalishi:*
Matematika, Fizika, Informatika va tabiiy fanlar (kimyo, biologiya) chuqurlashtirilib o‘qitiladi. Bitiruvchilar asosan texnik va tabiiy fanlar yo'nalishlariga kirishga tayyorlanadi.


📚 *3. Ijtimoiy-gumanitar yo'nalish:*
Tarix, huquqshunoslik va adabiyot fanlariga qiziquvchilar uchun. Bitiruvchilar yuridik, tarix, va jurnalistika sohalariga yo‘naltiriladi.`
    },
    aloqa: {
        title: "📞 Biz bilan bog'lanish va Manzil",
        keywords: ["aloqa", "manzil", "telefon", "lokatsiya", "xarita", "ishonch", "telegram", "sayt", "chilonzor", "g9", "qayerda"],
        content: `*Aloqa ma'lumotlari va manzilimiz:*

📍 *Manzil:* Toshkent shahar, Chilonzor tumani, Muqimiy ko'chasi, 104.

📞 *Qabul komissiyasi:* +998 (90) 943-28-71,
                                 +998 (97) 441-03-66, 
                                 +998 (90) 971-06-90

📞 *Qabul mas'ullari:* +998 (90) 134-56-76, 
                                 +998 (90) 944-09-05, 
                                 +998 (93) 370-08-01, 
                                 +998 (93) 738-18-31

✈️ *Telegram kanal:* @aluzswlu\_uz

📸 *Instagram:* instagram.com/aluzswlu\_official

📍 *Google Xarita:* [Lokatsiyamiz](https://google.com/maps?q=41.287263,69.231516&ll=41.287263,69.231516&z=16)`
    }
};

// Telegram tugmalari (Keyboard Layout)
const KEYBOARD_MARKUP = {
    reply_markup: {
        keyboard: [
            [{ text: "📅 Qabul muddatlari" }, { text: "📝 Imtihon fanlari" }],
            [{ text: "🏆 IELTS imtiyozlari" }, { text: "📂 Kerakli hujjatlar" }],
            [{ text: "🏫 Ta'lim yo'nalishlari" }, { text: "📞 Aloqa va Manzil" }],
            [{ text: "📞 Call-Center" }]
        ],
        resize_keyboard: true
    }
};

// Bot ishga tushgandagi xabar
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const name = msg.from.first_name || "Foydalanuvchi";
    const path = require('path');
    const welcomePhotoPath = path.join(__dirname, 'welcome.jpg');

    const welcomeMessage = `Assalomu alaykum, ${name}! O'zbekiston Davlat Jahon Tillari Universiteti akademik litseyining rasmiy *Axborot-ma'lumot botiga* xush kelibsiz! 🤖🎓\n\n` +
        `Men sizga litseyimizga 2026/2027 o'quv yili qabul jarayonlari bilan bog'liq savollaringizga tezkor javob beraman.\n\n` +
        `👇 Quyidagi tugmalardan birini bosing yoki o'zingizni qiziqtirgan savolni yozib yuboring (masalan: "ielts ballari"):`;

    bot.sendPhoto(chatId, welcomePhotoPath, {
        caption: welcomeMessage,
        parse_mode: 'Markdown',
        ...KEYBOARD_MARKUP
    }).catch(err => {
        // Rasm topilmasa faqat matn yuborish
        bot.sendMessage(chatId, welcomeMessage, { 
            parse_mode: 'Markdown', 
            ...KEYBOARD_MARKUP 
        });
    });
});

// Xabarlarni qabul qilish va izlash mantiqi
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    // Agar buyruq start bo'lsa yoki matn bo'lmasa qaytib ketadi
    if (!text || text.startsWith('/')) return;

    // Tugmalar bosilganda to'g'ridan-to'g'ri mos javobni qaytarish
    if (text === "📅 Qabul muddatlari") {
        return sendInfo(chatId, 'muddatlar');
    } else if (text === "📝 Imtihon fanlari") {
        return sendInfo(chatId, 'fanlar');
    } else if (text === "🏆 IELTS imtiyozlari") {
        return sendInfo(chatId, 'imtiyozlar');
    } else if (text === "📂 Kerakli hujjatlar") {
        return sendInfo(chatId, 'hujjatlar');
    } else if (text === "🏫 Ta'lim yo'nalishlari") {
        return sendInfo(chatId, 'yonalishlar');
    } else if (text === "📞 Aloqa va Manzil") {
        return sendInfo(chatId, 'aloqa');
    } else if (text === "📞 Call-Center") {
        const path = require('path');
        const photoPath = path.join(__dirname, 'call_center.jpg');
        
        bot.sendPhoto(chatId, photoPath, {
            caption: "📞 *O'zDJTU Akademik Litseyi Call-Center (Aloqa markazi) ma'lumotlari*",
            parse_mode: 'Markdown',
            ...KEYBOARD_MARKUP
        }).catch(err => {
            // Rasm topilmaganda yoki xatolik bo'lganda matnli fallback
            bot.sendMessage(chatId, 
                `*📞 O'zDJTU Akademik Litseyi Call-Center:*\n\n` +
                `• *Yunusova Shahlo:* +998 (90) 943-28-71\n` +
                `• *Yadgarov Alisher:* +998 (97) 441-03-66\n` +
                `• *Dustboboyev Aziz:* +998 (90) 971-06-90\n` +
                `• *Mirkomilova Muxlisa:* +998 (94) 685-60-75\n\n` +
                `*Boshqa mas'ul xodimlar:*\n` +
                `• Zohidova Muxlisa: +998 (90) 944-09-05\n` +
                `• Saydaliyeva Jumagul: +998 (88) 038-44-99\n` +
                `• Ubaydullayeva Sabina: +998 (93) 370-08-01\n` +
                `• Davlyatova Marjona: +998 (93) 738-18-31\n` +
                `• Hamidullayev Bobur: +998 (90) 134-56-76`,
                { parse_mode: 'Markdown', ...KEYBOARD_MARKUP }
            );
        });
        return;
    }

    // Erkin yozilgan savolni kalit so'zlar bo'yicha qidirish
    const query = text.toLowerCase();
    let bestMatchKey = null;
    let maxMatches = 0;

    for (let key in INFO_DATABASE) {
        let matches = 0;
        const keywords = INFO_DATABASE[key].keywords;

        keywords.forEach(kw => {
            if (query.includes(kw)) {
                matches++;
            }
        });

        if (matches > maxMatches) {
            maxMatches = matches;
            bestMatchKey = key;
        }
    }

    if (bestMatchKey && maxMatches > 0) {
        sendInfo(chatId, bestMatchKey);
    } else {
        bot.sendMessage(chatId,
            `Kechirasiz, ushbu so'rov bo'yicha aniq ma'lumot topa olmadim. 😕\n\n` +
            `Iltimos, pastdagi tugmalardan birini bosing yoki savolni boshqacharoq yozib ko'ring (masalan: "imtihonlar qachon", "IELTS imtiyozi", "hujjatlar").`,
            KEYBOARD_MARKUP
        );
    }
});

// Ma'lumot yuborish yordamchi funksiyasi
function sendInfo(chatId, categoryKey) {
    const data = INFO_DATABASE[categoryKey];
    if (data) {
        bot.sendMessage(chatId, `*${data.title}*\n\n${data.content}`, {
            parse_mode: 'Markdown',
            ...KEYBOARD_MARKUP
        });
    }
}

// Botingiz muvaffaqiyatli ishga tushganini bildirish
console.log("O'zDJTU Lyceum Telegram Bot ishga tushirildi...");

console.log("O'zDJTU Lyceum Telegram Bot muvaffaqiyatli ishga tushdi...");
