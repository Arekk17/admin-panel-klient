import { useMutation, useQuery } from '@apollo/client';
import { SENTENCE_CREATE_MUTATION } from './sentence-create.query';
import { LANGUAGES_QUERY } from '../../language/list/language-list.query';
import type { LanguagesQueryResponse } from '../../language/list/language-list.types';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Form, Input, Select } from 'antd';
import styles from './sentence-create.module.scss';
import { useTranslation } from 'react-i18next';
import { SentenceFields } from './sentence-create.type';
import { languageSelectorList } from '../sentence.utils';
import Error from '../../../components/error';
import { LoadingOutlined } from '@ant-design/icons';

const SentenceCreatePage = () => {
  const { t } = useTranslation(['global', 'sentence']);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { error, data, loading } =
    useQuery<LanguagesQueryResponse>(LANGUAGES_QUERY);

  const [createSentence] = useMutation(SENTENCE_CREATE_MUTATION, {
    update(_, { data: { createSentence: createSentenceData } }) {
      console.log('@@@ createSentenceData', createSentenceData);
      window.location.reload();
    },
    onError({ graphQLErrors }) {
      console.log('graphQLErrors', graphQLErrors);
    },
  });

  if (error) return <Error />;
  if (loading) return <LoadingOutlined />;

  const handleSave = (values: any) => {
    const { original, foreign, pronunciation, audiourl, language } = values;
    const variables = {
      original,
      foreign,
      pronunciation,
      audioUrl: audiourl,
      languageId: language === 'none' ? null : parseInt(language, 10),
    };
    createSentence({
      variables: variables,
    });
    navigate('/sentences');
  };

  const handleSelectorChange = (value: string, selectorName: string) => {
    form.setFieldsValue({
      [selectorName]: value,
    });
  };

  const inputs = Object.values(SentenceFields)
    .filter((item) => item !== SentenceFields.ID)
    .map((input: any) => {
      const inputName = input.toLocaleLowerCase();
      if (inputName === SentenceFields.LANGUAGE) {
        return (
          <Form.Item label={input} key={inputName} name={inputName}>
            <Select
              onChange={(value) =>
                handleSelectorChange(value, SentenceFields.LANGUAGE)
              }
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
          <Card
            bordered={false}
            title={t('sentence-header', { ns: 'sentence' })}
          >
            <div className={styles['sentences-table-container']}>
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

export default SentenceCreatePage;
