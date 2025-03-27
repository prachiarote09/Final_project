import React, { useEffect, useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { MdOutlineSchool } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";

const StudentCultural = () => {
  const [students, setStudents] = useState([]);

  // Load students from localStorage when the component mounts
  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem("culturalStudents")) || [];
    setStudents(savedStudents);
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-50 min-h-screen flex flex-col items-center">
      {/* Header Section */}
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full text-center relative overflow-hidden">
        <h1 className="text-4xl font-extrabold text-purple-700 tracking-wide flex justify-center items-center gap-2">
          <MdOutlineSchool className="text-purple-500" /> Cultural Committee
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          The Cultural Committee is responsible for organizing cultural events, fests, and competitions in the college.
        </p>
        <div className="absolute -top-5 -left-5 w-24 h-24 bg-purple-300 opacity-30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-purple-200 opacity-50 rounded-full blur-3xl"></div>
      </div>

      {/* Committee Members Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6 w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FaUserGraduate className="text-purple-500" /> Committee Members
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-purple-600 text-white">
                <th className="p-4 text-left flex items-center gap-2">
                  <BsFillPersonFill className="text-white" /> Name
                </th>
                <th className="p-4 text-left text-purple-200">Department</th>
                <th className="p-4 text-left text-purple-200">Year</th>
                <th className="p-4 text-left text-purple-200">GR Number</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student, index) => (
                  <tr key={index} className="border-b border-gray-300 hover:bg-purple-100 transition">
                    <td className="p-4 font-medium">{student.name}</td>
                    <td className="p-4">{student.department}</td>
                    <td className="p-4">{student.year}</td>
                    <td className="p-4">{student.grNumber}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">
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

export default StudentCultural;
