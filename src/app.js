//TODO: Change language
const defaultLanguage = "en";

const informationSection = document.getElementById("information");
const aboutMeSection = document.getElementById("about-me");

const resumeBtn = document.getElementById("resume-btn");
const aboutMeBtn = document.getElementById("about-me-btn");
const homeBtn = document.getElementById("home-btn");

const principalImage = document.getElementById("principal-image");
const aboutMeDesc = document.getElementById("about-me-description");

const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

const displayResume = (configuration) => {
  const resumeConfiguration = configuration.resume[defaultLanguage];
  open(resumeConfiguration.link, resumeConfiguration.target);
};

const displayContactInfo = (contactInfoList) => {
  const socialMediaDiv = document.getElementById(
    "contact-information-container"
  );
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
    const i = document.createElement("i");
    i.classList.add(...el.icon.split(" "));
    i.setAttribute("id", el.name);
    container.appendChild(i);
  });
};

const displayAboutMeSection = () => {
  informationSection.classList.add("d-none");
  aboutMeSection.classList.remove("d-none");
};

const hideAboutMeSection = () => {
  informationSection.classList.remove("d-none");
  aboutMeSection.classList.add("d-none");
};

const fetchConfiguration = async () => {
  const res = await fetch("data/configuration.json");
  const data = await res.json();
  return data;
};

const init = async () => {
  const configuration = await fetchConfiguration();
  /* Configuring properties and listeners in DOM */
  principalImage.setAttribute("src", configuration.principalImage);
  aboutMeDesc.textContent = configuration.aboutMe;
  displayContactInfo(configuration.contactInformation);
  resumeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    displayResume(configuration);
  });
  aboutMeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    displayAboutMeSection();
  });
  homeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    hideAboutMeSection();
  });
  const skillMap = new Map(Object.entries(configuration.skills));
  skillMap.forEach((value, key) => {
    const container = document.querySelector(`.${key}-container`);
    displayStack(container, value, key);
  });
};

init();
