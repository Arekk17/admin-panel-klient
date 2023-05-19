export type Word = {
  __typename: string;
  id: number;
  original: string;
  foreign: string;
  pronunciation: string;
  audioUrl: string;
  imageUrl: string;
  wordGroup: string;
};
export type WordsQueryResponse = {
  words: Array<Word>;
};

export enum WordFields {
  ID = 'id',
  ORIGINAL = 'original',
  FOREIGN = 'foreign',
  PROUNCIATION = 'pronunciation',
  AUDIOURL = 'audiourl',
  IMAGEURL = 'imageurl',
  WORDGROUP = 'wordgroup',
  LANGUAGE = 'language',
}
