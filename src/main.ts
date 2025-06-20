import mainHtml from "./main.html?raw";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./style.css";
import "./components";
import "./layouts";
import "./pages";
import generalConfig from "./config/general.json";
import { setLanguage, setTheme } from "./utils/utils";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = mainHtml;

const themeIcon = document.getElementById("theme-icon")!;
const defaultLanguage = generalConfig.defaultLanguage;

setTheme(themeIcon);
setLanguage(defaultLanguage);

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
