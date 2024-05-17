import React, { createContext, useContext, useState } from "react"

type Auth = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const authContext = createContext<Auth | null>(null)

export function useAuth() {
  const auth = useContext(authContext)
  if (!auth) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return auth
}

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('token') === 'mytoken');

  function login() {
    localStorage.setItem('token', 'mytoken');
    setIsLoggedIn(true);
  }

  function logout() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  }

  const value: Auth = {isLoggedIn, login, logout}

  return (
    <authContext.Provider value={value}>
      {children}
    </authContext.Provider>
  )
}