import { useMutation, useQuery } from '@apollo/client';
import {
  WORD_DELETE_BY_ID_MUTATION,
  WORD_GET_BY_ID_QUERY,
  WORD_EDIT_BY_ID_MUTATION,
} from './word-edit.query';
import { LANGUAGES_QUERY } from '../../language/list/language-list.query';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Card, Button, Form, Input, Select } from 'antd';
import styles from './word-edit.module.scss';
import { useTranslation } from 'react-i18next';
import { WordFields } from './word-edit.types';
import { wordGroupSelectorList, languageSelectorList } from '../word.utils';
import Error from '../../../components/error';
import { LoadingOutlined } from '@ant-design/icons';

const WordEditPage = () => {
  const { t } = useTranslation(['global', 'word']);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id: landingId } = useParams();
  const id = parseInt(landingId!, 10);

  // TODO combine LANGUAGE and WORD queries into 1
  const {
    loading: languagesLoading,
    error: languagesError,
    data: languagesData,
    // TODO add better TS
  } = useQuery<any>(LANGUAGES_QUERY);

  const {
    loading: wordLoading,
    error: wordError,
    data: wordData,
    // TODO add better TS
  } = useQuery<any>(WORD_GET_BY_ID_QUERY, {
    variables: { id },
  });

  const [editWord] = useMutation(WORD_EDIT_BY_ID_MUTATION, {
    update(_, { data: { editWord: editWordData } }) {
      console.log('@@@ editWordData', editWordData);
    },
    onError({ graphQLErrors }) {
      console.log('graphQLErrors', graphQLErrors);
    },
  });

  const [deleteWord] = useMutation(WORD_DELETE_BY_ID_MUTATION, {
    update(_, { data: { deleteWord: deleteWordData } }) {
      console.log('@@@ deleteWordData', deleteWordData);
      navigate('/words');
    },
    onError({ graphQLErrors }) {
      console.log('graphQLErrors', graphQLErrors);
    },
  });

  if (languagesError || wordError) return <Error />;
  if (languagesLoading || wordLoading) return <LoadingOutlined />;

  const languagesList = languageSelectorList(languagesData);

  const handleDelete = () => {
    deleteWord({
      variables: { id },
    });
  };

  const handleSave = (values: any) => {
    const {
      original,
      foreign,
      pronunciation,
      audiourl,
      imageurl,
      wordgroup,
      language,
    } = values;
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
      wordGroup: wordgroup,
      languageId: updatedLanguageId,
    };
    editWord({
      variables: variables,
    });
    navigate('/words');
  };

  const handleSelectorChange = (value: string, selectorName: string) => {
    form.setFieldsValue({
      [selectorName]: value,
    });
  };

  const inputs = Object.values(WordFields).map((input: any) => {
    const isDisabled = input === WordFields.ID;
    const inputName = input.toLocaleLowerCase();
    if (inputName === WordFields.WORDGROUP) {
      return (
        <Form.Item label={input} key={inputName} name={inputName}>
          <Select
            onChange={(value) =>
              handleSelectorChange(value, WordFields.WORDGROUP)
            }
            options={wordGroupSelectorList()}
          />
        </Form.Item>
      );
    }
    if (inputName === WordFields.LANGUAGE) {
      return (
        <Form.Item label={input} key={inputName} name={inputName}>
          <Select
            onChange={(value) =>
              handleSelectorChange(value, WordFields.LANGUAGE)
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
    wordGroup,
    audioUrl,
    foreign,
    imageUrl,
    original,
    pronunciation,
    id: wordId,
  } = wordData.word;

  return (
    <div>
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            title={t('word-header', { ns: 'word' })}
            extra={
              <>
                <Button type="primary" danger onClick={handleDelete}>
                  {t('delete')}
                </Button>
              </>
            }
          >
            <div className={styles['words-table-container']}>
              <Form
                initialValues={{
                  id: wordId,
                  language: language?.name || 'none',
                  wordgroup: wordGroup,
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

export default WordEditPage;
