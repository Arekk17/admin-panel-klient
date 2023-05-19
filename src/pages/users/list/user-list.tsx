import { useQuery } from '@apollo/client';
import { Row, Col, Card, Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import styles from './user-list.module.scss';
import { USERS_QUERY } from './user-list.query';
import type { UsersQueryResponse } from './user-list.types';
import { shapeUsersData, shapeUsersColumns } from './user-list.utils';
import Error from '../../../components/error';
import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const UsersListPage = () => {
  const { loading, error, data } = useQuery<UsersQueryResponse>(USERS_QUERY);
  const { t } = useTranslation(['global', 'user'])

  if (loading) return <LoadingOutlined />;
  if (error) return <Error />;

  const tableDataSource = shapeUsersData(data?.users) || [];
  const tableColumns = shapeUsersColumns();

  return (
    <div>
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            title={t('users-header', { ns: 'user'})}
            extra={
              <>
                <Link to="/user">
                  <Button type="primary">{t('add')}</Button>
                </Link>
              </>
            }>
            <div className={styles['users-table-container']}>
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

export default UsersListPage;
