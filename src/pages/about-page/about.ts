import templateHTML from "./about.html?raw";
import styles from "./about.css?inline";

const template = document.createElement("template");
template.innerHTML = `
  <style>
   ${styles}
  </style>
  ${templateHTML}
`;

class AboutMe extends HTMLElement {
  constructor() {
    super();
    const section = this.attachShadow({ mode: "open" });
    section.appendChild(template.content.cloneNode(true));
  }
  async connectedCallback() {
    const language = localStorage.getItem("language") || "en";
    const languageConfig = await import(`./config/${language}.json`);
    const title = this.shadowRoot?.getElementById("title")!;
    const aboutMeDescription = this.shadowRoot?.getElementById(
      "about-me-description"
    )!;
    title.textContent = languageConfig.title;
    aboutMeDescription.textContent = languageConfig.aboutMe;
  }
}

customElements.define("about-me-section", AboutMe);
