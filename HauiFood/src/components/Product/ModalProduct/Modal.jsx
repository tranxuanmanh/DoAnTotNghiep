

import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Modal = ({ isActive, setIsActive,show ,cartIndex}) => {
  console.log({show,cartIndex})
  const [isToppingOpen, setIsToppingOpen] = useState(false);

  const [cart, setCart] = useState([]); // Mảng giỏ hàng

  const getCart=()=>{
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }
  useEffect(() => {
    getCart()
  }, []);
  const [selectedToppings, setSelectedToppings] = useState([]);
 
  const [quantity, setQuantity] = useState(1);
  const handleToppingChange = (toppingId) => {
    setSelectedToppings(prev =>
      prev.includes(toppingId)
        ? prev.filter(id => id !== toppingId)
        : [...prev, toppingId]
    );
  };
 

  // const addToCart = (productId, quantity, selectedToppings, e) => {
  //   if (e) e.preventDefault();
  //   const sortedToppings = [...selectedToppings].sort((a, b) => a - b);
  
  //   if (cartIndex !== null && cartIndex !== undefined) {
  //     // 👉 Trường hợp cập nhật item cũ
  //     const updatedCart = [...cart];
  //     updatedCart[cartIndex] = {
  //       ...updatedCart[cartIndex],
  //       quantity,
  //       toppings: sortedToppings,
  //     };
  //     setCart(updatedCart);
  //     localStorage.setItem("cart", JSON.stringify(updatedCart));
     
     
  //     setIsActive(false);
  //   } else {
  //     // 👉 Thêm mới item
  //     const existingItemIndex = cart.findIndex(
  //       (item) =>
  //         item.productId === productId &&
  //         JSON.stringify(item.toppings) === JSON.stringify(sortedToppings)
  //     );
  
  //     let updatedCart;
  //     if (existingItemIndex !== -1) {
  //       updatedCart = [...cart];
  //       updatedCart[existingItemIndex].quantity += quantity;
       
  //       toast.success("Sản phẩm đã được thêm vào giỏ hàng!",{autoClose:1000});
        
  //     } else {
  //       const newItem = {
  //         productId,
  //         quantity,
  //         toppings: sortedToppings,
  //         product: show,
  //       };
  //       updatedCart = [...cart, newItem];
  //       toast.success("Sản phẩm đã được thêm vào giỏ hàng!", { autoClose: 1000 });


  //     setCart(updatedCart);
  //     localStorage.setItem("cart", JSON.stringify(updatedCart));
  //     console.log({updatedCart})
  //       // window.location.reload();
  //     }
  
  //     // setCart(updatedCart);
  //     // localStorage.setItem("cart", JSON.stringify(updatedCart));
  //     // console.log({updatedCart})
  //     // setIsActive(false);
  //   }
  // };
  

  const addToCart = (productId, quantity, selectedToppings) => {
  
  const sortedToppings = [...selectedToppings].sort((a, b) => a - b);

  const existingItemIndex = cart.findIndex((item) =>
      item.productId === productId &&JSON.stringify(item.toppings) === JSON.stringify(sortedToppings)
  );

  let updatedCart;

  if (existingItemIndex !== -1) {
    // ✅ Nếu sản phẩm đã tồn tại với cùng toppings
    updatedCart = [...cart];
    updatedCart[existingItemIndex].quantity += quantity; // hoặc: = quantity nếu muốn ghi đè
    toast.success("Sản phẩm đã được cập nhật trong giỏ hàng!", { autoClose: 1000 });
  } else {
    // ✅ Nếu là sản phẩm mới
    const newItem = {
      productId,
      quantity,
      toppings: sortedToppings,
      product: show,
    };
    updatedCart = [...cart, newItem];
    toast.success("Sản phẩm đã được thêm vào giỏ hàng!", { autoClose: 1000 });
  }

  setCart(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  //setIsActive(false);
};

  
  useEffect(()=>{
    console.log({cart})
  },[cart])
  return (
   
    <div
     
      style={{ fontFamily: "sans-serif" }} className={`fixed top-0 left-0 w-full h-auto flex items-center justify-center 
        bg-gray-100/40 z-[100] ${isActive ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setIsActive(false)}
    >
      <ToastContainer/>
      <div className="relative p-4 w-full max-w-2xl h-[110vh] " onClick={(e) => e.stopPropagation()} >
        
        <div className="relative bg-white rounded-lg shadow-sm overflow-y-scroll h-[90%]">
          {/* Header */}
          <div className="flex items-center justify-between p-3 md:p-3 border-b rounded-t border-gray-200 bg-red-400">
            <h3 className="text-lg font-semibold text-gray-900 ">Mua ngay </h3>
            <button
              type="button"
              className="text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => {
                // Ngăn chặn sự kiện click lan sang div cha
                 setIsActive(false);
              }}
            >
              X
            </button>
          </div>

          <form className="p-2 md:p-2" onSubmit={(e)=>{
             e.preventDefault();
            addToCart(show.product_id, quantity, selectedToppings)}}
            >
            {/* Ảnh sản phẩm */}
            <div>
              <img
                className="w-[90%] mx-auto h-70 object-cover rounded"
                src={show?.images?.[0]?.image_url}
                alt=""
              />
              <p  className="text-lg text-center font-bold">
                {show?.name}
              </p>
            </div>

            <div className="flex justify-between  mt-2 mx-5">
           <div>
            <p className="text-gray-400 line-through"> {show?.price?.toLocaleString()}</p>
            <p >Giá: {show?.priceSell?.toLocaleString()} đ </p>
            {show?.quantity>0?(<p>Còn: {show?.quantity} sản phẩm</p>):(<p className="font-bold text-red-400">Hết hàng</p>)} 
           </div>
              <div className="flex items-center">
              <div class="relative flex items-center max-w-[8rem]">
        
      
                </div>
                <p >Số lượng mua</p>
               
                <input
                  className="ml-3 w-20 border border-red-400 shadow-lg shadow-red-300 rounded p-1 font-bold outline-none"
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e)=>{
                    const value = Number(e.target.value);
                    if (value > show.quantity) {
                      alert(`Chỉ còn ${show.quantity} sản phẩm trong kho`);
                      return;
                    }
                    setQuantity(value);
                  }
                  }
                
                />
               
              </div>
             
            </div>

            {/* Accordion Topping */}
            {
              show?.toppings?.length>0?(
                <div className="mx-3 mt-2">
                <button
                  type="button"
                  className="flex items-center justify-between w-full p-2 font-medium text-gray-500 border border-black  hover:bg-red-100 gap-3"
                  onClick={() => setIsToppingOpen(!isToppingOpen)}
                >
                  <span className="font-bold text-black">Thêm topping</span>
                  <span className="font-bold">{isToppingOpen ? "-" : "+"}</span>
                </button>
                {isToppingOpen && (
                  <div className="p-2 border border-gray-300 rounded">
                   <table class="w-[100%] text-sm text-left  text-gray-500 ">
                       <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                         <tr>
                           <th scope="col" class="px-5 py-3">
                             Select
                           </th>
  
                           <th scope="col" class="px-5 py-3">
                             Name
                           </th>
                           <th scope="col" class="px-5 py-3">
                             Price
                           </th>
                           <th scope="col" class="px-6 py-3">
                            Trạng thái
                           </th>
                         </tr>
                       </thead>
                       <tbody>
                        {
                          show?.toppings?.length>0&&(
                            show?.toppings?.map((item,index)=>
                              <tr key={index} class="bg-white border-b border-gray-200">
                            <td class="px-5 py-4">
                              <input type="checkbox" className="rounded" 
                               checked={selectedToppings.includes(item.toppingId)}
                               onChange={() => handleToppingChange(item.toppingId)}
                              />
                            </td>
                            <td                         
                              class="px-6 py-4 font-medium text-gray-600  "
                            >
                              {item?.name}
                            </td>
                            <td class="px-6 py-4">{item?.price?.toLocaleString()} đ</td>
   
                            <td class="px-6 py-4">
                              {item.status?(<p className="text-green-400">Còn hàng</p>):(< p className="text-red-400">Hết hàng</p>)}
                            </td>
                          </tr>
                            )
                           
                          )
                        }
                        
                         
                        
                       </tbody>
                     </table>
                  </div>
                )}
                </div>
              ):("")
            }
           

            
            {/* Submit */}
           <div className="text-center">
           <button
              type="submit"
              className=" ml-3 my-3 text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Add to cart
            </button>
           </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
