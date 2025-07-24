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
      className="space-y-4 sm:space-y-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg sm:rounded-2xl p-4 sm:p-6 shadow-lg transition-colors duration-300 w-full max-w-md sm:max-w-lg mx-2 sm:mx-0"
    >
      {/* Heading */}
      <h2 className="text-xl sm:text-2xl font-bold text-center">
        ✏️ <span className="text-primary-gradient dark:text-blue-300">Update Task</span>
      </h2>

      {/* Title */}
      <div>
        <label htmlFor="task_title" className="block mb-1 text-sm sm:text-base font-medium">
          Task Title
        </label>
        <input
          name="task_title"
          type="text"
          value={formData.task_title}
          onChange={handleChange}
          required
          placeholder="Task Title"
          className="input input-bordered w-full text-sm sm:text-base bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      {/* Detail */}
      <div>
        <label htmlFor="task_detail" className="block mb-1 text-sm sm:text-base font-medium">
          Task Detail
        </label>
        <textarea
          name="task_detail"
          value={formData.task_detail}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Task Detail"
          className="textarea textarea-bordered w-full text-sm sm:text-base bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400"
        ></textarea>
      </div>

      {/* Submission Info */}
      <div>
        <label htmlFor="submission_info" className="block mb-1 text-sm sm:text-base font-medium">
          Submission Info
        </label>
        <input
          name="submission_info"
          type="text"
          value={formData.submission_info}
          onChange={handleChange}
          required
          placeholder="Screenshot Requirement or Similar"
          className="input input-bordered w-full text-sm sm:text-base bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      {/* Image URL */}
      <div>
        <label htmlFor="task_image" className="block mb-1 text-sm sm:text-base font-medium">
          Task Image URL
        </label>
        <input
          name="task_image"
          type="url"
          value={formData.task_image}
          onChange={handleChange}
          required
          placeholder="https://example.com/image.jpg"
          className="input input-bordered w-full text-sm sm:text-base bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 pt-2">
        <button 
          type="submit" 
          className="btn btn-sm sm:btn-md btn-primary w-full sm:w-auto"
        >
          Save Changes
        </button>
        <button 
          type="button" 
          className="btn btn-sm sm:btn-md btn-outline w-full sm:w-auto" 
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateTaskForm;