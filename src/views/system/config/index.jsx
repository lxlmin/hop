import { Input, Space, Form, Select, Button, DatePicker, Table } from "antd";
import {
  EditTwoTone,
  DeleteTwoTone,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { config, delconfig } from "@/service";
import Addconfig from "@/component/comlist/addconfig";
import Eitconfig from "@/component/comlist/eitconfig";
const { Option } = Select;
const { RangePicker } = DatePicker;
//表格
const columns = [
  {
    title: "参数主键",
    dataIndex: "code",
    width: 90,
  },
  {
    title: "参数名称",
    dataIndex: "name",
    ellipsis: true,
  },
  {
    title: "参数键名",
    dataIndex: "keyname",
  },
  {
    title: "参数键值",
    dataIndex: "keyvalue",
  },
  {
    title: "系统内置",
    dataIndex: "builtin",
    width: 90,
  },
  {
    title: "备注",
    dataIndex: "noties",
    ellipsis: true,
  },
  {
    title: "创建时间",
    dataIndex: "time",
    width: 160,
  },
  {
    title: "操作",
    dataIndex: "trywork",
  },
];
const Config = () => {
  const [list, setlist] = useState([]);
  useEffect(() => {
    config()
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
    // 点击删除
    const dellist = () => {
      delconfig(list[i].configId)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    data.push({
      code: list[i].configId,
      name: list[i].configName,
      keyname: list[i].configKey,
      keyvalue: list[i].configValue,
      builtin: (
        <div className="w-[30px] h-[30px] bg-cyan-100 leading-7 text-center border rounded-[5px]">
          是
        </div>
      ),
      noties: list[i].remark,
      time: list[i].createTime,
      trywork: (
        <div className="flex justify-around cursor-pointer text-[#1677ff]">
          <Eitconfig
            id={list[i].configId}
            type={list[i].configName}
            name={list[i].configKey}
            noties={list[i].remark}
          />
          <span onClick={dellist}>
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
        <Form.Item name="note" label="参数名称" className="w-[200px]">
          <Input placeholder="请输入参数名称" />
        </Form.Item>
        <Form.Item name="pho" label="参数键名" className="w-[200px] ml-5">
          <Input placeholder="请输入参数键名" />
        </Form.Item>
        <Form.Item name="gender" label="系统内置" className="w-[200px] ml-5">
          <Select placeholder="系统内置" allowClear>
            <Option value="是">是</Option>
            <Option value="不是">不是</Option>
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

export default Config;
