import "./style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="container">
    <presentation-section id="presentation-section">
      <button-container slot="info-buttons"></button-container>
      <contact-information slot="info-links"></contact-information>
    </presentation-section>
    <about-me-section id="about-me-section" class="d-none">
      <skill-information slot="skill-container"></skill-information>
    </about-me-section>
    <!-- TODO: How to add the projects that I have done to the website -->
    <!-- Should I need a new page for projects? Can I optimize space? -->
  </div>
`;

const presentationSection = document.getElementById("presentation-section")!;
const aboutMeSection = document.getElementById("about-me-section")!;

presentationSection.addEventListener("hide-section", () => {
  presentationSection.classList.add("d-none");
  aboutMeSection.classList.remove("d-none");
});

aboutMeSection.addEventListener("hide-section", () => {
  presentationSection.classList.remove("d-none");
  aboutMeSection.classList.add("d-none");
});
