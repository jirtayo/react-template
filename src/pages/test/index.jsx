import { withI18n } from "../../utils/i18n";

const Test = ({ t }) => {
  return (
    <div style={{ background: "#ccc" }}>
      {t("hello")}
      <div>{t("global:language")}</div>
    </div>
  );
};
export default withI18n("test", {
  cn: require("./i18n/cn.json"),
  en: require("./i18n/en.json"),
})(Test);
