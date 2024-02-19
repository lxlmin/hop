import React, { useState } from "react";
import { Button, Modal, Form, Input, InputNumber, Select, Upload } from "antd";
import { DragOutlined, PlusOutlined } from "@ant-design/icons";
const Addbtn = () => {
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
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <>
      <Button className=" bg-blue-200 text-blue-500" onClick={showModal}>
        <span>
          <DragOutlined />
        </span>
        添加
      </Button>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        closable={false}
        okType="default"
        onCancel={handleCancel}
      >
        <Form
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 18,
          }}
        >
          <Form.Item
            label="专家名称"
            rules={[
              {
                required: true,
                message: "请输入专家名称!",
              },
            ]}
          >
            <Input placeholder="请输入专家名称" />
          </Form.Item>
          <Form.Item label="职称">
            <Input placeholder="请输入职称" />
          </Form.Item>
          <Form.Item label="医生代码">
            <Input placeholder="请输入医生代码" />
          </Form.Item>
          <Form.Item label="擅长">
            <Input placeholder="请输入擅长" />
          </Form.Item>
          <Form.Item label="排序ID">
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload action="/upload.do" listType="picture-card">
              <button
                style={{
                  border: 0,
                  background: "none",
                }}
                type="button"
              >
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </button>
            </Upload>
          </Form.Item>
          {/*  */}

          <Form.Item
            label="科室"
            className="w-[50%] ml-12"
            rules={[
              {
                required: true,
                message: "请输入专家名称!",
              },
            ]}
          >
            <Select placeholder="请选择">
              <Select.Option value="内科">内科</Select.Option>
              <Select.Option value="外科">外科</Select.Option>
              <Select.Option value="儿科">儿科</Select.Option>
              <Select.Option value="神经科">神经科</Select.Option>
              <Select.Option value="妇产科">妇产科</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default Addbtn;
