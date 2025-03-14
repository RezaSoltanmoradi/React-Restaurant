const iranianFoods = [
  {
    title: "قرمه سبزی",
    description:
      "خورشتی محبوب با سبزی‌های معطر، لوبیا و گوشت که طعمی بی‌نظیر دارد...",
    price: 180,
    id: "ghorme-sabzi",
  },
  {
    title: "قیمه",
    description:
      "خورشتی خوشمزه با گوشت، لپه و سیب‌زمینی سرخ‌شده که با برنج سرو می‌شود...",
    price: 170,
    id: "gheymeh",
  },
  {
    title: "جوجه کباب",
    description:
      "مرغ مزه‌دار شده و گریل‌شده که معمولاً با برنج یا نان سرو می‌شود...",
    price: 220,
    id: "joojeh-kebab",
  },
  {
    title: "چلوکباب کوبیده",
    description:
      "کبابی لذیذ از گوشت چرخ‌کرده با ادویه‌های مخصوص، سرو شده با برنج زعفرانی...",
    price: 250,
    id: "kabab-koobideh",
  },
  {
    title: "چلوکباب برگ",
    description:
      "گوشت راسته گوساله یا گوسفند، مرینیت شده و کبابی با برنج زعفرانی...",
    price: 280,
    id: "kabab-barg",
  },
  {
    title: "آبگوشت",
    description:
      "غذایی سنتی از گوشت، نخود، لوبیا و سیب‌زمینی که معمولاً با نان سنگک سرو می‌شود...",
    price: 200,
    id: "abgoosht",
  },
  {
    title: "باقالی پلو با گوشت",
    description:
      "برنج زعفرانی مخلوط با باقالی و شوید، همراه با گوشت بره یا مرغ...",
    price: 260,
    id: "baghali-polo",
  },
  {
    title: "زرشک پلو با مرغ",
    description:
      "ترکیبی از برنج زعفرانی، زرشک و مرغ خوش‌طعم که از غذاهای مجلسی ایرانی است...",
    price: 190,
    id: "zereshk-polo",
  },
  {
    title: "کوفته تبریزی",
    description:
      "توپ‌های گوشتی پر شده با تخم‌مرغ و گردو، همراه با سس گوجه و ادویه‌های معطر...",
    price: 210,
    id: "koofteh-tabrizi",
  },
  {
    title: "میرزاقاسمی",
    description:
      "غذای شمالی از بادمجان دودی، تخم‌مرغ و گوجه‌فرنگی که طعمی دودی و لذیذ دارد...",
    price: 150,
    id: "mirza-ghasemi",
  },
  {
    title: "فسنجان",
    description:
      "خورشتی از گردو و رب انار با گوشت یا مرغ، با طعمی ملس و خاص...",
    price: 240,
    id: "fesenjan",
  },
  {
    title: "کلم پلو شیرازی",
    description:
      "پلو مخلوط با کلم، سبزیجات معطر و گوشت قلقلی، یکی از غذاهای معروف شیراز...",
    price: 180,
    id: "kalam-polo",
  },
  {
    title: "ماهی شکم پر",
    description:
      "ماهی تازه پر شده با سبزیجات و گردو، مناسب برای سفره‌های مجلسی...",
    price: 300,
    id: "mahi-shekam-por",
  },
  {
    title: "دیزی سنگی",
    description:
      "نسخه سنتی آبگوشت که در ظرف سنگی پخته می‌شود و طعمی خاص دارد...",
    price: 220,
    id: "dizi-sangi",
  },
];
// تابع شافل کردن آرایه (الگوریتم Fisher-Yates)
const shuffleArray = (array) => {
  let shuffledArray = [...array]; // جلوگیری از تغییر آرایه اصلی
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

// شافل کردن لیست غذاها
const shuffledFoods = shuffleArray(iranianFoods);

export default shuffledFoods;
