import { useMutation } from '@apollo/client';
import { USER_CREATE_MUTATION } from './user-create.query';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import styles from './user-create.module.scss';

const UserCreatePage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { t } = useTranslation(['global', 'user'])

    const [createUser] = useMutation(USER_CREATE_MUTATION, {
        update(_, { data: { createUser: createUserData } }) {
            console.log('@@@ createUserData', createUserData);
            if (createUserData.token) {
                navigate('/users');
            }
        },
        onError({ graphQLErrors }) {
            console.log('graphQLErrors', graphQLErrors);
        }
    });

    const handleSave = (values: any) => {
        const phoneNumberInt = parseInt(values.phonenumber, 10);
        const phonePrefixInt = parseInt(values.phoneprefix, 10);
        createUser({
            variables: {
                email: values.email,
                password: values.password,
                name: values.name,
                surname: values.surname,
                phoneNumber: phoneNumberInt,
                phonePrefix: phonePrefixInt
            }
        });
        console.log(values)
    };

    return (
        <div>
            <Row gutter={[24, 0]}>
                <Col xs={24} xl={24}>
                    <Card bordered={false} title={t('create-user-header', { ns: 'user'})}>
                    <div className={styles['create-user-form-container']}>
                        <Form
                            autoComplete="off"
                            layout={'vertical'}
                            form={form}
                            onFinish={handleSave}
                        >
                            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                                <Input placeholder="Enter name" />
                            </Form.Item>
                            <Form.Item name="surname" label="Surname" rules={[{ required: true }]}>
                                <Input placeholder="Enter surname" />
                            </Form.Item>
                            <Form.Item name="phonenumber" label="Phone Number"  >
                                <Input placeholder="Enter Phone Number" />
                            </Form.Item>
                            <Form.Item name="phoneprefix" label="Phone Prefix">
                                <Input placeholder="Enter Phone Prefix" />
                            </Form.Item>
                            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                                <Input placeholder="Enter email" />
                            </Form.Item>
                            <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                                <Input.Password placeholder="Enter password" />
                            </Form.Item>
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
</div >
);
};

export default UserCreatePage;