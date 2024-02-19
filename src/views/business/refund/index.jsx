import React, { useEffect } from "react";
import { Input, Select, Button } from "antd";
import { SearchOutlined, SyncOutlined } from "@ant-design/icons";
import { getRole } from "@/service";
const Refund = () => {
  const options = [
    {
      value: "在线",
      label: "在线",
    },
    {
      value: "离线",
      label: "离线",
    },
    {
      value: "隐身",
      label: "隐身",
    },
    {
      value: "忙",
      label: "忙",
      disabled: true,
    },
  ];
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  useEffect(() => {
    getRole({
      // key: res.data.roleSort,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err)); // 调用接口获取角色列表
  }, []);
  return (
    <>
      {/* 头部表单 */}
      <div className="flex flex-1 items-center justify-start">
        <div className="flex items-center w-[300px]">
          <label htmlFor="menuName" className="w-[10vw] ">
            微信订单号
          </label>
          <Input
            style={{
              width: "160px",
              marginLeft: "-4vw",
            }}
            placeholder="请输入微信订单号"
            allowClear
            id="menuName"
          />
        </div>
        <div className="flex items-center w-[260px]">
          <label htmlFor="menuName1" className="w-[10vw] ">
            订单号
          </label>
          <Input
            style={{
              width: "160px",
              marginLeft: "-6vw",
            }}
            placeholder="请输入订单号"
            allowClear
            id="menuName1"
          />
        </div>

        <div className="flex ml-5 items-center w-[280px]">
          <label htmlFor="menuzhuang" className="w-[6vw]">
            订单类型
          </label>

          <Select
            defaultValue="请选择"
            style={{
              width: "160px",
              marginLeft: "-1vw",
            }}
            onChange={handleChange}
            options={options}
            id="menuzhuang"
          />
        </div>
      </div>
      {/* 按钮 */}
      <div className="flex mt-5">
        <Button
          type="primary"
          className=" bg-blue-400 mr-4"
          icon={<SearchOutlined />}
        >
          搜索
        </Button>
        <Button icon={<SyncOutlined />}>重置</Button>
      </div>
    </>
  );
};

export default Refund;
