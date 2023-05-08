import React from "react";
import { useTranslation } from "react-i18next";
import Test from "./pages/test";
import { withI18n } from "./utils/i18n";

function App(props) {
  console.log(props, "props");
  const { t } = useTranslation();

  return (
    <div className="App">
      <div>App: {t("global:language")}</div>
      <div>APP: {t("haha")}</div>
      <Test />
    </div>
  );
}

export default withI18n("app", {
  cn: require("./i18n/cn.json"),
  en: require("./i18n/en.json"),
})(App);
