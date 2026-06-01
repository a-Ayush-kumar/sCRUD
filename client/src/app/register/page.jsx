"use client";

import { useState } from "react";
import api from "../../lib/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState("user");
  const [team, setTeam] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    team: "",
  });

  const register = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", form);

      alert("Registered Successfully");

      router.push("/login");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

return (
  <div className="min-h-screen flex items-center justify-center">
    <div className="max-w-md mx-auto bg-slate-200 p-5 rounded-2xl text-black">
      <form onSubmit={register} className="space-y-4">
        <h1 className="text-2xl font-bold">Register</h1>

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          className="border p-2 w-full bg-slate-50 text-black rounded-2xl"
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
          className="border p-2 w-full bg-slate-50 text-black rounded-2xl"
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
          className="border p-2 w-full bg-slate-50 text-black rounded-2xl"
        />

        <select
          value={form.role}
          onChange={(e) =>
            setForm({
              ...form,
              role: e.target.value,
            })
          }
          className="border p-2 w-full bg-slate-50 text-black rounded-2xl"
        >
          <option value="user" className="bg-slate-50 text-black">User</option>
          <option value="admin" className="bg-slate-50 text-black">Admin</option>
        </select>

        <select
          value={form.team}
          onChange={(e) =>
            setForm({
              ...form,
              team: e.target.value,
            })
          }
          className="border p-2 w-full bg-slate-50 text-black rounded-2xl"
        >
          <option value="" className="bg-slate-50 text-black">Select Team</option>
          <option value="alpha" className="bg-slate-50 text-black">Alpha Team</option>
          <option value="beta" className="bg-slate-50 text-black">Beta Team</option>
          <option value="gamma" className="bg-slate-50 text-black">Gamma Team</option>
        </select>

        <button
          type="submit"
          className="bg-green-800 text-white px-4 py-2 rounded-2xl"
        >
          Register
        </button>
        <Link
            href="/login"
            className=" px-4 m-2 py-2 bg-slate-300 border-b-2 text-black rounded-2xl"
          >
            Already have an account! Login
          </Link>
      </form>
    </div>
  </div>
);
}
