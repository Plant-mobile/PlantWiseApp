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

export default i18next;
