import i18next from "i18next";
import {initReactI18next} from 'react-i18next';
import en from '../locales/en.json';
import ar from '../locales/ar.json';

export const languagesResources = {
  en: { translation: en},
  ar: { translation: ar}
};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  lng: 'en',
  fallbackLng: "en",
  resources: languagesResources,
});


export const translation = (text) => {

    const [first, last] = text.split(".");
    const lang = i18next.language; 
    const data = languagesResources[lang].translation;

    
    if (last && data[first] && typeof data[first] === "object") {
      return data[first][last] || text;
    }

    return data[text] || text;
};

export default i18next;
