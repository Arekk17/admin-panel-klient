import { useMutation, useQuery } from '@apollo/client';
import {
  LESSON_DELETE_BY_ID_MUTATION,
  LESSON_GET_BY_ID_QUERY,
  LESSON_EDIT_BY_ID_MUTATION,
} from './lesson-edit.query';
import { LANGUAGES_QUERY } from '../../language/list/language-list.query';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Card, Button, Form, Input, Select } from 'antd';
import styles from './word-edit.module.scss';
import { useTranslation } from 'react-i18next';
import { LessonFields } from './lesson-edit.types';
import { languageSelectorList, sentenceListSelectorList, wordListSelectorList } from '../lessons.utils';
import Error from '../../../components/error';
import { LoadingOutlined } from '@ant-design/icons';

const LessonEditPage = () => {
  const { t } = useTranslation(['global', 'lesson']);
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
    loading: lessonLoading,
    error: lessonError,
    data: lessonData,
    // TODO add better TS
  } = useQuery<any>(LESSON_GET_BY_ID_QUERY, {
    variables: { id },
  });

  const [editLesson] = useMutation(LESSON_EDIT_BY_ID_MUTATION, {
    update(_, { data: { editLesson: editLessonData } }) {
      console.log('@@@ editlessonData', editLessonData);
    },
    onError({ graphQLErrors }) {
      console.log('graphQLErrors', graphQLErrors);
    },
  });

  const [deleteWord] = useMutation(LESSON_DELETE_BY_ID_MUTATION, {
    update(_, { data: { deleteLesson: deleteLessonData } }) {
      console.log('@@@ deletelessonData', deleteLessonData);
      navigate('/lessons');
    },
    onError({ graphQLErrors }) {
      console.log('graphQLErrors', graphQLErrors);
    },
  });

  if (languagesError || lessonError) return <Error />;
  if (languagesLoading || lessonLoading) return <LoadingOutlined />;

  const languagesList = languageSelectorList(languagesData);

  const handleDelete = () => {
    deleteWord({
      variables: { id },
    });
  };

  const handleSave = (values: any) => {
    const {
      name,
      sentence,
      word,
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
      name,
      sentence,
      word,
      languageId: updatedLanguageId,
    };
    editLesson({
      variables: variables,
    });
    navigate('/lessons');
  };

  const handleSelectorChange = (value: string, selectorName: string) => {
    form.setFieldsValue({
      [selectorName]: value,
    });
  };

  const inputs = Object.values(LessonFields).map((input: any) => {
    const isDisabled = input === LessonFields.ID;
    const inputName = input.toLocaleLowerCase();
    if (inputName === LessonFields.LANGUAGE) {
      return (
        <Form.Item label={input} key={inputName} name={inputName}>
          <Select
            onChange={(value) =>
              handleSelectorChange(value, LessonFields.LANGUAGE)
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
    name,
    sentence,
    word,
    id: lessonId,
  } = lessonData.word;

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
                  id: lessonId,
                  language: language?.name || 'none',
                  sentence,
                  word,
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

export default LessonEditPage;
