import { useQuery } from '@apollo/client';
import { Row, Col, Card, Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import styles from './language-list.module.scss';
import { LANGUAGES_QUERY } from './language-list.query';
import type { LanguagesQueryResponse } from './language-list.types';
import { LanguageFields } from './language-list.types';
import { shapeLandingsData } from './language-list.utils';
import Error from '../../../components/error';
import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { shapePagesColumns } from '../../../utils';

const LanguageListPage = () => {
  const { t } = useTranslation(['global', 'language']);
  const { loading, error, data } = useQuery<LanguagesQueryResponse>(LANGUAGES_QUERY);

  if (loading) return <LoadingOutlined />;
  if (error) return <Error />;

  const tableDataSource = shapeLandingsData(data?.languages) || [];
  const tableColumns = shapePagesColumns(LanguageFields);

  return (
    <div>
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            title={t('languages-header', { ns: 'language' })}
            extra={
              <>
                <Link to="/language">
                  <Button type="primary">{t('add')}</Button>
                </Link>
              </>
            }
          >
            <div className={styles['languages-table-container']}>
              <Table
                columns={tableColumns}
                dataSource={tableDataSource}
                pagination={{
                  position: ['bottomCenter']
                }}
                className="ant-border-space"
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LanguageListPage;
