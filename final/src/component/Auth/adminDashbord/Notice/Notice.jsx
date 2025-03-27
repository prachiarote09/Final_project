import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [formData, setFormData] = useState({ className: "", title: "", date: "" });
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch("http://localhost:8080/notice/");
        if (!response.ok) throw new Error("Failed to fetch notice");

        const data = await response.json();
        setNotices(data);
      } catch (error) {
        console.error("Error fetching notice:", error);
      }
    };

    fetchNotices();
  }, []);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const addNotice = async (e) => {
    e.preventDefault();

    const newData = {
      className: formData.className.trim(),
      title: formData.title.trim(),
      date: formData.date,
    };

    try {
      const response = await fetch("http://localhost:8080/notice/", {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      const result = await response.json();
      if (!response.ok) {
        console.error("Error response from server:", result);
        return;
      }

      setNotices((prev) => [...prev, result.data]);
      setFormData({ className: "", title: "", date: "" });
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleEditNotice = (index) => {
    const notice = notices[index];
    setFormData({ className: notice.className, title: notice.title, date: notice.date });
    setEditingIndex(index);
  };

  const handleDeleteNotice = async (noticeId) => {
    console.log("Attempting to delete notice with ID:", noticeId);
  
    try {
      const response = await fetch(`http://localhost:8080/notice/${noticeId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete notice: ${errorText}`);
      }
  
      // ✅ Remove deleted notice from the UI
      setNotices((prevNotices) => prevNotices.filter((notice) => notice._id !== noticeId));
  
      console.log("Notice deleted successfully!");
    } catch (error) {
      console.error("Error deleting notice:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-purple-50 p-8 rounded-lg shadow-xl mt-10 border border-purple-200">
      <h1 className="text-center text-4xl font-bold text-purple-700 mb-6">📢 Notice Board</h1>
      <form onSubmit={addNotice} className="flex flex-col gap-6">
        <div>
          <label className="block text-purple-700 font-semibold mb-2">Class:</label>
          <input
            type="text"
            id="className"
            value={formData.className}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
          />
        </div>
        <div>
          <label className="block text-purple-700 font-semibold mb-2">Title:</label>
          <textarea
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            rows="3"
            className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
          ></textarea>
        </div>
        <div>
          <label className="block text-purple-700 font-semibold mb-2">Date:</label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
          />
        </div>
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg transition duration-300 shadow-md"
        >
          {editingIndex !== null ? "Update Notice" : "Add Notice"}
        </button>
      </form>

      <h2 className="text-2xl font-semibold text-purple-800 mt-8">📋 Saved Notices</h2>
      <div className="overflow-x-auto mt-4">
        <table className="w-full border border-purple-300 rounded-lg overflow-hidden shadow-lg">
          <thead>
            <tr className="bg-purple-600 text-white text-lg">
              <th className="p-4 text-left">Class</th>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notices.length > 0 ? (
              notices.map((notice) => (
                <tr key={notice._id} className="border-b border-purple-300 hover:bg-purple-100">
                  <td className="p-4 text-purple-800">{notice.className}</td>
                  <td className="p-4 text-purple-800">{notice.title}</td>
                  <td className="p-4 text-purple-800">{notice.date}</td>
                  <td className="p-4 flex justify-center gap-3">
                    <button
                      onClick={() => handleEditNotice(notice._id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteNotice(notice._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2"
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">No notices available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notice;