import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { UserFields } from './user-list.types';
import { propertiesToLowerCase } from '../../../utils'

export const shapeUsersData = (users: any) =>
propertiesToLowerCase(users).map(({ id, name, surname, email, phonenumber, phoneprefix, joined, role}: any) => ({
    key: id,
    id,
    name,
    surname,
    email,
    phonenumber,
    phoneprefix,
    joined: new Date(parseInt(joined)).toLocaleDateString(),
    role,
    edit: (
      <Link to={`/user/${id}`}>
        <Button icon={<EditOutlined />} />
      </Link>
    )
  }));

  export const shapeUsersColumns = () => {
    const columns = Object.values(UserFields).map((column) => ({
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