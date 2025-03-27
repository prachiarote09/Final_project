import React,{useEffect,useState} from "react";

const StudentRagging = () => {
  const [students, setStudents] = useState([]);
    
      // Load student data from localStorage when component mounts
      useEffect(() => {
        const savedStudents = JSON.parse(localStorage.getItem("raggingStudents")) || [];
        setStudents(savedStudents);
      }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-red-600 text-center">Anti-Ragging Committee</h1>
        <p className="text-gray-600 text-center mt-2">
          This committee ensures a safe and respectful campus environment for all students.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Committee Members</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[300px]">
            <thead>
              <tr className="bg-red-500 text-white">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Department</th>
                <th className="p-3 text-left">Year</th>
                <th className="p-3 text-left">GR Number</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index} className="border-b border-gray-300 hover:bg-gray-100 transition">
                  <td className="p-3">{student.name}</td>
                  <td className="p-3">{student.department}</td>
                  <td className="p-3">{student.year}</td>
                  <td className="p-3">{student.grNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentRagging;
