import { useMutation, useQuery } from '@apollo/client';
import { WORD_CREATE_MUTATION } from './word-create.query';
import { LANGUAGES_QUERY } from '../../language/list/language-list.query';
import type { LanguagesQueryResponse } from '../../language/list/language-list.types';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Form, Input, Select } from 'antd';
import styles from './word-create.module.scss';
import { useTranslation } from 'react-i18next';
import { WordFields } from './word-create.types';
import { wordGroupSelectorList, languageSelectorList } from '../word.utils';
import Error from '../../../components/error';
import { LoadingOutlined } from '@ant-design/icons';

const WordCreatePage = () => {
  const { t } = useTranslation(['global', 'word']);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { error, data, loading } = useQuery<LanguagesQueryResponse>(LANGUAGES_QUERY);

  const [createWord] = useMutation(WORD_CREATE_MUTATION, {
    update(_, { data: { createWord: createWordData } }) {
      console.log('@@@ createWordData', createWordData);
    },
    onError({ graphQLErrors }) {
      console.log('graphQLErrors', graphQLErrors);
    }
  });

  if (error) return <Error />;
  if (loading) return <LoadingOutlined />;

  const handleSave = (values: any) => {
    const { original, foreign, pronunciation, audiourl, imageurl, wordgroup, language } = values;
    const variables = {
      original,
      foreign,
      pronunciation,
      audioUrl: audiourl,
      imageUrl: imageurl,
      wordGroup: wordgroup,
      languageId: language === 'none' ? null : parseInt(language, 10)
    };
    createWord({
      variables: variables
    });
    navigate('/words');
  };

  const handleSelectorChange = (value: string, selectorName: string) => {
    form.setFieldsValue({
      [selectorName]: value
    });
  };

  const inputs = Object.values(WordFields)
    .filter((item) => item !== WordFields.ID)
    .map((input: any) => {
      const inputName = input.toLocaleLowerCase();
      if (inputName === WordFields.WORDGROUP) {
        return (
          <Form.Item label={input} key={inputName} name={inputName}>
            <Select
              onChange={(value) => handleSelectorChange(value, WordFields.WORDGROUP)}
              options={wordGroupSelectorList()}
            />
          </Form.Item>
        );
      }
      if (inputName === WordFields.LANGUAGE) {
        return (
          <Form.Item label={input} key={inputName} name={inputName}>
            <Select
              onChange={(value) => handleSelectorChange(value, WordFields.LANGUAGE)}
              options={languageSelectorList(data!)}
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
          <Card bordered={false} title={t('word-header', { ns: 'word' })}>
            <div className={styles['words-table-container']}>
              <Form
                initialValues={{
                  language: 'none',
                  wordgroup: 'none'
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

export default WordCreatePage;
