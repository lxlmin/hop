import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Bgparticle from "./Bgparticle";
import { Logines, getRouters } from "@/service";
import { useCallback, useContext, useState } from "react";
import Captcha from "react-captcha-code";
import dynamicRoutes from "@/router/routes.dynamic";
import { RoutesContext } from "@/router/index";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [mycapt, setmycapt] = useState(null);
  const navigate = useNavigate();
  const [, setRoutes] = useContext(RoutesContext);
  const handleClick = useCallback((captcha) => {
    console.log("captcha:", captcha);
    setmycapt(captcha);
  }, []);
  const onFinish = (values) => {
    Logines({ username: values.username, password: values.password })
      .then((res) => {
        if (res.data.code !== 200) {
          alert(res.data.msg);
        } else if (mycapt !== values.yanzm) {
          alert("验证码错误");
        } else {
          localStorage.setItem("Token", res.data.data);
          setRoutes(dynamicRoutes());
          navigate("/system/user");
          getRouters()
            .then((reses) => {
              // console.log(reses.data.data);
              localStorage.setItem("Layout", JSON.stringify(reses.data.data));
            })
            .catch((erres) => console.log(erres));
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center bg-[url('https://pe.xzzl120.com/admin/static/img/bg.3d9a89e4.jpg')]">
      {/* 引入粒子 */}
      <Bgparticle></Bgparticle>
      <Form
        initialValues={{ remember: true }}
        className="w-[350px] h-[360px] bg-white rounded-[10px] p-[15px]"
        onFinish={onFinish}
      >
        <Form.Item>
          <h3 className="text-[#707070] text-[18px] font-black text-center border-none">
            西藏阜康肿瘤医院 管理系统
          </h3>
        </Form.Item>

        <Form.Item
          name="username"
          rules={[{ required: true, message: "账号" }]}
        >
          <Input size="large" placeholder="账号" prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "密码" }]}
        >
          <Input.Password
            size="large"
            placeholder="密码"
            prefix={<LockOutlined />}
          />
        </Form.Item>
        <Form.Item
          name="yanzm"
          rules={[{ required: true, message: "请输入验证码" }]}
        >
          <div className="flex w-[100%] justify-between">
            <Input className="w-[190px]" />
            <Captcha charNum={4} onChange={handleClick} />
          </div>
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>记住密码</Checkbox>
        </Form.Item>

        <Form.Item>
          <br />
          <Button
            type="primary"
            htmlType="submit"
            className="w-[100%] bg-[#1677ff]"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
