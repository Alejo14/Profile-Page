export type ProfileImage = {
  src: string;
  alt: string;
};

export type LanguageConfiguration = {
  title: string;
  description: string;
  resume: Resume;
};

export type Resume = {
  link: string;
  target: string;
};
