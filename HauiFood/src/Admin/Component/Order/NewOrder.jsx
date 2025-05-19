import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { toast } from 'react-toastify';
import DateFormart from '../Base/DateFormart';
import { useNavigate } from 'react-router';
 // Ensure this utility is correctly imported

const NewOrder = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [detail, setDetail] = useState({
    show: false,
    code: null,
  });
 
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10; // Number of items per page

  const getOrders = async () => {
    try {
      let api = "http://localhost:8080/api/v1/order/all/CHOXULY";
      const res = await axios.get(api);
      setOrders(res.data);
    } catch (error) {
      toast.error("Có lỗi xảy ra: " + error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const filteredOrders = orders.filter((order) =>
    order.orderCode.toLowerCase().includes(search.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData =
    search !== ""
      ? orders.length > 0
        ? filteredOrders.slice(startIndex, endIndex)
        : []
      : orders.length > 0
      ? orders.slice(startIndex, endIndex)
      : [];

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const updateStatus = async (id, trangthai) => {
    try {
      await axios.put(
        `http://localhost:8080/api/v1/order/update/${id}?status=${trangthai}`
      );
      toast.success("Xác nhận đơn hàng thành công");
      getOrders();
      window.location.reload();
    } catch (error) {
      toast.error("Có lỗi khi cập nhật trạng thái đơn hàng");
    }
  };

  const handleStatus = (id, trangthai) => {
    const confirm = window.confirm("Xác nhận đơn hàng?");
    if (confirm) {
      updateStatus(id, trangthai);
    }
  };
  
  return (
    <div>
      <div className="w-[99.3%] relative h-[670px] shadow-md sm:rounded-lg  p-2 mt-2 ml-2">
        <div className="flex justify-between">
          <input
            type="text"
            className="border border-red-500 w-[27%] rounded-lg p-1 mb-2"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm đơn hàng ..."
          />
          <div className="me-14 mt-2">
            <button onClick={handlePrev} disabled={currentPage === 1}>
              <i
                className={`${
                  currentPage === 1 ? "text-gray-300" : "text-blue-500"
                } fa-solid fa-circle-chevron-left text-2xl me-3`}
              ></i>
            </button>
            <button onClick={handleNext} disabled={currentPage === totalPages}>
              <i
                className={`${
                  currentPage === totalPages || orders.length === 0
                    ? "text-gray-300"
                    : "text-blue-500"
                } fa-solid fa-circle-chevron-right text-2xl`}
              ></i>
            </button>
          </div>
        </div>
        <table className="w-[100%] text-sm text-left text-black rounded bg-white mb-10">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Mã đơn
              </th>
              <th scope="col" className="px-6 py-3">
                Tổng tiền
              </th>
              <th scope="col" className="px-6 py-3 relative cursor-pointer group">
                Trạng thái
                <div
                  className="z-99 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out lg:top-[30px] xl:top-[40px] rounded left-[5px] absolute w-full lg:w-[200px] group-hover:block"
                >
                
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Hình thức thanh toán
              </th>
              <th scope="col" className="px-6 py-3">
                Trạng thái thanh toán
              </th>
              <th scope="col" className="px-6 py-3">
                Thời gian
              </th>
              <th scope="col" className="px-6 py-3">
                Chi tiết
              </th>
              <th scope="col" className="px-6 py-3">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 &&
              currentData.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white border-b border-gray-200 hover:bg-gray-50 min-h-[100px]"
                >
                  <td className="px-6 py-4">{item.order_id}</td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.orderCode}
                  </td>
                  <td className="px-6 py-4">
                    {item.totalAmount.toLocaleString()} đ
                  </td>
                  <td className="px-6 py-4 w-[10%]">
                    {item.orderStatus === "CHOXULY" && (
                      <p className="bg-red-300 text-red-600 rounded p-1">
                        Chờ xử lý
                      </p>
                    )}
                    
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {item.payMethod === "CHUYENKHOAN" && "Chuyển khoản"}
                    {item.payMethod === "TIENMAT" && "Tiền mặt"}
                  </td>
                  <td className="px-6 py-4">
                    {item.paymentStatus ? (
                      <p className="text-green-500">Đã thanh toán</p>
                    ) : (
                      <p className="text-red-500">Chưa thanh toán</p>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    {<DateFormart value={item.orderDate} />}
                  </td>
                  <td
                    className="px-6 py-4 cursor-pointer text-blue-600"
                    onClick={() => {
                      const isSame = detail.code === item.orderCode;
                      setDetail({
                        show: !detail.show || !isSame,
                        code: !detail.show || !isSame ? item.orderCode : null,
                      });

                      if (!detail.show || !isSame) {
                        navigate(`../order-manager/order-detail/${item.orderCode}`);
                      }
                    }}
                  >
                    Chi tiết
                  </td>
                  <td className="px-2 py-4">
                    {item.orderStatus === "CHOXULY" && (
                      <button
                        onClick={() => handleStatus(item.order_id, "CHAPTHUAN")}
                        title="Xác nhận"
                        className="text-green-700 bg-green-200 p-1 rounded mr-2 mb-1 min-w-12"
                      >
                        <i className="fa-solid fa-check"></i>
                      </button>
                    )}
                    
                    <button className="text-red-700 bg-red-200 p-1 rounded min-w-10 cursor-not-allowed">
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </td>
                </tr>
              ))}
            {(filteredOrders.length === 0 || orders.length === 0) && (
              <tr>
                <td colSpan={9} className="text-center font-bold text-red-500">
                  <p>Chua co don hang moi nao</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewOrder;
