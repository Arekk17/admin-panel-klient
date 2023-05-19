import { useTranslation } from 'react-i18next';
import styles from './404page.module.scss';

const NotFoundPage = () => {
  const { t } = useTranslation('pageNotFound');
  return (
    <div className={styles['not-found-text']}>
      <h1>{t('notFound')}</h1>
    </div>
  );
};

export default NotFoundPage;
