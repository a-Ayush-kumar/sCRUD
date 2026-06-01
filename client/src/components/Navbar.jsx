"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  let user = {};

  if (typeof window !== "undefined") {
    try {
      user = JSON.parse(localStorage.getItem("user") || "{}");
    } catch (error) {
      user = {};
    }
  }
  const logout = () => {
    localStorage.removeItem("token");

    router.push("/login");
  };

  return (
    <nav className="flex justify-between items-center p-4 border-b bg-slate-300 text-black rounded-2xl">
      <h1 className="text-xl font-bold">sCRUD</h1>

      <div className="flex gap-4 items-center bg-slate-100 p-2 rounded-2xl">
        <Link href="/dashboard" className="bg-slate-300 rounded-2xl p-2 border-b-2">Dashboard</Link>
        <div>
          
          <span className="bg-slate-300 rounded-2xl p-2 m-2 border-b-2">{user.name}</span>
          
          <span className="bg-slate-300 rounded-2xl p-2 m-2 border-b-2">Role :{" "}{user.role}</span>
          
          <span className="bg-slate-300 rounded-2xl p-2 m-2 border-b-2">Team :{" "}{user.team}</span>
        </div>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded-2xl"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
