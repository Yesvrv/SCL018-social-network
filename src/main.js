import { routes } from "./views/routes";

window.addEventListener("load", () => {
  routes(window.location.hash);
});

window.addEventListener("hashchange", () => {
  routes(window.location.hash);
});
