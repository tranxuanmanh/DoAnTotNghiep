import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import useAuth from '../../Login_Logout/CustomHook';
import axios from 'axios';

const StatusPayment = () => {
    const location = useLocation();
    const navigate=useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const order=JSON.parse(localStorage.getItem("order"));//Lấy đơn hàng lên
    const paymentStatus = queryParams.get("payment"); // sẽ là "fail" hoặc "success"
     const {getToken}=useAuth();
     
      //Thêm vào backend để đặt
      const addOrder=async()=>{
        try{
        const res=await axios.post("http://localhost:8080/api/v1/order/add",order,{
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`
            
          }
        }
      );
        console.log(res);
        const response=res.data;
        
         alert("Cảm ơn bạn đã đặt hàng");
         navigate("/checkout/success", { state: { response } });
        }catch(error){
          console.error("Lỗi :", error);
        }
        
    }

    useEffect(() => {
      if (paymentStatus === "fail") {
        alert("Thanh toán thất bại");
        navigate("/cart");
      } else if (paymentStatus === "success") {
        console.log("Payment successful:", order);
        order.payStatus = true;
        addOrder();
      }
    }, [paymentStatus]);
  return (
    <></>
    // <div>
    //   Trang thai thanh toan la {paymentStatus}
      
    // </div>
  )
}

export default StatusPayment
