import templateHTML from "./footer.html?raw";
import styles from "./footer.css?inline";
import { type LanguageConfiguration } from "./footer.types";

const template = document.createElement("template");

template.innerHTML = `
  <style>
    ${styles}
  </style>
  ${templateHTML}
`;

class Footer extends HTMLElement {
  constructor() {
    super();
    const container = this.attachShadow({ mode: "open" });
    container.appendChild(template.content.cloneNode(true));
  }
  async connectedCallback() {
    const language = localStorage.getItem("language") || "en";
    const languageConfig = await import(`./config/${language}.json`);
    this.renderTemplate(languageConfig);
  }
  renderTemplate(languageConfig: LanguageConfiguration) {
    const description = this.shadowRoot?.getElementById("description")!;
    const copyright = this.shadowRoot?.getElementById("copyright")!;
    description.textContent = languageConfig.description;
    const year = new Date().getFullYear().toString();
    copyright.textContent = languageConfig.copyright.replace("{}", year);
  }
}

customElements.define("footer-container", Footer);
