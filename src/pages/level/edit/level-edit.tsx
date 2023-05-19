import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  LEVEL_GET_BY_ID_QUERY,
  LEVEL_EDIT_BY_ID_MUTATION,
  LEVEL_DELETE_BY_ID_MUTATION
} from './level-edit.query';
import { useParams, useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { Row, Col, Card, Button, Form, Input } from 'antd';
import styles from './level-edit.module.scss';
import { LevelFields } from './level-edit.types';
import Error from '../../../components/error';
import { useTranslation } from 'react-i18next';

const BuildInputs = () => {
  const inputs = Object.values(LevelFields).map((input) => {
    const inputName = input.toLocaleLowerCase();
    const isDisabled = input === LevelFields.ID;

    return (
      <Form.Item label={input} key={inputName} name={inputName}>
        <Input placeholder="input placeholder" disabled={isDisabled} />
      </Form.Item>
    );
  });
  return <>{inputs}</>;
};

const LevelEditPage = () => {
  const { t } = useTranslation(['global', 'word']);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [form] = Form.useForm();
  const { id: levelId } = useParams();
  const id = parseInt(levelId!, 10);
  const navigate = useNavigate();

  const {
    loading,
    error: errorQuery,
    data
  } = useQuery(LEVEL_GET_BY_ID_QUERY, {
    variables: { id }
  });

  const [editLevel] = useMutation(LEVEL_EDIT_BY_ID_MUTATION, {
    update(_, { data: { editLevel: editLevelResponse } }) {
      console.log('@@@ editLevel', editLevelResponse);
    },
    onError({ graphQLErrors }) {
      console.log('graphQLErrors', graphQLErrors);
      setErrorMessage(graphQLErrors[0].message);
    }
  });

  const [deleteLevel] = useMutation(LEVEL_DELETE_BY_ID_MUTATION, {
    update(_, { data: { deleteLevel: deleteLevelData } }) {
      console.log('@@@ deleteLevel', deleteLevelData);
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

  const { level } = data;
  console.log("@@ level", level)

  if (level.id) {
    form.setFieldsValue({
      id: level.id,
      name: level.name,
      imageurl: level.imageUrl,
      description: level.description
    });
  }

  const handleDelete = () => {
    deleteLevel({
      variables: { id }
    });
    navigate('/levels');
  };

  const handleSave = (values: any) => {
    editLevel({ variables: values });
    navigate('/levels');
  };

  return (
    <div>
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            title={`${t('level-header', { ns: 'level' })} ${level.name}`}
            extra={
              <>
                <Button type="primary" danger onClick={handleDelete}>
                  {t('delete')}
                </Button>
              </>
            }
          >
            <div className={styles['levels-table-container']}>
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

export default LevelEditPage;
