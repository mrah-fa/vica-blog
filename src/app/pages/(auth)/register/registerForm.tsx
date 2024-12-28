"use client";
import { DOMAIN } from "@/app/utils/constant";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

function RegisterForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const input =
    "w-full py-2 mb-6 text-black px-3 border rounded-md border-green-800 focus:outline-none focus:border-green-400";
  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "") return toast.error("Username is required");
    if (email === "") return toast.error("Email is required");
    if (password === "") return toast.error("Password is required");

    try {
      await axios.post(`${DOMAIN}/api/register`, {
        email,
        password,
        name: username,
      });
      console.log("Registered");
      // const user = {
      //   name: username,
      //   email: email,
      //   isAdmin: false,
      // };
      // localStorage.setItem("user", JSON.stringify(user));

      toast.success("Registered");
      router.replace("/");

      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <form
        onSubmit={formSubmit}
        className="w-4xl w-full p-4 bg-slate-300  border-green-800 border rounded-lg shadow-lg"
      >
        <input
          type="text"
          className={input}
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          className={input}
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className={input}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-800 border w-full text-white font-bold py-2 px-4 rounded-md focus:outline-none hover:bg-green-950"
        >
          Register
        </button>
        <p className="mx-auto font-bold mt-4 text-center ">
          Already have an account ?{" "}
          <Link href="/pages/login" className="text-green-700 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;
