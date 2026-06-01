"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../lib/axios";

import Navbar from "../../components/Navbar";
import TaskForm from "../../components/Taskform";
import TaskList from "../../components/Tasklist";

export default function DashboardPage() {
  const router = useRouter();

  const [tasks, setTasks] = useState();

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      await fetchTasks();
    };

    init();
  }, [router]);


  return (
    <>
      <Navbar />

      <main className="max-w-4xl mx-auto p-5 bg-slate-200 text-black rounded-2xl mt-5">
        <TaskForm refreshTasks={fetchTasks} />

        <div className="mt-8 bg-slate-300 p-5 text-black rounded-2xl">
          <TaskList tasks={tasks} refreshTasks={fetchTasks} />
        </div>
      </main>
    </>
  );
}
