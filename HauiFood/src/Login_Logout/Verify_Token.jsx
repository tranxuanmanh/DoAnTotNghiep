import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Loading from '../Admin/Component/Base/Loading'
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import axios from 'axios'

const Verify_Token = () => {
    const [loading,setLoading]=useState(false);
    const [token,setToken]=useState("");
    const navigate=useNavigate();
    const verifyToken=async()=>{
        setLoading(true);
        try{
        await axios.get("http://localhost:8080/api/v1/user/verify?token="+token.trim());
        setLoading(false);
        const kq= window.confirm("Xác thực tài khoản thành công!!!Quay lại trang đăng nhập");
       if(kq){
        navigate("/login");
       }
        }catch(error){
            if(error.response.data.code===400){
                toast.error(error.response.data.message, {autoClose: 2000});
            }
            setLoading(false);
            
        }

    }
    const handleSubmit=(e)=>{
        e.preventDefault();
       
        if(token===""){
            toast.error("Vui lòng nhập mã xác thực", {autoClose: 2000});
            return;
        }
        verifyToken();
      console.log(token);
    }
  return (
  
       <section class="bg-gray-50 dark:bg-gray-900 w-full h-screen " 
        style={{
        backgroundImage:`url(https://xdcs.cdnchinhphu.vn/446259493575335936/2024/1/4/t94467-1704321705073-17043217052481641427499.jpg)`,
        backgroundPosition:"center",
        backgroundSize:"cover",
    
    }}>
  <div class="flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0 mx-auto">
      <ToastContainer></ToastContainer>
      {loading&&(
     <div className="fixed inset-0 bg-white/60 z-50 flex justify-center items-center">
     <Loading />
   </div>
   )}
      <div class=" mx-auto rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 w-full bg-gradient-to-l from-teal-300 to-green-300">
        <div className=' w-full  flex justify-center p-2'>
        <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
        </div>
          
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8 w-[100%]">
              <h1 class="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white text-center">
                 Xác thực tài khoản
              </h1>
              <form class="space-y-4 md:space-y-6 " onSubmit={handleSubmit}>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Nhập mã xác thực</label>
                      <input onChange={(e)=>setToken(e.target.value)} type="text"  id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Mã xác thực ... " required=""/>
                      
                  </div>
                  <button type="submit" class="w-full text-white bg-blue-400 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer">Xác nhận</button>
                  <Link to="/login" className='text-md font-light text-gray-500  hover:text-black'> Quay lại trang đăng nhập</Link>
                  
              </form>
          </div>
      </div>
  </div>
        </section>
 
  )
}

export default Verify_Token
