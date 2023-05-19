export type Landing = {
  __typename: string;
  id: number;
  title: string;
  name: string;
  slug: string;
  content: string;
};
export type LandingsQueryResponse = {
  landings: Array<Landing>;
};

export enum LandingFields {
  ID = 'Id',
  NAME = 'Name',
  TITLE = 'Title',
  SLUG = 'Slug',
  CONTENT = 'Content',
}
