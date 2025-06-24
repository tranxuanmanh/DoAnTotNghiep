import React from 'react'

import { useEffect, useState } from "react";

export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Kiểm tra localStorage khi component mount
  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem("isLogin") === "true");
    };

    checkLoginStatus();

    // Lắng nghe sự kiện thay đổi localStorage từ các tab khác (optional)
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  // Hàm login
  const login = () => {
    localStorage.setItem("isLogin", true);
    setIsLoggedIn(true);
  };

  const getToken = () => {
    const token = localStorage.getItem("token");
    return token ? token : null;
  };
  

  // Hàm logout
  const logout = () => {
    localStorage.setItem("isLogin", false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("order");
    setIsLoggedIn(false);
  };

  return { isLoggedIn, login, logout,getToken };
}

