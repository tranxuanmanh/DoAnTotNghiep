import "./App.css";
import ImageSlider from "./components/ImageSlider";
import Header from "./components/Header";
import Product from "./components/Product";
import HomeAdmin from "./Admin";
import { Route, Routes } from "react-router";
import Admin1 from "./Admin/Component/Home/IndexHome";
import IndexOrder from "./Admin/Component/Order/IndexOrder";
import IndexProduct from "./Admin/Component/Product/IndexProduct";
import IndexUser from "./Admin/Component/User/IndexUser";
import IndexSale from "./Admin/Component/Sale/IndexSale";
import IndexCategory from "./Admin/Component/Category/IndexCategory";
import Addproduct from "./Admin/Component/Product/Addproduct";
import Product_Statistical from "./Admin/Component/Product/Product_Statistical";
import Product_Category from "./Admin/Component/Product/Product_Category";
import Product_Update from "./Admin/Component/Product/Product_Update";
import AddCategory from "./Admin/Component/Category/AddCategory";
import UpdateCategory from "./Admin/Component/Category/UpdateCategory";
import Login from "./Login_Logout/Login";
import Logout from "./Login_Logout/Logout";
import Forget_Pass from "./Login_Logout/Forget_Pass";
import SignUp from "./Login_Logout/SignUp";
import Verify_Token from "./Login_Logout/Verify_Token";
import Change_Pass from "./Login_Logout/Change_Pass";
import CartPage from "./components/Cart/Cart";
import Checkout from "./components/Cart/Checkout";
import DetailOrder from "./Admin/Component/Order/DetailOrder";
import NewOrder from "./Admin/Component/Order/NewOrder";
import AddressSelector from "./components/Cart/Address";
import LastOrder from "./components/Cart/LastOrder";
import DetailUser from "./Login_Logout/DetailUser";
import Voucher from "./components/Voucher/Voucher";
import DetailOrderUserID from "./Login_Logout/DetailOrderUserId";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import useAuth from "./Login_Logout/CustomHook";
import ReviewForm from "./components/Reviews/ReviewForm";

import DanhMucIndex from "./components/DanhMucSanPham/DanhMucIndex";
import SearchProductByName from "./components/DanhMucSanPham/SearchProductByName";
import ProductDetail from "./components/ChiTietSanPham/ProductDetail";
import TinTucIndex from "./components/TinTuc/TinTucIndex";
import TinTucDetail from "./components/TinTuc/TinTucDetail";
import RequirementAdmin from "./Admin/Component/Base/RequirementAdmin";
import ProductDisplay from "./components/ThanhToan/ProductDisplay";
import StatusPayment from "./components/ThanhToan/StatusPayment";
import IndexTopping from "./Admin/Component/Topping/IndexTopping";
import IndexTinTuc from "./Admin/Component/TinTuc/IndexTinTuc";
import AddTinTuc from "./Admin/Component/TinTuc/AddTinTuc";
import XemChiTietTinTuc from "./Admin/Component/TinTuc/XemChiTietTinTuc";
import CapNhatTinTuc from "./Admin/Component/TinTuc/CapNhatTinTuc";
import NhanVienIndex from "./Admin/Component/NhanVien/NhanVienIndex";
import IndexDanhGia from "./Admin/Component/DanhGia/indexDanhGia";


