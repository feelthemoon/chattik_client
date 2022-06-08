import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store, { key } from "./store";
import i18n from "@/plugins/i18n";

import "./registerServiceWorker";
import "ant-design-vue/dist/antd.css";
import "@/assets/styles/index.less";

const appDependencies = [store, router, i18n];

const app = createApp(App);

appDependencies.forEach((dependency) =>
  dependency === store ? app.use(dependency, key) : app.use(dependency)
);
app.mount("#app");
