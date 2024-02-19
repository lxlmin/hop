import React, { useState } from "react";
import { Form, Input, Radio, Modal, Button } from "antd";
import { EditTwoTone } from "@ant-design/icons";
import { eitnary } from "@/service";
const { TextArea } = Input;
const Eidzidian = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // 获取表单内容
  const onFinish = (value) => {
    // 修改
    eitnary({
      dictCode: props.dictCode,
      dictSort: 0,
      isDefault: "N",
      status: "0",
      dictLabel: value.username,
      dictType: value.usertype,
      remark: value.usernotes,
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
  return (
    <>
      <span onClick={showModal}>
        <EditTwoTone />
        修改
      </span>
      <Modal
        title="修改字典类型"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          onFinish={onFinish}
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
            <Input defaultValue={props.name} />
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
            <Input defaultValue={props.type} />
          </Form.Item>
          <Form.Item label="状态">
            <Radio.Group>
              <Radio value="正常"> 正常 </Radio>
              <Radio value="停用"> 停用 </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="备注" name="usernotes">
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
export default Eidzidian;
