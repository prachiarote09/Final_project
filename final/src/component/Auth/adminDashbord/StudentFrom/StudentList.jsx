import React, { useState, useEffect } from "react";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Load student data from local storage on page load
  useEffect(() => {
    fetchStudents();
  }, []);

  // Fetch all students
  const fetchStudents = async () => {
    try {
      const url = "http://localhost:8080/student";
      const headers = {
        headers: {
          "Authorization": localStorage.getItem("token"),
        },
        method: "GET",
      };
      const response = await fetch(url, headers);
      if (response.status === 403) {
        navigate("/admin/Login");
        return;
      }
      const result = await response.json();
      setStudents(result);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch a single student's details
  const viewStudentDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/student/${id}`, {
        headers: {
          "Authorization": localStorage.getItem("token"),
        },
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch student details");
      }

      const studentData = await response.json();
      setSelectedStudent(studentData);
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  return (
    <div className="max-w-200 mx-auto p-6 rounded-lg">
      {selectedStudent ? (
        <StudentDashboard student={selectedStudent} goBack={() => setSelectedStudent(null)} />
      ) : (
        <>
          <h1 className="text-center text-2xl font-bold text-black-800">Student List</h1>
          <table className="w-full mt-4 border-black">
            <thead>
              <tr className="bg-purple-700 text-white">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">GR No.</th>
                <th className="p-3 text-left">Course</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} className="border-b border-black-300">
                  <td className="p-3">{student.name}</td>
                  <td className="p-3">{student.grnumber}</td>
                  <td className="p-3">{student.courseName}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => viewStudentDetails(student._id)}
                      className="bg-gradient-to-r from-purple-700 to-purple-900 text-white px-3 py-1 rounded-md hover:bg-purple-600"
                    >
                      View
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center p-4">
                    No students added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

// Student Detail Page
const StudentDashboard = ({ student, goBack }) => {
  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 shadow-lg">
      <h2 className="text-3xl font-bold text-black-800">Student Details</h2>

      <div className="flex justify-center mt-4">
        <img
          src={student.photo || "https://via.placeholder.com/150"}
          alt="Student"
          className="w-32 h-32 border-4 border-black-300 object-cover"
        />
      </div>

      <div className="w-full mt-6 bg-purple-100 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-black-700 mb-2">Personal Information</h3>
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Date of Birth:</strong> {student.dateOfBirth}</p>
        <p><strong>Religion:</strong> {student.religion}</p>
        <p><strong>Caste:</strong> {student.caste}</p>
        <p><strong>Mother Tongue:</strong> {student.motherTongue}</p>
        <p><strong>Annual Income:</strong> {student.annualIncome}</p>
      </div>

      <div className="w-full mt-4 bg-purple-100 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-black-700 mb-2">Academic Details</h3>
        <p><strong>GR Number:</strong> {student.grnumber}</p>
        <p><strong>Course Name:</strong> {student.courseName}</p>
        <p><strong>Year:</strong> {student.year}</p>
        <p><strong>ABC Id:</strong> {student.abcId}</p>
      </div>

      <div className="w-full mt-4 bg-purple-100 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-black-700 mb-2">Contact Information</h3>
        <p><strong>Address:</strong> {student.address}, {student.city}, {student.state}, {student.pinCode}</p>
        <p><strong>Mobile No:</strong> {student.mobileNo}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Parent Mobile No.:</strong> {student.parentMobileNo}</p>
        <p><strong>Emergency Mobile No.:</strong> {student.emergencyMobileNo}</p>
      </div>

      <button
        onClick={goBack}
        className="mt-6 bg-green-500 text-black px-4 py-2 rounded-md hover:bg-red-600"
      >
        Back to Student List
      </button>
    </div>
  );
};

export default StudentList;
