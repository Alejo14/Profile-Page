import fetchConfiguration from "../../services/connection";
import templateHtml from "./resume-information.html?raw";
import styles from "./resume-information.css?inline";
import { type Resume } from "../../types/app-types";

const template = document.createElement("template");
template.innerHTML = `
<style>
  @import url("node_modules/@fortawesome/fontawesome-free/css/all.min.css");
  ${styles}
</style>
${templateHtml}`;

class ResumeInformation extends HTMLElement {
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
      const resume = configuration.resume as Resume;
      open(resume.link, resume.target);
    });
  }
}

customElements.define("resume-information", ResumeInformation);
