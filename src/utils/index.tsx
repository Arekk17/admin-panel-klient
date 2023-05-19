import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { resources } from '../i18n';

interface NewObject {
  [key: string]: any;
}

export const propertiesToLowerCase = (array: Array<Record<string, any>>) =>
  array.map((obj) => {
    const newObj: NewObject = {};
    for (let key in obj) {
      const keyName = key.toLowerCase();
      newObj[keyName] = obj[key];
    }
    return newObj;
  });

export const shapePagesColumns = (fields: any) => {
  const columns = Object.values(fields).map((column: any) => ({
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

export const shapeData = (data: any, path: string) =>
  propertiesToLowerCase(data)
    .map((item: any) => {
      const shapedObject = {
        key: item.id,
        ...item,
        edit: (
          <Link to={`/${path}/${item.id}`}>
            <Button icon={<EditOutlined />} />
          </Link>
        ),
      };
      return shapedObject;
    })
    .reverse();

// helper to get translation for non react code such as functions etc
export const getTranslation = () => {
  const translate = resources;
  const defaultLocale = 'en';
  const locale = localStorage.getItem('i18nextLng');
  if (locale) {
    const localPrefix = locale.split('-')[0];
    return resources[localPrefix as keyof typeof translate];
  }
  return resources[defaultLocale as keyof typeof translate];
};
