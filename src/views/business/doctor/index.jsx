import React, { useEffect } from "react";
import { doctor } from "@/service";
import { Button, Form, Input, Select, Space, Table } from "antd";
import {
  RedoOutlined,
  SearchOutlined,
  EditTwoTone,
  DeleteOutlined,
} from "@ant-design/icons";
import Addbtn from "@/component/comlist/add";

const { Option } = Select;
const Doctor = () => {
  useEffect(() => {
    doctor()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
  };
  const onReset = () => {
    form.resetFields();
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "专家名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "职称",
      dataIndex: "zcheng",
      key: "zcheng",
    },

    {
      title: "医生代码",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "排序ID",
      dataIndex: "rank",
      key: "rank",
    },
    {
      title: "头像",
      dataIndex: "headimg",
      key: "headimg",
    },
    {
      title: "科室",
      dataIndex: "kes",
      key: "kes",
    },
    {
      title: "操作",
      dataIndex: "trywork",
      key: "trywork",
    },
  ];

  const data = [];
  const arr = [
    { name: "白愿", kes: "超声科" },
    { name: "王子俊", kes: "肿瘤内科" },
    { name: "江波涛", kes: "肿瘤外科" },
    { name: "瓦昂二百", kes: "超声科" },
    { name: "bkld", kes: "鼻腔科" },
    { name: "科伦坡", kes: "外科" },
    { name: "冬瓜本", kes: "内科" },
    { name: "郭凯", kes: "儿科" },
    { name: "框框", kes: "妇产科" },
    { name: "九九", kes: "儿科" },
  ];
  for (let i = arr.length; i > 0; i--) {
    data.push({
      id: i,
      name: arr[i - 1].name,
      zcheng: "主治医生",
      code: "",
      rank: i,
      headimg: "",
      kes: arr[i - 1].kes,
      trywork: (
        <div className="w-[100px]">
          <span>
            <EditTwoTone />
            修改
          </span>
          <span className="ml-2">
            <DeleteOutlined />
            删除
          </span>
        </div>
      ),
    });
  }

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        style={{
          display: "flex",
        }}
      >
        <Form.Item name="note" label="专家名称" className="w-[250px] mr-5">
          <Input />
        </Form.Item>
        <Form.Item name="code" label="医生代码" className="w-[250px] mr-5">
          <Input />
        </Form.Item>
        <Form.Item name="gender" label="科室" className="w-[250px] mr-5">
          <Select placeholder="请选择" allowClear>
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
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
        <Addbtn />

        <div className="w-[100px] h[32px] flex justify-around">
          <div className="w-[30px] h-[30px]  rounded-[50%] border pt-1 pl-2">
            <SearchOutlined />
          </div>
          <div className="w-[30px] h-[30px]  rounded-[50%] border pt-1 pl-2">
            <RedoOutlined />
          </div>
        </div>
      </div>
      {/* 表格dataSource={dataSource} */}
      <div className="mt-2 ">
        <Table columns={columns} dataSource={data} bordered />
      </div>
    </>
  );
};
export default Doctor;
