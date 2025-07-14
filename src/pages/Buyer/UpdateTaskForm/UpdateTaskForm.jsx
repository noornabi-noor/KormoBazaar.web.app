import React, { useState } from "react";

const UpdateTaskForm = ({ task, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    task_title: task.task_title,
    task_detail: task.task_detail,
    submission_info: task.submission_info,
    task_image: task.task_image,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onUpdate(task._id, formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow rounded">
      <h2 className="text-lg font-bold mb-2">Update Task</h2>

      <input
        name="task_title"
        type="text"
        value={formData.task_title}
        onChange={handleChange}
        required
        placeholder="Task Title"
        className="input input-bordered w-full"
      />

      <textarea
        name="task_detail"
        value={formData.task_detail}
        onChange={handleChange}
        required
        placeholder="Task Detail"
        className="textarea textarea-bordered w-full"
      ></textarea>

      <input
        name="submission_info"
        type="text"
        value={formData.submission_info}
        onChange={handleChange}
        required
        placeholder="Submission Info (e.g., Screenshot Requirement)"
        className="input input-bordered w-full"
      />

      <input
        name="task_image"
        type="url"
        value={formData.task_image}
        onChange={handleChange}
        required
        placeholder="Task Image URL (e.g., https://example.com/image.jpg)"
        className="input input-bordered w-full"
      />

      <div className="flex gap-4 mt-4">
        <button type="submit" className="btn btn-primary">Save</button>
        <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
};

export default UpdateTaskForm;