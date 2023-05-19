import { useMutation } from '@apollo/client';
import { LANGUAGE_CREATE_MUTATION } from './language-create.query';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Form, Select } from 'antd';
import styles from './language-create.module.scss';
import { languageSelectorList } from './language-create.utils';
import { useTranslation } from 'react-i18next';

const LanguageCreatePage = () => {
  const { t } = useTranslation(['global', 'language']);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [createLanguage] = useMutation(LANGUAGE_CREATE_MUTATION, {
    update(_, { data: { createLanguage: createLanguageData } }) {
      console.log('@@@ createLanguageData', createLanguageData);
      if (createLanguageData.id) {
        navigate('/languages');
      }
    },
    onError({ graphQLErrors }) {
      console.log('graphQLErrors', graphQLErrors);
    }
  });

  const handleSelectorChange = (value: string) => {
    form.setFieldsValue({
      language: value
    });
  };

  const handleSave = (values: any) => {
    const { name, logo }: any = languageSelectorList().find(
      (item) => item.label === values.langauge
    );
    createLanguage({
      variables: {
        name,
        logo
      }
    });
  };

  return (
    <div>
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card bordered={false} title={t('language-header', { ns: 'language' })}>
            <div className={styles['languages-table-container']}>
              <p>{t('available-languages-header', { ns: 'language' })}</p>
              <Form
                autoComplete="off"
                layout={'vertical'}
                form={form}
                onFinish={handleSave}
                initialValues={{ name: 'English' }}
              >
                <Form.Item name="langauge">
                  <Select onChange={handleSelectorChange} options={languageSelectorList()} />
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
    </div>
  );
};

export default LanguageCreatePage;
