import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import Loading from '../Admin/Component/Base/Loading'

const SignUp = () => {
    const [user,setUser]=useState({
        fullName:"",
        username:"",
        password:"",
        email:"",
        phone:"",
        role:"ROLE_CLIENT"
    })
    const [error, setError] = useState({
        fullName:"",
        username: "",
        password: "",
        email:"",
        phone:""
      });
    console.log(user);
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const singup=async()=>{
        setLoading(true);
        try{
            await axios.post("http://localhost:8080/api/v1/user/register",user);
            toast.success("Đăng kí tài khoản thành công", {autoClose: 2000});
            setLoading(false);
            setTimeout(()=>{
                navigate("/verify-token");
            },3000)
           
            // console.log(res.data);
        }catch(error){
           // console.log(error);
            if(error.response.data.code===500||error.response.data.code===400){
                toast.error(error.response.data.message, {autoClose: 2000});
                setLoading(false);
            }
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        var hasError=false;
        let newError = {
            fullName: "",
            username: "",
            password: "",
            email: "",
            phone: ""
        };
    
        if (user.fullName.trim() === "") {
            newError.fullName = "Không được để trống trường này";
            hasError = true;
        }
    
        if (user.username.trim() === "") {
            newError.username = "Không được để trống trường này";
            hasError = true;
        }
        if (user.username.length < 5) {
            newError.username = "Nhập ít nhất 5 kí tự";
            hasError = true;
        }
    
        if (user.password.trim() === "") {
            newError.password = "Không được để trống trường này";
            hasError = true;
        }
    
        if (user.email.trim() === "") {
            newError.email = "Không được để trống trường này";
            hasError = true;
        }
        if (!isValidEmail(user.email)) {
            newError.email = "Email không hợp lệ";
            hasError = true;
        }
    
        if (user.phone.trim() === "") {
            newError.phone = "Không được để trống trường này";
            hasError = true;
        }
        if (user.phone.length <10 || user.phone.length >11) {
            newError.phone = "Số điện thoại không hợp lệ";
            hasError = true;
        }
    
        setError(newError);
        if(hasError){   
            toast.error("Vui lòng nhập đầy đủ các trường", {autoClose: 2000});
            return;
        }else{
            console.log("Thanh cong");
            singup();
        }
    }
  return (
    <section class="bg-gray-50 dark:bg-gray-900 w-full h-full-xl " 
    style={{
    backgroundImage:`url(bg.jpg)`,
    backgroundPosition:"center",
    backgroundSize:"cover",

}}>
<div class="flex items-center justify-start px-6 py-4 md:h-screen lg:py-0 mx-auto">
  <ToastContainer></ToastContainer>
  {loading&&(
     <div className="fixed inset-0 bg-white/60 z-50 flex justify-center items-center">
     <Loading />
   </div>
   )}
  <div class=" ms-34 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 w-full bg-gradient-to-l from-red-400 to-red-500">
    <div className=' w-full  flex justify-center p-2'>
    <img class="mb-[-40px] mr-2 w-26 h-22" src="../public/HauiFood1.png" alt="logo"/>
    </div>
      
      <div class="p-6 space-y-2 md:space-y-6 sm:p-8 w-[100%]">
          <h1 class="text-xl text-center font-bold leading-tight tracking-tight  md:text-2xl text-white">
             Đăng kí tài khoản
          </h1>
          <form class="space-y-3 md:space-y-4 " onSubmit={handleSubmit}>
              <div>
                  <label for="fullname" class="block mb-2 text-sm font-medium text-gray-900 ">Nhập họ tên</label>
                  <input onChange={(e)=>setUser({...user,fullName:e.target.value})}  type="text"  id="fullname" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 " placeholder="Nhập đầy đủ họ tên" required=""/>
                   {error.fullName && <p className="text-red-500 text-sm mt-1">{error.fullName}</p>} 
              </div>
              <div>
                  <label for="username" class="block mb-2 text-sm font-medium text-gray-900 ">Tên đăng nhập</label>
                  <input onChange={(e)=>setUser({...user,username:e.target.value})}  type="text"  id="username" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 " placeholder="Nhập tên đăng nhập" required=""/>
                  {error.username && <p className="text-red-500 text-sm mt-1">{error.username}</p>} 
              </div>
              <div>
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                  <input onChange={(e)=>setUser({...user,password:e.target.value})}  type="text"  id="password" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 " placeholder="Nhập mật khẩu" required=""/>
                 {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
              </div>
              <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Nhập email</label>
                  <input onChange={(e)=>setUser({...user,email:e.target.value})}  type="email"  id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 " placeholder="Nhập email của bạn" required=""/>
                   {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>} 
              </div>
              <div>
                  <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 ">Nhập số điện thoại</label>
                  <input onChange={(e)=>setUser({...user,phone:e.target.value})}  type="text" min={10} max={11}  id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 " placeholder="Nhập số điện thoại của bạn" required=""/>
                   {error.phone && <p className="text-red-500 text-sm mt-1">{error.phone}</p>} 
              </div>
              <button type="submit" class="w-full text-white bg-blue-400 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer">Đăng Ký</button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
             <Link to="/login" class="font-medium text-primary-600 underline text-white">Quay lại đăng nhập</Link>
              </p>
          </form>
      </div>
  </div>
</div>
  </section>
  )
}

export default SignUp
