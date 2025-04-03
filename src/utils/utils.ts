import { type ThemeIcon } from "./utils.types";

export const setTheme = (icon: ThemeIcon) => {
  const themeStorage = localStorage.getItem("theme");
  const theme =
    (themeStorage && themeStorage === "dark") ||
    (!themeStorage &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
      ? "dark"
      : "light";
  localStorage.setItem("theme", theme);
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    icon.classList.add("fa-solid", "fa-moon");
  } else {
    icon.classList.add("fa-solid", "fa-sun");
  }
};

export const setLanguage = () => localStorage.setItem("language", "en");
