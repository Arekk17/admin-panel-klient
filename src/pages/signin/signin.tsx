import { useTranslation } from 'react-i18next';
import React, { useContext, useState, useEffect } from 'react';
import { Button, Switch, Form, Input } from 'antd';
import { useMutation } from '@apollo/client';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import styles from './signin.module.scss';
import { AuthContext } from '../../context/auth-context';
import type { Values } from './signin.types';
import { SIGNIN_USER_MUTATION } from './signin.query';
import { ROLE } from '../../context/auth-context';

const SignInPage: React.FC = () => {
  const { login, user }: any = useContext(AuthContext);
  const { t } = useTranslation('signin');
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === ROLE.Admin) {
      navigate('/dashboard');
    }
  }, []);

  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [signinUser] = useMutation(SIGNIN_USER_MUTATION, {
    update(_, { data: { signinUser: siginUserData } }) {
      login(siginUserData);
      navigate('/dashboard');
    },
    onError({ graphQLErrors }) {
      setErrorMessage(graphQLErrors[0].message);
    },
  });

  const emailValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('email-incorrect-text') || '')
      .required(t('email-validation-text-2') || ''),
  });

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = (values: Values) => {
    const { email, password } = values;
    emailValidationSchema
      .validate(values, { abortEarly: false })
      .then(() => {
        signinUser({
          variables: { email, password },
        });
      })
      .catch((errors) => setErrorMessage(errors.errors[0]));
  };

  return (
    <div className={styles['sign-in-form']}>
      <Form
        name="login"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="title">
          <h1>{t('signin-header')}</h1>
        </div>

        <div className="entitled" style={{ color: 'grey' }}>
          <p> {t('signin-description')} </p>
        </div>

        <div className="email-form">
          <p>Email</p>
          <Form.Item
            name="email"
            className="email"
            rules={[
              { required: true, message: t('email-validation-text') || '' },
            ]}
          >
            <Input className={styles['email-input']} placeholder="Email" />
          </Form.Item>
        </div>

        <div className="password-form">
          <p>{t('password-label')}</p>
          <Form.Item
            name="password"
            className="password"
            rules={[
              { required: true, message: t('password-validation-text') || '' },
            ]}
          >
            <Input.Password
              className={styles['password-input']}
              placeholder={t('password-label') || ''}
            />
          </Form.Item>
        </div>

        {errorMessage && (
          <div className="error-message" style={{ color: 'red' }}>
            {errorMessage}
          </div>
        )}

        <div className="remember-switch">
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ span: 16 }}
          >
            <>
              <Switch
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />{' '}
              {t('remember-label')}
            </>
          </Form.Item>
        </div>

        <div className="signin-button">
          <Form.Item wrapperCol={{ span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles['button-form']}
            >
              {t('signin-header')}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default SignInPage;
