import * as React from 'react';
import { Outlet } from "react-router-dom"
import AuthContextProvider from './AuthContextProvider';

export default function App() {
  return (
    <AuthContextProvider>
      <Outlet />
    </AuthContextProvider>
  );
}
