import { Input, Space, Form, Select, Button, DatePicker, Table } from "antd";
import {
  EditTwoTone,
  DeleteTwoTone,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { postwork } from "@/service";
import Addconfig from "@/component/comlist/addconfig";
import Eitconfig from "@/component/comlist/eitconfig";
const { Option } = Select;
const { RangePicker } = DatePicker;
//表格
const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "岗位职称",
    dataIndex: "keyname",
  },
  {
    title: "岗位code",
    dataIndex: "keyvalue",
  },
  {
    title: "岗位状态",
    dataIndex: "state",
  },

  {
    title: "创建时间",
    dataIndex: "time",
  },
  {
    title: "操作",
    dataIndex: "trywork",
  },
];
const Post = () => {
  const [list, setlist] = useState([]);
  useEffect(() => {
    postwork()
      .then((res) => {
        console.log(res.data.data.result);
        setlist(res.data.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const data = [];
  //
  for (let i = 0; i < list.length; i++) {
    data.push({
      id: list[i].postId,
      name: list[i].createBy,
      keyname: list[i].postName,
      keyvalue: list[i].postCode,
      state: (
        <div className="w-[60px] h-[30px] bg-cyan-100 leading-7 text-center border rounded-[5px]">
          在岗
        </div>
      ),
      time: list[i].createTime,
      trywork: (
        <div className="flex justify-around cursor-pointer text-[#1677ff]">
          <Eitconfig
            type={list[i].configName}
            name={list[i].configKey}
            noties={list[i].remark}
          />
          <span>
            <DeleteTwoTone />
            删除
          </span>
        </div>
      ),
    });
  }

  //表格
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  //
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <Form
        form={form}
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <Form.Item name="note" label="岗位名称" className="w-[200px]">
          <Input placeholder="请输入岗位名称" />
        </Form.Item>
        <Form.Item name="pho" label="岗位工号" className="w-[200px] ml-5">
          <Input placeholder="请输入岗位工号" />
        </Form.Item>
        <Form.Item name="gender" label="工作状态" className="w-[200px] ml-5">
          <Select placeholder="选择工作状态" allowClear>
            <Option value="在岗">在岗</Option>
            <Option value="缺岗">缺岗</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="创建时间"
          name="RangePicker"
          className="ml-10 w-[250px]"
        >
          <RangePicker />
        </Form.Item>

        <Form.Item className="w-[100%]">
          <Space>
            <Button
              htmlType="submit"
              icon={<SearchOutlined />}
              className=" bg-blue-200"
            >
              搜索
            </Button>
            <Button htmlType="button" icon={<SyncOutlined />} onClick={onReset}>
              重置
            </Button>
          </Space>
        </Form.Item>
        {/* 按钮 */}
        <Form.Item>
          <Addconfig />
          <Button
            className="mr-3 bg-green-100 text-green-600"
            icon={<EditTwoTone twoToneColor="green" />}
          >
            修改
          </Button>
          <Button
            className=" bg-red-100 text-red-600"
            icon={<DeleteTwoTone twoToneColor="red" />}
          >
            删除
          </Button>
        </Form.Item>
      </Form>
      {/* table */}
      <div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          className=" text-center"
        />
      </div>
    </>
  );
};

export default Post;
