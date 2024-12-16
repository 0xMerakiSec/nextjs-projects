"use client";
import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("Nothing");
  async function handleLogout() {
    try {
      const response = await axios.get("/api/users/logout");
      console.log(response);
      toast.success("Logout successfull");
      router.push("/login");
    } catch (error: any) {
      console.log("Failed to logout: ", error.message);
      toast.error("Failed to logout");
    }
  }
  const getUserDetails = async () => {
    const response = await axios.get("/api/users/me");
    console.log(response.data);
    setData(response.data.data._id);
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <div className="flex min-h-screen justify-evenly items-start content-center mt-4 pt-10">
      <h1 className="text-2xl font-semibold ">Profile</h1>

      <h2 className="text-lime-500 font-light px-3 py-1">
        {" "}
        {data === "Nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>

      <hr />
      <button
        onClick={handleLogout}
        className="rounded-2xl px-8 py-2 bg-gray-200 border-none text-black font-semibold hover:bg-white"
      >
        Logout
      </button>
      {/* <button
        onClick={getUserDetails}
        className="rounded-2xl px-8 py-2 bg-black border border-white border-none text-white font-semibold hover:bg-gray-950"
      >
        Me
      </button> */}
      <Toaster />
    </div>
  );
}

export default ProfilePage;
