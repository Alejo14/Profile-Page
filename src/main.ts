import fetchConfiguration from "./services/connection";
import { type Link } from "./types/types";
import "./style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./components";
import "./pages";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <nav-bar id="nav-bar" class="layout"></nav-bar>
  <div class="container">
    <home-section id="home-section">
      <resume-button slot="info-buttons"></resume-button>
      <contact-information slot="info-links"></contact-information>
    </home-section>
    <about-me-section id="about-me-section" class="d-none">
      <skill-information slot="skill-container"></skill-information>
    </about-me-section>
    <!-- TODO: How to add the projects that I have done to the website -->
    <!-- Should I need a new page for projects? Can I optimize space? -->
  </div>
  <footer-container id="footer" class="layout"></footer-container>
`;

const navbarContainer = document.getElementById("nav-bar")!;

const configuration = await fetchConfiguration();
console.log(configuration);
configuration.navbar.forEach((el: Link) => {
  navbarContainer.addEventListener(el.event, () => {
    document.querySelectorAll(".container > *").forEach((child) => {
      child.id === el.id
        ? child.classList.remove("d-none")
        : child.classList.add("d-none");
    });
  });
});
