import { useQuery } from '@apollo/client';
import { Row, Col, Card, Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import styles from './sentence-list.module.scss';
import { SENTENCES_QUERY } from './sentence-list.query';
import type { SentencesQueryResponse } from './sentence-list.types';
import { SentenceFields } from './sentence-list.types';
import Error from '../../../components/error';
import { LoadingOutlined } from '@ant-design/icons';
import { shapePagesColumns } from '../../../utils';
import { shapeSentencesData } from '../sentence.utils';
import { useTranslation } from 'react-i18next';

const SentenceListPage = () => {
  const { t } = useTranslation('global');
  const { loading, error, data } =
    useQuery<SentencesQueryResponse>(SENTENCES_QUERY);

  if (loading) return <LoadingOutlined />;
  if (error) return <Error />;

  const tableDataSource = shapeSentencesData(data?.sentences) || [];
  const tableColumns = shapePagesColumns(SentenceFields);

  return (
    <div>
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            title={t('sentences-header', { ns: 'sentence' })}
            extra={
              <>
                <Link to="/sentence">
                  <Button type="primary">{t('add')}</Button>
                </Link>
              </>
            }
          >
            <div className={styles['sentences-table-container']}>
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

export default SentenceListPage;
