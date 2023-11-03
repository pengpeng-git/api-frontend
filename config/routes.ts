export default [
  { name: '接口广场', path: '/', icon: 'CloudOutlined', component: './Index' },
  {
    path: '/interface-info/:id',
    component: './InterfaceInfo',
    hideInMenu: true,
  },
  {
    name: '登录',
    path: '/user',
    layout: false,
    routes: [
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
    ],
  },
  {
    icon: 'crown',
    name: '个人中心',
    path: '/account/center',
    component: 'Account/Center',
  },
  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    name: '管理员页',
    routes: [
      {
        path: '/admin/interfaceInfoList',
        component: 'Admin/InterfaceInfoList',
        name: '接口管理',
      },
      {
        path: '/admin/userList',
        component: 'Admin/UserList',
        name: '用户管理',
      },
    ],
  },
  // { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
