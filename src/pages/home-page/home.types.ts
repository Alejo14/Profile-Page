export type LanguageKeys = "en" | "es";

export type ProfileImage = {
  src: string;
  alt: string;
};

export type Buttons = {
  id: string;
  icon: string;
  text: {
    en: string;
    es: string;
  };
};

export type Resume = {
  link: {
    en: string;
    es: string;
  };
  target: string;
};
