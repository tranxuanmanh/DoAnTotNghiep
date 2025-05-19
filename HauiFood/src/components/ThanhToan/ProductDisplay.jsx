import axios from "axios";
import React from "react";

const ProductDisplay = () => {
  const getLink = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/v1/payment/create?orderCode=483751&amount=20000");
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
      console.error("Lỗi khi tạo link thanh toán:", error);
      alert("Lỗi khi tạo link thanh toán");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Thanh toán đơn hàng</h1>
      <p>Sản phẩm: Mì tôm Hảo Hảo x2 + Coca Cola x1</p>
      <p>Tổng tiền: 14.000 VNĐ</p>
      <button className="bg-green-400 text-white p-3 rounded" onClick={getLink}>Thanh toán ngay</button>
    </div>
  );
};

export default ProductDisplay
