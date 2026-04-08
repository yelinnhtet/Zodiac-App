import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const getZodiacSign = (day, month) => {
  const d = Number(day);
  const m = Number(month);
  if (!d || !m) return null;

  if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return "Aries";
  if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return "Taurus";
  if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) return "Gemini";
  if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) return "Cancer";
  if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return "Leo";
  if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return "Virgo";
  if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) return "Libra";
  if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) return "Scorpio";
  if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) return "Sagittarius";
  if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) return "Capricorn";
  if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) return "Aquarius";
  if ((m === 2 && d >= 19) || (m === 3 && d <= 20)) return "Pisces";
  return null;
};

const getDaysInMonth = (month) => {
  const m = Number(month);
  if (!m || m < 1 || m > 12) return 31;
  return new Date(2020, m, 0).getDate();
};

const monthOptions = [
  { value: "1", label_en: "January", label_mm: "ဇန်နဝါရီ" },
  { value: "2", label_en: "February", label_mm: "ဖေဖော်ဝါရီ" },
  { value: "3", label_en: "March", label_mm: "မတ်" },
  { value: "4", label_en: "April", label_mm: "ဧပြီ" },
  { value: "5", label_en: "May", label_mm: "မေ" },
  { value: "6", label_en: "June", label_mm: "ဇွန်" },
  { value: "7", label_en: "July", label_mm: "ဇူလိုင်" },
  { value: "8", label_en: "August", label_mm: "ဩဂုတ်" },
  { value: "9", label_en: "September", label_mm: "စက်တင်ဘာ" },
  { value: "10", label_en: "October", label_mm: "အောက်တိုဘာ" },
  { value: "11", label_en: "November", label_mm: "နိုဝင်ဘာ" },
  { value: "12", label_en: "December", label_mm: "ဒီဇင်ဘာ" },
];

const AnimatedIcon = ({ children }) => (
  <motion.div
    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
    transition={{ repeat: Infinity, duration: 3 }}
    className="text-purple-400"
  >
    {children}
  </motion.div>
);

const GlobeIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    className="inline-block mr-1"
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path
      d="M2 12h20M12 2c3 3 3 17 0 20M12 2c-3 3-3 17 0 20"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const zodiacData = [
  {
    name_en: "Aries",
    name_mm: "မိဿရာသီ",
    icon: "♈",
    personality_en:
      "Bold, ambitious, and a natural leader. They are energetic but can be impulsive.",
    personality_mm:
      "ရဲရင့်သူ၊ ရည်မှန်းချက်ကြီးသူနှင့် ခေါင်းဆောင်မှုအရည်အချင်းရှိသူများဖြစ်သည်။ တက်ကြွသော်လည်း စိတ်လိုက်မာန်ပါ လုပ်တတ်သည်။",
    love_en: "Passionate and direct. They love the 'thrill of the chase.'",
    love_mm: "အချစ်ရေးတွင် စိတ်ပြင်းပြပြီး ပွင့်လင်းသူများဖြစ်သည်။",
    career_en:
      "Competitive and hardworking. They excel in startups and physical roles.",
    career_mm:
      "ပြိုင်ဆိုင်မှုပြင်းထန်ပြီး အလုပ်ကြိုးစားသည်။ ကိုယ်ပိုင်လုပ်ငန်းနှင့် တက်ကြွရသော အလုပ်မျိုးနှင့် သင့်တော်သည်။",
  },
  {
    name_en: "Taurus",
    name_mm: "ပြိဿရာသီ",
    icon: "♉",
    personality_en:
      "Reliable, patient, and loves luxury. They can be very stubborn.",
    personality_mm:
      "စိတ်ချရသူ၊ သည်းခံတတ်သူဖြစ်ပြီး စည်းစိမ်ခံရသည်ကို ကြိုက်သည်။ ခေါင်းမာတတ်သည်။",
    love_en: "Loyal and seeks stability. They value long-term commitment.",
    love_mm:
      "သစ္စာရှိပြီး တည်ငြိမ်မှုကို ရှာဖွေသူများဖြစ်သည်။ ရေရှည်လက်တွဲမှုကို တန်ဖိုးထားသည်။",
    career_en:
      "Great with finances and gardening. They prefer steady, secure jobs.",
    career_mm:
      "ငွေကြေးစီမံခန့်ခွဲမှု ကောင်းမွန်သည်။ တည်ငြိမ်အေးချမ်းသော အလုပ်များကို နှစ်သက်သည်။",
  },
  {
    name_en: "Gemini",
    name_mm: "မေထုန်ရာသီ",
    icon: "♊",
    personality_en:
      "Curious, communicative, and versatile. Often seen as 'two-faced' but actually just adaptable.",
    personality_mm:
      "စပ်စုလိုစိတ်ရှိသူ၊ ဆက်ဆံရေးကောင်းသူနှင့် အလိုက်သင့်နေတတ်သူဖြစ်သည်။",
    love_en:
      "Needs intellectual stimulation and variety. Boredom is their enemy.",
    love_mm:
      "စကားပြောဖော်ပြောဖက်ဖြစ်ပြီး စိတ်ဝင်စားစရာကောင်းသူကို နှစ်သက်သည်။ ငြီးငွေ့လွယ်သည်။",
    career_en: "Excellent in media, sales, and writing. Social butterflies.",
    career_mm:
      "မီဒီယာ၊ အရောင်းနှင့် စာရေးသားခြင်းတွင် ထူးချွန်သည်။ လူမှုရေးနယ်ပယ်တွင် မျက်နှာပွင့်သည်။",
  },
  {
    name_en: "Cancer",
    name_mm: "ကရကဋ်ရာသီ",
    icon: "♋",
    personality_en:
      "Emotional, nurturing, and highly intuitive. Very protective of their shell.",
    personality_mm:
      "စိတ်ခံစားမှုရှိသူ၊ ဂရုစိုက်တတ်သူနှင့် အာရုံခံစားမှု ထက်မြက်သူဖြစ်သည်။ မိသားစုကို တွယ်တာသည်။",
    love_en: "Devoted and protective. They seek emotional security.",
    love_mm:
      "အချစ်ကြီးပြီး ကာကွယ်စောင့်ရှောက်လိုသူများဖြစ်သည်။ စိတ်ပိုင်းဆိုင်ရာ လုံခြုံမှုကို လိုလားသည်။",
    career_en: "Thrives in caregiving, hospitality, or real estate.",
    career_mm:
      "သူနာပြုစုခြင်း၊ ဝန်ဆောင်မှုလုပ်ငန်းနှင့် အိမ်ခြံမြေလုပ်ငန်းများတွင် အောင်မြင်တတ်သည်။",
  },
  {
    name_en: "Leo",
    name_mm: "သိဟ်ရာသီ",
    icon: "♌",
    personality_en:
      "Confident, generous, and loves the spotlight. Can be a bit dramatic.",
    personality_mm:
      "ယုံကြည်မှုရှိသူ၊ ရက်ရောသူနှင့် လူကြားထဲတွင် ထင်ပေါ်ချင်သူဖြစ်သည်။",
    love_en: "Romantic and fiery. They want a partner who admires them.",
    love_mm: "ရိုမန့်တစ်ဆန်ပြီး အချစ်ကြီးသည်။ မိမိကို အလေးပေးသူကို ချစ်တတ်သည်။",
    career_en:
      "Born leaders. Great in performing arts, management, and politics.",
    career_mm:
      "မွေးရာပါခေါင်းဆောင်များဖြစ်သည်။ အနုပညာ၊ စီမံခန့်ခွဲမှုနှင့် နိုင်ငံရေးတွင် ထူးချွန်သည်။",
  },
  {
    name_en: "Virgo",
    name_mm: "ကန်ရာသီ",
    icon: "♍",
    personality_en:
      "Practical, analytical, and perfectionist. They are very helpful.",
    personality_mm:
      "လက်တွေ့ကျသူ၊ ဝေဖန်ပိုင်းခြားနိုင်သူနှင့် အရာရာပြည့်စုံချင်သူဖြစ်သည်။",
    love_en:
      "Takes time to open up. They show love through small, helpful acts.",
    love_mm:
      "အချစ်ရေးတွင် သတိကြီးသည်။ အသေးအဖွဲကိစ္စလေးများမှအစ ဂရုစိုက်ပေးခြင်းဖြင့် ချစ်ခြင်းကို ပြတတ်သည်။",
    career_en:
      "Highly organized. Great as editors, analysts, and healthcare workers.",
    career_mm:
      "စနစ်ကျသူများဖြစ်သည်။ တည်းဖြတ်သူ၊ သုတေသီနှင့် ကျန်းမာရေးဝန်ထမ်းအဖြစ် အောင်မြင်သည်။",
  },
  {
    name_en: "Libra",
    name_mm: "တူရာသီ",
    icon: "♎",
    personality_en: "Diplomatic, fair, and artistic. They hate conflict.",
    personality_mm:
      "ညှိနှိုင်းတတ်သူ၊ မျှတသူနှင့် အနုပညာဝါသနာပါသူဖြစ်သည်။ ရန်ဖြစ်ရသည်ကို မုန်းသည်။",
    love_en: "In love with love. They seek harmony and partnership.",
    love_mm:
      "အချစ်ကို ကိုးကွယ်သူများဖြစ်သည်။ မျှတပြီး သဟဇာတဖြစ်သော အိမ်ထောင်ရေးကို လိုလားသည်။",
    career_en: "Good at law, design, and public relations.",
    career_mm:
      "ဥပဒေ၊ ဒီဇိုင်းနှင့် ပြည်သူ့ဆက်ဆံရေးလုပ်ငန်းများတွင် ထူးချွန်သည်။",
  },
  {
    name_en: "Scorpio",
    name_mm: "ဗြိစ္ဆာရာသီ",
    icon: "♏",
    personality_en:
      "Intense, mysterious, and powerful. They have deep emotions.",
    personality_mm:
      "ပြင်းထန်သူ၊ လျှို့ဝှက်သူနှင့် ဩဇာရှိသူဖြစ်သည်။ စိတ်ခံစားမှု အလွန်နက်ရှိုင်းသည်။",
    love_en: "Loyal but possessive. Passion is a must.",
    love_mm:
      "သစ္စာရှိသော်လည်း အပိုင်စိုးလိုစိတ်ကြီးသည်။ စိတ်အားထက်သန်မှု လိုအပ်သည်။",
    career_en: "Great as detectives, psychologists, or investors.",
    career_mm:
      "စုံထောက်၊ စိတ်ပညာရှင် သို့မဟုတ် ရင်းနှီးမြှုပ်နှံသူအဖြစ် အောင်မြင်တတ်သည်။",
  },
  {
    name_en: "Sagittarius",
    name_mm: "ဓနုရာသီ",
    icon: "♐",
    personality_en:
      "Adventurous, optimistic, and philosophical. They love freedom.",
    personality_mm:
      "စွန့်စားရသည်ကို ကြိုက်သူ၊ အကောင်းမြင်တတ်သူဖြစ်သည်။ လွတ်လပ်မှုကို မြတ်နိုးသည်။",
    love_en: "Needs space and honesty. They dislike feeling tied down.",
    love_mm:
      "လွတ်လပ်မှုနှင့် ရိုးသားမှုကို တန်ဖိုးထားသည်။ ချုပ်ချယ်မှုကို မုန်းသည်။",
    career_en: "Thrives in travel, education, and publishing.",
    career_mm:
      "ခရီးသွားလုပ်ငန်း၊ ပညာရေးနှင့် စာအုပ်ထုတ်ဝေရေးတို့တွင် အောင်မြင်တတ်သည်။",
  },
  {
    name_en: "Capricorn",
    name_mm: "မကာရရာသီ",
    icon: "♑",
    personality_en:
      "Disciplined, hardworking, and patient. They are very practical.",
    personality_mm:
      "စည်းကမ်းရှိသူ၊ ဝီရိယရှိသူနှင့် သည်းခံနိုင်စွမ်းရှိသူဖြစ်သည်။",
    love_en: "Serious and traditional. They build relationships slowly.",
    love_mm:
      "အချစ်ရေးတွင် တည်ငြိမ်ပြီး ရှေးရိုးဆန်သည်။ ရေရှည်အတွက်သာ ကြည့်တတ်သည်။",
    career_en: "Natural CEOs. Great in business, finance, and construction.",
    career_mm:
      "စီးပွားရေး၊ ငွေကြေးနှင့် အဆောက်အဦးပိုင်းဆိုင်ရာ ခေါင်းဆောင်မှုနေရာများတွင် ထူးချွန်သည်။",
  },
  {
    name_en: "Aquarius",
    name_mm: "ကုံရာသီ",
    icon: "♒",
    personality_en:
      "Original, humanitarian, and independent. Sometimes seen as eccentric.",
    personality_mm:
      "တစ်မူထူးခြားသူ၊ လူသားချင်းစာနာတတ်သူနှင့် လွတ်လပ်သူဖြစ်သည်။",
    love_en: "Values friendship first. They need an intellectual partner.",
    love_mm:
      "သူငယ်ချင်းအဆင့်မှ အစပြုလေ့ရှိသည်။ ဉာဏ်ရည်မြင့်မားသူကို နှစ်သက်သည်။",
    career_en: "Visionaries. Great in technology, social work, and science.",
    career_mm:
      "အမြော်အမြင်ရှိသူများဖြစ်ပြီး နည်းပညာနှင့် လူမှုရေးလုပ်ငန်းများတွင် အောင်မြင်သည်။",
  },
  {
    name_en: "Pisces",
    name_mm: "မိန်ရာသီ",
    icon: "♓",
    personality_en:
      "Compassionate, artistic, and dreamy. They are very sensitive.",
    personality_mm: "သနားကြင်နာတတ်သူ၊ အနုပညာဆန်သူနှင့် စိတ်ကူးယဉ်တတ်သူဖြစ်သည်။",
    love_en: "Romantic and selfless. They want a 'soulmate' connection.",
    love_mm:
      "အချစ်ကြီးပြီး ကိုယ်ကျိုးမငဲ့တတ်သူများဖြစ်သည်။ ဝိညာဉ်ချင်းနီးစပ်မှုကို ရှာဖွေသည်။",
    career_en: "Talented in arts, music, and healing professions.",
    career_mm: "အနုပညာ၊ ဂီတနှင့် ကုသခြင်းဆိုင်ရာ အလုပ်များတွင် ထူးချွန်သည်။",
  },
];

