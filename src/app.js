import { fetchConfiguration } from "./modules/connection.js";

//TODO: Change language
const defaultLanguage = "en";

const informationSection = document.getElementById("information");
const aboutMeSection = document.getElementById("about-me");
const socialMediaDiv = document.getElementById("contact-information-container");

const resumeBtn = document.getElementById("resume-btn");
const aboutMeBtn = document.getElementById("about-me-btn");
const homeBtn = document.getElementById("home-btn");

const principalImage = document.getElementById("principal-image");
const aboutMeDesc = document.getElementById("about-me-description");

const copyIcon = document.getElementById("copy-email");
const email = document.getElementById("contact-me-email");
const tooltip = document.querySelector(".tooltip-text");

const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

const displayResume = (configuration) => {
  const resumeConfiguration = configuration.resume[defaultLanguage];
  open(resumeConfiguration.link, resumeConfiguration.target);
};

const displayContactInfo = (contactInfoList) => {
  contactInfoList.forEach((el) => {
    const anchor = document.createElement("a");
    anchor.href = el.link;
    anchor.target = "_blank";
    const i = document.createElement("i");
    i.classList.add(...el.icon.split(" "));
    anchor.appendChild(i);
    socialMediaDiv.appendChild(anchor);
  });
};

const displayStack = (container, stack, stakname) => {
  const subtitle = document.createElement("span");
  subtitle.textContent = capitalize(stakname);
  subtitle.classList.add("skill-subtitle");
  container.appendChild(subtitle);
  stack.forEach((el) => {
    const img = document.createElement("img");
    img.setAttribute("src", el.icon);
    img.setAttribute("alt", `${el.name} image`);
    img.setAttribute("id", el.name);
    img.classList.add("skill-icon");
    container.appendChild(img);
  });
};

const copyToClipboard = () => {
  const textToCopy = email.textContent;
  navigator.clipboard.writeText(textToCopy);
  copyIcon.classList.remove("fa-regular", "fa-copy");
  copyIcon.classList.add("fa-solid", "fa-check");
  copyIcon.removeEventListener("click", copyToClipboard);
  tooltip.textContent = "Copied!";
  setTimeout(() => {
    copyIcon.classList.remove("fa-solid", "fa-check");
    copyIcon.classList.add("fa-regular", "fa-copy");
    copyIcon.addEventListener("click", copyToClipboard);
    tooltip.textContent = "Copy me!";
  }, 3000);
};

const configuration = await fetchConfiguration();

principalImage.setAttribute("src", configuration.principalImage);
aboutMeDesc.textContent = configuration.aboutMe;

displayContactInfo(configuration.contactInformation);
resumeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  displayResume(configuration);
});

const skillMap = new Map(Object.entries(configuration.skills));
skillMap.forEach((value, key) => {
  const container = document.getElementById(key);
  displayStack(container, value, key);
});

aboutMeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  informationSection.classList.add("d-none");
  aboutMeSection.classList.remove("d-none");
});

homeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  informationSection.classList.remove("d-none");
  aboutMeSection.classList.add("d-none");
});

copyIcon.addEventListener("click", copyToClipboard);
