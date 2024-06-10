import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

const Login = ({ isActive, toggleForm, onFinish }) => {
  return (
    <div
      className="start-module-transitioner vw100 vh100 position-absolute d-flex align-items-center"
      style={{ bottom: isActive ? "0" : "100vh" }}
    >
      <div className="start-module-wrapper d-flex align-items-center justify-content-center flex-column">
        <div className="introduction px-4 col-12 col-md-6 col-xl-4 mb-5 text-center">
          <h1 className="mb-5"> Example Name </h1>
          <h2> Log In right now! </h2>
          <p>
            {" "}
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet.
          </p>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <div className="d-flex justify-content-between align-items-center">
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button me-5"
              >
                Log in
              </Button>
              Or{" "}
              <div onClick={toggleForm} className="switch-start-type ps-1">
                {" "}
                register now!
              </div>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
