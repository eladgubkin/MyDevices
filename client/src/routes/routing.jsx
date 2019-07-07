import Dashboard from '../views/Dashboard';

var ThemeRoutes = [
  {
    navlabel: true,
    name: 'Personal',
    icon: 'mdi mdi-dots-horizontal'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'mdi mdi-view-dashboard',
    component: Dashboard
  },
  {
    path: '/',
    pathTo: '/dashboard',
    name: 'Dashboard',
    redirect: true
  }
];

export default ThemeRoutes;
