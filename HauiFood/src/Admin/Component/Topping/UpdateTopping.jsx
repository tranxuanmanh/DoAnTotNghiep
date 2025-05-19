
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import useAuth from '../../../Login_Logout/CustomHook';

const UpdateTopping = ({id,onClose}) => {

    const [topping,setTopping]=useState({
        name:"",
        price:null,
        status:null,
    });
    console.log(topping)
    const getToppingById=async()=>{
        const kq=await axios.get(`http://localhost:8080/api/v1/topping/${id}`);
        const dulieu=kq.data;
        setTopping(prev=>({
            ...prev,
            name:dulieu.name,
            price:dulieu.price,
            status:dulieu.status
        }));
    }

    useEffect(()=>{
        getToppingById()
    },[id])

    const {getToken}=useAuth();

    const handleUpdate=async(e)=>{
        e.preventDefault();
        try{
             const kq=await axios.put(`http://localhost:8080/api/v1/topping/${id}`,topping
             ,{
                headers:{
                    Authorization:`Bearer ${getToken()}`
                }
            });
            if(kq.status==200){
                toast.success("Cập nhật thành công",{autoClose:2000});
               
                
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

  return (
    <>
     <div className="fixed inset-0 bg-white/4 bg-opacity-40 z-50 flex items-center backdrop-blur-sm justify-center">
     <ToastContainer/>
      <div className="bg-white rounded-lg shadow-lg p-6 w-[500px] relative">
        <h2 className="text-xl font-bold mb-4">Cập nhật topping id: {id}</h2>
        {/* Nội dung cập nhật ở đây */}
        <form onSubmit={handleUpdate}>
          {/* Ví dụ input */}
          <label htmlFor="">Tên topping</label>
          <input value={topping?.name} onChange={(e)=>setTopping({...topping,name:e.target.value})} type="text" placeholder="Tên topping" className="w-full border p-2 mb-4 rounded" required/>
           <label htmlFor="">Giá bán</label>
          <input value={topping?.price} type="number" placeholder="Giá" min={0} className="w-full border p-2 mb-4 rounded" required/>
          <div className='mb-3'>
            <p className='mb-2'>Trạng thái</p>
           
           Bật <input type="radio" checked={topping.status==true} name="status" value={true} onChange={() => setTopping({ ...topping, status: true })}/>
           <br/>
           Tắt <input type="radio" checked={topping.status==false} name="status" value={false} onChange={() => setTopping({ ...topping, status: false })}/>
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Cập nhật</button>
        </form>
        <button title='Thoát' onClick={()=>onClose()} className='cursor-pointer   absolute top-[-7px] right-0 bg-yellow-300 font-semibold px-2 py-1 rounded-full'>X</button>
      </div>
    </div>
    </>
  )
}

export default UpdateTopping
