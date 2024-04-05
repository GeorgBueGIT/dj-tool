// import './App.css';

function Login() {
  return (
    <div className="Login container">
      <form className="row">
        <div className="col-lg-6 offset-lg-3 col-10">

          <div className="d-flex justify-content-between pb-3">
            <label className=""> Username</label>
            <input className="" type="text" name="username" />
          </div>

          <div className="d-flex justify-content-between pb-3">
            <label className=""> Password </label>
            <input className="" type="text" name="username" />
          </div>
          <input className="" type="submit" value="Login" />
          </div>
      </form>
    </div>
  );
}

export default Login;
