import React, { createContext, useContext, useState } from "react"
import authService from "./service/authService";

type Auth = {
  isLoggedIn: boolean;
  register: (character: string, username: string, password: string) => void;
  login: (username: string, password: string) => void;
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
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => authService.isAuthenticated());

  async function register(character: string, username: string, password: string) {
    await authService.register(character, username, password);
  }

  async function login(username: string, password: string) {
    await authService.login(username, password);
    setIsLoggedIn(true);
  }

  async function logout() {
    await authService.logout();
    setIsLoggedIn(false);
  }

  const value: Auth = {isLoggedIn, register, login, logout}

  return (
    <authContext.Provider value={value}>
      {children}
    </authContext.Provider>
  )
}