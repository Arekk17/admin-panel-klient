import type { LanguagesQueryResponse } from '../language/list/language-list.types';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { propertiesToLowerCase } from '../../utils';
import { WordsQueryResponse } from '../word/list/word-list.types';

export const NULL = {
  value: 'none',
  label: 'NULL',
};

export const languageSelectorList = (data: LanguagesQueryResponse) => {
  if (data.languages.length) {
    const mappedLanguages = data.languages.map(({ id, name }) => ({
      value: id.toString(),
      label: name,
    }));
    return [NULL, ...mappedLanguages];
  }
  return [NULL];
};
export const wordListSelectorList = (data?: WordsQueryResponse) => {
  const words = data?.words || [];
  if (words.length) {
    const mappedWords = words.map(({ id, original, foreign }) => ({
      value: id.toString(),
      label: `${original} - ${foreign}`,
    }));
    return [NULL, ...mappedWords];
  }
  return [NULL];
};
export const shapeLessonsData = (lessons: any) =>
  propertiesToLowerCase(lessons)
    .map(({ id, name, language, sentences, words }: any) => ({
      id,
      name,
      sentences: sentences.map(({ id, original }: any) => (
        <div key={id}>{original}</div>
      )),
      words: words.map(({ id, original }: any) => (
        <div key={id}>{original}</div>
      )),
      language: language ? (
        <>
          <img src={language.logo} alt={language.name} />
          <span>{language.name}</span>
        </>
      ) : (
        NULL.label
      ),
      edit: (
        <Link to={`/lesson/${id}`}>
          <Button icon={<EditOutlined />} />
        </Link>
      ),
    }))
    .reverse();
