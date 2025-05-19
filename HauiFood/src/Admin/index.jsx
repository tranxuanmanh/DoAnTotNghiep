// export default HomeAdmin;
import React, { useState } from "react";
import NavLeft from "./Component/Base/NavLeft";
import NavHeader from "./Component/Base/NavHeader";
import { Outlet } from "react-router";

const HomeAdmin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex h-screen-xl ">
      {/* Sidebar */}
      <NavLeft
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      ></NavLeft>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-margin duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`} >

       <NavHeader toggleSidebar={toggleSidebar}></NavHeader>
      
          <Outlet />
       
       
      </div>
     
    </div>
  );
};

export default HomeAdmin;
