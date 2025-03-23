import fetchConfiguration from "../services/connection";
import { type SkillSet, type Container, type Key } from "../types/types";
import { capitalize } from "../utils/utils";

const template = document.createElement("template");

template.innerHTML = `
  <style>
    @import url("src/components/styles/skill-information.css");
  </style>
  <div class="skills-container">
    <h2>My skills</h2>
    <div id="front-end" class="container"></div>
    <div id="back-end" class="container"></div>
    <div id="database" class="container"></div>
    <div id="cloud" class="container"></div>
  </div>
`;

class SkillInformation extends HTMLElement {
  constructor() {
    super();
    const container = this.attachShadow({ mode: "open" });
    container.appendChild(template.content.cloneNode(true));
  }
  async connectedCallback() {
    const configuration = await fetchConfiguration();

    const skillMap = new Map<Key, SkillSet>(
      Object.entries(configuration.skills)
    );
    skillMap.forEach((value, key) => {
      const container = this.shadowRoot?.getElementById(key)!;
      this.displayStack(container, value, key);
    });
  }
  displayStack(container: Container, stack: SkillSet, stakname: Key) {
    const subtitle = document.createElement("span");
    subtitle.textContent = capitalize(stakname);
    subtitle.classList.add("skill-subtitle");
    container.appendChild(subtitle);
    const divContainer = document.createElement("div");
    divContainer.classList.add("skill-icons");
    container.appendChild(divContainer);
    stack.forEach((el) => {
      const img = document.createElement("img");
      img.setAttribute("src", el.icon);
      img.setAttribute("alt", `${el.name} image`);
      img.setAttribute("id", el.name);
      img.classList.add("skill-icon");
      divContainer.appendChild(img);
    });
  }
}

customElements.define("skill-information", SkillInformation);
