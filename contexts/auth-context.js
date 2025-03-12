"use client";
import { createContext, useContext, useState } from "react";
import { JWT_LOGIN_POST } from "@/config/api-path";

const AuthContext = createContext();
/*
  1. login(): 登入
  2. logout(): 登出
  3. auth: 登入後, 取得用戶的資料
  4. getAuthHeader(): 把 token 包在 headers 裡
*/

const emptyAuth = {
  id: 0,
  account: "",
  nickname: "",
  token: "",
};
const storageKey = "shinder-auth"; // localStorage 的 key

export function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState({ ...emptyAuth }); // 預設是沒有登入的狀態

  const logout = () => {
    localStorage.removeItem(storageKey);
    setAuth({ ...emptyAuth });
  };

  const login = async (account, password) => {
    const r = await fetch(JWT_LOGIN_POST, {
      method: "POST",
      body: JSON.stringify({ account, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await r.json();
    if (result.success) {
      localStorage.setItem(storageKey, JSON.stringify(result.data));
      setAuth(result.data);
    }
    return result.success;
  };

  return (
    <AuthContext.Provider value={{ auth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
