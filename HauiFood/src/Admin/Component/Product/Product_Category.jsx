import React from "react";

const Product_Category = () => {
  return (
    <div class=" w-[99.3%] relative  shadow-md sm:rounded-lg bg-teal-200 p-2 mt-2 ml-2">
      <p className="font-bold mb-2 text-xl ">Xem sản phẩm theo danh mục</p>
      <select className="py-1 rounded bg-white mb-2">
        <option selected>Trà Sữa</option>
        <option>Bánh mỳ</option>
        <option>Nước ngọt</option>
      </select>
      <table class="w-[100%] text-sm text-left text-gray-500 rounded-lg">
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
            <th scope="col" class="px-6 py-3">
              Sản phẩm
            </th>
            <th scope="col" class="px-6 py-3">
              Nhập
              <i class="fa-solid fa-up-down ml-2"></i>
            </th>
            <th scope="col" class="px-6 py-3">
              Đã bán
              <i class="fa-solid fa-up-down ml-2"></i>
            </th>
            <th scope="col" class="px-6 py-3">
              Còn lại
              <i class="fa-solid fa-up-down ml-2"></i>
            </th>
            <th scope="col" class="px-6 py-3 relative ">
              Giá Bán
            </th>
            <th scope="col" class="px-6 py-3 relative">
              Thống kê
            </th>
            <th scope="col" class="px-6 py-3">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b border-gray-200 hover:bg-gray-50">
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
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Chân gà bà tuyết
            </th>
            <td class="px-4 py-2">30</td>
            <td class="px-6 py-4">10</td>
            <td class="px-6 py-4">20</td>
            <td class="px-6 py-4">20.000 đ</td>
            <td
              onClick={() => setShowDetails(!showDetails)}
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
          <tr class="bg-white border-b border-gray-200 hover:bg-gray-50">
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
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Chân gà bà tuyết
            </th>
            <td class="px-4 py-2">30</td>
            <td class="px-6 py-4">10</td>
            <td class="px-6 py-4">20</td>
            <td class="px-6 py-4">20.000 đ</td>
            <td
              onClick={() => setShowDetails(!showDetails)}
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
          <tr class="bg-white border-b border-gray-200 hover:bg-gray-50">
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
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Chân gà bà tuyết
            </th>
            <td class="px-4 py-2">30</td>
            <td class="px-6 py-4">10</td>
            <td class="px-6 py-4">20</td>
            <td class="px-6 py-4">20.000 đ</td>
            <td
              onClick={() => setShowDetails(!showDetails)}
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
          <tr class="bg-white border-b border-gray-200 hover:bg-gray-50">
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
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Chân gà bà tuyết
            </th>
            <td class="px-4 py-2">30</td>
            <td class="px-6 py-4">10</td>
            <td class="px-6 py-4">20</td>
            <td class="px-6 py-4">20.000 đ</td>
            <td
              onClick={() => setShowDetails(!showDetails)}
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
          <tr class="bg-white border-b border-gray-200 hover:bg-gray-50">
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
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Chân gà bà tuyết
            </th>
            <td class="px-4 py-2">30</td>
            <td class="px-6 py-4">10</td>
            <td class="px-6 py-4">20</td>
            <td class="px-6 py-4">20.000 đ</td>
            <td
              onClick={() => setShowDetails(!showDetails)}
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
      </table>
      <nav
        class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
        <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
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
    </div>
  );
};

export default Product_Category;
