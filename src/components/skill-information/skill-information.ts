import fetchConfiguration from "../../services/connection";
import templateHTML from "./skill-information.html?raw";
import sytles from "./skill-information.css?inline";
import { type SkillSet, type Container, type Key } from "../../types/app-types";

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
    subtitle.textContent = this.capitalize(stakname);
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
  capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

customElements.define("skill-information", SkillInformation);
