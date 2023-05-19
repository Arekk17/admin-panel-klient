import { useQuery } from '@apollo/client';
import { Row, Col, Card, Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import styles from './landing-list.module.scss';
import { LANDINGS_QUERY } from './landing-list.query';
import type { LandingsQueryResponse } from './landing-list.types';
import { shapeLandingsData, shapeLandingsColumns } from './landing-list.utils';
import Error from '../../../components/error';
import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const LandingListPage = () => {
  const { t } = useTranslation(['global', 'landing']);
  const { loading, error, data } =
    useQuery<LandingsQueryResponse>(LANDINGS_QUERY);

  if (loading) return <LoadingOutlined />;
  if (error) return <Error />;

  const tableDataSource = shapeLandingsData(data?.landings) || [];
  const tableColumns = shapeLandingsColumns();

  return (
    <div>
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            title={t('landings-header', { ns: 'landing' })}
            extra={
              <>
                <Link to="/landing">
                  <Button type="primary">{t('add')}</Button>
                </Link>
              </>
            }
          >
            <div className={styles['landings-table-container']}>
              <Table
                columns={tableColumns}
                dataSource={tableDataSource}
                pagination={{
                  position: ['bottomCenter'],
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

export default LandingListPage;
