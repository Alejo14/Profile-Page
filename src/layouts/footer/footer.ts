import templateHTML from "./footer.html?raw";
import styles from "./footer.css?inline";
import { type LanguageConfiguration, type Language } from "./footer.types";

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
    this.setLanguageOption(language);
  }
  renderTemplate(languageConfig: LanguageConfiguration) {
    const description = this.shadowRoot?.getElementById("description")!;
    const copyright = this.shadowRoot?.getElementById("copyright")!;
    description.textContent = languageConfig.description;
    const year = new Date().getFullYear().toString();
    copyright.textContent = languageConfig.copyright.replace("{}", year);
  }
  setLanguageOption(language: Language) {
    const languageOptions = this.shadowRoot?.querySelectorAll(
      ".language-list option"
    )!;
    languageOptions.forEach((lang) => {
      if (lang.id === language) lang.setAttribute("selected", "selected");
    });
    const languageSelect = this.shadowRoot?.querySelector(".language-list")!;
    languageSelect.addEventListener("change", (e) => {
      e.preventDefault();
      const target = e.target as HTMLSelectElement;
      console.log(target.value);
      this.dispatchEvent(
        new CustomEvent("change-language", {
          detail: { language: target.value },
          bubbles: false,
          composed: true,
        })
      );
    });
  }
}

customElements.define("footer-container", Footer);
