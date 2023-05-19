import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth-context';

const DashboardPage = () => {
  const { logout, user }: any = useContext(AuthContext);
  const { t } = useTranslation('dashboard');
  return (
    <div>
      <p>
        {t('welcome')} {user.name}
      </p>
      <button onClick={() => logout()}>{t('logout')}</button>
    </div>
  );
};

export default DashboardPage;
