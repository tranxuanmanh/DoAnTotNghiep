import Password from 'antd/es/input/Password'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import {toast, ToastContainer } from 'react-toastify'
import useAuth from './CustomHook'

const Login = () => {
    const navigate=useNavigate();
    const {login}=useAuth();
  const [user,setUser]=useState({
    username:"",
    password:""
  })
  const [error, setError] = useState({
    username: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  // localStorage.setItem("isLogin",false);
  const loginApp=async()=>{
    try{
    const response=await axios.post("http://localhost:8080/api/v1/user/login",user);
    toast.success("Đăng nhập thành công",{autoClose:2000})
    console.log(response.data.data);
    // localStorage.setItem("isLogin",true);
    login();
    localStorage.setItem("token",response.data.data.token);
    localStorage.setItem("user",
        JSON.stringify({
        userId:response.data.data.userId,
        fullname:response.data.data.fullName,    
        email:response.data.data.email,
        phone:response.data.data.phone,
        role:response.data.data.roles.role_id,
    }
   
    ));

    setTimeout(()=>{
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            toast.error("Đăng nhập thất bại", {autoClose: 2000});
            return;
        }
        if(user.role===1){
            navigate("/admin/home");
        }
        else if(user.role===2){
            navigate("/trang-chu");
        }
        
    },3000)
    }catch(error){
        if(error.response.data.code===400){
            let errorMessage=String(error.response.data.message);
            if(errorMessage.endsWith("Bad credentials")){
                toast.error("Tên đăng nhập hoặc mật khẩu không đúng", {autoClose: 2000});
            }else{
                toast.error(error.response.data.message, {autoClose: 2000});
            }
       
    }
}
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    var hasError=false;
    const newError={
        username: "",
        password: ""
    }
    if(!user.username.trim()){
        newError.username="Tên đăng nhập không được để trống"
        hasError=true;
    }
    if(!user.password.trim()){
        newError.password="Mật khẩu không được để trống"
        hasError=true;
    }
    setError(newError);

    if(hasError){   
        toast.error("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu", {autoClose: 2000});
        return;
    }
    
      loginApp();
  }
  console.log(user);


  return (
    <div id="login">
      <section class="bg-gray-50 dark:bg-gray-900 w-full h-screen " 
        style={{
        backgroundImage:`url('/bg.jpg')`,
        backgroundPosition:"center",
        backgroundSize:"cover",
    
    }}>
  <div class="flex ms-38  items-center justify-start px-6 py-8 md:h-screen lg:py-0 mx-auto">
      <ToastContainer/>
      <div class="  rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 w-full bg-gradient-to-l from-red-400 to-red-400">
        <div className=' w-full  flex justify-center p-y-1 mb-[-30px]'>
        <img class="w-28 h-26 mr-2  rounded" src="../public/iconDoAn.png" alt="logo"/>
        </div>
          
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8 w-[100%] ">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-center  md:text-2xl ">
                 Đăng nhập
              </h1>
              <form class="space-y-4 md:space-y-6 " onSubmit={handleSubmit}>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Tên đăng nhập</label>
                      <input onChange={(e)=>setUser({...user,username:e.target.value.trim()})} type="text"  id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Tên đăng nhập" required=""/>
                      {error.username && <p className="text-red-500 text-sm mt-1">{error.username}</p>}
                  </div>
                  <div className='relative'>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Mật khẩu</label>
                      <input onChange={(e)=>setUser({...user,password:e.target.value.trim()})} type={`${showPassword==true?"text":"password"}`}  id="password" class=" bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Mật khẩu" required=""/>
                    <i onClick={()=>setShowPassword(!showPassword)} className={`cursor-pointer  absolute top-11 right-6.5  fa-solid ${showPassword==true?"fa-eye":"fa-eye-slash"}`}></i>
                    {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 " required=""/>
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="remember" class="text-gray-700 ">Remember me</label>
                          </div>
                      </div>
                      <Link to="/forget-pass" class="text-sm font-medium text-primary-600 hover:underline ">Quên mật khẩu?</Link>
                  </div>
                  <button type="submit" class="w-full text-white bg-blue-400 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer">Đăng nhập</button>
                  <p class="text-sm font-light text-gray-700 dark:text-gray-400">
                      Bạn chưa có tài khoản? <Link to="/signUp" class="font-medium text-primary-600 underline text-white">Đăng kí</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
      </section>
    </div>
  )
}

export default Login
