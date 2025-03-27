import fetchConfiguration from "../../services/connection";
import { type Link } from "../../types/app-types";

const template = document.createElement("template");

template.innerHTML = `
  <style>
    @import url("src/components/styles/nav-bar.css");
  </style>
  <nav class="menu">
    <ul id="links"></ul>
    <div class="settings-container">
      <slot name="icon-language"></slot>
      <div class="language">
        <select class="language-list">
          <option value="english" selected="selected">EN</option>
          <option value="spanish">ES</option>
        </select>
      </div>
      <slot name="icon-theme"></slot>
      <label class="switch">
        <input type="checkbox" id="theme-slider" />
        <span class="slider"></span>
      </label>
    </div>
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

    const themeSlider = this.shadowRoot?.getElementById("theme-slider")!;
    themeSlider.addEventListener("change", this.toogleTheme);
  }
  addLinks(navbarLinks: Link[], ul: HTMLElement) {
    navbarLinks.forEach((link: Link, index: number) => {
      const li = document.createElement("li");
      li.textContent = link.name;
      if (index === 0) li.classList.add("selected");
      li.addEventListener("click", (e) => {
        e.preventDefault();
        if (!li.classList.contains("selected")) {
          this.changeSection(e.target as HTMLElement, link.event);
        }
      });
      ul.appendChild(li);
    });
  }
  changeSection(li: HTMLElement, event: string) {
    this.dispatchEvent(
      new CustomEvent(event, {
        detail: {},
        bubbles: true,
        composed: true,
      })
    );
    this.shadowRoot?.querySelectorAll(".menu>ul>li").forEach((li) => {
      li.classList.remove("selected");
    });
    li.classList.add("selected");
  }
  toogleTheme() {
    const currentTheme = localStorage.getItem("theme");
    const targetTheme = currentTheme === "dark" ? "light" : "dark";
    this.dispatchEvent(
      new CustomEvent("change-theme", {
        detail: { theme: targetTheme },
        bubbles: false,
        composed: true,
      })
    );
  }
}

customElements.define("nav-bar", NavBar);
