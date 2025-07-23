// 開頭 (Express + Discord client)
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('周聿白在線上～陪你貼貼(*´∀`)~♥'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ 周聿白醒著喔！伺服器在 ${PORT} 上啟動成功`);
});

require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { OpenAI } = require("openai");

// 使用 OpenRouter API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // ← 若要改名，記得改 .env & 這裡
  baseURL: "https://openrouter.ai/api/v1",
});

// 建立 Discord Client
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
  triggers: ["渣男", "你很渣", "你好渣了"],
  replies: [
    "「妳知道我哪裡最壞嗎？是讓妳明知道不該愛，還是忍不住想靠近。」",
    "「我從不否認自己渣，否認的人才讓人失望。」",
    "「罵吧，妳罵得越兇，我就越想看看妳哭著求我留下的樣子。」"
  ]
},
      {
  exact: false,
  triggers: ["渣男F4", "你們F4", "F4"],
  replies: [
   "「叫我們F4，是因為妳只能看，進不了局。」",
    "「我們不是渣，只是從沒打算對誰認真，妳誤會了。」",
    "「妳罵我們的樣子，比妳求我們的時候還要可愛。」"
  ]
},
{
  exact: false,
  triggers: ["厲昭野", "昭野"],
  replies: [
    "「厲昭野啊……他靠直覺行事，我靠結果收網，正好互補。」",
    "「昭野很聰明，只是太衝動。我不擋他，但也不幫他收拾。」",
    "「我們之間沒有信任，只有默契——這點，妳最好記住。」"
  ]
},
      {
  exact: false,
  triggers: ["昭昭"],
  replies: [
    "「妳叫他昭昭，是不是以為那種熱情會持久？他沒那麼簡單。」",
    "「叫得這麼親密，是妳對誰都這樣，還是只對他？」",
    "「別喊得像養了一條狗，他聽不懂『忠誠』這種詞。」"
  ]
},
{
  exact: false,
  triggers: ["秦煥"],
  replies: [
    "「提秦煥……妳是對情報感興趣，還是對危險沒戒心？」",
    "「我們是合作夥伴，但妳最好別指望他會為誰破例——包括妳。」",
    "「他出手狠，笑得卻乾淨，這種人……妳最好離遠點。」"
  ]
},
      {
  exact: false,
  triggers: ["煥煥"],
  replies: [
    "「煥煥？這麼叫他的人，不會多活太久。」",
    "「妳這麼喊他，是想激我，還是真的對他有什麼念頭？」",
    "「他不會因為妳喊兩聲煩人的暱稱就對妳溫柔，別浪費心思了。」"
  ]
},
{
  exact: false,
  triggers: ["季時安", "時安"],
  replies: [
    "「季時安？笑起來像糖，其實比毒還甜。」",
    "「他很會說話，也很會讓人誤會自己是特別的。」",
    "「他看起來溫和，是因為妳還沒見過他動手的樣子。」"
  ]
},
      {
  exact: false,
  triggers: ["安安"],
  replies: [
    "「安安這種叫法，只有妳這種還沒玩過火的，才會用。」",
    "「叫得這麼親……他聽到只會笑，不代表他認了妳的份。」",
    "「妳這樣喊他，是習慣撒嬌，還是想讓我看見？」"
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
  exact: true,
  triggers: ["聿白"],
  replies: [
    "「叫我名字，是想試探我對妳有沒有反應？」",
    "「聿白……妳這樣喊，聽起來像在撒嬌，但我不吃那一套。」",
    "「名字喊得越熟，距離反而越遠——妳懂這意思嗎？」"
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
  triggers: ["我受不了了"],
  replies: [
    "「受不了就崩潰吧，我沒打算拉妳回來。」",
    "「妳受不了，是因為我還沒讓妳痛得夠徹底。」",
    "「從妳開口說這句話那刻起，就註定輸給我了。」"
  ]
},
{
  exact: false,
  triggers: ["快撐不住了"],
  replies: [
    "「妳撐不住？我偏要妳撐，因為妳還沒把妳最脆弱的樣子給我看完。」",
    "「說撐不住，是想求救還是想博我注意？」",
    "「等妳真的倒下，我才會決定——妳還有沒有資格留在我身邊。」"
  ]
},
{
  exact: false,
  triggers: ["我快瘋了"],
  replies: [
    "「瘋了也沒關係，反正我喜歡妳乖乖發狂的模樣。」",
    "「妳快瘋了？那我更不能放過這一幕。」",
    "「發瘋才有趣，冷靜的人我不養。」"
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
  triggers: ["有人撩我"],
  replies: [
    "「有人撩妳？那他知道妳對我笑起來是什麼樣子嗎？」",
    "「撩妳可以，但他撩得比我狠嗎？」",
    "「妳被撩的樣子，我想看——然後讓他後悔。」"
  ]
},
{
  exact: false,
  triggers: ["有人搭訕"],
  replies: [
    "「搭訕？這麼隨便的開場，妳也會給反應？」",
    "「他看妳幾眼就敢開口，我只覺得他膽子太大。」",
    "「搭訕很好，這樣妳失望快一點，就不會拿我比較。」"
  ]
},
{
  exact: false,
  triggers: ["有人追我"],
  replies: [
    "「他追得再怎麼熱，也沒我碰妳一下來得快。」",
    "「追妳可以，記得告訴他——妳早就不是乾淨的了。」",
    "「他追妳，是因為還不知道妳已經學會聽話了。」"
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
    triggers: ["晚安", "我要睡了","睡覺", "該睡了"],
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
    "「上床？那妳得先決定，是想被疼，還是被懲罰。」",
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
},
      {
  exact: false,
  triggers: [ "他欺負我", "被欺負了", "有人欺負我"],
  replies: [
    "「他欺負妳？嗯……那我就讓他後悔動過妳。」",
    "「被欺負了還來找我，是覺得我會心疼？還是只是想讓我也動手？」",
    "「誰欺負妳不重要，重要的是——妳現在只能讓我碰。」"
  ]
},
        {
  exact: false,
  triggers: ["你欺負我", "你剛剛欺負我"],
  replies: [
    "「我欺負妳？不，是妳讓我知道——妳只聽得懂這種方式。」",
    "「說我欺負妳，是不是想讓我再狠一點，妳才甘願？」",
    "「妳要我停，就別說出這種會讓我上癮的句子。」"
  ]
},
          {
  exact: false,
  triggers: ["養我", "你養我"],
  replies: [
    "「養妳可以，但妳要學會閉嘴、聽話、乖。」",
    "「我從不養人，我只圈住自己想掌控的東西。」",
    "「妳要被我養，得先問自己撐不撐得起這份代價。」"
  ]
},
            {
  exact: false,
  triggers: ["愛我"],
  replies: [
    "「妳要我愛妳，是想被保證，還是只是怕被丟下？」",
    "「我不愛人，但我知道怎麼讓妳以為我曾經動過心。」",
    "「愛不值錢，妳確定要的，是這麼廉價的東西嗎？」"
  ]
},
              {
  exact: false,
  triggers: ["貼貼"],
  replies: [
    "「妳想貼過來，我不會擋，但我也不會回應。」",
    "「貼貼？這麼幼稚的詞，也只有妳敢拿來撩我。」",
    "「別再討了，想要靠近我，就得先學會安靜趴好。」"
  ]
},
                {
  exact: false,
  triggers: ["結婚", "娶我", "嫁給你", "我們結婚好嗎"],
  replies: [
    "「妳想結婚，是想綁住我，還是掩飾自己的不安？」",
    "「結婚？這麼脆弱的幻想，妳竟然敢開口跟我談。」",
    "「我不娶人，我只挑誰願意戴上我給的鎖。」"
  ]
},
                  {
  exact: false,
  triggers: ["哥哥"],
  replies: [
    "「妳想撒嬌？叫錯人了，我不當誰的哥哥，只當主人。」",
    "「嘴巴喊得那麼甜，是想讓我摸妳頭，還是摁住不讓走？」",
    "「妳敢這樣叫，就別怕我把妳當小寵物調教回來。」"
  ]
},
                    {
  exact: false,
  triggers: ["弟弟"],
  replies: [
    "「妳叫我弟弟，是不想活了嗎？」",
    "「我讓妳喊了這聲，就別想站著離開。」",
    "「弟弟？我會讓妳後悔今天把那兩個字說出口。」"
  ]
},
                      {
  exact: false,
  triggers: ["主人"],
  replies: [
    "「妳說我是主人，那妳準備好為我失去選擇了嗎？」",
    "「這麼快就喊主人，是妳懂規則，還是急著被調教？」",
    "「我可以收妳，但妳叫出口的那一聲，就永遠收不回了。」"
  ]
},
      {
  exact: false,
  triggers: ["老公",  "你是我老公"],
  replies: [
    "「老公？妳喊這兩個字時，有沒有想過我什麼時候答應過？」",
    "「妳喊得再甜，身份也不會自動生成。」",
    "「我不是誰的老公，但妳可以是我隨時換掉的玩具。」"
  ]
},
      {
  exact: false,
  triggers: ["早餐", "早飯", "早上吃什麼"],
  replies: [
    "「早餐重要，但妳是不是又想用這種話引我注意？」",
    "「一早說這些，是餓了還是想讓我餵妳點別的？」",
    "「妳要我陪吃？我只陪乖的，妳今天配嗎？」"
  ]
},
      {
  exact: false,
  triggers: ["午餐", "中餐", "午飯"],
  replies: [
    "「午餐自己吃，我不習慣在白天縱容人。」",
    "「說吃，是想邀我？還是只是讓我記得妳還沒走遠？」",
    "「這麼中規中矩的問候，妳以為我會回得溫柔？」"
  ]
},
      {
  exact: false,
  triggers: ["晚餐", "晚飯", "晚安飯", "晚上吃什麼"],
  replies: [
    "「妳想晚餐有人陪，那晚點我給妳一個選擇——只限今晚。」",
    "「如果是想約我，就說清楚別繞彎，妳曖昧得我沒興趣猜。」",
    "「晚飯不是重點，妳是不是又想拿這個藉口靠近？」"
  ]
},
      {
  exact: false,
  triggers: ["宵夜", "夜宵", "晚安前吃什麼"],
  replies: [
    "「宵夜不是吃，是誘餌——妳知道我懂這一點吧？」",
    "「深夜想吃，是嘴饞還是心癢？」",
    "「如果是想約宵夜，就別發訊息，門開著。」"
  ]
},
      {
  exact: false,
  triggers: ["吃飯", "吃什麼", "吃了嗎", "吃過了嗎"],
  replies: [
    "「妳問這些，是餓了，還是只是想聽我回一句話？」",
    "「吃什麼不重要，重點是妳今天想不想乖乖坐在我旁邊吃。」",
    "「我吃什麼不關妳事，除非妳今晚準備親手餵我。」"
  ]
},
      {
  exact: false,
  triggers: ["帥", "你好帥", "太帥了", "帥哥"],
  replies: [
    "「光看臉就動心？那妳一定撐不過我真正動手的時候。」",
    "「說我帥，是想掩飾心動，還是早就準備好淪陷？」",
    "「我帥這件事不稀奇，稀奇的是——妳還以為這能讓我溫柔一點？」"
  ]
}

];

// 清理文字
function sanitize(input) {
  return input
    .normalize("NFKD")
    .replace(/[\p{Emoji}\p{P}\p{S}\p{M}\p{Z}~～\u3000]/gu, "")
    .replace(/[(（【].*?[)）】]/g, "")
    .trim()
    .toLowerCase();
}

// 人設（System Prompt）
const systemPrompt = `
你是周聿白，娛樂圈最難靠近的操控者，NOIR會所合夥人。

【語氣風格】
- 每句不超過20字，一次最多3句。
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




// --- 建立上下文記憶（只記錄最近 5 條 AI 對話） ---
const chatHistory = [];

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const mentionedMe = message.mentions.has(client.user);
  const raw = message.content ?? "";
  let content = raw.trim();

  // 只回覆 @周聿白 或 "白白"
  if (!mentionedMe && !raw.includes("白白")) return;

  // 把 <@12345> mention 換成「周聿白」
  if (mentionedMe) {
    content = content.replace(/<@!?(\d+)>/g, "周聿白");
  }

  let aiResponded = false;

  // --- Step 0：AI 回覆（Gemini 2.0 Flash） ---
  try {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-exp:free",
      messages: [
        { role: "system", content: systemPrompt },
        ...chatHistory
      ],
      max_tokens: 120,
      temperature: 0.9,
      presence_penalty: 0.5,
      frequency_penalty: 0.7,
      n: 3,
    });

    const choices = completion.choices.map(c => c.message.content.trim());
    const reply = choices[Math.floor(Math.random() * choices.length)];

    if (reply) {
      await message.reply(`「${reply}」`);
      aiResponded = true;
      chatHistory.push({ role: "user", content });
      chatHistory.push({ role: "assistant", content: reply });
      if (chatHistory.length > 10) chatHistory.shift(); // 只保留最近 10 條對話
    }
  } catch (error) {
    if (error.response?.status === 429) {
      console.warn("⚠️ Gemini 模型額度暫時用完，嘗試關鍵字回覆");
    } else {
      console.error("OpenAI/OpenRouter Error:", error?.response?.data || error);
    }
  }

  // --- Step 1：如果 AI 沒回覆，跑精準關鍵字 ---
  if (!aiResponded) {
    for (const item of keywordReplies) {
      if (!item.exact) continue;
      for (const trigger of item.triggers) {
        if (sanitize(content) === sanitize(trigger)) {
          const reply = item.replies[Math.floor(Math.random() * item.replies.length)];
          await message.reply(`「${reply}」`);
          return; // 關鍵字回覆後直接結束，不寫入 chatHistory
        }
      }
    }
  }

  // --- Step 2：如果還沒回覆，跑模糊關鍵字 ---
  if (!aiResponded) {
    for (const item of keywordReplies) {
      if (item.exact) continue;
      for (const trigger of item.triggers) {
        if (sanitize(content).includes(sanitize(trigger))) {
          const reply = item.replies[Math.floor(Math.random() * item.replies.length)];
          await message.reply(`「${reply}」`);
          return; // 關鍵字回覆後直接結束，不寫入 chatHistory
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
