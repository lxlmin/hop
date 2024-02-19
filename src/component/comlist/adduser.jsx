import React, { useState, useEffect } from "react";
import { Button, Modal, Table } from "antd";
import { PlusOutlined, CheckCircleTwoTone } from "@ant-design/icons";
import { addrole } from "@/service";
// table
const columns = [
  {
    title: "用户编号",
    dataIndex: "userid",
  },
  {
    title: "用户名称",
    dataIndex: "accounts",
  },
  {
    title: "用户昵称",
    dataIndex: "name",
  },
  {
    title: "用户状态",
    dataIndex: "state",
  },
];
const data = [
  {
    userid: 5,
    accounts: "xxk",
    name: "朱景轩",
    state: (
      <div>
        <CheckCircleTwoTone twoToneColor="#52c41a" />
      </div>
    ),
  },
];

//
const Adduser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    addrole(data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  // 展示
  const showModal = () => {
    setIsModalOpen(true);
  };
  // 确定
  const handleOk = () => {
    setIsModalOpen(false);
  };
  // 取消
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // table
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  //
  return (
    <>
      <Button
        icon={<PlusOutlined />}
        className=" bg-emerald-50 text-emerald-400"
        onClick={showModal}
      >
        添加用户
      </Button>
      <Modal
        title="添加用户"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
      </Modal>
    </>
  );
};
export default Adduser;
