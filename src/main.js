import { routes } from "./views/routes.js";
import { observer } from "./firebase.js";

window.addEventListener("load", () => {
  routes(window.location.hash);
  // utilizar en vez de hash (href) segun el feedback de Domi ;3
  observer();
});

window.addEventListener("hashchange", () => {
  routes(window.location.hash);
  observer();
});
