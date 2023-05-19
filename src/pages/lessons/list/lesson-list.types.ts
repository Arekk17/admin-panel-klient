export type Lesson = {
    id: number;
    name: string;
  };
  export type LessonsQueryResponse = {
    lessons: Array<Lesson>;
  };
  
  export enum LessonFields {
    ID = 'id',
    NAME = 'name',
    LANGUAGE = 'language',
    WORDS = 'words',
    SENTENCES = 'sentences'
  }