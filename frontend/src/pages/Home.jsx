import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/Usercontext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const token = localStorage.getItem("auth-token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    axios
      .get("https://assignment-backend-sooty.vercel.app//api/v1/getuser", {
        headers: {
          Authorization: token,
        },
      })
      .then((data) => {
        setUser(data.data.user);
      });
    axios
      .get("https://assignment-backend-sooty.vercel.app//api/v1/getcar", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [data]);

  function handleDelete(id) {
    axios
      .delete(
        `https://assignment-backend-sooty.vercel.app//api/v1/deletecar/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        if (res.status == 200) {
        }
      });
  }

  return (
    <>
      <Navbar />

      <div className=" flex items-center min-h-[90vh] w-full px-12 bg-gray-900 flex-col">
        <h1 className=" text-white font-bold text-xl py-5 ">Home</h1>
        <div className=" flex items-center h-full justify-between flex-wrap w-full">
          {data.map((item, key) => {
            return (
              <div
                key={key}
                className=" flex items-center justify-start flex-col gap-3 h-[300px] w-[250px] bg-white shadow-lg rounded-md"
              >
                <h1 className=" text-2xl font-bold">{item.name}</h1>
                <div className=" w-full px-5 flex items-center justify-between">
                  <h1>Year: {item.year}</h1>
                  <h1 className=" text-lg font-semibold text-green-500">
                    $ {item.price}
                  </h1>
                </div>
                {user.role == "admin" ? (
                  <div className=" flex w-full flex-col gap-2 ">
                    <button className=" bg-blue-500">update</button>
                    <button
                      className=" bg-red-500"
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                    >
                      delete
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
