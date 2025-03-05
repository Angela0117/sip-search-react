import React from 'react';
import Layout from '../components/Layout';
import IndexPage from '../pages/IndexPage';
import AboutPage from '../pages/AboutPage';
import RecipesSearch from '../pages/RecipesSearch';
import BarFinder from '../pages/BarFinder';
import MemberSignup from '../pages/MemberSignup';
import MemberLogin from '../pages/MemberLogin';
import NotFound from '../pages/NotFound';
import WineContent from '../pages/WineContent';
import BarContent from '../pages/BarContent';
// 導入其他頁面...

const routesConfig = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <IndexPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'recipessearch',
        element: <RecipesSearch />,
      },
      {
        path: 'barfinder',
        element: <BarFinder />,
      },
      {
        path: 'membersignup',
        element: <MemberSignup />,
      },
      {
        path: 'memberlogin',
        element: <MemberLogin />,
      },
      {
        path: 'winecontent',
        element: <WineContent />,
      },
      {
        path: 'barcontent',
        element: <BarContent />,
      },
      
      // 添加其他路由...
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routesConfig;