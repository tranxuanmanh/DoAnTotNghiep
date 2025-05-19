import React from 'react'
import useAuth from './CustomHook';

const Logout = () => {
    // localStorage.clear();
    // localStorage.setItem("isLogin",false);
    const {logout}=useAuth();
    logout();
    window.location.href = "/login";
  return (
    <div>
      
    </div>
  )
}

export default Logout
