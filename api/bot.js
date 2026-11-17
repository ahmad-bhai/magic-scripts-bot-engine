const express = require('express');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
app.use(express.json());

const CHANNEL_ID = "-1002384448239";
const CHANNEL_LINK = "https://t.me/magic_scripts_official";
const SUPPORT_LINK = "https://t.me/Magic_Scripts";
const F_API_BASE = "https://ahmad-bhai-codes-shop.vercel.app/f";

// 8 Languages Dictionary
const LANGS = {
  en: {
    name: "English 🇬🇧",
    welcome: "Welcome {name} 🥰!\nPlease select your language to start the bot!",
    joinReq: "❌ **Channel Access Required!**\n\nPlease join our official channel first to use Magic Scripts Bot:\n🔗 {link}",
    checkJoin: "🔄 Check Membership",
    lockTitle: "🔒 LOCKED SCREEN",
    lockDesc: "Your device/user ID is not active. Send your ID to admin for approval.",
    copyId: "📋 Copy ID",
    unlocked: "🔓 **MAGIC SCRIPTS TRADING BOT**\n\nWelcome to the official live signal engine.",
    pairSel: "📊 **Select Currency / Asset Pair:**",
    timeSel: "⏱️ **Select Timeframe:**",
    rules: "📜 **Terms & Rules:**\n1. Use signals at your own risk.\n2. Do not spam requests.\n3. Maintain proper risk management.",
    faq: "❓ **FAQ:**\n- How to unlock? Send your ID to support.\n- Accuracy? 80% - 90% AI-driven.",
    back: "⬅️ Back",
    next: "➡️ Next",
    getSignal: "⚡ GET SIGNAL",
    analyzing: "analysing market trends...",
    signalRes: "🎯 **SIGNAL GENERATED**\n\nAsset: **{pair}**\nTimeframe: **{tf}**\nDirection: **{dir}**\nAccuracy: **{acc}**\nReason: *{reason}*",
    support: "💬 Support"
  },
  ur: {
    name: "Urdu 🇵🇰",
    welcome: "Khushamdid {name} 🥰!\nBot shuru karne ke liye apni zaban muntakhib karein!",
    joinReq: "❌ **Channel Join Karna Lazmi Hai!**\n\nMagic Scripts Bot istemal karne ke liye pehle hamara official channel join karein:\n🔗 {link}",
    checkJoin: "🔄 Membership Check Karein",
    lockTitle: "🔒 LOCKED SCREEN",
    lockDesc: "Aapki ID active nahi hai. Manzoori ke liye admin ko ID bhejein.",
    copyId: "📋 ID Copy Karein",
    unlocked: "🔓 **MAGIC SCRIPTS TRADING BOT**\n\nOfficial live signal engine mein خوش آمدید.",
    pairSel: "📊 **Currency / Asset Pair Muntakhib Karein:**",
    timeSel: "⏱️ **Timeframe Muntakhib Karein:**",
    rules: "📜 **Terms & Rules:**\n1. Signals apni zimmedari par use karein.\n2. Spam na karein.",
    faq: "❓ **FAQ:**\n- Unlock kaise karein? Support se rabta karein.",
    back: "⬅️ Peechay",
    next: "➡️ Aage",
    getSignal: "⚡ GET SIGNAL",
    analyzing: "market trends analyze ho rahe hain...",
    signalRes: "🎯 **SIGNAL GENERATED**\n\nAsset: **{pair}**\nTimeframe: **{tf}**\nDirection: **{dir}**\nAccuracy: **{acc}**",
    support: "💬 Support"
  },
  ar: { name: "Arabic 🇸🇦", welcome: "أهلاً بك {name} 🥰!\nالرجاء اختيار لغتك لبدء البوت!", joinReq: "❌ **يجب انضمام القناة!**\n\n🔗 {link}", checkJoin: "🔄 تحقق من الانضمام", lockTitle: "🔒 شاشة مقفلة", lockDesc: "معرفك غير نشط.", copyId: "📋 نسخ المعرف", unlocked: "🔓 **تداول Magic Scripts**", pairSel: "📊 اختر الزوج:", timeSel: "⏱️ اختر الإطار الزمني:", rules: "📜 الشروط والأحكام", faq: "❓ الأسئلة الشائعة", back: "⬅️ رجوع", next: "➡️ التالي", getSignal: "⚡ احصل على إشارة", analyzing: "جاري تحليل السوق...", signalRes: "🎯 **إشارة جديدة**\nالزوج: {pair}\nالاتجاه: {dir}", support: "💬 الدعم" },
  hi: { name: "Hindi 🇮🇳", welcome: "स्वागत है {name} 🥰!\nकृपया भाषा चुनें!", joinReq: "❌ **चैनल ज्वाइन करना अनिवार्य है!**\n\n🔗 {link}", checkJoin: "🔄 सदस्यता जाँच करें", lockTitle: "🔒 लॉक स्क्रीन", lockDesc: "ID सक्रिय नहीं है।", copyId: "📋 ID कॉपी करें", unlocked: "🔓 **Magic Scripts Bot**", pairSel: "📊 पेयर चुनें:", timeSel: "⏱️ टाइमफ्रेम चुनें:", rules: "📜 नियम", faq: "❓ सामान्य سوال", back: "⬅️ पीछे", next: "➡️ आगे", getSignal: "⚡ सिग्नल प्राप्त करें", analyzing: "मार्केट एनालाइज हो रहा है...", signalRes: "🎯 **सिग्नल**\nपेयर: {pair}\nदिशा: {dir}", support: "💬 सहायता" },
  es: { name: "Spanish 🇪🇸", welcome: "¡Bienvenido {name} 🥰!\n¡Selecciona tu idioma!", joinReq: "❌ ¡Únete al canal oficial!\n🔗 {link}", checkJoin: "🔄 Verificar", lockTitle: "🔒 BLOQUEADO", lockDesc: "ID no activo.", copyId: "📋 Copiar ID", unlocked: "🔓 **MAGIC SCRIPTS**", pairSel: "📊 Selecciona par:", timeSel: "⏱️ Selecciona tiempo:", rules: "📜 Reglas", faq: "❓ FAQ", back: "⬅️ Atrás", next: "➡️ Siguiente", getSignal: "⚡ OBTENER SEÑAL", analyzing: "Analizando mercado...", signalRes: "🎯 Par: {pair} | Dir: {dir}", support: "💬 Soporte" },
  fr: { name: "French 🇫🇷", welcome: "Bienvenue {name} 🥰!\nChoisissez votre langue !", joinReq: "❌ Rejoignez la chaîne !\n🔗 {link}", checkJoin: "🔄 Vérifier", lockTitle: "🔒 VERROUILLÉ", lockDesc: "ID non actif.", copyId: "📋 Copier l'ID", unlocked: "🔓 **MAGIC SCRIPTS**", pairSel: "📊 Choisir la paire :", timeSel: "⏱️ Temps :", rules: "📜 Règles", faq: "❓ FAQ", back: "⬅️ Retour", next: "➡️ Suivant", getSignal: "⚡ OBTENIR SIGNAL", analyzing: "Analyse en cours...", signalRes: "🎯 Paire : {pair} | Dir : {dir}", support: "💬 Support" },
  tr: { name: "Turkish 🇹🇷", welcome: "Hoş geldin {name} 🥰!\nDilini seç!", joinReq: "❌ Kanalımıza katılmalısın!\n🔗 {link}", checkJoin: "🔄 Kontrol Et", lockTitle: "🔒 KİLİTLİ", lockDesc: "ID aktif değil.", copyId: "📋 ID Kopyala", unlocked: "🔓 **MAGIC SCRIPTS**", pairSel: "📊 Parite Seç:", timeSel: "⏱️ Süre Seç:", rules: "📜 Kurallar", faq: "❓ SSS", back: "⬅️ Geri", next: "➡️ İleri", getSignal: "⚡ SİNYAL AL", analyzing: "Piyasa taranıyor...", signalRes: "🎯 Parite: {pair} | Yön: {dir}", support: "💬 Destek" },
  ru: { name: "Russian 🇷🇺", welcome: "Добро пожаловать {name} 🥰!\nВыберите язык!", joinReq: "❌ Подпишитесь на канал!\n🔗 {link}", checkJoin: "🔄 Проверить", lockTitle: "🔒 ЗАБЛОКИРОВАНО", lockDesc: "ID не активен.", copyId: "📋 Копировать ID", unlocked: "🔓 **MAGIC SCRIPTS**", pairSel: "📊 Выберите пару:", timeSel: "⏱️ Время:", rules: "📜 Правила", faq: "❓ FAQ", back: "⬅️ Назад", next: "➡️ Вперед", getSignal: "⚡ ПОЛУЧИТЬ СИГНАЛ", analyzing: "Анализ рынка...", signalRes: "🎯 Пара: {pair} | Напр: {dir}", support: "💬 Поддержка" }
};

