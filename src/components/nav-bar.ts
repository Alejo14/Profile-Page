import fetchConfiguration from "../services/connection";
import { type Link } from "../types/types";

const template = document.createElement("template");

template.innerHTML = `
  <style>
    @import url("src/components/styles/nav-bar.css");
  </style>
  <nav class="menu">
    <ul id="links"></ul>
  </nav>
`;

class NavBar extends HTMLElement {
  constructor() {
    super();
    const container = this.attachShadow({ mode: "open" });
    container.appendChild(template.content.cloneNode(true));
  }
  async connectedCallback() {
    const configuration = await fetchConfiguration();
    const ul = this.shadowRoot?.getElementById("links")!;
    this.addLinks(configuration.navbar, ul);
  }
  addLinks(navbarLinks: Link[], ul: HTMLElement) {
    navbarLinks.forEach((link: Link, index: number) => {
      const li = document.createElement("li");
      li.textContent = link.name;
      if (index === 0) li.classList.add("selected");
      li.addEventListener("click", (e) => {
        e.preventDefault();
        if (!li.classList.contains("selected")) {
          this.configureClickEvent(e.target as HTMLElement, link.event);
        }
      });
      ul.appendChild(li);
    });
  }
  configureClickEvent(li: HTMLElement, event: string) {
    const success = this.dispatchEvent(
      new CustomEvent(event, {
        detail: {},
        bubbles: true,
        composed: true,
      })
    );
    console.log(success);
    this.shadowRoot?.querySelectorAll(".menu>ul>li").forEach((li) => {
      li.classList.remove("selected");
    });
    li.classList.add("selected");
  }
}

customElements.define("nav-bar", NavBar);
