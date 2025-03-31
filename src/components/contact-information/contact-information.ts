import templateHTML from "./contact-information.html?raw";
import styles from "./contact-information.css?inline";
import generalConfig from "./config/general.json";
import {
  type LanguageConfiguration,
  type TooltipConfiguration,
  type TooltipContent,
  type SocialMedia,
  type Icons,
  type CopyIcon,
} from "./contact-information.types";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    @import url("node_modules/@fortawesome/fontawesome-free/css/all.min.css");
    ${styles}
  </style>
  ${templateHTML}
`;

class ContactInformation extends HTMLElement {
  constructor() {
    super();
    const container = this.attachShadow({ mode: "open" });
    container.appendChild(template.content.cloneNode(true));
  }
  async connectedCallback() {
    const language = localStorage.getItem("language") || "en";
    const languageConfig = await import(`./config/${language}.json`);
    this.renderTemplate(languageConfig);
    this.renderSocialMediaLinks(generalConfig.socialMedia);
  }
  renderTemplate(languageConfig: LanguageConfiguration) {
    const emailLabel = this.shadowRoot?.getElementById("email-label")!;
    const emailAnchor = this.shadowRoot?.getElementById("email")!;
    const copyIcon = this.shadowRoot?.getElementById("copy-icon")!;
    emailLabel.textContent = languageConfig.email.label;
    emailAnchor.textContent = generalConfig.email;
    const { successIcon, defaultIcon } = generalConfig.tooltip.icons;
    const icons = [defaultIcon, successIcon];
    this.renderTooltip(copyIcon, icons, languageConfig.tooltip.defaultContent);
    copyIcon.addEventListener("click", (e) => {
      e.preventDefault();
      this.copyEvent(copyIcon, languageConfig.tooltip);
    });
  }
  renderSocialMediaLinks(socialMediaList: SocialMedia[]) {
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
  renderTooltip(copyIcon: CopyIcon, icons: Icons[], content: TooltipContent) {
    const tooltipText = this.shadowRoot?.getElementById("tooltip-text")!;
    tooltipText.textContent = content;
    const [iconsToAdd, iconsToRemove] = icons;
    copyIcon.classList.add(...iconsToAdd.split(" "));
    copyIcon.classList.remove(...iconsToRemove.split(" "));
  }
  copyEvent(copyIcon: CopyIcon, tooltipConfig: TooltipConfiguration) {
    navigator.clipboard.writeText(generalConfig.email);
    const { successIcon, defaultIcon } = generalConfig.tooltip.icons;
    const icons = [successIcon, defaultIcon];
    this.renderTooltip(copyIcon, icons, tooltipConfig.successContent);
    //Avoid multiple copies
    copyIcon.removeEventListener("click", (e) => {
      e.preventDefault();
      this.copyEvent(copyIcon, tooltipConfig);
    });
    //Return to normal
    setTimeout(() => {
      const icons = [defaultIcon, successIcon];
      this.renderTooltip(copyIcon, icons, tooltipConfig.defaultContent);
      copyIcon.removeEventListener("click", (e) => {
        e.preventDefault();
        this.copyEvent(copyIcon, tooltipConfig);
      });
    }, generalConfig.tooltip.duration);
  }
}

customElements.define("contact-information", ContactInformation);
