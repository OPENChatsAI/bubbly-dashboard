import React from "react";
import { Input, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default function SearchTable(props) {
  const handleSearch = (e) => {
    props.onSearch(e.target.value);
  };

  return (
    <React.Fragment>
      <Input
        allowClear
        placeholder="Search customer"
        style={{ width: "30%", marginRight: 10 }}
        prefix={<SearchOutlined />}
        onChange={handleSearch}
      />
      <Typography.Text>{props.hint}</Typography.Text>
    </React.Fragment>
  );
}
