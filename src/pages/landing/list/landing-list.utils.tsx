import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { LandingFields } from './landing-list.types';
import { EditOutlined } from '@ant-design/icons';

const truncateText = (text: string, count: number): string =>
  `${text.split(/\s+/).slice(0, count).join(' ')}... [edit to see more]`;

export const shapeLandingsData = (landings: any) =>
  landings
    .map(({ id, title, name, slug, content }: any) => ({
      key: id,
      id,
      name,
      title,
      slug,
      content: truncateText(content, 10),
      edit: (
        <Link to={`/landing/${id}`}>
          <Button icon={<EditOutlined />} />
        </Link>
      )
    }))
    .reverse();

export const shapeLandingsColumns = () => {
  const columns = Object.values(LandingFields).map((column) => ({
    title: column.toLocaleLowerCase(),
    dataIndex: column.toLocaleLowerCase(),
    key: column
  }));
  return [
    ...columns,
    {
      title: 'edit',
      dataIndex: 'edit',
      key: 'Edit'
    }
  ];
};
