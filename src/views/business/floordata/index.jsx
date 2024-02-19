import { Button, Table } from "antd";
import {
  DragOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { foordata } from "@/service";
//
import { useState, useEffect } from "react";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "建筑物名",
    dataIndex: "userid",
    key: "userid",
  },
  {
    title: "楼层",
    dataIndex: "ceng",
    key: "ceng",
  },
  {
    title: "创建时间",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "操作",
    dataIndex: "trywork",
    key: "trywork",
  },
];

const Floordata = () => {
  const [frool, setfrool] = useState([]);
  useEffect(() => {
    foordata()
      .then((res) => {
        console.log(res.data.data.result);
        setfrool(res.data.data.result);
      })
      .catch((err) => console.log(err));
  }, []);

  let data = [];
  for (let i = 0; i < frool.length; i++) {
    data.push({
      id: frool[i].id,
      userid: "门诊大楼",
      ceng: frool[i].building,
      time: frool[i].create_time,
      trywork: (
        <div className="w-[200px]  text-blue-500">
          <span>
            <EditOutlined />
            坐标数据
          </span>
          <span className="ml-2">
            <EditOutlined />
            编辑
          </span>
          <span className="ml-2">
            <DeleteOutlined />
            删除
          </span>
        </div>
      ),
    });
  }

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
      <div className="flex justify-between">
        <div>
          <Button
            type="primary"
            htmlType="submit"
            className=" bg-cyan-400 mr-3"
          >
            搜索
          </Button>
          <Button htmlType="button">重置</Button>
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

      <div className="mt-3 ">
        <Button className="mr-3 bg-cyan-100 text-cyan-400">
          <span className="mt-[-2px] mr-1">
            <DragOutlined />
          </span>
          新增
        </Button>
        <Button className="mr-3 bg-green-100 text-green-400">
          <span className="mt-[-2px] mr-1">
            <EditOutlined />
          </span>
          修改
        </Button>
        <Button className=" bg-red-100 text-red-400">
          <span className="mt-[-2px] mr-1">
            <DeleteOutlined />
          </span>
          删除
        </Button>
      </div>
      {/* table */}
      <div className="mt-2">
        <Table
          bordered
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
      </div>
    </>
  );
};

export default Floordata;
