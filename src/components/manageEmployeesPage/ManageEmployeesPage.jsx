import React, { useEffect } from "react";
import BasicPage from "../common/BasicPage";
import { Button, Typography } from "antd";
import { useState } from "react";
import { deleteUserById, getEmployees } from "../../services/db_service";
import { PlusOutlined } from "@ant-design/icons";
import ColumnsLayout from "../common/ColumnsLayout";
import BigColumn from "../common/BigColumn";
import SmallColumn from "../common/SmallColumn";
import CustomTable from "../common/CustomTable";
import CustomSider from "../common/CustomSider";
import NewEmployeeModal from "./subComponents/NewEmployeeModal";
import EditEmployeeModal from "./subComponents/EditEmployeeModal";
import withModal from "../hoc/withModal";
import withFetch from "../hoc/withFetch";

function ManageEmployeesPage(props) {
  const { data: employees, refresh, loading } = props;
  // const [loading, setLoading] = useState(false);
  // const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const columns = [
    {
      title: "Name",
      render: (record) => (
        <Typography.Text>{record.formatName()}</Typography.Text>
      ),
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  const handleEmployeeDeletion = async () => {
    await deleteUserById(selectedEmployee.id);
    setSelectedEmployee(null);
    await refresh();
  };

  return (
    <React.Fragment>
      <NewEmployeeModal
        onOk={props.toggleModal}
        onCancel={props.toggleModal}
        visible={props.visible}
      />
      <BasicPage
        title="Manage Employees"
        action={
          <Button
            onClick={props.toggleModal}
            type="primary"
            icon={<PlusOutlined />}
            shape="round"
          >
            Employee
          </Button>
        }
      >
        <ColumnsLayout>
          <BigColumn>
            <CustomTable
              data={employees}
              columns={columns}
              onRowClick={setSelectedEmployee}
            />
          </BigColumn>
          <SmallColumn>
            <CustomSider
              type="employee"
              selectedData={selectedEmployee}
              loading={loading}
              onDataDelete={handleEmployeeDeletion}
            />
          </SmallColumn>
        </ColumnsLayout>
      </BasicPage>
    </React.Fragment>
  );
}

export default withModal()(
  withFetch({ fetch: getEmployees })(ManageEmployeesPage)
);
