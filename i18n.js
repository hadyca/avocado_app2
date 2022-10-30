import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const resources = {
  ko: {
    translation: {
      home: { top_1: "안녕" },
    },
  },
  en: {
    translation: {
      home: { top_1: "hello" },
    },
  },
  vn: {
    translation: {
      welcome: "G",
    },
  },
};

export const loadLng = (lng) => {
  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources,
    lng,
    fallbackLng: "vn",
  });
};

export default i18n;
