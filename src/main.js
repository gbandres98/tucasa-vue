import { createApp } from "vue";
import { createPinia } from "pinia";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faX, faCube, faTrashCan, faAngleUp, faAngleDown, faDoorClosed, faCouch, } from "@fortawesome/free-solid-svg-icons";
import App from "./App.vue";
import router from "./router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import vSelect from "vue-select";
library.add(faX, faCube, faTrashCan, faAngleUp, faAngleDown, faDoorClosed, faCouch);
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.component("v-select", vSelect);
app.mount("#app");
//# sourceMappingURL=main.js.map