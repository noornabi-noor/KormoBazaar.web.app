import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/available-tasks")
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {tasks.map(task => (
        <div key={task._id} className="card bg-base-100 shadow p-4">
          <h2 className="text-xl font-semibold">{task.task_title}</h2>
          <p><strong>Buyer:</strong> {task.buyer_name}</p>
          <p><strong>Completion Date:</strong> {task.completion_date}</p>
          <p><strong>Payable:</strong> ${task.payable_amount}</p>
          <p><strong>Workers Needed:</strong> {task.required_workers}</p>
          <button
            onClick={() => navigate(`/dashboard/task/${task._id}`)}
            className="btn btn-primary mt-2"
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;