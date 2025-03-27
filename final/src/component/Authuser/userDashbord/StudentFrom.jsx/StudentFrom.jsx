import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { handleError, handleSucess } from "../../../../Utils";

const StudentFrom = () => {
  const id = localStorage.getItem('id');
  const [studentData, setStudentData] = useState("");

  useEffect(() => {
      fetchExpenseById();
  }, [id]);

  /*useEffect(() => {
    
      fetchExpenseById();
    
  }, []);*/

  const fetchExpenseById = async () => {
    try {
      const url = `http://localhost:8080/student/${id}`;
      const headers = {
        headers: {
          "Authorization": localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        method: 'GET'
      };

      const response = await fetch(url, headers);

      if (response.status === 403) {
        navigate('/login');
        return;
      }

      const result = await response.json();
      setStudentData(result);
      handleSucess("Data added Succesfully")
    } catch (err) {
      handleError('Error in fetching single student :',err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
      <div className="w-full max-w-4xl p-8 bg-blue-300 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Student Dashboard</h2>


        {studentData ? (
          <div className="space-y-6 text-center">
            {/* Personal Information */}
            <div className="bg-blue-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
              <p><strong>Name:</strong> {studentData.name}</p>
              <p><strong>Date of Birth:</strong> {studentData.dateOfBirth}</p>
              <p><strong>Religion:</strong> {studentData.religion}</p>
              <p><strong>Caste:</strong> {studentData.caste}</p>
              <p><strong>Mother Tongue:</strong> {studentData.motherTongue}</p>
            </div>

            {/* Academic Details */}
            <div className="bg-blue-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Academic Details</h3>
              <p><strong>GR Number:</strong> {studentData.grNumber}</p>
              <p><strong>ABC ID:</strong> {studentData.abcId}</p>
              <p><strong>Course Name:</strong> {studentData.courseName}</p>
              <p><strong>Year:</strong> {studentData.year}</p>
            </div>

            {/* Contact Information */}
            <div className="bg-blue-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
              <p>
                <strong>Address:</strong> {studentData.address}, {studentData.city},{" "}
                {studentData.state}, {studentData.pinCode}
              </p>
              <p><strong>Mobile No:</strong> {studentData.mobileNo}</p>
              <p><strong>Email:</strong> {studentData.email}</p>
              <p><strong>Parent Mobile No:</strong> {studentData.parentMobileNo}</p>
              <p><strong>Emergency Mobile No:</strong> {studentData.emergencyMobileNo}</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-700">Loading student data...</p>
        )}
      
      </div>
    </div>
  );
}

export default StudentFrom;