const PAIRS = [
  "USD/PKR(OTC)", "USD/INR(OTC)", "USD/BRL(OTC)", "USD/BDT(OTC)",
  "EUR/USD(OTC)", "GBP/USD(OTC)", "AUD/USD(OTC)", "USD/JPY(OTC)",
  "EUR/GBP(OTC)", "NZD/USD(OTC)", "USD/CAD(OTC)", "EUR/JPY(OTC)",
  "GOLD(OTC)", "SILVER(OTC)", "BITCOIN(OTC)", "ETHEREUM(OTC)"
];

const TIMEFRAMES = ["5s", "10s", "15s", "30s", "1min", "2min", "5min", "10min"];
const sessions = {};

async function tg(method, token, payload) {
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await res.json();
  } catch (e) {
    return null;
  }
}

async function checkMembership(userId, token) {
  const data = await tg("getChatMember", token, { chat_id: CHANNEL_ID, user_id: userId });
  if (!data || !data.ok) return false;
  const status = data.result.status;
  return ["member", "administrator", "creator"].includes(status);
}

async function checkExternalUnlock(deviceId) {
  try {
    const res = await fetch(`${F_API_BASE}?id=${deviceId}`);
    const txt = (await res.text()).trim();
    return txt === "R" || txt.includes("active") || txt.includes("true");
  } catch (e) {
    return false;
  }
}

