import fetchConfiguration from "../services/connection";
import { Resume } from "../types/types";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    @import url("src/styles/ui/button.css");
    @import url("src/components/styles/button-container.css");
    @import url("node_modules/@fortawesome/fontawesome-free/css/all.min.css");
  </style>
  <div class="information-btn">
    <button id="about-me-btn" type="button" class="btn">
      <i class="fa fa-user"></i>About me
    </button>
    <button id="resume-btn" type="button" class="btn">
      <i class="fa fa-list-alt"></i>Resume
    </button>
  </div>
`;

class ButtonContainer extends HTMLElement {
  constructor() {
    super();
    const container = this.attachShadow({ mode: "open" });
    container.appendChild(template.content.cloneNode(true));
  }
  async connectedCallback() {
    const configuration = await fetchConfiguration();

    const aboutMeButton = this.shadowRoot?.getElementById("about-me-btn")!;
    const resumeButton = this.shadowRoot?.getElementById("resume-btn")!;

    aboutMeButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.dispatchEvent(
        new CustomEvent("hide-section", {
          detail: {},
          bubbles: true,
          composed: true,
        })
      );
    });
    resumeButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.displayResume(configuration.resume["en"]);
    });
  }
  displayResume(resume: Resume) {
    open(resume.link, resume.target);
  }
}

customElements.define("button-container", ButtonContainer);
