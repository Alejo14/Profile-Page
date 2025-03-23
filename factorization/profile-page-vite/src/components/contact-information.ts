import fetchConfiguration from "../services/connection";
import {
  type Email,
  type Icon,
  type Tooltip,
  type SocialMedia,
} from "../types/types";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    @import url("src/components/styles/contact-information.css");
    @import url("node_modules/@fortawesome/fontawesome-free/css/all.min.css");
  </style>
  <div class="icon-container"></div>
  <div class="email-container">
    <label>Email me:</label>
    <div>
      <a href="mailto:adtapiatalavera@gmail.com" id="email" class="email">
        adtapiatalavera@gmail.com
      </a>
      <div class="tooltip">
        <i id="copy-email" class="fa-regular fa-copy"></i>
        <p class="tooltip-text">Copy me!</p>
      </div>
    </div>
  </div>
`;

class ContactInformation extends HTMLElement {
  constructor() {
    super();
    const container = this.attachShadow({ mode: "open" });
    container.appendChild(template.content.cloneNode(true));
  }
  async connectedCallback() {
    const configuration = await fetchConfiguration();
    this.displaySocialMedia(configuration.socialMedia);
    const emailContent =
      this.shadowRoot?.getElementById("email")!.textContent ?? "";
    const copyIcon = this.shadowRoot?.getElementById("copy-email")!;
    const tooltip = this.shadowRoot?.querySelector(".tooltip .tooltip-text")!;
    copyIcon.addEventListener("click", (e) => {
      e.preventDefault();
      this.copyToClipboard(emailContent, copyIcon, tooltip);
    });
  }
  displaySocialMedia(socialMediaList: SocialMedia[]) {
    const container = this.shadowRoot?.querySelector(".icon-container")!;
    socialMediaList.forEach((socialMedia) => {
      const anchor = document.createElement("a");
      anchor.href = socialMedia.link;
      anchor.target = "_blank";
      const i = document.createElement("i");
      i.classList.add(...socialMedia.icon.split(" "));
      anchor.appendChild(i);
      container.appendChild(anchor);
    });
  }
  copyToClipboard(emailContent: Email, copyIcon: Icon, tooltip: Tooltip) {
    navigator.clipboard.writeText(emailContent);
    copyIcon.classList.remove("fa-regular", "fa-copy");
    copyIcon.classList.add("fa-solid", "fa-check");
    copyIcon.removeEventListener("click", (e) => {
      e.preventDefault();
      this.copyToClipboard(emailContent, copyIcon, tooltip);
    });
    tooltip.textContent = "Copied!";
    setTimeout(() => {
      copyIcon.classList.remove("fa-solid", "fa-check");
      copyIcon.classList.add("fa-regular", "fa-copy");
      copyIcon.addEventListener("click", (e) => {
        e.preventDefault();
        this.copyToClipboard(emailContent, copyIcon, tooltip);
      });
      tooltip.textContent = "Copy me!";
    }, 3000);
  }
}

customElements.define("contact-information", ContactInformation);
