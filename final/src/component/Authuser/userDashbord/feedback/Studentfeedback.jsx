import React, { useState, useEffect } from "react";

const StudentFeedback = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    className: "", // Fixed className field
    email: "",
    feedback: "",
  });

  const [feedbackList, setFeedbackList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedFeedbacks = JSON.parse(localStorage.getItem("feedbackList")) || [];
    setFeedbackList(savedFeedbacks);
  }, []);

  const saveToLocalStorage = (feedbacks) => {
    localStorage.setItem("feedbackList", JSON.stringify(feedbacks));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required.";
    if (!formData.className.trim()) newErrors.className = "Class is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.feedback.trim()) newErrors.feedback = "Feedback cannot be empty.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addFeedback = async () => {
    const newData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      className: formData.className.trim(),
      email: formData.email.trim(),
      feedback: formData.feedback.trim(),
    };

    console.log("Sending Data:", newData);

    try {
      const response = await fetch("http://localhost:8080/feedback/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (!response.ok) {
        console.error("Error response from server:", result);
        return;
      }

      const updatedFeedbacks = [...feedbackList, newData];
      setFeedbackList(updatedFeedbacks);
      saveToLocalStorage(updatedFeedbacks);
      handleFeedbackReset();
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    addFeedback();
  };

  const handleFeedbackReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      className: "", // Fixed className field
      email: "",
      feedback: "",
    });
    setEditingIndex(null);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-300 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-extrabold mb-3 text-gray-900 text-center">💬 Feedback Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="w-full p-2 border rounded-lg" />
          {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}

          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="w-full p-2 border rounded-lg" />
          {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}

          <input type="text" name="className" placeholder="Class" value={formData.className} onChange={handleChange} className="w-full p-2 border rounded-lg" />
          {errors.className && <p className="text-red-500 text-xs">{errors.className}</p>}

          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded-lg" />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

          <textarea name="feedback" rows="4" placeholder="Your Feedback" value={formData.feedback} onChange={handleChange} className="w-full p-2 border rounded-lg"></textarea>
          {errors.feedback && <p className="text-red-500 text-xs">{errors.feedback}</p>}

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700">Submit Feedback</button>
        </form>
      </div>
    </div>
  );
};

export default StudentFeedback;