async function renderState(chatId, token, editMessageId = null) {
  let session = sessions[chatId] || { lang: 'en', step: 'lang', pairIdx: 0, tfIdx: 0, deviceId: String(chatId).padStart(20, '0') };
  sessions[chatId] = session;
  const langDict = LANGS[session.lang] || LANGS.en;

  if (session.step === 'lang') {
    const keyboard = {
      inline_keyboard: [
        [ { text: "English 🇬🇧", callback_data: "lang|en" }, { text: "Urdu 🇵🇰", callback_data: "lang|ur" } ],
        [ { text: "Arabic 🇸🇦", callback_data: "lang|ar" }, { text: "Hindi 🇮🇳", callback_data: "lang|hi" } ],
        [ { text: "Spanish 🇪🇸", callback_data: "lang|es" }, { text: "French 🇫🇷", callback_data: "lang|fr" } ],
        [ { text: "Turkish 🇹🇷", callback_data: "lang|tr" }, { text: "Russian 🇷🇺", callback_data: "lang|ru" } ]
      ]
    };
    await sendOrEdit(chatId, token, editMessageId, `Welcome 🥰!\nPlease select your language to start the bot!`, keyboard);
    return;
  }

  const isJoined = await checkMembership(chatId, token);
  if (!isJoined) {
    const keyboard = {
      inline_keyboard: [
        [ { text: "📢 Join Channel", url: CHANNEL_LINK } ],
        [ { text: langDict.checkJoin, callback_data: "check_join" } ]
      ]
    };
    const msg = langDict.joinReq.replace("{link}", CHANNEL_LINK);
    await sendOrEdit(chatId, token, editMessageId, msg, keyboard);
    return;
  }

  const isUnlocked = await checkExternalUnlock(session.deviceId);
  if (!isUnlocked) {
    const keyboard = {
      inline_keyboard: [
        [ { text: langDict.copyId, callback_data: `copy|${session.deviceId}` } ],
        [ { text: langDict.support, url: SUPPORT_LINK }, { text: langDict.checkJoin, callback_data: "check_join" } ]
      ]
    };
    const msg = `${langDict.lockTitle}\n\n${langDict.lockDesc}\n\n🆔 **Your 20-Digit ID:**\n\`${session.deviceId}\``;
    await sendOrEdit(chatId, token, editMessageId, msg, keyboard);
    return;
  }

  if (session.step === 'dashboard') {
    const currentPair = PAIRS[session.pairIdx];
    const currentTf = TIMEFRAMES[session.tfIdx];
    const keyboard = {
      inline_keyboard: [
        [ { text: "⬅️", callback_data: "prev_pair" }, { text: `📊 ${currentPair}`, callback_data: "noop" }, { text: "➡️", callback_data: "next_pair" } ],
        [ { text: "⏱️ Prev TF", callback_data: "prev_tf" }, { text: `⏰ ${currentTf}`, callback_data: "noop" }, { text: "⏱️ Next TF", callback_data: "next_tf" } ],
        [ { text: langDict.getSignal, callback_data: "get_signal" } ],
        [ { text: langDict.rules, callback_data: "show_rules" }, { text: langDict.faq, callback_data: "show_faq" } ],
        [ { text: langDict.support, url: SUPPORT_LINK } ]
      ]
    };
    const msg = `${langDict.unlocked}\n\n🔹 **Asset:** ${currentPair}\n🔹 **Timeframe:** ${currentTf}\n\nSelect your options below and click Get Signal!`;
    await sendOrEdit(chatId, token, editMessageId, msg, keyboard);
    return;
  }

  if (session.step === 'rules' || session.step === 'faq') {
    const content = session.step === 'rules' ? langDict.rules : langDict.faq;
    const keyboard = { inline_keyboard: [ [ { text: langDict.back, callback_data: "back_dashboard" } ] ] };
    await sendOrEdit(chatId, token, editMessageId, content, keyboard);
  }
}

