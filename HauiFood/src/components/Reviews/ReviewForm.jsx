import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import useAuth from '../../Login_Logout/CustomHook';


const ReviewForm = () => {
    const {id}=useParams();
    const navigate=useNavigate();
    const location=useLocation();
    const {orderID,name,img} = location.state; 
    const userID=JSON.parse(localStorage.getItem("user"))?.userId;
  //  console.log({id,orderID})
    const [review,setReview]=useState({
        userId: userID,
        productId:Number(id),
        orderItemId:orderID,
        rating:null,
        comment:""
    })
    console.log(review)
    const handleChange =async (e) => {
        const { name, value } = e.target;
        setReview((prev) => ({
          ...prev,
          [name]: name === "rating" ? Number(value) : value,
        }));
      };

      const {getToken}=useAuth();
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (!review.rating || !review.comment) {
          alert("Vui lòng đánh giá sao và nhập nhận xét!");
          return;
        }
        try{
            const res=await axios.post("http:///localhost:8080/api/v1/review/add",review,{
                headers:{
                    Authorization:`Bearer ${getToken()}`
                }
            });
            alert("Cảm ơn bạn đã đánh giá sản phẩm này");
            navigate(`/detail-order/${userID}`)
            console.log(res);
        }catch(error){
            alert(error.response.data.message||"Bạn đã dánh giá sản phẩm này rồi");
            return;
        }
        console.log(review);
    }
  return ( 
    <div className='w-full min-h-screen bg-cover bg-center py-9' style={{backgroundImage:`URL('https://images.pexels.com/photos/15580730/pexels-photo-15580730/free-photo-of-mon-an-rau-xa-lach-kh-e-m-nh-th-m-ngon.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`}}>
  
    <div className='w-[40%] shadow-xl mx-auto  rounded p-3 bg-white py-2'>
         <div className='w-[100%] mx-auto mt-2 bg-white'>
             <p className='font-bold text-center text-xl border-b-2 py-2 '>Đánh giá sản phẩm </p>
         </div>
            <div className='mt-2 mb-2'>
                <p className='font-semibold'>{name} </p>
                <p>Mã sản phẩm: {id}</p>
                <img src={img} className='h-50 w-full object-cover rounded' alt="" />
            </div>
            <form onSubmit={handleSubmit}>
                
                <div className='mx-auto w-[80%]'>
                    <p className='font-semibold mb-1'>Mức độ hài lòng</p>
                  
                </div>
                <ul className='mx-auto w-[80%]'>
                    <li className='w-[60%]  flex justify-between'>
                        <div>
                        <input type="radio" className='' name="rating" value="1"  onChange={handleChange}/>
                        <i class="fa-solid fa-star text-yellow-400 ms-2"></i>
                        </div>
                        <p className='text-end'>Tệ</p>
                    </li>
                    <li className='w-[67%]  flex justify-between'>
                       <div>
                       <input type="radio" className='' name="rating" value="2"  onChange={handleChange}/>
                        <i class="fa-solid fa-star text-yellow-400 ms-2"></i>
                        <i class="fa-solid fa-star text-yellow-400 ms-2"></i>
                       </div>
                       <p className='text-end'>Tạm ổn</p>
                    </li>
                    <li className='w-[71.7%]  flex justify-between'>
                        <div>
                        <input type="radio" className='' name="rating" value="3"  onChange={handleChange}/>
                        <i class="fa-solid fa-star text-yellow-400 ms-2"></i>
                        <i class="fa-solid fa-star text-yellow-400 ms-2"></i>
                        <i class="fa-solid fa-star text-yellow-400 ms-2"></i>
                        </div>
                        <p className='text-end'>Chấp nhận</p>
                    </li>
                    <li className='w-[68.5%]  flex justify-between'>
                        <div>

                      
                        <input type="radio" className='' value="4" name="rating"  onChange={handleChange}/>
                        <i class="fa-solid fa-star text-yellow-400 ms-2"></i>
                        <i class="fa-solid fa-star text-yellow-400 ms-2"></i>
                        <i class="fa-solid fa-star text-yellow-400 ms-2"></i>
                        <i class="fa-solid fa-star text-yellow-400 ms-2"></i>
                        </div>
                        <p className='text-end'>Hài lòng</p>
                    </li>
                    <li className='w-[66.5%]  flex justify-between'>
                        <div>                    
                        <input type="radio" className='' value="5" name="rating" onChange={handleChange}/>
                        <i class="fa-solid fa-star text-yellow-400 ms-2"></i>
                        <i class="fa-solid fa-star text-yellow-400 ms-2"></i>
                        <i class="fa-solid fa-star text-yellow-400 ms-2"></i>
                        <i class="fa-solid fa-star text-yellow-400 ms-2"></i>
                        <i class="fa-solid fa-star text-yellow-400 ms-2"></i>
                        </div>
                        <p className='text-end'>Rất tốt</p>
                    </li>
                </ul>
                <div className='mx-auto w-[80%] mt-3 mb-2'>
                    <p>Nhập nhận xét của bạn </p>
                    <textarea placeholder='Nhập đánh giá của bạn' name="comment" className='w-full mt-2'  onChange={handleChange}/>
                </div>
                <div className='mx-auto w-[80%]'>
                    <button className='bg-yellow-400 font-semibold px-2 py-1 rounded hover:text-white cursor-pointer'>Gửi đánh giá

                         <i class="ms-2 fa-solid fa-arrow-right me-2"></i>
                    </button>
               
                </div>
            </form>
       
    <div className='ms-16 mt-3 bg-blue-400 w-[22%] text-center  rounded'>
    <button onClick={()=>navigate(`/detail-order/${userID}`)}  className='cursor-pointer  py-1 font-semibold text-white'>
    <i class="fa-solid fa-arrow-left me-2"></i>
        Quay lại
     </button>
    </div>
     
    </div>
    </div>
  )
}

export default ReviewForm
