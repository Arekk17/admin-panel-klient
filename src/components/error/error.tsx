import { MehOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import type { ErrorProperties } from './error.types';

const Error = ({ errorMessage }: ErrorProperties) => {
  const { t } = useTranslation('global');
  const errorText = t('error');
  if (errorMessage) {
    return (
      <div>
        {errorText} <MehOutlined />
        <p>{errorMessage}</p>
      </div>
    );
  }

  return (
    <>
      {errorText} <MehOutlined />
    </>
  );
};

export default Error;
