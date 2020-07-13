import React from "react";
import { Card, Row, Col } from "antd";
import { CalendarOutlined, ContactsOutlined } from "@ant-design/icons";

const weekdays = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

export default function ServiceInfo(props) {
  const { service } = props;
  return (
    <Card bordered={false} bodyStyle={{ padding: 0 }}>
      <p style={{ fontWeight: 600 }}>Service Info</p>
      <Row>
        <Col>
          <CalendarOutlined />
        </Col>
        <Col style={{ marginLeft: 10 }}>
          {service.schedule.map((item) => weekdays[item.day])}
        </Col>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <Col>
          <ContactsOutlined />
        </Col>
        {/* <Col style={{ marginLeft: 10 }}>
          <Typography.Text>Employees:</Typography.Text>
          {service.schedule.employees.map((item) => (
            // <Col>
            <Tag style={{ marginLeft: 10, marginRight: 10 }}>
              {item.firstName}
            </Tag>
            // </Col>
          ))}
        </Col> */}
      </Row>
      <Row style={{ marginTop: 10 }}></Row>
    </Card>
  );
}
