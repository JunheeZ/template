import type { DropMenu } from "@/components/Dropdown";
import type { LocaleSetting, LocaleType } from "#/config";

export const LOCALE: { [key: string]: LocaleType } = {
  ZH_CN: "zh_CN",
  EN_US: "en"
};

export const localeSetting: LocaleSetting = {
  showPicker: true,
  locale: LOCALE.ZH_CN,
  fallback: LOCALE.ZH_CN,
  availableLocales: [LOCALE.ZH_CN, LOCALE.EN_US]
};

export const localeList: DropMenu[] = [
  {
    text: "简体中文",
    event: LOCALE.ZH_CN
  },
  {
    text: "English",
    event: LOCALE.EN_US
  }
];
