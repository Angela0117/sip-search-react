import React from 'react';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import routesConfig from './routesConfig';

const router = createHashRouter(routesConfig);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;