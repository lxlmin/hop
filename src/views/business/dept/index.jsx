import React, { useEffect, useState } from "react";
import { dept } from "@/service";
import { Button, Form, Input, Space, Table } from "antd";
import {
  RedoOutlined,
  SearchOutlined,
  EditTwoTone,
  DeleteOutlined,
} from "@ant-design/icons";
import Addbtn from "@/component/comlist/add";
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: {
      compare: (a, b) => a.id - b.id,
      // multiple: 1,
    },
  },
  {
    title: "科室代码",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "科室名称",
    dataIndex: "name",
    key: "name",
  },

  {
    title: "科室位置",
    dataIndex: "adress",
    key: "adress",
  },
  {
    title: "排序ID",
    dataIndex: "rank",
    key: "rank",
  },
  {
    title: "科室类型",
    dataIndex: "kes",
    key: "kes",
  },
  {
    title: "操作",
    dataIndex: "trywork",
    key: "trywork",
  },
];
const Dept = () => {
  const [deptlist, setdeptlist] = useState([]);
  useEffect(() => {
    dept()
      .then((res) => {
        console.log(res.data.data.result);
        setdeptlist(res.data.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const data = [];
  for (let i = 0; i < deptlist.length; i++) {
    data.push({
      id: deptlist[i].id,
      name: deptlist[i].deptName,
      code: deptlist[i].deptCode,
      adress: deptlist[i].position,
      rank: deptlist[i].orderNum,
      kes: "普通",
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

  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
  };
  const onReset = () => {
    form.resetFields();
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
        <Form.Item name="code" label="科室代码" className="w-[250px] mr-5">
          <Input />
        </Form.Item>
        <Form.Item name="code" label="科室名称" className="w-[250px] mr-5">
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
        <Table
          columns={columns}
          dataSource={data}
          bordered
          // 自定义每页显示的数据条数
          pagination={{ pageSize: 7 }}
        />
      </div>
    </>
  );
};
export default Dept;
