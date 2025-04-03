import { type Link } from "./types/main.types";
import mainHtml from "./main.html?raw";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./style.css";
import "./components";
import "./layouts";
import "./pages";
import generalConfig from "./config/general.json";
import { setLanguage, setTheme } from "./utils/utils";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = mainHtml;

const navbarContainer = document.getElementById("nav-bar")!;
const themeIcon = document.getElementById("theme-icon")!;

setTheme(themeIcon);
setLanguage();

generalConfig.navbarEvents.forEach((el: Link) => {
  navbarContainer.addEventListener(el.event, () => {
    document.querySelectorAll(".container > *").forEach((child) => {
      child.id === el.id
        ? child.classList.remove("d-none")
        : child.classList.add("d-none");
    });
  });
});

document.addEventListener(
  "change-theme",
  (e: CustomEventInit) => {
    localStorage.setItem("theme", e.detail.theme);
    document.documentElement.setAttribute("data-theme", e.detail.theme);
    themeIcon.classList.toggle("fa-sun");
    themeIcon.classList.toggle("fa-moon");
  },
  true
);

document.addEventListener(
  "change-language",
  (e: CustomEventInit) => {
    localStorage.setItem("language", e.detail.language);
    location.reload();
  },
  true
);
