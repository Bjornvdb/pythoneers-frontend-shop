import store from "./store";
import { createApp } from "vue";
import i18n from "@/i18n";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import router from "@/router";

const app = createApp(App);

// CSS themes
import "primeflex/primeflex.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primevue/resources/themes/arya-blue/theme.css";
import "@/assets/css/style.css";

//Lib components
import Button from "primevue/button";
import Avatar from "primevue/avatar";
import Dialog from "primevue/dialog";

app.use(PrimeVue);
app.use(router);
app.use(store);
app.use(i18n);
app.use(ToastService);

app.component("Button", Button);
app.component("Avatar", Avatar);
app.component("Dialog", Dialog);

app.mount("#app");
