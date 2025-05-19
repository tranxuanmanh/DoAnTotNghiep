import axios from 'axios';
import JoditEditor from 'jodit-react';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast, ToastContainer } from 'react-toastify';
import useAuth from '../../../Login_Logout/CustomHook';

const CapNhatTinTuc = () => {
    const {id}=useParams();
    const navigate=useNavigate();
    const [tintuc,setTinTuc]=useState({
    title: '',
    content: '',
    userId: JSON.parse(localStorage.getItem('user'))?.userId || null,
    status:null
    });
    
    const [hinhanh,setHinhAnh]=useState("");
    // useRef để giữ nội dung editor, tránh render lại khi gõ
    const contentRef = useRef(tintuc.content);

    const getNewsById=async()=>{
        try{
        const res= await axios.get(`http://localhost:8080/api/v1/news/${id}`);
        const kq=res.data.data;
        setHinhAnh(kq.thumbnail);
      
           setTinTuc({
                title: kq.title ,
                content: kq.content ,
                userId: kq.userId ,
                status: kq.status 
            });
            contentRef.current = kq.content; 
        }catch(error){
            toast.error("Có lỗi khi lấy dữ liệu",{autoClose:2000});
        }
    }
    useEffect(()=>{
        getNewsById()
    },[id])


  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setTinTuc(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]||"");
  };

  // Chỉ cập nhật ref nội dung khi editor thay đổi
  const handleChangeND = (newContent) => {
    contentRef.current = newContent;
  };

const {getToken}=useAuth();

  const handleSubmit = async(e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('news',JSON.stringify({...tintuc,content: contentRef.current})
  );
  if (file) {
    formData.append('file', file);
  }
  console.log(formData)
    try{
      const res=await axios.put(`http://localhost:8080/api/v1/news/${id}`,formData,{
        headers: {
        'Content-Type': 'multipart/form-data',
        Authorization:`Bearer ${getToken()}`
      }
      })
      if(res.status==200){
        toast.success("Cập nhật tin tức thành công",{autoClose:2000});
        setTimeout(()=>{
          navigate("/admin/tintuc-manager");
        },3000)

    console.log({res})
      }
    }catch(error){
      console.log(error);
      toast.error("Đã xảy ra lỗi khi cập nhật "+error,{autoClose:2000});
    }
  };





  return (
    <div className='w-full'>
      <p className='text-center font-semibold mt-2'>Cập nhật tin tức</p>
      <ToastContainer/>
        <form
        className="w-[80%] ms-20 mt-5"
        onSubmit={handleSubmit}
      >
        <div className="mb-5 w-[50%]">
          <label
            htmlFor="tieude"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nhập tiêu đề bài viết
          </label>
          <input
            name="title"
            value={tintuc.title}
            onChange={handleChange}
            type="text"
            id="tieude"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Nhập tiêu đề bài viết"
            required
          />
        </div>

        <div className="mb-5 w-[50%]">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="user_avatar"
          >
            Ảnh đại cho bài viết
          </label>
          <div className='mb-2'>
            <img className='w-60 h-36 ' src={`http://localhost:8080${hinhanh}`} alt="" />
          </div>
          <input
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lgcursor-pointer bg-gray-50 focus:outline-none"
            type="file"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="content"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nội dung bài viết
          </label>
          <JoditEditor
            value={contentRef.current}
            onChange={handleChangeND}
            config={{
              uploader: {
                insertImageAsBase64URI: true,
              },
             
              readonly: false,
              height: 450,
              toolbarAdaptive: false,
              toolbarSticky: false,
              buttons: [
                'bold', 'italic', 'underline', '|',
                'fontsize', 'font', '|',
                'table', '|', 
                'ul', 'ol', '|',
                'outdent', 'indent', '|',
                'link', 'image', '|',
                'undo', 'redo', '|',
                'hr', 'eraser'
              ],
       
            }}
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mb-5"
        >
          Cập nhật tin tức
        </button>
      </form>
    </div>
  )
}

export default CapNhatTinTuc
