import { useMutation } from '@apollo/client';
import { LEVEL_CREATE_MUTATION } from './level-create.query';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Form, Input } from 'antd';
import styles from './level-create.module.scss';
import { LevelFields } from './level-create.types';
import { useTranslation } from 'react-i18next';

const BuildInputs = () => {
  const inputs = Object.values(LevelFields)
    .filter((item) => item !== LevelFields.ID)
    .map((input) => {
      const inputName = input.toLocaleLowerCase();

      return (
        <Form.Item label={input} key={inputName} name={inputName}>
          <Input placeholder="input placeholder" />
        </Form.Item>
      );
    });
  return <>{inputs}</>;
};

const LevelCreatePage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { t } = useTranslation(['global', 'level']);

  const [createLevel] = useMutation(LEVEL_CREATE_MUTATION, {
    update(_, { data: { createLevel: createLevelData } }) {
      console.log('@@@ createLevelData', createLevelData);
    },
    onError({ graphQLErrors }) {
      console.log('graphQLErrors', graphQLErrors);
    }
  });

  const handleSave = (values: any) => {
    createLevel({
      variables: {
        ...values,
        imageUrl: values.imageurl
      }
    });
    navigate('/levels');
  };

  return (
    <div>
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card bordered={false} title={t('level-header', { ns: 'level' })}>
            <div className={styles['landings-table-container']}>
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

export default LevelCreatePage;
