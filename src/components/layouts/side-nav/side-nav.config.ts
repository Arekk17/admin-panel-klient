import {
  HomeOutlined,
  UnorderedListOutlined,
  FlagOutlined,
  FieldStringOutlined,
  RiseOutlined,
  UserOutlined,
  TableOutlined,
} from '@ant-design/icons';
import type { SideNavConfig } from './side-nav.types';
import { getTranslation } from '../../../utils';

const { sideNav }: any = getTranslation();

export const sideNavConfig: SideNavConfig = [
  {
    icon: HomeOutlined,
    label: sideNav['home.label'],
    path: '/dashboard',
  },
  {
    icon: UnorderedListOutlined,
    label: sideNav['landing.label'],
    path: '/landings',
  },
  {
    icon: RiseOutlined,
    label: sideNav['level.label'],
    path: '/levels',
  },
  {
    icon: FlagOutlined,
    label: sideNav['language.label'],
    path: '/languages',
  },
  {
    icon: UserOutlined,
    label: sideNav['user.label'],
    path: '/users',
  },
  {
    icon: FieldStringOutlined,
    label: sideNav['word.label'],
    path: '/words',
  },
  {
    icon: FieldStringOutlined,
    label: sideNav['sentence.label'],
    path: '/sentences',
  },
  {
    icon: TableOutlined,
    label: sideNav['lesson.label'],
    path: '/lessons',
  },
];
