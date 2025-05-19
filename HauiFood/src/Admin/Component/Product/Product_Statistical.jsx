import React, { useState } from "react";
import BarChart from "../Home/Chart1";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import DeleteConfirmModal from "../Base/Delete";

const Product_Statistical = () => {
  const [showChart, setShowChart] = useState(false);
  // Mở modal xóa
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    toast.success("Đã xóa thành công!", {
      position: "top-center",
      autoClose: 2000,
    });
    setIsModalOpen(false);
  };
  return (
    <div className="h-[100vh]">
      <ToastContainer />
      <div class=" w-[99.3%] h-[90%] relative  shadow-md sm:rounded-lg p-2 mt-2 ml-2">
        <div className="flex justify-between">
          <p className="text-xl font-bold mb-2 ">Thống kê sản phẩm</p>
          <select className=" py-1 rounded bg-yellow-200 mb-2">
            <option selected>Mặc đinh</option>
            <option>Sản phẩm bán chạy nhất</option>
            <option>Sản phẩm tồn kho nhiều nhất</option>
          </select>
        </div>
        <table class="w-[100%]  h-[78%] text-sm text-left text-gray-500 rounded-lg">
          <thead class="text-xs text-gray-700 uppercase bg-gray-200 ">
            <tr>
              <th scope="col" class="p-4">
                <div class="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 "
                  />
                </div>
              </th>
              <th scope="col" class="px-6 py-2">
                Sản phẩm
              </th>
              <th scope="col" class="px-6 py-2">
                Nhập
                <i class="fa-solid fa-up-down ml-2"></i>
              </th>
              <th scope="col" class="px-6 py-2">
                Đã bán
                <i class="fa-solid fa-up-down ml-2"></i>
              </th>
              <th scope="col" class="px-6 py-2">
                Còn lại
                <i class="fa-solid fa-up-down ml-2"></i>
              </th>
              <th scope="col" class="px-6 py-2 relative ">
                Giá Bán
              </th>
              <th scope="col" class="px-6 py-2 relative">
                Thống kê
              </th>
              <th scope="col" class="px-6 py-2">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b border-gray-200 hover:bg-blue-100 h-[5%]">
              <td class="w-4 p-4">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="checkbox-table-search-1" class="sr-only">
                    checkbox
                  </label>
                </div>
              </td>

              <th
                scope="row"
                class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Chân gà bà tuyết
              </th>
              <td class="px-4 py-2">30</td>
              <td class="px-6 py-4">10</td>
              <td class="px-6 py-4">20</td>
              <td class="px-6 py-4">20.000 đ</td>
              <td
                onClick={() => setShowChart(!showChart)}
                class="px-6 py-4 relative"
              >
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Xem ...
                </a>
              </td>

              <td class="px-7 py-4">
                <div className="flex gap-x-5">
                  <button
                    onClick={() => {
                      setIsModalOpen(!isModalOpen);
                    }}
                    className="cursor-pointer"
                  >
                    <i class="text-xl text-red-400 fa-regular fa-trash-can "></i>
                  </button>
                  <button className="cursor-pointer">
                    <i class="text-xl text-blue-500 fa-regular fa-pen-to-square"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr class="bg-white border-b border-gray-200 hover:bg-blue-100 h-[5%]">
              <td class="w-4 p-4">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="checkbox-table-search-1" class="sr-only">
                    checkbox
                  </label>
                </div>
              </td>

              <th
                scope="row"
                class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Chân gà bà tuyết
              </th>
              <td class="px-4 py-2">30</td>
              <td class="px-6 py-4">10</td>
              <td class="px-6 py-4">20</td>
              <td class="px-6 py-4">20.000 đ</td>
              <td
                onClick={() => setShowChart(!showChart)}
                class="px-6 py-4 relative"
              >
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Xem ...
                </a>
              </td>

              <td class="px-7 py-4">
                <div className="flex gap-x-5">
                  <button className="cursor-pointer">
                    <i class="text-xl text-red-400 fa-regular fa-trash-can "></i>
                  </button>
                  <button className="cursor-pointer">
                    <i class="text-xl text-blue-500 fa-regular fa-pen-to-square"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr class="bg-white border-b border-gray-200 hover:bg-blue-100 h-[5%]">
              <td class="w-4 p-4">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="checkbox-table-search-1" class="sr-only">
                    checkbox
                  </label>
                </div>
              </td>

              <th
                scope="row"
                class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Chân gà bà tuyết
              </th>
              <td class="px-4 py-2">30</td>
              <td class="px-6 py-4">10</td>
              <td class="px-6 py-4">20</td>
              <td class="px-6 py-4">20.000 đ</td>
              <td
                onClick={() => setShowChart(!showChart)}
                class="px-6 py-4 relative"
              >
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Xem ...
                </a>
              </td>

              <td class="px-7 py-4">
                <div className="flex gap-x-5">
                  <button className="cursor-pointer">
                    <i class="text-xl text-red-400 fa-regular fa-trash-can "></i>
                  </button>
                  <button className="cursor-pointer">
                    <i class="text-xl text-blue-500 fa-regular fa-pen-to-square"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr class="bg-white border-b border-gray-200 hover:bg-blue-100 h-[5%]">
              <td class="w-4 p-4">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="checkbox-table-search-1" class="sr-only">
                    checkbox
                  </label>
                </div>
              </td>

              <th
                scope="row"
                class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Chân gà bà tuyết
              </th>
              <td class="px-4 py-2">30</td>
              <td class="px-6 py-4">10</td>
              <td class="px-6 py-4">20</td>
              <td class="px-6 py-4">20.000 đ</td>
              <td
                onClick={() => setShowChart(!showChart)}
                class="px-6 py-4 relative"
              >
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Xem ...
                </a>
              </td>

              <td class="px-7 py-4">
                <div className="flex gap-x-5">
                  <button className="cursor-pointer">
                    <i class="text-xl text-red-400 fa-regular fa-trash-can "></i>
                  </button>
                  <button className="cursor-pointer">
                    <i class="text-xl text-blue-500 fa-regular fa-pen-to-square"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr class="bg-white border-b border-gray-200 hover:bg-blue-100 h-[5%]">
              <td class="w-4 p-4">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="checkbox-table-search-1" class="sr-only">
                    checkbox
                  </label>
                </div>
              </td>

              <th
                scope="row"
                class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Chân gà bà tuyết
              </th>
              <td class="px-4 py-2">30</td>
              <td class="px-6 py-4">10</td>
              <td class="px-6 py-4">20</td>
              <td class="px-6 py-4">20.000 đ</td>
              <td
                onClick={() => setShowChart(!showChart)}
                class="px-6 py-4 relative"
              >
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Xem ...
                </a>
              </td>

              <td class="px-7 py-4">
                <div className="flex gap-x-5">
                  <button className="cursor-pointer">
                    <i class="text-xl text-red-400 fa-regular fa-trash-can "></i>
                  </button>
                  <button className="cursor-pointer">
                    <i class="text-xl text-blue-500 fa-regular fa-pen-to-square"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr class="bg-white border-b border-gray-200 hover:bg-blue-100 h-[5%]">
              <td class="w-4 p-4">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="checkbox-table-search-1" class="sr-only">
                    checkbox
                  </label>
                </div>
              </td>

              <th
                scope="row"
                class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Chân gà bà tuyết
              </th>
              <td class="px-4 py-2">30</td>
              <td class="px-6 py-4">10</td>
              <td class="px-6 py-4">20</td>
              <td class="px-6 py-4">20.000 đ</td>
              <td
                onClick={() => setShowChart(!showChart)}
                class="px-6 py-4 relative"
              >
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Xem ...
                </a>
              </td>

              <td class="px-7 py-4">
                <div className="flex gap-x-5">
                  <button className="cursor-pointer">
                    <i class="text-xl text-red-400 fa-regular fa-trash-can "></i>
                  </button>
                  <button className="cursor-pointer">
                    <i class="text-xl text-blue-500 fa-regular fa-pen-to-square"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
          <DeleteConfirmModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleDelete}
          />
        </table>
        <nav
          class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-2 mt-4"
          aria-label="Table navigation"
        >
          <select className="rounded py-1">
            <option value="">Chọn tất cả bản ghi</option>
            <option value="">Xóa</option>
          </select>
          <ul class="inline-flex  text-sm ">
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                4
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                5
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
        {showChart && (
          <div className="fixed bg-blue-500 w-[65%] h-[55%] right-[15%] top-[20%] p-2 z-100 rounded">
            <button
              onClick={() => setShowChart(!showChart)}
              className="absolute top-[-15px] p-2 bg-blue-500 text-white right-[-8px] rounded-full"
            >
              X
            </button>
            <p className="bg-yellow-400 p-2 rounded mb-2">
              So luot ban trong ngay: 20
            </p>
            <div className="flex bg-white rounded">
              <div className="w-[70%] ">
                <BarChart></BarChart>
              </div>
              <div className="w-[29%]  px-4">
                <p>Mau xanh so luot ban</p>
                <p>Mau xanh so luot ban</p>
                <p>Mau xanh so luot ban</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="w-[99.3%] bg-gradient-to-b to-yellow-100 from-green-300 h-auto relative  shadow-md sm:rounded-lg p-2 mt-2 ml-2">
        <p>Tổng số sản phẩm : 20 </p>
        <p>Tồn kho: 30 sản phẩm</p>
        <p>Tổng số sản phẩm : 20 </p>
        <p>Tồn kho: 30 sản phẩm</p>
        <p>Tổng số sản phẩm : 20 </p>
        <p>Tồn kho: 30 sản phẩm</p>
        <p>Tổng số sản phẩm : 20 </p>
        <p>Tồn kho: 30 sản phẩm</p>
        <BarChart></BarChart>
      </div>
    </div>
  );
};

export default Product_Statistical;
