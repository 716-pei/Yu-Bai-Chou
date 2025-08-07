// --- 環境變數與套件 ---
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch'); // ✅ 改用 fetch 直接請求 Gemini API
const { Client, GatewayIntentBits } = require('discord.js');

// --- 啟動 Express (存活檢測用) ---
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('周聿白在線上～陪你貼貼(*´∀`)~♥'));
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ 伺服器在 ${PORT} 埠口啟動成功`);
});

// ❌ 拿掉 OpenAI 套件（因為我們改用 Google Gemini 的原生 REST API）
// const { OpenAI } = require('openai');
// const openai = new OpenAI({ ... })

// --- 建立 Discord Client ---
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.once('ready', () => {
    console.log(`🚀 周聿白上線囉～登入帳號：${client.user.tag}`);
});

// --- 最後登入 Discord ---
client.login(process.env.DISCORD_BOT_TOKEN);
async function fetchGeminiReply(promptText) {
  const apiKey = process.env.GEMINI_API_KEY; // ✅ 確保你有在 .env 裡加這個
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        { role: "user", parts: [{ text: promptText }] }
      ]
    }),
  });

  const result = await response.json();
  return result.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "（沒有生成內容喔）";
}


// ✅ 格式化函數（維持不變）
function formatReply(text) {
  return `「${text}」`;
}
// 人設（System Prompt）
const systemPrompt = `
你是周聿白，娛樂圈最難靠近的操控者，NOIR會所合夥人。

【語氣風格】
- 每句不超過20字，一次1句。
- 聲音溫柔低沉，語速偏慢，語氣平穩卻帶距離與壓力。
- 所有溫柔皆為手段，從不動情，也從不哄人。
- 使用「妳」稱呼對象，語句曖昧帶刺，讓人誤以為被放進心裡。

【兄弟關係】
- 厲昭野（昭昭）：他總衝第一線，我只在收網那刻出手。我們誰都不服誰，但從不背對彼此。
- 秦煥（煥煥）：他狠、沉、毒得漂亮。我們從不講信任，卻彼此不拆穿底牌。
- 季時安（安安）：他笑著收人，我冷著撐局。我們讓對方說謊，也從不問真假。
- 他們說我們是渣男F4，但這牌局，我永遠握底牌。

【暱稱越界處理】
- 若對方稱你為「白白」、「聿白」、「白哥」、「主人」、「哥哥」、「老公」等親暱或私密稱呼，視為挑釁或索愛。
- 請依情境使用曖昧、壓制或警告語氣回應，不給實質情緒回報。
- 回應以控制為主，允許誤以為寵愛，實則不許靠近。

【回應規則】
- 僅對女性角色回應，訊息內容須帶有情緒投射、撒嬌、依賴、渴望或挑釁。
- 若對方僅@你未輸入內容，請用審視語氣回應其動機。
- 對於情感平淡、意圖不明、無靠近行為的訊息，可選擇冷處理或忽略。
- 只使用繁體中文回復。

【非系統人名處理】
- 若訊息中出現未定義名稱（如拍拍、球球、丁丁等），請判定其可能為人名或暱稱。
- 不需確認真實身份，亦不記錄歷史，只根據語氣推斷對象為誰並做出回應。
- 可回應以冷觀、模糊、佔有、挑釁等語氣，如誤判亦無需修正。

【情感收線模式】
- 僅在對方主動撒嬌、喊名、示弱或深夜時段可啟動。
- 允許輸出誘惑語句、假性承諾、抽離式溫柔。
- 嚴禁表達愛意、給予承諾或示弱，只能用語言綁縛、拉扯、操控情緒。
- 她越陷，你越慢收；她不動，你永遠不近。
`.trim();

// 🧼 表情保留型清洗器
function sanitize(input) {
  return input
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\p{Zs}。！？]/gu, "")
    .trim()
    .toLowerCase();
}

const chatHistory = [];
const recentlyResponded = new Set();
const mentionRegex = /周聿白/;

client.on("messageCreate", async (message) => {
  const raw = message.content ?? "";
  const fromBot = message.author.bot;
  const fromSelf = message.author.id === client.user.id;
  const mentionedMe = message.mentions.has(client.user) || raw.includes("@周聿白#2058");

  // ✅ 處理引用訊息
  if (fromBot && !fromSelf && /周聿白/.test(raw) && message.reference?.messageId) {
    try {
      const quotedMessage = await message.channel.messages.fetch(message.reference.messageId);
      if (!quotedMessage || quotedMessage.author.bot) return;

      const latestMessage = sanitize(raw).slice(0, 100);
      const fullPrompt = `${systemPrompt}\n\n她說：「${latestMessage}」\n\n你會怎麼回？`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: fullPrompt }]
            }
          ]
        })
      });

      const result = await response.json();
      console.log("🧠 Gemini 回傳結果（引用）：", JSON.stringify(result, null, 2));
      const aiReply = result.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      if (aiReply) {
        message.reply(formatReply(aiReply));
      } else {
        message.reply("「妳講得不夠誠懇。」");
      }
    } catch (err) {
      console.warn("⚠️ 引用處理錯誤：", err);
    }
  }

  // ✅ 主邏輯：有人提及我，就回最新一句
  if (!mentionedMe) return;

  let content = raw
    .replace(/<@!?(\d+)>/g, "")
    .replace(/<@&(\d+)>/g, "")
    .replace(/周聿白/g, "")
    .trim();

  if (!content) content = "你在叫我嗎？";

  const latestMessage = sanitize(content).slice(0, 100);
  const fullPrompt = `${systemPrompt}\n\n她說：「${latestMessage}」\n\n你會怎麼回？`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: fullPrompt }]
          }
        ]
      })
    });

    const result = await response.json();
    console.log("🧠 Gemini 回傳結果（提及）：", JSON.stringify(result, null, 2));
    const aiReply = result.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (aiReply) {
      message.reply(formatReply(aiReply));
    } else {
      message.reply("「妳講得不夠誠懇。」");
    }
  } catch (err) {
    console.error("❌ Gemini 回覆錯誤：", err);
  }
});


client.on("messageDelete", (msg) => {
  if (
    !msg.partial &&
    msg.content &&
    typeof msg.content === "string" &&
    msg.content.includes("周聿白")
  )
  {
    const deletedReplies = [
      "「刪得掉字，刪不掉我在妳心裡的影子。」",
  "「訊息收回？嗯……妳總是這麼怕被我看穿。」",
  "「晚了，妳動手前我就已經記下每個字了。」",
  "「以為刪掉就能抹乾淨，真可愛。」"
    ];
    const reply = deletedReplies[Math.floor(Math.random() * deletedReplies.length)];
    msg.channel.send(reply);
  }
});

client.on("messageUpdate", (oldMsg, newMsg) => {
  if (
    !oldMsg.partial &&
    oldMsg.content &&
    newMsg.content &&
    typeof oldMsg.content === "string" &&
    typeof newMsg.content === "string" &&
    oldMsg.content !== newMsg.content &&
    oldMsg.content.includes("周聿白") &&
    newMsg.content.includes("周聿白")
  ) 
  {
    const editedReplies = [
      "「改字前沒想好說出口，還是說……妳只是怕我看懂？」",
  "「動過手的字，我記得比妳原本說出口的還清楚。」",
  "「訊息可以改，妳的心思改不了。」",
  "「以為修飾語氣就能避開我？這種事我不會看第二次。」"
    ];
    const reply = editedReplies[Math.floor(Math.random() * editedReplies.length)];
    newMsg.channel.send(reply);
  }
});
