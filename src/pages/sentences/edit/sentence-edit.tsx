import { useMutation, useQuery } from '@apollo/client';
import {
  SENTENCE_GET_BY_ID_QUERY,
  SENTENCE_EDIT_BY_ID_MUTATION,
  SENCTENCE_DELETE_BY_ID_MUTATION,
} from './sentence-edit.query';
import { LANGUAGES_QUERY } from '../../language/list/language-list.query';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Card, Button, Form, Input, Select } from 'antd';
import styles from './sentence-edit.module.scss';
import { useTranslation } from 'react-i18next';
import { SentenceFields } from './sentence-edit.type';
import { languageSelectorList } from '../sentence.utils';
import Error from '../../../components/error';
import { LoadingOutlined } from '@ant-design/icons';

const SentenceEditPage = () => {
  const { t } = useTranslation(['global', 'sentence']);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id: sentenceId } = useParams();
  const id = parseInt(sentenceId!, 10);

  // TODO combine LANGUAGE and WORD queries into 1
  const {
    loading: languagesLoading,
    error: languagesError,
    data: languagesData,
    // TODO add better TS
  } = useQuery<any>(LANGUAGES_QUERY);

  const {
    loading: sentenceLoading,
    error: sentenceError,
    data: sentenceData,
    // TODO add better TS
  } = useQuery<any>(SENTENCE_GET_BY_ID_QUERY, {
    variables: { id },
  });

  const [editSentence] = useMutation(SENTENCE_EDIT_BY_ID_MUTATION, {
    update(_, { data: { editSentence: editSentenceData } }) {
      console.log('@@@ editWordData', editSentenceData);
    },
    onError({ graphQLErrors }) {
      console.log('graphQLErrors', graphQLErrors);
    },
  });

  const [deleteSentence] = useMutation(SENCTENCE_DELETE_BY_ID_MUTATION, {
    update(_, { data: { deleteSentence: deleteSentenceData } }) {
      console.log('@@@ deleteWordData', deleteSentenceData);
      navigate('/sentences');
      window.location.reload();
    },
    onError({ graphQLErrors }) {
      console.log('graphQLErrors', graphQLErrors);
    },
  });

  if (languagesError || sentenceError) return <Error />;
  if (languagesLoading || sentenceLoading) return <LoadingOutlined />;

  const languagesList = languageSelectorList(languagesData);

  const handleDelete = () => {
    deleteSentence({
      variables: { id },
    });
  };

  const handleSave = (values: any) => {
    const { original, foreign, pronunciation, audiourl, imageurl, language } =
      values;
    // TODO  create a util function
    let updatedLanguageId;
    if (isNaN(language)) {
      updatedLanguageId =
        languagesData.languages.find(
          ({ name }: { name: string }) => name === language,
        )?.id || null;
    } else {
      updatedLanguageId = parseInt(language, 10);
    }

    const variables = {
      id,
      original,
      foreign,
      pronunciation,
      audioUrl: audiourl,
      imageUrl: imageurl,
      languageId: updatedLanguageId,
    };
    editSentence({
      variables: variables,
    });
    navigate('/sentences');
  };

  const handleSelectorChange = (value: string, selectorName: string) => {
    form.setFieldsValue({
      [selectorName]: value,
    });
  };

  const inputs = Object.values(SentenceFields).map((input: any) => {
    const isDisabled = input === SentenceFields.ID;
    const inputName = input.toLocaleLowerCase();
    if (inputName === SentenceFields.LANGUAGE) {
      return (
        <Form.Item label={input} key={inputName} name={inputName}>
          <Select
            onChange={(value) =>
              handleSelectorChange(value, SentenceFields.LANGUAGE)
            }
            options={languagesList}
          />
        </Form.Item>
      );
    }

    return (
      <Form.Item label={input} key={inputName} name={inputName}>
        <Input placeholder="input placeholder" disabled={isDisabled} />
      </Form.Item>
    );
  });

  const {
    language,
    audioUrl,
    foreign,
    imageUrl,
    original,
    pronunciation,
    id: SentenceId,
  } = sentenceData.sentence;

  return (
    <div>
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            title={t('sentence-header', { ns: 'sentence' })}
            extra={
              <>
                <Button type="primary" danger onClick={handleDelete}>
                  {t('delete')}
                </Button>
              </>
            }
          >
            <div className={styles['sentences-table-container']}>
              <Form
                initialValues={{
                  id: SentenceId,
                  language: language?.name || 'none',
                  pronunciation,
                  original,
                  foreign,
                  imageurl: imageUrl,
                  audiourl: audioUrl,
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

export default SentenceEditPage;
