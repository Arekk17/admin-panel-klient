export type Sentence = {
  __typename: string;
  id: number;
  original: string;
  foreign: string;
  pronunciation: string;
  audioUrl: string;
};
export type SentencesQueryResponse = {
  sentences: Array<Sentence>;
};

export enum SentenceFields {
  ID = 'id',
  ORIGINAL = 'original',
  FOREIGN = 'foreign',
  PROUNCIATION = 'pronunciation',
  AUDIOURL = 'audiourl',
  LANGUAGE = 'language',
  LESSON = 'lesson',
}
