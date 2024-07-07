import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend, { HttpBackendOptions } from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const defaultLocales = [{ code: 'en', name: 'English' }];
export const locales = [...defaultLocales, { code: 'es', name: 'Español' }];

const importInternalLocale = (locale: string, ns: string) =>
  import(`../assets/locales/${locale}/${ns}.json`).then((res) => res.default);

const fetchExternalLocale = (locale: string, ns: string) =>
  fetch(`/locales/${locale}/${ns}.json`).then((res) => res.json());

function loadLocale(locale: string, ns: string) {
  if (defaultLocales.find(({ code }) => code === locale)) {
    return importInternalLocale(locale, ns).catch((err) => {
      console.error(err);
    });
  }

  return fetchExternalLocale(locale, ns);
}

const backendOptions: HttpBackendOptions = {
  loadPath: '{{lng}}|{{ns}}',
  request: (_, url, __, callback) => {
    try {
      const [lng, ns] = url.split('|');

      loadLocale(lng, ns).then((data) => {
        callback(null, {
          data: JSON.stringify(data),
          status: 200,
        });
      });
    } catch (e) {
      console.error(e);
      callback(null, {
        data: '',
        status: 500,
      });
    }
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: backendOptions,
    debug: import.meta.env.DEV,
    defaultNS: 'common',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    lng: 'en',
    // Allows "en-US" and "en-UK" to be implicitly supported when "en" is supported
    nonExplicitSupportedLngs: true,
    ns: ['common'],
  });

export default i18n;
