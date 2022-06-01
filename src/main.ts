import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "@/plugins/i18n";

import "./registerServiceWorker";

const appDependencies = [store, router, i18n];

const app = createApp(App);

appDependencies.forEach((dependency) => app.use(dependency));
app.mount("#app");
