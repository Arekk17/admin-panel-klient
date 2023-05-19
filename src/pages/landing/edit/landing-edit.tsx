import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  LANDING_GET_BY_ID_QUERY,
  LANDING_EDIT_BY_ID_MUTATION,
  LANDING_DELETE_BY_ID_MUTATION,
} from './landing-edit.query';
import { useParams, useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { Row, Col, Card, Button, Form, Input } from 'antd';
import styles from './landing-edit.module.scss';
import ReactQuill from 'react-quill';
import { LandingFields } from './landing-edit.types';
import Error from '../../../components/error';
import 'react-quill/dist/quill.snow.css';

const BuildInputs = () => {
  const inputs = Object.values(LandingFields).map((input) => {
    const inputName = input.toLocaleLowerCase();
    const isDisabled = input === LandingFields.ID;

    if (input === LandingFields.CONTENT) {
      return (
        <Form.Item label={input} key={inputName} name={inputName}>
          <ReactQuill theme="snow" />
        </Form.Item>
      );
    }

    return (
      <Form.Item label={input} key={inputName} name={inputName}>
        <Input placeholder="input placeholder" disabled={isDisabled} />
      </Form.Item>
    );
  });
  return <>{inputs}</>;
};

const LandingEditPage = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [form] = Form.useForm();
  const { id: landingId } = useParams();
  const id = parseInt(landingId!, 10);
  const navigate = useNavigate();

  const {
    loading,
    error: errorQuery,
    data,
  } = useQuery(LANDING_GET_BY_ID_QUERY, {
    variables: { id },
  });

  const [editLanding] = useMutation(LANDING_EDIT_BY_ID_MUTATION, {
    update(_, { data: { editLanding: editLandingResponse } }) {
      console.log('@@@ editLanding', editLandingResponse);
    },
    onError({ graphQLErrors }) {
      console.log('graphQLErrors', graphQLErrors);
      setErrorMessage(graphQLErrors[0].message);
    },
  });

  const [deleteLanding] = useMutation(LANDING_DELETE_BY_ID_MUTATION, {
    update(_, { data: { deleteLanding: deleteLandingData } }) {
      console.log('@@@ deleteLanding', deleteLandingData);
    },
    onError({ graphQLErrors }) {
      console.log('graphQLErrors', graphQLErrors);
      setErrorMessage(graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (errorQuery) {
      setErrorMessage(errorMessage);
    }
  }, []);

  if (loading) return <LoadingOutlined />;
  if (errorMessage) return <Error errorMessage={errorMessage} />;

  const { landing } = data;

  if (landing.content) {
    form.setFieldsValue({
      id: landing.id,
      title: landing.title,
      name: landing.name,
      slug: landing.slug,
      content: landing.content,
    });
  }

  const handleDelete = () => {
    deleteLanding({
      variables: { id },
    });
    navigate('/landings');
  };

  const handleSave = (values: any) => {
    editLanding({ variables: values });
    navigate('/landings');
  };

  return (
    <div>
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            title={`Landing: ${landing.name}`}
            extra={
              <>
                <Button type="primary" danger onClick={handleDelete}>
                  Delete
                </Button>
              </>
            }
          >
            <div className={styles['landings-table-container']}>
              <Form
                autoComplete="off"
                layout={'vertical'}
                form={form}
                onFinish={handleSave}
              >
                <BuildInputs />
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Save
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

export default LandingEditPage;
