import templateHTML from "./home.html?raw";
import styles from "./home.css?inline";
import generalConfig from "./config/general.json";
import { type ProfileImage, type Buttons, type Resume } from "./home.types";
import { type Languages } from "../../types/main.types";
import { getLanguage } from "../../utils/utils";

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
    const language = getLanguage();
    const profession = this.shadowRoot?.getElementById("profession")!;
    const description = this.shadowRoot?.getElementById("description")!;
    profession.textContent = generalConfig.profession[language];
    description.textContent = generalConfig.description[language];
    this.renderProfilImage(generalConfig.profileImage);
    this.renderButtons(generalConfig.btn, language);
    this.addResumeBtnFn(generalConfig.resume, language);
  }
  renderProfilImage(profileImage: ProfileImage) {
    const image = this.shadowRoot?.getElementById("principal-image")!;
    image.setAttribute("src", profileImage.src);
    image.setAttribute("alt", profileImage.alt);
  }
  renderButtons(buttons: Buttons[], language: Languages) {
    buttons.forEach((btn) => {
      const button = this.shadowRoot?.getElementById(btn.id)!;
      const icon = document.createElement("i");
      icon.classList.add(...btn.icon.split(" "));
      button.appendChild(icon);
      button.innerHTML += btn.text[language];
    });
  }
  addResumeBtnFn(resume: Resume, language: Languages) {
    const button = this.shadowRoot?.getElementById("resume-btn")!;
    button.addEventListener("click", (e) => {
      e.preventDefault();
      open(resume.link[language], resume.target);
    });
  }
}

customElements.define("home-section", Home);
