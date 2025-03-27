import fetchConfiguration from "../../services/connection";
import { type PrincipalImage } from "../../types/app-types";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    @import url("src/pages/styles/home.css");
  </style>
  <section id="home" class="home-container">
    <div class="information-container">
      <h1>Hi! I am Alejandro David Tapia Talavera</h1>
      <p class="description">Software Engineer and Full-stack Developer</p>
      <slot name="info-buttons"></slot>
      <slot name="info-links"></slot>
    </div>
    <img id="principal-image"/>
  </section>
`;

class Home extends HTMLElement {
  constructor() {
    super();
    const section = this.attachShadow({ mode: "open" });
    section.appendChild(template.content.cloneNode(true));
  }
  async connectedCallback() {
    const configuration = await fetchConfiguration();
    this.displayPrincipalImage(configuration.principalImage);
  }
  displayPrincipalImage(principalImage: PrincipalImage) {
    const image = this.shadowRoot?.getElementById("principal-image")!;
    image.setAttribute("src", principalImage.src);
    image.setAttribute("alt", principalImage.alt);
  }
}

customElements.define("home-section", Home);
