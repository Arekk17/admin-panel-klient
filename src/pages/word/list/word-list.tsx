import { useQuery } from '@apollo/client';
import { Row, Col, Card, Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import styles from './word-list.module.scss';
import { WORDS_QUERY } from './word-list.query';
import type { WordsQueryResponse } from './word-list.types';
import { WordFields } from './word-list.types';
import Error from '../../../components/error';
import { LoadingOutlined } from '@ant-design/icons';
import { shapePagesColumns } from '../../../utils';
import { shapeWordsData } from '../word.utils';
import { useTranslation } from 'react-i18next';

const WordListPage = () => {
  const { t } = useTranslation('global');
  const { loading, error, data } = useQuery<WordsQueryResponse>(WORDS_QUERY);

  if (loading) return <LoadingOutlined />;
  if (error) return <Error />;

  const tableDataSource = shapeWordsData(data?.words) || [];
  const tableColumns = shapePagesColumns(WordFields);

  return (
    <div>
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            title={t('words-header', { ns: 'word' })}
            extra={
              <>
                <Link to="/word">
                  <Button type="primary">{t('add')}</Button>
                </Link>
              </>
            }
          >
            <div className={styles['words-table-container']}>
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

export default WordListPage;
