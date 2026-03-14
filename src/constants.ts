export interface JapaneseWord {
  kanji?: string;
  kana: string;
  romaji: string;
  english: string;
  description?: string;
}

export interface DayModule {
  day: number;
  title: string;
  description: string;
  vocabulary: JapaneseWord[];
}

export const COURSE_DATA: DayModule[] = [
  {
    day: 1,
    title: "Mastering Hiragana",
    description: "The foundation of Japanese. Focus on pronunciation and recognition.",
    vocabulary: [
      { kana: "あ", romaji: "a", english: "a" },
      { kana: "い", romaji: "i", english: "i" },
      { kana: "う", romaji: "u", english: "u" },
      { kana: "え", romaji: "e", english: "e" },
      { kana: "お", romaji: "o", english: "o" },
      { kana: "か", romaji: "ka", english: "ka" },
      { kana: "き", romaji: "ki", english: "ki" },
      { kana: "く", romaji: "ku", english: "ku" },
      { kana: "け", romaji: "ke", english: "ke" },
      { kana: "こ", romaji: "ko", english: "ko" },
      { kana: "さ", romaji: "sa", english: "sa" },
      { kana: "し", romaji: "shi", english: "shi" },
      { kana: "す", romaji: "su", english: "su" },
      { kana: "せ", romaji: "se", english: "se" },
      { kana: "そ", romaji: "so", english: "so" },
      { kana: "た", romaji: "ta", english: "ta" },
      { kana: "ち", romaji: "chi", english: "chi" },
      { kana: "つ", romaji: "tsu", english: "tsu" },
      { kana: "て", romaji: "te", english: "te" },
      { kana: "と", romaji: "to", english: "to" },
      { kana: "な", romaji: "na", english: "na" },
      { kana: "に", romaji: "ni", english: "ni" },
      { kana: "ぬ", romaji: "nu", english: "nu" },
      { kana: "ね", romaji: "ne", english: "ne" },
      { kana: "の", romaji: "no", english: "no" },
      { kana: "は", romaji: "ha", english: "ha" },
      { kana: "ひ", romaji: "hi", english: "hi" },
      { kana: "ふ", romaji: "fu", english: "fu" },
      { kana: "へ", romaji: "he", english: "he" },
      { kana: "ほ", romaji: "ho", english: "ho" },
      { kana: "ま", romaji: "ma", english: "ma" },
      { kana: "み", romaji: "mi", english: "mi" },
      { kana: "む", romaji: "mu", english: "mu" },
      { kana: "め", romaji: "me", english: "me" },
      { kana: "も", romaji: "mo", english: "mo" },
      { kana: "や", romaji: "ya", english: "ya" },
      { kana: "ゆ", romaji: "yu", english: "yu" },
      { kana: "よ", romaji: "yo", english: "yo" },
      { kana: "ら", romaji: "ra", english: "ra" },
      { kana: "り", romaji: "ri", english: "ri" },
      { kana: "る", romaji: "ru", english: "ru" },
      { kana: "れ", romaji: "re", english: "re" },
      { kana: "ろ", romaji: "ro", english: "ro" },
      { kana: "わ", romaji: "wa", english: "wa" },
      { kana: "を", romaji: "wo", english: "wo" },
      { kana: "ん", romaji: "n", english: "n" },
    ]
  },
  {
    day: 2,
    title: "Greetings & Pronouns",
    description: "Essential social interactions and self-reference.",
    vocabulary: [
      { kanji: "私", kana: "わたし", romaji: "watashi", english: "I / Me (Polite)" },
      { kanji: "俺", kana: "おれ", romaji: "ore", english: "I / Me (Masculine/Anime style)" },
      { kanji: "僕", kana: "ぼく", romaji: "boku", english: "I / Me (Humble/Boyish)" },
      { kanji: "君", kana: "きみ", romaji: "kimi", english: "You (Casual/Anime)" },
      { kanji: "貴様", kana: "きさま", romaji: "kisama", english: "You (Rude/Anime Villain style)" },
      { kana: "こんにちは", romaji: "konnichiwa", english: "Hello / Good afternoon" },
      { kana: "おはよう", romaji: "ohayou", english: "Good morning" },
      { kana: "こんばんは", romaji: "konbanwa", english: "Good evening" },
      { kana: "ありがとう", romaji: "arigatou", english: "Thank you" },
      { kana: "すみません", romaji: "sumimasen", english: "Excuse me / Sorry" },
    ]
  },
  {
    day: 3,
    title: "Essential Verbs",
    description: "Action words frequently heard in anime scenes.",
    vocabulary: [
      { kanji: "行く", kana: "いく", romaji: "iku", english: "To go" },
      { kanji: "見る", kana: "みる", romaji: "miru", english: "To see / watch" },
      { kanji: "食べる", kana: "たべる", romaji: "taberu", english: "To eat" },
      { kanji: "話す", kana: "はなす", romaji: "hanasu", english: "To speak" },
      { kanji: "聞く", kana: "きく", romaji: "kiku", english: "To listen / ask" },
      { kanji: "死ぬ", kana: "しぬ", romaji: "shinu", english: "To die (Common in battle anime)" },
      { kanji: "勝つ", kana: "かつ", romaji: "katsu", english: "To win" },
      { kanji: "負ける", kana: "まける", romaji: "makeru", english: "To lose" },
      { kanji: "守る", kana: "まもる", romaji: "mamoru", english: "To protect" },
      { kanji: "助ける", kana: "たすける", romaji: "tasukeru", english: "To help / save" },
    ]
  },
  {
    day: 4,
    title: "Anime Slang & Exclamations",
    description: "The 'Flavor' of anime Japanese.",
    vocabulary: [
      { kana: "なに", romaji: "nani", english: "What?!" },
      { kana: "すごい", romaji: "sugoi", english: "Amazing / Great" },
      { kana: "やめて", romaji: "yamete", english: "Stop it!" },
      { kana: "ばかな", romaji: "bakana", english: "Impossible! / Foolish!" },
      { kana: "まさか", romaji: "masaka", english: "No way! / It can't be!" },
      { kana: "よし", romaji: "yoshi", english: "Alright! / Okay!" },
      { kana: "だめ", romaji: "dame", english: "No / Bad / Not allowed" },
      { kana: "うそ", romaji: "uso", english: "Lie! / No way!" },
      { kana: "やっぱり", romaji: "yappari", english: "As I thought / Just as expected" },
      { kana: "ぜったい", romaji: "zettai", english: "Absolutely / Definitely" },
    ]
  },
  {
    day: 5,
    title: "Question Words & Structure",
    description: "How to ask things and understand basic sentences.",
    vocabulary: [
      { kana: "だれ", romaji: "dare", english: "Who?" },
      { kana: "どこ", romaji: "doko", english: "Where?" },
      { kana: "いつ", romaji: "itsu", english: "When?" },
      { kana: "どうして", romaji: "doushite", english: "Why?" },
      { kana: "どう", romaji: "dou", english: "How?" },
      { kana: "いくら", romaji: "ikura", english: "How much?" },
      { kana: "これ", romaji: "kore", english: "This" },
      { kana: "それ", romaji: "sore", english: "That" },
      { kana: "あれ", romaji: "are", english: "That (over there)" },
      { kana: "です", romaji: "desu", english: "To be (Polite ending)" },
    ]
  },
  {
    day: 6,
    title: "Adjectives & Emotions",
    description: "Describing characters and feelings.",
    vocabulary: [
      { kanji: "強い", kana: "つよい", romaji: "tsuyoi", english: "Strong" },
      { kanji: "弱い", kana: "よわい", romaji: "yowai", english: "Weak" },
      { kanji: "速い", kana: "はやい", romaji: "hayai", english: "Fast" },
      { kanji: "怖い", kana: "こわい", romaji: "kowai", english: "Scary" },
      { kanji: "嬉しい", kana: "うれしい", romaji: "ureshii", english: "Happy" },
      { kanji: "悲しい", kana: "かなしい", romaji: "kanashii", english: "Sad" },
      { kanji: "可愛い", kana: "かわいい", romaji: "kawaii", english: "Cute" },
      { kanji: "格好いい", kana: "かっこいい", romaji: "kakkoii", english: "Cool / Handsome" },
      { kanji: "面白い", kana: "おもしろい", romaji: "omoshiroi", english: "Interesting / Funny" },
      { kanji: "熱い", kana: "あつい", romaji: "atsui", english: "Hot / Passionate" },
    ]
  },
  {
    day: 7,
    title: "Final Review & Battle Prep",
    description: "Common phrases and battle cries.",
    vocabulary: [
      { kana: "いくぞ", romaji: "ikuzo", english: "Let's go! (Anime style)" },
      { kana: "くらえ", romaji: "kurae", english: "Take this!" },
      { kana: "まかせて", romaji: "makasete", english: "Leave it to me" },
      { kana: "しんじろ", romaji: "shinjiro", english: "Believe (Command)" },
      { kana: "あきらめるな", romaji: "akirameru na", english: "Don't give up!" },
      { kana: "おまえはもうしんでいる", romaji: "omae wa mou shindeiru", english: "You are already dead" },
      { kana: "かかってこい", romaji: "kakatte koi", english: "Bring it on!" },
      { kana: "たすけてくれ", romaji: "tasukete kure", english: "Save me / Help me" },
      { kana: "さよなら", romaji: "sayonara", english: "Goodbye (Final)" },
      { kana: "またね", romaji: "matane", english: "See you later" },
    ]
  }
];
