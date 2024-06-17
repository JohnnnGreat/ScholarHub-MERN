"use client";
import React, { createContext, useState } from "react";

export const INITIAL_USER = {
  fullname: "",
  email: "",
  imageUrl: "",
  bio: "",
  id: "",
};

export const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

export type IUser = {
  researchType: string;
  fullname: string;
  email: string;
  imageUrl: string;
  bio: string;
  id: string;
};
type IContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

export const AuthContext = createContext<IContextType>(INITIAL_STATE);
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{
    fullname: string;
    email: string;
    imageUrl: string;
    bio: string;
    id: string;
  }>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkAuthUser = async () => {
    return true;
  };

  const value = {
    user,
    setUser,
    isAuthenticated,
    isLoading,
    checkAuthUser,
    setIsAuthenticated,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
