import templateHTML from "./nav-bar.html?raw";
import styles from "./nav-bar.css?inline";
import { type Link } from "./nav-bar.types";
import generalConfig from "./config/general.json";
import { getLanguage } from "../../utils/utils";
import { Languages } from "../../types/main.types";

const template = document.createElement("template");

template.innerHTML = `
  <style>
    ${styles}
  </style>
  ${templateHTML}
`;

class NavBar extends HTMLElement {
  constructor() {
    super();
    const container = this.attachShadow({ mode: "open" });
    container.appendChild(template.content.cloneNode(true));
  }
  async connectedCallback() {
    const language = getLanguage();
    const themeSlider = this.shadowRoot?.getElementById("theme-slider")!;
    themeSlider.addEventListener("change", this.toogleTheme);
    this.renderTemplate(generalConfig.navbar, language);
  }
  renderTemplate(navbar: Link[], language: Languages) {
    const ul = this.shadowRoot?.getElementById("links")!;
    navbar.forEach((link) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.textContent = link.name[language];
      a.setAttribute("href", link.href);
      li.appendChild(a);
      ul.appendChild(li);
    });
  }
  toogleTheme() {
    const currentTheme = localStorage.getItem("theme");
    const targetTheme = currentTheme === "dark" ? "light" : "dark";
    this.dispatchEvent(
      new CustomEvent("change-theme", {
        detail: { theme: targetTheme },
        bubbles: false,
        composed: true,
      })
    );
  }
}

customElements.define("nav-bar", NavBar);
