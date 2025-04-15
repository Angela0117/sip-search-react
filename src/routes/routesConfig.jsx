import React from "react";
import Layout from "../components/Layout";
import IndexPage from "../pages/IndexPage";
import AboutPage from "../pages/AboutPage";
import RecipesSearch from "../pages/RecipesSearch";
import BarFinder from "../pages/BarFinder";
import MemberSignup from "../pages/MemberSignup";
import MemberLogin from "../pages/MemberLogin";
import NotFound from "../pages/NotFound";
import WineContent from "../pages/WineContent";
import BarContent from "../pages/BarContent";
import BarSearch from "../pages/BarSearch";
import MemberArea from "../pages/MemberArea";

import Activity from "../pages/Activity";
import MemberProfile from "../components/MemberProfile";
import MemberRecipes from "../components/MemberRecipes"; 
import MemberBars from "../components/MemberBars";
import MemberComments from "../components/MemberComments"; 
// 導入其他頁面...

const routesConfig = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <IndexPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "recipessearch",
        element: <RecipesSearch />,
      },
      {
        path: "barfinder",
        element: <BarFinder />,
      },
      {
        path: "membersignup",
        element: <MemberSignup />,
      },
      {
        path: "memberlogin",
        element: <MemberLogin />,
      },
      {
        path: "wine/:id",
        element: <WineContent />,
      },
      {
        path: "bar/:id",
        element: <BarContent />,
      },
      {
        path: "barsearch",
        element: <BarSearch />,
      },
      {
        path: "users/:id",
        element: <MemberArea />,
        children:[
          {
            index: true,
            element: <MemberProfile />, // 預設子頁面
          },
          {
            path: "recipes",
            element: <MemberRecipes />,
          },
          {
            path: "bars",
            element: <MemberBars />,
          },
          {
            path: "Comments",
            element: <MemberComments />,
          },
        ]
      },
      {
        path: "activity",
        element: <Activity />,
      },
      // 添加其他路由...
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routesConfig;