function App() {
  //Kiểm tra token xem hết hạn chưa
  const {logout}=useAuth();
  const isTokenExpired = (token) => {
    if (!token) return true;
  
    try {
      const payloadBase64 = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payloadBase64)); // decode base64
      const currentTime = Math.floor(Date.now() / 1000); // thời gian hiện tại tính bằng giây
  
      return decodedPayload.exp < currentTime; // true nếu đã hết hạn
    } catch (error) {
      console.error("Token không hợp lệ:", error);
      return true; // nếu lỗi thì coi như hết hạn luôn
    }
  };


    useEffect(() => {
      const interval = setInterval(() => {
        const token = String(localStorage.getItem("token"));
        console.log(token);
        if (isTokenExpired(token)) {
          toast.error("Phiên đăng nhập đã hết hạn!",{autoClose:2000});
          setTimeout(()=>{
          logout();
          window.location.href = "/logout";
          },3000)
         
        }
      }, 10 * 60 * 1000); // 30 phút
    
      return () => clearInterval(interval);
    }, []);
  
  return (
    <>
    <ToastContainer/>
<Routes>
  <Route path="/" element={<Header/>}>
    <Route index element={<Product />} /> {/* Tương ứng path="/" */}
    <Route path="trang-chu" element={<Product />} />
    <Route path="cart" element={<CartPage/>}/>
    <Route path="voucher" element={<Voucher/>}/>
    <Route path="checkout" element={<Checkout/>}/>
    <Route path="checkout/success" element={<LastOrder/>}/>
    <Route path="/detail-user/:id" element={<DetailUser/>}/>
    <Route path="/detail-order/:id" element={<DetailOrderUserID/>}/>
    <Route path="/danhmuc/:id" element={<DanhMucIndex/>}/>
    <Route path="/chi-tiet-san-pham/:id" element={<ProductDetail/>}/>
    <Route path="/search/all-product-name/:name" element={<SearchProductByName/>}/>
    <Route path="/tintuc" element={<TinTucIndex/>}/>
    <Route path="/chi-tiet-tin-tuc/:id" element={<TinTucDetail/>}/>
  </Route>
    <Route path="/review/product/:id" element={<ReviewForm/>}/>
    <Route path="/address" element={<AddressSelector/>}/>
    <Route path="/login" element={<Login/>}/> 
    <Route path="/signup" element={<SignUp/>}/> 
    <Route path="/logout" element={<Logout/>}/> 
    <Route path="/forget-pass" element={<Forget_Pass/>}/> 
    <Route path="/verify-token" element={<Verify_Token/>}/>
    <Route path="/change-pass" element={<Change_Pass/>}/>
    <Route path="/thanh-toan" element={<ProductDisplay/>}/>
    <Route path="/status-payment" element={<StatusPayment/>}/>
</Routes>

{/* <Route path="/login" element={<Login/>}/> 
  <Route path="/signUp" element={<SignUp/>}/> 
  <Route path="/logout" element={<Logout/>}/> 
  <Route path="/verify-token" element={<Verify_Token/>}/>
  <Route path="/forget-pass" element={<Forget_Pass/>}/> 
  <Route path="/change-pass" element={<Change_Pass/>}/>
  <Route path="/test" element={<Test/>} />
  <Route path="/cart" element={<CartPage/>} />
  <Route path="/checkout" element={<Checkout/>}/> */}


  <Routes>
  <Route path="/admin" element={<RequirementAdmin/>}>
      <Route path="" element={<HomeAdmin />}>
    
      <Route path="home" element={<Admin1 />} />
      <Route path="order-manager" element={<IndexOrder />} />
      <Route path="user-manager" element={<IndexUser />} />

      {/* Quản lý sản phẩm */}
      <Route path="product-manager" element={<IndexProduct/>} />
      <Route path="product-manager/add-product" element={<Addproduct/>} /> 
      <Route path="product-manager/statistical-product" element={<Product_Statistical/>}/>
      <Route path="product-manager/category-product" element={<Product_Category/>}/>
      <Route path="product-manager/update-product/:id" element={<Product_Update/>}/>

      {/* Quản lý khuyễn mãi */}
      <Route path="sale-manager" element={<IndexSale/>}/>

      {/* Quản lý danh mục */}
      <Route path="category-manager" element={<IndexCategory/>}/>
      <Route path="category-manager/add-category" element={<AddCategory/>}/>
      <Route path="category-manager/update-category/:id" element={<UpdateCategory/>}/>

      {/* Quản lý đơn hàng */}
      <Route path="order-manager/order-detail/:code" element={<DetailOrder/>}/>
      <Route path="order-manager/new-order" element={<NewOrder/>}/>
      
      {/* Quản lý topping */}
      <Route path="topping-manager" element={<IndexTopping/>}/>

      {/* Quản lý tin tức */}
      <Route path="tintuc-manager" element={<IndexTinTuc/>}/>
      <Route path="tintuc-manager/tintuc-add" element={<AddTinTuc/>}/>
      <Route path="tintuc-manager/chi-tiet-tin-tuc/:id" element={<XemChiTietTinTuc/>}/>
      <Route path="tintuc-manager/cap-nhat-tin-tuc/:id" element={<CapNhatTinTuc/>}/>

      {/* Quản lý nhân viên */}
      <Route path="nhanvien-manager" element={<NhanVienIndex/>}/>
      {/* <Route path="nhanvien-manager/add-nhanvien" element={<NhanVienIndex/>}/> */}

      {/* Quản lý đánh giá */}
      <Route path="review-manager" element={<IndexDanhGia/>}/>

      </Route>
  </Route>
  </Routes> 
      
    </>
  );
}

export default App;
