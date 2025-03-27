import React, { useEffect, useState } from "react";

const SportStudent = () => {
  const [students, setStudents] = useState([]);

  // Load student data from localStorage when component mounts
  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem("sportStudents")) || [];
    setStudents(savedStudents);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-blue-700 text-center">Sports Committee</h1>
        <p className="text-gray-600 text-center mt-2">
          The Sports Committee organizes inter-college tournaments, sports events, and fitness initiatives for students.
        </p>
      </div>

      {/* Student List */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Committee Members</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[300px]">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Department</th>
                <th className="p-3 text-left">Year</th>
                <th className="p-3 text-left">GR Number</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student, index) => (
                  <tr key={index} className="border-b border-gray-300 hover:bg-gray-100 transition">
                    <td className="p-3">{student.name}</td>
                    <td className="p-3">{student.department}</td>
                    <td className="p-3">{student.year}</td>
                    <td className="p-3">{student.grNumber}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-3 text-gray-500">
                    No student data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SportStudent;
