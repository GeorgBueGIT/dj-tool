import React, { useState } from "react";
import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";
import Alert from "../Components/Alert"
import { useAuth } from "../../Auth/AuthProvider";

export default function Start() {
  const [isLogin, setIsLogin] = useState(true);

  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [showRegisterAlert, setShowRegisterAlert] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const auth = useAuth();

  const triggerLoginAlert = () => {
    setShowLoginAlert(true);
    setTimeout(() => {
      setShowLoginAlert(false);
    }, 3000);
  }
  
  const onFinishLogin = async (values) => {
    const { username, password } = values;
    auth.loginAction(username, password, triggerLoginAlert);
  };



  const onFinishRegister = async (values) => {
    // console.log("Received values of form: ", values);
    const { username, password } = values;
    const response = await fetch("http://localhost:3001/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    
    const res = await response.json();
    console.log(res);

    if (response.status === 200) {
      setIsLogin(true);
    }
    if (response.status === 500) {
      setShowRegisterAlert(true);
      setTimeout(() => {
        setShowRegisterAlert(false);
      }, 3000);
    }
  };

  return (
    <div
      className="position-relative d-flex justify-content-center"
      id="login-page"
    >
      <Alert showAlert={showLoginAlert} msg={'Invalid Credentials!'} />
      <Alert showAlert={showRegisterAlert} msg={'Username already taken!'} />

      <Login isActive={isLogin} toggleForm={toggleForm} onFinish={onFinishLogin} />
      <Register
        isActive={!isLogin}
        toggleForm={toggleForm}
        onFinish={onFinishRegister}
      />
    </div>
  );
}