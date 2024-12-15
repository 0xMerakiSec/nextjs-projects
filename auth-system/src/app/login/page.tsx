"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 8) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  async function handleSubmit() {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/login", user);

      toast.success("Login Success");
      router.push("/profile");
    } catch (error: any) {
      toast.error(error.message);
      console.log("Login failed :", error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2 bg-gradient-to-r  from-black to-indigo-950  ">
      <h2 className="font-semibold text-lg">
        {loading ? "Loading..." : "Login"}
      </h2>
      <hr />

      <div className="flex space-x-11 mt-3 items-baseline ">
        <label htmlFor="email" className="font-light flex-1 text-indigo-500">
          Email
        </label>
        <input
          className="flex-1 bg-gray-100 border border-none px-4 py-1 rounded-md focus:outline-none ring-2 focus:ring-indigo-600 text-gray-900"
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
        // {...disabled}
      >
        {buttonDisabled ? "Processing..." : "Login"}
      </button>
      <Link href="/signup" className="font-extralight text-sm mt-2">
        Visit to Signup
      </Link>
      <Toaster />
    </div>
  );
}
