import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { LevelFields } from './level-list.types';
import { EditOutlined } from '@ant-design/icons';
import { propertiesToLowerCase } from '../../../utils';

export const shapeLevelsData = (levels: any) =>
  propertiesToLowerCase(levels)
    .map(({ id, name, description, imageurl }: any) => ({
      key: id,
      id,
      name,
      imageurl: (
        // TODO add styling
        <img src={imageurl} style={{ width: '50px', height: '50px' }} />
      ),
      description,
      edit: (
        <Link to={`/level/${id}`}>
          <Button icon={<EditOutlined />} />
        </Link>
      ),
    }))
    .reverse();

export const shapeLevelsColumns = () => {
  const columns = Object.values(LevelFields).map((column) => ({
    title: column.toLocaleLowerCase(),
    dataIndex: column.toLocaleLowerCase(),
    key: column,
  }));
  return [
    ...columns,
    {
      title: 'edit',
      dataIndex: 'edit',
      key: 'Edit',
    },
  ];
};
