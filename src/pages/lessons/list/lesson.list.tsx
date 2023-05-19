import { useQuery } from '@apollo/client';
import { Row, Col, Card, Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import styles from './lesson-list.module.scss';
import { LESSON_QUERY } from './lesson-list.query';
import type { LessonsQueryResponse } from './lesson-list.types';
import { LessonFields } from './lesson-list.types';
import Error from '../../../components/error';
import { LoadingOutlined } from '@ant-design/icons';
import { shapePagesColumns } from '../../../utils';
import { shapeLessonsData } from '../lessons.utils';
import { useTranslation } from 'react-i18next';

const LessonListPage = () => {
  const { t } = useTranslation('global');
  const { loading, error, data } = useQuery<LessonsQueryResponse>(LESSON_QUERY);

  if (loading) return <LoadingOutlined />;
  if (error) return <Error />;

  const tableDataSource = shapeLessonsData(data?.lessons) || [];
  const tableColumns = shapePagesColumns(LessonFields);

  return (
    <div>
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            title={t('lesson-header', { ns: 'lesson' })}
            extra={
              <>
                <Link to="/lesson">
                  <Button type="primary">{t('add')}</Button>
                </Link>
              </>
            }
          >
            <div className={styles['lessons-table-container']}>
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

export default LessonListPage;
