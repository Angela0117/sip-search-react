/* eslint-disable react/prop-types */
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

// 新增這個 custom hook
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // 更新使用者資訊的函數
  const updateUser = (userData) => {
    setUser(userData);
  };

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const apiUrl = import.meta.env.VITE_API_URL;

  // 創建兩個 axios 實例
  const authAxios = axios.create({
    baseURL: apiUrl,
  });

  const dataAxios = axios.create({
    baseURL: baseUrl,
  });

  // 當 user 改變時，更新 axios header
  useEffect(() => {
    if (user && user.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [user]);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));// 存到瀏覽器
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");// 清空
    delete axios.defaults.headers.common["Authorization"];// 移除 token
    setUser(null);// 清空狀態
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updateUser,
        login,
        logout,
        authAxios,
        dataAxios, // 確保這裡有導出 dataAxios
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
