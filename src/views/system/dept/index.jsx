import { systemDept } from "@/service";
import { Table, Select, Input, Button, Modal, InputNumber } from "antd";
import { useState, useEffect } from "react";
import {
  EditTwoTone,
  PlusOutlined,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
const columns = [
  {
    title: "部门名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "负责人",
    dataIndex: "headpeop",
    key: "headpeop",
  },
  {
    title: "排序",
    dataIndex: "sort",
    key: "sort",
  },
  {
    title: "状态",
    dataIndex: "state",
    key: "state",
  },
  {
    title: "创建时间",
    dataIndex: "Creationtime",
    key: "Creationtime",
  },
  {
    title: "操作",
    dataIndex: "operate",
    key: "operate",
  },
];

const Dept = () => {
  let [data, changes] = useState([]);
  const treeData = (arr) => {
    let data = [];
    let child = [];
    for (let i = 4; i < 11; i++) {
      child.push({
        key: i + 1,
        name: arr[i].deptName,
        headpeop: arr[i].leader,
        sort: arr[i].orderNum,
        state: "444",
        Creationtime: arr[i].createTime,
        operate: "666",
      });
    }
    data.push({
      name: arr[0].deptName,
      headpeop: arr[0].leader,
      sort: arr[0].orderNum,
      state: "444",
      Creationtime: arr[0].createTime,
      operate: (
        <div>
          <span>
            <EditTwoTone />
            修改
          </span>
          <span>
            <PlusOutlined />
            新增
          </span>
        </div>
      ),
      children: child,
    });
    return data;
  };
  // const items = treeData();
  const getFund = () => {
    systemDept()
      .then((res) => {
        changes(treeData(res.data.data));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getFund();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div>
        <div className="h-[80px] w-[100%]  flex items-center">
          <div className="w-[240px] flex justify-between items-center">
            <div>部门名称</div>
            <Input
              placeholder="请输入部门名称"
              className="ml-[5px] w-[170px]"
            />
          </div>
          <div className="ml-[10px]">
            状态
            <Select
              defaultValue="部门状态"
              className="ml-[10px]"
              options={[
                {
                  value: "正常",
                  label: "正常",
                },
                {
                  value: "停用",
                  label: "停用",
                },
              ]}
            />
          </div>
          <Button
            type="primary"
            className="ml-[10px] bg-blue-400"
            icon={<SearchOutlined />}
          >
            搜索
          </Button>
          <Button className="ml-[10px]" icon={<SyncOutlined />}>
            重置
          </Button>
        </div>
        <div>
          <Button
            type="primary"
            className="ml-[10px] bg-blue-400"
            icon={<PlusOutlined />}
            onClick={showModal}
          >
            新增
          </Button>
        </div>
        <Modal
          title="添加部门"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          cancelText="取消"
          okText="确定"
        >
          <div className="w-[100%] ">
            <div className=" w-[100%] flex items-center">
              上级部门
              <Select
                defaultValue="选择上级部门"
                className="ml-[10px] w-[400px]"
                options={[]}
              />
            </div>
            <div className="flex items-center mt-[10px]">
              <div className="w-[220px] flex justify-between items-center">
                <div>部门名称</div>
                <Input
                  placeholder="请输入部门名称"
                  className="ml-[5px] w-[150px]"
                />
              </div>
              <div className="w-[220px] ml-[10px] flex justify-between items-center">
                <div>显示排序</div>
                <InputNumber
                  min={1}
                  defaultValue={1}
                  className="ml-[5px] w-[150px]"
                />
              </div>
            </div>
            <div className="flex items-center mt-[10px]">
              <div className="w-[220px] flex justify-between items-center">
                <div>负责人</div>
                <Input
                  placeholder="请输入负责人"
                  className="ml-[5px] w-[150px]"
                />
              </div>
              <div className="w-[220px] ml-[10px] flex justify-between items-center">
                <div>联系电话</div>
                <Input
                  placeholder="请输入联系电话"
                  className="ml-[5px] w-[150px]"
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
      <Table columns={columns} dataSource={data} className="mt-[20px]" />
    </>
  );
};

export default Dept;
