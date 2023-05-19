export type Level = {
  __typename: string;
  id: number;
  name: string;
  imageUrl: string;
  description: string;
};
export type LevelsQueryResponse = {
  levels: Array<Level>;
};

export enum LevelFields {
  ID = 'id',
  NAME = 'name',
  IMAGEURL = 'imageurl',
  DESCRIPTION = 'description'
}
