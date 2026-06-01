"use client";

import { useState } from "react";
import api from "../lib/axios";

export default function TaskForm({
  refreshTasks,
}) {
  const [title, setTitle] = useState("");

  const [description, setDescription] =
    useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/tasks", {
        title,
        description,
      });

      setTitle("");
      setDescription("");

      refreshTasks();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Error"
      );
    }
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-3"
    >
      <input
        placeholder="Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        className="border p-2 w-full bg-slate-50 text-black rounded-2xl"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }
        className="border p-2 w-full bg-slate-50 text-black rounded-2xl"
      />

      <button
        type="submit"
        className="bg-green-800 text-white px-4 py-2 rounded-2xl"
      >
        Create Task
      </button>
    </form>
  );
}