import { landingPage } from "./landing.js";
import { register } from "./register.js";
import { wall } from "./wall.js";

export const routes = (hash) => {
  // cambiar menuRegister por una variable más descriptiva como "hashUpdate"
  const menuRegister = document.getElementById("root");
  menuRegister.innerHTML = "";
  if (hash === "#/" || hash === "/" || hash === "#" || hash === "") {
    menuRegister.appendChild(landingPage());
  } else if (hash === "#/landing") {
    menuRegister.appendChild(landingPage());
  } else if (hash === "#/register") {
    menuRegister.appendChild(register());
  } else if (hash === "#/wall") {
    menuRegister.appendChild(wall());
  }
};
