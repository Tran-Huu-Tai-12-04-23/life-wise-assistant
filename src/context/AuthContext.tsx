// AuthContext.tsx

import {
  clearUserDataFromLocalStorage,
  getUserEmailFromLocalStorage,
  saveUserDataToLocalStorage,
} from "@/helper";
import React, { createContext, useContext, useEffect, useState } from "react";

type IUser = {
  email: string;
};

interface AuthContextType {
  user: IUser | null;
  login: (user: IUser) => void;
  logout: () => void;
  isLoaded: boolean;
}

// Context object with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isLoaded: false,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const login = (user: IUser) => {
    saveUserDataToLocalStorage(user.email);
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    clearUserDataFromLocalStorage();
  };

  useEffect(() => {
    const email = getUserEmailFromLocalStorage();
    if (email) {
      setUser({ email });
    }
    setIsLoaded(true);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoaded }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
