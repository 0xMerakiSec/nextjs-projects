"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  async function handleSubmit() {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Sign success", response.data);
      toast.success("signup successfully!");
      router.push("/login");
    } catch (error: any) {
      console.log("Failed to signup! Error: ", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 8 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2 ">
      <h2 className="font-semibold text-lg">
        {loading ? "Loading..." : "Signup"}
      </h2>
      <hr />
      <div className="flex space-x-4 mt-3 items-baseline ">
        <label htmlFor="username" className="font-light flex-1 text-indigo-500">
          Username
        </label>
        <input
          className="flex-1 bg-gray-100 border border-none px-4  text-gray-900 py-1 rounded-md focus:outline-none ring-2 focus:ring-indigo-600"
          type="text"
          id="username"
          placeholder="username"
          required
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
      </div>
      <div className="flex space-x-11 mt-3 items-baseline ">
        <label htmlFor="email" className="font-light flex-1 text-indigo-500">
          Email
        </label>
        <input
          className="flex-1 bg-gray-100 border border-none px-4 text-gray-900 py-1 rounded-md focus:outline-none ring-2 focus:ring-indigo-600"
          type="text"
          id="email"
          placeholder="email"
          required
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>
      <div className="flex space-x-4 mt-3 items-baseline ">
        <label htmlFor="password" className="font-light flex-1 text-indigo-500">
          Password
        </label>
        <input
          className="flex-1 text-gray-900 bg-gray-100 border border-none px-4 py-1 rounded-md focus:outline-none ring-2 focus:ring-indigo-600"
          type="password"
          id="password"
          placeholder="password"
          required
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 px-12  py-2 rounded-2xl hover:bg-indigo-700 bg-indigo-900 font-semibold "
        type="submit"
      >
        {buttonDisabled ? "No signup" : "Signup"}
      </button>
      <Link href="/login" className="font-extralight text-sm mt-2">
        Visit login page
      </Link>
      <Toaster />
    </div>
  );
}
