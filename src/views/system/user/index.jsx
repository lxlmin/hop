import {
  Input,
  Space,
  Form,
  Select,
  Button,
  DatePicker,
  Tabs,
  Table,
  Collapse,
} from "antd";
import { sysUser } from "@/service";
import { useState, useEffect } from "react";
import { EditTwoTone, DeleteOutlined, RedoOutlined } from "@ant-design/icons";
const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const onSearch = (value, _e, info) => console.log(info?.source, value);
// 表格列标题的配置描述
const columns = [
  {
    title: "用户编号",
    dataIndex: "nameNumber",
    key: "nameNumber",
  },
  {
    title: "用户名称",
    dataIndex: "userName",
    key: "userName",
  },
  {
    title: "用户昵称",
    dataIndex: "smallName",
    key: "smallName",
  },
  {
    title: "头像",
    dataIndex: "headimg",
    key: "headimg",
  },
  {
    title: "部门",
    dataIndex: "buMen",
    key: "buMen",
  },
  {
    title: "手机号码",
    dataIndex: "pho",
    key: "pho",
  },
  {
    title: "用户状态",
    dataIndex: "userState",
    key: "userState",
  },
  {
    title: "创建时间",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "操作",
    dataIndex: "operate",
    key: "operate",
  },
];

//
const User = () => {
  let [userlist, setuserlist] = useState([]);
  const getFund = () => {
    sysUser()
      .then((res) => {
        console.log(res);
        setuserlist(res.data.data.result);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getFund();
  }, []);

  const data = [];
  for (let i = 0; i < userlist.length; i++) {
    data.push({
      nameNumber: `${userlist[i].userId}`,
      userName: `${userlist[i].userName}`,
      smallName: `${userlist[i].createBy}`,
      headimg: <img src={userlist[i].avatar} alt="头像" />,
      buMen: `${userlist[i].deptName}`,
      pho: `${userlist[i].phonenumber}`,
      userState: `${userlist[i].status}`,
      time: `${userlist[i].updateTime}`,
      operate: (
        <div className="w-[100px]">
          <span>
            <EditTwoTone />
            修改
          </span>
          <span className="ml-2">
            <DeleteOutlined />
            删除
          </span>
          <span className="ml-5">
            <RedoOutlined />
            重置
          </span>
        </div>
      ),
    });
  }

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
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

  //
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "财务部",
      children: (
        <div>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
          />
        </div>
      ),
    },
    {
      key: "2",
      label: "收费室",
      children: (
        <div>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
          />
        </div>
      ),
    },
    {
      key: "3",
      label: "信息科",
      children: (
        <div>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
          />
        </div>
      ),
    },
  ];
  const items1 = [
    {
      key: "11",
      label: "总院",
      children: (
        <div>
          <Tabs
            tabPosition="left"
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
          />
        </div>
      ),
    },
  ];
  //
  return (
    <>
      <div className="flex">
        <div>
          <Space direction="vertical" />
          <Search
            placeholder="请输入部门名称"
            onSearch={onSearch}
            style={{
              width: 200,
            }}
          />
        </div>
        <Form
          form={form}
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <Form.Item name="note" label="用户名称" className="w-[200px] ml-10 ">
            <Input placeholder="请输入用户名称" />
          </Form.Item>
          <Form.Item name="pho" label="手机号码" className="w-[200px] ml-5">
            <Input placeholder="请输入手机号码" />
          </Form.Item>
          <Form.Item name="gender" label="状态" className="w-[200px] ml-5">
            <Select placeholder="用户状态" allowClear>
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

          <Form.Item className="ml-5 w-[50%]">
            <Space>
              <Button type="primary" htmlType="submit" className=" bg-cyan-400">
                搜索
              </Button>
              <Button htmlType="button" onClick={onReset}>
                重置
              </Button>
            </Space>
          </Form.Item>
          <Form.Item className="ml-10">
            <Button className="mr-3 bg-cyan-100 text-cyan-400">新增</Button>
            <Button className="mr-3 bg-green-100 text-green-400">修改</Button>
            <Button className=" bg-red-100 text-red-400">删除</Button>
          </Form.Item>
        </Form>
      </div>
      {/* 折叠面板 */}
      <div>
        <Collapse defaultActiveKey={["11"]} items={items1} bordered={false} />
      </div>
    </>
  );
};

export default User;
