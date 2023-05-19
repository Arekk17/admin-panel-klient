import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  LANGUAGE_GET_BY_ID_QUERY,
  LANGUAGE_EDIT_BY_ID_MUTATION,
  LANGUAGE_DELTE_BY_ID_MUTATION
} from './language-edit.query';
import { useParams, useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { Row, Col, Card, Button, Form, Input } from 'antd';
import styles from './language-edit.module.scss';
import { LanguageFields } from './language-edit.types';
import Error from '../../../components/error';
import { useTranslation } from 'react-i18next';

const BuildInputs = () => {
  const inputs = Object.values(LanguageFields).map((input) => {
    const inputName = input.toLocaleLowerCase();
    const isDisabled = input === LanguageFields.ID;
    return (
      <Form.Item label={input} key={inputName} name={inputName}>
        <Input placeholder="input placeholder" disabled={isDisabled} />
      </Form.Item>
    );
  });
  return <>{inputs}</>;
};

const LanguageEditPage = () => {
  const { t } = useTranslation(['global', 'langauge']);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [form] = Form.useForm();
  const { id: landingId } = useParams();
  const id = parseInt(landingId!, 10);
  const navigate = useNavigate();

  const {
    loading,
    error: errorQuery,
    data
  } = useQuery(LANGUAGE_GET_BY_ID_QUERY, {
    variables: { id }
  });

  const [editLanguage] = useMutation(LANGUAGE_EDIT_BY_ID_MUTATION, {
    update(_, { data: { editLanguage: editLanguageResponse } }) {
      console.log('@@@ editLanguage', editLanguageResponse);
      navigate('/languages');
    },
    onError({ graphQLErrors }) {
      console.log('graphQLErrors', graphQLErrors);
      setErrorMessage(graphQLErrors[0].message);
    }
  });

  const [deleteLanguage] = useMutation(LANGUAGE_DELTE_BY_ID_MUTATION, {
    update(_, { data: { deleteLanguage: deleteLanguageData } }) {
      console.log('@@@ deleteLanguage', deleteLanguageData);
      navigate('/languages');
    },
    onError({ graphQLErrors }) {
      console.log('graphQLErrors', graphQLErrors);
      setErrorMessage(graphQLErrors[0].message);
    }
  });

  useEffect(() => {
    if (errorQuery) {
      setErrorMessage(errorMessage);
    }
  }, []);

  if (loading) return <LoadingOutlined />;
  if (errorMessage) return <Error errorMessage={errorMessage} />;

  const { language } = data;

  if (language.id) {
    form.setFieldsValue({
      id: language.id,
      name: language.name,
      logo: language.logo
    });
  }

  const handleDelete = () => {
    deleteLanguage({
      variables: { id }
    });
  };

  const handleSave = (values: any) => {
    editLanguage({ variables: values });
  };

  return (
    <div>
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            title={`${t('language-header', { ns: 'language' })}: ${language.name}`}
            extra={
              <>
                <Button type="primary" danger onClick={handleDelete}>
                  {t('delete')}
                </Button>
              </>
            }
          >
            <div className={styles['languages-table-container']}>
              <Form autoComplete="off" layout={'vertical'} form={form} onFinish={handleSave}>
                <BuildInputs />
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

export default LanguageEditPage;
