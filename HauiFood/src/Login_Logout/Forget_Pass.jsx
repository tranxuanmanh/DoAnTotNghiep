import axios from 'axios';
import { param } from 'framer-motion/client';
import React, { useState } from 'react'
import { Link } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import Loading from '../Admin/Component/Base/Loading';

const Forget_Pass = () => {
    const [user,setUser]=useState({
        email:"",
    })
    const [error, setError] = useState({
        emailError: "",
    });
    // console.log(user);
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
    const [loading,setLoading]=useState(false);
    const getPassword=async ()=>{
        setLoading(true); 
        try{
        const response=await axios.post("http://localhost:8080/api/v1/user/forget-password?email="+user.email);
        toast.success("Vui lòng kiểm tra email để lấy lại mật khẩu", {autoClose: 2000});
        setLoading(false);
        console.log(response);
        }
        catch(error){
           setLoading(false);
           toast.error(error.response.data.message,{autoClose: 2000});
        }
    }

    const handleSubmit=async (e)=>{
        let hasError=false;
        e.preventDefault();
        if(user.email===""){
            toast.error("Vui lòng nhập email đăng kí tài khoản", {autoClose: 2000});
            setError({
                ...error,
                emailError:"Vui lòng nhập email đăng kí tài khoản",
            });
            
            hasError=true;
            return;
        }else{
            if(!isValidEmail(user.email)){
                toast.error("Email không hợp lệ", {autoClose: 2000});
                setError({
                    ...error,
                    emailError:"Email không hợp lệ",
                });
                hasError=true;
                return;
            }else{
                setError({
                    ...error,
                    emailError:"",
                });
                hasError=false;
                getPassword();

            }
        }
    
    }
  return (
    

      <section class="bg-gray-50 dark:bg-gray-900 w-full h-screen " 
        style={{
        backgroundImage:`url(bg.jpg)`,
        backgroundPosition:"center",
        backgroundSize:"cover",
    
    }}>
  <div class="flex  items-center justify-start px-6 py-8 md:h-screen lg:py-0 mx-auto">
      <ToastContainer></ToastContainer>
      {loading&&(
     <div className="fixed inset-0 bg-white/60 z-50 flex justify-center items-center">
     <Loading />
   </div>
   )}
      <div class=" ms-20 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 w-full bg-gradient-to-l from-red-300 to-red-500">
        <div className=' w-full  flex justify-center p-2'>
        <img class="w-26 h-24 mr-2 mb-[-25px]" src="../public/HauiFood1.png" alt="logo"/>
        </div>
          
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8 w-[100%]">
              <h1 class="text-xl font-bold leading-tight tracking-tight  md:text-2xl  text-center">
                 Lấy lại mật khẩu đăng nhập
              </h1>
              <form class="space-y-4 md:space-y-6 " onSubmit={handleSubmit}>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Nhập email đăng kí tài khoản</label>
                      <input onChange={(e)=>setUser({...user,email:e.target.value})} type="text"  id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Email đăng kí ... " required=""/>
                       {error.emailError && <p className="text-red-500 text-sm mt-1">{error.emailError}</p>}
                  </div>
                  <button type="submit" class="w-full text-white bg-blue-400 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer">Xác nhận</button>
                  <Link to="/login" className='text-md  text-blue-800  hover:text-black'> Quay lại trang đăng nhập</Link>
                 <p></p>
                  <Link to="/verify-token" className='text-md  text-blue-800   hover:text-black'> Quay lại xác thực</Link>
              </form>
          </div>
      </div>
  </div>
        </section>
    
    
  )
}

export default Forget_Pass
