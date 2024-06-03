import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input} from 'antd';
import HeaderMinimal from '../Partials/HeaderMinimal';
import LoginWallpaper from '../../resources/Wallpapers/Login-Wallpaper.jpg';
import { BrowserRouter as Router, Link, useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    navigate('/Home');
  };
  return (
    <div className='login d-flex justify-content-center align-items-center flex-column'>
     <img className="position-fixed wallpaper" src={LoginWallpaper} alt="Wallpaper" />
    <HeaderMinimal/>
    <div className='introduction px-4 col-12 col-md-6 mb-5 text-center'>
      <h2> Log In right now! </h2>
      <p> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
        sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, 
        sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. 
        Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 
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
            message: 'Please input your Username!',
          },
        ]}
      > 
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
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
        <div className='d-flex justify-content-between align-items-center'>
        <Button type="primary" htmlType="submit" className="login-form-button me-5">
          Log in
        </Button>
         Or <a href='/Register' className='ps-1'> register now!</a>
        </div>
      </Form.Item>
    </Form>
    </div>
  );
};
export default Login;

