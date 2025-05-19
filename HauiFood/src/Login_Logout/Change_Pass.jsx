import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import Loading from '../Admin/Component/Base/Loading'
import axios from 'axios'

const Change_Pass = () => {
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const [password,setPassword]=useState({
        oldPassword:"",
        newPassword:"",
        confirmPassword:""
    });
    const ChangePass=async ()=>{
        setLoading(true);
        try{
            await axios.put("http://localhost:8080/api/v1/user/change-password",password,
                {
                    headers:{
                    Authorization:localStorage.getItem("token").trim(),
                }}
            );
            toast.success("Đổi mật khẩu thành công", {autoClose: 2000});
            setLoading(false);
            setTimeout(()=>{
                navigate("/login");
            },3000)
        }catch(error){
            setLoading(false);
            toast.error(error.response.data.message, {autoClose: 2000});
        //    console.log(error.response.data.message);
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(password.oldPassword===""){
            toast.error("Vui lòng nhập mật khẩu cũ", {autoClose: 2000});
            return;
        }else if(password.newPassword===""){
            toast.error("Vui lòng nhập mật khẩu mới", {autoClose: 2000});
            return;
        }
        else if(password.confirmPassword===""){
            toast.error("Vui lòng xác nhận mật khẩu mới", {autoClose: 2000});
            return;
        }       
       ChangePass();
    }
  return (
    <div>
       <section
      style={{
        backgroundImage:`url('/bg.jpg')`,
        backgroundPosition:"center",
        backgroundSize:"cover",
    
    }}
       
       class="bg-gray-500 dark:bg-gray-900 w-full h-screen " >
  <div class="flex ms-38  items-center justify-start px-6 py-8 md:h-screen lg:py-0 mx-auto ">
      <ToastContainer></ToastContainer>
      {loading&&(
     <div className="fixed inset-0 bg-white/60 z-50 flex justify-center items-center">
     <Loading />
   </div>
   )}
      <div class="  rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 w-full bg-gradient-to-l from-red-400 to-red-500">
        <div className=' w-full  flex justify-center p-2'>
        {/* <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/> */}
        </div>
          
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8 w-[100%]">
              <h1 class="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white text-center">
                 Đổi mật khẩu mới
              </h1>
              <form class="space-y-4 md:space-y-6 " onSubmit={handleSubmit}>
                  <div>
                      <label for="oldpass" class="block mb-2 text-sm font-medium text-gray-900 ">Nhập mật khẩu cũ</label>
                      <input onChange={(e)=>setPassword({...password,oldPassword:e.target.value})} type="text"  id="oldpass" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Mật khẩu cũ ... " required=""/>
                  </div>
                  <div>
                      <label for="newpass" class="block mb-2 text-sm font-medium text-gray-900 ">Nhập mật khẩu mới</label>
                      <input onChange={(e)=>setPassword({...password,newPassword:e.target.value})} type="text"  id="newpass" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Mật khẩu mới ... " required=""/>
                  </div>
                  <div>
                      <label for="confirm" class="block mb-2 text-sm font-medium text-gray-900 ">Xác nhận mật khẩu mới</label>
                      <input onChange={(e)=>setPassword({...password,confirmPassword:e.target.value})} type="text"  id="confirm" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Xác nhận mật khẩu mới ... " required=""/>
                  </div>
                  <button type="submit" class="w-full text-white bg-blue-400 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer">Xác nhận</button>
                  <Link to="/login" className='text-md font-light text-white  hover:underline'> Quay lại trang đăng nhập</Link>
                  
              </form>
          </div>
      </div>
  </div>
        </section>
    </div>
  )
}

export default Change_Pass