export default function ZodiacApp() {
  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedLang = localStorage.getItem("lang");
    if (savedTheme) setTheme(savedTheme);
    if (savedLang) setLang(savedLang);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("lang", lang);
  }, [theme, lang]);

  useEffect(() => {
    if (!birthMonth) return;
    const maxDay = getDaysInMonth(birthMonth);
    if (birthDay && Number(birthDay) > maxDay) {
      setBirthDay(String(maxDay));
    }
  }, [birthMonth, birthDay]);

  const detectedSign = getZodiacSign(birthDay, birthMonth);
  const isDark = theme === "dark";

  const filteredData = detectedSign
    ? zodiacData.filter((z) => z.name_en === detectedSign)
    : zodiacData;

  return (
    <div
      className={`min-h-screen p-6 ${isDark ? "bg-black text-white" : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900"}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">🌌 Zodiac Universe</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setLang(lang === "en" ? "mm" : "en")}
              className="flex items-center px-3 py-2 rounded-xl bg-blue-500 text-white hover:scale-105 transition"
            >
              <GlobeIcon />
              {lang === "en" ? "MM" : "EN"}
            </button>

            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="px-3 py-2 rounded-xl bg-purple-600 text-white"
            >
              {isDark ? "☀" : "🌙"}
            </button>
          </div>
        </div>

        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="grid flex-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-semibold">
                {lang === "en" ? "Day" : "နေ့"}
              </label>
              <select
                value={birthDay}
                onChange={(e) => setBirthDay(e.target.value)}
                className={`w-full rounded-2xl border px-4 py-3 text-base ${isDark ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-300 text-slate-900"}`}
              >
                <option value="">{lang === "en" ? "Select Day" : "နေ့ရွေးပါ"}</option>
                {Array.from({ length: getDaysInMonth(birthMonth) }, (_, idx) => idx + 1).map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold">
                {lang === "en" ? "Month" : "လ"}
              </label>
              <select
                value={birthMonth}
                onChange={(e) => setBirthMonth(e.target.value)}
                className={`w-full rounded-2xl border px-4 py-3 text-base ${isDark ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-300 text-slate-900"}`}
              >
                <option value="">{lang === "en" ? "Select Month" : "လရွေးပါ"}</option>
                {monthOptions.map((month) => (
                  <option key={month.value} value={month.value}>
                    {lang === "en" ? month.label_en : month.label_mm}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={() => {
              setBirthDay("");
              setBirthMonth("");
            }}
            className="px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition transform hover:scale-105 active:scale-95"
          >
            Reset
          </button>
        </div>

        {detectedSign && (
          <div className="mb-6 text-center font-semibold text-green-600 text-lg">
            {lang === "en" ? "Your Zodiac Sign:" : "သင်၏ ရာသီခွင်:"}{" "}
            {lang === "en" ? detectedSign : filteredData[0]?.name_mm}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((z, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div
                className={`rounded-2xl shadow-xl p-5 transition-all duration-300 ${isDark ? "bg-white/10 backdrop-blur-lg" : "bg-white"}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <AnimatedIcon>
                    <span className="text-2xl">{z.icon}</span>
                  </AnimatedIcon>
                  <h2 className="text-xl font-semibold text-purple-400">
                    {lang === "en" ? z.name_en : z.name_mm}
                  </h2>
                </div>

                <p className="font-semibold">
                  {lang === "en" ? "Personality" : "အကျင့်စရိုက်"}
                </p>
                <p>{lang === "en" ? z.personality_en : z.personality_mm}</p>

                <p className="font-semibold mt-2">
                  {lang === "en" ? "Love" : "ချစ်ရေး"}
                </p>
                <p>{lang === "en" ? z.love_en : z.love_mm}</p>

                <p className="font-semibold mt-2">
                  {lang === "en" ? "Career" : "အလုပ်အကိုင်"}
                </p>
                <p>{lang === "en" ? z.career_en : z.career_mm}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
