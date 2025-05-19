import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Product_Topping = ({setProduct,product,toppingLST}) => {
    const [topping,setTopping]=useState([]);

    const getAllTopping=async()=>{
        try {
            const response = await axios.get('http://localhost:8080/api/v1/topping');
            setTopping(response.data);

        } catch (error) {
            console.error('Error fetching topping data:', error);
        }
    }
    useEffect(()=>{
        getAllTopping();
    },[])
    console.log(topping);
    const [lstTopping,setToppingLst]=useState([]);
    console.log(lstTopping);

    useEffect(() => {
  if (toppingLST && Array.isArray(toppingLST)) {
    setToppingLst(toppingLST);
  }
}, [toppingLST]);
  return (
    <div>
      <ul class="w-[100%] h-[96%] overflow-y-scroll mt-2  text-sm font-medium text-gray-900 bg-green-100 border border-gray-200  ">
    <li class="w-full sticky top-0 z-10 border-b border-gray-200  bg-green-700 text-white font-bold">
        <div class="flex justify-between px-1 py-2">
            <p className='flex-1 text-start'>Chọn</p>
            <p  className='flex-2 text-start ml-3'>Tên topping</p>
            <p className='flex-1 text-start'>Tình trạng</p>
            <p  className='flex-1 text-center'>Giá</p>
        </div>
    </li>

    {topping.map((item,index)=>
        <li key={index} class="w-full border-b border-gray-200 ">
        <div class="flex items-center justify-between ps-3">
           <div className='flex-1 text-start'>
           <input 
           onChange={(e) => {
            if (e.target.checked) {
              setToppingLst([...lstTopping, item.toppingId]);
              setProduct({
                ...product,
                toppings:[...lstTopping,item.toppingId]
              })
              
            } else {
              setToppingLst(lstTopping.filter(id => id !== item.toppingId));
              setProduct({
                ...product,
                toppings:lstTopping.filter(id => id !== item.toppingId)
              })
            }
          }}
           type="checkbox"  checked={lstTopping.includes(item.toppingId)} value="" class="p-2.5 text-red-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500  focus:ring-2"/>
           </div>
            <p class="flex-2  py-2 px-2 text-sm font-medium text-gray-900 ">{item.name}</p>
            <p className='flex-1'>{item.status?"Có sẵn":"Hết"}</p>
            <p className='flex-1 text-center'>{item.price}</p>
        </div>
    </li>
    )}
    

</ul>
    </div>
  )
}

export default Product_Topping
