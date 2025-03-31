import templateHTML from "./home.html?raw";
import styles from "./home.css?inline";
import generalConfig from "./config/general.json";
import { LanguageConfiguration, type ProfileImage } from "./home.types";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    ${styles}
  </style>
  ${templateHTML}
`;

class Home extends HTMLElement {
  constructor() {
    super();
    const section = this.attachShadow({ mode: "open" });
    section.appendChild(template.content.cloneNode(true));
  }
  async connectedCallback() {
    const language = localStorage.getItem("language") || "en";
    const languageConfig: LanguageConfiguration = await import(
      `./config/${language}.json`
    );
    const title = this.shadowRoot?.getElementById("title")!;
    const description = this.shadowRoot?.getElementById("description")!;
    title.textContent = languageConfig.title;
    description.textContent = languageConfig.description;
    this.displayPrincipalImage(generalConfig.profileImage);
  }
  displayPrincipalImage(profileImage: ProfileImage) {
    const image = this.shadowRoot?.getElementById("principal-image")!;
    image.setAttribute("src", profileImage.src);
    image.setAttribute("alt", profileImage.alt);
  }
}

customElements.define("home-section", Home);
