import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import { I18nManager, Platform } from "react-native";

import en from "../locales/en.json";
import ar from "../locales/ar.json";

export const languagesResources = {
  en: { translation: en },
  ar: { translation: ar },
};

// ✅ تحديد لغة الجهاز
const locales = Localization.getLocales();
const deviceLang = locales.length > 0 ? locales[0].languageCode : "en";

// ✅ تحديد إذا اللغة عربية أو لا
const isRTL = deviceLang === "ar";

// ✅ ضبط اتجاه التطبيق (مهم جداً للأجهزة الحقيقية)
if (I18nManager.isRTL !== isRTL) {
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);

  
}



// ✅ تهيئة i18next
i18next.use(initReactI18next).init({
  compatibilityJSON: "v4",
  lng: isRTL ? "ar" : "en",
  fallbackLng: "en",
  resources: languagesResources,
  interpolation: {
    escapeValue: false,
  },
});

export const translation = (key, params = {}) => {
  
  const translated = i18next.t(key, params);


  if (translated === key) {
    const [group, sub] = key.split(".");
    const lang = i18next.language;
    const data = i18next.getResourceBundle(lang, "translation");

    if (sub && data[group] && typeof data[group] === "object") {
      const value = data[group][sub];
      if (value) {
        return value.replace(/{{(.*?)}}/g, (_, match) => params[match.trim()] ?? "");
      }
    }

    return data[key] || key;
  }

  return translated;
};

// ✅ نصدّر حالة الاتجاه لتستخدمها في التصاميم
export const isAppRTL = isRTL;

export default i18next;
