import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaLanguage } from "react-icons/fa6";
import { Context } from "../../context/Context";

const LanguageToggleBtn = () => {
  const { setShowSidebar } = useContext(Context);
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const newLang = currentLang === "ar" ? "en-US" : "ar";

  useEffect(() => {
    document.body.setAttribute("dir", i18n.language === "ar" ? "rtl" : "ltr");
  }, [i18n.language]);

  const toggleLanguage = () => {
    i18n.changeLanguage(newLang);
    document.body.setAttribute("dir", i18n.language === "ar" ? "rtl" : "ltr");
    setShowSidebar(false);
  };

  return (
    <button
      style={{ fontSize: "16px" }}
      onClick={toggleLanguage}
      className="linksBtn"
      aria-label={t("change_language")}
    >
      {t("lang")}
      <FaLanguage fontSize={25} />
    </button>
  );
};

export default LanguageToggleBtn;
