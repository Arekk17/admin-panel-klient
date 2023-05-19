import { useMutation } from '@apollo/client';
import { LANDING_CREATE_MUTATION } from './landing-create.query';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Form, Input } from 'antd';
import styles from './landing-create.module.scss';
import ReactQuill from 'react-quill';
import { LandingFields } from './landing-create.types';
import 'react-quill/dist/quill.snow.css';

const BuildInputs = () => {
  const inputs = Object.values(LandingFields)
    .filter((item) => item !== LandingFields.ID)
    .map((input) => {
      const inputName = input.toLocaleLowerCase();

      if (input === LandingFields.CONTENT) {
        return (
          <Form.Item label={input} key={inputName} name={inputName}>
            <ReactQuill theme="snow" />
          </Form.Item>
        );
      }

      return (
        <Form.Item label={input} key={inputName} name={inputName}>
          <Input placeholder="input placeholder" />
        </Form.Item>
      );
    });
  return <>{inputs}</>;
};

const LandingCreatePage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [createLanding] = useMutation(LANDING_CREATE_MUTATION, {
    update(_, { data: { createLanding: createLandingData } }) {
      console.log('@@@ createLandingData', createLandingData);
    },
    onError({ graphQLErrors }) {
      console.log('graphQLErrors', graphQLErrors);
    },
  });

  const handleSave = (values: any) => {
    createLanding({
      variables: values,
    });
    navigate('/landings');
  };

  return (
    <div>
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card bordered={false} title={`Landing`}>
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

export default LandingCreatePage;
