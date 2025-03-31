import fetchConfiguration from "../../services/connection";
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
    const configuration = await fetchConfiguration();
    const aboutMeDescription = this.shadowRoot?.getElementById(
      "about-me-description"
    )!;
    aboutMeDescription.textContent = configuration.aboutMe;
  }
}

customElements.define("about-me-section", AboutMe);
