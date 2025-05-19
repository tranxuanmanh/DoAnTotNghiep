import axios from 'axios'
import React, { memo, useEffect ,useState} from 'react'

const Product_Detail = ({setShowDetails,idProduct}) => {
    const [dulieu,setDuLieu]=useState({})
    

    useEffect(()=>{
        const getProductDetail=async()=>{
            try{
            const response=await axios.get(`http://localhost:8080/api/v1/product/${idProduct}`)
            setDuLieu(response.data.data)  
          
            }catch(error){
               alert("Có lỗi khi lấy dữ liệu" +error)
            }
        }
            getProductDetail();
           
        
    },[idProduct])
    console.log(dulieu)


  

   
   


  return (
    <>
     <div className=" fixed inset-0 flex items-center justify-center bg-black/60 bg-opacity-20 z-100 ">
                <div className="bg-white p-5 rounded-lg shadow-lg  relative w-[45%] h-[90%] overflow-y-scroll">
                  <h2 className=" text-center font-bold text-cyan-500 text-xl">
                    Thông tin chi tiết
                  </h2>
                  <table className="mt-2 w-[80%]">
                    <tr style={{ fontSize: "16px" }} className=" h-12 ">
                      <th className="w-40">Tên sản phẩm</th>
                      <td className=" text-black">{dulieu?.name}</td>
                    </tr>
                    <tr style={{ fontSize: "16px" }} className=" h-12 ">
                      <th>Mô tả</th>
                      <td className=" text-black">
                       {dulieu?.description}
                      </td>
                    </tr>
                    <tr style={{ fontSize: "16px" }} className=" h-12 ">
                      <th>Số lượng còn</th>
                      <td className=" text-black">{dulieu?.quantity}</td>
                    </tr>
                    <tr style={{ fontSize: "16px" }} className=" h-12 ">
                      <th>Giá gốc</th>
                      <td className=" text-black">{dulieu?.price}</td>
                    </tr>
                    <tr style={{ fontSize: "16px" }} className=" h-12 ">
                      <th>Giảm</th>
                      <td className=" text-black">{dulieu?.priceDiscount} %</td>
                    </tr>



                    <tr style={{ fontSize: "16px" }} className=" h-12 ">
                      <th>Giá bán</th>
                      <td className=" text-black">{dulieu?.priceSell} </td>
                    </tr>
                    
                    <tr style={{ fontSize: "16px" }} className=" h-12 ">
                      <th>Tag</th>
                      <td className=" text-black">{dulieu?.tag}</td>
                    </tr>
                    <tr style={{ fontSize: "16px" }} className=" h-12 ">
                      <th>Tình trạng</th>
                      <td className=" text-black">
                        <p className={`${dulieu?.status? "bg-green-500":"bg-red-100 text-red-500"} font-semibold w-[40%] text-center rounded py-1 `}>
                          {dulieu?.status?"Đang bán":"Dừng bán"}
                        </p>
                      </td>
                    </tr>
                    <tr style={{ fontSize: "16px" }} className=" h-12 ">
                      <th>Số lượng đã bán</th>
                      <td className=" text-black">{dulieu?.sold_quantity}</td>
                    </tr>

                   
                    <tr style={{ fontSize: "16px" }} className=" h-12 ">
                      <th>Topping đi kèm</th>
                      <td className=" text-black">
                        <ul
                          className="text-green-500 flex flex-wrap gap-x-10"
                          style={{ listStyleType: "a" }}
                        >
                              {dulieu?.toppings?.length>0?(dulieu?.toppings?.map((item,index)=>(<li key={index}>{item.name} -  {item.price}</li>))):(<li>Khong co</li>)}  
                        </ul>
                      </td>
                    </tr>

                    <tr style={{ fontSize: "16px" }} className=" h-12 ">
                      <th>Ngày tạo</th>
                      <td className=" text-black">{dulieu.createAt}</td>
                    </tr>
                    <tr style={{ fontSize: "16px" }} className=" h-12 ">
                      <th>Ngày cập nhật</th>
                      <td className=" text-black">{dulieu.updateAt}</td>
                    </tr>
                  </table>

                  <button
                  title='Đóng'
                    className="text-2xl absolute top-[5px] left-[10px] text-red-600 font-bold hover:bg-blue-200 px-2 py-1 rounded-full "
                    onClick={() => setShowDetails({
                      ...setShowDetails,
                      showDetails:false
                    })}
                  >
                    X
                  </button>
                </div>
              </div>
    
    
    </>
  )
}

export default memo(Product_Detail)
