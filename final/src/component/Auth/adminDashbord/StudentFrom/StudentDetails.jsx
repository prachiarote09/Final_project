import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const { name } = useParams(); // Get student name from the URL
  const location = useLocation();
  const navigate = useNavigate();
  const [student, setStudent] = useState(location.state || null);

  // Fetch student details if not found in location.state
  useEffect(() => {
    if (!student) {
      fetch(`http://localhost:8080/student?name=${encodeURIComponent(name)}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setStudent(data);
          } else {
            console.error("No student found with the given name.");
          }
        })
        .catch((error) => console.error("Error fetching student:", error));
    }
  }, [name]); // Added name as a dependency

  if (!student) {
    return <div className="text-center">No student data found.</div>;
  }

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

      <div className="w-full mt-6 bg-blue-100 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-black-700 mb-2">
          Personal Information
        </h3>
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Date of Birth:</strong> {student.dateOfBirth}</p>
        <p><strong>Religion:</strong> {student.religion}</p>
        <p><strong>Caste:</strong> {student.caste}</p>
        <p><strong>Mother Tongue:</strong> {student.motherTongue}</p>
        <p><strong>Annual Income:</strong> {student.annualIncome}</p>
      </div>

      <div className="w-full mt-4 bg-blue-100 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-black-700 mb-2">
          Academic Details
        </h3>
        <p><strong>GR Number:</strong> {student.grnumber}</p>
        <p><strong>Course Name:</strong> {student.courseName}</p>
        <p><strong>Year:</strong> {student.year}</p>
        <p><strong>ABC Id:</strong> {student.abcId}</p>
      </div>

      <div className="w-full mt-4 bg-blue-100 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-black-700 mb-2">
          Contact Information
        </h3>
        <p><strong>Address:</strong> {student.address}, {student.city}, {student.state}, {student.pinCode}</p>
        <p><strong>Mobile No:</strong> {student.mobileNo}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Parent Mobile No.:</strong> {student.parentMobileNo}</p>
        <p><strong>Emergency Mobile No.:</strong> {student.emergencyMobileNo}</p>
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-green-500 text-black px-4 py-2 rounded-md hover:bg-red-600"
      >
        Back to Student List
      </button>
    </div>
  );
};

export default StudentDashboard;
