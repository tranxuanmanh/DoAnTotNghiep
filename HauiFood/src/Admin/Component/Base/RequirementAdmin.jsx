import React from 'react'
import { Navigate, Outlet } from 'react-router';

const RequirementAdmin = () => {
    const user = JSON.parse(localStorage.getItem("user")); // hoặc dùng context/auth hook tùy cách bạn xử lý đăng nhập

    if (!user || (Number(user.role) !== 1 && Number(user.role) !== 3)) {
        return <Navigate to="/" replace />;
    }


  return <Outlet />;
  
}

export default RequirementAdmin
