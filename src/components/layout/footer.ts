import fetchConfiguration from "../../services/connection";

const template = document.createElement("template");

template.innerHTML = `
  <style>
    @import url("src/components/styles/footer.css");
  </style>
  <div class="footer">
    <span id="description"></span>
    <span id="copyright"></span>
  <div>
`;

class Footer extends HTMLElement {
  constructor() {
    super();
    const container = this.attachShadow({ mode: "open" });
    container.appendChild(template.content.cloneNode(true));
  }
  async connectedCallback() {
    const configuration = await fetchConfiguration();
    const footer = configuration.footer["en"];
    const description = this.shadowRoot?.getElementById("description")!;
    const copyright = this.shadowRoot?.getElementById("copyright")!;
    description.textContent = footer.description;
    const year = new Date().getFullYear().toString();
    copyright.textContent = footer.copyright.replace("{}", year);
  }
}

customElements.define("footer-container", Footer);
