import { Input, Space, Form, Select, Button, DatePicker, Table } from "antd";
import {
  EditTwoTone,
  DeleteTwoTone,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { dictionary, delnary } from "@/service";
import Addzidian from "@/component/comlist/addzidian";
import Eidzidian from "@/component/comlist/eidzidian";
const { Option } = Select;
const { RangePicker } = DatePicker;
//表格
const columns = [
  {
    title: "字典编号",
    dataIndex: "code",
  },
  {
    title: "字典类型",
    dataIndex: "type",
  },
  {
    title: "字典名称",
    dataIndex: "name",
  },
  {
    title: "状态",
    dataIndex: "state",
  },
  {
    title: "备注",
    dataIndex: "noties",
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
const Dict = () => {
  const [list, setlist] = useState([]);
  useEffect(() => {
    dictionary()
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
    const delnarylist = () => {
      console.log(list[i].dictCode);
      delnary(list[i].dictCode)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    data.push({
      code: list[i].dictCode,
      type: list[i].dictType,
      name: list[i].dictLabel,
      state: list[i].status,
      noties: list[i].remark,
      time: list[i].createTime,
      trywork: (
        <div className="flex justify-around cursor-pointer text-[#1677ff]">
          <Eidzidian
            dictCode={list[i].dictCode}
            type={list[i].dictType}
            name={list[i].dictLabel}
            noties={list[i].remark}
          />
          <span onClick={delnarylist}>
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
        <Form.Item name="note" label="字典名称" className="w-[200px]">
          <Input placeholder="请输入字典名称" />
        </Form.Item>
        <Form.Item name="pho" label="字典类型" className="w-[200px] ml-5">
          <Input placeholder="请输入字典类型" />
        </Form.Item>
        <Form.Item name="gender" label="状态" className="w-[200px] ml-5">
          <Select placeholder="字典类型状态" allowClear>
            <Option value="正常">正常</Option>
            <Option value="不正常">不正常</Option>
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
          <Addzidian />
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
        />
      </div>
    </>
  );
};

export default Dict;
