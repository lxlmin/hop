import React, { useState } from "react";
import { Button, Form, Input, Radio, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { addconfig } from "@/service";
const { TextArea } = Input;
const Addconfig = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 获取表单内容
  const onFinish = (values) => {
    addconfig({
      configType: "Y",
      configName: values.username,
      configKey: values.usertype,
      configValue: values.usertext,
    })
      .then((res) => {
        if (res.data.code !== 200) {
          alert(res.data.msg);
        } else {
          console.log(res.config.data);
        }
      })
      .catch((err) => console.log(err));
    setIsModalOpen(false);
  };
  // 点击打开对话框
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
        title="添加参数"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{
            span: 4,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="参数名称"
            name="username"
            rules={[
              {
                required: true,
                message: "参数名称必填!",
              },
            ]}
          >
            <Input placeholder="请输入参数名称" />
          </Form.Item>
          <Form.Item
            label="参数键名"
            name="usertype"
            rules={[
              {
                required: true,
                message: "参数键名必填!",
              },
            ]}
          >
            <Input placeholder="请输入参数键名" />
          </Form.Item>
          <Form.Item
            label="系统内置"
            name="userselect"
            rules={[
              {
                required: true,
                message: "必填!",
              },
            ]}
          >
            <Radio.Group>
              <Radio value="是"> 是 </Radio>
              <Radio value="不是"> 不是 </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="备注"
            name="usertext"
            rules={[
              {
                required: true,
                message: "必填!",
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
export default Addconfig;
