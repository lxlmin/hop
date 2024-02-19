import { Select, Input, Button, DatePicker, Table } from "antd";
import {
  SearchOutlined,
  SyncOutlined,
  DeleteTwoTone,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import React, { useEffect } from "react";
import { order } from "@/service";
const { RangePicker } = DatePicker;
const columns = [
  {
    title: "微信订单号",
    dataIndex: "wcrder",
  },
  {
    title: "订单号",
    dataIndex: "order",
  },
  {
    title: "金额",
    dataIndex: "money",
  },
  {
    title: "订单类型",
    dataIndex: "ordertype",
  },
  {
    title: "会员id",
    dataIndex: "vipod",
  },
  {
    title: "时间",
    dataIndex: "times",
  },
  {
    title: "操作",
    dataIndex: "operate",
  },
];
const data = [
  {
    key: "1",
    wcrder: "423689042478925860",
    order: "1002467426",
    money: "15,00",
    ordertype: "挂号",
    vipod: "10230",
    times: "2022-04-24 13:22",
    operate: (
      <span className="text-[#1677ff]">
        <DeleteTwoTone />
        删除
      </span>
    ),
  },
];

const rowSelection = {
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    name: record.name,
  }),
};
const Payorder = () => {
  useEffect(() => {
    order()
      .then((res) => {
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {/* 表单部分 */}
      <div>
        <div className="h-[80px] w-[100%]  flex items-center">
          <div className="w-[300px] flex  items-center">
            <div>微信订单号</div>
            <Input className="ml-[5px] w-[200px]" />
          </div>
          <div className="w-[300px] flex  items-center">
            <div>订单号</div>
            <Input className="ml-[5px] w-[200px]" />
          </div>
          <div className="ml-[10px]">
            订单类型
            <Select
              defaultValue="请选择"
              className="ml-[10px] w-[200px]"
              options={[
                {
                  value: "挂号",
                  label: "挂号",
                },
                {
                  value: "停用",
                  label: "停用",
                },
              ]}
            />
          </div>
        </div>
        <div className="flex">
          <div>
            时间
            <RangePicker showTime className="ml-[5px]" />
          </div>
          <Button
            type="primary"
            className="ml-[20px] bg-blue-400"
            icon={<SearchOutlined />}
          >
            搜索
          </Button>
          <Button className="ml-[10px]" icon={<SyncOutlined />}>
            重置
          </Button>
        </div>
        <div className="mt-5 ml-[-18px]">
          <Button
            type="primary"
            className="ml-[20px] bg-red-200 text-red-500"
            icon={<VerticalAlignBottomOutlined />}
          >
            导出
          </Button>
        </div>
      </div>
      {/* 表格部分 */}
      <div>
        <Table
          rowSelection={{
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
        />
      </div>
    </>
  );
};

export default Payorder;
