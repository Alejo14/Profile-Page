export type Email = string;
export type Icon = HTMLElement;
export type Tooltip = Element;
export type Container = HTMLElement;
export type Key = string;

export type Link = {
  name: string;
  event: string;
  id: string;
};

export type PrincipalImage = {
  src: string;
  alt: string;
};

export type SocialMedia = {
  name: string;
  link: string;
  icon: string;
};

export type Resume = {
  link: string;
  target: string;
};

export type Skill = {
  name: string;
  icon: string;
};

export type SkillSet = Skill[];
