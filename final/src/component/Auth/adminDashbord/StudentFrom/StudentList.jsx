import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const url = "http://localhost:8080/student";
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        method: "GET",
      };
      const response = await fetch(url, headers);
      if (response.status === 403) {
        navigate("/login");
        return;
      }
      const result = await response.json();
      console.log("Fetched Students:", result); // Debugging: Check data received
      setStudents(result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-200 mx-auto p-6 rounded-lg">
      <h1 className="text-center text-2xl font-bold text-black-800">Student List</h1>
      <table className="w-full mt-4 border-black">
        <thead>
          <tr className="bg-blue-300">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">GR No.</th>
            <th className="p-3 text-left">Course</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 &&
            students.map((student, index) => {
              console.log("Student Data:", student); // Debugging: Check each student object

              if (!student.grnumber) {
                console.warn("Missing grNumber for student:", student);
              }

              return (
                <tr key={student.grnumber || index} className="border-b border-black-300">
                  <td className="p-3">{student.name}</td>
                  <td className="p-3">{student.grnumber || "N/A"}</td>
                  <td className="p-3">{student.courseName}</td>
                  <td className="p-3 space-x-2">
                  <button
  onClick={() =>
    navigate(`/student/${encodeURIComponent(student.name)}`, { state: student })
  }
  className="bg-blue-500 text-black px-3 py-1 rounded-md hover:bg-blue-600"
>
  View
</button>

                    <button className="bg-red-500 text-black px-3 py-1 rounded-md hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {students.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center p-4">No students added yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
