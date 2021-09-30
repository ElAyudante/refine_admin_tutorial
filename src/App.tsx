import { Refine } from "@pankod/refine";

import "@pankod/refine/dist/styles.min.css";
import simpleRestDataProvider from "@pankod/refine-simple-rest";
import { authProvider } from "authProvider";
import { useTranslation } from "react-i18next";
import { Header } from "components";

function App() {
  const { t, i18n } = useTranslation();

  const API_URL = "https://api.fake-rest.refine.dev";
  const dataProvider = simpleRestDataProvider(API_URL);

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <Refine
      dataProvider={dataProvider}
      authProvider={authProvider}
      i18nProvider={i18nProvider}
      Header={Header}
    ></Refine>
  );
}

export default App;
