import { useQuery } from '@apollo/client';
import { Row, Col, Card, Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import styles from './level-list.module.scss';
import { LEVELS_QUERY } from './level-list.query';
import type { LevelsQueryResponse } from './level-list.types';
import { shapeLevelsData, shapeLevelsColumns } from './level-list.utils';
import Error from '../../../components/error';
import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const LevelListPage = () => {
  const { t } = useTranslation(['global', 'level']);
  const { loading, error, data } = useQuery<LevelsQueryResponse>(LEVELS_QUERY);

  if (loading) return <LoadingOutlined />;
  if (error) return <Error />;

  const tableDataSource = shapeLevelsData(data?.levels) || [];
  const tableColumns = shapeLevelsColumns();

  return (
    <div>
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            title={t('levels-header', { ns: 'level' })}
            extra={
              <>
                <Link to="/level">
                  <Button type="primary">{t('add')}</Button>
                </Link>
              </>
            }
          >
            <div className={styles['levels-table-container']}>
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

export default LevelListPage;
