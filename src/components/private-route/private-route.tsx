import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Main from '../layouts/main/main';
import { AuthContext } from '../../context/auth-context';
import { ROLE } from '../../context/auth-context';

const PrivateRoute = () => {
  const { user }: { user: any } = useContext(AuthContext);
  const condition = user && user.role === ROLE.Admin;
  return condition ? (
    <Main>
      <Outlet />
    </Main>
  ) : (
    <Navigate to="/signin" />
  );
};

export default PrivateRoute;
