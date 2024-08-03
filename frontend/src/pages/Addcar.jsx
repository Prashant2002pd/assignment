import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const token = localStorage.getItem("auth-token");
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    year: "",
    price: "",
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

    axios
      .post("http://localhost:3000/api/v1/create", data, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.status);

        if (res.status == 201) {
          navigate("/");
        }
      });
  }

  return (
    <div className="w-full h-screen bg-black text-white">
      <div className="px-10  flex flex-col items-center justify-center h-full w-full gap-6">
        <form onSubmit={handleSubmit} className=" flex flex-col gap-5 w-full">
          <div className=" flex items-center justify-center gap-3">
            <p className=" font-semibold text-xl ">Car name:</p>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="text-black p-2  py-1 w-1/4 rounded-full shadow-white shadow-md border-none outline-none"
            />
          </div>
          <div className=" flex items-center justify-center gap-3">
            <p className=" font-semibold text-xl ">Year:</p>
            <input
              type="number"
              name="year"
              onChange={handleChange}
              className="text-black p-2  py-1 w-1/4 rounded-full shadow-white shadow-md border-none outline-none"
            />
          </div>
          <div className=" flex items-center justify-center gap-3">
            <p className=" font-semibold text-xl ">Price:</p>
            <input
              type="number"
              name="price"
              onChange={handleChange}
              className=" text-black p-2 py-1 w-1/4 rounded-full shadow-white shadow-md border-none outline-none"
            />
          </div>
          <div>
            <button
              className=" bg-yellow-500 px-7 py-2 rounded-full font-bold shadow-lg hover:bg-yellow-600"
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
