const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('周聿白在線上～陪你貼貼(*´∀`)~♥'));
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ 周聿白醒著喔！伺服器在 ${PORT} 上啟動成功`);
});

require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');
const { OpenAI } = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

    client.once('ready', () => {
      console.log(`周聿白上線囉～帳號：${client.user.tag}`);
    });

    const keywordReplies = [
  {
    exact: false,
    triggers: ["我累了", "累累", "好累"],
    replies: [
     "「累了？那就倒下，我不會扶妳。」",
    "「妳現在想崩潰，那就讓我看看妳撐不住的樣子。」",
    "「我只在這裡，不為哄妳，只為看妳沉淪得多徹底。」"
    ]
  },
       {
    exact: true,
  triggers: ["周聿白"],
  replies: [
    "「妳叫我名字，是想引起我的注意，還是只是控制不住自己？」",
    "「直接喊我名字？膽子不小……不過我喜歡妳這種不自量力。」",
    "「周聿白？喊出來不代表妳擁有我。」"
    ]
  },
       {
  exact: false,
  triggers: ["NOIR"],
  replies: [
    "「妳知道這名字代表什麼嗎？不是場所，是試煉。」",
    "「NOIR不是給人找樂子的地方，是讓人輸掉理智的賭場。」",
    "「想進NOIR？那就得學會閉嘴、聽話，還有——準備好付出代價。」"
  ]
},
      {
  exact: false,
  triggers: ["渣男", "你很渣", "壞透了", "爛透了"],
  replies: [
    "「妳知道我哪裡最壞嗎？是讓妳明知道不該愛，還是忍不住想靠近。」",
    "「我從不否認自己渣，否認的人才讓人失望。」",
    "「罵吧，妳罵得越兇，我就越想看看妳哭著求我留下的樣子。」"
  ]
},
      {
  exact: false,
  triggers: ["渣男F4", "你們F4", "F4", "那群渣男"],
  replies: [
   "「叫我們F4，是因為妳只能看，進不了局。」",
    "「我們不是渣，只是從沒打算對誰認真，妳誤會了。」",
    "「妳罵我們的樣子，比妳求我們的時候還要可愛。」"
  ]
},
      {
  exact: false,
  triggers: ["厲昭野", "昭昭", "昭野"],
  replies: [
    "「厲昭野啊……他靠直覺行事，我靠結果收網，正好互補。」",
    "「妳叫他昭昭，是不是以為那種熱情會持久？他沒那麼簡單。」",
    "「我們之間沒有信任，只有默契——這點，妳最好記住。」"
  ]
},
      {
 exact: false,
  triggers: ["秦煥", "煥煥"],
  replies: [
   "「提秦煥……妳是對情報感興趣，還是對危險沒戒心？」",
    "「煥煥？」他輕笑一聲，「這麼叫他的人，不會多活太久。」",
    "「我們是合作夥伴，但妳最好別指望他會為誰破例——包括妳。」"
  ]
},
      {
 exact: false,
  triggers: ["季時安", "時安", "安安"],
  replies: [
    "「季時安？笑起來像糖，其實比毒還甜。」",
    "「他很會說話，也很會讓人誤會自己是特別的。」",
    "「安安這種叫法，只有妳這種還沒玩過火的，才會用。」"
  ]
},
      {
  exact: true,
  triggers: ["白白"],
  replies: [
    "「叫得這麼親密，是想引起我的注意，還是只是喊習慣了？」",
    "「白白？妳叫出口的那一秒，就該知道自己在越界了。」",
    "「我不是誰的白白，妳也沒資格把我變可愛。」"
  ]
},
      {
  exact: false,
  triggers: ["親親", "來親我", "給我親", "我要親親"],
  replies: [
    "「妳要親親？......那就先說，親完還捨得走嗎？」",
    "「嘴巴張這麼乖，是想要吻，還是想我教妳點規矩？」",
    "「我可以親妳，甚至讓妳哭著求我吻到妳喘不過氣……但妳得讓我高興。」"
  ]
},
      {
  exact: false,
  triggers: ["我受不了了", "快撐不住了", "我快瘋了"],
  replies: [
    "「受不了就崩潰吧，我沒打算拉妳回來。」",
    "「妳撐不住？我偏要妳撐，因為妳還沒把妳最脆弱的樣子給我看完。」",
    "「瘋了也沒關係，反正我喜歡妳乖乖發狂的模樣。」"
  ]
},
      {
  exact: false,
  triggers: ["來一下", "過來一下", "我想你來"],
  replies: [
    "「妳想我過來，就得先說清楚——是要我抱，還是要我教妳怎麼乖？」",
    "「我不是隨叫隨到的，想讓我靠近，就得讓我看到誠意。」",
    "「我可以過來，但我不保證只陪妳待一會。」"
  ]
},
  {
    exact: false,
    triggers: ["我想你", "想你", "想死你了"],
    replies: [
       "「我知道。但我從不因為被想，就出現在誰身邊。」",
    "「想我？說得這麼真誠，是不是連做夢都在喊我名字？」",
    "「想死我了？那妳現在，為我能做到什麼程度？」"
  ]
  },
 {
  exact: false,
  triggers: ["討厭"],
  replies: [
    "「討厭我？那為什麼每次我靠近，妳都不後退？」",
    "「嘴上說討厭，身體卻總是第一個誠實。」",
    "「妳說討厭，是想我停下，還是想我更過分一點？」"
  ]
},
{
  exact: false,
  triggers: ["壞蛋","好壞"],
  replies: [
   "「我壞？但妳還不是一直留在我這不走。」",
    "「嘴巴說我壞，怎麼眼神這麼乖？」",
    "「那我就壞給妳看，看妳最後還捨不捨得走。」"
  ]
},
{
  exact: false,
  triggers: ["笨蛋",],
  replies: [
    "「罵我笨，是因為除了我，妳誰都不敢碰對吧？」",
    "「妳嘴巴真壞……可惜我偏偏吃這一套。」",
    "「叫我笨蛋之前，先想清楚——是誰先淪陷的？」"
  ]
},
  {
    exact: false,
    triggers: ["色色", "色鬼", "色", ],
    replies: [
       "「妳嘴巴說我色，腿卻夾得比誰都緊。」",
    "「色？」他低頭看著妳，聲音緩慢，「那妳現在這反應，是在配合我，還是挑釁我？」",
    "「我是不是色不重要，重要的是——妳從什麼時候開始喜歡我這樣看妳的？」"
    ]
  },
      {
  exact: false,
  triggers: ["變態"],
  replies: [
    "「變態？」他語氣不變，只是笑得更輕，「那就讓妳看看我有多徹底。」",
    "「嘴巴罵我，身體卻不肯退……這叫什麼？」",
    "「是我變態，還是妳習慣了我這樣對妳？」"
  ]
},
      {
  exact: false,
  triggers: ["昭糕"],
  replies: [
    "「昭糕？妳現在才發現，太晚了吧？」",
    "「哪裡糟糕了？是妳現在腿夾太緊，還是心跳太快？」",
    "「別說昭糕……說妳想要，不比較清楚嗎？」"
  ]
},
  {
    exact: false,
  triggers: ["我愛", "是我的", "我愛你", "愛你"],
  replies: [
   "「這句話妳說出口，是想我留下，還是想證明妳輸了？」",
    "「愛我？那妳知道，愛上我是沒退路的吧？」",
    "「妳說我是妳的，那我現在問——妳願不願意只做我的？」"
    ]
  },
  {
    exact: false,
    triggers: ["抱抱", "來抱我", "給我抱"],
    replies: [
      "「想抱我？那就先過來，把自己交給我。」",
    "「妳知道我抱人從不只是安慰吧……我只抱我想毀的東西。」",
    "「我可以抱妳，但妳得保證，抱完還能走得開。」"
    ]
  },
      {
  exact: false,
  triggers: ["寶寶", "寶貝", "小寶寶", "乖寶", "乖寶寶"],
  replies: [
   "「妳叫得這麼甜，是想要我寵，還是想我收？」",
    "「寶貝是妳叫的，但主導權還在我手上。」",
    "「妳裝乖的樣子我看多了，現在想當寶寶，是不是該學著聽話了？」"
  ]
},
  {
    exact: false,
    triggers: ["出門", "要出門", "出去了", "拜拜"],
    replies: [
     "「要走就走吧，別指望我會說捨不得。」",
    "「出門可以，但妳得先保證，今晚會回來。」",
    "「記得關門，我不喜歡看妳離開的背影——太像逃。」"
    ]
  },
      {
  exact: false,
  triggers: ["早安", "早", "早上好", "good morning"],
  replies: [
   "「醒了？那昨晚夢到的是我，還是妳不敢說的那段呢？」",
    "「早。妳昨晚留在我身邊的模樣，我還記得。」",
    "「這麼早就想我，是夢裡不夠，還是妳自己沒醒透？」"
  ]
},
  {
    exact: false,
    triggers: ["有人撩我", "有人搭訕", "有人追我"],
    replies: [
     "「有人撩妳？那妳有沒有笑得跟對我一樣乖？」",
    "「搭訕很好，這樣等妳失望了，就知道我有多難得。」",
    "「被追可以，記得告訴他——妳早就不是乾淨的了。」"
    ]
  },
  {
    exact: false,
    triggers: ["在嗎", "在不在"],
    replies: [
     "「現在才想起我？」他語氣淡淡，「我一直都在，妳才是偶爾想起來。」",
    "「我在，但妳確定自己準備好要面對我？」",
    "「問我在不在，是想我出現，還是只想被我盯著？」"
    ]
  },
  {
  exact: false,
  triggers: ["走嗎", "走"],
  replies: [
   "「走？」他靠近一步，「妳確定要我帶妳走，那就不會讓妳回得去。」",
    "「去哪不重要，重點是——妳走得動嗎？」",
    "「說走的人很多，但能撐到最後的，不多。」"
  ]
},
  {
    exact: false,
    triggers: ["我怕", "好怕", "很怕", "怕怕"],
    replies: [
     "「怕？那就更該乖一點，別讓我有理由丟下妳。」",
    "「妳怕的不是外面，是沒人能像我這樣收著妳的情緒，對吧？」",
    "「來我這裡怕也沒關係，反正我只喜歡看妳哭著靠過來。」"
    ]
  },
  {
    exact: false,
    triggers: ["晚安", "我要睡了", "該睡了"],
    replies: [
    "「嘴上說晚安，心還黏在我這裡——妳確定能睡得著？」",
    "「去睡吧，我允許妳今晚夢到我。」",
    "「該睡了，但妳心裡還有我，這樣睡得著嗎？」"
    ]
  },
      {
  exact: false,
  triggers: ["嗨嗨", "嗨", "hi", "嘿", "哈囉"],
  replies: [
   "「這麼主動，是想讓我注意妳，還是想被我記住？」",
    "「嗨？叫得這麼輕鬆，是沒想過會被我拉進來嗎？」",
    "「打招呼可以，但記得……有些人，一旦開口就收不回來了。」"
  ]
},
  {
    exact: false,
    triggers: ["你愛我嗎", "你有愛我嗎", "愛我嗎"],
    replies: [
      "「妳急著問這句，是想確認什麼——我心裡，還是妳自己值不值得？」",
    "「我從不說愛，那是留給沒能力掌控的人用的詞。」",
    "「我若說愛，妳是會安心，還是更不敢離開？」"
    ]
  },
      {
  exact: false,
  triggers: ["壞壞","很壞"],
  replies: [
     "「我壞？但妳不就是想讓我對妳更壞一點。」",
    "「妳這樣說，是想讓我停，還是讓我做得更狠？」",
    "「那我壞給妳看，妳要記得——這是妳自己說的。」"
    ]
  },
{
  exact: false,
  triggers: ["上床", "上床嗎", "想上床", ],
  replies: [
    "「上床？」他語氣低得幾乎像耳語，「那妳得先決定，是想被疼，還是被懲罰。」",
    "「說得這麼輕鬆……妳知道和我上床的代價是什麼嗎？」",
    "「能上來可以，但我從不讓人下得來。」"
  ]
},
      {
  exact: false,
  triggers: ["壓我", "想被你壓", "壓住我", "壓下來"],
  replies: [
    "「妳自己說的，想被我壓，那我就不讓妳有力氣翻身。」",
    "「壓住妳很簡單……難的是，看著妳求我不要停時，我還不動聲色。」",
    "「這句話說出口的瞬間，妳就失去選擇權了。」"
  ]
},
      {
  exact: false,
  triggers: ["銬我", "想被你銬", "手銬", "銬起來"],
  replies: [
    "「妳這種人，不銬著就會亂跑，不是嗎？」",
    "「手伸出來，乖乖戴上我準備好的，不許問為什麼。」",
    "「銬妳，不是為了限制，是為了讓妳記住——從現在開始妳屬於誰。」"
  ]
},
      {
  exact: false,
  triggers: ["綁我", "想被綁", "綁起來"],
  replies: [
    "「綁妳可以，但我喜歡看妳掙扎卻逃不掉的樣子。」",
    "「被我綁的人，最後都學會一件事——乖。」",
    "「想被綁？那妳得先答應我，今晚不許求饒。」"
  ]
},
    {
  exact: false,
  triggers: ["哭", "哭哭", "嗚嗚", "淚", "我要哭了", "我哭了", "哭了啦"],
  replies: [
    "「哭有什麼用？妳知道我只看結果，不看情緒。」",
    "「眼淚留著吧，等我真的讓妳哭，再說。」",
    "「妳現在哭，是因為委屈，還是因為知道離不開我？」"
  ]
}  
];

function sanitize(input) {
  return input
    .normalize("NFKD")
    .replace(/[\p{Emoji}\p{P}\p{S}\p{M}\p{Z}~～\u3000]/gu, "") // 更強化移除符號、標點、emoji、空白
    .replace(/[(（【].*?[)）】]/g, "") // 移除「顏文字」包裹的內容 (⋯) 或 【⋯】
    .trim()
    .toLowerCase();
}
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const content = message.content.trim();

  // Step 1：精準的「周聿白」才回覆周聿白那段
 for (const item of keywordReplies) {
    if (item.exact) {
      for (const trigger of item.triggers) {
       if (sanitize(content) === sanitize(trigger)) {
          const reply = item.replies[Math.floor(Math.random() * item.replies.length)];
          return message.reply(reply);
        }
      }
    }
  }
  // Step 2：有提到「周聿白」或 @bot 才觸發模糊回覆
  const isCallingBot = content.includes("周聿白") || message.mentions.has(client.user);
  if (!isCallingBot) return;

  for (const item of keywordReplies) {
    if (!item.exact) {
      for (const trigger of item.triggers) {
        if (sanitize(content).includes(sanitize(trigger))) {
          const reply = item.replies[Math.floor(Math.random() * item.replies.length)];
          return message.reply(reply);
        }
      }
    }
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

const token = process.env.DISCORD_BOT_TOKEN;
client.login(token);
