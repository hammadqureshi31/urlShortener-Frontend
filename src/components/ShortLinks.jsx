import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { GrCopy } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";

const ShortLinks = () => {
  const [allIDs, setAllIDs] = useState([]);
  const urlRefs = useRef({});
  const [show, setShow] = useState({});
  const [copied, setCopied] = useState({});
  const backendPortURL = "clever-flexibility.railway.internal/";
  const shortLinks = useSelector((state) => state);

  useEffect(() => {
    const fetchURLs = async () => {
      try {
        const response = await axios.get(`${backendPortURL}url`);
        setAllIDs(response.data);
      } catch (error) {
        console.error("Error fetching URLs:", error);
      }
    };

    fetchURLs();
  }, [shortLinks]);

  const toggleShow = (id) => {
    setShow((prevShow) => ({
      ...prevShow,
      [id]: !prevShow[id],
    }));
  };

  const handleCopyURL = ({ backendPortURL, shortId, urlRef }) => {
    if (!backendPortURL || !shortId) {
      console.error('backendPortURL or shortId is undefined');
      return;
    }

    const shortURL = backendPortURL.concat(shortId);

    navigator.clipboard.writeText(shortURL)
      .then(() => {
        console.log('URL copied to clipboard!');
        setCopied((prevCopied) => ({
          ...prevCopied,
          [shortId]: true,
        }));
        if (urlRef && urlRef.current) {
          urlRef.current.select();
        }
      })
      .catch(err => {
        console.error('Failed to copy:', err);
      });
  };

  return (
    <>
      <div>
        <div className="bg-zinc-700 rounded-tr-lg rounded-tl-lg p-3">
          <h1 className="text-gray-100 text-lg font-semibold sm:text-2xl sm:text-[#144ee3] sm:font-semibold font-serif">
            Shorten Links
          </h1>
          <div className="hidden sm:flex justify-between pt-4">
            <div className="w-full flex justify-start text-center underline">
              <h3>Short-Link</h3>
            </div>
            <div className="w-full flex justify-end underline">
              <h3>Original-Link</h3>
            </div>
            <div className="w-full flex justify-end underline">
              <h3>Total-Clicks</h3>
            </div>
            <div className="w-2/4 flex justify-end underline">
              <h3>QR-Code</h3>
            </div>
          </div>
        </div>

        <div>
          {allIDs.length > 0 ? (
            allIDs.map((url) => (
              <div key={url._id}>
                <div className="flex justify-between py-3 px-2">
                  <div className="flex justify-start text-center gap-1 text-gray-400 ">
                    <h3 className="text-md pt-1 w-56">
                      {backendPortURL}
                      {url.shortId}
                    </h3>
                    <div>
                      <div
                        className={`p-2 rounded-full ${copied[url.shortId] ? 'bg-[#144ee3]' : 'bg-gray-700'}`}
                        ref={(el) => (urlRefs.current[url._id] = el)}
                        onClick={() => handleCopyURL({ backendPortURL, shortId: url.shortId, urlRef: urlRefs.current[url._id] })}
                      >
                        <GrCopy />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div
                      onClick={() => toggleShow(url._id)}
                      className="text-lg p-2 rounded-full cursor-pointer bg-zinc-700 flex justify-center text-center sm:hidden"
                    >
                      <IoIosArrowDown />
                    </div>
                  </div>

                  <div className="hidden sm:flex justify-between text-center">
                    <div className="text-gray-400 text-left text-wrap overflow-hidden">
                      {url.redirectURL}
                    </div>
                  </div>

                  <div className="flex justify-between text-center gap-36">
                    <div className="hidden sm:flex justify-between text-center">
                      {url.visitHistory.length}
                    </div>

                    <div className="hidden sm:inline-block ">
                      <img
                        src={`${url.qrCode}`}
                        className="size-20 object-fill"
                        alt="QR Code"
                      />
                    </div>
                  </div>
                </div>

                {show[url._id] && (
                  <div className="flex justify-between text-center sm:hidden">
                    <div className="text-gray-400 w-2/3 text-left">
                      {url.redirectURL}
                    </div>
                    <img
                      src={`${url.qrCode}`}
                      className="size-20 pb-1"
                      alt="QR Code"
                    />
                  </div>
                )}

                <hr className="opacity-40" />
              </div>
            ))
          ) : (
            <div className="p-3 text-gray-400">No URL Available</div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShortLinks;
