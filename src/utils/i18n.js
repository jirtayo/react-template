import i18n from "i18next";
// import jsCookie from "js-cookie";
import { createContext } from "react";
import {
  useTranslation,
  withTranslation,
  initReactI18next,
} from "react-i18next";
import jsx_runtime_1 from "react/jsx-runtime";
// require("json5/lib/register");
//i18next-browser-languagedetector插件 这是一个 i18next 语言检测插件，用于检测浏览器中的用户语言，
//详情请访问：https://github.com/i18next/i18next-browser-languageDetector
// import LanguageDetector from "i18next-browser-languagedetector";
//引入需要实现国际化的简体、繁体、英文三种数据的json文件
const resources = {
  cn: {
    global: {
      language: "全局中文 language",
    },
  },
  en: {
    global: {
      language: "全局english",
    },
  },
};
// const languageCode = jsCookie.get("languageCode");
i18n
  // .use(LanguageDetector) //嗅探当前浏览器语言 zh-CN
  .use(initReactI18next) // 将 i18n 向下传递给 react-i18next
  .init({
    //初始化
    resources, //本地多语言数据
    fallbackLng: "cn", //默认当前环境的语言
    detection: {
      caches: ["localStorage", "sessionStorage", "cookie"],
    },
  });

export default i18n;

var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
export function withI18n(namespace, resourceMap) {
  console.log(resourceMap, "resourceMap");
  return function wrap(WrappedComponent) {
    function WithNamespacedI18n(props) {
      const i18nContext = createContext(undefined);
      const { i18n: i18nInstance } = useTranslation();
      i18nInstance.addResources(
        i18nInstance.language,
        namespace,
        resourceMap[i18nInstance.language]
      );
      i18nInstance.loadNamespaces(namespace);
      return (0, jsx_runtime_1.jsx)(
        i18nContext.Provider,
        __assign(
          {
            value: {
              namespace: namespace,
              i18nInstance: i18nInstance,
              // i18nInfo: i18nInfo,
            },
          },
          {
            children: (0, jsx_runtime_1.jsx)(
              WrappedComponent,
              __assign({}, props),
              void 0
            ),
          }
        ),
        void 0
      );
    }
    // (0, hoist_non_react_statics_1.default)(WithNamespacedI18n, WrappedComponent);
    return withTranslation(namespace)(WithNamespacedI18n);
  };
}
