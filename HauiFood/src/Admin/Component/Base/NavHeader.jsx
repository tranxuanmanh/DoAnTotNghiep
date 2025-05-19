
import React, { useEffect, useState } from 'react'

const NavHeader = ({toggleSidebar}) => {
  const [timeNow,setTimeNow]=useState("");
  
  useEffect(() => {
    const today = new Date().toLocaleDateString("vi-VN", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    setTimeNow(today);
  }, []);
  console.log("KKKKK")
  return (
    <div>
      <div className="flex items-center justify-between bg-white p-4 shadow-md">
          <div className="flex items-center">
            <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none">
              <i className="fas fa-bars"></i>
            </button>
            
          </div>
          <div className='text-center font-bold'>
           {timeNow}
          </div>
          <div className="flex items-center">
           
            <div className="ml-4 flex items-center">
              <img
                src="https://img.lovepik.com/free-png/20211204/lovepik-cartoon-avatar-png-image_401302777_wh1200.png"
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <span className="ml-2">Trần Xuân Mạnh</span>
              <i className="ml-2 fas fa-chevron-down"></i>
            </div>
          </div>
        
      </div>
     
    </div>
   
   
  )
}

export default NavHeader
