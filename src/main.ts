import { createApp } from "vue";
import { VueReCaptcha } from "vue-recaptcha-v3";
import store, { key } from "./store";
import App from "./App.vue";
import router from "./router";
import i18n from "@/plugins/i18n";

import "./registerServiceWorker";
import "ant-design-vue/dist/antd.css";
import "@/assets/styles/index.less";

const appDependencies = [
  { plugin: store, options: key },
  { plugin: router },
  { plugin: i18n },
  {
    plugin: VueReCaptcha,
    options: {
      siteKey: process.env.VUE_APP_RECAPTCHA_SITE_KEY,
      autoHideBadge: true,
    },
  },
];

const app = createApp(App);

appDependencies.forEach((dependency) => {
  app.use(dependency.plugin, dependency.options);
});
app.mount("#app");
