"use client";
import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
function ProfilePage() {
  const router = useRouter();
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
  return (
    <div className="flex min-h-screen justify-evenly items-start content-center mt-4 pt-10">
      <h1 className="text-2xl font-semibold ">Profile</h1>
      <hr />
      <button
        onClick={handleLogout}
        className="rounded-2xl px-8 py-2 bg-gray-200 border-none text-black font-semibold hover:bg-white"
      >
        Logout
      </button>
      <Toaster />
    </div>
  );
}

export default ProfilePage;
