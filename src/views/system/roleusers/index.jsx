import { Button, Table, Input } from "antd";
import { useState, useEffect } from "react";
import {
  CloseCircleOutlined,
  CheckCircleTwoTone,
  SearchOutlined,
} from "@ant-design/icons";
import { userrole } from "@/service";
import Adduser from "@/component/comlist/adduser";
const columns = [
  {
    title: "用户ID",
    dataIndex: "userid",
    key: "userid",
  },
  {
    title: "用户帐号",
    dataIndex: "accounts",
    key: "accounts",
  },
  {
    title: "用户昵称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "邮箱",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "帐号状态",
    dataIndex: "state",
    key: "state",
  },
  {
    title: "备注",
    dataIndex: "notes",
    key: "notes",
  },

  {
    title: "操作",
    dataIndex: "trywork",
    key: "trywork",
  },
];
const data = [
  {
    userid: 1,
    accounts: "admin",
    name: "管理员",
    email: "",
    state: (
      <div>
        <CheckCircleTwoTone twoToneColor="#52c41a" />
      </div>
    ),
    notes: "管理员",
    trywork: "",
  },
  {
    userid: 3,
    accounts: "finack",
    name: "王雪",
    email: "",
    state: (
      <div>
        <CheckCircleTwoTone twoToneColor="#52c41a" />
      </div>
    ),
    notes: "",
    trywork: (
      <div className="text-green-500">
        <span>
          <CloseCircleOutlined />
        </span>
        &nbsp; 取消授权
      </div>
    ),
  },
  {
    userid: 4,
    accounts: "tol",
    name: "李艳青",
    email: "",
    state: (
      <div>
        <CheckCircleTwoTone twoToneColor="#52c41a" />
      </div>
    ),
    notes: "",
    trywork: (
      <div className="text-green-500">
        <span>
          <CloseCircleOutlined />
        </span>
        &nbsp; 取消授权
      </div>
    ),
  },
];
const data2 = [
  {
    userid: 1,
    accounts: "admin",
    name: "管理员",
    email: "",
    state: (
      <div>
        <CheckCircleTwoTone twoToneColor="#52c41a" />
      </div>
    ),
    notes: "管理员",
    trywork: "",
  },
  {
    userid: 3,
    accounts: "finack",
    name: "王雪",
    email: "",
    state: (
      <div>
        <CheckCircleTwoTone twoToneColor="#52c41a" />
      </div>
    ),
    notes: "",
    trywork: (
      <div className="text-green-500">
        <span>
          <CloseCircleOutlined />
        </span>
        &nbsp; 取消授权
      </div>
    ),
  },
];
const Roleusers = () => {
  useEffect(() => {
    userrole()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [activeTab, setActiveTab] = useState("Tab 1");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  // 表格
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className="flex justify-between">
      {/* 左边 */}
      <div className="w-[170px] h-[550px] border">
        <div className="w-[170px] h-[40px] border-b font-bold text-[#999] leading-10 pl-2">
          角色名称
        </div>
        <div
          onClick={() => handleTabChange("Tab 1")}
          className="w-[170px] h-[40px] border-b leading-10 pl-2"
        >
          管理员
        </div>
        <div
          onClick={() => handleTabChange("Tab 2")}
          className="w-[170px] h-[40px] border-b leading-10 pl-2"
        >
          超级管理员
        </div>
      </div>
      {/* 右边 */}
      <div className=" w-[80%]  h-[550px]">
        {/* 按钮 */}
        <div className="flex justify-between">
          <div>
            {/* <Button
              icon={<PlusOutlined />}
              className=" bg-emerald-50 text-emerald-400"
            >
              添加用户
            </Button> */}
            <Adduser />
            <Button
              icon={<CloseCircleOutlined />}
              className=" bg-red-100 text-red-400 ml-3"
            >
              批量取消授权
            </Button>
          </div>
          <div>
            <Input
              className="w-[180px]"
              placeholder="请输入用户名称"
              prefix={<SearchOutlined className="site-form-item-icon" />}
            />
          </div>
        </div>

        {/* table 表格 */}
        <div className=" w-[100%]  h-[450px] mt-2 overflow-hidden">
          {activeTab === "Tab 1" && (
            <div>
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
              />
            </div>
          )}
          {activeTab === "Tab 2" && (
            <div>
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data2}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Roleusers;
