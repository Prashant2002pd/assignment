import { useContext } from "react";
import UserContext from "../context/Usercontext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  function handleClick(e) {
    e.preventDefault();
    setUser({});
    localStorage.removeItem("auth-token");
  }

  return (
    <nav className=" bg-black text-white flex items-center justify-between w-full h-[10vh]">
      <div className=" flex px-12 items-center justify-between w-full h-full">
        <div className=" text-xl font-bold">{user.username}</div>
        <div className="flex items-center justify-between gap-6">
          {user.role == "admin" ? (
            <div
              onClick={() => {
                navigate("/addcar");
              }}
              className=" px-5 py-1 rounded-full bg-yellow-500 text-lg font-medium hover:bg-yellow-600"
            >
              Add Car
            </div>
          ) : (
            ""
          )}
          <div className="">
            <button
              onClick={handleClick}
              className="px-5 py-1 rounded-full bg-red-500 text-lg font-medium  hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
