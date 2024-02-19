import React, { useState } from "react";
import { Button, Form, Input, Radio, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { addnary } from "@/service";
const { TextArea } = Input;
const Addzidian = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  // 关闭对话框
  const colse = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // 添加
  const onFinish = (value) => {
    //添加字典
    addnary({
      dictCode: 0,
      dictSort: 0,
      isDefault: "N",
      status: "0",
      dictLabel: value.username,
      dictType: value.usertype,
      remark: value.userstate,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsModalOpen(false);
  };
  return (
    <>
      <Button
        className="mr-3 bg-cyan-100 text-cyan-600"
        icon={<PlusOutlined />}
        onClick={showModal}
      >
        新增
      </Button>
      <Modal
        title="添加字典类型"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          onFinish={onFinish}
          name="basic"
          labelCol={{
            span: 4,
          }}
        >
          <Form.Item
            label="字典名称"
            name="username"
            rules={[
              {
                required: true,
                message: "字典名称必填!",
              },
            ]}
          >
            <Input placeholder="请输入字典名称" />
          </Form.Item>
          <Form.Item
            label="字典类型"
            name="usertype"
            rules={[
              {
                required: true,
                message: "字典类型必填!",
              },
            ]}
          >
            <Input placeholder="请输入字典类型" />
          </Form.Item>
          <Form.Item
            label="状态"
            name="userstate"
            rules={[
              {
                required: true,
                message: "字典类型必填!",
              },
            ]}
          >
            <Radio.Group>
              <Radio value="正常"> 正常 </Radio>
              <Radio value="停用"> 停用 </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="备注"
            name="usernotes"
            rules={[
              {
                required: true,
                message: "字典类型必填!",
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 16,
            }}
          >
            <Button type="primary" className=" bg-blue-300" htmlType="submit">
              确定
            </Button>
            <Button
              className=" bg-red-200 ml-3"
              htmlType="button"
              onClick={colse}
            >
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default Addzidian;
