//TODO: Change language
const defaultLanguage = "en";

const resumeBtn = document.getElementById("resume-btn");
const principalImage = document.getElementById("principal-image");

const displayResume = (configuration) => {
  const resumeConfiguration = configuration.resume[defaultLanguage];
  open(resumeConfiguration.link, resumeConfiguration.target);
}

const displayContactInfo = (contactInfoList) => {
  const socialMediaDiv = document.getElementById("contact-information-container");
  contactInfoList.forEach((el) => {
    const anchor = document.createElement("a");
    anchor.href = el.link;
    anchor.target = "_blank";
    const i = document.createElement("i");
    i.classList.add(...el.icon.split(' '));
    anchor.appendChild(i);
    socialMediaDiv.appendChild(anchor);
  });
}

const fetchConfiguration = async () => {
  const res = await fetch("data/configuration.json");
  const data = await res.json();
  console.log(data);
  return data;
}

const init = async () => {
  const configuration = await fetchConfiguration();
  principalImage.setAttribute("src", configuration.principalImage);
  displayContactInfo(configuration.contactInformation);
  resumeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    displayResume(configuration);
  });
}

init();
