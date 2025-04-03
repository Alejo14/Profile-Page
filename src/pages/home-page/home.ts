import templateHTML from "./home.html?raw";
import styles from "./home.css?inline";
import generalConfig from "./config/general.json";
import {
  type LanguageConfiguration,
  type ProfileImage,
  type Resume,
} from "./home.types";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    @import url("node_modules/@fortawesome/fontawesome-free/css/all.min.css");
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
    this.renderProfilImage(generalConfig.profileImage);
    this.renderResumeBtn(languageConfig.resume);
  }
  renderProfilImage(profileImage: ProfileImage) {
    const image = this.shadowRoot?.getElementById("principal-image")!;
    image.setAttribute("src", profileImage.src);
    image.setAttribute("alt", profileImage.alt);
  }
  renderResumeBtn(resume: Resume) {
    const resumeButton = this.shadowRoot?.getElementById("resume-btn")!;
    resumeButton.addEventListener("click", (e) => {
      e.preventDefault();
      open(resume.link, resume.target);
    });
  }
}

customElements.define("home-section", Home);
