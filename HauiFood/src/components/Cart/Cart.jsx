
import { div, p } from "framer-motion/client";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Modal from "../Product/ModalProduct/Modal";
import axios from "axios";
import useAuth from "../../Login_Logout/CustomHook";

// 🧾 Component giỏ hàng chính
const CartPage = () => {
  const {isLoggedIn}=useAuth();
  const navigate=useNavigate();
  const [cartItem, setCartItem] = useState([]);
  const [edit, setEdit] = useState(false);
  const [productSelected, setProductSelected] = useState(null);
  const [cartIndex,setCartIndex]=useState(null);
  const [voucherId,setVoucherId]=useState("");
  const [giamgia,setGiamgia]=useState(null);
  const [id,setId]=useState(null);

  console.log({voucherId});
  const handleVoucher=(e)=>{
    setVoucherId(e.target.value);
  }

const activeGiamGia = (totalAmount) => {
  if (!giamgia) {
    return {
      valid: false,
      totalAfterDiscount: totalAmount,
      discount: 0
    };
  }

  const minOrder = Number(giamgia.minOrder);
  const discountAmount = Number(giamgia.discount);

  return {
    valid: totalAmount >= minOrder,
    totalAfterDiscount: totalAmount >= minOrder ? totalAmount - discountAmount : totalAmount,
    discount: totalAmount >= minOrder ? discountAmount : 0
  };
};

console.log(giamgia);


  useEffect(() => {
    const giatri = JSON.parse(localStorage.getItem("cart"));
    if (giatri) {
      setCartItem(giatri);
    }
  }, []); 
  
//    console.log(cartItem)

   
//  console.log(edit)
//Cập nhật số lượng
const handleQuantityChange = (index, newQuantity) => {
  const updatedCart = [...cartItem];
  updatedCart[index].quantity = parseInt(newQuantity, 10) || 0; // đảm bảo là số và tối thiểu 1
  setCartItem(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  setTimeout(()=>{
    window.location.reload()
  },4000)
};
//Xóa sản phẩm trong giỏ hàng
const handleRemove = (indexToRemove) => {
  const Confirm=window.confirm("Bạn có muốn xóa sản phẩm này không??");
  if(Confirm){
    const updatedCart = cartItem.filter((_, index) => index !== indexToRemove);
     setCartItem(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
   
      window.location.reload();
    
    return;
  }
  
};
useEffect(() => {
  if (voucherId.trim() === "") {
    setGiamgia(null); // clear giảm giá nếu input trống
  }
}, [voucherId]);



//  let totalCart=0;
// Tính tổng tiền giỏ hàng
let totalCart = cartItem.reduce((total, item) => {
  const selectedToppings = item.product?.toppings?.filter(tp =>
    item.toppings?.includes(tp.toppingId)
  ) || [];
  const toppingTotal = selectedToppings.reduce((sum, tp) => sum + tp.price, 0);
  const totalPrice = item.quantity * (item.product?.priceSell + toppingTotal);
  return total + totalPrice;
}, 0);



const getVoucher = async () => {
  if (voucherId.trim() === "") {
    alert("Vui lòng nhập mã giảm giá.");
    return;
  }

  try {
    const res = await axios.get(`http://localhost:8080/api/v1/voucher?code=${voucherId}`);
    const data = res.data?.data;
    console.log(data);
    const totalAmount =totalCart;
    console.log({totalAmount})
    if (totalAmount < Number(data.minOrder)) {
      alert("Đơn hàng phải từ " + Number(data.minOrder).toLocaleString() + "đ mới áp dụng được mã này.");
      setGiamgia(null);
    } else {
      setGiamgia(data);
      setId(data.voucherId);
    }

  } catch (error) {
    alert(error.response?.data?.message);
    setGiamgia(null);
  }
};

console.log(id);

const { valid, totalAfterDiscount, discount } = activeGiamGia(totalCart);
// Nếu có giảm giá và đủ điều kiện thì áp dụng
// let tongDonHang = giamgia ? activeGiamGia(totalCart) : totalCart;

  return (
    <div className="p-1 w-[99vw] h-[100vh]">
      <Link to="/trang-chu" className="text-green-600 hover:text-red-500">⬅️Tiếp tục mua hàng</Link>
      <h2 className="text-2xl font-bold mb-6 text-center">🛒 Giỏ hàng của bạn</h2>
      
         <div className="flex justify-between items-start w-full p-2 ">
        {/* Phan 1 */}
        <div className="w-[80%]">
        {cartItem.length === 0 ? (
        <p>Chưa có sản phẩm nào trong giỏ hàng.</p>
      ) : (
        <>
          <div className="space-y-4 max-h-[580px] overflow-y-auto pr-2">
            <p>Có tất cả {cartItem.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm</p>

          {cartItem.length>0&&(  
            <div className="flex justify-around items-end border-b p-1  shadow-sm bg-teal-300"
              >
                <div>
                 Hình ảnh
                </div>
                <div className="w-[30%] text-center text-md">
                 
                   Sản phẩm                  
                                                                        
                </div>
                <div className="w-[15%]  rounded-md text-end me-2 ">
                  Số lượng
                </div>
                <div className="w-[20%] text-center  rounded">
                Thành tiền
                </div>
                <div className="w-[12%] text-end gap-x-1">             
               Hành động
                </div>
               
            </div>)
          }
            {cartItem.map((item, index) => {
              const selectedToppings = item.product?.toppings?.filter(tp =>
                item.toppings?.includes(tp.toppingId)
              ) || [];
              // console.log({selectedToppings})
              const toppingTotal = selectedToppings.reduce((sum, tp) => sum + tp.price, 0);
            
              const totalPrice = item.quantity * (item.product?.priceSell + toppingTotal);
             
              

           
          
              
              return(

              <div
                key={index}
                className="flex justify-between items-center border p-1 rounded shadow-sm bg-white"
              >
                <div>
                  <img className="w-30 h-20 rounded" src={item.product?.images?.[0]?.image_url||"https://ruousg.com/wp-content/uploads/2020/10/30.13-Chai-Ruou-ngoai-Rum.jpg"} alt="" />
                </div>
                <div className="w-[30%]">
                  <p style={{fontFamily:"sans-serif",fontWeight:"bold"}}>
                    {item.product?.name}
                    
                    </p>
                   {
                    selectedToppings.length>0&&(
                      selectedToppings.map((topping,index)=>(
                        <p key={index} className="text-sm text-gray-600">
                        {topping.name} (+{topping.price.toLocaleString()})
                         </p>
                      ))                    
                    )
                   }
                   
                    <p className="text-blue-400 text-sm cursor-pointer" onClick={()=>{
                      setEdit(!edit)
                      setProductSelected(item.product);
                      setCartIndex(index)
                    }}>
                      Thay đổi
                    </p>
                                                   
                  <p>Giá: {item.product?.priceSell?.toLocaleString()} đ</p>
                 
                </div>
                <div className="w-[10%]  rounded-md">
                  <input type="number" value={item.quantity}   onChange={(e) =>
                 handleQuantityChange(index, e.target.value)} className=" border-2 w-full rounded" />
                </div>
                <div className="w-[20%] text-center bg-blue-100 text-blue-500 py-2 text-lg rounded">
                {(totalPrice)?.toLocaleString()} đ
                </div>
                <div className="w-[10%] flex justify-around gap-x-1">
                 
                <button

                
                  className="  px-2 py-1 rounded bg-amber-100 hover:bg-amber-300 cursor-pointer"
                  onClick={() => handleRemove(index)}
                >
                  <i class="fa-solid fa-trash text-red-500 "></i>
                </button>
                </div>
               
              </div>
              )
            }
            )
          }
          
          
          </div>

        
        </>
      )}
        </div>
        {/* Phan 2 */}
        <div className=" ms-2 flex-1/2 p-2">
         
        <div className=" w-[80%] h-[200px] p-2 mx-auto border-2 border-black rounded my-2">
        <p className="text-lg font-bold text-center">Nhập mã voucher của bạn</p>
        <input onChange={handleVoucher} type="text" placeholder="Nhập mã giảm giá của bạn ... " className="py-2 rounded mt-2 w-[70%]" />
        <span>
          <button onClick={getVoucher} className="bg-blue-500 text-white p-2 rounded ms-2 cursor-pointer w-26">Áp dụng</button>
        </span>
       {/* <ul className="flex justify-start gap-x-2 mt-2  ms-2 mb-2 bg-white w-[85%] rounded">
        <li className="bg-teal-400 px-4 py-2 rounded">Mã 1</li>
        <li className="bg-teal-400 px-4 py-2 rounded">Mã 2</li>
        <li className="bg-teal-400 px-4 py-2 rounded">Mã 3</li>
       </ul> */}
        </div>
         
          <div className="border-2 border-black w-[80%] mx-auto px-5 text-[16px] py-3 rounded">
          
            <ul>
              <li className="flex justify-between px-2">
                <p>Tạm tính</p>
                <p>{totalCart.toLocaleString()} đ</p>
              </li>
              <li className="flex justify-between px-2">
                <p>Giảm giá</p>
                <p>
                {discount>0?(<p >-{discount.toLocaleString()} đ</p>):(<p>0 đ</p>)} 
                </p>
              </li>
              <li className="flex justify-between px-2">
                <p>Phí vận chuyển</p>
                <p>0 đ</p>
              </li>
            </ul>
            <hr/>
           <ul className="mt-3">
            <li className="flex justify-between px-2">
              <p className="text-xl font-bold">Tổng tiền</p>
              <p className="font-bold">
               {/* {totalCart.toLocaleString()}đ */}
               {/* {tongDonHang.toLocaleString()} đ */}
               {totalAfterDiscount.toLocaleString()}
              </p>
            </li>
           </ul>
          </div>



        <div className="border-2 border-none w-[60%] mx-auto  text-[20px]  rounded mt-2 ">
        <button onClick={()=>{
          if(isLoggedIn){
            navigate("/checkout",{state:{id,totalAfterDiscount,totalCart,discount,cartItem}})
          }else{
            const confirm=window.confirm("Đăng nhập để thực hiện thanh toán");
            if(confirm){
              navigate("/login");
            }else{
              return;
            }
           
          
          }
         } 
        }
           disabled={totalCart === 0}
           title={totalCart==0?"Giỏ hãng rỗng":"Thanh toán"}
           className={`w-full py-2 rounded text-white transition-colors 
           ${totalCart === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 cursor-pointer"}`}>Thanh toán</button>
        
        </div>

        </div>
      </div>
      {edit&&(
        <Modal isActive={edit} setIsActive={setEdit} show={productSelected} cartIndex={cartIndex}  />
        )}
    </div>
  );
};

export default CartPage;
