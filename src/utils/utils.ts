import { type ThemeIcon } from "./utils.types";
import { type Languages } from "../types/main.types";

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

export const setLanguage = (language = "en") =>
  localStorage.setItem("language", language);

export const getLanguage = (): Languages => {
  const savedLanguage = localStorage.getItem("language");
  return savedLanguage !== "en" && savedLanguage !== "es"
    ? "en"
    : savedLanguage;
};
