import { en } from "./en";
import { cs } from "./cs";

export const dictionaries = { en, cs };

export function t(lang, key, params) {
  const dict = dictionaries[lang] || dictionaries.en;
  let text = dict[key] || key;

  if (params) {
    Object.keys(params).forEach((k) => {
      text = text.replaceAll(`{${k}}`, String(params[k]));
    });
  }
  return text;
}
