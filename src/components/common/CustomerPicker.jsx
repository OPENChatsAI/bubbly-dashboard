import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { getCustomers } from "../../services/db_service";

export default function CustomerPicker(props) {
  const [customers, setCustomers] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getCustomers().then((customers) => setCustomers(customers));
  }, []);

  const handleChange = (id) => {
    props.onChange(customers.filter((el) => el.id === id)[0]);
  };

  const filtered = customers.filter(function (el) {
    const lName = el.formatName().toLowerCase();
    const lQuery = query.toLowerCase();
    return lName.includes(lQuery);
  });

  return (
    <Select
      filterOption={false}
      showSearch
      onSearch={setQuery}
      onChange={handleChange}
    >
      {filtered.map((item) => (
        <Select.Option key={item.id}>{item.formatName()}</Select.Option>
      ))}
    </Select>
  );
}
