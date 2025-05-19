import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'


const ReviewForm = () => {
    const {id}=useParams();
    const navigate=useNavigate();
    const location=useLocation();
    const orderID = location.state?.orderID; 
    const userID=JSON.parse(localStorage.getItem("user"))?.userId;
  //  console.log({id,orderID})
    const [review,setReview]=useState({
        userId: userID,
        productId:Number(id),
        orderItemId:orderID,
        rating:null,
        comment:""
    })
    const handleChange =async (e) => {
        const { name, value } = e.target;
        setReview((prev) => ({
          ...prev,
          [name]: name === "rating" ? Number(value) : value,
        }));
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (!review.rating || !review.comment) {
          alert("Vui lòng đánh giá sao và nhập nhận xét!");
          return;
        }
        try{
            const res=await axios.post("http:///localhost:8080/api/v1/review/add",review);
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
    <>
   <div className='w-[30%] mx-auto mt-10'>
    <p className='font-bold text-center'>Đánh giá sản phẩm </p>
   </div>
    <div className='w-[30%] shadow-xl shadow-cyan-300 mx-auto mt-10 rounded p-3'>
     
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
                    <li className='w-[70%]  flex justify-between'>
                       <div>
                       <input type="radio" className='' name="rating" value="2"  onChange={handleChange}/>
                        <i class="fa-solid fa-star text-yellow-400 ms-2"></i>
                        <i class="fa-solid fa-star text-yellow-400 ms-2"></i>
                       </div>
                       <p className='text-end'>Tạm ổn</p>
                    </li>
                    <li className='w-[77%]  flex justify-between'>
                        <div>
                        <input type="radio" className='' name="rating" value="3"  onChange={handleChange}/>
                        <i class="fa-solid fa-star text-yellow-400 ms-2"></i>
                        <i class="fa-solid fa-star text-yellow-400 ms-2"></i>
                        <i class="fa-solid fa-star text-yellow-400 ms-2"></i>
                        </div>
                        <p className='text-end'>Chấp nhận</p>
                    </li>
                    <li className='w-[72%]  flex justify-between'>
                        <div>

                      
                        <input type="radio" className='' value="4" name="rating"  onChange={handleChange}/>
                        <i class="fa-solid fa-star text-yellow-400 ms-2"></i>
                        <i class="fa-solid fa-star text-yellow-400 ms-2"></i>
                        <i class="fa-solid fa-star text-yellow-400 ms-2"></i>
                        <i class="fa-solid fa-star text-yellow-400 ms-2"></i>
                        </div>
                        <p className='text-end'>Hài lòng</p>
                    </li>
                    <li className='w-[68.5%]  flex justify-between'>
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
                    <button className='bg-yellow-400 font-semibold px-2 py-1 rounded hover:text-white cursor-pointer'>Gửi đánh giá</button>
                </div>
            </form>
       
    <div className='ms-10 mt-3 bg-blue-400 w-[22%] text-center  rounded'>
    <button onClick={()=>navigate(`/detail-order/${userID}`)}  className='cursor-pointer px-1 py-1'>
    <i class="fa-solid fa-arrow-left me-2"></i>
        Quay lại
     </button>
    </div>
     
    </div>
    </>
  )
}

export default ReviewForm
