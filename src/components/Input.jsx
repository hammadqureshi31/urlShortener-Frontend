import React, { useState } from "react";
import { FaLess, FaLink } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { TbCopyCheckFilled } from "react-icons/tb";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setURL } from "../Redux/slices/urlSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Input = () => {
  const [originlURL, setOriginlURL] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const backendPortURL = "http://localhost:3000/";

  // const handleClick = async (req, res) => {
  //   console.log(originlURL);
  //   try {
  //     let shortId = await axios.post(
  //       `${backendPortURL}url`,
  //       {
  //         url: originlURL,
  //       },
  //       { withCredentials: true }
  //     );
  //     setOriginlURL("");
  //     console.log("from input ", shortId);

  //     dispatch(setURL(shortId.data));
  //   } catch (err) {
  //     console.log("You must login first");
  //     navigate("/login");
  //   }
  // };


  const handleClick = async () => {
    try {
      const response = await axios.post('https://urlshortener-backend-production-9b4e.up.railway.app/url', { url: originlURL }, { withCredentials: true });
      console.log(response.data);
      setOriginlURL("");
      console.log("from input ", response);

      dispatch(setURL(response.data));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("You must log in first");
        // alert("Please login first")
        toast.error('Please login first',{ theme: "dark" });
      } else {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className={`pt-6 px-5 py-4 flex justify-center text-center`}>
        <div className="flex gap-2 w-full text-center bg-zinc-700 p-2 rounded-3xl ring-2 ring-zinc-400 sm:max-w-[665px] md:max-w-[665px] lg:max-w-[665px]">
          <div className=" text-2xl pl-2 pt-2 md:text-3xl md:pt-1">
            <FaLink />
          </div>

          <div className="flex justify-between w-full">
            <input
              type="text"
              placeholder="Enter the link here"
              value={originlURL}
              onChange={(e) => setOriginlURL(e.target.value)}
              className=" bg-transparent text-white md:ml-2 focus:outline-none"
            />

            <button
              className=" hidden sm:inline-block md: px-4 rounded-2xl bg-[#144ee3] text-white md:py-1.5"
              onClick={handleClick}
            >
              Short Now!
            </button>

            <div
              onClick={handleClick}
              className="bg-[#144ee3] text-center text-2xl p-2 rounded-full cursor-pointer sm:hidden "
            >
              <FaArrowRight />
            </div>
          </div>
          <ToastContainer />


        </div>
      </div>
      <div className="flex justify-center text-center gap-3 cursor-pointer">
        <div className="text-2xl text-gray-400">
          <TbCopyCheckFilled />
        </div>
        <h1 className="text-gray-400">Copy to clipboard</h1>
      </div>
    </>
  );
};

export default Input;
