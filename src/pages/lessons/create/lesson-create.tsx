import { useMutation, useQuery } from '@apollo/client';
import { LESSON_CREATE_MUTATION } from './lesson-create.query';
import {
  LANGUAGES_QUERY,
  GET_ALL_QUERY,
} from '../../language/list/language-list.query';
import type { LanguagesQueryResponse } from '../../language/list/language-list.types';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Form, Input, Select } from 'antd';
import styles from './lesson-create.module.scss';
import { useTranslation } from 'react-i18next';
import { LessonFields } from './lesson-create.type';
import { wordListSelectorList, languageSelectorList, sentenceListSelectorList } from '../lessons.utils';
import Error from '../../../components/error';
import { LoadingOutlined } from '@ant-design/icons';
import { WORDS_QUERY } from '../../word/list/word-list.query';
import { SENTENCES_QUERY } from '../../sentences/list/sentence-list.query';
import { WordsQueryResponse } from '../../word/list/word-list.types';
import { SentencesQueryResponse } from '../../sentences/list/sentence-list.types';

const LessonCreatePage = () => {
  const { t } = useTranslation(['global', 'lesson']);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { error, data, loading } = useQuery<LanguagesQueryResponse>(LANGUAGES_QUERY);
  const { data: wordsData } = useQuery<WordsQueryResponse>(WORDS_QUERY);
  const { data: sentenceData } = useQuery<SentencesQueryResponse>(SENTENCES_QUERY);

  const [createLesson] = useMutation(LESSON_CREATE_MUTATION, {
    update(_, { data: { createLesson: createLessonData } }) {
      console.log('@@@ createWordData', createLessonData);
      console.log('Selected wordIds:', createLessonData.wordIds);
    },
    onError({ graphQLErrors }) {
      console.log('graphQLErrors', graphQLErrors);
    },
  });

  if (error) return <Error />;
  if (loading) return <LoadingOutlined />;

  const handleSave = (values: any) => {
    const { name, language, words } = values;
    const variables = {
      name,
      wordIds: words ? words.map((id: string) => parseInt(id, 10)) : [],
      languageId: language === 'none' ? null : parseInt(language, 10),
    };

    createLesson({
      variables: variables,
    });
    navigate('/lessons');
  };

  const handleSelectorChange = (value: string, selectorName: string) => {
    form.setFieldsValue({
      [selectorName]: value,
    });
  };

  const inputs = Object.values(LessonFields)
    .filter((item) => item !== LessonFields.ID)
    .map((input: any) => {
      const inputName = input.toLocaleLowerCase();
      if (inputName === LessonFields.LANGUAGE) {
        return (
          <Form.Item label={input} key={inputName} name={inputName}>
            <Select
              onChange={(value) =>
                handleSelectorChange(value, LessonFields.LANGUAGE)
              }
              options={languageSelectorList(data!)}
            />
          </Form.Item>
        );
      }
      if (inputName === LessonFields.WORDS) {
        return (
          <Form.Item label={input} key={inputName} name={inputName}>
            <Select
              mode="multiple"
              onChange={(value) =>
                handleSelectorChange(value, LessonFields.WORDS)
              }
              options={wordListSelectorList(wordsData)}
            />
          </Form.Item>
        );
      }
      if (inputName === LessonFields.SENTENCES) {
        return (
          <Form.Item label={input} key={inputName} name={inputName}>
            <Select
              mode="multiple"
              onChange={(value) =>
                handleSelectorChange(value, LessonFields.SENTENCES)
              }
              options={sentenceListSelectorList(sentenceData)}
            />
          </Form.Item>
        );
      }
      return (
        <Form.Item label={input} key={inputName} name={inputName}>
          <Input placeholder="input placeholder" />
        </Form.Item>
      );
    });

  return (
    <div>
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card bordered={false} title={t('lesson-header', { ns: 'lesson' })}>
            <div className={styles['lessons-table-container']}>
              <Form
                initialValues={{
                  language: 'none',
                  wordgroup: 'none',
                }}
                autoComplete="off"
                layout={'vertical'}
                form={form}
                onFinish={handleSave}
              >
                {inputs}
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    {t('save')}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LessonCreatePage;
