import Tabs from '../views/Tabs/Tabs';
import Dashboard from '../views/Dashboard/Dashboard';

var ThemeRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'mdi mdi-view-dashboard',
    component: Dashboard
  },
  {
    navlabel: true,
    name: 'Projects',
    icon: 'mdi mdi-dots-horizontal'
  },
  {
    path: '/Tabs',
    name: 'Project 1 - Yifat',
    icon: 'mdi mdi-view-dashboard',
    component: Tabs
  },
  {
    path: '/',
    pathTo: '/dashboard',
    redirect: true
  }
];

export default ThemeRoutes;
