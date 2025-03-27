import React, { useState, useEffect } from "react";

const Adminfeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  // Load feedbacks from localStorage on initial render
  useEffect(() => {
    const savedFeedbacks =
      JSON.parse(localStorage.getItem("feedbackList")) || [];
    setFeedbackList(savedFeedbacks);
  }, []);

  // Get color based on feedback type
  const getFeedbackColor = (type) => {
    switch (type) {
      case "comments":
        return "bg-blue-100 border-blue-500 text-blue-700";
      case "suggestions":
        return "bg-green-100 border-green-500 text-green-700";
      case "questions":
        return "bg-yellow-100 border-yellow-500 text-yellow-700";
      default:
        return "bg-gray-100 border-gray-300 text-gray-700";
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-pink-400 p-4 sm:p-6">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 text-center">
          📚 All Submitted Feedbacks
        </h1>

        {feedbackList.length === 0 ? (
          <p className="text-gray-600 text-center">
            No feedback submitted yet. 🚫
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {feedbackList.map((feedback, index) => (
              <div
                key={index}
                className={`p-5 border-l-4 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 ${getFeedbackColor(
                  feedback.feedbackType
                )}`}
              >
                <h3 className="text-lg font-bold mb-2">
                  {feedback.firstName} {feedback.lastName}
                </h3>
                <p className="text-sm">
                  <strong>📚 Class:</strong> {feedback.Class}
                </p>
                <p className="text-sm">
                  <strong>📧 Email:</strong> {feedback.email}
                </p>
                <p className="text-sm">
                  <strong>💬 Type:</strong>{" "}
                  <span className="capitalize">{feedback.feedbackType}</span>
                </p>
                <p className="mt-3 text-sm italic break-words">
                  "{feedback.feedback}"
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Adminfeedback;
