import React, { useState } from "react";
import { Button, Form, Input, Radio, Modal } from "antd";
import { EditTwoTone } from "@ant-design/icons";
import { eitconfig } from "@/service";
const { TextArea } = Input;
const Eitconfig = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 获取表单内容
  const onFinish = (values) => {
    console.log(1111);
    console.log(values.id);
    // 修改
    eitconfig({
      configId: props.id, //id
      configType: "N",
      configName: values.username,
      configKey: values.usertype,
      configValue: values.usertext,
    })
      .then((res) => {
        if (res.data.code !== 200) {
          alert(res.data.msg);
        } else {
          console.log(props.id);
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
    setIsModalOpen(false);
  };
  const colse = () => {
    setIsModalOpen(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <span onClick={showModal}>
        <EditTwoTone />
        修改
      </span>
      <Modal
        title="修改参数"
        footer={null}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{
            span: 4,
          }}
          onFinish={onFinish}
        >
          <Form.Item label="参数名称" name="username">
            <Input defaultValue={props.type} />
          </Form.Item>
          <Form.Item label="参数键名" name="usertype">
            <Input defaultValue={props.name} />
          </Form.Item>
          <Form.Item label="系统内置" name="userselect">
            <Radio.Group>
              <Radio value="是"> 是 </Radio>
              <Radio value="不是"> 不是 </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="备注" name="usertext">
            <TextArea rows={4} defaultValue={props.noties} />
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
export default Eitconfig;
