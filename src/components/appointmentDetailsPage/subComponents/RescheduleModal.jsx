import React from "react";
import { useState } from "react";
import { Modal, Form, message } from "antd";
import { rescheduleAppointmentById } from "../../../services/db_service";
import TimeRangePicker from "../../common/TimeRangePicker";
import DatePicker from "../../common/DatePicker";

export default function RescheduleModal(props) {
  const { appointment, onOk, visible, onCancel } = props;
  const [loading, setLoading] = useState(false);
  const [newDate, setNewDate] = useState(appointment.date);
  const [newRange, setNewRange] = useState([
    appointment.startTime,
    appointment.endTime,
  ]);

  const formatDate = (date) => {
    console.log(date);
    return new Date(date).getTime() / 1000;
  };

  const handleOK = async () => {
    // Add Validation logic for dates
    console.log(newRange);
    // setLoading(true);
    const dt1 = new Date(newRange[0]);
    const dt2 = new Date(newRange[1]);
    dt1.setDate(newDate?._d?.getDate() ?? newDate.getDate());
    dt2.setDate(newDate?._d?.getDate() ?? newDate.getDate());

    try {
      await rescheduleAppointmentById(appointment.id, {
        date: formatDate(newDate),
        startTime: formatDate(dt1),
        endTime: formatDate(dt2),
      });
      setLoading(false);
      message.success("Appointment rescheduled succesfully");
      onOk();
    } catch (ex) {
      message.error(ex.message);
    }
    setLoading(false);
  };

  const isValidDate = newDate && newRange;
  return (
    <Modal
      destroyOnClose
      okButtonProps={{ shape: "round", disabled: !isValidDate }}
      cancelButtonProps={{ shape: "round" }}
      title="Reschedule"
      visible={visible}
      onOk={handleOK}
      onCancel={onCancel}
      confirmLoading={loading}
    >
      <Form>
        <Form.Item label="Date">
          <DatePicker onChange={setNewDate} appointment={appointment} />
        </Form.Item>
        <Form.Item label="Time">
          <TimeRangePicker onChange={setNewRange} appointment={appointment} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
