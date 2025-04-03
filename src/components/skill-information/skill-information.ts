import templateHTML from "./skill-information.html?raw";
import sytles from "./skill-information.css?inline";
import {
  type SkillSet,
  type Container,
  type Discipline,
} from "./skill-information.types";
import generalConfig from "./config/general.json";

const template = document.createElement("template");

template.innerHTML = `
  <style>
    ${sytles}
  </style>
  ${templateHTML}
`;

class SkillInformation extends HTMLElement {
  constructor() {
    super();
    const container = this.attachShadow({ mode: "open" });
    container.appendChild(template.content.cloneNode(true));
  }
  async connectedCallback() {
    const language = localStorage.getItem("language") || "en";
    const languageConfig = await import(`./config/${language}.json`);
    const title = this.shadowRoot?.getElementById("title")!;
    title.textContent = languageConfig.title;
    const skillMap = new Map<Discipline, SkillSet>(
      Object.entries(generalConfig.skills)
    );
    skillMap.forEach((value, key) => {
      const container = this.shadowRoot?.getElementById(key)!;
      this.renderTechStack(container, value, languageConfig.disciplines[key]);
    });
  }
  renderTechStack(
    container: Container,
    skillset: SkillSet,
    discipline: Discipline
  ) {
    const subtitle = document.createElement("span");
    subtitle.textContent = discipline;
    subtitle.classList.add("skill-subtitle");
    container.appendChild(subtitle);
    const divContainer = document.createElement("div");
    divContainer.classList.add("skill-container");
    container.appendChild(divContainer);
    skillset.forEach((skill) => {
      const img = document.createElement("img");
      img.setAttribute("src", skill.icon);
      img.setAttribute("alt", `${skill.name} image`);
      img.setAttribute("id", skill.name);
      img.classList.add("skill-icon");
      divContainer.appendChild(img);
    });
  }
}

customElements.define("skill-information", SkillInformation);
