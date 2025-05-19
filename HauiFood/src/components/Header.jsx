import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ImageSlider from './ImageSlider';
import { Link, matchPath, Outlet, useLocation, useNavigate } from 'react-router';
import useAuth from '../Login_Logout/CustomHook';
import Category from './Category';
import Footer from '../Footer';



const Header = () => {
  const menuRef = useRef(null);
  const navigate=useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const {isLoggedIn}=useAuth();
   
    console.log(isLoggedIn);
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
    const items=JSON.parse(localStorage.getItem("cart"));
    const localtion=useLocation();
    const hiddenSliderPaths = ["/voucher","/chi-tiet-tin-tuc/:id","tintuc","chi-tiet-san-pham/:id","/search/all-product-name/:name","danhmuc/:id","detail-order/:id","/cart", "/login", "/register", "/checkout","/checkout/success", "/admin","/detail-user/:id"];
    const shouldHideSlider = hiddenSliderPaths.some(path =>
      matchPath({ path, end: true }, localtion.pathname)
    );

    const [searchName,setSearchName]=useState("");
    //const [productName,setproductName]=useState([]);
    const handleSearch=async(e)=>{
      e.preventDefault();
      navigate(`/search/all-product-name/${searchName}`)
    }
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
    
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
   // console.log(productName)



  return (
    <div>
       <nav className='flex justify-between items-center gap-2  p-2 '>
      <div className='flex-1 '>
        <img className='h-20 mx-auto' src="https://theme.hstatic.net/1000242782/1000838257/14/logo.png?v=620" alt="Jollibee" />
       
      </div>
      <div className='flex-1 text-start'>
     <motion.p 
     className='font-semibold text-[1vw]'
     animate={{ x: ["-30%", "100%"] }}
     transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
     >
      Thời gian hoạt động 7h - 18h
      </motion.p>
    </div>
      <div className='flex-2 '>
    
    {/* Tim kiem san pham */}
       
      <form class="max-w-lg mx-auto" onSubmit={handleSearch}>
  <div class="relative w-full">
    <input 
     onChange={ (e) => setSearchName(e.target.value)}
      type="text" 
      id="search" 
      placeholder="search name product, category name ..." 
      class="block w-full p-2.5 pr-10 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
      required 
    />
    <button 
      type="submit" 
      class="cursor-pointer  absolute inset-y-0 right-0 flex items-center px-3 text-white bg-blue-600 rounded-r-lg hover:bg-blue-700"
    >
      <i class="fa-solid fa-magnifying-glass"></i>
      <span class="sr-only">Search</span>
    </button>
  </div>
</form>

      </div>

   
    <div class='ps-2 flex-1 justify-items-center text-[1vw] font-semibold'>
      <p class=' '>
        Hotline đặt hàng
      </p>
      <p class='  text-red-500 '>0972685517</p>
    </div>
    <div className='flex-1 '>
    
<button  onClick={toggleDropdown} class= "text-[1vw] text-white font-semibold bg-red-500  rounded-lg text-sm px-3 py-1 text-center inline-flex items-center" type="button">{isLoggedIn?(<p>{JSON.parse(localStorage.getItem("user"))?.fullname}</p>):(<p>Tài khoản</p>)}
{
  isLoggedIn ? (
    isDropdownOpen ? (
      <i className="ms-2 fa-solid fa-chevron-up"></i>
    ) : (
      <i className="ms-2 fa-solid fa-chevron-down"></i>
    )
  ) : (
    <i className="ms-2 fa-solid fa-user"></i>
  )
}
</button>

<div className={`${isDropdownOpen ? "block" : "hidden"} z-60 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 absolute mt-2`}
      >
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" >
      {
      isLoggedIn?(
       <>
        <li>
        <Link to={`/detail-user/${JSON.parse(localStorage.getItem("user"))?.userId}`} class="block px-4 py-2 font-bold hover:bg-blue-600 hover:text-white">Thông tin tài khoản</Link>
        </li>
        <li>
        <Link to={`/detail-order/${JSON.parse(localStorage.getItem("user"))?.userId}`} class="block px-4 py-2 font-bold hover:bg-blue-600 hover:text-white">Tra cứu đơn hàng</Link>
        </li>
       
       <li>
        <Link to="/logout" class="block px-4 py-2 font-bold hover:bg-blue-600 hover:text-white">Đăng xuất</Link>
        </li>
       
       </>
        
         
      ):(
        <>
       
        <li>
        <Link to="/login" class="block px-4 font-bold py-2 hover:bg-blue-600 hover:text-white">Đăng nhập</Link>
        </li>
        <li>
        <Link to="/signup" class="block px-4 py-2 font-bold hover:bg-blue-600  hover:text-white">Đăng kí</Link>
        </li>
        </>
      
      )
      }
    
    </ul>
   
</div>

    
    </div>

    </nav>
     <nav className="flex justify-center border-b-2 border-red-500">
        <div className="flex p-1 items-center flex-4 ml-7">
          <ul className="flex space-x-6 text-black font-semibold text-sm">
            <li className='hover:text-red-500 p-1 '><Link to="trang-chu" >TRANG CHỦ</Link></li>
            <li className='hover:text-red-500 p-1 cursor-pointer '>
            <button className='cursor-pointer' onClick={() => setIsOpen(!isOpen)}  id="mega-menu-full-dropdown-button" data-collapse-toggle="mega-menu-full-dropdown" >
                THỰC ĐƠN 
                {isOpen?<i class="ml-2 fa-solid fa-angle-down"></i>:<i class="ml-2 fa-solid fa-angle-up"></i>}
            
            </button>
            </li>
            <li className='hover:text-red-500 p-1 '><Link to="/voucher" >KHUYẾN MÃI</Link></li>
            <li className='hover:text-red-500 p-1 '><Link to="/tintuc" >TIN TỨC</Link></li>  
            <li className='hover:text-red-500 p-1 '><a href="#" >LIÊN HỆ</a></li>    
          </ul>
        </div>
        
        <div className='flex-2'>
          <ul className='flex gap-x-20 items-center justify-end'>
            <li  className='font-bold  p-3 relative cursor-pointer hover:bg-blue-100 rounded'>
              <Link to="cart">
              <i class="fa-solid fa-cart-shopping text-xl  p-0.5 " title='Giỏ hàng'></i>
              </Link>
             
              <p className='absolute top-[2px] right-[1px] text-sm  rounded-2xl px-1.5 bg-red-500 text-white '>{items?.length>0?items.length:0}</p>
            </li>
           
            <li className='w-[40%]'></li>
          </ul>
        </div>
   
    
      </nav>

        {/* category */}
        {isOpen && <div ref={menuRef}><Category isOpen={isOpen} /></div>}

        {/* Slider */}
        {!shouldHideSlider && <ImageSlider />}


     <Outlet/>
     <Footer/>
    </div>
  )
}

export default Header
