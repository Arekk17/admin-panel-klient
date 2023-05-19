import { Layout } from 'antd';
import type { MainProperties } from './main.types';
import SideNav from '../side-nav';

const { Content } = Layout;

const Main = ({ children }: MainProperties) => (
  <Layout>
    <SideNav />
    <Layout>
      <Content>
        <div
          style={{
            padding: 24,
            minHeight: 360,
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  </Layout>
);

export default Main;
