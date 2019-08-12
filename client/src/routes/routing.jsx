// import Tabs from '../views/Tabs/Tabs';
import Dashboard from '../views/Dashboard/Dashboard';
import Project from '../views/Project/Project';

var ThemeRoutes = [
  {
    path: '/dashboard/',
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
    path: '/project/',
    name: 'Project 1',
    icon: 'mdi mdi-label',
    component: Project
  },
  {
    path: '/',
    pathTo: '/dashboard/',
    redirect: true
  }
];

export default ThemeRoutes;
