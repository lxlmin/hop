import React, { useState, useEffect } from "react";
import { feedback } from "@/service";
import { Button, Form, Input, Space, Table } from "antd";
import {
  RedoOutlined,
  SearchOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "用户ID",
    dataIndex: "userid",
    key: "userid",
  },
  {
    title: "提交时间",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "建议内容",
    dataIndex: "textcont",
    key: "textcont",
  },
  {
    title: "操作",
    dataIndex: "trywork",
    key: "trywork",
  },
];
const data = [];
const arr = [
  {
    userid: 10238,
    time: "2022-04-14 22:12:24",
    textcont: "你好医生你们在这里有没有他克莫司...",
  },
  {
    userid: 10087,
    time: "2022-01-20 09:13:16",
    textcont: "希望江波涛医生以后救治病人时先...",
  },
];
for (let i = 2; i > 0; i--) {
  data.push({
    id: i,
    userid: arr[i - 1].userid,
    time: arr[i - 1].time,
    textcont: arr[i - 1].textcont,
    trywork: (
      <div className="w-[100px]  text-blue-500">
        <span>
          <EyeOutlined />
          详情
        </span>
        <span className="ml-2">
          <DeleteOutlined />
          删除
        </span>
      </div>
    ),
  });
}
const Feedback = () => {
  useEffect(() => {
    feedback()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  // 表单按钮
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
  };
  const onReset = () => {
    form.resetFields();
  };
  // 表格
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        style={{
          display: "flex",
        }}
      >
        <Form.Item name="note" label="建议内容" className="w-[250px] mr-5">
          <Input />
        </Form.Item>
        <Form.Item className="w-[250px]">
          <Space>
            <Button type="primary" htmlType="submit" className=" bg-blue-400">
              <span>
                <SearchOutlined />
              </span>
              &nbsp;搜索
            </Button>
            <Button htmlType="button" onClick={onReset}>
              <span>
                <RedoOutlined />
              </span>
              &nbsp;重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      {/* 按钮 */}
      <div className="flex justify-between">
        <Button className=" bg-red-100 text-red-400">
          <span>
            <DeleteOutlined />
          </span>
          &nbsp;删除
        </Button>
        <div className="w-[100px] h[32px] flex justify-around">
          <div className="w-[30px] h-[30px]  rounded-[50%] border pt-1 pl-2">
            <SearchOutlined />
          </div>
          <div className="w-[30px] h-[30px]  rounded-[50%] border pt-1 pl-2">
            <RedoOutlined />
          </div>
        </div>
      </div>
      {/* table */}
      <div className="mt-2">
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
      </div>
    </>
  );
};
export default Feedback;
