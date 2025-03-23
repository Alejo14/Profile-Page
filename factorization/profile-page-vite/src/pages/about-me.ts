import fetchConfiguration from "../services/connection";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    @import url("src/styles/ui/button.css");
    @import url("src/pages/styles/about-me.css");
    @import url("node_modules/@fortawesome/fontawesome-free/css/all.min.css");
  </style>
  <section id="about-me" class="about-me-container">
    <div class="details-container">
      <div class="bio-container">
        <h2>About me</h2>
        <p id="about-me-description"></p>
      </div>
      <slot name="skill-container"></slot>
    </div>
    <button id="home-btn" class="btn">
      <i class="fa fa-home"></i> Home
    </button>
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

    const homeBtn = this.shadowRoot?.getElementById("home-btn")!;
    homeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.dispatchEvent(
        new CustomEvent("hide-section", {
          detail: {},
          bubbles: true,
          composed: true,
        })
      );
    });
  }
}

customElements.define("about-me-section", AboutMe);
