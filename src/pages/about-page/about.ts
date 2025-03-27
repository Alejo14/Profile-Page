import fetchConfiguration from "../../services/connection";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    @import url("src/pages/styles/about.css");
  </style>
  <section id="about-me" class="about-me-container">
    <div class="details-container">
      <div class="bio-container">
        <h2>About me</h2>
        <p id="about-me-description"></p>
      </div>
      <slot name="skill-container"></slot>
    </div>
  </section>
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
