import templateHTML from "./nav-bar.html?raw";
import styles from "./nav-bar.css?inline";
import {
  type LanguageConfiguration,
  type Link,
  type Event,
} from "./nav-bar.types";

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
    const language = localStorage.getItem("language") || "en";
    const languageConfig = await import(`./config/${language}.json`);
    const themeSlider = this.shadowRoot?.getElementById("theme-slider")!;
    themeSlider.addEventListener("change", this.toogleTheme);
    this.renderTemplate(languageConfig);
  }
  renderTemplate(languageConfig: LanguageConfiguration) {
    const ul = this.shadowRoot?.getElementById("links")!;
    languageConfig.navbar.forEach((link: Link) => {
      const li = document.createElement("li");
      li.textContent = link.name;
      if (link.selected) li.classList.add("selected");
      li.addEventListener("click", (e) => {
        e.preventDefault();
        if (!li.classList.contains("selected")) {
          this.changeSection(e.target as HTMLElement, link.event);
        }
      });
      ul.appendChild(li);
    });
  }
  changeSection(li: HTMLElement, event: Event) {
    this.dispatchEvent(
      new CustomEvent(event, {
        detail: {},
        bubbles: true,
        composed: true,
      })
    );
    this.shadowRoot?.querySelectorAll(".menu>ul>li").forEach((li) => {
      li.classList.remove("selected");
    });
    li.classList.add("selected");
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