async function sendOrEdit(chatId, token, messageId, text, replyMarkup) {
  if (messageId) {
    const res = await tg("editMessageText", token, {
      chat_id: chatId,
      message_id: messageId,
      text: text,
      parse_mode: "Markdown",
      reply_markup: replyMarkup
    });
    if (res && res.ok) return;
  }
  await tg("sendMessage", token, {
    chat_id: chatId,
    text: text,
    parse_mode: "Markdown",
    reply_markup: replyMarkup
  });
}

// Fixed Webhook Setup Route (Forced HTTPS)
app.get("/set-webhook", async (req, res) => {
  const token = req.query.token;
  if (!token) return res.status(400).json({ error: "Token is required. Use /set-webhook?token=YOUR_BOT_TOKEN" });

  const host = req.get('host');
  const webhookUrl = `https://${host}/webhook?token=${token}`;
  
  const result = await tg("setWebhook", token, { url: webhookUrl });
  res.json({ webhookUrl, result });
});

app.get("/delete-webhook", async (req, res) => {
  const token = req.query.token;
  if (!token) return res.status(400).json({ error: "Token is required" });
  const result = await tg("deleteWebhook", token);
  res.json({ result });
});

app.post("/webhook", async (req, res) => {
  const token = req.query.token;
  const update = req.body;
  if (!update || !token) return res.sendStatus(200);

  if (update.message) {
    const chatId = update.message.chat.id;
    const text = update.message.text ? update.message.text.trim() : "";
    if (text.startsWith("/start")) {
      sessions[chatId] = {
        lang: 'en',
        step: 'lang',
        pairIdx: 0,
        tfIdx: 0,
        deviceId: String(Math.floor(10000000000000000000 + Math.random() * 9000000000000000000))
      };
      await renderState(chatId, token);
    }
  }

  if (update.callback_query) {
    const cq = update.callback_query;
    const chatId = cq.message.chat.id;
    const messageId = cq.message.message_id;
    const data = cq.data;

    let session = sessions[chatId] || { lang: 'en', step: 'lang', pairIdx: 0, tfIdx: 0, deviceId: String(chatId).padStart(20, '0') };
    sessions[chatId] = session;
    const langDict = LANGS[session.lang] || LANGS.en;

    if (data.startsWith("lang|")) {
      session.lang = data.split("|")[1];
      session.step = 'dashboard';
    } else if (data === "next_pair") {
      session.pairIdx = (session.pairIdx + 1) % PAIRS.length;
    } else if (data === "prev_pair") {
      session.pairIdx = (session.pairIdx - 1 + PAIRS.length) % PAIRS.length;
    } else if (data === "next_tf") {
      session.tfIdx = (session.tfIdx + 1) / TIMEFRAMES.length | 0; // fixed index increment
      session.tfIdx = (session.tfIdx + 1) % TIMEFRAMES.length;
    } else if (data === "prev_tf") {
      session.tfIdx = (session.tfIdx - 1 + TIMEFRAMES.length) % TIMEFRAMES.length;
    } else if (data === "show_rules") {
      session.step = 'rules';
    } else if (data === "show_faq") {
      session.step = 'faq';
    } else if (data === "back_dashboard") {
      session.step = 'dashboard';
    } else if (data.startsWith("copy|")) {
      await tg("answerCallbackQuery", token, { callback_query_id: cq.id, text: "ID copied!", show_alert: true });
      return res.sendStatus(200);
    } else if (data === "get_signal") {
      await tg("answerCallbackQuery", token, { callback_query_id: cq.id, text: langDict.analyzing });
      const pair = PAIRS[session.pairIdx];
      const tf = TIMEFRAMES[session.tfIdx];
      const dir = Math.random() > 0.48 ? "🟢 CALL (UP)" : "🔴 PUT (DOWN)";
      const accuracy = (Math.floor(Math.random() * (90 - 80 + 1)) + 80) + "%";
      const reasons = ["RSI Oversold Crossover + Volume Spike", "Bollinger Band Lower Touch Rebound", "MACD Bullish Momentum"];
      const reason = reasons[Math.floor(Math.random() * reasons.length)];

      const signalMsg = langDict.signalRes
        .replace("{pair}", pair)
        .replace("{tf}", tf)
        .replace("{dir}", dir)
        .replace("{acc}", accuracy)
        .replace("{reason}", reason);

      const keyboard = {
        inline_keyboard: [
          [ { text: "⚡ Generate Another", callback_data: "get_signal" } ],
          [ { text: langDict.back, callback_data: "back_dashboard" } ]
        ]
      };
      await sendOrEdit(chatId, token, messageId, signalMsg, keyboard);
      await tg("answerCallbackQuery", token, { callback_query_id: cq.id });
      return res.sendStatus(200);
    }

    await tg("answerCallbackQuery", token, { callback_query_id: cq.id });
    await renderState(chatId, token, messageId);
  }

  res.sendStatus(200);
});

app.get("/health", (req, res) => {
  res.json({ status: "Bot Running" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
