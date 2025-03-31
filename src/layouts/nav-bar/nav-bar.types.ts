export type LanguageConfiguration = {
  navbar: Link[];
};

export type Link = {
  name: string;
  event: string;
  id: string;
  selected?: boolean;
};
