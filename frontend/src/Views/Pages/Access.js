import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";
import Alert from "../Components/Alert"

export default function Start() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const onFinishLogin = async (values) => {
    console.log("Received values of form: ", values);

    const { username, password } = values;
    const response = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    
    await response.json();

    if (response.status === 200) {
      navigate("/Dashboard");
    }
    if (response.status === 401) {
      console.log("Invalid credentials received");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  const onFinishRegister = async (values) => {
    console.log("Received values of form: ", values);

    const { username, password } = values;
    const response = await fetch("http://localhost:3001/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    
    await response.json();

    if (response.status === 200) {
      navigate("/Dashboard");
    }
    if (response.status === 401) {
      console.log("Not Valid Credentials!");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };
  
  
  // useEffect(() => {
  //   fetch('http://localhost:3001/api/data')
  //     .then((response) => response.json())
  //     .then((data) => setData(data.message));
  // }, []);

  return (
    <div
      className="position-relative d-flex justify-content-center"
      id="login-page"
    >
      <Alert showAlert={showAlert} msg={'Invalid Credentials!'} />

      <Login isActive={isLogin} toggleForm={toggleForm} onFinish={onFinishLogin} />
      <Register
        isActive={!isLogin}
        toggleForm={toggleForm}
        onFinish={onFinishRegister}
      />
    </div>
  );
}