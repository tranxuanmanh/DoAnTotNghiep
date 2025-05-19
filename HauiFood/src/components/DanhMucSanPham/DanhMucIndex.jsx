import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ItemProductByDanhMuc from "./ItemProductByDanhMuc";

const DanhMucIndex = () => {
  const { id } = useParams();
  const [products, setProduct] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);// Số item hiển thị ban đầu
  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5);//Mỗi khi click thì tăng lên 5 sản phẩm
  };
  const getproductById = async () => {
    try {
      if (id == "all") {
        const kq = await axios.get(`http://localhost:8080/api/v1/product`);
        const sp1 = kq.data.data.content;
        setProduct(sp1 || []);
      } else {
        const res = await axios.get(
          `http://localhost:8080/api/v1/category/${id}`
        );
        const sp2 = res.data.data?.products;
        setProduct(sp2 || []);
      }
    } catch (error) {
      setProduct([]);
      console.log(error);
    }
  };
  useEffect(() => {
    getproductById();
  }, [id]);

  const [sortOption, setSortOption] = useState({ field: "", order: "" });

  const sortProducts = (productsToSort, field, order) => {
    const sorted = [...productsToSort];
    if (field === "price" || field === "ten") {
      sorted.sort((a, b) => {
        let aValue = field === "ten" ? a.name.toLowerCase() : a.priceSell;
        let bValue = field === "ten" ? b.name.toLowerCase() : b.priceSell;
        return order === "asc"
          ? aValue > bValue
            ? 1
            : -1
          : aValue < bValue
          ? 1
          : -1;
      });
    }
    return sorted;
  };

  const handleSortChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const sorted = sortProducts(products, name, value);
    setProduct(sorted);
    setSortOption({ field: name, order: value });
  };
  console.log({ products });

  const handleResetSort = () => {
    getproductById(); // Gọi lại API để lấy dữ liệu gốc
    setSortOption({ field: "", order: "" }); // Xóa lựa chọn sắp xếp
  };

  return (
    <div>
      <div className="text-center w-full mt-2 font-semibold mb-2">
        <p>Danh sách sản phẩm</p>
      </div>
      <div className="flex w-[100%] h-auto gap-x-2 ms-2 me-2">
        <div className="w-[15%]  bg-white shadow-xl p-2 shadow-gay-300 rounded  sticky top-2 h-fit">
          <p className="text-center font-semibold border-b py-1">
            Bộ lọc sản phẩm
          </p>
          <p className="font-semibold mt-2">Giá bán</p>
          <ul>
            <li>
              <input
                checked={
                  sortOption.field === "price" && sortOption.order === "asc"
                }
                type="radio"
                name="price"
                value="asc"
                onChange={handleSortChange}
              />{" "}
              Tăng dần
            </li>
            <li>
              <input
                checked={
                  sortOption.field === "price" && sortOption.order === "desc"
                }
                type="radio"
                name="price"
                value="desc"
                onChange={handleSortChange}
              />{" "}
              Giảm dần
            </li>
          </ul>
          <p className="font-semibold mt-2">Tên sản phẩm</p>
          <ul>
            <li>
              <input
                checked={
                  sortOption.field === "ten" && sortOption.order === "asc"
                }
                type="radio"
                name="ten"
                value="asc"
                onChange={handleSortChange}
              />{" "}
              A - Z
            </li>
            <li>
              <input
                checked={
                  sortOption.field === "ten" && sortOption.order === "desc"
                }
                type="radio"
                name="ten"
                value="desc"
                onChange={handleSortChange}
              />{" "}
              Z - A
            </li>
          </ul>
          <div className="text-center mt-3">
            <button
              onClick={handleResetSort}
              className="bg-red-100 text-red-500 px-5 py-1 rounded font-semibold border border-red-500 hover:cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>
        <div className="ps-7 flex flex-wrap justify-start gap-x-2 bg-gray-50 shadow rounded w-[84%] py-2 gap-y-2">
          {products.length > 0 ? (
            products
              .slice(0, visibleCount)
              .map((item, index) => (
                <ItemProductByDanhMuc key={index} product={item} />
              ))
          ) : (
            <p>Danh sách sản phẩm rỗng</p>
          )}
        </div>
      </div>
      {visibleCount < products.length && (
        <div className="ms-58 w-[70%] flex justify-center mt-4">
          <p
            onClick={handleShowMore}
            className="hover:cursor-pointer hover:text-blue-500 px-3 py-1 w-[14%] font-semibold rounded text-green-600 bg-green-100 text-center"
          >
            <i className="fa-solid fa-angles-down me-1"></i>
            Xem thêm
          </p>
        </div>
      )}
    </div>
  );
};

export default DanhMucIndex;
