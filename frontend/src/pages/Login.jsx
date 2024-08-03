import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [data, setdata] = useState({
    username: "",
    password: "",
  });

  function handelChange(e) {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  }

  function handelSubmit(e) {
    e.preventDefault();
    console.log(data);
    axios.post("http://localhost:3000/api/v1/user/login", data).then((res) => {
      if (res.status == 200) {
        localStorage.setItem("auth-token", res.data.token);
        navigate("/");
      }
    });
  }

  return (
    <div className="w-full h-screen bg-black text-white">
      <div className="px-10  flex flex-col items-center justify-center h-full w-full gap-6">
        <form onSubmit={handelSubmit} className=" flex flex-col gap-5 w-full">
          <div className=" flex items-center justify-center gap-3">
            <p className=" font-semibold text-xl ">Username:</p>
            <input
              className="p-2 text-black w-1/4 rounded-full shadow-white shadow-md border-none outline-none"
              type="text"
              name="username"
              onChange={handelChange}
            />
          </div>

          <div className=" flex items-center justify-center gap-3">
            <p className=" font-semibold text-xl ">Password:</p>
            <input
              className="p-2 text-black w-1/4 rounded-full shadow-white shadow-md border-none outline-none"
              type="password"
              name="password"
              onChange={handelChange}
            />
          </div>
          <div>
            <button
              type="submit"
              className=" bg-yellow-500 px-7 py-2 rounded-full font-bold shadow-lg hover:bg-yellow-600"
            >
              Login
            </button>
          </div>
        </form>
        <div className=" mb-3">
          <div>
            do not have an account?
            <button
              className=" text-blue-500 font-medium text-lg"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Signup
            </button>
          </div>
          <div>
            Click here for adminlogin:{" "}
            <button
              className=" text-blue-500 font-medium text-lg"
              onClick={() => {
                navigate("/adminlogin");
              }}
            >
              Admin Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
