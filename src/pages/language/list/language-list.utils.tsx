import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import styles from './language-list.module.scss';

export const shapeLandingsData = (landings: any) =>
  landings
    .map(({ id, logo, name }: any) => ({
      key: id,
      id,
      name,
      logo: (
        <div className={styles['cell-logo']}>
          <img src={logo} alt={`${name} flag`} />
          <span>{logo}</span>
        </div>
      ),
      edit: (
        <Link to={`/language/${id}`}>
          <Button icon={<EditOutlined />} />
        </Link>
      ),
    }))
    .reverse();
