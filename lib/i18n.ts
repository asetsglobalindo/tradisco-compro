import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        Home: "Home",
        "about-us": "About Us",
        "contact-us": "Contact Us",
        "our-services": "Our Services",
      },
    },
    id: {
      translation: {
        Home: "Beranda",
        "about-us": "Tentang Kami",
        "contact-us": "Hubungi Kami",
        "our-services": "Layanan Kami",
      },
    },
  },
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;