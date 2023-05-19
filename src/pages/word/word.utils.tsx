import { WORDGROUP } from '../../types';
import type { LanguagesQueryResponse } from '../language/list/language-list.types';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { propertiesToLowerCase } from '../../utils';

export const NULL = {
  value: 'none',
  label: 'NULL'
};

export const wordGroupSelectorList = () => {
  const group = Object.values(WORDGROUP).map((type) => ({
    value: type,
    label: type
  }));

  return [NULL, ...group];
};

export const languageSelectorList = (data: LanguagesQueryResponse) => {
  if (data.languages.length) {
    const mappedLanguages = data.languages.map(({ id, name }) => ({
      value: id.toString(),
      label: name
    }));
    return [NULL, ...mappedLanguages];
  }
  return [NULL];
};

export const shapeWordsData = (words: any) =>
  propertiesToLowerCase(words)
    .map(
      ({ id, original, foreign, pronunciation, audiourl, imageurl, wordgroup, language }: any) => ({
        id,
        original,
        foreign,
        pronunciation,
        audiourl: (
          <audio controls>
            <source src={audiourl} type="audio/mpeg" />
          </audio>
        ),
        imageurl,
        wordgroup,
        language: language ? (
          <>
            <img src={language.logo} alt={language.name} />
            <span>{language.name}</span>
          </>
        ) : (
          NULL.label
        ),
        edit: (
          <Link to={`/word/${id}`}>
            <Button icon={<EditOutlined />} />
          </Link>
        )
      })
    )
    .reverse();
