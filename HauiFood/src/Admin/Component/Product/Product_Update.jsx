import { useEffect, useState } from "react";
import Product_Topping from "./Product_Topping";
import { useParams } from "react-router";
import axios from "axios";
import useAuth from "../../../Login_Logout/CustomHook";
import { toast, ToastContainer } from "react-toastify";
import Loading from "../Base/Loading";

const Product_Update = () => {
  const { id } = useParams();
  const { getToken } = useAuth();

  const [product, setProduct] = useState({
    name: "",
    tag: "",
    price: null,
    categoryId:null,
    priceDiscount: 0,
    description: "",
    quantity: null,
    status: null,
    categoryId: "",
    toppings: [],
  });

  console.log(product)

  const [imageUrls, setImageUrls] = useState([]); // ảnh cũ từ server
  const [newImages, setNewImages] = useState([]); // ảnh mới chọn từ máy
  const [imageRemove,setImageRemove]=useState([]);
  const [categories, setCategories] = useState([]);
  const [openTopping, setOpenTopping] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch product detail
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`http://localhost:8080/api/v1/product/${id}`);
      const data = res.data.data;
      console.log(data);
      setProduct({
        name: data.name,
        tag: data.tag,
        price: data.price,
        priceDiscount: data.priceDiscount,
        description: data.description,
        quantity: data.quantity,
        status: data.status,
        categoryId: data.categoryId,
        toppings: data.toppings.map((item)=>item.toppingId),
        categoryId:data.category?.category_id
      
      });
      setImageUrls(data.images || []);
    };
    fetchProduct();
  }, [id]);

  console.log(imageUrls);

  // Fetch categories
  useEffect(() => {
    const getDanhMuc = async () => {
      const res = await axios.get("http://localhost:8080/api/v1/category/gets");
      setCategories(res.data.data.filter((item)=>item.status==true));
    };
    getDanhMuc();
  }, []);


  // Xử lý ảnh mới
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
     if (newImages.length + files.length > 4) {
    toast.error("Chỉ được phép chọn tối đa 4 ảnh mới");
    return;
    }

    setNewImages((prev) => [...prev, ...files]);
  };
  console.log(newImages)

  // Xóa ảnh cũ
  const removeOldImage = (index,publicId) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
    setImageRemove((prev) => [...prev, publicId]);
  };

  //  if(imageRemove.length>0){
  //      const xoaAnhCu=imageRemove.join(",");
      //formData.append("removeImages",xoaAnhCu);
    //  console.log(xoaAnhCu)
    //  }

  // Xóa ảnh mới
  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Xử lý cập nhật
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    //Lấy ảnh mới
    newImages.forEach((file) => formData.append("images", file));
    formData.append("images", JSON.stringify(imageUrls));// gửi lại ảnh cũ còn giữ

    formData.append("productRequest", JSON.stringify(product));

    //Nếu có xóa ảnh thì xóa luôn trong clodinary
    if(imageRemove.length>0){
      const xoaAnhCu=imageRemove.join(",");
      formData.append("removeImages",xoaAnhCu);
      //console.log(xoaAnhCu)
    }
    
    try {
      const res = await axios.put(`http://localhost:8080/api/v1/product/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (res.status === 200) {
        toast.success("Cập nhật sản phẩm thành công");
        setNewImages([]);
      }
    } catch (error) {
      toast.error("Cập nhật thất bại");
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-green-100 w-full mx-auto p-3 m-2 rounded">
      <ToastContainer/>
      {loading&&(
           <div className="fixed inset-0 bg-white/60 z-50 flex justify-center items-center">
           <Loading />
         </div>
         )}
      <div className="h-8 text-center text-black font-bold mb-4 border-b">
        Trang cập nhật sản phẩm
      </div>

      <form onSubmit={handleUpdate}>
        <div className="flex">
          <div className="flex-1 p-2 grid grid-cols-1 gap-y-3">
            <Input type="text" label="Tên sản phẩm" value={product.name}  onChange={(e) => setProduct({ ...product, name: e.target.value })} />
            <Input type="number" label="Giá tiền" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
            <Input type="number" label="Giảm (%)" value={product.priceDiscount} onChange={(e) => setProduct({ ...product, priceDiscount: e.target.value })} />
            <Input type="number" label="Số lượng" value={product.quantity} onChange={(e) => setProduct({ ...product, quantity: e.target.value })} />
            
            <div>
              <label className="block text-sm font-medium text-gray-900">Danh mục</label>
              <select
                value={product.categoryId}
                onChange={(e) => setProduct({ ...product, categoryId: e.target.value })}
                className="bg-gray-50 border border-gray-300 rounded p-2 w-[60%]"
              >
                <option value="">Chọn danh mục</option>
                {categories.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">Mô tả sản phẩm</label>
              <textarea
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                className="bg-gray-50 border border-gray-300 rounded p-2 w-[80%]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">Trạng thái</label>
              <div className="flex gap-4">
                <label>
                  <input className="me-2" type="radio" checked={product.status === true} onChange={() => setProduct({ ...product, status: true })} />
                  Hiển thị
                </label>
                <label>
                  <input className="me-2" type="radio" checked={product.status === false} onChange={() => setProduct({ ...product, status: false })} />
                  Ẩn
                </label>
              </div>
            </div>
          </div>

          {/* Bên phải: ảnh và topping */}
          <div className="w-[45%] pl-4">
            <button
              type="button"
              className="mb-2 p-2 bg-green-500 text-white rounded"
              onClick={() => setOpenTopping(!openTopping)}
            >
              Topping
            </button>
            {openTopping && <Product_Topping product={product} toppingLST={product.toppings} setProduct={setProduct} />}

            {/* Upload ảnh mới */}
            <label
              htmlFor="uploadFile1"
              className="flex items-center bg-gray-500 mb-3 text-white px-3 py-2 rounded cursor-pointer w-max"
            >
              Upload ảnh mới
              <input type="file" id="uploadFile1" multiple className="hidden" onChange={handleImageChange} />
            </label>

            {/* Hiển thị ảnh cũ */}
            <div className="mb-4">
              <h4>Ảnh hiện tại:</h4>
              <div className="grid grid-cols-3 gap-y-4 gap-x-2">
                {imageUrls.map((url, index) => (
                  <div key={index} className="relative">
                    <img src={url.image_url} alt="" className="w-[200px] h-28 object-cover border" />
                    <button
                      type="button"
                      className="absolute top-[-10px] lg:right-[-3%] md:right-[1%] bg-red-500 text-white rounded-full px-2"
                      onClick={() => removeOldImage(index,url.publicId)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Hiển thị ảnh mới */}
            <div>
              <h4>Ảnh mới:</h4>
              <div className="grid grid-cols-3 gap-y-4 gap-x-2">
                {newImages.map((file, index) => (
                  <div key={index} className="relative">
                    <img src={URL.createObjectURL(file)} alt="" className="w-[200px] h-28 object-cover border" />
                    <button
                      type="button"
                      className="absolute top-[-10px] lg:right-[-3%] md:right-[1%] bg-red-500 text-white rounded-full px-2"
                      onClick={() => removeNewImage(index)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 text-white bg-blue-700 hover:bg-blue-800 font-bold rounded-lg px-4 py-2"
        >
          {loading ? "Đang cập nhật..." : "Cập nhật sản phẩm 🍔"}
        </button>
      </form>
    </div>
  );
};

const Input = ({ label, value, onChange,type }) => (
  <div>
    <label className="block text-sm font-medium text-gray-900">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="bg-gray-50 border border-gray-300 rounded p-2 w-[80%]"
    />
  </div>
);

export default Product_Update;
