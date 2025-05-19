import axios from 'axios';
import React, { useState } from 'react'
import useAuth from '../../../Login_Logout/CustomHook';
import { toast, ToastContainer } from 'react-toastify';

const AddTopping = ({onClose}) => {
      const [topping,setTopping]=useState({
            name:"",
            price:null,
            status:null,
            toppingTag:""
        });
           const {getToken}=useAuth();
        const handleAdd=async(e)=>{
            e.preventDefault();
            console.log(topping);
              try{
             const kq=await axios.post(`http://localhost:8080/api/v1/topping`,topping
             ,{
                headers:{
                    Authorization:`Bearer ${getToken()}`
                }
            });
            if(kq.status==200){
                toast.success("Thêm mới thành công",{autoClose:2000});
               
                
                setTimeout(()=>{
                     onClose(false);
                    window.location.reload();
                },3000)
            }

        }catch(error){
            if(error.status==500){
                toast.error("Token khong hop le");
            }else{
            //console.log(error);
            toast.error("Đã xảy ra lỗi")
            }
        }
        }


        //console.log(topping)
  return (
    <>
       <div className="fixed inset-0 bg-white/5 bg-opacity-40 z-50 flex items-center  backdrop-blur-sm justify-center">
       <ToastContainer/>
      <div className="bg-white rounded-lg shadow-lg p-6 w-[500px] relative">
        <h2 className="text-xl font-bold mb-4">Thêm topping mới</h2>
       
        <form onSubmit={handleAdd}>
          {/* Ví dụ input */}
          <label htmlFor="" className='font-semibold'>Tên topping</label>
          <input onChange={(e)=>setTopping({...topping,name:e.target.value})} type="text" placeholder="Tên topping" className="w-full border p-2 mb-4 rounded" required/>
          <label htmlFor="" className='font-semibold'>Giá</label>
          <input onChange={(e)=>setTopping({...topping,price:e.target.value})} type="number" placeholder="Giá" className="w-full border p-2 mb-4 rounded" required/>
          <div className='mb-3'>
            <p className='mb-2'>Trạng thái</p>
           
           Bật <input type="radio"  name="status" value={true} onChange={() => setTopping({ ...topping, status: true })}/>
           <br/>
           Tắt <input type="radio"  name="status" value={false} onChange={() => setTopping({ ...topping, status: false })}/>
          </div>
           <label htmlFor="" className='font-semibold'>Tag</label>
          <input onChange={(e)=>setTopping({...topping,toppingTag:e.target.value})} type="text" placeholder="Tag " className="w-full border p-2 mb-4 rounded" required/>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Thêm</button>
       
         
       
        </form>
          <button title='Thoát' onClick={()=>onClose()} className='cursor-pointer   absolute top-[-7px] right-0 bg-yellow-300 font-semibold px-2 py-1 rounded-full'>X</button>
      </div>
    </div>
    </>
  )
}

export default AddTopping
