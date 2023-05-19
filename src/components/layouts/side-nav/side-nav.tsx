import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { sideNavConfig } from './side-nav.config';
import { useLocation } from 'react-router-dom';

const { Sider } = Layout;

const SideNav = () => {
  const { pathname } = useLocation();
  const items = sideNavConfig.map(({ icon: Icon, path, label }) => ({
    key: path,
    label: <Link to={path}>{label}</Link>,
    icon: <Icon />,
  }));

  return (
    <Sider theme="light" breakpoint="lg" collapsedWidth="0">
      <Menu
        // TODO add selectedKeys for / and /dashboard
        selectedKeys={[pathname]}
        theme="light"
        mode="inline"
        defaultSelectedKeys={['/dashboard']}
        items={items}
      />
    </Sider>
  );
};

export default SideNav;
