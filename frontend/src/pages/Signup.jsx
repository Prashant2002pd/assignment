import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(data);
    axios.post("http://localhost:3000/api/v1/user/signup", data).then((res) => {
      if (res.status == 200) {
        localStorage.setItem("auth-token", res.data.token);
        navigate("/");
      }
    });
  }

  return (
    <div className="w-full h-screen bg-black text-white">
      <div className="px-10  flex flex-col items-center justify-center h-full w-full gap-6">
        <form onSubmit={handleSubmit} className=" flex flex-col gap-5 w-full">
          <div className=" flex items-center justify-center gap-3">
            <p className=" font-semibold text-xl ">Username:</p>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              className="text-black p-2  py-1 w-1/4 rounded-full shadow-white shadow-md border-none outline-none"
            />
          </div>
          <div className=" flex items-center justify-center gap-3">
            <p className=" font-semibold text-xl ">Email:</p>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="text-black p-2  py-1 w-1/4 rounded-full shadow-white shadow-md border-none outline-none"
            />
          </div>
          <div className=" flex items-center justify-center gap-3">
            <p className=" font-semibold text-xl ">Password:</p>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className=" text-black p-2 py-1 w-1/4 rounded-full shadow-white shadow-md border-none outline-none"
            />
          </div>
          <div>
            <button
              className=" bg-yellow-500 px-7 py-2 rounded-full font-bold shadow-lg hover:bg-yellow-600"
              type="submit"
            >
              Signup
            </button>
          </div>
        </form>
        <div>
          Already have an account?
          <button
            className=" text-blue-500 font-medium text-lg"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
