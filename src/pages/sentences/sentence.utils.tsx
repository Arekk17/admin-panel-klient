import type { LanguagesQueryResponse } from '../language/list/language-list.types';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { propertiesToLowerCase } from '../../utils';

export const NULL = {
  value: 'none',
  label: 'NULL'
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

export const shapeSentencesData = (sentences: any) =>
  propertiesToLowerCase(sentences)
    .map(
      ({ id, original, foreign, pronunciation, audiourl, lesson, language }: any) => ({
        id,
        original,
        foreign,
        pronunciation,
        audiourl: (
          <audio controls>
            <source src={audiourl} type="audio/mpeg" />
          </audio>
        ),
        lesson,
        language: language ? (
          <>
            <img src={language.logo} alt={language.name} />
            <span>{language.name}</span>
          </>
        ) : (
          NULL.label
        ),
        edit: (
          <Link to={`/sentence/${id}`}>
            <Button icon={<EditOutlined />} />
          </Link>
        )
      })
    )
    .reverse();
