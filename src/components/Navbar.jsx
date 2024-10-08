import React, { useEffect, useState } from "react";
import { CiLogin } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { PiLinktreeLogoBold } from "react-icons/pi";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  let user = useSelector((state) => state.user?.name);

  if(!user){
    user = localStorage.getItem("loggedInUserName")
  }

  useEffect(() => {
    console.log(user);
    if (user) setIsAuthenticated(true);
    else setIsAuthenticated(false);
  }, [user]);

  return (
    <>
      <div className="w-full h-14 flex justify-around text-center px-4">
        <div className="flex gap-0.5 sm:gap-0">
          <h1 className="pt-3 text-3xl text-[#144ee3] md:pt-4">
            <PiLinktreeLogoBold />
          </h1>
          <h1 className="w-full text-left text-3xl font-mono pt-3 text-[#144ee3] font-semibold sm:pl-3 md:text-4xl">
            Reducer
          </h1>
        </div>
        {isAuthenticated ? (
          <div className="flex w-full justify-end">
            <h2 className="hidden sm:inline-block sm:text-white font-mono font-semibold text-2xl tracking-wide sm:pt-3 sm:pr-2
             md:mt-2">
              {`Hello! "${user}"`}
            </h2>
            <div className="mt-2.5 md:pl-8 md:mt-4">
              <button
                className="bg-zinc-700 ring-2 ring-zinc-400 rounded-2xl px-4 pb-2.5 flex gap-1.5"
                onClick={() => navigate("/logout")}
              >
                <div className="mt-2">Logout</div>
                <div className="mt-3.5">
                  <CiLogin />
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full flex gap-3 justify-end text-center p-2">
            <button
              className="bg-zinc-700 ring-2 ring-zinc-400 rounded-2xl px-4 flex gap-1"
              onClick={() => navigate("/login")}
            >
              <div className="mt-2">Login</div>
              <div className="pt-2.5 text-xl">
                <CiLogin />
              </div>
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="hidden md:inline-block md:px-4 rounded-2xl ring-4 ring-blue-800 bg-[#144ee3] text-white"
            >
              Register Now
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
