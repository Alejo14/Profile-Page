import fetchConfiguration from "../services/connection";
import { type Resume } from "../types/types";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    @import url("src/components/styles/resume-button.css");
    @import url("node_modules/@fortawesome/fontawesome-free/css/all.min.css");
  </style>
  <div class="information-btn">
    <button id="resume-btn" type="button" class="btn">
      <i class="fa fa-list-alt"></i>Resume
    </button>
  </div>
`;

class ResumeButton extends HTMLElement {
  constructor() {
    super();
    const container = this.attachShadow({ mode: "open" });
    container.appendChild(template.content.cloneNode(true));
  }
  async connectedCallback() {
    const configuration = await fetchConfiguration();
    const resumeButton = this.shadowRoot?.getElementById("resume-btn")!;
    resumeButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.displayResume(configuration.resume["en"]);
    });
  }
  displayResume(resume: Resume) {
    open(resume.link, resume.target);
  }
}

customElements.define("resume-button", ResumeButton);
