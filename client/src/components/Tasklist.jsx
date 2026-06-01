"use client";

import api from "../lib/axios";

export default function TaskList({
  tasks =[],
  refreshTasks,
}) {
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);

      refreshTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="border p-4 bg-slate-100 text-black rounded-2xl"
        >
          <h3 className="font-bold">
            {task.title}
          </h3>

          <p>{task.description}</p>

          <button
            onClick={() =>
              deleteTask(task._id)
            }
            className="mt-2 bg-red-400 text-white px-3 py-1 rounded-2xl"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}