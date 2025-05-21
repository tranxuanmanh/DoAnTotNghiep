import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router";
import Change_Pass from "./Change_Pass";

const DetailUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [openChangePass,setOpenChangePass]=useState(false);

  return (
    <div className="w-[90%] mx-auto  mt-5 relative h-[600px]">

      {openChangePass&&<Change_Pass openChangePass={setOpenChangePass}/>}


      {user ? (
        <>
          <p className="text-center text-xl font-bold mb-3">
            Thông tin tài khoản
          </p>
          <div className="ms-30 mb-10">
            <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Họ và tên
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Số điện thoại
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Đổi mật khẩu
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                     {user?.fullname}
                    </th>
                    <td class="px-6 py-4">{user?.phone}</td>
                    <td class="px-6 py-4">{user?.email}</td>
                    <td class="px-6 py-4" >
                      {/* <Link to="/change-pass">
                      <i title="Đổi mật khẩu" class="fa-classic fa-solid fa-key fa-fw px-3 text-xl  py-2 text-blue-500 cursor-pointer "></i>
                      
                      </Link> */}
                      <button
                      onClick={()=>setOpenChangePass(true)}
                      >
                      <i title="Đổi mật khẩu" class="fa-classic fa-solid fa-key fa-fw px-3 text-xl  py-2 text-blue-500 cursor-pointer "></i>
                      
                      </button>
                     
                    </td>
                  </tr>
                 
                </tbody>
              </table>
            </div>
          </div>
          
        </>
      ) : (
        <p>Bạn chưa đăng nhâp</p>
      )}

    </div>
  );
};

export default DetailUser;
