import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { LoadingOutlined } from '@ant-design/icons';
import { Row, Col, Card, Button, Form, Input } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { USER_GET_BY_ID_QUERY, USER_EDIT_BY_ID_MUTATION, USER_DELETE_BY_ID_MUTATION } from './user-edit.query';
import { UserFields } from './user-edit.types';
import Error from '../../../components/error';
import styles from './user-edit.module.scss';
import { useTranslation } from 'react-i18next';

const BuildInputs = () => {
  const inputs = Object.values(UserFields).map((input) => {
    const inputName = input.toLocaleLowerCase();
    const isDisabled = input === UserFields.ID;
    if(input === UserFields.ROLE){
      return null
    }
    return (
      <Form.Item label={input} key={inputName} name={inputName}>
        <Input placeholder="input placeholder" disabled={isDisabled} />
      </Form.Item>
    );
  });
  return <>{inputs}</>;
};

const UserEditPage = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation(['global', 'user'])

  const {
    loading,
    error: errorQuery,
    data
  } = useQuery(USER_GET_BY_ID_QUERY, {
    variables: { id }
  });

  const [editUser] = useMutation(USER_EDIT_BY_ID_MUTATION, {
    update(_, { data: { updateUser: updateUserResponse } }) {
      console.log('@@@ editUser', updateUserResponse);
      navigate('/users');
    },
    onError({ graphQLErrors }) {
      console.log('graphQLErrors', graphQLErrors);
      setErrorMessage(graphQLErrors[0].message);
    }
  });

  const [deleteUser] = useMutation(USER_DELETE_BY_ID_MUTATION, {
    update(_, { data: { deleteUser: deleteUserData } }) {
      console.log('@@@ deleteUser', deleteUserData);
      navigate('/users');
    },
    onError({ graphQLErrors }) {
      console.log('graphQLErrors', graphQLErrors);
      setErrorMessage(graphQLErrors[0].message);
    }
  });

  useEffect(() => {
    if (errorQuery) {
      setErrorMessage(errorQuery.message);
    }
  }, []);

  if (loading) return <LoadingOutlined />;
  if (errorMessage) return <Error errorMessage={errorMessage} />;

  const { user } = data;

  if (user) {
    form.setFieldsValue({
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      phonePrefix: user.phonePrefix
    });
  }

  const handleDelete = () => {
    deleteUser({
      variables: { id }
    });
  };

  const handleSave = (values: any) => {
    editUser({ variables: { id, ...values } });
  };
  
  return (
    <div>
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            title={`${t('user-header', { ns: 'user'})}: ${user.name}`}
            extra={
              <>
                <Button type="primary" danger onClick={handleDelete}>
                  {t('delete')}
                </Button>
              </>
            }
          >
            <div className={styles['user-table-container']}>
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

export default UserEditPage