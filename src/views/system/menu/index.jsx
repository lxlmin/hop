import React, { useEffect, useState } from "react";
import { menu } from "@/service";
import { Button, Form, Input, Table, Select } from "antd";
import {
  RedoOutlined,
  SearchOutlined,
  EditOutlined,
  SwapOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
const columns = [
  {
    title: "菜单名称",
    dataIndex: "luname",
    key: "luname",
  },
  {
    title: "图标",
    dataIndex: "luicon",
    key: "luicon",
  },
  {
    title: "类型",
    dataIndex: "lutype",
    key: "lutype",
  },
  {
    title: "排序",
    dataIndex: "lurank",
    key: "lurank",
  },
  {
    title: "权限标识",
    dataIndex: "luprower",
    key: "luprower",
  },
  {
    title: "路由地址",
    dataIndex: "luadress",
    key: "luadress",
  },
  {
    title: "组件路径",
    dataIndex: "luconpath",
    key: "luconpath",
  },
  {
    title: "显示",
    dataIndex: "lushow",
    key: "lushow",
  },
  {
    title: "状态",
    dataIndex: "lustate",
    key: "lustate",
  },
  {
    title: "操作",
    dataIndex: "trywork",
    key: "trywork",
  },
];
const Menu = () => {
  const [munelist, setmunelist] = useState([]);
  console.log(munelist);
  useEffect(() => {
    menu()
      .then((res) => {
        console.log(res.data.data);
        setmunelist(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let data = [];
  for (let i = 0; i < munelist.length; i++) {
    if (munelist[i].component === null && munelist[i].parentId === 0) {
      data.push({
        luname: munelist[i].menuName,
        luicon: munelist[i].icon,
        lutype: (
          <div className=" bg-lime-100 text-center rounded-[5px] text-lime-600">
            目录
          </div>
        ),
        lurank: munelist[i].menuId,
        luprower: "",
        luadress: munelist[i].path,
        luconpath: munelist[i].component,
        lushow: (
          <div className=" bg-[#ccf7f2] text-center rounded-[5px] text-[#41c5b5]">
            正常
          </div>
        ),
        lustate: "正常",
        trywork: (
          <div className="flex justify-around cursor-pointer text-[#41c5b5]">
            <span>
              <PlusOutlined />
              修改
            </span>
            <span>
              <EditOutlined />
              新增
            </span>
            <span>
              <DeleteOutlined />
              删除
            </span>
          </div>
        ),
        children: [],
      });
    }
  }
  // const data = [
  //   {
  //     key: 1,
  //     luname: "John Brown sr.",
  //     luicon: 60,
  //     address: "New York No. 1 Lake Park",
  //     children: [
  //       {
  //         key: 11,
  //         luname: "John Brown",
  //         luicon: 42,
  //         address: "New York No. 2 Lake Park",
  //       },
  //     ],
  //   },
  // ];

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
        <Form.Item name="code" label="菜单名称" className="w-[250px] mr-5">
          <Input />
        </Form.Item>
        <Form.Item name="code" label="状态" className="w-[250px] mr-5">
          <Select>
            <Select.Option value="正常">正常</Select.Option>
            <Select.Option value="不正常">不正常</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item className="w-[250px]">
          <Button
            type="primary"
            htmlType="submit"
            className=" bg-blue-400 mr-3"
          >
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
        </Form.Item>
      </Form>
      {/* 按钮 */}
      <div className="flex justify-between">
        <div>
          <Button className="ml-2 bg-[#c0f7ef] text-[#3bb5a3]">
            <span>
              <PlusOutlined />
            </span>
            &nbsp;新增
          </Button>
          <Button className="ml-2 bg-[#f0f0f0]">
            <span>
              <EditOutlined />
            </span>
            &nbsp;修改排序
          </Button>
          <Button className="ml-2 bg-[#f0f0f0]">
            <span>
              <SwapOutlined />
            </span>
            &nbsp;展开折叠
          </Button>
        </div>

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
      <div className="mt-5 ">
        <Table columns={columns} dataSource={data} bordered />
      </div>
    </>
  );
};
export default Menu;
