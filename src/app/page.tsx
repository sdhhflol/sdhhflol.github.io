"use client";
import React, { useEffect, useState, Suspense } from "react";
import Lanyard from "./Lanyard";
import Footer from "./Footer";

import { MdOutlinePhoneAndroid } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { IconContext } from "react-icons";
import { BsDiscord } from "react-icons/bs";

const Home = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const t = new Date().toLocaleTimeString('en-US', {
        timeZone: 'America/Los_Angeles',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setTime(t);
    };

    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="background"></div>
      <div>
        <title>{`sdhhf | ${Lanyard.qotd?.toString()}`}</title>
        <div id="main" className="flex flex-col items-center justify-center h-screen" style={{ display: 'none' }}>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="bg-[#101014] rounded-lg p-4 sm:p-5 flex flex-col justify-center items-center animate-fade">
              <h1 className="text-4xl font-[800] text-center">
                hey! 👋 i&apos;m <mark className="px-1 text-white bg-blue-600 rounded">sdhhf</mark>!
              </h1>
              <p className={"font-[600] text-[#565b70] text-center"}>
                i&apos;m a <span className="italic font-[800]" >professional</span> dumbass
              </p>
              <p className={"font-[600] text-gray-700 flex items-center justify-center text-center"}>
                <FaClock className="mr-2 animate-[spin_5s_ease-in-out_infinite]" />
                {time}
                <span className="mx-[6px] bg-gray-700 h-4 w-[3px] rounded-lg"></span>
                {Lanyard.phone === true ? <IconContext.Provider value={{
                  className: `mx-[3px] h-4 w-4 ${Lanyard.status === 'online' ? 'text-[#30985c]' :
                    Lanyard.status === 'dnd' ? 'text-[#e05154]' :
                      Lanyard.status === 'idle' ? 'text-[#d1a241]' : 'text-gray-700'}`
                }}>
                  <MdOutlinePhoneAndroid />
                </IconContext.Provider> :
                  <>

                    <span
                      id="dot"
                      className={`mx-[6px] h-2 w-2 ${Lanyard.status === 'online' ? 'bg-[#30985c] rounded-full' :
                        Lanyard.status === 'dnd' ? 'bg-[#e05154] rounded-full' :
                          Lanyard.status === 'idle' ? 'bg-[#d1a241] rounded-full' : 'bg-gray-700 rounded-full'}`}
                    ></span></>
                }
                <span className={`${Lanyard.status === 'online' ? 'text-[#30985c]' :
                  Lanyard.status === 'dnd' ? 'text-[#e05154]' :
                    Lanyard.status === 'idle' ? 'text-[#d1a241]' :
                      'text-gray-700'}`}
                >
                  {Lanyard.status}
                </span>
              </p>
            </div>
            {/* <div className="bg-[#101014] rounded-lg p-4 sm:p-5">
            <p className="font-[600] text-center text-wrap max-w-md">
              i've been studying computer science for about 6 years, primarily software, roblox shit (and a lil bit of game hacking). i make discord bots and random shitty software, and i prefer working independently as a solo developer.
              sup im sdhhf i do random shit like this and andand and andn adn adad
            </p>
          </div> */}

          </div>

          <div className="p-[10px]"></div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="bg-[#101014] rounded-lg p-5 max-w-3xl w-full mx-auto flex flex-col items-center animate-fade">
              <h1 className="flex flex-1 text-4xl font-[800] mb-2 text-center items-center"><IconContext.Provider value={{ className: `mx-[7px] mb-[-4px]` }} > <BsDiscord /> </IconContext.Provider> discord activity</h1>
              <Suspense fallback={<p>fetching status...</p>}>
                <Lanyard />
              </Suspense>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
