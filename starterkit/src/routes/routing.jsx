import Dashboard from '../views/Dashboard';
import NetworkScan from '../views/Servers/NetworkScan';
import ManualAdd from '../views/Servers/ManualAdd';

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
    navlabel: true,
    name: 'Servers',
    icon: 'mdi mdi-dots-horizontal'
  },
  {
    path: '/servers/network-scan',
    name: 'Network scan',
    icon: 'mdi mdi-access-point-network',
    component: NetworkScan
  },
  {
    path: '/servers/manual',
    name: 'Manual add a server',
    icon: 'mdi mdi-server-plus',
    component: ManualAdd
  }
];

export default ThemeRoutes;
