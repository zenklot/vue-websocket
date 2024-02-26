import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createI18n } from "vue-i18n";

import en from "./locales/en.json";
import id from "./locales/id.json";

const i18n = createI18n({
  locale: "id",
  messages: {
    en,
    id,
  },
  fallbackLocale: "en",
});

const app = createApp(App);
app.use(i18n);
app.mount("#app");
