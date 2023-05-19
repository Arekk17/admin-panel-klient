export type Language = {
  __typename: string;
  id: number;
  name: string;
  logo: string;
};
export type LanguagesQueryResponse = {
  languages: Array<Language>;
};

export enum LanguageFields {
  ID = 'Id',
  NAME = 'Name',
  LOGO = 'Logo'
}
