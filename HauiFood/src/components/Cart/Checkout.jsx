import React, { useEffect, useState } from "react";
import AddressSelector from "./Address";
import { Navigate, useLocation, useNavigate } from "react-router";
import axios from "axios";
import useAuth from "../../Login_Logout/CustomHook";
import Loading from "../../Admin/Component/Base/Loading";
import { toast, ToastContainer } from "react-toastify";


const Checkout = () => {
  const location = useLocation();
  const navigate=useNavigate();

  const [isCheckingLogin, setIsCheckingLogin] = useState(true);

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin") === "true";
    const user = localStorage.getItem("user");

    if (!isLogin || !user) {
      alert("Bạn cần đăng nhập để thanh toán!");
      navigate("/login");
    } else {
      setIsCheckingLogin(false); // xong kiểm tra thì cho render
    }
  }, [navigate]);

 
  let {id,totalAfterDiscount,totalCart,discount,cartItem } = location.state || {};
  // console.log(location)
 
  const orderItem = cartItem?.map(item => ({
    productId: item.productId,
    quantity: item.quantity,
    toppings: item.toppings,
  }));
  function generateOrderCode() {
    const timestamp = Date.now(); // Lấy thời gian hiện tại tính bằng mili giây
    const randomSuffix = Math.floor(Math.random() * 100); // Thêm một số ngẫu nhiên từ 0 đến 99
    const orderCode = parseInt(timestamp.toString().slice(-7) + randomSuffix.toString()); // Lấy 7 chữ số cuối từ thời gian
    return orderCode;
}
  const orderCode1=generateOrderCode();
  // console.log(orderItem)
  const [order, setOrder] = useState({
    userId: JSON.parse(localStorage.getItem("user"))?.userId, 
    orderCode:"DH"+orderCode1,
    fullName: "",
    phoneNumber: "",
    address: "",
    payMethod: "",
    payStatus:false,
    shippingMethod: "",
    deliveryTime:"",
    note: "",
    voucherId:id!=null?id:"",
    orderItems: orderItem||[], // phần này bạn có thể cập nhật khi thêm sản phẩm vào giỏ
  });
  console.log(order);


  const [deliveryOption,setDeliveryOption]=useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
     (name === "shippingMethod"&&value==="GIAOVAOLUC")?setDeliveryOption("GIAOVAOLUC"):setDeliveryOption("");
  
    if (name === "shippingMethod" && value !== "GIAOVAOLUC") {
      setOrder((prev) => ({
        ...prev,
        [name]: value,
        deliveryTime: null 
      }));
    } else {
      setOrder((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };


// let phiShip=0;
//  if (order.shippingMethod === "GIAOVAOLUC") {
//     phiShip+=10000;
//   } else if (order.shippingMethod === "GIAONGAY") {
//     phiShip+=15000;
//    } else if (order.shippingMethod === "DENLAY" || order.shippingMethod === "TUDENLAY") {
//      phiShip=0;
//   }

const shippingFees = {
  GIAONGAY: 15000,
  GIAOVAOLUC: 10000,
  TUDENLAY: 0,
  DENLAY: 0,
};

const phiShip = shippingFees[order.shippingMethod] || 0;





  const {getToken}=useAuth();
  const [loading,setLoading]=useState(false);
 
  //Với hình thức thanh toán là tiền mặt
  const addOrder=async()=>{
    const xacnhan=window.confirm("Xác nhận đặt đơn hàng này");
    if(!xacnhan){
      return;
    }
    setLoading(true);
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
    
    // alert("Cảm ơn bạn đã đặt hàng");
    setTimeout(()=>{
      navigate("/checkout/success",{state:{response}});
     //localStorage.removeItem("cart");
    },3000)
   
   
    }catch(error){
      setLoading(false);
      if (error.response) {
        console.error("Lỗi từ server:", error.response.data);
      } else if (error.request) {
        console.error("Không nhận được phản hồi:", error.request);
      } else {
        console.error("Lỗi khác:", error.message);
      }
    }
}


if (isCheckingLogin) {
  return (
    <div></div>
  );
}

//tổng tiền tính cả phí ship
const tongtien=totalAfterDiscount+phiShip;
//Gọi đến api mã qr chuyển khoản
const getLink = async () => {
  //tong tien sau khi giảm giá
  // const amount=Number(totalAfterDiscount);
  // //Thêm phí ship
  // const tongtien=amount+PhiShip;
  const xacnhan=window.confirm("Xác nhận đặt đơn hàng này");
    if(!xacnhan){
      return;
    }
    setLoading(true);
  try {

    const response = await axios.post(`http://localhost:8080/api/v1/payment/create?orderCode=${orderCode1}&amount=${tongtien}`);
      const ketqua=response.data;
  
     if (ketqua.checkoutUrl) {
      setTimeout(() => {
          window.location.href =ketqua.checkoutUrl;
      }, 2000);
        // 👈 Redirect đến PayOS
  } else {
       alert("Không lấy được link thanh toán!!Vui long thu lai");
     }
    

  } catch (error) {
    setLoading(false);
    console.error("Lỗi khi tạo link thanh toán:", error);
    alert("Lỗi khi tạo link thanh toán");
  }
};

//Phương thức thực hiện thanh toán
const handleSubmit=(e)=>{
  e.preventDefault();
   const { fullName, phoneNumber, address, shippingMethod, payMethod } = order;

  // Kiểm tra rỗng
  if (!fullName || !phoneNumber || !address) {
    toast.warning("Vui lòng nhập đầy đủ thông tin đơn hàng!",{autoClose:1000});
    return;
  }else if(!shippingMethod){
     toast.warning("Vui lòng chọn hình thức giao hàng",{autoClose:1000});
     return;
  }else if(!payMethod){
    toast.warning("Vui lòng chọn hình thức thanh toán",{autoClose:1000});
      return;
    
  }
  if(totalAfterDiscount>0){
  if(order.payMethod=="TIENMAT"){
    console.log("Thanh toan bang tien mat");
    //Thanh toán = tiền mặt thì gọi hàm này
    addOrder();
    console.log(order);
  }
  else if(order.payMethod=="CHUYENKHOAN"){
    console.log("Chuyển khoản");
    localStorage.setItem("order",JSON.stringify(order));
    //Thanh toán = chuyển khoản thì gọi hàm reder ra link
    getLink();
  //  navigate("/status-payment")
  }
}else{
  alert("Số tiền thanh toán phải lớn hơn 0");
  return;
}
}

  return (
   
    
    <div className="w-[99vw] h-full-xl p-2 mt-2">
      <ToastContainer/>
      {loading&&(
     <div className="fixed inset-0 bg-white/60 z-100 flex justify-center items-center">
     <Loading />
   </div>
   )}
      <h2 className="text-2xl font-bold mb-6 text-center text-red-500">
        Thanh toán đơn hàng
      </h2>
      <div className="flex justify-between items-start w-full p-2">
        {/* Phan 1 */}
        <div className="w-[70%]">
          <div className="space-y-4  ">
            <div className="border p-5 rounded border-gray-200 text-black ">
              <form class="w-[80%] mx-auto " onSubmit={handleSubmit}>
                <p className="my-2 text-center text-lg font-bold">
                  Nhập thông tin người nhận hàng
                </p>
                <div class="relative z-0 w-full mb-5 group">
                  <p>Họ và tên</p>
                  <input
                    name="fullName"
                    onChange={handleChange}
                    value={order.fullName}
                    type="text"
                    placeholder=" Ví dụ: Nguyễn Văn A"
                    className="border w-[95%] rounded"
                    required
                  />
                </div>
                <div class="relative z-0 w-full mb-5 group">
                  <p>Số điện thoại</p>
                  <input
                    name="phoneNumber"
                    onChange={handleChange}
                    type="text"
                    placeholder=" Ví dụ: 0972685517"
                    className="border w-[95%] rounded"
                    required
                  />
                </div>
                <div class="relative z-0 w-full mb-5 group">
                  <p>Địa chỉ</p>
                  <AddressSelector></AddressSelector>
                  <input
                    name="address"
                    onChange={handleChange}
                    type="text"
                    placeholder=" Nhập tên đường, ngõ, số nhà"
                    className="border w-[95%] rounded"
                    required
                  />
                </div>

                <div class="relative z-0 w-full mb-5 group">
                  <p>Note(Ghi chú)</p>
                  <textarea
                    name="note"
                    onChange={handleChange}
                    type="text"
                    placeholder=" Ví dụ: Vận chuyển lúc 6h chiều"
                    className="border w-[95%] rounded"

                  />
                </div>

                <div>
                  <div class="relative z-0 w-full mb-10 border rounded h-22 py-2">
                    <p className="text-center font-bold ">
                      Hình thức giao hàng
                    </p>
                    <div className="mt-2 flex justify-around">
                      <div>
                        Giao ngay (+15.000 đ)
                        <input
                        className="ms-2"
                          type="radio"
                          name="shippingMethod"
                          value="GIAONGAY"
                         
                          onChange={handleChange}
                        />
                      </div>
                      <div className="relative ">
                        Giao vào lúc (+10.000 đ)
                        <input
                        className="ms-2"
                          type="radio"
                          name="shippingMethod"
                          value="GIAOVAOLUC"
                        
                          onChange={handleChange}
                        />
                        {deliveryOption=="GIAOVAOLUC" && (
                          <div className="absolute top-[30px] left-[-50px]">
                            <input value={order.deliveryTime} type="datetime-local" name="deliveryTime" onChange={handleChange} className="rounded" />
                          </div>
                        )}
                      </div>
                      <div>
                        Tự đến lấy (0 đ)
                        <input
                        className="ms-2"
                          type="radio"
                          name="shippingMethod"
                          value="DENLAY"
                        
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div class="relative z-0 w-full mb-5 border rounded h-22 py-0 px-5 ">
                    <p className="text-center font-bold ">
                     Chọn hình thức thanh toán
                    </p>
                    <div className="mt-2 flex flex-col  justify-start">
                      <div>
                        - Chuyển khoản (Thanh toán bằng mã QR)
                        <input
                          className="ms-2"
                          name="payMethod"
                         
                          type="radio"
                          onChange={handleChange}
                          value="CHUYENKHOAN"
                          
                        />
                      </div>
                      <div className="relative ">
                        - Thanh toán khi nhận hàng(COD)
                        <input
                          name="payMethod"
                          type="radio"
                          className="ms-17"
                          onChange={handleChange}
                          value="TIENMAT"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <p>Hỗ trợ chuyển khoản 1 số ngân hàng</p>
                    <ol type="A">
                      <li>- Vietcombank</li>
                      <li>- Techcombank</li>
                      <li>- Mbbank</li>
                    </ol>
                  </div>
                </div>

                <button  className="w-full bg-red-500 py-2 rounded text-white cursor-pointer hover:bg-red-600">
                  Đặt hàng ngay
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* Phan 2 */}
        <div className=" ms-2 flex-1/2 p-2">
          <div className=" w-[80%] h-auto p-2 mx-auto border-2 border-gray-200 rounded my-2 bg-gradient-to-l to-blue-300 from-green-200">
            <p className="text-lg font-bold text-center">
             Tóm tắt đơn hàng
            </p>
                        <ul>
                          {cartItem?.length>0&&(
                            cartItem?.map((item,index)=>{
                              const selectedToppings = item.product?.toppings?.filter(tp =>
                                item.toppings?.includes(tp.toppingId)
                              ) || [];
                              // console.log({selectedToppings})
                              const toppingTotal = selectedToppings.reduce((sum, tp) => sum + tp.price, 0);
                            
                              const totalPrice = item.quantity * (item.product?.priceSell + toppingTotal);

                              return(
                                <li key={index+1} className="flex justify-between  mx-5">
                                  <div>
                                  {item.quantity}x {item.product?.name}
                                
                                  {selectedToppings.map((a,b)=><p className="text-gray-600 text-sm">{a.name}(+ {a.price}đ)</p>)}
                                  </div>
                                  
                              
                              
                                <p>{totalPrice.toLocaleString()} đ</p>
                              </li>
                              )
                            }
                         
                            )
                          )}
                          
                        </ul>
        
          </div>

          <div className="border-2 border-gray-200 w-[80%] mx-auto px-5 text-[16px] py-3 rounded bg-gradient-to-l to-lime-200 from-green-200">
            <ul>
              <li className="flex justify-between px-2">
                <p>Tạm tính</p>
                <p>{totalCart?.toLocaleString()} đ</p>
              </li>
              <li className="flex justify-between px-2">
                <p>Giảm giá</p>
                <p>
                {discount>0?(<p >-{discount?.toLocaleString()} đ</p>):(<p>0 đ</p>)} 
                </p>
              </li>
              <li className="flex justify-between px-2">
                <p>Phí vận chuyển</p>
               <p>{phiShip.toLocaleString()} đ</p>
                {/* {order.shippingMethod=="GIAONGAY"?"12.000 đ":""}
                {order.shippingMethod=="GIAOVAOLUC"?"10.000 đ":""} */}
                {/* <p>{phiShip.toLocaleString()>0} đ</p> */}
              </li>
            </ul>
            <hr />
            <ul className="mt-3">
              <li className="flex justify-between px-2">
                <p className="text-xl font-bold">Tổng tiền</p>
                <p className="font-bold">{tongtien?.toLocaleString()} đ</p>
              </li>
            </ul>
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default Checkout;
