"use client";

import { useState } from "react";
import api from "../../lib/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      console.log(res.data);
      localStorage.setItem("token", res.data.token);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      router.push("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto bg-slate-200 p-5 rounded-2xl text-black">
        <form onSubmit={login} className="space-y-4">
          <h1 className="text-2xl font-bold">Login</h1>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full bg-slate-50 text-black rounded-2xl"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full bg-slate-50 text-black rounded-2xl"
          />

          <button
            type="submit"
            className="bg-green-800 text-white px-4 py-2 rounded-2xl"
          >
            Login
          </button>

          <Link
            href="/register"
            className=" px-4 m-2 py-2 bg-slate-300 border-b-2 text-black rounded-2xl"
          >
            No account! Register
          </Link>
        </form>
      </div>
    </div>
  );
}
