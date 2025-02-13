import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          lang: "English",
          dev_by: "Development by",
          my_name: "Mohamad Taha Kasir",
          home: "Home",
          movies: "Movies",
          series: "Series",
          trending: "Trending",
          top_rated: "Top rated",
          coming: "Upcoming",
          search_placeholder: "enter movie name or tv show name....",
          language: "Language",
          rate: "Rate",
          company: "Company",
          sort_by: "Sort by",
          popularity: "popularity",
          release_date: "Release Date",
          title: "Title",
          genres: "Genres",
          err_msg: "No internet connection or an unknown error occurred!",
          trailer: "Watch trailer",
          seasons: "Seasons:",
          eposides: "Eposides:",
          status: "Status:",
          overview: "Overview",
          details: "Details",
          run_time: "Run time",
          min: "min",
          country: "Country",
          creator: "Creators",
          type: "Type",
          similiar: "Similiar shows",
        },
      },
      ar: {
        translation: {
          lang: "العربية",
          dev_by: "تم تطويره من قبل",
          my_name: "محمد طه قصير",
          home: "الرئيسية",
          movies: "الافلام",
          series: "المسلسلات",
          trending: "الرائجة",
          top_rated: "الاعلى تقييماً",
          coming: "القادمة",
          search_placeholder: "ادخل اسم الفيلم أو المسلسل...",
          language: "اللغة",
          rate: "التقييم",
          company: "الشركة",
          sort_by: "ترتيب حسب",
          popularity: "الشهرة",
          release_date: "تاريخ الاصدار",
          title: "الاسم",
          genres: "التصنيف",
          err_msg: "لايوجد انترنت او حدث خطأ ما!",
          trailer: "شاهد المقطع الدعائي",
          seasons: ":عدد المواسم:",
          eposides: "عدد الحلقات:",
          status: "الحالة:",
          overview: "نظرة عامة",
          details: "التفاصيل",
          run_time: "المدة",
          min: "دقيقة",
          country: "المدينة",
          creator: "المنتجين",
          type: "النوع",
          similiar: "العروض المشابهة",
        },
      },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
