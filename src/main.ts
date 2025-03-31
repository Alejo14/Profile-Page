import fetchConfiguration from "./services/connection";
import { type Link } from "./types/app-types";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./style.css";
import "./components";
import "./layouts";
import "./pages";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <nav-bar id="nav-bar" class="layout">
    <i slot="icon-language" class="fa fa-language fa-lg" id="language-icon"></i>
    <i slot="icon-theme" id="theme-icon"></i>
  </nav-bar>
  <div class="container">
    <home-section id="home-section">
      <resume-information slot="info-buttons"></resume-information>
      <contact-information slot="info-links"></contact-information>
    </home-section>
    <about-me-section id="about-me-section" class="d-none">
      <skill-information slot="skill-container"></skill-information>
    </about-me-section>
    <!-- TODO: How to add the projects that I have done to the website -->
    <!-- Should I need a new page for projects? Can I optimize space? -->
  </div>
  <footer-container id="footer" class="layout"></footer-container>
`;

const navbarContainer = document.getElementById("nav-bar")!;
const themeIcon = document.getElementById("theme-icon")!;
const configuration = await fetchConfiguration();

configuration.navbar.forEach((el: Link) => {
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

const setTheme = () => {
  const themeStorage = localStorage.getItem("theme");
  const theme =
    (themeStorage && themeStorage === "dark") ||
    (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
      ? "dark"
      : "light";
  localStorage.setItem("theme", theme);
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeIcon.classList.add("fa-solid", "fa-moon");
  } else {
    themeIcon.classList.add("fa-solid", "fa-sun");
  }
};

setTheme();
