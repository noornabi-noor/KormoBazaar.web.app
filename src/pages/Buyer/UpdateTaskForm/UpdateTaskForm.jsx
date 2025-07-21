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
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-2xl p-6 shadow-lg transition-colors duration-300 max-w-lg w-full"
    >
      {/* Heading */}
      <h2 className="text-2xl font-bold text-center">✏️ Update Task</h2>

      {/* Title */}
      <div>
        <label htmlFor="task_title" className="block mb-1 font-medium">
          Task Title
        </label>
        <input
          name="task_title"
          type="text"
          value={formData.task_title}
          onChange={handleChange}
          required
          placeholder="Task Title"
          className="input input-bordered w-full bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      {/* Detail */}
      <div>
        <label htmlFor="task_detail" className="block mb-1 font-medium">
          Task Detail
        </label>
        <textarea
          name="task_detail"
          value={formData.task_detail}
          onChange={handleChange}
          required
          placeholder="Task Detail"
          className="textarea textarea-bordered w-full bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400"
        ></textarea>
      </div>

      {/* Submission Info */}
      <div>
        <label htmlFor="submission_info" className="block mb-1 font-medium">
          Submission Info
        </label>
        <input
          name="submission_info"
          type="text"
          value={formData.submission_info}
          onChange={handleChange}
          required
          placeholder="Screenshot Requirement or Similar"
          className="input input-bordered w-full bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      {/* Image URL */}
      <div>
        <label htmlFor="task_image" className="block mb-1 font-medium">
          Task Image URL
        </label>
        <input
          name="task_image"
          type="url"
          value={formData.task_image}
          onChange={handleChange}
          required
          placeholder="https://example.com/image.jpg"
          className="input input-bordered w-full bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 pt-2">
        <button type="submit" className="btn btn-sm btn-primary">
          Save
        </button>
        <button type="button" className="btn btn-sm btn-outline" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateTaskForm;