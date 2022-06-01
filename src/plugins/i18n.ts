import { createI18n } from "vue-i18n";
import { WritableComputedRef } from "vue";

const i18n = createI18n({
  locale: "en",
  legacy: false,
  missing: (key: string, item: string) => {
    item = "";
    return item;
  },
});

const loadedLanguages = ["en"];

export function setI18nLanguage(lang: WritableComputedRef<string>): string {
  i18n.global.locale = lang;
  document.querySelector("html")?.setAttribute("lang", lang.value);
  return lang.value;
}

export function loadLanguageAsync(
  lang: WritableComputedRef<string>
): Promise<string> {
  // If the same language
  if (i18n.global.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang));
  }

  // If the language was already loaded
  if (loadedLanguages.includes(lang.value)) {
    return Promise.resolve(setI18nLanguage(lang));
  }

  // If the language hasn't been loaded yet
  return import(
    /* webpackChunkName: "lang-[request]" */ `@/langs/${lang}.json`
  ).then((messages) => {
    i18n.global.setLocaleMessage(lang.value, messages.default);
    loadedLanguages.push(lang.value);
    return setI18nLanguage(lang);
  });
}

export default i18n;
