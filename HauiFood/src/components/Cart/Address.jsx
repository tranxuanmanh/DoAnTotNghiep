import React, { useEffect, useState } from "react";

const AddressSelector = ({setDiaChi}) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

//   console.log({selectedProvince,selectedDistrict,selectedWard})

  // Fetch tỉnh
  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=1")
      .then((res) => res.json())
      .then(setProvinces);
  }, []);

  // Khi chọn tỉnh → fetch huyện
  useEffect(() => {
    if (selectedProvince) {
      fetch(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
        .then((res) => res.json())
        .then((data) => setDistricts(data.districts));
    }
  }, [selectedProvince]);

  // Khi chọn huyện → fetch xã
  useEffect(() => {
    if (selectedDistrict) {
      fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
        .then((res) => res.json())
        .then((data) => setWards(data.wards));
    }
  }, [selectedDistrict]);

  return (
    <div className="space-y-4 space-x-1">
      <select className="rounded bg-white" onChange={(e) => setSelectedProvince(e.target.value)}>
        <option>-- Chọn Tỉnh --</option>
        {provinces.map((p) => (
          <option key={p.code} value={p.code}>
            {p.name}
          </option>
        ))}
      </select>

      <select className="rounded bg-white w-42" onChange={(e) => setSelectedDistrict(e.target.value)}>
        <option>-- Chọn Huyện --</option>
        {districts.map((d) => (
          <option key={d.code} value={d.code}>
            {d.name}
          </option>
        ))}
      </select>

      <select className="rounded bg-white" onChange={(e) => setSelectedWard(e.target.value)}>
        <option>-- Chọn Xã --</option>
        {wards.map((w) => (
          <option key={w.code} value={w.code}>
            {w.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AddressSelector;
