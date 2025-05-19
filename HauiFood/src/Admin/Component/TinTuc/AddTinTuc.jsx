import React, { useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import 'jodit/build/jodit.min.css';
import axios from 'axios';
import useAuth from '../../../Login_Logout/CustomHook';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';

const AddTinTuc = () => {
  const navigate=useNavigate();
  const [tintuc, setTinTuc] = useState({
    title: '',
    content: '',
    userId: JSON.parse(localStorage.getItem('user'))?.userId || null
  });
  

  const [file, setFile] = useState(null);

  // useRef để giữ nội dung editor, tránh render lại khi gõ
  const contentRef = useRef(tintuc.content);

  const handleChange = (e) => {
    setTinTuc(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Chỉ cập nhật ref nội dung khi editor thay đổi
  const handleChangeND = (newContent) => {
    contentRef.current = newContent;
  };

  // Khi submit mới cập nhật state content và xử lý gửi dữ liệu
  const {getToken}=useAuth();
  const handleSubmit = async(e) => {
    e.preventDefault();

     const formData = new FormData();
    formData.append('news',JSON.stringify({...tintuc,content: contentRef.current})
  );
  if (file) {
    formData.append('file', file);
  }
       

    try{
      const res=await axios.post("http://localhost:8080/api/v1/news",formData,{
        headers: {
        'Content-Type': 'multipart/form-data',
        Authorization:`Bearer ${getToken()}`
      }
      })
      if(res.status==200){
        toast.success("Thêm mới tin tức thành công",{autoClose:2000});
        setTimeout(()=>{
          navigate("/admin/tintuc-manager");
        },3000)
      //   console.log('Submit data:', {
      //           ...tintuc,
      //           content: contentRef.current,
      //           file
      // });
      }
    }catch(error){
      console.log(error);
      toast.error("Đã xảy ra lỗi "+error,{autoClose:2000});
    }




    // Ví dụ gửi dữ liệu lên backend ở đây
    
  };

  return (
    <div className='w-full'>
      <p className='text-center font-semibold mt-2 border-b py-2 '>Thêm mới tin tức</p>
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
          <input
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg
              cursor-pointer bg-gray-50 focus:outline-none"
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
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
            focus:outline-none focus:ring-blue-300 font-medium rounded-lg
            text-sm w-full sm:w-auto px-5 py-2.5 text-center mb-5"
        >
          Thêm mới tin tức
        </button>
      </form>
    </div>
  );
};

export default AddTinTuc;
